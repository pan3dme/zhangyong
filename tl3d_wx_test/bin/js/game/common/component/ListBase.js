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
    var ListBase = /** @class */ (function (_super) {
        __extends(ListBase, _super);
        function ListBase() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ListBase.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            /** 重写 */
            set: function (value) {
                if (this._selectedIndex != value) {
                    // 验证不通过,不能选中
                    if (this.verifyHandler && !this.verifyHandler.runWith(value)) {
                        return;
                    }
                    this._selectedIndex = value;
                    this.changeSelectStatus();
                    this.event(Laya.Event.CHANGE);
                    this.selectHandler && this.selectHandler.runWith(value);
                    //选择发生变化，自动渲染一次
                    this.startIndex = this._startIndex;
                }
            },
            enumerable: true,
            configurable: true
        });
        return ListBase;
    }(Laya.List));
    common.ListBase = ListBase;
})(common || (common = {}));
