module game{

    /** 邀请列表界面 */
	export class GodDmInviteView extends ui.goddomain.InviteListUI{
		constructor(){
			super();
			this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.GodDm_InviteView, closeOnSide: this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12325)};
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            Laya.timer.clearAll(this);
            this.teamList.array = null;
            this.btnRefresh.off(Laya.Event.CLICK,this,this.onRefresh);
		}

		private initView():void{
            this.updateView();
            this.btnRefresh.on(Laya.Event.CLICK,this,this.onRefresh);
            Laya.timer.loop(10000,this,this.onRefresh);
        }

        private updateView():void {
            let list = GodDomainModel.getInstance().getInviteList();
            this.teamList.array = list;
            this.lbEmpty.visible = list.length <= 0;
        }

        private onRefresh():void {
            GodDmThread.getInstance().requestInviteList(true)
            .then(()=>{
                this.updateView();
            });
        }
    }
}