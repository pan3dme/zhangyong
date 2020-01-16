/**
* name 
*/
module game{
	export class GuildOthersHelpIR extends ui.guild.help.OthersHelpIRUI{
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
				this.itemBox.dataSource = info.getItemVo();
                this.lbName.text = info.svo.name;
                this.lbTitle.text = info.tbHelp.desc;
				this.lbNum.text = `${info.svo.helpNum}/${info.tbHelp.help_num}`;
				this.pbNum.value = info.svo.helpNum / info.tbHelp.help_num;
				let isFree = GuildHelpModel.getInstance().isFreeHelp();
				this.imgCost.visible = this.lbCost.visible = !isFree;
				if(isFree){
					this.btnHelp.label = "免费援助";
				}else{
					this.btnHelp.label = "        援助";
					let costAry = info.getCost();
					this.imgCost.skin = SkinUtil.getCostSkin(costAry[0]);
					this.lbCost.text = costAry[1] + "";
				}
				this.btnHelp.on(Laya.Event.CLICK,this,this.onHelp);
			} else{
				this.btnHelp.off(Laya.Event.CLICK,this,this.onHelp);
			}
		}

		private onHelp():void{
			let info = this.dataSource;
			if(info){
				dispatchEvt(new GuildEvent(GuildEvent.HELP_OTHERS,info));
			}
		}

	}
}