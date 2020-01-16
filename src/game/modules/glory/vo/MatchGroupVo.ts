module game {

    /** 单组pk -- 每组对手信息 */
    export class MatchGroupVo {

        public svo : IGloryMatchGroupSVo;
        public lUser : GloryMatchPlayerVo;
        public rUser : GloryMatchPlayerVo;

        public tbHonor : tb.TB_honour;
        public isMyMatch : boolean = false; // 是否是我的比赛数据
        public isLastMatch : boolean = false;   // 是否是上届回顾
        public isCur
        public sortNum : number;
        constructor(){
            this.lUser = new GloryMatchPlayerVo();
            this.rUser = new GloryMatchPlayerVo();
        }
        /** 设置对战数据 */
        setGroupInfo(info:IGloryMatchGroupSVo):void {
            if(this.svo){
                for(let key in info){
                    this.svo[key] = info[key];
                }
            }else{
                this.svo = info;
            }
            this.lUser.setData(info.leftId,info.leftName,info.leftForce,info.leftHead,info.leftLevel,info.leftHeadFrame);
            this.rUser.setData(info.rightId,info.rightName,info.rightForce,info.rightHead,info.rightLevel,info.rightHeadFrame);
            if(!this.tbHonor){
                this.tbHonor = tb.TB_honour.getItemById(info.stage);
            }
            this.sortNum =  - info.session * 1000 - info.stage * 100 - info.round;
        }
        
        /** 获取组名 */
        getGroupName():string {
            if(this.isMyMatch){
                let isCurSession = this.svo.session == GloryModel.getInstance().season;
                return `${this.tbHonor.name}（${isCurSession? LanMgr.getLan("",12387):LanMgr.getLan("",12388)}）`;
            }
            let group = this.isHaixuan() ? this.svo.groupId : (this.svo.pos+1);
            return LanMgr.getLan("",12389,group);
        }

        /** 是否有结果：输赢 */
        public isHasResult():boolean {
            return this.svo.winner != 0;
        }
        /** 是否结束：时间 */
        public isEndGroup():boolean {
            return this.isLastMatch || this.isMyMatch || App.serverTimeSecond >= GloryUtil.getGroupEndTime(this.tbHonor.ID);
        }
        /** 是否轮空 */
        public isBye():boolean {
            return !this.svo.leftId || !this.svo.rightId;
        }
        /** 是否在当前阶段中 */
        public isInCurGroup():boolean {
            if(this.isLastMatch || this.isMyMatch) return false;
            let id = this.tbHonor.ID;
            return App.serverTimeSecond >= GloryUtil.getGroupStartTime(id) && App.serverTimeSecond < GloryUtil.getGroupEndTime(id);
        }
        
        /** 是否在押注时间内(前后5分钟不能投注) -- 针对当前阶段比赛 */
        isInBetTime():boolean {
            return GloryUtil.isInBetTime(this.tbHonor.ID);
        }
        /** 是否已押注 */
        isHasBet():boolean{
            return this.svo.betId != 0;
        }
        /** 是否是海选赛 */
        isHaixuan():boolean {
            return GloryUtil.isHaixuan(this.tbHonor.ID);
        }
        /** 有结果前提下，是否左边赢 */
        isLeftWin():boolean {
            return this.svo.winner == 1;
        }

        getSelfCamp():number{
            let camp = battle.BatteConsts.BATTLE_CAMPATK;
            if(this.rUser.playerId == App.hero.playerId){
                camp = battle.BatteConsts.BATTLE_CAMPDEF;
            }
            return camp;
        }
    }

    export interface IGloryMatchGroupSVo {
        recordId : string;      // 记录id
        session : number;       // 赛季
        stage : number;         // 阶段
        pos : number;       // 正式赛的第几组从0开始
        winner : number;    // 胜利者 0未结算 1左边赢 2右边赢
        betId : number;     // 押注 0未押注 1左边押注 2右边押注
        round : number;     // 海选赛第几轮（海选赛人多）
        groupId : number;   // 海选赛第几组
        
        leftId : string;
        leftName : string;
        leftForce : number;
        leftHead : string;
        leftHeadFrame : number;
        leftLevel : number;
        
        rightId : string;
        rightName : string;
        rightForce : number;
        rightHead : string;
        rightHeadFrame : number;
        rightLevel : number;
    }

}