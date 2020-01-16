

module common {
    /** 奖励排行itemrender */
	export class AwardRankIR extends ui.box.AwardRankIRUI {
		constructor() {
			super();
		}

		public set dataSource($value: inface.IAwardRankData) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():inface.IAwardRankData {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
                let rankStr = info.getRankStr();
                let len = rankStr.length;
                // this.lbRank.fontSize = len <= 1 ? 55 : (len <= 4 ? 40 : 27);
                this.lbRank.text = rankStr;
                this.lbRank.visible = true;
                this.imgRank.visible = false;
                let rank : number = info.getRank();
                if(!isNaN(rank)){
                    this.lbRank.visible = rank > 3;
				    this.imgRank.visible = rank <= 3;
                    this.imgRank.skin = rank <= 3 ? info.getRankSkin(rank) : "";
                }
                this.lbRank.event(Laya.Event.RESIZE);
                this.itemList.array = info.getRewardList();
			} else{
				this.itemList.array = null;
			}
		}
	}
}