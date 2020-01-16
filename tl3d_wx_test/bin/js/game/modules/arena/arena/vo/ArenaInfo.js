/**
* name
*/
var game;
(function (game) {
    var ArenaInfo = /** @class */ (function () {
        function ArenaInfo(data) {
            this.rank = data.rank;
            this.topRank = data.topRank;
            if (data.clgList)
                this.clgInfoList = this.parseClg(data.clgList, data.rank);
            if (data.rankList)
                this.rankInfoList = this.parseRank(data.rankList);
        }
        /**解析对手排名数据 */
        ArenaInfo.prototype.parseClg = function (data, myRank) {
            var clgInfoVo = [];
            for (var key in data) {
                var info = new game.ArenaInfoVo(data[key], myRank);
                if (info.rank == 2000 && this.rank == 2000) {
                    info.setDataAtAppHero();
                }
                clgInfoVo.push(info);
            }
            return clgInfoVo;
        };
        /**解析排行榜排名数据 */
        ArenaInfo.prototype.parseRank = function (data) {
            var rankInfoVo = [];
            for (var i = 1; i < 51; i++) {
                var isNpc = true;
                for (var key in data) {
                    if (~~key == i) {
                        var info = new game.ArenaRankVo();
                        info.setSvo(data[key]);
                        info.rank = i;
                        rankInfoVo.push(info);
                        isNpc = false;
                        break;
                    }
                }
                if (isNpc) {
                    var info = new game.ArenaRankVo();
                    info.rank = i;
                    info.initNpcData();
                    rankInfoVo.push(info);
                }
            }
            return rankInfoVo;
        };
        return ArenaInfo;
    }());
    game.ArenaInfo = ArenaInfo;
})(game || (game = {}));
