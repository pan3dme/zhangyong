module game {
	export class BagView extends ui.bag.BagUI {

		private _model: BagModel;
		public bagItemList: common.BagRenderList;

		constructor() {
			super();
			this.group = UIConst.hud_group;
			this._model = BagModel.getInstance();
			this.initUi();
		}

		private initUi() {
			this.bagItemList = new common.BagRenderList(600, 598);
			this.bagItemList.itemRender = BagIR;
			this.bagItemList.spaceY = 1;
			this.bagItemList.x = 47;
			this.bagItemList.y = 158;
			this.bagItemList.max = 1000000;
			this.boxContent.addChildAt(this.bagItemList,5);

			this.list_buttons.selectHandler = new Handler(this, this.onSelect);
			this.list_buttons.renderHandler = new Handler(this, this.onRender);
			this.btn_decomposition.on(Laya.Event.CLICK, this, this.onDecomposition);
			this.raceList.selectHandler = new Handler(this, this.onRaceSelect);
            this.raceList.selectedIndex = -1;
			this.godList.array = null;
			this.godList.mouseHandler = new Handler(this,this.onMouseHandler);
			this.raceList.array = [0, 1, 2, 3, 4,5];
			this.btnFenjie.on(Laya.Event.CLICK, this, this.onFenjie);
			this.treasureList.array = null;
			this.treasureList.mouseHandler = new Handler(this,this.onClickTreasure);
			this.btnTreasureRebirth.on(Laya.Event.CLICK,this,this.onTreasureRebirth);
			this.btnTreasureTujian.on(Laya.Event.CLICK,this,this.onTreasureTujian);
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.BEIBAO);
		}

		public show(): void {
			super.show(false, false);
			this.list_buttons.dataSource = SkinUtil.bagButtons;
			this.list_buttons.selectedIndex = this.dataSource == -1 ? 0 : this.dataSource;
			UIUtil.boxScaleTween(this.boxContent,0.5,1,310,0.05);
		}

		public recycleVisible: boolean = false;
		private onSelect(index: number) {
			if (index == -1) return;
			this.delayListSetData(index);
			this.img_racebg.visible = index == 0;
		}

		/**
		 * 装备删除或增加时，变化
		 */
		public equchange() {
			let curtab = this.list_buttons.selectedIndex;
			if (curtab == TABTYPE.HERO || curtab == TABTYPE.EQU) {
				this.delayListSetData(curtab);
			}
		}
		/** 材料tab变化 */
		public materialChange():void {
			let curtab = this.list_buttons.selectedIndex;
			if (curtab == TABTYPE.CAILIAO) {
				this.delayListSetData(curtab);
			}
		}

		/** 分解 */
        private onFenjie(): void {
            dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
        }

		/** 延迟渲染，防止同帧渲染多次 */
		private delayListSetData(tabid?: number):void {
			Laya.timer.frameOnce(2,this,this.updateData,[tabid]);
		}
		private updateData(tabid?: number):void {
			let id = tabid == undefined ? this.list_buttons.selectedIndex : tabid;
			let isGod = id == TABTYPE.HERO;
			let isTreasure = id == TABTYPE.TREASURE;
			this.lbGodCount.visible = this.godList.visible = this.raceList.visible = isGod;
			this.treasureList.visible = this.btnTreasureRebirth.visible = this.btnTreasureTujian.visible = isTreasure;
			this.bagItemList.visible = !isGod && !isTreasure;
			this.btn_decomposition.visible = id == TABTYPE.EQU;
			this.btnFenjie.visible = id == TABTYPE.HERO;
			if(isGod){
				this.raceList.selectedIndex = this.raceList.selectedIndex != -1 ? this.raceList.selectedIndex : 0;
			}else if(isTreasure) {
				this.raceList.selectedIndex = -1;
				let ary = TreasureModel.getInstance().getBagViewList();
				this.treasureList.array = ary;
				this.lab_empty.visible = ary.length == 0;
			}else{
				this.raceList.selectedIndex = -1;
				this.bagItemList.dataSource = this._model.getListByType(id);
				this.lab_empty.visible = !this.bagItemList.dataSource || this.bagItemList.dataSource.length == 0;
			}
		}

		/** 种族选择 */
        private onRaceSelect(index: number): void {
            if( index == -1 ) return;
			let gods = App.hero.getGodArr().filter((vo)=>{
				return !vo.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
			});
			gods = index == 0 ? gods : gods.filter((vo)=>{
				return vo.getRaceType() == index;
			});
			gods.forEach((vo)=>{
				// 星级-》等级-》稀有度-》阵营
				vo.sortNum = - vo.starLevel * 100000 - vo.level * 100 - vo.tab_god.quality * 10 +　vo.tab_god.race_type;
			});
			gods.sort((a,b)=>{
				return a.sortNum - b.sortNum;
			});
			// 背包 等级前面要加上 LV.只能重新构造vo对象
			let tempGods = gods.map((vo)=>{
				let newVo = GodItemVo.getData(vo,vo.uuid);
				newVo.levelStr = "" + newVo.level;
				return newVo;
			});
            this.godList.array = tempGods;
			this.updateCount();
			if(this.list_buttons.selectedIndex == TABTYPE.HERO){
				this.lab_empty.visible = tempGods.length == 0;
			}
        }

		updateCount():void {
			let index = this.list_buttons.selectedIndex;
			if( index == TABTYPE.HERO){
				let maxNum = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) - App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack,false).length;
				this.lbGodCount.text = LanMgr.getLan("",12350) + `：${this.godList.array.length}/${maxNum}`;
			}else if(index == TABTYPE.TREASURE) {

			}
		}

		/** 选中英雄 */
		private onMouseHandler(event:Laya.Event,index:number):void {
			if(event.type == Laya.Event.CLICK){
				// let godVo = this.godList.getItem(index) as GodItemVo;
				let ids = this.godList.array.map((vo:GodItemVo)=>{
					return vo.uuid;
				});
				dispatchEvt(new GodEvent(GodEvent.SHOW_GOD_CULTURE_VIEW),[index,ids]);
			}
		}
		/** 选中圣物 */
		private onClickTreasure(event:Laya.Event,index:number):void {
			if(event.type == Laya.Event.CLICK){
				let treasureVo = this.treasureList.getItem(index) as TreasureItemVo;
				if(treasureVo){
					TreasureTipsView.popupTip(treasureVo,null,false,{"showStrengthBtn":true,"showStarBtn":true});
				}
			}
		}
		/** 圣物重生 */
		private onTreasureRebirth():void {
			dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_REBIRTH_VIEW));
		}
		/** 圣物图鉴 */
		private onTreasureTujian():void {
			dispatchEvt(new TreasureEvent(TreasureEvent.SHOW_TUJIAN_VIEW));
		}

		private onRender(item: ui.bag.TabUI, index: number) {
			if (!item.dataSource) return;
			item.btn_type.skin = item.dataSource;
			item.btn_zhuobu.selected = index == this.list_buttons.selectedIndex;
			let redname = BagModel.bagTypeName[index];
			if (item.redPoint.redpointName != redname) {
				item.redPoint.setRedPointName(redname);
			}
		}

		public stopScroll() {
			if (this.bagItemList) {
				this.bagItemList.stopScroll();
			}
		}

		/**
         * 刷新某个item
         * @param ndata 
         */
		public updateItem(ndata) {
			//需刷新的数据，是否为当前页签下的合法数据
			if (!this.belongTab(ndata)) {
				return;
			}
			let slist = this.bagItemList.dataSource;
			if(!slist) return;
			for (var v = 0; v < slist.length; v++) {
				let vlist: Array<any> = slist[v];
				for (var l = 0; l < vlist.length; l++) {
					var element = vlist[l];
					if (element instanceof ItemVo && ndata instanceof ItemVo) {
						if (ndata.id == element.id) {
							if (ndata.count <= 0) {
								//如果物品已经使用完，则重置数据源
								this.delayListSetData();
								return;
							}
							ndata.selectid = element.selectid;
							ndata.indexid = element.indexid;
							ndata.countFromBag = true;
							vlist.splice(l, 1, ndata);
							let line = Math.floor(element.indexid / 6)
							let item: BagIR = this.bagItemList.getCell(line) as BagIR;
							if (item) {
								item.updataItem(l);
							}
							return;
						}
					} else if (element instanceof EquipItemVo && ndata instanceof EquipItemVo) {
						if (ndata.uuid == element.uuid) {
							//如果找到当前变化的符文
							ndata.selectid = element.selectid;
							ndata.indexid = element.indexid;
							vlist.splice(l, 1, ndata);
							let line = Math.floor(element.indexid / 6)
							let item: BagIR = this.bagItemList.getCell(line) as BagIR;
							if (item) {
								item.updataItem(l);
							}
							return;
						}
					}
				}
			}
			//新item变化，直接给list重新赋值
			this.delayListSetData();
		}

		/**
		 * 某数据源是否属于当前页签
		 * @param vo 
		 */
		private belongTab(vo) {
			let curtab = this.list_buttons.selectedIndex;
			if (curtab == TABTYPE.HERO) {
				return true;
			}
			if (vo instanceof ItemVo && curtab == TABTYPE.SUIPIAN && vo.type == iface.tb_prop.itemTypeKey.chip) {
				return true;
			}
			if (vo instanceof ItemVo && curtab == TABTYPE.CAILIAO && vo.type == iface.tb_prop.itemTypeKey.materials) {
				return true;
			}
			if (vo instanceof ItemVo && curtab == TABTYPE.CAILIAO && vo.type == iface.tb_prop.itemTypeKey.gift) {
				return true;
			}
			if (vo instanceof ItemVo && curtab == TABTYPE.CAILIAO && vo.type == iface.tb_prop.itemTypeKey.optionalCard) {
				return true;
			}
			if (vo instanceof EquipItemVo && curtab == TABTYPE.EQU) {
				return true;
			}
			if (vo instanceof LimitItemVo && curtab == TABTYPE.CAILIAO) {
				return true;
			}
			if (vo.type == iface.tb_prop.itemTypeKey.optionalCard && curtab == TABTYPE.CAILIAO) {
				return true;
			}
			return false;
		}

		/**
		 * 点击出售
		 */
		private onDecomposition() {
			dispatchEvt(new BagEvent(BagEvent.OPEN_SELL_VIEW));
		}

		/** 刷新神灵 */
		refreshGod():void {
			let index = this.raceList.selectedIndex;
			this.raceList.selectedIndex = -1;
			this.raceList.selectedIndex = index;
		}
		/** 刷新圣物 */
		refreshTreasure(reset:boolean=false):void {
			if(this.list_buttons.selectedIndex != TABTYPE.TREASURE) return;
			if(reset) {
				let ary = TreasureModel.getInstance().getBagViewList();
				this.treasureList.array = ary;
				this.lab_empty.visible = ary.length == 0;
			}else{
				this.treasureList.refresh();
			}
		}

		public close() {
			super.close(null, false);
			this.list_buttons.selectedIndex = -1;
			this.raceList.selectedIndex = -1;
			this.godList.array = null;
			this.bagItemList.dataSource = null;
			this.treasureList.array = null;
			Laya.timer.clearAll(this);
		}
	}
}