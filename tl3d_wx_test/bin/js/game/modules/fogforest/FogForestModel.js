var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var FogForestModel = /** @class */ (function () {
        function FogForestModel() {
            /** 自动下一关 */
            this.autoNext = true;
            /** 所有关卡数据数组 */
            this._guanqiaList = [];
        }
        FogForestModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FogForestModel();
            }
            return this._instance;
        };
        FogForestModel.prototype.initModel = function () {
            this.firstLogin = true;
            /** 获取到迷雾森林表数据 */
            this._guanqiaList = [];
            var tbData = TableData.getInstance().getTableByName(TableData.tb_forest).data;
            for (var key in tbData) {
                this._guanqiaList.push(new game.ForestGuanqiaVo(tbData[key]));
            }
            this.maxTbFloor = this._guanqiaList.length;
            this.initNum();
            dispatchEvt(new game.FogForestEvent(game.FogForestEvent.Init_FOREST));
        };
        FogForestModel.prototype.initNum = function () {
            this.forestCurFloor = App.hero.forestCurFloor;
        };
        /** 当前关卡+1 */
        FogForestModel.prototype.addForestCurFloor = function () {
            this.forestCurFloor += 1;
            dispatchEvt(new game.FogForestEvent(game.FogForestEvent.UPDATE_CUR_GUANQIA));
        };
        FogForestModel.prototype.getList = function () {
            return this._guanqiaList;
        };
        /** 获取到当前的关卡列表 三个一组:  中间显示当前关卡 */
        FogForestModel.prototype.getViewList = function () {
            var _this = this;
            var startIdx = 0;
            if (this.forestCurFloor > 0) {
                // 通关层数的索引
                startIdx = this._guanqiaList.findIndex(function (vo) {
                    return vo.tbForest.ID == _this.forestCurFloor;
                });
                // 当前可通关的索引
                startIdx = startIdx + 1;
            }
            // 打到最后几关
            if (startIdx >= this._guanqiaList.length - 1) {
                startIdx = this._guanqiaList.length - 2;
            }
            return this._guanqiaList.filter(function (vo, index) {
                if (startIdx == 0) {
                    return index == 0 || index == 1 || index == 2;
                }
                return index == startIdx || index == (startIdx + 1) || index == (startIdx - 1);
            });
        };
        /** 获取宝箱关卡 */
        FogForestModel.prototype.getChestList = function (sort) {
            if (sort === void 0) { sort = false; }
            var list = this._guanqiaList.filter(function (vo) {
                return vo.isHasBaoxiang();
            });
            list = __spreadArrays(list);
            if (sort) {
                list.forEach(function (vo) {
                    vo.sortNum = vo.tbForest.ID;
                    if (vo.isCanReward()) {
                        vo.sortNum -= 100000;
                    }
                    else if (vo.isReward()) {
                        vo.sortNum += 1000;
                    }
                    else {
                        vo.sortNum -= 10000;
                    }
                });
                list.sort(function (a, b) {
                    return a.sortNum - b.sortNum;
                });
            }
            return list;
        };
        /** 获取特殊关卡 */
        FogForestModel.prototype.getSpecialGuanqia = function () {
            return this._guanqiaList.find(function (info) {
                return info.isSpecial() && !info.isPass() && !info.isReward(); //特殊关卡并且没打过
            });
        };
        /** 是否全部通关(通关到玩家所打最高关卡) */
        FogForestModel.prototype.isAllFinish = function () {
            var len = this._guanqiaList.length;
            return len > 0 && this.forestCurFloor == this._guanqiaList[len - 1].tbForest.ID;
        };
        /** 是否到达最大关卡(通关到副本所拥有的最大关卡) */
        FogForestModel.prototype.isMaxFloor = function () {
            return this.forestCurFloor >= App.hero.forestMaxFloor;
        };
        /** 是否当前关卡 */
        FogForestModel.prototype.isCurrent = function (id) {
            var _this = this;
            var curIdx = this._guanqiaList.findIndex(function (vo) {
                return vo.tbForest.ID == _this.forestCurFloor;
            });
            var findIdx = this._guanqiaList.findIndex(function (vo) {
                return vo.tbForest.ID == id;
            });
            return findIdx - curIdx == 1;
        };
        //红点规则
        /** 是否可一键扫荡 红点规则*/
        FogForestModel.prototype.isCanOneKeyPass = function () {
            //判断是否完成
            if (!App.IsSysOpen(ModuleConst.FOG_FOREST) || this.isMaxFloor())
                return false;
            //判断是否到达VIP开启条件
            return App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.forest);
        };
        /** 是否有宝箱奖励可领取 红点规则*/
        FogForestModel.prototype.isCanReward = function () {
            if (!App.IsSysOpen(ModuleConst.FOG_FOREST))
                return false;
            return this.getChestList().some(function (vo) {
                return vo.isCanReward();
            });
        };
        /** (最大关卡的红点) */
        FogForestModel.prototype.isVisible = function () {
            if (!App.IsSysOpen(ModuleConst.FOG_FOREST))
                return false;
            if (this.forestCurFloor < App.hero.forestMaxFloor) {
                return true;
            }
            else {
                return false;
            }
        };
        FogForestModel.AUTO_NEXXT_CD = 5; //5s
        return FogForestModel;
    }());
    game.FogForestModel = FogForestModel;
})(game || (game = {}));
