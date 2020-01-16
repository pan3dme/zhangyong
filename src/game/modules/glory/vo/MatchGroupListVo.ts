module game {

    /** 阶段数据 -- 多组pk */
    export class MatchGroupListVo {

        private _matchList: GloryMatchPlayerVo[] = [];
        public winPos : any = {};   // 胜利数据
        public betInfo : number[] = [];   // 押注数据

        public isLastMatch : boolean;   // 是否是上届回顾
        public honorType : number;      // 服务器类别 本服或者跨服
        public curGroup : number;       // 当前数据的阶段，如跨服海选时需忽略，用本服决赛结算表示

        private _matchGroupList : MatchGroupVo[] = [];
        private _isFinish : boolean = false;
        constructor(groupType:number) {
            this.honorType = groupType;
            this._matchList.length = 0;
        }

        /** 初始化数据 */
        initData():void {
            this._matchList.length = 0;
            this.winPos = {};
            this.betInfo.length = 0;
            this.curGroup = 0;
            this._matchGroupList.length = 0;
            this._isFinish = false;
        }

        /**
         * 更新匹配列表
         * @param playerPos 服务端的位置是排名名次排位置的 1-16,2-15...
         * @param baseInfo 
         * @param winPos 
         */
        updateMatchList(playerPos:any,baseInfo: any,winPos:any,betInfo:any): void {
            let updateSort = this._matchList.length == 0;
            for(let playerId in playerPos) {
                let userVo = this.getPlayerById(playerId);
                if (!userVo) {
                    userVo = new GloryMatchPlayerVo();
                    userVo.playerId = playerId;
                    userVo.rankPos = Number(playerPos[playerId]);
                    userVo.isLastMatch = this.isLastMatch;
                    this._matchList.push(userVo);
                }
            }
            for(let playerId in baseInfo) {
                let userVo = this.getPlayerById(playerId);
                let svo : IGloryMatchPlayerSVo = baseInfo[playerId];
                userVo.clearLineupInfo();
                userVo.setSvo(svo);
            }
            // 所有阶段输赢结果
            this.winPos = winPos;
            // 当前阶段的投注情况
            this.betInfo = betInfo;
            // 更新顺序,设置玩家位置
            if(updateSort){
                this._matchList.sort((a,b)=>{
                    return a.rankPos - b.rankPos;
                });
            }
        }

        /** 设置当前数据的阶段 */
        setCurGroup(group:number):void {
            this.curGroup = group;
            this._isFinish = GloryUtil.isEndTime(group);
        }

        /** 是否需要重新请求数据 */
        isNeedRequest(group:number):boolean {
            if(this._matchList.length == 0 || this.isLastMatch) return true;
            // 不同阶段 或者 从未结束到-结束(有结果数据)
            return this.curGroup != group || (!this._isFinish && GloryUtil.isEndTime(group));
        }
        /** 获取玩家数据 */
        getPlayerById(pid: string): GloryMatchPlayerVo {
            return this._matchList.find((vo) => {
                return vo.playerId == pid;
            });
        }
        /** 获取玩家数据通过位置 */
        getPlayerByPos(pos: number): GloryMatchPlayerVo {
            return this._matchList.find((vo) => {
                return vo.rankPos == pos;
            });
        }
        getMatchList():GloryMatchPlayerVo[] {
            return this._matchList;
        }
        /** 获取匹配列表数据 */
        getMatchGroup(pos:number): GloryMatchPlayerVo[] {
            // 对手位置,对方奇数它则为偶数
            let pos2 = this.getOtherPos(pos);
            return [this.getPlayerByPos(pos),this.getPlayerByPos(pos2)];
        }
        getPosPlayerId(pos:number):string {
            return this.getPlayerByPos(pos).playerId;
        }
        getPosPlayerIds(posAry:number[]):string[] {
            return posAry.map((pos)=>{
                return this.getPlayerByPos(pos).playerId;
            })
        }
        /** 获取冠军 */
        getGuanjun():GloryMatchPlayerVo {
            let group = this.honorType == GroupType.benfu ? GloryId.benfu_juesai : GloryId.kuafu_juesai;
            let ary : number[] = this.winPos[group] || [];
            return this.getPlayerByPos(ary[0]);
        }

        /** 获取某个位置的对手位置 */
        getOtherPos(pos:number):number {
            return 17 - pos;
        }

        /** 某阶段是否结束 */
        isEnd(group:number):boolean {
            return this.isLastMatch || App.serverTimeSecond >=  GloryUtil.getGroupEndTime(group);
        }

        /**
         * 胜利者 0未结算 1左边赢 2右边赢
         * @param group 阶段
         * @param posAry 确定某一方是否胜利  位置列表
         */
        getWinType(group:number,posAry:number[]):number {
            let curGroup = GloryModel.getInstance().updateCurGroup();
            if(this.isLastMatch || curGroup > group){
                let ary : number[] = this.winPos[group] || [];
                let isWin = ary.some((pos)=>{
                    return posAry.indexOf(pos) != -1;
                });
                return isWin ? 1 : 2;
            }
            // 相同阶段或者未到 表示0未结算
            return 0;
        }
        /** 是否赢 */
        isWin(group:number,posAry:number[]):boolean{
            let ary : number[] = this.winPos[group] || [];
            let isWin = ary.some((pos)=>{
                return posAry.indexOf(pos) != -1;
            });
            // 本届比赛中还需要判断时间，因为后端会提前计算输赢
            return this.isLastMatch ? isWin : ( isWin && App.serverTimeSecond >= GloryUtil.getGroupEndTime(group));
        }

        /**
         * 押注 0未押注 1表示押注传入的位置 2表示押注对手位置
         * @param group 阶段
         * @param posAry 位置
         */
        getBetType(group:number,posAry:number[]):number {
            // 不是本阶段
            if(group != this.curGroup) return 0;
            let betType : number = 0;
            for(let pos of posAry){
                let pos2 = this.getOtherPos(pos);
                if(this.betInfo.indexOf(pos) != -1){
                    betType = 1;
                    break;
                }else if(this.betInfo.indexOf(pos2) != -1){
                    betType = 2;
                    break;
                }
            }
            return betType;
        }

        /** 选手对决组信息列表 stage pos */
        pushGroupWarInfo(info:IGloryMatchGroupSVo):void {
            let vo = this.getGroupWarInfo(info.session,info.stage,info.pos);
            if(!vo){
                vo = new MatchGroupVo();
                vo.isLastMatch = this.isLastMatch;
                this._matchGroupList.push(vo);
            }
            vo.setGroupInfo(info);
        }
        getGroupWarInfo(session:number,stage:number,pos:number):MatchGroupVo {
            return this._matchGroupList.find((vo)=>{
                return vo.svo.session == session && vo.svo.pos == pos && vo.svo.stage == stage;
            });
        }
    }
}