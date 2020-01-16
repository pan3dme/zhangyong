module battle {
    /**
     * 只支持己方神器
     * 出手顺序:当行动条和速度值相同时，我方阵营的靠前站位先出手
     * 只有在有效回合内，击败所有敌方，才算胜利
     */
    export class BattleScenePve extends BattleScene {
        constructor(type) {
            super(type);
        }

        public atkBarRank(a, b):number {
            if (a.getAtkBar() !== b.getAtkBar()) {
                return b.getAtkBar() - a.getAtkBar();
            }
            if (a.atkSpd !== b.atkSpd) {
                return b.atkSpd - a.atkSpd;
            }
            if (a.camp !== b.camp) {
                return a.camp - b.camp;  // pve里，我方先出手
            }
            return a.idx - b.idx;    // 站位前的先出手
        }
    }
}