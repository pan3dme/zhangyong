var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var DailyCopyModel = /** @class */ (function () {
        function DailyCopyModel() {
        }
        DailyCopyModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new DailyCopyModel();
            }
            return this._instance;
        };
        DailyCopyModel.prototype.initModel = function () {
            this._copyList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_daily_copy).data;
            for (var key in tbData) {
                this._copyList.push(new game.DailyCopyInfoVo(tbData[key]));
            }
            for (var key in iface.tb_prop.dailyCopyTypeKey) {
                var type = Number(key);
                if (!isNaN(type)) {
                    var list = this.getCopyListByType(type);
                    list[0].isFirst = true;
                    list[list.length - 1].isLast = true;
                }
            }
            DailyCopyModel.COPY_NAME[iface.tb_prop.dailyCopyTypeKey.gold] = LanMgr.getLan("", 12490);
            DailyCopyModel.COPY_NAME[iface.tb_prop.dailyCopyTypeKey.exp] = LanMgr.getLan("", 12491);
            DailyCopyModel.COPY_NAME[iface.tb_prop.dailyCopyTypeKey.chip] = LanMgr.getLan("", 12492);
        };
        DailyCopyModel.prototype.getCopyList = function () {
            return this._copyList;
        };
        /** 根据不同的试炼类型获取副本列表 */
        DailyCopyModel.prototype.getCopyListByType = function (type) {
            var list = this._copyList.filter(function (vo) {
                return vo.type == type;
            });
            list = __spreadArrays(list);
            list.forEach(function (vo) {
                vo.sortNum = vo.tbCopy.ID;
                // if(!vo.isLvLimit()){
                //     vo.sortNum = vo.tbCopy.ID * 1000;
                // }
            });
            list.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            return list;
        };
        /**每日副本红点 */
        DailyCopyModel.prototype.canRedPoint = function (type) {
            if (!App.IsSysOpen(ModuleConst.DAILY_COPY))
                return false;
            if (App.IsSysOpen(ModuleConst.DAILY_COPY)) {
                return App.hero.getOverplusValue(type) > 0;
            }
            else
                return false;
        };
        /** 获取副本 */
        DailyCopyModel.prototype.getCopyById = function (id) {
            return this._copyList.find(function (vo) {
                return vo.tbCopy.ID == id;
            });
        };
        /** 获取下一个副本 */
        DailyCopyModel.prototype.getNextCopy = function (curCopy) {
            var list = this.getCopyListByType(curCopy.type);
            var curIdx = list.indexOf(curCopy);
            return list[curIdx + 1];
        };
        /** 获取上一个副本 */
        DailyCopyModel.prototype.getPrevCopy = function (curCopy) {
            var list = this.getCopyListByType(curCopy.type);
            var curIdx = list.indexOf(curCopy);
            return list[curIdx - 1];
        };
        /** 获取购买挑战次数花费的钻石数量
         * type : iface.tb_prop.limitTypeKey.buyDailyCopyNum1
         */
        DailyCopyModel.prototype.getBuyCost = function (type) {
            var set = tb.TB_copy_set.getCopySet();
            var costAry = set.daily_copy_cost;
            var count = App.hero.getlimitValue(type);
            if (count >= costAry.length) {
                return costAry[costAry.length - 1];
            }
            else {
                return costAry[count];
            }
        };
        /** 是否挑战过 */
        DailyCopyModel.prototype.isHasChallenge = function (type) {
            var max = tb.TB_copy_set.getCopySet().daily_copy_num;
            var num = App.hero.getOverplusValue(DailyCopyModel.getInstance().getOverplusType(iface.tb_prop.dailyCopyTypeKey.gold));
            return num < max;
        };
        /** 获取剩余类型：剩余挑战次数类型 */
        DailyCopyModel.prototype.getOverplusType = function (type) {
            if (type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return iface.tb_prop.overplusTypeKey.dailyCopyNum1;
            }
            else if (type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return iface.tb_prop.overplusTypeKey.dailyCopyNum2;
            }
            return iface.tb_prop.overplusTypeKey.dailyCopyNum3;
        };
        /** 获取限制类型：购买次数类型 */
        DailyCopyModel.prototype.getLimitType = function (type) {
            if (type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum1;
            }
            else if (type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum2;
            }
            return iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
        };
        /** 获取限制类型：购买次数类型 */
        DailyCopyModel.prototype.getBuyBattleType = function (type) {
            if (type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return common.BuyBattleCountView.TYPE_DAILYCOPY_ONE;
            }
            else if (type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return common.BuyBattleCountView.TYPE_DAILYCOPY_TWO;
            }
            return common.BuyBattleCountView.TYPE_DAILYCOPY_THREE;
        };
        DailyCopyModel.COPY_NAME = {};
        return DailyCopyModel;
    }());
    game.DailyCopyModel = DailyCopyModel;
})(game || (game = {}));
