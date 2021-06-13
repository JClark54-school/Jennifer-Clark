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
const collections_2 = require("@angular/cdk/collections");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
/**
 * @title Feature-rich data table
 */
let TableOverviewExample = class TableOverviewExample {
    /**
     * @title Feature-rich data table
     */
    constructor() {
        this.displayedColumns = ['select', 'userId', 'userName', 'progress', 'color'];
        this.exampleDatabase = new ExampleDatabase();
        this.selection = new collections_2.SelectionModel(true, []);
    }
    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
            if (!this.dataSource) {
                return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
    isAllSelected() {
        if (!this.dataSource) {
            return false;
        }
        if (this.selection.isEmpty()) {
            return false;
        }
        if (this.filter.nativeElement.value) {
            return this.selection.selected.length == this.dataSource.renderedData.length;
        }
        else {
            return this.selection.selected.length == this.exampleDatabase.data.length;
        }
    }
    masterToggle() {
        if (!this.dataSource) {
            return;
        }
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else if (this.filter.nativeElement.value) {
            this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
        }
        else {
            this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
        }
    }
};
__decorate([
    core_1.ViewChild(material_1.MatPaginator)
], TableOverviewExample.prototype, "paginator", void 0);
__decorate([
    core_1.ViewChild(material_1.MatSort)
], TableOverviewExample.prototype, "sort", void 0);
__decorate([
    core_1.ViewChild('filter')
], TableOverviewExample.prototype, "filter", void 0);
TableOverviewExample = __decorate([
    core_1.Component({
        selector: 'table-overview-example',
        styleUrls: ['table-overview-example.css'],
        templateUrl: 'table-overview-example.html'
    })
], TableOverviewExample);
exports.TableOverviewExample = TableOverviewExample;
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
        setTimeout(() => {
            for (let i = 0; i < 100; i++) {
                this.addUser();
            }
        });
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
    constructor(_exampleDatabase, _paginator, _sort) {
        super();
        this._exampleDatabase = _exampleDatabase;
        this._paginator = _paginator;
        this._sort = _sort;
        this._filterChange = new BehaviorSubject_1.BehaviorSubject('');
        this.filteredData = [];
        this.renderedData = [];
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
    get filter() {
        return this._filterChange.value;
    }
    set filter(filter) {
        this._filterChange.next(filter);
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect() {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];
        return Observable_1.Observable.merge(...displayDataChanges).map(() => {
            // Filter data
            this.filteredData = this._exampleDatabase.data.slice().filter((item) => {
                let searchStr = (item.name + item.color).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
            // Sort filtered data
            const sortedData = this.sortData(this.filteredData.slice());
            // Grab the page's slice of the filtered sorted data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        });
    }
    disconnect() {
    }
    /** Returns a sorted copy of the database data. */
    sortData(data) {
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA = '';
            let propertyB = '';
            switch (this._sort.active) {
                case 'userId':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'userName':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'progress':
                    [propertyA, propertyB] = [a.progress, b.progress];
                    break;
                case 'color':
                    [propertyA, propertyB] = [a.color, b.color];
                    break;
            }
            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }
}
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=table-overview-example.js.map