var game;
(function (game) {
    var TreasureModel = /** @class */ (function () {
        function TreasureModel() {
            // ---------------------  圣物数据增删改查 ---------------------
            /** 所有圣物列表 */
            this._treasureList = [];
        }
        TreasureModel.getInstance = function () {
            if (!TreasureModel._instance) {
                TreasureModel._instance = new TreasureModel();
            }
            return TreasureModel._instance;
        };
        TreasureModel.prototype.initModel = function () {
            this._treasureList.length = 0;
            for (var uuid in App.hero.treasures) {
                var vo = game.TreasureUtil.createTreasureVo(uuid, App.hero.treasures[uuid]);
                this._treasureList.push(vo);
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.UPDATE_TREASURE_DATA));
        };
        /** 新增圣物 {key:value}*/
        TreasureModel.prototype.addTreasure = function (addTreasures) {
            var ary = [];
            for (var uuid in addTreasures) {
                ary.push(uuid);
                if (App.hero.treasures.hasOwnProperty(uuid)) {
                    for (var key in addTreasures[uuid]) {
                        App.hero.treasures[uuid][key] = addTreasures[uuid][key];
                    }
                }
                else {
                    App.hero.treasures[uuid] = addTreasures[uuid];
                    var vo = game.TreasureUtil.createTreasureVo(uuid, addTreasures[uuid]);
                    this._treasureList.push(vo);
                }
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.ADD_TREASURE), ary);
        };
        /** 删除圣物 {key:value}*/
        TreasureModel.prototype.delTreasure = function (delTreasures) {
            var delUuid = [];
            for (var uuid in delTreasures) {
                if (App.hero.treasures.hasOwnProperty(uuid)) {
                    delete App.hero.treasures[uuid];
                    delUuid.push(uuid);
                }
            }
            var len = this._treasureList.length;
            for (var i = len - 1; i >= 0; i--) {
                var uuid = this._treasureList[i].uuid;
                if (delUuid.indexOf(uuid) != -1) {
                    this._treasureList.splice(i, 1);
                }
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.DEL_TREASURE), delUuid);
        };
        /** 更新圣物 : 更新圣物的神灵ID */
        TreasureModel.prototype.modifyTreasures = function (modifyTreasure) {
            var ary = [];
            var vo = null;
            for (var uuid in modifyTreasure) {
                vo = App.hero.treasures[uuid];
                if (!vo)
                    continue;
                vo.godId = modifyTreasure[uuid];
                var treasureVo = this.getTreasureByUuid(uuid);
                treasureVo.godId = modifyTreasure[uuid];
                ary.push(uuid);
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.MODIFY_TREASURE), ary);
        };
        /** 更新圣物 : 更新圣物的数量 */
        TreasureModel.prototype.modifyNum = function (modifyTreasureNum) {
            var ary = [];
            for (var uuid in modifyTreasureNum) {
                if (App.hero.treasures[uuid]) {
                    App.hero.treasures[uuid].num = modifyTreasureNum[uuid];
                }
                var treasureVo = this.getTreasureByUuid(uuid);
                if (!treasureVo)
                    continue;
                treasureVo.num = modifyTreasureNum[uuid];
                ary.push(uuid);
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.MODIFY_TREASURE), ary);
        };
        /** 更新神灵穿戴的圣物 */
        TreasureModel.prototype.modifyGodTreasures = function (modifyGodTreasures) {
            var godIds = [];
            for (var uuid in modifyGodTreasures) {
                godIds.push(uuid);
                var originGod = App.hero.gods[uuid];
                if (originGod) {
                    originGod.treasureKeys = modifyGodTreasures[uuid];
                }
                var godVo = App.hero.getGodVoById(uuid);
                var treasureObj = modifyGodTreasures[uuid];
                godVo.treasureKeys = [];
                for (var key in treasureObj) {
                    var treasureVo = this.getTreasureByUuid(treasureObj[key]);
                    if (!treasureVo) {
                        logerror("没有该圣物,uuid:", treasureObj[key]);
                    }
                    godVo.treasureKeys.push(treasureVo);
                }
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.MODIFY_GOD_TREASURE), godIds);
        };
        /** 更新神灵的圣物:强化升星等 */
        TreasureModel.prototype.updateTargetTreasures = function (targetTreasure) {
            var ids = [];
            for (var uuid in targetTreasure) {
                var targetObj = targetTreasure[uuid];
                var curObj = App.hero.treasures[uuid];
                if (!curObj)
                    continue;
                var treasureVo = this.getTreasureByUuid(uuid);
                for (var key in targetObj) {
                    curObj[key] = targetObj[key];
                    treasureVo[key] = targetObj[key];
                }
                ids.push(uuid);
            }
            dispatchEvt(new game.TreasureEvent(game.TreasureEvent.MODIFY_TARGET_TREASURE), ids);
        };
        /** 获取圣物 */
        TreasureModel.prototype.getTreasureByUuid = function (uuid) {
            return this._treasureList.find(function (vo) {
                return vo.uuid == uuid;
            });
        };
        TreasureModel.prototype.getTreasures = function () {
            return this._treasureList;
        };
        // ---------------------  界面显示 ---------------------
        /** 获取选择圣物界面：显示所有未穿戴的圣物 */
        TreasureModel.prototype.getTreasureChooseList = function (sort) {
            var ary = this._treasureList.filter(function (vo) {
                return !vo.isExsitGod();
            });
            if (sort) {
                // 品质-》星级-》强化等级 ID从低到高
                ary.forEach(function (vo) {
                    vo.show = false;
                    vo.sortNum = vo.quality * 10000000 + vo.starLv * 100000 + vo.strengthLv * 1000 - vo.templateId;
                });
                ary.sort(function (a, b) {
                    return b.sortNum - a.sortNum;
                });
            }
            return ary;
        };
        /** 获取强化圣物列表 只显示橙色以下品质圣物*/
        TreasureModel.prototype.getStrengthTreasureList = function (ingoreList) {
            ingoreList = ingoreList || [];
            // 过滤已佩戴及橙色以上的(包括),再过滤掉传入的忽略列表
            var treasuras = this._treasureList.filter(function (vo) {
                return !vo.isExsitGod() && vo.quality < QualityConst.ORANGE && ingoreList.indexOf(vo.uuid) == -1;
            });
            // 品质->星级>强化从低到高等级 ID从低到高
            treasuras.forEach(function (vo) {
                vo.show = false;
                vo.sortNum = vo.quality * 10000000 + vo.starLv * 100000 - vo.strengthLv * 1000 - vo.templateId;
            });
            treasuras.sort(function (a, b) {
                return a.sortNum - b.sortNum;
            });
            var ary = treasuras;
            var num = App.hero.getBagItemNum(CostTypeKey.treasure_exp);
            if (num > 0) {
                var itemVo = new ItemVo(CostTypeKey.treasure_exp, num);
                itemVo.show = false;
                ary.unshift(itemVo);
            }
            return ary;
        };
        /** 获取背包圣物列表 */
        TreasureModel.prototype.getBagViewList = function () {
            var ary = this._treasureList.filter(function (vo) {
                return !vo.isExsitGod();
            });
            // 品质-》星级-》强化等级 ID从低到高
            ary.forEach(function (vo) {
                vo.show = false;
                vo.sortNum = vo.quality * 10000000 + vo.starLv * 100000 + vo.strengthLv * 1000 - vo.templateId;
            });
            ary.sort(function (a, b) {
                return b.sortNum - a.sortNum;
            });
            return ary;
        };
        /** 图鉴列表 */
        TreasureModel.prototype.getTujianViewList = function () {
            if (!this._tujianList) {
                this._tujianList = [];
                var ary = [];
                var tbData = TableData.getInstance().getTableByName(TableData.tb_item).data;
                for (var key in tbData) {
                    var tbItem = tbData[key];
                    if (tbItem.type == iface.tb_prop.itemTypeKey.treasure) {
                        ary.push(tbItem);
                    }
                }
                this._tujianList = ary.map(function (tbObj) {
                    var tbStrenList = tb.TB_treasure.getList2(tbObj.quality, tbObj.defined[0]);
                    var maxTbStren = tbStrenList[tbStrenList.length - 1];
                    var maxStrengthLv = maxTbStren ? maxTbStren.getStrengthLv() : 0;
                    var tbStrarList = tb.TB_treasure_star.getList2(tbObj.quality, tbObj.defined[0]);
                    var maxTbStar = tbStrarList[tbStrarList.length - 1];
                    var maxStarLv = maxTbStar ? maxTbStar.getStarlv() : 0;
                    var obj = { templateId: tbObj.ID, quality: tbObj.quality, num: 0, strengthLv: maxStrengthLv, starLv: maxStarLv };
                    var vo = new TreasureItemVo(obj);
                    vo.show = true;
                    return vo;
                });
            }
            return this._tujianList;
        };
        /**　获取可重生的圣物列表　养成过的紫色品质以上且没被穿戴的圣物 */
        TreasureModel.prototype.getRebirthTreasureList = function () {
            var list = this._treasureList.filter(function (vo) {
                vo.show = false;
                return vo.isCanRebirth();
            });
            return list;
        };
        return TreasureModel;
    }());
    game.TreasureModel = TreasureModel;
})(game || (game = {}));
