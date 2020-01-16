var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
* name
*/
var common;
(function (common) {
    var Hero = /** @class */ (function () {
        function Hero() {
            /**平台uid */
            this.puid = "";
            /**账户名字 */
            this.accountName = "";
            /**游戏uid */
            this.uid = "";
            /**玩家ID*/
            this.playerId = "";
            /**新玩家标识*/
            this.isNewPlayer = 0;
            /**玩家名字*/
            this.name = "";
            /**玩家头像 三个字段*/
            this.head = ""; // 外部头像
            this.headId = 0; // 神灵头像 要大于0
            this.sex = 1; // 玩家性别 可表示头像
            /**玩家头像*/
            this.headIcon = "";
            /**玩家等级*/
            this.level = 1;
            /**玩家经验*/
            this.exp = 666;
            /**神器强化等级 */
            this.artifactStrengthLv = 0;
            /**神器技能等级 */
            this.artifactSkillLv = 0;
            /**神器洗练等级 */
            this.artifactBaptizeLv = 0;
            /**神器洗练经验 */
            this.artifactBaptizeExp = 0;
            /**神器星级 */
            this.artifactStarLv = 0;
            /**神器星级经验 */
            this.artifactStarExp = 0;
            /**钻石数量*/
            this.diamond = 0;
            /**友情点数量*/
            this.friend = 0;
            /** 勋章 */
            this.arena = 0;
            /**金币数量*/
            this.gold = 0;
            /**英雄经验池*/
            this.godExp = 0;
            /**公会ID */
            this.guildId = "";
            /** 公会等级 */
            this.guildLv = 0;
            /** 公会经验 */
            this.guildExp = 0;
            /** 公会贡献 */
            this.guildDonate = 0;
            this.guildName = "";
            this.guildHelpNum = 0;
            /**vip等级*/
            this.vip = 0;
            /**许愿次数 */
            this.limitInfo = { "4": 0, "5": 0 };
            /**符文副本通关进度 */
            this.runeCopyInfo = {};
            /**地下城副本通关进度 */
            this.groundCopyInfo = {};
            /** 试炼塔副本通关进度 */
            this.towerCopyInfo = {};
            /** 试炼塔boss奖励领取数据 */
            this.towerAwardInfo = {};
            /**上次刷新挑战列表时间 */
            this.arenaClgListTime = 0;
            /**竞技场挑战冷却时间 */
            this.arenaFailTime = 0;
            /** 上次领取挂机宝箱时间 */
            this.lastGetAfkTime = 0;
            // public afkAward: any[] = [];
            // public lastAfkTime: number = 0;
            /**历史最高战斗力 */
            this.maxHistoryForce = 0;
            /** 剩余次数数据 */
            this.overplusInfo = {};
            /** 历练副本挑战次数 */
            this.copyChallengeInfo = {};
            /** 公会战宝箱领取次数 */
            this.guildWarAwardCount = {};
            /** 绑定手机 -1：不显示 0未绑定 1：绑定 */
            this.bindPhone = 1;
            this.honourStage = 0; // 荣耀之战本服阶段(>0即开启)
            this.kuafuHonourStage = 0; // 荣耀之战跨服阶段(>0即开启)
            //已通关每日副本
            this.dailyCopyIds = [];
            //红点触发累计时间
            this._time = 0;
            //防沉迷监听累计时间
            this._IndulgeCountTime = 0;
            this._IndulgeLoginRemind = false;
            /**
             * 跨天请求
             */
            this._curCrossTime = 0;
            this._curDate = new Date();
            this._curDay = 0;
            this.checkKey = ["awakenLv", "level"];
            //集市免费信息
            this._marketFreeInfo = [0, 0]; //0--免费次数，1--刷新的结束时间
            this._mintimeBox = -1;
        }
        ;
        Hero.prototype.setData = function ($data) {
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
            this.showGodId = $data.base.showGodId || common.GlobalData.DEFAULT_SHOW_GODID;
            this.showSkinId = $data.base.showSkinId || common.GlobalData.DEFAULT_SHOW_SKINID;
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
            var limitTypeKey = iface.tb_prop.limitTypeKey;
            var limitInfo = $data.extend.limitInfo;
            for (var id in limitTypeKey) {
                this.limitInfo[limitTypeKey[id]] = limitInfo && limitInfo[limitTypeKey[id]] ? limitInfo[limitTypeKey[id]] : 0;
            }
            //设置剩余次数
            var overplusTypeKey = iface.tb_prop.overplusTypeKey;
            var overplusInfo = $data.extend.overplusInfo;
            for (var id in overplusTypeKey) {
                this.overplusInfo[overplusTypeKey[id]] = overplusInfo && overplusInfo[overplusTypeKey[id]] ? overplusInfo[overplusTypeKey[id]] : 0;
            }
            this.lastGetAfkTime = $data.extend.lastGetAfkTime || 0;
            // 红点数据
            this.redPointInfo = $data.extend.redPointInfo || {};
            var mailModel = game.MailModel.getInstance();
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
            var matchModel = game.MatchModel.getInstance();
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
                var vo = this.createGodVo(this.gods[key], key);
                this._godAry.push(vo);
            }
            this.fightState();
            this.setLimitBoxMintime();
            // 逻辑主心跳
            Laya.stage.clearTimer(this, this.tickFun);
            Laya.stage.frameLoop(3, this, this.tickFun);
            this.putPatch();
            var servertime = App.serverTime;
            this._curDate.setTime(servertime);
            this._curDay = this._curDate.getDate();
        };
        /**
         * 兼容旧号的上线补丁
         */
        Hero.prototype.putPatch = function () {
            var maxzj = game.GuajiModel.getInstance().getMaxChapter();
            if (this.copyUnlockId < maxzj) {
                var args = {};
                args[Protocol.game_copy_copyUnlock.args.id] = maxzj;
                PLC.request(Protocol.game_copy_copyUnlock, args, function ($data) {
                    if (!$data)
                        return;
                    App.hero.copyUnlockId = $data.copyUnlockId;
                });
            }
        };
        Object.defineProperty(Hero.prototype, "arenaNum", {
            get: function () {
                return this.getOverplusValue(iface.tb_prop.overplusTypeKey.arenaNum);
            },
            enumerable: true,
            configurable: true
        });
        Hero.prototype.getHeadId = function () {
            return this.headId;
        };
        /** 更新自己头像 */
        Hero.prototype.updateSelfHead = function () {
            // let sex = this.sex == 0 ? -2 : -1; 	// -2表示男
            // let head = this.headId > 0 ? this.headId : (this.head && this.head != "" ? this.head : sex);
            var head = this.headId > 0 ? this.headId : (this.head && this.head != "" ? this.head : common.GlobalData.DEFAULT_HEAD);
            this.setHeadId(head);
        };
        Hero.prototype.setHeadId = function (id) {
            this.headId = id;
            this.headIcon = SkinUtil.getHeroIcon(id);
        };
        //计时器 $t:两帧之间的间隔时间，毫秒
        Hero.prototype.tickFun = function () {
            var t = Laya.timer.delta;
            this.updateRedpoint(t);
            this.UpdateCrossDay(t);
            this.updateTimeItems();
            //开启防沉迷监听
            if (App.hero.isIndulge) {
                this.updateIndulge(t);
            }
        };
        Hero.prototype.UpdateCrossDay = function (ms) {
            this._curCrossTime += ms;
            if (this._curCrossTime < 3000) {
                return;
            }
            this._curCrossTime = 0;
            var servertime = App.serverTime;
            this._curDate.setTime(servertime);
            var cday = this._curDate.getDate();
            var cs = this._curDate.getSeconds();
            if (this._curDay != cday && cs >= 3) {
                //跨天刷新(确保延迟3秒后刷)
                App.updateCrossDayInfo();
                this._curDay = cday;
            }
        };
        /**
         * 更新限时物品
         */
        Hero.prototype.updateTimeItems = function () {
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
        };
        Hero.prototype.offline = function () {
            // logyhj("离线清空");
            Laya.stage.clearTimer(this, this.tickFun);
            game.RedPointManager.removeAll();
            this.initData = null;
        };
        /**创角当天0：00时间戳(毫秒) */
        Hero.prototype.getCreateDayTiem = function () {
            var date = new Date(this.createTime);
            date.setHours(0, 0, 0, 0);
            return date.getTime();
        };
        // private _tickid: number;
        /** 更新红点 */
        Hero.prototype.updateRedpoint = function ($t) {
            var _this = this;
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
                var uiPanel = UIMgr.getUIByName(UIConst.GuajiView);
                uiPanel.updateShouchongTishi();
            }
            if (UIMgr.hasStage(UIConst.FightViews))
                return;
            PLC.request(Protocol.game_common_redPoint, null, function ($data) {
                var info = $data && $data.redPointInfo ? $data.redPointInfo : [];
                var mailModel = game.MailModel.getInstance();
                var islandModel = game.IslandModel.getInstance();
                for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
                    var key = info_1[_i];
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
                        case iface.tb_prop.redPointTypeKey.newRecharge: // 充值到账，更新数据
                            PLC.request(Protocol.game_recharge_updateRecharge, null, function ($data) {
                                if (!$data)
                                    return;
                                _this.refreshWelfareData($data);
                                if ($data.diamond) {
                                    _this.diamond = $data.diamond;
                                }
                                var oldVip = _this.vip;
                                var oldScore = _this.vipScore;
                                if ($data.vipLevel) {
                                    _this.vip = $data.vipLevel;
                                }
                                if ($data.vipScore) {
                                    _this.vipScore = $data.vipScore;
                                }
                                if (_this.vip > oldVip) {
                                    var clientData = {};
                                    clientData["oldVip"] = oldVip;
                                    clientData["newVip"] = _this.vip;
                                    clientData["oldScore"] = oldScore;
                                    clientData["newScore"] = _this.vipScore;
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
                            PLC.request(Protocol.game_activity_updateSevenDayCondCount, null, function () { });
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
                            PLC.request(Protocol.game_common_updateCommonData, null, function ($data) {
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
                            game.CopyTeamThread.getInstance().requestMyTeamInfo();
                            showToast(LanMgr.getLan('', 10211));
                            break;
                        case iface.tb_prop.redPointTypeKey.groupCopyAppoint:
                            // 组队副本任命队长
                            game.CopyTeamThread.getInstance().requestMyTeamInfo();
                            showToast(LanMgr.getLan('', 10212));
                            break;
                    }
                }
            }, false);
            dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_CHATNOTICE_TEXT));
        };
        /** 更新防沉迷 */
        Hero.prototype.updateIndulge = function (time) {
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
        };
        /**玩家次数加上vip增加的次数 */
        Hero.prototype.baseAddVipNum = function (type) {
            var vip = tb.TB_vip.get_TB_vipById(this.vip);
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
                    var offlinetime = tb.TB_copy_set.getCopySet().offline_time;
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
            return 0;
        };
        /**免费的次数 */
        Hero.prototype.totalFreeCount = function (type) {
            var count = 0;
            switch (type) {
                case iface.tb_prop.limitTypeKey.fastFrightFreeNum:
                    count = tb.TB_copy_set.getCopySet().free_fastfight_num;
                    if (App.hero.welfare.monthCardEndTime > App.getServerTime())
                        count += tb.TB_month_card.getTbMonthCardById(1).free_fastfight_num;
                    break;
            }
            return count;
        };
        /**
         * 玩家等级/VIP可开启的功能
         * 如果有参数 就return参数 否则就return 状态
         */
        Hero.prototype.levelPrivilege = function (ifaceType) {
            var vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(ifaceType);
            if (vipPrivilege && (vipPrivilege.vip_level <= this.vip || vipPrivilege.general_level <= this.level)) {
                return vipPrivilege.para != 0 ? vipPrivilege.para : true;
            }
            return false;
        };
        /**刷新福利数据 */
        Hero.prototype.refreshWelfareData = function (data) {
            for (var key in data) {
                if (this.welfare[key] != void 0) {
                    this.welfare[key] = data[key];
                }
            }
        };
        /** 跨天刷新商店数据 */
        Hero.prototype.refreshShopData = function () {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.REFRESH_SHOP_CROSSDAY));
        };
        /** 更新跨天数据 */
        Hero.prototype.updateCrossDayInfo = function ($data) {
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
            var date = new Date();
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
        };
        /** 初始化：不能乱用 */
        Hero.prototype.initEquipAry = function () {
            this._equipAry = [];
            for (var key in this.bagEquipsObj) {
                var vo = new EquipItemVo(this.bagEquipsObj[key]);
                vo.uuid = key;
                this._equipAry.push(vo);
            }
        };
        Hero.prototype.getEquipByuuid = function (uuid) {
            return this._equipAry.find(function (vo) { return vo.uuid == uuid; });
        };
        /**改变装备数组中某个装备 */
        Hero.prototype.setEquipAryByUuid = function (uuid, godId) {
            for (var i in this._equipAry) {
                if (this._equipAry[i].uuid == uuid) {
                    this._equipAry[i].godId = this.bagEquipsObj[uuid].godId;
                    game.BagModel.getInstance().updateEquObj(uuid, game.EQUTYPE.MODIFY, this._equipAry[i]);
                    dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM), { type: game.EQUTYPE.MODIFY, vo: this._equipAry[i] });
                    break;
                }
            }
        };
        Hero.prototype.createItemVo = function (count, $key) {
            var itemtab = tb.TB_item.get_TB_itemById($key);
            var id = Number($key);
            var type = itemtab.type;
            var vo = new ItemVo(id, count, type);
            return vo;
        };
        Hero.prototype.getGodsNum = function () {
            return this._godAry.length;
        };
        Hero.prototype.getEqusNum = function () {
            return this._equipAry.length;
        };
        /**更改英雄数组某个英雄的装备信息 */
        Hero.prototype.setGodAryByUuid = function (uuid, type) {
            for (var i in this._godAry) {
                if (this._godAry[i].uuid == uuid) {
                    var godVo = this.createGodVo(this.gods[uuid], uuid);
                    var sta = this._godAry[i].getShenli();
                    var end = godVo.getShenli();
                    if (type == 0) {
                        this._godAry[i].equipKeys = godVo.equipKeys;
                        this._godAry[i].fightPower = end;
                    }
                    else {
                    }
                    break;
                }
            }
        };
        Hero.prototype.getGodArr = function () {
            return this._godAry;
        };
        /**
         * 排序后英雄列表
         * @param type
         */
        Hero.prototype.sortGodList = function ($lineUpType, $type) {
            var ary = new Array;
            if ($type == -1) {
                ary = __spreadArrays(this._godAry);
            }
            else {
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
            ary.sort(function (a, b) {
                if ($lineUpType == iface.tb_prop.lineupTypeKey.attack) {
                    if (a.local[0] != b.local[0]) {
                        return a.local[0] - b.local[0];
                    }
                }
                else if ($lineUpType == iface.tb_prop.lineupTypeKey.expedition) {
                    if (a.local[2] != b.local[2]) {
                        return a.local[2] - b.local[2];
                    }
                }
                if (a.inLine() == b.inLine()) {
                    if (a.isInLinuep()) {
                        return b.fightPower - a.fightPower;
                    }
                    else {
                        if (a.level == b.level) {
                            if (a.starLevel == b.starLevel) {
                                if (a.tab_god.race_type == b.tab_god.race_type) {
                                    return b.templateId - a.templateId;
                                }
                                else {
                                    return a.tab_god.race_type - b.tab_god.race_type;
                                }
                            }
                            else {
                                return b.starLevel - a.starLevel;
                            }
                        }
                        else {
                            return b.level - a.level;
                        }
                    }
                }
                else {
                    return a.inLine() - b.inLine();
                }
            });
            return ary;
        };
        Hero.prototype.createGodVo = function (sdata, godUuid) {
            var vo = this.getGodVoById(godUuid);
            if (vo) {
                for (var key_1 in sdata) {
                    vo[key_1] = sdata[key_1];
                }
            }
            else {
                vo = GodItemVo.getData(sdata, godUuid);
            }
            vo.equipKeys = [];
            if (sdata.equipKeys) {
                for (var key in sdata.equipKeys) {
                    if (sdata.equipKeys[key]) {
                        var equipvo = App.hero.getEquipByuuid(sdata.equipKeys[key]);
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
                        var treasureVo = game.TreasureModel.getInstance().getTreasureByUuid(sdata.treasureKeys[key]);
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
        };
        Hero.prototype.getGodVoById = function ($godid) {
            for (var i = 0; i < this._godAry.length; i++) {
                if (this._godAry[i].uuid == $godid) {
                    return this._godAry[i];
                }
            }
            return null;
        };
        /**
         * 某个槽位的所有未穿戴的装备 有排序的
         * @param slot 槽位(传0获得全部)
         */
        Hero.prototype.getEquips = function (slot, sort) {
            if (slot === void 0) { slot = 0; }
            if (sort === void 0) { sort = false; }
            var ary = this._equipAry.filter(function (vo) { return slot == 0 || vo.slot == slot; });
            if (sort) {
                ary.sort(function (a, b) {
                    return b.getSortNum() - a.getSortNum();
                });
            }
            return ary;
        };
        /** 筛选出装备/未装备类型并排序*/
        Hero.prototype.getEquipBagByType = function ($pos) {
            if ($pos === void 0) { $pos = 0; }
            var ary = this.getEquips($pos, true);
            var isGodidEquip = [];
            for (var i = 0; i < ary.length;) {
                if (ary[i].godId) {
                    isGodidEquip.push(ary[i]);
                    ary.splice(Number(i), 1);
                }
                else {
                    i++;
                }
            }
            return isGodidEquip.concat(ary);
        };
        Hero.prototype.refreshData = function (reqdata, routeName) {
            if (routeName === void 0) { routeName = ""; }
            // 在设置通用数据前可能需要设置一些必要数据，否则会影响到通用数据的更新
            if (!reqdata)
                return;
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
            var hasWarriorLevel = reqdata.hasOwnProperty("warriorLevel");
            var hasWarriorExp = reqdata.hasOwnProperty("warriorExp");
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
                var newid = Number(reqdata.addGodFateId);
                var idx = this.godFateIds.indexOf(newid);
                if (idx == -1) {
                    this.godFateIds.push(newid);
                }
            }
            // 时装
            if (reqdata.addSkinId) {
                var newid = Number(reqdata.addSkinId);
                var idx = this.skinIds.indexOf(newid);
                if (idx == -1) {
                    this.skinIds.push(newid);
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.ADD_SKINID), newid);
            }
            // 觉醒
            if (reqdata.addGodAwakens) {
                var newid = Number(reqdata.addGodAwakens);
                var idx = this.godAwakens.indexOf(newid);
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
                var key_2 = getobjectFirstAttribute(reqdata.sevendayAwardCount);
                if (!this.welfare.sevendayInfo) {
                    this.welfare.sevendayInfo = {};
                }
                if (!this.welfare.sevendayInfo[key_2]) {
                    this.welfare.sevendayInfo[key_2] = {};
                }
                this.welfare.sevendayInfo[key_2].rewardCount = reqdata.sevendayAwardCount[key_2];
            }
            if (reqdata.sevendayExtraAward) {
                var key_3 = getobjectFirstAttribute(reqdata.sevendayExtraAward);
                this.welfare.sevendayExtraAward[key_3] = reqdata.sevendayExtraAward[key_3];
            }
            if (reqdata.luckEquipAward) {
                var key_4 = getobjectFirstAttribute(reqdata.luckEquipAward);
                this.welfare.luckEquipAward[key_4] = reqdata.luckEquipAward[key_4];
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
                var keys = getobjectFirstAttribute(reqdata.dailySignIn);
                this.welfare.dailySignIn[keys] = reqdata.dailySignIn[keys];
            }
            if (reqdata.levelFundAward) {
                var keys = getobjectFirstAttribute(reqdata.levelFundAward);
                this.welfare.levelFundAward[keys] = reqdata.levelFundAward[keys];
            }
            if (reqdata.loginGiftPack) {
                var keys = getobjectFirstAttribute(reqdata.loginGiftPack);
                this.welfare.loginGiftPack[keys] = reqdata.loginGiftPack[keys];
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LOGIN_GIFT_RECEIVE));
            }
            if (reqdata.firstRecharge) {
                var key_5 = getobjectFirstAttribute(reqdata.firstRecharge);
                this.welfare.firstRecharge[key_5] = reqdata.firstRecharge[key_5];
            }
            if (reqdata.totalSignIn) {
                var key_6 = getobjectFirstAttribute(reqdata.totalSignIn);
                this.welfare.totalSignIn[key_6] = reqdata.totalSignIn[key_6];
            }
            if (reqdata.levelGiftPack) {
                var key_7 = getobjectFirstAttribute(reqdata.levelGiftPack);
                this.welfare.levelGiftPack[key_7] = reqdata.levelGiftPack[key_7];
            }
            if (reqdata.levelGiftPack) {
                var key_8 = getobjectFirstAttribute(reqdata.levelGiftPack);
                this.welfare.levelGiftPack[key_8] = reqdata.levelGiftPack[key_8];
            }
            if (reqdata.modifyWorshipInfo) {
                var key_9 = getobjectFirstAttribute(reqdata.modifyWorshipInfo);
                this.worshipInfo[key_9] = reqdata.modifyWorshipInfo[key_9];
                dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RANK_MOBAI_CHANGE));
            }
            //通关奖励领取
            if (reqdata.addMapBoxAwardIds) {
                this.mapBoxAwardIds.push(reqdata.addMapBoxAwardIds);
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.FUBEN_REWARD_CHANGE));
            }
            // 限购礼包
            if (reqdata.dayRechargeLimit) {
                for (var id in reqdata.dayRechargeLimit) {
                    if (!this.welfare.dayRechargeLimit)
                        this.welfare.dayRechargeLimit = {};
                    this.welfare.dayRechargeLimit[id] = reqdata.dayRechargeLimit[id];
                }
                dispatchEvt(new game.TopUpEvent(game.TopUpEvent.XIANGOU_LIBAO_CHANGE));
            }
            if (reqdata.weekRechargeLimit) {
                for (var id in reqdata.weekRechargeLimit) {
                    if (!this.welfare.weekRechargeLimit)
                        this.welfare.weekRechargeLimit = {};
                    this.welfare.weekRechargeLimit[id] = reqdata.weekRechargeLimit[id];
                }
                dispatchEvt(new game.TopUpEvent(game.TopUpEvent.XIANGOU_LIBAO_CHANGE));
            }
            if (reqdata.monthRechargeLimit) {
                for (var id in reqdata.monthRechargeLimit) {
                    if (!this.welfare.monthRechargeLimit)
                        this.welfare.monthRechargeLimit = {};
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
                var flag = 0; //1觉醒 2升级
                for (var key in reqdata.targetGod) {
                    if (reqdata.targetGod.hasOwnProperty(key)) {
                        var newdata = this.createGodVo(reqdata.targetGod[key], key);
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
                        var oldvo = this.gods[key];
                        var newvo = reqdata.targetGod[key];
                        this.gods[key] = this.checkVo(oldvo, newvo);
                        dispatchEvt(new game.GodEvent(game.GodEvent.GOD_PORP_CHANGE), newdata);
                    }
                }
            }
            //装备变化
            if (reqdata.targetEquips) {
                var godUuid = void 0;
                for (var key in reqdata.targetEquips) {
                    this.bagEquipsObj[key] = reqdata.targetEquips[key];
                    if (reqdata.targetEquips.hasOwnProperty(key)) {
                        var equipObj = reqdata.targetEquips[key];
                        var equipVo = this.getEquipByuuid(key);
                        if (equipVo) {
                            equipVo.updateData(equipObj);
                            game.BagModel.getInstance().updateEquObj(equipVo.uuid, game.EQUTYPE.MODIFY, equipVo);
                            dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM), { type: game.EQUTYPE.MODIFY, vo: equipVo });
                            if (equipVo.godId)
                                godUuid = equipVo.godId;
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
                var type = Artifact.CHANGE;
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
                var idArr = [];
                for (var key_10 in reqdata.artifactInfo) {
                    this.artifactInfo[key_10] = reqdata.artifactInfo[key_10];
                    idArr.push(Number(key_10));
                }
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_ACTIVE), idArr);
            }
            if (reqdata.guildCopyMaxDmg != null) {
                var idArr = [];
                for (var key_11 in reqdata.guildCopyMaxDmg) {
                    this.guildCopyMaxDmg[key_11] = reqdata.guildCopyMaxDmg[key_11];
                }
            }
            //进阶之路
            if (reqdata.advanceLevel != null) {
                var oldLv = this.tasks.advanceLevel;
                this.tasks.advanceLevel = reqdata.advanceLevel;
                dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.UR_LEVEL_CHANGE), [this.tasks.advanceLevel, oldLv]);
            }
            if (reqdata.modifyAdvanceReward != null) {
                var idArr = [];
                for (var key_12 in reqdata.modifyAdvanceReward) {
                    this.tasks.advanceInfos[key_12].reward = reqdata.modifyAdvanceReward[key_12];
                    idArr.push(Number(key_12));
                }
                dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.UR_REWARD_CHANGE), idArr);
            }
            this.updateDailyCopy(reqdata);
            // 设置通用数据
            var $newdata = reqdata.commonData;
            if ($newdata)
                this.refreshCommonData($newdata);
            // 设置首通数据
            var $firstdata = reqdata.firstData;
            if ($firstdata)
                this.refreshCommonData($firstdata);
            //宝物变化，需要在处理之后执行
            if (reqdata.targetTreasure) {
                game.TreasureModel.getInstance().updateTargetTreasures(reqdata.targetTreasure);
            }
        };
        Hero.prototype.checkVo = function (oldvo, newvo) {
            var tempvo = {};
            for (var key in newvo) {
                if (oldvo.hasOwnProperty(key) && this.checkKey.indexOf(key) != -1) {
                    tempvo[key] = Math.max(newvo[key], oldvo[key]);
                    continue;
                }
                tempvo[key] = newvo[key];
            }
            return tempvo;
        };
        Hero.prototype.refreshCommonData = function (newdata) {
            //终身首次记录
            if (newdata.addFirstIds) {
                this.firstIds = this.firstIds.concat(newdata.addFirstIds);
            }
            //装备分解
            if (newdata.delEquips) {
                var ids = newdata.delEquips;
                for (var key in newdata.delEquips) {
                    var val = newdata.delEquips[key];
                    delete this.bagEquipsObj[val];
                    game.BagModel.getInstance().updateEquObj(val, game.EQUTYPE.DEL);
                }
                for (var i = this._equipAry.length - 1; i >= 0; i--) {
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
                        var vo = new EquipItemVo(newdata.addEquips[key]);
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
                    for (var i in newdata.modifyEquips) {
                        if (!this.bagEquipsObj[i])
                            continue;
                        this.bagEquipsObj[i].godId = newdata.modifyEquips[i];
                        this.setEquipAryByUuid(i, newdata.modifyEquips[i]);
                    }
                }
                if (newdata.modifyGodEquips) {
                    for (var i in newdata.modifyGodEquips) {
                        if (!this.gods[i])
                            continue;
                        this.gods[i].equipKeys = newdata.modifyGodEquips[i];
                        this.setGodAryByUuid(i, 0);
                    }
                }
                dispatchEvt(new game.EquipEvent(game.EquipEvent.CHANGE_EQUIP_ITEM), true);
                dispatchEvt(new game.ResEvent(game.ResEvent.EQUIPMENET_CHANGE));
            }
            // 新增圣物图鉴
            if (newdata.addTreasureBook) {
                for (var _i = 0, _a = newdata.addTreasureBook; _i < _a.length; _i++) {
                    var newid = _a[_i];
                    var idx = this.godFateIds.indexOf(newid);
                    if (idx == -1) {
                        this.treasureBooks.push(newid);
                    }
                }
            }
            // 新增圣物
            var treasureModel = game.TreasureModel.getInstance();
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
            var gemsModel = game.GemstoneModel.getInstance();
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
                var obj = newdata.modifySevenDays;
                for (var key_13 in obj) {
                    if (!this.welfare.sevendayInfo[key_13]) {
                        this.welfare.sevendayInfo[key_13] = {};
                    }
                    this.welfare.sevendayInfo[key_13].condCount = obj[key_13];
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
                var obj = newdata.modifyLineups;
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
                for (var id in newdata.modifyLimits) {
                    this.limitInfo[id] = newdata.modifyLimits[id];
                }
                dispatchEvt(new game.ResEvent(game.ResEvent.LIMIT_VALUE_CHANGE));
            }
            // 限制数量更新
            if (newdata.modifyOverplus) {
                for (var id in newdata.modifyOverplus) {
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
                var idArr = [];
                for (var key_14 in newdata.modifyAdvanceCount) {
                    this.tasks.advanceInfos[key_14].count = newdata.modifyAdvanceCount[key_14];
                    idArr.push(Number(key_14));
                }
                dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.UR_COUNT_CHANGE), idArr);
            }
            if (newdata.modifyMaxStarLvInfo != null) {
                for (var key_15 in newdata.modifyMaxStarLvInfo) {
                    this.maxStarLvInfo[key_15] = newdata.modifyMaxStarLvInfo[key_15];
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.GOD_MAX_STAR_LV_CHANGE));
            }
            //集市刷新时间
            if (newdata.modifyMarketRefreshTime != null) {
                this.marketRefreshReplyTime = newdata.modifyMarketRefreshTime;
                dispatchEvt(new game.ShopEvent(game.ShopEvent.MARKET_REFRESH_REPLY_TIME_CHNAGE));
            }
            // 勇者之证 -- 更新数量
            var hasWarriorWeek = newdata.hasOwnProperty("modifyWarriorWeekCount");
            var hasWarriorMonth = newdata.hasOwnProperty("modifyWarriorMonthCount");
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
                var arr = new Array();
                for (var key in newdata.addGods) {
                    if (newdata.addGods.hasOwnProperty(key)) {
                        this.gods[key] = newdata.addGods[key];
                        var vo = this.createGodVo(newdata.addGods[key], key);
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
                var _loop_1 = function (uuid) {
                    var index = this_1._godAry.findIndex(function (vo) {
                        return vo.uuid == uuid;
                    });
                    if (index != -1) {
                        this_1._godAry.splice(index, 1);
                    }
                };
                var this_1 = this;
                for (var _b = 0, _c = newdata.delGods; _b < _c.length; _b++) {
                    var uuid = _c[_b];
                    _loop_1(uuid);
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.GOD_CHANGE), 1);
            }
            if (newdata.addTimeItems) {
                for (var key_16 in newdata.addTimeItems) {
                    var uuid = Number(key_16);
                    if (this.bagTimeItemsObj[uuid]) {
                        logerror("道具重复下发：", uuid);
                        continue;
                    }
                    var obj = this.bagTimeItemsObj[uuid] = newdata.addTimeItems[uuid];
                    game.BagModel.getInstance().updateLimitTimeRes(uuid, game.LIMITTIMETYPE.ADD, newdata.addTimeItems[uuid]);
                    var vo = new LimitItemVo(uuid, Number(obj.limitTime), obj.templateId, 1);
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
                for (var k = 0; k < newdata.delTimeItems.length; k++) {
                    var delId = Number(newdata.delTimeItems[k]);
                    if (this.bagTimeItemsObj.hasOwnProperty(delId)) {
                        game.BagModel.getInstance().updateLimitTimeRes(delId, game.LIMITTIMETYPE.DEL);
                        var vo = new LimitItemVo(delId, Number(this.bagTimeItemsObj[delId].limitTime), Number(this.bagTimeItemsObj[delId].templateId), 0);
                        dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_ITEM), vo); //数目<=0 ,则为删除
                        game.removeTimeItem2Group(delId);
                        delete this.bagTimeItemsObj[delId];
                    }
                }
                dispatchEvt(new game.ResEvent(game.ResEvent.PROP_CHANGE));
            }
        };
        Hero.prototype.modifyCopyAwardCount = function ($newdata) {
            if (!$newdata)
                return;
            // 更新公会副本通关领取次数
            if ($newdata.modifyCopyAwardCount) {
                for (var id in $newdata.modifyCopyAwardCount) {
                    this.guildCopyAwardInfo[id] = $newdata.modifyCopyAwardCount[id];
                }
            }
        };
        Hero.prototype.refreshres = function ($dataAry, $isadd) {
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
                        var oldVipScore = this.vipScore;
                        this.vipScore = $isadd ? (this.vipScore + value) : (this.vipScore - value);
                        UIUtil.saveVipupData(oldVipScore, this.vipScore);
                        break;
                    case iface.tb_prop.resTypeKey.rechargeDmd:
                        this.diamond = $isadd ? (this.diamond + value) : (this.diamond - value);
                        break;
                }
            }
        };
        /** 计算等级 */
        Hero.prototype.calculateLv = function () {
            //经验已经累加了
            var maxlev = TableData.getInstance().getTableByName(TableData.tb_role).maxId;
            var isup = false;
            var oldlev = this.level;
            var uplev = true;
            game.HudModel.getInstance().oldUserLv = this.level;
            while (uplev && this.level < maxlev) {
                var tabrole = tb.TB_role.get_TB_rolenById(this.level);
                if (tabrole && this.exp >= tabrole.exp) {
                    isup = true;
                    this.exp -= tabrole.exp;
                    this.level = Math.min(maxlev, (this.level + 1));
                }
                else {
                    uplev = false;
                }
            }
            if (isup) {
                var tabnewrole = tb.TB_role.get_TB_rolenById(this.level);
                var taboldrole = tb.TB_role.get_TB_rolenById(oldlev);
                UIMgr.showUI(UIConst.LevelUpView);
                dispatchEvt(new game.ResEvent(game.ResEvent.ROLE_LEVEL_CHANGE));
                var sinfo = window.platform.serverInfo;
                BingoSDK.gameReport("upgrade", this.playerId, this.accountName, sinfo.serverId, sinfo.srv_name, { level: this.level, vip: this.vip, charge: App.hero.welfare.rechargeSum });
            }
        };
        /**更新布阵信息 */
        Hero.prototype.refreshLineUp = function ($args) {
            var type;
            for (var key in $args) {
                type = Number(key);
                this.lineupInfo[type] = $args[key];
            }
            this.fightState(type);
            if (type == iface.tb_prop.lineupTypeKey.attack) {
                game.registerGodAndEquipGroup();
            }
            dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE));
            dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
        };
        /**
         * 英雄上阵状态改变
         * @param type -1全部 1攻击 2防守
         */
        Hero.prototype.fightState = function ($type) {
            if ($type === void 0) { $type = -1; }
            if ($type == -1) {
                this.setlineUpState2GodList(iface.tb_prop.lineupTypeKey.attack);
                this.setlineUpState2GodList(iface.tb_prop.lineupTypeKey.expedition);
            }
            else {
                this.setlineUpState2GodList($type);
            }
        };
        Hero.prototype.setlineUpState2GodList = function ($type) {
            var list = this.lineupInfo[$type];
            if (!list || list.length == 0) {
                return;
            }
            for (var i = 0; i < this._godAry.length; i++) {
                this.lineUpHasGod(list, this._godAry[i], $type);
            }
            //阵营加成变化
            game.GodModel.getInstance().onAttackLineChange($type);
        };
        Hero.prototype.lineUpHasGod = function (list, god, $lineType) {
            var isflag = false;
            for (var key in list) {
                if (god.uuid == list[key]) {
                    isflag = true;
                    if ($lineType == iface.tb_prop.lineupTypeKey.attack) {
                        god.isAttackFight = true;
                        god.local[0] = Number(key);
                    }
                    else if ($lineType == iface.tb_prop.lineupTypeKey.expedition) {
                        god.isYuanzhengFight = true;
                        god.local[2] = Number(key);
                    }
                }
            }
            if (!isflag) {
                if ($lineType == iface.tb_prop.lineupTypeKey.attack) {
                    god.isAttackFight = false;
                    god.local[0] = 99999;
                }
                else if ($lineType == iface.tb_prop.lineupTypeKey.expedition) {
                    god.isYuanzhengFight = false;
                    god.local[2] = 99999;
                }
            }
        };
        /**
         * 获得上阵的英雄id数组
         * includeEmpty：是否包括空白位置
         */
        Hero.prototype.getLineUpTeamIds = function ($type, includeEmpty) {
            if (includeEmpty === void 0) { includeEmpty = false; }
            var teamAry = [];
            var ary = this.lineupInfo[$type];
            if (ary && ary.length > 0) {
                for (var i = 0; i < 6; i++) {
                    var uuid = ary[i];
                    if (uuid) {
                        teamAry.push(uuid);
                    }
                    else {
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
        };
        // public getTestTeam(){
        // 	return [this._godAry[0],this._godAry[1],this._godAry[2],this._godAry[3],this._godAry[4],this._godAry[5]];
        // }
        /**
         * 获得上阵的英雄id数组
         * includeEmpty：是否包括空白位置
         */
        Hero.prototype.getLineUpTeam = function ($type, includeEmpty) {
            if (includeEmpty === void 0) { includeEmpty = false; }
            var teamAry = [];
            var taglineUp = this.lineupInfo[$type];
            if (taglineUp) {
                var lineUpKeys = Object.keys(taglineUp);
                var aidTag = game.YuanzhengModel.getInstance().getAidTag();
                for (var k = 0; k < 6; k++) {
                    if (lineUpKeys.length > k) {
                        var uuid = taglineUp[lineUpKeys[k]];
                        if (aidTag && Number(uuid) < 0 && aidTag.uuid == uuid) {
                            //兼容失落遗迹援助
                            teamAry.push(aidTag);
                            continue;
                        }
                        if (uuid) {
                            var vo = this.getGodVoById(uuid);
                            if (!vo) {
                                logerror("don`t find lineUpGod");
                                continue;
                            }
                            teamAry.push(vo);
                        }
                        else {
                            if (includeEmpty) {
                                // null
                                teamAry.push(null);
                            }
                        }
                    }
                    else {
                        if (includeEmpty) {
                            // null
                            teamAry.push(null);
                        }
                    }
                }
            }
            else {
                if (includeEmpty) {
                    teamAry = [null, null, null, null, null, null];
                }
            }
            return teamAry;
        };
        /**
         * 上阵列表是否为空
         * @param type
         */
        Hero.prototype.hasLineUp = function ($type) {
            if (this.lineupInfo[$type]) {
                for (var key in this.lineupInfo[$type]) {
                    var uuid = this.lineupInfo[$type][key];
                    if (uuid) {
                        return true;
                    }
                }
            }
            return false;
        };
        /** 是否在阵容里 */
        Hero.prototype.isInLineup = function (gid, $type) {
            var gids = this.getLineUpTeamIds($type);
            return gids.indexOf(gid) != -1;
        };
        Hero.prototype.refreshbag = function ($dataAry, $isadd) {
            for (var key in $dataAry) {
                if ($dataAry.hasOwnProperty(key)) {
                    var val = 0;
                    if (this.bagItemsObj.hasOwnProperty(key)) {
                        val = this.bagItemsObj[key];
                    }
                    var nval = Number($dataAry[key]);
                    if ($isadd) {
                        this.bagItemsObj[key] = val + nval;
                    }
                    else {
                        this.bagItemsObj[key] = Math.max(0, (val - nval));
                    }
                    val = this.bagItemsObj[key];
                    var nkey = Number(key);
                    game.BagModel.getInstance().updateBagObj(nkey, val);
                    var vo = App.hero.createItemVo(val, nkey);
                    dispatchEvt(new game.BagEvent(game.BagEvent.CHANGE_ITEM), vo);
                }
            }
        };
        Hero.prototype.getBagItemNum = function (key) {
            if (key == iface.tb_prop.resTypeKey.gold) {
                return App.hero.gold;
            }
            else if (key == iface.tb_prop.resTypeKey.diamond) {
                return App.hero.diamond;
            }
            else if (key == iface.tb_prop.resTypeKey.godExp) {
                return App.hero.godExp;
            }
            else if (key == iface.tb_prop.resTypeKey.convertDust) {
                return App.hero.convertDust;
            }
            else if (key == iface.tb_prop.resTypeKey.legendChip) {
                return App.hero.legendChip;
            }
            else if (this.bagItemsObj && this.bagItemsObj[key]) {
                return this.bagItemsObj[key];
            }
            else {
                var tbItem = tb.TB_item.get_TB_itemById(key);
                if (tbItem && tbItem.type == iface.tb_prop.itemTypeKey.gemstone) {
                    return game.GemstoneUtils.getOwnNum(tbItem.ID);
                }
            }
            return 0;
        };
        /**
         * type -1:全部 其余：排除怪物表类型的怪
         */
        Hero.prototype.getGodAry = function ($type, $lineUpType) {
            if ($type === void 0) { $type = -1; }
            if ($lineUpType === void 0) { $lineUpType = -1; }
            return this.sortGodList($lineUpType, $type);
        };
        /** 是否激活神器 */
        Hero.prototype.isActiveArtifact = function (id) {
            return this.artifactInfo && this.artifactInfo.hasOwnProperty(id.toString());
        };
        /** 是否激活神器 */
        Hero.prototype.isActiveArtifactAttr = function () {
            if (this.artifactInfo) {
                var artifactTemps = tb.TB_artifact.get_TB_artifact();
                for (var i = 0; i < artifactTemps.length; i++) {
                    if (this.isActiveArtifact(artifactTemps[i].ID))
                        return true;
                }
            }
            return false;
        };
        /**在某个阵容是否已穿戴 */
        Hero.prototype.isWearArtifact = function (id, type) {
            if (type === void 0) { type = 0; }
            var key = type.toString();
            if (type == 0) {
                for (var i = 1; i < 4; i++) {
                    key = i.toString();
                    if (this.lineupArtifactInfo.hasOwnProperty(key) && this.lineupArtifactInfo[key] == id) {
                        return true;
                    }
                }
                return false;
            }
            return this.lineupArtifactInfo.hasOwnProperty(key) && this.lineupArtifactInfo[key] == id;
        };
        //获取某阵容穿戴的神器id
        Hero.prototype.getArtifactIDByLineType = function (linetype) {
            if (linetype === void 0) { linetype = 1; }
            var id = this.lineupArtifactInfo.hasOwnProperty(linetype) ? Number(this.lineupArtifactInfo[linetype]) : 0;
            return id;
        };
        //是否通关副本
        Hero.prototype.isPassRuneCopyInfo = function (copyinfoid, chapter) {
            if (App.hero.runeCopyInfo.hasOwnProperty(chapter)) {
                var passid = Number(App.hero.runeCopyInfo[chapter]);
                return passid >= copyinfoid;
            }
            return false;
        };
        //更新每日副本
        Hero.prototype.updateDailyCopy = function (data) {
            if (data.dailyCopyIds != null || data.dailyCopyId != null) {
                if (data.dailyCopyIds != null) {
                    this.dailyCopyIds.push(data.dailyCopyIds);
                }
                if (data.dailyCopyId != null) {
                    this.dailyCopyIds.push(data.dailyCopyId);
                }
                dispatchEvt(new game.DailyEvent(game.DailyEvent.DAILY_COPY_ID_CHANGE));
            }
        };
        //是否通关每日副本
        Hero.prototype.isPassDailyCopy = function (id) {
            return this.dailyCopyIds.indexOf(id) != -1;
        };
        Hero.prototype.getMarketFreeInfo = function () {
            var setTemp = tb.TB_market_set.getItemById(1);
            var serverTime = App.serverTimeSecond;
            var count = this.getOverplusValue(iface.tb_prop.overplusTypeKey.marketRefreshNum);
            if (count >= setTemp.reply_num || this.marketRefreshReplyTime == 0 || serverTime <= this.marketRefreshReplyTime) {
                this._marketFreeInfo[0] = count;
                this._marketFreeInfo[1] = serverTime + setTemp.reply_interval;
                return this._marketFreeInfo;
            }
            var replyTime = serverTime - this.marketRefreshReplyTime;
            var replyCount = Math.floor(replyTime / setTemp.reply_interval);
            count += replyCount;
            if (count > setTemp.reply_num)
                count = setTemp.reply_num;
            this._marketFreeInfo[0] = count;
            this._marketFreeInfo[1] = this.marketRefreshReplyTime + (replyCount + 1) * setTemp.reply_interval;
            return this._marketFreeInfo;
        };
        //集市钻石刷新次数
        Hero.prototype.getMarkeyBuyRefreshCount = function () {
            return this.getlimitValue(iface.tb_prop.limitTypeKey.buyMarketRefreshNum);
        };
        //===============================主线任务、每日任务、成就==========================
        /** 初始化任务列表 */
        Hero.prototype.initTasks = function () {
            for (var id in this.tasks.curTasks) {
                this.tasks.curTasks[id]['id'] = parseInt(id);
            }
            for (var id in this.tasks.dailyTasks) {
                this.tasks.dailyTasks[id]['id'] = parseInt(id);
            }
            this.tasks.guideStep = this.tasks.guideStep ? this.tasks.guideStep : 0;
            this.tasks.guideWeakStep = this.tasks.guideWeakStep ? this.tasks.guideWeakStep : [];
            game.TaskModel.getInstance().updateHonorList();
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA));
        };
        /**
         * 更新任务数据
         * @param changeTasks
         */
        Hero.prototype.refreshTasks = function (changeTasks) {
            var curTasks = this.tasks.curTasks;
            var doneTasks = this.tasks.doneTasks;
            var updateAchiv = false;
            var updateLimit = false;
            for (var id in changeTasks) {
                var tbTask = tb.TB_task.getTaskById(parseInt(id));
                if (!tbTask)
                    return;
                if (tbTask.type == iface.tb_prop.taskTypeKey.achievement) {
                    updateAchiv = true;
                }
                else if (tbTask.type == iface.tb_prop.taskTypeKey.limitTime) {
                    updateLimit = true;
                }
                if (curTasks.hasOwnProperty(id)) {
                    for (var key in changeTasks[id]) {
                        curTasks[id][key] = changeTasks[id][key];
                    }
                }
                else {
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
        };
        /** 添加完成的任务id */
        Hero.prototype.addDoneTask = function (id) {
            var doneTasks = this.tasks.doneTasks;
            if (!doneTasks) {
                doneTasks = [];
            }
            if (doneTasks.indexOf(id) == -1) {
                doneTasks.push(id);
            }
            var curTasks = this.tasks.curTasks;
            if (curTasks.hasOwnProperty(id)) {
                delete curTasks[id];
            }
            var tbTask = tb.TB_task.getTaskById(id);
            if (tbTask.type == iface.tb_prop.taskTypeKey.achievement) {
                game.TaskModel.getInstance().updateHonorList();
                dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA));
            }
        };
        /** 更新每日任务数据 */
        Hero.prototype.refreshDailyTask = function (changeTasks) {
            var curTasks = this.tasks.dailyTasks;
            for (var id in changeTasks) {
                for (var key in changeTasks[id]) {
                    curTasks[id][key] = changeTasks[id][key];
                }
            }
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_DAILY_TASK));
        };
        /** 更新日常任务活跃度 */
        Hero.prototype.updateDailyLivess = function ($data) {
            if ($data && $data.hasOwnProperty('liveness')) {
                this.tasks.liveness = $data.liveness;
                dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_LIVENESS_DATA));
            }
        };
        /** 添加日常完成的任务id */
        Hero.prototype.addDoneDailyTask = function (id) {
            var dailyTasks = this.tasks.dailyTasks;
            for (var oid in dailyTasks) {
                if (parseInt(oid) == id) {
                    dailyTasks[id]['done'] = true;
                    break;
                }
            }
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_DAILY_TASK));
        };
        /**
         * 获取每日限制类型的值
         * @param type iface.tb_prop.limitTypeKey
         */
        Hero.prototype.getlimitValue = function (type) {
            return this.limitInfo[type] ? this.limitInfo[type] : 0;
        };
        /**
         * 获取剩余次数
         */
        Hero.prototype.getOverplusValue = function (type) {
            return this.overplusInfo[type] ? this.overplusInfo[type] : 0;
        };
        Hero.prototype.setOverplusValue = function (type, value) {
            this.overplusInfo[type] = value;
            dispatchEvt(new game.ResEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE));
        };
        /**
         * 获取出战英雄的模型列表
         * @param num
         */
        Hero.prototype.chuzhanModels = function (num, $type) {
            if ($type === void 0) { $type = iface.tb_prop.lineupTypeKey.attack; }
            var list = new Array();
            var godlist = this.getLineUpTeamIds($type);
            if (!godlist || godlist.length == 0 || !godlist[0]) {
                return [];
            }
            //创建出战英雄
            for (var i = 0, len = godlist.length; i < len; i++) {
                var godId = godlist[i];
                //取出战的前面三只
                if (i < num) {
                    var element = this.getGodVoById(godId);
                    if (element) {
                        list.push(element.tab_god.model);
                    }
                }
            }
            return list;
        };
        /** 更新挂机战斗数据 -- 主线关卡及奖励等 */
        Hero.prototype.updateGuajiData = function (res) {
            if (!res)
                return;
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
        };
        /** 更新远征副本数据 */
        Hero.prototype.updateCopyInfo = function (res) {
            if (!res)
                return;
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
                var selfHpInfo = this.copyInfo.expeditionSelfHpInfo;
                for (var key in res['modifySelfHpInfo']) {
                    selfHpInfo[key] = res['modifySelfHpInfo'][key];
                }
            }
            if (res.hasOwnProperty('modifyRewardInfo')) {
                var selfHpInfo = this.copyInfo.expeditionRewardInfo;
                for (var key in res['modifyRewardInfo']) {
                    selfHpInfo[key] = res['modifyRewardInfo'][key];
                }
            }
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.UPDATE_VIEW));
        };
        //是否在黑名单里
        Hero.prototype.isInBlockList = function (playerId) {
            return this.blockLists.indexOf(playerId) != -1;
        };
        //增加黑名单
        Hero.prototype.addBlockList = function (playerId) {
            if (!playerId || playerId == "") {
                return false;
            }
            this.blockLists.push(playerId);
            return true;
        };
        /** 移除黑名单 */
        Hero.prototype.removeBlockListById = function (playerId) {
            if (!playerId || playerId == "") {
                return false;
            }
            var index = this.blockLists.indexOf(playerId);
            if (index == -1) {
                return false;
            }
            this.blockLists.splice(index, 1);
            return true;
        };
        /** 移除黑名单列表 */
        Hero.prototype.removeBlackList = function (ids) {
            if (!ids || !Array.isArray(ids))
                return;
            for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                var id = ids_1[_i];
                this.removeBlockListById(id);
            }
        };
        /**
         * 寻找最近的一个不可领取的道具，记录其时间
         */
        Hero.prototype.setLimitBoxMintime = function () {
            this._mintimeBox = -1;
            for (var key in this.bagTimeItemsObj) {
                var element = this.bagTimeItemsObj[key];
                if (element.limitTime > App.getServerTime()) {
                    this._mintimeBox = this._mintimeBox == -1 ? element.limitTime : Math.min(element.limitTime, this._mintimeBox);
                }
            }
        };
        Hero.prototype.getFirstUse = function (id) {
            return this.firstIds && this.firstIds.indexOf(id) != -1;
        };
        return Hero;
    }());
    common.Hero = Hero;
})(common || (common = {}));
