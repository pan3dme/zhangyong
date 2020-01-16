/**
* name 
*/
module game{
	export class BuySuccView extends ui.activity.chongzhi.BuySuccUI{
		constructor(){
			super();
		}

		public popup():void{
			super.popup();
			this.initView();
		}

		private initView():void{
			let rechargeId = this.dataSource
			let data = tb.TB_recharge.get_TB_rechargeById(rechargeId);
		}

		public onClosed():void{
            super.onClosed();
            ChongzhiModel.getInstance().arrPop();
        }
	}
}