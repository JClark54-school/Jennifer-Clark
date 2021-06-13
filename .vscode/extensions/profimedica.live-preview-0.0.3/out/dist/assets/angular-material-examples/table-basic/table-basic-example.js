"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const collections_1 = require("@angular/cdk/collections");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
/**
 * @title Basic table
 */
let TableBasicExample = class TableBasicExample {
    /**
     * @title Basic table
     */
    constructor() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new ExampleDataSource();
    }
};
TableBasicExample = __decorate([
    core_1.Component({
        selector: 'table-basic-example',
        styleUrls: ['table-basic-example.css'],
        templateUrl: 'table-basic-example.html'
    })
], TableBasicExample);
exports.TableBasicExample = TableBasicExample;
const data = [
    { position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H'
    },
    { position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He'
    },
    { position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li'
    },
    { position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be'
    },
    { position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B'
    },
    { position: 6,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C'
    },
    { position: 7,
        name: 'Nitrogen',
        weight: 14.0067,
        symbol: 'N'
    },
    { position: 8,
        name: 'Oxygen',
        weight: 15.9994,
        symbol: 'O'
    },
    { position: 9,
        name: 'Fluorine',
        weight: 18.9984,
        symbol: 'F'
    },
    { position: 10,
        name: 'Neon',
        weight: 20.1797,
        symbol: 'Ne'
    },
    { position: 11,
        name: 'Sodium',
        weight: 22.9897,
        symbol: 'Na'
    },
    { position: 12,
        name: 'Magnesium',
        weight: 24.305,
        symbol: 'Mg'
    },
    { position: 13,
        name: 'Aluminum',
        weight: 26.9815,
        symbol: 'Al'
    },
    { position: 14,
        name: 'Silicon',
        weight: 28.0855,
        symbol: 'Si'
    },
    { position: 15,
        name: 'Phosphorus',
        weight: 30.9738,
        symbol: 'P'
    },
    { position: 16,
        name: 'Sulfur',
        weight: 32.065,
        symbol: 'S'
    },
    { position: 17,
        name: 'Chlorine',
        weight: 35.453,
        symbol: 'Cl'
    },
    { position: 18,
        name: 'Argon',
        weight: 39.948,
        symbol: 'Ar'
    },
    { position: 19,
        name: 'Potassium',
        weight: 39.0983,
        symbol: 'K'
    },
    { position: 20,
        name: 'Calcium',
        weight: 40.078,
        symbol: 'Ca'
    }
];
/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
class ExampleDataSource extends collections_1.DataSource {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect() {
        return Observable_1.Observable.of(data);
    }
    disconnect() {
    }
}
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=table-basic-example.js.map