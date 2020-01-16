

module game {

    export class TrialTaskIR extends ui.task.itemrender.TrialIRUI {
        
		constructor() {
			super();
		}

		public set dataSource($value:TrialTaskVo) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():TrialTaskVo {
			return this._dataSource;
		}

		public refreshView() {
            let info = this.dataSource;
			if (info) {
				this.lbTitle.text = info.getTitle();
				this.lbGetNum.text = info.tbData.obtain_exp +"";
				this.lbCount.text = `${info.getNum()}/${info.tbData.num}`;
				this.pbNum.value = info.getNum() / info.tbData.num;
				let isFinish = info.isFinish();
				let isReward = info.isReward();
				this.lbContent.text = info.tbData.name;
				if(isReward){
                    this.btnLingqu.label = LanMgr.getLan('',10043);
                    this.btnLingqu.skin = SkinUtil.buttonNormal;
                    this.btnLingqu.labelStrokeColor=ColorConst.ORANGE_FILTER;
                    this.btnLingqu.disabled = true;
                    this.lbContent.color = ColorConst.normalFont;
                }else{
                    this.btnLingqu.disabled = false;
                    if(isFinish){
                        this.btnLingqu.label = LanMgr.getLan('',10041);
                        this.btnLingqu.skin = SkinUtil.buttonGreen;
                        this.btnLingqu.labelStrokeColor=ColorConst.GREEN_FILTER;
                        this.lbContent.color = ColorConst.GREEN;
                    }else{
                        this.btnLingqu.label = LanMgr.getLan('',10042);
                        this.btnLingqu.skin = SkinUtil.buttonNormal;
                        this.btnLingqu.labelStrokeColor=ColorConst.ORANGE_FILTER;
                        this.lbContent.color = ColorConst.RED;
                    }
                }
                this.imgRedpoint.visible = isFinish && !isReward;
                this.btnLingqu.on(Laya.Event.CLICK,this,this.onClick);
			}else{
                this.btnLingqu.off(Laya.Event.CLICK,this,this.onClick);
            }
		}


        private onClick():void {
            let info = this.dataSource;
			if (info){
				dispatchEvt(new TaskEvent(TaskEvent.TO_REWARD_TRAIL_TASK,info));
			}
        }
        
	}
}