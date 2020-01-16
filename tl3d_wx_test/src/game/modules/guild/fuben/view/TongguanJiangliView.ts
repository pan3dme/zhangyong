

module game {

    export class TongguanJiangliView extends ui.guild.copy.TongguanJiangliUI{

        constructor(){
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
            this.tabbar.selectedIndex = -1;
            this.guanquaUI.onExit();
        }

        private initView(): void {
            this.bgPanel.dataSource = { uiName: UIConst.TongguanJiangliView, closeOnSide: this.isModelClose, closeOnButton: false, title:"奖励" };
            this.tabbar.selectHandler = new Handler(this,this.onTabSelect);
            this.tabbar.selectedIndex = 0;
        }

        private onTabSelect(index:number):void {
            if(index == -1) return;
            this.viewStack.selectedIndex = index;
            if(index == 0){
                this.rewardList.array = GuildCopyModel.getInstance().getRewardList();
            }else if(index == 1){
                this.guanquaUI.onEnter(this.dataSource);
            }
        }

        public refreshView():void {
            this.rewardList.array = GuildCopyModel.getInstance().getRewardList();
        }
    }
}