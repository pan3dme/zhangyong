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
    var ZheKouIR = /** @class */ (function (_super) {
        __extends(ZheKouIR, _super);
        function ZheKouIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ZheKouIR.prototype, "dataSource", {
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
        ZheKouIR.prototype.refreshData = function () {
            var info = this._dataSource;
            if (info) {
                if (info[0] >= 7) {
                    this.lb_zhe.color = "#e691f6";
                    this.lb_zhe.color = ColorConst.getLimiteBuyZheKouColor(1);
                    this.lb_zhe.stroke = 2;
                    this.lb_zhe.strokeColor = "#830072";
                    this.lb_zhe.strokeColor = ColorConst.getLimiteBuyZheKouColor(2);
                }
                else {
                    this.lb_zhe.color = ColorConst.getLimiteBuyZheKouColor(3);
                    this.lb_zhe.stroke = 2;
                    this.lb_zhe.strokeColor = ColorConst.getLimiteBuyZheKouColor(4);
                }
                this.lb_zhe.text = info[0] + '折';
                if (info[1] == 0) {
                    this.lb_num.text = "";
                }
                else {
                    this.lb_num.text = info[1] + '';
                }
            }
            else {
            }
        };
        return ZheKouIR;
    }(ui.activity.limitebuy.render.ZheKouIRUI));
    game.ZheKouIR = ZheKouIR;
})(game || (game = {}));
