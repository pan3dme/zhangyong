var game;
(function (game) {
    var GloryUtil = /** @class */ (function () {
        function GloryUtil() {
        }
        /** 获取本周 某天某时某分 的时间戳 */
        GloryUtil.getFormatTime = function (week, hour, minu, second) {
            if (second === void 0) { second = 0; }
            var date = new Date();
            date.setTime(App.serverTime);
            date.setHours(0, 0, 0, 0);
            var curSecond = date.getTime() / 1000;
            var curWeek = date.getDay();
            curWeek = curWeek == WeekNum.Sun ? 7 : curWeek;
            var endDayTime = curWeek >= week ? (curSecond - (curWeek - week) * TimeConst.ONE_DAY_SEC) : (curSecond + (week - curWeek) * TimeConst.ONE_DAY_SEC);
            return endDayTime + hour * TimeConst.ONE_HOURS_SEC + minu * 60 + second;
        };
        /** 获取当前阶段 */
        GloryUtil.getCurGroup = function () {
            // 为0表示已全部结束
            var curPhase = 0;
            var tbIns = TableData.getInstance();
            var tbData = tbIns.getTableByName(TableData.tb_honour).data;
            for (var key in tbData) {
                var tbHonor = tbData[key];
                var sTime = GloryUtil.getFormatTime(Number(tbHonor.star_time[0]), Number(tbHonor.star_time[1]), Number(tbHonor.star_time[2]));
                var endTime = GloryUtil.getFormatTime(Number(tbHonor.end_time[0]), Number(tbHonor.end_time[1]), Number(tbHonor.end_time[2]));
                if (App.serverTimeSecond >= sTime && App.serverTimeSecond < endTime) {
                    curPhase = tbHonor.ID;
                    break;
                }
            }
            if (curPhase == 0) {
                curPhase = tbIns.getTableByName(TableData.tb_honour).maxId;
            }
            return curPhase;
        };
        /** 根据阶段判断本服或者跨服 */
        GloryUtil.getHonorTypeByGroup = function (group) {
            var type = [game.GloryId.benfu_haixuan, game.GloryId.benfu_16t8, game.GloryId.benfu_8t4, game.GloryId.benfu_4t2, game.GloryId.benfu_juesai, game.GloryId.kuafu_haixuan].indexOf(group) != -1 ? game.GroupType.benfu : game.GroupType.kuafu;
            return type;
        };
        /** 获取阶段开始时间 */
        GloryUtil.getGroupStartTime = function (group) {
            var tbHonor = tb.TB_honour.getItemById(group);
            return GloryUtil.getFormatTime(Number(tbHonor.star_time[0]), Number(tbHonor.star_time[1]), Number(tbHonor.star_time[2]));
        };
        /** 获取阶段结束时间 */
        GloryUtil.getGroupEndTime = function (group) {
            var tbHonor = tb.TB_honour.getItemById(group);
            return GloryUtil.getFormatTime(Number(tbHonor.end_time[0]), Number(tbHonor.end_time[1]), Number(tbHonor.end_time[2]));
        };
        /** 是否在押注时间内(战斗前5分钟不能投注) */
        GloryUtil.isInBetTime = function (group) {
            var stime = GloryUtil.getGroupStartTime(group);
            var endTime = GloryUtil.getGroupEndTime(group);
            var tbSet = tb.TB_honour_set.getSet();
            return App.serverTimeSecond >= stime && App.serverTimeSecond < (endTime - tbSet.bet_endtime);
        };
        /** 是否海选赛 */
        GloryUtil.isHaixuan = function (group) {
            var tbHonor = tb.TB_honour.getItemById(group);
            return tbHonor.ID == game.GloryId.benfu_haixuan || tbHonor.ID == game.GloryId.kuafu_haixuan;
        };
        /** 某阶段是否结束 */
        GloryUtil.isEndTime = function (group) {
            var endTime = GloryUtil.getGroupEndTime(group);
            return App.serverTimeSecond >= endTime;
        };
        /** 是否在跨服 */
        GloryUtil.isInKuafu = function (group) {
            return [game.GloryId.kuafu_16t8, game.GloryId.kuafu_8t4, game.GloryId.kuafu_4t2, game.GloryId.kuafu_juesai].indexOf(group) != -1;
        };
        return GloryUtil;
    }());
    game.GloryUtil = GloryUtil;
})(game || (game = {}));
