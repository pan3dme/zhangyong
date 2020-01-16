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
    var OpenServerGiftIR = /** @class */ (function (_super) {
        __extends(OpenServerGiftIR, _super);
        function OpenServerGiftIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(OpenServerGiftIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        OpenServerGiftIR.prototype.refreshData = function (item) {
            if (item) {
                this.visible = true;
                var buynum = App.hero.welfare.openSvrGiftAwardNums[item.ID] ? App.hero.welfare.openSvrGiftAwardNums[item.ID] : 0;
                this.lab_num.text = LanMgr.getLan("{0}/{1}", -1, buynum, item.num);
                this.lab_title.text = LanMgr.getLan("", 12640, item.recharge_num);
                this.itemList.dataSource = ary2prop(item.reward);
                this.btnSure.on(Laya.Event.CLICK, this, this.onClickBuy);
            }
            else {
                this.visible = false;
                this.btnSure.off(Laya.Event.CLICK, this, this.onClickBuy);
            }
        };
        OpenServerGiftIR.prototype.onClickBuy = function () {
            var _this = this;
            var item = this.dataSource;
            var buynum = App.hero.welfare.openSvrGiftAwardNums[item.ID] ? App.hero.welfare.openSvrGiftAwardNums[item.ID] : 0;
            if (buynum >= item.num) {
                showToast(LanMgr.getLan("", 10146));
                return;
            }
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                var rechargeitem = tb.TB_recharge.get_TB_rechargeById(item.charge_id);
                game.ChongzhiModel.pay(rechargeitem);
            }
            else {
                UIUtil.payDebug(item.charge_id, null, function () {
                    _this.refreshData(item);
                });
            }
        };
        return OpenServerGiftIR;
    }(ui.activity.openserver.openServerGiftIRUI));
    game.OpenServerGiftIR = OpenServerGiftIR;
})(game || (game = {}));
