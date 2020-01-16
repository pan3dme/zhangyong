/**
* name 
*/
module game{
	export class JishaJiangliItemRender extends ui.guild.copy.JishaJiangliItemRenderUI{
		constructor(){
			super();
		}

		public set dataSource($value: IGuanqiaRankRewardVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IGuanqiaRankRewardVo {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if(data){
				if(data.rank > 3){
					this.imgRank.visible = false;
					this.lbRank.visible = true;
					this.lbRank.text = data.rankStr.toString();
				}else{
					this.imgRank.visible = true;
					this.lbRank.visible = false;
					this.imgRank.skin = SkinUtil.getRankSkin(data.rank);
				}
				this.rewardList.array = data.rewardList;
			}else{
				this.rewardList.array = null;
			}
		}

	}
}