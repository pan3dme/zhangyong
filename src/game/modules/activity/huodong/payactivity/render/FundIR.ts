/**
* name 
*/
module game {
	export class FundIR extends ui.activity.huodong.welfare.render.RatingfundRenderUI {
		constructor() {
			super();
			this.btn_lingqu.on(Laya.Event.CLICK, this, this.gift);
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refreshData() {
			let data: tb.TB_level_fund = this._dataSource;
			if (data) {
				let arrReaward = [];
				for (let i in data.reward) {
					arrReaward.push(new ItemVo(data.reward[i][0], data.reward[i][1]))
				}
				this.list_item.dataSource = arrReaward;
				let canCondition:boolean = App.hero.level >= data.level && App.hero.welfare.buyLevelFund > 0;//满足条件（有购买并且等级达到）
				let hasReceive:boolean = App.hero.welfare.levelFundAward[data.ID] && App.hero.welfare.levelFundAward[data.ID] > 0;//是否领取了
				this.lab_level.text = LanMgr.getLan(`达到${data.level}级  (${App.hero.level}/${data.level})`, -1);
				if (hasReceive){
					this.img_already.visible = true;
					this.btn_lingqu.visible = false;
				}else if (canCondition){
					this.img_already.visible = false;
					this.btn_lingqu.visible = true;
					this.btn_lingqu.disabled = false;
					this.btn_lingqu.label = LanMgr.getLan("领取", -1);
				}else{
					this.img_already.visible = false;
					this.btn_lingqu.visible = true;
					this.btn_lingqu.disabled = true;
					this.btn_lingqu.label = LanMgr.getLan("未达到", -1);
				}
	
				
				this.btn_lingqu.skin = "comp/button/btn_qianwang.png";
				this.btn_lingqu.labelStrokeColor = "#538901";
			} else {
				this.list_item.dataSource = null;
			}
		}

		private gift(): void {
			dispatchEvt(new HuodongEvent(HuodongEvent.GET_LEVELFUND_REWARD), this._dataSource.ID);
		}
	}
}