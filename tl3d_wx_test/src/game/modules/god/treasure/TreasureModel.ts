module game {
    export class TreasureModel {

        private static _instance: TreasureModel;
        public static getInstance(): TreasureModel {
            if (!TreasureModel._instance) {
                TreasureModel._instance = new TreasureModel();
            }
            return TreasureModel._instance;
        }
        constructor() {
        }

        // ---------------------  圣物数据增删改查 ---------------------
        /** 所有圣物列表 */
        private _treasureList: TreasureItemVo[] = [];
        public initModel(): void {
            this._treasureList.length = 0;
            for (let uuid in App.hero.treasures) {
                let vo = TreasureUtil.createTreasureVo(uuid, App.hero.treasures[uuid]);
                this._treasureList.push(vo);
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.UPDATE_TREASURE_DATA));
        }
        /** 新增圣物 {key:value}*/
        public addTreasure(addTreasures: any): void {
            let ary = [];
            for (let uuid in addTreasures) {
                ary.push(uuid);
                if (App.hero.treasures.hasOwnProperty(uuid)) {
                    for (let key in addTreasures[uuid]) {
                        App.hero.treasures[uuid][key] = addTreasures[uuid][key];
                    }
                } else {
                    App.hero.treasures[uuid] = addTreasures[uuid];
                    let vo = TreasureUtil.createTreasureVo(uuid, addTreasures[uuid]);
                    this._treasureList.push(vo);
                }
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.ADD_TREASURE), ary);
        }
        /** 删除圣物 {key:value}*/
        public delTreasure(delTreasures: any): void {
            let delUuid: string[] = [];
            for (let uuid in delTreasures) {
                if (App.hero.treasures.hasOwnProperty(uuid)) {
                    delete App.hero.treasures[uuid];
                    delUuid.push(uuid);
                }
            }
            let len = this._treasureList.length;
            for (let i = len - 1; i >= 0; i--) {
                let uuid = this._treasureList[i].uuid;
                if (delUuid.indexOf(uuid) != -1) {
                    this._treasureList.splice(i, 1);
                }
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.DEL_TREASURE), delUuid);
        }
        /** 更新圣物 : 更新圣物的神灵ID */
        public modifyTreasures(modifyTreasure: any): void {
            let ary: string[] = [];
            let vo = null;
            for (let uuid in modifyTreasure) {
                vo = App.hero.treasures[uuid];
                if (!vo) continue;
                vo.godId = modifyTreasure[uuid];
                let treasureVo = this.getTreasureByUuid(uuid);
                treasureVo.godId = modifyTreasure[uuid]
                ary.push(uuid);
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.MODIFY_TREASURE), ary);
        }
        /** 更新圣物 : 更新圣物的数量 */
        public modifyNum(modifyTreasureNum: any): void {
            let ary: string[] = [];
            for (let uuid in modifyTreasureNum) {
                if(App.hero.treasures[uuid]){
                    App.hero.treasures[uuid].num = modifyTreasureNum[uuid];
                }
                let treasureVo = this.getTreasureByUuid(uuid);
                if(!treasureVo)continue;
                treasureVo.num = modifyTreasureNum[uuid]
                ary.push(uuid);
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.MODIFY_TREASURE), ary);
        }
        /** 更新神灵穿戴的圣物 */
        public modifyGodTreasures(modifyGodTreasures: any): void {
            let godIds = [];
            for (let uuid in modifyGodTreasures) {
                godIds.push(uuid);
                let originGod = App.hero.gods[uuid];
                if (originGod) {
                    originGod.treasureKeys = modifyGodTreasures[uuid];
                }
                let godVo = App.hero.getGodVoById(uuid);
                let treasureObj = modifyGodTreasures[uuid];
                godVo.treasureKeys = [];
                for (let key in treasureObj) {
                    let treasureVo: TreasureItemVo = this.getTreasureByUuid(treasureObj[key]);
                    if (!treasureVo) {
                        logerror("没有该圣物,uuid:", treasureObj[key]);
                    }
                    godVo.treasureKeys.push(treasureVo);
                }
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.MODIFY_GOD_TREASURE), godIds);
        }
        /** 更新神灵的圣物:强化升星等 */
        public updateTargetTreasures(targetTreasure: any): void {
            let ids = [];
            for (let uuid in targetTreasure) {
                let targetObj = targetTreasure[uuid];
                let curObj = App.hero.treasures[uuid];
                if (!curObj) continue;
                let treasureVo: TreasureItemVo = this.getTreasureByUuid(uuid);
                for (let key in targetObj) {
                    curObj[key] = targetObj[key];
                    treasureVo[key] = targetObj[key];
                }
                ids.push(uuid);
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.MODIFY_TARGET_TREASURE), ids);
        }
        /** 获取圣物 */
        public getTreasureByUuid(uuid: string): TreasureItemVo {
            return this._treasureList.find((vo) => {
                return vo.uuid == uuid;
            });
        }
        public getTreasures(): TreasureItemVo[] {
            return this._treasureList;
        }

        // ---------------------  界面显示 ---------------------
        /** 获取选择圣物界面：显示所有未穿戴的圣物 */
        getTreasureChooseList(sort: boolean): TreasureItemVo[] {
            let ary = this._treasureList.filter((vo) => {
                return !vo.isExsitGod();
            });
            if (sort) {
                // 品质-》星级-》强化等级 ID从低到高
                ary.forEach((vo) => {
                    vo.show = false;
                    vo.sortNum = vo.quality * 10000000 + vo.starLv * 100000 + vo.strengthLv * 1000 - vo.templateId;
                });
                ary.sort((a, b) => {
                    return b.sortNum - a.sortNum;
                });
            }
            return ary;
        }

        /** 获取强化圣物列表 只显示橙色以下品质圣物*/
        getStrengthTreasureList(ingoreList:string[]): Array<TreasureItemVo | ItemVo> {
            ingoreList = ingoreList || [];
            // 过滤已佩戴及橙色以上的(包括),再过滤掉传入的忽略列表
            let treasuras = this._treasureList.filter((vo) => {
                return !vo.isExsitGod() && vo.quality < QualityConst.ORANGE && ingoreList.indexOf(vo.uuid) == -1;
            });
            // 品质->星级>强化从低到高等级 ID从低到高
            treasuras.forEach((vo) => {
                vo.show = false;
                vo.sortNum = vo.quality * 10000000 + vo.starLv * 100000 - vo.strengthLv * 1000 - vo.templateId;
            });
            treasuras.sort((a, b) => {
                return a.sortNum - b.sortNum;
            });

            let ary: any[] = treasuras;
            let num = App.hero.getBagItemNum(CostTypeKey.treasure_exp);
            if (num > 0) {
                let itemVo = new ItemVo(CostTypeKey.treasure_exp, num);
                itemVo.show = false;
                ary.unshift(itemVo);
            }
            return ary;
        }

        /** 获取背包圣物列表 */
        getBagViewList(): Array<TreasureItemVo> {
            let ary = this._treasureList.filter((vo) => {
                return !vo.isExsitGod();
            });
            // 品质-》星级-》强化等级 ID从低到高
            ary.forEach((vo) => {
                vo.show = false;
                vo.sortNum = vo.quality * 10000000 + vo.starLv * 100000 + vo.strengthLv * 1000 - vo.templateId;
            });
            ary.sort((a, b) => {
                return b.sortNum - a.sortNum;
            });
            return ary;
        }

        private _tujianList: TreasureItemVo[];
        /** 图鉴列表 */
        getTujianViewList(): Array<TreasureItemVo> {
            if (!this._tujianList) {
                this._tujianList = [];
                let ary: tb.TB_item[] = [];
                let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_item)).data;
                for (let key in tbData) {
                    let tbItem: tb.TB_item = tbData[key];
                    if (tbItem.type == iface.tb_prop.itemTypeKey.treasure) {
                        ary.push(tbItem);
                    }
                }
                this._tujianList = ary.map((tbObj) => {
                    let tbStrenList = tb.TB_treasure.getList2(tbObj.quality, tbObj.defined[0]);
                    let maxTbStren: tb.TB_treasure = tbStrenList[tbStrenList.length - 1];
                    let maxStrengthLv = maxTbStren ? maxTbStren.getStrengthLv() : 0;

                    let tbStrarList = tb.TB_treasure_star.getList2(tbObj.quality, tbObj.defined[0]);
                    let maxTbStar: tb.TB_treasure_star = tbStrarList[tbStrarList.length - 1];
                    let maxStarLv = maxTbStar ? maxTbStar.getStarlv() : 0;

                    let obj: ITreasureSvo = { templateId: tbObj.ID, quality: tbObj.quality, num: 0, strengthLv: maxStrengthLv, starLv: maxStarLv };
                    let vo = new TreasureItemVo(obj);
                    vo.show = true;
                    return vo;
                });
            }
            return this._tujianList;
        }

        /**　获取可重生的圣物列表　养成过的紫色品质以上且没被穿戴的圣物 */
        getRebirthTreasureList(): TreasureItemVo[] {
            let list = this._treasureList.filter((vo) => {
                vo.show = false;
                return vo.isCanRebirth();
            });
            return list;
        }
    }
}