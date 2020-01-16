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
/**
* name
*/
var common;
(function (common) {
    var HeadNameBox = /** @class */ (function (_super) {
        __extends(HeadNameBox, _super);
        function HeadNameBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(HeadNameBox.prototype, "img_shangzhen", {
            //出战图片
            get: function () {
                return this.ui_head.img_shangzhen;
            },
            enumerable: true,
            configurable: true
        });
        HeadNameBox.prototype.getDataSource = function () {
            return this._dataSource;
        };
        Object.defineProperty(HeadNameBox.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                this._dataSource = data;
                this.ui_head.dataSource = data;
                if (data) {
                    this.lab_name.text = data.getName();
                }
                else {
                    this.lab_name.text = "";
                }
            },
            enumerable: true,
            configurable: true
        });
        return HeadNameBox;
    }(ui.box.HeadNameBoxUI));
    common.HeadNameBox = HeadNameBox;
})(common || (common = {}));
