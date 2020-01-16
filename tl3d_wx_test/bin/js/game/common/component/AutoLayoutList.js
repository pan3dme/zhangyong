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
    var AutoLayoutList = /** @class */ (function (_super) {
        __extends(AutoLayoutList, _super);
        function AutoLayoutList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AutoLayoutList.prototype.AutoLayout = function (parentWidth, arr) {
            if (arr === void 0) { arr = null; }
            if (!arr)
                arr = this.array;
            var num = arr ? arr.length : 0;
            var sjw = 0;
            if (num > 0) {
                if (num < this.repeatX) {
                    var cell = this.getCell(0);
                    sjw = (cell.width + this.spaceX) * num - this.spaceX;
                }
                else {
                    sjw = this.width;
                }
            }
            this.x = (parentWidth - sjw) / 2;
        };
        return AutoLayoutList;
    }(Laya.List));
    common.AutoLayoutList = AutoLayoutList;
})(common || (common = {}));
