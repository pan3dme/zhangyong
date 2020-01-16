/**
* name 
*/
module game {
	/** 福利类型 */
	export enum WelfareType {
		daySign = 1,
		dayLibao = 2,
		weekLibao = 3,
		monthLibao = 4,
		monthSign = 5,
		xuyuan = 6,
		yueka = 7,
		dengjiJijin = 8,
		dengjiLibao = 9,
		duihuan = 10,
	}

	export class HuodongModel {
		/**英雄转盘记录 */
		public godRecord: any;
		/**装备转盘记录 */
		public equipRecord: any;
		/**宝物转盘记录 */
		public treasureRecord: any;
		/**当前可以补签的日期 */
		public canBuqianDate: number = 0;
		/**付费活动tab */
		public payTabItemLabel: Array<Array<any>>;
		/**福利活动tab */
		public welfareTabItemLabel: Array<Array<any>>;

		constructor() {
			this.welfareTabItemLabel = [
				[WelfareType.daySign, "fuli_meiri", `mrqd_fl_icon`, '每日签到'],
				[WelfareType.monthSign, "fuli_qiandao", `myqd_fl_icon`, '每月签到'],
				[WelfareType.dengjiLibao, "fili_dengji", `djlb_fl_icon`, '等级礼包'],
				[WelfareType.xuyuan, "fuli_xuyuan", `xy_fl_icon`, '许愿'],
				[WelfareType.duihuan, "", `dh_fl_icon`, '兑换']
			];
			this.payTabItemLabel = [
				[WelfareType.dayLibao, "fuli_daylibao", `meiri`, '每日礼包'],
				[WelfareType.weekLibao, "fuli_weeklibao", `meizhou`, '每周礼包'],
				[WelfareType.monthLibao, "fuli_monthlibao", `meiyue`, '每月礼包'],
				[WelfareType.dengjiJijin, "fuli_jijin", `djjj_fl_icon`, "等级基金"],
				[WelfareType.yueka, "fuli_yueka", `yk_fl_icon`, '月卡']
			];
			this.initLoginGift();
		}

		static getRewardsInfo(idx, vip) {
			if (idx == 1) {
				return LanMgr.getLan(``,10469,vip);
			} else {
				return this.rewards[idx];
			}
		}

		static rewards = [
			LanMgr.getLan(``,10470),
			LanMgr.getLan(``,10471),
			LanMgr.getLan(``,10472)
		]

		private static _instance: HuodongModel;
		public static getInstance(): HuodongModel {
			if (!this._instance) {
				this._instance = new HuodongModel();
			}
			return this._instance;
		}

		/**累计签到数 */
		static getTotalSignNum(): number {
			let signDays: number = 0;
			for (let i in App.hero.welfare.dailySignIn) {
				if (App.hero.welfare.dailySignIn[i] != 0) {
					signDays++;
				}
			}
			return signDays;
		}

		/**补签次数 */
		static getBuqianNum(): number {
			let num: number = 0;
			for (let i in App.hero.welfare.dailySignIn) {
				if (App.hero.welfare.dailySignIn[i] == iface.tb_prop.signInTypeKey.supplement) {
					num++;
				}
			};
			return num;
		}

		/**今日是否签到 */
		static isTodaySign(): boolean {
			let today = new Date(App.serverTimeSecond * 1000).getDate();
			return today == App.hero.welfare.todaySignIn;
		}

		/**补签消耗 */
		static getSignCost(): number[] {
			return tb.TB_game_set.get_TB_game_setById(1).sign_cost;
		}

		/**装备最大幸运值 */
		static getMaxEquipLucky(): number {
			return tb.TB_luck_equip_reward.get_TB_luck_equip_reward().pop().lucky;
		}

		/**是否在活动时间内 */
		static isOnActivatyTime(): boolean {
			return App.hero.welfare.luckEquipId > 0
				|| App.hero.welfare.luckGodId > 0
				|| App.hero.welfare.luckTreasureId > 0;
		}

		/**
		 * 获得奖品tb
		 * @param type View的tab.seclectIndex
		 */
		static getBoxTb(type: number): any {
			switch (type) {
				case TURNTABLE.ART: return tb.TB_luck_artifact_time.get_TB_luck_artifact_timeById();
				case TURNTABLE.EQUIP: return tb.TB_luck_equip.get_TB_luck_equip();
				case TURNTABLE.GOD: return tb.TB_luck_god.get_TB_luck_god();
				case TURNTABLE.WISH: return tb.TB_wish.get_TB_wish();
				default: return tb.TB_luck_god.get_TB_luck_god();
			}
		}

		/**
		 * 获得的物品和抽奖停留位置
		 * @param type View的tab.seclectIndex
		 * @param ids 获得的物品ID[]
		 */
		static getRewards(type: number, ids: number[]): any {
			if (!ids) return;
			let tbs = ids.map(id => HuodongModel.getTbBytype(type, id));
			let rewards = tbs.map(tb => new ItemVo(tb['item'][0], tb['item'][1]))
			return { data: rewards, location: tbs[0]['location'] };
		}

		/**
		 * 获得Tb数据
		 * @param type View的tab.seclectIndex
		 * @param id 
		 */
		static getTbBytype(type: number, id: number) {
			switch (type) {
				case TURNTABLE.ART: return tb.TB_luck_artifact.get_TB_luck_artifactById(id);
				case TURNTABLE.EQUIP: return tb.TB_luck_equip.get_TB_luck_equipById(id);
				case TURNTABLE.GOD: return tb.TB_luck_god.get_TB_luck_godById(id);
				case TURNTABLE.WISH: return tb.TB_wish.get_TB_wishById(id);
				default: return tb.TB_luck_god.get_TB_luck_godById(id);
			}
		}

		/**获得每日签到TB */
		public getSignTb(): ToSignVo {
			let curId = (Math.floor((App.getServerTime() - App.hero.signInStartTime) /
				TimeConst.ONE_DAY_SEC) % tb.TB_activity_set.getTabSet().sign_cycle) + 1;
			//容错
			curId = Math.max(1, curId);
			return new ToSignVo(curId);
		}

		/**
		 * 返回请求
		 * @param type View的tab.seclectIndex
		 */
		public getProtocol(type: number): any {
			switch (type) {
				case 0: return Protocol.game_luck_buyluckGod;
				case 1: return Protocol.game_luck_buyluckEquip;
				case 2: return Protocol.game_luck_buyluckArt;
			}
			return null;
		}

		//额外奖励列表
		private _LuckEquipExtList: LuckEquipExtData[];
		getLuckEquipExtList(): LuckEquipExtData[] {
			if (!this._LuckEquipExtList) {
				this._LuckEquipExtList = [];
				let tbData = tb.TB_luck_equip_reward.get_TB_luck_equip_reward();
				for (let id in tbData) {
					this._LuckEquipExtList.push(new LuckEquipExtData(tbData[id]));
				}
				this._LuckEquipExtList.sort((a, b) => {
					return a.tbReward.ID - b.tbReward.ID;
				})
			}
			return this._LuckEquipExtList;
		}

		// 时间转换
		public getTimeLb(type, time): string {
			var openTime = new Date(App.hero.openSvrTime * 1000);
			openTime.setHours(0, 0, 0, 0);
			var openSvrTime = Math.floor(openTime.getTime() / 1000);
			var info = { startTime: 0, endTime: 0, rewardTime: '' };
			if (type === 0) {
				info.startTime = 0;
				info.endTime = 2544183919;
				if (time[2] != null) {
					info.rewardTime = `1`;
				}
			} else if (type === 2) {
				info.startTime = openSvrTime + 86400 * (time[0] - 1);
				info.endTime = openSvrTime + 86400 * time[1];
				// if (time[2] != null) {
				info.rewardTime = activityTime(App.getServerTime(), info.endTime);
				// }
			} else if (type === 1) {
				info.startTime = new Date(time[0].toString()).getTime() / 1000;
				info.endTime = new Date(time[1].toString()).getTime() / 1000;
				// if (time[2] != null) {
				info.rewardTime = new Date(time[0].toString()).toLocaleString();
				// }
			}
			return info.rewardTime;
		}

		//获取剩余时间
		public static TYPE_TIME_ZERO: number = 0;
		public static TYPE_TIME_ONE: number = 1;
		public static TYPE_TIME_TWO: number = 2;//开服时间
		public static getRemainTimeByTemp(type: number, times: number[]): number {
			let remainTime: number = 0;
			let serverTime: number = App.getServerTime();
			switch (type) {
				case this.TYPE_TIME_ZERO:
					break;
				case this.TYPE_TIME_ONE:
					break;
				case this.TYPE_TIME_TWO:
					if (times && times.length > 1) {
						var openTimeDate: Date = new Date(App.hero.openSvrTime * 1000);
						openTimeDate.setHours(0, 0, 0, 0);
						let openZeroTime: number = Math.floor(openTimeDate.getTime() / 1000);;//开服当天零点时间（s)

						let endDay: number = times[1];
						remainTime = endDay * 86400 + openZeroTime - serverTime;
					}
					break;
			}
			return remainTime;
		}

		/**获得转盘记录 */
		getRecordByType(type: number) {
			if (type == TURNTABLE.GOD && this.godRecord) {
				return this.godRecord
			}
			else if (type == TURNTABLE.EQUIP && this.equipRecord) {
				return this.equipRecord
			}
			else if (type == TURNTABLE.TREASURE && this.treasureRecord) {
				return this.treasureRecord;
			}
			else dispatchEvt(new HuodongEvent(HuodongEvent.GET_LUCKY_RECORD), type);
		}

		//获取幸运转盘活动id
		static getLuckIdByType(type: number): number {
			switch (type) {
				case TURNTABLE.GOD://神灵
					return App.hero.welfare.luckGodId;
				case TURNTABLE.EQUIP://装备
					return App.hero.welfare.luckEquipId;
				case TURNTABLE.ART://神器
					return App.hero.welfare.luckArtId;
				case TURNTABLE.TREASURE://宝物
					return App.hero.welfare.luckTreasureId;
				default:
					return 0;
			}
		}
		//获取幸运转盘幸运值
		static getLuckValueByType(type: number): number {
			switch (type) {
				case TURNTABLE.GOD://神灵
					return App.hero.welfare.luckGodNum;
				case TURNTABLE.EQUIP://装备
					return App.hero.welfare.luckEquipNum;
				case TURNTABLE.ART://神器
					return 0;
				case TURNTABLE.TREASURE://宝物
					return App.hero.welfare.luckTreasureNum;
				default:
					return 0;
			}
		}
		//获取幸运转盘免费次数
		static getLuckFreeCount(type: number): number {
			let limitKey: number = 0;
			let temp: any;
			let id: number = this.getLuckIdByType(type);
			switch (type) {
				case TURNTABLE.GOD:
					limitKey = iface.tb_prop.limitTypeKey.luckGodFreeNum;
					temp = tb.TB_luck_god_time.get_TB_luck_god_timeById(id);
					break;
				case TURNTABLE.EQUIP:
					limitKey = iface.tb_prop.limitTypeKey.luckEquipFreeNum;
					temp = tb.TB_luck_equip_time.get_TB_luck_equip_timeById(id);
					break;
				case TURNTABLE.ART:
					limitKey = iface.tb_prop.limitTypeKey.luckArtFreeNum;
					temp = tb.TB_luck_artifact_time.get_TB_luck_artifact_timeById(id);
					break;
				case TURNTABLE.TREASURE:
					limitKey = iface.tb_prop.limitTypeKey.luckTreasureFreeNum;
					temp = tb.TB_luck_treasure_time.getTempById(id);
					break;
				case TURNTABLE.WISH:
					limitKey = iface.tb_prop.limitTypeKey.wishFreeNum;
					temp = tb.TB_wish_set.get_TB_wish_set();
					break;
			}
			if (limitKey == 0 || !temp) return 0
			let freecount: number = temp && temp['free_num'] ? temp['free_num'] : 0;
			return freecount - App.hero.getlimitValue(limitKey);
		}

		static LuckRedNames: string[] = ["lucky_god", "lucky_equip_free", "lucky_art", "", "lucky_treasure_free"];

		/**初始化可补签日期 */
		public initCanBuQianDate(): void {
			let curMonthDate: number = new Date(App.serverTimeSecond * 1000).getDate();
			let todaySign: boolean = curMonthDate == App.hero.welfare.todaySignIn;
			let buqianNum = tb.TB_game_set.get_TB_game_setById(1).add_sign - HuodongModel.getBuqianNum();
			if (curMonthDate == Object.keys(App.hero.welfare.dailySignIn).length || !todaySign || buqianNum <= 0) {
				this.canBuqianDate = 0;
				return;
			}

			for (let i = 1; i <= curMonthDate; i++) {
				if (i in App.hero.welfare.dailySignIn) {
					continue;
				}
				this.canBuqianDate = i;
				break;
			}
		}

		/**检测登录礼包是否全部领取 */
		sevenDaysPackIsAllGet(): boolean {
			/**当前登录能领取的所有礼包 */
			for (let i = 1; i < App.hero.welfare.totalLoginDay + 1; i++) {
				if (!(App.hero.welfare.loginGiftPack.hasOwnProperty(i))) {
					return true;
				}
			}
			return false;
		}

		/**是否显示登入礼包入口 */
		private _isShowLoginGift: boolean[] = [];
		public isShowLoginGift(type: number): boolean {
			return this._isShowLoginGift[type - 1];
		}

		private _allTypeLoginGiftTemps: tb.TB_sevendays[][];
		private initLoginGift(): void {
			tl3d.ModuleEventManager.addEvent(HuodongEvent.TOTAL_LOGIN_DAY, this.updateLoginGift, this);
			tl3d.ModuleEventManager.addEvent(HuodongEvent.LOGIN_GIFT_RECEIVE, this.updateLoginGift, this);
			this._allTypeLoginGiftTemps = [];
			for (let i: number = 0; i < tb.TB_sevendays.TYPE_NUM; i++) {
				this._allTypeLoginGiftTemps[i] = tb.TB_sevendays.get_TB_sevendays(i + 1);
			}
			this.updateLoginGift();
		}

		private updateLoginGift(): void {
			let loginday: number = App.hero.welfare.totalLoginDay ? App.hero.welfare.totalLoginDay : 0;
			let giftReceiveInfo: any = App.hero.welfare.loginGiftPack ? App.hero.welfare.loginGiftPack : {};
			for (let i: number = 0; i < tb.TB_sevendays.TYPE_NUM; i++) {
				let lastday: number = (i + 1) * tb.TB_sevendays.TYPE_DAYS;
				let firstday: number = i * tb.TB_sevendays.TYPE_DAYS + 1;
				if (loginday < firstday) {
					this._isShowLoginGift[i] = false;
				} else if (loginday < lastday) {
					this._isShowLoginGift[i] = true;
				} else {
					let sh: boolean = false;
					let alltemps: tb.TB_sevendays[] = this._allTypeLoginGiftTemps[i];
					if (alltemps && alltemps.length > 0) {
						for (let i: number = 0; i < alltemps.length; i++) {
							let temp: tb.TB_sevendays = alltemps[i];
							if (temp.ID <= loginday && !giftReceiveInfo.hasOwnProperty(temp.ID)) {
								sh = true;
								break;
							}
						}
					}
					this._isShowLoginGift[i] = sh;
				}
			}
		}

		private _queueDialog: any[] = [];
		public autoOpenLoginGift(): void {
			if (GuideManager.isExecuteGuide()) return;
			let loginday: number = App.hero.welfare.totalLoginDay ? App.hero.welfare.totalLoginDay : 0;
			let giftReceiveInfo: any = App.hero.welfare.loginGiftPack ? App.hero.welfare.loginGiftPack : {};
			for (let i: number = 0; i < tb.TB_sevendays.TYPE_NUM; i++) {
				for (let j: number = 0; j < tb.TB_sevendays.TYPE_DAYS; j++) {
					let day: number = i * tb.TB_sevendays.TYPE_DAYS + 1 + j;
					if (day <= loginday && !giftReceiveInfo.hasOwnProperty(day)) {
						let uin: string = UIConst.LoginGiftView;
						this._queueDialog.push({ uiname: uin, data: [i + 1], isAlert: false });
						break;
					}
				}
			}

			//满收益提示
			if (App.hero.lastGetAfkTime != 0) {
				let time = App.getServerTime() - App.hero.lastGetAfkTime;
				let maxtime = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime);
				if (time >= maxtime) {
					this._queueDialog.push({ data: { info: LanMgr.getLan(``,10493), yesstr: LanMgr.getLan(``,10042), type: 1 }, isAlert: true });
				}
			}

			this.checkOpenLoginGift();
		}

		public checkOpenLoginGift(): void {
			if (this._queueDialog.length > 0) {
				let dialog = this._queueDialog.shift();
				if (dialog.isAlert) {
					common.AlertBox.showAlert({
						text: dialog.data.info,
						confirmCb: () => {
							if (dialog.data.type == 1) {
								dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, [ModuleConst.FIGHT]));
							}
						},
						closeCb: () => {
							Laya.timer.callLater(this, this.checkOpenLoginGift);
						},
						yes: dialog.data.yesstr
					});
				} else {
					UIMgr.showUI(dialog.uiname, dialog.data);
				}
			}
		}

		/**检测等级礼包是否全部领取 */
		levelPackIsAllGet(): boolean {
			let tbLevel = tb.TB_level.get_TB_level();
			for (let i in tbLevel) {
				/**当前等级能领取的所有礼包 */
				if (App.hero.level >= tbLevel[i].level) {
					if (!(App.hero.welfare.levelGiftPack.hasOwnProperty(tbLevel[i].ID))) {
						return true;
					}
				}
			}
			return false;
		}

		/**等级基金红点 */
		ratingFundRedPoint(): boolean {
			if (App.hero.welfare.buyLevelFund == 0) {
				let buyCondition: number[] = tb.TB_activity_set.getTabSet().level_fund_buy;
				return App.hero.vip >= buyCondition[0] && App.hero.diamond >= buyCondition[1];
			}
			let data = tb.TB_level_fund.get_TB_level_fund();
			for (let i in data) {
				if (App.hero.level >= data[i].level) {
					if (!(App.hero.welfare.levelFundAward.hasOwnProperty(data[i].ID))) {
						return true;
					}
				}
			}
			return false;
		}

		/**每日签到红点 */
		everyDaySignRP(): boolean {
			let vo = HuodongModel.getInstance().getSignTb();
			for (let i = 0; i < 3; i++) {
				if (vo.canReward(i) && i != 2) {
					return true;
				} else if (vo.canReward(i) && i == 2 && App.hero.vip >= 3) {
					return true;
				}
			}
			return false;
		}

		/**装备寻宝额外奖励红点 */
		luckyEquipExtRewardRP(): boolean {
			if (App.hero.welfare.luckEquipId == 0) return false;
			let datas = HuodongModel.getInstance().getLuckEquipExtList()
			return datas.some(vo => vo.canReward());
		}

		//整点刷新活动
		public refreshActivity(): void {
			if (UIMgr.hasStage(UIConst.LuckyTurnView)) {
				let view: LuckyTurnView = UIMgr.getUIByName(UIConst.LuckyTurnView);
				if (view) view.updateTab();
			}
		}

		/** 是否可以领取内侧返利 */
		public canRewardTestRebate(): boolean {
			let recharge = tb.TB_recharge_rebate.getTBItemById(App.hero.accountName);
			return recharge && recharge.recharge_total > 0 && App.hero.welfare.rechargeRebate == 0;
		}
	}

	export class ToSignVo {
		private _id: number;
		public rewardArr: ItemVo[][] = [];
		constructor(id) {
			this._id = id;
			this.initReward();
		}

		get tb() {
			return tb.TB_recharge_sign.get_TB_recharge_signById(this._id);
		}

		initReward(): void {
			let reward = this.tb.reward.map((data: number[]) => {
				return new ItemVo(data[0], data[1])
			});
			let vipReward = this.tb.vip_reward.map((data: number[]) => {
				return new ItemVo(data[0], data[1])
			});
			let rechargeReward = this.tb.recharge_reward.map((data) => {
				return new ItemVo(data[0], data[1])
			});
			this.rewardArr.push(reward, vipReward, rechargeReward);
		}

		/**是够已领取 */
		isReward(type: number): boolean {
			if (type == 1) return App.hero.welfare.signInVipCount == 1;
			if (type == 0) return App.hero.welfare.signInLoginCount == 1;
			if (type == 2) return App.hero.welfare.signInRechargeCount == 1;
		}

		/**是否达成 */
		isFinish(type: number): boolean {
			if (type == 1) return App.hero.vip >= this.tb.vip_level;
			if (type == 0) return !(App.hero.welfare.signInLoginCount == 1);
			if (type == 2) return App.hero.welfare.dailyRechargeSum >= this.tb.recharge_num;
		}

		/**是否可领取 */
		canReward(type: number): boolean {
			return !this.isReward(type) && this.isFinish(type);
		}
	}

	/** 七日额外奖励数据 */
	export class LuckEquipExtData {
		public event: Function;
		public tbReward: tb.TB_luck_equip_reward;
		constructor(tb: tb.TB_luck_equip_reward) {
			this.tbReward = tb;
			this.event = () => { dispatchEvt(new HuodongEvent(HuodongEvent.GET_LUCKEQUIP_REWARD), this.tbReward.ID) };
		}

		/** 是否完成 */
		isFinish(): boolean {
			return App.hero.welfare.luckEquipNum >= this.tbReward.lucky;
		}

		/** 是否已领取 */
		isReward(): boolean {
			return App.hero.welfare.luckEquipAward[this.tbReward.ID] ? true : false;
		}

		/**奖励 */
		getReward(): Array<ItemVo> {
			return this.tbReward.reward.map(vo => new ItemVo(vo[0], vo[1]));
		}

		/** 是否可领取 */
		canReward(): boolean {
			return this.isFinish() && !this.isReward();
		}
	}

	/** 福利表 */
	export interface IServerWelfareVo {
		/**每日签到（1：已签，2：补签）*/
		dailySignIn: any;
		/**已领取的分享奖励*/
		doneShares: number[];
		/**当天分享次数*/
		shareNumToday: number;
		/**累计分享次数*/
		shareNumTotal: number;
		/**每天充值总数 */
		dailyRechargeSum: any;
		/**首充礼包 */
		firstRecharge: Object;
		/**首充时间戳 */
		firstRechargeTime: Object;
		/**GM充值总数 */
		gmRechargeSum: any;
		/**最后GM充值ID */
		lastGMRechargeId: any;
		/**最后充值ID */
		lastRechargeId: any;
		/**等级礼包*/
		levelGiftPack: any;
		/**终身卡（1：已购买）*/
		lifelongCard: any;
		/**终身卡领奖（1：已领取）*/
		lifelongCardAward: any;
		/**今日登录次数*/
		loginCount: any;
		/**登录礼包*/
		loginGiftPack: any;
		/**月卡领奖（1：已领取）*/
		monthCardAward: any;
		/**月卡结束时间*/
		monthCardEndTime: any;
		/**特权礼包*/
		privilegeGiftPack: any;
		/**充值次数 */
		rechargeCount: any;
		/**充值总数 */
		rechargeSum: any;
		/**开服团购奖励信息 */
		openSvrGroupBuyAward: any;
		/**总登录天数*/
		totalLoginDay: any;
		/**累计签到*/
		totalSignIn: any;
		/**每个挡位充值次数 */
		goodsRechargeCount: any;
		/**今日签到日期 */
		todaySignIn: any;
		/**购买等级基金次数*/
		buyLevelFund: any;
		/**等级基金奖励信息*/
		levelFundAward: any;
		/**七天任务信息*/
		sevendayInfo: Object;
		/**七天额外奖励信息*/
		sevendayExtraAward: Object;
		/**每日签到登录领取次数*/
		signInLoginCount: any;
		/**每日签到VIP领取次数*/
		signInVipCount: any;
		/**每日签到充值领取次数*/
		signInRechargeCount: any;
		/**英雄转盘ID*/
		luckGodId: any;
		/**装备转盘ID*/
		luckEquipId: any;
		/**已领取的开服豪礼礼包*/
		doneOpenGifts: number[];
		/**神器转盘ID*/
		luckArtId: any;
		/**装备转盘幸运奖励领取信息*/
		luckEquipAward: any;
		/**英雄转盘幸运值*/
		luckGodNum: any;
		/**装备转盘幸运值*/
		luckEquipNum: any;
		/**宝物转盘id*/
		luckTreasureId: any;
		/**宝物转盘幸运值*/
		luckTreasureNum: any;
		/**宝物转盘领取次数*/
		luckTreasureTypeNums: any;
		/**实名认证奖励领取次数 */
		autonymAwardNum: number;
		/**在线时间奖励*/
		onlineTimeAward: Object;
		/** 超级会员 1是，0不是*/
		superVip: number;
		/** 超级会员奖励是否已领取 1是，0不是*/
		superVipAward: number;
		/** 已购买周基金id（数组）*/
		weekFund: number[];
		/** 已购买周基金奖励id（数组）*/
		weekFundAward: number[];
		/** 已领取的开服礼包次数*/
		openSvrGiftAwardNums: any;
		/** 每日充值可领取次数*/
		dailyRechargeNums: any;
		/** 每日充值已领取次数*/
		dailyRechargeAwardNums: any;
		/** 开服团购总充值数*/
		openSvrRechargeSum: number;
		/**充值返利是否领取 */
		rechargeRebate: number;

		/** 每日充值可领取次数 */
		dayRechargeLimit: any;
		/** 每周充值可领取次数 */
		weekRechargeLimit: any;
		/** 每月充值可领取次数 */
		monthRechargeLimit: any;

		/** 大富翁本轮踩过的id集合*/
		riskIds: number[];
		/** 当前大富翁踩的id*/
		curRiskId: number;
		/** 奇遇信息 */
		riskInfo: any;
	}
}
