"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/map");
class User {
    constructor(name) {
        this.name = name;
    }
}
exports.User = User;
/**
 * @title Display value autocomplete
 */
let AutocompleteDisplayExample = class AutocompleteDisplayExample {
    /**
     * @title Display value autocomplete
     */
    constructor() {
        this.myControl = new forms_1.FormControl();
        this.options = [
            new User('Mary'),
            new User('Shelley'),
            new User('Igor')
        ];
    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .startWith(null)
            .map(user => user && typeof user === 'object' ? user.name : user)
            .map(name => name ? this.filter(name) : this.options.slice());
    }
    filter(name) {
        return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
    displayFn(user) {
        if (user) {
            return user.name;
        }
    }
};
AutocompleteDisplayExample = __decorate([
    core_1.Component({
        selector: 'autocomplete-display-example',
        templateUrl: 'autocomplete-display-example.html',
        styleUrls: ['autocomplete-display-example.css']
    })
], AutocompleteDisplayExample);
exports.AutocompleteDisplayExample = AutocompleteDisplayExample;
//# sourceMappingURL=autocomplete-display-example.js.map