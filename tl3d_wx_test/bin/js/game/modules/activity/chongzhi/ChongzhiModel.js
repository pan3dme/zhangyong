/**
* name
*/
var game;
(function (game) {
    var ChongzhiModel = /** @class */ (function () {
        function ChongzhiModel() {
            /** 存要弹出弹窗的数组 */
            this.rechargeSuccLists = new Array();
            /** 充值的vip提升数据--客户端构造 */
            this.chongzhiVipData = {};
            /** 可以购买的特权礼包数组 */
            this._tequanArr = [];
            this.initFirstData();
            this.firstRechargeName = [["超值首充", "firstRechage_chaozhi"],
                ["豪华首充", "firstRechage_haohua"],
                ["至尊首充", "firstRechage_zhixun"]];
        }
        ChongzhiModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChongzhiModel();
            }
            return this._instance;
        };
        /** 是否真正支付 */
        ChongzhiModel.isRealPay = function (plat) {
            var typekey = iface.tb_prop.platformTypeKey;
            return [typekey.version, typekey.buddy, typekey.lezhong].indexOf(Number(plat)) != -1;
        };
        /**
         * 支付
         * @param payItem 充值表对应项
         */
        ChongzhiModel.pay = function (item, succCallback) {
            if (succCallback === void 0) { succCallback = null; }
            var pid = Number(window.platform.pid);
            var args = {};
            var typekey = iface.tb_prop.platformTypeKey;
            if (pid == typekey.buddy) {
                var tmm = new Date().getTime();
                var time = Math.floor(tmm / 1000);
                var cpOrderId = String(tmm) + randomNum(5);
                var serverId = window.platform.serverInfo.serverId;
                var sign = hex_md5('cpOrderId=' + cpOrderId +
                    '&gameId=' + BingoSDK.gameId +
                    '&goodsId=' + item.ID +
                    '&goodsName=' + encodeURIComponent(item.desc) +
                    '&money=' + item.recharge_count +
                    '&role=' + App.hero.playerId +
                    '&server=' + serverId +
                    '&time=' + time +
                    '&uid=' + App.hero.puid +
                    '&key=' + BingoSDK.payKey);
                args = {
                    gameId: BingoSDK.gameId, uid: App.hero.puid, server: serverId, role: App.hero.playerId,
                    goodsId: item.ID, goodsName: encodeURIComponent(item.desc), money: item.recharge_count,
                    cpOrderId: cpOrderId, sign: sign, time: time
                };
            }
            else if (pid == typekey.lezhong || pid == typekey.version) {
                var serverId = window.platform.serverInfo.serverId;
                args = {
                    money: item.recharge_count, goodsId: item.ID, goodsName: item.desc, goodsDesc: item.desc,
                    playerId: App.hero.playerId, playerName: App.hero.name, playerLevel: App.hero.level, serverId: serverId, serverName: ""
                };
            }
            if (Object.keys(args).length > 0) {
                BingoSDK.pay(args, function () {
                    logdebug("充值成功！");
                    if (succCallback) {
                        succCallback();
                    }
                });
                window.platform.reportInfo();
            }
        };
        ChongzhiModel.prototype.initModel = function () {
        };
        /**初始化首充数据 */
        ChongzhiModel.prototype.initFirstData = function () {
            var tbs = tb.TB_first_recharge.get_TB_first_recharge();
            this.firstRechargeData = tbs.map(function (vo) { return new FirstRechargeData(vo); });
        };
        ChongzhiModel.prototype.hasShouChongTip = function () {
            var data = this.firstRechargeData.findIndex(function (vo) { return !vo.isFinish(); });
            return data != -1;
        };
        /**打开界面显示的那一档 */
        ChongzhiModel.prototype.getCurData = function () {
            var aryData = this.firstRechargeData;
            var data = aryData.find(function (vo) { return !vo.isFinish(); });
            return data ? data : aryData[aryData.length - 1];
        };
        /**获得首充数据
         * @param id id
         */
        ChongzhiModel.prototype.getDataById = function (id) {
            return this.firstRechargeData[id];
        };
        /**首充奖励是否全部领完 */
        ChongzhiModel.prototype.isAllReward = function () {
            return !this.firstRechargeData.some(function (data) { return !data.isReward(); });
        };
        /** 存充值成功弹窗数据 */
        ChongzhiModel.prototype.arrPushBack = function (rechargeId) {
            var bool = this.rechargeSuccLists.length == 0;
            this.rechargeSuccLists.push(rechargeId);
            if (bool)
                this.showPanel(rechargeId);
        };
        /** 删充值成功弹窗数据 */
        ChongzhiModel.prototype.arrPop = function () {
            this.rechargeSuccLists.shift();
            if (this.rechargeSuccLists.length == 0) {
                this.showVipupPanel();
                return;
            }
            var data = this.rechargeSuccLists[0];
            this.showPanel(data);
        };
        /** 打开界面 */
        ChongzhiModel.prototype.showPanel = function (rechargeId) {
            UIMgr.showUI(UIConst.Topup_SuccView, rechargeId);
        };
        /** 打开vip提升界面 */
        ChongzhiModel.prototype.showVipupPanel = function () {
            if (this.chongzhiVipData && Object.keys(this.chongzhiVipData).length > 0) {
                UIUtil.showVipupPanel(this.chongzhiVipData);
                this.chongzhiVipData = null;
            }
        };
        /** 首充礼包红点 */
        ChongzhiModel.prototype.canRedPoint = function (id) {
            var data = this.firstRechargeData[id];
            if (!!data)
                return data.canReward();
            return false;
        };
        /** 该id的等级礼包是否可以购买 */
        ChongzhiModel.prototype.isVisibleByid = function (id) {
            this.isEnoughBuyTequan();
            return this._tequanArr.findIndex(function (vo) {
                return vo == id;
            }) != -1;
        };
        /** 是否足够货币购买等级特权礼包 */
        ChongzhiModel.prototype.isEnoughBuyTequan = function () {
            //保存已购买的vip等级礼包数组
            this._tequanArr = [];
            for (var i = 0; i <= App.hero.vip; i++) {
                if (App.hero.welfare.privilegeGiftPack[i])
                    continue;
                if (this.isEnoughBuyTequanById(i)) {
                    this._tequanArr.push(i);
                }
            }
            if (this._tequanArr.length > 0)
                return true;
            return false;
        };
        /** 是否足够货币购买指定等级特权礼包 */
        ChongzhiModel.prototype.isEnoughBuyTequanById = function (id) {
            var tbVip = tb.TB_vip.get_TB_vipById(id);
            if (tbVip) {
                if (App.isEnough(iface.tb_prop.resTypeKey.diamond, tbVip.now_price))
                    return true;
            }
            return false;
        };
        /** 特权主红点规则 */
        ChongzhiModel.prototype.tequanRedPoint = function () {
            return this.isEnoughBuyTequan();
        };
        return ChongzhiModel;
    }());
    game.ChongzhiModel = ChongzhiModel;
    /**首充数据 */
    var FirstRechargeData = /** @class */ (function () {
        function FirstRechargeData(tb) {
            this.tb = tb;
            this.rewards = this.initReward();
            this.allrewards = [];
            for (var i = 0; i < this.rewards.length; i++) {
                this.allrewards = this.allrewards.concat(this.rewards[i].reward);
            }
        }
        /**奖励 */
        FirstRechargeData.prototype.initReward = function () {
            var ary = [];
            var tb = this.tb;
            var id = tb.ID;
            var recharNum = tb.recharge_count;
            for (var day = 1; day < 4; day++) {
                var reward = tb["reward_" + day].map(function (vo) { return new ItemVo(vo[0], vo[1]); });
                ary.push(new FirstIRData(id, day, recharNum, reward));
            }
            return ary;
        };
        /**是否完成*/
        FirstRechargeData.prototype.isFinish = function () {
            return App.hero.welfare.rechargeSum >= this.tb.recharge_count;
        };
        /**是否已领奖 */
        FirstRechargeData.prototype.isReward = function () {
            return !this.rewards.some(function (vo) { return !vo.isReward(); });
        };
        /**是否可领奖 */
        FirstRechargeData.prototype.canReward = function () {
            return this.getCanReardId() != 99;
        };
        /**红点 */
        FirstRechargeData.prototype.redPoint = function () {
            return !this.rewards[0].isReward();
        };
        /**当前领奖day */
        FirstRechargeData.prototype.getCanReardId = function () {
            var data = this.rewards.find(function (reward) { return reward.canReward(); });
            return data ? data.day : 99;
        };
        /**明日再来 */
        FirstRechargeData.prototype.isAfterRewardday = function () {
            return this.isFinish() && this.getCanReardId() == 99 && !this.isReward();
        };
        return FirstRechargeData;
    }());
    game.FirstRechargeData = FirstRechargeData;
    /**首充奖励数据 */
    var FirstIRData = /** @class */ (function () {
        function FirstIRData(id, day, recharNum, reward) {
            this.id = id;
            this.day = day;
            this.reward = reward;
            this.recharNum = recharNum;
        }
        FirstIRData.prototype.getRewardId = function () {
            return this.id * 10 + this.day;
        };
        FirstIRData.prototype.getRechargeTime = function () {
            var time = App.hero.welfare.firstRechargeTime[this.id];
            if (!!time) {
                var date = new Date(time * 1000);
                date.setHours(0, 0, 0, 0);
                return Math.ceil((Date.now() - date.getTime()) / TimeConst.ONE_DAY_MILSEC);
            }
            return null;
        };
        /**是否达到领取时间 */
        FirstIRData.prototype.isOutTime = function () {
            var time = this.getRechargeTime();
            return time && time >= this.day;
        };
        /**是否达到充值数目 */
        FirstIRData.prototype.isRechargeCount = function () {
            return App.hero.welfare.rechargeSum >= this.recharNum;
        };
        /**是否已完成 */
        FirstIRData.prototype.isFinish = function () {
            return this.isRechargeCount() && this.isOutTime();
        };
        /**是否已领取 */
        FirstIRData.prototype.isReward = function () {
            var key = this.getRewardId();
            return App.hero.welfare.firstRecharge[key] ? App.hero.welfare.firstRecharge[key] == 1 : false;
        };
        /**是否可领取 */
        FirstIRData.prototype.canReward = function () {
            return this.isFinish() && !this.isReward();
        };
        return FirstIRData;
    }());
    game.FirstIRData = FirstIRData;
})(game || (game = {}));
