/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// <reference types="select2" />
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var NgSelect2Component = /** @class */ (function () {
    // private style = `CSS`;
    function NgSelect2Component(renderer, zone, _element) {
        this.renderer = renderer;
        this.zone = zone;
        this._element = _element;
        // value for placeholder
        this.placeholder = '';
        this.dropdownParent = '';
        this.allowClear = false;
        // enable / disable select2
        this.disabled = false;
        // emitter when value is changed
        this.valueChanged = new EventEmitter();
        this.element = undefined;
        this.check = false;
        this.propagateChange = function (value) { };
    }
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.element) {
            return;
        }
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // if (this.cssImport) {
        //   const head = document.getElementsByTagName('head')[0];
        //   const link: any = head.children[head.children.length - 1];
        //   if (!link.version) {
        //     const newLink = this.renderer.createElement(head, 'style');
        //     this.renderer.setElementProperty(newLink, 'type', 'text/css');
        //     this.renderer.setElementProperty(newLink, 'version', 'select2');
        //     this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
        //   }
        // }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            /** @type {?} */
            var newValue = this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            /** @type {?} */
            var newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.element.data('select2').$container.find('.select2-selection__placeholder').text(this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', function (e) {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            /** @type {?} */
            var newValue = _this.element.val();
            _this.valueChanged.emit({
                value: newValue,
                data: _this.element.select2('data'),
            });
            _this.propagateChange(newValue);
            _this.setElementValue(newValue);
        });
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.element.off('select2:select');
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.initPlugin = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log('Please add Select2 library (js file) to the project.' +
                    'You can download it from https://github.com/select2/select2/tree/master/dist/js.');
            }
            return;
        }
        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        /** @type {?} */
        var options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve',
            placeholder: this.placeholder
        };
        if (this.dropdownParent) {
            options = {
                data: this.data,
                width: (this.width) ? this.width : 'resolve',
                dropdownParent: jQuery('#' + this.dropdownParent),
            };
        }
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                options.matcher = oldMatcher(options.matcher);
                _this.element.select2(options);
                if (typeof _this.value !== 'undefined') {
                    _this.setElementValue(_this.value);
                }
            });
        }
        else {
            this.element.select2(options);
        }
        this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    NgSelect2Component.prototype.setElementValue = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        // this.zone.run(() => {
        var e_1, _a;
        if (Array.isArray(newValue)) {
            newValue = newValue.map(function (val) { return String(val); });
            try {
                for (var _b = tslib_1.__values(this.selector.nativeElement.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this.renderer.setElementProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgSelect2Component.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgSelect2Component.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.registerOnTouched = /**
     * @return {?}
     */
    function () {
    };
    NgSelect2Component.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select2',
                    template: "<select #selector>\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgSelect2Component; }),
                            multi: true,
                        },
                    ]
                }] }
    ];
    /** @nocollapse */
    NgSelect2Component.ctorParameters = function () { return [
        { type: Renderer },
        { type: NgZone },
        { type: ElementRef }
    ]; };
    NgSelect2Component.propDecorators = {
        selector: [{ type: ViewChild, args: ['selector',] }],
        data: [{ type: Input }],
        placeholder: [{ type: Input }],
        dropdownParent: [{ type: Input }],
        allowClear: [{ type: Input }],
        value: [{ type: Input }],
        width: [{ type: Input }],
        disabled: [{ type: Input }],
        options: [{ type: Input }],
        valueChanged: [{ type: Output }]
    };
    return NgSelect2Component;
}());
export { NgSelect2Component };
if (false) {
    /** @type {?} */
    NgSelect2Component.prototype.selector;
    /** @type {?} */
    NgSelect2Component.prototype.data;
    /** @type {?} */
    NgSelect2Component.prototype.placeholder;
    /** @type {?} */
    NgSelect2Component.prototype.dropdownParent;
    /** @type {?} */
    NgSelect2Component.prototype.allowClear;
    /** @type {?} */
    NgSelect2Component.prototype.value;
    /** @type {?} */
    NgSelect2Component.prototype.width;
    /** @type {?} */
    NgSelect2Component.prototype.disabled;
    /** @type {?} */
    NgSelect2Component.prototype.options;
    /** @type {?} */
    NgSelect2Component.prototype.valueChanged;
    /** @type {?} */
    NgSelect2Component.prototype.element;
    /** @type {?} */
    NgSelect2Component.prototype.check;
    /** @type {?} */
    NgSelect2Component.prototype.propagateChange;
    /** @type {?} */
    NgSelect2Component.prototype.renderer;
    /** @type {?} */
    NgSelect2Component.prototype.zone;
    /** @type {?} */
    NgSelect2Component.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGx1cml0ZWNoL25nLXNlbGVjdDIvIiwic291cmNlcyI6WyJsaWIvbmctc2VsZWN0Mi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUNMLFVBQVUsRUFFVix1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBQ04sUUFBUSxFQUVSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXpFO0lBNENFLHlCQUF5QjtJQUV6Qiw0QkFBb0IsUUFBa0IsRUFBUyxJQUFZLEVBQVMsUUFBb0I7UUFBcEUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFZOztRQTFCL0UsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFHcEIsZUFBVSxHQUFHLEtBQUssQ0FBQzs7UUFTbkIsYUFBUSxHQUFHLEtBQUssQ0FBQzs7UUFNaEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBDLFlBQU8sR0FBUSxTQUFTLENBQUM7UUFDekIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQStLdEIsb0JBQWUsR0FBRyxVQUFDLEtBQVUsSUFBTyxDQUFDLENBQUM7SUEzS3RDLENBQUM7Ozs7SUFFRCxzQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7SUFDSCxDQUFDOzs7O0lBRUQscUNBQVE7OztJQUFSO1FBQ0Usd0JBQXdCO1FBQ3hCLDJEQUEyRDtRQUMzRCwrREFBK0Q7UUFFL0QseUJBQXlCO1FBQ3pC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UTtnQkFMUixNQUFNO2dCQUhOLFVBQVU7OzsyQkFpQ1QsU0FBUyxTQUFDLFVBQVU7dUJBR3BCLEtBQUs7OEJBR0wsS0FBSztpQ0FFTCxLQUFLOzZCQUdMLEtBQUs7d0JBR0wsS0FBSzt3QkFHTCxLQUFLOzJCQUdMLEtBQUs7MEJBR0wsS0FBSzsrQkFHTCxNQUFNOztJQTJMVCx5QkFBQztDQUFBLEFBbk9ELElBbU9DO1NBdE5ZLGtCQUFrQjs7O0lBQzdCLHNDQUE0Qzs7SUFHNUMsa0NBQXdDOztJQUd4Qyx5Q0FBMEI7O0lBRTFCLDRDQUE2Qjs7SUFHN0Isd0NBQTRCOztJQUc1QixtQ0FBa0M7O0lBR2xDLG1DQUF1Qjs7SUFHdkIsc0NBQTBCOztJQUcxQixxQ0FBMEI7O0lBRzFCLDBDQUE0Qzs7SUFFNUMscUNBQWlDOztJQUNqQyxtQ0FBc0I7O0lBK0t0Qiw2Q0FBc0M7O0lBNUsxQixzQ0FBMEI7O0lBQUUsa0NBQW1COztJQUFFLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwic2VsZWN0MlwiIC8+XG5pbXBvcnQge1xuICBmb3J3YXJkUmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ3NlbGVjdDInO1xuaW1wb3J0IHsgU2VsZWN0Mk9wdGlvbkRhdGEgfSBmcm9tICcuL25nLXNlbGVjdDIuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgalF1ZXJ5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXNlbGVjdDInLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctc2VsZWN0Mi5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0MkNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdDJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBEb0NoZWNrLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdG9yJykgc2VsZWN0b3I6IEVsZW1lbnRSZWY7XG5cbiAgLy8gZGF0YSBmb3Igc2VsZWN0MiBkcm9wIGRvd25cbiAgQElucHV0KCkgZGF0YTogQXJyYXk8U2VsZWN0Mk9wdGlvbkRhdGE+O1xuXG4gIC8vIHZhbHVlIGZvciBwbGFjZWhvbGRlclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIEBJbnB1dCgpIGRyb3Bkb3duUGFyZW50ID0gJyc7XG5cblxuICBASW5wdXQoKSBhbGxvd0NsZWFyID0gZmFsc2U7XG5cbiAgLy8gdmFsdWUgZm9yIHNlbGVjdDJcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8vIHdpZHRoIG9mIHNlbGVjdDIgaW5wdXRcbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcblxuICAvLyBlbmFibGUgLyBkaXNhYmxlIHNlbGVjdDJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvLyBhbGwgYWRkaXRpb25hbCBvcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE9wdGlvbnM7XG5cbiAgLy8gZW1pdHRlciB3aGVuIHZhbHVlIGlzIGNoYW5nZWRcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGVsZW1lbnQ6IGFueSA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjaGVjayA9IGZhbHNlO1xuICAvLyBwcml2YXRlIHN0eWxlID0gYENTU2A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gaWYgKHRoaXMuY3NzSW1wb3J0KSB7XG4gICAgLy8gICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAvLyAgIGNvbnN0IGxpbms6IGFueSA9IGhlYWQuY2hpbGRyZW5baGVhZC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcblxuICAgIC8vICAgaWYgKCFsaW5rLnZlcnNpb24pIHtcbiAgICAvLyAgICAgY29uc3QgbmV3TGluayA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChoZWFkLCAnc3R5bGUnKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3ZlcnNpb24nLCAnc2VsZWN0MicpO1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAnaW5uZXJIVE1MJywgdGhpcy5zdHlsZSk7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snZGF0YSddICYmIEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbJ2RhdGEnXS5wcmV2aW91c1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1snZGF0YSddLmN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuaW5pdFBsdWdpbigpO1xuXG4gICAgICBjb25zdCBuZXdWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcblxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBkYXRhOiB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGF0YScpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10gJiYgY2hhbmdlc1snZGlzYWJsZWQnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sncGxhY2Vob2xkZXInXSAmJiBjaGFuZ2VzWydwbGFjZWhvbGRlciddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuZGF0YSgnc2VsZWN0MicpLiRjb250YWluZXIuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19wbGFjZWhvbGRlcicpLnRleHQodGhpcy5wbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10gJiYgY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydkcm9wZG93blBhcmVudCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snYWxsb3dDbGVhciddICYmIGNoYW5nZXNbJ2FsbG93Q2xlYXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydhbGxvd0NsZWFyJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0galF1ZXJ5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5pbml0UGx1Z2luKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQub24oJ3NlbGVjdDI6c2VsZWN0IHNlbGVjdDI6dW5zZWxlY3QnLCAoZTogYW55KSA9PiB7XG4gICAgICAvLyBjb25zdCBuZXdWYWx1ZTogc3RyaW5nID0gKGUudHlwZSA9PT0gJ3NlbGVjdDI6dW5zZWxlY3QnKSA/ICcnIDogdGhpcy5lbGVtZW50LnZhbCgpO1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmVsZW1lbnQudmFsKCk7XG5cbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQoe1xuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXG4gICAgICAgIGRhdGE6IHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkYXRhJyksXG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZWxlbWVudC5vZmYoJ3NlbGVjdDI6c2VsZWN0Jyk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHVnaW4oKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc2VsZWN0Mikge1xuICAgICAgaWYgKCF0aGlzLmNoZWNrKSB7XG4gICAgICAgIHRoaXMuY2hlY2sgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIGFkZCBTZWxlY3QyIGxpYnJhcnkgKGpzIGZpbGUpIHRvIHRoZSBwcm9qZWN0LicgK1xuICAgICAgICAgICdZb3UgY2FuIGRvd25sb2FkIGl0IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NlbGVjdDIvc2VsZWN0Mi90cmVlL21hc3Rlci9kaXN0L2pzLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgc2VsZWN0MiBhbHJlYWR5IGluaXRpYWxpemVkIHJlbW92ZSBoaW0gYW5kIHJlbW92ZSBhbGwgdGFncyBpbnNpZGVcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0NsYXNzKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJykgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkZXN0cm95Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCAnJyk7XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnM6IE9wdGlvbnMgPSB7XG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmRyb3Bkb3duUGFyZW50KSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIHdpZHRoOiAodGhpcy53aWR0aCkgPyB0aGlzLndpZHRoIDogJ3Jlc29sdmUnLFxuICAgICAgICBkcm9wZG93blBhcmVudDogalF1ZXJ5KCcjJyArIHRoaXMuZHJvcGRvd25QYXJlbnQpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy5tYXRjaGVyKSB7XG4gICAgICBqUXVlcnkuZm4uc2VsZWN0Mi5hbWQucmVxdWlyZShbJ3NlbGVjdDIvY29tcGF0L21hdGNoZXInXSwgKG9sZE1hdGNoZXI6IGFueSkgPT4ge1xuICAgICAgICBvcHRpb25zLm1hdGNoZXIgPSBvbGRNYXRjaGVyKG9wdGlvbnMubWF0Y2hlcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XG4gIH1cblxuICBwcml2YXRlIHNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcblxuICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLm1hcCh2YWwgPT4gU3RyaW5nKHZhbCkpO1xuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50Lm9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkob3B0aW9uLCAnc2VsZWN0ZWQnLCAobmV3VmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZS5zZWxlY3QyJyk7XG4gICAgfVxuICAgIC8vIH0pO1xuICB9XG5cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcblxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvcGFnYXRlQ2hhbmdlID0gKHZhbHVlOiBhbnkpID0+IHsgfTtcblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIHRoaXMudmFsdWVDaGFuZ2VkLnN1YnNjcmliZShmbik7XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZCgpIHtcbiAgfVxufVxuIl19