var game;
(function (game) {
    var IslandUtil = /** @class */ (function () {
        function IslandUtil() {
        }
        /** 请求自己信息 */
        IslandUtil.requestSelfInfo = function () {
            var _this = this;
            return new Promise(function (resolve) {
                if (_this._requestSelf) {
                    resolve();
                }
                else {
                    PLC.request(Protocol.center_mine_getMyMineInfo, null, function ($data) {
                        game.IslandModel.getInstance().myOreInfo = $data && $data.myInfo ? $data.myInfo : null;
                        _this._requestSelf = true;
                        resolve();
                    });
                }
            });
        };
        IslandUtil.setRequestFlag = function (flag) {
            this._requestSelf = flag;
        };
        /** 重置定时器 -- 恢复剩余掠夺次数 */
        IslandUtil.resetInterval = function () {
            if (!App.IsSysOpen(ModuleConst.Island))
                return;
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum);
            var maxCnt = tb.TB_island_set.getSet().plunder_max;
            Laya.timer.clear(this, this.updateCount);
            if (count < maxCnt) {
                Laya.timer.loop(1000, this, this.updateCount);
                this.updateCount();
            }
        };
        /** 更新剩余掠夺次数 */
        IslandUtil.updateCount = function () {
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum);
            var maxCnt = tb.TB_island_set.getSet().plunder_max;
            var replyTime = tb.TB_island_set.getSet().reply_time;
            var deltaTime = App.serverTimeSecond - App.hero.mineRobReplyTime;
            if (count >= maxCnt) {
                Laya.timer.clear(this, this.updateCount);
                return;
            }
            if (deltaTime >= replyTime) {
                var addCnt = Math.floor(deltaTime / replyTime);
                var lastCnt = Math.min((count + addCnt), maxCnt);
                App.hero.setOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum, lastCnt);
                App.hero.mineRobReplyTime = App.hero.mineRobReplyTime + (deltaTime * addCnt);
            }
        };
        // ===========  在神秘岛屿界面时刷新掠夺数据 ========
        /** 定时更新被掠夺或抢占时的收益列表数据 */
        IslandUtil.loopRequestRobbed = function () {
            this.stopRobLoop();
            Laya.timer.loop(10000, this, this.requestRobbed);
            // 打开页面第一次需请求
            this.requestRobbed(false, true);
        };
        IslandUtil.stopRobLoop = function () {
            Laya.timer.clear(this, this.requestRobbed);
        };
        /** 请求查看是否有被抢占时留下的收益未领取 */
        IslandUtil.requestRobbed = function (isGoto, force) {
            if (isGoto === void 0) { isGoto = false; }
            if (force === void 0) { force = false; }
            if (UIMgr.hasStage(UIConst.OreSettlementView))
                return;
            if (force || game.IslandModel.getInstance().hasNewRecord) {
                PLC.request(Protocol.game_mine_mineRobList, null, function ($data) {
                    if (!$data)
                        return;
                    var grabList = $data.grabList ? $data.grabList : [];
                    if (grabList.length > 0) {
                        var mgr = game.IslandQueueMgr.getInstance();
                        mgr.pushRecords(grabList, false);
                        mgr.showNoticeView();
                    }
                }, false);
            }
        };
        /** 定时更新矿点数据 */
        IslandUtil.loopRequestIsland = function (islandid) {
            this._curIslandId = islandid;
            Laya.timer.clear(this, this.requestAll);
            Laya.timer.loop(10000, this, this.requestAll);
            // 打开页面第一次需请求
            this.requestRobbed(false, true);
            // 自动刷新
            var time = game.IslandModel.getInstance().getNextRefreshTime();
            if (time > 0) {
                Laya.timer.once(time * 1000, this, this.requestOreList);
            }
        };
        IslandUtil.stopIslandLoop = function () {
            this._curIslandId = 0;
            this.stopRobLoop();
            Laya.timer.clear(this, this.requestAll);
            Laya.timer.clear(this, this.requestOreList);
        };
        /** 请求刷新矿点数据及掠夺数据 */
        IslandUtil.requestAll = function () {
            if (this._curIslandId == 0) {
                this.stopIslandLoop();
                return;
            }
            if (!UIMgr.hasStage(UIConst.OreMapView)) {
                this.stopIslandLoop();
                return;
            }
            this.requestOreList();
            this.requestRobbed(false, false);
        };
        /** 请求最新矿点数据 */
        IslandUtil.requestOreList = function () {
            var _this = this;
            if (this._curIslandId == 0) {
                return;
            }
            if (!UIMgr.hasStage(UIConst.OreMapView) && !UIMgr.hasStage(UIConst.IslandView)) {
                return;
            }
            var args = {};
            args[Protocol.center_mine_getMineList.args.islandId] = this._curIslandId;
            PLC.request(Protocol.center_mine_getMineList, args, function ($data) {
                if (!$data)
                    return;
                var islandInfo = game.IslandModel.getInstance().getIslandById(_this._curIslandId);
                if (islandInfo) {
                    islandInfo.setServerVo($data.mineList);
                    dispatchEvt(new game.IslandsEvent(game.IslandsEvent.UPDATE_ORE_LIST, _this._curIslandId));
                }
            }, false);
        };
        IslandUtil._requestSelf = false;
        return IslandUtil;
    }());
    game.IslandUtil = IslandUtil;
})(game || (game = {}));
