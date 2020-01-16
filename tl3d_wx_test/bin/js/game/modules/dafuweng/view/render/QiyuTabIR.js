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
    var QiyuTabIR = /** @class */ (function (_super) {
        __extends(QiyuTabIR, _super);
        function QiyuTabIR() {
            var _this = _super.call(this) || this;
            _this._endTime = 0;
            return _this;
        }
        Object.defineProperty(QiyuTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        QiyuTabIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this._endTime = info.svo.limitTime;
                Laya.timer.loop(1000, this, this.updateTime);
                this.updateTime();
                this.img.skin = SkinUtil.getQiyuSkin(info.tbRisk.type);
                this.animSelect.play(0, true);
            }
            else {
                Laya.timer.clearAll(this);
                this._endTime = 0;
                this.animSelect.stop();
            }
        };
        QiyuTabIR.prototype.updateTime = function () {
            var time = this._endTime - App.serverTimeSecond;
            this.lbTime.text = GameUtil.toCountdown(time, "hh:mm:ss");
        };
        return QiyuTabIR;
    }(ui.dafuweng.QiyuTabIRUI));
    game.QiyuTabIR = QiyuTabIR;
})(game || (game = {}));
