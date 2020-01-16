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
    var SuperVipView = /** @class */ (function (_super) {
        __extends(SuperVipView, _super);
        function SuperVipView() {
            return _super.call(this) || this;
        }
        SuperVipView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12613) };
        };
        SuperVipView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        SuperVipView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnReward.off(Laya.Event.CLICK, this, this.onReward);
            this.imgReward.off(Laya.Event.CLICK, this, this.onShow);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.VIP_LEVEL_CHANGE, this.updateView, this);
        };
        SuperVipView.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.ResEvent.VIP_LEVEL_CHANGE, this.updateView, this);
            this.updateView();
            this.btnReward.on(Laya.Event.CLICK, this, this.onReward);
            this.imgReward.on(Laya.Event.CLICK, this, this.onShow);
        };
        SuperVipView.prototype.updateView = function () {
            this.lbTitle1.text = LanMgr.getLan("", 12614, SuperVipView.dayValue);
            this.lbValue1.text = App.hero.welfare.dailyRechargeSum + "/" + SuperVipView.dayValue;
            this.lbTitle2.text = LanMgr.getLan("", 12615, SuperVipView.allValue);
            this.lbValue2.text = App.hero.welfare.rechargeSum + "/" + SuperVipView.allValue;
            var isVip = App.hero.welfare.superVip == 1;
            this.lbQQ.text = isVip ? SuperVipView.QQ : "*********";
            var isReward = App.hero.welfare.superVipAward == 1;
            this.btnReward.disabled = !isVip || isReward;
            this.btnReward.label = isVip ? (isReward ? LanMgr.getLan("", 10043) : LanMgr.getLan("", 10476)) : LanMgr.getLan("", 10090);
        };
        SuperVipView.prototype.onReward = function () {
            var _this = this;
            PLC.request(Protocol.game_welfare_getSuperVipAward, null, function ($data) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                App.hero.welfare.superVipAward = $data["superVipAward"];
                _this.updateView();
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SUPER_VIP_RP));
            });
        };
        SuperVipView.prototype.onShow = function () {
            UIMgr.showUI(UIConst.ManyItemsTip, { data: tb.TB_activity_set.getTabSet().getVipGiftList() });
        };
        SuperVipView.QQ = "3048553263"; // 客服qq
        SuperVipView.dayValue = 2000; // 单日累计充值目标
        SuperVipView.allValue = 10000; // 历史累计充值目标
        return SuperVipView;
    }(ui.activity.supervip.SuperVipUI));
    game.SuperVipView = SuperVipView;
})(game || (game = {}));
