/**
* name 
*/
module game {
	export class UpRoadSuccessView extends ui.uproad.UpRoadSuccesssViewUI {
		constructor() {
			super();
			this.isModelClose=false;
			this.bgPanel.addChildAt(this.img_bg, 3)
		}

		createChildren():void {
			super.createChildren();
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		public close(type?: string, showEffect?: boolean, sound = true): void{
			this.ShowReward();
			super.close();
			this.bgPanel.dataSource = null;
			this.btn_close.off(Laya.Event.CLICK, this, this.close);
		}

		public onClosed(type?: string): void {
			super.onClosed();
		}

		//弹奖励
		private ShowReward():void{
			if (this.dataSource && this.dataSource.length > 1){
				let commondata = this.dataSource[1];
				let rewardList:ItemVo[] = UIUtil.getRewardItemList(commondata);
				ShowRewardUtil.showRewardView(rewardList, 0, 0);
			}
		}

		private _curAdvanceRoadT:tb.TB_advance_road;
		private initView(): void {
			this.bgPanel.dataSource = {uiName:UIConst.TujianView,closeOnSide:false,title:"comp/title/gongxijihuo.png"};
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
			let advanceLv:number = this.dataSource[0];
			this._curAdvanceRoadT = tb.TB_advance_road.getSet(advanceLv);
			this.img_icon.skin = LanMgr.getLan("zhaohuanshi/{0}.png", -1, advanceLv);
			if (this._curAdvanceRoadT){
				this.lab_desc.text = this._curAdvanceRoadT.desc;
			}
		
		}

		


	

	


	}
}