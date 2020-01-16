/**
* name 
*/
module game{
	export class GuildRankIRender extends ui.guild.fight.render.GuildSaiQuRenderUI{
		constructor(){
			super();
			
		}

		public set dataSource($value: IWarGuildRankSvo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IWarGuildRankSvo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.headBox.dataSource = new GuildHeadVo(info.guildHead,info.guildLevel);
                this.lbForce.text = LanMgr.getLan('',10117,info.force);
                this.lbName.text = info.guildName;
                this.lbScore.text = "积分：" + info.score.toString();
				this.ui_view.dataSource = {rank:info.rank};
				if(info.hasOwnProperty('upType') && info.upType != GuildUpGradeType.none){
					this.imgtype.visible = true;
					this.lbJifen.visible = false;
					this.imgtype.skin = SkinUtil.getGuildUpGradeUrl(info.upType);
				}else{
					this.imgtype.visible = false;
					this.lbJifen.visible = true;
				}
			} else{
				this.headBox.dataSource = null;
			}
		}


	}
}