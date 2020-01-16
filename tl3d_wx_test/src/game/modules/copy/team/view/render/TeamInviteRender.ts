module game {
    export class TeamInviteRender extends ui.teamcopy.render.TeamInvitationRenderUI {
        constructor() {
            super();
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

            this.ui_render.dataSource = info;

            let now = App.serverTime / 1000;
            let t: number = now - info.logoutTime;
            t = Math.min(t, TimeConst.ONE_DAY_SEC * 7);

            this.lab_online.text = info.logoutTime == 0 ? LanMgr.getLan("",12248) : GameUtil.getOfflineTimeStr(now - t, now);
            this.lab_online.color = info.logoutTime == 0 ? "#18ad00" : "#535353";


        }
    }
}



