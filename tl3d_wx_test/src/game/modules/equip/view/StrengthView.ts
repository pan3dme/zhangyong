/**
* name 
*/
module game {
	export class StrengthView extends ui.equip.EquipStrengthenUI {
		private _canOnceStone: boolean;
		private _canFiveStone: boolean;
		private _canOnceMoney: boolean;
		private _canFiveMoney: boolean;
		constructor() {
			super();
			this.isModelClose = true;
			this.btn_next.on(Laya.Event.CLICK, this, this.switch, [1]);
			this.btn_last.on(Laya.Event.CLICK, this, this.switch, [-1]);
			this.btn_once.on(Laya.Event.CLICK, this, this.equipStrength, [iface.tb_prop.equipStthTypeKey.one]);
			this.btn_five.on(Laya.Event.CLICK, this, this.equipStrength, [iface.tb_prop.equipStthTypeKey.five]);
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
			this.ui_itemBox.dataSource = data;
			this.btn_last.disabled = data.slot == 1;
			this.btn_next.disabled = data.slot == 4;
			let level: number = data.getStrengthLv();
			let isMaxLv = level == tb.TB_equip_set.get_TB_equip_setById().strength_maxlevel;
			this.lab_nextLevel.visible = this.imgArrow.visible = !isMaxLv;
			this.lab_name.changeText(data.tab_item.name);
			this.lab_nowLevel.changeText(level.toString());
			this.lab_nextLevel.changeText((level + 1).toString())
			this.list_proprety.array = this.getCurLvAndNextLvAttri(data);
			this.oneList.array = isMaxLv ? null : CostVo.createCostVos(data.strengthCost());
			this.fiveList.array = isMaxLv ? null : CostVo.createCostVos(data.strengthCost(5));
			let model = EquipModel.getInstance();
			this.btn_last.visible = model.showEquipByView != EquipType.BAG_VIEW;
			this.btn_next.visible = model.showEquipByView != EquipType.BAG_VIEW;
			this.btn_once.gray = this.btn_five.gray = !App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
			this.bgPanel.dataSource = { uiName: UIConst.Equip_StrengthView, closeOnSide: this.isModelClose };
			tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateView, this)
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateView, this)
		}

		private updateView(): void {
			this.initView(this.dataSource)
		}

		/**当前等级和下一等级的属性 */
		getCurLvAndNextLvAttri(equipVo:EquipItemVo): Array<any> {
			let curAttri: any = equipVo.getStrengthAttr();
			let nextAttri: any = equipVo.getStrengthAttr(1);
			let arrAttstr = game.EquipModel.getInstance().arrLongAttriName;
			let equipAttri: Array<any> = new Array();
			for (let i in curAttri) {
				let attri = {};
				attri['name'] = arrAttstr[Number(i)];
				attri['value'] = curAttri[i];
				attri['nextValue'] = nextAttri[i] || 0;
				equipAttri.push(attri);
			}
			return equipAttri
		}

		/**强化 */
		private equipStrength(type: number): void {
			if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
				let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
				showToast(tbData.prompt);
				return;
			}
			let data: EquipItemVo = this.dataSource;
			if (data.getStrengthLv() >= EquipModel.getInstance().tbEquipSet.strength_maxlevel) {
				showToast(LanMgr.getLan("",10306));
				return;
			}
			let godVo = App.hero.getGodVoById(data.godId);
			// if(godVo && !godVo.isHaveLowEquip(EquipTabType.strength)){
			// 	showToast("装备强化等级不能超过英雄等级");
            //     return;
			// }
			let cost: CostVo[] = type == iface.tb_prop.equipStthTypeKey.one ? this.oneList.array : this.fiveList.array;
			let notCost = cost.find(vo => vo.isNotHaveCost());
			if (notCost) {
				showToast(LanMgr.getLan("", Lans.cost, notCost.itemId));
				return;
			}

			let obj = { type: type, uuid: data.uuid,godId:godVo.uuid }
			dispatchEvt(new EquipEvent(EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.STRENGTH]);
		}

		/**切换装备 */
		private switch(type: number): void {
			let obj = { equip: this.dataSource, type: type }
			dispatchEvt(new EquipEvent(EquipEvent.EQUIP_OPERATION), [obj, EquipOperation.SWITCH]);
		}

		public playeff() {
			this.ani_succ.play(0, false);
		}

		public onClosed(): void {
			super.onClosed();
			this.bgPanel.dataSource = null;
			this.list_proprety.array = null;
			tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.updateView, this)
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateView, this)
		}
	}
}