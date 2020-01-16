

module game {

    export class BaoxiangVo implements inface.IBaoxiangData{
        
        public tbBox : tb.TB_match_box;
        constructor(tbBox:tb.TB_match_box){
            this.tbBox = tbBox;
        }
        getRewardSkin(): string {
            return '';
        }
        /** 获取数量 */
        getCount():number {
            return this.tbBox.need_num;
        }
        /** 获取宝箱皮肤 */
        getSkin():string {
            return SkinUtil.getTaskBaoxiang(this.tbBox.box_model,this.isReward());
        }
        /** 是否可领取 */
        isCanReward():boolean {
            return this.isFinish() && !this.isReward();
        }
        /** 是否已领取 */
        isReward():boolean {
            return MatchModel.getInstance().doneMatchChests.indexOf(this.tbBox.ID) != -1;
        }
        /** 完成 */
        isFinish():boolean {
            return MatchModel.getInstance().challengeCount >= this.getCount();
        }
        /** 获取奖励列表 */
        getRewardList():ItemVo[] {
            return this.tbBox.getRewardList();
        }
        /** 领取触发事件 */
        getEvent():tl3d.BaseEvent {
            return new ArenaEvent(ArenaEvent.MATCH_REWARD_BOX);
        }
    }
}