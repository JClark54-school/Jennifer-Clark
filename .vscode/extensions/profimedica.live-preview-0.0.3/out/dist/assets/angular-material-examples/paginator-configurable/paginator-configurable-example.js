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
 * @title Configurable paginator
 */
let PaginatorConfigurableExample = class PaginatorConfigurableExample {
    /**
     * @title Configurable paginator
     */
    constructor() {
        // MatPaginator Inputs
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
    }
    setPageSizeOptions(setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
};
PaginatorConfigurableExample = __decorate([
    core_1.Component({
        selector: 'paginator-configurable-example',
        templateUrl: 'paginator-configurable-example.html'
    })
], PaginatorConfigurableExample);
exports.PaginatorConfigurableExample = PaginatorConfigurableExample;
//# sourceMappingURL=paginator-configurable-example.js.map