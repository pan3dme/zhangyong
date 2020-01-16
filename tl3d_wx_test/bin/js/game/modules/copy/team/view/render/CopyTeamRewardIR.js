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
    var CopyTeamRewardIR = /** @class */ (function (_super) {
        __extends(CopyTeamRewardIR, _super);
        function CopyTeamRewardIR() {
            var _this = _super.call(this) || this;
            _this.btnLingqu.on(Laya.Event.CLICK, _this, _this.onLingqu);
            return _this;
        }
        Object.defineProperty(CopyTeamRewardIR.prototype, "dataSource", {
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
        CopyTeamRewardIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbTitle.text = info.tbData.desc;
                this.listReward.array = info.tbData.getRewardItems();
                var isFinish = info.isFinish();
                var isReward = info.isReward();
                if (isReward) {
                    this.btnLingqu.visible = false;
                    this.lbYilingqu.visible = true;
                }
                else {
                    this.btnLingqu.visible = true;
                    this.lbYilingqu.visible = false;
                    if (isFinish) {
                        this.btnLingqu.label = LanMgr.getLan("", 10041);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor = ColorConst.GREEN_FILTER;
                    }
                    else {
                        this.btnLingqu.label = LanMgr.getLan("", 10045);
                        this.btnLingqu.skin = SkinUtil.buttonNormal;
                        this.btnLingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
                    }
                }
                this.imgRedpoint.visible = isFinish && !isReward;
            }
            else {
                this.listReward.array = null;
            }
        };
        CopyTeamRewardIR.prototype.onLingqu = function () {
            var info = this.dataSource;
            if (!info)
                return;
            if (info.isCanReward()) {
                var args = {};
                args[Protocol.friend_groupCopy_getChapterAward.args.id] = info.tbData.ID;
                PLC.request(Protocol.friend_groupCopy_getChapterAward, args, function (data) {
                    if (!data)
                        return;
                    if (data.addChapterAward) {
                        game.CopyTeamModel.getInstance().groupCopyChapterAward.push(data.addChapterAward);
                    }
                    if (UIMgr.hasStage(UIConst.CopyTeamRewardView)) {
                        var view = UIMgr.getUIByName(UIConst.CopyTeamRewardView);
                        view.initView();
                    }
                    UIUtil.showRewardView(data.commonData);
                    dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.REWARD_SUCC));
                });
            }
        };
        return CopyTeamRewardIR;
    }(ui.teamcopy.render.RewardIRUI));
    game.CopyTeamRewardIR = CopyTeamRewardIR;
})(game || (game = {}));
