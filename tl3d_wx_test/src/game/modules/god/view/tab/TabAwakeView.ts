/**
* name 
*/
module game {
	/** 觉醒 */
	export class godTabAwakeView extends ui.god.tab.TabJuexingUI {
		
		private _attrToast : string[];
		/** 是否需要初始化 */
		private _needInit : boolean;
		constructor() {
			super();
			this.godList.mouseHandler = new Handler(this,this.openChoose);
			this.attrList.renderHandler = new Handler(this,this.attrRenderHandler);
			this.btn_juexing.on(Laya.Event.CLICK, this, this.onAwaken);
			this.btnLook.on(Laya.Event.CLICK, this, this.onLook);
			this._needInit = true;
		}

		public set dataSource($value:GodItemVo) {
			let oldVo = this._dataSource as GodItemVo;
			if(oldVo && $value && oldVo.uuid == $value.uuid){
				this._needInit = false;
			}else{
				this._needInit = true;
			}
			this._dataSource = $value;
		}
		public get dataSource():GodItemVo {
			return this._dataSource;
		}

		/** 初始化 */
		public init() {
			if (!this._dataSource) return;
			this.initView();
		}
		public close(): void {
			Laya.timer.clearAll(this);
			this._dataSource = null;
			this._needInit = true;
			this.itemList.array = null;
			this.godList.array = null;
			this.attrList.array = null;
			this.redpoint.onDispose();
		}

		private initView() {
			let godVo = this.dataSource;
			if(!godVo || !this._needInit) return;
			this._needInit = false;
			this.redpoint.onDispose();
			if (godVo.isInLinuep(iface.tb_prop.lineupTypeKey.attack)) {
				this.redpoint.setRedPointName(`god_awaken_${godVo.uuid}`);
			}
			this.lbUnlock.visible = this.btnLook.visible = godVo.tab_god.isCanAwaken(); 
			this.lbUnlock.text = LanMgr.getLan("",12360,tb.TB_god_set.get_TB_god_set().awake_section);
			this.refreshJuexing();
		}
		/** 刷新觉醒加成属性及材料 */
		public refreshJuexing() {
			let godItem = this.dataSource;
			if(!godItem) return;
			let tbCondi = tb.TB_awaken_conditions.getTbById(godItem.starLevel);
			this.lbCurLv.text = `${godItem.awakenLv}`;
			this.lbMaxLv.text = `/${tbCondi.awake_section_max}`;
			this.awakenHbox.refresh();
			let curAwaken = tb.TB_god_awaken.getTbById(godItem.awakenLv);
			let nextAwaken = tb.TB_god_awaken.getTbById(godItem.awakenLv + 1);
			
			let items = curAwaken.getMaterialList();
			let gods = curAwaken.getGodMaterialList().map((vo)=>{
				return new GodMaterialVo(vo,this.dataSource);
			});
			let spaceAry = [0,50,40,30,20,20,20,20,20];
			let space = spaceAry[items.length+gods.length];
			space = space <= 20 ? 20 : space;
			this.itemList.array = items;
			this.itemList.spaceX = space;
			this.itemList.repeatX = items.length;
			this.itemList.width = items.length * 100 + (items.length - 1) * this.itemList.spaceX;
			
			this.godList.array = gods;
			Laya.timer.callLater(this,this.refreshGodList);
			this.godList.spaceX = space;
			this.godList.repeatX = gods.length;
			this.godList.width = gods.length == 0 ? 1 : gods.length * 100 + (gods.length -1) * this.godList.spaceX;

			let jiange = gods.length == 0 ? 0 : space;
			this.itemList.x = this.width / 2 - (this.godList.width + this.itemList.width + jiange) / 2;
			this.godList.x = this.itemList.x + this.itemList.width + jiange;
			this._attrToast = [];
			// 属性数组 -- 默认
			let resultAry = [];
			for(let i = 0 ; i < curAwaken.attr.length ; i++){
				let ary = curAwaken.attr[i];
				let type = ary[0];
				let val = ary[1];
				let nextVal = nextAwaken ? nextAwaken.getAttrValue(type) : 0;
				// 加成值：未达到最大值时显示加成，达到最大值时不显示（-1表示）
				let addVal = godItem.awakenLv < godItem.maxAwakenLv ? (nextVal-val) : -1;
				resultAry.push([type,val,addVal]);
				if(addVal > 0){
					this._attrToast.push(`${iface.tb_prop.attrType[type]}+${addVal}`);
				}
			}
			this.attrList.array = resultAry;
			let isMax = godItem.awakenLv >= godItem.maxAwakenLv;
			this.btn_juexing.visible = this.itemList.visible = this.godList.visible = !isMax;
			this.maxLvNoticeBox.visible = isMax;
			this.imgDi.y = isMax ? 255 : 205;
		}
		/** 属性渲染 */
		private attrRenderHandler(box:Laya.Box,index:number):void {
			let imgAttr = box.getChildByName("imgAttr") as Laya.Image;
			let lbAttrVal = box.getChildByName("lbAttrVal") as Laya.Label;
			lbAttrVal.autoSize = true;
			let lbNextAdd = box.getChildByName("lbNextAdd") as Laya.Label;
			lbNextAdd.autoSize = true;
			let data : any[] = box.dataSource;
			if(data){
				imgAttr.skin = SkinUtil.getAttrSkin(data[0]);
				lbAttrVal.text = data[1];
				lbNextAdd.text = `(+${data[2]})`;
				lbNextAdd.visible = data[2] != -1;
				if(lbNextAdd.visible){
					let textWth = lbAttrVal.width + lbNextAdd.width + 34 + 10;
					imgAttr.x = 152 / 2 - textWth / 2 + 17;
					lbAttrVal.x = imgAttr.x + 17+5;
					lbNextAdd.x = lbAttrVal.x + lbAttrVal.width+5;
				}else{
					let textWth = lbAttrVal.width + 34+5;
					imgAttr.x = 152 / 2 - textWth / 2 +17;
					lbAttrVal.x = imgAttr.x + 17+5;
				}
			}
		}

		/** 刷新道具材料列表 */
		public refereshItemList():void {
			this.itemList.refresh();
		}

		/** 刷新神灵材料列表 */
		public refreshGodList():void {
			for(let item of this.godList.cells){
				(<GodMaterialIR>item).refreshData(this.godList.array);
			}
		}

		/**  点击觉醒 */
		private onAwaken() {
			if(!this.dataSource) return;
			dispatchEvt(new GodEvent(GodEvent.CLICK_JUEXING_EVENT),[this.dataSource,this.godList.array]);
		}
		/** 查看觉醒模型 */
		private onLook():void {
			if(!this.dataSource) return;
			UIMgr.showUI(UIConst.GodSkinView,[this.dataSource,-1]);
		}

		private openChoose(event:Laya.Event,index:number):void {
			if (event.type == Laya.Event.CLICK) {
                let item = this.godList.getCell(index) as GodMaterialIR;
				let info = item.dataSource;
				if(info){
					let ary : GodChooseMaterialVo[] = [];
					let godList : GodMaterialVo[] = this.godList.array;
					for(let vo of godList){
						if(vo != info){
							ary.push(...vo.choose)
						}
					}
					let listdata: any[] = GodUtils.filterGods(info.tbVo,info.curGod, ary);
					if (listdata.length > 0) {
						let obj : ChooseGodVo = {allList:listdata,curMaterail:info,openType:ChooseOpenType.awaken};
						UIMgr.showUI(UIConst.God_ChooseGodView, obj);
					}
					else {
						showToast(LanMgr.getLan("", 10368));
					}
				}
            }
		}

		getAttrToast():any[]{
			return this._attrToast;
		}

		/**
		 * 渲染星星
		 */
		private onXingjiRender(cell:Laya.Image,index:number):void {
			let data = cell.dataSource;
			if(data){
				cell.skin = SkinUtil.superXing;
				cell.width = 29;
				cell.height = 31;
			}else{
				cell.skin = SkinUtil.xingxing;
			}
		}

	}
}