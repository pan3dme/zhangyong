
module game {

	export class CopyTeamRewardView extends ui.teamcopy.TeamCopyRewardUI {

        constructor(){
            super();
        }

        createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12304) };
            this.addChild(this.bgPanel.btnClose);
		}
        public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}
        public onClosed():void{
			super.onClosed();
            this.listReward.array = null;
		}

        public initView():void {
            this.listReward.array = CopyTeamModel.getInstance().getRewardList(true);
        }


    }

}