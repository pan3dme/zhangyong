var game;
(function (game) {
    var BossModel = /** @class */ (function () {
        function BossModel() {
            this._bossList = [];
            this._sortAry = [];
        }
        BossModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new BossModel();
            }
            return this._instance;
        };
        BossModel.prototype.initModel = function () {
            var tb = TableData.getInstance().getTableByName(TableData.tb_worldboss).data;
            for (var id in tb) {
                this._bossList.push(new game.BossInfoVo(tb[id]));
            }
            this.refreshInterval();
        };
        /** 刷新定时器 */
        BossModel.prototype.refreshInterval = function () {
            if (!App.IsSysOpen(ModuleConst.WORLD_BOSS))
                return;
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            var maxCnt = tb.TB_boss_set.getSet().max_time;
            Laya.timer.clear(this, this.updateCount);
            if (count < maxCnt) {
                Laya.timer.loop(1000, this, this.updateCount);
                this.updateCount();
            }
        };
        /** 更新数量 */
        BossModel.prototype.updateCount = function () {
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            var maxCnt = tb.TB_boss_set.getSet().max_time;
            var replyTime = tb.TB_boss_set.getSet().reply_time;
            var deltaTime = App.serverTimeSecond - App.hero.worldBossReplyTime;
            if (count >= maxCnt) {
                Laya.timer.clear(this, this.updateCount);
                return;
            }
            if (deltaTime >= replyTime) {
                var addCnt = Math.floor(deltaTime / replyTime);
                var lastCnt = Math.min((count + addCnt), maxCnt);
                App.hero.setOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum, lastCnt);
                App.hero.worldBossReplyTime = App.hero.worldBossReplyTime + (deltaTime * addCnt);
            }
        };
        /** 请示刷新数据 */
        BossModel.prototype.startInterval = function () {
            clearInterval(this._tickId);
            this._tickId = setInterval(this.requestBossInfo.bind(this), 10000);
        };
        BossModel.prototype.stopInterval = function () {
            clearInterval(this._tickId);
        };
        BossModel.prototype.requestBossInfo = function () {
            var _this = this;
            PLC.request(Protocol.center_boss_getWorldBossInfo, null, function ($data) {
                if (!$data)
                    return;
                _this.updateBossInfo($data);
            });
        };
        /** 更新boss数据 */
        BossModel.prototype.updateBossInfo = function ($data) {
            if (!$data)
                return;
            var curAry = [];
            for (var key in $data.WorldBossInfo) {
                var info = $data.WorldBossInfo[key];
                var boss = this.getBossInfo(info.bossId);
                boss.setSvo(info);
                curAry.push(boss.sortNum);
            }
            dispatchEvt(new game.BossEvent(game.BossEvent.UPDATE_BOSS_INFO));
        };
        /** 获取boss列表 */
        BossModel.prototype.getBossList = function () {
            return this._bossList;
        };
        /** 获取boss信息 */
        BossModel.prototype.getBossInfo = function (id) {
            return this._bossList.find(function (info) {
                return info.tbBoss.ID == id;
            });
        };
        return BossModel;
    }());
    game.BossModel = BossModel;
})(game || (game = {}));
