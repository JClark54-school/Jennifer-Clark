"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
require("rxjs/add/operator/first");
const copier_service_1 = require("../../../../../core/components/copier/copier.service");
const example_components_1 = require("../example-components");
require("prismjs/components/prism-scss");
require("prismjs/components/prism-typescript");
const animations_1 = require("../../../../../core/animations");
let FuseExampleViewerComponent = class FuseExampleViewerComponent {
    constructor(snackbar, copier, _resolver) {
        this.snackbar = snackbar;
        this.copier = copier;
        this._resolver = _resolver;
        this.selectedIndex = 0;
        /** Whether the source for the example is being displayed. */
        this.showSource = false;
    }
    get container() {
        return this._previewContainer;
    }
    set container(value) {
        this._previewContainer = value;
    }
    get example() {
        return this._example;
    }
    set example(example) {
        if (example && example_components_1.EXAMPLE_COMPONENTS[example]) {
            this._example = example;
            this.exampleData = example_components_1.EXAMPLE_COMPONENTS[example];
        }
        else {
            console.log('MISSING EXAMPLE: ', example);
        }
    }
    toggleSourceView() {
        this.showSource = !this.showSource;
    }
    copySource(text) {
        if (this.copier.copyText(text)) {
            this.snackbar.open('Code copied', '', { duration: 2500 });
        }
        else {
            this.snackbar.open('Copy failed. Please try again!', '', { duration: 2500 });
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const cmpFactory = this._resolver.resolveComponentFactory(this.exampleData.component);
            this.previewRef = this._previewContainer.createComponent(cmpFactory);
        }, 0);
    }
    ngOnDestroy() {
        if (this.previewRef) {
            this.previewRef.destroy();
        }
    }
};
__decorate([
    core_1.ViewChild('previewContainer', { read: core_1.ViewContainerRef })
], FuseExampleViewerComponent.prototype, "_previewContainer", void 0);
__decorate([
    core_1.Input()
], FuseExampleViewerComponent.prototype, "example", null);
FuseExampleViewerComponent = __decorate([
    core_1.Component({
        selector: 'fuse-example-viewer',
        templateUrl: './example-viewer.html',
        styleUrls: ['./example-viewer.scss'],
        providers: [copier_service_1.CopierService],
        encapsulation: core_1.ViewEncapsulation.None,
        animations: animations_1.fuseAnimations
    })
], FuseExampleViewerComponent);
exports.FuseExampleViewerComponent = FuseExampleViewerComponent;
//# sourceMappingURL=example-viewer.js.map