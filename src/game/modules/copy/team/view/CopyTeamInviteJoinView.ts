module game {

    /** 邀请你组队 */
    export class CopyTeamInviteJoinView extends ui.goddomain.InviteJoinUI {

        private _thread: CopyTeamThread;
        constructor() {
            super();
            this.isModelClose = false;
            this._thread = CopyTeamThread.getInstance();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed(): void {
            super.onClosed();
            Laya.timer.clearAll(this);
            this.btnYes.off(Laya.Event.CLICK, this, this.onYes);
            this.btnNo.off(Laya.Event.CLICK, this, this.onNot);
            this.checkBox.off(Laya.Event.CHANGE, this, this.onChange);
        }

        private _cd: number;
        public initView(): void {
            this.checkBox.selected = false;
            this._cd = tb.TB_fight_goddomain_set.getSet().invite_time;
            let info: { playerId, name } = this.dataSource;
            this.lab_title.text = LanMgr.getLan("",12480);
            this.lbContent.text = LanMgr.getLan("",12481,info.name);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            this.btnYes.on(Laya.Event.CLICK, this, this.onYes);
            this.btnNo.on(Laya.Event.CLICK, this, this.onNot);
            this.checkBox.on(Laya.Event.CHANGE, this, this.onChange);
        }

        /** 更新时间 */
        private updateTime(): void {
            if (this._cd <= 0) {
                Laya.timer.clear(this, this.updateTime);
                this.close();
                return;
            }
            this.lbTime.text = LanMgr.getLan("",12172,this._cd) + "s";
            this._cd--;
        }


        private onYes(): void {
            let info: { playerId, name } = this.dataSource;
            if (!info) return;

            if (GodDomainModel.getInstance().hasTeam()) {
                //处于激战神域队伍中
                common.AlertBox.showAlert({
                    text: LanMgr.getLan(``,10497),
                    confirmCb: () => {
                        this.joinOpt(info.playerId);
                    },
                    parm: null
                });
            } else {
                this.joinOpt(info.playerId);
            }
        }

        private joinOpt(playerId) {
            this.close();
            this._thread.joinInvite(playerId).then(() => {
                GodDomainModel.getInstance().resetGroupId();
                dispatchEvt(new CopyTeamEvent(CopyTeamEvent.SHOW_TEAMBUILD));

            });
        }

        private onNot(): void {
            this.close();
            let info: { playerId, name } = this.dataSource;
            if (!info) return;
            this._thread.refuseInvite(info.playerId).then(() => {
            });
        }

        private onChange(): void {
            let info: { playerId, name } = this.dataSource;
            let state = this.checkBox.selected ? iface.tb_prop.groupInviteTypeKey.no : iface.tb_prop.groupInviteTypeKey.yes;
            this._thread.todayRefuseJoin(info.playerId, state).then((setInvite) => {
                this.checkBox.selected = setInvite == iface.tb_prop.groupInviteTypeKey.no ? true : false;
            });
        }
    }
}