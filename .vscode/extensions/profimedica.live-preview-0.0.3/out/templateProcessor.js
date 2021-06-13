"use strict";
// add the following line for intellisense
// <reference path="../../vscode.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
class TemplateProcessor {
    constructor(context) {
        this.context = context;
        this.UseHTMLCecorators = false;
        this.jsonSample = `{
        "UsedTemplate":"__UsedTemplate__",
        "MyAppSpace":"MyApp",
        "MyAppClass":"MyModel",
        "Translates":
        {
            "Generated" :
            {
            }
        },	
        "__ItemCollection__" : 
        [
            {
                "__ItemName__" : "__ItemName__"
            }
        ]
    }`;
        this.availableTasks = [];
        // Template specific 
        this.warning_message = '';
        this.Templates = null;
        this.DirtyTemplate = false;
        this.TemplateVariables = { 'Columns': [] }; // varibles in json area
        this.SelectedTemplate = null;
        /* Structured content business */
        this.Marking = [{ markers: ['!===========', '===========', '===========!'], 'type': 'replace' },
            { markers: ['@{', '}@'], 'type': 'replace' },
            { markers: ['@~', '~@~', '~@~', '~@'], 'type': '3per' },
            { markers: ['@``', '``@``', '``@'], 'type': 'replace' },
            { markers: ['@##', '##@'], 'type': 'replace' }
        ];
        this.Structure = [];
        this.Printed = {};
        this.textarea_content = '';
        this.Nos = new Array();
        this.Level = 0;
        console.log('AJP - Registring template processor commands ...');
        context.subscriptions.push(vscode.commands.registerCommand('templateProcessor.enable', this.enable), vscode.commands.registerCommand('templateProcessor.disable', this.disable), vscode.commands.registerCommand('templateProcessor.toggle', this.toggle), vscode.commands.registerCommand('templateProcessor.processTemplate', (document) => {
            let fileExtension = '';
            if (document != undefined && document.fileName != undefined && document.fileName.lastIndexOf('.') > -1) {
                fileExtension = document.fileName.substring(document.fileName.lastIndexOf('.') + 1);
            }
            if (fileExtension == vscode.workspace.getConfiguration('templateProcessor').templateFilesExtension) {
                this.processTemplate(document);
            }
        }));
    }
    enable() {
        console.log('* enable');
        vscode.workspace.getConfiguration('templateProcessor').update('on', true, true);
        vscode.window.setStatusBarMessage("Trigger process template on save Enabled", 1000);
    }
    disable() {
        console.log('* disable');
        vscode.workspace.getConfiguration('templateProcessor').update('on', false, true);
        vscode.window.setStatusBarMessage("Trigger process template on save Disabled", 1000);
    }
    toggle() {
        console.log('* toggle');
        if (vscode.workspace.getConfiguration('templateProcessor').get('on')) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    deactivate() {
    }
    activate(context) {
    }
    processTemplate(document) {
        var onFormat = vscode.workspace.getConfiguration('templateProcessor').on;
        if (onFormat) {
            const content = document.getText();
            const lines = content.split(/\r?\n/);
            let result = '';
            lines.forEach(line => {
                result += '<div>' + line + '</div>';
            });
            this.SelectedTemplate = { Content: content };
            this.BuildTemplate();
            const processed = this.ApplyTemplate();
            const outputPath = document.fileName.replace('.' + vscode.workspace.getConfiguration('templateProcessor').templateFilesExtension, '.' + vscode.workspace.getConfiguration('templateInterpreter').templateReadyFilesExtension);
            const fileExistsOriginal = fs.existsSync(outputPath);
            fs.writeFile(outputPath, processed, { flag: 'w' }, function (err) {
                if (err) {
                    throw err;
                }
                if (!fileExistsOriginal) {
                    console.log('AJP - File was created: ' + outputPath);
                }
            });
        }
    }
    BuildTemplate() {
        if (this.SelectedTemplate) {
            const Result = this.SelectedTemplate.Content.substring(1, this.SelectedTemplate.Content.length - 1);
            const Lines = Result.split(/\r?\n/);
            let VariablesOutput = '';
            let isInBlock = -1;
            const VariablesBlock = [];
            for (let l = 0; l < Lines.length; l++) {
                if (Lines[l].indexOf('============== Vars') > -1) {
                    if (Lines[l].indexOf(' begin') > -1) {
                        isInBlock++;
                        VariablesBlock[isInBlock] = '';
                    }
                    if (Lines[l].indexOf(' end') > -1) {
                        // VariablesOutput += ExpandBlock(VariablesBlock[isInBlock]);
                        isInBlock--;
                    }
                }
                else {
                    if (isInBlock >= 0) {
                        VariablesBlock[isInBlock] += Lines[l] + ' \n';
                    }
                    else {
                        VariablesOutput += Lines[l] + ' \n';
                    }
                }
            }
            if (VariablesBlock.length > 0) {
                this.TemplateVariables = JSON.parse(VariablesBlock[0]);
                // TemplateVariables = JSON.parse(VariablesBlock[0].replace(/\\t/g, '\t').replace(/\\n/g, '\n').replace(/\\\'/g, ''')
                // .replace(/\//g, '/'));
            }
        }
    }
    ApplyTemplate() {
        let warning_message = '';
        const Result = this.AddFormat(this.SelectedTemplate.Content.substring(1, this.SelectedTemplate.Content.length - 1));
        const TemplateLines = Result.split(/\r?\n/);
        const TemplateOutput = '';
        const block = '';
        const ExpansionBlocks = [];
        const FragmentLines = [];
        const FragmentRepetitions = 1;
        let ignore = false;
        // Detect the template section in the docuent, ignoring the input JSON that contain variables.
        // The starting section, with the input JSON contain the variables for the template.
        // If other variables are provided, the new JSON object will be used instead.
        for (let l = 0; l < TemplateLines.length; l++) {
            if (TemplateLines[l].indexOf('==============&nbsp;Vars') > -1) {
                if (TemplateLines[l].indexOf('&nbsp;begin') > -1) {
                    ignore = true;
                }
                if (TemplateLines[l].indexOf('&nbsp;end') > -1) {
                    ignore = false;
                    continue;
                }
            }
            if (ignore) {
                continue;
            }
            FragmentLines.push(TemplateLines[l]);
        }
        let content = Result.substring(Result.indexOf('=================&nbsp;Vars&nbsp;end') + 36);
        this.Structure = this.ParseToStructure((content));
        let MyFragment;
        if (this.Structure[0].children[0].type !== 0) {
            MyFragment = this.Structure[0];
        }
        else {
            MyFragment = this.GetLocalFragmentByPath(this.Structure[0], 'Main');
        }
        MyFragment.variables = this.TemplateVariables;
        let processed = this.Reduce(MyFragment, (content), null);
        vscode.window.showInformationMessage(warning_message);
        return processed;
    }
    GetLocalFragmentByPath(Freagment, Path) {
        let FragmentFound = null;
        if (Path[0] === '.') {
            // relative path
            for (let i = 0; i < Freagment.children.length; i++) {
                if (Freagment.children[i]['name'] === Path) {
                    FragmentFound = Freagment.children[i];
                }
            }
        }
        else {
            for (let i = 0; i < this.Structure[0].children.length; i++) {
                if (this.Structure[0].children[i]['name'] === Path) {
                    FragmentFound = this.Structure[0].children[i];
                }
            }
        }
        return FragmentFound;
    }
    ParseToStructure(content) {
        let index = 0;
        let tryMore = true;
        const level = 0;
        const Structure = [];
        Structure.push({ type: -1, positions: [0, 0], nextAncor: 0, parent: Structure, children: [] });
        let CurrentF = Structure[0];
        let isInStartingMarker = false;
        let isInMarker = false;
        let isInEndingMarker = false;
        if (content == undefined) {
            var d = 0;
        }
        while (index < content.length && tryMore) {
            tryMore = false; // assume is last try
            let nextMarkerPosition = -1;
            let type = null;
            let nextAncor = 0;
            // Try my continuation
            if (CurrentF.type > -1 && CurrentF.nextAncor < this.Marking[CurrentF.type].markers.length) {
                const startingPos = content.indexOf(this.Marking[CurrentF.type].markers[CurrentF.nextAncor], index);
                if (startingPos > -1 && (startingPos < nextMarkerPosition || nextMarkerPosition < 0)) {
                    nextMarkerPosition = startingPos;
                    type = CurrentF.type;
                    nextAncor = CurrentF.nextAncor + 1;
                    isInStartingMarker = true;
                    isInMarker = false;
                    isInEndingMarker = false;
                    tryMore = true; // you fond something
                }
            }
            // Try other starts
            for (let a = 0; a < this.Marking.length; a++) {
                const ancor = 0;
                if (a === CurrentF.type) {
                    // Can I include myself ?
                    // ancor = CurrentF.nextAncor;
                }
                else {
                    // ancor = 0;
                }
                const startingPos = content.indexOf(this.Marking[a].markers[ancor], index);
                if (startingPos > -1 && (startingPos < nextMarkerPosition || nextMarkerPosition < 0)) {
                    nextMarkerPosition = startingPos;
                    type = a;
                    nextAncor = ancor + 1;
                    isInStartingMarker = true;
                    isInMarker = false;
                    isInEndingMarker = false;
                    tryMore = true; // you fond something
                }
            }
            if (type === null) {
                // Nothig found
                break;
            }
            const markerLength = this.Marking[type].markers[nextAncor - 1].length;
            if (type < 2 && nextAncor === 1) {
                // markerLength = content.indexOf('\n', nextMarkerPosition + markerLength) + 5 - nextMarkerPosition;
            }
            if (nextAncor === 1) {
                const Child = {
                    type: type,
                    positions: [nextMarkerPosition, nextMarkerPosition + markerLength],
                    parent: CurrentF,
                    children: [],
                    nextAncor: nextAncor
                };
                CurrentF.children.push(Child);
                CurrentF = Child;
            }
            else if (nextAncor < this.Marking[type].markers.length) {
                CurrentF.positions.push(nextMarkerPosition);
                CurrentF.positions.push(nextMarkerPosition + markerLength);
                CurrentF.nextAncor = nextAncor;
            }
            else if (nextAncor === this.Marking[type].markers.length) {
                CurrentF.positions.push(nextMarkerPosition);
                CurrentF.positions.push(nextMarkerPosition + markerLength);
                CurrentF.nextAncor = nextAncor;
                const segment = content.substr(nextMarkerPosition, markerLength);
                const outerContent = content.substr(CurrentF.positions[0], nextMarkerPosition + markerLength - CurrentF.positions[0]);
                CurrentF.outerContent = outerContent;
                const innerContent = content.substr(CurrentF.positions[1], nextMarkerPosition - CurrentF.positions[1]);
                CurrentF.innerContent = innerContent;
                CurrentF = CurrentF.parent;
            }
            const segment = content.substr(nextMarkerPosition, markerLength);
            index = nextMarkerPosition + markerLength;
            const marker = nextMarkerPosition;
        }
        ;
        for (let i = 0; i < Structure[0].children.length; i++) {
            this.LabelFragments(Structure[0].children[i]);
        }
        return Structure;
    }
    LabelFragments(CurrentF) {
        const content = CurrentF.innerContent;
        const fragmentName = this.RemoveFormat(content.substr(0, CurrentF.positions[2] - CurrentF.positions[1])).trim();
        CurrentF['name'] = fragmentName;
        return CurrentF;
    }
    RemoveFormat(Result) {
        Result = Result.replace(/&nbsp;/g, ' ');
        Result = Result.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '\t');
        Result = Result.replace(/&lt;/g, '<');
        return Result;
    }
    Reduce(CurrentF, content, noFormat_offset) {
        let replacement = '';
        if (noFormat_offset == null) {
            noFormat_offset = 0;
        }
        let ref_index = 1;
        if (CurrentF.type === 0) {
            ref_index = 3;
        }
        let expression = content;
        if (CurrentF.positions.length > 2) {
            expression = content.substr(CurrentF.positions[ref_index], CurrentF.positions[CurrentF.positions.length - 2] - CurrentF.positions[ref_index]);
        }
        let offset = 0;
        for (let i = 0; i < CurrentF.children.length; i++) {
            let varset;
            if (CurrentF.children[i].type === 0) {
                varset = this.RemoveFormat(content.substr(CurrentF.children[i].positions[1], CurrentF.children[i].positions[2]
                    - CurrentF.children[i].positions[1])).trim();
                let instructions = {};
                if (varset.indexOf(' ') > -1) {
                    instructions = eval(varset.substr(varset.indexOf(' ') + 1));
                    varset = varset.substr(0, varset.indexOf(' '));
                }
                this.Printed[varset] = -1;
                const varsOrder = this.ListVariablesToApply(CurrentF, { varset: varset, instructions: instructions });
                for (let k = 0; k < varsOrder.length; k++) {
                    this.Printed[varset]++;
                    CurrentF.children[i].variables = varsOrder[k];
                    replacement += this.Reduce(CurrentF.children[i], content, (CurrentF.children[i].type === 2 || CurrentF.children[i].type === 3 ? CurrentF.children[i].positions[2] : noFormat_offset));
                    const checkempty = replacement.replace(/<\/span>/g, '')
                        .replace(/<span style="color:black">/g, '')
                        .replace(/<span class="template_uppercase">/g, '')
                        .replace(/&nbsp;/g, '')
                        .replace(/<\/br>/g, '');
                    if (checkempty.trim().length === 0) {
                        this.Printed[varset]--;
                    }
                }
                if (replacement !== '') {
                    // replacement = replacement.substr(6);
                }
                // {
                const ff = CurrentF.positions.length - 1;
                const pre = expression.length;
                expression = expression.substr(0, offset
                    + (CurrentF.children[i].positions[0] - CurrentF.positions[ref_index]))
                    + replacement
                    + expression.substr(offset
                        + (CurrentF.children[i].positions[CurrentF.children[i].positions.length - 1]
                            - CurrentF.positions[ref_index]));
                offset += expression.length - pre;
            }
            else {
                CurrentF.children[i].variables = CurrentF.variables;
                replacement = this.Reduce(CurrentF.children[i], content, (CurrentF.children[i].type === 2 || CurrentF.children[i].type === 3 ? CurrentF.children[i].positions[2] : noFormat_offset));
                const pre1 = expression.length;
                let ff1 = 1;
                let bb = 0;
                if (CurrentF.type === 0) {
                    ff1 = CurrentF.positions.length - 3;
                    bb = ref_index;
                }
                if (CurrentF.type === 2) {
                    ff1 = 1;
                    bb = 1;
                }
                expression = expression.substr(0, offset + (CurrentF.children[i].positions[0] - CurrentF.positions[ff1]))
                    + replacement + expression.substr(offset
                    + (CurrentF.children[i].positions[CurrentF.children[i].positions.length - 1]
                        - CurrentF.positions[bb]));
                offset += expression.length - pre1;
            }
        }
        if (CurrentF.positions[0] < noFormat_offset) {
            replacement = expression;
        }
        else {
            replacement = expression;
        }
        switch (CurrentF.type) {
            case 0:
                // This is a fragment. I already parsed it.
                break;
            case 1:
                // @{Name}@    // This is a simple variable replacement.
                replacement = this.ReplaceProperties(expression, CurrentF.variables, (noFormat_offset > 0));
                break;
            case 2:
                // @~ Name=='T1' ? ~@~ Yes ~@~ No ~@
                // Conditional evaluation
                replacement = this.EvaluateConditional(expression, CurrentF);
                break;
            case 3:
                // @`` Dictionary_To_Use ``@`` Key_To_Use ``@
                // Import from dictionary
                replacement = this.ImportFromDictionary(expression, CurrentF);
                const Structure2 = this.ParseToStructure(replacement);
                Structure2[0].variables = CurrentF.variables;
                replacement = this.Reduce(Structure2[0], (replacement), null);
                break;
            case 4:
                // @## index ##@
                // Output the result of evaluation
                replacement = eval(this.RemoveFormat(expression));
                break;
        }
        return replacement;
    }
    ReplaceProperties(expression, variables, noFormat) {
        if (typeof (noFormat) === 'undefined') {
            noFormat = false;
        }
        let prefix = this.UseHTMLCecorators ? '<span class="template_uppercase">' : '';
        let sufix = this.UseHTMLCecorators ? '</span>' : '';
        if (noFormat) {
            prefix = '';
            sufix = '';
        }
        if (expression.indexOf('Skeep') > 0) {
        }
        for (const property in variables) {
            if (variables.hasOwnProperty(property)) {
                if (typeof (variables[property]) === 'string') {
                    //expression = expression.replace(new RegExp('' + property + '', 'g'), '<span style='color:red'>' + variables[property].toUpperCase() + '</span>' );
                    expression = expression.replace(new RegExp('' + property + '', 'g'), prefix + variables[property] + sufix);
                    //expression = expression.replace(new RegExp('@\\[' + property + '\\]@', 'g'), '<span style='color:red'>' + variables[property].toLowerCase() + '</span>' );
                }
                else if (typeof (variables[property]) === 'number') {
                    expression = expression.replace(new RegExp('' + property + '', 'g'), prefix + variables[property] + sufix);
                }
                else if (typeof (variables[property]) === 'boolean') {
                    //expression = expression.replace(new RegExp('' + property + '', 'g'), '<span style='color:red'>' + (variables[property]?'TRUE':'FALSE') + '</span>' );
                    expression = expression.replace(new RegExp('' + property + '', 'g'), prefix + variables[property] + sufix);
                    //expression = expression.replace(new RegExp('@\\[' + property + '\\]@', 'g'), '<span style='color:red'>' + (variables[property]?'true':'false') + '</span>' );
                }
            }
        }
        ;
        return expression;
    }
    EvaluateConditional(expression, CurrentF) {
        let pureConditional = false;
        let fragments = expression.split('~@~');
        try {
            if (eval(this.RemoveFormat(fragments[0]))) {
                return fragments[1];
            }
            else {
                return fragments[2];
            }
        }
        catch (Exception) {
        }
    }
    ImportFromDictionary(expression, CurrentF) {
        if (expression == "Generated``@``<span class=\"template_uppercase\">input_text_control</span>") {
            var d = 0;
        }
        let result = null;
        const pureConditional = false;
        const fragments = expression.split('``@``');
        fragments[1] = this.RemoveFormat(fragments[1]);
        let Dictionary = null;
        let Curr = CurrentF;
        // Search in DataContext
        while (Dictionary === null && Curr !== null) {
            if (Curr.variables.hasOwnProperty('Translates')) {
                Dictionary = Curr.variables['Translates'];
            }
            Curr = Curr.parent;
        }
        if (Dictionary.hasOwnProperty(fragments[0])) {
            result = Dictionary[fragments[0]][fragments[1]];
        }
        // Search in same file
        if (result === null) {
            const Fragment = this.GetLocalFragmentByPath(CurrentF, fragments[1]);
            if (Fragment !== null) {
                if (typeof (Fragment) !== 'undefined') {
                    result = Fragment.innerContent.substring(Fragment.positions[3] - Fragment.positions[1]);
                    result = result.replace(/<\/br>/g, '');
                    result = this.RemoveFormat(result);
                }
            }
        }
        if (result === null) {
            this.warning_message += 'Missing template\: ' + fragments[1] + '<br>';
            result = '';
        }
        return result;
    }
    ListVariablesToApply(CurrentF, specifications) {
        const List = [];
        for (let property in CurrentF.variables[specifications.varset]) {
            let specs = null;
            for (let i = 0; i < specifications.instructions.length; i++) {
                if (specifications.instructions[i].item === CurrentF.variables[specifications.varset][property].Name) {
                    specs = specifications.instructions[i];
                }
            }
            let repetitions = specs === null ? 1 : specs.repetitions;
            for (let i = 0; i < repetitions; i++) {
                List.push(CurrentF.variables[specifications.varset][property]);
            }
        }
        return List;
    }
    AddFormat(Result) {
        Result = Result.replace(/</g, '&lt;');
        Result = Result.replace(/ /g, '&nbsp;');
        Result = Result.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        Result = Result.replace(/\n/g, '</br>\n');
        return Result;
    }
}
exports.TemplateProcessor = TemplateProcessor;
//# sourceMappingURL=templateProcessor.js.map