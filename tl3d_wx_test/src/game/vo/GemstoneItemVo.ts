
interface IGemstoneSvo {
    templateId : number;     // 道具ID
    num : number;            // 叠加数量
    godId ?: any;         // 穿戴神灵ID

    quality ?: number;       // 品质
}

/** 宝石vo */
class GemstoneItemVo implements inface.IItemData {

    /**唯一id */
    public uuid: string;
    /**道具id */
    public templateId: number;
    /** 穿戴的神灵uuid */
    public godId: any;     
    /** 叠加数量 */ 
    public num : number;
    /**品质 */
    public quality: number;
    /**等级 */
    public gemLv: number;
    /** 宝石类型 type被占用*/
    public gemType : number;
    /** 数量 -- 客户端自定义字段 */
    public clientNum : number;

    public tbItem: tb.TB_item;
    public tbGem : tb.TB_gemstone_new;
    public show: boolean = false;       // 显示tips
    public isFirst: boolean = false;
    public startAction: boolean = false;
    public clientUrl : string;

    public sortNum : number;    // 排序属性
    constructor() {
        // 默认值
        this.show = false;
        this.isFirst = false;
        this.startAction = false;
        this.clientUrl = null;
    }

    getExtParm(){
        return null;
    }
    /** 设置数据 */
    public setData(data: any):void {
        this.templateId = data.templateId ? data.templateId : null;
        this.tbItem = tb.TB_item.get_TB_itemById(this.templateId) || data;
        if(!this.tbItem){
            logerror("道具表不存在该宝石：",this.templateId);
        }
        this.tbItem.show = false;
        this.tbItem.showNum = false;
        this.tbGem = tb.TB_gemstone_new.getTBOneById(this.tbItem.defined[0]);
        if(!this.tbGem){
            logerror("宝石等级属性表不存在该宝石：",this.tbItem.defined[0]);
        }
        this.gemType = this.tbGem.getType();
        this.quality = data.quality || this.tbItem.quality || 1;
        this.gemLv = this.tbGem.getLevel();
        this.num = data.num || 0;
        this.godId = data.godId || null;
    }

    getNum(): number {
        return this.num;
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
    getConstNum(): number {
        return 0;
    }
    getStrengthLv(): number {
        return this.gemLv;
    }
    getRefineLevel(): number {
        return 0;
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
    /** 是否镶嵌在装备身上 */
    public isExsitGod(): boolean {
        return this.godId && this.godId != "";
    }
    //是否碎片
    isChip(): boolean {
        return this.tbItem ? this.tbItem.isChip() : false;
    }
    getChipSkin():string {
        return SkinUtil.chip_normal;
    }
}