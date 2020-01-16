/*
* name;
*/
class UserHeadVo implements inface.IUserHeadData {
    private _level: number;
    private _head: any;
    private _headFrame : number;
    private _guild: boolean;
    constructor(head: any, level: number,frame:number=0, guild?:boolean ) {
        this._head = head;
        this._level = level;
        this._headFrame = frame || 0;
        this._guild = guild;
    }

    public getStyle():number{
        return 0;
    }

    public getLevel(): number {
        return this._level ? this._level : 1;
    }

    public getQulity():string{
        return "";
    }

    public getIconUrl(): string {
        if(this._guild) return SkinUtil.getGuildHeadIconById(this._head);
        return SkinUtil.getHeroIcon(this._head);
    }
    /** 获取特殊头像框  */
    public getFrame():string {
        if(this._guild) return null;
        return this._headFrame > 0 ? SkinUtil.getHeadFrame(this._headFrame) : null;
    }
    /** 获取等级框 */
    public getImgLv():string {
        if(this._guild) return SkinUtil.default_lv_frame;
        return this._headFrame > 0 ? SkinUtil.getLvFrame(this._headFrame) : SkinUtil.default_lv_frame;
    }

    public setLevel(val:number):void {
        this._level = val;
    }
    public setHead(val:number):void {
        this._head = val;
    }
    public setHeadFrame(val:number):void {
        this._headFrame = val;
    }
}