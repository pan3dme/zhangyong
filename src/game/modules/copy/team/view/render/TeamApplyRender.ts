module game {
    export class TeamApplyRender extends ui.teamcopy.render.TeamApplyRenderUI {
        protected _model: CopyTeamModel;
        constructor() {
            super();
            this._model = CopyTeamModel.getInstance();
            this.btn_gread.on(Laya.Event.CLICK, this, this.onAgreed);
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
            if (!info) {
                this.list_god.dataSource = null;
            } else {
                this.lab_info.text = info.name
                this.lab_force.text = String(info.force);
                this.list_god.dataSource = this.getLineupInfo(info.lineupInfo[0]);
            }
        }

        private getLineupInfo(lineup: any[]) {
            let item = null, tbGod, ary = [];
            for (let i = 0; i < 6; i++) {
                item = lineup[i];
                if (!item) {
                    ary.push(null);
                    continue;
                }
                tbGod = tb.TB_god.get_TB_godById(item[0]);
                let godVo = new GodItemVo(tbGod);
                // [templateId, starLv, level, attrs, degree, awakenLv, skinId]
                godVo.starLevel = item[1];
                godVo.level = item[2];
                godVo.degree = item[4];
                godVo.dataType = 1;
                if (item[3]) {
                    godVo.iSeverAttri = map2ary(item[3]);
                }
                ary.push(godVo);
            }
            return ary;
        }

        protected onAgreed() {
            if (!this.dataSource) return;
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.AGREED_APPLY), { playerId: this.dataSource.playerId, state: iface.tb_prop.applyOptTypeKey.yes });
        }

    }


    export class TeamInviteChiRender extends TeamApplyRender {
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
            if(!info) return;
            super.refreshData();
            this.updateBtn();
        }

        private updateBtn(){
            this.btn_gread.label = this.dataSource.isInvite? LanMgr.getLan("",12330):LanMgr.getLan("",12331);
            this.btn_gread.disabled = this.dataSource.isInvite;
        }

        protected onAgreed() {
            if(!this.dataSource)return;
            CopyTeamThread.getInstance().inviteFriend(this.dataSource.playerId).then(() => {
                this.dataSource.isInvite = true;
                this.updateBtn();
            });
        }

    }
}



