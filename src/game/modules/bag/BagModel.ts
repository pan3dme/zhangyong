/**
* name 
*/
module game {
	export enum LIMITTIMETYPE {
		DEL, ADD
	}
	export enum EQUTYPE {
		DEL, ADD, MODIFY
	}
	export enum TABTYPE {
		HERO, SUIPIAN, CAILIAO, EQU, TREASURE
	}
	export class BagModel {
		public static line_num: number = 5;
		// bag_group_all
		static bagTypeName = ["", "bag_group_suipian", "bag_group_cailiao", "bag_group_zhuangbei", ""];
		private static _instance: BagModel;
		public static getInstance(): BagModel {
			if (!BagModel._instance) {
				BagModel._instance = new BagModel();
			}
			return BagModel._instance;
		}
		constructor() {
		}

		/**
		 * 计算品质数量
		 * @param data 
		 */
		public countQuality(data: Array<EquipItemVo>): Array<number> {
			let white: number = 0;
			let green: number = 0;
			let blue: number = 0;
			let purple: number = 0;
			for (let i = 0; i < data.length; i++) {
				let itemvo = data[i];
				if (itemvo.godId && itemvo.godId != "") continue;
				switch (itemvo.quality) {
					case QualityConst.WHITE:
						white++;
						break;
					case QualityConst.GREEN:
						green++;
						break;
					case QualityConst.BLUE:
						blue++;
						break;
					case QualityConst.PURPLE:
						purple++;
						break;
				}
			}
			return [white, green, blue, purple];
		}

		public getAllSuipian(): Array<tb.TB_item> {
			let tempAry = new Array;
			let tempAllItem: Array<tb.TB_item> = tb.TB_item.get_TB_item("type", "6");
			for (let i = 0; i < tempAllItem.length; i++) {
				if (tempAllItem[i].type == 6) {
					tempAry.push(tempAllItem[i]);
				}
			}
			return tempAry;
		}


		public getListByType($type: number): Array<any> {
			let tempary = [];
			if ($type == TABTYPE.HERO) {

			} else if ($type == TABTYPE.EQU) {
				//装备
				tempary = this.getEquList();
			} else if ($type == TABTYPE.SUIPIAN) {
				//碎片
				tempary = this.getBagObjByType(iface.tb_prop.itemTypeKey.chip);
				this.sortBagObj(tempary);
			} else if ($type == TABTYPE.CAILIAO) {
				//消耗
				tempary = this.getBagObjByType(iface.tb_prop.itemTypeKey.gift);
				tempary = tempary.concat(this.getBagObjByType(iface.tb_prop.itemTypeKey.optionalCard));
				tempary = tempary.concat(this.getBagTimeObj());
				//材料
				tempary = tempary.concat(this.getBagObjByType(iface.tb_prop.itemTypeKey.materials));
				// 宝石
				tempary = tempary.concat(this.getBagObjByType(iface.tb_prop.itemTypeKey.gemstone));
				this.sortBagObj(tempary);
			} else if ($type == TABTYPE.TREASURE) {
			}
			return this.changeArry(tempary);
		}

		/**
		 * 将数组转换成所需要的特殊list显示项的结构
		 * @param needArry 
		 */
		public changeArry(needArry: Array<any>) {
			let ary = new Array
			//初始化序号和选择项
			for (var j = 0; j < needArry.length; j++) {
				var element = needArry[j];
				element.selectid = -1;
				element.indexid = j;
			}
			//一维数组转二维数组的方法
			let len = needArry.length;
			let n = BagModel.line_num; //假设每行显示6个
			let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
			for (let i = 0; i < lineNum; i++) {
				// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
				let temp = needArry.slice(i * n, i * n + n);
				ary.push(temp);
			}
			return ary;
		}

		private getBagObjByType($type: number) {
			let ary: Array<ItemVo> = new Array;
			let reslist = this.getBagObj();
			for (var i = 0; i < reslist.length; i++) {
				var element = reslist[i];
				if (element.type == $type) {
					ary.push(element);
				}
			}
			this.sortBagObj(ary);
			return ary;
		}

		private _resList: Array<ItemVo>;
		private insertResVo(key: number, val: number,lvStr?:string) {
			let itemtb: tb.TB_item = tb.TB_item.get_TB_itemById(key);
			if (itemtb && itemtb.type != iface.tb_prop.itemTypeKey.resource && val != 0) {
				let vo: ItemVo = App.hero.createItemVo(val, key);
				vo.show = false;
				vo.bag = true;
				vo.countFromBag = true;
				vo.lvStr = lvStr;
				this._resList.push(vo);
			}
		}

		private getBagObj(): Array<ItemVo> {
			if (this._resList) {
				return this._resList;
			}
			this._resList = new Array;
			let tempObj = App.hero.bagItemsObj;
			for (var i in tempObj) {
				let num = tempObj[i];
				this.insertResVo(Number(i), num);
			}
			// 宝石
			this.updateGemstones();
			return this._resList;
		}

		/**
		 * 更新背包里的对象数据  -- 新增的需要通过这个入口区添加
		 * @param key 
		 * @param value 
		 */
		public updateBagObj($key: number, $value: number) {
			if (!this._resList) {
				return;
			}
			//如果有找到
			for (var i = 0; i < this._resList.length; i++) {
				var element = this._resList[i];
				if (element.id == $key) {
					if ($value <= 0) {
						//移除
						this._resList.splice(i, 1);
					} else {
						element.count = $value;
					}
					return;
				}
			}
			//如果没找到
			this.insertResVo($key, $value);
		}

		/** 更新宝石数据 */
		public updateGemstones():void {
			if (!this._resList) {
				return;
			}
			let len = this._resList.length;
			let model = GemstoneModel.getInstance();
			let curGems = [];
			for(let i = len - 1 ; i >= 0 ; i--){
				let itemVo = this._resList[i];
				if(itemVo.type == iface.tb_prop.itemTypeKey.gemstone){
					// 该宝石
					let gemVo = model.getGemstoneByTbID(itemVo.id);
					if(!gemVo || gemVo.num <= 0){
						this._resList.splice(i,1);
					}else{
						itemVo.count = gemVo.num;
						curGems.push(itemVo.id);
					}
				}
			}
			let gemsObj = App.hero.gemstones;
			for(let key in gemsObj) {
				let svo = gemsObj[key];
				let tbItem = tb.TB_item.get_TB_itemById(svo.templateId);
				let tbGem = tbItem ? tb.TB_gemstone_new.getTBOneById(tbItem.defined[0]) : null;
				// 未镶嵌 
				if(tbGem && !svo.godId && svo.num > 0 && curGems.indexOf(svo.templateId) == -1) {
					this.insertResVo(svo.templateId, svo.num,`Lv.${tbGem.getLevel()}`);
				}
			}
		}

		private _timeresList: Array<LimitItemVo>;
		private getBagTimeObj(): Array<LimitItemVo> {
			if (this._timeresList) {
				return this._timeresList;
			}
			this._timeresList = new Array;
			let bagTimeItemsObj = App.hero.bagTimeItemsObj;
			for (var i in bagTimeItemsObj) {
				let obj = bagTimeItemsObj[i];
				this.insertLimitTimeResVo(Number(i), obj);
			}
			return this._timeresList;
		}


		private insertLimitTimeResVo(key: number, val: any) {
			let itemtb: tb.TB_item = tb.TB_item.get_TB_itemById(Number(val.templateId));
			if (itemtb) {
				let vo: LimitItemVo = new LimitItemVo(key, Number(val.limitTime), itemtb.ID, 1, itemtb.type);
				vo.show = false;
				vo.bag = true;
				this._timeresList.push(vo);
			}
		}

		public updateLimitTimeRes($uuid: number, $type: number, obj?) {
			if (!this._timeresList) {
				return;
			}
			if ($type == LIMITTIMETYPE.ADD) {
				this.insertLimitTimeResVo($uuid, obj);
				return;
			}

			if ($type == LIMITTIMETYPE.DEL) {
				for (let i = 0; i < this._timeresList.length; i++) {
					let vo = this._timeresList[i];
					if (vo.uuid == $uuid) {
						this._timeresList.splice(i, 1);
						break;
					}
				}
			}
		}

		public updateEquObj($key: string, $type: number, vo?: any) {
			if (!this._queList) {
				return;
			}
			if ($type == EQUTYPE.ADD) {
				vo.bag = true;
				this._queList.push(vo);
				return;
			}

			for (var i = 0; i < this._queList.length; i++) {
				var element = this._queList[i];
				if (element.uuid == $key) {
					if ($type == EQUTYPE.DEL) {
						this._queList.splice(i, 1);
						break;
					} else if ($type == EQUTYPE.MODIFY) {
						if (vo) {
							this._queList.splice(i, 1, vo);
						}
						break;
					}
				}
			}
		}

		public getEquList() {
			let tempary = this.getNoEquObj();
			tempary.sort((a, b) => {
				return a.quality - b.quality;
			})
			// this.sortEquObj(tempary);
			return tempary;
		}

		/**
		 * 剔除已穿戴装备
		 */
		private getNoEquObj(): Array<EquipItemVo> {
			let ary: Array<EquipItemVo> = new Array
			let list = this.getEquObj();
			for (var i = 0; i < list.length; i++) {
				var element: EquipItemVo = list[i];
				if (!element.isExsitGod()) {
					ary.push(element);
				}
			}
			return ary;
		}

		private _queList: Array<EquipItemVo>;
		private getEquObj(): Array<EquipItemVo> {
			if (this._queList) {
				this.sortEquObj(this._queList);
				return this._queList;
			}
			this._queList = App.hero.getEquips(0, true);
			for (let i = 0; i < this._queList.length; i++) {
				this._queList[i].bag = true;
			}
			return this._queList;
		}

		private sortBagObj(list: Array<ItemVo>) {
			list.sort(
				function (a: ItemVo, b: ItemVo): number {
					let neednuma: number = a.using.length > 0 && Number(a.using[0]) == 1 ? Number(a.using[1]) : 1;
					let neednumb: number = b.using.length > 0 && Number(b.using[0]) == 1 ? Number(b.using[1]) : 1;
					let a_red: boolean = App.hero.getBagItemNum(a.id) >= neednuma;
					let b_red: boolean = App.hero.getBagItemNum(b.id) >= neednumb;
					if (a_red == b_red) {
						// if (a.using.length > 0 && b.using.length > 0) {
							if (a.type == b.type) {
								return a.id - b.id;
							} else {
								let atype = a.type == 2?100:a.type == 10?90:a.type;
								let btype = b.type == 2?100:b.type == 10?90:b.type;
								return btype - atype;
							}
						// }else{
						// 	return b.using.length - a.using.length;
						// }
					} else {
						return a_red ? -1 : 1;
					}
				}
			);
		}

		private sortEquObj(list: Array<EquipItemVo>) {
			//品质、强化等级、精练等级排序
			list.sort(
				function (a: EquipItemVo, b: EquipItemVo): number {
					//如果已装备，往前排
					let aexsit = a.isExsitGod();
					let bexsit = b.isExsitGod();
					if (aexsit == bexsit) {
						if (a.tab_item.quality == b.tab_item.quality) {
							if (a.strengthLv == b.strengthLv) {
								return b.refineLv - a.refineLv;
							} else {
								return b.strengthLv - a.strengthLv;
							}
						} else {
							return b.tab_item.quality - a.tab_item.quality;
						}
					} else {
						return aexsit ? -1 : 1;
					}
				});
		}
	}
}