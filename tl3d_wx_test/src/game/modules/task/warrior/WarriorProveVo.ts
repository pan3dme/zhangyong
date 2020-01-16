
module game {

    /** 勇者之证 */
    export class WarriorProveVo {

        public tbData : tb.TB_warrior_prove;
        constructor() {
        }

        setTbData(tbData:tb.TB_warrior_prove):void {
            this.tbData = tbData;
        }

        /** 清理 */
        clear():void {
            this.tbData = null;
        }

        /** 是否已完成 */
        isFinish():boolean {
            return App.hero.tasks.warriorLevel >= this.tbData.level;
        }
        /** 是否已领取普通奖励 */
        isHasRewardCommon():boolean {
            return WarriorProveModel.getInstance().isRewardCommon(this.tbData.ID);
        }
        /** 是否可领取普通奖励 */
        isCanRewardCommon():boolean {
            return this.isFinish() && this.tbData.getRewardItems().length > 0 && !this.isHasRewardCommon();
        }
        /** 是否已领取进阶奖励 */
        isHasRewardJinjie():boolean {
            return WarriorProveModel.getInstance().isRewardJinjie(this.tbData.ID);
        }
        /** 是否可领取进阶奖励 */
        isCanRewardJinjie():boolean {
            return this.isFinish() && WarriorProveModel.getInstance().isUnlockJinjie() && this.tbData.getSpecialItems().length > 0 && !this.isHasRewardJinjie();
        }

        /** 是否可领取 */
        isCanReward():boolean {
            return this.isCanRewardCommon() || this.isCanRewardJinjie();
        }
    }
}