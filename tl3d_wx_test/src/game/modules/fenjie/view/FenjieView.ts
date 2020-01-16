/**
* name 
*/
module game {
	export class FenjieView extends ui.fenjie.FenjieUI {

		private _curSelectGods: GodItemVo[] = [];
		private _model: FenjieModel;
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12575) };
			this.bgPanel.box_Content.addChild(this.img_bg);
			this._curSelectGods = [];
			this.list_race.selectHandler = new Handler(this, this.onRaceSelect);
			this.list_race.renderHandler = new Handler(this, this.onRaceRender);
			this.list_race.selectedIndex = -1;
			this.list_gods.mouseHandler = new Handler(this, this.onMouseHandler);
			this.list_gods.renderHandler = new Handler(this, this.onGodRender);
			this._model = FenjieModel.getInstance();
		}

		public close(type?: string, showEffect?: boolean, sound = true): void {
			super.close();
			this._model.tempReturnData = {};
			this.list_gods.array = null;
			this.list_race.array = null;
			this.list_race.selectedIndex = -1;
			this._curSelectGods.length = 0;
			this.btn_fast.off(Laya.Event.CLICK, this, this.onFast);
			this.btn_fenjie.off(Laya.Event.CLICK, this, this.onFenjie);
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(false, false);
			this.initView();
		}

		/** 初始化界面 */
		private initView(): void {
			this._model.tempReturnData = {};
			this.btn_fast.on(Laya.Event.CLICK, this, this.onFast);
			this.btn_fenjie.on(Laya.Event.CLICK, this, this.onFenjie);
			this.btnNext.on(Laya.Event.CLICK, this, this.onScroll, [true]);
			this.btnPrev.on(Laya.Event.CLICK, this, this.onScroll, [false]);
			//种族数据
			this.list_race.array = [0, 1, 2, 3, 4, 5];
			this.list_race.selectedIndex = 0;
			//展示已拥有神灵数目/总神灵数目
			this.showHaveGod();
			this.refreshItemList();
		}

		/** 展示现有英雄数/最大可拥有英雄数 */
		public showHaveGod() {
			//获取到vip所拥有的最大英雄数量
			let maxGods = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum);
			//展示现有英雄数/最大可拥有英雄数
			this.lab_godnum.text = LanMgr.getLan("",12578,GodUtils.getGodsNum(),maxGods);
		}
		/** 刷新返还材料 */
		public refreshItemList(): void {
			let len = this._curSelectGods.length;
			this.lbSelect.text = len > 0 ? LanMgr.getLan("",12576) : LanMgr.getLan("",12577);
			this._model.requestReturnList(this._curSelectGods).then((itemList: any[]) => {
				itemList = itemList || [];
				let len = itemList.length;
				this.btnPrev.visible = this.btnNext.visible = itemList.length > 5;
				let listWidth = 100 * len + (len - 1) * this.itemList.spaceX;
				listWidth = listWidth > 556 ? 556 : listWidth;
				this.itemList.array = itemList;
				this.itemList.width = listWidth;
			});
		}

		/** 刷新界面 */
		public refreshView(): void {
			this.onRaceSelect(this.list_race.selectedIndex);
		}

		private onRaceRender(cell: common.RaceBox, index: number): void {
			if (!cell) return;
			cell.img_selected.visible = index == this.list_race.selectedIndex;
		}

		/**
		 * 选择的英雄种族
		 * @param index 
		 */
		private onRaceSelect(index: number) {
			if (index == -1) return;
			let gods = App.hero.getGodAry().filter((vo) => {
				return index == 0 ? true : vo.getRaceType() == index;
			});
			this.sortGods(gods);
			this.list_gods.array = gods;
			this.clearSelect();
		}
		private sortGods(gods: GodItemVo[]): void {
			//排序 分解排列规则按照 未上阵（按照星级、再按照等级从低到高排）、已上阵排列
			gods.forEach((vo) => {
				vo.sortNum = 0;
				if (vo.isInLinuep()) {
					vo.sortNum = 100000;
					vo.sortNum += (vo.isInLinuep(iface.tb_prop.lineupTypeKey.attack) ? 1 : 2);
				} else {
					vo.sortNum += (vo.starLevel * 1000 + vo.level);
				}
			});
			gods.sort((a, b) => {
				return a.sortNum - b.sortNum;
			});
		}

		/** 选择英雄 */
		private onMouseHandler(event: Laya.Event, index: number): void {
			if (event.type == Laya.Event.CLICK) {
				let cell = this.list_gods.getCell(index) as ui.god.render.ChooseBoxUI;
				let godVo = cell.dataSource as GodItemVo;
				if (!godVo) return;
				if (cell.img_gouxuan.visible) {
					cell.img_gouxuan.visible = false;
					let index = this._curSelectGods.findIndex((vo) => {
						return vo.uuid == godVo.uuid;
					});
					if (index != -1) {
						this._curSelectGods.splice(index, 1);
					}
				} else {
					if (this._curSelectGods.length >= 10) {
						showToast(LanMgr.getLan('', 10309));
						return;
					}
					if (godVo.isInLinuep()) {
						common.AlertBox.showAlert({
							text: LanMgr.getLan("", 10501), confirmCb: () => {
								dispatchEvt(new GodEvent(GodEvent.CHOOSE_LINEUP_GOD), godVo);
							}
						});
						return;
					}
					if (godVo.starLevel >= 6) {
						showToast(LanMgr.getLan("", 10310));
						return;
					}
					cell.img_gouxuan.visible = true;
					this._curSelectGods.push(godVo);
				}
				this.refreshItemList();
			}
		}

		private onGodRender(cell: ui.god.render.ChooseBoxUI, index: number): void {
			let item = cell.dataSource as GodItemVo;
			if (item) {
				cell.god_icon.dataSource = item;
				cell.item_icon.dataSource = null;
				cell.item_icon.visible = false;
				cell.god_icon.visible = true;
				cell.img_gouxuan.visible = this._curSelectGods.some(vo => vo.uuid == item.uuid);
				cell.gray = item.isInLinuep();
			} else {
				cell.god_icon.dataSource = null;
				cell.item_icon.dataSource = null;
				cell.gray = false;
				cell.img_gouxuan.visible = false;
			}
		}

		//按钮事件
		/** 快速选择 */
		private onFast() {
			let ary = [];
			let godsAry: Array<GodItemVo> = this.list_gods.array;
			//开始快速选择十个英雄
			for (let i = 0; i < 10; i++) {
				if (!godsAry[i] || godsAry[i].isInLinuep() || godsAry[i].starLevel >= 6) continue;
				ary.push(godsAry[i]);
			}
			this.fastSelect(ary);
		}
		/** 快速选择 */
		private fastSelect(selectAry: GodItemVo[]): void {
			let ids = selectAry.map((vo) => {
				return vo.uuid;
			})
			for (let i = 0; i < this.list_gods.cells.length; i++) {
				let cell = this.list_gods.cells[i] as ui.god.render.ChooseBoxUI;
				let godVo = cell.dataSource as GodItemVo;
				cell.img_gouxuan.visible = godVo && ids.indexOf(godVo.uuid) != -1;
			}
			this._curSelectGods = selectAry;
			this.refreshItemList();
		}
		/** 清除选中 */
		public clearSelect(): void {
			for (let i = 0; i < this.list_gods.cells.length; i++) {
				let cell = this.list_gods.cells[i] as ui.god.render.ChooseBoxUI;
				cell.img_gouxuan.visible = false;
			}
			this._curSelectGods.length = 0;
		}

		/** 点击分解 */
		private onFenjie() {
			dispatchEvt(new FenjieEvent(FenjieEvent.CLICK_BTN_FENJIE), this._curSelectGods);
		}

		private onScroll(next: boolean): void {
			if (next) {
				this.itemList.scrollBar.value += 300;
			} else {
				this.itemList.scrollBar.value -= 300;
			}
		}

	}
}