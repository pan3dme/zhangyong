/**
* name 
*/
module game {
	export class KuafuRewardIR extends ui.arena.match.render.KuafuRewardIRUI {
		constructor() {
			super();
			
		}

		set dataSource(value:tb.TB_match_score) {
			this._dataSource = value;
			this.refreshView();
		}

		get dataSource(): tb.TB_match_score {
			return this._dataSource;
		}

		private refreshView(): void {
			let data = this.dataSource;
            if(data){
                this.lbName.text = data.name;
                this.lbRank.text = data.getRankText();
                this.rewardList.array = data.getRewardList();
                this.lbName.color = this.lbRank.color = ColorConst.getGradeColor(data.type);
            }else {
                this.rewardList.array = null;
            }
		}

		
	}
}