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
/**
 * @title Slide-toggle with forms
 */
let SlideToggleFormsExample = class SlideToggleFormsExample {
    constructor(formBuilder) {
        this.isChecked = true;
        this.formGroup = formBuilder.group({
            enableWifi: '',
            acceptTerms: ['', forms_1.Validators.requiredTrue]
        });
    }
    onFormSubmit(formValue) {
        alert(JSON.stringify(formValue, null, 2));
    }
};
SlideToggleFormsExample = __decorate([
    core_1.Component({
        selector: 'slide-toggle-forms-example',
        templateUrl: './slide-toggle-forms-example.html',
        styleUrls: ['./slide-toggle-forms-example.css']
    })
], SlideToggleFormsExample);
exports.SlideToggleFormsExample = SlideToggleFormsExample;
//# sourceMappingURL=slide-toggle-forms-example.js.map