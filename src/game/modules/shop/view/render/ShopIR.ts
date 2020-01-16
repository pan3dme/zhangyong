/**
* name 
*/
module game{
	export class ShopIR extends ui.shop.ShopIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():any {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
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
				this.btnBuy.on(Laya.Event.CLICK,this,this.onBuy);
			} else{
                this.btnBuy.off(Laya.Event.CLICK,this,this.onBuy);
			}
		}

		private onBuy():void{
            let data = this.dataSource;
			//是否是商城，选择数量购买
			if(data.tbGoods) {
				let sdata = { item: data.tbGoods, arrlimit:data.isLimit() ? data.tbGoods.num - data.count : 0};
				dispatchEvt(new ShopEvent(ShopEvent.SHOW_GOUMAI_PANEL), sdata);
				return;
			}
			//检测消耗是否足够
			if(!data.price) {//非集市购买请求
				if(UIUtil.checkNotEnough(data.tbGoods.money_type, data.tbGoods.price)) {
					return;
				}
				//直接请求购买
				let arg = {};
				arg[Protocol.game_shop_buy.args.id] = data.id;
				arg[Protocol.game_shop_buy.args.num] = 1;
				PLC.request(Protocol.game_shop_buy, arg, (resData:any)=>{
					if(!resData) return;
					data.count++;
					UIUtil.showRewardView(resData.commonData);
					this.refreshData();
				});
			} else {//集市购买请求
				if(UIUtil.checkNotEnough(data.price[0], data.price[1])) {
					return;
				}
				//直接请求购买
				let arg = {};
				arg[Protocol.game_market_buy.args.id] = data.key;
				PLC.request(Protocol.game_market_buy,arg,(res)=>{
					if (!res) return;
					data.count++;
					UIUtil.showRewardView(res.commonData);
					this.refreshData();
				});
			}		
			
		}

	}
}