module game {

    export class GloryMatchPlayerVo extends BaseFightVo implements common.IPlayerLinuepInfo{
        public rankPos : number;    // 玩家排名位置并不是ui位置
        public playerId : string;
        public name : string;
        public force : number;
        public head : any;
        public headFrame : number;
        public sex : number;
        public level : number;
        public guildName : string;

        // 后端协议使用，前端勿用
        public stage : number;    
        public pos : number;

        public headVo : UserHeadVo;
        public type : number;
        public isLastMatch : boolean;

        constructor(){
            super();
            this.type = common.LinuepType.glory;
        }

        /** 设置数据 */
        setData(id:string,name:string,force:number,head:string,level:number,headFrame:number):void {
            this.playerId = id;
            this.name = name;
            this.force = force;
            this.head = head;
            this.level = level;
            this.headFrame = headFrame;
            this.headVo = new UserHeadVo(head,level,headFrame);
        }

        setSvo(svo:IGloryMatchPlayerSVo):void {
            for(let key in svo){
                this[key] = svo[key];
            }
            this.headVo = new UserHeadVo(this.head,this.level,this.headFrame);
        }

        /** 设置详细信息 */
        setDetailInfo(guildName:string,lineupInfo:any):void {
            this.guildName = guildName;
            super.setLineupInfo(lineupInfo);
        }

    }

    export interface IGloryMatchPlayerSVo {
        name : string;
        force : number;
        head : any;
        headFrame : number;
        sex : number;
        level : number;
        stage : number;     // 玩家最新信息的阶段，后端协议使用
        pos : number;       // 玩家最新信息的位置，后端协议使用
    }
}