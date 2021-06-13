"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * @title Input Errors
 */
let InputErrorsExample = class InputErrorsExample {
    /**
     * @title Input Errors
     */
    constructor() {
        this.emailFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.pattern(EMAIL_REGEX)
        ]);
    }
};
InputErrorsExample = __decorate([
    core_1.Component({
        selector: 'input-errors-example',
        templateUrl: 'input-errors-example.html',
        styleUrls: ['input-errors-example.css']
    })
], InputErrorsExample);
exports.InputErrorsExample = InputErrorsExample;
//# sourceMappingURL=input-errors-example.js.map