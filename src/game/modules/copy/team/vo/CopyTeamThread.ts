

module game {

    export class CopyTeamThread {

        private _model: CopyTeamModel;
        constructor() {
            this._model = CopyTeamModel.getInstance();
        }
        private static _instance: CopyTeamThread;
        public static getInstance(): CopyTeamThread {
            if (!this._instance) {
                this._instance = new CopyTeamThread();
            }
            return this._instance;
        }

        /** 请求自己队伍信息 */
        requestMyTeamInfo(mask: boolean = true): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!App.IsSysOpen(ModuleConst.TEAM_COPY)) {
                    showToast(LanMgr.getLan('', 10272));
                    return;
                } else {
                    PLC.request(Protocol.friend_groupCopy_getGroupInfo, null, ($data) => {
                        if (!$data) return;
                        this._model.updateTeamInfo($data.myGroup, $data.memberList);

                        if ($data.battleReport) {
                            //有战报
                            dispatchEvt(new CopyTeamEvent(CopyTeamEvent.PLAY_REPORT), $data);
                        }

                        resolve();
                    }, mask);
                }
            });
        }

        /** 创建队伍信息 */
        createTeam(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_groupCopy_groupCreate, null, ($data) => {
                    if (!$data) return;
                    this._model.updateTeamInfo($data.myGroup, $data.memberList);
                    resolve();
                });
            });
        }
        /** 离开队伍 */
        leaveTeam(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                PLC.request(Protocol.friend_groupCopy_groupExit, null, ($data) => {
                    if (!$data) return;
                    this._model.updateTeamInfo($data.myGroup, $data.memberList);
                    resolve();
                });
            });
        }

        // --------------------   队长操作 --------------------
        /** 移交队长 */
        appointCaptain(playerId: String): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_groupAppoint.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_groupAppoint, args, ($data) => {
                    if (!$data) return;
                    // this._model.myTeam.appointMember($data["appointId"]);
                    resolve();
                });
            });
        }
        /** 踢人 */
        kickoutMember(playerID: string): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_groupKick.args.playerId] = playerID;
                PLC.request(Protocol.friend_groupCopy_groupKick, args, ($data) => {
                    if (!$data) return;
                    this._model.delMember($data.delMemberId);
                    resolve();
                });
            });
        }
        /** 对换位置 */
        swapMember(startPos: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_setPos.args.src_pos] = startPos;
                args[Protocol.friend_groupCopy_setPos.args.dst_pos] = startPos - 1;
                PLC.request(Protocol.friend_groupCopy_setPos, args, ($data) => {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    this._model.swapMember($data.setPos);
                    resolve();
                });
            });
        }

        /** 申请加入队伍 */
        applyJoinTeam(id): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_groupJoin.args.groupId] = id;
                PLC.request(Protocol.friend_groupCopy_groupJoin, args, ($data) => {
                    if (!$data) {
                        resolve(false);
                        return;
                    }
                    showToast(LanMgr.getLan('', 10273));
                });
            });
        }

        private _applyRefreshTime: number = 0;
        /** 申请列表 */
        getApplyList(refresh: boolean = false): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // 刷新太频繁
                if (!this._model.hasTeam()) {
                    return;
                }
                if (refresh && this._applyRefreshTime > 0 && (App.serverTime - this._applyRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_groupCopy_getApplyList, null, ($data) => {
                    if (!$data) {
                        return;
                    }
                    if (refresh) {
                        this._applyRefreshTime = App.serverTime;
                    }
                    this._model.setApplyList($data.applyList);
                    resolve();
                });
            });
        }


        // --------------------  在线所有队伍列表  --------------------
        private _teamRefreshTime: number = 0;
        /** 请求队伍列表信息 */
        requestTeamList(refresh: boolean = false): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // 刷新太频繁
                if (refresh && this._teamRefreshTime > 0 && (App.serverTime - this._teamRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_groupCopy_groupList, null, ($data) => {
                    if (!$data) return;
                    if (refresh) {
                        this._teamRefreshTime = App.serverTime;
                    }
                    this._model.setTeamList($data.groupList);
                    resolve();
                });
            });
        }

        // --------------------  可邀请的在线好友列表  --------------------
        private _inviteRefreshTime: number = 0;
        /** 获取邀请好友列表 */
        requestInviteList(refresh: boolean = false): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // 刷新太频繁
                if (refresh && this._inviteRefreshTime > 0 && (App.serverTime - this._inviteRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_groupCopy_inviteList, null, ($data) => {
                    if (!$data) return;
                    if (refresh) {
                        this._inviteRefreshTime = App.serverTime;
                    }
                    this._model.setInviteList($data.inviteList);
                    resolve();
                });
            });
        }
        /** 邀请好友 */
        inviteFriend(playerId: string): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!this._model.memberList || this._model.memberList.length == 0) {
                    showToast(LanMgr.getLan("", 10274));
                    return;
                }
                if (this._model.memberList.length >= 3) {
                    showToast(LanMgr.getLan("", 10275));
                    return;
                }
                let args = {};
                args[Protocol.friend_groupCopy_inviteFriend.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_inviteFriend, args, ($data) => {
                    if (!$data) return;
                    resolve();
                });
            });
        }


        // --------------------   好友邀请组队 --------------------
        /** 显示邀请入队界面 */
        showInviteJoinView(): void {
            PLC.request(Protocol.friend_groupCopy_getInviteList, null, ($data) => {
                if (!$data) return;
                if (UIMgr.hasStage(UIConst.FightViews)) return;
                let list: any[] = $data.inviteInfo ? $data.inviteInfo : [];
                if (list.length == 0) return;
                let lastInfo = list.pop();
                if (UIMgr.hasStage(UIConst.CopyTeamInviteJoinView)) {
                    let view = UIMgr.getUIByName(UIConst.CopyTeamInviteJoinView) as CopyTeamInviteJoinView;
                    view.dataSource = lastInfo;
                    view.initView();
                } else {
                    UIMgr.showUI(UIConst.CopyTeamInviteJoinView, lastInfo);
                }
            });
        }
        /** 加入好友队伍 */
        joinInvite(playerId: string): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_acceptInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_acceptInvite, args, ($data) => {
                    if (!$data) return;

                    this.requestMyTeamInfo().then(() => {
                        resolve();
                    });
                });
            });
        }

        /** 拒绝加入好友队伍 */
        refuseInvite(playerId: string): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_refuseInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_refuseInvite, args, ($data) => {
                    if (!$data) return;
                    resolve();
                });
            });
        }
        /** 今天拒绝加入某好友队伍 */
        todayRefuseJoin(playerId: string, state: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                args[Protocol.friend_groupCopy_setInvite.args.playerId] = playerId;
                args[Protocol.friend_groupCopy_setInvite.args.state] = state;
                PLC.request(Protocol.friend_groupCopy_setInvite, args, ($data) => {
                    if (!$data) return;
                    let state = $data['setInvite'][playerId];
                    resolve(state);
                });
            });
        }
        /** 提示被拒绝 */
        noticeRefuse(): void {
            PLC.request(Protocol.friend_groupCopy_getRefuseInviteList, null, ($data) => {
                if (!$data) return;
                let list: any[] = $data.refuseInviteList ? $data.refuseInviteList : [];
                for (let name of list) {
                    showToast(LanMgr.getLan("", 10276,name));
                }
            });
        }

        /** 申请操作 */
        applyOpt(playerId: string, state: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let args = {};
                if (playerId) {
                    args[Protocol.friend_groupCopy_applyListOpt.args.playerId] = playerId;
                }
                args[Protocol.friend_groupCopy_applyListOpt.args.opt_type] = state;
                PLC.request(Protocol.friend_groupCopy_applyListOpt, args, ($data) => {
                    if (!$data) {
                        return;
                    }
                    this._model.clearApplyList($data.delApplyList);
                    if ($data.memberList) {
                        this._model.updateMemberList($data.memberList);
                    }

                    resolve();
                });
            });
        }


    }
}