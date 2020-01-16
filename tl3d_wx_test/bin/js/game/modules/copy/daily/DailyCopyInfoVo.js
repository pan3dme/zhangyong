var game;
(function (game) {
    var DailyCopyInfoVo = /** @class */ (function () {
        function DailyCopyInfoVo(tb) {
            this.isFirst = false; // 是否第一关
            this.isLast = false; // 是否最后一关
            this.tbCopy = tb;
            this.type = Math.floor(tb.ID / 100);
            this.subType = tb.ID % 10;
        }
        /** 是否等级限制挑战 */
        DailyCopyInfoVo.prototype.isLvLimit = function () {
            return App.hero.level < this.tbCopy.level;
        };
        DailyCopyInfoVo.prototype.getCopyName = function () {
            return game.DailyCopyModel.COPY_NAME[this.type] + "：" + this.tbCopy.name;
        };
        /** 获取剩余类型：剩余挑战次数类型 */
        DailyCopyInfoVo.prototype.getOverplusType = function () {
            if (this.type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return iface.tb_prop.overplusTypeKey.dailyCopyNum1;
            }
            else if (this.type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return iface.tb_prop.overplusTypeKey.dailyCopyNum2;
            }
            return iface.tb_prop.overplusTypeKey.dailyCopyNum3;
        };
        /** 获取限制类型：购买次数类型 */
        DailyCopyInfoVo.prototype.getLimitType = function () {
            if (this.type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum1;
            }
            else if (this.type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum2;
            }
            return iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
        };
        /** 副本类型 */
        DailyCopyInfoVo.prototype.getCopyType = function () {
            return this.type;
        };
        return DailyCopyInfoVo;
    }());
    game.DailyCopyInfoVo = DailyCopyInfoVo;
})(game || (game = {}));
