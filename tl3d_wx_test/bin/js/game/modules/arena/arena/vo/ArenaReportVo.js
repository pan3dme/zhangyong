/**
* name
*/
var game;
(function (game) {
    var ArenaReportVo = /** @class */ (function () {
        function ArenaReportVo(data, arenaRecordVo) {
            this.rank = 0; //排名
            this.name = ""; //对手名字
            this.isWin = false; //挑战结果
            this.chgRank = 0; //改变名次
            this.topRank = 0; //历史最高名次
            this.chgTopRank = 0; //历史最高改变名次
            this.addResource = {}; //获得物品
            this.topRankDiamond = 0; //历史最高获得钻石
            for (var key in this) {
                if (data[key]) {
                    this[key] = data[key];
                }
            }
            if (data['commonData'] && data['commonData']['addResource']) {
                this.addResource = data['commonData']['addResource'];
            }
            this.arenaRecordVo = arenaRecordVo;
        }
        /**获得奖励 */
        ArenaReportVo.prototype.getRewards = function () {
            return map2ary(this.addResource);
        };
        /**是否是观察战报 */
        ArenaReportVo.prototype.isLookReport = function () {
            return isEmptyObject(this.addResource);
        };
        /**是否是历史最高 */
        ArenaReportVo.prototype.isHistoryTop = function () {
            return !!this.topRank && !!this.chgTopRank && !!this.topRankDiamond;
        };
        return ArenaReportVo;
    }());
    game.ArenaReportVo = ArenaReportVo;
})(game || (game = {}));
