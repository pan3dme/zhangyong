

module game {

    export class GuildFightMemberVo extends BaseFightVo{

        public svo : IFightMemberSvo;
        public headVo : UserHeadVo;
        public isMyTeam : boolean;

        public sortNum : number;
		constructor(isMyTeam:boolean) {
            super();
            this.isMyTeam = isMyTeam;
		}
        setServerInfo(svo:IFightMemberSvo):void {
            if(this.svo){
                for(let key in svo){
                    this.svo[key] = svo[key];
                }
            }else{
                this.svo = svo;
                this.headVo = new UserHeadVo(this.svo.head,this.svo.level,this.svo.headFrame);
            }
            if(!this.lineupInfo){
                super.setLineupInfo(this.svo.lineupInfo);
            }
            // 按照还有生命和没生命排列，然后再按钮积分排列
            this.sortNum = svo.integral + svo.lifeNum * 10000000;
        }
        /** 是否死亡 */
        isDead():boolean {
            return this.svo.lifeNum <= 0;
        }
        /** 获取阵容当前血量 */
        getLineupCurHp():number{
            let blood : number = 0;
            let hpInfo = this.svo.hpInfo;
            for(let gid in hpInfo){
                if(!isNaN(hpInfo[gid])){
                    blood += hpInfo[gid];
                }
            }
            return blood;
        }

        /** 获取玩家的英雄id组（战斗的英雄） */
        getLineupGodIds():number[] {
            let ary = [];
            for (let i = 0; i < this.lineupGods.length; i++) {
                let vo = this.lineupGods[i];
                if (vo) {
                    let blood = this.getGodCurHp(vo.templateId);
                    if(blood > 0){
                        ary.push(vo.templateId);
                    }else{
                        ary.push(0);
                    }
                } else {
                    ary.push(0);
                }
            }
            return ary;
        }
        /** 获取敌方阵容英雄初始血量（战斗使用） */
        getEnemyGodsHpAry():number[] {
            let hps = [];
            let godAry = this.getLineupGodIds();
            for(let i = 0 ; i < godAry.length ; i++){
                let id = godAry[i];
                if(id != 0){
                    hps.push(this.getGodCurHp(id));
                }else{
                    hps.push(0);
                }
            }
            return hps;
        }
        /** 获取英雄当前血量 */
        getGodCurHp(tbid:number):number{
            return this.svo.hpInfo[tbid] ? this.svo.hpInfo[tbid] : 0;
        }

        /** 
         * 传给后端的伤害信息 对手剩余血量（key：英雄id, value: 血量）
         */
        getEnemyHpInfo(lossHpInfo:any):any {
            let enemyHp = {};
            for( let gid in lossHpInfo ){
                let baseHp = this.getGodTotalHp(Number(gid));
                let totalHp = this.getGodCurHp(Number(gid));
                let result = totalHp - (lossHpInfo[gid] ? lossHpInfo[gid] : 0);
                result = result <= 0 ? 0 : result;
                result = result > baseHp ? baseHp : result;
                enemyHp[gid] = Math.round(result);
            }
            return enemyHp;
        }
        
        /** 复制一份数据 */
        static copy(oldInfo:GuildFightMemberVo):GuildFightMemberVo {
            let vo = new GuildFightMemberVo(oldInfo.isMyTeam);
            let data = JSON.parse(JSON.stringify(oldInfo.svo));
            vo.setServerInfo(data);
            return vo;
        }
    }

}