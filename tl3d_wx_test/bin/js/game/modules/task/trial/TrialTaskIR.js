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
    var TrialTaskIR = /** @class */ (function (_super) {
        __extends(TrialTaskIR, _super);
        function TrialTaskIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TrialTaskIR.prototype, "dataSource", {
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
        TrialTaskIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.lbTitle.text = info.getTitle();
                this.lbGetNum.text = info.tbData.obtain_exp + "";
                this.lbCount.text = info.getNum() + "/" + info.tbData.num;
                this.pbNum.value = info.getNum() / info.tbData.num;
                var isFinish = info.isFinish();
                var isReward = info.isReward();
                this.lbContent.text = info.tbData.name;
                if (isReward) {
                    this.btnLingqu.label = LanMgr.getLan('', 10043);
                    this.btnLingqu.skin = SkinUtil.buttonNormal;
                    this.btnLingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    this.btnLingqu.disabled = true;
                    this.lbContent.color = ColorConst.normalFont;
                }
                else {
                    this.btnLingqu.disabled = false;
                    if (isFinish) {
                        this.btnLingqu.label = LanMgr.getLan('', 10041);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor = ColorConst.GREEN_FILTER;
                        this.lbContent.color = ColorConst.GREEN;
                    }
                    else {
                        this.btnLingqu.label = LanMgr.getLan('', 10042);
                        this.btnLingqu.skin = SkinUtil.buttonNormal;
                        this.btnLingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                        this.lbContent.color = ColorConst.RED;
                    }
                }
                this.imgRedpoint.visible = isFinish && !isReward;
                this.btnLingqu.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.btnLingqu.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        TrialTaskIR.prototype.onClick = function () {
            var info = this.dataSource;
            if (info) {
                dispatchEvt(new game.TaskEvent(game.TaskEvent.TO_REWARD_TRAIL_TASK, info));
            }
        };
        return TrialTaskIR;
    }(ui.task.itemrender.TrialIRUI));
    game.TrialTaskIR = TrialTaskIR;
})(game || (game = {}));
