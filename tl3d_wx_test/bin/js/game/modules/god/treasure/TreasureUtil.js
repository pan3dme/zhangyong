var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var TreasureUtil = /** @class */ (function () {
        function TreasureUtil() {
        }
        /**
         * 创建一个圣物对象
         * @param uuid 唯一索引
         * @param solt 槽位、类型
         */
        TreasureUtil.createTreasureVo = function (uuid, svo, slot) {
            var parseObj = JSON.parse(JSON.stringify(svo));
            var vo = new TreasureItemVo(parseObj);
            vo.uuid = uuid;
            if (slot) {
                vo.slot = slot;
            }
            return vo;
        };
        /**
         * 获取界面属性字符串 : 强化与升星
         */
        TreasureUtil.getTbAttrStrAry = function (tbData) {
            if (!tbData)
                return [];
            var arrAttstr = LanMgr.attrName;
            var showPercent = [iface.tb_prop.attrTypeKey.effectHit, iface.tb_prop.attrTypeKey.effectResist, iface.tb_prop.attrTypeKey.crit,
                iface.tb_prop.attrTypeKey.critDmg,
                iface.tb_prop.attrTypeKey.effectResist,
                iface.tb_prop.attrTypeKey.suckBlood,
                iface.tb_prop.attrTypeKey.strikeBack,
                iface.tb_prop.attrTypeKey.rampage,
                iface.tb_prop.attrTypeKey.dizzy,
                iface.tb_prop.attrTypeKey.healRate,
                iface.tb_prop.attrTypeKey.addDmg, iface.tb_prop.attrTypeKey.subDmg, iface.tb_prop.attrTypeKey.immuDizzy];
            var attrAry = tbData.getAttr();
            var fixedObj = attrAry[0] || {};
            var percentObj = attrAry[1] || {};
            var arrAttr = [];
            for (var i in fixedObj) {
                var peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
                var str = showPercent.indexOf(Number(i)) != -1 ? "+" + Math.round(fixedObj[i] * 10000) / 100 + "%" : "+" + fixedObj[i];
                arrAttr.push([peoprety, str]);
            }
            for (var i in percentObj) {
                var peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
                var str = "+" + Math.round(percentObj[i] * 10000) / 100 + "%";
                arrAttr.push([peoprety, str]);
            }
            return arrAttr;
        };
        /**获得强化等级属性 */
        TreasureUtil.getTbStrengthAttr = function (quality, slot, strengthLv) {
            var tbData = tb.TB_treasure.getTbItem(quality, slot, strengthLv);
            return tbData ? tbData.getAttr() : [{}, {}];
        };
        /** 获得精炼等级属性 */
        TreasureUtil.getTbStarAttr = function (quality, slot, starLv) {
            var tbData = tb.TB_treasure_star.getTbItem(quality, slot, starLv);
            return tbData ? tbData.getAttr() : [{}, {}];
        };
        /**
         * 筛选圣物 可供选择的圣物列表 因为升星的材料圣物不会是低等级,都是不可叠加的，所以不用判断数量
         * @param tbVo 所需材料
         * @param curTreasure 当前圣物
         * @param ignores 互斥需忽略,如多个材料，前面已选择的后面要忽略
         */
        TreasureUtil.filterTreasures = function (tbVo, curTreasure, ignores, sortType) {
            var treasures = game.TreasureModel.getInstance().getTreasures();
            treasures = treasures.filter(function (vo) {
                return !vo.isExsitGod();
            });
            // 筛选可用圣物
            var tempGods = [];
            if (tbVo.type == game.TreasureConfigType.item) {
                // 指定圣物
                for (var i = 0; i < treasures.length; i++) {
                    if (curTreasure && treasures[i].uuid == curTreasure.uuid)
                        continue;
                    if (treasures[i].templateId == tbVo.itemId && treasures[i].starLv == tbVo.starLv) {
                        tempGods.push(treasures[i]);
                    }
                }
            }
            else if (tbVo.type == game.TreasureConfigType.quality) {
                // 指定品质
                for (var i = 0; i < treasures.length; i++) {
                    if (curTreasure && treasures[i].uuid == curTreasure.uuid)
                        continue;
                    if (treasures[i].starLv == tbVo.starLv && (tbVo.quality == 0 || treasures[i].quality == tbVo.quality)) {
                        tempGods.push(treasures[i]);
                    }
                }
            }
            // 其他格子的圣物删掉
            ignores = ignores || [];
            var _loop_1 = function (info) {
                var index = tempGods.findIndex(function (vo) {
                    return vo.uuid == info.id;
                });
                if (index != -1) {
                    tempGods.splice(index, 1);
                }
            };
            for (var _i = 0, ignores_1 = ignores; _i < ignores_1.length; _i++) {
                var info = ignores_1[_i];
                _loop_1(info);
            }
            // 是否排序
            if (sortType > 0) {
                tempGods.sort(function (a, b) {
                    return a.strengthLv - b.strengthLv;
                });
            }
            return __spreadArrays(tempGods);
        };
        /** 是否有未穿戴装备 */
        TreasureUtil.hasNotWearTreasures = function () {
            var obj = App.hero.treasures;
            for (var key in obj) {
                if (!obj[key].godId) {
                    return true;
                }
            }
            return false;
        };
        /** 获取星级名称 */
        TreasureUtil.getStarName = function (starLv) {
            return LanMgr.starName[starLv] || LanMgr.getLan("", 12230);
        };
        /** 是否有可重生的圣物 养成过的紫色品质以上且没被穿戴的圣物*/
        TreasureUtil.hasCanRebirthTreasure = function () {
            var obj = App.hero.treasures;
            for (var key in obj) {
                var vo = obj[key];
                if (!vo.godId && vo.quality > QualityConst.PURPLE && (vo.strengthLv > 0 || vo.starLv > 0)) {
                    return true;
                }
            }
            return false;
        };
        return TreasureUtil;
    }());
    game.TreasureUtil = TreasureUtil;
})(game || (game = {}));
