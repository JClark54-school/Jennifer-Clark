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
 * @title Simple autocomplete
 */
let AutocompleteSimpleExample = class AutocompleteSimpleExample {
    /**
     * @title Simple autocomplete
     */
    constructor() {
        this.myControl = new forms_1.FormControl();
        this.options = [
            'One',
            'Two',
            'Three'
        ];
    }
};
AutocompleteSimpleExample = __decorate([
    core_1.Component({
        selector: 'autocomplete-simple-example',
        templateUrl: 'autocomplete-simple-example.html',
        styleUrls: ['autocomplete-simple-example.css']
    })
], AutocompleteSimpleExample);
exports.AutocompleteSimpleExample = AutocompleteSimpleExample;
//# sourceMappingURL=autocomplete-simple-example.js.map