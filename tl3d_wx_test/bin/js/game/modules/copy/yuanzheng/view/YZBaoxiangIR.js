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
    var YZBaoxiangIR = /** @class */ (function (_super) {
        __extends(YZBaoxiangIR, _super);
        function YZBaoxiangIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(YZBaoxiangIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        YZBaoxiangIR.prototype.refreshView = function () {
            var _this = this;
            var info = this.dataSource;
            if (info) {
                this.icon.skin = SkinUtil.getTaskBaoxiang(4, info.isReward());
                this.ani_jiangli.visible = info.isCanReward();
                if (info.isCanReward()) {
                    this.ani_jiangli.loadAnimation(ResConst.anim_baoxiang, Handler.create(null, function () {
                        _this.ani_jiangli.play(0, true);
                    }), ResConst.atlas_baoxiang);
                    this.ani1.play(0, true);
                }
                else {
                    this.ani_jiangli.stop();
                    this.ani1.stop();
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.ani_jiangli.stop();
                this.ani1.stop();
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        YZBaoxiangIR.prototype.onClick = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.GUANQIA_REWARD, this));
        };
        return YZBaoxiangIR;
    }(ui.yuanzheng.BaoxiangIRUI));
    game.YZBaoxiangIR = YZBaoxiangIR;
})(game || (game = {}));
