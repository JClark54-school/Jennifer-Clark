"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
class TemplateInterpreter {
    constructor(context) {
        this.context = context;
        this.Markers = {
            StartingMarker: ['\nFile: ', '\n'],
            FileMarker: ['\nFile: ', '\n'],
            SectionMarker: ['AJP-SECTION ', '\n'],
            CodeFragmentMarker: ['---------------------------', '---------------------------']
        };
        console.log('AJP - Registring template interpreter commands ...');
        context.subscriptions.push(vscode.commands.registerCommand('templateInterpreter.enable', this.enable), vscode.commands.registerCommand('templateInterpreter.disable', this.disable), vscode.commands.registerCommand('templateInterpreter.toggle', this.toggle), vscode.commands.registerCommand('templateInterpreter.applyTemplate', (document) => {
            let fileExtension = '';
            if (document != undefined && document.fileName != undefined && document.fileName.lastIndexOf('.') > -1) {
                fileExtension = document.fileName.substring(document.fileName.lastIndexOf('.') + 1);
            }
            if (fileExtension == vscode.workspace.getConfiguration('templateInterpreter').templateReadyFilesExtension) {
                this.applyTemplate(document);
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
    applyTemplate(document) {
        let content = document.getText();
        let nextFilePosition = content.indexOf(this.Markers.StartingMarker[0]);
        while (nextFilePosition > -1) {
            nextFilePosition += this.Markers.StartingMarker[0].length;
            this.CurrentFile = content.substring(nextFilePosition, content.indexOf(this.Markers.StartingMarker[1], nextFilePosition)).trim();
            content = content.substring(content.indexOf(this.Markers.StartingMarker[1], nextFilePosition));
            nextFilePosition = content.indexOf(this.Markers.SectionMarker[0]);
            this.CurrentSection = content.substring(nextFilePosition, content.indexOf(this.Markers.SectionMarker[1], nextFilePosition)).trim();
            content = content.substring(content.indexOf(this.Markers.SectionMarker[1], nextFilePosition));
            nextFilePosition = content.indexOf(this.Markers.CodeFragmentMarker[0]);
            nextFilePosition += this.Markers.CodeFragmentMarker[0].length;
            this.CurrentCodeFragment = content.substring(nextFilePosition, content.indexOf(this.Markers.CodeFragmentMarker[1], nextFilePosition));
            this.CurrentCodeFragment = this.CurrentCodeFragment.substring(this.CurrentCodeFragment.indexOf('\n') + 1);
            this.CurrentCodeFragment = this.CurrentCodeFragment.substring(0, this.CurrentCodeFragment.lastIndexOf('\n'));
            content = content.substring(content.indexOf(this.Markers.CodeFragmentMarker[1], nextFilePosition));
            this.injectIntoFile(this.CurrentFile, this.CurrentSection, this.CurrentCodeFragment);
            nextFilePosition = content.indexOf(this.Markers.StartingMarker[0]);
        }
    }
    injectIntoFile(relativeFilePath, insertionMarker, codeFragment) {
        const absoluteFilePath = 'c:\\PRO\\ANG\\material\\IonicHelloWorld\\IonicHelloWorld\\' + relativeFilePath;
        if (fs.existsSync(absoluteFilePath)) {
            // read file
            let fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
            // seek to end of marker
            let markerPosition = fileContent.indexOf(insertionMarker);
            markerPosition = fileContent.indexOf('\n', markerPosition) + 1;
            // Insert code
            fileContent = fileContent.substring(0, markerPosition) + codeFragment + fileContent.substring(markerPosition);
            fs.writeFileSync(absoluteFilePath, fileContent, 'utf-8');
        }
        else {
            console.log('AJP - No such file to be updated: ' + absoluteFilePath);
        }
    }
}
exports.TemplateInterpreter = TemplateInterpreter;
//# sourceMappingURL=templateInterpreter.js.map