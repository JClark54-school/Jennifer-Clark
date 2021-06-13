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
 * @title Datepicker Min Max
 */
let DatepickerMinMaxExample = class DatepickerMinMaxExample {
    /**
     * @title Datepicker Min Max
     */
    constructor() {
        this.minDate = new Date(2000, 0, 1);
        this.maxDate = new Date(2020, 0, 1);
    }
};
DatepickerMinMaxExample = __decorate([
    core_1.Component({
        selector: 'datepicker-min-max-example',
        templateUrl: 'datepicker-min-max-example.html',
        styleUrls: ['datepicker-min-max-example.css']
    })
], DatepickerMinMaxExample);
exports.DatepickerMinMaxExample = DatepickerMinMaxExample;
//# sourceMappingURL=datepicker-min-max-example.js.map