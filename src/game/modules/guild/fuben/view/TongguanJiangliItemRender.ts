/**
* name 
*/
module game{
	export class TongguanJiangliItemRender extends ui.guild.copy.TongguanJiangliItemRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: GuildRewardVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():GuildRewardVo {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
                this.lbTitle.text = data.getName();
                this.lbNum.text = data.getResetNumStr();
				this.lbNum.visible = data.isPass();
				this.rewardList.array = data.getRewardList();
                this.imgReward.visible = data.isReceive();
                this.btnReward.visible = !data.isReceive();
                this.btnReward.label = data.isPass() ? LanMgr.getLan('',10041) : LanMgr.getLan('',10090);
                this.btnReward.gray = !data.isCanReward();
                this.btnReward.on(Laya.Event.CLICK,this,this.onReward);
			}else{
                this.btnReward.off(Laya.Event.CLICK,this,this.onReward);
				this.rewardList.array = null;
			}
		}

        private onReward():void {
           dispatchEvt(new GuildEvent(GuildEvent.RECEIVE_TONGGUAN_JIANGLI,this.dataSource)); 
        }

	}
}