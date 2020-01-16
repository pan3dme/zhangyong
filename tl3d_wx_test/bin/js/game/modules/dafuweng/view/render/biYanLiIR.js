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
    var biYanLiIR = /** @class */ (function (_super) {
        __extends(biYanLiIR, _super);
        function biYanLiIR() {
            var _this = _super.call(this) || this;
            _this._model = game.DafuwengModel.getInstance();
            _this.img_game.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        Object.defineProperty(biYanLiIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                if ($value) {
                    // this.ani1.play();
                }
                else {
                    this.ani1.stop();
                }
            },
            enumerable: true,
            configurable: true
        });
        biYanLiIR.prototype.onClick = function () {
            showToast(LanMgr.getLan('', 10285));
        };
        return biYanLiIR;
    }(ui.dafuweng.biYanLiIRUI));
    game.biYanLiIR = biYanLiIR;
})(game || (game = {}));
