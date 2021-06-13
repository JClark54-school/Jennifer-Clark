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
 * @title Select in a form
 */
let SelectFormExample = class SelectFormExample {
    /**
     * @title Select in a form
     */
    constructor() {
        this.foods = [
            { value: 'steak-0',
                viewValue: 'Steak'
            },
            { value: 'pizza-1',
                viewValue: 'Pizza'
            },
            { value: 'tacos-2',
                viewValue: 'Tacos'
            }
        ];
    }
};
SelectFormExample = __decorate([
    core_1.Component({
        selector: 'select-form-example',
        templateUrl: 'select-form-example.html'
    })
], SelectFormExample);
exports.SelectFormExample = SelectFormExample;
//# sourceMappingURL=select-form-example.js.map