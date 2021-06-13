"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const shared_module_1 = require("../../../../core/modules/shared.module");
const widget_module_1 = require("../../../../core/components/widget/widget.module");
const angular_material_component_1 = require("app/main/content/components/angular-material/angular-material.component");
const example_viewer_1 = require("./example-viewer/example-viewer");
const example_components_1 = require("./example-components");
const routes = [
    {
        path: 'components/angular-material',
        children: [
            {
                path: ':id',
                component: angular_material_component_1.FuseAngularMaterialComponent
            }
        ]
    }
];
let FuseAngularMaterialModule = class FuseAngularMaterialModule {
};
FuseAngularMaterialModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild(routes),
            widget_module_1.FuseWidgetModule
        ],
        exports: [
            shared_module_1.SharedModule
        ],
        entryComponents: example_components_1.EXAMPLE_LIST,
        declarations: [
            [...example_components_1.EXAMPLE_LIST],
            angular_material_component_1.FuseAngularMaterialComponent,
            example_viewer_1.FuseExampleViewerComponent
        ]
    })
], FuseAngularMaterialModule);
exports.FuseAngularMaterialModule = FuseAngularMaterialModule;
//# sourceMappingURL=angular-material.module.js.map