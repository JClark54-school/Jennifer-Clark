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
 * @title SVG icons
 */
let IconSvgExample = class IconSvgExample {
    constructor(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/images/examples/thumbup-icon.svg'));
    }
};
IconSvgExample = __decorate([
    core_1.Component({
        selector: 'icon-svg-example',
        templateUrl: 'icon-svg-example.html'
    })
], IconSvgExample);
exports.IconSvgExample = IconSvgExample;
//# sourceMappingURL=icon-svg-example.js.map