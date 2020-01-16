
module game {
    export class CopyTeamApply extends ui.teamcopy.TeamCopyApplyUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
        }
        createChildren(): void {
            super.createChildren();
            this.isModelClose = true;
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btnRefuse.on(Laya.Event.CLICK, this, this.onRefuse);
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
            this.timer.clear(this,this.onRefresh);
            this.bgPanel.dataSource = null;
            this.teamList.array = null;
        }

        private initView(): void {
            this.timer.clear(this,this.onRefresh);
            this.timer.loop(10000,this,this.onRefresh);
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamApply, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12259) };
            this.updateList();
            // this.rewardList.x = 400
        }

        public updateList() {
            this.teamList.array = this._model.getApplyList();
            this.imgEmpty.visible = this.lbEmpty.visible = this.teamList.array.length <= 0;
        }



        private onRefresh(): void {
            CopyTeamThread.getInstance().getApplyList(true)
            .then(()=>{
                this.updateList();
            });
        }

        private onRefuse(): void {
            if (!this.teamList || !this.teamList.array || this.teamList.array.length <= 0) return;
            CopyTeamThread.getInstance().applyOpt(null,iface.tb_prop.applyOptTypeKey.no)
            .then(()=>{
                this.updateList();
            });
        }

    }
}