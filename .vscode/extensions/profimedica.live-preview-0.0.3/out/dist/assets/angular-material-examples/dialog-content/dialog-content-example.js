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
 * @title Dialog with header, scrollable content and actions
 */
let DialogContentExample = class DialogContentExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
            height: '350px'
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
};
DialogContentExample = __decorate([
    core_1.Component({
        selector: 'dialog-content-example',
        templateUrl: 'dialog-content-example.html'
    })
], DialogContentExample);
exports.DialogContentExample = DialogContentExample;
let DialogContentExampleDialog = class DialogContentExampleDialog {
};
DialogContentExampleDialog = __decorate([
    core_1.Component({
        selector: 'dialog-content-example-dialog',
        templateUrl: 'dialog-content-example-dialog.html'
    })
], DialogContentExampleDialog);
exports.DialogContentExampleDialog = DialogContentExampleDialog;
//# sourceMappingURL=dialog-content-example.js.map