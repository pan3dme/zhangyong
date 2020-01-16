/**
* name 
*/
module game{
	export class PersonRankIRender extends ui.guild.fight.render.GuildSaiQuRenderUI{
		constructor(){
			super();
			
		}

		public set dataSource($value: IWarMemberRankVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IWarMemberRankVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.headBox.dataSource = new UserHeadVo(info.head,info.level,info.headFrame);
                this.lbForce.text = LanMgr.getLan('',10117,info.force);
                this.lbName.text = info.name;
                this.lbScore.text = info.score.toString();
				this.lbJifen.visible = true;
                this.imgtype.visible = false;

				this.ui_view.dataSource = {rank:info.rank};
			} else{
				this.headBox.dataSource = null;
			}
		}


	}
}