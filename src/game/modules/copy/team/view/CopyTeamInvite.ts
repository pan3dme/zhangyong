
module game {
    export class CopyTeamInvite extends ui.teamcopy.TeamCopyInvitationUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
        }
        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this._model = CopyTeamModel.getInstance();
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
            tl3d.ModuleEventManager.removeEvent(CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = null;
            this.teamList.array = null;
        }

        private initView(): void {
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamInvite, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12482) };
            this.updateList();
        }

        public updateList() {
            this.teamList.array = this._model.getInviteList();
            this.imgEmpty.visible = this.lbEmpty.visible = this.teamList.array.length <= 0;
        }



        private onRefresh(): void {
            CopyTeamThread.getInstance().requestInviteList(true)
            .then(()=>{
                this.updateList();
            });
        }


    }
}