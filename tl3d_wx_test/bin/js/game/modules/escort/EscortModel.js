var game;
(function (game) {
    var EscortModel = /** @class */ (function () {
        function EscortModel() {
            /** 护送结束时间 */
            this.endTime = 0;
            /** 护送货物id */
            this.escortId = 0;
            this.caravanList = [];
            /** 商队itemrender缓存 */
            this._itemCacheList = [];
            this.hasNewRecord = false;
        }
        EscortModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new EscortModel();
            }
            return this._instance;
        };
        EscortModel.prototype.initModel = function () {
            var _this = this;
            this._goodsList = [];
            this.caravanList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_escort).data;
            for (var key in tbData) {
                this._goodsList.push(new game.CaravanGoodsVo(tbData[key]));
            }
            if (App.IsSysOpen(ModuleConst.CARAVAN_ESCORT)) {
                PLC.request(Protocol.center_escort_getSelfInfo, null, function ($data) {
                    _this.updateEscortInfo($data ? $data.escortInfo : null);
                    dispatchEvt(new game.EscortEvent(game.EscortEvent.UPDATE_SELF_INFO));
                    _this.delayRewardInfo();
                });
            }
        };
        EscortModel.prototype.delayRewardInfo = function () {
            if (this.endTime > 0 && App.serverTimeSecond < this.endTime) {
                Laya.timer.once((this.endTime - App.serverTimeSecond), this, function () {
                    dispatchEvt(new game.EscortEvent(game.EscortEvent.UPDATE_REWARD_RP));
                });
            }
        };
        EscortModel.prototype.updateEscortInfo = function (info) {
            if (info) {
                // 赋值列表里的货物id
                this.escortId = info.tradeId;
                this.endTime = info.endTime;
            }
            else {
                this.escortId = App.hero.escortTradeId;
                this.endTime = 0;
            }
        };
        EscortModel.prototype.requestCaravanList = function () {
            var _this = this;
            this.caravanList = [];
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.center_escort_getEscortList, null, function ($data) {
                    if (!$data)
                        return;
                    _this.caravanList = [];
                    _this.updateEscortInfo($data.escortInfo);
                    for (var _i = 0, _a = $data.escortList; _i < _a.length; _i++) {
                        var svo = _a[_i];
                        _this.caravanList.push(new game.CaravanInfoVo(svo));
                    }
                    _this.caravanList.sort(function (a, b) {
                        return a.svo.endTime - b.svo.endTime;
                    });
                    resolve();
                });
            });
        };
        /** 商队列表 */
        EscortModel.prototype.getCaravanList = function () {
            var list = [];
            while (this.caravanList.length > 0 && list.length < 10) {
                list.push(this.caravanList.shift());
            }
            return list;
        };
        EscortModel.prototype.getItemRender = function () {
            var item = this._itemCacheList.length > 0 ? this._itemCacheList.shift() : new game.CaravanIR();
            return item;
        };
        EscortModel.prototype.pushItemRender = function (item) {
            if (this._itemCacheList.indexOf(item) == -1) {
                this._itemCacheList.push(item);
            }
        };
        /** 货物列表 */
        EscortModel.prototype.getGoodsList = function () {
            return this._goodsList;
        };
        /** 获取刷新消耗：先消耗道具后消耗钻石 */
        EscortModel.prototype.getRefreshCost = function () {
            var itemCost = tb.TB_escort_set.getSet().refresh_item;
            if (App.isEnough(itemCost[0], itemCost[1])) {
                return itemCost;
            }
            return [iface.tb_prop.resTypeKey.diamond, tb.TB_escort_set.getSet().refresh_cost];
        };
        /** 获取一键刷新消耗：先消耗道具后消耗钻石 */
        EscortModel.prototype.getOneKeyCost = function () {
            var itemCost = tb.TB_escort_set.getSet().auto_item;
            if (App.isEnough(itemCost[0], itemCost[1])) {
                return itemCost;
            }
            return [iface.tb_prop.resTypeKey.diamond, tb.TB_escort_set.getSet().auto_cost];
        };
        /** 是否最高品质 */
        EscortModel.prototype.isMaxQuality = function (id) {
            return id == 4;
        };
        /** 是否在奖励翻倍时间内 */
        EscortModel.prototype.isDoubleTime = function () {
            var date = new Date(App.serverTime);
            var hour = date.getHours();
            var time = tb.TB_escort_set.getSet().double_time;
            for (var _i = 0, time_1 = time; _i < time_1.length; _i++) {
                var ary = time_1[_i];
                if (hour >= Number(ary[0]) && hour < Number(ary[1])) {
                    return true;
                }
            }
            return false;
        };
        /** 剩余护送次数 */
        EscortModel.prototype.getEscortCount = function () {
            return tb.TB_escort_set.getSet().escort_num - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.escortCount);
        };
        /** 剩余掠夺次数 */
        EscortModel.prototype.getRobCount = function () {
            return tb.TB_escort_set.getSet().rob_num - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.robCount);
        };
        /** 翻倍时间内是否可护送 */
        EscortModel.prototype.canDoubleEscort = function () {
            if (this.isDoubleTime()) {
                return this.getEscortCount() > 0 && App.serverTimeSecond >= this.endTime;
            }
            return false;
        };
        EscortModel.prototype.updateNewRecord = function (flag) {
            this.hasNewRecord = flag;
            dispatchEvt(new game.EscortEvent(game.EscortEvent.UPDATE_RECORD_RP));
        };
        /** 是否有奖励领取 */
        EscortModel.prototype.canReward = function () {
            var time = this.endTime;
            return time > 0 && time <= App.serverTimeSecond;
        };
        return EscortModel;
    }());
    game.EscortModel = EscortModel;
})(game || (game = {}));
