/**
* name 
*/
module game {
	export class GuildRankItemRender extends ui.box.RankIRUI {
		constructor() {
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource(): any {
			return this._dataSource;
		}

		public refreshData() {
			let data = this.dataSource;
			if (data) {
				this.ui_view.dataSource = {rank:data.rank};
				if (data.type == 'DamageRank') {
					this.headBox.dataSource = new UserHeadVo(data.head, data.level,data.headFrame);
					this.lbName.text = data.name;
					this.boxMid.visible = false;
					this.lbBottomDesc.text = `神力: `;
					this.lbBottom.text = data.force;
					this.lbValueDesc.text = `伤害`;
					this.lbValue.text = String(Math.round(data.value));
				} else if (data.type == 'GuildRank') {
					this.lbName.text = data.name;
					this.boxMid.visible = false;
					this.lbBottomDesc.text = `会长: `;
					this.lbBottom.text = data.leaderName;
					this.lbValueDesc.text = `最高关卡`;
					this.lbValue.text = data.desc;
					let info = new UserHeadVo(data.head,data.level,data.headFrame,true);
					this.headBox.dataSource = info;
				}
			} else {
				this.headBox.dataSource = null;
			}

		}

	}
}