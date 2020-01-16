
module game {

    export class ForestRewardView extends ui.fogforest.RewardViewUI {

        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12261) };
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }
        public close(type?: string, showEffect?: boolean, sound?:boolean):void {
            super.close(type,showEffect,sound);
            
        }

        public initView(): void {
            this.rewardList.array = FogForestModel.getInstance().getChestList(true);   
        }

        
    }
}