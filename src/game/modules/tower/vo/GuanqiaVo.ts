

module game {

    export class GuanqiaVo {

        public tbCopyInfo: tb.TB_copy_info;
        public tbCopy: tb.TB_copy;
        public isBoss: boolean = false;

        private _openLv: number = 0;       // 开放等级
        private _prevId: number = 0;       // 上一关卡id
        constructor(cp: tb.TB_copy_info, isBoss: boolean = false) {
            this.tbCopyInfo = cp;
            this.isBoss = isBoss;
            this.tbCopy = tb.TB_copy.get_TB_copyById(cp.area);

            this._prevId = this.tbCopyInfo.getConditionVal(CopyConditionType.id);
			this._openLv = this.tbCopyInfo.getConditionVal(CopyConditionType.level);
        }

        /** 获取开放等级 */
        getOpenLevel(): number {
            return this._openLv;
        }
        /** 获取上一关卡id */
        getPrevId():number {
            return this._prevId;
        }

        /** 是否通过 */
        public isPass(): boolean {
            let modelVo = TowerModel.getInstance().getGuanqiaModelVo(this.tbCopy.sub_type)
            let cur = modelVo.curGuanqia;
            return modelVo.isAllFinish() ? true : this.tbCopyInfo.area_number < cur.tbCopyInfo.area_number;
        }

        /** 是否当前关卡 */
        public isCurrent(): boolean {
            let cur = TowerModel.getInstance().getGuanqiaModelVo(this.tbCopy.sub_type).curGuanqia;
            return cur.tbCopyInfo.ID == this.tbCopyInfo.ID;
        }

        /** 获取怪物头像 */
        getMonsterList(): tb.TB_monster[] {
            return this.tbCopyInfo.getMonsters();
        }

        /** 是否已领取奖励  先判断是否boss关卡，再判断是否领取 */
        isReward(): boolean {
            let curRewardId = App.hero.towerAwardInfo[this.tbCopy.sub_type];
            if (!curRewardId) return false;
            // 试炼塔是有序的,可以直接用id的大小去判断
            return this.isBoss ? (this.tbCopyInfo.ID <= curRewardId) : false;
        }
        /** 是否可领取 */
        public isCanReward():boolean {
            return this.isBoss && this.isPass() && !this.isReward();
        }
    }
}