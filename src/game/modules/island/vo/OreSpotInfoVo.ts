
module game {
    export class OreSpotInfoVo extends BaseFightVo{
        public pos : number;
        public tbIsland : tb.TB_island;
        public tbOre: tb.TB_island_level;
        public svo: IOreSpotSvo;

        private _award : Number[];
        private _specialAward : ItemVo[];
        public isOccupyFight : boolean; // 是否占领
        constructor(pos:number,tbland:tb.TB_island) {
            super();
            this.tbIsland = tbland;
            this.pos = pos;
        }
        /** 设置矿产基础数据 */
        setSimpleInfo(info:IOreSpotSvo):void {
            if(this.svo && info){
                for(let key in info){
                    this.svo[key] = info[key];
                }
                // 上一时刻有人占领,时间到之后刷新了无人占领的矿产，需要置空占领数据；如果刷新到的是有人占领的矿产，上面循环赋值了
                if(this.svo.playerId && !info.playerId){
                    this.clearDetailInfo();
                }
            }else{
                this.svo = info;
            }
            this.tbOre = info ? tb.TB_island_level.getItemById(info.mineType) : null;
        }
        /** 清除矿点占领信息 */
        clearDetailInfo():void {
            this.svo.playerId = null;
            this.svo.playerName = null;
            this.svo.force = 0;
            this.svo.lineupInfo = [[],[]];
            this.svo.occupyTime = 0;
            this.svo.profitInfo = [];
            this.svo.robCount = 0;
            this.svo.startTime = 0;
            this.svo.level = 0;
            this.svo.head = 0;
        }
        setDetailInfo(info:IOreSpotSvo): void {
            for(let key in info){
                this.svo[key] = info[key];
            }
            super.setLineupInfo(this.svo.lineupInfo);
            // 当前收益
            this._specialAward = [];
            let commonReward = this.tbOre.reward;
            for(let ary of info.profitInfo){
                if(ary[0] == Number(commonReward[0])){
                    this._award = [ary[0],ary[1]];
                }else{
                    this._specialAward.push(new ItemVo(ary[0],ary[1]));
                }
            }
            if(!this._award){
                this._award = [Number(commonReward[0]),0];
            }
        }
        getHeadVo():UserHeadVo{
            if(this.hasUser()){
                return new UserHeadVo(this.svo.head,this.svo.level,this.svo.headFrame);
            }
            return null;
        }
        /** 获取特殊奖励 */
        getSpecialAward():ItemVo[]{
            return this._specialAward;
        }
        /** 累积奖励 */
        getAward():Number[]{
            return this._award;
        }
        /** 抢夺奖励 */
        getRobAward():any {
            let award = this._award;
            return [award[0],Math.floor(Number(award[1]) * this.tbOre.plunder_loss / 100)];
        }
        
        /** 是否有矿产 */
        isExist():boolean{
            return this.svo && this.svo.mineIndex ? true : false
        }
        /** 是否有玩家占领 */
        hasUser():boolean {
            return this.svo && this.svo.playerId ? true : false;
        }
        /** 是否自身 */
        isSelf():boolean{
            return this.svo && this.svo.playerId == App.hero.playerId;
        }
        /** 是否采集结束了 */
        isOutTime():boolean {
            return this.getAllOccupyTime() >= this.tbOre.max_time;
        }
        /** 获取总的采集时间 */
        getAllOccupyTime():number{
            let occupyTime:number = 0;
            if (this.svo.startTime > 0){
                occupyTime = App.serverTimeSecond - this.svo.startTime;
            }
            return occupyTime + this.svo.occupyTime;
        }
        getFightDesc():string {
            return this.isOccupyFight ? LanMgr.getLan("",12198) : "";
        }

        /** 复制一份数据 */
        static copy(oldInfo:OreSpotInfoVo):OreSpotInfoVo {
            let vo = new OreSpotInfoVo(oldInfo.pos,oldInfo.tbIsland);
            let simpleInfo : any = {mineIndex:oldInfo.svo.mineIndex,mineId:oldInfo.svo.mineId,mineType:oldInfo.svo.mineType};
            vo.setSimpleInfo(simpleInfo)
            let data = JSON.parse(JSON.stringify(oldInfo.svo));
            vo.setDetailInfo(data);
            return vo;
        }
    }
    /** 矿点信息 */
    export interface IOreSpotSvo {
        mineIndex: number;          // 矿点索引 uuid唯一值
        mineId: number;             // 矿点ID 位置
        mineType: number;           // 矿点类型 表id

        // 公共
        playerId: string;           // 占领玩家ID
        playerName: string;         // 占领玩家名字
        force: number;              // 占领玩家神力值
        level : number;
        head : number;
        headFrame : number;

        // 详细信息
        guildName: string;
        lineupInfo: any[];         // 占领玩家布阵信息
        occupyTime: number;         // 已采集时间
        profitInfo: any;           // 当前收益信息
        robCount: number;          // 被掠夺次数
        startTime: number;         // 收益开始时间戳
    }

}