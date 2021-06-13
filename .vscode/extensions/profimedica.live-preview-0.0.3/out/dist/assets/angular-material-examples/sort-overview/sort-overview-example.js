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
 * @title Sorting overview
 */
let SortOverviewExample = class SortOverviewExample {
    constructor() {
        this.desserts = [
            { name: 'Frozen yogurt',
                calories: '159',
                fat: '6',
                carbs: '24',
                protein: '4'
            },
            { name: 'Ice cream sandwich',
                calories: '237',
                fat: '9',
                carbs: '37',
                protein: '4'
            },
            { name: 'Eclair',
                calories: '262',
                fat: '16',
                carbs: '24',
                protein: '6'
            },
            { name: 'Cupcake',
                calories: '305',
                fat: '4',
                carbs: '67',
                protein: '4'
            },
            { name: 'Gingerbread',
                calories: '356',
                fat: '16',
                carbs: '49',
                protein: '4'
            }
        ];
        this.sortedData = this.desserts.slice();
    }
    sortData(sort) {
        const data = this.desserts.slice();
        if (!sort.active || sort.direction == '') {
            this.sortedData = data;
            return;
        }
        this.sortedData = data.sort((a, b) => {
            let isAsc = sort.direction == 'asc';
            switch (sort.active) {
                case 'name':
                    return compare(a.name, b.name, isAsc);
                case 'calories':
                    return compare(+a.calories, +b.calories, isAsc);
                case 'fat':
                    return compare(+a.fat, +b.fat, isAsc);
                case 'carbs':
                    return compare(+a.carbs, +b.carbs, isAsc);
                case 'protein':
                    return compare(+a.protein, +b.protein, isAsc);
                default:
                    return 0;
            }
        });
    }
};
SortOverviewExample = __decorate([
    core_1.Component({
        selector: 'sort-overview-example',
        templateUrl: 'sort-overview-example.html',
        styleUrls: ['sort-overview-example.css']
    })
], SortOverviewExample);
exports.SortOverviewExample = SortOverviewExample;
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
//# sourceMappingURL=sort-overview-example.js.map