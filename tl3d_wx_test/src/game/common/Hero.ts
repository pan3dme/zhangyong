/**
* name 
*/
module common {
	export class Hero {
		/**平台uid */
		public puid: string = "";
		/**账户名字 */
		public accountName: string = "";
		/**游戏uid */
		public uid: string = "";
		/**玩家ID*/
		public playerId: string = "";
		/**玩家积分*/
		public arenaScore: number;
		/**新玩家标识*/
		public isNewPlayer: number = 0;
		/** 登录次数 */
		public loginCount: number;
		/**玩家名字*/
		public name: string = "";
		/**玩家头像 三个字段*/
		private head: string = "";	// 外部头像
		private headId: any = 0;	// 神灵头像 要大于0
		public sex: number = 1;		// 玩家性别 可表示头像
		/**玩家头像*/
		public headIcon: string = "";
		/** 头像框ID */
		public headFrame: number;
		/** 展示的模型神灵及模型ID(GodSkinType) */
		public showGodId: number;
		public showSkinId: number;
		/**玩家等级*/
		public level: number = 1;
		/**玩家经验*/
		public exp: number = 666;
		public lastLoginIp: string;
		/**神器信息 */
		public artifactInfo: Object;
		/**神器强化等级 */
		public artifactStrengthLv: number = 0;
		/**神器技能等级 */
		public artifactSkillLv: number = 0;
		/**神器洗练等级 */
		public artifactBaptizeLv: number = 0;
		/**神器洗练经验 */
		public artifactBaptizeExp: number = 0;
		/**神器洗练属性 */
		public artifactBaptizeAttrs: Object;
		/**神器临时洗练属性 */
		public artifactBaptizeTempAttr: Object;
		/**神器星级 */
		public artifactStarLv: number = 0;
		/**神器星级经验 */
		public artifactStarExp: number = 0;
		/**神器布阵信息 */
		public lineupArtifactInfo: Object;
		/**装备最大编号 */
		public equipKey: number;
		/**普通背包数据*/
		public bagItemsObj: Object;
		/**装备背包数据 */
		public bagEquipsObj: { [key: string]: EquipSvo };
		/**限时宝箱背包数据 */
		public bagTimeItemsObj: Object;
		/**英雄数*/
		public gods: { [key: string]: IGodSvo };;
		/**当前公会数*/
		public guildNum: number;

		/**钻石数量*/
		public diamond: number = 0;
		/**友情点数量*/
		public friend: number = 0;
		/** 勋章 */
		public arena: number = 0;
		/**金币数量*/
		public gold: number = 0;
		/**英雄经验池*/
		public godExp: number = 0;
		/**公会ID */
		public guildId: string = "";
		/** 公会等级 */
		public guildLv: number = 0;
		/** 公会经验 */
		public guildExp: number = 0;
		/** 公会贡献 */
		public guildDonate: number = 0;
		public guildName: string = "";
		public guildHelpNum: number = 0;
		/** 通关奖励数据 */
		public guildCopyAwardInfo: any;
		/** 副本伤害数据 */
		public guildCopyDamageInfo: any;
		/** 副本最大伤害数据 */
		public guildCopyMaxDmg: any;
		/** 公会技能信息 */
		public guildSkillInfo: any;
		public guildHelpEndTime: number;
		/** 下一关可以挑战时间戳 */
		public lastProgressTime: any;
		/**vip等级*/
		public vip: number = 0;
		public vipScore: number;
		/**许愿次数 */
		public limitInfo = { "4": 0, "5": 0 };
		/**布阵obj */
		public lineupInfo: Object;
		/**膜拜 */
		public worshipInfo: Object;
		/** 图鉴 */
		public godAlbum: Array<number>;
		/** 任务 */
		public tasks: game.IServerTasksVo;
		/**福利表 */
		public welfare: game.IServerWelfareVo;
		/**符文副本通关进度 */
		public runeCopyInfo: Object = {};
		/**地下城副本通关进度 */
		public groundCopyInfo: Object = {};
		/** 试炼塔副本通关进度 */
		public towerCopyInfo: Object = {};
		/** 试炼塔boss奖励领取数据 */
		public towerAwardInfo: Object = {};
		/**上次刷新挑战列表时间 */
		public arenaClgListTime: number = 0;
		/**竞技场挑战冷却时间 */
		public arenaFailTime: number = 0;
		/** 上次领取挂机宝箱时间 */
		public lastGetAfkTime: number = 0;
		// public afkAward: any[] = [];
		// public lastAfkTime: number = 0;
		/**历史最高战斗力 */
		public maxHistoryForce: number = 0;
		/** 集市刷新时间 */
		public marketRefreshReplyTime: number;
		/** 转换星辰 */
		public convertDust: number;
		/** 黑暗精华 */
		public darkEssence: number;
		/** 神界结晶 */
		public godCrystal: number;
		/** 传说碎片 */
		public legendChip: number;
		/** 灵魂石 */
		public soulStone: number;
		/** 红点数据 */
		public redPointInfo: any;
		/** 创角时间戳 */
		public createTime: number;
		/** 剩余次数数据 */
		public overplusInfo: any = {};
		/** 历练副本挑战次数 */
		public copyChallengeInfo: any = {};
		public copyInfo: ICopyInfo;
		public initData: any;
		/** 世界boss回复时间*/
		public worldBossReplyTime: number;
		/** 神秘岛屿掠夺次数回复时间*/
		public mineRobReplyTime: number;
		/** 护送随机货物id */
		public escortTradeId: number;
		/** 防沉迷 */
		/** 是否防沉迷 */
		public isIndulge: number;
		/** 防沉迷统计时间 */
		public indulgeEndTime: number;
		/** 防沉迷在线时间 */
		public indulgeOnlineTime: number;
		/** 防沉迷离线时间 */
		public indulgeOutlineTime: number;
		/** 荣耀币 */
		public honour: number;
		/** 神域币 */
		public godDomain: number;
		/** 迷雾森林当前关卡 */
		public forestCurFloor: number;
		/** 迷雾森林历史最大关卡 */
		public forestMaxFloor: number;
		/** 已领取的迷雾森林宝箱数组 [floor:number...] */
		public doneForestChests: number[];
		/** 限时召唤积分 */
		public summonScore: number;
		/** 限时召唤已领取宝箱数组 */
		public doneSummonChests: Array<any>;
		/** 开服时间 */
		public openSvrTime: number;
		/**每轮签到开始时间 */
		public signInStartTime: number;
		/** 公会战宝箱领取次数 */
		public guildWarAwardCount: any = {};
		/** 总在线时间 */
		public totalOnlineTime: number;
		/** 在线时间结算时间戳 */
		public onlineEndTime: number;
		/** 挂机开启宝箱 */
		public mapBoxAwardIds: number[];
		/** 下载微端按钮状态 -1：不显示 0：当前处于非微端 1：当前处于微端 */
		public downClient: number;
		/** vip服务按钮状态 -1：不显示  */
		public vipService: number;
		/** 实名认证  -1：不显示 0未认证 1：认证成年 2:认证未成年 */
		public realNameVisable: number;
		/** 分享  -1：不显示 */
		public shareVisable: number;
		/** 实名认证*/
		public isCertification: number;
		/** 绑定手机 -1：不显示 0未绑定 1：绑定 */
		public bindPhone: number = 1;
		/** 绑定手机奖励领取状态 */
		public bindMobileAward: number;
		/** 黑名单 */
		public blockLists: string[];
		/** 微端下载 */
		public isWeiDuanXZ: boolean;
		/** 领取微端下载礼包 */
		public isReceiveWDXZ: boolean;
		/** 服务端战力 */
		public force: number;
		/** 全服首充人数 */
		public rechargePlayerNum: number;
		/** 副本当前最高章节 */
		public copyUnlockId: number;
		/** 图鉴激活情况 */
		public godFateIds: number[];

		public skinIds: number[];				// 已激活皮肤
		public godAwakens: number[];			// 已觉醒神灵ID列表
		public honourStage: number = 0; 		// 荣耀之战本服阶段(>0即开启)
		public kuafuHonourStage: number = 0;	// 荣耀之战跨服阶段(>0即开启)

		public maxStarLvInfo: any;				// 神灵最高星级
		public firstIds: any;				// 终身首次ID

		// 圣物
		public treasureBooks: number[];		// 圣物图鉴
		// 拥有的圣物
		public treasures: { [key: string]: ITreasureSvo };
		// 拥有的宝石
		public gemstones: { [key: string]: IGemstoneSvo };

		//已通关每日副本
		public dailyCopyIds: number[] = [];

		private _godAry: Array<GodItemVo>;
		constructor() {

		}

		public setData($data: any) {
			//如果在平台，默认值就为
			this.downClient = 1;
			this.shareVisable = 1;
			this.bindPhone = 1;
			this.realNameVisable = 1;
			this.vipService = 1;
			this.force = $data.base.forceNum;
			this.name = $data.base.name;
			// 设置头像
			this.sex = $data.base.sex;
			this.head = $data.base.head ? $data.base.head : "";
			this.headId = $data.base.headId;
			this.headFrame = $data.base.headFrame || 0;
			this.showGodId = $data.base.showGodId || GlobalData.DEFAULT_SHOW_GODID;
			this.showSkinId = $data.base.showSkinId || GlobalData.DEFAULT_SHOW_SKINID;
			this.updateSelfHead();
			this.playerId = $data.playerId;
			this.equipKey = $data.bag.equipKey;
			this.bagItemsObj = $data.bag.items;
			this.bagEquipsObj = $data.bag.equips;
			this.bagTimeItemsObj = $data.bag.timeItems || {};
			this.gods = $data.god.gods || {};
			this.skinIds = $data.god.skinIds || [];
			this.godAwakens = $data.god.godAwakens || [];
			this.maxStarLvInfo = $data.god.maxStarLvInfo || {};
			this.level = $data.base.level == undefined ? 1 : $data.base.level;
			game.HudModel.getInstance().oldUserLv = this.level;
			this.exp = $data.base.exp;
			this.copyUnlockId = $data.copy.copyUnlockId || 1000;
			this.lastProgressTime = $data.extend.lastProgressTime || 0;
			this.guildHelpEndTime = $data.extend.guildHelpEndTime || 0;
			this.treasureBooks = $data.extend.treasureBooks || [];
			this.treasures = $data.bag.treasures || {};
			game.TreasureModel.getInstance().initModel();
			this.gemstones = $data.bag.gemstones || {};
			game.GemstoneModel.getInstance().initData();

			this.firstIds = $data.extend.firstIds || [];
			this.godFateIds = $data.extend.godFateIds || [];
			this.createTime = $data.base.createTime;
			this.isNewPlayer = $data.base.isNewPlayer;
			this.loginCount = $data.welfare.loginCount;
			this.bindMobileAward = $data.welfare.bindMobileAward;
			this.vip = $data.base.vipLevel || 0;
			this.mapBoxAwardIds = $data.copy.mapBoxAwardIds || [];
			this.isReceiveWDXZ = $data.welfare.downloadApkAward != 0;
			/** 公会 */
			this.guildId = $data.base.guildId || "";
			this.guildExp = $data.base.guildExp || 0;
			this.guildDonate = $data.currency.guildDonate || 0;
			this.guildName = $data.base.guildName || "";
			this.guildCopyDamageInfo = $data.extend.guildCopyDamageInfo || {};
			this.guildCopyMaxDmg = $data.extend.guildCopyMaxDmg || {};
			this.guildCopyAwardInfo = $data.extend.guildCopyAwardInfo || {};
			this.guildSkillInfo = $data.extend.guildSkillInfo || {};
			this.guildWarAwardCount = $data.extend.guildWarAwardCount || {};
			this.maxHistoryForce = $data.extend.maxHistoryForce || 0;
			//神器
			this.artifactInfo = $data.extend.artifactInfo || {};
			this.lineupArtifactInfo = $data.extend.lineupArtifactInfo || {};
			this.artifactStrengthLv = $data.extend.artifactStrengthLv || 0;
			this.artifactSkillLv = $data.extend.artifactSkillLv || 1;
			this.artifactBaptizeLv = $data.extend.artifactBaptizeLv || 1;
			this.artifactBaptizeExp = $data.extend.artifactBaptizeExp || 0;
			this.artifactBaptizeAttrs = $data.extend.artifactBaptizeAttrs || {};
			this.artifactStarLv = $data.extend.artifactStarLv || 0;
			this.artifactStarExp = $data.extend.artifactStarExp || 0;

			this.worshipInfo = $data.extend.worshipInfo || {};
			this.diamond = $data.currency.diamond || 0;
			this.friend = $data.currency.friend || 0;
			this.arena = $data.currency.arena || 0;
			this.gold = $data.currency.gold || 0;
			this.convertDust = $data.currency.convertDust || 0;
			this.darkEssence = $data.currency.darkEssence || 0;
			this.godCrystal = $data.currency.godCrystal || 0;
			this.legendChip = $data.currency.legendChip || 0;
			this.soulStone = $data.currency.soulStone || 0;
			this.vipScore = $data.currency.vipScore || 0;
			//ip
			this.lastLoginIp = $data.base.lastLoginIp || "";

			// 副本数据
			this.runeCopyInfo = $data.extend.runeCopyInfo || {};
			//历练副本挑战次数

			this.copyChallengeInfo = $data.copy.copyChallengeInfo || {};
			this.groundCopyInfo = $data.extend.groundCopyInfo || {};
			this.towerCopyInfo = $data.extend.towerCopyInfo || {};
			this.towerAwardInfo = $data.extend.towerAwardInfo || {};

			this.totalOnlineTime = $data.extend.totalOnlineTime || 0;
			this.onlineEndTime = $data.extend.onlineEndTime || 0;

			// 副本数据
			this.copyInfo = $data.copy;
			this.copyInfo.helpGodId = this.copyInfo.helpGodId || [];
			this.copyInfo.friendHelpList = this.copyInfo.friendHelpList || [];
			this.dailyCopyIds = $data.copy.dailyCopyIds || [];
			//设置每日限制次数
			let limitTypeKey = iface.tb_prop.limitTypeKey;
			let limitInfo = $data.extend.limitInfo;
			for (let id in limitTypeKey) {
				this.limitInfo[limitTypeKey[id]] = limitInfo && limitInfo[limitTypeKey[id]] ? limitInfo[limitTypeKey[id]] : 0;
			}
			//设置剩余次数
			let overplusTypeKey = iface.tb_prop.overplusTypeKey;
			let overplusInfo = $data.extend.overplusInfo;
			for (let id in overplusTypeKey) {
				this.overplusInfo[overplusTypeKey[id]] = overplusInfo && overplusInfo[overplusTypeKey[id]] ? overplusInfo[overplusTypeKey[id]] : 0;
			}
			this.lastGetAfkTime = $data.extend.lastGetAfkTime || 0;
			// 红点数据
			this.redPointInfo = $data.extend.redPointInfo || {};
			let mailModel = game.MailModel.getInstance();
			mailModel.loginMailRp = this.redPointInfo[iface.tb_prop.redPointTypeKey.mail] ? true : false;
			mailModel.loginPointRp = this.redPointInfo[iface.tb_prop.redPointTypeKey.point] ? true : false;
			game.FriendModel.getInstance().loginApplyRp = this.redPointInfo[iface.tb_prop.redPointTypeKey.friend] ? true : false;
			game.GuildModel.getInstance().hasNewApply = this.redPointInfo[iface.tb_prop.redPointTypeKey.guildApply] ? true : false;
			game.GuildCopyModel.getInstance().hasNewAward = this.redPointInfo[iface.tb_prop.redPointTypeKey.guildCopyAward] ? true : false;
			game.EscortModel.getInstance().hasNewRecord = this.redPointInfo[iface.tb_prop.redPointTypeKey.escort] ? true : false;
			game.IslandModel.getInstance().hasNewRecord = this.redPointInfo[iface.tb_prop.redPointTypeKey.mine] ? true : false;
			//
			this.arenaClgListTime = $data.extend.arenaClgListTime || 0;
			this.arenaFailTime = $data.extend.arenaFailTime || 0;
			this.lineupInfo = $data.extend.lineupInfo || {};
			this.godAlbum = $data.extend.godAlbum || [];
			this.godExp = $data.currency.godExp || 0;
			this.worldBossReplyTime = $data.extend.worldBossReplyTime || 0;
			this.mineRobReplyTime = $data.extend.mineRobReplyTime || 0;
			// 竞技场匹配赛
			let matchModel = game.MatchModel.getInstance();
			matchModel.lastRefreshTime = $data.extend.matchClgListTime || 0;
			matchModel.challengeCount = $data.extend.clgMatchNum || 0;
			matchModel.doneMatchChests = $data.extend.doneMatchChests || [];
			this.marketRefreshReplyTime = $data.extend.marketRefreshReplyTime || 0;
			this.escortTradeId = $data.extend.escortTradeId;
			this.tasks = $data.tasks || {};
			this.welfare = $data.welfare || {};

			//筛子相关
			game.DafuwengModel.getInstance().initData();
			/** 是否实名认证 */
			this.isCertification = $data.base.isCertification || 0;
			/** 防沉迷 */
			/** 是否防沉迷 */
			this.isIndulge = $data.base.isIndulge || 0;
			/** 防沉迷统计时间 */
			this.indulgeEndTime = $data.extend.indulgeEndTime || 0;
			/** 防沉迷在线时间 */
			this.indulgeOnlineTime = $data.extend.indulgeOnlineTime || 0;
			/** 防沉迷离线时间 */
			this.indulgeOutlineTime = $data.extend.indulgeOutlineTime || 0;
			// 荣耀币
			this.honour = $data.currency.honour || 0;
			this.godDomain = $data.currency.godDomain || 0;
			game.GloryModel.getInstance().updateServerPhase();
			/** 迷雾森林 */
			this.forestCurFloor = $data.extend.forestCurFloor || 0;
			this.forestMaxFloor = $data.extend.forestMaxFloor || 0;
			this.doneForestChests = $data.extend.doneForestChests || 0;
			/** 限时召唤 */
			this.summonScore = $data.welfare.summonScore || 0;
			this.doneSummonChests = $data.welfare.doneSummonChests || [];

			/**组队副本 */
			game.CopyTeamModel.getInstance().initGroupData($data.friend);
			this.initTasks();
			this.initEquipAry();
			// 初始化神灵数组
			this._godAry = [];
			for (var key in this.gods) {
				let vo: GodItemVo = this.createGodVo(this.gods[key], key);
				this._godAry.push(vo);
			}
			this.fightState();
			this.setLimitBoxMintime();
			// 逻辑主心跳
			Laya.stage.clearTimer(this, this.tickFun);
			Laya.stage.frameLoop(3, this, this.tickFun);
			this.putPatch();

			let servertime: number = App.serverTime;
			this._curDate.setTime(servertime);
			this._curDay = this._curDate.getDate();
		}

		/**
		 * 兼容旧号的上线补丁
		 */
		private putPatch() {
			let maxzj = game.GuajiModel.getInstance().getMaxChapter();
			if (this.copyUnlockId < maxzj) {
				var args = {};
				args[Protocol.game_copy_copyUnlock.args.id] = maxzj;
				PLC.request(Protocol.game_copy_copyUnlock, args, ($data: any) => {
					if (!$data) return;
					App.hero.copyUnlockId = $data.copyUnlockId;
				});
			}
		}

		get arenaNum(): number {
			return this.getOverplusValue(iface.tb_prop.overplusTypeKey.arenaNum);
		}

		public getHeadId(): any {
			return this.headId;
		}
		/** 更新自己头像 */
		public updateSelfHead(): void {
			// let sex = this.sex == 0 ? -2 : -1; 	// -2表示男
			// let head = this.headId > 0 ? this.headId : (this.head && this.head != "" ? this.head : sex);
			let head = this.headId > 0 ? this.headId : (this.head && this.head != "" ? this.head : common.GlobalData.DEFAULT_HEAD);
			this.setHeadId(head);
		}
		public setHeadId(id: any): void {
			this.headId = id;
			this.headIcon = SkinUtil.getHeroIcon(id);
		}

		//红点触发累计时间
		private _time: number = 0;
		//防沉迷监听累计时间
		private _IndulgeCountTime: number = 0;
		private _IndulgeLoginRemind: boolean = false;
		//计时器 $t:两帧之间的间隔时间，毫秒
		public tickFun() {
			let t = Laya.timer.delta;
			this.updateRedpoint(t);
			this.UpdateCrossDay(t);
			this.updateTimeItems();
			//开启防沉迷监听
			if (App.hero.isIndulge) {
				this.updateIndulge(t);
			}
		}

		/**
		 * 跨天请求
		 */
		private _curCrossTime: number = 0;
		private _curDate: Date = new Date();
		private _curDay: number = 0;
		private UpdateCrossDay(ms: number) {
			this._curCrossTime += ms;
			if (this._curCrossTime < 3000) {
				return;
			}
			this._curCrossTime = 0;

			let servertime: number = App.serverTime;
			this._curDate.setTime(servertime);
			let cday = this._curDate.getDate();
			let cs = this._curDate.getSeconds();
			if (this._curDay != cday && cs >= 3) {
				//跨天刷新(确保延迟3秒后刷)
				App.updateCrossDayInfo();
				this._curDay = cday;
			}
		}

		/**
		 * 更新限时物品
		 */
		private updateTimeItems() {
			if (this._mintimeBox == -1) {
				//没有限时物品需要被监听
				return;
			}
			if (this._mintimeBox <= App.getServerTime()) {
				// logyhj("有可以领取的宝箱啦");
				//可领取了
				this.setLimitBoxMintime();
				dispatchEvt(new game.ResEvent(game.ResEvent.TIME_PROP_CHANGE));
			}
		}

		offline() {
			// logyhj("离线清空");
			Laya.stage.clearTimer(this, this.tickFun);
			game.RedPointManager.removeAll();
			this.initData = null;
		}

		/**创角当天0：00时间戳(毫秒) */
		public getCreateDayTiem(): number {
			let date = new Date(this.createTime);
			date.setHours(0, 0, 0, 0);
			return date.getTime();
		}

		// private _tickid: number;
		/** 更新红点 */
		private updateRedpoint($t: number): void {
			//10秒一刷新
			this._time += $t;
			if (this._time < 3300) {
				return;
			}
			this._time = 0;
			//在线奖励红点刷新
			dispatchEvt(new game.OnlineEvent(game.OnlineEvent.RED_CHANGE_EVENT));
			// 战斗界面刷新屏蔽请求
			common.EffectList.updateEffectShow();
			if (UIMgr.hasStage(UIConst.GuajiView)) {
				let uiPanel: game.GuajiView = UIMgr.getUIByName(UIConst.GuajiView);
				uiPanel.updateShouchongTishi();
			}
			if (UIMgr.hasStage(UIConst.FightViews)) return;
			PLC.request(Protocol.game_common_redPoint, null, ($data) => {
				let info: number[] = $data && $data.redPointInfo ? $data.redPointInfo : [];
				let mailModel = game.MailModel.getInstance();
				let islandModel = game.IslandModel.getInstance();
				for (let key of info) {
					switch (key) {
						case iface.tb_prop.redPointTypeKey.newMail:
							mailModel.updateNewMail(true);
							break;
						case iface.tb_prop.redPointTypeKey.newPoint:
							mailModel.updateNewPoint(true);
							break;
						case iface.tb_prop.redPointTypeKey.newFriend:
							game.FriendModel.getInstance().updateFriendApply(true);
							break;
						case iface.tb_prop.redPointTypeKey.newArena:
							game.ArenaModel.getInstance().setNewRecordFlag(true);
							break;
						case iface.tb_prop.redPointTypeKey.newRecharge:// 充值到账，更新数据
							PLC.request(Protocol.game_recharge_updateRecharge, null, ($data) => {
								if (!$data) return;

								this.refreshWelfareData($data);
								if ($data.diamond) {
									this.diamond = $data.diamond;
								}
								let oldVip = this.vip;
								let oldScore = this.vipScore;
								if ($data.vipLevel) {
									this.vip = $data.vipLevel;
								}
								if ($data.vipScore) {
									this.vipScore = $data.vipScore;
								}
								if (this.vip > oldVip) {
									let clientData = {};
									clientData["oldVip"] = oldVip;
									clientData["newVip"] = this.vip;
									clientData["oldScore"] = oldScore;
									clientData["newScore"] = this.vipScore;
									game.ChongzhiModel.getInstance().chongzhiVipData = clientData;
								}
								dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
								dispatchEvt(new game.ResEvent(game.ResEvent.VIP_LEVEL_CHANGE));
								dispatchEvt(new game.OpenserverEvent(game.OpenserverEvent.VIEW_CHANGE));
								dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL), $data);
								dispatchEvt(new game.HuodongEvent(game.TopUpEvent.CHONGZHI_SUCCESS), $data);
							});
							break;
						case iface.tb_prop.redPointTypeKey.sevenDay:
							PLC.request(Protocol.game_activity_updateSevenDayCondCount, null, () => { });
							break;
						case iface.tb_prop.redPointTypeKey.rechargeSum:
						case iface.tb_prop.redPointTypeKey.consumeSum:
						case iface.tb_prop.redPointTypeKey.singleRecharge:
						case iface.tb_prop.redPointTypeKey.dailyRecharge:
						case iface.tb_prop.redPointTypeKey.giftPacks:
						case iface.tb_prop.redPointTypeKey.exchange:
						case iface.tb_prop.redPointTypeKey.loginSum:
						case iface.tb_prop.redPointTypeKey.dailyRechargeSum:
							game.TimelimitModel.getInstance().refreshActivityByTab(key);
							break;
						case iface.tb_prop.redPointTypeKey.guildApply:
							game.GuildModel.getInstance().updateNewApply(true);
							break;
						case iface.tb_prop.redPointTypeKey.guildCopyAward:
							game.GuildCopyModel.getInstance().updateNewAward(true);
							break;
						case iface.tb_prop.redPointTypeKey.escort:
							game.EscortModel.getInstance().updateNewRecord(true);
							break;
						case iface.tb_prop.redPointTypeKey.mine:
							// 被动的才有红点
							islandModel.updateNewRecord(true);
							game.IslandQueueMgr.getInstance().requestRobbed(true, true);
							break;
						case iface.tb_prop.redPointTypeKey.myMine:
							// 完成 被抢占
							islandModel.clearMyInfo();
							dispatchEvt(new game.IslandsEvent(game.IslandsEvent.UPDATE_ORE_LIST));
							islandModel.updateEndTime(true);
							game.IslandQueueMgr.getInstance().requestRobbed(true, true);
							break;
						case iface.tb_prop.redPointTypeKey.inviteList:
							// 有组队邀请信息
							game.GodDmThread.getInstance().showInviteJoinView();
							break;
						case iface.tb_prop.redPointTypeKey.refuseInvite:
							// 有拒绝邀请信息
							game.GodDmThread.getInstance().noticeRefuse();
							break;
						case iface.tb_prop.redPointTypeKey.newCommon:
							// 有新数据变化信息
							PLC.request(Protocol.game_common_updateCommonData, null, ($data: any) => {

							});
							break;
						case iface.tb_prop.redPointTypeKey.inviteCopyList:
							// 组队副本邀请
							game.CopyTeamThread.getInstance().showInviteJoinView();
							break;
						case iface.tb_prop.redPointTypeKey.refuseCopyInvite:
							// 组队副本拒绝邀请
							game.CopyTeamThread.getInstance().noticeRefuse();
							break;
						case iface.tb_prop.redPointTypeKey.groupCopyChange:
							// 组队副本队伍信息变化
							game.CopyTeamThread.getInstance().requestMyTeamInfo();
							break;
						case iface.tb_prop.redPointTypeKey.applyGroupCopy:
							// 申请加入组队副本
							game.CopyTeamThread.getInstance().getApplyList();
							break;
						case iface.tb_prop.redPointTypeKey.groupCopyKick:
							// 组队副本被踢出
							game.CopyTeamThread.getInstance().requestMyTeamInfo()
							showToast(LanMgr.getLan('', 10211));
							break;
						case iface.tb_prop.redPointTypeKey.groupCopyAppoint:
							// 组队副本任命队长
							game.CopyTeamThread.getInstance().requestMyTeamInfo()
							showToast(LanMgr.getLan('', 10212));
							break;
					}
				}
			}, false);
			dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_CHATNOTICE_TEXT));
		}

		/** 更新防沉迷 */
		private updateIndulge(time: number): void {
			//一分钟一刷新
			this._IndulgeCountTime += time;
			if (this._IndulgeCountTime < 20000 && this._IndulgeLoginRemind) {
				return;
			}
			this._IndulgeCountTime = 0;
			//监听一次
			// if (UIMgr.hasStage(UIConst.MainView)) {
			// 	this._IndulgeLoginRemind = true;
			// 	sendDispatchEvent(new moduleindulge.IndulgeEvent(moduleindulge.IndulgeEvent.OPEN_FANG_JIANTING));
			// }
		}

		/**玩家次数加上vip增加的次数 */
		baseAddVipNum(type: number): number {
			let vip = tb.TB_vip.get_TB_vipById(this.vip);
			switch (type) {
				case iface.tb_prop.vipPrivilegeTypeKey.wishNum:
					return vip ? vip.wish_limit + tb.TB_wish_set.get_TB_wish_set().max_num : tb.TB_wish_set.get_TB_wish_set().max_num;
				case iface.tb_prop.vipPrivilegeTypeKey.godMaxNum:
					return vip ? vip.god_limit + tb.TB_game_set.get_TB_game_setById(1).limit_god : tb.TB_game_set.get_TB_game_setById(1).limit_god;
				case iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum:
					return vip ? vip.arena_buy + tb.TB_arena_new_set.getArenaNewSet().buy_limit : tb.TB_arena_new_set.getArenaNewSet().buy_limit;
				case iface.tb_prop.vipPrivilegeTypeKey.hangupIncome:
					return vip ? vip.hang_up : 0;
				case iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime:
					let offlinetime = tb.TB_copy_set.getCopySet().offline_time;
					return App.hero.welfare.lifelongCard == 1 ? (tb.TB_month_card.getTbMonthCardById(2).offline_time + offlinetime) : offlinetime;
				case iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum:
					return vip ? vip.fast_fighting + tb.TB_copy_set.getCopySet().fast_fighting : tb.TB_copy_set.getCopySet().fast_fighting;
				case iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum:
					return vip ? vip.daily_copy + tb.TB_copy_set.getCopySet().daily_copy_buy : tb.TB_copy_set.getCopySet().daily_copy_buy;
				case iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum:
					return vip ? vip.guildcopy_buy + tb.TB_guild_set.getSet().copy_buy : tb.TB_guild_set.getSet().copy_buy;
				case iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum:
					return vip ? vip.gold_exchange + tb.TB_exchange_set.getSet().num : tb.TB_exchange_set.getSet().num + tb.TB_exchange_set.getSet().daily_free;
				case iface.tb_prop.vipPrivilegeTypeKey.worldBossNum:
					return vip ? vip.worldboss + tb.TB_boss_set.getSet().normal_buy : tb.TB_boss_set.getSet().normal_buy;
				case iface.tb_prop.vipPrivilegeTypeKey.runeCopyExtraNum:
					return vip ? vip.sweep_add : 0;
				case iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum:
					return vip ? vip.match_buy + tb.TB_match_set.getSet().buy_limit : tb.TB_match_set.getSet().buy_limit;
				case iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum:
					return vip ? vip.fight_goddomain + tb.TB_fight_goddomain_set.getSet().buy_num : tb.TB_fight_goddomain_set.getSet().buy_num;
			}
			return 0
		}

		/**免费的次数 */
		totalFreeCount(type: number): number {
			let count: number = 0;
			switch (type) {
				case iface.tb_prop.limitTypeKey.fastFrightFreeNum:
					count = tb.TB_copy_set.getCopySet().free_fastfight_num;
					if (App.hero.welfare.monthCardEndTime > App.getServerTime())
						count += tb.TB_month_card.getTbMonthCardById(1).free_fastfight_num;
					break;
			}
			return count;
		}

		/**
		 * 玩家等级/VIP可开启的功能
		 * 如果有参数 就return参数 否则就return 状态
		 */
		levelPrivilege(ifaceType: number): any {
			let vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(ifaceType);
			if (vipPrivilege && (vipPrivilege.vip_level <= this.vip || vipPrivilege.general_level <= this.level)) {
				return vipPrivilege.para != 0 ? vipPrivilege.para : true;
			}
			return false;
		}

		/**刷新福利数据 */
		private refreshWelfareData(data: any): void {
			for (let key in data) {
				if (this.welfare[key] != void 0) {
					this.welfare[key] = data[key];
				}
			}
		}

		/** 跨天刷新商店数据 */
		refreshShopData(): void {
			dispatchEvt(new game.ShopEvent(game.ShopEvent.REFRESH_SHOP_CROSSDAY));
		}

		/** 更新跨天数据 */
		updateCrossDayInfo($data: any): void {
			//失落遗迹
			this.updateCopyInfo($data);
			game.YuanzhengModel.getInstance().resetDataByCrossDay();
			//迷雾森林更新
			if ($data.hasOwnProperty('forestCurFloor')) {
				this.forestCurFloor = $data.forestCurFloor;
				dispatchEvt(new game.FogForestEvent(game.FogForestEvent.UPDATE_VIEW));
			}
			//更新商店
			this.refreshShopData();
			this.refreshWelfareData($data);
			// overplusInfo
			if ($data.overplusInfo) {
				this.overplusInfo = $data.overplusInfo;
				dispatchEvt(new game.ResEvent(game.ResEvent.LIMIT_VALUE_CHANGE));
			}
			// limitInfo
			if ($data.limitInfo) {
				this.limitInfo = $data.limitInfo;
				dispatchEvt(new game.ResEvent(game.ResEvent.LIMIT_VALUE_CHANGE));
			}
			// doneChests 
			this.refreshData($data, Protocol.game_common_getCrossDayInfo.name);
			// 重置任务系统数据  dailyTasks liveness
			game.TaskModel.getInstance().resetDataByCrossDay($data);
			//重置限时活动
			game.TimelimitModel.getInstance().refreshActivity();
			game.HuodongModel.getInstance().refreshActivity();
			let date = new Date();
			date.setTime(App.serverTime);
			// 每周一更新
			if (date.getDay() == WeekNum.Mon) {
				game.GloryModel.getInstance().weekRest();
				if (UIMgr.hasStage(UIConst.GloryFightView) || UIMgr.hasStage(UIConst.GloryLastReview)) {
					dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW));
				}
			}
			game.GuildHelpModel.getInstance().clearCrossDayData();
			//跨天重新刷新福利红点状态
			dispatchEvt(new game.HuodongEvent(game.HuodongEvent.AWARD_EVENT));
			dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_CROSS_DAY_INFO));
		}

		//===============================英雄、装备、饰品==========================	

		private _equipAry: Array<EquipItemVo>;
		/** 初始化：不能乱用 */
		private initEquipAry() {
			this._equipAry = [];
			for (var key in this.bagEquipsObj) {
				let vo: EquipItemVo = new EquipItemVo(this.bagEquipsObj[key]);
				vo.uuid = key;
				this._equipAry.push(vo);
			}
		}

		public getEquipByuuid(uuid: any): EquipItemVo {
			return this._equipAry.find(vo => vo.uuid == uuid);
		}

		/**改变装备数组中某个装备 */
		public setEquipAryByUuid(uuid: string, godId: string) {
			for (let i in this._equipAry) {
				if (this._equipAry[i].uuid == uuid) {
					this._equipAry[i].godId = this.bagEquipsObj[uuid].godId;
					game.BagModel.getInstance().updateEquObj(uuid, game.EQUTYPE.MODIFY, this._equipAry[i]);
					dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM), { type: game.EQUTYPE.MODIFY, vo: this._equipAry[i] });
					break;
				}
			}
		}

		public createItemVo(count, $key): ItemVo {
			let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById($key);
			let id = Number($key);
			let type = itemtab.type;
			let vo: ItemVo = new ItemVo(id, count, type);
			return vo;
		}

		public getGodsNum(): number {
			return this._godAry.length;
		}

		public getEqusNum(): number {
			return this._equipAry.length;
		}

		/**更改英雄数组某个英雄的装备信息 */
		public setGodAryByUuid(uuid: string, type: number): void {
			for (let i in this._godAry) {
				if (this._godAry[i].uuid == uuid) {
					let godVo: GodItemVo = this.createGodVo(this.gods[uuid], uuid)
					let sta = this._godAry[i].getShenli();
					let end = godVo.getShenli();
					if (type == 0) {
						this._godAry[i].equipKeys = godVo.equipKeys;
						this._godAry[i].fightPower = end;
					} else {
					}
					break;
				}
			}
		}

		getGodArr(): Array<GodItemVo> {
			return this._godAry;
		}

		/**
		 * 排序后英雄列表
		 * @param type 
		 */
		private sortGodList($lineUpType: number, $type: number): Array<GodItemVo> {
			let ary: Array<GodItemVo> = new Array
			if ($type == -1) {
				ary = [...this._godAry];
			} else {
				ary = new Array;
				for (var i = 0; i < this._godAry.length; i++) {
					var element = this._godAry[i];
					if (element.tab_god.type != $type) {
						ary.push(element);
					}
				}
			}
			// //防守阵容读取主阵容
			// if ($lineUpType == iface.tb_prop.lineupTypeKey.arenaDefend) {
			// 	$lineUpType = iface.tb_prop.lineupTypeKey.attack;
			// }
			ary.sort(
				function (a: GodItemVo, b: GodItemVo): number {
					if ($lineUpType == iface.tb_prop.lineupTypeKey.attack) {
						if (a.local[0] != b.local[0]) {
							return a.local[0] - b.local[0];
						}
					} else if ($lineUpType == iface.tb_prop.lineupTypeKey.expedition) {
						if (a.local[2] != b.local[2]) {
							return a.local[2] - b.local[2];
						}
					}
					if (a.inLine() == b.inLine()) {
						if (a.isInLinuep()) {
							return b.fightPower - a.fightPower;
						} else {
							if (a.level == b.level) {
								if (a.starLevel == b.starLevel) {
									if (a.tab_god.race_type == b.tab_god.race_type) {
										return b.templateId - a.templateId;
									} else {
										return a.tab_god.race_type - b.tab_god.race_type;
									}
								} else {
									return b.starLevel - a.starLevel;
								}
							} else {
								return b.level - a.level;
							}
						}

					} else {
						return a.inLine() - b.inLine();
					}
				}
			);

			return ary;
		}

		public createGodVo(sdata, godUuid): GodItemVo {
			let vo = this.getGodVoById(godUuid);
			if (vo) {
				for (let key in sdata) {
					vo[key] = sdata[key];
				}
			} else {
				vo = GodItemVo.getData(sdata, godUuid);
			}
			vo.equipKeys = [];
			if (sdata.equipKeys) {
				for (var key in sdata.equipKeys) {
					if (sdata.equipKeys[key]) {
						let equipvo: EquipItemVo = App.hero.getEquipByuuid(sdata.equipKeys[key]);
						if (!equipvo) {
							logerror("不存在该装备：", key);
							continue;
						}
						vo.equipKeys.push(equipvo);
					}
				}
			}
			vo.treasureKeys = [];
			if (sdata.treasureKeys) {
				for (var key in sdata.treasureKeys) {
					if (sdata.treasureKeys[key]) {
						let treasureVo: TreasureItemVo = game.TreasureModel.getInstance().getTreasureByUuid(sdata.treasureKeys[key]);
						if (!treasureVo) {
							logerror("没有该圣物:", sdata.treasureKeys[key]);
						}
						vo.treasureKeys.push(treasureVo);
					}
				}
			}
			vo.setgemInfo(sdata.gemInfo);
			vo.fightPower = vo.getShenli();
			return vo;
		}

		public getGodVoById($godid: string): GodItemVo {
			for (var i = 0; i < this._godAry.length; i++) {
				if (this._godAry[i].uuid == $godid) {
					return this._godAry[i];
				}
			}
			return null;
		}

		/**
		 * 某个槽位的所有未穿戴的装备 有排序的 
		 * @param slot 槽位(传0获得全部)
		 */
		public getEquips(slot: number = 0, sort: boolean = false): Array<EquipItemVo> {
			let ary = this._equipAry.filter(vo => slot == 0 || vo.slot == slot);
			if (sort) {
				ary.sort((a: EquipItemVo, b: EquipItemVo) => {
					return b.getSortNum() - a.getSortNum();
				});
			}
			return ary;
		}

		/** 筛选出装备/未装备类型并排序*/
		public getEquipBagByType($pos: number = 0): Array<EquipItemVo> {
			let ary = this.getEquips($pos, true);
			let isGodidEquip: Array<EquipItemVo> = [];
			for (let i = 0; i < ary.length;) {
				if (ary[i].godId) {
					isGodidEquip.push(ary[i]);
					ary.splice(Number(i), 1);
				} else {
					i++;
				}
			}
			return isGodidEquip.concat(ary);
		}

		public refreshData(reqdata: any, routeName: string = "") {
			// 在设置通用数据前可能需要设置一些必要数据，否则会影响到通用数据的更新
			if (!reqdata) return;
			// 任务完成id-增量
			if (reqdata.hasOwnProperty('doneTask')) {
				this.addDoneTask(reqdata.doneTask);
			}
			// 日常任务完成id-增量
			if (reqdata.hasOwnProperty('doneDaily')) {
				this.addDoneDailyTask(reqdata.doneDaily);
			}
			// 日常任务活跃度宝箱完成id-全量
			if (reqdata.hasOwnProperty('doneChests')) {
				this.tasks.doneChests = reqdata['doneChests'];
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_LIVENESS_DATA));
			}
			// 勇者之证 -- 领取任务奖励下发
			let hasWarriorLevel = reqdata.hasOwnProperty("warriorLevel");
			let hasWarriorExp = reqdata.hasOwnProperty("warriorExp");
			if (hasWarriorLevel || hasWarriorExp) {
				if (hasWarriorLevel) {
					this.tasks.warriorLevel = reqdata['warriorLevel'];
				}
				if (hasWarriorExp) {
					this.tasks.warriorExp = reqdata['warriorExp'];
				}
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_WARRIOR_EXP));
			}

			if (reqdata.runeCopyInfo) {
				this.runeCopyInfo = reqdata.runeCopyInfo;
				dispatchEvt(new game.GuajiEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO));
			}
			if (reqdata.copyChallengeInfo) {
				for (var key in reqdata.copyChallengeInfo) {
					this.copyChallengeInfo[key] = reqdata.copyChallengeInfo[key];
				}
			}

			if (reqdata.addGodFateId) {
				let newid = Number(reqdata.addGodFateId);
				let idx = this.godFateIds.indexOf(newid);
				if (idx == -1) {
					this.godFateIds.push(newid);
				}
			}
			// 时装
			if (reqdata.addSkinId) {
				let newid = Number(reqdata.addSkinId);
				let idx = this.skinIds.indexOf(newid);
				if (idx == -1) {
					this.skinIds.push(newid);
				}
				dispatchEvt(new game.GodEvent(game.GodEvent.ADD_SKINID), newid);
			}
			// 觉醒
			if (reqdata.addGodAwakens) {
				let newid = Number(reqdata.addGodAwakens);
				let idx = this.godAwakens.indexOf(newid);
				if (idx == -1) {
					this.godAwakens.push(newid);
				}
			}

			// 试炼塔关卡数据
			if (reqdata.towerCopyInfo) {
				this.towerCopyInfo = reqdata.towerCopyInfo;
				game.TowerModel.getInstance().updateData();
				dispatchEvt(new game.TowerEvent(game.TowerEvent.PROGRESS_CHANGE));
			}
			if (reqdata.towerAwardInfo) {
				this.towerAwardInfo = reqdata.towerAwardInfo;
				game.TowerModel.getInstance().updateData();
				dispatchEvt(new game.TowerEvent(game.TowerEvent.GET_BOSS_AWARD_SUC));
			}
			// 迷雾森林关卡数据
			if (reqdata.forestMaxFloor) {
				this.forestMaxFloor = reqdata.forestMaxFloor;
				dispatchEvt(new game.FogForestEvent(game.FogForestEvent.CHALLENGE_SUCCESS));
			}
			//迷雾森林宝箱数据
			if (reqdata.doneForestChests) {
				this.doneForestChests = reqdata.doneForestChests;
				dispatchEvt(new game.FogForestEvent(game.FogForestEvent.CHALLENGE_SUCCESS));
			}

			//限时召唤积分
			if (reqdata.summonScore) {
				this.summonScore = reqdata.summonScore;
			}
			if (reqdata.arenaFailTime != void 0) {
				//竞技场冷却时间		
				this.arenaFailTime = reqdata.arenaFailTime;
			}
			//限时召唤宝箱数组
			if (reqdata.doneSummonChests) {
				this.doneSummonChests = reqdata.doneSummonChests;
			}
			// 福利
			if (reqdata.monthCardAward) {
				this.welfare.monthCardAward = reqdata.monthCardAward;
			}
			if (reqdata.openSvrGiftAwardNums) {
				this.welfare.openSvrGiftAwardNums = reqdata.openSvrGiftAwardNums;
				dispatchEvt(new game.OpenserverEvent(game.OpenserverEvent.OS_GIFT_CHANGE));
			}
			if (reqdata.sevendayAwardCount) {
				let key = getobjectFirstAttribute(reqdata.sevendayAwardCount);
				if (!this.welfare.sevendayInfo) {
					this.welfare.sevendayInfo = {};
				}
				if (!this.welfare.sevendayInfo[key]) {
					this.welfare.sevendayInfo[key] = {};
				}
				this.welfare.sevendayInfo[key].rewardCount = reqdata.sevendayAwardCount[key];
			}
			if (reqdata.sevendayExtraAward) {
				let key = getobjectFirstAttribute(reqdata.sevendayExtraAward);
				this.welfare.sevendayExtraAward[key] = reqdata.sevendayExtraAward[key];
			}
			if (reqdata.luckEquipAward) {
				let key = getobjectFirstAttribute(reqdata.luckEquipAward);
				this.welfare.luckEquipAward[key] = reqdata.luckEquipAward[key];
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LUCK_EQUIP_REWARD_CHANGE));
			}
			if (reqdata.lifelongCardAward) {
				this.welfare.lifelongCardAward = reqdata.lifelongCardAward;
			}
			if (reqdata.signInLoginCount) {
				this.welfare.signInLoginCount = reqdata.signInLoginCount;
			}
			if (reqdata.signInVipCount) {
				this.welfare.signInVipCount = reqdata.signInVipCount;
			}
			if (reqdata.signInRechargeCount) {
				this.welfare.signInRechargeCount = reqdata.signInRechargeCount;
			}
			if (reqdata.todaySignIn) {
				this.welfare.todaySignIn = reqdata.todaySignIn;
			}
			if (reqdata.luckGodNum != null) {
				this.welfare.luckGodNum = reqdata.luckGodNum;
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LUCK_GOD_VALUE_CHANGE));
			}
			if (reqdata.autonymAwardNum) {
				this.welfare.autonymAwardNum = reqdata.autonymAwardNum;
			}
			if (reqdata.luckEquipNum != null) {
				this.welfare.luckEquipNum = reqdata.luckEquipNum;
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LUCK_EQUIP_VALUE_CHANGE));
			}
			if (reqdata.luckTreasureNum != null) {
				this.welfare.luckTreasureNum = reqdata.luckTreasureNum;
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LUCK_TREASURE_VALUE_CHANGE));
			}
			if (reqdata.dailySignIn) {
				let keys = getobjectFirstAttribute(reqdata.dailySignIn);
				this.welfare.dailySignIn[keys] = reqdata.dailySignIn[keys];
			}
			if (reqdata.levelFundAward) {
				let keys = getobjectFirstAttribute(reqdata.levelFundAward);
				this.welfare.levelFundAward[keys] = reqdata.levelFundAward[keys];
			}
			if (reqdata.loginGiftPack) {
				let keys = getobjectFirstAttribute(reqdata.loginGiftPack);
				this.welfare.loginGiftPack[keys] = reqdata.loginGiftPack[keys];
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LOGIN_GIFT_RECEIVE));
			}
			if (reqdata.firstRecharge) {
				let key = getobjectFirstAttribute(reqdata.firstRecharge);
				this.welfare.firstRecharge[key] = reqdata.firstRecharge[key];
			}
			if (reqdata.totalSignIn) {
				let key = getobjectFirstAttribute(reqdata.totalSignIn);
				this.welfare.totalSignIn[key] = reqdata.totalSignIn[key];
			}
			if (reqdata.levelGiftPack) {
				let key = getobjectFirstAttribute(reqdata.levelGiftPack);
				this.welfare.levelGiftPack[key] = reqdata.levelGiftPack[key];
			}
			if (reqdata.levelGiftPack) {
				let key = getobjectFirstAttribute(reqdata.levelGiftPack);
				this.welfare.levelGiftPack[key] = reqdata.levelGiftPack[key];
			}
			if (reqdata.modifyWorshipInfo) {
				let key = getobjectFirstAttribute(reqdata.modifyWorshipInfo);
				this.worshipInfo[key] = reqdata.modifyWorshipInfo[key];

				dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RANK_MOBAI_CHANGE));
			}
			//通关奖励领取
			if (reqdata.addMapBoxAwardIds) {
				this.mapBoxAwardIds.push(reqdata.addMapBoxAwardIds);
				dispatchEvt(new game.GuajiEvent(game.GuajiEvent.FUBEN_REWARD_CHANGE));
			}
			// 限购礼包
			if (reqdata.dayRechargeLimit) {
				for (let id in reqdata.dayRechargeLimit) {
					if (!this.welfare.dayRechargeLimit) this.welfare.dayRechargeLimit = {};
					this.welfare.dayRechargeLimit[id] = reqdata.dayRechargeLimit[id];
				}
				dispatchEvt(new game.TopUpEvent(game.TopUpEvent.XIANGOU_LIBAO_CHANGE));
			}
			if (reqdata.weekRechargeLimit) {
				for (let id in reqdata.weekRechargeLimit) {
					if (!this.welfare.weekRechargeLimit) this.welfare.weekRechargeLimit = {};
					this.welfare.weekRechargeLimit[id] = reqdata.weekRechargeLimit[id];
				}
				dispatchEvt(new game.TopUpEvent(game.TopUpEvent.XIANGOU_LIBAO_CHANGE));
			}
			if (reqdata.monthRechargeLimit) {
				for (let id in reqdata.monthRechargeLimit) {
					if (!this.welfare.monthRechargeLimit) this.welfare.monthRechargeLimit = {};
					this.welfare.monthRechargeLimit[id] = reqdata.monthRechargeLimit[id];
				}
				dispatchEvt(new game.TopUpEvent(game.TopUpEvent.XIANGOU_LIBAO_CHANGE));
			}
			if (reqdata.openSvrRechargeSum) {
				this.welfare.openSvrRechargeSum = reqdata.openSvrRechargeSum;
				//刷新
				dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.GROUP_RED_EVENT));
			}
			if (reqdata.weekFundAwardId) {
				this.welfare.weekFundAward.push(reqdata.weekFundAwardId);
				dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.FUND_RED_EVENT));
			}
			if (reqdata.weekFund) {
				this.welfare.weekFund = reqdata.weekFund ? reqdata.weekFund === 0 ? [] : reqdata.weekFund : [];
				dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.FUND_EVENT));
				dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.FUND_RED_EVENT));
			}
			//登入天数
			if (reqdata.totalLoginDay != null) {
				this.welfare.totalLoginDay = reqdata.totalLoginDay;
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.TOTAL_LOGIN_DAY));
			}

			if (reqdata.monthCardAward || reqdata.lifelongCardAward || reqdata.todaySignIn || reqdata.dailySignIn
				|| reqdata.monthCardGiftNum || reqdata.monthCardGiftNum == 0 || reqdata.lifeLongCardGiftNum || reqdata.lifeLongCardGiftNum == 0
				|| reqdata.loginGiftPack || reqdata.firstRecharge || reqdata.totalSignIn || reqdata.firstRechargeTime
				|| reqdata.levelGiftPack || reqdata.luckEquipAward || reqdata.autonymAwardNum || reqdata.signInLoginCount || reqdata.levelFundAward) {
				dispatchEvt(new game.HuodongEvent(game.HuodongEvent.AWARD_EVENT));
			}
			//英雄变化
			if (reqdata.targetGod) {
				let flag: number = 0; //1觉醒 2升级
				for (var key in reqdata.targetGod) {
					if (reqdata.targetGod.hasOwnProperty(key)) {
						let newdata = this.createGodVo(reqdata.targetGod[key], key);
						for (var i = 0; i < this._godAry.length; i++) {
							var element = this._godAry[i];
							if (element.uuid == newdata.uuid) {
								// logyhj("英雄变化：", newdata.uuid, newdata.level);
								newdata.isAttackFight = element.isAttackFight;
								newdata.isDefendFight = element.isDefendFight;
								newdata.isYuanzhengFight = element.isYuanzhengFight;
								newdata.local = element.local;
								newdata.fightPower = newdata.getShenli();
								newdata.awakenLv = Math.max(newdata.awakenLv, element.awakenLv);
								newdata.level = Math.max(newdata.level, element.level);
							}
						}

						let oldvo = this.gods[key];
						let newvo = reqdata.targetGod[key];
						this.gods[key] = this.checkVo(oldvo, newvo);
						dispatchEvt(new game.GodEvent(game.GodEvent.GOD_PORP_CHANGE), newdata);
					}
				}
			}

			//装备变化
			if (reqdata.targetEquips) {
				let godUuid;
				for (var key in reqdata.targetEquips) {
					this.bagEquipsObj[key] = reqdata.targetEquips[key];
					if (reqdata.targetEquips.hasOwnProperty(key)) {
						let equipObj = reqdata.targetEquips[key];
						let equipVo = this.getEquipByuuid(key);
						if (equipVo) {
							equipVo.updateData(equipObj);
							game.BagModel.getInstance().updateEquObj(equipVo.uuid, game.EQUTYPE.MODIFY, equipVo);
							dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM), { type: game.EQUTYPE.MODIFY, vo: equipVo });
							if (equipVo.godId) godUuid = equipVo.godId;
						}
					}
				}
				if (godUuid) {
					this.setGodAryByUuid(godUuid, 0);
					dispatchEvt(new game.EquipEvent(game.EquipEvent.CHANGE_EQUIP_ITEM), true);
				}
			}

			//神器属性变化
			if (reqdata.artifactStrengthLv != null) {
				this.artifactStrengthLv = reqdata.artifactStrengthLv;
				dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_STRENGTH_LV_CHANGE), [this.artifactStrengthLv]);
			}
			if (reqdata.artifactSkillLv != null) {
				this.artifactSkillLv = reqdata.artifactSkillLv;
				dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_SKILL_LV_CHANGE), [this.artifactSkillLv]);
			}
			if (reqdata.artifactBaptizeLv != null ||
				reqdata.artifactBaptizeExp != null ||
				reqdata.artifactBaptizeAttrs != null ||
				reqdata.tmpBaptizeAttrs != null) {

				if (reqdata.artifactBaptizeLv != null) {
					this.artifactBaptizeLv = reqdata.artifactBaptizeLv;
				}
				if (reqdata.artifactBaptizeExp != null) {
					this.artifactBaptizeExp = reqdata.artifactBaptizeExp;
				}
				if (reqdata.artifactBaptizeAttrs != null) {
					this.artifactBaptizeAttrs = reqdata.artifactBaptizeAttrs;
					this.artifactBaptizeTempAttr = {};
				}
				let type = Artifact.CHANGE;
				if (reqdata.tmpBaptizeAttrs != null) {
					type = Artifact.GBAPTIZE;
					this.artifactBaptizeTempAttr = reqdata.tmpBaptizeAttrs;
				}

				dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE), type);
			}
			if (reqdata.artifactStarLv != null ||
				reqdata.artifactStarExp != null) {
				if (reqdata.artifactStarLv != null) {
					this.artifactStarLv = reqdata.artifactStarLv;
				}
				if (reqdata.artifactStarExp != null) {
					this.artifactStarExp = reqdata.artifactStarExp;
				}
				dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_STAR_CHANGE));
			}
			if (reqdata.artifactInfo != null) {
				let idArr: number[] = []
				for (let key in reqdata.artifactInfo) {
					this.artifactInfo[key] = reqdata.artifactInfo[key];
					idArr.push(Number(key));
				}

				dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_ACTIVE), idArr);
			}

			if (reqdata.guildCopyMaxDmg != null) {
				let idArr: number[] = []
				for (let key in reqdata.guildCopyMaxDmg) {
					this.guildCopyMaxDmg[key] = reqdata.guildCopyMaxDmg[key];
				}
			}

			//进阶之路
			if (reqdata.advanceLevel != null) {
				let oldLv: number = this.tasks.advanceLevel;
				this.tasks.advanceLevel = reqdata.advanceLevel;
				dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.UR_LEVEL_CHANGE), [this.tasks.advanceLevel, oldLv]);
			}
			if (reqdata.modifyAdvanceReward != null) {
				let idArr: number[] = []
				for (let key in reqdata.modifyAdvanceReward) {
					this.tasks.advanceInfos[key].reward = reqdata.modifyAdvanceReward[key];
					idArr.push(Number(key));
				}
				dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.UR_REWARD_CHANGE), idArr);
			}

			this.updateDailyCopy(reqdata);


			// 设置通用数据
			let $newdata: Object = reqdata.commonData;
			if ($newdata)
				this.refreshCommonData($newdata);
			// 设置首通数据
			let $firstdata = reqdata.firstData;
			if ($firstdata)
				this.refreshCommonData($firstdata);

			//宝物变化，需要在处理之后执行
			if (reqdata.targetTreasure) {
				game.TreasureModel.getInstance().updateTargetTreasures(reqdata.targetTreasure);
			}
		}

		private checkKey = ["awakenLv", "level"];
		private checkVo(oldvo, newvo): any {
			let tempvo: any = {};
			for (var key in newvo) {
				if (oldvo.hasOwnProperty(key) && this.checkKey.indexOf(key) != -1) {
					tempvo[key] = Math.max(newvo[key], oldvo[key]);
					continue;
				}
				tempvo[key] = newvo[key];
			}
			return tempvo;
		}

		private accChangeGodId;
		private _accWear;
		private refreshCommonData(newdata) {
			//终身首次记录
			if (newdata.addFirstIds) {
				this.firstIds = this.firstIds.concat(newdata.addFirstIds);
			}
			//装备分解
			if (newdata.delEquips) {
				let ids: string[] = newdata.delEquips;
				for (var key in newdata.delEquips) {
					let val = newdata.delEquips[key];
					delete this.bagEquipsObj[val];
					game.BagModel.getInstance().updateEquObj(val, game.EQUTYPE.DEL);
				}
				for (let i = this._equipAry.length - 1; i >= 0; i--) {
					if (ids.indexOf(this._equipAry[i].uuid) != -1) {
						this._equipAry.splice(i, 1);
					}
				}
				//批量分解要一次解决
				dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM), { type: game.EQUTYPE.DEL, vo: null });
				dispatchEvt(new game.ResEvent(game.ResEvent.EQUIPMENET_CHANGE));
			}
			if (newdata.addEquips) {
				//新增装备
				for (var key in newdata.addEquips) {
					if (newdata.addEquips.hasOwnProperty(key)) {
						this.bagEquipsObj[key] = newdata.addEquips[key];
						let vo: EquipItemVo = new EquipItemVo(newdata.addEquips[key]);
						vo.uuid = key;
						this._equipAry.push(vo);
						game.BagModel.getInstance().updateEquObj(vo.uuid, game.EQUTYPE.ADD, vo);
					}
				}
				dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM), { type: game.EQUTYPE.ADD, vo: null });
				dispatchEvt(new game.ResEvent(game.ResEvent.EQUIPMENET_CHANGE));
			}
			/**英雄/装备/变化 */
			if (newdata.modifyEquips || newdata.modifyGodEquips) {
				if (newdata.modifyEquips) {
					for (let i in newdata.modifyEquips) {
						if (!this.bagEquipsObj[i]) continue;
						this.bagEquipsObj[i].godId = newdata.modifyEquips[i];
						this.setEquipAryByUuid(i, newdata.modifyEquips[i]);
					}
				}
				if (newdata.modifyGodEquips) {
					for (let i in newdata.modifyGodEquips) {
						if (!this.gods[i]) continue;
						this.gods[i].equipKeys = newdata.modifyGodEquips[i];
						this.setGodAryByUuid(i, 0);
					}
				}
				dispatchEvt(new game.EquipEvent(game.EquipEvent.CHANGE_EQUIP_ITEM), true);
				dispatchEvt(new game.ResEvent(game.ResEvent.EQUIPMENET_CHANGE));
			}

			// 新增圣物图鉴
			if (newdata.addTreasureBook) {
				for (let newid of newdata.addTreasureBook) {
					let idx = this.godFateIds.indexOf(newid);
					if (idx == -1) {
						this.treasureBooks.push(newid);
					}
				}
			}
			// 新增圣物
			let treasureModel = game.TreasureModel.getInstance();
			if (newdata.addTreasures) {
				treasureModel.addTreasure(newdata.addTreasures);
			}
			if (newdata.delTreasures) {
				treasureModel.delTreasure(newdata.delTreasures);
			}
			if (newdata.modifyTreasureNum) {
				treasureModel.modifyNum(newdata.modifyTreasureNum);
			}
			if (newdata.modifyTreasures) {
				treasureModel.modifyTreasures(newdata.modifyTreasures);
			}
			if (newdata.modifyGodTreasures) {
				treasureModel.modifyGodTreasures(newdata.modifyGodTreasures);
			}

			// ----- 宝石操作数据响应 ----
			let gemsModel = game.GemstoneModel.getInstance();
			if (newdata.addGemstones) {
				gemsModel.addGemstones(newdata.addGemstones);
			}
			if (newdata.delGemstones) {
				gemsModel.delGemstone(newdata.delGemstones);
			}
			if (newdata.modifyGemstoneNum) {
				gemsModel.modifyNum(newdata, newdata.modifyGemstoneNum);
			}
			if (newdata.modifyGemstones) {
				gemsModel.modifyGemstones(newdata, newdata.modifyGemstones);
			}
			if (newdata.modifyGodGemstones) {
				gemsModel.modifyGodGemstones(newdata.modifyGodGemstones);
			}

			if (newdata.modifySevenDays) {
				if (!this.welfare.sevendayInfo) {
					this.welfare.sevendayInfo = {};
				}
				let obj = newdata.modifySevenDays;
				for (let key in obj) {
					if (!this.welfare.sevendayInfo[key]) {
						this.welfare.sevendayInfo[key] = {}
					}
					this.welfare.sevendayInfo[key].condCount = obj[key];
				}
				dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT));
			}
			if (newdata.modifyForce) {
				this.force = newdata.modifyForce;
				dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_POWER));
			}
			if (newdata.modifyCondInfo) {
				game.TimelimitModel.getInstance().updateData(newdata.modifyCondInfo);
			}
			if (newdata.modifyLineups) {
				let obj = newdata.modifyLineups;
				this.refreshLineUp(obj);
			}
			if (newdata.vipLevel) {
				this.vip = newdata.vipLevel;
				dispatchEvt(new game.ResEvent(game.ResEvent.VIP_LEVEL_CHANGE));
			}
			if (newdata.addResource) {
				//新增资源
				this.refreshres(newdata.addResource, true);
				dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
			}
			if (newdata.costResource) {
				//消耗资源
				this.refreshres(newdata.costResource, false);
				dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
			}
			if (newdata.lastProgressTime) {
				//下一关时间戳变化
				this.lastProgressTime = newdata.lastProgressTime;
				dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CHANGE_GUAJI_BTN));
			}
			if (newdata.addBagItems) {
				//新增道具
				this.refreshbag(newdata.addBagItems, true);
				dispatchEvt(new game.ResEvent(game.ResEvent.PROP_CHANGE));
			}
			if (newdata.delBagItems) {
				//消耗道具
				this.refreshbag(newdata.delBagItems, false);
				dispatchEvt(new game.ResEvent(game.ResEvent.PROP_CHANGE));
			}
			if (newdata.addGodAlbum) {
				//新增图鉴
				this.godAlbum = this.godAlbum.concat(newdata.addGodAlbum);
				dispatchEvt(new game.TujianEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC));
			}
			if (newdata.addRechargeNum) {
				//新增充值数
				this.welfare.rechargeSum += newdata.addRechargeNum;
			}
			if (newdata.modifyMaxHistoryForce) {
				//历史最高战斗力
				this.maxHistoryForce = newdata.modifyMaxHistoryForce;
			}
			// 任务更新 -- 增量
			if (newdata.modifyTasks) {
				this.refreshTasks(newdata.modifyTasks);
			}
			// 每日任务更新
			if (newdata.modifyDailys) {
				this.refreshDailyTask(newdata.modifyDailys);
			}
			// 限制数量更新
			if (newdata.modifyLimits) {
				for (let id in newdata.modifyLimits) {
					this.limitInfo[id] = newdata.modifyLimits[id];
				}
				dispatchEvt(new game.ResEvent(game.ResEvent.LIMIT_VALUE_CHANGE));
			}
			// 限制数量更新
			if (newdata.modifyOverplus) {
				for (let id in newdata.modifyOverplus) {
					this.overplusInfo[id] = newdata.modifyOverplus[id];
				}
				dispatchEvt(new game.ResEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE));
			}
			// 世界boss
			if (newdata.modifyReplyTime) {
				this.worldBossReplyTime = newdata.modifyReplyTime;
				game.BossModel.getInstance().refreshInterval();
			}
			// 神秘岛屿
			if (newdata.modifyMineRobReplyTime) {
				this.mineRobReplyTime = newdata.modifyMineRobReplyTime;
				game.IslandUtil.resetInterval();
			}

			//进阶之路
			if (newdata.modifyAdvanceCount != null) {
				let idArr: number[] = []
				for (let key in newdata.modifyAdvanceCount) {
					this.tasks.advanceInfos[key].count = newdata.modifyAdvanceCount[key];
					idArr.push(Number(key));
				}
				dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.UR_COUNT_CHANGE), idArr);
			}

			if (newdata.modifyMaxStarLvInfo != null) {
				for (let key in newdata.modifyMaxStarLvInfo) {
					this.maxStarLvInfo[key] = newdata.modifyMaxStarLvInfo[key];
				}
				dispatchEvt(new game.GodEvent(game.GodEvent.GOD_MAX_STAR_LV_CHANGE));
			}

			//集市刷新时间
			if (newdata.modifyMarketRefreshTime != null) {
				this.marketRefreshReplyTime = newdata.modifyMarketRefreshTime;
				dispatchEvt(new game.ShopEvent(game.ShopEvent.MARKET_REFRESH_REPLY_TIME_CHNAGE));
			}
			// 勇者之证 -- 更新数量
			let hasWarriorWeek = newdata.hasOwnProperty("modifyWarriorWeekCount");
			let hasWarriorMonth = newdata.hasOwnProperty("modifyWarriorMonthCount");
			if (hasWarriorWeek || hasWarriorMonth) {
				if (hasWarriorWeek) {
					game.TrialTaskModel.getInstance().modifyFinishNum(newdata["modifyWarriorWeekCount"], true);
				}
				if (hasWarriorMonth) {
					game.TrialTaskModel.getInstance().modifyFinishNum(newdata["modifyWarriorMonthCount"], false);
				}
			}
			// 勇者之证 -- 充值下发,解锁进阶需要充值
			if (newdata.hasOwnProperty("warriorAdvance")) {
				this.tasks.warriorAdvance = newdata['warriorAdvance'];
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC));
			}
			if (newdata.hasOwnProperty("warriorLevel")) {
				this.tasks.warriorLevel = newdata['warriorLevel'];
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_WARRIOR_EXP));
			}

			if (newdata.addGods) {
				//新增英雄
				let arr: Array<GodItemVo> = new Array<GodItemVo>();
				for (var key in newdata.addGods) {
					if (newdata.addGods.hasOwnProperty(key)) {
						this.gods[key] = newdata.addGods[key];
						let vo: GodItemVo = this.createGodVo(newdata.addGods[key], key);
						this._godAry.push(vo);
						arr.push(vo);
					}
				}
				dispatchEvt(new game.GodEvent(game.GodEvent.ADD_GODS));
				dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_SUM_RESULT_PANEL), { godlist: arr, reward: newdata.addResource });
			}

			if (newdata.delGods) {
				//删除英雄
				for (var key in newdata.delGods) {
					delete this.gods[newdata.delGods[key]];
				}
				for (let uuid of newdata.delGods) {
					let index = this._godAry.findIndex((vo) => {
						return vo.uuid == uuid;
					});
					if (index != -1) {
						this._godAry.splice(index, 1);
					}
				}
				dispatchEvt(new game.GodEvent(game.GodEvent.GOD_CHANGE), 1);
			}

			if (newdata.addTimeItems) {
				for (let key in newdata.addTimeItems) {
					let uuid = Number(key);
					if (this.bagTimeItemsObj[uuid]) {
						logerror("道具重复下发：", uuid);
						continue;
					}
					let obj = this.bagTimeItemsObj[uuid] = newdata.addTimeItems[uuid];
					game.BagModel.getInstance().updateLimitTimeRes(uuid, game.LIMITTIMETYPE.ADD, newdata.addTimeItems[uuid]);

					let vo: LimitItemVo = new LimitItemVo(uuid, Number(obj.limitTime), obj.templateId, 1);
					dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_ITEM), vo);
					game.addTimeItem2Group(uuid, obj);
					//筛选最近的一个不可领道具，进行记录
					if (obj.limitTime > App.getServerTime()) {
						this._mintimeBox = this._mintimeBox == -1 ? obj.limitTime : Math.min(obj.limitTime, this._mintimeBox);
					}
				}
				dispatchEvt(new game.ResEvent(game.ResEvent.PROP_CHANGE));
			}

			if (newdata.delTimeItems) {
				for (let k = 0; k < newdata.delTimeItems.length; k++) {
					var delId: number = Number(newdata.delTimeItems[k]);
					if (this.bagTimeItemsObj.hasOwnProperty(delId)) {
						game.BagModel.getInstance().updateLimitTimeRes(delId, game.LIMITTIMETYPE.DEL);
						let vo: LimitItemVo = new LimitItemVo(delId, Number(this.bagTimeItemsObj[delId].limitTime), Number(this.bagTimeItemsObj[delId].templateId), 0);
						dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_ITEM), vo);//数目<=0 ,则为删除
						game.removeTimeItem2Group(delId);
						delete this.bagTimeItemsObj[delId];
					}
				}
				dispatchEvt(new game.ResEvent(game.ResEvent.PROP_CHANGE));
			}
		}

		public modifyCopyAwardCount($newdata: any): void {
			if (!$newdata) return;
			// 更新公会副本通关领取次数
			if ($newdata.modifyCopyAwardCount) {
				for (let id in $newdata.modifyCopyAwardCount) {
					this.guildCopyAwardInfo[id] = $newdata.modifyCopyAwardCount[id];
				}
			}
		}

		private refreshres($dataAry: Object, $isadd: boolean) {
			for (var key in $dataAry) {
				var value = Number($dataAry[key]);
				switch (parseInt(key)) {
					case iface.tb_prop.resTypeKey.gold:
						this.gold = $isadd ? (this.gold + value) : (this.gold - value);
						//金币变动发行说金币可以先不动
						// var hero=App.hero;
						// var sinfo=window.platform.serverInfo;
						// BingoSDK.gameReport("itemChange", hero.playerId, hero.accountName, sinfo.serverId,sinfo.srv_name, { itemName:'gold',count:($isadd?value:-value).toString(),reason:'',balance:this.gold });
						break;
					case iface.tb_prop.resTypeKey.diamond:
						this.diamond = $isadd ? (this.diamond + value) : (this.diamond - value);
						//砖石变动
						var hero = App.hero;
						var sinfo = window.platform.serverInfo;
						BingoSDK.gameReport("itemChange", hero.playerId, hero.accountName, sinfo.serverId, sinfo.srv_name, { itemName: 'diamond', count: ($isadd ? value : -value).toString(), reason: '', balance: this.diamond });
						break;
					case iface.tb_prop.resTypeKey.friend:
						this.friend = $isadd ? (this.friend + value) : (this.friend - value);
						break;
					case iface.tb_prop.resTypeKey.arena:
						this.arena = $isadd ? (this.arena + value) : (this.arena - value);
						break;
					case iface.tb_prop.resTypeKey.roleExp:
						this.exp = $isadd ? (this.exp + value) : (this.exp - value);
						this.calculateLv();
						dispatchEvt(new game.ResEvent(game.ResEvent.ROLE_EXP_CHANGE));
						break;
					case iface.tb_prop.resTypeKey.godExp:
						this.godExp = $isadd ? (this.godExp + value) : (this.godExp - value);
						dispatchEvt(new game.ResEvent(game.ResEvent.GOD_EXP_CHANGE));
						break;
					case iface.tb_prop.resTypeKey.guildExp:
						this.guildExp = $isadd ? (this.guildExp + value) : (this.guildExp - value);
						game.GuildModel.getInstance().updateGuildExp(this.guildExp);
						break;
					case iface.tb_prop.resTypeKey.guildDonate:
						this.guildDonate = $isadd ? (this.guildDonate + value) : (this.guildDonate - value);
						dispatchEvt(new game.ResEvent(game.ResEvent.GUILE_DONATE_CHANGE));
						break;
					case iface.tb_prop.resTypeKey.convertDust:
						this.convertDust = $isadd ? (this.convertDust + value) : (this.convertDust - value);
						break;
					case iface.tb_prop.resTypeKey.darkEssence:
						this.darkEssence = $isadd ? (this.darkEssence + value) : (this.darkEssence - value);
						break;
					case iface.tb_prop.resTypeKey.godCrystal:
						this.godCrystal = $isadd ? (this.godCrystal + value) : (this.godCrystal - value);
						break;
					case iface.tb_prop.resTypeKey.legendChip:
						this.legendChip = $isadd ? (this.legendChip + value) : (this.legendChip - value);
						break;
					case iface.tb_prop.resTypeKey.soulStone:
						this.soulStone = $isadd ? (this.soulStone + value) : (this.soulStone - value);
						break;
					case iface.tb_prop.resTypeKey.honour:
						this.honour = $isadd ? (this.honour + value) : (this.honour - value);
						break;
					case iface.tb_prop.resTypeKey.godDomain:
						this.godDomain = $isadd ? (this.godDomain + value) : (this.godDomain - value);
						break;
					case iface.tb_prop.resTypeKey.vipScore:
						let oldVipScore = this.vipScore;
						this.vipScore = $isadd ? (this.vipScore + value) : (this.vipScore - value);
						UIUtil.saveVipupData(oldVipScore, this.vipScore);
						break;
					case iface.tb_prop.resTypeKey.rechargeDmd:
						this.diamond = $isadd ? (this.diamond + value) : (this.diamond - value);
						break;
				}
			}
		}

		/** 计算等级 */
		private calculateLv(): void {
			//经验已经累加了
			let maxlev = TableData.getInstance().getTableByName(TableData.tb_role).maxId;
			let isup: boolean = false;
			let oldlev: number = this.level;
			let uplev: boolean = true;
			game.HudModel.getInstance().oldUserLv = this.level;
			while (uplev && this.level < maxlev) {
				let tabrole: tb.TB_role = tb.TB_role.get_TB_rolenById(this.level);
				if (tabrole && this.exp >= tabrole.exp) {
					isup = true;
					this.exp -= tabrole.exp;
					this.level = Math.min(maxlev, (this.level + 1));
				} else {
					uplev = false;
				}
			}
			if (isup) {
				let tabnewrole: tb.TB_role = tb.TB_role.get_TB_rolenById(this.level);
				let taboldrole: tb.TB_role = tb.TB_role.get_TB_rolenById(oldlev);
				UIMgr.showUI(UIConst.LevelUpView);
				dispatchEvt(new game.ResEvent(game.ResEvent.ROLE_LEVEL_CHANGE));
				var sinfo = window.platform.serverInfo;
				BingoSDK.gameReport("upgrade", this.playerId, this.accountName, sinfo.serverId, sinfo.srv_name, { level: this.level, vip: this.vip, charge: App.hero.welfare.rechargeSum });
			}
		}

		/**更新布阵信息 */
		public refreshLineUp($args) {
			let type;
			for (let key in $args) {
				type = Number(key);
				this.lineupInfo[type] = $args[key];
			}
			this.fightState(type);
			if (type == iface.tb_prop.lineupTypeKey.attack) {
				game.registerGodAndEquipGroup();
			}
			dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE));
			dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
		}

		/**
		 * 英雄上阵状态改变
		 * @param type -1全部 1攻击 2防守
		 */
		public fightState($type: number = -1): void {
			if ($type == -1) {
				this.setlineUpState2GodList(iface.tb_prop.lineupTypeKey.attack);
				this.setlineUpState2GodList(iface.tb_prop.lineupTypeKey.expedition);
			} else {
				this.setlineUpState2GodList($type);
			}
		}

		private setlineUpState2GodList($type: number) {
			let list = this.lineupInfo[$type];
			if (!list || list.length == 0) {
				return;
			}
			for (let i = 0; i < this._godAry.length; i++) {
				this.lineUpHasGod(list, this._godAry[i], $type);
			}
			//阵营加成变化
			game.GodModel.getInstance().onAttackLineChange($type);
		}

		private lineUpHasGod(list: Object, god: GodItemVo, $lineType: number) {
			let isflag: boolean = false;
			for (var key in list) {
				if (god.uuid == list[key]) {
					isflag = true;
					if ($lineType == iface.tb_prop.lineupTypeKey.attack) {
						god.isAttackFight = true;
						god.local[0] = Number(key);
					} else if ($lineType == iface.tb_prop.lineupTypeKey.expedition) {
						god.isYuanzhengFight = true;
						god.local[2] = Number(key);
					}
				}
			}

			if (!isflag) {
				if ($lineType == iface.tb_prop.lineupTypeKey.attack) {
					god.isAttackFight = false;
					god.local[0] = 99999;
				} else if ($lineType == iface.tb_prop.lineupTypeKey.expedition) {
					god.isYuanzhengFight = false;
					god.local[2] = 99999;
				}

			}
		}

		/**
		 * 获得上阵的英雄id数组
		 * includeEmpty：是否包括空白位置
		 */
		public getLineUpTeamIds($type, includeEmpty: boolean = false): string[] {
			let teamAry: string[] = [];
			let ary: string[] = this.lineupInfo[$type];
			if (ary && ary.length > 0) {
				for (let i = 0; i < 6; i++) {
					let uuid = ary[i];
					if (uuid) {
						teamAry.push(uuid);
					} else {
						if (includeEmpty) {
							teamAry.push(null);
						}
					}
				}
			}
			if (teamAry.length == 0) {
				teamAry = [null, null, null, null, null, null];
			}
			return teamAry;
		}

		// public getTestTeam(){
		// 	return [this._godAry[0],this._godAry[1],this._godAry[2],this._godAry[3],this._godAry[4],this._godAry[5]];
		// }

		/**
		 * 获得上阵的英雄id数组
		 * includeEmpty：是否包括空白位置
		 */
		public getLineUpTeam($type, includeEmpty: boolean = false): GodItemVo[] {
			let teamAry: GodItemVo[] = [];
			let taglineUp = this.lineupInfo[$type];
			if (taglineUp) {
				let lineUpKeys = Object.keys(taglineUp);
				let aidTag = game.YuanzhengModel.getInstance().getAidTag();
				for (var k = 0; k < 6; k++) {
					if (lineUpKeys.length > k) {
						let uuid = taglineUp[lineUpKeys[k]];
						if (aidTag && Number(uuid) < 0 && aidTag.uuid == uuid) {
							//兼容失落遗迹援助
							teamAry.push(aidTag);
							continue;
						}
						if (uuid) {
							let vo: GodItemVo = this.getGodVoById(uuid);
							if (!vo) {
								logerror("don`t find lineUpGod");
								continue;
							}
							teamAry.push(vo);
						} else {
							if (includeEmpty) {
								// null
								teamAry.push(null);
							}
						}
					} else {
						if (includeEmpty) {
							// null
							teamAry.push(null);
						}
					}
				}
			} else {
				if (includeEmpty) {
					teamAry = [null, null, null, null, null, null];
				}
			}
			return teamAry;
		}
		/**
		 * 上阵列表是否为空
		 * @param type 
		 */
		public hasLineUp($type): boolean {
			if (this.lineupInfo[$type]) {
				for (var key in this.lineupInfo[$type]) {
					let uuid = this.lineupInfo[$type][key]
					if (uuid) {
						return true;
					}
				}
			}
			return false;
		}
		/** 是否在阵容里 */
		public isInLineup(gid: string, $type: number): boolean {
			let gids = this.getLineUpTeamIds($type);
			return gids.indexOf(gid) != -1;
		}

		private refreshbag($dataAry: Object, $isadd: boolean) {
			for (var key in $dataAry) {
				if ($dataAry.hasOwnProperty(key)) {
					let val = 0;
					if (this.bagItemsObj.hasOwnProperty(key)) {
						val = this.bagItemsObj[key];
					}
					let nval: number = Number($dataAry[key]);
					if ($isadd) {
						this.bagItemsObj[key] = val + nval;
					} else {
						this.bagItemsObj[key] = Math.max(0, (val - nval));
					}
					val = this.bagItemsObj[key];
					let nkey = Number(key);
					game.BagModel.getInstance().updateBagObj(nkey, val);
					let vo: ItemVo = App.hero.createItemVo(val, nkey);
					dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_ITEM), vo);
				}
			}
		}

		public getBagItemNum(key: any): number {
			if (key == iface.tb_prop.resTypeKey.gold) {
				return App.hero.gold;
			} else if (key == iface.tb_prop.resTypeKey.diamond) {
				return App.hero.diamond;
			} else if (key == iface.tb_prop.resTypeKey.godExp) {
				return App.hero.godExp;
			} else if (key == iface.tb_prop.resTypeKey.convertDust) {
				return App.hero.convertDust;
			} else if (key == iface.tb_prop.resTypeKey.legendChip) {
				return App.hero.legendChip;
			} else if (this.bagItemsObj && this.bagItemsObj[key]) {
				return this.bagItemsObj[key];
			} else {
				let tbItem = tb.TB_item.get_TB_itemById(key);
				if (tbItem && tbItem.type == iface.tb_prop.itemTypeKey.gemstone) {
					return game.GemstoneUtils.getOwnNum(tbItem.ID);
				}
			}
			return 0;
		}

		/**
		 * type -1:全部 其余：排除怪物表类型的怪
		 */
		public getGodAry($type: number = -1, $lineUpType: number = -1): Array<GodItemVo> {
			return this.sortGodList($lineUpType, $type);
		}
		/** 是否激活神器 */
		public isActiveArtifact(id: number): boolean {
			return this.artifactInfo && this.artifactInfo.hasOwnProperty(id.toString());
		}
		/** 是否激活神器 */
		public isActiveArtifactAttr(): boolean {
			if (this.artifactInfo) {
				let artifactTemps: tb.TB_artifact[] = tb.TB_artifact.get_TB_artifact();
				for (let i: number = 0; i < artifactTemps.length; i++) {
					if (this.isActiveArtifact(artifactTemps[i].ID)) return true;
				}
			}
			return false;
		}
		/**在某个阵容是否已穿戴 */
		public isWearArtifact(id: number, type: number = 0): boolean {
			let key: string = type.toString();
			if (type == 0) {
				for (let i: number = 1; i < 4; i++) {
					key = i.toString();
					if (this.lineupArtifactInfo.hasOwnProperty(key) && this.lineupArtifactInfo[key] == id) {
						return true;
					}
				}
				return false;
			}

			return this.lineupArtifactInfo.hasOwnProperty(key) && this.lineupArtifactInfo[key] == id;
		}

		//获取某阵容穿戴的神器id
		public getArtifactIDByLineType(linetype: number = 1): number {
			let id: number = this.lineupArtifactInfo.hasOwnProperty(linetype) ? Number(this.lineupArtifactInfo[linetype]) : 0;
			return id;
		}

		//是否通关副本
		public isPassRuneCopyInfo(copyinfoid: number, chapter: number): boolean {
			if (App.hero.runeCopyInfo.hasOwnProperty(chapter)) {
				let passid: number = Number(App.hero.runeCopyInfo[chapter]);
				return passid >= copyinfoid;
			}
			return false;
		}

		//更新每日副本
		private updateDailyCopy(data: any): void {
			if (data.dailyCopyIds != null || data.dailyCopyId != null) {
				if (data.dailyCopyIds != null) {
					this.dailyCopyIds.push(data.dailyCopyIds);
				}
				if (data.dailyCopyId != null) {
					this.dailyCopyIds.push(data.dailyCopyId);
				}

				dispatchEvt(new game.DailyEvent(game.DailyEvent.DAILY_COPY_ID_CHANGE));
			}
		}

		//是否通关每日副本
		public isPassDailyCopy(id: number): boolean {
			return this.dailyCopyIds.indexOf(id) != -1;
		}

		//集市免费信息
		private _marketFreeInfo: number[] = [0, 0];//0--免费次数，1--刷新的结束时间
		public getMarketFreeInfo(): number[] {
			let setTemp: tb.TB_market_set = tb.TB_market_set.getItemById(1);
			let serverTime: number = App.serverTimeSecond;
			let count: number = this.getOverplusValue(iface.tb_prop.overplusTypeKey.marketRefreshNum);
			if (count >= setTemp.reply_num || this.marketRefreshReplyTime == 0 || serverTime <= this.marketRefreshReplyTime) {
				this._marketFreeInfo[0] = count;
				this._marketFreeInfo[1] = serverTime + setTemp.reply_interval;
				return this._marketFreeInfo;
			}
			let replyTime: number = serverTime - this.marketRefreshReplyTime;
			let replyCount: number = Math.floor(replyTime / setTemp.reply_interval);
			count += replyCount;
			if (count > setTemp.reply_num) count = setTemp.reply_num;
			this._marketFreeInfo[0] = count;
			this._marketFreeInfo[1] = this.marketRefreshReplyTime + (replyCount + 1) * setTemp.reply_interval;

			return this._marketFreeInfo;
		}

		//集市钻石刷新次数
		public getMarkeyBuyRefreshCount(): number {
			return this.getlimitValue(iface.tb_prop.limitTypeKey.buyMarketRefreshNum);
		}

		//===============================主线任务、每日任务、成就==========================
		/** 初始化任务列表 */
		initTasks(): void {
			for (let id in this.tasks.curTasks) {
				this.tasks.curTasks[id]['id'] = parseInt(id);
			}
			for (let id in this.tasks.dailyTasks) {
				this.tasks.dailyTasks[id]['id'] = parseInt(id);
			}
			this.tasks.guideStep = this.tasks.guideStep ? this.tasks.guideStep : 0;
			this.tasks.guideWeakStep = this.tasks.guideWeakStep ? this.tasks.guideWeakStep : [];
			game.TaskModel.getInstance().updateHonorList();
			dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA));
		}
		/**
		 * 更新任务数据
		 * @param changeTasks 
		 */
		public refreshTasks(changeTasks: any): void {
			let curTasks = this.tasks.curTasks;
			let doneTasks = this.tasks.doneTasks;
			let updateAchiv: boolean = false;
			let updateLimit: boolean = false;
			for (let id in changeTasks) {
				let tbTask = tb.TB_task.getTaskById(parseInt(id));
				if (!tbTask) return;
				if (tbTask.type == iface.tb_prop.taskTypeKey.achievement) {
					updateAchiv = true;
				} else if (tbTask.type == iface.tb_prop.taskTypeKey.limitTime) {
					updateLimit = true;
				}
				if (curTasks.hasOwnProperty(id)) {
					for (let key in changeTasks[id]) {
						curTasks[id][key] = changeTasks[id][key];
					}
				} else {
					curTasks[id] = changeTasks[id];
					curTasks[id]['id'] = parseInt(id);
				}
			}
			if (updateAchiv) {
				game.TaskModel.getInstance().updateHonorList();
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA));
			}
			if (updateLimit) {
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_LIMIT_TASK));
			}
		}
		/** 添加完成的任务id */
		public addDoneTask(id: number): void {
			let doneTasks = this.tasks.doneTasks;
			if (!doneTasks) {
				doneTasks = [];
			}
			if (doneTasks.indexOf(id) == -1) {
				doneTasks.push(id);
			}
			let curTasks = this.tasks.curTasks;
			if (curTasks.hasOwnProperty(id)) {
				delete curTasks[id];
			}
			let tbTask = tb.TB_task.getTaskById(id);
			if (tbTask.type == iface.tb_prop.taskTypeKey.achievement) {
				game.TaskModel.getInstance().updateHonorList();
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA));
			}
		}
		/** 更新每日任务数据 */
		public refreshDailyTask(changeTasks: any): void {
			let curTasks = this.tasks.dailyTasks;
			for (let id in changeTasks) {
				for (let key in changeTasks[id]) {
					curTasks[id][key] = changeTasks[id][key];
				}
			}
			dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_DAILY_TASK));
		}
		/** 更新日常任务活跃度 */
		public updateDailyLivess($data): void {
			if ($data && $data.hasOwnProperty('liveness')) {
				this.tasks.liveness = $data.liveness;
				dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_LIVENESS_DATA));
			}
		}
		/** 添加日常完成的任务id */
		public addDoneDailyTask(id: number): void {
			let dailyTasks = this.tasks.dailyTasks;
			for (let oid in dailyTasks) {
				if (parseInt(oid) == id) {
					dailyTasks[id]['done'] = true;
					break;
				}
			}
			dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_DAILY_TASK));
		}

		/**
		 * 获取每日限制类型的值
		 * @param type iface.tb_prop.limitTypeKey
		 */
		public getlimitValue(type: number): number {
			return this.limitInfo[type] ? this.limitInfo[type] : 0;
		}
		/**
		 * 获取剩余次数
		 */
		public getOverplusValue(type: number): number {
			return this.overplusInfo[type] ? this.overplusInfo[type] : 0;
		}
		public setOverplusValue(type: number, value: number): void {
			this.overplusInfo[type] = value;
			dispatchEvt(new game.ResEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE));
		}

		/**
		 * 获取出战英雄的模型列表
		 * @param num 
		 */
		public chuzhanModels(num: number, $type: number = iface.tb_prop.lineupTypeKey.attack): Array<number> {
			var list: Array<number> = new Array<number>();
			let godlist: Array<string> = this.getLineUpTeamIds($type);
			if (!godlist || godlist.length == 0 || !godlist[0]) {
				return [];
			}
			//创建出战英雄
			for (let i = 0, len = godlist.length; i < len; i++) {
				let godId = godlist[i];
				//取出战的前面三只
				if (i < num) {
					let element = this.getGodVoById(godId);
					if (element) {
						list.push(element.tab_god.model);
					}
				}
			}
			return list;
		}

		/** 更新挂机战斗数据 -- 主线关卡及奖励等 */
		updateGuajiData(res: any): void {
			if (!res) return;
			if (res.hasOwnProperty('lastGetAfkTime')) {
				this.lastGetAfkTime = res['lastGetAfkTime'];
				dispatchEvt(new game.GuajiEvent(game.GuajiEvent.UPDATE_LASTGET_AFKTIME));
			}
			// if (res.hasOwnProperty('lastAfkTime')) {
			// 	this.lastAfkTime = res['lastAfkTime'];
			// }
			// if (res.hasOwnProperty('afkAward')) {
			// 	this.afkAward = res['afkAward'];
			// }
		}
		/** 更新远征副本数据 */
		updateCopyInfo(res: any): void {
			if (!res) return;
			if (res.hasOwnProperty('expeditionRewardInfo')) {
				this.copyInfo.expeditionRewardInfo = res.expeditionRewardInfo;
			}
			if (res.hasOwnProperty('expeditionSelfHpInfo')) {
				this.copyInfo.expeditionSelfHpInfo = res.expeditionSelfHpInfo;
			}
			if (res.hasOwnProperty('expeditionId')) {
				this.copyInfo.expeditionId = res['expeditionId'];
				game.YuanzhengModel.getInstance().updateCurGuanqia();
			}
			if (res.hasOwnProperty('modifySelfHpInfo')) {
				let selfHpInfo = this.copyInfo.expeditionSelfHpInfo
				for (let key in res['modifySelfHpInfo']) {
					selfHpInfo[key] = res['modifySelfHpInfo'][key];
				}
			}
			if (res.hasOwnProperty('modifyRewardInfo')) {
				let selfHpInfo = this.copyInfo.expeditionRewardInfo
				for (let key in res['modifyRewardInfo']) {
					selfHpInfo[key] = res['modifyRewardInfo'][key];
				}
			}
			dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.UPDATE_VIEW));

		}

		//是否在黑名单里
		public isInBlockList(playerId: string): boolean {
			return this.blockLists.indexOf(playerId) != -1;
		}

		//增加黑名单
		public addBlockList(playerId: string): boolean {
			if (!playerId || playerId == "") {
				return false;
			}
			this.blockLists.push(playerId);
			return true;
		}

		/** 移除黑名单 */
		public removeBlockListById(playerId: string): boolean {
			if (!playerId || playerId == "") {
				return false;
			}
			let index: number = this.blockLists.indexOf(playerId);
			if (index == -1) {
				return false;
			}
			this.blockLists.splice(index, 1);
			return true;
		}
		/** 移除黑名单列表 */
		public removeBlackList(ids: string[]): void {
			if (!ids || !Array.isArray(ids)) return;
			for (let id of ids) {
				this.removeBlockListById(id);
			}
		}

		private _mintimeBox: number = -1;
		/**
		 * 寻找最近的一个不可领取的道具，记录其时间
		 */
		private setLimitBoxMintime() {
			this._mintimeBox = -1;
			for (var key in this.bagTimeItemsObj) {
				var element = this.bagTimeItemsObj[key];
				if (element.limitTime > App.getServerTime()) {
					this._mintimeBox = this._mintimeBox == -1 ? element.limitTime : Math.min(element.limitTime, this._mintimeBox);
				}
			}
		}

		getFirstUse(id): boolean {
			return this.firstIds && this.firstIds.indexOf(id) != -1;
		}


	}
}