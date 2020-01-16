var game;
(function (game) {
    var IslandModel = /** @class */ (function () {
        function IslandModel() {
            /** 是否有新记录 */
            this.hasNewRecord = false;
            /** 是否占领到期 */
            this.hasEndTime = false;
        }
        IslandModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new IslandModel();
            }
            return this._instance;
        };
        IslandModel.prototype.initModel = function () {
            this._islandsList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_island).data;
            for (var key in tbData) {
                this._islandsList.push(new game.IslandInfoVo(tbData[key]));
            }
            this._islandsList.sort(function (a, b) {
                return b.tbIsland.type == a.tbIsland.type ? (b.tbIsland.type - a.tbIsland.type) : (b.tbIsland.ID - a.tbIsland.ID);
            });
            game.IslandUtil.resetInterval();
        };
        IslandModel.prototype.setMyOreInfo = function (info) {
            // 占领成功，替换
            if (info) {
                this.clearMyInfo();
                this.myOreInfo = info;
            }
        };
        /** 清除自己的占领信息 */
        IslandModel.prototype.clearMyInfo = function () {
            var selfInfo = this.getSelfOre();
            if (selfInfo) {
                selfInfo.clearDetailInfo();
            }
            this.myOreInfo = null;
            game.IslandUtil.setRequestFlag(false);
        };
        IslandModel.prototype.updateNewRecord = function (flag) {
            this.hasNewRecord = flag;
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.UPDATE_RECORD_INFO));
        };
        IslandModel.prototype.updateEndTime = function (flag) {
            if (flag == this.hasEndTime)
                return;
            this.hasEndTime = flag;
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.UPDATE_RECORD_INFO));
        };
        IslandModel.prototype.getList = function () {
            return this._islandsList;
        };
        IslandModel.prototype.getIslandById = function (id) {
            return this._islandsList.find(function (vo) {
                return vo.tbIsland.ID == id;
            });
        };
        /** 获取自己占领的矿产 */
        IslandModel.prototype.getSelfOre = function () {
            for (var _i = 0, _a = this._islandsList; _i < _a.length; _i++) {
                var island = _a[_i];
                var find = island.oreList.find(function (vo) {
                    return vo.hasUser() && vo.svo.playerId == App.hero.playerId;
                });
                ;
                if (find) {
                    return find;
                }
            }
            return null;
        };
        /** 获取购买掠夺次数消耗的钻石数 */
        IslandModel.prototype.getBuyCost = function () {
            var set = tb.TB_island_set.getSet();
            var costAry = set.buy_cost;
            var count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum);
            if (count >= costAry.length) {
                return costAry[costAry.length - 1];
            }
            else {
                return costAry[count];
            }
        };
        /** 获取剩余占领次数 */
        IslandModel.prototype.getOccupyCount = function () {
            return tb.TB_island_set.getSet().daily_num - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.mineOccupyNum);
        };
        /** 获取还需多少秒刷新矿点 */
        IslandModel.prototype.getNextRefreshTime = function () {
            var date = new Date(App.serverTime);
            var hour = date.getHours();
            var minu = date.getMinutes();
            var second = date.getSeconds();
            var rtime = tb.TB_island_set.getSet().refresh_time;
            var total = (24 + Number(rtime[0])) * 3600;
            for (var _i = 0, rtime_1 = rtime; _i < rtime_1.length; _i++) {
                var time = rtime_1[_i];
                if (hour < Number(time)) {
                    total = Number(time) * 3600;
                    break;
                }
            }
            return total - hour * 3600 - minu * 60 - second;
        };
        IslandModel.ORE_COLORS = [
            "",
            "#3cec55",
            "#3cecd1",
            "#af49cd",
            "#ff6633",
            "#ec3c51"
        ];
        return IslandModel;
    }());
    game.IslandModel = IslandModel;
})(game || (game = {}));
