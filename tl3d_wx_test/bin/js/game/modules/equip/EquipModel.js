/**
* name
*/
var game;
(function (game) {
    var EquipModel = /** @class */ (function () {
        function EquipModel() {
            /**装备的限制信息 */
            this.tbEquipSet = tb.TB_equip_set.get_TB_equip_setById(1);
            /**装备大师等级 */
            this.equipMasterLevel = 0;
            /**精炼开启等级 */
            this.refineOpenLv = 0;
            this.curShowGod = null;
            this.equipTabName = [[LanMgr.getLan("", 12579), 0], [LanMgr.getLan("", 12580), ModuleConst.EQUIP_JINGLIAN], [LanMgr.getLan("", 12581), ModuleConst.EQUIP_BAOSHI]];
            this.equiptabredName = ["equip_tab_0", "equip_tab_1", "equip_tab_2"];
            this.arrOpertionName = [LanMgr.getLan("", 12582), LanMgr.getLan("", 12583), LanMgr.getLan("", 12584), LanMgr.getLan("", 12585)];
            this.arrLongAttriName = ["", LanMgr.getLan("", 12586), LanMgr.getLan("", 12587), LanMgr.getLan("", 12588)];
        }
        EquipModel.getInstance = function () {
            if (!EquipModel._instance) {
                EquipModel._instance = new EquipModel();
            }
            return EquipModel._instance;
        };
        EquipModel.prototype.getRefineOpenData = function () {
            return tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_JINGLIAN);
        };
        /**装备分解 */
        EquipModel.prototype.countReturnItem = function (data) {
            var tempObj = {};
            var temparry = new Array;
            for (var k = 0; k < data.length; k++) {
                var equipItemVo = data[k];
                var tempID = equipItemVo.quality * 10 + equipItemVo.slot;
                var recycleTab = tb.TB_equip_recycle.get_TB_equip_recycleById(tempID);
                var returnitem = recycleTab.return_item;
                for (var i = 0; i < returnitem.length; i++) {
                    var key = returnitem[i][0];
                    var keydata = Number(returnitem[i][1]);
                    if (tempObj[key])
                        tempObj[key] += keydata;
                    else
                        tempObj[key] = keydata;
                }
                if (equipItemVo.strengthLv > 0) {
                    var itemdata = tb.TB_equip_strength.get_TB_equip_strengthById(equipItemVo.strengthId).total_cost;
                    for (var i in itemdata) {
                        tempObj[itemdata[i][0]] = tempObj[itemdata[i][0]] ? Number(itemdata[i][1]) + tempObj[itemdata[i][0]] : Number(itemdata[i][1]);
                    }
                }
                if (equipItemVo.refineLv > 0) {
                    var itemdata = tb.TB_equip_refine.get_TB_equip_refineById(equipItemVo.refineId).total_cost;
                    for (var i in itemdata) {
                        tempObj[itemdata[i][0]] = tempObj[itemdata[i][0]] ? Number(itemdata[i][1]) + tempObj[itemdata[i][0]] : Number(itemdata[i][1]);
                    }
                }
            }
            for (var i in tempObj) {
                var vo = App.hero.createItemVo(tempObj[i], i);
                vo.show = true;
                vo.bag = true;
                temparry.push(vo);
            }
            return temparry;
        };
        /**一键装备 */
        EquipModel.prototype.equipQiuck = function (godVo, includeNull) {
            if (includeNull === void 0) { includeNull = false; }
            var arr = [];
            for (var i = 1; i <= EquipModel.EQUIP_COUNT; i++) {
                var vo = this.slotEquip(godVo, i, false);
                if (includeNull) {
                    arr.push(vo);
                }
                else {
                    if (vo) {
                        arr.push(vo);
                    }
                }
            }
            return arr;
        };
        /** 某个槽位是否可以穿戴装备
         */
        EquipModel.prototype.slotEquip = function (godVo, slot, isRedPoint) {
            if (isRedPoint === void 0) { isRedPoint = false; }
            if (!App.IsSysOpen(ModuleConst.EQUIPMENT))
                return null;
            // 每件装备的红点显示：只当某槽位未穿戴时，穿戴未被穿戴的装备
            var equipAry = App.hero.getEquips(slot, true).filter(function (vo) {
                return !vo.isExsitGod();
            });
            if (isRedPoint) {
                var arr = [];
                if (godVo.getEquipmentBySlot(slot))
                    return null;
                var equipVo = equipAry.find(function (vo) {
                    // return !vo.isExsitGod() && vo.strengthLv <= godVo.level && vo.refineLv <= tb.TB_equip_set.getRefineLimit(godVo.degree);
                    return !vo.isExsitGod();
                });
                return equipVo;
            }
            else {
                // 一键穿戴 ：不管某槽位是否装备都需判断，可穿未被穿戴的更高级装备
                var godEquip_1 = godVo.getEquipmentBySlot(slot); //神灵身上这个槽位的装备
                var betterEquip = null;
                if (godEquip_1) {
                    // 该位置存在装备，寻找更高等级装备 强化等级大于精炼等级
                    betterEquip = equipAry.find(function (vo) {
                        // return vo.strengthLv <= godVo.level && vo.refineLv <= tb.TB_equip_set.getRefineLimit(godVo.degree);
                        return vo.getSortNum() > godEquip_1.getSortNum();
                    });
                }
                else {
                    betterEquip = equipAry.find(function (vo) { return !vo.isExsitGod(); });
                }
                return betterEquip;
            }
        };
        /** 装备是否可以强化 */
        EquipModel.prototype.isCanSth = function (equipVo, godVo, showNotice) {
            if (showNotice === void 0) { showNotice = false; }
            if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
                showNotice && showToast(tbData.prompt);
                return false;
            }
            if (!equipVo && !godVo)
                return false;
            // 强化某个装备
            if (equipVo) {
                if (equipVo.isTopStrengthLv()) {
                    showNotice && showToast(LanMgr.getLan('', 10289));
                    return false;
                }
                var equipGod = App.hero.getGodVoById(equipVo.godId);
                if (!equipGod) {
                    showNotice && showToast(LanMgr.getLan('', 10290));
                    return false;
                }
                // if (equipVo.strengthLv >= equipGod.level) {
                // 	showNotice && showToast("装备强化等级不能超过英雄等级");
                // 	return false;
                // }
                var cost = map2ary(equipVo.strengthCost());
                var costType = App.isNotEnoughType(cost);
                if (costType != -1) {
                    showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
                    return false;
                }
            }
            // 一键强化
            if (godVo) {
                if (godVo.equipKeys.length <= 0) {
                    showNotice && showToast(LanMgr.getLan("", 10291));
                    return;
                }
                if (godVo.isAllEquipLvTop(EquipTabType.strength)) {
                    showNotice && showToast(LanMgr.getLan("", 10289));
                    return false;
                }
                // if (!godVo.isHaveLowEquip(EquipTabType.strength)) {
                // 	showNotice && showToast("装备强化等级不能超过英雄等级");
                // 	return false;
                // }
                var costType = App.isNotEnoughType(godVo.getStrengthCost());
                if (costType != -1) {
                    showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
                    return false;
                }
            }
            return true;
        };
        /** 装备是否可以精炼 */
        EquipModel.prototype.isCanRefine = function (equipVo, godVo, showNotice) {
            if (showNotice === void 0) { showNotice = false; }
            if (!App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_JINGLIAN);
                showNotice && showToast(tbData.prompt);
                return false;
            }
            // 精炼某个装备
            if (equipVo) {
                if (equipVo.isTopRefineLv()) {
                    showNotice && showToast(LanMgr.getLan('', 10292));
                    return false;
                }
                var equipGod = App.hero.getGodVoById(equipVo.godId);
                if (!equipGod) {
                    showNotice && showToast(LanMgr.getLan('', 10293));
                    return false;
                }
                // if (equipVo.refineLv >= tb.TB_equip_set.getRefineLimit(equipGod.degree)) {
                // 	showNotice && showToast("精炼等级已达上限，提高英雄阶级可以提高上限");
                // 	return false;
                // }
                var cost = map2ary(equipVo.getRefineCost());
                var costType = App.isNotEnoughType(cost);
                if (costType != -1) {
                    showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
                    return false;
                }
            }
            // 一键精炼
            if (godVo) {
                if (godVo.equipKeys.length <= 0) {
                    showNotice && showToast(LanMgr.getLan("", 10291));
                    return false;
                }
                if (godVo.isAllEquipLvTop(EquipTabType.refine)) {
                    showNotice && showToast(LanMgr.getLan("", 10292));
                    return false;
                }
                // if (!godVo.isHaveLowEquip(EquipTabType.refine)) {
                // 	showNotice && showToast("精炼等级已达上限，提高英雄阶级可以提高上限");
                // 	return false;
                // }
                var costType = App.isNotEnoughType(godVo.getRefineCost());
                if (costType != -1) {
                    showNotice && showToast(LanMgr.getLan("", Lans.cost, costType));
                    return false;
                }
            }
            return true;
        };
        /**　获取英雄的某种品质装备的数量 */
        EquipModel.prototype.getEquipQualityNum = function (godId, quality) {
            var godVo = App.hero.getGodVoById(godId);
            if (godVo) {
                return godVo.getQualityEquips(quality).length;
            }
            return 0;
        };
        /**
         * 创建一个装备对象
         * @param uuid 唯一索引
         * @param solt 槽位
         * @param godId 装备英雄id
         */
        EquipModel.prototype.createEquipVo = function (uuid, solt, $godId, $first) {
            if ($godId === void 0) { $godId = null; }
            var vo = new EquipItemVo(App.hero.bagEquipsObj[uuid]);
            vo.slot = solt;
            vo.uuid = uuid;
            vo.godId = $godId;
            vo.isFirst = $first;
            return vo;
        };
        EquipModel.EQUIP_COUNT = 4; // 装备种类数量
        return EquipModel;
    }());
    game.EquipModel = EquipModel;
})(game || (game = {}));
/**装备在xx界面打开的 */
var EquipType;
(function (EquipType) {
    /**背包界面 */
    EquipType[EquipType["BAG_VIEW"] = 0] = "BAG_VIEW";
    /**装备界面 */
    EquipType[EquipType["EQUIP_VIEW"] = 1] = "EQUIP_VIEW";
    /**英雄界面 */
    EquipType[EquipType["SHENLING_VIEW"] = 2] = "SHENLING_VIEW";
    /** 英雄宝石界面 */
    EquipType[EquipType["SHENLING_BAOSHI_VIEW"] = 3] = "SHENLING_BAOSHI_VIEW";
})(EquipType || (EquipType = {}));
/** 装备子界面类型 */
var EquipTabType;
(function (EquipTabType) {
    /**强化 */
    EquipTabType[EquipTabType["strength"] = 0] = "strength";
    /**精炼 */
    EquipTabType[EquipTabType["refine"] = 1] = "refine";
    /**宝石 */
    EquipTabType[EquipTabType["baoshi"] = 2] = "baoshi";
})(EquipTabType || (EquipTabType = {}));
