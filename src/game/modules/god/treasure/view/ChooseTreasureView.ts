/**
* name 
*/
module game{
	/** 打开选择圣物的界面类型 */
	export enum ChooseTreasureOpenType {
		wear = 1,		// 选择圣物穿戴
		change = 2,		// 选择圣物替换
		rebirth = 3,	// 选择圣物重生
	}

	/** 选择圣物界面 */
	export class ChooseTreasureView extends ui.god.treasure.ChooseTreasureUI{

		private _openType : number;
		private _godVo : GodItemVo;
		private _treasureVo : TreasureItemVo;
		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true };
			this.itemList.selectedIndex = -1;
			this.itemList.selectEnable = false;
			this.itemList.mouseHandler = new Handler(this,this.onSelect)
		}
		
		public popup(closeOther?: boolean, showEffect?: boolean){
			super.popup(closeOther,showEffect);
			this.initView();
		}

		public onClosed(){
			super.onClosed();
			this.itemList.array = null;
			this.itemList.selectedIndex = -1;
			Laya.timer.clearAll(this);
			this._openType = 0;
			this._treasureVo = null;
			this._godVo;
		}

		private initView():void{
			let args = this.dataSource;
			this._openType = args[0];
            this._treasureVo = args[1];
            this._godVo = args[2];
			let model = TreasureModel.getInstance();
			if(this._openType == ChooseTreasureOpenType.rebirth) {
				this.itemList.array = model.getRebirthTreasureList();
			}else{
				this.itemList.array = model.getTreasureChooseList(true);
			}
		}

		private onSelect(evt: Laya.Event, index: number):void {
			if(index == -1) return;
			if(evt.type == Laya.Event.CLICK) {
				let treasureVo = this.itemList.array[index];
				if(!treasureVo) return;
				if(this._openType == ChooseTreasureOpenType.wear || this._openType == ChooseTreasureOpenType.change) {
					TreasureTipsView.popupTip(treasureVo,this._godVo,true);
				}else if(this._openType == ChooseTreasureOpenType.rebirth){
					TreasureTipsView.popupTip(treasureVo,this._godVo,false,{"chooseFlag":true});
				}
			}
		}

	}
}