

module game {

    export class BossInfoVo {

        public tbBoss : tb.TB_worldboss;
        public svo : IWorldBossInfo;        // 服务器数据
        public tbMonster : tb.TB_monster;   // boss怪物
        public sortNum : number = 0;        // 排序编号
        public quality : number = 1;

        /** 怪物丢失的血量 */
        public enemyLossHp : any;
        /** 战斗结算数据 */
        public battleEndData : any;     // rank commonData totalDamage 
        constructor(tbBoss:tb.TB_worldboss){
            this.tbBoss = tbBoss;
            let monsterId = this.tbBoss.monster.find((id)=>{
                return Number(id) != 0;
            });
            this.tbMonster = tb.TB_monster.get_TB_monsterById(monsterId);
            this.quality = tbBoss.ID <= 2 ? 1 : (tbBoss.ID <= 5 ? 2 : 3);
        }

        public setSvo(svo:IWorldBossInfo):void {
            this.svo = svo;
            // 已解锁 等级从高到底；未解锁，等级从低到高
            if(!this.isOpen()){
                this.sortNum = 10000 + this.tbBoss.level ;
            }else {
                this.sortNum = -this.tbBoss.level;
            }
        }
        
        private _rewardList : inface.IAwardRankData[];
        getRewardList():any[]{
            if(!this._rewardList){
                this._rewardList = [];
                this._rewardList.push(new AwardRankData(1,"1",this.getItemList(this.tbBoss.rank_1)));
                this._rewardList.push(new AwardRankData(2,"2",this.getItemList(this.tbBoss.rank_2)));
                this._rewardList.push(new AwardRankData(3,"3",this.getItemList(this.tbBoss.rank_2)));
                this._rewardList.push(new AwardRankData(4,"4-10",this.getItemList(this.tbBoss.rank_3)));
                this._rewardList.push(new AwardRankData(5,LanMgr.getLan("",12501)+"10",this.getItemList(this.tbBoss.rank_4)));
            }
            return this._rewardList;
        }
        private getItemList(rankAry:any[]):ItemVo[]{
            let result = [];
            rankAry.forEach((ary: any[]) => {
                result.push(new ItemVo(Number(ary[0]), Number(ary[1])));
            });
            return result;
        }

        /** 是否开启 */
        isOpen():boolean {
            return App.hero.level >= this.tbBoss.level;
        }
        /** 是否死亡 */
        isDead():boolean {
            return this.svo.bossReviveTime > App.serverTimeSecond;
        }

        /** 获取怪物总血量 */
        getBossTotalHp():number {
            return this.tbMonster.getPropValByType(1);
        }
        /** 获取怪物剩余血量 */
        getBossHp():number {
            return this.svo.bossHp;
        }

        /** 获取怪物血量 -- 战斗初始化血量，有阵容顺序的 */
        getMonstersHp():number[] {
            let hpAry = [];
            for(let i = 0 ; i < this.tbBoss.monster.length ; i++){
                if(Number(this.tbBoss.monster[i]) != 0){
                    hpAry.push(this.svo.bossHp);
                }else{
                    hpAry.push(0);
                }
            }
            // loghgy('getMonstersHp',hpAry);
            return hpAry;
        }

        // ============= 结算界面 ==============
        /** 获取本次伤害 */
        getCurDamage():number {
            // let damage = 0;
            // for(let id in this.enemyLossHp){
            //     damage += this.enemyLossHp[id];
            // }
            // return damage;
            return this.enemyLossHp;
        }
        /** 结算界面总伤害 */
        getTotalDamage():number{
            let total = this.battleEndData['totalDamage'] ? this.battleEndData['totalDamage'] : 0;
            return Math.floor(total);
        }
        getRank():number {
            return this.battleEndData['rank'] ? this.battleEndData['rank'] : 0;
        }

        public rankList : any[];
        /** 设置排行榜 */
        setRankList(ary:IBossRankInfo[]):void {
            this.rankList = []; 
            for(let i = 0 ; i < 3 ;i++) {
                let vo = ary[i] || {};
                vo['rank'] = i;
                this.rankList.push(vo);
            }
        }
    }

    export class BossRankInfo {
        public rank : number;
        public svo : IBossRankInfo;
        public headVo : UserHeadVo;
        public head : number;
        constructor(info:IBossRankInfo,rank:number){
            this.svo = info;
            this.rank = rank;
            this.head = info.head;
            this.headVo = new UserHeadVo(info.head,info.playerLevel,info.headFrame);
        }
    }
    export interface IBossRankInfo {
        playerId : string;
        playerLevel : number;
        playerName : string;
        head : number;
        headFrame : number;
        value : number;
        rank:number;
    }
}