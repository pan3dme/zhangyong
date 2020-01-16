/**
* name 
*/
module game{
	export class TowerJiangliIR extends ui.tower.JiangliIRUI{
		constructor(){
			super();
		}

		public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource():JiangliVo {
            return this._dataSource;
        }

		private refreshData() {
            let data = this.dataSource;
            if (this._dataSource) {
				this.lbName.text = data.getNandu();
				this.lbDesc.text = data.tbTrial.desc;
				this.rewardList.dataSource = data.tbTrial.getRewardList();
                this.imgLingqu.visible = data.isReward();
            }else{
                this.rewardList.array = null;
            }
        }
	}

}