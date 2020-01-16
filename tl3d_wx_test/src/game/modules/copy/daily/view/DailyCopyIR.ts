
module game {
    export class DailyCopyIR extends ui.dailycopy.DailyCopyIRUI {
        constructor(){
			super();
		}

		public set dataSource($value: DailyCopyInfoVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource(): DailyCopyInfoVo{
			return this._dataSource;
		}

        private refreshData(): void {
            let info = this.dataSource;
            if(!info){
				tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateCount,this);
				return;
			}
			this.lb_difficulty.text = info.tbCopy.name;
			this.lb_difficulty.color = ColorConst.getDailyCopyColor(info.subType);
			this.list_items.array = info.tbCopy.getRewardList();
			this.btn_fight.skin = SkinUtil.buttonNormal;
			this.lab_cost.strokeColor = ColorConst.ORANGE_FILTER;
            if (!info.isLvLimit()) {
	            if (App.hero.isPassDailyCopy(info.tbCopy.ID)){
					this.btn_fight.skin = SkinUtil.buttonGreen;
					this.btn_fight.labelStrokeColor = ColorConst.GREEN_FILTER;
					this.lab_cost.strokeColor = ColorConst.GREEN_FILTER;
					//已通关
					this.btn_fight.label = LanMgr.getLan('', 12494);
				}else{
					this.btn_fight.label = LanMgr.getLan('', 12292);
					this.btn_fight.labelStrokeColor = ColorConst.getDailyCopyBtnStroke(false);
				}
				this.btn_fight.gray = false;
				this.lb_limit.visible = false;
				this.updateCount();
				tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateCount,this);
	        } else {
				this.btn_fight.gray = true;
				this.box_cost.visible = false;
				this.btn_fight.labelPadding = null;
				this.btn_fight.label = LanMgr.getLan('', 10104);
				this.btn_fight.labelStrokeColor = ColorConst.getDailyCopyBtnStroke(true);
				this.lb_limit.visible = true;
				this.lb_limit.text = LanMgr.getLan('', 12493, info.tbCopy.level);
				tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE,this.updateCount,this);
			}
			this.btn_fight.on(Laya.Event.CLICK, this, this.onClick);
        }

		//
		private updateCount():void{
			let count = App.hero.getOverplusValue(this.dataSource.getOverplusType());
			if (count <= 0){
				this.box_cost.visible = true;
				let costNum:number = DailyCopyModel.getInstance().getBuyCost(this.dataSource.getLimitType());
				this.lab_cost.text = costNum+"";
				if (costNum > 99){
					this.btn_fight.labelPadding = "0,0,0,36";
					this.box_cost.x = 453;
				}else{
					this.btn_fight.labelPadding = "0,0,0,28";
					this.box_cost.x = 457;
				}
			}else{
				this.box_cost.visible = false;
				this.btn_fight.labelPadding = null;
			}
		}

		private onClick(): void {
			dispatchEvt(new DailyEvent(DailyEvent.CHALLENGE_BOSS, this.dataSource));
		}
    }
}