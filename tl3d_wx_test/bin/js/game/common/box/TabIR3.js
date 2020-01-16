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
    var TabIR3 = /** @class */ (function (_super) {
        __extends(TabIR3, _super);
        function TabIR3() {
            var _this = _super.call(this) || this;
            _this._isSelect = false;
            return _this;
        }
        Object.defineProperty(TabIR3.prototype, "dataSource", {
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
        TabIR3.prototype.refreshData = function (item) {
            if (item) {
                this.lab_tab.text = item.label;
                if (item.red && item.red != "") {
                    this.redpoint.setRedPointName(item.red);
                }
                else {
                    this.redpoint.onDispose();
                }
                var type = item.type != null ? item.type : TabIR3.TYPE_BOTTOM;
                switch (type) {
                    case TabIR3.TYPE_BOTTOM:
                        this.img_bg.scaleY = 1;
                        this.lab_tab.y = 23;
                        break;
                    case TabIR3.TYPE_TOP:
                        this.img_bg.scaleY = -1;
                        this.lab_tab.y = 32;
                        break;
                }
            }
            else {
                this.redpoint.onDispose();
            }
        };
        TabIR3.prototype.setSelect = function (val) {
            if (this._isSelect == val)
                return;
            this._isSelect = val;
            if (val) {
                this.img_bg.skin = SkinUtil.fenye_down;
                this.lab_tab.color = "#7e5336";
            }
            else {
                this.img_bg.skin = SkinUtil.fenye_up;
                this.lab_tab.color = "#e6ca91";
            }
        };
        TabIR3.onSelectCell = function (cells, selectIndex) {
            if (!cells || cells.length < 1)
                return;
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if (cell) {
                    cell.setSelect(i == selectIndex);
                }
            }
        };
        TabIR3.TYPE_TOP = 0; //上标签
        TabIR3.TYPE_BOTTOM = 1; //底标签
        return TabIR3;
    }(ui.box.TabIR3UI));
    common.TabIR3 = TabIR3;
})(common || (common = {}));
