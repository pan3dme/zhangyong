/**
* name 
*/
module game{
	export class HonorGuildIRender extends ui.guild.fight.render.GuildRongyuRenderUI{
		constructor(){
			super();
			
		}

		public set dataSource($value: IHonorGuildSvo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IHonorGuildSvo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.imgBg.skin = SkinUtil.getGuildQizhi(info.guildRank);
				this.imgEmpty.skin = SkinUtil.getGuildXuwei(info.guildRank);
				this.lbSvrName.fontSize = this.lbGuildName.fontSize = this.lbLeader.fontSize = this.lbForce.fontSize = info.guildRank == 1 ? 20 : 18;
				if(info.presidentName){
                    this.headBox.dataSource = new GuildHeadVo(info.guildHead,info.guildLevel);
                    this.lbSvrName.text = "区服" +info.serverName;
                    this.lbGuildName.text = "公会：" + info.guildName;
                    this.lbLeader.text = "会长：" + info.presidentName;
                    this.lbForce.text = LanMgr.getLan('',10117,info.totalForce);
                    this.imgEmpty.visible = false;
                    this.headBox.visible = this.lbSvrName.visible = this.lbGuildName.visible = this.lbLeader.visible = this.lbForce.visible = true;
                }else{
                    this.headBox.visible = this.lbSvrName.visible = this.lbGuildName.visible = this.lbLeader.visible = this.lbForce.visible = false;
                    this.imgEmpty.visible = true;
                    this.headBox.dataSource = null;
                }
			} else{
				this.headBox.dataSource = null;
			}
		}

        
	}
}