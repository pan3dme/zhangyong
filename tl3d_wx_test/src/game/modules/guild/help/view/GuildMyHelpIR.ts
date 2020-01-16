/**
* name 
*/
module game{
	export class GuildMyHelpIR extends ui.guild.help.MyHelpIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: GuildHelpVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():GuildHelpVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				let isExist = info.isExist();
				let isFinish = info.isRewardFinish();
				let isCanReward = info.isCanReward();
				this.lbQiuyuan.visible = this.btnAdd.visible = !isExist;
				this.itemBox.visible = this.lbTitle.visible = this.lbNum.visible = this.lbDesc.visible = this.lbNum.visible = this.lbPbNum.visible = this.pb.visible = isExist;
				this.imgFinish.visible = this.btnLingqu.visible = this.imgRedpoint.visible = this.lbState.visible = isExist;
				if(isExist){
					this.imgFinish.visible = isFinish;
					this.btnLingqu.visible = this.lbState.visible = !isFinish;
					this.btnLingqu.gray = !isCanReward;
					this.imgRedpoint.visible = isCanReward;
					this.lbState.text = isCanReward ? `可领取：${info.getCanRewardNum()}` : `求援中`; 
					this.itemBox.dataSource = info.getItemVo();
					let cur = info.svo.helpNum;
					let total = info.tbHelp.help_num;
					this.lbPbNum.text = this.lbNum.text = `${cur}/${total}`;
					this.pb.value = cur / total;
					this.lbTitle.text = info.tbHelp.desc;
				}else{
					this.itemBox.dataSource = null;
				}
				this.on(Laya.Event.CLICK,this,this.onAdd);
				this.btnLingqu.on(Laya.Event.CLICK,this,this.onLingqu);
			} else{
                this.itemBox.dataSource = null;
				this.off(Laya.Event.CLICK,this,this.onAdd);
				this.btnLingqu.off(Laya.Event.CLICK,this,this.onLingqu);
			}
		}
		/** 求援 */
		private onAdd():void{
			let info = this.dataSource;
			if(info && !info.isExist()){
				dispatchEvt(new GuildEvent(GuildEvent.SHOW_ASK_HELP_VIEW,info));
			}
		}
		/** 领取 */
		private onLingqu():void{
			let info = this.dataSource;
			if(info){
				dispatchEvt(new GuildEvent(GuildEvent.REWARD_HELPED_ITEM,info));
			}
		}

	}
}