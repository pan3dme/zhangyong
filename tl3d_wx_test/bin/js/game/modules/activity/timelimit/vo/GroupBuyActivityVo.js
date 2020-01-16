var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var GroupBuyActivityVo = /** @class */ (function (_super) {
    __extends(GroupBuyActivityVo, _super);
    function GroupBuyActivityVo() {
        return _super.call(this) || this;
    }
    GroupBuyActivityVo.prototype.setData = function (data) {
        this.id = data.id;
        this.endtime = data.endtime;
        this.tbActivity = data.tabvo;
        this.sort();
    };
    GroupBuyActivityVo.prototype.isCanReward = function () {
        var isover = this.isOverdue();
        if (isover)
            return false;
        var isreceive = this.isReceive();
        if (isreceive)
            return false;
        //充值人数
        var playerComp = App.hero.rechargePlayerNum >= this.tbActivity.condition[1];
        //充值数
        var rechargeComp = App.hero.welfare.openSvrRechargeSum >= this.tbActivity.condition[0];
        return playerComp && rechargeComp;
    };
    GroupBuyActivityVo.prototype.isReceive = function () {
        return App.hero.welfare.openSvrGroupBuyAward.hasOwnProperty(this.tbActivity.ID);
    };
    GroupBuyActivityVo.prototype.getRewardInfo = function () {
        return this.tbActivity.reward || [[]];
    };
    GroupBuyActivityVo.prototype.getDesc = function () {
        return this.tbActivity.desc;
    };
    GroupBuyActivityVo.prototype.sort = function () {
        var isreceive = this.isReceive();
        //充值人数
        var playerComp = App.hero.rechargePlayerNum >= this.tbActivity.condition[1];
        //充值数
        var rechargeComp = App.hero.welfare.openSvrRechargeSum >= this.tbActivity.condition[0];
        var isComp = playerComp && rechargeComp;
        //设置排序计数，设置完DataSource后排序
        if (isreceive) {
            this.sortNum = this.tbActivity.ID + 100000;
        }
        else if (isComp) {
            this.sortNum = this.tbActivity.ID;
        }
        else {
            this.sortNum = this.tbActivity.ID + 1000;
        }
    };
    return GroupBuyActivityVo;
}(OperateActivityVo));
