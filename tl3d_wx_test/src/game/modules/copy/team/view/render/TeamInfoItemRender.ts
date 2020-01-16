module game {
    export class TeamInfoItemRender extends ui.teamcopy.render.TeamInfoRenderUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
            this._model = CopyTeamModel.getInstance();
            this.btn_invitation.on(Laya.Event.CLICK, this, this.onInvitation);
            this.btn_kickout.on(Laya.Event.CLICK, this, this.onKickOut);
            this.btn_transfer.on(Laya.Event.CLICK, this, this.onTransfer);
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
            this.img_leader.visible = info.job && info.job == iface.tb_prop.groupJobTypeKey.captain;
            this.img_pos.skin = SkinUtil.getTeamPos(info.pos);

            this.img_force.visible = this.lab_force.visible = this.list_god.visible = info.playerId != null;
            this.btn_transfer.visible = info.pos > 1 && info.playerId != null && this._model.IsLeader();
            this.btn_kickout.visible = this._model.IsLeader() && info.playerId != null && this._model.leaderId !== info.playerId;
            this.btn_invitation.visible = info.playerId == null && this._model.IsLeader();
            this.lab_info.y = info.playerId != null ? 22 : 63
            if (info.playerId) {
                this.lab_info.text = info.name;
                this.lab_force.text = String(info.force);
                this.list_god.array = this.getLineupInfo(info.lineupInfo[0]);
            } else {
                this.lab_info.text = LanMgr.getLan("",12487);
                this.list_god.array = null;
                this.lab_force.text = "";
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

        private onInvitation() {
            if(!this.dataSource)return;
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.SHOW_INVITE_VIEW));
        }

        private onKickOut() {
            if(!this.dataSource)return;
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.KICK_OUT_MEMBER), this.dataSource.playerId);
        }

        private onTransfer() {
            if(!this.dataSource)return;
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.SET_POS_TEAM), this.dataSource.pos);
        }
    }
}



