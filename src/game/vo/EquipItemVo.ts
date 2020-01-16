
interface EquipSvo {
    templateId : number;
    slot : number;
    quality : number;
    strengthLv : number;
    refineLv : number;
    godId : any;
    gemInfo : any;
}

/**装备英雄id */
class EquipItemVo implements inface.IEquipData, inface.IItemData {
    public godId: any;
    /**-1不显示0强化/1精炼/2都显示 */
    public type: number
    /**唯一id */
    public uuid: string;
    /**槽位 */
    public slot: number;
    /**品质 */
    public quality: number;
    /**精炼id */
    public refineId: number;
    /**精炼等级 */
    public refineLv: number;
    /**精炼经验 */
    public refineExp: number;
    /**强化id */
    public strengthId: number;
    /**强化等级 */
    public strengthLv: number;
    /**装备id */
    public templateId: number;
    public bag: boolean = false;
    public show: boolean = false;
    public tab_item: tb.TB_item;
    public isFirst: boolean = false;
    public isAni: boolean = false;

    public indexid: number;
    public selectid: number;
    public selected: boolean;
    public sellView: boolean;
    public startAction: boolean = false;

    constructor(data: any) {
        this.updateData(data);
    }

    getExtParm(){
        return null;
    }

    public updateData(data: any):void {
        this.type = 0;
        this.slot = data.slot ? data.slot : 0;
        this.godId = data.godId ? data.godId : null;
        this.quality = data.quality ? data.quality : 1;
        this.refineLv = data.refineLv ? data.refineLv : 0;
        this.refineExp = data.refineExp ? data.refineExp : 0;
        this.strengthLv = data.strengthLv ? data.strengthLv : 0;
        this.templateId = data.templateId ? data.templateId : null;
        this.tab_item = tb.TB_item.get_TB_itemById(this.templateId) ? tb.TB_item.get_TB_itemById(this.templateId) : data;
        this.refineId = this.quality * 10000 + this.tab_item.defined[0] * 1000 + this.refineLv;
        this.strengthId = this.quality * 10000 + this.tab_item.defined[0] * 1000 + this.strengthLv;
    }

    getNum(): number {
        return this.strengthLv;
    }

    getStar(): number {
        return 0;
    }

    getShow(): boolean {
        return this.show;
    }

    firstFlag(): boolean {
        return this.isFirst;
    }

    isMoreThanSix(): boolean {
        return false;
    }

    getcurRefineExp(): number {
        return this.refineExp;
    }

    getConstNum(): number {
        return 0;
    }

    getStrengthLv(): number {
        return this.strengthLv;
    }

    getRefineLevel(): number {
        return this.refineLv;
    }

    isStartAction(): boolean {
        return this.startAction;
    }

    getQulity(): string {
        return SkinUtil.getBoxQulityIcon(this.tab_item.quality);
    }

    getIconUrl(): string {
        if (!this.tab_item) {
            return "";
        }
        return SkinUtil.getEquipIcon(this.tab_item.icon[0]);
    }

    showRace(): number {
        return this.tab_item.icon[2] ? this.tab_item.icon[2] : 0;
    }

    /** 是否穿戴在英雄身上 */
    public isExsitGod(): boolean {
        return this.godId && this.godId != "";
    }

    getGodName(): any {
        if (this.godId) {
            let godName = App.hero.getGodVoById(this.godId).getName();
            return godName ? godName : null;
        }
        return null;
    }

    /** 排序数值 品质>强化等级>精炼等级 数值越大表示越靠前 */
    getSortNum(): number {
        return 1000000 * this.quality + 100 * this.strengthLv + this.refineLv;
    }

    /**xxx装备中 */
    getWearGodName(): string {
        if (this.getGodName()) return LanMgr.getLan("",12085,this.getGodName());
        else return "";
    }


    /**是否精炼满级 */
    isTopRefineLv(): boolean {
        let maxLv = tb.TB_equip_set.get_TB_equip_setById(1).refine_maxlevel;
        return this.refineLv >= maxLv;
    }
    /**是否强化满级 */
    isTopStrengthLv(): boolean {
        let maxLv = tb.TB_equip_set.get_TB_equip_setById(1).strength_maxlevel;
        return this.strengthLv >= maxLv;
    }

    /**获得强化等级属性：固定值 */
    getStrengthAttr(strength: number = 0): any {
        let arrStrength = tb.TB_equip_strength.get_TB_equip_strengthById(this.strengthId + strength);
        return arrStrength ? arrStrength.getAttr() : {};
    }
    /** 获得精炼等级属性: 百分比 */
    getRefineAttr(lv:number=0): any {
        let arrRefine = tb.TB_equip_refine.get_TB_equip_refineById(this.refineId+lv);
        return arrRefine ? arrRefine.getAttr() : {};
    }
   
    /**
     * 属性字符串
     * @param type 0:精炼属性 1:强化属性 
     * @param Lv 当前+n级属性
     */
    getAttributeByValue(type: number , Lv: number=0): Array<string> {
        let arrAttstr = LanMgr.attrName;
        let obj : any = type == 0 ? this.getRefineAttr(Lv) : this.getStrengthAttr(Lv);
        let arrAttr: Array<string> = [];
        for (let i in obj) {
            let peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
            let str = type == 0 ? `${peoprety}+${Math.round(obj[i] * 10000)/100}%` : `${peoprety}+${obj[i]}`;
            arrAttr.push(str);;
        }
        return arrAttr;
    }

    /**n件套tb */
    getEquipAllSuitArray(): Array<tb.TB_equip_suit> {
        let tbSuitArray: Array<tb.TB_equip_suit> = [];
        if (this.quality >= QualityConst.PURPLE) {
            for (let i = EquipSuit.two; i <= EquipSuit.four; i += 1) {
                let suit = tb.TB_equip_suit.get_TB_equip_suitById(Number(this.quality.toString() + i.toString()));
                tbSuitArray.push(suit);
            }
        }
        return tbSuitArray;
    }

    /**装备强化n次所需材料 */
    strengthCost(num: number = 1): Object {
        let maxlv = game.EquipModel.getInstance().tbEquipSet.strength_maxlevel
        num = this.strengthLv + num > maxlv ? maxlv - this.strengthLv : num;
        let numCost = tb.TB_equip_strength.get_TB_equip_strengthById(this.strengthId + num).total_cost;
        let curCost = tb.TB_equip_strength.get_TB_equip_strengthById(this.strengthId).total_cost;
        let numObj = ary2map(numCost);
        let curObj = ary2map(curCost);
        for(let key in numObj) {
            if(!!curObj && !!curObj[key]) {
                numObj[key] -= curObj[key];
            }
        }
        return numObj;
    }

    /**装备精炼n级所需材料 */
    getRefineCost(num: number = 1): Object {
        let maxlv = game.EquipModel.getInstance().tbEquipSet.refine_maxlevel
        num = this.refineLv + num > maxlv ? maxlv - this.refineLv : num;
        let numCost = tb.TB_equip_refine.get_TB_equip_refineById(this.refineId + num).total_cost;
        let curCost = tb.TB_equip_refine.get_TB_equip_refineById(this.refineId).total_cost;
        let numObj = ary2map(numCost);
        let curObj = ary2map(curCost);
        for(let key in numObj) {
            if(!!curObj && !!curObj[key]) {
                numObj[key] -= curObj[key];
            }
        }
        return numObj;
    }

    /**现有材料能精炼几级 */
    getCanRefineNum(): number {
        let maxlv = game.EquipModel.getInstance().tbEquipSet.refine_maxlevel
        for(let i = 1 ;i <= maxlv; i++) {
            let cost = this.getRefineCost(i);
            for(let v in cost) {
                if(cost[v] > App.hero.getBagItemNum(v))
                return i - 1;
            }
        }
        return maxlv;
    }

    //是否碎片
    isChip(): boolean {
        return this.tab_item.icon[1] && this.tab_item.icon[1] == 1 ? true : false;
    }
    getChipSkin():string {
        return SkinUtil.chip_normal;
    }
}

/**装备宝石一键升级信息 */
interface IGemUpInfo {
    /**材料key:value形式 */
    cost: Object,
    /**各升几级 */
    gemLvs: Object
}
