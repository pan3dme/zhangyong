/**
* name
*/
var RankListType;
(function (RankListType) {
    /**神力 */
    RankListType[RankListType["Power"] = 1] = "Power";
    /**等级 */
    RankListType[RankListType["Level"] = 2] = "Level";
    /**竞技场 */
    RankListType[RankListType["Arena"] = 3] = "Arena";
    /**公会 */
    RankListType[RankListType["Guild"] = 4] = "Guild";
    /**作战 */
    RankListType[RankListType["Zuozhan"] = 5] = "Zuozhan";
    /**副本 */
    RankListType[RankListType["Copy"] = 6] = "Copy";
    /**试炼塔 */
    RankListType[RankListType["Tower"] = 7] = "Tower";
})(RankListType || (RankListType = {}));
var game;
(function (game) {
    var RankModel = /** @class */ (function () {
        function RankModel() {
            this.rankingList = {};
            this.arrRankListName = [
                [LanMgr.getLan("", 12081), "shenli", RankListType.Power, LanMgr.getLan("", 12081), LanMgr.getLan("", 12178), "shenli.png"],
                [LanMgr.getLan("", 12179), "dengji", RankListType.Level, LanMgr.getLan("", 12179), LanMgr.getLan("", 12180), "dengji.png"],
                [LanMgr.getLan("", 12181), "lilian", RankListType.Copy, LanMgr.getLan("", 12181), LanMgr.getLan("", 12182), "guanka.png"],
                [LanMgr.getLan("", 12183), "shilianta", RankListType.Tower, LanMgr.getLan("", 12181), LanMgr.getLan("", 12182), "shilian.png"],
                [LanMgr.getLan("", 12184), "gonghui", RankListType.Guild, LanMgr.getLan("", 12179), LanMgr.getLan("", 12185), "gonghui.png"],
            ];
        }
        RankModel.getInstance = function () {
            if (!RankModel._instance) {
                RankModel._instance = new RankModel();
            }
            return RankModel._instance;
        };
        RankModel.prototype.getValueName = function () {
            var _this = this;
            return LanMgr.getLan(this.arrRankListName.find(function (vo) { return vo[2] == _this.curRankType; })[4], -1) + "：";
        };
        RankModel.prototype.getValue = function () {
            return this.getvalueBytype(this.curRankType);
        };
        RankModel.prototype.getvalueBytype = function (type) {
            switch (type) {
                case RankListType.Level:
                    return App.hero.level.toString();
                case RankListType.Power:
                    return App.hero.maxHistoryForce.toString();
                case RankListType.Copy:
                    return game.GuajiModel.getInstance().getSelfRankDesc();
                case RankListType.Tower:
                    return game.TowerModel.getInstance().getSelfRankDesc();
                case RankListType.Guild:
                    return App.hero.guildLv != 0 ? App.hero.guildLv.toString() : LanMgr.getLan("", 12084);
            }
        };
        RankModel.prototype.canRedPoint = function (id) {
            if (id == RankListType.Guild && App.hero.guildNum <= 0)
                return false;
            return App.hero.worshipInfo[id] ? false : true;
        };
        //获取所有排行榜数据
        RankModel.prototype.getAllRankData = function () {
            return this.rankingList;
        };
        //获取排行榜数据
        RankModel.prototype.getRankData = function (type) {
            return this.rankingList[type];
        };
        //设置排行榜数据
        RankModel.prototype.setRankData = function (type, data) {
            this.rankingList[type] = data;
            dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RANK_DATA_CHANGE), type);
        };
        return RankModel;
    }());
    game.RankModel = RankModel;
    var ServerRankListVo = /** @class */ (function () {
        function ServerRankListVo(data) {
            this.king = null;
            this.head = data[3];
            this.name = data[2];
            this.value = data[1];
            this.level = data[4];
            this.playerId = data[0];
            this.guildName = data[5];
            this.headFrame = data[6];
            if (RankModel.getInstance().curRankType == RankListType.Tower) {
                this.value = game.TowerModel.getInstance().getCopyRankDesc(this.value);
            }
            else if (RankModel.getInstance().curRankType == RankListType.Copy) {
                this.value = game.GuajiModel.getInstance().getCopyRankDesc(this.value);
            }
        }
        return ServerRankListVo;
    }());
    game.ServerRankListVo = ServerRankListVo;
    var JingjiRankListVo = /** @class */ (function () {
        function JingjiRankListVo(data) {
            this.king = null;
            this.sex = data.sex;
            this.name = data.name;
            this.level = data.level;
            this.value = data.score;
            this.playerId = data.playerId;
            this.guildName = data.guildName;
        }
        return JingjiRankListVo;
    }());
    game.JingjiRankListVo = JingjiRankListVo;
    var GuildRankListVo = /** @class */ (function () {
        function GuildRankListVo(data) {
            this.king = null;
            this.value = data.level;
            this.head = data.head ? data.head : 1;
            this.guildName = data.name;
            this.name = data.playerName;
            this.level = data.level; //data.playerLevel;
            this.playerId = data.playerId;
        }
        return GuildRankListVo;
    }());
    game.GuildRankListVo = GuildRankListVo;
})(game || (game = {}));
