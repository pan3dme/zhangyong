

module game {

    export class GodDmInviteVo {

        public svo : IInviteSVo;
        constructor() {
        }

        setSvo(svo:IInviteSVo):void {
            this.svo = svo;
        }
        /** 是否已邀请 */
        isInvite():boolean {
            return this.svo.inviteTime >= App.serverTimeSecond;
        }
    }

    export interface IInviteSVo {
        playerId : string;  
        head: number;  
        headFrame: number;  
        level: number;  
        name: string;       
        force: number;              // 玩家战斗力
        guildName: string;          // 玩家公会名字
        inviteTime : number;        // 邀请时间戳（这个时间大于当前时间说明已邀请）
    }


}