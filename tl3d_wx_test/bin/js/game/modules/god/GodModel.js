var game;
(function (game) {
    var GodModel = /** @class */ (function () {
        function GodModel() {
            this.isOnekeyLvup = true; // 是否一键5级 
            this.tabredName = ["shenling_tab_0", "shenling_tab_1", "shenling_tab_2", "shenling_tab_3", "shenling_tab_4"];
            this.tabTypes = [ShenlingTabType.info, ShenlingTabType.shengxin, ShenlingTabType.awaken, ShenlingTabType.ronghun];
            /** 获取上阵各个阵营英雄数量
             */
            this._atkRaceGodNum = [0, 0, 0, 0, 0, 0];
            this._expRaceGodNum = [0, 0, 0, 0, 0, 0];
            /**
             *  阵营属性加成
             */
            //失落遗迹的阵营缓存
            this._isUpdateRaceAdd_exp = true;
            //普通攻击阵容的阵营缓存
            this._isUpdateRaceAdd_atk = true;
        }
        GodModel.getInstance = function () {
            if (!GodModel._instance) {
                GodModel._instance = new GodModel();
            }
            return GodModel._instance;
        };
        /** 获取英雄界面英雄灵列表 */
        GodModel.prototype.getViewGods = function () {
            var godids = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack, true);
            var gods = godids.map(function (uuid) {
                return App.hero.getGodVoById(uuid);
            });
            var list = gods.map(function (vo, index) {
                var obj = { godVo: vo, pos: index };
                return obj;
            });
            return list.sort(function (a, b) {
                if (!a.godVo && !b.godVo) {
                    return a.pos - b.pos;
                }
                else if (a.godVo && !b.godVo) {
                    return -1;
                }
                else if (!a.godVo && b.godVo) {
                    return 1;
                }
                else {
                    return b.godVo.fightPower - a.godVo.fightPower;
                }
            });
        };
        GodModel.prototype.getTabViewDatas = function (type) {
            switch (type) {
                case ShenlingTabType.info:
                    return { viewName: GodModel.tabInfo, viewClz: game.godTabInfoView, sysId: ModuleConst.SHENLING };
                case ShenlingTabType.shengxin:
                    return { viewName: GodModel.tabStarup, viewClz: game.godTabStarupView, sysId: ModuleConst.SHENGXING };
                case ShenlingTabType.ronghun:
                    return { viewName: GodModel.tabRonghun, viewClz: game.godTabfuseView, sysId: ModuleConst.RONGHUN };
                case ShenlingTabType.awaken:
                    return { viewName: GodModel.tabAwaken, viewClz: game.godTabAwakeView, sysId: ModuleConst.JUEXING };
            }
            return null;
        };
        /** 获取神力 */
        GodModel.prototype.getForce = function (lineupType) {
            if (lineupType === void 0) { lineupType = iface.tb_prop.lineupTypeKey.attack; }
            //上阵神灵战力 + 神器战力 + 公会技能战力
            var lineUpGod = App.hero.getLineUpTeam(lineupType);
            var fightNum = 0;
            for (var i = 0; i < lineUpGod.length; i++) {
                fightNum += lineUpGod[i].getShenli(lineupType);
            }
            return fightNum;
        };
        /** 获取最大神力 */
        GodModel.prototype.getMaxForce = function () {
            var force = 0;
            var gods = App.hero.getGodArr();
            for (var _i = 0, gods_1 = gods; _i < gods_1.length; _i++) {
                var godVo = gods_1[_i];
                var godForce = godVo.getShenli();
                if (godForce > force) {
                    force = godForce;
                }
            }
            return force;
        };
        /**获得万能卡数量 */
        GodModel.prototype.getWanNengCards = function () {
            var obj = {};
            var tbs = tb.TB_god_set.get_TB_god_set();
            for (var _i = 0, _a = tbs.universal_card; _i < _a.length; _i++) {
                var data = _a[_i];
                obj[data[2]] = App.hero.getBagItemNum(data[2]);
            }
            return obj;
        };
        /**
         * 获得阶级的对应最大等级
         * @param jieji
         */
        GodModel.getMaxLv = function (jieji) {
            var evotab = tb.TB_god_evolution.get_TB_god_evolutionById(jieji);
            return evotab ? evotab.level : -1;
        };
        /** 根据星级获取碎片道具id */
        GodModel.prototype.getItemID = function (starLv) {
            switch (starLv) {
                case 3:
                    return CostTypeKey.suipian_sanxing;
                case 4:
                    return CostTypeKey.suipian_sixing;
                case 5:
                    return CostTypeKey.suipian_wuxing;
                case 6:
                    return CostTypeKey.liuxingka;
                case 7:
                    return CostTypeKey.qixingka;
                case 8:
                    return CostTypeKey.baxingka;
                case 9:
                    return CostTypeKey.jiuxingka;
                default:
                    return CostTypeKey.suipian_wuxing;
            }
        };
        /** 是否有神灵 */
        GodModel.prototype.isHasGod = function (tbid) {
            var ary = App.hero.getGodArr();
            return ary.some(function (vo) {
                return vo.templateId == tbid;
            });
        };
        /** 获取上阵神灵的表id */
        GodModel.prototype.getLinuepGodTbid = function (type) {
            var gods = App.hero.getLineUpTeam(type, false);
            return gods.map(function (vo) {
                return vo && vo.templateId;
            });
        };
        /** 获取上阵神灵 */
        GodModel.prototype.getLineupGodByTbid = function (type, tbid) {
            var gods = App.hero.getLineUpTeam(type, false);
            return gods.find(function (vo) {
                return vo && vo.templateId == tbid;
            });
        };
        /** 获取上阵神灵数量 */
        GodModel.prototype.getLineupGodCount = function (type) {
            var ary = App.hero.lineupInfo[type] || [];
            var count = 0;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i]) {
                    count++;
                }
            }
            return count;
        };
        GodModel.prototype.getRaceGodNumInLine = function (linetype) {
            // iface.tb_prop.godRaceTypeKey.china
            return linetype == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
        };
        /** 获取上阵各个阵营英雄数量
         */
        GodModel.prototype.getRaceGodNumInLineByRace = function ($type, race) {
            var curNum = $type == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
            if (race < 0 || race >= curNum.length)
                return 0;
            return curNum[race];
        };
        /** 攻击布阵改变
         */
        GodModel.prototype.onAttackLineChange = function ($type) {
            var newRaceNum = [0, 0, 0, 0, 0, 0];
            var gods = App.hero.getLineUpTeam($type, false);
            if (gods && gods.length > 0) {
                for (var i = 0; i < gods.length; i++) {
                    var god = gods[i];
                    if (god) {
                        var racetype = god.getRaceType();
                        newRaceNum[racetype]++;
                    }
                }
            }
            var curNum = $type == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
            for (var i = 0; i < curNum.length; i++) {
                if (curNum[i] != newRaceNum[i]) {
                    //数量不一致，上阵的阵营英雄数量改变了
                    if ($type == iface.tb_prop.lineupTypeKey.attack) {
                        this._atkRaceGodNum = newRaceNum;
                        this._isUpdateRaceAdd_atk = true;
                    }
                    else {
                        this._expRaceGodNum = newRaceNum;
                        this._isUpdateRaceAdd_exp = true;
                    }
                    // dispatchEvt(new game.GodEvent(game.GodEvent.LINE_RACE_GOD_NUM_CHANGE));
                    break;
                }
            }
        };
        /** 获取攻击阵容的阵营数量 */
        GodModel.prototype.getRaceNumObj = function () {
            var obj = {};
            var gods = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
            for (var _i = 0, gods_2 = gods; _i < gods_2.length; _i++) {
                var vo = gods_2[_i];
                if (vo) {
                    var type = vo.tab_god.race_type;
                    obj[type] = (obj[type] || 0) + 1;
                }
            }
            return obj;
        };
        /**
         *  阵营属性加成模板
         */
        GodModel.prototype.getAllRaceAddTemp = function (type) {
            var temptype = type == iface.tb_prop.lineupTypeKey.attack ? this._atkRaceGodNum : this._expRaceGodNum;
            var _allRaceAddTemp = [];
            var alltype = tb.TB_halo.getAllType();
            if (alltype && alltype.length > 0) {
                for (var i = 0; i < alltype.length; i++) {
                    var raceTemp = alltype[i];
                    if (raceTemp && raceTemp.length > 0) {
                        var addtemp = null;
                        for (var j = 0; j < raceTemp.length; j++) {
                            var temp = raceTemp[j];
                            var num = temp.type % tb.TB_halo.TYPE_BASE;
                            if (i == tb.TB_halo.TYPE_ALL) {
                                var isHas = true;
                                for (var k = 1; k < temptype.length; k++) {
                                    if (temptype[k] < num) {
                                        isHas = false;
                                        break;
                                    }
                                }
                                if (isHas) {
                                    addtemp = temp;
                                }
                            }
                            else {
                                if (temptype[i] >= num) {
                                    addtemp = temp;
                                }
                            }
                        }
                        if (addtemp) {
                            _allRaceAddTemp.push(addtemp);
                        }
                    }
                }
            }
            return _allRaceAddTemp;
        };
        /**
         *  获取阵营加成模板
         */
        GodModel.prototype.getRaceAddTempByRace = function (linetype, race) {
            var alltemps = this.getAllRaceAddTemp(linetype);
            if (alltemps) {
                for (var i = 0; i < alltemps.length; i++) {
                    if (alltemps[i].raceType == race)
                        return alltemps[i];
                }
            }
            return null;
        };
        /**
         *  是否激活阵营加成
         */
        GodModel.prototype.isActiveRaceAdd = function (linetype, type, race, godNum) {
            if (race === void 0) { race = -1; }
            if (godNum === void 0) { godNum = -1; }
            if (type < 0)
                return false;
            var alltemps = this.getAllRaceAddTemp(linetype);
            if (alltemps) {
                if (race < 0)
                    race = Math.floor(type / tb.TB_halo.TYPE_BASE);
                if (godNum < 0)
                    godNum = type % tb.TB_halo.TYPE_BASE;
                for (var i = 0; i < alltemps.length; i++) {
                    var temp = alltemps[i];
                    if (temp.raceType == race && temp.godNum >= godNum)
                        return true;
                }
            }
            return false;
        };
        GodModel.prototype.getRaceAdd = function (lineupType, isPer) {
            if (isPer === void 0) { isPer = true; }
            var flag = lineupType == iface.tb_prop.lineupTypeKey.attack ? this._isUpdateRaceAdd_atk : this._isUpdateRaceAdd_exp;
            if (flag) {
                var _racePerAdd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //0-16
                var _raceValueAdd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //0-16
                var addtemps = this.getAllRaceAddTemp(lineupType);
                if (addtemps && addtemps.length > 0) {
                    for (var i = 0; i < addtemps.length; i++) {
                        var addtemp = addtemps[i];
                        if (addtemp && addtemp.attr) {
                            for (var j = 0; j < addtemp.attr.length; j++) {
                                var attr = addtemp.attr[j];
                                var type = attr[0];
                                var addtype = attr[1];
                                if (addtype == 1) {
                                    _raceValueAdd[type] += attr[2];
                                }
                                else {
                                    _racePerAdd[type] += attr[2];
                                }
                            }
                        }
                    }
                }
                if (lineupType == iface.tb_prop.lineupTypeKey.attack) {
                    this._isUpdateRaceAdd_atk = false;
                    this._racePerAdd_atk = _racePerAdd;
                    this._raceValueAdd_atk = _raceValueAdd;
                }
                else {
                    this._isUpdateRaceAdd_exp = false;
                    this._racePerAdd_exp = _racePerAdd;
                    this._raceValueAdd_exp = _raceValueAdd;
                }
            }
            return isPer ? (lineupType == iface.tb_prop.lineupTypeKey.attack ? this._racePerAdd_atk : this._racePerAdd_exp) : (lineupType == iface.tb_prop.lineupTypeKey.attack ? this._raceValueAdd_atk : this._raceValueAdd_exp);
        };
        GodModel.tabInfo = "tabInfo";
        GodModel.tabStarup = "tabStarup";
        GodModel.tabRonghun = "tabRonghun";
        GodModel.tabAwaken = "tabAwaken";
        return GodModel;
    }());
    game.GodModel = GodModel;
})(game || (game = {}));
/** 在哪个界面打开的 */
var ChooseOpenType;
(function (ChooseOpenType) {
    /**分解界面 */
    ChooseOpenType[ChooseOpenType["FENJIE_VIEW"] = 0] = "FENJIE_VIEW";
    /**神力转换 */
    ChooseOpenType[ChooseOpenType["TURN_VIEW"] = 3] = "TURN_VIEW";
    ChooseOpenType[ChooseOpenType["awaken"] = 4] = "awaken";
    ChooseOpenType[ChooseOpenType["starUp"] = 5] = "starUp";
})(ChooseOpenType || (ChooseOpenType = {}));
/** 英雄子界面类型 */
var ShenlingTabType;
(function (ShenlingTabType) {
    ShenlingTabType[ShenlingTabType["info"] = 0] = "info";
    ShenlingTabType[ShenlingTabType["shengxin"] = 1] = "shengxin";
    ShenlingTabType[ShenlingTabType["awaken"] = 2] = "awaken";
    ShenlingTabType[ShenlingTabType["ronghun"] = 3] = "ronghun";
})(ShenlingTabType || (ShenlingTabType = {}));
