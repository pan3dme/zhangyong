

module game {

    export class GodDmTeamListVo {

        public svo : ITeamListVo;
        constructor() {
        }

        setSvo(svo:ITeamListVo):void {
            this.svo = svo;
        }
    }

    export interface ITeamListVo {
        groupId : string;   // 队伍ID
        memberNum: number;  // 队伍人数      
        name: string;       // 队长名字
        force: number;      // 平均战斗力
        guildName: string;  // 队长公会名字
        head : number;
        headFrame : number;
        level : number;
    }


}