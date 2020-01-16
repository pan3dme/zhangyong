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
    var TabBase = /** @class */ (function (_super) {
        __extends(TabBase, _super);
        function TabBase() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TabBase.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            /** 重写 */
            set: function (value) {
                if (this._selectedIndex != value) {
                    if (value == -1) {
                        this.toSelect(value);
                        return;
                    }
                    // 验证不通过,不能选中
                    if (this.verifyHandler && !this.verifyHandler.runWith(value)) {
                        return;
                    }
                    if (this.onSelectBefore) {
                        this.onSelectBefore(value, this.toSelect.bind(this, value));
                    }
                    else {
                        this.toSelect(value);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        TabBase.prototype.toSelect = function (value) {
            this.setSelect(this._selectedIndex, false);
            this._selectedIndex = value;
            this.setSelect(value, true);
            this.event(Laya.Event.CHANGE);
            this.selectHandler && this.selectHandler.runWith(this._selectedIndex);
        };
        return TabBase;
    }(Laya.Tab));
    common.TabBase = TabBase;
})(common || (common = {}));
