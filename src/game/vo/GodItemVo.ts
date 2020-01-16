interface IGodSvo {
    templateId: number;     // 神灵模板ID
    starLevel: number;      // 星级
    degree: number;         // 阶级
    level: number;          // 等级
    awakenLv: number;       // 觉醒等级 
    equipKeys: any;          // 神灵穿戴的装备集合 {1号位：equipKey1, 2号位：equipKey2, 3号位：equipKey3, 4号位：equipKey4}
    fuseLevel: number;     // 神灵融魂等级
    fuseAttrLevels: any;     // 神灵融魂各属性等级
    skinId: number;         // 神灵皮肤ID
    treasureKeys: any;       // 神灵穿戴的宝物集合 {1号位：treasureKey1}
    gemInfo: any;        // 神灵宝石集合
}

class GodItemVo implements inface.IHeadData {
    /**唯一Id */
    public uuid: string;
    public skinId: number = 0;         // 皮肤ID
    public templateId: number;
    public starLevel: number;
    public level: number;
    public levelStr: string;
    /** 阶 */
    public degree: number;
    public exp: number;
    public equipKeys: Array<EquipItemVo>;
    public treasureKeys: TreasureItemVo[];
    private _tab_god: tb.TB_god;
    //布阵站位
    public local: Array<number>;
    //是否攻击出战
    public isAttackFight: boolean = false;
    //是否防守出战
    public isDefendFight: boolean = false;
    // 是否远征攻击阵容
    public isYuanzhengFight: boolean = false;
    public selected: boolean = false;
    public dataType: number = 0;
    //战力
    public fightPower: number = 0;
    // 服务器战力
    public svrForce : number = 0;
    public fuseLevel: number;
    public fuseAttrLevels: any;
    // 排序数字，需自己设置，多处使用
    public sortNum: number = 0;
    /** 觉醒等级 */
    public awakenLv: number = 0;
    /** 最大星级可升级的最大觉醒等级 */
    public maxAwakenLv: number = 0;
    public maxTbLv: number = 0;
    /** 宝石信息 */
    private gemInfo: Object = {};
    public gemsList: GemstoneItemVo[] = [];

    //服务端给的属性
    public iSeverAttri: number[][] = new Array;
    public isAid: boolean = false;

    constructor($data) {
        if (!$data) {
            logerror("god item error :", $data);
            return;
        }
        this.templateId = $data.templateId ? $data.templateId : $data.ID;
        if ($data.star) this.starLevel = $data.star[0];
        else this.starLevel = $data.starLevel;
        this.level = $data.level ? $data.level : 1;
        this.skinId = $data.skinId ? $data.skinId : 0;
        this.exp = $data.exp ? $data.exp : 0;
        this.degree = $data.degree ? $data.degree : 0;
        this.fuseLevel = $data.fuseLevel ? $data.fuseLevel : 1;
        this.awakenLv = $data.awakenLv ? $data.awakenLv : 0;
        this.fuseAttrLevels = $data.fuseAttrLevels ? $data.fuseAttrLevels : {};
        this.local = [99999, 99999, 99999, 99999];
        // this.fightPower = this.getShenli();
        let sta = this.tab_god ? this.tab_god.star[1] : 1;
        this.maxAwakenLv = tb.TB_awaken_conditions.getTbById(sta).awake_section_max;
        this.maxTbLv = tb.TB_god_evolution.get_TB_god_evolutionById(sta).level;
    }

    public static getData($obj, $godkey?): GodItemVo {
        let vo: GodItemVo = new GodItemVo($obj);
        vo.tab_god = tb.TB_god.get_TB_godById(vo.templateId);
        if (!vo.tab_god) {
            logerror('英雄不存在', vo.templateId);
        }
        vo.uuid = $godkey;
        return vo;
    }

    setgemInfo(info: Object): void {
        this.gemInfo = info || {};
        this.gemsList = [];
        if (!info) return;
        for (var key in info) {
            if (info[key]) {
                let gemstoneVo: GemstoneItemVo = game.GemstoneModel.getInstance().getGemstoneByUuid(info[key]);
                if (!gemstoneVo) {
                    logerror("没有该宝石:", info[key]);
                }
                this.gemsList.push(gemstoneVo);
            }
        }
    }
    isExistGem(slot: number): boolean {
        return this.gemInfo[slot] ? true : false;
    }
    getGemsBySlot(slot: number): GemstoneItemVo {
        let uuid = this.gemInfo[slot];
        return uuid ? this.gemsList.find((vo) => {
            return vo.uuid == uuid;
        }) : null;
    }

    /** 是否是可升星英雄 */
    public isStarupGod(): boolean {
        return this.starLevel >= 4;
    }

    public getName(): string {
        return this.getObjectData().name;
    }

    public getLevel(): number {
        return this.level;
    }
    public getLevelStr(): string {
        return this.levelStr;
    }

    public getDataType(): number {
        return this.dataType;
    }

    public getStar(): number {
        return this.starLevel;
    }

    public getRaceType(): any {
        return this.tab_god.race_type;
    }
    public getAttrType(): any {
        return this.tab_god.type;
    }

    public get tab_god(): tb.TB_god {
        if (!this._tab_god) {
            this._tab_god = tb.TB_god.get_TB_godById(this.templateId);
        }
        if (!this._tab_god) {
            logerror("god templateId undef : " + this.templateId);
        }
        return this._tab_god;
    }

    get starUpTb(): tb.TB_god_star {
        let id = game.GodUtils.getGodStarId(this.starLevel, this.templateId)
        return tb.TB_god_star.get_TB_god_starById(id);
    }

    get costtab(): tb.TB_god_evolution {
        return tb.TB_god_evolution.get_TB_god_evolutionById(this.starLevel);
    }

    public set tab_god(value) {
        this._tab_god = value;
    }

    public getQulity(): string {
        return SkinUtil.getBoxQulityIcon(this.tab_god.quality + 1);
    }
    public getIconUrl(): string {
        return SkinUtil.getHeadIcon(this.tab_god.icon);
    }
    public getFrameUrl(): string {
        let quality: number = this.starLevel;
        if (quality > 6) quality = 6;
        return SkinUtil.getBoxQulityIcon(quality);
    }

    public inLine() {
        let lineType = 4;
        for (let i = 0; i < this.local.length; i++) {
            if (this.local[i] != 99999) {
                lineType = i;
                break;
            }
        }
        return lineType;
    }

    /** 是否觉醒 */
    public isAwaken(): boolean {
        return this.awakenLv >= tb.TB_god_set.get_TB_god_set().awake_section;
    }

    public isMoreThanSix(): boolean {
        return this.starLevel >= 6;
    }
    /** 是否在阵容中 
     *  0 全部：排除失落遗迹阵容
    */
    public isInLinuep(type: number = 0): boolean {
        let allAry = [];
        let info = App.hero.lineupInfo;
        let idsAry = [];
        if (type == 0) {
            for (let key in info) {
                //排除失落遗迹阵容
                if (Number(key) == iface.tb_prop.lineupTypeKey.expedition) {
                    continue;
                }
                idsAry = info[key] ? info[key] : [];
                allAry.push(...idsAry);
            }
        } else {
            idsAry = info[type] ? info[type] : [];
            allAry.push(...idsAry);
        }
        return allAry.indexOf(this.uuid) != -1;
    }

    /** 某个槽位是否装备 */
    public isEquipBySlot(slot: number): boolean {
        return this.getEquipmentBySlot(slot) ? true : false;
    }

    /** 获取某个槽位的装备 */
    public getEquipmentBySlot(slot: number): EquipItemVo {
        return this.equipKeys.find((equipVo) => {
            return Number(equipVo.slot) == slot;
        });
    }
    /** 是否可升级 */
    public isCanLvup(): boolean {
        // 阶数只能升到6阶，等级可以根据星级去升
        let degreeNum = this.degree == 6 ? this.starLevel : this.degree;
        let evotab = tb.TB_god_evolution.get_TB_god_evolutionById(degreeNum)
        let maxLv = evotab.level;
        let godlevel: tb.TB_god_level = tb.TB_god_level.get_TB_god_levelnById(this.level);
        let flag: boolean = (this.level < maxLv) && App.isEnoughByAry(godlevel.cost);
        return flag;
    }
    /** 是否可升阶 */
    public isCanDegreeUp(): boolean {
        if (!App.IsSysOpen(ModuleConst.SHENGJIE)) return;
        // 阶数只能升到6阶，等级可以根据星级去升
        let maxGrade = this.starLevel >= 6 ? 6 : this.starLevel;
        if (this.degree >= maxGrade) return false;
        let evotab = tb.TB_god_evolution.get_TB_god_evolutionById(this.degree)
        let maxLv = evotab.level;
        let flag: boolean = this.level == maxLv && App.isEnoughByAry(evotab.cost) && evotab.cost.length != 0;
        return flag;
    }
    /** 是否可以穿戴圣物 */
    public isCanWearTreasure(): boolean {
        if (!App.IsSysOpen(ModuleConst.TREASURE)) return;
        return this.treasureKeys.length == 0 && game.TreasureModel.getInstance().getTreasureChooseList(false).length > 0;
    }
    /** 
     * 是否可以一键装备（不考虑装备最高等级） 
    */
    public isCanOneKeyEquip(): boolean {
        let arrQiuck = game.EquipModel.getInstance().equipQiuck(this);
        return arrQiuck.length == 0 ? false : true;
    }

    /**升星材料是否足够 -- 六星以上需要消耗*/
    hasStarUpCost(): boolean {
        let cost = this.costtab.cost;
        return this.starLevel < 6 || (this.starLevel >= 6 && App.isEnoughByAry(cost));
    }
    /** 是否禁止升星到7星 满阶以后才可升七星 */
    forbitStarUpTo7(): boolean {
        return this.starLevel == 6 && this.degree < 6;
    }

    /** 是否可升星 四星以下不能升星
     *  红点排除阵容上面的
    */
    isCanStarUp(isRedpoint: boolean = false): boolean {
        if (!App.IsSysOpen(ModuleConst.SHENGXING) || !this.starUpTb || !this.hasStarUpCost() || this.forbitStarUpTo7()) return false;
        return game.GodUtils.isEnoughMaterial(this, this.starUpTb.getGodMaterialList(), isRedpoint);
    }
    /** 是否可觉醒 */
    isCanAwaken(): boolean {
        if (!App.IsSysOpen(ModuleConst.JUEXING) || this.awakenLv >= this.maxAwakenLv) return false;
        if (this.awakenLv >= this.getCurMaxAwakenLv()) return false;
        let tbAwaken = tb.TB_god_awaken.getTbById(this.awakenLv);
        return App.isEnoughByAry(tbAwaken.material) && game.GodUtils.isEnoughMaterial(this, tbAwaken.getGodMaterialList());
    }

    public getObjectData(): tb.TB_god {
        let godtab: tb.TB_god = tb.TB_god.get_TB_godById(this.templateId);
        return godtab;
    }

    /** 是否可升星 */
    public canStarUp(): boolean {
        let id = game.GodUtils.getGodStarId(this.starLevel, this.templateId);
        let startab: tb.TB_god_star = tb.TB_god_star.get_TB_god_starById(id);
        return (startab ? true : false) && this.starLevel >= 4 && this.starLevel < this.tab_god.star[1];
    }

    /** 获取装备的强化总次数 */
    getStrengthNum(): number {
        let num = 0;
        this.equipKeys.forEach((equipVo) => {
            num += equipVo.strengthLv;
        });
        return num;
    }
    /** 几个装备是否都强化到了几级 */
    isStrengthToLv(count: number, level: number): boolean {
        let num = 0;
        this.equipKeys.forEach((equipVo) => {
            if (equipVo.strengthLv >= level) {
                num++;
            }
        });
        return num >= count;
    }
    /** 获取装备的精炼总次数 */
    getRefineNum(): number {
        let num = 0;
        this.equipKeys.forEach((equipVo) => {
            num += equipVo.refineLv;
        });
        return num;
    }
    /** 几个装备是否都精炼到了几级 */
    isRefineToLv(count: number, level: number): boolean {
        let num = 0;
        this.equipKeys.forEach((equipVo) => {
            if (equipVo.refineLv >= level) {
                num++;
            }
        });
        return num >= count;;
    }

    /** 获取最低的强化等级 */
    getStrengthLowLv(): number {
        if (this.equipKeys.length == 0) return 0;
        let num = this.equipKeys[0].strengthLv;
        this.equipKeys.forEach((equipVo) => {
            if (equipVo.strengthLv < num) {
                num = equipVo.strengthLv;
            }
        });
        return num;
    }
    /** 获取最低的精炼等级 */
    getRefineLowLv(): number {
        if (this.equipKeys.length == 0) return 0;
        let num = this.equipKeys[0].refineLv;
        this.equipKeys.forEach((equipVo) => {
            if (equipVo.refineLv < num) {
                num = equipVo.refineLv;
            }
        });
        return num;
    }
    /** 获取某品质的所有装备 */
    getQualityEquips(quality: number): EquipItemVo[] {
        return this.equipKeys.filter((vo) => {
            return vo.quality == quality;
        });
    }

    /**
     * 有可强化或者精炼的装备
     * @param type 装备类型
     */
    public isHaveLowEquip(type: number): boolean {
        return this.equipKeys.some((equip) => {
            if (type == EquipTabType.strength) {
                return equip.strengthLv < this.level;
            } else {
                return equip.refineLv < tb.TB_equip_set.getRefineLimit(this.degree);
            }
        });
    }
    /** 获取最低级别的装备 */
    public getLowestEquipSlots(type: number): number[] {
        let ary = [...this.equipKeys];
        ary.sort((a, b) => {
            return type == EquipTabType.strength ? a.strengthLv - b.strengthLv : a.refineLv - b.refineLv;
        });
        let slots = [];
        let minLv = ary[0] ? (type == EquipTabType.strength ? ary[0].strengthLv : ary[0].refineLv) : 0;
        for (let i = 0; i < ary.length; i++) {
            if ((type == EquipTabType.strength && ary[i].strengthLv == minLv) || (type == EquipTabType.refine && ary[i].refineLv == minLv)) {
                slots.push(ary[i].slot);
            }
        }
        return slots;
    }

    /**可升级装备
     * @param type 0:精炼属性 1:强化属性
     */
    getCanUpGradeEquips(type: number): Array<EquipItemVo> {
        let newEquips = [];
        let minLv = type == 0 ? this.getRefineLowLv() : this.getStrengthLowLv();
        this.equipKeys.forEach((equip: EquipItemVo) => {
            let lv = type == 0 ? equip.refineLv : equip.strengthLv;
            let ismax: boolean = type == 0 ? equip.isTopRefineLv() : equip.isTopStrengthLv();
            if (!ismax && lv == minLv) {
                newEquips.push(equip);
            }
        });

        return newEquips;
    }

    /** 装备强化等级或者精炼等级是否满级 */
    isAllEquipLvTop(type: number, slot?: number): boolean {
        if (type == EquipTabType.strength) {
            if (slot) {
                let equipVo = this.getEquipmentBySlot(slot);
                return equipVo && equipVo.isTopStrengthLv();
            } else {
                if (this.equipKeys.length == 0) return false;
                return this.equipKeys.every((vo) => {
                    return vo.isTopStrengthLv();
                });
            }
        } else if (type == EquipTabType.refine) {
            if (slot) {
                let equipVo = this.getEquipmentBySlot(slot);
                return equipVo && equipVo.isTopRefineLv();
            } else {
                if (this.equipKeys.length == 0) return false;
                return this.equipKeys.every((vo) => {
                    return vo.isTopRefineLv();
                });
            }
        }
        return false;
    }

    /**装备精炼n级需要的材料
    */
    public getRefineCost(Num: number = 1): number[][] {
        let cost: Object = {};
        let newEquips = this.getCanUpGradeEquips(0)
        for (let i in newEquips) {
            let need = newEquips[i].getRefineCost(Num)
            for (let key in need) {
                if (cost[key]) cost[key] += need[key];
                else cost[key] = need[key];
            }
        }
        return map2ary(cost);
    }

    /** 装备强化n级需要的材料 */
    public getStrengthCost(Num: number = 1): Array<Array<number>> {
        let cost: Object = {};
        let newEquips = this.getCanUpGradeEquips(1)
        for (let i in newEquips) {
            let need = newEquips[i].strengthCost(Num)
            for (let key in need) {
                if (cost[key]) cost[key] += need[key];
                else cost[key] = need[key];
            }
        }
        return map2ary(cost);
    }

    /**装备当前级属性和下一级属性
     * @param type 0:精炼属性 1:强化属性 
     */
    getCurLvAttriAndNext(type: number): Array<Array<number>> {
        // 本次升级中可升级的装备：最低等级的装备
        let canLvupList: EquipItemVo[] = [];
        let notLvupList: EquipItemVo[] = [];
        let minLv = type == 0 ? this.getRefineLowLv() : this.getStrengthLowLv();
        this.equipKeys.forEach((equip: EquipItemVo) => {
            let lv = type == 0 ? equip.refineLv : equip.strengthLv;
            let ismax: boolean = type == 0 ? equip.isTopRefineLv() : equip.isTopStrengthLv();
            if (!ismax && lv == minLv) {
                canLvupList.push(equip);
            } else {
                notLvupList.push(equip);
            }
        });
        let curLvAttri = {};
        let nextLvAttri = {};
        for (let equip of canLvupList) {
            let attr = type == 0 ? equip.getRefineAttr(1) : equip.getStrengthAttr(1);
            for (let key in attr) {
                nextLvAttri[key] = nextLvAttri[key] || 0;
                nextLvAttri[key] += Number(attr[key]);
            }
            attr = type == 0 ? equip.getRefineAttr(0) : equip.getStrengthAttr(0);
            for (let key in attr) {
                curLvAttri[key] = curLvAttri[key] || 0;
                curLvAttri[key] += Number(attr[key]);
            }
        }
        for (let equip of notLvupList) {
            let attr = type == 0 ? equip.getRefineAttr(0) : equip.getStrengthAttr(0);
            for (let key in attr) {
                curLvAttri[key] = curLvAttri[key] || 0;
                curLvAttri[key] += Number(attr[key]);

                nextLvAttri[key] = nextLvAttri[key] || 0;
                nextLvAttri[key] += Number(attr[key]);
            }
        }

        let arr = [];
        let obj = { 1: 0, 2: 0, 3: 0 };
        for (let i in obj) {
            let nextAttri = nextLvAttri[i] || 0;
            nextAttri = type == 0 ? (Math.round(nextAttri * 10000) / 100) + "%" : nextAttri;
            let curAttri = curLvAttri[i] || 0;
            curAttri = type == 0 ? (Math.round(curAttri * 10000) / 100) + "%" : curAttri;
            arr.push([Number(i), curAttri]);
            arr.push([Number(i), nextAttri]);
        }
        return arr;
    }

    /**
     * 获得计算之后的英雄基础属性 
     * ( 基础属性*基础倍率 + 成长属性*成长倍率(等级-1) + 觉醒属性)
     * 速度属性 = 基础属性 + 固定值加成
     * @param $godVo 英雄在背包中的数据类型
     * @return 计算之后的英雄属性数组
     */
    public getProperty(level?: number, star?: number, degree?: number): Array<Array<number>> {
        if (this.iSeverAttri.length > 0) return this.iSeverAttri;
        let ary: Array<Array<number>> = new Array<Array<number>>();
        let godtab: tb.TB_god = tb.TB_god.get_TB_godById(Number(this.templateId));
        let evotab: tb.TB_god_evolution;
        let godset: tb.TB_god_set = tb.TB_god_set.get_TB_god_set();

        let nowStar = star == undefined ? this.starLevel : star;
        let nowLevel = level == undefined ? this.level : level;
        let nowDegree = degree == undefined ? this.degree : degree;

        if (nowStar <= godset.star_evolution && nowDegree <= godset.star_evolution)
            evotab = tb.TB_god_evolution.get_TB_god_evolutionById(nowDegree);//阶级
        else
            evotab = tb.TB_god_evolution.get_TB_god_evolutionById(nowStar);

        if (!evotab) {
            logerror("tab error:", nowDegree, nowStar);
            return ary;
        }
        // 前4个为固定值，后4个为百分比
        // 速度属性 = 基础属性 + 固定值加成
        for (let i = 0; i <= 7; i++) {
            let num: number;
            if (i < 3) {
                let prop = evotab.star_prop[i][1];
                let growth = evotab.star_growth[i][1];
                num = Number(godtab.attr_init[i][1] * prop + godtab.attr_grow[i][1] * growth * (nowLevel - 1));
            } else if (i >= 4) {
                num = Number(godtab.attr_init[i][1]) * 100;
            } else {
                num = Number(godtab.attr_init[i][1]);
            }
            ary.push([i + 1, num]);
        }
        let tbAwaken = tb.TB_god_awaken.getTbById(this.awakenLv);
        if (tbAwaken) {
            for (let atrAry of tbAwaken.attr) {
                let index = atrAry[0] - 1;
                ary[index][1] += atrAry[1];
            }
        }
        return ary;
    }

    /**
     * 在基础属性中 通过键获得值
     */
    public getAttrValByKeyOnBaseAttr(attrKey: number): number {
        let ary = this.getProperty();
        for (let i = 0; i < ary.length; i++) {
            if (Number(ary[i][0]) == attrKey) {
                return Number(ary[i][1]);
            }
        }
        return 0;
    }

    /**
     * 获得前三个属性
     */
    public jisuanchushi(num: number = this.starLevel, level: number = this.level): Array<Array<number>> { //作为阶级带参数调用计算 
        let godtab: tb.TB_god = tb.TB_god.get_TB_godById(Number(this.templateId));
        let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(num);
        let ary: Array<Array<number>> = new Array<Array<number>>();
        for (let i = 0; i < 3; i++) {
            let num: number;
            let prop = evotab ? evotab.star_prop[i][1] : 1;
            let growth = evotab ? evotab.star_growth[i][1] : 1;
            num = Number(godtab.attr_init[i][1] * prop + godtab.attr_grow[i][1] * growth * (level - 1));
            ary.push([i + 1, num]);
        }
        let tbAwaken = tb.TB_god_awaken.getTbById(this.awakenLv);
        if (tbAwaken) {
            for (let atrAry of tbAwaken.attr) {
                let index = atrAry[0] - 1;
                if (!ary[index]) {
                    ary[index] = [];
                }
                ary[index][1] += atrAry[1];
            }
        }
        return ary
    }

    /**
     * 获取英雄的所有技能
     * @param  英雄对象
     */
    public jisuanjineng(): Array<any> {
        let godtab: tb.TB_god = tb.TB_god.get_TB_godById(Number(this.templateId));
        return godtab.getAllSkill(this.degree, this.getStar());
    }
    /** 获取阶数开启的技能 */
    public getSkillIdByDegree(degree:number):number {
        let godtab: tb.TB_god = tb.TB_god.get_TB_godById(Number(this.templateId));
        let realskills = getSkillList(godtab.skill, degree, this.getStar());
        for (let ary of realskills) {
            if (ary[1] == degree) {
                return ary[0];
            }
        }
        return 0;
    }

    /** 计算装备属性 */
    public getEquipAttributes(): Array<Array<number>> {
        //索引0固定值 1百分比
        let tempResult: Array<Array<number>> = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        // 强化：固定值
        for (let i = 0; i < this.equipKeys.length; i++) {
            let equip = this.equipKeys[i];
            if (equip) {
                let obj = this.equipKeys[i].getStrengthAttr();
                for (let key in obj) {
                    tempResult[0][Number(key) - 1] += obj[key];
                }
            }
        }
        // 精炼：百分比
        for (let i = 0; i < this.equipKeys.length; i++) {
            let equip = this.equipKeys[i];
            if (equip) {
                let obj = this.equipKeys[i].getRefineAttr();
                for (let key in obj) {
                    tempResult[1][Number(key) - 1] += obj[key];
                }
            }
        }

        // 装备宝石属性：固定值
        for (let gemVo of this.gemsList) {
            let tbGem = gemVo ? gemVo.tbGem : null;
            if (tbGem) {
                let obj = tbGem.getAttr();
                for (let key in obj) {
                    tempResult[0][Number(key) - 1] += obj[key];
                }
            }
        }
        // 套装
        let arrSuitAttri = this.getEquipSuit();
        for (let i in arrSuitAttri) {
            for (let j in arrSuitAttri[i]) {
                tempResult[i][j] += arrSuitAttri[i][j];
            }
        }

        return tempResult;
    }

    /**装备套装属性 */
    public getEquipSuit(): Array<Array<number>> {
        let qualityobj = {};
        let arrGodEquip: Array<EquipItemVo> = this.equipKeys;
        //0固定值 1百分比
        let tempResult: Array<Array<number>> = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

        /**遍历出所有品质 */
        for (let i in arrGodEquip) {
            qualityobj[arrGodEquip[i].quality] = 0;
        }

        /** 某品质大于4的+1 */
        for (let i in arrGodEquip) {
            if (arrGodEquip[i].quality >= QualityConst.PURPLE) {
                qualityobj[arrGodEquip[i].quality]++;
            }
        }

        /**某品质大于4超过2个的计算套装加成 */
        for (let i in qualityobj) {
            let arrSuitId = [];
            let curQuality = Number(i);
            if (qualityobj[i] >= EquipSuit.two) {
                /**套装叠加 */
                for (let max = EquipSuit.four; max >= EquipSuit.two; max -= 1) {
                    if (max <= qualityobj[i]) {
                        arrSuitId.push(Number(i + max.toString()));
                    }
                }
                for (let j in arrSuitId) {
                    let suit = tb.TB_equip_suit.get_TB_equip_suitById(arrSuitId[j])
                    if (!suit) {
                        logerror(`未找到Id(${arrSuitId})装备套装数据表`);
                        continue;
                    }
                    tempResult[suit.suit_percent[1]][suit.suit_percent[0] - 1] += Number(suit.suit_percent[2]);
                }
            }
        }
        return tempResult;
    }


    /**
     * 获得总基础属性(英雄界面显示使用)
     * @param lineupType xx阵容（xx阵容的神器生效）为空时默认为攻击阵容
     */
    public getAllAttr(lineupType?: number): Array<Array<number>> {
        // loghgy("====",this.tab_god.name,"====");
        let tempJichuAttr = this.getProperty(); //基础属性
        // loghgy("基础属性:",tempJichuAttr);
        let tempJiachengAttr = this.getJiachengAttr(lineupType); //装备，神器，融魂加成属性
        // loghgy("总加成属性:",tempJiachengAttr);

        let haveGuild: boolean = game.GuildModel.getInstance().isHasGuild();
        // let guildSkillAttr = haveGuild ? game.GuildSkillModel.getInstance().getCurSkillAttr(this.getRaceType()) : null;//公会技能属性
        let guildSkillAttr = haveGuild ? game.GuildSkillModel.getInstance().getCurSkillAttr(this.tab_god.type) : null;//公会技能属性
        // loghgy("公会技能加成属性:",guildSkillAttr);
        let fateAttr = this.isAttackFight ? game.FateModel.getInstance().getCurFateAttr() : null;//羁绊属性
        // loghgy("羁绊加成属性:",fateAttr);
        // let tempAll = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]];
        let tempAllObj = {};
        let tempkey;
        let tempval;
        let fixed = tempJiachengAttr[0]
        let prec = tempJiachengAttr[1]
        //目前有16个属性
        for (let z = 0; z < 18; z++) {
            let attrVal = tempJichuAttr[z] ? (tempJichuAttr[z][1] || 0) : 0;
            if (z < 4) {
                tempkey = String(tempJichuAttr[z][0]);
                tempval = tempAllObj[tempkey] || 0;
                tempAllObj[tempkey] = tempval + attrVal + attrVal * prec[tempkey] + fixed[tempkey];
            } else {
                let jichutemp = [z + 1, 0];
                if (tempJichuAttr[z]) {
                    jichutemp = tempJichuAttr[z];
                }

                tempkey = String(jichutemp[0]);
                tempval = tempAllObj[tempkey] || 0;
                let fixedtemp = fixed[tempkey] || 0;
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
        let racePerAdd: number[] = game.GodModel.getInstance().getRaceAdd(lineupType);
        if (racePerAdd) {
            for (let i: number = 0; i < racePerAdd.length; i++) {
                if (racePerAdd[i] > 0) {
                    let key: string = String(i);
                    if (i < 5) {
                        if (i == 4) {
                            //速度
                        } else {
                            tempAllObj[key] *= (1 + racePerAdd[i]);
                        }
                    } else {
                        tempAllObj[key] += racePerAdd[i];
                    }
                }
            }
        }

        let tempAll = map2ary(tempAllObj);
        return tempAll;
    }

    /**英雄所有属性（战斗使用） */
    getFightAttr(lineupType?: number): Object {
        let attrObj: Object = {};

        // let artArrti = game.ArtifactModel.getInstance().getArtifactAllAttr();
        let godAttri: Array<Array<number>> = this.getAllAttr(lineupType);
        for (let attri of godAttri) {
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
    }

    private getPavSkillAttr() {
        let tempskills = [];
        let nskilllist = this.getSkillList();
        for (var i = 0; i < nskilllist.length; i++) {
            var item = nskilllist[i];
            if (this.degree >= item[1]) {
                tempskills.push(item[0]);
            }
        }
        return modifyPasvAttr(tempskills);
    }

    /** 获取属性总值 */
    getPropertyValue(index: number): number {
        if (this.isAid) {
            let svo = game.YuanzhengModel.getInstance().getHelpItemByUuid(this.uuid);
            return svo && svo.godInfo[3][1];
        }
        let allProperty = this.getAllAttr();
        let find = allProperty.find((ary) => {
            return ary[0] == index;
        });
        return find ? find[1] : 0;
    }

    /**
     * 获得总加成属性
     * @param lineupType xx阵容（xx阵容的神器生效）为空时默认为攻击阵容
     * @param valueType 值类型：ValueType
     */
    public getJiachengAttr(lineupType: number = 1): Array<Object> {
        let fixed: Object = {};//固定值
        let percent: Object = {};//百分比
        let tempEquipAttr = this.getEquipAttributes();
        // loghgy("装备属性总加成:",tempEquipAttr);
        let temp = 0;
        for (let i = 0; i < tempEquipAttr.length; i++) {
            for (let j = 0; j < tempEquipAttr[i].length; j++) {
                let id = j + 1;
                if (i == ValueType.fixed) {
                    this.modifyAttr(fixed, id, tempEquipAttr[i][j]);
                } else {
                    this.modifyAttr(percent, id, tempEquipAttr[i][j]);
                }
            }
        }

        // 固定值及百分比
        let artObtain = game.ArtifactModel.getArtAttr();
        // loghgy("神器收集加成属性:",artObtain);
        if (artObtain) {
            for (let i = 0; i < artObtain.length; i++) {
                for (let j = 0; j < artObtain[i].length; j++) {
                    let id = j + 1;
                    if (i == ValueType.fixed) {
                        this.modifyAttr(fixed, id, artObtain[i][j]);
                    } else {
                        this.modifyAttr(percent, id, artObtain[i][j]);
                    }
                }
            }
        }
        let baptizeAttr = game.ArtifactModel.getInstance().getBapAttri(this.tab_god.race_type, 2);
        // loghgy("神器洗练加成属性:",baptizeAttr);
        if (baptizeAttr) {
            for (let i = 0; i < baptizeAttr.length; i++) {
                for (let j = 0; j < baptizeAttr[i].length; j++) {
                    let id = j + 1;
                    if (i == ValueType.fixed) {
                        this.modifyAttr(fixed, id, baptizeAttr[i][j]);
                    } else {
                        this.modifyAttr(percent, id, baptizeAttr[i][j]);
                    }
                }
            }
        }
        let enchantAttr = game.ArtifactModel.getInstance().getEnchantAtttri(null, 0, false, true);//神器附魔属性
        // loghgy("神器升星加成属性:",enchantAttr);
        if (enchantAttr) {
            for (let i = 0; i < enchantAttr.length; i++) {
                for (let j = 0; j < enchantAttr[i].length; j++) {
                    let id = j + 1;
                    if (i == ValueType.fixed) {
                        this.modifyAttr(fixed, id, enchantAttr[i][j]);
                    } else {
                        this.modifyAttr(percent, id, enchantAttr[i][j]);
                    }
                }
            }
        }
        // 圣物
        let curTreasure: TreasureItemVo = this.getCurTreasure();
        if (curTreasure) {
            let attrmap = {};
            let treasureStrenAttr = curTreasure.getStrengthAttr();
            for (let type in treasureStrenAttr) {
                attrmap = treasureStrenAttr[type];
                for (let attrkey in attrmap) {
                    if (Number(type) == (ValueType.fixed)) {
                        this.modifyAttr(fixed, attrkey, attrmap[attrkey]);
                    } else {
                        this.modifyAttr(percent, attrkey, attrmap[attrkey]);
                    }
                }
            }
            // loghgy("圣物强化加成属性:",treasureStrenAttr);
            let treasureStarAttr = curTreasure.getStarAttr();
            for (let starttype in treasureStarAttr) {
                attrmap = treasureStarAttr[starttype];
                for (let startattrkey in attrmap) {
                    if (Number(starttype) == (ValueType.fixed)) {
                        this.modifyAttr(fixed, startattrkey, attrmap[startattrkey]);
                    } else {
                        this.modifyAttr(percent, startattrkey, attrmap[startattrkey]);
                    }
                }
            }
            // loghgy("圣物升星加成属性:",treasureStarAttr);
        }
        // 皮肤
        if (this.tab_god.skin && this.tab_god.skin.length > 0) {
            for (let skinId of this.tab_god.skin) {
                if (App.hero.skinIds.indexOf(skinId) == -1) continue;
                let tbSkin = tb.TB_skin.getTbById(skinId);
                let attrObj = tbSkin.getAttr();
                for (let valType in attrObj) {
                    let attrmap = attrObj[valType];
                    for (let attrkey in attrmap) {
                        if (Number(valType) == ValueType.fixed) {
                            this.modifyAttr(fixed, attrkey, attrmap[attrkey]);
                        } else {
                            this.modifyAttr(percent, attrkey, attrmap[attrkey]);
                        }
                    }
                }
            }
        }

        // 固定值
        let tempRonghunAttr = this.countRonghunAttr(); //{1: 生命, 2:攻击, 3:防御, 4:速度}  //融魂属性
        // loghgy("融魂属性加成:",tempRonghunAttr);
        for (let key in tempRonghunAttr) {
            this.modifyAttr(fixed, key, tempRonghunAttr[key]);
        }
        let strenAttr = game.ArtifactModel.getInstance().getStrengthAttr();
        // loghgy("神器强化加成属性:",strenAttr);
        if (strenAttr) {
            for (let key in strenAttr) {
                this.modifyAttr(fixed, key, strenAttr[key]);
            }
        }
        let strengMasterAttr = this.getQianghuaDashi(this.countMasterLevel());
        // loghgy("强化大师加成属性:",strengMasterAttr);
        if (strengMasterAttr) {
            for (let key in strengMasterAttr) {
                this.modifyAttr(fixed, key, strengMasterAttr[key]);
            }
        }
        let jinglianMasterAttr = this.getJinglianDashi(this.refineMasterLevel());
        // loghgy("精炼加成属性:",jinglianMasterAttr);
        if (jinglianMasterAttr) {
            for (let key in jinglianMasterAttr) {
                this.modifyAttr(fixed, key, jinglianMasterAttr[key]);
            }
        }

        //解锁技能添加的属性
        let pavskillattr = this.getPavSkillAttr();
        this.mergePavSkillAttr(pavskillattr[0], fixed);
        this.mergePavSkillAttr(pavskillattr[1], percent);
        // logfight("被动技能累加的属性是:", pavskillattr);
        return [fixed, percent];
    }

    private mergePavSkillAttr(pavAttr, tag) {
        if (!isEmptyObject(pavAttr)) {
            //固定值
            for (var key in pavAttr) {
                this.modifyAttr(tag, key, pavAttr[key]);
            }
        }
    }

    private modifyAttr(tag, attrkey, attrval) {
        if (!tag.hasOwnProperty(attrkey)) {
            tag[attrkey] = 0;
        }
        tag[attrkey] += attrval;
    }

    /**强化大师属性 */
    public getQianghuaDashi(level: number): any {
        let suitObj: any;
        if (level > 0) {
            let suit: tb.TB_strength_suit = tb.TB_strength_suit.get_TB_strength_suitById(level);
            suitObj = suit.getAttr();
        }
        return suitObj;
    }

    /**精炼大师属性 */
    public getJinglianDashi(level: number): any {
        let suitAttr: any;
        if (level > 0) {
            let suit: tb.TB_refine_suit = tb.TB_refine_suit.get_TB_refine_suitById(level);
            suitAttr = suit.getAttr();
        }
        return suitAttr;
    }

    /**强化大师等级 */
    public countMasterLevel(): number {
        let allEquips = this.equipKeys;
        let minLevel = 0;
        if (allEquips.length >= game.EquipModel.EQUIP_COUNT) {
            minLevel = allEquips[0].strengthLv;
            for (let vo of allEquips) {
                if (vo.strengthLv < minLevel) {
                    minLevel = vo.strengthLv;
                }
            }
            let tbSuit = tb.TB_strength_suit.get_TB_strength_suitByLv(minLevel);
            minLevel = tbSuit ? tbSuit.ID : 0;
        }
        return minLevel;
    }

    /**精炼大师等级 */
    public refineMasterLevel(): number {
        let allEquips = this.equipKeys;
        let minLevel = 0;
        if (allEquips.length >= game.EquipModel.EQUIP_COUNT) {
            minLevel = allEquips[0].refineLv;
            for (let vo of allEquips) {
                if (vo.refineLv < minLevel) {
                    minLevel = vo.refineLv;
                }
            }
            let tbSuit = tb.TB_refine_suit.get_TB_refine_suitByLv(minLevel);
            minLevel = tbSuit ? tbSuit.ID : 0;
        }
        return minLevel;
    }

    /**获取英雄神力 */
    public getShenli(lineupType: number = iface.tb_prop.lineupTypeKey.attack): number {
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
    }

    /**获取融魂属性 */
    public countRonghunAttr(): Object {
        let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(this.fuseLevel);
        let fuseAttr: Object = {};
        for (let i = 1; i < 4; i++) {
            let lv = this.fuseAttrLevels[i];
            if (lv) {
                let pretab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(this.fuseLevel - 1);
                let preAttr = pretab ? pretab.getMaxAttr(i) : 0;
                let preLv = pretab ? pretab.getMaxLv(i) : 0;
                let value = preAttr + (lv - preLv) * fusiontab.getOnceAdd(i);
                value = value > fusiontab.getMaxAttr(i) ? fusiontab.getMaxAttr(i) : value;
                fuseAttr[i] = value;
            } else {
                fuseAttr[i] = 0;
            }
        }
        fuseAttr[Number(fusiontab.special_attr[0][0])] = Number(fusiontab.special_attr[0][1]);
        return fuseAttr;
    }

    /**是否达到最大融魂值 */
    public isRonghunMax(): boolean {
        let fusiontab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(this.fuseLevel);
        let nowAttr = this.countRonghunAttr();
        let flag = true;
        for (let i = 0; i < 3; i++) {
            if (fusiontab.attr_max[i][1] > nowAttr[i + 1]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    /** 装备返还 */
    public getEquipItems(): Array<string> {
        let arrItems: Array<string> = [];
        for (let obj of this.equipKeys) {
            arrItems.push(obj.uuid);
        }
        return arrItems;
    }

    /** 技能是否已激活 */
    public isActivitySkill(skillid: number): boolean {
        for (let ary of this.tab_god.skill) {
            if (ary[0] == skillid) {
                return this.degree >= ary[1];
            }
        }
        return false;
    }

    //根据当前星级修正真实技能id
    public getSkillList() {
        return getSkillList(this.tab_god.skill, this.degree, this.getStar());
    }

    // ========== 觉醒 ==========
    /** 获取当前可觉醒的最大等级:根据星级 */
    getCurMaxAwakenLv(): number {
        let tbCond = tb.TB_awaken_conditions.getTbById(this.starLevel);
        return tbCond.awake_section_max;
    }

    getModel(): number {
        return game.GodUtils.getGodModel(this.skinId, this.tab_god);
    }

    /** 获取紫色品质以上(包含紫色)的最高套装以及数量 
     * 套装包含2、4、6件装备组成，4件套餐大于2件套装，相同套装件数范围按品质
    */
    getMaxQualityAnNum(): number[] {
        let purpleNum = 0;
        let orangeNum = 0;
        let redNum = 0;
        for (let equipVo of this.equipKeys) {
            let quality = equipVo.tab_item.quality;
            if (quality == QualityConst.PURPLE) {
                purpleNum++;
            } else if (quality == QualityConst.ORANGE) {
                orangeNum++;
            } else if (quality == QualityConst.RED) {
                redNum++;
            }
        }
        if (redNum >= 2) {
            return [QualityConst.RED, redNum];
        } else if (orangeNum >= 2) {
            return [QualityConst.ORANGE, orangeNum];
        } else if (purpleNum >= 2) {
            return [QualityConst.PURPLE, purpleNum];
        } else {
            return [];
        }
    }

    /** 获取圣物 */
    getTreasureVo(uuid: string): TreasureItemVo {
        return this.treasureKeys.find((vo) => {
            return vo.uuid == uuid;
        });
    }
    /** 获取当前圣物 */
    getCurTreasure(): TreasureItemVo {
        return this.treasureKeys[0];
    }
}