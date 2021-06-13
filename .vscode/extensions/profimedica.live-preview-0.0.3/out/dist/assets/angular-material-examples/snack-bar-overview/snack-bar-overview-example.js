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
 * @title Basic snack-bar
 */
let SnackBarOverviewExample = class SnackBarOverviewExample {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }
};
SnackBarOverviewExample = __decorate([
    core_1.Component({
        selector: 'snack-bar-overview-example',
        templateUrl: 'snack-bar-overview-example.html'
    })
], SnackBarOverviewExample);
exports.SnackBarOverviewExample = SnackBarOverviewExample;
//# sourceMappingURL=snack-bar-overview-example.js.map