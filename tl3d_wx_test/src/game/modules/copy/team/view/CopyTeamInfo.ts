
module game {
    export class CopyTeamInfo extends ui.teamcopy.TeamInfoUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
            this.group = UIConst.team_two_group;
        }
        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.btn_apply.on(Laya.Event.CLICK, this, this.onApply);
            this.btn_leave.on(Laya.Event.CLICK, this, this.onLeave);
            this.btn_transfer.on(Laya.Event.CLICK, this, this.onTransfer);
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
            tl3d.ModuleEventManager.removeEvent(CopyTeamEvent.UPDATE_MEMBERLIST, this.updateRender, this);
        }

        private initView(): void {
            this.refreshOpt();
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.UPDATE_MEMBERLIST, this.updateRender, this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamInfo, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12483) };

        }

        private updateRender() {
            if (!this._model.hasTeam()) {
                this.close();
                return;
            }
            this.refreshOpt();
        }

        public refreshOpt() {
            this.lab_force.text = String(this._model.getTeamAllForce());
            this.btn_transfer.visible = this.btn_apply.visible = this._model.IsLeader();
            this.btn_leave.x = this._model.IsLeader() ? 61 : 227;

            this.ui_item0.dataSource = this._model.getMemberById(1);
            this.ui_item1.dataSource = this._model.getMemberById(2);
            this.ui_item2.dataSource = this._model.getMemberById(3);
        }


        private onApply(): void {
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.APPLY_TEAM_PANEL));
        }

        private onLeave(): void {
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.LEAVE_TEAM));
        }

        private onTransfer(): void {
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.SHOW_TRANSFER_PANEL));
        }

    }
}