

module common {
    export enum RankSvrType {
        common = 0,         // 本服
        matchCrossSvr = 1,  // 匹配跨服
    }
    /** 通用排行数据vo */
    export class RankVo {

        playerId : string;
        name : string;
        head : number;
        headFrame : number;
        level : number;
        force : number;
        value : number;         // 不同排行不同意思
        rank : number;
        guildName : string;
        private _headVo : inface.IUserHeadData;

        public rankSvrType : number;   // 服务器类型
        constructor(){
        }

        setArrayTypeGroupCopyFloor(ary:any[],rank:number=0):void {
            this.playerId = ary[0];
            this.value = ary[1];
            this.force = ary[2];
            this.name = ary[3];
            this.head = ary[4];
            this.level = ary[5];
            this.headFrame = ary[6];
            this.rank = rank;
        }

        setArray(ary:any[],rank:number=0):void {
            this.playerId = ary[0];
            this.value = ary[1];
            this.name = ary[2];
            this.head = ary[3];
            this.level = ary[4];
            this.force = ary[5];
            this.headFrame = ary[6];
            this.rank = rank;
        }
        
        setSvo(svo:IRankSVo):void {
            this.playerId = svo.playerId;
            this.name = svo.name;
            this.head = svo.head;
            this.headFrame = svo.headFrame;
            this.level = svo.level;
            this.force = svo.force;
            this.value = svo.value;
            this.rank = svo.rank;
            this.guildName = svo.guildName;
        }

        getHeadVo():inface.IUserHeadData{
            if(!this._headVo){
                this._headVo = new UserHeadVo(this.head,this.level,this.headFrame);
            }
            return this._headVo;
        }
        /** 获取排名图片 */
        getRankUrl():string {
            return SkinUtil.getRankingSkin(this.rank-1);
        }

        // --- 中间值 ---
        getMidDesc():any{
            return LanMgr.getLan("",12082);
        }
        getMid():any{
            return this.force;
        }
        isShowMid():boolean {
            return this.getMid() ? true : false;
        }

        // --- 底部值 ---
        getBottomDesc():any {
            return LanMgr.getLan("",12083);
        }
        getBottom():any {
            return this.guildName ? this.guildName : LanMgr.getLan("",12084);
        }
        isShowBottom():boolean {
            return this.guildName ? true : false;
        }

        // --- 排名值 ---
        getValue():any{
            return this.value;
        }
        getValueDesc():any{
            return LanMgr.getLan("",12081);
        }

    }

    export interface IRankSVo {
		playerId : string;
		name : string;
		head : number;
		headFrame : number;
		level : number;
        force : number;
        value : number;         // 不同排行不同意思
        rank : number;
        guildName : string;
	}
}