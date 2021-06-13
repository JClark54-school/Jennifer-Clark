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
 * @title Configurable progress-bar
 */
let ProgressBarConfigurableExample = class ProgressBarConfigurableExample {
    /**
     * @title Configurable progress-bar
     */
    constructor() {
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.bufferValue = 75;
    }
};
ProgressBarConfigurableExample = __decorate([
    core_1.Component({
        selector: 'progress-bar-configurable-example',
        templateUrl: 'progress-bar-configurable-example.html',
        styleUrls: ['progress-bar-configurable-example.css']
    })
], ProgressBarConfigurableExample);
exports.ProgressBarConfigurableExample = ProgressBarConfigurableExample;
//# sourceMappingURL=progress-bar-configurable-example.js.map