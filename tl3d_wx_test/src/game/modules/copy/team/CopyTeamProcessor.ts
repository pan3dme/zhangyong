module game {
    /*
    * CopyTeamProcessor
    */
    export class CopyTeamProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: CopyTeamModel = CopyTeamModel.getInstance();
        private _thread: CopyTeamThread = CopyTeamThread.getInstance();

        public getName(): string {
            return "CopyTeamProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new CopyTeamEvent(CopyTeamEvent.SHOW_MAIN_PANEL),
                new CopyTeamEvent(CopyTeamEvent.SHOW_RULE_VIEW),
                new CopyTeamEvent(CopyTeamEvent.SHOW_REWARD_VIEW),
                new CopyTeamEvent(CopyTeamEvent.SHOW_RANK_VIEW),
                new CopyTeamEvent(CopyTeamEvent.SHOW_TEAMBUILD),
                new CopyTeamEvent(CopyTeamEvent.CREATE_TEAM_VIEW),
                new CopyTeamEvent(CopyTeamEvent.LEAVE_TEAM),
                new CopyTeamEvent(CopyTeamEvent.SET_POS_TEAM),
                new CopyTeamEvent(CopyTeamEvent.APPLY_JOIN_TEAM),
                new CopyTeamEvent(CopyTeamEvent.APPLY_TEAM_PANEL),
                new CopyTeamEvent(CopyTeamEvent.KICK_OUT_MEMBER),
                new CopyTeamEvent(CopyTeamEvent.AGREED_APPLY),
                new CopyTeamEvent(CopyTeamEvent.TEAM_COPY_BATTLE),
                new CopyTeamEvent(CopyTeamEvent.DISEVT_JOIN_TEAM),
                new CopyTeamEvent(CopyTeamEvent.DISEVT_EXIT_TEAM),
                new CopyTeamEvent(CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM),
                new CopyTeamEvent(CopyTeamEvent.PLAY_REPORT),
                new CopyTeamEvent(CopyTeamEvent.SHOW_INVITE_VIEW),
                new CopyTeamEvent(CopyTeamEvent.SEND_INVITE),
                new CopyTeamEvent(CopyTeamEvent.HIDE_TRANSFER_PANEL),
                new CopyTeamEvent(CopyTeamEvent.SHOW_TRANSFER_PANEL),
                new CopyTeamEvent(CopyTeamEvent.UPDATE_TEAM_FLOOR),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof CopyTeamEvent) {
                switch (event.type) {
                    case CopyTeamEvent.SHOW_MAIN_PANEL:
                        this.showMainPanel();
                        break;
                    case CopyTeamEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case CopyTeamEvent.SHOW_REWARD_VIEW:
                        this.showRewardView();
                        break;
                    case CopyTeamEvent.SHOW_RANK_VIEW:
                        this.showRankView();
                        break;
                    case CopyTeamEvent.SHOW_TEAMBUILD:
                        this.showTeamList();
                        break;
                    case CopyTeamEvent.CREATE_TEAM_VIEW:
                        this.createTeamView();
                        break;
                    case CopyTeamEvent.LEAVE_TEAM:
                        this.levelTeam();
                        break;
                    case CopyTeamEvent.SET_POS_TEAM:
                        this.setPosTeam(event.data);
                        break;
                    case CopyTeamEvent.APPLY_JOIN_TEAM:
                        this.applyJoinTeam(event.data);
                        break;
                    case CopyTeamEvent.APPLY_TEAM_PANEL:
                        this.showApplyPanel();
                        break;
                    case CopyTeamEvent.AGREED_APPLY:
                        this.agreedApply(event.data);
                        break;
                    case CopyTeamEvent.KICK_OUT_MEMBER:
                        this.kickOutMember(event.data);
                        break;
                    case CopyTeamEvent.TEAM_COPY_BATTLE:
                        this.teamCopyBattle(event.data);
                        break;
                    case CopyTeamEvent.DISEVT_JOIN_TEAM:
                        this.disevtJoinTeam();
                        break;
                    case CopyTeamEvent.DISEVT_EXIT_TEAM:
                        this.disevtExitTeam();
                        break;
                    case CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM:
                        break;
                    case CopyTeamEvent.PLAY_REPORT:
                        this.playReport(event.data);
                        break;
                    case CopyTeamEvent.SHOW_INVITE_VIEW:
                        this.showInviteView();
                        break;
                    case CopyTeamEvent.SEND_INVITE:
                        this.sendInvite(event.data);
                        break;
                    case CopyTeamEvent.HIDE_TRANSFER_PANEL:
                        this.hideTransferPanel();
                        break;
                    case CopyTeamEvent.SHOW_TRANSFER_PANEL:
                        this.showTransferPanel();
                        break;
                    case CopyTeamEvent.UPDATE_TEAM_FLOOR:
                        this.updateTeamFloor();
                        break;
                }
            }
        }

        private showMainPanel() {
            this._thread.requestMyTeamInfo().then(() => {
                if (!this.teamCopyView) {
                    UIMgr.showUI(UIConst.Copy_TeamMainView);
                }
            });
        }
        private showRuleView():void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(40003));
        }
        private showRewardView():void {
            UIMgr.showUI(UIConst.CopyTeamRewardView);
        }
        private showRankView():void {
            UIMgr.showUI(UIConst.CopyTeamRank);
        }

        /** 打开队伍列表界面 */
        private showTeamList(): void {
            // this._thread.requestMyTeamInfo().then(() => {
                if (this._model.hasTeam()) {
                    UIMgr.showUI(UIConst.CopyTeamInfo);
                } else {
                    this._thread.requestTeamList().then(() => {
                        UIMgr.showUI(UIConst.CopyTeamBuild);
                    });
                }
            // });
        }

        /** 创建队伍界面 */
        private createTeamView(): void {
            this._thread.createTeam().then(() => {
                UIMgr.showUI(UIConst.CopyTeamInfo);
            });
        }

        /** 离开队伍 */
        private levelTeam(): void {
            common.AlertBox.showAlert({
                text: "是否要离开队伍?",
                confirmCb: () => {
                    this._thread.leaveTeam().then(() => {
                        UIMgr.showUI(UIConst.CopyTeamBuild);
                    });
                }, parm: null
            });
        }

        private setPosTeam(data) {
            this._thread.swapMember(data).then((succ) => {
                if (this.teamCopyInfoView) {
                    this.teamCopyInfoView.refreshOpt();
                }
            });
        }

        private applyJoinTeam(id) {
            if(!App.IsSysOpen(ModuleConst.TEAM_COPY)){
                let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.TEAM_COPY);
				showToast(tbData.prompt);
				return;
            }
            this._thread.applyJoinTeam(id).then((succ) => {
                if (this.teamCopyInfoView) {
                    this.teamCopyInfoView.refreshOpt();
                }
            });
        }

        private showApplyPanel() {
            this._thread.getApplyList().then((succ) => {
                UIMgr.showUI(UIConst.CopyTeamApply);
            });
        }

        private disevtJoinTeam() {
            showToast(LanMgr.getLan('', 10261,this._model.getLeaderName()));
            if (this.teamCopyView) {
                this.teamCopyView.startTime();
            }
        }

        private disevtExitTeam() {
            if (this.teamCopyView) {
                this.teamCopyView.stopTime();
            }
        }

        private updateTeamFloor(){
            if (this.teamCopyView) {
                this.teamCopyView.delayScroll();
            }
        }


        private agreedApply(data) {
            this._thread.applyOpt(data.playerId, data.state).then((succ) => {
                if (this.teamCopyApplyView) {
                    this.teamCopyApplyView.updateList();
                }
            });
        }
        private kickOutMember(data) {
            common.AlertBox.showAlert({
                text: "确定要将玩家名字踢出队伍吗?",
                confirmCb: () => {
                    this._thread.kickoutMember(data).then((succ) => {
                        if (this.teamCopyInfoView) {
                            this.teamCopyInfoView.refreshOpt();
                        }
                    });
                }, parm: null
            });
        }

        private teamCopyBattle(copyId) {
            let args = {};
            args[Protocol.friend_groupCopy_startBattle.args.id] = copyId;
            PLC.request(Protocol.friend_groupCopy_startBattle, args, ($data) => {
                if (!$data) return;
                //同步关卡状态和进度,需要保证这个时候不会变成没有队伍
                this._model.updateGroupState($data.myGroup);
                this.playReport($data);
            });
        }

        public playReport($data) {
            let copyvo = new FightVo();
            copyvo.copyType = CopyType.teamCopy;
            copyvo.copyTeamFightVo = new CopyTeamFightVo($data.copyFloor, $data.memberInfo);

            let page = new ServerPage();
            page.initPage($data.battleReport.reportData);
            page.result = $data.winCamp == 1 ? playState.VICTORY : playState.FAILURE;//左方胜利就为胜
            copyvo.fightPageControl = page;

            //奖励
            if($data.copyFloor >= this._model.myFloor){
                //有奖励
                let tab = tb.TB_team_copy.getTB_team_copyById($data.copyFloor);
                $data.extReward = tab.getRewardList();
            }

            let enterVo: EnterFightVo = { vo: copyvo, event: new CopyTeamEvent(CopyTeamEvent.SHOW_MAIN_PANEL), responseData: $data };
            dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        }

        private showInviteView() {
            this._thread.requestInviteList().then(() => {
                UIMgr.showUI(UIConst.CopyTeamInvite);
            });
        }

        private sendInvite(playerId){
            this._thread.requestInviteList().then(() => {
                
            });
        }

        private hideTransferPanel(){
            if(this.teamCopyTransferView){
                UIMgr.hideUIByName(UIConst.CopyTeamTransfer);
            }
        }

        private showTransferPanel(){
            if(this._model.getOtherMembers().length <= 0){
                showToast(LanMgr.getLan('', 10262));
                return;
            }
            if(!this.teamCopyTransferView){
                UIMgr.showUI(UIConst.CopyTeamTransfer);
            }
        }

        get teamCopyTransferView(): CopyTeamTransferLeader {
            if (UIMgr.hasStage(UIConst.CopyTeamTransfer)) {
                return UIMgr.getUIByName(UIConst.CopyTeamTransfer);
            }
            return null;
        }

        get teamCopyApplyView(): CopyTeamApply {
            if (UIMgr.hasStage(UIConst.CopyTeamApply)) {
                return UIMgr.getUIByName(UIConst.CopyTeamApply);
            }
            return null;
        }

        get teamCopyInfoView(): CopyTeamInfo {
            if (UIMgr.hasStage(UIConst.CopyTeamInfo)) {
                return UIMgr.getUIByName(UIConst.CopyTeamInfo);
            }
            return null;
        }

        get teamCopyView(): CopyTeamMainView {
            if (UIMgr.hasStage(UIConst.Copy_TeamMainView)) {
                return UIMgr.getUIByName(UIConst.Copy_TeamMainView);
            }
            return null;
        }


    }
}