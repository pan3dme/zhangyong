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
    var ShopIR = /** @class */ (function (_super) {
        __extends(ShopIR, _super);
        function ShopIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ShopIR.prototype, "dataSource", {
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
        ShopIR.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                //分两种情况(集市，非集市) 有价格(data.price)是集市
                //创建item(物品id，物品数目)
                this.itemBox.dataSource = data.price ? new ItemVo(data.itemInfo[0], data.itemInfo[1]) : new ItemVo(data.tbGoods.item_id[0], data.tbGoods.item_id[1]);
                //标准化价格
                this.lbCost.text = data.price ? 'X' + Snums(data.price[1]) : "X" + Snums(data.tbGoods.price);
                //消耗icon
                this.imgCost.skin = data.price ? SkinUtil.getCostSkin(data.price[0]) : SkinUtil.getCostSkin(data.tbGoods.money_type);
                //是否有限购
                this.imgLimit.visible = this.lbLimit.visible = data.isLimit();
                //限购文本
                this.lbLimit.text = data.getLimitStr();
                //是否能购买
                this.btnBuy.disabled = !data.isCanBuy();
                //开启购买监听
                this.btnBuy.on(Laya.Event.CLICK, this, this.onBuy);
            }
            else {
                this.btnBuy.off(Laya.Event.CLICK, this, this.onBuy);
            }
        };
        ShopIR.prototype.onBuy = function () {
            var _this = this;
            var data = this.dataSource;
            //是否是商城，选择数量购买
            if (data.tbGoods) {
                var sdata = { item: data.tbGoods, arrlimit: data.isLimit() ? data.tbGoods.num - data.count : 0 };
                dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_GOUMAI_PANEL), sdata);
                return;
            }
            //检测消耗是否足够
            if (!data.price) { //非集市购买请求
                if (UIUtil.checkNotEnough(data.tbGoods.money_type, data.tbGoods.price)) {
                    return;
                }
                //直接请求购买
                var arg = {};
                arg[Protocol.game_shop_buy.args.id] = data.id;
                arg[Protocol.game_shop_buy.args.num] = 1;
                PLC.request(Protocol.game_shop_buy, arg, function (resData) {
                    if (!resData)
                        return;
                    data.count++;
                    UIUtil.showRewardView(resData.commonData);
                    _this.refreshData();
                });
            }
            else { //集市购买请求
                if (UIUtil.checkNotEnough(data.price[0], data.price[1])) {
                    return;
                }
                //直接请求购买
                var arg = {};
                arg[Protocol.game_market_buy.args.id] = data.key;
                PLC.request(Protocol.game_market_buy, arg, function (res) {
                    if (!res)
                        return;
                    data.count++;
                    UIUtil.showRewardView(res.commonData);
                    _this.refreshData();
                });
            }
        };
        return ShopIR;
    }(ui.shop.ShopIRUI));
    game.ShopIR = ShopIR;
})(game || (game = {}));
