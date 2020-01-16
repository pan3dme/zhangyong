/**
* name 
*/
module game {
	export class UpRoadEntrance extends ui.uproad.UpRoadEntranceUI {
		constructor() {
			super();
			this.imgIcon.skin = "";
			this.pro_value.value = 0;
			this.lab_pro.text = ""
		}

		private _curURLv:number;
		private _maxLv:number = 0;
		private _curAdvanceRoadT:tb.TB_advance_road;
		public show():void{
			tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
			tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
			this.on(Laya.Event.CLICK, this, this.onclick);

			this.ui_red.setRedPointName("uproad_red");
			this._curURLv = App.hero.tasks.advanceLevel;
			this._maxLv = tb.TB_advance_road.getMaxLevel();
			let idx:number = this._curURLv >= this._maxLv ? this._maxLv : this._curURLv+1;
			this._curAdvanceRoadT = tb.TB_advance_road.getSet(idx);
			this.updateLevel();
		}

		private onConditionChange():void{
			this.updateProgress();
		}

		private onUpRoadChange():void{
			let newLv:number = App.hero.tasks.advanceLevel;
			if (newLv != this._curURLv){
				this._curURLv = newLv;
				let idx:number = this._curURLv >= this._maxLv ? this._maxLv : this._curURLv+1;
				this._curAdvanceRoadT = tb.TB_advance_road.getSet(idx);
				this.updateLevel();
			}
		}

		private updateLevel():void{
			if (!this._curAdvanceRoadT) return;
			this.imgIcon.skin = LanMgr.getLan("zhaohuanshi/{0}.png", -1, this._curAdvanceRoadT.ID);
			this.updateProgress();
		}

		private updateProgress():void{
			if (!this._curAdvanceRoadT) return;
			let hasNum:number = this.getCompleteNum();
			let needNum:number = this._curAdvanceRoadT.condition.length;
			this.lab_pro.text = LanMgr.getLan("{0}/{1}", -1, hasNum, needNum);
			this.pro_value.value = hasNum/needNum;
		}

		private getCompleteNum():number{
			if (!this._curAdvanceRoadT) return 0;
			let num:number = 0;
			let advanceInfos = App.hero.tasks.advanceInfos;
			for (let i:number = 0; i < this._curAdvanceRoadT.condition.length; i++){
				let id:number = this._curAdvanceRoadT.condition[i];
				if (advanceInfos[id] && advanceInfos[id].reward && advanceInfos[id].reward > 0){
					num++;
				}
			}
			return num;
		}

		private onclick():void{
			UIMgr.showUI(UIConst.UpRoadView);
		}

		public close():void{
			tl3d.ModuleEventManager.removeEvent(UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
			tl3d.ModuleEventManager.removeEvent(UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
			this.off(Laya.Event.CLICK, this, this.onclick);

			this.ui_red.onDispose();
			this._curAdvanceRoadT = null;
			this.imgIcon.skin = "";
			this.pro_value.value = 0;
			this.lab_pro.text = ""
		}

		

		

	
		public destroy(destroyChild:boolean = true):void{
			super.destroy(destroyChild);
		}

	}
}