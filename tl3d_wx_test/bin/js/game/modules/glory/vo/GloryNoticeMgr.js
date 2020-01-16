var game;
(function (game) {
    var GloryNoticeMgr = /** @class */ (function () {
        function GloryNoticeMgr() {
            this._gameTimeAry = [];
            // ============== 报名阶段 =============
            this._joinTimeAry = [];
        }
        GloryNoticeMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new GloryNoticeMgr();
            }
            return this._instance;
        };
        /** 开始公告 */
        GloryNoticeMgr.prototype.startRun = function () {
            var _this = this;
            // 监听系统开启
            game.GuideWeakManager.listenSysOpen(ModuleConst.GLORY_FIGHT, this)
                .then(function () {
                _this.checkJoinNotice();
                var model = game.GloryModel.getInstance();
                // 报名阶段没人报名时，需要在报名截止时间后去重新请求是否有人报名
                if (model.serverPhase == 0 && model.isInJoinTime()) {
                    var time = model.endJoinTime - App.serverTimeSecond;
                    Laya.timer.once(time * 1000, _this, _this.timeoutRequest);
                    return;
                }
                _this.checkInterval();
            });
        };
        // ============== 开始时间内 =============
        /** 报名阶段没人报名时，需要在报名截止时间后去重新请求是否有人报名 */
        GloryNoticeMgr.prototype.timeoutRequest = function () {
            var _this = this;
            Laya.timer.clear(this, this.timeoutRequest);
            game.GloryThread.requestSeason().then(function () {
                _this.checkInterval();
            });
        };
        /** 开始定时 从第二阶段的提示 */
        GloryNoticeMgr.prototype.checkInterval = function () {
            var model = game.GloryModel.getInstance();
            if (model.serverPhase == 0) {
                return;
            }
            this._gameTimeAry.length = 0;
            for (var i = game.GloryId.benfu_16t8; i <= game.GloryId.kuafu_juesai; i++) {
                var tbHonour = tb.TB_honour.getItemById(i);
                var timeAry = tbHonour ? tbHonour.notice_time : [];
                if (timeAry.length == 0)
                    continue;
                for (var _i = 0, timeAry_1 = timeAry; _i < timeAry_1.length; _i++) {
                    var ary = timeAry_1[_i];
                    var time = game.GloryUtil.getFormatTime(ary[0], ary[1], ary[2]);
                    if (time > App.serverTimeSecond) {
                        this._gameTimeAry.push([time, tbHonour.getNotice()]);
                    }
                }
            }
            this._gameTimeAry.sort(function (a, b) {
                return a[0] - b[0];
            });
            loghgy("阶段公告时间点列表", this._gameTimeAry);
            this.startGameInterval();
        };
        /** 阶段提示 */
        GloryNoticeMgr.prototype.startGameInterval = function () {
            if (this._gameTimeAry.length == 0) {
                Laya.timer.clear(this, this.sendGameNotice);
                return;
            }
            var ary = this._gameTimeAry.shift();
            var time = ary[0] - App.serverTimeSecond;
            loghgy("\u5EF6\u8FDF" + time + "\u79D2\u53D1\u9636\u6BB5\u516C\u544A");
            Laya.timer.once(time * 1000, this, this.sendGameNotice, [ary[1]]);
        };
        /** 发送阶段开始公告 */
        GloryNoticeMgr.prototype.sendGameNotice = function (content) {
            loghgy("发阶段公告：", content);
            game.ChatModel.getInstance().addCustomChat(content);
            game.ChatNoticeMgr.getInstance().addCustomNotice(content);
            this.startGameInterval();
        };
        /** 检测 */
        GloryNoticeMgr.prototype.checkJoinNotice = function () {
            // 报名公告时间
            this._joinTimeAry.length = 0;
            var timeAry = tb.TB_honour.getItemById(game.GloryId.benfu_haixuan).notice_time;
            for (var _i = 0, timeAry_2 = timeAry; _i < timeAry_2.length; _i++) {
                var ary = timeAry_2[_i];
                var time = game.GloryUtil.getFormatTime(ary[0], ary[1], ary[2]);
                if (time > App.serverTimeSecond) {
                    this._joinTimeAry.push(time);
                }
            }
            this._joinTimeAry.sort(function (a, b) {
                return a - b;
            });
            loghgy("报名公告时间点列表", this._joinTimeAry);
            this.startJoinInterval();
        };
        /** 报名阶段的提示 */
        GloryNoticeMgr.prototype.startJoinInterval = function () {
            if (this._joinTimeAry.length == 0) {
                Laya.timer.clear(this, this.sendJoinNotice);
                return;
            }
            var time = this._joinTimeAry.shift() - App.serverTimeSecond;
            loghgy("\u5EF6\u8FDF" + time + "\u79D2\u53D1\u62A5\u540D\u516C\u544A");
            Laya.timer.once(time * 1000, this, this.sendJoinNotice);
        };
        /** 发送报名公告 */
        GloryNoticeMgr.prototype.sendJoinNotice = function () {
            var tbHonour = tb.TB_honour.getItemById(game.GloryId.benfu_haixuan);
            loghgy("发报名公告：", tbHonour.getNotice());
            game.ChatModel.getInstance().addCustomChat(tbHonour.getNotice());
            game.ChatNoticeMgr.getInstance().addCustomNotice(tbHonour.getNotice());
            this.startJoinInterval();
        };
        return GloryNoticeMgr;
    }());
    game.GloryNoticeMgr = GloryNoticeMgr;
})(game || (game = {}));
