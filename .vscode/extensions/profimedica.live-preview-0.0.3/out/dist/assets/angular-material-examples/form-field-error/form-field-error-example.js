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
/** @title Form field with error messages */
let FormFieldErrorExample = class FormFieldErrorExample {
    /** @title Form field with error messages */
    constructor() {
        this.email = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]);
    }
    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
};
FormFieldErrorExample = __decorate([
    core_1.Component({
        selector: 'form-field-error-example',
        templateUrl: 'form-field-error-example.html',
        styleUrls: ['form-field-error-example.css']
    })
], FormFieldErrorExample);
exports.FormFieldErrorExample = FormFieldErrorExample;
//# sourceMappingURL=form-field-error-example.js.map