
module game{
	export class gloryAwardIR extends ui.glory.iRender.AwardIRUI{
		constructor(){
			super();
		}

		public set dataSource($value: IRewardVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource():IRewardVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if(info){
				this.lbName.text = info.title;
				let costList = info.costList ? info.costList : [];
				let rewewardList = info.rewardList ? info.rewardList : [];
				if(costList.length > 0){
					this.itemList.width = costList.length * 90 + (costList.length - 1) * this.itemList.spaceX;
					this.rewardList.x = this.itemList.x + this.itemList.width + 50;
					this.rewardList.spaceX = 10;
				}else{
					this.itemList.width = 0;
					this.rewardList.x = this.itemList.x;
					this.rewardList.spaceX = 10;
				}
				this.rewardList.width = rewewardList.length * 90 + (rewewardList.length - 1) * this.rewardList.spaceX;
				this.itemList.array = costList;
				this.rewardList.array = rewewardList;
			} else{
				this.itemList.array = null;
				this.rewardList.array = null;
			}
		}


	}
}