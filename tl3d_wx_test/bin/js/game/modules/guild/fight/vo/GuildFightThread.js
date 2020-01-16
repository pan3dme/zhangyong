var game;
(function (game) {
    var GuildFightThread = /** @class */ (function () {
        function GuildFightThread() {
            this.requestFlag = false;
            this._model = game.GuildFightModel.getInstance();
        }
        /** 请求赛季信息 {session,regTime} */
        GuildFightThread.prototype.requestSeason = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var model = _this._model;
                if (_this.requestFlag || !model.isOpenGuildWar()) {
                    resolve();
                }
                else {
                    PLC.request(Protocol.guild_guildWar_getGuildWarSession, null, function ($data) {
                        if (!$data)
                            return;
                        model.updateSeason($data);
                        // this.requestFlag = true;
                        resolve();
                    });
                }
            });
        };
        /** 请示刷新匹配数据 */
        GuildFightThread.prototype.loopRequestMatchInfo = function () {
            this.stopMatchLoop();
            if (this._model.myTeamVo.getMember(App.hero.playerId)) {
                Laya.timer.loop(30000, this, this.requestMatchInfo);
            }
        };
        GuildFightThread.prototype.stopMatchLoop = function () {
            Laya.timer.clear(this, this.requestMatchInfo);
        };
        /** 请求匹配信息 */
        GuildFightThread.prototype.requestMatchInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var model = _this._model;
                if (!model.isInGameTime()) {
                    _this.stopMatchLoop();
                    return resolve();
                }
                PLC.request(Protocol.guild_guildWar_getGuildWarMatchInfo, null, function ($data) {
                    model.setMatchInfo($data);
                    resolve();
                });
            });
        };
        return GuildFightThread;
    }());
    game.GuildFightThread = GuildFightThread;
})(game || (game = {}));
