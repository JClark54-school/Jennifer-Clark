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
const material_1 = require("@angular/material");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
/**
 * @title Table with pagination
 */
let TablePaginationExample = class TablePaginationExample {
    /**
     * @title Table with pagination
     */
    constructor() {
        this.displayedColumns = ['userId', 'userName', 'progress', 'color'];
        this.exampleDatabase = new ExampleDatabase();
    }
    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
    }
};
__decorate([
    core_1.ViewChild(material_1.MatPaginator)
], TablePaginationExample.prototype, "paginator", void 0);
TablePaginationExample = __decorate([
    core_1.Component({
        selector: 'table-pagination-example',
        styleUrls: ['table-pagination-example.css'],
        templateUrl: 'table-pagination-example.html'
    })
], TablePaginationExample);
exports.TablePaginationExample = TablePaginationExample;
/** Constants used to fill up our data base. */
const COLORS = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
/** An example database that the data source uses to retrieve data for the table. */
class ExampleDatabase {
    constructor() {
        /** Stream that emits whenever the data has been modified. */
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
        // Fill up the database with 100 users.
        for (let i = 0; i < 100; i++) {
            this.addUser();
        }
    }
    get data() {
        return this.dataChange.value;
    }
    /** Adds a new user to the database. */
    addUser() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser());
        this.dataChange.next(copiedData);
    }
    /** Builds and returns a new User. */
    createNewUser() {
        const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
        return {
            id: (this.data.length + 1).toString(),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
        };
    }
}
exports.ExampleDatabase = ExampleDatabase;
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
class ExampleDataSource extends collections_1.DataSource {
    constructor(_exampleDatabase, _paginator) {
        super();
        this._exampleDatabase = _exampleDatabase;
        this._paginator = _paginator;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect() {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._paginator.page
        ];
        return Observable_1.Observable.merge(...displayDataChanges).map(() => {
            const data = this._exampleDatabase.data.slice();
            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }
    disconnect() {
    }
}
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=table-pagination-example.js.map