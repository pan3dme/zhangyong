/**
* name 
*/
module game {
	export class ClgRewardIR extends Laya.HBox {
		constructor() {
			super();
		}

		set dataSource(v: number[]) {
			this._dataSource = v;
			if (!!v) this.refreshData();
		}

		get dataSource(): number[] {
			return this._dataSource;
		}

		private refreshData(): void {
			let data = this.dataSource;
			if (data) {
				let childs = this._childs;
				let item = tb.TB_item.get_TB_itemById(data[0]);
				childs[1].text = `+${data[1]}`;
				childs[0].skin = SkinUtil.getCostSkin(item.ID);
				childs[0].size(36,36);
				this.refresh();
			}
		}
	}
}