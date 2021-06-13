"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const coercion_1 = require("@angular/cdk/coercion");
const core_1 = require("@angular/core");
const form_field_1 = require("@angular/material/form-field");
const Subject_1 = require("rxjs/Subject");
/** Data structure for holding telephone number. */
class MyTel {
    constructor(area, exchange, subscriber) {
        this.area = area;
        this.exchange = exchange;
        this.subscriber = subscriber;
    }
}
exports.MyTel = MyTel;
/** Custom `MatFormFieldControl` for telephone number input. */
let MyTelInput = MyTelInput_1 = class MyTelInput {
    constructor(fb, fm, elRef, renderer) {
        this.fm = fm;
        this.elRef = elRef;
        this.stateChanges = new Subject_1.Subject();
        this.focused = false;
        this.ngControl = null;
        this.errorState = false;
        this.controlType = 'my-tel-input';
        this.id = `my-tel-input-${MyTelInput_1.nextId++}`;
        this.describedBy = '';
        this._required = false;
        this._disabled = false;
        this.parts = fb.group({
            'area': '',
            'exchange': '',
            'subscriber': ''
        });
        fm.monitor(elRef.nativeElement, renderer, true).subscribe((origin) => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }
    get empty() {
        let n = this.parts.value;
        return !n.area && !n.exchange && !n.subscriber;
    }
    get shouldPlaceholderFloat() {
        return this.focused || !this.empty;
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coercion_1.coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(dis) {
        this._disabled = coercion_1.coerceBooleanProperty(dis);
        this.stateChanges.next();
    }
    get value() {
        let n = this.parts.value;
        if (n.area.length == 3 && n.exchange.length == 3 && n.subscriber.length == 4) {
            return new MyTel(n.area, n.exchange, n.subscriber);
        }
        return null;
    }
    set value(tel) {
        tel = tel || new MyTel('', '', '');
        this.parts.setValue({
            area: tel.area,
            exchange: tel.exchange,
            subscriber: tel.subscriber
        });
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick(event) {
        if (event.target.tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    }
};
MyTelInput.nextId = 0;
__decorate([
    core_1.Input()
], MyTelInput.prototype, "placeholder", null);
__decorate([
    core_1.Input()
], MyTelInput.prototype, "required", null);
__decorate([
    core_1.Input()
], MyTelInput.prototype, "disabled", null);
__decorate([
    core_1.Input()
], MyTelInput.prototype, "value", null);
MyTelInput = MyTelInput_1 = __decorate([
    core_1.Component({
        selector: 'my-tel-input',
        templateUrl: 'form-field-custom-control-example.html',
        styleUrls: ['form-field-custom-control-example.css'],
        providers: [
            {
                provide: form_field_1.MatFormFieldControl,
                useExisting: MyTelInput_1
            }
        ],
        host: {
            '[class.floating]': 'shouldPlaceholderFloat',
            '[id]': 'id',
            '[attr.aria-describedby]': 'describedBy'
        }
    })
], MyTelInput);
exports.MyTelInput = MyTelInput;
/** @title Form field with custom telephone number input control. */
let FormFieldCustomControlExample = class FormFieldCustomControlExample {
};
FormFieldCustomControlExample = __decorate([
    core_1.Component({
        selector: 'form-field-custom-control-example',
        template: `
    <mat-form-field>
      <my-tel-input placeholder="Phone number" required></my-tel-input>
      <mat-icon matSuffix>phone</mat-icon>
      <mat-hint>Include area code</mat-hint>
    </mat-form-field>
  `
    })
], FormFieldCustomControlExample);
exports.FormFieldCustomControlExample = FormFieldCustomControlExample;
var MyTelInput_1;
//# sourceMappingURL=form-field-custom-control-example.js.map