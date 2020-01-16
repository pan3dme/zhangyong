

module game {

    export class GuildFightTeamVo {

        public teamSvo : IGuildFightTeamSvo;
        private _teamList : GuildFightMemberVo[];
        public isMyTeam : boolean;

        public headVo : GuildHeadVo;
		constructor(isMyTeam:boolean) {
            this.isMyTeam = isMyTeam;
            this._teamList = [];
		}
        /** 设置队伍信息 */
        setTeamInfo(targetInfo:IGuildFightTeamSvo):void {
            if(!targetInfo){
                this.teamSvo = targetInfo;
                this._teamList.length = 0;
                this.headVo = null;
                return;
            }
            if(this.teamSvo){
                for(let key in targetInfo){
                    this.teamSvo[key] = targetInfo[key];
                }
                for(let pid in targetInfo.memberInfo){
                    let memberVo = this.getMember(pid);
                    if(memberVo){
                        memberVo.setServerInfo(targetInfo.memberInfo[pid]);
                    }
                }
            }else{
                this.teamSvo = targetInfo;
                this._teamList.length = 0;
                for(let pid in targetInfo.memberInfo){
                    let memberVo = new GuildFightMemberVo(this.isMyTeam);
                    memberVo.setServerInfo(targetInfo.memberInfo[pid]);
                    memberVo.svo.playerId = pid;
                    this._teamList.push(memberVo);
                }
                this.headVo = new GuildHeadVo(targetInfo.guildHead,targetInfo.guildLevel);
            }
            this._teamList.sort((a,b)=>{
                return b.sortNum - a.sortNum;
            });
        }
        
        getTeamList():GuildFightMemberVo[]{
            return this._teamList;
        }
        /** 获取成员 */
        getMember(playerId:string):GuildFightMemberVo{
            return this._teamList.find((vo)=>{
                return vo.svo.playerId == playerId;
            });
        }
        
    }

    export interface IGuildFightTeamSvo {
        guildId : number;
        guildHead : number;
        guildLevel : number;
        guildName : string;
        dailyScore : number;        // 每日积分
        totalScore : number;        // 总积分
        totalForce : number;        // 总战斗力
        guildGrade : number;        // 公会段位
        memberInfo : IFightMemberSvo[];     // 成员信息
    }
    
    export interface IMyInfo {
        playerId : string;
        dailyScore : number;        // 每日积分
        totalScore : number;        // 总积分
        totalForce : number;        // 总战斗力
        guildGrade : number;        // 公会段位
        atkCount : number;      // 玩家剩余攻击次数
        integral : number;      // 玩家分值
    }

    export interface IFightMemberSvo {
        playerId : string;
        head : number;
        headFrame : number;
        level : number;
        name : string;
        score : number;
        force : number;
        atkCount : number;      // 玩家剩余攻击次数
        lifeNum : number;       // 玩家剩余生命次数
        integral : number;      // 玩家分值
        lineupInfo : any[];     // 玩家布阵信息
        hpInfo : any;           // 玩家剩余生命信息{英雄ID:生命值}
    }
    
}