var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var GemstoneUtils = /** @class */ (function () {
        function GemstoneUtils() {
        }
        /**
         * 创建一个宝石对象
         * @param uuid 唯一索引
         */
        GemstoneUtils.createGemstoneVo = function (uuid, svo) {
            if (uuid === void 0) { uuid = ""; }
            if (svo === void 0) { svo = null; }
            var vo = new GemstoneItemVo();
            if (svo) {
                var parseObj = JSON.parse(JSON.stringify(svo));
                vo.setData(parseObj);
            }
            vo.uuid = uuid;
            return vo;
        };
        /** 和 */
        GemstoneUtils.getCompoundObj = function () {
            if (!this._compoundObj) {
                this._compoundObj = {};
                var tbList = tb.TB_gemstone_compound.getTBList();
                for (var i = 0; i < tbList.length; i++) {
                    var tbComp = tbList[i];
                    var obtainId = tbComp.obtain[0][0];
                    var obtainNum = tbComp.obtain[0][1];
                    var materialId = tbComp.material[0][0];
                    var materialNum = tbComp.material[0][1];
                    var tbItem = tb.TB_item.get_TB_itemById(obtainId);
                    var tbGem = tb.TB_gemstone_new.getTBOneById(tbItem.defined[0]);
                    this._compoundObj[obtainId] = { ID: tbComp.ID, obtainId: obtainId, obtainNum: obtainNum, materialId: materialId, materialNum: materialNum, gemType: tbGem.getType(), gemLv: tbGem.getLevel(), clinetNum: 0 };
                }
            }
            return this._compoundObj;
        };
        /** 获得可合成该宝石的数量 */
        GemstoneUtils.getCompoundNum = function (tbId) {
            var obj = this.getCompoundObjById(tbId);
            if (!obj)
                return 0;
            var ownNum = GemstoneUtils.getOwnNum(obj.materialId);
            return Math.floor(ownNum / obj.materialNum);
        };
        GemstoneUtils.getCompoundObjById = function (tbId) {
            var compoundObj = this.getCompoundObj();
            return compoundObj[tbId];
        };
        /** 获取该宝石的数量 */
        GemstoneUtils.getOwnNum = function (tbId) {
            var gemVo = game.GemstoneModel.getInstance().getGemstoneByTbID(tbId);
            return gemVo ? gemVo.num : 0;
        };
        /** 是否可合成 某些类型某个等级的宝石*/
        GemstoneUtils.isCanCompound = function (type, gemLv) {
            var compoundObj = GemstoneUtils.getCompoundObj();
            var isCan = false;
            for (var tbId in compoundObj) {
                // 判断是否同类型并且等级限制
                if ((type == 0 || compoundObj[tbId].gemType == type) && gemLv >= compoundObj[tbId].gemLv) {
                    if (GemstoneUtils.getCompoundNum(Number(tbId)) > 0) {
                        isCan = true;
                        break;
                    }
                }
            }
            return isCan;
        };
        /** 是否可合成 通过材料ID */
        GemstoneUtils.isCanCompoundByMaterial = function (itemId) {
            var compoundObj = GemstoneUtils.getCompoundObj();
            var isCan = false;
            for (var tbId in compoundObj) {
                // 判断材料ID是否一致
                if (compoundObj[tbId].materialId == itemId && GemstoneUtils.getCompoundNum(Number(tbId)) > 0) {
                    isCan = true;
                    break;
                }
            }
            return isCan;
        };
        /** 获取可以合成列表 */
        GemstoneUtils.getCanCompMaxLvList = function (type, gemLv) {
            var compoundObj = GemstoneUtils.getCompoundObj();
            // 合成ID,拥有的材料数量,等级，类型，合成数量
            var list = [];
            for (var tbId in compoundObj) {
                var vo = compoundObj[tbId];
                var count = GemstoneUtils.getOwnNum(vo.materialId);
                // 判断是否同类型并且等级限制
                if ((type == 0 || compoundObj[tbId].gemType == type) && gemLv >= vo.gemLv) {
                    list.push({ obtainId: tbId, ownMaterCount: count, gemLv: vo.gemLv, gemType: vo.gemType, hechengCount: 0 });
                }
            }
            // 低等级排序
            list.sort(function (a, b) {
                if (a.gemType == b.gemType) {
                    return a.gemLv - b.gemLv;
                }
                else {
                    return a.gemType - b.gemType;
                }
            });
            var _loop_1 = function (i) {
                var vo = list[i];
                var compVo = GemstoneUtils.getCompoundObjById(vo.obtainId);
                // 子材料
                var materVo = list.find(function (listVo) {
                    return compVo.materialId == listVo.obtainId;
                });
                var count = 0;
                if (materVo) {
                    count = materVo.hechengCount || 0;
                }
                // 设置合成数量
                if ((count + vo.ownMaterCount) >= compVo.materialNum) {
                    vo.hechengCount = Math.floor((count + vo.ownMaterCount) / compVo.materialNum) * compVo.obtainNum;
                }
            };
            // 合成预览
            for (var i = 0; i < list.length; i++) {
                _loop_1(i);
            }
            // 高等级排序
            list.sort(function (a, b) {
                if (a.gemType == b.gemType) {
                    return b.gemLv - a.gemLv;
                }
                else {
                    return a.gemType - b.gemType;
                }
            });
            var itemVoList = [];
            var typeList = [];
            for (var i = 0; i < list.length; i++) {
                var vo = list[i];
                if (vo.hechengCount > 0 && typeList.indexOf(vo.gemType) == -1) {
                    typeList.push(vo.gemType);
                    var itemVo = new ItemVo(vo.obtainId, vo.hechengCount);
                    itemVo.show = true;
                    itemVoList.push(itemVo);
                }
            }
            return itemVoList;
        };
        /** 获取可穿戴(或者更高基本)的宝石列表 -- 有变化的(宝石位置如果不变无视) */
        GemstoneUtils.getCanWearGemList = function (info) {
            // 获取未穿戴宝石
            var list = game.GemstoneModel.getInstance().getGemtones().filter(function (vo) {
                return !vo.isExsitGod();
            });
            // 等级越高排前面
            list.sort(function (a, b) {
                return b.gemLv - a.gemLv;
            });
            list.forEach(function (vo) {
                return vo.clientNum = vo.num;
            });
            // 选取背包中最高级别各四个
            var maxLvDic = { 1: [], 2: [], 3: [] };
            list.forEach(function (vo) {
                var type = vo.gemType;
                if (!maxLvDic[type]) {
                    maxLvDic[type] = [];
                }
                if (maxLvDic[type].length < 4) {
                    var needNum = 4 - maxLvDic[type].length;
                    for (var i = 0; i < needNum; i++) {
                        if (vo.clientNum <= 0)
                            break;
                        maxLvDic[type].push({ templateId: vo.templateId, uuid: vo.uuid, gemLv: vo.gemLv });
                        vo.clientNum--;
                    }
                }
            });
            // 空的槽位排在前面，空的先镶嵌最高级别
            var existList = [];
            var notExistList = [];
            for (var slot = 1; slot <= 12; slot++) {
                if (info.isExistGem(slot)) {
                    existList.push(slot);
                }
                else {
                    notExistList.push(slot);
                }
            }
            var slotList = __spreadArrays(notExistList, existList);
            var hasChange = false;
            var gemDic = {};
            // 十二个槽位 1 2 3 4 5 6 7 8 9
            for (var i = 0; i < slotList.length; i++) {
                var slot = slotList[i];
                var type = slot % game.GemstoneModel.gemstone_type_count == 0 ? game.GemstoneType.fangyu : slot % game.GemstoneModel.gemstone_type_count;
                var gemVo = info.getGemsBySlot(slot);
                var tempAry = maxLvDic[type];
                if (tempAry.length == 0)
                    continue;
                // 是否存在宝石
                if (gemVo) {
                    var findObj = tempAry[0];
                    if (findObj.gemLv > gemVo.gemLv) {
                        gemDic[slot] = findObj;
                        tempAry.splice(0, 1);
                        hasChange = true;
                    }
                }
                else {
                    var findObj = tempAry[0];
                    gemDic[slot] = findObj;
                    tempAry.splice(0, 1);
                    hasChange = true;
                }
            }
            return hasChange ? gemDic : {};
        };
        /** 获取宝石奖励列表 */
        GemstoneUtils.getGemRewardItemList = function (commonData) {
            var itemObj = {};
            var addGemstones = commonData['addGemstones'] || {};
            for (var uuid in addGemstones) {
                var vo = addGemstones[uuid];
                var tbId = vo.templateId;
                itemObj[tbId] = itemObj[tbId] ? (itemObj[tbId] + vo.num) : vo.num;
            }
            var clientAddGems1 = commonData['clientAddGemsByModifyNum'] || {};
            if (Object.keys(clientAddGems1).length > 0) {
                for (var tbId in clientAddGems1) {
                    var num = clientAddGems1[tbId];
                    itemObj[tbId] = itemObj[tbId] ? (itemObj[tbId] + num) : num;
                }
            }
            var clientAddGems2 = commonData['clientAddGemsByModifyGems'] || {};
            if (Object.keys(clientAddGems2).length > 0) {
                for (var tbId in clientAddGems2) {
                    var num = clientAddGems2[tbId];
                    itemObj[tbId] = itemObj[tbId] ? (itemObj[tbId] + num) : num;
                }
            }
            var itemList = [];
            for (var tbId in itemObj) {
                var vo = new ItemVo(Number(tbId), itemObj[tbId]);
                vo.show = false;
                itemList.push(vo);
            }
            return itemList;
        };
        return GemstoneUtils;
    }());
    game.GemstoneUtils = GemstoneUtils;
})(game || (game = {}));
