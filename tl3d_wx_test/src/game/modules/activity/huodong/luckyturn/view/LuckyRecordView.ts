module game{
   /** 记录 */
	export class LuckyRecordView extends ui.activity.huodong.luckyturn.luckyRecordUI{

		private _model : HuodongModel;
		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnButton:true, closeOnSide: this.isModelClose, title:"记录" };
			this.bgPanel.addChildAt(this.img_bg, 3);
			this._model = HuodongModel.getInstance();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther,showEffect);
            this.initView();		
		}
		close():void {
			super.close();
			if (this.recordList.renderHandler){
				this.recordList.renderHandler.recover();
				this.recordList.renderHandler = null;
			}
			this.recordList.array = null;
			let model = this._model;
			model.godRecord = null;
			model.equipRecord = null;
			model.treasureRecord = null;
		}

		private initView():void {
			this.recordList.renderHandler = Handler.create(this, this.recordListIR, null, false);
            tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_RECORD_CHANGE,this.updateRecordList,this);
			this.updateRecordList();
        }

		private updateRecordList():void{
			this.recordList.array = this._model.getRecordByType(this.dataSource);
		}

		private recordListIR(cell: Laya.Label, index: number): void {
			let data: any[] = cell.dataSource;
			if (data) {
				cell._childs[0].text = data[0];
				cell._childs[0].event(Laya.Event.RESIZE);
				let item = tb.TB_item.get_TB_itemById(data[1]);
				cell._childs[2].text = `${item.name}X${Snums(data[2])}`;
				cell.event(Laya.Event.RESIZE);
			} else {

			}
		}

        

    }

}