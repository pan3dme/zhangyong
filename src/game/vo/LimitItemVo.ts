/**
 * 限时开启道具对象
 */
class LimitItemVo extends ItemVo{
    public limitTime:number;
    public uuid:number;

    constructor(uuid:number,limitTime:number,id: number, count: number, type?: number, star?: number, extral?: any, first?: boolean) {
        super(id,count,type,star,extral,first);
        this.limitTime = limitTime;
        this.uuid = uuid;
    }
}