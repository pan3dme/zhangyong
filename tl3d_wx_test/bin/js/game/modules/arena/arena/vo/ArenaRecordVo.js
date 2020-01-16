/**
* name
*/
var game;
(function (game) {
    var ArenaRecordVo = /** @class */ (function () {
        function ArenaRecordVo(data) {
            this.playerId = null;
            this.targetRank = 0;
            this.battleTime = 0;
            this.battleType = 0;
            this.isWin = false;
            this.chgRank = 0;
            this.level = 0;
            this.name = "";
            this.id = 0;
            this.force = 0; //玩家战力
            this.targetForce = 0; //目标战力
            for (var key in data) {
                this[key] = data[key];
            }
            this.initData();
        }
        /**解析战斗记录数据 */
        ArenaRecordVo.parseRecord = function (data) {
            var datas = [];
            for (var id = data.length - 1; id >= 0; id--) {
                var info = new ArenaRecordVo(data[id]);
                info.id = ~~id;
                datas.push(info);
            }
            return datas;
        };
        /** 初始化数据 */
        ArenaRecordVo.prototype.initData = function () {
            if (this.isNpc()) {
                var data = this.tbData = tb.TB_arena_new_npc.getTB_arena_newById(this.targetRank);
                this.level = data.level;
                this.name = data.name;
                this.head = data.head;
                this.headFrame = 0;
            }
        };
        /**变化标识 */
        ArenaRecordVo.prototype.getChangeTypeSkin = function () {
            return SkinUtil.getUpOrDownSkinUrl(this.getRankChangeType());
        };
        /**是否是挑战 ..防守 */
        ArenaRecordVo.prototype.isChallenge = function () {
            return this.battleType == 1;
        };
        /** 获取变化的值 */
        ArenaRecordVo.prototype.getChgValue = function () {
            return this.chgRank;
        };
        ArenaRecordVo.prototype.getChgValuePrev = function () {
            return LanMgr.getLan("", 12549);
        };
        /**排名上升/下降/不变 */
        ArenaRecordVo.prototype.getRankChangeType = function () {
            return this.chgRank > 0 ? RankChangeType.Up : this.chgRank == 0 ? RankChangeType.None : RankChangeType.Down;
        };
        /**是否排名不变 */
        ArenaRecordVo.prototype.isNotChange = function () {
            return this.getRankChangeType() == RankChangeType.None;
        };
        /**多久前挑战 */
        ArenaRecordVo.prototype.beforeTime = function () {
            return logindifference(this.battleTime, App.serverTimeSecond);
        };
        ArenaRecordVo.prototype.getEvent = function () {
            return new game.ArenaEvent(game.ArenaEvent.GET_ARENA_BAGTTLE);
        };
        ArenaRecordVo.prototype.isRecord = function () {
            return true;
        };
        ArenaRecordVo.prototype.getForce = function () {
            return this.force;
        };
        /**是否是机器人 */
        ArenaRecordVo.prototype.isNpc = function () {
            return !this.playerId ? true : false;
        };
        ArenaRecordVo.prototype.getTagForce = function () {
            return this.targetForce;
        };
        return ArenaRecordVo;
    }());
    game.ArenaRecordVo = ArenaRecordVo;
    /**排名变化类型 */
    var RankChangeType;
    (function (RankChangeType) {
        RankChangeType[RankChangeType["Up"] = 1] = "Up";
        RankChangeType[RankChangeType["None"] = 0] = "None";
        RankChangeType[RankChangeType["Down"] = -1] = "Down";
    })(RankChangeType || (RankChangeType = {}));
})(game || (game = {}));
