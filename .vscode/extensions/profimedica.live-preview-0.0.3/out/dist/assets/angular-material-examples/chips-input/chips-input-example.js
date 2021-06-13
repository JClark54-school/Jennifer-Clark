"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const keycodes_1 = require("@angular/cdk/keycodes");
const COMMA = 188;
/**
 * @title Chips with input
 */
let ChipsInputExample = class ChipsInputExample {
    /**
     * @title Chips with input
     */
    constructor() {
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        // Enter, comma
        this.separatorKeysCodes = [keycodes_1.ENTER, COMMA];
        this.fruits = [
            { name: 'Lemon' },
            { name: 'Lime' },
            { name: 'Apple' }
        ];
    }
    add(event) {
        let input = event.input;
        let value = event.value;
        // Add our person
        if ((value || '').trim()) {
            this.fruits.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    remove(fruit) {
        let index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }
};
ChipsInputExample = __decorate([
    core_1.Component({
        selector: 'chips-input-example',
        templateUrl: 'chips-input-example.html',
        styleUrls: ['chips-input-example.css']
    })
], ChipsInputExample);
exports.ChipsInputExample = ChipsInputExample;
//# sourceMappingURL=chips-input-example.js.map