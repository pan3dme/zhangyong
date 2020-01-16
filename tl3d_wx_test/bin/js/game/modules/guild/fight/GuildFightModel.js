var game;
(function (game) {
    var GuildFightModel = /** @class */ (function () {
        function GuildFightModel() {
            /** 公会战开启时间 -- 开服第二周周天开启 */
            this.openTime = 0;
            /** 报名时间 */
            this.joinTime = 0;
            /** 报名的赛季结束时间 */
            this.endTime = 0;
            /** 报名轮 -- 周一到周六表示第1-6轮 */
            this.joinRound = 0;
            /** 赛季 */
            this.season = 0;
            this.maxGuildGrade = 0; // 最高段位
            this.matchType = -1; // 表明 匹配类型（0：正常匹配，1：人数不足，2：轮空 3:未开始）
            this.canRewardRp = false;
        }
        GuildFightModel.getInstance = function () {
            if (!GuildFightModel._instance) {
                GuildFightModel._instance = new GuildFightModel();
            }
            return GuildFightModel._instance;
        };
        GuildFightModel.prototype.initModel = function () {
            // 开服时间
            var openSvrDate = new Date(App.hero.openSvrTime * 1000);
            openSvrDate.setHours(0, 0, 0, 0);
            var time = openSvrDate.getTime() / 1000;
            var week = openSvrDate.getDay();
            // 离开服第二周周天的天数
            this.openTime = week == WeekNum.Sun ? (time + 7 * 86400) : (time + (7 - week + 7) * 86400);
            this.myTeamVo = new game.GuildFightTeamVo(true);
            this.enemyTeamVo = new game.GuildFightTeamVo(false);
            this.fightThreadVo = new game.GuildFightThread();
            this.fightThreadVo.requestSeason().then(function () {
                dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_WAR_REDPOINT));
            });
        };
        GuildFightModel.prototype.updateSeason = function (data) {
            if (data.hasOwnProperty('session')) {
                this.season = data['session'];
            }
            if (data.hasOwnProperty('regTime')) {
                this.joinTime = data['regTime'];
                this.joinRound = (new Date(this.joinTime * 1000)).getDay();
                this.joinRound = this.joinRound == WeekNum.Sat ? WeekNum.Mon : this.joinRound;
                this.endTime = this.getEndTime(this.joinTime);
            }
            if (data.hasOwnProperty('maxGuildGrade')) {
                this.maxGuildGrade = data['maxGuildGrade'];
            }
        };
        /** 设置比赛数据  */
        GuildFightModel.prototype.setMatchInfo = function (data) {
            if (!data)
                return;
            if (data.hasOwnProperty('myInfo')) {
                this.myTeamVo.setTeamInfo(data['myInfo']);
            }
            if (data.hasOwnProperty('targetInfo')) {
                this.enemyTeamVo.setTeamInfo(data['targetInfo']);
            }
            if (data.hasOwnProperty('matchType')) {
                this.matchType = data['matchType'];
            }
            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_MATCH_INFO));
        };
        GuildFightModel.prototype.clearMatchInfo = function () {
        };
        // 是否报名
        GuildFightModel.prototype.isJoin = function () {
            return App.serverTimeSecond < this.endTime;
        };
        /** 第几轮 */
        GuildFightModel.prototype.getCurRound = function () {
            var curDate = new Date(App.serverTime);
            return curDate.getDay();
        };
        // 报名后是否正式比赛时间
        GuildFightModel.prototype.isStart = function () {
            if (!this.isInGameTime() || !this.isJoin()) {
                return false;
            }
            var joinDate = new Date(this.joinTime);
            var joinHour = joinDate.getHours();
            var joinMinu = joinDate.getMinutes();
            var curDate = new Date(App.serverTime);
            var week = curDate.getDay();
            // 5点半之后是下一天才可以匹配，之前报名当天就可以匹配；
            return (joinHour * 60 + joinMinu) >= 330 ? ((week - this.joinRound) > 0) : true;
        };
        /** 获取下次开赛剩余时间 */
        GuildFightModel.prototype.getNextStartTime = function () {
            var joinDate = new Date(this.joinTime);
            var joinHour = joinDate.getHours();
            var joinMinu = joinDate.getMinutes();
            var curDate = new Date(App.serverTime);
            curDate.setHours(6, 0, 0, 0);
            // 5点半之前当前6点就可以开始
            if ((joinHour * 60 + joinMinu) < 330) {
                return curDate.getTime() / 1000;
            }
            else {
                return curDate.getTime() / 1000 + 86400;
            }
        };
        /** 是否比赛时间段中 -- 每周一到每周六6:00-22:00为比赛期 */
        GuildFightModel.prototype.isInGameTime = function () {
            var date = new Date(App.serverTime);
            var week = date.getDay();
            var hour = date.getHours();
            return week > WeekNum.Sun && hour >= tb.TB_guild_war_set.getSet().star_time && hour < tb.TB_guild_war_set.getSet().end_time;
        };
        /** 是否是休息时间 -- 每周一到周六22:00-6:00为休息期 (不包括周一六点前)*/
        GuildFightModel.prototype.isRestTime = function () {
            var date = new Date(App.serverTime);
            var week = date.getDay();
            var hour = date.getHours();
            if (week == WeekNum.Mon) {
                return hour >= tb.TB_guild_war_set.getSet().end_time;
            }
            else if (week > WeekNum.Sun) {
                return hour < tb.TB_guild_war_set.getSet().star_time || hour >= tb.TB_guild_war_set.getSet().end_time;
            }
            return false;
        };
        /** 是否赛季结束时间：休赛期 -- 每周日0点-24点：公会战休赛期，也是下个赛季报名期  */
        GuildFightModel.prototype.isEndTime = function () {
            var date = new Date(App.serverTime);
            var week = date.getDay();
            var hour = date.getHours();
            // + 周一六点前
            return week == WeekNum.Sun || (week == WeekNum.Mon && hour < tb.TB_guild_war_set.getSet().star_time);
        };
        /** 返回晋级类型 */
        GuildFightModel.prototype.getUpgradeType = function (tbDan, rank) {
            if (!tbDan)
                return game.GuildUpGradeType.none;
            var rankList = tbDan.result;
            if (!rankList || rankList.length <= 0)
                return game.GuildUpGradeType.none;
            if (tbDan.ID == game.GuildGrade.qingtong) {
                return rank >= rankList[0][0] && rank <= rankList[0][1] ? game.GuildUpGradeType.up : game.GuildUpGradeType.keep;
            }
            else if (tbDan.ID == game.GuildGrade.wangzhe) {
                return game.GuildUpGradeType.none;
            }
            else {
                if (rank >= rankList[0][0] && rank <= rankList[0][1]) {
                    return game.GuildUpGradeType.up;
                }
                else if (rank >= rankList[1][0] && rank <= rankList[1][1]) {
                    return game.GuildUpGradeType.keep;
                }
                else {
                    return game.GuildUpGradeType.down;
                }
            }
        };
        /** 获取结束时间(周日00:00结束时间) */
        GuildFightModel.prototype.getEndTime = function (joinTime) {
            if (joinTime <= 0)
                return 0;
            var date = new Date();
            date.setTime(joinTime * 1000);
            date.setHours(0, 0, 0, 0);
            var week = date.getDay();
            return week == WeekNum.Sat ? (date.getTime() / 1000 + 8 * 86400) : (date.getTime() / 1000 + (7 - week) * 86400);
        };
        /** 是否领取过段位宝箱 */
        GuildFightModel.prototype.isRewardByGrade = function (grade) {
            var num = App.hero.guildWarAwardCount[grade];
            return !isNaN(num) && num > 0;
        };
        /** 是否有挑战次数 */
        GuildFightModel.prototype.isHasChallengeCount = function () {
            if (!this.isOpenGuildWar())
                return false;
            if (!this.isStart())
                return false;
            var self = this.myTeamVo.getMember(App.hero.playerId);
            return self ? self.svo.atkCount > 0 : false;
        };
        /** 是否可领取 */
        GuildFightModel.prototype.isCanReward = function () {
            if (!this.isOpenGuildWar())
                return false;
            if (this.canRewardRp)
                return true;
            var grades = [game.GuildGrade.baiyin, game.GuildGrade.bojin, game.GuildGrade.wangzhe];
            for (var _i = 0, grades_1 = grades; _i < grades_1.length; _i++) {
                var grade = grades_1[_i];
                if (this.maxGuildGrade >= grade && !this.isRewardByGrade(grade)) {
                    return true;
                }
            }
            return false;
        };
        /** 是否可报名 1. 会长和副会长所在公会可报名（公会30级人数大于10个）2.周六不能报名*/
        GuildFightModel.prototype.isCanJoin = function () {
            if (!this.isOpenGuildWar())
                return false;
            var date = new Date(App.serverTime);
            if (date.getDay() == WeekNum.Sat) {
                return false;
            }
            var guildInfo = game.GuildModel.getInstance().guildInfo;
            if (!guildInfo)
                return false;
            var tbset = tb.TB_guild_war_set.getSet();
            return guildInfo.job == iface.tb_prop.guildJobTypeKey.president && guildInfo.level >= tbset.role_level && guildInfo.num >= tbset.guild_player_num && !this.isJoin();
        };
        /** 是否开启公会战 */
        GuildFightModel.prototype.isOpenGuildWar = function () {
            return game.GuildModel.getInstance().isHasGuild() && App.serverTimeSecond >= this.openTime;
        };
        GuildFightModel.GRADE_NAME = { 1: "青铜", 2: "白银", 3: "铂金", 4: "王者" };
        GuildFightModel.BLOOD_BASE = 10000;
        return GuildFightModel;
    }());
    game.GuildFightModel = GuildFightModel;
})(game || (game = {}));
