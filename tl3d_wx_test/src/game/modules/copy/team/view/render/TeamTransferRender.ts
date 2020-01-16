module game {
    export class TeamTransferRender extends ui.teamcopy.render.TeamTransferRenderUI {
        constructor() {
            super();
            this.imgBg.on(Laya.Event.CLICK, this, this.onClick);
        }

        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource() {
            return this._dataSource;
        }

        public refreshData() {
            let info = this.dataSource;
            if (!info) return;

            this.ui_head.dataSource = info.head ? new UserHeadVo(info.head, info.level, info.headFrame) : null;

            this.lab_name.text = info.name;

            this.lab_force.text = String(info.force);

            let tab = tb.TB_team_copy.getTB_team_copyById(info.copyFloor);
            if (tab) {
                this.lab_info.text = LanMgr.getLan("",12478) + `${Math.floor(tab.copy / 10)}-${tab.copy % 10}`
                this.lab_info.color = info.copyFloor > CopyTeamModel.getInstance().captainFloor?"#ff0000":"#319c28";
            }

        }

        private onClick() {
            let info = this.dataSource;
            if (!info) return;
            if (info.copyFloor > CopyTeamModel.getInstance().captainFloor) {
                showToast(LanMgr.getLan(``,10270));
                return;
            }
            common.AlertBox.showAlert({
                text: LanMgr.getLan(``,10271,info.name),
                confirmCb: () => {
                    CopyTeamThread.getInstance().appointCaptain(info.playerId).then(() => {
                        dispatchEvt(new CopyTeamEvent(CopyTeamEvent.HIDE_TRANSFER_PANEL))
                    });
                },
                parm: null
            });
        }
    }
}