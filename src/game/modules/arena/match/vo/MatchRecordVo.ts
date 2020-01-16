

module game {

    export interface IMatchRecordSVo {
        playerId :string;
        name :string;
        sex :number;
        level :number;
        head:any;
        headFrame:any;
        battleTime :number;     // 发生战斗的时间
        chgScore :number;       // 积分变化
        battleType :number;     // 战斗记录类型(1:进攻 2：防守)
        isWin :boolean;          // 战斗结果
        force :number;          
        targetForce :number;          
    }

    export class MatchRecordVo implements IArenaRecord,IArenaReportVo{

        playerId :string;
        name :string;
        level :number;
        head:any;
        headFrame:any;
        battleTime :number;     // 发生战斗的时间
        chgScore :number;       // 积分变化
        battleType :number;     // 战斗记录类型(1:进攻 2：防守)
        isWin :boolean;          // 战斗结果
        index : number;
        force : number;
        targetForce : number;
        constructor(svo:IMatchRecordSVo,index:number){
            this.playerId == svo.playerId;
            this.name = svo.name;
            this.level = svo.level;
            this.head = svo.head;
            this.headFrame = svo.headFrame;
            this.battleTime = svo.battleTime;
            this.chgScore = svo.chgScore;
            this.battleType = svo.battleType;
            this.isWin = svo.isWin;
            this.index = index;
            this.force = svo.force;
            this.targetForce = svo.targetForce;
        }

        /**多久前挑战 */
		beforeTime(): string {
			return logindifference(this.battleTime, App.serverTimeSecond);
		}

        /**是否是挑战 ..防守 */
		isChallenge(): boolean {
			return this.battleType == 1;
		}
        /** 获取变化的值 */
        getChgValue():number {
            return this.chgScore;
        }
        getChgValuePrev():string {
			return LanMgr.getLan("",12543);
		}

        getChangeTypeSkin():string {
            return "";
        }
        /** 是否未改变 */
        isNotChange():boolean {
            return false;
        }

        /**是否是机器人 */
		isNpc(): boolean {
			return false;
		}

        getEvent():tl3d.BaseEvent{
            return new ArenaEvent(ArenaEvent.MATCH_PLAYBACK);
        }

        isRecord():boolean {
            return true;
        }

        getForce():number{
			return this.force;
		}

        getTagForce(){
			return this.targetForce;
		}
    }
}