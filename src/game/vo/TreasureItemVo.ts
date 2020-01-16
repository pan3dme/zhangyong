
interface ITreasureSvo {
    templateId : number;    // 道具ID
    godId ?: string;         // 穿戴神灵ID
    num : number;           // 叠加数量
    quality ?: number;       // 品质
    slot ?: number;          // 类型
    strengthLv ?: number;    // 强化等级
    starLv ?: number;        //　星级
}

/** 圣物vo */
class TreasureItemVo implements inface.IItemData {

    /**唯一id */
    public uuid: string;
    /**道具id */
    public templateId: number;
    public godId: any;
    public num : number;           // 叠加数量
    /**品质 */
    public quality: number;
    /** 编号 */
    public slot : number;
    /**升星等级 */
    public starLv: number;
    /**强化等级 */
    public strengthLv: number;

    public tbItem: tb.TB_item;
    public show: boolean = false;
    public isFirst: boolean = false;
    public startAction: boolean = false;
    public clientUrl : string;
    public type : number = 0;

    public sortNum : number;    // 排序属性
    constructor(data: any) {
        this.templateId = data.templateId ? data.templateId : null;
        this.tbItem = tb.TB_item.get_TB_itemById(this.templateId) || data;
        if(!this.tbItem){
            logerror("不存在该圣物：",this.templateId);
        }
        this.slot = data.slot || this.tbItem.defined[0];
        this.godId = data.godId || null;
        this.quality = data.quality || this.tbItem.quality || 1;
        this.starLv = data.starLv || 0;
        this.strengthLv = data.strengthLv || 0;
        this.num = data.num || 0;
        // 默认值
        this.show = false;
        this.isFirst = false;
        this.startAction = false;
        this.clientUrl = null;
        this.type = 0;
    }

    getExtParm(){
        return null;
    }
    /** 获取当前升星配置 */
    public getTbStarup():tb.TB_treasure_star {
        if(this.quality <= tb.TB_treasure_set.getSet().star_quality) return null;
        return tb.TB_treasure_star.getTbItem(this.quality,this.slot,this.starLv);;
    }
    /** 获取当前强化配置 */
    public getTbStrength():tb.TB_treasure{
        return tb.TB_treasure.getTbItem(this.quality,this.slot,this.strengthLv);   
    }
    /** 获取强化属性配置 格式二维数组：[0:[{属性id:值}...],1:[{属性id:值}...]] 索引0表示固定值的加成,1表示百分比的加成 */
    public getStrengthAttr():Array<Object>{
        return game.TreasureUtil.getTbStrengthAttr(this.quality,this.slot,this.strengthLv);
    }
    /** 获取升星属性配置 格式二维数组：[0:[{属性id:值}...],1:[{属性id:值}...]] 索引0表示固定值的加成,1表示百分比的加成 */
    public getStarAttr():Array<Object>{
        return game.TreasureUtil.getTbStarAttr(this.quality,this.slot,this.starLv);
    }

    /**是否星级满级 */
    isTopStarLv(): boolean {
        let nextTb = tb.TB_treasure_star.getTbItem(this.quality,this.slot,this.starLv+1);
        return nextTb ? false : true;
    }
    /**是否强化满级 */
    isTopStrengthLv(): boolean {
        let nextTb = tb.TB_treasure.getTbItem(this.quality,this.slot,this.strengthLv+1);
        return nextTb ? false : true;
    }
    /** 是否可重生:养成过的紫色品质以上且没被穿戴的圣物 */
    isCanRebirth():boolean {
        return !this.isExsitGod() && this.quality > QualityConst.PURPLE && (this.strengthLv > 0 || this.starLv > 0);
    }
    /** 是否禁止升星：紫色以下不能升星 */
    isForbitStarup():boolean {
        return this.quality <= tb.TB_treasure_set.getSet().star_quality;
    }




    getNum(): number {
        return this.num;
    }
    getStar(): number {
        return this.starLv;
    }
    getShow(): boolean {
        return this.show;
    }
    firstFlag(): boolean {
        return this.isFirst;
    }
    isMoreThanSix(): boolean {
        return this.starLv > 5;
    }
    getConstNum(): number {
        return 0;
    }
    getStrengthLv(): number {
        return this.strengthLv;
    }
    getRefineLevel(): number {
        return this.starLv;
    }
    isStartAction(): boolean {
        return this.startAction;
    }
    getQulity(): string {
        return SkinUtil.getBoxQulityIcon(this.quality);
    }
    getIconUrl(): string {
        if(this.clientUrl) return this.clientUrl;
        return this.tbItem ? SkinUtil.getItemIcon(this.tbItem) : "";
    }
    showRace(): number {
        return 0;
    }
    /** 是否穿戴在英雄身上 */
    public isExsitGod(): boolean {
        return this.godId && this.godId != "";
    }
    //是否碎片
    isChip(): boolean {
        return this.tbItem && this.tbItem.icon && this.tbItem.icon[1] == 1 ? true : false;
    }
    getChipSkin():string {
        return SkinUtil.chip_normal;
    }
}


