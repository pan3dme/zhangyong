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
    var WarriorJinjieView = /** @class */ (function (_super) {
        __extends(WarriorJinjieView, _super);
        function WarriorJinjieView() {
            return _super.call(this) || this;
        }
        WarriorJinjieView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.WarriorJinjieView, closeOnSide: this.isModelClose, title: "comp/title/jinjiejiangli.png" };
            this.btnBuy.on(Laya.Event.CLICK, this, this.onBuy);
        };
        WarriorJinjieView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        WarriorJinjieView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        WarriorJinjieView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listExtral.array = null;
            this.listReward.array = null;
        };
        WarriorJinjieView.prototype.initView = function () {
            var curCycle = game.WarriorProveModel.getInstance().curTabCycle;
            this.lbAddLv.text = LanMgr.getLan("", 12136, curCycle.level_up);
            var items = curCycle.getRewardItems();
            this.listReward.array = items;
            this.listReward.width = items.length >= 5 ? 480 : (items.length * 100 + (items.length - 1) * this.listReward.spaceX);
            var specials = curCycle.getShowItems();
            this.listExtral.array = specials;
            this.listExtral.width = specials.length * 100 + (specials.length - 1) * this.listExtral.spaceX;
            this.listExtral.width = specials.length >= 5 ? 480 : (specials.length * 100 + (specials.length - 1) * this.listExtral.spaceX);
            var tbChongzhi = tb.TB_recharge.get_TB_rechargeById(curCycle.recharge_id);
            this.btnBuy.label = "\uFFE5" + tbChongzhi.recharge_count;
        };
        WarriorJinjieView.prototype.onBuy = function () {
            if (game.WarriorProveModel.getInstance().isUnlockJinjie()) {
                showToast(LanMgr.getLan('', 10456));
                return;
            }
            var curCycle = game.WarriorProveModel.getInstance().curTabCycle;
            var tbData = curCycle ? tb.TB_recharge.get_TB_rechargeById(curCycle.recharge_id) : null;
            if (!tbData)
                return;
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                var rechargeitem = tb.TB_recharge.get_TB_rechargeById(tbData.ID);
                game.ChongzhiModel.pay(rechargeitem);
            }
            else {
                UIUtil.payDebug(tbData.ID);
            }
        };
        return WarriorJinjieView;
    }(ui.task.warrior.WarriorJinjieUI));
    game.WarriorJinjieView = WarriorJinjieView;
})(game || (game = {}));
