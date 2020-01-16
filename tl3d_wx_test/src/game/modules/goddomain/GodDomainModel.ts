

module game {

    export class GodDomainModel {

        constructor() {

        }
        private static _instance: GodDomainModel;
        public static getInstance(): GodDomainModel {
            if (!this._instance) {
                this._instance = new GodDomainModel();
            }
            return this._instance;
        }

        public myTeam : GodDmMyTeamVo;
        public doubleTimeStr : string;
        initModel():void {
            this.myTeam = new GodDmMyTeamVo();

            this.doubleTimeStr = "";
            let time = tb.TB_fight_goddomain_set.getSet().double_time;
            for(let i = 0 ; i < time.length ; i++){
                let ary : number[] = time[i];
                this.doubleTimeStr += `${ary[0]}:00-${ary[1]}:00`;
                if(i != time.length - 1){
                    this.doubleTimeStr += "     ";
                }
            }
        }

        public groupId : string;    // 队伍id
        public score : number = 0;  // 神域积分
        public myRank : number = 0;
        public oneKeyInviteCd : number = 0; // 一键邀请cd
        public matchTime : number = 0;      // 自动匹配时间
        public updateTeamInfo(myGroup:any,memberList:any[]):void {
            this.groupId = myGroup['groupId'];
            if(myGroup.hasOwnProperty('godDmScore')){
                this.score = myGroup['godDmScore'];
            }
            if(myGroup.hasOwnProperty('myRank')){
                this.myRank = myGroup['myRank'];
            }
            if(myGroup.hasOwnProperty('autoJoin')){
                this.myTeam.autoJoin = myGroup['autoJoin'];
            }
            if(myGroup.hasOwnProperty('rewardAdd')){
                this.myTeam.rewardAdd = myGroup['rewardAdd'];
            }
            if(myGroup.hasOwnProperty('regTime')){
                this.myTeam.regTime = myGroup['regTime'];
            }
            this.myTeam.updateData(memberList?memberList:[]);
        }

        public resetGroupId(){
            this.groupId = ""
        }

        // ============ 队伍列表 ============
        /** 队伍列表 */
        private _teamList : GodDmTeamListVo[];
        setTeamList(list:any[]):void {
            if(this._teamList){
                for(let team of this._teamList){
                    Laya.Pool.recover(PoolConst.TeamListVo,team);
                }
            }
            this._teamList = [];
            for(let i = 0 ; i < list.length ; i++){
                let team = Laya.Pool.getItemByClass(PoolConst.TeamListVo,GodDmTeamListVo) as GodDmTeamListVo;
                team.setSvo(list[i]);
                this._teamList.push(team);
            }
        }
        getTeamList():GodDmTeamListVo[]{
            return this._teamList ? this._teamList : [];
        }
        // ============ 好友列表 ============
        private _inviteList : GodDmInviteVo[];
        setInviteList(list:any[]):void {
            if(this._inviteList){
                for(let team of this._inviteList){
                    Laya.Pool.recover(PoolConst.InviteInfoVo,team);
                }
            }
            this._inviteList = [];
            for(let i = 0 ; i < list.length ; i++){
                let team = Laya.Pool.getItemByClass(PoolConst.InviteInfoVo,GodDmInviteVo) as GodDmInviteVo;
                team.setSvo(list[i]);
                this._inviteList.push(team);
            }
        }
        getInviteList():GodDmInviteVo[]{
            return this._inviteList ? this._inviteList : [];
        }

        /** 是否有队伍 */
        public hasTeam():boolean {
            return this.groupId && this.groupId != "";
        }
        /** 是否在双倍时间内 */
        isInDoubleTime():boolean {
            let date = new Date(App.serverTime);
            let hour = date.getHours();
            let time = tb.TB_fight_goddomain_set.getSet().double_time;
            return time.some((ary:number[])=>{
                return hour >= ary[0] && hour < ary[1];
            });
        }

        /** 获取购买次数花费的钻石数量 */
        public getBuyCost():number {
            let set = tb.TB_fight_goddomain_set.getSet();
            let costAry = set.buy_cost;
            let count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGodDmRewardNum);
            if(count >= costAry.length){
                return costAry[costAry.length-1];
            }else{
                return costAry[count];
            }
        }

        /** 可挑战红点 */
        challengeRp():boolean{
            if(!this.isOpen()) return false;
            let isDouble = this.isInDoubleTime();
            let isEend = false;
            if(!isDouble){
                let date = new Date(App.serverTime);
                let hour = date.getHours();
                let time = tb.TB_fight_goddomain_set.getSet().double_time;
                isEend = time.every((ary:number[])=>{
                    return hour >= ary[0] && hour >= ary[1];
                });
            }
            return this.isOpen() && (isDouble || isEend) && App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum) > 0;
        }
        /** 是否开启 */
        isOpen():boolean {
            return App.IsSysOpen(ModuleConst.GOD_DOMAIN);
        }
    }
}