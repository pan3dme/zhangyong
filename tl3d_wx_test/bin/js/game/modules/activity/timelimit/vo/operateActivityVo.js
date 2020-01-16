/*
* name;
*/
var OperateActivityVo = /** @class */ (function () {
    function OperateActivityVo() {
        //兑换活动红点记录
        this.redopt = false;
    }
    OperateActivityVo.prototype.setData = function (data) {
        this.id = data.id;
        this.condCount = data.condCount;
        this.condValue = data.condValue;
        this.otherInfo = data.otherInfo;
        this.rewardInfo = data.rewardInfo;
        this.rewardCount = data.rewardCount;
        this.tbActivity = tb.TB_operate_activity.get_TB_operate_activityById(data.id);
        this.sort();
    };
    OperateActivityVo.prototype.getDesc = function () {
        return LanMgr.getLan(this.tbActivity.desc, -1, this.condValue, this.condCount);
    };
    OperateActivityVo.prototype.setCondCount = function (condCount) {
        this.condCount = condCount;
    };
    OperateActivityVo.prototype.getCondCount = function () {
        return this.condCount;
    };
    OperateActivityVo.prototype.setCondValue = function (condValue) {
        this.condValue = condValue;
    };
    OperateActivityVo.prototype.getCondValue = function () {
        return this.condValue;
    };
    OperateActivityVo.prototype.setOtherInfo = function (otherInfo) {
        this.otherInfo = otherInfo;
    };
    OperateActivityVo.prototype.getOtherInfoLen = function () {
        return this.otherInfo ? this.otherInfo.length : 0;
    };
    OperateActivityVo.prototype.getOtherInfo = function () {
        return this.otherInfo || [[]];
    };
    OperateActivityVo.prototype.setRewardInfo = function (rewardInfo) {
        this.rewardInfo = rewardInfo;
    };
    OperateActivityVo.prototype.getRewardInfo = function () {
        return this.rewardInfo || [[]];
    };
    OperateActivityVo.prototype.setRewardCount = function (rewardCount) {
        this.rewardCount = rewardCount;
    };
    OperateActivityVo.prototype.getRewardCount = function () {
        return this.rewardCount;
    };
    OperateActivityVo.prototype.getChongZhiIndex = function () {
        if (!this.tbActivity) {
            return -1;
        }
        return this.tbActivity.index;
    };
    OperateActivityVo.prototype.isReceive = function () {
        return false;
    };
    /**
     * 获得可以兑换的次数
     */
    OperateActivityVo.prototype.getChangeNum = function () {
        var num = 0;
        if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.exchange) {
            var canChangeNum = 9999999;
            //兑换物品可能是一兑多
            for (var i = 0; this.otherInfo && i < this.otherInfo.length; i++) {
                var item = this.otherInfo[i];
                var costnum = App.hero.getBagItemNum(item[0]);
                //选择可兑换的最小次数记录
                canChangeNum = Math.min(canChangeNum, Math.floor(costnum / item[1]));
            }
            num = canChangeNum;
        }
        return num;
    };
    OperateActivityVo.prototype.isCanReward = function () {
        if (!this.tbActivity) {
            return false;
        }
        if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.giftPacks
            || this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.singleRecharge) {
            return this.condCount >= 1;
        }
        else if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.exchange) {
            return this.exchangeIsComplete() && !this.redopt;
        }
        else {
            return this.condValue <= this.condCount && this.rewardCount == 0;
        }
    };
    //当为兑换活动时，是否满足红点需求
    OperateActivityVo.prototype.exchangeIsComplete = function () {
        if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.exchange) {
            var hasTims = this.condValue - this.rewardCount;
            //兑换物品可能是一兑多
            var allEnough = true;
            for (var i = 0; this.otherInfo && i < this.otherInfo.length; i++) {
                var item = this.otherInfo[i];
                var costnum = App.hero.getBagItemNum(item[0]);
                if (costnum < item[1]) {
                    allEnough = false;
                    break;
                }
            }
            return allEnough && hasTims > 0;
        }
        return false;
    };
    OperateActivityVo.prototype.isOverdue = function () {
        return App.getServerTime() >= this.endtime;
    };
    OperateActivityVo.prototype.sort = function () {
        var tab = tb.TB_operate_activity.get_TB_operate_activityById(this.id);
        if (!tab)
            return;
        if (tab.link == iface.tb_prop.operateActivityTypeKey.arenaSum
            || tab.link == iface.tb_prop.operateActivityTypeKey.goundSum
            || tab.link == iface.tb_prop.operateActivityTypeKey.dailyCopy
            || tab.link == iface.tb_prop.operateActivityTypeKey.expeditionMax
            || tab.link == iface.tb_prop.operateActivityTypeKey.mineOccupyNum
            || tab.link == iface.tb_prop.operateActivityTypeKey.escortCount
            || tab.link == iface.tb_prop.operateActivityTypeKey.robCount
            || tab.link == iface.tb_prop.operateActivityTypeKey.mineRobNum
            || tab.link == iface.tb_prop.operateActivityTypeKey.guildCopy
            || tab.link == iface.tb_prop.operateActivityTypeKey.advtDispatch
            || tab.link == iface.tb_prop.operateActivityTypeKey.employ
            || tab.link == iface.tb_prop.operateActivityTypeKey.door
            || tab.link == iface.tb_prop.operateActivityTypeKey.runeCopy
            || tab.link == iface.tb_prop.operateActivityTypeKey.worldBoss
            || tab.link == iface.tb_prop.operateActivityTypeKey.consumeSum
            || tab.link == iface.tb_prop.operateActivityTypeKey.dailyRecharge
            || tab.link == iface.tb_prop.operateActivityTypeKey.loginSum
            || tab.link == iface.tb_prop.operateActivityTypeKey.rechargeSum) {
            var isreceive = this.rewardCount != 0;
            var isComp = this.condCount >= this.condValue;
            //设置排序计数，设置完DataSource后排序
            if (isreceive) {
                this.sortNum = this.id + 100000;
            }
            else if (isComp) {
                this.sortNum = this.id;
            }
            else {
                this.sortNum = this.id + 1000;
            }
        }
        else if (tab.link == iface.tb_prop.operateActivityTypeKey.exchange) {
            var hasTims = this.condValue - this.rewardCount;
            var costnum = App.hero.getBagItemNum(this.otherInfo[0][0]);
            var canExchange = costnum >= this.otherInfo[0][1] && hasTims > 0;
            if (canExchange) {
                this.sortNum = this.id;
            }
            else {
                this.sortNum = this.id * 1000;
            }
        }
        else if (tab.link == iface.tb_prop.operateActivityTypeKey.giftPacks) {
            var isOver = this.endtime <= App.getServerTime();
            //设置排序计数，设置完DataSource后排序
            if (this.condCount > 0) {
                this.sortNum = this.id;
            }
            else if (this.otherInfo[0] <= this.rewardCount || isOver) {
                this.sortNum = this.id + 100000;
            }
            else {
                this.sortNum = this.id + 1000;
            }
        }
        else if (tab.link == iface.tb_prop.operateActivityTypeKey.singleRecharge) {
            var canNum = this.otherInfo[0][1] - this.rewardCount;
            var isreceive = canNum <= 0;
            var isComp = this.condCount > 0;
            //设置排序计数，设置完DataSource后排序
            if (isreceive) {
                this.sortNum = this.id + 100000;
            }
            else if (isComp) {
                this.sortNum = this.id;
            }
            else {
                this.sortNum = this.id + 1000;
            }
        }
    };
    OperateActivityVo.prototype.modifyData = function ($data) {
        if ($data.modifyCondCount) {
            for (var key in $data.modifyCondCount) {
                if ($data.modifyCondCount.hasOwnProperty(key)) {
                    this.condCount = $data.modifyCondCount[key];
                }
            }
        }
        if ($data.modifyRewardCount) {
            for (var key in $data.modifyRewardCount) {
                if ($data.modifyRewardCount.hasOwnProperty(key)) {
                    this.rewardCount = $data.modifyRewardCount[key];
                }
            }
        }
        if ($data.openSvrGroupBuyAward) {
            for (var key in $data.openSvrGroupBuyAward) {
                if ($data.openSvrGroupBuyAward.hasOwnProperty(key)) {
                    App.hero.welfare.openSvrGroupBuyAward[key] = $data.openSvrGroupBuyAward[key];
                }
            }
        }
    };
    return OperateActivityVo;
}());
