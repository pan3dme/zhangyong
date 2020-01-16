/**
* name 
*/
module game{
	export interface ChooseGodVo {
		allList : any[];	// 列表数据
		curMaterail : GodMaterialVo;	// 当前格子材料数据
		openType : number;	// 打开类型
	}
	export class ChooseGodView extends ui.god.ChooseGodUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, title:LanMgr.getLan("",12371) };
			this.list_gods.itemRender = ChooseGodIR;
			this.list_gods.mouseHandler = new Handler(this,this.onListHandler);
			this.btn_queding.on(Laya.Event.CLICK, this, this.onConfirm);
		}
		
		public popup(){
			super.popup();
			this.initView();
		}

		public onClosed(){
			super.onClosed();
			this.list_gods.array = null;
			Laya.timer.clearAll(this);
		}

		private initView():void{
			let data : ChooseGodVo = this.dataSource;
			this.list_gods.array = data.allList;
			Laya.timer.callLater(this,this.initSelected);
		}
		/** 初始化选中 */
		private initSelected():void {
			let data : ChooseGodVo = this.dataSource;
			if(!data || !data.curMaterail) return;
			let choose = data.curMaterail.choose;
			let cells = this.list_gods.cells;
			for(let key in cells){
				let item : ChooseGodIR = cells[key];
				let info = item.dataSource;
				if(!info) continue;
				if(info instanceof GodItemVo){
					let exist = choose.some((vo)=>{
						return vo.type == MaterialType.god && vo.id == info.uuid;
					});
					item.img_gouxuan.visible = exist;
				}else if(info instanceof ItemVo) {
					let exist = choose.some((vo)=>{
						return vo.type == MaterialType.card && vo.id == info.id && vo.index == Number(key);
					});
					item.img_gouxuan.visible = exist;
				}
			}
		}

		private onListHandler(event:Laya.Event,index:number):void {
			if (event.type == Laya.Event.CLICK) {
				let item = this.list_gods.getCell(index) as ChooseGodIR;
				let info = item.dataSource;
				let chooseVo : ChooseGodVo = this.dataSource;
				if(!info || !chooseVo) return;
				if(info instanceof GodItemVo){
					if (info.isInLinuep(iface.tb_prop.lineupTypeKey.attack)) {
						common.AlertBox.showAlert({
							text: LanMgr.getLan("", 10501), confirmCb: () => {
								GodUtils.downGods(info).then(()=>{
									this.refreshData();
								});
							}
						});
						return;
					}
				}
				let curMaterail = chooseVo.curMaterail;
				if (!item.img_gouxuan.visible) {
					let curNum = this.getCurSelectedCount();
					if(chooseVo.openType == ChooseOpenType.awaken || chooseVo.openType == ChooseOpenType.starUp){
						if (curNum >= curMaterail.tbVo.count) {
							showToast(LanMgr.getLan("", 10366, curMaterail.tbVo.count));
							return;
						}
					}
				}
				item.img_gouxuan.visible = !item.img_gouxuan.visible;
			}
		}

		/** 刷新数据 */
		private refreshData():void {
			let cells = this.list_gods.cells;
			for(let key in cells){
				let item : ChooseGodIR = cells[key];
				if(item.dataSource){
					item.refreshData();
				}
			}
		}

		/** 确定 */
		private onConfirm():void {
			let data : ChooseGodVo = this.dataSource;
			if(!data) return;
			data.curMaterail.choose = [];
			let cells = this.list_gods.cells;
			for(let key in cells){
				let item : ChooseGodIR = cells[key];
				let info = item.dataSource;
				if(info && item.img_gouxuan.visible){
					let type = -1;
					let id;
					if(info instanceof GodItemVo){
						type =  MaterialType.god;
						id = info.uuid
					}else if(info instanceof ItemVo){
						type =  MaterialType.card;
						id = info.id;
					}
					if(type != -1){
						data.curMaterail.choose.push({type,id,index:Number(key)})
					}
				}
			}
			if(data.openType == ChooseOpenType.awaken){
				if(UIMgr.hasStage(UIConst.God_MainView)){
					let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
					if(view.viewJuexing){
						view.viewJuexing.refreshGodList(); 
					}
				}
				if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
					let view = (UIMgr.getUIByName(UIConst.God_GodCultureView) as GodCultureView).viewJuexing;
					if(view){
						view.refreshGodList();
					}
                }
			}else if(data.openType == ChooseOpenType.starUp){
				if(UIMgr.hasStage(UIConst.God_MainView)){
					let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
					if(view.viewStarup){
						view.viewStarup.refreshChooseList(); 
					}
				}
				if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
					let view = (UIMgr.getUIByName(UIConst.God_GodCultureView) as GodCultureView).viewStarup;
					if(view){
						view.refreshChooseList(); 
					}
                }
			}
			this.close();
		}

		/** 获取当前选中的物品数量 */
		getCurSelectedCount():number {
			let num = 0;
			let cells = this.list_gods.cells;
			for(let key in cells){
				let item : ChooseGodIR = cells[key];
				if(item.dataSource && item.img_gouxuan.visible){
					num ++;
				}
			}
			return num;
		}
		
	}
}