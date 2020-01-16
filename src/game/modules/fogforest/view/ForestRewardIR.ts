

module game {

    export class ForestRewardIR extends ui.fogforest.RewardIRUI{

        constructor(){
            super();
        }

        public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():ForestGuanqiaVo {
			return this._dataSource;
		}

        refreshView():void {
            let info = this.dataSource;
            if(info) {
                this.lbName.text = LanMgr.getLan("",12002,info.tbForest.ID);
                this.btnLingqu.visible = !info.isReward();
                this.btnLingqu.label = info.isCanReward() ? LanMgr.getLan("",10041) : LanMgr.getLan("",10045);
                this.btnLingqu.gray = !info.isCanReward();
                this.imgYilingqu.visible = info.isReward();
                this.itemList.array = info.tbForest.getBossRewards();
                this.btnLingqu.on(Laya.Event.CLICK,this,this.onClick);
            }else {
                this.btnLingqu.off(Laya.Event.CLICK,this,this.onClick);
            }
        }
        
        private onClick():void {
            dispatchEvt(new FogForestEvent(FogForestEvent.OPEN_BAOXIANG,this));
        }
    }
}