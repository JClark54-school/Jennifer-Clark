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
 * @title Input Clearable
 */
let InputClearableExample = class InputClearableExample {
    /**
     * @title Input Clearable
     */
    constructor() {
        this.value = 'Clear me';
    }
};
InputClearableExample = __decorate([
    core_1.Component({
        selector: 'input-clearable-example',
        templateUrl: './input-clearable-example.html',
        styleUrls: ['./input-clearable-example.css']
    })
], InputClearableExample);
exports.InputClearableExample = InputClearableExample;
//# sourceMappingURL=input-clearable-example.js.map