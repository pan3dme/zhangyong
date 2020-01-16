module game{

    /** 队伍列表界面 */
	export class CopyTeamBuild extends ui.teamcopy.TeamBuildUI{
		constructor(){
			super();
            this.group = UIConst.team_two_group;
			this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamBuild, closeOnSide: this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12484)};
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther,showEffect);
            this.initView();		
		}

        public onClosed():void{
			super.onClosed();
            tl3d.ModuleEventManager.removeEvent(CopyTeamEvent.DISEVT_JOIN_TEAM, this.disJoinTeam, this);
            this.teamList.array = null;
            this.timer.clear(this,this.onRefresh);
            this.btnRefresh.off(Laya.Event.CLICK,this,this.onRefresh);
            this.btnCreateTeam.off(Laya.Event.CLICK,this,this.onCreat);

		}

		private initView():void{
            this.updateView();
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.DISEVT_JOIN_TEAM, this.disJoinTeam, this);
            this.btnRefresh.on(Laya.Event.CLICK,this,this.onRefresh);
            this.btnCreateTeam.on(Laya.Event.CLICK,this,this.onCreat);
            this.timer.loop(5000,this,this.onRefresh);
        }
        
        private disJoinTeam(){
            UIMgr.showUI(UIConst.CopyTeamInfo);
        }

        private updateView():void {
            let list = CopyTeamModel.getInstance().getTeamList();
            this.teamList.array = list;
            this.imgEmpty.visible = this.lbEmpty.visible = list.length <= 0;
        }

        public onRefresh():void {
            CopyTeamThread.getInstance().requestTeamList(true)
            .then(()=>{
                this.updateView();
            });
        }

        private onCreat(){
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.CREATE_TEAM_VIEW));
        }
    }
}