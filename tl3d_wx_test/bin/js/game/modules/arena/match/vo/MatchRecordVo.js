var game;
(function (game) {
    var MatchRecordVo = /** @class */ (function () {
        function MatchRecordVo(svo, index) {
            this.playerId == svo.playerId;
            this.name = svo.name;
            this.level = svo.level;
            this.head = svo.head;
            this.headFrame = svo.headFrame;
            this.battleTime = svo.battleTime;
            this.chgScore = svo.chgScore;
            this.battleType = svo.battleType;
            this.isWin = svo.isWin;
            this.index = index;
            this.force = svo.force;
            this.targetForce = svo.targetForce;
        }
        /**多久前挑战 */
        MatchRecordVo.prototype.beforeTime = function () {
            return logindifference(this.battleTime, App.serverTimeSecond);
        };
        /**是否是挑战 ..防守 */
        MatchRecordVo.prototype.isChallenge = function () {
            return this.battleType == 1;
        };
        /** 获取变化的值 */
        MatchRecordVo.prototype.getChgValue = function () {
            return this.chgScore;
        };
        MatchRecordVo.prototype.getChgValuePrev = function () {
            return LanMgr.getLan("", 12543);
        };
        MatchRecordVo.prototype.getChangeTypeSkin = function () {
            return "";
        };
        /** 是否未改变 */
        MatchRecordVo.prototype.isNotChange = function () {
            return false;
        };
        /**是否是机器人 */
        MatchRecordVo.prototype.isNpc = function () {
            return false;
        };
        MatchRecordVo.prototype.getEvent = function () {
            return new game.ArenaEvent(game.ArenaEvent.MATCH_PLAYBACK);
        };
        MatchRecordVo.prototype.isRecord = function () {
            return true;
        };
        MatchRecordVo.prototype.getForce = function () {
            return this.force;
        };
        MatchRecordVo.prototype.getTagForce = function () {
            return this.targetForce;
        };
        return MatchRecordVo;
    }());
    game.MatchRecordVo = MatchRecordVo;
})(game || (game = {}));
