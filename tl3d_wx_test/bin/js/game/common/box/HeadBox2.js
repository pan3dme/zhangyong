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
var common;
(function (common) {
    var HeadBox2 = /** @class */ (function (_super) {
        __extends(HeadBox2, _super);
        function HeadBox2() {
            return _super.call(this) || this;
        }
        Object.defineProperty(HeadBox2.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.hadBox.dataSource = data;
            },
            enumerable: true,
            configurable: true
        });
        return HeadBox2;
    }(ui.box.HeadBox2UI));
    common.HeadBox2 = HeadBox2;
})(common || (common = {}));
