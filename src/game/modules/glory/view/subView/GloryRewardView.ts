
module game{
	/** 押注奖励 */
	export class GloryRewardView extends ui.glory.GloryAwardUI{
		constructor(){
			super();
            this.isModelClose = true;
			this.bgPanel.box_Content.addChild(this.img_bg);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();		
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();		
		}

        public onClosed():void{
			super.onClosed();
			this.tabbar.selectedIndex = -1;
			this.awardList.array = null;
		}

		private initView():void{
			this.awardList.array = null;
			this.tabbar.selectHandler = new Handler(this,this.selectTab);
			this.tabbar.selectedIndex = 0;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:LanMgr.getLan("",12397) };
		}

		private onClickClose():void{
			UIMgr.hideUIByName(UIConst.GloryRewardView);
		}

		private selectTab(index:number):void{
			if(index == -1) return;
			this.lbCost.visible = index == 0;
			this.lbReward.text = index == 0 ? LanMgr.getLan("",12397) : LanMgr.getLan("",12398);
			if(index == 0){
				this.awardList.array = this.getYazhuList();
			}else if (index == 1){
				this.awardList.array = this.getHonorReward(GroupType.benfu);
			}else{
				this.awardList.array = this.getHonorReward(GroupType.kuafu);
			}
			this.awardList.scrollTo(0);
		}

		private _benfuList : IRewardVo[];
		private _kuafuList : IRewardVo[];
		/** 获取奖励 */
		getHonorReward(type:number):IRewardVo[]{
			if(!this._benfuList || !this._kuafuList){
				this._benfuList = [];
				this._kuafuList = [];
				let ary = tb.TB_honour_reward.getHonourRewardList();
				for(let i = 0 ; i < ary.length ; i++){
					let tbReward = ary[i];
					let type = tb.TB_honour.getItemById(tbReward.type).type;
					if(type == GroupType.benfu){
						this._benfuList.push({title:tbReward.name,rewardList:tbReward.getRewardList(),costList:null});
					}else{
						this._kuafuList.push({title:tbReward.name,rewardList:tbReward.getRewardList(),costList:null});
					}
				}
			}
			return type == GroupType.benfu ? this._benfuList : this._kuafuList;
		}

		private _yazhuList : IRewardVo[];
		/** 押注奖励 */
		getYazhuList():IRewardVo[]{
			if(!this._yazhuList){
				this._yazhuList = [];
				let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_honour)).data;
				for(let key in tbData) {
					let tbHonor : tb.TB_honour = tbData[key];
					if(tbHonor.getItemList().length > 0){
						this._yazhuList.push({title:tbHonor.name,rewardList:tbHonor.getRewardList(),costList:tbHonor.getItemList()});
					}
				}
			}
			return this._yazhuList;
		}

	}

	export interface IRewardVo {
		title : string;
		costList : ItemVo[];
		rewardList : ItemVo[];
	}
}