var game;
(function (game) {
    /** 单组pk -- 每组对手信息 */
    var MatchGroupVo = /** @class */ (function () {
        function MatchGroupVo() {
            this.isMyMatch = false; // 是否是我的比赛数据
            this.isLastMatch = false; // 是否是上届回顾
            this.lUser = new game.GloryMatchPlayerVo();
            this.rUser = new game.GloryMatchPlayerVo();
        }
        /** 设置对战数据 */
        MatchGroupVo.prototype.setGroupInfo = function (info) {
            if (this.svo) {
                for (var key in info) {
                    this.svo[key] = info[key];
                }
            }
            else {
                this.svo = info;
            }
            this.lUser.setData(info.leftId, info.leftName, info.leftForce, info.leftHead, info.leftLevel, info.leftHeadFrame);
            this.rUser.setData(info.rightId, info.rightName, info.rightForce, info.rightHead, info.rightLevel, info.rightHeadFrame);
            if (!this.tbHonor) {
                this.tbHonor = tb.TB_honour.getItemById(info.stage);
            }
            this.sortNum = -info.session * 1000 - info.stage * 100 - info.round;
        };
        /** 获取组名 */
        MatchGroupVo.prototype.getGroupName = function () {
            if (this.isMyMatch) {
                var isCurSession = this.svo.session == game.GloryModel.getInstance().season;
                return this.tbHonor.name + "\uFF08" + (isCurSession ? LanMgr.getLan("", 12387) : LanMgr.getLan("", 12388)) + "\uFF09";
            }
            var group = this.isHaixuan() ? this.svo.groupId : (this.svo.pos + 1);
            return LanMgr.getLan("", 12389, group);
        };
        /** 是否有结果：输赢 */
        MatchGroupVo.prototype.isHasResult = function () {
            return this.svo.winner != 0;
        };
        /** 是否结束：时间 */
        MatchGroupVo.prototype.isEndGroup = function () {
            return this.isLastMatch || this.isMyMatch || App.serverTimeSecond >= game.GloryUtil.getGroupEndTime(this.tbHonor.ID);
        };
        /** 是否轮空 */
        MatchGroupVo.prototype.isBye = function () {
            return !this.svo.leftId || !this.svo.rightId;
        };
        /** 是否在当前阶段中 */
        MatchGroupVo.prototype.isInCurGroup = function () {
            if (this.isLastMatch || this.isMyMatch)
                return false;
            var id = this.tbHonor.ID;
            return App.serverTimeSecond >= game.GloryUtil.getGroupStartTime(id) && App.serverTimeSecond < game.GloryUtil.getGroupEndTime(id);
        };
        /** 是否在押注时间内(前后5分钟不能投注) -- 针对当前阶段比赛 */
        MatchGroupVo.prototype.isInBetTime = function () {
            return game.GloryUtil.isInBetTime(this.tbHonor.ID);
        };
        /** 是否已押注 */
        MatchGroupVo.prototype.isHasBet = function () {
            return this.svo.betId != 0;
        };
        /** 是否是海选赛 */
        MatchGroupVo.prototype.isHaixuan = function () {
            return game.GloryUtil.isHaixuan(this.tbHonor.ID);
        };
        /** 有结果前提下，是否左边赢 */
        MatchGroupVo.prototype.isLeftWin = function () {
            return this.svo.winner == 1;
        };
        MatchGroupVo.prototype.getSelfCamp = function () {
            var camp = battle.BatteConsts.BATTLE_CAMPATK;
            if (this.rUser.playerId == App.hero.playerId) {
                camp = battle.BatteConsts.BATTLE_CAMPDEF;
            }
            return camp;
        };
        return MatchGroupVo;
    }());
    game.MatchGroupVo = MatchGroupVo;
})(game || (game = {}));
