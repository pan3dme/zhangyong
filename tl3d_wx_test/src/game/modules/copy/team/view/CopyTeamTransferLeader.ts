
module game {
    export class CopyTeamTransferLeader extends ui.teamcopy.transferLeaderUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
        }
        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
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
            this.itemlist.dataSource = null;
        }

        private initView(): void {
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamTransfer, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12477) };
            this.updateList();
        }

        public updateList() {
            if(!this._model.hasTeam() || !this._model.IsLeader() || this._model.getOtherMembers().length <= 0){
                this.close();
                return;
            }

            this.itemlist.dataSource = this._model.getOtherMembers();
            listAtCenter(this.itemlist, 51,2, this.itemlist.dataSource.length, 176);
        }
    }
}