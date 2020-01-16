

module game {
	export class MatchModel {
		constructor() {
		}
		static _instance: MatchModel;
		static getInstance(): MatchModel {
			if (!MatchModel._instance) {
				MatchModel._instance = new MatchModel();
			}
			return MatchModel._instance;
		}
        
        public score : number = 0;                  // 积分
        public benfuRank : number = 0;              // 本服排名
        public lastRefreshTime : number = 0;        // 上次刷新时间
        public challengeCount : number = 0;         // 挑战次数
        public doneMatchChests : number[] = [];     // 已领取的宝箱id
        public kuafuRank : number = 0;

        public maxTbCount : number = 0; // 宝箱的最大挑战次数
		initModel(): void {
			this._boxList = [];
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_match_box)).data;
			for(let key in tbData) {
                let tbBox = tbData[key] as tb.TB_match_box;
                if(tbBox.need_num > this.maxTbCount){
                    this.maxTbCount = tbBox.need_num;
                }
				this._boxList.push(new BaoxiangVo(tbBox));
			} 

            // 设置段位的最高积分
            let gardeList = tb.TB_match_score.getItemList();
            let maxScore = -1;
            for(let i = 0 , len = gardeList.length ; i < len ; i++){
                let tbScore = gardeList[i];
                tbScore.max_score = maxScore;
                maxScore = tbScore.score;
            }
            this.updateEndTime();
		}

        public roundEndTime : number;
        /** 更新本轮结束时间 本周结束 */
        updateEndTime():void {
            this.roundEndTime = GameUtil.getFormatTime(7,23,59,59) + 1;
        }

        private _boxList : BaoxiangVo[];
        /** 获取宝箱列表 */
        getBoxList():BaoxiangVo[]{
            return this._boxList ? this._boxList : [];
        }

        private _matchList : MatchPlayerVo[];
        /** 获取匹配列表 */
        getMatchList():MatchPlayerVo[]{
            return this._matchList ? this._matchList : [];
        }
        setMatchList(list:any[]):void {
            if(!this._matchList){
                this._matchList = [];
            }
            for(let i = 0,len = list.length ; i < len ; i++){
                if(!this._matchList[i]){
                    this._matchList.push(new MatchPlayerVo(list[i],i));
                }else{
                    this._matchList[i].setSvo(list[i]);
                }
            }
        }
        getMatchVo(playerId:string):MatchPlayerVo {
            return this.getMatchList().find((vo)=>{
                return vo.playerId == playerId;
            });
        }

        /** 战斗记录 */
        private _recordList : MatchRecordVo[];
        setRecordList(battleRecords:any[]):void {
            this._recordList = [];
            for(let i = 0,len = battleRecords.length ; i < len ; i++){
                this._recordList.push(new MatchRecordVo(battleRecords[i],i));
            }
            this._recordList.sort((a,b)=>{
                return b.battleTime - a.battleTime;
            });
        }
        getRecordList(): MatchRecordVo[]{
            return this._recordList ? this._recordList : [];
        }

        /** 获取段位名称 */
        getGradeName(score:number):string {
            let tbData = this.getTbGrade(score);
            return tbData ? tbData.name : "";
        }
        /** 获取段位数据 */
        getTbGrade(score:number):tb.TB_match_score{
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_match_score)).data;
			for(let key in tbData) {
                let tbBox = tbData[key] as tb.TB_match_score;
                if(score >= tbBox.score){
                    return tbBox;
                }
			} 
            return null;
        }

        /** 是否可以领取奖励 */
        isCanReward():boolean {
            return this._boxList.some((vo)=>{
                return vo.isCanReward();
            });
        }
    }
}