/*
* name;
*/
class GuildHeadVo implements inface.IUserHeadData {
    private _level: number;
    private _head: number;
    constructor(head: number, level: number, ) {
        this._head = head;
        this._level = level;
    }

    public getStyle():number{
        return 1;
    }

    public getLevel(): number {
        return this._level ? this._level : 1;
    }

    public getQulity():string{
        return "";
    }

    public getFrame():string {
        return null;
    }
    /** 获取等级框 */
    public getImgLv():string {
        return SkinUtil.default_lv_frame;
    }

    public getIconUrl(): string {
        return SkinUtil.getGuildHeadIconById(this._head);
    }
}