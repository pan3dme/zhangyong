/**
* name 
*/
module game {
	export class RefineView extends ui.equip.EquipRefineUI {
		/**当前经验 */
		private _curExp: number;
		/**需要经验 */
		private _needExp: number;
		/**表现经验 */
		private _perCurExp: number;
		/**开启定时器 */
		private _isSchedule: boolean;
		/**至多精炼到n级 */
		private _maxRefineLevel: number;
		/**经验Label */
		private _arrLabel: Array<Laya.Label>;
		/**拥有精炼石 */
		private _hasCostStones: Array<number>
		/**精炼按钮 */
		private _arrButton: Array<Laya.Button>;
		/**使用的精炼石 */
		private _useCostStones: Array<Array<number>>;
		/**限制信息 */
		private tbEquipSet = tb.TB_equip_set.get_TB_equip_setById(1);
		constructor() {
			super();
			this._isSchedule = false;
			this.isModelClose = true;
			this.btn_refine.on(Laya.Event.CLICK, this, this.refine);
			this.btn_next.on(Laya.Event.CLICK, this, this.switch, [1]);
			this.btn_last.on(Laya.Event.CLICK, this, this.switch, [-1]);
			this.btn_red.on(Laya.Event.CLICK, this, this.redlevel, [1]);
			this.btn_add.on(Laya.Event.CLICK, this, this.addlevel, [1]);
			this.btn_red10.on(Laya.Event.CLICK, this, this.redlevel, [10]);
			this.btn_add10.on(Laya.Event.CLICK, this, this.addlevel, [10]);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView(this.dataSource);
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView(this.dataSource);
		}

		public initView(data: EquipItemVo): void {
			this.dataSource = data;
			this.initHeroCostAry();
			this.ui_itemBox.dataSource = data;
			this.btn_last.disabled = data.slot == 1;
			this.btn_next.disabled = data.slot == 4;
			this._perCurExp = data.getcurRefineExp();
			let level: number = data.getRefineLevel();
			this.lab_nowLevel.changeText(level.toString());
			this.lab_nextLevel.changeText((level + 1).toString())
			this.list_nowAtrri.dataSource = data.getAttributeByValue(0,0);
			this.lab_xiajie.visible = data.refineLv < this.tbEquipSet.refine_maxlevel;
			let model = EquipModel.getInstance();
			this.btn_last.visible = model.showEquipByView != EquipType.BAG_VIEW;
			this.btn_next.visible = model.showEquipByView != EquipType.BAG_VIEW;
			this.bgPanel.dataSource = { uiName: UIConst.Equip_Refine, closeOnSide: this.isModelClose };
			if (data.refineLv < this.tbEquipSet.refine_maxlevel) this.list_nextAtrri.array = data.getAttributeByValue(0, 1);
			else this.list_nextAtrri.array = [];
		}

		/**玩家拥有材料数量 */
		private initHeroCostAry(): void {
			let info = this.dataSource as EquipItemVo;
			let godVo = App.hero.getGodVoById(info.godId);
			// let maxLv = godVo ? tb.TB_equip_set.getRefineLimit(godVo.degree) : this.tbEquipSet.refine_maxlevel;
			let maxLv = this.tbEquipSet.refine_maxlevel;
			this.btn_red.disabled = info.refineLv == maxLv;
			this.btn_add.disabled = info.refineLv == maxLv;
			this.lab_maxLv.text = info.refineLv == this.tbEquipSet.refine_maxlevel ? LanMgr.getLan("",12589) : LanMgr.getLan("",12590);
			this.lab_maxLv.visible = info.refineLv == maxLv;
			this.img_right.visible = info.refineLv != maxLv;
			this.btn_red10.disabled = info.refineLv == maxLv;
			this.btn_add10.disabled = info.refineLv == maxLv;
			this.lab_nextLevel.visible = info.refineLv != maxLv;
			if (info.refineLv == maxLv) {
				this.input_level.text = "0";
				this.lab_nextLevel.text = "";
				this.costList.array = [];
				return;
			}
			this.computeRefineCost();
		}

		/**消耗所有精炼石后的最高等级 */
		private computeRefineCost(): void {
			let data: EquipItemVo = this.dataSource;
			this._maxRefineLevel = data.getCanRefineNum();
			this.upGradeNeedCost(1);
		}
		
		/**升到n级需要消耗的精炼石 */
		private upGradeNeedCost(addLv: number): void {
			let info = this.dataSource as EquipItemVo;
			let godVo = App.hero.getGodVoById(info.godId);
			// let maxLv = godVo ? tb.TB_equip_set.getRefineLimit(godVo.degree) : this.tbEquipSet.refine_maxlevel;
			let maxLv = this.tbEquipSet.refine_maxlevel;
			addLv = Math.max(1,addLv);	// 最少升1级
			addLv = Math.min((maxLv-info.refineLv),addLv); // 最大升到上限
			this.input_level.text = addLv.toString();
			this.lab_nextLevel.text = info.refineLv + addLv + "";
			this.list_nextAtrri.array = info.getAttributeByValue(0, addLv);
			let needCost = map2ary(info.getRefineCost(addLv));
			this.costList.array = CostVo.createCostVos(needCost);
			this.btn_add.disabled = addLv + info.refineLv >= maxLv;
			this.btn_red.disabled = addLv <= 1;
			this.btn_red10.disabled = this.btn_red.disabled;
			this.btn_add10.disabled = this.btn_add.disabled;
		}

		/**切换装备 */
		private switch(type: number): void {
			let obj = { equip: this.dataSource, type: type }
			dispatchEvt(new EquipEvent(EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.SWITCH]);
		}
		/** 减 */
		private redlevel(num: number): void {
			let addLv = Number(this.input_level.text) - num;
			this.upGradeNeedCost(addLv);
		}
		/** 加 */
		private addlevel(num: number): void {
			if (this._maxRefineLevel == 0) {
				showToast(LanMgr.getLan("",10287));
				return;
			}
			let addLv = Number(this.input_level.text) + num;
			this.upGradeNeedCost(addLv);
		}
		/**精炼 */
		private refine(): void {
			let info: EquipItemVo = this.dataSource;
			let obj = { uuid: info.uuid, refNum: Number(this.input_level.text), type: 1 };
			dispatchEvt(new EquipEvent(EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.REFINE])
		}

		public onClosed(): void {
			super.onClosed();
			this.bgPanel.dataSource = null;
			this.list_nowAtrri.array = null;
			this.list_nextAtrri.array = null;
		}
	}
}

