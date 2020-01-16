module battle {
    /**
     * 支持双方神器
     * 出手顺序:当行动条和速度值相同时，随机出手
     * 可自定义胜负条件
     */
    export class BattleScenePvp extends BattleScene {
        constructor(type) {
            super(type);
        }

        public calWinCamp(): number {
            if(this.type === CopyType.glory){
                var atkAllHp = this.getCampAllHp(BatteConsts.BATTLE_CAMPATK);
                var defAllHp = this.getCampAllHp(BatteConsts.BATTLE_CAMPDEF);
                if(atkAllHp === defAllHp){
                    return utils.random(BatteConsts.BATTLE_CAMPATK, BatteConsts.BATTLE_CAMPDEF);
                }
                return atkAllHp > defAllHp ? BatteConsts.BATTLE_CAMPATK : BatteConsts.BATTLE_CAMPDEF;
            }
            return BatteConsts.BATTLE_CAMPDEF;
        };

        public getCampAllHp(camp): number {
            var campData = this.campDatas[camp];
            if(!campData){
                return 0;
            }
            var allHp = 0;
            var objs = campData.objs;
            for(var idx in objs){
                var obj = objs[idx];
                allHp += obj.hp;
            }
            return allHp;
        };

        public atkBarRank(a, b): number {
            if (a.getAtkBar() !== b.getAtkBar()) {
                return b.getAtkBar() - a.getAtkBar();
            }
            if (a.atkSpd !== b.atkSpd) {
                return b.atkSpd - a.atkSpd;
            }
            return Math.random() < 0.5 ? -1 : 1;
        }
    }
}