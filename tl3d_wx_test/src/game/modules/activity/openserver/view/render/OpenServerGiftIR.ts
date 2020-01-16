/**
* name 
*/
module game {
    export class OpenServerGiftIR extends ui.activity.openserver.openServerGiftIRUI {
        constructor() {
            super();
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: tb.TB_openservice_gift) {
            if (item) {
                this.visible = true;
                let buynum:number = App.hero.welfare.openSvrGiftAwardNums[item.ID] ? App.hero.welfare.openSvrGiftAwardNums[item.ID] : 0;
                this.lab_num.text = LanMgr.getLan("{0}/{1}", -1, buynum, item.num);
                this.lab_title.text = LanMgr.getLan("", 12640, item.recharge_num);
                this.itemList.dataSource = ary2prop(item.reward);
                this.btnSure.on(Laya.Event.CLICK, this, this.onClickBuy);
            }else{
                this.visible = false;
                this.btnSure.off(Laya.Event.CLICK, this, this.onClickBuy);
            }
        }

        private onClickBuy():void{
            let item:tb.TB_openservice_gift = this.dataSource;
            let buynum:number = App.hero.welfare.openSvrGiftAwardNums[item.ID] ? App.hero.welfare.openSvrGiftAwardNums[item.ID] : 0;
            if (buynum >= item.num){
                showToast(LanMgr.getLan(``,10146));
                return;
            }
			let pid = Number(window.platform.pid); 
            if (ChongzhiModel.isRealPay(pid)) {
                let rechargeitem = tb.TB_recharge.get_TB_rechargeById(item.charge_id);
                ChongzhiModel.pay(rechargeitem);
			}else {
                UIUtil.payDebug(item.charge_id,null,()=>{
                    this.refreshData(item);
                });
			}
		}

       
    }
}
