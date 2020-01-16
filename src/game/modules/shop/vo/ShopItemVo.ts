

module game {

    export class ShopItemVo {
        public id : number;
        public count : number;
        public tbGoods : tb.TB_goods;
        public tbItem : tb.TB_item;
        constructor(id:number,count:number){
            this.id = id;
            this.count = count;
            this.tbGoods = tb.TB_goods.get_TB_goodsById(id);
            this.tbItem = tb.TB_item.get_TB_itemById(this.tbGoods.item_id[0]);
        }
        /** 是否可以购买 */
        isCanBuy():boolean {
            return this.tbGoods.buy_type == 0 || this.count < this.tbGoods.num;
        }
        /** 获取剩余次数 */
        getLimitStr():string {
            let type = this.tbGoods.buy_type;
            if(type == GoodsLimitType.day){
                return LanMgr.getLan('', 10075, this.tbGoods.num - this.count);
            }else if(type == GoodsLimitType.week){
                return LanMgr.getLan('', 10076, this.tbGoods.num - this.count);
            }
            return "";
        }
        /** 是否限购 */
        isLimit():boolean {
            return this.tbGoods.buy_type != 0;
        }
    }

    export class JishiItemVo {
        public key : number;
        public id : number;
        public count : number;
        public price: Array<number>;
        public itemInfo : Array<number>;
        public tbMarket : tb.TB_market;
        public tbItem : tb.TB_item;
        private _specialItem:Array<number>;//特殊商品
        constructor(key: number, id: number, count: number, price: Array<number>,itemInfo:Array<number>){
            this.key = key;
            this.id = id;
            this.count = count;
            this.price = price;
            this.itemInfo = itemInfo;
            if (id > 0){
                this.tbMarket = tb.TB_market.getItemById(id);
            }else{
                this._specialItem = tb.TB_market_set.getItemById(1).first_arise;
            }
            this.tbItem = tb.TB_item.get_TB_itemById(itemInfo[0]);
        }
        /** 是否可以购买 */
        isCanBuy():boolean {
            return this.count < 1;
        }
        /** 获取剩余次数
         * 集市中，此字段扩展为折扣描述
         */
        getLimitStr():string {
            let str:string = "";
            if (this.id == 0){
                str = LanMgr.getLan('', 12169, this._specialItem[4]);
            }else{
                str = LanMgr.getLan('', 12169, this.tbMarket.discount);
            }
            return str;
        }
        /** 是否限购（用于页面显示）：集市都是只能购买一次，默认不显示限购次数
         * 集市此字段用于扩展打折数
         */
        isLimit():boolean {
            return (this.tbMarket && this.tbMarket.discount != 0) || (this._specialItem && this._specialItem[4] != 0);
        }
    } 

}