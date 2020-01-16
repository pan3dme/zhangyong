/**
* name 
*/
module game{
	export class ChongzhiIR extends ui.activity.chongzhi.ChongzhiIRUI{
		constructor(){
			super();
		}

		public set dataSource($value:tb.TB_recharge) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: tb.TB_recharge) {
            if (item) {
				this.location(item.ID);
				this.lab_money.text = "￥" + item.recharge_count;
				let str: string;
				let monthcard:tb.TB_month_card;
				this.img_bg.skin = "chongzhitequan/xiaokuang.png";
				this.img_type.skin = SkinUtil.getZuanshiUrl(item.recharge_count);
				this.panduan(item.ID);
				this.lab_extra.color = "#f66217";
            } else {
                logdebug("置空");
            }
        }

		private panduan(id: number){
			let str = "获得" + (this._dataSource.recharge_count * 10) + "钻石\n";
			this.lab_extra.text = LanMgr.getLan(str, -1);
			if(App.hero.welfare.goodsRechargeCount[id] > 0){
				this.img_info.visible = id == 3?false:true;
				this.img_info.skin = SkinUtil.getChongzhiUrl("chaozhi");
				this.lab_extra_1.text =  this._dataSource.extra_reward > 0 ? LanMgr.getLan("额外送" + this._dataSource.extra_reward + "钻石", -1) : "";
			
			} else {
				this.img_info.skin = SkinUtil.getChongzhiUrl("shuangbei");
				this.lab_extra_1.text = LanMgr.getLan("首充送" + (this._dataSource.recharge_count * 10) + "钻石", -1);
			}
		}

		private location(id: number){
			switch(id){
				case 3:
					this.img_type.x = 98;
					this.img_type.y = 32;
					break;
				case 4:
					this.img_type.x = 89;
					this.img_type.y = 32;
					break;
				case 5:
					this.img_type.x = 68;
					this.img_type.y = 25;
					break;
				case 6:
					this.img_type.x = 91;
					this.img_type.y = 14;
					break;
				case 7:
					this.img_type.x = 84;
					this.img_type.y = 13;
					break;
				default:
					this.img_type.x = 69;
					this.img_type.y = 13;
					break;
			}
		}
	}
}