/**
* TimelimitModel
*/
var game;
(function (game) {
    var TimelimitModel = /** @class */ (function () {
        function TimelimitModel() {
            this.xianshiTimeIdx = 0;
        }
        TimelimitModel.getInstance = function () {
            if (!TimelimitModel._instance) {
                TimelimitModel._instance = new TimelimitModel();
            }
            return TimelimitModel._instance;
        };
        /**
         * 清理过期活动
         */
        TimelimitModel.prototype.clearActicity = function () {
            if (isEmptyObject(this._tabMap)) {
                return;
            }
            for (var key in this._tabMap) {
                if (this._tabMap.hasOwnProperty(key)) {
                    var element = this._tabMap[key];
                    if (element.rewardTime <= App.getServerTime()) {
                        if (element.id == TimelimitModel.ACTIVITY_JIJIN_ID) {
                            //周基金，还要检查是否领取完毕
                            if (!this.hasNoReceiveWeekFund()) {
                                delete this._tabMap[key];
                            }
                        }
                        else {
                            delete this._tabMap[key];
                        }
                    }
                }
            }
        };
        TimelimitModel.prototype.getTabMap = function () {
            return this._tabMap;
        };
        /**
         * FIX 现在逻辑为0点重置，如有任意时间，需更改
         * 重置所有活动TO服务端
         */
        TimelimitModel.prototype.refreshActivity = function () {
            this._tabMap = null;
            this.getActicity();
        };
        TimelimitModel.prototype.getActicity = function () {
            var _this = this;
            if (!isEmptyObject(this._tabMap)) {
                dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.GET_TAB_EVENT), this._tabMap);
                return;
            }
            this._tabMap = {};
            this._acticityMap = {};
            PLC.request(Protocol.game_activity_getActivityList, {}, function ($datavo) {
                if ($datavo) {
                    //activityList.id 对应tb_operate_activity表的time_index
                    for (var i = 0; i < $datavo.activityList.length; i++) {
                        //服务端的id转为页签
                        var activityvo = $datavo.activityList[i];
                        var sid = activityvo.id;
                        var link = tb.TB_operate_activity.getLinkByIdx(sid);
                        if (link != -1) {
                            activityvo["link"] = link;
                            _this._tabMap[sid] = activityvo;
                            if (link == iface.tb_prop.operateActivityTypeKey.exchange) {
                                var obj = { endTime: activityvo.endTime, id: 99, rewardTime: activityvo.endTime, startTime: activityvo.startTime, link: link };
                                _this._tabMap[obj.id] = obj;
                                _this.xianshiTimeIdx = sid;
                            }
                        }
                    }
                    var activityAllInfo = $datavo.activityAllInfo;
                    for (var i_1 = 0; i_1 < activityAllInfo.length; i_1++) {
                        //创建具体活动,放入具体的标签页中
                        var vo = new OperateActivityVo();
                        vo.setData(activityAllInfo[i_1]);
                        if (!vo || !vo.tbActivity)
                            continue;
                        var activityId = vo.tbActivity.time_index;
                        var tabInfo = _this._tabMap[activityId];
                        if (!tabInfo)
                            continue;
                        vo.endtime = _this._tabMap[activityId].rewardTime;
                        if (!_this._acticityMap[activityId]) {
                            _this._acticityMap[activityId] = [];
                        }
                        _this._acticityMap[activityId].push(vo);
                        //获取数据时，如有可领取，就派发红点事件
                        if (vo.isCanReward() && !vo.isOverdue()) {
                            dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.RED_EVENT), activityId);
                        }
                    }
                }
                //开服团购处理
                var ctime = tb.TB_activity_set.getTabSet().group_buy_time;
                var openbuyendtime = App.hero.openSvrTime + ctime;
                if (openbuyendtime > App.getServerTime()) {
                    //团购活动未结束
                    var obj = { endTime: openbuyendtime, id: TimelimitModel.ACTIVITY_OPENBUY_ID, rewardTime: openbuyendtime, startTime: App.hero.openSvrTime };
                    _this._tabMap[obj.id] = obj;
                    _this._tabMap[obj.id]["link"] = TimelimitModel.ACTIVITY_OPENBUY_ID;
                    if (!_this._acticityMap[obj.id]) {
                        _this._acticityMap[obj.id] = [];
                    }
                    var groupbuylist = tb.TB_group_buy.get_TB_group_buy();
                    var $obj = TableData.getInstance().getTableByName(TableData.tb_group_buy);
                    for (var $key in $obj.data) {
                        var $vo = $obj.data[$key];
                        //创建具体活动,放入具体的标签页中
                        var vo = new GroupBuyActivityVo();
                        vo.setData({ id: TimelimitModel.ACTIVITY_OPENBUY_ID, endtime: openbuyendtime, tabvo: $vo });
                        _this._acticityMap[obj.id].push(vo);
                    }
                    dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.GROUP_RED_EVENT));
                }
                //处理下特殊活动
                // this.getSpActivity(this._tabMap);
                dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.GET_TAB_EVENT), _this._tabMap);
            });
        };
        /**
         * 是否有开服团购红点
         */
        TimelimitModel.prototype.canGroupBuyRedPoint = function () {
            var list = this._acticityMap[TimelimitModel.ACTIVITY_OPENBUY_ID];
            for (var i = 0; list && i < list.length; i++) {
                var element = list[i];
                if (element.isCanReward()) {
                    return true;
                }
            }
            return false;
        };
        //特殊活动
        // private getSpActivity(tabmap:Object):void{
        // 	let curTime:number = App.getServerTime();
        // 	//基金活动
        // 	if (tb.TB_fund.fundStartTime() <= curTime && (curTime <= tb.TB_fund.fundEndTime() || this.hasNoReceiveWeekFund())){
        // 		let obj = { id: TimelimitModel.ACTIVITY_JIJIN_ID, endTime: tb.TB_fund.fundEndTime(), rewardTime: tb.TB_fund.fundEndTime(), startTime: tb.TB_fund.fundStartTime() }
        // 		tabmap[obj.id] = obj;
        // 		sendDispatchEvent(new TimelimitEvent(TimelimitEvent.FUND_RED_EVENT));
        // 	}
        // }
        //获得兑换活动模板
        TimelimitModel.getChangeItem = function (timeindex) {
            var activity = tb.TB_operate_activity.getChangeTemplate("time_index", String(timeindex));
            if (activity) {
                return new ItemVo(activity.defined[0][0], 0);
            }
            return null;
        };
        //是否有未领取的周基金奖励
        TimelimitModel.prototype.hasNoReceiveWeekFund = function () {
            if (App.hero.welfare.weekFund && App.hero.welfare.weekFund.length > 0) {
                for (var i = 0; i < App.hero.welfare.weekFund.length; i++) {
                    var id = App.hero.welfare.weekFund[i];
                    var allreward = tb.TB_fund_reward.getFundListByType(id);
                    for (var j = 0; j < allreward.length; j++) {
                        if (App.hero.welfare.weekFundAward.indexOf(allreward[j].ID) == -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        //是否显示周基金入口
        TimelimitModel.prototype.isShowWeekFundActivity = function () {
            var curTime = App.getServerTime();
            return tb.TB_fund.fundStartTime() <= curTime && (curTime <= tb.TB_fund.fundEndTime() || this.hasNoReceiveWeekFund());
        };
        TimelimitModel.prototype.updateData = function ($modifyCondInfo) {
            if (!$modifyCondInfo) {
                return;
            }
            for (var key in $modifyCondInfo) {
                var changid = Number(key);
                var tab = tb.TB_operate_activity.get_TB_operate_activityById(changid);
                //活动归属哪个页签下，从表中的time_index字段对应
                if (this._acticityMap.hasOwnProperty(tab.time_index)) {
                    var list = this._acticityMap[tab.time_index];
                    for (var i = 0; i < list.length; i++) {
                        var element = list[i];
                        if (element.id == changid) {
                            element.setCondCount(Number($modifyCondInfo[key]));
                            if (element.isCanReward() && !element.isOverdue()) {
                                dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.RED_EVENT), tab.time_index);
                            }
                            break;
                        }
                    }
                }
            }
        };
        /**
         * 是否有shou
         */
        TimelimitModel.prototype.canRedPoint = function (id) {
            if (!isEmptyObject(this._acticityMap) && this._acticityMap.hasOwnProperty(id)) {
                var activityInfo = this._acticityMap[id];
                return activityInfo.some(function (value) {
                    return value.isCanReward() && !value.isOverdue();
                });
            }
            else {
                return false;
            }
        };
        /** 获取活动中的某项 */
        TimelimitModel.prototype.getActivityVoById = function (subId) {
            for (var key in this._acticityMap) {
                var activityInfo = this._acticityMap[key];
                if (activityInfo) {
                    for (var i = 0; i < activityInfo.length; i++) {
                        var curVo = activityInfo[i];
                        if (curVo.id == subId) {
                            return curVo;
                        }
                    }
                }
            }
            return null;
        };
        /**
         * 是否存在活动
         */
        TimelimitModel.prototype.hasActivity = function () {
            return !isEmptyObject(this._tabMap);
        };
        TimelimitModel.prototype.getTabActivity = function ($id) {
            return this._acticityMap[$id];
        };
        TimelimitModel.prototype.refreshActivityByTab = function ($key) {
            var _this = this;
            var propMap = {};
            var activityId = this.getActivityIdByProp($key);
            var arg = {};
            arg[Protocol.game_activity_updateActivityCondCount.args.id] = activityId;
            PLC.request(Protocol.game_activity_updateActivityCondCount, arg, function ($sdata) {
                if (!$sdata)
                    return;
                for (var id in $sdata.modifyCondInfo) {
                    var activityVo = _this.getActivityVoById(Number(id));
                    if (activityVo) {
                        activityVo.setCondCount($sdata.modifyCondInfo[id]);
                        dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.RED_EVENT), activityVo.tbActivity.time_index);
                    }
                }
                for (var id in $sdata.modifyRewardCount) {
                    var activityVo = _this.getActivityVoById(Number(id));
                    if (activityVo) {
                        activityVo.setRewardCount($sdata.modifyRewardCount[id]);
                        dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.RED_EVENT), activityVo.tbActivity.time_index);
                    }
                }
            });
        };
        TimelimitModel.prototype.getActivityIdByProp = function (propType) {
            if (!this._propMap) {
                this._propMap = {};
                this._propMap[iface.tb_prop.redPointTypeKey.rechargeSum] = iface.tb_prop.operateActivityTypeKey.rechargeSum;
                this._propMap[iface.tb_prop.redPointTypeKey.consumeSum] = iface.tb_prop.operateActivityTypeKey.consumeSum;
                this._propMap[iface.tb_prop.redPointTypeKey.singleRecharge] = iface.tb_prop.operateActivityTypeKey.singleRecharge;
                this._propMap[iface.tb_prop.redPointTypeKey.dailyRecharge] = iface.tb_prop.operateActivityTypeKey.dailyRecharge;
                this._propMap[iface.tb_prop.redPointTypeKey.giftPacks] = iface.tb_prop.operateActivityTypeKey.giftPacks;
                this._propMap[iface.tb_prop.redPointTypeKey.exchange] = iface.tb_prop.operateActivityTypeKey.exchange;
                this._propMap[iface.tb_prop.redPointTypeKey.loginSum] = iface.tb_prop.operateActivityTypeKey.loginSum;
                this._propMap[iface.tb_prop.redPointTypeKey.dailyRechargeSum] = iface.tb_prop.operateActivityTypeKey.dailyRechargeSum;
            }
            return this._propMap[propType];
        };
        // public static IS_CLICK_EXCHANGE: boolean = false;
        //特殊活动（id为10000之后都是）
        TimelimitModel.ACTIVITY_JIJIN_ID = 10000; //基金活动
        TimelimitModel.ACTIVITY_OPENBUY_ID = 10001; //开服团购
        return TimelimitModel;
    }());
    game.TimelimitModel = TimelimitModel;
})(game || (game = {}));
