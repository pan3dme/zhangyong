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
    /** 押注奖励 */
    var GloryRewardView = /** @class */ (function (_super) {
        __extends(GloryRewardView, _super);
        function GloryRewardView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.box_Content.addChild(_this.img_bg);
            return _this;
        }
        GloryRewardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GloryRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GloryRewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tabbar.selectedIndex = -1;
            this.awardList.array = null;
        };
        GloryRewardView.prototype.initView = function () {
            this.awardList.array = null;
            this.tabbar.selectHandler = new Handler(this, this.selectTab);
            this.tabbar.selectedIndex = 0;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12397) };
        };
        GloryRewardView.prototype.onClickClose = function () {
            UIMgr.hideUIByName(UIConst.GloryRewardView);
        };
        GloryRewardView.prototype.selectTab = function (index) {
            if (index == -1)
                return;
            this.lbCost.visible = index == 0;
            this.lbReward.text = index == 0 ? LanMgr.getLan("", 12397) : LanMgr.getLan("", 12398);
            if (index == 0) {
                this.awardList.array = this.getYazhuList();
            }
            else if (index == 1) {
                this.awardList.array = this.getHonorReward(game.GroupType.benfu);
            }
            else {
                this.awardList.array = this.getHonorReward(game.GroupType.kuafu);
            }
            this.awardList.scrollTo(0);
        };
        /** 获取奖励 */
        GloryRewardView.prototype.getHonorReward = function (type) {
            if (!this._benfuList || !this._kuafuList) {
                this._benfuList = [];
                this._kuafuList = [];
                var ary = tb.TB_honour_reward.getHonourRewardList();
                for (var i = 0; i < ary.length; i++) {
                    var tbReward = ary[i];
                    var type_1 = tb.TB_honour.getItemById(tbReward.type).type;
                    if (type_1 == game.GroupType.benfu) {
                        this._benfuList.push({ title: tbReward.name, rewardList: tbReward.getRewardList(), costList: null });
                    }
                    else {
                        this._kuafuList.push({ title: tbReward.name, rewardList: tbReward.getRewardList(), costList: null });
                    }
                }
            }
            return type == game.GroupType.benfu ? this._benfuList : this._kuafuList;
        };
        /** 押注奖励 */
        GloryRewardView.prototype.getYazhuList = function () {
            if (!this._yazhuList) {
                this._yazhuList = [];
                var tbData = TableData.getInstance().getTableByName(TableData.tb_honour).data;
                for (var key in tbData) {
                    var tbHonor = tbData[key];
                    if (tbHonor.getItemList().length > 0) {
                        this._yazhuList.push({ title: tbHonor.name, rewardList: tbHonor.getRewardList(), costList: tbHonor.getItemList() });
                    }
                }
            }
            return this._yazhuList;
        };
        return GloryRewardView;
    }(ui.glory.GloryAwardUI));
    game.GloryRewardView = GloryRewardView;
})(game || (game = {}));
