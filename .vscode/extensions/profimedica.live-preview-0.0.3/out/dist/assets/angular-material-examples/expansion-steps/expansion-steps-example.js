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
 * @title Expansion panel as accordion
 */
let ExpansionStepsExample = class ExpansionStepsExample {
    /**
     * @title Expansion panel as accordion
     */
    constructor() {
        this.step = 0;
    }
    setStep(index) {
        this.step = index;
    }
    nextStep() {
        this.step++;
    }
    prevStep() {
        this.step--;
    }
};
ExpansionStepsExample = __decorate([
    core_1.Component({
        selector: 'expansion-steps-example',
        templateUrl: 'expansion-steps-example.html',
        styleUrls: ['expansion-steps-example.css']
    })
], ExpansionStepsExample);
exports.ExpansionStepsExample = ExpansionStepsExample;
//# sourceMappingURL=expansion-steps-example.js.map