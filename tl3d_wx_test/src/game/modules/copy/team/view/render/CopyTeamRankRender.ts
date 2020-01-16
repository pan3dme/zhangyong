


module game {
    export class CopyTeamRankRender extends ui.teamcopy.render.TeamRankRenderUI {
        constructor() {
            super();
        }

        public set dataSource($value: common.RankVo) {
            this._dataSource = $value;
            this.refreshData();
        }

        public get dataSource(): common.RankVo {
            return this._dataSource;
        }

        public refreshData() {
            let info = this.dataSource;
            if (info) {
                this.ui_bg.dataSource = { rank: info.rank };
                this.boxInfo.visible = info.playerId != null;
                this.labInfo.visible = info.playerId == null;
                if (this.boxInfo.visible) {
                    this.lbName.text = info.name;
                    this.lbMid.text = String(info.force);
                    let tab = tb.TB_team_copy.getTB_team_copyById(info.value);
                    if (tab) {
                        this.lbValue.text = `${Math.floor(tab.copy / 10)}-${tab.copy % 10}`;
                    }
                    this.headBox.dataSource = info.getHeadVo();
                    this.headBox.on(Laya.Event.CLICK, this, this.onShowInfo);
                } else {
                    this.headBox.dataSource = null;
                    this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
                }
            } else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        }

        private onShowInfo(): void {
            let info = this.dataSource;
            if (!info || !info.playerId) return;
            UIUtil.showPlayerLineupInfo(info.playerId);
        }
    }
}