var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var GodItemVo = /** @class */ (function () {
    function GodItemVo($data) {
        this.skinId = 0; // 皮肤ID
        //是否攻击出战
        this.isAttackFight = false;
        //是否防守出战
        this.isDefendFight = false;
        // 是否远征攻击阵容
        this.isYuanzhengFight = false;
        this.selected = false;
        this.dataType = 0;
        //战力
        this.fightPower = 0;
        // 服务器战力
        this.svrForce = 0;
        // 排序数字，需自己设置，多处使用
        this.sortNum = 0;
        /** 觉醒等级 */
        this.awakenLv = 0;
        /** 最大星级可升级的最大觉醒等级 */
        this.maxAwakenLv = 0;
        this.maxTbLv = 0;
        /** 宝石信息 */
        this.gemInfo = {};
        this.gemsList = [];
        //服务端给的属性
        this.iSeverAttri = new Array;
        this.isAid = false;
        if (!$data) {
            logerror("god item error :", $data);
            return;
        }
        this.templateId = $data.templateId ? $data.templateId : $data.ID;
        if ($data.star)
            this.starLevel = $data.star[0];
        else
            this.starLevel = $data.starLevel;
        this.level = $data.level ? $data.level : 1;
        this.skinId = $data.skinId ? $data.skinId : 0;
        this.exp = $data.exp ? $data.exp : 0;
        this.degree = $data.degree ? $data.degree : 0;
        this.fuseLevel = $data.fuseLevel ? $data.fuseLevel : 1;
        this.awakenLv = $data.awakenLv ? $data.awakenLv : 0;
        this.fuseAttrLevels = $data.fuseAttrLevels ? $data.fuseAttrLevels : {};
        this.local = [99999, 99999, 99999, 99999];
        // this.fightPower = this.getShenli();
        var sta = this.tab_god ? this.tab_god.star[1] : 1;
        this.maxAwakenLv = tb.TB_awaken_conditions.getTbById(sta).awake_section_max;
        this.maxTbLv = tb.TB_god_evolution.get_TB_god_evolutionById(sta).level;
    }
    GodItemVo.getData = function ($obj, $godkey) {
        var vo = new GodItemVo($obj);
        vo.tab_god = tb.TB_god.get_TB_godById(vo.templateId);
        if (!vo.tab_god) {
            logerror('英雄不存在', vo.templateId);
        }
        vo.uuid = $godkey;
        return vo;
    };
    GodItemVo.prototype.setgemInfo = function (info) {
        this.gemInfo = info || {};
        this.gemsList = [];
        if (!info)
            return;
        for (var key in info) {
            if (info[key]) {
                var gemstoneVo = game.GemstoneModel.getInstance().getGemstoneByUuid(info[key]);
                if (!gemstoneVo) {
                    logerror("没有该宝石:", info[key]);
                }
                this.gemsList.push(gemstoneVo);
            }
        }
    };
    GodItemVo.prototype.isExistGem = function (slot) {
        return this.gemInfo[slot] ? true : false;
    };
    GodItemVo.prototype.getGemsBySlot = function (slot) {
        var uuid = this.gemInfo[slot];
        return uuid ? this.gemsList.find(function (vo) {
            return vo.uuid == uuid;
        }) : null;
    };
    /** 是否是可升星英雄 */
    GodItemVo.prototype.isStarupGod = function () {
        return this.starLevel >= 4;
    };
    GodItemVo.prototype.getName = function () {
        return this.getObjectData().name;
    };
    GodItemVo.prototype.getLevel = function () {
        return this.level;
    };
    GodItemVo.prototype.getLevelStr = function () {
        return this.levelStr;
    };
    GodItemVo.prototype.getDataType = function () {
        return this.dataType;
    };
    GodItemVo.prototype.getStar = function () {
        return this.starLevel;
    };
    GodItemVo.prototype.getRaceType = function () {
        return this.tab_god.race_type;
    };
    GodItemVo.prototype.getAttrType = function () {
        return this.tab_god.type;
    };
    Object.defineProperty(GodItemVo.prototype, "tab_god", {
        get: function () {
            if (!this._tab_god) {
                this._tab_god = tb.TB_god.get_TB_godById(this.templateId);
            }
            if (!this._tab_god) {
                logerror("god templateId undef : " + this.templateId);
            }
            return this._tab_god;
        },
        set: function (value) {
            this._tab_god = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GodItemVo.prototype, "starUpTb", {
        get: function () {
            var id = game.GodUtils.getGodStarId(this.starLevel, this.templateId);
            return tb.TB_god_star.get_TB_god_starById(id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GodItemVo.prototype, "costtab", {
        get: function () {
            return tb.TB_god_evolution.get_TB_god_evolutionById(this.starLevel);
        },
        enumerable: true,
        configurable: true
    });
    GodItemVo.prototype.getQulity = function () {
        return SkinUtil.getBoxQulityIcon(this.tab_god.quality + 1);
    };
    GodItemVo.prototype.getIconUrl = function () {
        return SkinUtil.getHeadIcon(this.tab_god.icon);
    };
    GodItemVo.prototype.getFrameUrl = function () {
        var quality = this.starLevel;
        if (quality > 6)
            quality = 6;
        return SkinUtil.getBoxQulityIcon(quality);
    };
    GodItemVo.prototype.inLine = function () {
        var lineType = 4;
        for (var i = 0; i < this.local.length; i++) {
            if (this.local[i] != 99999) {
                lineType = i;
                break;
            }
        }
        return lineType;
    };
    /** 是否觉醒 */
    GodItemVo.prototype.isAwaken = function () {
        return this.awakenLv >= tb.TB_god_set.get_TB_god_set().awake_section;
    };
    GodItemVo.prototype.isMoreThanSix = function () {
        return this.starLevel >= 6;
    };
    /** 是否在阵容中
     *  0 全部：排除失落遗迹阵容
    */
    GodItemVo.prototype.isInLinuep = function (type) {
        if (type === void 0) { type = 0; }
        var allAry = [];
        var info = App.hero.lineupInfo;
        var idsAry = [];
        if (type == 0) {
            for (var key in info) {
                //排除失落遗迹阵容
                if (Number(key) == iface.tb_prop.lineupTypeKey.expedition) {
                    continue;
                }
                idsAry = info[key] ? info[key] : [];
                allAry.push.apply(allAry, idsAry);
            }
        }
        else {
            idsAry = info[type] ? info[type] : [];
            allAry.push.apply(allAry, idsAry);
        }
        return allAry.indexOf(this.uuid) != -1;
    };
    /** 某个槽位是否装备 */
    GodItemVo.prototype.isEquipBySlot = function (slot) {
        return this.getEquipmentBySlot(slot) ? true : false;
    };
    /** 获取某个槽位的装备 */
    GodItemVo.prototype.getEquipmentBySlot = function (slot) {
        return this.equipKeys.find(function (equipVo) {
            return Number(equipVo.slot) == slot;
        });
    };
    /** 是否可升级 */
    GodItemVo.prototype.isCanLvup = function () {
        // 阶数只能升到6阶，等级可以根据星级去升
        var degreeNum = this.degree == 6 ? this.starLevel : this.degree;
        var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(degreeNum);
        var maxLv = evotab.level;
        var godlevel = tb.TB_god_level.get_TB_god_levelnById(this.level);
        var flag = (this.level < maxLv) && App.isEnoughByAry(godlevel.cost);
        return flag;
    };
    /** 是否可升阶 */
    GodItemVo.prototype.isCanDegreeUp = function () {
        if (!App.IsSysOpen(ModuleConst.SHENGJIE))
            return;
        // 阶数只能升到6阶，等级可以根据星级去升
        var maxGrade = this.starLevel >= 6 ? 6 : this.starLevel;
        if (this.degree >= maxGrade)
            return false;
        var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(this.degree);
        var maxLv = evotab.level;
        var flag = this.level == maxLv && App.isEnoughByAry(evotab.cost) && evotab.cost.length != 0;
        return flag;
    };
    /** 是否可以穿戴圣物 */
    GodItemVo.prototype.isCanWearTreasure = function () {
        if (!App.IsSysOpen(ModuleConst.TREASURE))
            return;
        return this.treasureKeys.length == 0 && game.TreasureModel.getInstance().getTreasureChooseList(false).length > 0;
    };
    /**
     * 是否可以一键装备（不考虑装备最高等级）
    */
    GodItemVo.prototype.isCanOneKeyEquip = function () {
        var arrQiuck = game.EquipModel.getInstance().equipQiuck(this);
        return arrQiuck.length == 0 ? false : true;
    };
    /**升星材料是否足够 -- 六星以上需要消耗*/
    GodItemVo.prototype.hasStarUpCost = function () {
        var cost = this.costtab.cost;
        return this.starLevel < 6 || (this.starLevel >= 6 && App.isEnoughByAry(cost));
    };
    /** 是否禁止升星到7星 满阶以后才可升七星 */
    GodItemVo.prototype.forbitStarUpTo7 = function () {
        return this.starLevel == 6 && this.degree < 6;
    };
    /** 是否可升星 四星以下不能升星
     *  红点排除阵容上面的
    */
    GodItemVo.prototype.isCanStarUp = function (isRedpoint) {
        if (isRedpoint === void 0) { isRedpoint = false; }
        if (!App.IsSysOpen(ModuleConst.SHENGXING) || !this.starUpTb || !this.hasStarUpCost() || this.forbitStarUpTo7())
            return false;
        return game.GodUtils.isEnoughMaterial(this, this.starUpTb.getGodMaterialList(), isRedpoint);
    };
    /** 是否可觉醒 */
    GodItemVo.prototype.isCanAwaken = function () {
        if (!App.IsSysOpen(ModuleConst.JUEXING) || this.awakenLv >= this.maxAwakenLv)
            return false;
        if (this.awakenLv >= this.getCurMaxAwakenLv())
            return false;
        var tbAwaken = tb.TB_god_awaken.getTbById(this.awakenLv);
        return App.isEnoughByAry(tbAwaken.material) && game.GodUtils.isEnoughMaterial(this, tbAwaken.getGodMaterialList());
    };
    GodItemVo.prototype.getObjectData = function () {
        var godtab = tb.TB_god.get_TB_godById(this.templateId);
        return godtab;
    };
    /** 是否可升星 */
    GodItemVo.prototype.canStarUp = function () {
        var id = game.GodUtils.getGodStarId(this.starLevel, this.templateId);
        var startab = tb.TB_god_star.get_TB_god_starById(id);
        return (startab ? true : false) && this.starLevel >= 4 && this.starLevel < this.tab_god.star[1];
    };
    /** 获取装备的强化总次数 */
    GodItemVo.prototype.getStrengthNum = function () {
        var num = 0;
        this.equipKeys.forEach(function (equipVo) {
            num += equipVo.strengthLv;
        });
        return num;
    };
    /** 几个装备是否都强化到了几级 */
    GodItemVo.prototype.isStrengthToLv = function (count, level) {
        var num = 0;
        this.equipKeys.forEach(function (equipVo) {
            if (equipVo.strengthLv >= level) {
                num++;
            }
        });
        return num >= count;
    };
    /** 获取装备的精炼总次数 */
    GodItemVo.prototype.getRefineNum = function () {
        var num = 0;
        this.equipKeys.forEach(function (equipVo) {
            num += equipVo.refineLv;
        });
        return num;
    };
    /** 几个装备是否都精炼到了几级 */
    GodItemVo.prototype.isRefineToLv = function (count, level) {
        var num = 0;
        this.equipKeys.forEach(function (equipVo) {
            if (equipVo.refineLv >= level) {
                num++;
            }
        });
        return num >= count;
        ;
    };
    /** 获取最低的强化等级 */
    GodItemVo.prototype.getStrengthLowLv = function () {
        if (this.equipKeys.length == 0)
            return 0;
        var num = this.equipKeys[0].strengthLv;
        this.equipKeys.forEach(function (equipVo) {
            if (equipVo.strengthLv < num) {
                num = equipVo.strengthLv;
            }
        });
        return num;
    };
    /** 获取最低的精炼等级 */
    GodItemVo.prototype.getRefineLowLv = function () {
        if (this.equipKeys.length == 0)
            return 0;
        var num = this.equipKeys[0].refineLv;
        this.equipKeys.forEach(function (equipVo) {
            if (equipVo.refineLv < num) {
                num = equipVo.refineLv;
            }
        });
        return num;
    };
    /** 获取某品质的所有装备 */
    GodItemVo.prototype.getQualityEquips = function (quality) {
        return this.equipKeys.filter(function (vo) {
            return vo.quality == quality;
        });
    };
    /**
     * 有可强化或者精炼的装备
     * @param type 装备类型
     */
    GodItemVo.prototype.isHaveLowEquip = function (type) {
        var _this = this;
        return this.equipKeys.some(function (equip) {
            if (type == EquipTabType.strength) {
                return equip.strengthLv < _this.level;
            }
            else {
                return equip.refineLv < tb.TB_equip_set.getRefineLimit(_this.degree);
            }
        });
    };
    /** 获取最低级别的装备 */
    GodItemVo.prototype.getLowestEquipSlots = function (type) {
        var ary = __spreadArrays(this.equipKeys);
        ary.sort(function (a, b) {
            return type == EquipTabType.strength ? a.strengthLv - b.strengthLv : a.refineLv - b.refineLv;
        });
        var slots = [];
        var minLv = ary[0] ? (type == EquipTabType.strength ? ary[0].strengthLv : ary[0].refineLv) : 0;
        for (var i = 0; i < ary.length; i++) {
            if ((type == EquipTabType.strength && ary[i].strengthLv == minLv) || (type == EquipTabType.refine && ary[i].refineLv == minLv)) {
                slots.push(ary[i].slot);
            }
        }
        return slots;
    };
    /**可升级装备
     * @param type 0:精炼属性 1:强化属性
     */
    GodItemVo.prototype.getCanUpGradeEquips = function (type) {
        var newEquips = [];
        var minLv = type == 0 ? this.getRefineLowLv() : this.getStrengthLowLv();
        this.equipKeys.forEach(function (equip) {
            var lv = type == 0 ? equip.refineLv : equip.strengthLv;
            var ismax = type == 0 ? equip.isTopRefineLv() : equip.isTopStrengthLv();
            if (!ismax && lv == minLv) {
                newEquips.push(equip);
            }
        });
        return newEquips;
    };
    /** 装备强化等级或者精炼等级是否满级 */
    GodItemVo.prototype.isAllEquipLvTop = function (type, slot) {
        if (type == EquipTabType.strength) {
            if (slot) {
                var equipVo = this.getEquipmentBySlot(slot);
                return equipVo && equipVo.isTopStrengthLv();
            }
            else {
                if (this.equipKeys.length == 0)
                    return false;
                return this.equipKeys.every(function (vo) {
                    return vo.isTopStrengthLv();
                });
            }
        }
        else if (type == EquipTabType.refine) {
            if (slot) {
                var equipVo = this.getEquipmentBySlot(slot);
                return equipVo && equipVo.isTopRefineLv();
            }
            else {
                if (this.equipKeys.length == 0)
                    return false;
                return this.equipKeys.every(function (vo) {
                    return vo.isTopRefineLv();
                });
            }
        }
        return false;
    };
    /**装备精炼n级需要的材料
    */
    GodItemVo.prototype.getRefineCost = function (Num) {
        if (Num === void 0) { Num = 1; }
        var cost = {};
        var newEquips = this.getCanUpGradeEquips(0);
        for (var i in newEquips) {
            var need = newEquips[i].getRefineCost(Num);
            for (var key in need) {
                if (cost[key])
                    cost[key] += need[key];
                else
                    cost[key] = need[key];
            }
        }
        return map2ary(cost);
    };
    /** 装备强化n级需要的材料 */
    GodItemVo.prototype.getStrengthCost = function (Num) {
        if (Num === void 0) { Num = 1; }
        var cost = {};
        var newEquips = this.getCanUpGradeEquips(1);
        for (var i in newEquips) {
            var need = newEquips[i].strengthCost(Num);
            for (var key in need) {
                if (cost[key])
                    cost[key] += need[key];
                else
                    cost[key] = need[key];
            }
        }
        return map2ary(cost);
    };
    /**装备当前级属性和下一级属性
     * @param type 0:精炼属性 1:强化属性
     */
    GodItemVo.prototype.getCurLvAttriAndNext = function (type) {
        // 本次升级中可升级的装备：最低等级的装备
        var canLvupList = [];
        var notLvupList = [];
        var minLv = type == 0 ? this.getRefineLowLv() : this.getStrengthLowLv();
        this.equipKeys.forEach(function (equip) {
            var lv = type == 0 ? equip.refineLv : equip.strengthLv;
            var ismax = type == 0 ? equip.isTopRefineLv() : equip.isTopStrengthLv();
            if (!ismax && lv == minLv) {
                canLvupList.push(equip);
            }
            else {
                notLvupList.push(equip);
            }
        });
        var curLvAttri = {};
        var nextLvAttri = {};
        for (var _i = 0, canLvupList_1 = canLvupList; _i < canLvupList_1.length; _i++) {
            var equip = canLvupList_1[_i];
            var attr = type == 0 ? equip.getRefineAttr(1) : equip.getStrengthAttr(1);
            for (var key in attr) {
                nextLvAttri[key] = nextLvAttri[key] || 0;
                nextLvAttri[key] += Number(attr[key]);
            }
            attr = type == 0 ? equip.getRefineAttr(0) : equip.getStrengthAttr(0);
            for (var key in attr) {
                curLvAttri[key] = curLvAttri[key] || 0;
                curLvAttri[key] += Number(attr[key]);
            }
        }
        for (var _a = 0, notLvupList_1 = notLvupList; _a < notLvupList_1.length; _a++) {
            var equip = notLvupList_1[_a];
            var attr = type == 0 ? equip.getRefineAttr(0) : equip.getStrengthAttr(0);
            for (var key in attr) {
                curLvAttri[key] = curLvAttri[key] || 0;
                curLvAttri[key] += Number(attr[key]);
                nextLvAttri[key] = nextLvAttri[key] || 0;
                nextLvAttri[key] += Number(attr[key]);
            }
        }
        var arr = [];
        var obj = { 1: 0, 2: 0, 3: 0 };
        for (var i in obj) {
            var nextAttri = nextLvAttri[i] || 0;
            nextAttri = type == 0 ? (Math.round(nextAttri * 10000) / 100) + "%" : nextAttri;
            var curAttri = curLvAttri[i] || 0;
            curAttri = type == 0 ? (Math.round(curAttri * 10000) / 100) + "%" : curAttri;
            arr.push([Number(i), curAttri]);
            arr.push([Number(i), nextAttri]);
        }
        return arr;
    };
    /**
     * 获得计算之后的英雄基础属性
     * ( 基础属性*基础倍率 + 成长属性*成长倍率(等级-1) + 觉醒属性)
     * 速度属性 = 基础属性 + 固定值加成
     * @param $godVo 英雄在背包中的数据类型
     * @return 计算之后的英雄属性数组
     */
    GodItemVo.prototype.getProperty = function (level, star, degree) {
        if (this.iSeverAttri.length > 0)
            return this.iSeverAttri;
        var ary = new Array();
        var godtab = tb.TB_god.get_TB_godById(Number(this.templateId));
        var evotab;
        var godset = tb.TB_god_set.get_TB_god_set();
        var nowStar = star == undefined ? this.starLevel : star;
        var nowLevel = level == undefined ? this.level : level;
        var nowDegree = degree == undefined ? this.degree : degree;
        if (nowStar <= godset.star_evolution && nowDegree <= godset.star_evolution)
            evotab = tb.TB_god_evolution.get_TB_god_evolutionById(nowDegree); //阶级
        else
            evotab = tb.TB_god_evolution.get_TB_god_evolutionById(nowStar);
        if (!evotab) {
            logerror("tab error:", nowDegree, nowStar);
            return ary;
        }
        // 前4个为固定值，后4个为百分比
        // 速度属性 = 基础属性 + 固定值加成
        for (var i = 0; i <= 7; i++) {
            var num = void 0;
            if (i < 3) {
                var prop = evotab.star_prop[i][1];
                var growth = evotab.star_growth[i][1];
                num = Number(godtab.attr_init[i][1] * prop + godtab.attr_grow[i][1] * growth * (nowLevel - 1));
            }
            else if (i >= 4) {
                num = Number(godtab.attr_init[i][1]) * 100;
            }
            else {
                num = Number(godtab.attr_init[i][1]);
            }
            ary.push([i + 1, num]);
        }
        var tbAwaken = tb.TB_god_awaken.getTbById(this.awakenLv);
        if (tbAwaken) {
            for (var _i = 0, _a = tbAwaken.attr; _i < _a.length; _i++) {
                var atrAry = _a[_i];
                var index = atrAry[0] - 1;
                ary[index][1] += atrAry[1];
            }
        }
        return ary;
    };
    /**
     * 在基础属性中 通过键获得值
     */
    GodItemVo.prototype.getAttrValByKeyOnBaseAttr = function (attrKey) {
        var ary = this.getProperty();
        for (var i = 0; i < ary.length; i++) {
            if (Number(ary[i][0]) == attrKey) {
                return Number(ary[i][1]);
            }
        }
        return 0;
    };
    /**
     * 获得前三个属性
     */
    GodItemVo.prototype.jisuanchushi = function (num, level) {
        if (num === void 0) { num = this.starLevel; }
        if (level === void 0) { level = this.level; }
        var godtab = tb.TB_god.get_TB_godById(Number(this.templateId));
        var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(num);
        var ary = new Array();
        for (var i = 0; i < 3; i++) {
            var num_1 = void 0;
            var prop = evotab ? evotab.star_prop[i][1] : 1;
            var growth = evotab ? evotab.star_growth[i][1] : 1;
            num_1 = Number(godtab.attr_init[i][1] * prop + godtab.attr_grow[i][1] * growth * (level - 1));
            ary.push([i + 1, num_1]);
        }
        var tbAwaken = tb.TB_god_awaken.getTbById(this.awakenLv);
        if (tbAwaken) {
            for (var _i = 0, _a = tbAwaken.attr; _i < _a.length; _i++) {
                var atrAry = _a[_i];
                var index = atrAry[0] - 1;
                if (!ary[index]) {
                    ary[index] = [];
                }
                ary[index][1] += atrAry[1];
            }
        }
        return ary;
    };
    /**
     * 获取英雄的所有技能
     * @param  英雄对象
     */
    GodItemVo.prototype.jisuanjineng = function () {
        var godtab = tb.TB_god.get_TB_godById(Number(this.templateId));
        return godtab.getAllSkill(this.degree, this.getStar());
    };
    /** 获取阶数开启的技能 */
    GodItemVo.prototype.getSkillIdByDegree = function (degree) {
        var godtab = tb.TB_god.get_TB_godById(Number(this.templateId));
        var realskills = getSkillList(godtab.skill, degree, this.getStar());
        for (var _i = 0, realskills_1 = realskills; _i < realskills_1.length; _i++) {
            var ary = realskills_1[_i];
            if (ary[1] == degree) {
                return ary[0];
            }
        }
        return 0;
    };
    /** 计算装备属性 */
    GodItemVo.prototype.getEquipAttributes = function () {
        //索引0固定值 1百分比
        var tempResult = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        // 强化：固定值
        for (var i = 0; i < this.equipKeys.length; i++) {
            var equip = this.equipKeys[i];
            if (equip) {
                var obj = this.equipKeys[i].getStrengthAttr();
                for (var key in obj) {
                    tempResult[0][Number(key) - 1] += obj[key];
                }
            }
        }
        // 精炼：百分比
        for (var i = 0; i < this.equipKeys.length; i++) {
            var equip = this.equipKeys[i];
            if (equip) {
                var obj = this.equipKeys[i].getRefineAttr();
                for (var key in obj) {
                    tempResult[1][Number(key) - 1] += obj[key];
                }
            }
        }
        // 装备宝石属性：固定值
        for (var _i = 0, _a = this.gemsList; _i < _a.length; _i++) {
            var gemVo = _a[_i];
            var tbGem = gemVo ? gemVo.tbGem : null;
            if (tbGem) {
                var obj = tbGem.getAttr();
                for (var key in obj) {
                    tempResult[0][Number(key) - 1] += obj[key];
                }
            }
        }
        // 套装
        var arrSuitAttri = this.getEquipSuit();
        for (var i in arrSuitAttri) {
            for (var j in arrSuitAttri[i]) {
                tempResult[i][j] += arrSuitAttri[i][j];
            }
        }
        return tempResult;
    };
    /**装备套装属性 */
    GodItemVo.prototype.getEquipSuit = function () {
        var qualityobj = {};
        var arrGodEquip = this.equipKeys;
        //0固定值 1百分比
        var tempResult = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        /**遍历出所有品质 */
        for (var i in arrGodEquip) {
            qualityobj[arrGodEquip[i].quality] = 0;
        }
        /** 某品质大于4的+1 */
        for (var i in arrGodEquip) {
            if (arrGodEquip[i].quality >= QualityConst.PURPLE) {
                qualityobj[arrGodEquip[i].quality]++;
            }
        }
        /**某品质大于4超过2个的计算套装加成 */
        for (var i in qualityobj) {
            var arrSuitId = [];
            var curQuality = Number(i);
            if (qualityobj[i] >= EquipSuit.two) {
                /**套装叠加 */
                for (var max = EquipSuit.four; max >= EquipSuit.two; max -= 1) {
                    if (max <= qualityobj[i]) {
                        arrSuitId.push(Number(i + max.toString()));
                    }
                }
                for (var j in arrSuitId) {
                    var suit = tb.TB_equip_suit.get_TB_equip_suitById(arrSuitId[j]);
                    if (!suit) {
                        logerror("\u672A\u627E\u5230Id(" + arrSuitId + ")\u88C5\u5907\u5957\u88C5\u6570\u636E\u8868");
                        continue;
                    }
                    tempResult[suit.suit_percent[1]][suit.suit_percent[0] - 1] += Number(suit.suit_percent[2]);
                }
            }
        }
        return tempResult;
    };
    /**
     * 获得总基础属性(英雄界面显示使用)
     * @param lineupType xx阵容（xx阵容的神器生效）为空时默认为攻击阵容
     */
    GodItemVo.prototype.getAllAttr = function (lineupType) {
        // loghgy("====",this.tab_god.name,"====");
        var tempJichuAttr = this.getProperty(); //基础属性
        // loghgy("基础属性:",tempJichuAttr);
        var tempJiachengAttr = this.getJiachengAttr(lineupType); //装备，神器，融魂加成属性
        // loghgy("总加成属性:",tempJiachengAttr);
        var haveGuild = game.GuildModel.getInstance().isHasGuild();
        // let guildSkillAttr = haveGuild ? game.GuildSkillModel.getInstance().getCurSkillAttr(this.getRaceType()) : null;//公会技能属性
        var guildSkillAttr = haveGuild ? game.GuildSkillModel.getInstance().getCurSkillAttr(this.tab_god.type) : null; //公会技能属性
        // loghgy("公会技能加成属性:",guildSkillAttr);
        var fateAttr = this.isAttackFight ? game.FateModel.getInstance().getCurFateAttr() : null; //羁绊属性
        // loghgy("羁绊加成属性:",fateAttr);
        // let tempAll = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]];
        var tempAllObj = {};
        var tempkey;
        var tempval;
        var fixed = tempJiachengAttr[0];
        var prec = tempJiachengAttr[1];
        //目前有16个属性
        for (var z = 0; z < 18; z++) {
            var attrVal = tempJichuAttr[z] ? (tempJichuAttr[z][1] || 0) : 0;
            if (z < 4) {
                tempkey = String(tempJichuAttr[z][0]);
                tempval = tempAllObj[tempkey] || 0;
                tempAllObj[tempkey] = tempval + attrVal + attrVal * prec[tempkey] + fixed[tempkey];
            }
            else {
                var jichutemp = [z + 1, 0];
                if (tempJichuAttr[z]) {
                    jichutemp = tempJichuAttr[z];
                }
                tempkey = String(jichutemp[0]);
                tempval = tempAllObj[tempkey] || 0;
                var fixedtemp = fixed[tempkey] || 0;
                tempAllObj[tempkey] = tempval + (jichutemp[1] / 100) + fixedtemp;
            }
            if (this.isAttackFight && fateAttr[z]) {
                tempAllObj[tempkey] += (fateAttr[z][1] || 0);
            }
            if (haveGuild) {
                tempAllObj[tempkey] += attrVal * (guildSkillAttr[1][z + 1] || 0) + (guildSkillAttr[0][z + 1] || 0);
            }
        }
        // for (let i = 0; i < 4; i++) {
        //     if (i == 3) {
        //         // tempAllObj[String(i+1)]
        //         tempAll[i][1] = tempJichuAttr[i][1] + tempJiachengAttr[0][i];
        //     } else {
        //         tempAll[i][1] = tempJichuAttr[i][1] + tempJichuAttr[i][1] * tempJiachengAttr[1][i] + tempJiachengAttr[0][i];
        //     }
        //     if (haveGuild) {
        //         if (i == 3) tempAll[i][1] += guildSkillAttr[i][1];
        //         else tempAll[i][1] += guildSkillAttr[i][1] * tempJichuAttr[i][1];
        //     }
        //     if (this.isAttackFight) tempAll[i][1] += fateAttr[i][1];
        // }
        // for (let i = 4; i < tempJiachengAttr[0].length; i++) {
        //     tempAll[i][1] = tempJichuAttr[i][1] / 100 + tempJiachengAttr[1][i];
        //     if (haveGuild) tempAll[i][1] += guildSkillAttr[i][1];
        //     if (this.isAttackFight) tempAll[i][1] += fateAttr[i][1];
        // }
        // loghgy("结果值:",tempAll);
        //阵营属性加成
        var racePerAdd = game.GodModel.getInstance().getRaceAdd(lineupType);
        if (racePerAdd) {
            for (var i = 0; i < racePerAdd.length; i++) {
                if (racePerAdd[i] > 0) {
                    var key = String(i);
                    if (i < 5) {
                        if (i == 4) {
                            //速度
                        }
                        else {
                            tempAllObj[key] *= (1 + racePerAdd[i]);
                        }
                    }
                    else {
                        tempAllObj[key] += racePerAdd[i];
                    }
                }
            }
        }
        var tempAll = map2ary(tempAllObj);
        return tempAll;
    };
    /**英雄所有属性（战斗使用） */
    GodItemVo.prototype.getFightAttr = function (lineupType) {
        var attrObj = {};
        // let artArrti = game.ArtifactModel.getInstance().getArtifactAllAttr();
        var godAttri = this.getAllAttr(lineupType);
        for (var _i = 0, godAttri_1 = godAttri; _i < godAttri_1.length; _i++) {
            var attri = godAttri_1[_i];
            attrObj[attri[0]] = attri[1];
        }
        // for (let attri in artArrti['attr']) {
        //     if (attrObj.hasOwnProperty(attri)) {
        //         attrObj[attri] += Number(artArrti['attr'][attri]);
        //     } else {
        //         attrObj[attri] = Number(artArrti['attr'][attri]);
        //     }
        // }
        return attrObj;
    };
    GodItemVo.prototype.getPavSkillAttr = function () {
        var tempskills = [];
        var nskilllist = this.getSkillList();
        for (var i = 0; i < nskilllist.length; i++) {
            var item = nskilllist[i];
            if (this.degree >= item[1]) {
                tempskills.push(item[0]);
            }
        }
        return modifyPasvAttr(tempskills);
    };
    /** 获取属性总值 */
    GodItemVo.prototype.getPropertyValue = function (index) {
        if (this.isAid) {
            var svo = game.YuanzhengModel.getInstance().getHelpItemByUuid(this.uuid);
            return svo && svo.godInfo[3][1];
        }
        var allProperty = this.getAllAttr();
        var find = allProperty.find(function (ary) {
            return ary[0] == index;
        });
        return find ? find[1] : 0;
    };
    /**
     * 获得总加成属性
     * @param lineupType xx阵容（xx阵容的神器生效）为空时默认为攻击阵容
     * @param valueType 值类型：ValueType
     */
    GodItemVo.prototype.getJiachengAttr = function (lineupType) {
        if (lineupType === void 0) { lineupType = 1; }
        var fixed = {}; //固定值
        var percent = {}; //百分比
        var tempEquipAttr = this.getEquipAttributes();
        // loghgy("装备属性总加成:",tempEquipAttr);
        var temp = 0;
        for (var i = 0; i < tempEquipAttr.length; i++) {
            for (var j = 0; j < tempEquipAttr[i].length; j++) {
                var id = j + 1;
                if (i == ValueType.fixed) {
                    this.modifyAttr(fixed, id, tempEquipAttr[i][j]);
                }
                else {
                    this.modifyAttr(percent, id, tempEquipAttr[i][j]);
                }
            }
        }
        // 固定值及百分比
        var artObtain = game.ArtifactModel.getArtAttr();
        // loghgy("神器收集加成属性:",artObtain);
        if (artObtain) {
            for (var i = 0; i < artObtain.length; i++) {
                for (var j = 0; j < artObtain[i].length; j++) {
                    var id = j + 1;
                    if (i == ValueType.fixed) {
                        this.modifyAttr(fixed, id, artObtain[i][j]);
                    }
                    else {
                        this.modifyAttr(percent, id, artObtain[i][j]);
                    }
                }
            }
        }
        var baptizeAttr = game.ArtifactModel.getInstance().getBapAttri(this.tab_god.race_type, 2);
        // loghgy("神器洗练加成属性:",baptizeAttr);
        if (baptizeAttr) {
            for (var i = 0; i < baptizeAttr.length; i++) {
                for (var j = 0; j < baptizeAttr[i].length; j++) {
                    var id = j + 1;
                    if (i == ValueType.fixed) {
                        this.modifyAttr(fixed, id, baptizeAttr[i][j]);
                    }
                    else {
                        this.modifyAttr(percent, id, baptizeAttr[i][j]);
                    }
                }
            }
        }
        var enchantAttr = game.ArtifactModel.getInstance().getEnchantAtttri(null, 0, false, true); //神器附魔属性
        // loghgy("神器升星加成属性:",enchantAttr);
        if (enchantAttr) {
            for (var i = 0; i < enchantAttr.length; i++) {
                for (var j = 0; j < enchantAttr[i].length; j++) {
                    var id = j + 1;
                    if (i == ValueType.fixed) {
                        this.modifyAttr(fixed, id, enchantAttr[i][j]);
                    }
                    else {
                        this.modifyAttr(percent, id, enchantAttr[i][j]);
                    }
                }
            }
        }
        // 圣物
        var curTreasure = this.getCurTreasure();
        if (curTreasure) {
            var attrmap = {};
            var treasureStrenAttr = curTreasure.getStrengthAttr();
            for (var type in treasureStrenAttr) {
                attrmap = treasureStrenAttr[type];
                for (var attrkey in attrmap) {
                    if (Number(type) == (ValueType.fixed)) {
                        this.modifyAttr(fixed, attrkey, attrmap[attrkey]);
                    }
                    else {
                        this.modifyAttr(percent, attrkey, attrmap[attrkey]);
                    }
                }
            }
            // loghgy("圣物强化加成属性:",treasureStrenAttr);
            var treasureStarAttr = curTreasure.getStarAttr();
            for (var starttype in treasureStarAttr) {
                attrmap = treasureStarAttr[starttype];
                for (var startattrkey in attrmap) {
                    if (Number(starttype) == (ValueType.fixed)) {
                        this.modifyAttr(fixed, startattrkey, attrmap[startattrkey]);
                    }
                    else {
                        this.modifyAttr(percent, startattrkey, attrmap[startattrkey]);
                    }
                }
            }
            // loghgy("圣物升星加成属性:",treasureStarAttr);
        }
        // 皮肤
        if (this.tab_god.skin && this.tab_god.skin.length > 0) {
            for (var _i = 0, _a = this.tab_god.skin; _i < _a.length; _i++) {
                var skinId = _a[_i];
                if (App.hero.skinIds.indexOf(skinId) == -1)
                    continue;
                var tbSkin = tb.TB_skin.getTbById(skinId);
                var attrObj = tbSkin.getAttr();
                for (var valType in attrObj) {
                    var attrmap = attrObj[valType];
                    for (var attrkey in attrmap) {
                        if (Number(valType) == ValueType.fixed) {
                            this.modifyAttr(fixed, attrkey, attrmap[attrkey]);
                        }
                        else {
                            this.modifyAttr(percent, attrkey, attrmap[attrkey]);
                        }
                    }
                }
            }
        }
        // 固定值
        var tempRonghunAttr = this.countRonghunAttr(); //{1: 生命, 2:攻击, 3:防御, 4:速度}  //融魂属性
        // loghgy("融魂属性加成:",tempRonghunAttr);
        for (var key in tempRonghunAttr) {
            this.modifyAttr(fixed, key, tempRonghunAttr[key]);
        }
        var strenAttr = game.ArtifactModel.getInstance().getStrengthAttr();
        // loghgy("神器强化加成属性:",strenAttr);
        if (strenAttr) {
            for (var key in strenAttr) {
                this.modifyAttr(fixed, key, strenAttr[key]);
            }
        }
        var strengMasterAttr = this.getQianghuaDashi(this.countMasterLevel());
        // loghgy("强化大师加成属性:",strengMasterAttr);
        if (strengMasterAttr) {
            for (var key in strengMasterAttr) {
                this.modifyAttr(fixed, key, strengMasterAttr[key]);
            }
        }
        var jinglianMasterAttr = this.getJinglianDashi(this.refineMasterLevel());
        // loghgy("精炼加成属性:",jinglianMasterAttr);
        if (jinglianMasterAttr) {
            for (var key in jinglianMasterAttr) {
                this.modifyAttr(fixed, key, jinglianMasterAttr[key]);
            }
        }
        //解锁技能添加的属性
        var pavskillattr = this.getPavSkillAttr();
        this.mergePavSkillAttr(pavskillattr[0], fixed);
        this.mergePavSkillAttr(pavskillattr[1], percent);
        // logfight("被动技能累加的属性是:", pavskillattr);
        return [fixed, percent];
    };
    GodItemVo.prototype.mergePavSkillAttr = function (pavAttr, tag) {
        if (!isEmptyObject(pavAttr)) {
            //固定值
            for (var key in pavAttr) {
                this.modifyAttr(tag, key, pavAttr[key]);
            }
        }
    };
    GodItemVo.prototype.modifyAttr = function (tag, attrkey, attrval) {
        if (!tag.hasOwnProperty(attrkey)) {
            tag[attrkey] = 0;
        }
        tag[attrkey] += attrval;
    };
    /**强化大师属性 */
    GodItemVo.prototype.getQianghuaDashi = function (level) {
        var suitObj;
        if (level > 0) {
            var suit = tb.TB_strength_suit.get_TB_strength_suitById(level);
            suitObj = suit.getAttr();
        }
        return suitObj;
    };
    /**精炼大师属性 */
    GodItemVo.prototype.getJinglianDashi = function (level) {
        var suitAttr;
        if (level > 0) {
            var suit = tb.TB_refine_suit.get_TB_refine_suitById(level);
            suitAttr = suit.getAttr();
        }
        return suitAttr;
    };
    /**强化大师等级 */
    GodItemVo.prototype.countMasterLevel = function () {
        var allEquips = this.equipKeys;
        var minLevel = 0;
        if (allEquips.length >= game.EquipModel.EQUIP_COUNT) {
            minLevel = allEquips[0].strengthLv;
            for (var _i = 0, allEquips_1 = allEquips; _i < allEquips_1.length; _i++) {
                var vo = allEquips_1[_i];
                if (vo.strengthLv < minLevel) {
                    minLevel = vo.strengthLv;
                }
            }
            var tbSuit = tb.TB_strength_suit.get_TB_strength_suitByLv(minLevel);
            minLevel = tbSuit ? tbSuit.ID : 0;
        }
        return minLevel;
    };
    /**精炼大师等级 */
    GodItemVo.prototype.refineMasterLevel = function () {
        var allEquips = this.equipKeys;
        var minLevel = 0;
        if (allEquips.length >= game.EquipModel.EQUIP_COUNT) {
            minLevel = allEquips[0].refineLv;
            for (var _i = 0, allEquips_2 = allEquips; _i < allEquips_2.length; _i++) {
                var vo = allEquips_2[_i];
                if (vo.refineLv < minLevel) {
                    minLevel = vo.refineLv;
                }
            }
            var tbSuit = tb.TB_refine_suit.get_TB_refine_suitByLv(minLevel);
            minLevel = tbSuit ? tbSuit.ID : 0;
        }
        return minLevel;
    };
    /**获取英雄神力 */
    GodItemVo.prototype.getShenli = function (lineupType) {
        if (lineupType === void 0) { lineupType = iface.tb_prop.lineupTypeKey.attack; }
        // let allAttr = map2ary(this.getFightAttr(lineupType));
        // let shenli: number = 0;
        // let settab: tb.TB_game_set = tb.TB_game_set.get_TB_game_setById(1);
        // for (let i = 0; i < allAttr.length; i++) {
        //     let attrkey = allAttr[i][0];
        //     if (attrkey > 8) {
        //         continue;
        //     }
        //     let attrval = allAttr[i][1];
        //     attrval = i < 4 ? Math.floor(attrval) : attrval;
        //     shenli += attrval * Number(settab.attr_para[attrkey - 1][1]);
        // }
        // shenli *= Number(settab.quality_para[this.tab_god.quality - 1]);
        // return Math.floor(shenli);
        return getForce(this.getFightAttr(lineupType), this.tab_god.quality);
    };
    /**获取融魂属性 */
    GodItemVo.prototype.countRonghunAttr = function () {
        var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(this.fuseLevel);
        var fuseAttr = {};
        for (var i = 1; i < 4; i++) {
            var lv = this.fuseAttrLevels[i];
            if (lv) {
                var pretab = tb.TB_fusion_soul.get_TB_fusion_soulById(this.fuseLevel - 1);
                var preAttr = pretab ? pretab.getMaxAttr(i) : 0;
                var preLv = pretab ? pretab.getMaxLv(i) : 0;
                var value = preAttr + (lv - preLv) * fusiontab.getOnceAdd(i);
                value = value > fusiontab.getMaxAttr(i) ? fusiontab.getMaxAttr(i) : value;
                fuseAttr[i] = value;
            }
            else {
                fuseAttr[i] = 0;
            }
        }
        fuseAttr[Number(fusiontab.special_attr[0][0])] = Number(fusiontab.special_attr[0][1]);
        return fuseAttr;
    };
    /**是否达到最大融魂值 */
    GodItemVo.prototype.isRonghunMax = function () {
        var fusiontab = tb.TB_fusion_soul.get_TB_fusion_soulById(this.fuseLevel);
        var nowAttr = this.countRonghunAttr();
        var flag = true;
        for (var i = 0; i < 3; i++) {
            if (fusiontab.attr_max[i][1] > nowAttr[i + 1]) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    /** 装备返还 */
    GodItemVo.prototype.getEquipItems = function () {
        var arrItems = [];
        for (var _i = 0, _a = this.equipKeys; _i < _a.length; _i++) {
            var obj = _a[_i];
            arrItems.push(obj.uuid);
        }
        return arrItems;
    };
    /** 技能是否已激活 */
    GodItemVo.prototype.isActivitySkill = function (skillid) {
        for (var _i = 0, _a = this.tab_god.skill; _i < _a.length; _i++) {
            var ary = _a[_i];
            if (ary[0] == skillid) {
                return this.degree >= ary[1];
            }
        }
        return false;
    };
    //根据当前星级修正真实技能id
    GodItemVo.prototype.getSkillList = function () {
        return getSkillList(this.tab_god.skill, this.degree, this.getStar());
    };
    // ========== 觉醒 ==========
    /** 获取当前可觉醒的最大等级:根据星级 */
    GodItemVo.prototype.getCurMaxAwakenLv = function () {
        var tbCond = tb.TB_awaken_conditions.getTbById(this.starLevel);
        return tbCond.awake_section_max;
    };
    GodItemVo.prototype.getModel = function () {
        return game.GodUtils.getGodModel(this.skinId, this.tab_god);
    };
    /** 获取紫色品质以上(包含紫色)的最高套装以及数量
     * 套装包含2、4、6件装备组成，4件套餐大于2件套装，相同套装件数范围按品质
    */
    GodItemVo.prototype.getMaxQualityAnNum = function () {
        var purpleNum = 0;
        var orangeNum = 0;
        var redNum = 0;
        for (var _i = 0, _a = this.equipKeys; _i < _a.length; _i++) {
            var equipVo = _a[_i];
            var quality = equipVo.tab_item.quality;
            if (quality == QualityConst.PURPLE) {
                purpleNum++;
            }
            else if (quality == QualityConst.ORANGE) {
                orangeNum++;
            }
            else if (quality == QualityConst.RED) {
                redNum++;
            }
        }
        if (redNum >= 2) {
            return [QualityConst.RED, redNum];
        }
        else if (orangeNum >= 2) {
            return [QualityConst.ORANGE, orangeNum];
        }
        else if (purpleNum >= 2) {
            return [QualityConst.PURPLE, purpleNum];
        }
        else {
            return [];
        }
    };
    /** 获取圣物 */
    GodItemVo.prototype.getTreasureVo = function (uuid) {
        return this.treasureKeys.find(function (vo) {
            return vo.uuid == uuid;
        });
    };
    /** 获取当前圣物 */
    GodItemVo.prototype.getCurTreasure = function () {
        return this.treasureKeys[0];
    };
    return GodItemVo;
}());
