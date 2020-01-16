var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var GloryModel = /** @class */ (function () {
        function GloryModel() {
            /** 战报 */
            this.reportDataDic = {};
            /** 是否打开过界面 */
            this.isHasShow = false;
            /** 报名截止时间 */
            this.endJoinTime = 0;
            /** 开赛时间 */
            this.startGameTime = 0;
            /** 当前赛季 */
            this.season = 0;
            /** 当前阶段 */
            this.curPhase = 0;
            this.serverPhase = 0; // 服务器的当前阶段：为0表示未开启荣耀之战，大于0表示开启的阶段
            // ================== 当前赛程 =================
            this._curMatchDic = {}; // 当前赛季数据
            // ================== 上届回顾 =================
            this._lastMatchDic = {}; // 上届赛季数据
        }
        GloryModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new GloryModel();
            }
            return this._instance;
        };
        /** 测试数据 */
        GloryModel.prototype.testChange = function () {
            var tbset = tb.TB_honour_set.getSet();
            tbset.match_interval = 20;
            tbset.bet_startime = 30;
            tbset.bet_endtime = 30;
            var date = new Date();
            date.setTime(App.serverTime);
            var curWeek = date.getDay();
            curWeek = curWeek == WeekNum.Sun ? 7 : curWeek;
            var hour = date.getHours();
            var minu = date.getMinutes();
            var tbData = TableData.getInstance().getTableByName(TableData.tb_honour).data;
            var lastTb;
            for (var key in tbData) {
                var tbHonor = tbData[key];
                if (tbHonor.ID == 1 || tbHonor.ID == 6) {
                    minu += 2;
                }
                else {
                    minu += 2;
                }
                tbHonor.star_time = lastTb ? __spreadArrays(lastTb.end_time) : [1, 0, 0];
                tbHonor.end_time = [curWeek, hour, minu];
                // 间隔30秒发一次,共发两次
                tbHonor.notice_time = lastTb ? [[curWeek, hour, tbHonor.star_time[2] + 0.5], [curWeek, hour, tbHonor.star_time[2] + 1]] : [[curWeek, hour, minu - 1], [curWeek, hour, minu - 0.5]];
                lastTb = tbHonor;
            }
            loghgy("测试：更改荣耀之战表数据", tbData);
            this.serverPhase = 1;
            this.initModel();
            this.endJoinTime = this.startGameTime - 60;
        };
        GloryModel.prototype.initModel = function () {
            this.requestThread = new game.GloryThread();
            this.curPhase = 0;
            this._curMatchDic[game.GroupType.benfu] = new game.MatchGroupListVo(game.GroupType.benfu);
            this._curMatchDic[game.GroupType.kuafu] = new game.MatchGroupListVo(game.GroupType.kuafu);
            this._lastMatchDic[game.GroupType.benfu] = new game.MatchGroupListVo(game.GroupType.benfu);
            this._lastMatchDic[game.GroupType.kuafu] = new game.MatchGroupListVo(game.GroupType.kuafu);
            this.updateTime();
            this.updateCurGroup();
            game.GloryNoticeMgr.getInstance().startRun();
        };
        /** 更新时间 */
        GloryModel.prototype.updateTime = function () {
            // 报名截止时间
            var timeAry = tb.TB_honour_set.getSet().apply_endtime;
            this.endJoinTime = game.GloryUtil.getFormatTime(Number(timeAry[0]), Number(timeAry[1]), Number(timeAry[2]));
            // 开赛时间
            var tbHonor = tb.TB_honour.getItemById(1);
            timeAry = tbHonor.end_time;
            this.startGameTime = game.GloryUtil.getFormatTime(Number(timeAry[0]), Number(timeAry[1]), Number(timeAry[2]));
        };
        /** 更新赛季信息 */
        GloryModel.prototype.updateSeason = function (data) {
            if (data.hasOwnProperty('session')) {
                this.season = data['session'];
            }
            if (data.hasOwnProperty("stage")) {
                this.serverPhase = data["stage"];
            }
            this.updateCurGroup();
        };
        GloryModel.prototype.updateServerPhase = function () {
            this.serverPhase = App.hero.kuafuHonourStage || App.hero.honourStage;
        };
        /** 更新当前阶段 */
        GloryModel.prototype.updateCurGroup = function () {
            if (this.curPhase <= 0 || App.serverTimeSecond >= game.GloryUtil.getGroupEndTime(this.curPhase)) {
                this.curPhase = game.GloryUtil.getCurGroup();
            }
            return this.curPhase;
        };
        /** 每周一0点更新 */
        GloryModel.prototype.weekRest = function () {
            this.updateTime();
            this.updateCurGroup();
            for (var key in this._curMatchDic) {
                var vo = this.getGroupListVo(Number(key));
                if (vo) {
                    vo.initData();
                }
            }
            this.serverPhase = 0;
            game.GloryNoticeMgr.getInstance().startRun();
        };
        /** 设置比赛数据  */
        GloryModel.prototype.setMatchInfo = function (type, group, data) {
            if (!data)
                return;
            var listVo = this._curMatchDic[type];
            listVo.setCurGroup(group);
            listVo.isLastMatch = false;
            listVo.updateMatchList(data["playerPos"], data['baseInfo'], data["winPos"], data["betInfo"]);
        };
        /** 获取列表 通过 本服或者跨服区别 */
        GloryModel.prototype.getGroupListVo = function (type) {
            return this._curMatchDic[type];
        };
        /** 获取列表 通过阶段 */
        GloryModel.prototype.getGroupListVoByGroup = function (group) {
            var type = game.GloryUtil.getHonorTypeByGroup(group);
            return this._curMatchDic[type];
        };
        /** 是否已报名 */
        GloryModel.prototype.isJoin = function () {
            return App.serverTimeSecond < App.hero.copyInfo.honourWarRegTime;
        };
        /** 是否在报名阶段 */
        GloryModel.prototype.isInJoinTime = function () {
            return App.serverTimeSecond < this.endJoinTime;
        };
        /** 是否比赛时间段中 */
        GloryModel.prototype.isInGameTime = function () {
            return App.serverTimeSecond >= this.startGameTime;
        };
        GloryModel.prototype.setMyMatchList = function (myList) {
            this._myMatchList = [];
            for (var _i = 0, myList_1 = myList; _i < myList_1.length; _i++) {
                var svo = myList_1[_i];
                if (svo.leftId && svo.rightId) {
                    var groupVo = new game.MatchGroupVo();
                    groupVo.setGroupInfo(svo);
                    groupVo.isMyMatch = true;
                    this._myMatchList.push(groupVo);
                }
            }
            this._myMatchList.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
        };
        GloryModel.prototype.getMyMatchList = function () {
            return this._myMatchList ? this._myMatchList : [];
        };
        //设置列表
        GloryModel.prototype.setLastList = function (type, group, data) {
            if (!data)
                return;
            var listVo = this._lastMatchDic[type];
            listVo.setCurGroup(group);
            listVo.isLastMatch = true;
            listVo.updateMatchList(data["playerPos"], data['baseInfo'], data["winPos"], data["betInfo"]);
        };
        /** 获取列表 */
        GloryModel.prototype.getLastListVo = function (type) {
            return this._lastMatchDic[type];
        };
        GloryModel.prototype.getLastRankList = function () {
            return this._lastRankList ? this._lastRankList : [];
        };
        GloryModel.prototype.setLastRankList = function (matchList) {
            if (!matchList)
                return;
            this._lastRankList = [];
            var _loop_1 = function (i) {
                var ary = matchList[i];
                // name,force,showGodId,showSkinId,playerId,head,headFrame,sex,level,guildName,lineupInfo
                var vo = { rank: i + 1, name: ary[0], force: ary[1], showGodId: ary[2], showSkinId: ary[3], playerId: ary[4], head: ary[5], headFrame: ary[6], sex: ary[7], level: ary[8], guildName: ary[9],
                    getLineupGods: function () {
                        var godArr = [];
                        for (var _i = 0, _a = ary[10][0]; _i < _a.length; _i++) {
                            var obj = _a[_i];
                            if (!obj) {
                                godArr.push(null);
                                continue;
                            }
                            var tbGod = tb.TB_god.get_TB_godById(obj[0]);
                            var godVo = new GodItemVo(tbGod);
                            godVo.starLevel = obj[1];
                            godVo.level = obj[2];
                            godVo.dataType = 1;
                            if (obj[3]) {
                                godVo.iSeverAttri = map2ary(obj[3]);
                            }
                            godArr.push(godVo);
                        }
                        return godArr;
                    },
                    getShenqiAry: function () {
                        return ary[10][1];
                    }
                };
                this_1._lastRankList.push(vo);
            };
            var this_1 = this;
            for (var i = 0; i < matchList.length; i++) {
                _loop_1(i);
            }
        };
        /** 是否可报名 */
        GloryModel.prototype.isCanJoin = function () {
            return this.isOpen() && !this.isJoin() && this.isInJoinTime();
        };
        /** 是否开启 */
        GloryModel.prototype.isOpen = function () {
            return App.IsSysOpen(ModuleConst.GLORY_FIGHT);
        };
        /** 押注提示 */
        GloryModel.prototype.getBetNotice = function () {
            var stime = tb.TB_honour_set.getSet().bet_endtime;
            return stime >= 60 ? LanMgr.getLan("", 10337, Math.ceil(stime / 60)) : LanMgr.getLan("", 10338, stime);
        };
        return GloryModel;
    }());
    game.GloryModel = GloryModel;
})(game || (game = {}));
