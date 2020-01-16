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
    var ZhaohuanBoxIR = /** @class */ (function (_super) {
        __extends(ZhaohuanBoxIR, _super);
        function ZhaohuanBoxIR() {
            var _this = _super.call(this) || this;
            _this._startTime = 0;
            _this._glowFilter = new Laya.GlowFilter("#ffff00", 16, -1.5, -1.5);
            return _this;
        }
        Object.defineProperty(ZhaohuanBoxIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                // 是否第一次设置数据
                if (!this._dataSource && $value) {
                    this.visible = false;
                }
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        ZhaohuanBoxIR.prototype.refreshData = function () {
            if (this._dataSource) {
                // this.ui_headbox.dataSource = this._dataSource;
                // this.ani_good.visible = this._dataSource.getStar() >= 4;
                // this.ani_good.stop();
                // if (this._dataSource.getStar() >= 4) {
                //     this.ani_good.play(0, true);
                // }
                this.ui_card.dataSource = this._dataSource;
                if (this._dataSource.getStar() > 4) {
                    //设置滤镜集合为发光滤镜
                    Laya.timer.loop(1, this, this.update);
                    this._startTime = Laya.timer.currTimer;
                    this.update();
                }
                else {
                    this.ui_card.filters = null;
                    Laya.timer.clear(this, this.update);
                }
            }
            else {
                this.visible = false;
                this.ui_card.dataSource = null;
                Laya.timer.clear(this, this.update);
            }
        };
        ZhaohuanBoxIR.prototype.update = function () {
            var difft = Laya.timer.currTimer - this._startTime;
            if (difft < 0)
                difft = 0;
            difft = difft % ZhaohuanBoxIR.TURN_TIME;
            var per = 0;
            var halfTime = ZhaohuanBoxIR.TURN_TIME / 2;
            if (difft > halfTime) {
                per = (ZhaohuanBoxIR.TURN_TIME - difft) / halfTime;
            }
            else {
                per = difft / halfTime;
            }
            this._glowFilter.blur = ZhaohuanBoxIR.BLUR_MIN + (ZhaohuanBoxIR.BLUR_MAX - ZhaohuanBoxIR.BLUR_MIN) * per;
            this.ui_card.filters = [this._glowFilter];
        };
        ZhaohuanBoxIR.BLUR_MIN = 3;
        ZhaohuanBoxIR.BLUR_MAX = 16;
        ZhaohuanBoxIR.TURN_TIME = 1200;
        return ZhaohuanBoxIR;
    }(ui.zhaohuan.render.ZhaohuanBoxUI));
    game.ZhaohuanBoxIR = ZhaohuanBoxIR;
})(game || (game = {}));
