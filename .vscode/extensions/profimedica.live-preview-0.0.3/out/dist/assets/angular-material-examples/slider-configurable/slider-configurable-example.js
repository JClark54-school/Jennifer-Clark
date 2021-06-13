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
 * @title Configurable slider
 */
let SliderConfigurableExample = class SliderConfigurableExample {
    /**
     * @title Configurable slider
     */
    constructor() {
        this.autoTicks = false;
        this.disabled = false;
        this.invert = false;
        this.max = 100;
        this.min = 0;
        this.showTicks = false;
        this.step = 1;
        this.thumbLabel = false;
        this.value = 0;
        this.vertical = false;
        this._tickInterval = 1;
    }
    get tickInterval() {
        return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
    }
    set tickInterval(v) {
        this._tickInterval = Number(v);
    }
};
SliderConfigurableExample = __decorate([
    core_1.Component({
        selector: 'slider-configurable-example',
        templateUrl: 'slider-configurable-example.html',
        styleUrls: ['slider-configurable-example.css'],
        encapsulation: core_1.ViewEncapsulation.None,
        preserveWhitespaces: false
    })
], SliderConfigurableExample);
exports.SliderConfigurableExample = SliderConfigurableExample;
//# sourceMappingURL=slider-configurable-example.js.map