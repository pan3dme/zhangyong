var game;
(function (game) {
    var MatchModel = /** @class */ (function () {
        function MatchModel() {
            this.score = 0; // 积分
            this.benfuRank = 0; // 本服排名
            this.lastRefreshTime = 0; // 上次刷新时间
            this.challengeCount = 0; // 挑战次数
            this.doneMatchChests = []; // 已领取的宝箱id
            this.kuafuRank = 0;
            this.maxTbCount = 0; // 宝箱的最大挑战次数
        }
        MatchModel.getInstance = function () {
            if (!MatchModel._instance) {
                MatchModel._instance = new MatchModel();
            }
            return MatchModel._instance;
        };
        MatchModel.prototype.initModel = function () {
            this._boxList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_match_box).data;
            for (var key in tbData) {
                var tbBox = tbData[key];
                if (tbBox.need_num > this.maxTbCount) {
                    this.maxTbCount = tbBox.need_num;
                }
                this._boxList.push(new game.BaoxiangVo(tbBox));
            }
            // 设置段位的最高积分
            var gardeList = tb.TB_match_score.getItemList();
            var maxScore = -1;
            for (var i = 0, len = gardeList.length; i < len; i++) {
                var tbScore = gardeList[i];
                tbScore.max_score = maxScore;
                maxScore = tbScore.score;
            }
            this.updateEndTime();
        };
        /** 更新本轮结束时间 本周结束 */
        MatchModel.prototype.updateEndTime = function () {
            this.roundEndTime = GameUtil.getFormatTime(7, 23, 59, 59) + 1;
        };
        /** 获取宝箱列表 */
        MatchModel.prototype.getBoxList = function () {
            return this._boxList ? this._boxList : [];
        };
        /** 获取匹配列表 */
        MatchModel.prototype.getMatchList = function () {
            return this._matchList ? this._matchList : [];
        };
        MatchModel.prototype.setMatchList = function (list) {
            if (!this._matchList) {
                this._matchList = [];
            }
            for (var i = 0, len = list.length; i < len; i++) {
                if (!this._matchList[i]) {
                    this._matchList.push(new game.MatchPlayerVo(list[i], i));
                }
                else {
                    this._matchList[i].setSvo(list[i]);
                }
            }
        };
        MatchModel.prototype.getMatchVo = function (playerId) {
            return this.getMatchList().find(function (vo) {
                return vo.playerId == playerId;
            });
        };
        MatchModel.prototype.setRecordList = function (battleRecords) {
            this._recordList = [];
            for (var i = 0, len = battleRecords.length; i < len; i++) {
                this._recordList.push(new game.MatchRecordVo(battleRecords[i], i));
            }
            this._recordList.sort(function (a, b) {
                return b.battleTime - a.battleTime;
            });
        };
        MatchModel.prototype.getRecordList = function () {
            return this._recordList ? this._recordList : [];
        };
        /** 获取段位名称 */
        MatchModel.prototype.getGradeName = function (score) {
            var tbData = this.getTbGrade(score);
            return tbData ? tbData.name : "";
        };
        /** 获取段位数据 */
        MatchModel.prototype.getTbGrade = function (score) {
            var tbData = TableData.getInstance().getTableByName(TableData.tb_match_score).data;
            for (var key in tbData) {
                var tbBox = tbData[key];
                if (score >= tbBox.score) {
                    return tbBox;
                }
            }
            return null;
        };
        /** 是否可以领取奖励 */
        MatchModel.prototype.isCanReward = function () {
            return this._boxList.some(function (vo) {
                return vo.isCanReward();
            });
        };
        return MatchModel;
    }());
    game.MatchModel = MatchModel;
})(game || (game = {}));
