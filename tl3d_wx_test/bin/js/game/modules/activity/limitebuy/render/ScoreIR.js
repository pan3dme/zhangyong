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
    var ScoreIR = /** @class */ (function (_super) {
        __extends(ScoreIR, _super);
        function ScoreIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ScoreIR.prototype, "dataSource", {
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
        ScoreIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var model = game.LimiteBuyModel.getInstance();
                //这里要进行判断是否已领取
                if (model.isReward(info.ID)) {
                    this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4, true);
                    this.img_guang.visible = false;
                    this.img_redpoint.visible = false;
                    Laya.timer.clearAll(this);
                }
                else {
                    if (model.isCanReward(info.ID)) {
                        this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4, false);
                        this.img_guang.visible = true;
                        this.img_redpoint.visible = true;
                        Laya.timer.loop(50, this, this.guangxiao);
                    }
                    else {
                        this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4, false);
                        this.img_guang.visible = false;
                        this.img_redpoint.visible = false;
                        Laya.timer.clearAll(this);
                    }
                }
                this.lb_costscore.text = info.score + '';
            }
            else {
                this.img_baoxiang.skin = SkinUtil.getTaskBaoxiang(4, true);
                this.img_guang.visible = false;
                this.lb_costscore.text = "";
                Laya.timer.clearAll(this);
            }
        };
        ScoreIR.prototype.guangxiao = function () {
            this.img_guang.rotation += 5;
        };
        return ScoreIR;
    }(ui.activity.limitebuy.render.ScoreIRUI));
    game.ScoreIR = ScoreIR;
})(game || (game = {}));
