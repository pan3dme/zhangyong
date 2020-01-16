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
    var TestRebateView = /** @class */ (function (_super) {
        __extends(TestRebateView, _super);
        function TestRebateView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        TestRebateView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
            this.btnLingqu.on(Laya.Event.CLICK, this, this.onReward);
        };
        TestRebateView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TestRebateView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        TestRebateView.prototype.initView = function () {
            var tbRecharge = tb.TB_recharge_rebate.getTBItemById(App.hero.accountName);
            var num = tbRecharge ? tbRecharge.recharge_total : 0;
            this.lbRecharge.text = LanMgr.getLan("", 12611, num);
            this.lbRebate.text = LanMgr.getLan("", 12612, num * 20);
            var isReward = App.hero.welfare.rechargeRebate > 0;
            this.imgYilingqu.visible = isReward;
            this.btnLingqu.visible = !isReward;
        };
        TestRebateView.prototype.onReward = function () {
            var _this = this;
            if (!game.HuodongModel.getInstance().canRewardTestRebate()) {
                showToast(LanMgr.getLan("", 10233));
                return;
            }
            PLC.request(Protocol.game_welfare_getRechargeRebate, null, function (data) {
                if (!data)
                    return;
                App.hero.welfare.rechargeRebate = data['rechargeRebate'];
                UIUtil.showRewardView(data.commonData);
                _this.initView();
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.TEST_REBATE_RP));
                dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
            });
        };
        return TestRebateView;
    }(ui.activity.testrebate.TestRebateUI));
    game.TestRebateView = TestRebateView;
})(game || (game = {}));
