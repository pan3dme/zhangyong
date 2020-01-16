/*
* name;
*/
class OperateActivityVo {
    id: number;
    sortNum: number;
    endtime: number
    condCount: number;
    condValue: number;
    otherInfo: any;
    rewardInfo: Array<Array<number>>;
    rewardCount: number;
    //兑换活动红点记录
    redopt: boolean = false;
    tbActivity;
    constructor() {

    }

    setData(data) {
        this.id = data.id;
        this.condCount = data.condCount;
        this.condValue = data.condValue;
        this.otherInfo = data.otherInfo;
        this.rewardInfo = data.rewardInfo;
        this.rewardCount = data.rewardCount;
        this.tbActivity = tb.TB_operate_activity.get_TB_operate_activityById(data.id);
        this.sort();
    }

    getDesc() {
        return LanMgr.getLan(this.tbActivity.desc, -1, this.condValue, this.condCount);
    }

    setCondCount(condCount) {
        this.condCount = condCount
    }

    getCondCount() {
        return this.condCount;
    }

    setCondValue(condValue) {
        this.condValue = condValue
    }

    getCondValue() {
        return this.condValue;
    }

    setOtherInfo(otherInfo) {
        this.otherInfo = otherInfo
    }

    getOtherInfoLen() {
        return this.otherInfo ? this.otherInfo.length : 0;
    }

    getOtherInfo() {
        return this.otherInfo || [[]];
    }

    setRewardInfo(rewardInfo) {
        this.rewardInfo = rewardInfo
    }

    getRewardInfo() {
        return this.rewardInfo || [[]];
    }

    setRewardCount(rewardCount) {
        this.rewardCount = rewardCount
    }

    getRewardCount() {
        return this.rewardCount;
    }

    getChongZhiIndex() {
        if (!this.tbActivity) {
            return -1;
        }
        return this.tbActivity.index;
    }

    isReceive(): boolean {
        return false;
    }

    /**
     * 获得可以兑换的次数
     */
    getChangeNum(): number {
        let num = 0;
        if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.exchange) {
            let canChangeNum = 9999999;
            //兑换物品可能是一兑多
            for (let i = 0; this.otherInfo && i < this.otherInfo.length; i++) {
                let item = this.otherInfo[i];
                let costnum: number = App.hero.getBagItemNum(item[0]);
                //选择可兑换的最小次数记录
                canChangeNum = Math.min(canChangeNum, Math.floor(costnum / item[1]));
            }
            num = canChangeNum;
        }
        return num;
    }

    isCanReward(): boolean {
        if (!this.tbActivity) {
            return false;
        }
        if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.giftPacks
            || this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.singleRecharge) {
            return this.condCount >= 1;
        } else if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.exchange) {
            return this.exchangeIsComplete() && !this.redopt;
        } else {
            return this.condValue <= this.condCount && this.rewardCount == 0;
        }
    }

    //当为兑换活动时，是否满足红点需求
    exchangeIsComplete():boolean {
        if (this.tbActivity.type == iface.tb_prop.operateActivityTypeKey.exchange) {
            let hasTims = this.condValue - this.rewardCount;
            //兑换物品可能是一兑多
            let allEnough: boolean = true;
            for (let i = 0; this.otherInfo && i < this.otherInfo.length; i++) {
                let item = this.otherInfo[i];
                let costnum: number = App.hero.getBagItemNum(item[0]);
                if (costnum < item[1]) {
                    allEnough = false;
                    break;
                }
            }

            return allEnough && hasTims > 0;
        }
        return false;
    }

    isOverdue(): boolean {
        return App.getServerTime() >= this.endtime;
    }

    sort(): void {
        let tab: tb.TB_operate_activity = tb.TB_operate_activity.get_TB_operate_activityById(this.id);
        if (!tab) return;
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
            let isreceive: boolean = this.rewardCount != 0;
            let isComp: boolean = this.condCount >= this.condValue;
            //设置排序计数，设置完DataSource后排序
            if (isreceive) {
                this.sortNum = this.id + 100000;
            } else if (isComp) {
                this.sortNum = this.id;
            } else {
                this.sortNum = this.id + 1000;
            }
        } else if (tab.link == iface.tb_prop.operateActivityTypeKey.exchange) {
            let hasTims = this.condValue - this.rewardCount;
            let costnum: number = App.hero.getBagItemNum(this.otherInfo[0][0]);
            let canExchange = costnum >= this.otherInfo[0][1] && hasTims > 0
            if (canExchange) {
                this.sortNum = this.id;
            } else {
                this.sortNum = this.id * 1000;
            }
        } else if (tab.link == iface.tb_prop.operateActivityTypeKey.giftPacks) {
            let isOver: boolean = this.endtime <= App.getServerTime();
            //设置排序计数，设置完DataSource后排序
            if (this.condCount > 0) {
                this.sortNum = this.id;
            } else if (this.otherInfo[0] <= this.rewardCount || isOver) {
                this.sortNum = this.id + 100000;
            } else {
                this.sortNum = this.id + 1000;
            }
        } else if (tab.link == iface.tb_prop.operateActivityTypeKey.singleRecharge) {
            let canNum = this.otherInfo[0][1] - this.rewardCount;
            let isreceive: boolean = canNum <= 0;
            let isComp: boolean = this.condCount > 0;
            //设置排序计数，设置完DataSource后排序
            if (isreceive) {
                this.sortNum = this.id + 100000;
            } else if (isComp) {
                this.sortNum = this.id;
            } else {
                this.sortNum = this.id + 1000;
            }
        }

    }

    public modifyData($data) {
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
    }
}