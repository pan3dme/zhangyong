/**
* name 
*/
module game {
	export class RewardIR extends ui.activity.shouchong.RewardIRUI {
		private _day: number;
		constructor() {
			super();
		}

		set dataSource(value) {
			this._dataSource = value;
			if (!!value) this.refresh();
		}

		get dataSource(): FirstIRData {
			return this._dataSource;
		}

		refresh(): void {
			let data = this.dataSource;
			let isFinish = data.isFinish();
			let isReward = data.isReward();
			this.itemList.array = data.reward;
			this.imgAlready.visible = isReward;
			let canReward = isFinish && !isReward;
			this._day = this.parent.getChildIndex(this) + 1;
			this.lbday.changeText(`第${this._day}天免费领`);
			this.itemList.x = 31 + (4 - this.itemList.length) * (90 + this.itemList.spaceX) / 2;
		}
	}
}