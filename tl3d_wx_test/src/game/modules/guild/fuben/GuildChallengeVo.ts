

module game {

    export class GuildChallengeVo {

        public svo : IGuildChallengeInfo;
        public guanqiaVo : GuildGuanqiaVo;
        public tbCopy : tb.TB_guild_copy;
        /** 副本怪物 */
        public monster : tb.TB_monster;
        /** 排行榜 */
        private _rankList : GuildChallengeItemVo[];

        /** 怪物丢失的血量 */
        public enemyLossHp : any;
        /** 战斗结算数据 */
        public battleEndData : any;     // rank commonData totalDamage mosterInfo(后面这两个不可用，会发下一关卡的数值)
        constructor(){
            
        }

        setSvo(vo : IGuildChallengeInfo):void {
            this.svo = vo;
        }
        setGuanqiaVo(guanqia:GuildGuanqiaVo):void {
            this.guanqiaVo = guanqia;
            this.tbCopy = tb.TB_guild_copy.getItemnById(guanqia.tbCopy.ID);
            let monsterId = this.tbCopy.getMonterId();
            this.monster = tb.TB_monster.get_TB_monsterById(monsterId);
        }

        getName():string {
            return LanMgr.getLan('',10030,this.tbCopy.ID%10);
        }

        getRankList():GuildChallengeItemVo[] {
            if(!this._rankList){
                this._rankList = [];
                for(let key in this.svo.rankInfo) {
                    this._rankList.push(new GuildChallengeItemVo(this.tbCopy,this.svo.rankInfo[key],parseInt(key)));
                }
            }
            return this._rankList;
        }

        /** 是否击过杀怪物 */
        isKillMonsters(playerid:string):boolean{
            if (this.svo && this.svo.rankInfo){
                for (let id in this.svo.rankInfo){
                    let rankInfo = this.svo.rankInfo[id];
                    if (rankInfo && rankInfo[0] == playerid) return true;
                }
            }
            return false;
        }
        

        /** 获取怪物总血量 */
        getMonstersBlood():number {
            return this.monster.getPropValByType(1);
        }
        /** 获取怪物剩余血量 */
        getMonstersRestBlood():number {
            let total : number = 0;
            for(let id in this.svo.mosterInfo) {
                total += Math.ceil(this.svo.mosterInfo[id]);
            }
            return total;
        }

        getSelfRank():number {
            let find = this.getRankList().find((vo)=>{
                return vo.playerId == App.hero.playerId;
            });
            return find ? find.rank : 0;
        }

        isPass():boolean {
            return this.getMonstersRestBlood() <= 0;
        }

        /** 获取怪物血量 */
        getMonstersHp():number[] {
            let hps = [];
            let monsterAry = this.tbCopy.moster;
            for(let i = 0 ; i < monsterAry.length ; i++){
                let id = monsterAry[i];
                if(Number(id) != 0){
                    let monster = tb.TB_monster.get_TB_monsterById(id);
                    let blood = this.svo.mosterInfo[id] ? this.svo.mosterInfo[id] : monster.getPropValByType(1);
                    hps.push(blood);
                }else{
                    hps.push(0);
                }
            }
            return hps;
        }

        // ============= 结算界面 ==============
        /** 获取本次伤害 */
        getCurDamage():number {
            let damage = 0;
            for(let id in this.enemyLossHp){
                damage += this.enemyLossHp[id];
            }
            return Math.floor(damage);
        }
        /** 结算界面总伤害 */
        getTotalDamage():number{
            let total = this.battleEndData['totalDamage'] ? this.battleEndData['totalDamage'] : 0;
            return Math.floor(total);
        }
        getRank():number {
            return this.battleEndData['rank'] ? this.battleEndData['rank'] : 0;
        }
    }

    export class GuildChallengeItemVo {
        public tbCopy : tb.TB_guild_copy;
        public rank : number;
        public playerId : string;
        public playerName : string;
        public level : number;
        public head : number;
        public headFrame : number;
        public damage : number;
        public headVo : UserHeadVo;
        constructor(tb:tb.TB_guild_copy,ary:any[],rank:number){
            this.tbCopy = tb;
            this.rank = rank;
            this.playerId = ary[0];
            this.playerName = ary[1];
            this.head = ary[2];
            this.level = ary[3];
            this.damage = ary[4];
            this.headFrame = ary[5];
            this.headVo = new UserHeadVo(this.head,this.level,this.headFrame);
        }

        private _rewardList : ItemVo[];
        getRewardList():ItemVo[] {
            if(!this._rewardList){
                this._rewardList = [];
                let reward : any;
                if(this.rank == 1){
                    reward = this.tbCopy.rank_1;
                }else if(this.rank == 2){
                    reward = this.tbCopy.rank_2;
                }else if(this.rank == 3){
                    reward = this.tbCopy.rank_3;
                }else{
                    reward = this.tbCopy.rank_4;
                }
                for(let i = 0 ; i < reward.length ; i++){
                    this._rewardList.push(new ItemVo(reward[i][0],reward[i][1]))
                }
            }
            return this._rewardList;
        }
    }
}