module game {
	export class GodModel {
		public static tabInfo: string = "tabInfo";
		public static tabStarup: string = "tabStarup";
		public static tabRonghun: string = "tabRonghun";
		public static tabAwaken: string = "tabAwaken";

		private static _instance: GodModel;
		public static getInstance(): GodModel {
			if (!GodModel._instance) {
				GodModel._instance = new GodModel();
			}
			return GodModel._instance;
		}
		constructor() {
		}
		public isOnekeyLvup: boolean = true;	// 是否一键5级 

		/**从哪打开选择界面 */
		public showItemsByView: number;
		public tabredName = ["shenling_tab_0", "shenling_tab_1", "shenling_tab_2", "shenling_tab_3", "shenling_tab_4"];

		/** 获取英雄界面英雄灵列表 */
		getViewGods(): LineupGodVo[] {
			let godids = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack, true);
			let gods = godids.map((uuid) => {
				return App.hero.getGodVoById(uuid);
			});
			let list = gods.map((vo, index) => {
				let obj: LineupGodVo = { godVo: vo, pos: index };
				return obj;
			})
			return list.sort((a, b) => {
				if (!a.godVo && !b.godVo) {
					return a.pos - b.pos;
				} else if (a.godVo && !b.godVo) {
					return -1;
				} else if (!a.godVo && b.godVo) {
					return 1;
				} else {
					return b.godVo.fightPower - a.godVo.fightPower;
				}
			});
		}

		public tabTypes = [ShenlingTabType.info, ShenlingTabType.shengxin, ShenlingTabType.awaken, ShenlingTabType.ronghun];
		getTabViewDatas(type): { viewName: string, viewClz: any, sysId: number } {
			switch (type) {
				case ShenlingTabType.info:
					return { viewName: GodModel.tabInfo, viewClz: godTabInfoView, sysId: ModuleConst.SHENLING };
				case ShenlingTabType.shengxin:
					return { viewName: GodModel.tabStarup, viewClz: godTabStarupView, sysId: ModuleConst.SHENGXING };
				case ShenlingTabType.ronghun:
					return { viewName: GodModel.tabRonghun, viewClz: godTabfuseView, sysId: ModuleConst.RONGHUN };
				case ShenlingTabType.awaken:
					return { viewName: GodModel.tabAwaken, viewClz: godTabAwakeView, sysId: ModuleConst.JUEXING };
			}
			return null;
		}

		/** 获取神力 */
		public getForce(lineupType: number = iface.tb_prop.lineupTypeKey.attack): number {
			//上阵神灵战力 + 神器战力 + 公会技能战力
			let lineUpGod = App.hero.getLineUpTeam(lineupType);
			let fightNum: number = 0;
			for (let i = 0; i < lineUpGod.length; i++) {
				fightNum += lineUpGod[i].getShenli(lineupType);
			}
			return fightNum;
		}

		/** 获取最大神力 */
		getMaxForce(): number {
			let force: number = 0;
			let gods = App.hero.getGodArr();
			for (let godVo of gods) {
				let godForce = godVo.getShenli();
				if (godForce > force) {
					force = godForce;
				}
			}
			return force;
		}

		/**获得万能卡数量 */
		getWanNengCards(): Object {
			let obj = {};
			let tbs = tb.TB_god_set.get_TB_god_set();
			for (let data of tbs.universal_card) {
				obj[data[2]] = App.hero.getBagItemNum(data[2]);
			}
			return obj;
		}

		/**
		 * 获得阶级的对应最大等级
		 * @param jieji 
		 */
		static getMaxLv(jieji: number): number {
			let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(jieji);
			return evotab ? evotab.level : -1;
		}

		/** 根据星级获取碎片道具id */
		public getItemID(starLv: number): number {
			switch (starLv) {
				case 3:
					return CostTypeKey.suipian_sanxing;
				case 4:
					return CostTypeKey.suipian_sixing;
				case 5:
					return CostTypeKey.suipian_wuxing;
				case 6:
					return CostTypeKey.liuxingka;
				case 7:
					return CostTypeKey.qixingka;
				case 8:
					return CostTypeKey.baxingka;
				case 9:
					return CostTypeKey.jiuxingka;
				default:
					return CostTypeKey.suipian_wuxing;
			}
		}

		/** 是否有神灵 */
		public isHasGod(tbid: number): boolean {
			let ary = App.hero.getGodArr();
			return ary.some((vo) => {
				return vo.templateId == tbid;
			});
		}

		/** 获取上阵神灵的表id */
		public getLinuepGodTbid(type: number): number[] {
			let gods = App.hero.getLineUpTeam(type, false);
			return gods.map((vo) => {
				return vo && vo.templateId;
			});
		}
		/** 获取上阵神灵 */
		public getLineupGodByTbid(type: number, tbid: number): GodItemVo {
			let gods = App.hero.getLineUpTeam(type, false);
			return gods.find((vo) => {
				return vo && vo.templateId == tbid;
			});
		}

		/** 获取上阵神灵数量 */
		public getLineupGodCount(type: number): number {
			let ary: string[] = App.hero.lineupInfo[type] || [];
			let count = 0;
			for (let i = 0; i < ary.length; i++) {
				if (ary[i]) {
					count++;
				}
			}
			return count;
		}

		/** 获取上阵各个阵营英雄数量
		 */
		private _atkRaceGodNum: number[] = [0, 0, 0, 0, 0, 0];
		private _expRaceGodNum: number[] = [0, 0, 0, 0, 0, 0];
		public getRaceGodNumInLine(linetype): number[] {
			// iface.tb_prop.godRaceTypeKey.china
			return linetype == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
		}
		/** 获取上阵各个阵营英雄数量
		 */
		public getRaceGodNumInLineByRace($type, race: number): number {
			let curNum = $type == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
			if (race < 0 || race >= curNum.length) return 0;
			return curNum[race];
		}

		/** 攻击布阵改变
		 */

		public onAttackLineChange($type): void {
			let newRaceNum: number[] = [0, 0, 0, 0, 0, 0];
			let gods: GodItemVo[] = App.hero.getLineUpTeam($type, false);
			if (gods && gods.length > 0) {
				for (let i: number = 0; i < gods.length; i++) {
					let god: GodItemVo = gods[i];
					if (god) {
						let racetype: number = god.getRaceType();
						newRaceNum[racetype]++;
					}
				}
			}

			let curNum = $type == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;

			for (let i: number = 0; i < curNum.length; i++) {
				if (curNum[i] != newRaceNum[i]) {
					//数量不一致，上阵的阵营英雄数量改变了
					if ($type == iface.tb_prop.lineupTypeKey.attack) {
						this._atkRaceGodNum = newRaceNum;
						this._isUpdateRaceAdd_atk = true;
					} else {
						this._expRaceGodNum = newRaceNum;
						this._isUpdateRaceAdd_exp = true;
					}
					// dispatchEvt(new game.GodEvent(game.GodEvent.LINE_RACE_GOD_NUM_CHANGE));
					break;
				}
			}
		}

		/** 获取攻击阵容的阵营数量 */
		public getRaceNumObj(): any {
			let obj = {};
			let gods = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
			for (let vo of gods) {
				if (vo) {
					let type = vo.tab_god.race_type;
					obj[type] = (obj[type] || 0) + 1;
				}
			}
			return obj;
		}

		/**
		 *  阵营属性加成模板
		 */
		public getAllRaceAddTemp(type): tb.TB_halo[] {
			let temptype = type == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
			let _allRaceAddTemp = [];
			let alltype: tb.TB_halo[][] = tb.TB_halo.getAllType();
			if (alltype && alltype.length > 0) {
				for (let i: number = 0; i < alltype.length; i++) {
					let raceTemp: tb.TB_halo[] = alltype[i];
					if (raceTemp && raceTemp.length > 0) {
						let addtemp: tb.TB_halo = null;
						for (let j: number = 0; j < raceTemp.length; j++) {
							let temp: tb.TB_halo = raceTemp[j];
							let num: number = temp.type % tb.TB_halo.TYPE_BASE;
							if (i == tb.TB_halo.TYPE_ALL) {
								let isHas: boolean = true;
								for (let k: number = 1; k < temptype.length; k++) {
									if (temptype[k] < num) {
										isHas = false;
										break;
									}
								}
								if (isHas) {
									addtemp = temp;
								}
							} else {
								if (temptype[i] >= num) {
									addtemp = temp;
								}
							}
						}
						if (addtemp) {
							_allRaceAddTemp.push(addtemp);
						}
					}
				}
			}
			return _allRaceAddTemp;
		}

		/**
		 *  获取阵营加成模板
		 */
		public getRaceAddTempByRace(linetype, race: number): tb.TB_halo {
			let alltemps: tb.TB_halo[] = this.getAllRaceAddTemp(linetype);
			if (alltemps) {
				for (let i: number = 0; i < alltemps.length; i++) {
					if (alltemps[i].raceType == race) return alltemps[i];
				}
			}
			return null;
		}


		/**
		 *  是否激活阵营加成
		 */
		public isActiveRaceAdd(linetype, type: number, race: number = -1, godNum: number = -1): boolean {
			if (type < 0) return false;
			let alltemps: tb.TB_halo[] = this.getAllRaceAddTemp(linetype);
			if (alltemps) {
				if (race < 0) race = Math.floor(type / tb.TB_halo.TYPE_BASE);
				if (godNum < 0) godNum = type % tb.TB_halo.TYPE_BASE;
				for (let i: number = 0; i < alltemps.length; i++) {
					let temp: tb.TB_halo = alltemps[i];
					if (temp.raceType == race && temp.godNum >= godNum) return true;
				}
			}
			return false;
		}

		/**
		 *  阵营属性加成
		 */
		//失落遗迹的阵营缓存
		private _isUpdateRaceAdd_exp: boolean = true;
		private _racePerAdd_exp: number[];//百分比加成
		private _raceValueAdd_exp: number[];//固定值加成（目前没有固定加成）
		//普通攻击阵容的阵营缓存
		private _isUpdateRaceAdd_atk: boolean = true;
		private _racePerAdd_atk: number[];//百分比加成
		private _raceValueAdd_atk: number[];//固定值加成（目前没有固定加成）
		public getRaceAdd(lineupType, isPer: boolean = true): number[] {
			let flag = lineupType == iface.tb_prop.lineupTypeKey.attack ? this._isUpdateRaceAdd_atk : this._isUpdateRaceAdd_exp;
			if (flag) {
				let _racePerAdd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//0-16
				let _raceValueAdd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//0-16
				let addtemps: tb.TB_halo[] = this.getAllRaceAddTemp(lineupType);
				if (addtemps && addtemps.length > 0) {
					for (let i: number = 0; i < addtemps.length; i++) {
						let addtemp: tb.TB_halo = addtemps[i];
						if (addtemp && addtemp.attr) {
							for (let j: number = 0; j < addtemp.attr.length; j++) {
								let attr: number[] = addtemp.attr[j];
								let type: number = attr[0];
								let addtype: number = attr[1];
								if (addtype == 1) {
									_raceValueAdd[type] += attr[2];
								} else {
									_racePerAdd[type] += attr[2];
								}
							}
						}
					}
				}

				if (lineupType == iface.tb_prop.lineupTypeKey.attack) {
					this._isUpdateRaceAdd_atk = false;
					this._racePerAdd_atk = _racePerAdd;
					this._raceValueAdd_atk = _raceValueAdd;
				} else {
					this._isUpdateRaceAdd_exp = false;
					this._racePerAdd_exp = _racePerAdd;
					this._raceValueAdd_exp = _raceValueAdd;
				}
			}
			return isPer ? (lineupType == iface.tb_prop.lineupTypeKey.attack ? this._racePerAdd_atk : this._racePerAdd_exp) : (lineupType == iface.tb_prop.lineupTypeKey.attack ? this._raceValueAdd_atk : this._raceValueAdd_exp);
		}



	}

	/** 阵容英雄 */
	export interface LineupGodVo {
		pos: number;
		godVo: GodItemVo;

		userLv?: number;
	}
}

/** 在哪个界面打开的 */
enum ChooseOpenType {
	/**分解界面 */
	FENJIE_VIEW = 0,
	/**神力转换 */
	TURN_VIEW = 3,

	awaken = 4,		// 神灵觉醒界面
	starUp = 5,		// 神灵升星界面
}
/** 英雄子界面类型 */
enum ShenlingTabType {
	info = 0,		// 信息
	shengxin = 1,	// 升星
	awaken = 2,		// 觉醒
	ronghun = 3,	// 融魂

}

