/**
* name 
*/
module game {
	export enum GuajiBtnState{
		CANBOSS,TIME,FIGHTING,MAP,OPEN,JINGYING
	}
	
	export class GuajiModel {
		private static _instance: GuajiModel;
		public static getInstance(): GuajiModel {
			if (!GuajiModel._instance) {
				GuajiModel._instance = new GuajiModel();
			}
			return GuajiModel._instance;
		}
		/** 章节是否初始化 */
		public inited: boolean = false;
		/** 历练章节 */
		public zhangjieList: Array<ZhangjieVo>;
		/** 章节所有关卡 */
		private _copyList: Array<tb.TB_copy>;
		/** 当前挂机章节 */
		public currentZhangjie: ZhangjieVo;
		/** 开始对话 */
		public startTalkGuide: boolean;
		/** 有没有结束对话 */
		public hasEndTalkGuide: boolean;
		// private _currentZhangjie: ZhangjieVo;

		// public set currentZhangjie(val) {
		// 	this._currentZhangjie = val;
		// }

		// public get currentZhangjie(): ZhangjieVo {
		// 	return this._currentZhangjie
		// }

		/** 是否在后台 */
		public isEnable: boolean = false;
		/** 是否在挑战 */
		public isFight: boolean = false;
		/** 是否有阵容变化 */
		// public isRefresh: boolean = false;
		/** 最高章节 */
		public maxZhangjie: ZhangjieVo = null;
		/** 新章节解锁 0:没有 xxx:章节id*/
		public newOpen: number = 0;


		/** 移动状态 */
		public moveState: boolean = false;

		/** 上一次通过的挂机副本id */
		public lastCopyId: number;

		public copyName : string[] = ["","普通","困难","地狱"];
		constructor() {

		}

		public initModel() {
			this.newOpen = 0;
			this.zhangjieList = new Array<ZhangjieVo>();
			this._copyList = tb.TB_copy.fuwenFuben;
			let len = this._copyList.length;
			for (let i = 0; i < len; i++) {
				let $item = this._copyList[i];
				let zhangjie: ZhangjieVo = new ZhangjieVo($item);
				if (!this.currentZhangjie) {
					//初始化当前章节 第一次进来的情况
					this.maxZhangjie = this.currentZhangjie = zhangjie;
				} else {
					let zhangjiePass: boolean = zhangjie.finish();
					if (zhangjiePass) {
						this.maxZhangjie = this.currentZhangjie = zhangjie;
					} else if (zhangjie.isOpen()) {
						if (zhangjie.isNew()) {
							//未通关的新章节
							if (App.hero.copyUnlockId < zhangjie.id) {
								this.newOpen = zhangjie.id;
							} else {
								this.currentZhangjie = zhangjie;
							}
						} else {
							//未通关的老章节
							this.currentZhangjie = zhangjie;
						}
					}
				}
				this.zhangjieList.push(zhangjie);
			}
			this.lastCopyId = this.getMaxLev();
		}


		/** 更新章节变化 */
		public updatePassGuanqia(zjId: number, gqId: number): void {
			//下一个章节序列
			let nexzj: number = -1;
			let nextid: number = -1;
			let gqVo: GuaJiGuanqiaVo = null;
			let len: number = this.zhangjieList.length;
			for (let i = 0; i < len; i++) {
				let zhj: ZhangjieVo = this.zhangjieList[i];
				if (zhj.id == zjId) {
					//更新当前关卡
					zhj.updateGuaqiaState(gqId);
					gqVo = zhj.getGuanqiaById(gqId);
					if (zhj.id > this.maxZhangjie.id)
						this.maxZhangjie = zhj;
					//更新下一个开启关卡
					nextid = zhj.updateNextGuaqiaState(gqId);
					if (nextid != -1 && i < (len - 1)) {
						nexzj = i + 1;
					}
					break;
				}
			}

			//新开章节时，需要更新
			if (nexzj != -1) {
				let nzj: ZhangjieVo = this.zhangjieList[nexzj];
				nzj.updateGuaqiaState(nextid);
				//新章节提示
				if (this.currentZhangjie && this.currentZhangjie.id != nzj.id && nzj.isOpen() && nzj.isNew()) {
					this.newOpen = nzj.id;
				}
			}
		}

		public isInMapGuide(): boolean {
			return this.newOpen != 0;
		}

		/** 是否解锁章节 */
		public isUnlockCapter(chapter): boolean {
			let unlockCapter = App.hero.copyUnlockId == 1 ? 1000 : App.hero.copyUnlockId;
			return chapter <= unlockCapter;
		}

		/**获取关卡 */
		public getGuanqiaById(id: number): GuaJiGuanqiaVo {
			for (let index = 0; index < this.zhangjieList.length; index++) {
				let zj = this.zhangjieList[index];
				for (let key in zj.guankaMap) {
					if (zj.guankaMap.hasOwnProperty(key)) {
						let element: GuaJiGuanqiaVo = zj.guankaMap[key];
						if (element.tbCopyInfo.ID == id) {
							return element;
						}
					}
				}
			}
			return null;
		}

		/**获取章节 */
		public getZhangjie(id: number): ZhangjieVo {
			for (let index = 0; index < this.zhangjieList.length; index++) {
				let element = this.zhangjieList[index];
				if (element.id == id) {
					return element;
				}
			}
			return null;
		}

		/**
		 * 获得当前章节的下一章节 相对的
		 */
		getNextZj(): ZhangjieVo {
			let idx = this.zhangjieList.indexOf(this.currentZhangjie);
			if (idx == -1) {
				return null;
			} else {
				let nextid = idx + 1;
				if (nextid > this.zhangjieList.length) return null;
				return this.zhangjieList[nextid];
			}
		}

		/**
         * 获得当前章节通关的最高Id
         * 如当前章节，未通关过任何关卡，返回-1
         * @param chapter 
         */
		public getCopyInfoByChapter(chapter: number): number {
			let copyid: number = -1;
			if (App.hero.runeCopyInfo.hasOwnProperty(chapter)) {
				copyid = Number(App.hero.runeCopyInfo[chapter]);
			}
			return copyid;
		}

		/**
         * 获得历练副本已挑战次数
         * @param id 
         */
		public getCopyNumById(id: number): number {
			let num: number = 0;
			if (App.hero.copyChallengeInfo.hasOwnProperty(id))
				num = Number(App.hero.copyChallengeInfo[id]);
			return num;
		}

		/** 是否通关副本 */
		public isPassCopy(copyId: number): boolean {
			let tbCpInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			let tbCopy = tb.TB_copy.get_TB_copyById(tbCpInfo.area);
			let curCopyId = this.getCopyInfoByChapter(tbCopy.chapter);
			return curCopyId >= copyId;
		}

		/** 获取当前最大的关卡完成id */
		public getMaxLev(): number {
			let maxlev: number = 0;
			for (let key in App.hero.runeCopyInfo) {
				if (App.hero.runeCopyInfo.hasOwnProperty(key)) {
					maxlev = Math.max(maxlev, Number(App.hero.runeCopyInfo[key]));
				}
			}
			return maxlev;
		}

		/** 获取当前最大的关卡完成id */
		public getMaxChapter(): number {
			let maxlev = this.getMaxLev();
			let copyinfo = tb.TB_copy_info.get_TB_copy_infoById(maxlev);
			return copyinfo ? copyinfo.area : 1000;
		}

		arrSubType = ["简单", "困难", "地狱"];
		getCopyRankDesc(copyId: number): string {

			let info = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			if (info) {
				// let copy = tb.TB_copy.get_TB_copyById(info.area);
				let id = copyId.toString().split("");
				return LanMgr.getLan(`${this.arrSubType[id[1]]}${Number(id[2]) + 1}-${info.area_number}`, -1);
			}
			return '无';
		}

		getCopyDesc(copyId: number): string {
			let info = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			if (info) {
				// let copy = tb.TB_copy.get_TB_copyById(info.area);
				let id = copyId.toString().split("");
				return LanMgr.getLan(`${this.arrSubType[id[1]]}`, -1);
			}
			return '无';
		}

		getSelfRankDesc(): string {
			return this.getCopyRankDesc(this.getMaxLev());
		}

		/** 红点规则 挂机宝箱未领取收益是否大于30分钟*/
		isPassTime(): boolean {
			let time = (App.getServerTime() - App.hero.lastGetAfkTime) / 60;
			return time >= 30;
		}

		/** 是否可以挑战 */
		isCanChallenge(copyId: number): boolean {
			let copyInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			if (!copyInfo) return false;
			if (App.hero.level < copyInfo.getConditionVal(CopyConditionType.level)) {
				return false;
			}
			let maxlev = this.getMaxLev();
			if (copyInfo.getConditionVal(CopyConditionType.id) > maxlev) {
				return false;
			}
			return true;
		}
		/** 获得可以挑战的最大关卡 */
		getCanChallengeMaxCopy(): tb.TB_copy_info {
			let copyId = this.getMaxLev();
			let tbCopy = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			if (tbCopy) {
				let nextCopy = tb.TB_copy_info.get_TB_copy_infoById(tbCopy.next);
				return nextCopy;
			}
			return null;
		}

		/** 获取收益速率 */
		getShouyiSpeedList(): any[] {
			let lastCopy = tb.TB_copy_info.get_TB_copy_infoById(this.lastCopyId);
			let curCopy = tb.TB_copy_info.get_TB_copy_infoById(this.getMaxLev());
			if (!curCopy) return [];
			let ary = [];
			// 是否有变化
			let lastGodExpSp = lastCopy ? lastCopy.exp_speed : 0;
			let lastGoldSp = lastCopy ? lastCopy.gold_speed : 0;
			let lastRoleExpSp = lastCopy ? lastCopy.role_exp_speed : 0;
			if(curCopy.exp_speed > lastGodExpSp || curCopy.gold_speed > lastGoldSp || curCopy.role_exp_speed > lastRoleExpSp) {
				ary.push({ type: iface.tb_prop.resTypeKey.roleExp, last: Math.floor(lastRoleExpSp), cur: Math.floor(curCopy.role_exp_speed) });
				ary.push({ type: iface.tb_prop.resTypeKey.gold, last: Math.floor(lastGoldSp), cur: Math.floor(curCopy.gold_speed) });
				ary.push({ type: iface.tb_prop.resTypeKey.godExp, last: Math.floor(lastGodExpSp), cur: Math.floor(curCopy.exp_speed) });
			}
			return ary;
		}

		/**
		 * 先从本章已通关的随机
		 */
		getRandomMonster(chapter) {
			let guanqiaList = [];
			let zj = this.zhangjieList[chapter];
			for (var key in zj.guankaMap) {
				var element: GuaJiGuanqiaVo = zj.guankaMap[key];
				if (element.tbCopyInfo.area_number != 10 && (element.isPass || element.isNext())) {
					guanqiaList.push(element);
				}
			}
			let guanqiaKey = random(guanqiaList.length);
			return guanqiaList[guanqiaKey] ? guanqiaList[guanqiaKey].tbCopyInfo : null;
		}


		/**　获取最大的挂机收益时间 */
		getMaxOfflineTime():number {
			let time = tb.TB_copy_set.getCopySet().offline_time;
			let hasMonthCard = App.serverTimeSecond <= App.hero.welfare.monthCardEndTime;
			if(hasMonthCard){
				time += tb.TB_month_card.getTbMonthCardById(1).offline_time;
			}
			let hasLifeCard = App.hero.welfare.lifelongCard == 1;
			if(hasLifeCard){
				time += tb.TB_month_card.getTbMonthCardById(2).offline_time;
			}
			return time;
		}

		//是否可领取宝箱奖励
        public isCanReceiveBX(): boolean {
            if (App.hero.lastGetAfkTime == 0) return false;
            //挂机时间   单位:秒
            let time = App.serverTimeSecond - App.hero.lastGetAfkTime;
            let guajiTime = tb.TB_copy_set.getCopySet().short_time;
            return guajiTime <= time;
        }
	}
}