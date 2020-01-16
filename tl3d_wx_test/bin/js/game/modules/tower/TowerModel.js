var game;
(function (game) {
    var TowerModel = /** @class */ (function () {
        function TowerModel() {
            /** 试炼塔重置时间 毫秒*/
            this.resetTime = 0;
        }
        TowerModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TowerModel();
            }
            return this._instance;
        };
        /** 初始化列表数据 */
        TowerModel.prototype.initModel = function () {
            var arr = tb.TB_copy.shilianFuben;
            for (var i = 0, len = arr.length; i < len; i++) {
                var copy = arr[i];
                if (copy.sub_type == game.ShiliantaType.jiandan) {
                    this.putongModel = new game.GuanqiaModelVo(copy);
                }
                else if (copy.sub_type == game.ShiliantaType.kunnan) {
                    this.kunnanModel = new game.GuanqiaModelVo(copy);
                }
            }
            this.updateTime();
            this.updateData();
        };
        /** cd时间到，重置试炼塔数据 */
        TowerModel.prototype.resetTowerData = function () {
            if (App.serverTime > this.resetTime) {
                App.hero.towerCopyInfo = {};
                this.updateTime();
                this.updateData();
                logdebug('重置时间到,重置试炼塔数据：');
            }
        };
        /** 更新重置倒计时 */
        TowerModel.prototype.updateTime = function () {
            this.resetTime = getNextMonthTime(App.serverTime);
        };
        /** 更新关卡数据 */
        TowerModel.prototype.updateData = function () {
            this.putongModel.updateGuanqia();
            this.kunnanModel.updateGuanqia();
        };
        /** 获取难度模式数据 */
        TowerModel.prototype.getGuanqiaModelVo = function (subType) {
            if (subType == game.ShiliantaType.jiandan) {
                return this.putongModel;
            }
            else if (subType == game.ShiliantaType.kunnan) {
                return this.kunnanModel;
            }
            return null;
        };
        TowerModel.prototype.getJiangliList = function (type) {
            return type == game.ShiliantaType.jiandan ? this.putongModel.getJiangliList() : this.kunnanModel.getJiangliList();
        };
        /** 获取关卡 */
        TowerModel.prototype.getGuanqiaByIndex = function (idx, type) {
            if (type === void 0) { type = game.ShiliantaType.jiandan; }
            return type == game.ShiliantaType.jiandan ? this.putongModel.getGuanqiaVoByIndex(idx) : this.kunnanModel.getGuanqiaVoByIndex(idx);
        };
        TowerModel.prototype.getGuanqiaById = function (id, type) {
            if (type === void 0) { type = game.ShiliantaType.jiandan; }
            if (type == game.ShiliantaType.all) {
                return this.putongModel.getGuanqiaVoById(id) || this.kunnanModel.getGuanqiaVoById(id);
            }
            return type == game.ShiliantaType.jiandan ? this.putongModel.getGuanqiaVoById(id) : this.kunnanModel.getGuanqiaVoById(id);
        };
        /** 是否领取 */
        TowerModel.prototype.isRewardByIndex = function (idx, type) {
            if (type === void 0) { type = game.ShiliantaType.jiandan; }
            var guanqiavo = this.getGuanqiaByIndex(idx, type);
            return guanqiavo.isReward();
        };
        TowerModel.prototype.isRewardById = function (id, type) {
            if (type === void 0) { type = game.ShiliantaType.jiandan; }
            var guanqiavo = this.getGuanqiaById(id, type);
            return guanqiavo.isReward();
        };
        /** 是否通关副本 */
        TowerModel.prototype.isPassCopy = function (copyId) {
            var tbCpInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            var tbCopy = tb.TB_copy.get_TB_copyById(tbCpInfo.area);
            var curCopyId = this.getMaxCopyIdByChapter(tbCopy.chapter);
            return curCopyId >= copyId;
        };
        /**
         * 获得当前章节通关的最高Id
         * 如当前章节，未通关过任何关卡，返回-1
         * @param chapter
         */
        TowerModel.prototype.getMaxCopyIdByChapter = function (chapter) {
            var copyid = -1;
            if (App.hero.towerCopyInfo.hasOwnProperty(chapter)) {
                copyid = Number(App.hero.towerCopyInfo[chapter]);
            }
            return copyid;
        };
        TowerModel.prototype.getMaxCopyId = function () {
            var copyid = -1;
            for (var key in App.hero.towerCopyInfo) {
                if (App.hero.towerCopyInfo[key] > copyid) {
                    copyid = App.hero.towerCopyInfo[key];
                }
            }
            return copyid;
        };
        TowerModel.prototype.setRankList = function (list, myRank) {
            var ary = [];
            for (var id in list) {
                var vo = new game.RankVo(list[id], parseInt(id));
                ary.push(vo);
            }
            this._rankListVo = {
                getList: function () { return ary; },
                getRankDesc: function () { return myRank > 0 ? LanMgr.getLan('', 10029, myRank) : LanMgr.getLan('', 10028); }
            };
        };
        TowerModel.prototype.getRankListVo = function () {
            return this._rankListVo;
        };
        TowerModel.prototype.getCopyRankDesc = function (copyId) {
            var info = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if (info) {
                var copy = tb.TB_copy.get_TB_copyById(info.area);
                return LanMgr.getLan('', (copy.sub_type == game.ShiliantaType.jiandan ? 10102 : 10103), info.area_number);
            }
            return '无';
        };
        TowerModel.prototype.getSelfRankDesc = function () {
            var copyId = App.hero.towerCopyInfo['2'] ? App.hero.towerCopyInfo['2'] : App.hero.towerCopyInfo['1'];
            return this.getCopyRankDesc(copyId);
        };
        TowerModel.PAGE_NUM = 10;
        return TowerModel;
    }());
    game.TowerModel = TowerModel;
})(game || (game = {}));
