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
 * @title Dynamic grid-list
 */
let GridListDynamicExample = class GridListDynamicExample {
    /**
     * @title Dynamic grid-list
     */
    constructor() {
        this.tiles = [
            { text: 'One',
                cols: 3,
                rows: 1,
                color: 'lightblue'
            },
            { text: 'Two',
                cols: 1,
                rows: 2,
                color: 'lightgreen'
            },
            { text: 'Three',
                cols: 1,
                rows: 1,
                color: 'lightpink'
            },
            { text: 'Four',
                cols: 2,
                rows: 1,
                color: '#DDBDF1'
            }
        ];
    }
};
GridListDynamicExample = __decorate([
    core_1.Component({
        selector: 'grid-list-dynamic-example',
        templateUrl: 'grid-list-dynamic-example.html'
    })
], GridListDynamicExample);
exports.GridListDynamicExample = GridListDynamicExample;
//# sourceMappingURL=grid-list-dynamic-example.js.map