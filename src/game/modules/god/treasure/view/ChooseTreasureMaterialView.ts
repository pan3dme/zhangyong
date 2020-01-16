/**
* name 
*/
module game{
	export interface ChooseTreasureViewVo {
		allList : any[];	// 列表数据
		curMaterail : TreasureMaterialVo;	// 当前格子材料数据
		openType ?: number;	// 打开类型
	}
	export class ChooseTreasureMaterialView extends ui.god.treasure.ChooseMaterialUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true, title:"" };
			this.itemList.mouseHandler = new Handler(this,this.onListHandler);
			this.itemList.selectEnable = false;
			this.btnComfirm.on(Laya.Event.CLICK, this, this.onConfirm);
		}
		
		public popup(){
			super.popup();
			this.initView();
		}

		public onClosed(){
			super.onClosed();
			this.itemList.array = null;
			Laya.timer.clearAll(this);
		}

		private initView():void{
			let data : ChooseTreasureViewVo = this.dataSource;
			this.itemList.array = data.allList;
			Laya.timer.callLater(this,this.initSelected);
		}
		/** 初始化选中 */
		private initSelected():void {
			let data : ChooseTreasureViewVo = this.dataSource;
			if(!data || !data.curMaterail) return;
			let choose = data.curMaterail.choose;
			let cells = this.itemList.cells;
			for(let key in cells){
				let item : ChooseTreasureIR = cells[key];
				let info = item.dataSource;
				if(!info) continue;
                let exist = choose.some((vo)=>{
                    return vo.id == info.uuid;
                });
                item.imgGouxuan.visible = exist;
			}
		}

		private onListHandler(event:Laya.Event,index:number):void {
			if (event.type == Laya.Event.CLICK) {
				let item = this.itemList.getCell(index) as ChooseTreasureIR;
				let info = item.dataSource;
				let chooseVo : ChooseTreasureViewVo = this.dataSource;
				if(!info || !chooseVo) return;
				let curMaterail = chooseVo.curMaterail;
				if (!item.imgGouxuan.visible) {
					let curNum = this.getCurSelectedCount();
					if (curNum >= curMaterail.tbVo.count) {
                        showToast(LanMgr.getLan("", 10366, curMaterail.tbVo.count));
                        return;
                    }
				}
				item.imgGouxuan.visible = !item.imgGouxuan.visible;
			}
		}


		/** 确定 */
		private onConfirm():void {
			let data : ChooseTreasureViewVo = this.dataSource;
			if(!data) return;
			data.curMaterail.choose = [];
			let cells = this.itemList.cells;
			for(let key in cells){
				let item : ChooseTreasureIR = cells[key];
				let info = item.dataSource;
				if(info && item.imgGouxuan.visible){
					data.curMaterail.choose.push({id:info.uuid,index:Number(key)});
				}
			}
            if(UIMgr.hasStage(UIConst.TreasureStarupView)) {
                let view = UIMgr.getUIByName(UIConst.TreasureStarupView) as TreasureStarupView;
                view.refreshChooseList(); 
            }
			this.close();
		}

		/** 获取当前选中的物品数量 */
		getCurSelectedCount():number {
			let num = 0;
			let cells = this.itemList.cells;
			for(let key in cells){
				let item : ChooseTreasureIR = cells[key];
				if(item.dataSource && item.imgGouxuan.visible){
					num += item.dataSource.num;
				}
			}
			return num;
		}
		
	}
}