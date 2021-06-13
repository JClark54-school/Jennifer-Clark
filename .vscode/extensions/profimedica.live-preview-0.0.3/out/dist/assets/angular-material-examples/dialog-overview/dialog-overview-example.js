"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
/**
 * @title Dialog Overview
 */
let DialogOverviewExample = class DialogOverviewExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: {
                name: this.name,
                animal: this.animal
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
};
DialogOverviewExample = __decorate([
    core_1.Component({
        selector: 'dialog-overview-example',
        templateUrl: 'dialog-overview-example.html'
    })
], DialogOverviewExample);
exports.DialogOverviewExample = DialogOverviewExample;
let DialogOverviewExampleDialog = class DialogOverviewExampleDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
DialogOverviewExampleDialog = __decorate([
    core_1.Component({
        selector: 'dialog-overview-example-dialog',
        templateUrl: 'dialog-overview-example-dialog.html'
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
], DialogOverviewExampleDialog);
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
//# sourceMappingURL=dialog-overview-example.js.map