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
 * @title Sidenav with a FAB
 */
let SidenavFabExample = class SidenavFabExample {
};
SidenavFabExample = __decorate([
    core_1.Component({
        selector: 'sidenav-fab-example',
        templateUrl: 'sidenav-fab-example.html',
        styleUrls: ['sidenav-fab-example.css'],
        encapsulation: core_1.ViewEncapsulation.None,
        preserveWhitespaces: false
    })
], SidenavFabExample);
exports.SidenavFabExample = SidenavFabExample;
//# sourceMappingURL=sidenav-fab-example.js.map