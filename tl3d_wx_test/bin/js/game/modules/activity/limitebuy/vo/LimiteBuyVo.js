var game;
(function (game) {
    //-----------------------------------------------------限时召唤
    var limiteSummonVo = /** @class */ (function () {
        function limiteSummonVo(tbSummonTime, tbSummonRank, tbSummonBox) {
            this.type = tbSummonTime.type;
            this.tbSummonTime = tbSummonTime;
            this.tbSummonBox = tbSummonBox.sort(function (a, b) {
                return a.score - b.score;
            });
            this.tbSummonRank = tbSummonRank.sort(function (a, b) {
                return a.score - b.score;
            });
            this._model = game.LimiteBuyModel.getInstance();
        }
        /** 获取到免费次数 */
        limiteSummonVo.prototype.getFreeCount = function () {
            return this.tbSummonTime.free_num;
        };
        /** 获取购买消耗 */
        limiteSummonVo.prototype.getBuyCost = function () {
            return this.tbSummonTime.buy_cost;
        };
        /** 获取模型id */
        limiteSummonVo.prototype.getModelID = function () {
            return this.tbSummonTime.model_show;
        };
        /** 获取到当前排名所需积分 */
        limiteSummonVo.prototype.getRankScoreByRank = function (rank) {
            for (var _i = 0, _a = this.tbSummonRank; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.rank[0] <= rank && obj.rank[1] >= rank)
                    return obj.score;
            }
            return 0;
        };
        /** 是否在活动时间内 */
        limiteSummonVo.prototype.isinTime = function () {
            if (this.type == 0) {
                return true;
            }
            else if (this.type == 1) {
                var endDate = new Date(this.tbSummonTime.time[1]);
                var endSecond = endDate.getTime() / 1000;
                if (endSecond > App.serverTimeSecond)
                    return true;
            }
            else if (this.type == 2) {
                if ((Number(this.tbSummonTime.time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime()) > App.serverTimeSecond)
                    return true;
            }
            return false;
        };
        /** 获取剩余时间 */
        limiteSummonVo.prototype.getRemainTime = function () {
            if (this.isinTime()) {
                return "剩余时间：" + this._model.getSummonRemainTime(this.tbSummonTime.ID);
            }
            else {
                return "活动已结束";
            }
        };
        return limiteSummonVo;
    }());
    game.limiteSummonVo = limiteSummonVo;
    //--------------------------------------------------------限时团购
    var limiteGroupVo = /** @class */ (function () {
        function limiteGroupVo(tbGroupBuying) {
            this.tbGroup = tbGroupBuying;
            this.type = tbGroupBuying.type;
            this._model = game.LimiteBuyModel.getInstance();
        }
        //是否在时间内
        limiteGroupVo.prototype.isinTime = function () {
            var tbTime = tb.TB_group_buying_time.TB_group_buying_timeById(this.type);
            if (tbTime.type == 0) {
                return true;
            }
            else if (tbTime.type == 1) {
                var endDate = new Date(tbTime.time[1]);
                var endSecond = endDate.getTime() / 1000;
                if (endSecond > App.serverTimeSecond)
                    return true;
            }
            else if (tbTime.type == 2) {
                if (Number(tbTime.time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime() > App.serverTimeSecond)
                    return true;
            }
            return false;
        };
        /** 返回剩余时间 */
        limiteGroupVo.prototype.getRemainTime = function () {
            if (this.isinTime && this.tbGroup) {
                return "剩余时间：" + this._model.getGroupRemainTime(this.tbGroup.type);
            }
            else {
                return "活动已结束";
            }
        };
        /** 返回折扣区间 */
        limiteGroupVo.prototype.getZheKouCount = function () {
            var num = this._model.getgrpBuyTotalNums(this.tbGroup.ID);
            if (num > 0) {
                if (num < this.tbGroup.total_buy_num[0]) {
                    return 0;
                }
                else if (num >= this.tbGroup.total_buy_num[0] && num < this.tbGroup.total_buy_num[1]) {
                    return 1;
                }
                else if (num >= this.tbGroup.total_buy_num[1] && num < this.tbGroup.total_buy_num[2]) {
                    return 2;
                }
                else if (num >= this.tbGroup.total_buy_num[2] && num < this.tbGroup.total_buy_num[3]) {
                    return 3;
                }
                else if (num >= this.tbGroup.total_buy_num[3]) {
                    return 4;
                }
            }
            else {
                return 0;
            }
        };
        /** 返回团购数组 [价格，折扣]*/
        limiteGroupVo.prototype.getCurZheKouList = function () {
            return [this.tbGroup.price[this.getZheKouCount()], this.tbGroup.discount_show[this.getZheKouCount()]];
        };
        /** 获取折扣数组 */
        limiteGroupVo.prototype.getZheKouList = function () {
            var arr = [];
            var tb = this.tbGroup;
            arr.push([tb.discount_show[0], 0]);
            for (var i = 1; i < tb.discount_show.length; i++) {
                arr.push([tb.discount_show[i], tb.total_buy_num[i - 1]]);
            }
            return arr;
        };
        /** 获取该物品全服已购买次数 */
        limiteGroupVo.prototype.getAllBuyNum = function () {
            return this._model.getgrpBuyTotalNums(this.tbGroup.ID);
        };
        /** 获取玩家已购买次数 */
        limiteGroupVo.prototype.getBuyNum = function () {
            return this._model.getgrpBuyTodayNums(this.tbGroup.ID);
        };
        /** 玩家获取剩余可购买次数 */
        limiteGroupVo.prototype.getRemainNum = function () {
            var buyNum = this._model.getgrpBuyTodayNums(this.tbGroup.ID);
            return this.tbGroup.buy_num - buyNum;
        };
        return limiteGroupVo;
    }());
    game.limiteGroupVo = limiteGroupVo;
})(game || (game = {}));
