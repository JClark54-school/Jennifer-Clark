"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/**
 * @title Dialog elements
 */
let DialogElementsExample = class DialogElementsExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        this.dialog.open(DialogElementsExampleDialog);
    }
};
DialogElementsExample = __decorate([
    core_1.Component({
        selector: 'dialog-elements-example',
        templateUrl: 'dialog-elements-example.html'
    })
], DialogElementsExample);
exports.DialogElementsExample = DialogElementsExample;
let DialogElementsExampleDialog = class DialogElementsExampleDialog {
};
DialogElementsExampleDialog = __decorate([
    core_1.Component({
        selector: 'dialog-elements-example-dialog',
        templateUrl: 'dialog-elements-example-dialog.html'
    })
], DialogElementsExampleDialog);
exports.DialogElementsExampleDialog = DialogElementsExampleDialog;
//# sourceMappingURL=dialog-elements-example.js.map