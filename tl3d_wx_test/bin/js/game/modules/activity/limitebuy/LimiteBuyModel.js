var game;
(function (game) {
    var LimiteBuyType;
    (function (LimiteBuyType) {
        LimiteBuyType[LimiteBuyType["summon"] = 1] = "summon";
        LimiteBuyType[LimiteBuyType["group"] = 2] = "group"; // 限时团购
    })(LimiteBuyType = game.LimiteBuyType || (game.LimiteBuyType = {}));
    var LimiteBuyModel = /** @class */ (function () {
        function LimiteBuyModel() {
            //限时团购
            this.grpBuyTodayNums = null; // 限时团购当天购买次数 {tpltId: num}
            this.grpBuyTotalNums = null; // 限时团购全服总购买次数 {tpltId: num}
        }
        LimiteBuyModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new LimiteBuyModel();
            }
            return this._instance;
        };
        LimiteBuyModel.prototype.getgrpBuyTodayNums = function (id) {
            return this.grpBuyTodayNums[id] || 0;
        };
        LimiteBuyModel.prototype.getgrpBuyTotalNums = function (id) {
            return this.grpBuyTotalNums[id] || 0;
        };
        LimiteBuyModel.prototype.initModel = function () {
            this.type = this.getCurSummonType();
            this.CurGroupType = this.getCurGroupType();
            this.Lim_Group_Rp = this.isOpenLimiteGroup() ? true : false;
            this.Lim_Summon_Rp = this.isOpenLimiteSummon() ? true : false;
            dispatchEvt(new game.LimiteBuyEvent(game.LimiteBuyEvent.UPDATE_RP));
        };
        /** 限时热购是否有活动开启 */
        LimiteBuyModel.prototype.isOpen = function () {
            return this.isOpenLimiteGroup() || this.isOpenLimiteSummon();
        };
        /** 主红点规则 */
        LimiteBuyModel.prototype.isVisible = function () {
            return this.isOpen() && (this.Lim_Group_Rp || this.Lim_Summon_Rp || this.haveBoxReward() || this.haveFreeTimes());
        };
        //-------------------------------------------------------------------------------------------限时召唤
        /** 限时召唤是否开启 */
        LimiteBuyModel.prototype.isOpenLimiteSummon = function () {
            return this.getCurSummonType() != null;
        };
        //首先获得当前进行的限时召唤时间表的id数组
        LimiteBuyModel.prototype.getCurSummonType = function () {
            var arr = [];
            var tbSummonTime = tb.TB_limit_time.get_TB_limit_time();
            var curTime = App.getServerTime();
            var opensTime = App.getOpenServerTime();
            for (var _i = 0, tbSummonTime_1 = tbSummonTime; _i < tbSummonTime_1.length; _i++) {
                var obj = tbSummonTime_1[_i];
                if (obj.type == 0) {
                    arr.push(obj.ID);
                    continue;
                }
                else if (obj.type == 1) {
                    var startDate = new Date(obj.time[0]);
                    var startSecond = startDate.getTime();
                    var endDate = new Date(obj.time[1]);
                    var endSecond = endDate.getTime();
                    if (startSecond < App.serverTime && endSecond > App.serverTime) {
                        arr.push(obj.ID);
                        continue;
                    }
                }
                else if (obj.type == 2) {
                    var startDate = Number(obj.time[0]) - 1;
                    var endDate = Number(obj.time[1]);
                    if ((curTime < (opensTime + endDate * TimeConst.ONE_DAY_SEC))
                        && (curTime >= (opensTime + startDate * TimeConst.ONE_DAY_SEC))) {
                        arr.push(obj.ID);
                        continue;
                    }
                }
            }
            return arr[0];
        };
        /** 限时召唤时间表 */
        LimiteBuyModel.prototype.getCurSummonSetList = function () {
            if (!this.type)
                this.type = this.getCurSummonType();
            var tbdata = tb.TB_limit_time.get_TB_limit_timeById(this.type);
            //todo ios兼容临时处理，这里ios解析对象会为空
            if (!tbdata) {
                tbdata = new tb.TB_limit_time();
                tbdata.ID = 0;
                tbdata.type = 0;
                tbdata.time = new Array();
                tbdata.free_num = 0;
                tbdata.buy_cost = new Array();
                tbdata.guaranteed_num = 0;
                tbdata.buy_cost = new Array();
                tbdata.model_show = 0;
                logdebug("TB_limit_time 为空", this, this.type);
            }
            return tbdata;
        };
        /** 通过type获取到当前的限时召唤排名列表 */
        LimiteBuyModel.prototype.getCurSummonRankList = function () {
            if (!this.type)
                this.type = this.getCurSummonType();
            return tb.TB_summon_rank.get_TB_summon_rankByType(this.type);
        };
        /** 通过type获取到当前的限时召唤宝箱列表 */
        LimiteBuyModel.prototype.getCurSummonBoxList = function () {
            if (!this.type)
                this.type = this.getCurSummonType();
            return tb.TB_summon_box.get_TB_summon_boxByType(this.type);
        };
        /** 传入页面的dataSource数据 */
        LimiteBuyModel.prototype.getCurSummonList = function () {
            return new game.limiteSummonVo(this.getCurSummonSetList(), this.getCurSummonRankList(), this.getCurSummonBoxList());
        };
        /** 通过id获取到当前的限时召唤的剩余时间 返回剩余时间 */
        LimiteBuyModel.prototype.getSummonRemainTime = function (id) {
            var tbSummonTime = tb.TB_limit_time.get_TB_limit_timeById(id);
            if (tbSummonTime && tbSummonTime.type == 1) {
                var endDate = new Date(tbSummonTime.time[1]);
                var endSecond = endDate.getTime() / 1000;
                return activityTime(endSecond, App.serverTimeSecond);
            }
            else if (tbSummonTime && tbSummonTime.type == 2) {
                var endTime = Number(tbSummonTime.time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime();
                return activityTime(endTime, App.serverTimeSecond);
            }
            return "";
        };
        /** 判断该宝箱是否能领取 */
        LimiteBuyModel.prototype.isCanReward = function (id) {
            if (this.isReward(id))
                return false;
            var tbSummonBox = tb.TB_summon_box.get_TB_summon_boxById(id);
            if (tbSummonBox.score <= App.hero.summonScore)
                return true;
            return false;
        };
        /** 判断该宝箱是否已领取 */
        LimiteBuyModel.prototype.isReward = function (id) {
            return App.hero.doneSummonChests.indexOf(id) != -1;
        };
        /** 是否有免费抽奖次数 红点规则*/
        LimiteBuyModel.prototype.haveFreeTimes = function () {
            var tbSummonTime = this.getCurSummonSetList();
            var num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.summonFreeNum);
            return (tbSummonTime.free_num - num) > 0;
        };
        /** 是否有宝箱可以领取 红点规则 */
        LimiteBuyModel.prototype.haveBoxReward = function () {
            var tbSummonBox = this.getCurSummonBoxList();
            for (var _i = 0, tbSummonBox_1 = tbSummonBox; _i < tbSummonBox_1.length; _i++) {
                var obj = tbSummonBox_1[_i];
                if (this.isCanReward(obj.ID))
                    return true;
            }
            return false;
        };
        //----------------------------------------------------------------------------------------------限时团购
        /** 限时团购是否开启 */
        LimiteBuyModel.prototype.isOpenLimiteGroup = function () {
            return this.getCurGroupType().length != 0;
        };
        //首先获得当前团购时间表的ID数组
        LimiteBuyModel.prototype.getCurGroupType = function () {
            var arr = [];
            var tbGroupTime = tb.TB_group_buying_time.get_TB_group_buying_time();
            var curTime = App.getServerTime();
            var opensTime = App.getOpenServerTime();
            for (var _i = 0, tbGroupTime_1 = tbGroupTime; _i < tbGroupTime_1.length; _i++) {
                var obj = tbGroupTime_1[_i];
                if (obj.type == 0) { //type为0时是永久活动
                    arr.push(obj.ID);
                    continue;
                }
                else if (obj.type == 1) { //type为1时是开始-结束活动
                    var startDate = new Date(obj.time[0]);
                    var startSecond = startDate.getTime();
                    var endDate = new Date(obj.time[1]);
                    var endSecond = endDate.getTime();
                    //判断是否在时间内
                    if (startSecond < App.serverTime && endSecond > App.serverTime) {
                        arr.push(obj.ID);
                        continue;
                    }
                }
                else if (obj.type == 2) { //type为2时是开服-结束活动
                    var startDate = Number(obj.time[0]) - 1;
                    var endDate = Number(obj.time[1]);
                    if ((curTime < (opensTime + endDate * TimeConst.ONE_DAY_SEC))
                        && (curTime >= (opensTime + startDate * TimeConst.ONE_DAY_SEC))) {
                        arr.push(obj.ID);
                        continue;
                    }
                }
            }
            return arr;
        };
        /** 通过团购的type获取到当前的团购对象数组 */
        LimiteBuyModel.prototype.getCurGroupList = function () {
            var arrList = [];
            var arrType = this.CurGroupType ? this.CurGroupType : this.getCurGroupType();
            var tbGroupArr = tb.TB_group_buying.get_TB_group_buying();
            for (var _i = 0, tbGroupArr_1 = tbGroupArr; _i < tbGroupArr_1.length; _i++) {
                var obj = tbGroupArr_1[_i];
                for (var _a = 0, arrType_1 = arrType; _a < arrType_1.length; _a++) {
                    var type = arrType_1[_a];
                    if (type == obj.type)
                        arrList.push(new game.limiteGroupVo(obj));
                }
            }
            return arrList;
        };
        /** 通过团购的id查找团购时间表的时间 返回剩余时间*/
        LimiteBuyModel.prototype.getGroupRemainTime = function (id) {
            var tbGroupTime = tb.TB_group_buying_time.get_TB_group_buying_time();
            for (var key in tbGroupTime) {
                if (tbGroupTime[key].ID == id) {
                    if (tbGroupTime[key].type == 1) {
                        var endDate = new Date(tbGroupTime[key].time[1]);
                        var endSecond = endDate.getTime() / 1000;
                        return activityTime(endSecond, App.serverTimeSecond);
                    }
                    else if (tbGroupTime[key].type == 2) {
                        var endTime = Number(tbGroupTime[key].time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime();
                        return activityTime(endTime, App.serverTimeSecond);
                    }
                    else {
                        return "";
                    }
                }
            }
            return "";
        };
        return LimiteBuyModel;
    }());
    game.LimiteBuyModel = LimiteBuyModel;
})(game || (game = {}));
