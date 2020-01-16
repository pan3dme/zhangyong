

module game {
    export class YZJiangliView extends ui.yuanzheng.JiangliViewUI{
        constructor(){
            super();
            this.isModelClose = true;
        }

        createChildren():void {
            super.createChildren();
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
            this.bgPanel.dataSource = null;
        }

        private initView(): void {
            let info : YZGuanqiaVo = this.dataSource;
            this.rewardList.array = info.tbCopy.getBoxRewardList();
            this.rewardList.width = (90 + this.rewardList.spaceX) * this.rewardList.length;
            this.bgPanel.dataSource = {uiName:UIConst.Yuanzheng_RewardView,closeOnSide:this.isModelClose,closeOnButton:false, title:LanMgr.getLan("",12468)};
        }

        
    }
}