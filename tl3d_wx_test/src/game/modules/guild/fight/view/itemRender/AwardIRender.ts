
module game{
	export class AwardIRender extends ui.guild.fight.render.SeasonAwardIRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():any {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				let rank : number = info['rank'];
				this.imgRank.visible = rank <= 3;
				this.lbName.visible = rank > 3;
				if(rank <= 3){
					this.imgRank.skin = SkinUtil.getRankingSkin(rank-1)
				}
				let tbSeason : tb.TB_guild_season = info['tbSeason'];
				this.lbName.text = tbSeason.desc;
                this.itemList.array = tbSeason.getRewardList();
			} else{
				this.itemList.array = null;
			}
		}


	}
}