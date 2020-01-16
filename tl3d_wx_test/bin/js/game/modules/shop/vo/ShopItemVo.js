var game;
(function (game) {
    var ShopItemVo = /** @class */ (function () {
        function ShopItemVo(id, count) {
            this.id = id;
            this.count = count;
            this.tbGoods = tb.TB_goods.get_TB_goodsById(id);
            this.tbItem = tb.TB_item.get_TB_itemById(this.tbGoods.item_id[0]);
        }
        /** 是否可以购买 */
        ShopItemVo.prototype.isCanBuy = function () {
            return this.tbGoods.buy_type == 0 || this.count < this.tbGoods.num;
        };
        /** 获取剩余次数 */
        ShopItemVo.prototype.getLimitStr = function () {
            var type = this.tbGoods.buy_type;
            if (type == GoodsLimitType.day) {
                return LanMgr.getLan('', 10075, this.tbGoods.num - this.count);
            }
            else if (type == GoodsLimitType.week) {
                return LanMgr.getLan('', 10076, this.tbGoods.num - this.count);
            }
            return "";
        };
        /** 是否限购 */
        ShopItemVo.prototype.isLimit = function () {
            return this.tbGoods.buy_type != 0;
        };
        return ShopItemVo;
    }());
    game.ShopItemVo = ShopItemVo;
    var JishiItemVo = /** @class */ (function () {
        function JishiItemVo(key, id, count, price, itemInfo) {
            this.key = key;
            this.id = id;
            this.count = count;
            this.price = price;
            this.itemInfo = itemInfo;
            if (id > 0) {
                this.tbMarket = tb.TB_market.getItemById(id);
            }
            else {
                this._specialItem = tb.TB_market_set.getItemById(1).first_arise;
            }
            this.tbItem = tb.TB_item.get_TB_itemById(itemInfo[0]);
        }
        /** 是否可以购买 */
        JishiItemVo.prototype.isCanBuy = function () {
            return this.count < 1;
        };
        /** 获取剩余次数
         * 集市中，此字段扩展为折扣描述
         */
        JishiItemVo.prototype.getLimitStr = function () {
            var str = "";
            if (this.id == 0) {
                str = LanMgr.getLan('', 12169, this._specialItem[4]);
            }
            else {
                str = LanMgr.getLan('', 12169, this.tbMarket.discount);
            }
            return str;
        };
        /** 是否限购（用于页面显示）：集市都是只能购买一次，默认不显示限购次数
         * 集市此字段用于扩展打折数
         */
        JishiItemVo.prototype.isLimit = function () {
            return (this.tbMarket && this.tbMarket.discount != 0) || (this._specialItem && this._specialItem[4] != 0);
        };
        return JishiItemVo;
    }());
    game.JishiItemVo = JishiItemVo;
})(game || (game = {}));
