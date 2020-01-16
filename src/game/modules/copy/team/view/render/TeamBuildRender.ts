module game {
    export class TeamBuildRender extends ui.teamcopy.render.TeamBuildRenderUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
            this._model = CopyTeamModel.getInstance();
            this.btnApply.on(Laya.Event.CLICK, this, this.onApply);
        }

        public set dataSource($value: CopyTeamListVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource(): CopyTeamListVo {
            return this._dataSource;
        }

        public refreshData() {
            let info = this.dataSource;
            if (info) {
                this.btnApply.label = LanMgr.getLan("",12489);
                this.btnApply.disabled = false;
                this.lbName.text = info.svo.name
                this.lbForce.text = String(info.svo.force);
                let tabcopy = tb.TB_team_copy.getTB_team_copyById(this._model.getNextId(info.svo.copyFloor));
                this.lbInfo.text = `${LanMgr.getLan("",10079,Math.floor(tabcopy.copy / 10))}-${LanMgr.getLan("",10030,tabcopy.copy % 10)}`;
                this.lbInfo.color = (this._model.myFloor >= info.svo.copyFloor) ? "#319c28" : "#ff0000";
                let item = null, ui = null;
                for (let i = 0; i < info.memberList.length; i++) {
                    item = info.memberList[i];
                    ui = item.pos == 1 ? this.ui_pic1 : item.pos == 2 ? this.ui_pic2 : this.ui_pic3;
                    ui.dataSource = item.head ? new UserHeadVo(item.head, item.level, item.headFrame) : null;
                }
            }
        }

        private onApply() {
            if (this.dataSource) {
                if(this.dataSource.svo.copyFloor > this._model.myFloor) {
                    showToast(LanMgr.getLan(``,10269));
                    return;
                }
                dispatchEvt(new CopyTeamEvent(CopyTeamEvent.APPLY_JOIN_TEAM), this.dataSource.svo.groupId);
                this.btnApply.label = LanMgr.getLan("",12488);
                this.btnApply.disabled = true;
            }
        }
    }
}



