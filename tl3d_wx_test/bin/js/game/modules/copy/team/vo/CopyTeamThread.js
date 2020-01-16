var game;
(function (game) {
    var CopyTeamThread = /** @class */ (function () {
        function CopyTeamThread() {
            this._applyRefreshTime = 0;
            // --------------------  在线所有队伍列表  --------------------
            this._teamRefreshTime = 0;
            // --------------------  可邀请的在线好友列表  --------------------
            this._inviteRefreshTime = 0;
            this._model = game.CopyTeamModel.getInstance();
        }
        CopyTeamThread.getInstance = function () {
            if (!this._instance) {
                this._instance = new CopyTeamThread();
            }
            return this._instance;
        };
        /** 请求自己队伍信息 */
        CopyTeamThread.prototype.requestMyTeamInfo = function (mask) {
            var _this = this;
            if (mask === void 0) { mask = true; }
            return new Promise(function (resolve, reject) {
                if (!App.IsSysOpen(ModuleConst.TEAM_COPY)) {
                    showToast(LanMgr.getLan('', 10272));
                    return;
                }
                else {
                    PLC.request(Protocol.friend_groupCopy_getGroupInfo, null, function ($data) {
                        if (!$data)
                            return;
                        _this._model.updateTeamInfo($data.myGroup, $data.memberList);
                        if ($data.battleReport) {
                            //有战报
                            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.PLAY_REPORT), $data);
                        }
                        resolve();
                    }, mask);
                }
            });
        };
        /** 创建队伍信息 */
        CopyTeamThread.prototype.createTeam = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_groupCopy_groupCreate, null, function ($data) {
                    if (!$data)
                        return;
                    _this._model.updateTeamInfo($data.myGroup, $data.memberList);
                    resolve();
                });
            });
        };
        /** 离开队伍 */
        CopyTeamThread.prototype.leaveTeam = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_groupCopy_groupExit, null, function ($data) {
                    if (!$data)
                        return;
                    _this._model.updateTeamInfo($data.myGroup, $data.memberList);
                    resolve();
                });
            });
        };
        // --------------------   队长操作 --------------------
        /** 移交队长 */
        CopyTeamThread.prototype.appointCaptain = function (playerId) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_groupAppoint.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_groupAppoint, args, function ($data) {
                    if (!$data)
                        return;
                    // this._model.myTeam.appointMember($data["appointId"]);
                    resolve();
                });
            });
        };
        /** 踢人 */
        CopyTeamThread.prototype.kickoutMember = function (playerID) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_groupKick.args.playerId] = playerID;
                PLC.request(Protocol.friend_groupCopy_groupKick, args, function ($data) {
                    if (!$data)
                        return;
                    _this._model.delMember($data.delMemberId);
                    resolve();
                });
            });
        };
        /** 对换位置 */
        CopyTeamThread.prototype.swapMember = function (startPos) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_setPos.args.src_pos] = startPos;
                args[Protocol.friend_groupCopy_setPos.args.dst_pos] = startPos - 1;
                PLC.request(Protocol.friend_groupCopy_setPos, args, function ($data) {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    _this._model.swapMember($data.setPos);
                    resolve();
                });
            });
        };
        /** 申请加入队伍 */
        CopyTeamThread.prototype.applyJoinTeam = function (id) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_groupJoin.args.groupId] = id;
                PLC.request(Protocol.friend_groupCopy_groupJoin, args, function ($data) {
                    if (!$data) {
                        resolve(false);
                        return;
                    }
                    showToast(LanMgr.getLan('', 10273));
                });
            });
        };
        /** 申请列表 */
        CopyTeamThread.prototype.getApplyList = function (refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return new Promise(function (resolve, reject) {
                // 刷新太频繁
                if (!_this._model.hasTeam()) {
                    return;
                }
                if (refresh && _this._applyRefreshTime > 0 && (App.serverTime - _this._applyRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_groupCopy_getApplyList, null, function ($data) {
                    if (!$data) {
                        return;
                    }
                    if (refresh) {
                        _this._applyRefreshTime = App.serverTime;
                    }
                    _this._model.setApplyList($data.applyList);
                    resolve();
                });
            });
        };
        /** 请求队伍列表信息 */
        CopyTeamThread.prototype.requestTeamList = function (refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return new Promise(function (resolve, reject) {
                // 刷新太频繁
                if (refresh && _this._teamRefreshTime > 0 && (App.serverTime - _this._teamRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_groupCopy_groupList, null, function ($data) {
                    if (!$data)
                        return;
                    if (refresh) {
                        _this._teamRefreshTime = App.serverTime;
                    }
                    _this._model.setTeamList($data.groupList);
                    resolve();
                });
            });
        };
        /** 获取邀请好友列表 */
        CopyTeamThread.prototype.requestInviteList = function (refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return new Promise(function (resolve, reject) {
                // 刷新太频繁
                if (refresh && _this._inviteRefreshTime > 0 && (App.serverTime - _this._inviteRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_groupCopy_inviteList, null, function ($data) {
                    if (!$data)
                        return;
                    if (refresh) {
                        _this._inviteRefreshTime = App.serverTime;
                    }
                    _this._model.setInviteList($data.inviteList);
                    resolve();
                });
            });
        };
        /** 邀请好友 */
        CopyTeamThread.prototype.inviteFriend = function (playerId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this._model.memberList || _this._model.memberList.length == 0) {
                    showToast(LanMgr.getLan("", 10274));
                    return;
                }
                if (_this._model.memberList.length >= 3) {
                    showToast(LanMgr.getLan("", 10275));
                    return;
                }
                var args = {};
                args[Protocol.friend_groupCopy_inviteFriend.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_inviteFriend, args, function ($data) {
                    if (!$data)
                        return;
                    resolve();
                });
            });
        };
        // --------------------   好友邀请组队 --------------------
        /** 显示邀请入队界面 */
        CopyTeamThread.prototype.showInviteJoinView = function () {
            PLC.request(Protocol.friend_groupCopy_getInviteList, null, function ($data) {
                if (!$data)
                    return;
                if (UIMgr.hasStage(UIConst.FightViews))
                    return;
                var list = $data.inviteInfo ? $data.inviteInfo : [];
                if (list.length == 0)
                    return;
                var lastInfo = list.pop();
                if (UIMgr.hasStage(UIConst.CopyTeamInviteJoinView)) {
                    var view = UIMgr.getUIByName(UIConst.CopyTeamInviteJoinView);
                    view.dataSource = lastInfo;
                    view.initView();
                }
                else {
                    UIMgr.showUI(UIConst.CopyTeamInviteJoinView, lastInfo);
                }
            });
        };
        /** 加入好友队伍 */
        CopyTeamThread.prototype.joinInvite = function (playerId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_acceptInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_acceptInvite, args, function ($data) {
                    if (!$data)
                        return;
                    _this.requestMyTeamInfo().then(function () {
                        resolve();
                    });
                });
            });
        };
        /** 拒绝加入好友队伍 */
        CopyTeamThread.prototype.refuseInvite = function (playerId) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_refuseInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_groupCopy_refuseInvite, args, function ($data) {
                    if (!$data)
                        return;
                    resolve();
                });
            });
        };
        /** 今天拒绝加入某好友队伍 */
        CopyTeamThread.prototype.todayRefuseJoin = function (playerId, state) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_groupCopy_setInvite.args.playerId] = playerId;
                args[Protocol.friend_groupCopy_setInvite.args.state] = state;
                PLC.request(Protocol.friend_groupCopy_setInvite, args, function ($data) {
                    if (!$data)
                        return;
                    var state = $data['setInvite'][playerId];
                    resolve(state);
                });
            });
        };
        /** 提示被拒绝 */
        CopyTeamThread.prototype.noticeRefuse = function () {
            PLC.request(Protocol.friend_groupCopy_getRefuseInviteList, null, function ($data) {
                if (!$data)
                    return;
                var list = $data.refuseInviteList ? $data.refuseInviteList : [];
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var name_1 = list_1[_i];
                    showToast(LanMgr.getLan("", 10276, name_1));
                }
            });
        };
        /** 申请操作 */
        CopyTeamThread.prototype.applyOpt = function (playerId, state) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                if (playerId) {
                    args[Protocol.friend_groupCopy_applyListOpt.args.playerId] = playerId;
                }
                args[Protocol.friend_groupCopy_applyListOpt.args.opt_type] = state;
                PLC.request(Protocol.friend_groupCopy_applyListOpt, args, function ($data) {
                    if (!$data) {
                        return;
                    }
                    _this._model.clearApplyList($data.delApplyList);
                    if ($data.memberList) {
                        _this._model.updateMemberList($data.memberList);
                    }
                    resolve();
                });
            });
        };
        return CopyTeamThread;
    }());
    game.CopyTeamThread = CopyTeamThread;
})(game || (game = {}));
