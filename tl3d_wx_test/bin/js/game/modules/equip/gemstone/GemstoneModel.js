var game;
(function (game) {
    var GemstoneType;
    (function (GemstoneType) {
        GemstoneType[GemstoneType["shengming"] = 1] = "shengming";
        GemstoneType[GemstoneType["gongji"] = 2] = "gongji";
        GemstoneType[GemstoneType["fangyu"] = 3] = "fangyu";
    })(GemstoneType = game.GemstoneType || (game.GemstoneType = {}));
    var GemstoneModel = /** @class */ (function () {
        function GemstoneModel() {
            // ---------------------  宝石数据增删改查  ---------------------
            /** 拥有的宝石 */
            this._gemstoneList = [];
        }
        GemstoneModel.getInstance = function () {
            if (!GemstoneModel._instance) {
                GemstoneModel._instance = new GemstoneModel();
            }
            return GemstoneModel._instance;
        };
        GemstoneModel.prototype.initData = function () {
            this._gemstoneList.length = 0;
            for (var uuid in App.hero.gemstones) {
                var vo = game.GemstoneUtils.createGemstoneVo(uuid, App.hero.gemstones[uuid]);
                this._gemstoneList.push(vo);
            }
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.INIT_GEM_DATA));
        };
        /** 新增宝石 {key:value}*/
        GemstoneModel.prototype.addGemstones = function (addGemstones) {
            var ary = [];
            for (var uuid in addGemstones) {
                ary.push(uuid);
                App.hero.gemstones[uuid] = addGemstones[uuid];
                var vo = game.GemstoneUtils.createGemstoneVo(uuid, addGemstones[uuid]);
                this._gemstoneList.push(vo);
            }
            game.BagModel.getInstance().updateGemstones();
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.ADD_GEMTONE), ary);
        };
        /** 删除宝石 {key:value}*/
        GemstoneModel.prototype.delGemstone = function (delGemstones) {
            var delUuid = [];
            for (var uuid in delGemstones) {
                App.hero.gemstones[uuid] = null;
                delete App.hero.gemstones[uuid];
                delUuid.push(uuid);
            }
            var len = this._gemstoneList.length;
            for (var i = len - 1; i >= 0; i--) {
                var uuid = this._gemstoneList[i].uuid;
                if (delUuid.indexOf(uuid) != -1) {
                    this._gemstoneList.splice(i, 1);
                }
            }
            game.BagModel.getInstance().updateGemstones();
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.DEL_GEMTONE), delUuid);
        };
        /** 更新宝石 : 更新宝石的数量 */
        GemstoneModel.prototype.modifyNum = function (commonData, modifyGemstoneNum) {
            //增量的宝石数据,客户端计算
            var clientAddGems = {};
            var ary = [];
            for (var uuid in modifyGemstoneNum) {
                var oldNum = App.hero.gemstones[uuid].num;
                var newNum = modifyGemstoneNum[uuid];
                if (newNum > oldNum) {
                    var tbId = App.hero.gemstones[uuid].templateId;
                    var addNum = newNum - oldNum;
                    clientAddGems[tbId] = clientAddGems[tbId] ? (clientAddGems[tbId] + addNum) : addNum;
                }
                App.hero.gemstones[uuid].num = newNum;
                var gemstoneVo = this.getGemstoneByUuid(uuid);
                gemstoneVo.num = newNum;
                ary.push(uuid);
            }
            commonData['clientAddGemsByModifyNum'] = clientAddGems;
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.MODIFY_GEMTONE), ary);
        };
        /** 更新宝石 : 更新宝石的神灵ID */
        GemstoneModel.prototype.modifyGemstones = function (commonData, modifyGemstones) {
            //增量的宝石数据,客户端计算
            var clientAddGems = {};
            var ary = [];
            for (var uuid in modifyGemstones) {
                var serverGems = App.hero.gemstones[uuid];
                var newGodId = modifyGemstones[uuid];
                // 从神灵身上脱下来
                if (serverGems.godId && !newGodId) {
                    clientAddGems[serverGems.templateId] = clientAddGems[serverGems.templateId] ? (clientAddGems[serverGems.templateId] + 1) : 1;
                }
                serverGems.godId = newGodId;
                var gemstoneVo = this.getGemstoneByUuid(uuid);
                gemstoneVo.godId = newGodId;
                ary.push(uuid);
            }
            commonData['clientAddGemsByModifyGems'] = clientAddGems;
            game.BagModel.getInstance().updateGemstones();
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.MODIFY_GEMTONE), ary);
        };
        /** 更新神灵镶嵌的宝石 */
        GemstoneModel.prototype.modifyGodGemstones = function (modifyGodGemstones) {
            var godUuids = [];
            for (var uuid in modifyGodGemstones) {
                godUuids.push(uuid);
                var godObj = App.hero.gods[uuid];
                if (godObj) {
                    godObj.gemInfo = modifyGodGemstones[uuid];
                }
                var godVo = App.hero.getGodVoById(uuid);
                if (godVo) {
                    godVo.setgemInfo(modifyGodGemstones[uuid]);
                }
            }
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.MODIFY_GOD_GEMTONE), godUuids);
        };
        /** 获取宝石通过唯一ID */
        GemstoneModel.prototype.getGemstoneByUuid = function (uuid) {
            return this._gemstoneList.find(function (vo) {
                return vo.uuid == uuid;
            });
        };
        /** 获取未镶嵌的宝石 通过道具表ID -- 因为已镶嵌的可能会多个,同种宝石镶嵌到多个神灵去*/
        GemstoneModel.prototype.getGemstoneByTbID = function (tbid) {
            return this._gemstoneList.find(function (vo) {
                return !vo.isExsitGod() && vo.templateId == tbid;
            });
        };
        /** 获取未镶嵌的宝石 通过宝石类型 */
        GemstoneModel.prototype.getGemstoneByType = function (type) {
            return this._gemstoneList.find(function (vo) {
                return !vo.isExsitGod() && vo.gemType == type;
            });
        };
        GemstoneModel.prototype.getGemtones = function () {
            return this._gemstoneList;
        };
        /** 是否有更换的宝石 */
        GemstoneModel.prototype.isHasBetterGem = function (type, curLv) {
            return this._gemstoneList.some(function (vo) {
                return !vo.isExsitGod() && vo.gemType == type && vo.gemLv > curLv && vo.num > 0;
            });
        };
        // ---------------------  界面显示 ---------------------
        /** 获取替换界面的宝物列表 未镶嵌的宝石的某类宝石 */
        GemstoneModel.prototype.getReplaceViewList = function (type, sort) {
            if (sort === void 0) { sort = false; }
            var ary = this._gemstoneList.filter(function (vo) {
                return !vo.isExsitGod() && (type == 0 ? true : type == vo.gemType);
            });
            if (sort) {
                // 品质-》星级-》强化等级 ID从低到高
                ary.forEach(function (vo) {
                    vo.show = false;
                    vo.sortNum = vo.gemLv;
                });
                ary.sort(function (a, b) {
                    return b.sortNum - a.sortNum;
                });
            }
            return ary;
        };
        /** 获取合成列表 */
        GemstoneModel.prototype.getCompoundViewList = function () {
            var list = this._gemstoneList.filter(function (vo) {
                return !vo.isExsitGod();
            });
            list.sort(function (a, b) {
                return a.gemLv - b.gemLv;
            });
            return list;
        };
        /** 宝石种类数量 */
        GemstoneModel.gemstone_type_count = 3;
        /** 最大等级 */
        GemstoneModel.max_gem_lv = 8;
        return GemstoneModel;
    }());
    game.GemstoneModel = GemstoneModel;
})(game || (game = {}));
