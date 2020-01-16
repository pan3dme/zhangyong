

module game {

    export class MatchPlayerVo extends BaseFightVo implements common.IPlayerLinuepInfo,IArenaReportVo{
        
        public playerId : string;
        public name : string;
        public sex : number;
        public level : number;
        public force : number;
        public targetForce : number;
        public score : number;
        public head:any;
        public headFrame:any;
        public guildName : string;
        public headVo : UserHeadVo;
        public index : number;

        public isWin : boolean;
        constructor(svo?:IPlayerSvo,index?:number){
            super();
            this.headVo = new UserHeadVo(0,0);
            this.setSvo(svo);
            this.index = index;
        }
        /** 设置基本信息 */
        setSvo(svo:IPlayerSvo):void {
            // 刷新玩家新需清除阵容数据
            if(this.playerId != svo.playerId){
                super.clearLineupInfo();
            }
            this.playerId = svo.playerId;
            this.name = svo.name;
            this.sex = svo.sex;
            this.level = svo.level;
            this.force = svo.forceNum;
            this.score = svo.score;
            this.head = svo.head;
            this.headFrame = svo.headFrame;
            this.guildName = svo.guildName;
            this.headVo.setLevel(svo.level);
            this.headVo.setHead(svo.head);
            this.headVo.setHeadFrame(svo.headFrame);
            if(svo.defInfo){
                super.setLineupInfo(svo.defInfo);
            }
        }
        /** 设置详细信息 */
        setDetailData(defInfo:any[]):void {
            super.setLineupInfo(defInfo);
        }
        
        /** 是否机器人 */
        isRobot():boolean {
            return !this.playerId || this.playerId == "";
        }

        isRecord():boolean {
            return false;
        }

        getForce():number{
            //非回放时，目标值为自己战力
			return App.hero.force;
		}

        getTagForce(){
            //非回放时，目标值为对方战力
			return this.force;
		}
    }

    export interface IPlayerSvo {
        playerId : string;      // 机器人没有playerId
        name : string;
        guildName : string;
        sex : number;
        head:any;
        headFrame:number;
        level : number;
        forceNum : number;
        score : number;
        defInfo : any[];        // 机器人会下发阵容新
    }

    export interface IArenaReportVo {
        name : string;
        level :number;
        isWin : boolean;
        head:any;
        headFrame:any;
        isRecord():boolean;     // 是否记录
        getForce():number;
        getTagForce():number;

    }
}