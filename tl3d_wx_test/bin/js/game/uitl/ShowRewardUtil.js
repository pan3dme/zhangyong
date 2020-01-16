var ShowRewardUtil = /** @class */ (function () {
    function ShowRewardUtil() {
    }
    ShowRewardUtil.showRewardView = function (rewardList, type, weight, handler) {
        if (weight === void 0) { weight = 0; }
        if (handler === void 0) { handler = null; }
        if (!rewardList || rewardList.length == 0)
            return;
        var rewardVo = Laya.Pool.getItemByClass("RewardInfoVo", RewardInfoVo);
        rewardVo.init(rewardList, type, weight, handler);
        this._rewardList.push(rewardVo);
        if (rewardVo.weight > 0) {
            this._needSort = true;
        }
        Laya.timer.callLater(this, this.CheckRewardList);
    };
    ShowRewardUtil.CheckRewardList = function () {
        if (UIMgr.hasStage(UIConst.ShowRewardItem)) {
            return;
        }
        if (this._needSort) {
            this._needSort = false;
            this._rewardList.sort(function (a, b) {
                if (a.weight != b.weight) {
                    return b.weight - a.weight;
                }
                else {
                    return a.id - b.id;
                }
            });
        }
        var info = this._rewardList.shift();
        if (info) {
            UIMgr.showUI(UIConst.ShowRewardItem, info);
        }
    };
    ShowRewardUtil._rewardList = [];
    ShowRewardUtil._needSort = false;
    return ShowRewardUtil;
}());
var RewardInfoVo = /** @class */ (function () {
    function RewardInfoVo() {
        this.id = 0;
        this.type = 0;
        this.weight = 0;
    }
    RewardInfoVo.prototype.init = function (rewardList, type, weight, handler) {
        if (type === void 0) { type = 0; }
        if (weight === void 0) { weight = 0; }
        if (handler === void 0) { handler = null; }
        this.id = RewardInfoVo.ID++;
        this.rewardList = rewardList ? rewardList : [];
        this.type = type;
        this.weight = weight;
        this.handler = handler;
    };
    RewardInfoVo.prototype.clear = function () {
        this.id = 0;
        this.rewardList = null;
        this.handler = null;
    };
    RewardInfoVo.ID = 1;
    return RewardInfoVo;
}());
