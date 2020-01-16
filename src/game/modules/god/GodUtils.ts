

module game {

    export class GodUtils {

        /**
         * 筛选英雄 可供选择的英雄列表
         * @param tbVo 所需材料
         * @param curGod 当前神灵
         * @param ignores 互斥需忽略,如多个材料，前面已选择的后面要忽略
         */
        static filterGods(tbVo: GodMaterialTbVo, curGod: GodItemVo, ignores?: GodChooseMaterialVo[]): Array<GodItemVo | ItemVo> {
            let gods = App.hero.getGodAry(-1, -1);
            // 筛选可用神灵
            let tempGods: GodItemVo[] = [];
            if (tbVo.type == ConfigType.god) {
                // 指定英雄
                for (let i = 0; i < gods.length; i++) {
                    if (gods[i].templateId == tbVo.godId && gods[i].uuid != curGod.uuid && gods[i].starLevel == tbVo.starLv) {
                        tempGods.push(gods[i]);
                    }
                }
            } else if (tbVo.type == ConfigType.race) {
                // 指定阵营
                for (let i = 0; i < gods.length; i++) {
                    if ((gods[i].tab_god.race_type == curGod.tab_god.race_type || tbVo.race == 0) && gods[i].uuid != curGod.uuid && gods[i].starLevel == tbVo.starLv) {
                        tempGods.push(gods[i]);
                    }
                }
            }
            // 筛选可用万能卡
            let cards: ItemVo[] = GodUtils.getUniversalCards(tbVo);
            // if (cards.length > 50) cards.length = 50;
            // 其他格子的英雄及万能卡删掉
            ignores = ignores ? ignores : [];
            for (let info of ignores) {
                if (info.type == MaterialType.god) {
                    let index = tempGods.findIndex((vo) => {
                        return vo.uuid == info.id;
                    });
                    if (index != -1) {
                        tempGods.splice(index, 1);
                    }
                } else if (info.type == MaterialType.card) {
                    let index = cards.findIndex((vo) => {
                        return vo.id == info.id;
                    });
                    if (index != -1) {
                        cards.splice(index, 1);
                    }
                }
            }
            return [...tempGods, ...cards];
        }

        /** 材料是否充足,自己过滤选择的 */
        static isEnoughMaterial(godVo: GodItemVo, materialAry: GodMaterialTbVo[], isRedpoint: boolean = false): boolean {
            let ignores: GodChooseMaterialVo[] = [];
            if (isRedpoint) {
                let gods = App.hero.getGodArr();
                for (let godVo of gods) {
                    if (godVo.isInLinuep()) {
                        ignores.push({ type: MaterialType.god, id: godVo.uuid, index: -1 });
                    }
                }
            }
            let isCan = true;
            for (let mtVo of materialAry) {
                let ary = GodUtils.filterGods(mtVo, godVo, ignores);
                if (ary.length < mtVo.count) {
                    isCan = false;
                    break;
                }
                // 默认从前面选择
                ary = ary.slice(0, mtVo.count);
                for (let i = 0; i < ary.length; i++) {
                    let itemVo = ary[i]
                    if (itemVo instanceof GodItemVo) {
                        ignores.push({ type: MaterialType.god, id: itemVo.uuid, index: i });
                    } else if (itemVo instanceof ItemVo) {
                        ignores.push({ type: MaterialType.card, id: itemVo.id, index: i });
                    }
                }
            }
            return isCan;
        }

        /** 获得万能卡 */
        static getUniversalCards(material: GodMaterialTbVo, bagItems?: Object): ItemVo[] {
            if (!bagItems) bagItems = GodModel.getInstance().getWanNengCards();
            let universal_card = tb.TB_god_set.get_TB_god_set().universal_card;
            let cards = universal_card.filter(vo => {
                // vo [星级，品质，道具id]
                if (material.type == ConfigType.god) {
                    let god = tb.TB_god.get_TB_godById(material.godId);
                    return god.quality == vo[1] && material.starLv == vo[0];
                } else {
                    return material.starLv == vo[0];
                }
            })
            let has: ItemVo[] = new Array;
            cards.forEach(vo => {
                let hasNum = bagItems[vo[2]];
                if (hasNum != void 0 && hasNum > 0) {
                    for (let i = 0; i < hasNum; i++) {
                        let item = new ItemVo(vo[2], 1);
                        item.cardQuailty = vo[1];
                        item.show = false;
                        has.push(item);
                    }
                }
            })
            return has;
        }

        /** 是否有位置布阵 */
        static isCanBuzhen(): boolean {
            // 开启数量
            let openNum: number = 0;
            let tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            tabgameset.lineup.forEach((level) => {
                if (App.hero.level >= level) {
                    openNum++;
                }
            });
            // 布阵人员数量
            let godlist: GodItemVo[] = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
            let godNum: number = 0;
            godlist.forEach((god: GodItemVo) => {
                if (god.uuid && god.uuid != "") {
                    godNum++;
                }
            });
            /**筛选和布阵不重复Id的 */
            let godAry = App.hero.getGodAry().filter((vo => {
                return !godlist.some(god => god.tab_god.ID == vo.tab_god.ID);
            }))
            return openNum > godNum && godAry.length > 0;
        }

        /** 是否解锁位置 */
        static isUnlock(pos: number, curLv: number): boolean {
            let tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            return curLv >= tabgameset.lineup[pos];
        }
        /** 获取位置的解锁等级 */
        static getUnlockLv(pos: number): number {
            let tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            return tabgameset.lineup[pos];
        }
        /** 获取解锁数量 */
        static getUnlockNum(): number {
            let tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            let num = 0;
            for (let lv of tabgameset.lineup) {
                if (App.hero.level >= lv) {
                    num++;
                }
            }
            return num;
        }

        /** 下阵英雄 */
        static downGods(godVo: GodItemVo): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!godVo) {
                    logerror("下阵英雄不能为空");
                    return;
                }
                let lineupobj = App.hero.lineupInfo;
                for (let key in lineupobj) {
                    if (Number(key) == iface.tb_prop.lineupTypeKey.expedition) continue;
                    let ary: any[] = lineupobj[key];
                    let isExist = ary.some((uuid) => {
                        return uuid == godVo.uuid;
                    })
                    if (isExist && ary.length <= 1) {
                        showToast( Number(key) == iface.tb_prop.lineupTypeKey.expedition ? LanMgr.getLan("", 10365) : LanMgr.getLan("", 10351));
                        return;
                    }
                }
                var args = {};
                args[Protocol.game_common_quickQuitLineup.args.godId] = godVo.uuid;
                PLC.request(Protocol.game_common_quickQuitLineup, args, ($data: any) => {
                    if (!$data) {
                        showToast(LanMgr.getLan("", 10352));
                        return;
                    }
                    godVo.isAttackFight = godVo.isDefendFight = godVo.isYuanzhengFight = false;
                    if (UIMgr.hasStage(UIConst.God_MainView)) {
                        let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                        view.refreshRoles();
                    }
                    resolve();
                });
            });
        }

        /**
         * 更换英雄
         * @param originGod 被替换的英雄 - 为空，则上阵，否则替换
         * @param replaceGod 要上阵的英雄
         * @param pos 上阵的位置
         */
        static replaceGod(originGod: GodItemVo, replaceGod: GodItemVo, pos: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (isNaN(pos) || pos < 0 || pos > 5) {
                    logwarn("更换英雄的位置错误：", pos);
                    return;
                }
                let type = iface.tb_prop.lineupTypeKey.attack;
                let lineupGods = App.hero.getLineUpTeam(type, true);
                // 获取其他位置的所有神灵
                let gods = lineupGods.filter((vo, index) => {
                    return vo && index != pos;
                });
                let ids = gods.map((vo) => {
                    return vo.templateId;
                });
                if (ids.indexOf(replaceGod.templateId) != -1) {
                    showToast(LanMgr.getLan("", 10353));
                    return;
                }
                // 替换英雄时，如果一方装备不为空，弹出提示更换装备
                if (originGod && (originGod.equipKeys.length > 0 || replaceGod.equipKeys.length > 0 || originGod.gemsList.length > 0 || replaceGod.gemsList.length > 0)) {
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan(``,10354),
                        confirmCb: () => {
                            let args = {};
                            args[Protocol.game_common_ajustLineupEquip.args.type] = type;
                            args[Protocol.game_common_ajustLineupEquip.args.srcId] = replaceGod.uuid;
                            args[Protocol.game_common_ajustLineupEquip.args.dstId] = originGod.uuid;
                            PLC.request(Protocol.game_common_ajustLineupEquip, args, ($data: any) => {
                                if (!$data) {
                                    showToast(LanMgr.getLan("", 10355));
                                    return;
                                }
                                UIMgr.hideUIByName(UIConst.God_ReplaceGodView);
                                if (UIMgr.hasStage(UIConst.God_MainView)) {
                                    let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                                    view.changeRole(originGod, replaceGod);
                                }
                            });
                        },
                        cancelCb: () => {
                            GodUtils.shangZhen(originGod, replaceGod, pos, type, resolve);
                        }
                    });
                } else {
                    GodUtils.shangZhen(originGod, replaceGod, pos, type, resolve);
                }
            });
        }
        /** 上阵 */
        private static shangZhen(originGod, replaceGod: GodItemVo, pos: number, type: number, resolve: Function): void {
            let lineupGods = App.hero.getLineUpTeam(type, true);
            let uuids = lineupGods.map((vo, index) => {
                return vo ? (index == pos ? replaceGod.uuid : vo.uuid) : (index == pos ? replaceGod.uuid : null);
            });
            let num = GodUtils.getUnlockNum();
            uuids = uuids.slice(0, num);
            let args = {};
            args[Protocol.game_common_ajustLineup.args.type] = type;
            args[Protocol.game_common_ajustLineup.args.godIds] = uuids;
            PLC.request(Protocol.game_common_ajustLineup, args, ($data: any) => {
                if (!$data) {
                    showToast(LanMgr.getLan("", 10356));
                    return;
                }
                showToast(LanMgr.getLan("",10357));
                UIMgr.hideUIByName(UIConst.God_ReplaceGodView);
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                    view.changeRole(originGod, replaceGod);
                }
                dispatchEvt(new GodEvent(GodEvent.BUZHEN_COMPLETE_ONE), type);
            });
        }

        /** 获取英雄等级id */
        static getGodLevelId(starLevel: number, level: number): number {
            return starLevel * 1000 + level;
        }

        /** 获取英雄星级id */
        static getGodStarId(starLevel: number, id: number): number {
            return starLevel * 10000 + id;
        }

        /* 实时获取当前英雄数 */
        static getGodsNum(): number {
            let keys = Object.keys(App.hero.gods);
            return keys.length;
        }

        /** 是否可激活 */
        static isCanActivitySkin(tbGod: tb.TB_god): boolean {
            return tbGod.getSkinList().some((vo) => {
                return vo.isCanActivity();
            });
        }

        /** 获取光环激活的神灵数量列表 */
        static getHaloGodNumAry(race: number): number[] {
            let list = tb.TB_halo.getType(race);
            return list.map((vo) => {
                return vo.godNum;
            });
        }
        /** 是否激活光环 */
        static isActiveHalo(race: number, num: number): boolean {
            let list = GodUtils.getHaloGodNumAry(race);
            return list.some((godNum) => {
                return num >= godNum;
            });
        }

        /** 获取技能升级的下一个星级 */
        static getSkillUpLvCondition(index: number, skillLv: number, maxStar: number): number {
            // 0 表示满级
            let star = 0;
            let tempArr: tb.TB_god_evolution[] = tb.TB_god_evolution.get_TB_god_evolution();
            for (let i: number = 0; i < tempArr.length; i++) {
                let temp: tb.TB_god_evolution = tempArr[i];
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
        }

        /** 是否激活神灵 -- 星级 */
        static isActiveGodStarLv(godid: number, starlv: number): boolean {
            let info = App.hero.maxStarLvInfo;
            let maxLv: number = info && info.hasOwnProperty(godid) ? (info[godid] || 0) : 0;
            return starlv <= maxLv;
        }
        /** 是否激活神灵 最小星级*/
        static isActiveGod(godid: number): boolean {
            let tbGod = tb.TB_god.get_TB_godById(godid);
            let minStar = tbGod.star[0] || 0;
            return GodUtils.isActiveGodStarLv(godid, minStar);
        }

        /** 获取神灵模型 
         * tbGod可以是TB_god 或 TB_monster
         */
        static getGodModel(skinId: number, tbGod): number {
            if (skinId == GodSkinType.awaken) {
                return tbGod ? (tbGod instanceof tb.TB_monster ? tbGod.model : tbGod.awake_model) : 0;
            } else if (skinId == GodSkinType.origin) {
                return tbGod ? tbGod.model : 0;
            }
            let tbSkin = tb.TB_skin.getTbById(skinId);
            return tbSkin ? tbSkin.model : 0;
        }

        /** 获取展示模型 -- 特殊位置显示 */
        static getShowGodModel(godid: number, skinId: number): number {
            let tbGod = tb.TB_god.get_TB_godById(godid);
            let modelid: number = 0;
            if (tbGod) {
                let skinVo = tbGod ? tbGod.getSkinVo(skinId) : null;
                modelid = skinVo ? skinVo.getModelId() : 0;
            } else {
                tbGod = tb.TB_god.get_TB_godById(common.GlobalData.DEFAULT_SHOW_GODID);
                modelid = tbGod.model;
            }
            return modelid;
        }
    }
}