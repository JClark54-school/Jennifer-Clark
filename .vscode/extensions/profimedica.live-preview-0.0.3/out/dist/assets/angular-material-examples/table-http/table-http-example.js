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
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
/**
 * @title Table retrieving data through HTTP
 */
let TableHttpExample = class TableHttpExample {
    constructor(http) {
        this.http = http;
        this.displayedColumns = ['created_at', 'state', 'number', 'title'];
    }
    ngOnInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http);
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    }
};
__decorate([
    core_1.ViewChild(material_1.MatPaginator)
], TableHttpExample.prototype, "paginator", void 0);
__decorate([
    core_1.ViewChild(material_1.MatSort)
], TableHttpExample.prototype, "sort", void 0);
TableHttpExample = __decorate([
    core_1.Component({
        selector: 'table-http-example',
        styleUrls: ['table-http-example.css'],
        templateUrl: 'table-http-example.html'
    })
], TableHttpExample);
exports.TableHttpExample = TableHttpExample;
/** An example database that the data source uses to retrieve data for the table. */
class ExampleHttpDao {
    constructor(http) {
        this.http = http;
    }
    getRepoIssues(sort, order, page) {
        const href = 'https://api.github.com/search/issues';
        const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get(requestUrl)
            .map(response => response.json());
    }
}
exports.ExampleHttpDao = ExampleHttpDao;
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleHttpDao. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
class ExampleDataSource extends collections_1.DataSource {
    constructor(exampleDatabase, paginator, sort) {
        super();
        this.exampleDatabase = exampleDatabase;
        this.paginator = paginator;
        this.sort = sort;
        // The number of issues returned by github matching the query.
        this.resultsLength = 0;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect() {
        const displayDataChanges = [
            this.sort.sortChange,
            this.paginator.page
        ];
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        return Observable_1.Observable.merge(...displayDataChanges)
            .startWith(null)
            .switchMap(() => {
            setTimeout(() => {
                this.isLoadingResults = true;
            });
            return this.exampleDatabase.getRepoIssues(this.sort.active, this.sort.direction, this.paginator.pageIndex);
        })
            .map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;
            return data.items;
        })
            .catch(() => {
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            setTimeout(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
            });
            return Observable_1.Observable.of([]);
        });
    }
    disconnect() {
    }
}
exports.ExampleDataSource = ExampleDataSource;
//# sourceMappingURL=table-http-example.js.map