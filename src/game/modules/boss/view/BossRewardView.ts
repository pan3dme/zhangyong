

module game {

    export class BossRewardView extends ui.boss.RewardUI{
        
        constructor() {
            super();
            this.isModelClose = true;
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            this.rewardList.array = null;
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true,title:LanMgr.getLan("",12261) };
            let info:BossInfoVo = this.dataSource;
            this.rewardList.array = info.getRewardList();
        }
        
    }
}