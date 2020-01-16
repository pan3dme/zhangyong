
module game {
    export class CopyTeamBattleInfo extends ui.teamcopy.BattleInfoUI {
        private _model: CopyTeamModel;
        constructor() {
            super();
            this.group = UIConst.team_two_group;
        }
        createChildren(): void {
            super.createChildren();
            this._model = CopyTeamModel.getInstance();
            this.isModelClose = true;
            this.btn_addteam.on(Laya.Event.CLICK, this, this.onAddTeam);
            this.btn_singlebattle.on(Laya.Event.CLICK, this, this.onSingleBattle);
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
            this.lineupUI.dataSource = null;
            this.bgPanel.dataSource = null;
            this.rewardList.dataSource = null;

        }

        private initView(): void {
            let teamcopy: tb.TB_team_copy = this.dataSource
            if (!teamcopy) return;
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamBattleInfo, closeOnButton: false, closeOnSide: this.isModelClose, centerBgHide: true, title: `${LanMgr.getLan("",10079,Math.floor(teamcopy.copy / 10))} ${LanMgr.getLan("",10030,teamcopy.copy % 10)}` };
            this.lineupUI.dataSource = { lineupGods: this.getMonsterList(teamcopy.monster), shenqiAry: [], showShenli: false, title: LanMgr.getLan("",10020) };
            this.rewardList.dataSource = teamcopy.getRewardList();
            listAtCenter(this.rewardList, 92, 5, this.rewardList.dataSource.length, 100);

            this.btn_singlebattle.label = this._model.hasTeam() ? LanMgr.getLan("",12486) : LanMgr.getLan("",12485);
            this.btn_singlebattle.x = this._model.hasTeam() ? 284 : 447;
            this.btn_addteam.visible = !this._model.hasTeam();

            // this.rewardList.x = 400
        }

        private getMonsterList(monsterKeyList: Array<number>) {
            let ary = [], tabmonster = null;
            for (var i = 0; i < monsterKeyList.length; i++) {
                tabmonster = tb.TB_monster.get_TB_monsterById(monsterKeyList[i])
                if (tabmonster) {
                    ary.push(tabmonster);
                } else {
                    logerror("team Copy data error:" + monsterKeyList[i]);
                }
            }
            return ary;
        }


        private onAddTeam(): void {
            if(this._model.hasTeam()){
                showToast(LanMgr.getLan('',10203));
                this.close();
                return;
            }
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.SHOW_TEAMBUILD));
        }

        private onSingleBattle(): void {
            if (!this.dataSource) return;
            if(this._model.hasTeam() && !this._model.IsLeader()){
                showToast(LanMgr.getLan('',10203));
                this.close();
                return;
            }
            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.TEAM_COPY_BATTLE),this.dataSource.ID);
        }

    }
}