"use strict";
// add the following line for intellisense
// <reference path="../../vscode.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.Marking = [{ markers: ['/*////////////////', '===========', '////////////////*/'], 'type': 'replace' }
        ];
        this.Structure = [];
        this.Printed = {};
        this.textarea_content = '';
        this.Nos = new Array();
        this.Level = 0;
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
}
exports.TemplateProcessor = TemplateProcessor;
//# sourceMappingURL=templateHelper.js.map