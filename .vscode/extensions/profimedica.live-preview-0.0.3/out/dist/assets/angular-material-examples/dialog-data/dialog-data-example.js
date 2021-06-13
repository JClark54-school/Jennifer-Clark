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
 * @title Injecting data when opening a dialog
 */
let DialogDataExample = class DialogDataExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        this.dialog.open(DialogDataExampleDialog, {
            data: {
                animal: 'panda'
            }
        });
    }
};
DialogDataExample = __decorate([
    core_1.Component({
        selector: 'dialog-data-example',
        templateUrl: 'dialog-data-example.html'
    })
], DialogDataExample);
exports.DialogDataExample = DialogDataExample;
let DialogDataExampleDialog = class DialogDataExampleDialog {
    constructor(data) {
        this.data = data;
    }
};
DialogDataExampleDialog = __decorate([
    core_1.Component({
        selector: 'dialog-data-example-dialog',
        templateUrl: 'dialog-data-example-dialog.html'
    }),
    __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
], DialogDataExampleDialog);
exports.DialogDataExampleDialog = DialogDataExampleDialog;
//# sourceMappingURL=dialog-data-example.js.map