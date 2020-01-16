/**
* name
*/
var game;
(function (game) {
    /** 福利类型 */
    var WelfareType;
    (function (WelfareType) {
        WelfareType[WelfareType["daySign"] = 1] = "daySign";
        WelfareType[WelfareType["dayLibao"] = 2] = "dayLibao";
        WelfareType[WelfareType["weekLibao"] = 3] = "weekLibao";
        WelfareType[WelfareType["monthLibao"] = 4] = "monthLibao";
        WelfareType[WelfareType["monthSign"] = 5] = "monthSign";
        WelfareType[WelfareType["xuyuan"] = 6] = "xuyuan";
        WelfareType[WelfareType["yueka"] = 7] = "yueka";
        WelfareType[WelfareType["dengjiJijin"] = 8] = "dengjiJijin";
        WelfareType[WelfareType["dengjiLibao"] = 9] = "dengjiLibao";
        WelfareType[WelfareType["duihuan"] = 10] = "duihuan";
    })(WelfareType = game.WelfareType || (game.WelfareType = {}));
    var HuodongModel = /** @class */ (function () {
        function HuodongModel() {
            /**当前可以补签的日期 */
            this.canBuqianDate = 0;
            /**是否显示登入礼包入口 */
            this._isShowLoginGift = [];
            this._queueDialog = [];
            this.welfareTabItemLabel = [
                [WelfareType.daySign, "fuli_meiri", "mrqd_fl_icon", '每日签到'],
                [WelfareType.monthSign, "fuli_qiandao", "myqd_fl_icon", '每月签到'],
                [WelfareType.dengjiLibao, "fili_dengji", "djlb_fl_icon", '等级礼包'],
                [WelfareType.xuyuan, "fuli_xuyuan", "xy_fl_icon", '许愿'],
                [WelfareType.duihuan, "", "dh_fl_icon", '兑换']
            ];
            this.payTabItemLabel = [
                [WelfareType.dayLibao, "fuli_daylibao", "meiri", '每日礼包'],
                [WelfareType.weekLibao, "fuli_weeklibao", "meizhou", '每周礼包'],
                [WelfareType.monthLibao, "fuli_monthlibao", "meiyue", '每月礼包'],
                [WelfareType.dengjiJijin, "fuli_jijin", "djjj_fl_icon", "等级基金"],
                [WelfareType.yueka, "fuli_yueka", "yk_fl_icon", '月卡']
            ];
            this.initLoginGift();
        }
        HuodongModel.getRewardsInfo = function (idx, vip) {
            if (idx == 1) {
                return LanMgr.getLan("", 10469, vip);
            }
            else {
                return this.rewards[idx];
            }
        };
        HuodongModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new HuodongModel();
            }
            return this._instance;
        };
        /**累计签到数 */
        HuodongModel.getTotalSignNum = function () {
            var signDays = 0;
            for (var i in App.hero.welfare.dailySignIn) {
                if (App.hero.welfare.dailySignIn[i] != 0) {
                    signDays++;
                }
            }
            return signDays;
        };
        /**补签次数 */
        HuodongModel.getBuqianNum = function () {
            var num = 0;
            for (var i in App.hero.welfare.dailySignIn) {
                if (App.hero.welfare.dailySignIn[i] == iface.tb_prop.signInTypeKey.supplement) {
                    num++;
                }
            }
            ;
            return num;
        };
        /**今日是否签到 */
        HuodongModel.isTodaySign = function () {
            var today = new Date(App.serverTimeSecond * 1000).getDate();
            return today == App.hero.welfare.todaySignIn;
        };
        /**补签消耗 */
        HuodongModel.getSignCost = function () {
            return tb.TB_game_set.get_TB_game_setById(1).sign_cost;
        };
        /**装备最大幸运值 */
        HuodongModel.getMaxEquipLucky = function () {
            return tb.TB_luck_equip_reward.get_TB_luck_equip_reward().pop().lucky;
        };
        /**是否在活动时间内 */
        HuodongModel.isOnActivatyTime = function () {
            return App.hero.welfare.luckEquipId > 0
                || App.hero.welfare.luckGodId > 0
                || App.hero.welfare.luckTreasureId > 0;
        };
        /**
         * 获得奖品tb
         * @param type View的tab.seclectIndex
         */
        HuodongModel.getBoxTb = function (type) {
            switch (type) {
                case TURNTABLE.ART: return tb.TB_luck_artifact_time.get_TB_luck_artifact_timeById();
                case TURNTABLE.EQUIP: return tb.TB_luck_equip.get_TB_luck_equip();
                case TURNTABLE.GOD: return tb.TB_luck_god.get_TB_luck_god();
                case TURNTABLE.WISH: return tb.TB_wish.get_TB_wish();
                default: return tb.TB_luck_god.get_TB_luck_god();
            }
        };
        /**
         * 获得的物品和抽奖停留位置
         * @param type View的tab.seclectIndex
         * @param ids 获得的物品ID[]
         */
        HuodongModel.getRewards = function (type, ids) {
            if (!ids)
                return;
            var tbs = ids.map(function (id) { return HuodongModel.getTbBytype(type, id); });
            var rewards = tbs.map(function (tb) { return new ItemVo(tb['item'][0], tb['item'][1]); });
            return { data: rewards, location: tbs[0]['location'] };
        };
        /**
         * 获得Tb数据
         * @param type View的tab.seclectIndex
         * @param id
         */
        HuodongModel.getTbBytype = function (type, id) {
            switch (type) {
                case TURNTABLE.ART: return tb.TB_luck_artifact.get_TB_luck_artifactById(id);
                case TURNTABLE.EQUIP: return tb.TB_luck_equip.get_TB_luck_equipById(id);
                case TURNTABLE.GOD: return tb.TB_luck_god.get_TB_luck_godById(id);
                case TURNTABLE.WISH: return tb.TB_wish.get_TB_wishById(id);
                default: return tb.TB_luck_god.get_TB_luck_godById(id);
            }
        };
        /**获得每日签到TB */
        HuodongModel.prototype.getSignTb = function () {
            var curId = (Math.floor((App.getServerTime() - App.hero.signInStartTime) /
                TimeConst.ONE_DAY_SEC) % tb.TB_activity_set.getTabSet().sign_cycle) + 1;
            //容错
            curId = Math.max(1, curId);
            return new ToSignVo(curId);
        };
        /**
         * 返回请求
         * @param type View的tab.seclectIndex
         */
        HuodongModel.prototype.getProtocol = function (type) {
            switch (type) {
                case 0: return Protocol.game_luck_buyluckGod;
                case 1: return Protocol.game_luck_buyluckEquip;
                case 2: return Protocol.game_luck_buyluckArt;
            }
            return null;
        };
        HuodongModel.prototype.getLuckEquipExtList = function () {
            if (!this._LuckEquipExtList) {
                this._LuckEquipExtList = [];
                var tbData = tb.TB_luck_equip_reward.get_TB_luck_equip_reward();
                for (var id in tbData) {
                    this._LuckEquipExtList.push(new LuckEquipExtData(tbData[id]));
                }
                this._LuckEquipExtList.sort(function (a, b) {
                    return a.tbReward.ID - b.tbReward.ID;
                });
            }
            return this._LuckEquipExtList;
        };
        // 时间转换
        HuodongModel.prototype.getTimeLb = function (type, time) {
            var openTime = new Date(App.hero.openSvrTime * 1000);
            openTime.setHours(0, 0, 0, 0);
            var openSvrTime = Math.floor(openTime.getTime() / 1000);
            var info = { startTime: 0, endTime: 0, rewardTime: '' };
            if (type === 0) {
                info.startTime = 0;
                info.endTime = 2544183919;
                if (time[2] != null) {
                    info.rewardTime = "1";
                }
            }
            else if (type === 2) {
                info.startTime = openSvrTime + 86400 * (time[0] - 1);
                info.endTime = openSvrTime + 86400 * time[1];
                // if (time[2] != null) {
                info.rewardTime = activityTime(App.getServerTime(), info.endTime);
                // }
            }
            else if (type === 1) {
                info.startTime = new Date(time[0].toString()).getTime() / 1000;
                info.endTime = new Date(time[1].toString()).getTime() / 1000;
                // if (time[2] != null) {
                info.rewardTime = new Date(time[0].toString()).toLocaleString();
                // }
            }
            return info.rewardTime;
        };
        HuodongModel.getRemainTimeByTemp = function (type, times) {
            var remainTime = 0;
            var serverTime = App.getServerTime();
            switch (type) {
                case this.TYPE_TIME_ZERO:
                    break;
                case this.TYPE_TIME_ONE:
                    break;
                case this.TYPE_TIME_TWO:
                    if (times && times.length > 1) {
                        var openTimeDate = new Date(App.hero.openSvrTime * 1000);
                        openTimeDate.setHours(0, 0, 0, 0);
                        var openZeroTime = Math.floor(openTimeDate.getTime() / 1000);
                        ; //开服当天零点时间（s)
                        var endDay = times[1];
                        remainTime = endDay * 86400 + openZeroTime - serverTime;
                    }
                    break;
            }
            return remainTime;
        };
        /**获得转盘记录 */
        HuodongModel.prototype.getRecordByType = function (type) {
            if (type == TURNTABLE.GOD && this.godRecord) {
                return this.godRecord;
            }
            else if (type == TURNTABLE.EQUIP && this.equipRecord) {
                return this.equipRecord;
            }
            else if (type == TURNTABLE.TREASURE && this.treasureRecord) {
                return this.treasureRecord;
            }
            else
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.GET_LUCKY_RECORD), type);
        };
        //获取幸运转盘活动id
        HuodongModel.getLuckIdByType = function (type) {
            switch (type) {
                case TURNTABLE.GOD: //神灵
                    return App.hero.welfare.luckGodId;
                case TURNTABLE.EQUIP: //装备
                    return App.hero.welfare.luckEquipId;
                case TURNTABLE.ART: //神器
                    return App.hero.welfare.luckArtId;
                case TURNTABLE.TREASURE: //宝物
                    return App.hero.welfare.luckTreasureId;
                default:
                    return 0;
            }
        };
        //获取幸运转盘幸运值
        HuodongModel.getLuckValueByType = function (type) {
            switch (type) {
                case TURNTABLE.GOD: //神灵
                    return App.hero.welfare.luckGodNum;
                case TURNTABLE.EQUIP: //装备
                    return App.hero.welfare.luckEquipNum;
                case TURNTABLE.ART: //神器
                    return 0;
                case TURNTABLE.TREASURE: //宝物
                    return App.hero.welfare.luckTreasureNum;
                default:
                    return 0;
            }
        };
        //获取幸运转盘免费次数
        HuodongModel.getLuckFreeCount = function (type) {
            var limitKey = 0;
            var temp;
            var id = this.getLuckIdByType(type);
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
            if (limitKey == 0 || !temp)
                return 0;
            var freecount = temp && temp['free_num'] ? temp['free_num'] : 0;
            return freecount - App.hero.getlimitValue(limitKey);
        };
        /**初始化可补签日期 */
        HuodongModel.prototype.initCanBuQianDate = function () {
            var curMonthDate = new Date(App.serverTimeSecond * 1000).getDate();
            var todaySign = curMonthDate == App.hero.welfare.todaySignIn;
            var buqianNum = tb.TB_game_set.get_TB_game_setById(1).add_sign - HuodongModel.getBuqianNum();
            if (curMonthDate == Object.keys(App.hero.welfare.dailySignIn).length || !todaySign || buqianNum <= 0) {
                this.canBuqianDate = 0;
                return;
            }
            for (var i = 1; i <= curMonthDate; i++) {
                if (i in App.hero.welfare.dailySignIn) {
                    continue;
                }
                this.canBuqianDate = i;
                break;
            }
        };
        /**检测登录礼包是否全部领取 */
        HuodongModel.prototype.sevenDaysPackIsAllGet = function () {
            /**当前登录能领取的所有礼包 */
            for (var i = 1; i < App.hero.welfare.totalLoginDay + 1; i++) {
                if (!(App.hero.welfare.loginGiftPack.hasOwnProperty(i))) {
                    return true;
                }
            }
            return false;
        };
        HuodongModel.prototype.isShowLoginGift = function (type) {
            return this._isShowLoginGift[type - 1];
        };
        HuodongModel.prototype.initLoginGift = function () {
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.TOTAL_LOGIN_DAY, this.updateLoginGift, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LOGIN_GIFT_RECEIVE, this.updateLoginGift, this);
            this._allTypeLoginGiftTemps = [];
            for (var i = 0; i < tb.TB_sevendays.TYPE_NUM; i++) {
                this._allTypeLoginGiftTemps[i] = tb.TB_sevendays.get_TB_sevendays(i + 1);
            }
            this.updateLoginGift();
        };
        HuodongModel.prototype.updateLoginGift = function () {
            var loginday = App.hero.welfare.totalLoginDay ? App.hero.welfare.totalLoginDay : 0;
            var giftReceiveInfo = App.hero.welfare.loginGiftPack ? App.hero.welfare.loginGiftPack : {};
            for (var i = 0; i < tb.TB_sevendays.TYPE_NUM; i++) {
                var lastday = (i + 1) * tb.TB_sevendays.TYPE_DAYS;
                var firstday = i * tb.TB_sevendays.TYPE_DAYS + 1;
                if (loginday < firstday) {
                    this._isShowLoginGift[i] = false;
                }
                else if (loginday < lastday) {
                    this._isShowLoginGift[i] = true;
                }
                else {
                    var sh = false;
                    var alltemps = this._allTypeLoginGiftTemps[i];
                    if (alltemps && alltemps.length > 0) {
                        for (var i_1 = 0; i_1 < alltemps.length; i_1++) {
                            var temp = alltemps[i_1];
                            if (temp.ID <= loginday && !giftReceiveInfo.hasOwnProperty(temp.ID)) {
                                sh = true;
                                break;
                            }
                        }
                    }
                    this._isShowLoginGift[i] = sh;
                }
            }
        };
        HuodongModel.prototype.autoOpenLoginGift = function () {
            if (game.GuideManager.isExecuteGuide())
                return;
            var loginday = App.hero.welfare.totalLoginDay ? App.hero.welfare.totalLoginDay : 0;
            var giftReceiveInfo = App.hero.welfare.loginGiftPack ? App.hero.welfare.loginGiftPack : {};
            for (var i = 0; i < tb.TB_sevendays.TYPE_NUM; i++) {
                for (var j = 0; j < tb.TB_sevendays.TYPE_DAYS; j++) {
                    var day = i * tb.TB_sevendays.TYPE_DAYS + 1 + j;
                    if (day <= loginday && !giftReceiveInfo.hasOwnProperty(day)) {
                        var uin = UIConst.LoginGiftView;
                        this._queueDialog.push({ uiname: uin, data: [i + 1], isAlert: false });
                        break;
                    }
                }
            }
            //满收益提示
            if (App.hero.lastGetAfkTime != 0) {
                var time = App.getServerTime() - App.hero.lastGetAfkTime;
                var maxtime = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime);
                if (time >= maxtime) {
                    this._queueDialog.push({ data: { info: LanMgr.getLan("", 10493), yesstr: LanMgr.getLan("", 10042), type: 1 }, isAlert: true });
                }
            }
            this.checkOpenLoginGift();
        };
        HuodongModel.prototype.checkOpenLoginGift = function () {
            var _this = this;
            if (this._queueDialog.length > 0) {
                var dialog_1 = this._queueDialog.shift();
                if (dialog_1.isAlert) {
                    common.AlertBox.showAlert({
                        text: dialog_1.data.info,
                        confirmCb: function () {
                            if (dialog_1.data.type == 1) {
                                dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, [ModuleConst.FIGHT]));
                            }
                        },
                        closeCb: function () {
                            Laya.timer.callLater(_this, _this.checkOpenLoginGift);
                        },
                        yes: dialog_1.data.yesstr
                    });
                }
                else {
                    UIMgr.showUI(dialog_1.uiname, dialog_1.data);
                }
            }
        };
        /**检测等级礼包是否全部领取 */
        HuodongModel.prototype.levelPackIsAllGet = function () {
            var tbLevel = tb.TB_level.get_TB_level();
            for (var i in tbLevel) {
                /**当前等级能领取的所有礼包 */
                if (App.hero.level >= tbLevel[i].level) {
                    if (!(App.hero.welfare.levelGiftPack.hasOwnProperty(tbLevel[i].ID))) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**等级基金红点 */
        HuodongModel.prototype.ratingFundRedPoint = function () {
            if (App.hero.welfare.buyLevelFund == 0) {
                var buyCondition = tb.TB_activity_set.getTabSet().level_fund_buy;
                return App.hero.vip >= buyCondition[0] && App.hero.diamond >= buyCondition[1];
            }
            var data = tb.TB_level_fund.get_TB_level_fund();
            for (var i in data) {
                if (App.hero.level >= data[i].level) {
                    if (!(App.hero.welfare.levelFundAward.hasOwnProperty(data[i].ID))) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**每日签到红点 */
        HuodongModel.prototype.everyDaySignRP = function () {
            var vo = HuodongModel.getInstance().getSignTb();
            for (var i = 0; i < 3; i++) {
                if (vo.canReward(i) && i != 2) {
                    return true;
                }
                else if (vo.canReward(i) && i == 2 && App.hero.vip >= 3) {
                    return true;
                }
            }
            return false;
        };
        /**装备寻宝额外奖励红点 */
        HuodongModel.prototype.luckyEquipExtRewardRP = function () {
            if (App.hero.welfare.luckEquipId == 0)
                return false;
            var datas = HuodongModel.getInstance().getLuckEquipExtList();
            return datas.some(function (vo) { return vo.canReward(); });
        };
        //整点刷新活动
        HuodongModel.prototype.refreshActivity = function () {
            if (UIMgr.hasStage(UIConst.LuckyTurnView)) {
                var view = UIMgr.getUIByName(UIConst.LuckyTurnView);
                if (view)
                    view.updateTab();
            }
        };
        /** 是否可以领取内侧返利 */
        HuodongModel.prototype.canRewardTestRebate = function () {
            var recharge = tb.TB_recharge_rebate.getTBItemById(App.hero.accountName);
            return recharge && recharge.recharge_total > 0 && App.hero.welfare.rechargeRebate == 0;
        };
        HuodongModel.rewards = [
            LanMgr.getLan("", 10470),
            LanMgr.getLan("", 10471),
            LanMgr.getLan("", 10472)
        ];
        //获取剩余时间
        HuodongModel.TYPE_TIME_ZERO = 0;
        HuodongModel.TYPE_TIME_ONE = 1;
        HuodongModel.TYPE_TIME_TWO = 2; //开服时间
        HuodongModel.LuckRedNames = ["lucky_god", "lucky_equip_free", "lucky_art", "", "lucky_treasure_free"];
        return HuodongModel;
    }());
    game.HuodongModel = HuodongModel;
    var ToSignVo = /** @class */ (function () {
        function ToSignVo(id) {
            this.rewardArr = [];
            this._id = id;
            this.initReward();
        }
        Object.defineProperty(ToSignVo.prototype, "tb", {
            get: function () {
                return tb.TB_recharge_sign.get_TB_recharge_signById(this._id);
            },
            enumerable: true,
            configurable: true
        });
        ToSignVo.prototype.initReward = function () {
            var reward = this.tb.reward.map(function (data) {
                return new ItemVo(data[0], data[1]);
            });
            var vipReward = this.tb.vip_reward.map(function (data) {
                return new ItemVo(data[0], data[1]);
            });
            var rechargeReward = this.tb.recharge_reward.map(function (data) {
                return new ItemVo(data[0], data[1]);
            });
            this.rewardArr.push(reward, vipReward, rechargeReward);
        };
        /**是够已领取 */
        ToSignVo.prototype.isReward = function (type) {
            if (type == 1)
                return App.hero.welfare.signInVipCount == 1;
            if (type == 0)
                return App.hero.welfare.signInLoginCount == 1;
            if (type == 2)
                return App.hero.welfare.signInRechargeCount == 1;
        };
        /**是否达成 */
        ToSignVo.prototype.isFinish = function (type) {
            if (type == 1)
                return App.hero.vip >= this.tb.vip_level;
            if (type == 0)
                return !(App.hero.welfare.signInLoginCount == 1);
            if (type == 2)
                return App.hero.welfare.dailyRechargeSum >= this.tb.recharge_num;
        };
        /**是否可领取 */
        ToSignVo.prototype.canReward = function (type) {
            return !this.isReward(type) && this.isFinish(type);
        };
        return ToSignVo;
    }());
    game.ToSignVo = ToSignVo;
    /** 七日额外奖励数据 */
    var LuckEquipExtData = /** @class */ (function () {
        function LuckEquipExtData(tb) {
            var _this = this;
            this.tbReward = tb;
            this.event = function () { dispatchEvt(new game.HuodongEvent(game.HuodongEvent.GET_LUCKEQUIP_REWARD), _this.tbReward.ID); };
        }
        /** 是否完成 */
        LuckEquipExtData.prototype.isFinish = function () {
            return App.hero.welfare.luckEquipNum >= this.tbReward.lucky;
        };
        /** 是否已领取 */
        LuckEquipExtData.prototype.isReward = function () {
            return App.hero.welfare.luckEquipAward[this.tbReward.ID] ? true : false;
        };
        /**奖励 */
        LuckEquipExtData.prototype.getReward = function () {
            return this.tbReward.reward.map(function (vo) { return new ItemVo(vo[0], vo[1]); });
        };
        /** 是否可领取 */
        LuckEquipExtData.prototype.canReward = function () {
            return this.isFinish() && !this.isReward();
        };
        return LuckEquipExtData;
    }());
    game.LuckEquipExtData = LuckEquipExtData;
})(game || (game = {}));
