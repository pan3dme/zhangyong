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
var game;
(function (game) {
    var godBuzhenIR = /** @class */ (function (_super) {
        __extends(godBuzhenIR, _super);
        function godBuzhenIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(godBuzhenIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        godBuzhenIR.prototype.refreshData = function (isEmpty) {
            if (isEmpty === void 0) { isEmpty = false; }
            if (this._dataSource) {
                var infoVo = this._dataSource;
                this.lbLock.visible = this.imgLock.visible = !infoVo.openflag;
                this.lbLock.text = infoVo.msg;
                this.lbEmpty.visible = isEmpty && infoVo.openflag;
                this.lbEmpty.text = infoVo.posDes;
            }
            else {
            }
        };
        return godBuzhenIR;
    }(ui.box.BuzhenBoxUI));
    game.godBuzhenIR = godBuzhenIR;
})(game || (game = {}));
