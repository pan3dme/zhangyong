var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var common;
(function (common) {
    var TabIR1 = /** @class */ (function (_super) {
        __extends(TabIR1, _super);
        function TabIR1() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TabIR1.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        TabIR1.prototype.refreshData = function (item) {
            if (item) {
                this.btn_tab.label = item[0];
                if (item[1] != "") {
                    this.redpoint.setRedPointName(item[1]);
                }
                else {
                    this.redpoint.onDispose();
                }
            }
            else {
                this.redpoint.onDispose();
            }
        };
        return TabIR1;
    }(ui.box.TabIR1UI));
    common.TabIR1 = TabIR1;
})(common || (common = {}));
