/**
* name 
*/
module game {
	export class EquipModel {
		public static EQUIP_COUNT = 4;	// 装备种类数量

		/**当前显示英雄 */
		public curShowGod: GodItemVo;
		/**从哪个界面点开的 */
		public showEquipByView: number;
		/**装备某种操作名称 */
		public arrOpertionName: Array<string>
		/**装备属性名称数组加长版 */
		public arrLongAttriName: Array<string>;
		/**装备的限制信息 */
		public tbEquipSet = tb.TB_equip_set.get_TB_equip_setById(1);
		/**装备大师等级 */
		public equipMasterLevel = 0;
		/**精炼开启等级 */
		public refineOpenLv: number = 0;
		private static _instance: EquipModel;
		public equipTabName : any[];
		public equiptabredName : string[];

		constructor() {
			this.curShowGod = null;
			this.equipTabName = [[LanMgr.getLan("",12579), 0], [LanMgr.getLan("",12580), ModuleConst.EQUIP_JINGLIAN], [LanMgr.getLan("",12581), ModuleConst.EQUIP_BAOSHI]];
			this.equiptabredName = ["equip_tab_0", "equip_tab_1", "equip_tab_2"];
			this.arrOpertionName = [LanMgr.getLan("",12582), LanMgr.getLan("",12583), LanMgr.getLan("",12584), LanMgr.getLan("",12585)];
			this.arrLongAttriName = ["", LanMgr.getLan("",12586), LanMgr.getLan("",12587), LanMgr.getLan("",12588)];
		}

		public static getInstance(): EquipModel {
			if (!EquipModel._instance) {
				EquipModel._instance = new EquipModel();
			}
			return EquipModel._instance;
		}

		/**当前点击的装备数据 */
		public curPointEquipData: any;

		public getRefineOpenData(): tb.TB_sys_open {
			return tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_JINGLIAN);
		}

		/**装备分解 */
		public countReturnItem(data: Array<EquipItemVo>): Array<ItemVo> {
			let tempObj: Object = {};
			let temparry = new Array;
			for (let k = 0; k < data.length; k++) {
				let equipItemVo: EquipItemVo = data[k];
				let tempID = equipItemVo.quality * 10 + equipItemVo.slot
				let recycleTab: tb.TB_equip_recycle = tb.TB_equip_recycle.get_TB_equip_recycleById(tempID);
				let returnitem = recycleTab.return_item;
				for (let i = 0; i < returnitem.length; i++) {
					let key = returnitem[i][0];
					let keydata = Number(returnitem[i][1]);
					if (tempObj[key])
						tempObj[key] += keydata;
					else
						tempObj[key] = keydata;
				}
				if (equipItemVo.strengthLv > 0) {
					let itemdata: Array<any> = tb.TB_equip_strength.get_TB_equip_strengthById(equipItemVo.strengthId).total_cost;
					for (let i in itemdata) {
						tempObj[itemdata[i][0]] = tempObj[itemdata[i][0]] ? Number(itemdata[i][1]) + tempObj[itemdata[i][0]] : Number(itemdata[i][1]);
					}
				}

				if (equipItemVo.refineLv > 0) {
					let itemdata: Array<any> = tb.TB_equip_refine.get_TB_equip_refineById(equipItemVo.refineId).total_cost;
					for (let i in itemdata) {
						tempObj[itemdata[i][0]] = tempObj[itemdata[i][0]] ? Number(itemdata[i][1]) + tempObj[itemdata[i][0]] : Number(itemdata[i][1]);
					}
				}
			}
			for (let i in tempObj) {
				let vo: ItemVo = App.hero.createItemVo(tempObj[i], i);
				vo.show = true;
				vo.bag = true;
				temparry.push(vo);
			}
			return temparry;
		}

		/**一键装备 */
		public equipQiuck(godVo: GodItemVo,includeNull:boolean=false): EquipItemVo[] {
			let arr = [];
			for (let i = 1; i <= EquipModel.EQUIP_COUNT ; i++) {
				let vo = this.slotEquip(godVo, i, false);
				if(includeNull) {
					arr.push(vo);
				}else{
					if(vo){
						arr.push(vo);
					}
				}
			}
			return arr;
		}
		/** 某个槽位是否可以穿戴装备
		 */
		public slotEquip(godVo: GodItemVo, slot: number, isRedPoint: boolean = false): EquipItemVo {
			if (!App.IsSysOpen(ModuleConst.EQUIPMENT)) return null;
			// 每件装备的红点显示：只当某槽位未穿戴时，穿戴未被穿戴的装备
			let equipAry = App.hero.getEquips(slot,true).filter((vo)=>{
				return !vo.isExsitGod();
			});
			if (isRedPoint) {
				let arr = [];
				if (godVo.getEquipmentBySlot(slot)) return null;
				let equipVo = equipAry.find((vo)=>{
					// return !vo.isExsitGod() && vo.strengthLv <= godVo.level && vo.refineLv <= tb.TB_equip_set.getRefineLimit(godVo.degree);
					return !vo.isExsitGod();
				});
				return equipVo;
			} else {
				// 一键穿戴 ：不管某槽位是否装备都需判断，可穿未被穿戴的更高级装备
				let godEquip = godVo.getEquipmentBySlot(slot);//神灵身上这个槽位的装备
				let betterEquip : EquipItemVo = null;
				if(godEquip){
					// 该位置存在装备，寻找更高等级装备 强化等级大于精炼等级
					betterEquip = equipAry.find((vo) => {
						// return vo.strengthLv <= godVo.level && vo.refineLv <= tb.TB_equip_set.getRefineLimit(godVo.degree);
						return vo.getSortNum() > godEquip.getSortNum();
					});
				}else{
					betterEquip = equipAry.find(vo => !vo.isExsitGod());
				}
				return betterEquip;
			}
		}

		/** 装备是否可以强化 */
		isCanSth(equipVo: EquipItemVo, godVo: GodItemVo, showNotice: boolean = false): boolean {
			if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
				let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
				showNotice && showToast(tbData.prompt);
				return false;
			}
			if (!equipVo && !godVo) return false;
			// 强化某个装备
			if (equipVo) {
				if (equipVo.isTopStrengthLv()) {
					showNotice && showToast(LanMgr.getLan('', 10289));
					return false;
				}
				let equipGod = App.hero.getGodVoById(equipVo.godId);
				if (!equipGod) {
					showNotice && showToast(LanMgr.getLan('', 10290));
					return false;
				}
				// if (equipVo.strengthLv >= equipGod.level) {
				// 	showNotice && showToast("装备强化等级不能超过英雄等级");
				// 	return false;
				// }
				let cost = map2ary(equipVo.strengthCost());
				let costType = App.isNotEnoughType(cost);
				if (costType != -1) {
					showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
					return false;
				}
			}
			// 一键强化
			if (godVo) {
				if (godVo.equipKeys.length <= 0) {
					showNotice && showToast(LanMgr.getLan("", 10291));
					return;
				}
				if (godVo.isAllEquipLvTop(EquipTabType.strength)) {
					showNotice && showToast(LanMgr.getLan("",10289));
					return false;
				}
				// if (!godVo.isHaveLowEquip(EquipTabType.strength)) {
				// 	showNotice && showToast("装备强化等级不能超过英雄等级");
				// 	return false;
				// }
				let costType = App.isNotEnoughType(godVo.getStrengthCost());
				if (costType != -1) {
					showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
					return false;
				}
			}
			return true;
		}

		/** 装备是否可以精炼 */
		isCanRefine(equipVo: EquipItemVo, godVo: GodItemVo, showNotice: boolean = false): boolean {
			if (!App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
				let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_JINGLIAN);
				showNotice && showToast(tbData.prompt);
				return false;
			}
			// 精炼某个装备
			if (equipVo) {
				if (equipVo.isTopRefineLv()) {
					showNotice && showToast(LanMgr.getLan('', 10292));
					return false;
				}
				let equipGod = App.hero.getGodVoById(equipVo.godId);
				if (!equipGod) {
					showNotice && showToast(LanMgr.getLan('', 10293));
					return false;
				}
				// if (equipVo.refineLv >= tb.TB_equip_set.getRefineLimit(equipGod.degree)) {
				// 	showNotice && showToast("精炼等级已达上限，提高英雄阶级可以提高上限");
				// 	return false;
				// }
				let cost = map2ary(equipVo.getRefineCost());
				let costType = App.isNotEnoughType(cost);
				if (costType != -1) {
					showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
					return false;
				}
			}
			// 一键精炼
			if (godVo) {
				if (godVo.equipKeys.length <= 0) {
					showNotice && showToast(LanMgr.getLan("", 10291));
					return false;
				}
				if (godVo.isAllEquipLvTop(EquipTabType.refine)) {
					showNotice && showToast(LanMgr.getLan("", 10292))
					return false;
				}
				// if (!godVo.isHaveLowEquip(EquipTabType.refine)) {
				// 	showNotice && showToast("精炼等级已达上限，提高英雄阶级可以提高上限");
				// 	return false;
				// }
				let costType = App.isNotEnoughType(godVo.getRefineCost());
				if (costType != -1) {
					showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
					return false;
				}
			}
			return true;
		}

		/**　获取英雄的某种品质装备的数量 */
		public getEquipQualityNum(godId:string,quality:number):number {
			let godVo = App.hero.getGodVoById(godId);
			if(godVo){
				return godVo.getQualityEquips(quality).length;
			}
			return 0;
		}

		/**
		 * 创建一个装备对象
		 * @param uuid 唯一索引
		 * @param solt 槽位
		 * @param godId 装备英雄id
		 */
		public createEquipVo(uuid, solt, $godId = null, $first?: boolean): EquipItemVo {
			let vo: EquipItemVo = new EquipItemVo(App.hero.bagEquipsObj[uuid]);
			vo.slot = solt;
			vo.uuid = uuid;
			vo.godId = $godId;
			vo.isFirst = $first;
			return vo;
		}

	}
}


/**装备在xx界面打开的 */
enum EquipType {
	/**背包界面 */
	BAG_VIEW = 0,
	/**装备界面 */
	EQUIP_VIEW = 1,
	/**英雄界面 */
	SHENLING_VIEW = 2,
	/** 英雄宝石界面 */
	SHENLING_BAOSHI_VIEW = 3,
}

/** 装备子界面类型 */
enum EquipTabType {
	/**强化 */
	strength = 0,
	/**精炼 */
	refine = 1,
	/**宝石 */
	baoshi = 2
}

