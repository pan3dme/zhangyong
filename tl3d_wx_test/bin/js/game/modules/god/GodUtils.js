var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var GodUtils = /** @class */ (function () {
        function GodUtils() {
        }
        /**
         * 筛选英雄 可供选择的英雄列表
         * @param tbVo 所需材料
         * @param curGod 当前神灵
         * @param ignores 互斥需忽略,如多个材料，前面已选择的后面要忽略
         */
        GodUtils.filterGods = function (tbVo, curGod, ignores) {
            var gods = App.hero.getGodAry(-1, -1);
            // 筛选可用神灵
            var tempGods = [];
            if (tbVo.type == game.ConfigType.god) {
                // 指定英雄
                for (var i = 0; i < gods.length; i++) {
                    if (gods[i].templateId == tbVo.godId && gods[i].uuid != curGod.uuid && gods[i].starLevel == tbVo.starLv) {
                        tempGods.push(gods[i]);
                    }
                }
            }
            else if (tbVo.type == game.ConfigType.race) {
                // 指定阵营
                for (var i = 0; i < gods.length; i++) {
                    if ((gods[i].tab_god.race_type == curGod.tab_god.race_type || tbVo.race == 0) && gods[i].uuid != curGod.uuid && gods[i].starLevel == tbVo.starLv) {
                        tempGods.push(gods[i]);
                    }
                }
            }
            // 筛选可用万能卡
            var cards = GodUtils.getUniversalCards(tbVo);
            // if (cards.length > 50) cards.length = 50;
            // 其他格子的英雄及万能卡删掉
            ignores = ignores ? ignores : [];
            var _loop_1 = function (info) {
                if (info.type == game.MaterialType.god) {
                    var index = tempGods.findIndex(function (vo) {
                        return vo.uuid == info.id;
                    });
                    if (index != -1) {
                        tempGods.splice(index, 1);
                    }
                }
                else if (info.type == game.MaterialType.card) {
                    var index = cards.findIndex(function (vo) {
                        return vo.id == info.id;
                    });
                    if (index != -1) {
                        cards.splice(index, 1);
                    }
                }
            };
            for (var _i = 0, ignores_1 = ignores; _i < ignores_1.length; _i++) {
                var info = ignores_1[_i];
                _loop_1(info);
            }
            return __spreadArrays(tempGods, cards);
        };
        /** 材料是否充足,自己过滤选择的 */
        GodUtils.isEnoughMaterial = function (godVo, materialAry, isRedpoint) {
            if (isRedpoint === void 0) { isRedpoint = false; }
            var ignores = [];
            if (isRedpoint) {
                var gods = App.hero.getGodArr();
                for (var _i = 0, gods_1 = gods; _i < gods_1.length; _i++) {
                    var godVo_1 = gods_1[_i];
                    if (godVo_1.isInLinuep()) {
                        ignores.push({ type: game.MaterialType.god, id: godVo_1.uuid, index: -1 });
                    }
                }
            }
            var isCan = true;
            for (var _a = 0, materialAry_1 = materialAry; _a < materialAry_1.length; _a++) {
                var mtVo = materialAry_1[_a];
                var ary = GodUtils.filterGods(mtVo, godVo, ignores);
                if (ary.length < mtVo.count) {
                    isCan = false;
                    break;
                }
                // 默认从前面选择
                ary = ary.slice(0, mtVo.count);
                for (var i = 0; i < ary.length; i++) {
                    var itemVo = ary[i];
                    if (itemVo instanceof GodItemVo) {
                        ignores.push({ type: game.MaterialType.god, id: itemVo.uuid, index: i });
                    }
                    else if (itemVo instanceof ItemVo) {
                        ignores.push({ type: game.MaterialType.card, id: itemVo.id, index: i });
                    }
                }
            }
            return isCan;
        };
        /** 获得万能卡 */
        GodUtils.getUniversalCards = function (material, bagItems) {
            if (!bagItems)
                bagItems = game.GodModel.getInstance().getWanNengCards();
            var universal_card = tb.TB_god_set.get_TB_god_set().universal_card;
            var cards = universal_card.filter(function (vo) {
                // vo [星级，品质，道具id]
                if (material.type == game.ConfigType.god) {
                    var god = tb.TB_god.get_TB_godById(material.godId);
                    return god.quality == vo[1] && material.starLv == vo[0];
                }
                else {
                    return material.starLv == vo[0];
                }
            });
            var has = new Array;
            cards.forEach(function (vo) {
                var hasNum = bagItems[vo[2]];
                if (hasNum != void 0 && hasNum > 0) {
                    for (var i = 0; i < hasNum; i++) {
                        var item = new ItemVo(vo[2], 1);
                        item.cardQuailty = vo[1];
                        item.show = false;
                        has.push(item);
                    }
                }
            });
            return has;
        };
        /** 是否有位置布阵 */
        GodUtils.isCanBuzhen = function () {
            // 开启数量
            var openNum = 0;
            var tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            tabgameset.lineup.forEach(function (level) {
                if (App.hero.level >= level) {
                    openNum++;
                }
            });
            // 布阵人员数量
            var godlist = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
            var godNum = 0;
            godlist.forEach(function (god) {
                if (god.uuid && god.uuid != "") {
                    godNum++;
                }
            });
            /**筛选和布阵不重复Id的 */
            var godAry = App.hero.getGodAry().filter((function (vo) {
                return !godlist.some(function (god) { return god.tab_god.ID == vo.tab_god.ID; });
            }));
            return openNum > godNum && godAry.length > 0;
        };
        /** 是否解锁位置 */
        GodUtils.isUnlock = function (pos, curLv) {
            var tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            return curLv >= tabgameset.lineup[pos];
        };
        /** 获取位置的解锁等级 */
        GodUtils.getUnlockLv = function (pos) {
            var tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            return tabgameset.lineup[pos];
        };
        /** 获取解锁数量 */
        GodUtils.getUnlockNum = function () {
            var tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            var num = 0;
            for (var _i = 0, _a = tabgameset.lineup; _i < _a.length; _i++) {
                var lv = _a[_i];
                if (App.hero.level >= lv) {
                    num++;
                }
            }
            return num;
        };
        /** 下阵英雄 */
        GodUtils.downGods = function (godVo) {
            return new Promise(function (resolve, reject) {
                if (!godVo) {
                    logerror("下阵英雄不能为空");
                    return;
                }
                var lineupobj = App.hero.lineupInfo;
                for (var key in lineupobj) {
                    if (Number(key) == iface.tb_prop.lineupTypeKey.expedition)
                        continue;
                    var ary = lineupobj[key];
                    var isExist = ary.some(function (uuid) {
                        return uuid == godVo.uuid;
                    });
                    if (isExist && ary.length <= 1) {
                        showToast(Number(key) == iface.tb_prop.lineupTypeKey.expedition ? LanMgr.getLan("", 10365) : LanMgr.getLan("", 10351));
                        return;
                    }
                }
                var args = {};
                args[Protocol.game_common_quickQuitLineup.args.godId] = godVo.uuid;
                PLC.request(Protocol.game_common_quickQuitLineup, args, function ($data) {
                    if (!$data) {
                        showToast(LanMgr.getLan("", 10352));
                        return;
                    }
                    godVo.isAttackFight = godVo.isDefendFight = godVo.isYuanzhengFight = false;
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        var view = UIMgr.getUIByName(UIConst.God_MainView);
                        view.refreshRoles();
                    }
                    resolve();
                });
            });
        };
        /**
         * 更换英雄
         * @param originGod 被替换的英雄 - 为空，则上阵，否则替换
         * @param replaceGod 要上阵的英雄
         * @param pos 上阵的位置
         */
        GodUtils.replaceGod = function (originGod, replaceGod, pos) {
            return new Promise(function (resolve, reject) {
                if (isNaN(pos) || pos < 0 || pos > 5) {
                    logwarn("更换英雄的位置错误：", pos);
                    return;
                }
                var type = iface.tb_prop.lineupTypeKey.attack;
                var lineupGods = App.hero.getLineUpTeam(type, true);
                // 获取其他位置的所有神灵
                var gods = lineupGods.filter(function (vo, index) {
                    return vo && index != pos;
                });
                var ids = gods.map(function (vo) {
                    return vo.templateId;
                });
                if (ids.indexOf(replaceGod.templateId) != -1) {
                    showToast(LanMgr.getLan("", 10353));
                    return;
                }
                // 替换英雄时，如果一方装备不为空，弹出提示更换装备
                if (originGod && (originGod.equipKeys.length > 0 || replaceGod.equipKeys.length > 0 || originGod.gemsList.length > 0 || replaceGod.gemsList.length > 0)) {
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan("", 10354),
                        confirmCb: function () {
                            var args = {};
                            args[Protocol.game_common_ajustLineupEquip.args.type] = type;
                            args[Protocol.game_common_ajustLineupEquip.args.srcId] = replaceGod.uuid;
                            args[Protocol.game_common_ajustLineupEquip.args.dstId] = originGod.uuid;
                            PLC.request(Protocol.game_common_ajustLineupEquip, args, function ($data) {
                                if (!$data) {
                                    showToast(LanMgr.getLan("", 10355));
                                    return;
                                }
                                UIMgr.hideUIByName(UIConst.God_ReplaceGodView);
                                if (UIMgr.hasStage(UIConst.God_MainView)) {
                                    var view = UIMgr.getUIByName(UIConst.God_MainView);
                                    view.changeRole(originGod, replaceGod);
                                }
                            });
                        },
                        cancelCb: function () {
                            GodUtils.shangZhen(originGod, replaceGod, pos, type, resolve);
                        }
                    });
                }
                else {
                    GodUtils.shangZhen(originGod, replaceGod, pos, type, resolve);
                }
            });
        };
        /** 上阵 */
        GodUtils.shangZhen = function (originGod, replaceGod, pos, type, resolve) {
            var lineupGods = App.hero.getLineUpTeam(type, true);
            var uuids = lineupGods.map(function (vo, index) {
                return vo ? (index == pos ? replaceGod.uuid : vo.uuid) : (index == pos ? replaceGod.uuid : null);
            });
            var num = GodUtils.getUnlockNum();
            uuids = uuids.slice(0, num);
            var args = {};
            args[Protocol.game_common_ajustLineup.args.type] = type;
            args[Protocol.game_common_ajustLineup.args.godIds] = uuids;
            PLC.request(Protocol.game_common_ajustLineup, args, function ($data) {
                if (!$data) {
                    showToast(LanMgr.getLan("", 10356));
                    return;
                }
                showToast(LanMgr.getLan("", 10357));
                UIMgr.hideUIByName(UIConst.God_ReplaceGodView);
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    var view = UIMgr.getUIByName(UIConst.God_MainView);
                    view.changeRole(originGod, replaceGod);
                }
                dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE_ONE), type);
            });
        };
        /** 获取英雄等级id */
        GodUtils.getGodLevelId = function (starLevel, level) {
            return starLevel * 1000 + level;
        };
        /** 获取英雄星级id */
        GodUtils.getGodStarId = function (starLevel, id) {
            return starLevel * 10000 + id;
        };
        /* 实时获取当前英雄数 */
        GodUtils.getGodsNum = function () {
            var keys = Object.keys(App.hero.gods);
            return keys.length;
        };
        /** 是否可激活 */
        GodUtils.isCanActivitySkin = function (tbGod) {
            return tbGod.getSkinList().some(function (vo) {
                return vo.isCanActivity();
            });
        };
        /** 获取光环激活的神灵数量列表 */
        GodUtils.getHaloGodNumAry = function (race) {
            var list = tb.TB_halo.getType(race);
            return list.map(function (vo) {
                return vo.godNum;
            });
        };
        /** 是否激活光环 */
        GodUtils.isActiveHalo = function (race, num) {
            var list = GodUtils.getHaloGodNumAry(race);
            return list.some(function (godNum) {
                return num >= godNum;
            });
        };
        /** 获取技能升级的下一个星级 */
        GodUtils.getSkillUpLvCondition = function (index, skillLv, maxStar) {
            // 0 表示满级
            var star = 0;
            var tempArr = tb.TB_god_evolution.get_TB_god_evolution();
            for (var i = 0; i < tempArr.length; i++) {
                var temp = tempArr[i];
                if (temp && temp.evolution_effect[index] == skillLv + 1) {
                    star = temp.ID;
                    break;
                }
            }
            // 下一级星级已超过神灵最大星级 -- 表示满级
            if (star > maxStar) {
                star = 0;
            }
            return star;
        };
        /** 是否激活神灵 -- 星级 */
        GodUtils.isActiveGodStarLv = function (godid, starlv) {
            var info = App.hero.maxStarLvInfo;
            var maxLv = info && info.hasOwnProperty(godid) ? (info[godid] || 0) : 0;
            return starlv <= maxLv;
        };
        /** 是否激活神灵 最小星级*/
        GodUtils.isActiveGod = function (godid) {
            var tbGod = tb.TB_god.get_TB_godById(godid);
            var minStar = tbGod.star[0] || 0;
            return GodUtils.isActiveGodStarLv(godid, minStar);
        };
        /** 获取神灵模型
         * tbGod可以是TB_god 或 TB_monster
         */
        GodUtils.getGodModel = function (skinId, tbGod) {
            if (skinId == game.GodSkinType.awaken) {
                return tbGod ? (tbGod instanceof tb.TB_monster ? tbGod.model : tbGod.awake_model) : 0;
            }
            else if (skinId == game.GodSkinType.origin) {
                return tbGod ? tbGod.model : 0;
            }
            var tbSkin = tb.TB_skin.getTbById(skinId);
            return tbSkin ? tbSkin.model : 0;
        };
        /** 获取展示模型 -- 特殊位置显示 */
        GodUtils.getShowGodModel = function (godid, skinId) {
            var tbGod = tb.TB_god.get_TB_godById(godid);
            var modelid = 0;
            if (tbGod) {
                var skinVo = tbGod ? tbGod.getSkinVo(skinId) : null;
                modelid = skinVo ? skinVo.getModelId() : 0;
            }
            else {
                tbGod = tb.TB_god.get_TB_godById(common.GlobalData.DEFAULT_SHOW_GODID);
                modelid = tbGod.model;
            }
            return modelid;
        };
        return GodUtils;
    }());
    game.GodUtils = GodUtils;
})(game || (game = {}));
