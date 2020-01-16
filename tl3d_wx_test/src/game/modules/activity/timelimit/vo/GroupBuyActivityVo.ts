/*
* name;
*/
class GroupBuyActivityVo extends OperateActivityVo {
    constructor() {
        super();
    }

    setData(data) {
        this.id = data.id;
        this.endtime = data.endtime;
        this.tbActivity = data.tabvo;
        this.sort();
    }

    isCanReward(): boolean {
        let isover = this.isOverdue();
        if (isover) return false;
        let isreceive: boolean = this.isReceive();
        if (isreceive) return false;
        //充值人数
        let playerComp: boolean = App.hero.rechargePlayerNum >= this.tbActivity.condition[1];
        //充值数
        let rechargeComp: boolean = App.hero.welfare.openSvrRechargeSum >= this.tbActivity.condition[0];
        return playerComp && rechargeComp;
    }

    isReceive(): boolean{
        return App.hero.welfare.openSvrGroupBuyAward.hasOwnProperty(this.tbActivity.ID); 
    }

    getRewardInfo(){
        return this.tbActivity.reward || [[]];
    }

    getDesc(){
        return this.tbActivity.desc;
    }

    sort(): void {
        let isreceive: boolean = this.isReceive();
        //充值人数
        let playerComp: boolean = App.hero.rechargePlayerNum >= this.tbActivity.condition[1];
        //充值数
        let rechargeComp: boolean = App.hero.welfare.openSvrRechargeSum >= this.tbActivity.condition[0];

        let isComp: boolean = playerComp && rechargeComp;
        //设置排序计数，设置完DataSource后排序
        if (isreceive) {
            this.sortNum = this.tbActivity.ID + 100000;
        } else if (isComp) {
            this.sortNum = this.tbActivity.ID;
        } else {
            this.sortNum = this.tbActivity.ID + 1000;
        }

    }
}