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
 * @title Configurable checkbox
 */
let CheckboxConfigurableExample = class CheckboxConfigurableExample {
    /**
     * @title Configurable checkbox
     */
    constructor() {
        this.checked = false;
        this.indeterminate = false;
        this.align = 'start';
        this.disabled = false;
    }
};
CheckboxConfigurableExample = __decorate([
    core_1.Component({
        selector: 'checkbox-configurable-example',
        templateUrl: 'checkbox-configurable-example.html',
        styleUrls: ['checkbox-configurable-example.css']
    })
], CheckboxConfigurableExample);
exports.CheckboxConfigurableExample = CheckboxConfigurableExample;
//# sourceMappingURL=checkbox-configurable-example.js.map