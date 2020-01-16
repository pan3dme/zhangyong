module game{

    /** 队伍列表界面 */
	export class TeamListView extends ui.goddomain.TeamListUI{
		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.GodDm_TeamListView, closeOnSide: this.isModelClose,closeOnButton:true,title:"组队信息"};
            this.btnRefresh.on(Laya.Event.CLICK,this,this.onRefresh);
            this.btnCreate.on(Laya.Event.CLICK,this,this.onCreate);
        }

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            this.teamList.array = null;
            Laya.timer.clearAll(this);
		}

		private initView():void{
            this.updateView();
            Laya.timer.loop(10000,this,this.onRefresh);
        }

        private updateView():void {
            let list = GodDomainModel.getInstance().getTeamList();
            this.teamList.array = list;
            this.lbEmpty.visible = list.length <= 0;
        }

        public onRefresh():void {
            GodDmThread.getInstance().requestTeamList(true)
            .then(()=>{
                this.updateView();
            });
        }
        /** 创建队伍 */
        private onCreate():void {
            dispatchEvt(new GodDomainEvent(GodDomainEvent.CREATE_TEAM_VIEW));
        }
    }
}