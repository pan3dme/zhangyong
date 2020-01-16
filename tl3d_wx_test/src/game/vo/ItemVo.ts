

/** 道具 */
class ItemVo implements inface.IItemData {
    public static NULL = new ItemVo(0, 0);
    public id: number;
    public extral: any;
    public star: number
    public type: number;
    public count: number;
    public show: boolean = true;
    public bag: boolean = false;
    public isFirst: boolean = false;
    public selected: boolean = false;
    public startAction: boolean = false;
    public using: Array<number> = new Array;
    public selectid: number;
    public indexid: number;
    public door: boolean = false;
    public eat: boolean = false;
    public hideSuipian: boolean = false;
    public showStar:boolean = true;
    public quality: number = 0;
    public isDisabled: Object = {};
    // 消耗
    public constNum : number = 0;
    /** 数量是否取自背包 */
    public countFromBag : boolean = false;
    /**万能卡品质 */
    public cardQuailty:number;
    /**展示光效 */
    public isShowEff:boolean = false;
    public clientUrl : string;
    public lvStr : string;
    public extPram : any;

    constructor(id: number, count: number, type?: number, star?: number, extral?: any, first?: boolean) {
        if (id == 0) {
            return;
        }
        this.id = id;
        this.count = count;
        this.extral = extral;
        this.isFirst = first;
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        if(!item){
            logerror('道具不存在：'+this.id);
            return;
        }
        this.using = item ? item.using_effect : [];
        this.type = type || item.type;
    }

    getShow(): boolean {
        return this.show;
    }

    getExtParm(){
        return this.extPram;
    }

    firstFlag(): boolean {
        return this.isFirst;
    }

    getNum(): number {
        return  this.countFromBag ? App.hero.getBagItemNum(this.id) : this.count;
    }

    isInLinuep():boolean{
        return false;
    }

    isStartAction(): boolean {
        return this.startAction;
    }

    isMoreThanSix(): boolean {
        return this.getStar() >= 6;
    }

    getQulity(): string {
        let qulity = 1;
        if (this.type == iface.tb_prop.itemTypeKey.god){
            qulity = this.star;
            if (qulity > 6) {
                qulity = 6;
            }else{
                qulity = this.quality != 0 ? this.quality : GameUtil.getItemQulityByID(this.id);
            }
        }else{
            qulity = this.quality != 0 ? this.quality : GameUtil.getItemQulityByID(this.id);
        }
         
        return SkinUtil.getBoxQulityIcon(qulity);
    }

    getIconUrl(): string {
        if(this.clientUrl) return this.clientUrl;
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        return item ? SkinUtil.getItemIcon(item) : "";
    }

    getName(): string {
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        return item ? item.name : "";
    }

    //消耗数量
    getConstNum(): number {
        return this.constNum;
    }

    //是否碎片
    isChip(): boolean {
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        if(this.hideSuipian)    
            return false;
        else
            return item && item.isChip();
    }
    getChipSkin():string {
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        return item ? item.getChipSkin() : "";
    }

    showRace(): number {
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        return item && item.icon[2] ? item.icon[2] : 0;
    }

    getStar(): number {
        if(this.star > 0) return this.star;
        let item: tb.TB_item = tb.TB_item.get_TB_itemById(this.id);
        return item && item.icon[3] && this.showStar ? item.icon[3] : 0;
    }
    getLvStr():string {
        return this.lvStr;
    }

    //颜色
    public static ITEM_QUALITY_COLORS:string[] = [
        "",
        "#ffffff","#319c28","#0000ff","#ca1fe2","#de8a0b","#ff0000"
    ];
}