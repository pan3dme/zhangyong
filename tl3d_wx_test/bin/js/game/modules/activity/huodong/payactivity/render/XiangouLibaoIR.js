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
/**
* name
*/
var game;
(function (game) {
    var XiangouLibaoIR = /** @class */ (function (_super) {
        __extends(XiangouLibaoIR, _super);
        function XiangouLibaoIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(XiangouLibaoIR.prototype, "dataSource", {
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
        XiangouLibaoIR.prototype.refreshData = function () {
            var tbData = this.dataSource;
            if (tbData) {
                this.renderView(tbData);
                this.btnBuy.on(Laya.Event.CLICK, this, this.onBuy);
            }
            else {
                this.listItem.array = null;
                this.btnBuy.off(Laya.Event.CLICK, this, this.onBuy);
            }
        };
        XiangouLibaoIR.prototype.renderView = function (tbData) {
            this.btnBuy.label = "\uFFE5" + tbData.recharge_num;
            this.listItem.array = tbData.getRewardList();
            this.imgDiscount.visible = this.lbDiscount.visible = tbData.discount > 0;
            this.lbDiscount.text = tbData.discount + "折";
            var count = 0;
            if (tbData instanceof tb.TB_daily_recharge) {
                count = App.hero.welfare.dayRechargeLimit ? (App.hero.welfare.dayRechargeLimit[tbData.ID] || 0) : 0;
            }
            else if (tbData instanceof tb.TB_week_recharge) {
                count = App.hero.welfare.weekRechargeLimit ? (App.hero.welfare.weekRechargeLimit[tbData.ID] || 0) : 0;
            }
            else if (tbData instanceof tb.TB_month_recharge) {
                count = App.hero.welfare.monthRechargeLimit ? (App.hero.welfare.monthRechargeLimit[tbData.ID] || 0) : 0;
            }
            count = Math.max(0, tbData.limit_num - count);
            this.lbNum.text = "\u5269\u4F59\u6B21\u6570\uFF1A" + count + "/" + tbData.limit_num;
            this.btnBuy.visible = count > 0;
            this.imgYigoumai.visible = count <= 0;
        };
        XiangouLibaoIR.prototype.onBuy = function () {
            var tbData = this.dataSource;
            if (!tbData)
                return;
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                var item = tb.TB_recharge.get_TB_rechargeById(tbData.recharge_id);
                game.ChongzhiModel.pay(item);
            }
            else {
                UIUtil.payDebug(tbData.recharge_id, { text: "付款成功，等待奖励中..." });
            }
        };
        return XiangouLibaoIR;
    }(ui.activity.huodong.welfare.render.LibaoIRUI));
    game.XiangouLibaoIR = XiangouLibaoIR;
})(game || (game = {}));
