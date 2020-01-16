var game;
(function (game) {
    var GodDmThread = /** @class */ (function () {
        function GodDmThread() {
            // --------------------  在线所有队伍列表  --------------------
            this._teamRefreshTime = 0;
            // --------------------  可邀请的在线好友列表  --------------------
            this._inviteRefreshTime = 0;
            this._model = game.GodDomainModel.getInstance();
        }
        GodDmThread.getInstance = function () {
            if (!this._instance) {
                this._instance = new GodDmThread();
            }
            return this._instance;
        };
        /** 请求自己队伍信息 */
        GodDmThread.prototype.requestMyTeamInfo = function (mask) {
            var _this = this;
            if (mask === void 0) { mask = true; }
            return new Promise(function (resolve, reject) {
                if (!App.IsSysOpen(ModuleConst.GOD_DOMAIN)) {
                    resolve();
                }
                else {
                    PLC.request(Protocol.friend_group_getGroupInfo, null, function ($data) {
                        if (!$data)
                            return;
                        _this._model.updateTeamInfo($data['myGroup'], $data['memberList']);
                        resolve();
                    }, mask);
                }
            });
        };
        /** 创建队伍信息 */
        GodDmThread.prototype.createTeam = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_group_groupCreate, null, function ($data) {
                    if (!$data)
                        return;
                    var model = _this._model;
                    model.updateTeamInfo($data['myGroup'], $data['memberList']);
                    model.oneKeyInviteCd = 0;
                    resolve();
                });
            });
        };
        /** 离开队伍 */
        GodDmThread.prototype.leaveTeam = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_group_groupExit, null, function ($data) {
                    if (!$data)
                        return;
                    _this._model.updateTeamInfo($data['myGroup'], $data['memberList']);
                    resolve();
                });
            });
        };
        /** 队员：改变准备状态 */
        GodDmThread.prototype.changePrepareState = function (info, state) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_setState.args.state] = state;
                PLC.request(Protocol.friend_group_setState, args, function ($data) {
                    if (!$data)
                        return;
                    if (info.isExist()) {
                        info.svo.readyTime = $data["readyTime"];
                        info.svo.state = $data["setState"];
                    }
                    resolve();
                });
            });
        };
        // --------------------   队长操作 --------------------
        /** 改变队伍是否可以自动加入 */
        GodDmThread.prototype.changeJoinState = function (autoJoin) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_setJoin.args.autoJoin] = autoJoin;
                PLC.request(Protocol.friend_group_setJoin, args, function ($data) {
                    if (!$data)
                        return;
                    _this._model.myTeam.autoJoin = $data['autoJoin'];
                    resolve();
                });
            });
        };
        /** 移交队长 */
        GodDmThread.prototype.appointCaptain = function (info) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_groupAppoint.args.playerId] = info.svo.playerId;
                PLC.request(Protocol.friend_group_groupAppoint, args, function ($data) {
                    if (!$data)
                        return;
                    _this._model.myTeam.appointMember($data["appointId"]);
                    var view = UIMgr.getUIByName(UIConst.GodDm_TeamView);
                    view.updateView();
                    view.checkState();
                    resolve();
                });
            });
        };
        /** 踢人 */
        GodDmThread.prototype.kickoutMember = function (info) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_groupKick.args.playerId] = info.svo.playerId;
                PLC.request(Protocol.friend_group_groupKick, args, function ($data) {
                    if (!$data)
                        return;
                    _this._model.myTeam.removeMember($data["delMemberId"]);
                    var view = UIMgr.getUIByName(UIConst.GodDm_TeamView);
                    view.updateView();
                    resolve();
                });
            });
        };
        /** 对换位置 */
        GodDmThread.prototype.swapMember = function (source, target) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_setPos.args.src_pos] = source.pos;
                args[Protocol.friend_group_setPos.args.dst_pos] = target.pos;
                PLC.request(Protocol.friend_group_setPos, args, function ($data) {
                    if (!$data) {
                        resolve();
                        return;
                    }
                    _this._model.myTeam.swapMember(source, target);
                    resolve();
                });
            });
        };
        /** 一键邀请 */
        GodDmThread.prototype.oneKeyInvite = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_group_oneKeyInvite, null, function ($data) {
                    if (!$data)
                        return;
                    var instance = _this._model;
                    instance.myTeam.updateData($data['memberList']);
                    instance.oneKeyInviteCd = $data['oneKeyInviteCd'];
                    resolve();
                });
            });
        };
        /** 请求队伍列表信息 */
        GodDmThread.prototype.requestTeamList = function (refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return new Promise(function (resolve, reject) {
                // 刷新太频繁
                if (refresh && _this._teamRefreshTime > 0 && (App.serverTime - _this._teamRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_group_groupList, null, function ($data) {
                    if (!$data)
                        return;
                    if (refresh) {
                        _this._teamRefreshTime = App.serverTime;
                    }
                    _this._model.setTeamList($data['groupList']);
                    resolve();
                });
            });
        };
        /** 加入队伍 */
        GodDmThread.prototype.joinTeam = function (info) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_groupJoin.args.groupId] = info.svo.groupId;
                PLC.request(Protocol.friend_group_groupJoin, args, function ($data) {
                    if (!$data) {
                        resolve(false);
                        return;
                    }
                    var instance = _this._model;
                    instance.updateTeamInfo($data['myGroup'], $data['memberList']);
                    if (instance.hasTeam()) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            });
        };
        /** 获取邀请好友列表 */
        GodDmThread.prototype.requestInviteList = function (refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return new Promise(function (resolve, reject) {
                // 刷新太频繁
                if (refresh && _this._inviteRefreshTime > 0 && (App.serverTime - _this._inviteRefreshTime < 1000)) {
                    showToast(LanMgr.getLan("", 11015));
                    return;
                }
                PLC.request(Protocol.friend_group_inviteList, null, function ($data) {
                    if (!$data)
                        return;
                    if (refresh) {
                        _this._inviteRefreshTime = App.serverTime;
                    }
                    _this._model.setInviteList($data['inviteList']);
                    resolve();
                });
            });
        };
        /** 邀请好友 */
        GodDmThread.prototype.inviteFriend = function (info) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var instance = _this._model;
                if (instance.myTeam.getMemberByUId(info.svo.playerId)) {
                    showToast(LanMgr.getLan("", 10383));
                    resolve();
                    return;
                }
                if (instance.myTeam.getMemberCount() >= 3) {
                    showToast(LanMgr.getLan("", 10384));
                    resolve();
                    return;
                }
                var args = {};
                args[Protocol.friend_group_inviteFriend.args.playerId] = info.svo.playerId;
                PLC.request(Protocol.friend_group_inviteFriend, args, function ($data) {
                    if (!$data)
                        return;
                    info.svo.inviteTime = App.serverTimeSecond;
                    resolve();
                });
            });
        };
        // --------------------   组队匹配 --------------------
        /** 展示队伍匹配界面 */
        GodDmThread.prototype.showTeamMatchView = function () {
            var myTeam = this._model.myTeam;
            if (myTeam.getMemberCount() < 3) {
                showToast(LanMgr.getLan("", 10385));
                return;
            }
            if (!myTeam.isAllReady()) {
                showToast(LanMgr.getLan("", 10386));
                return;
            }
            this.startMatch().then(function () {
                UIMgr.showUI(UIConst.GodDm_TeamMatchView);
                if (UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                    var view = UIMgr.getUIByName(UIConst.GodDm_TeamView);
                    view.stopTimeTick();
                }
            });
        };
        /** 开始匹配 */
        GodDmThread.prototype.startMatch = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_group_startBattle, null, function ($data) {
                    if (!$data)
                        return;
                    _this._model.myTeam.regTime = $data['regTime'];
                    resolve();
                });
            });
        };
        /** 取消匹配 */
        GodDmThread.prototype.cancelMatch = function (info) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var model = _this._model;
                var args = {};
                args[Protocol.friend_group_cancelReg.args.regTime] = model.myTeam.regTime;
                PLC.request(Protocol.friend_group_cancelReg, args, function ($data) {
                    if (!$data)
                        return;
                    // 取消匹配时，如果有战报了不能取消，要播放战报
                    if ($data.battleReport) {
                        resolve($data);
                    }
                    else {
                        var myTeam = model.myTeam;
                        myTeam.regTime = 0;
                        if (!info.isCaptain()) {
                            info.svo.readyTime = $data["readyTime"];
                            info.svo.state = $data["setState"];
                        }
                        resolve($data);
                    }
                });
            });
        };
        /** 离开组队界面弹窗 */
        GodDmThread.prototype.leaveViewAlert = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // 激战神域在组队过程中离开界面需要弹出确认框
                if (UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                    common.AlertBox.showAlert({
                        text: LanMgr.getLan("", 10481),
                        confirmCb: function () {
                            _this.leaveTeam().then(function () {
                                UIMgr.hideUIByName(UIConst.GodDm_TeamView);
                                resolve();
                            });
                        }, parm: null
                    });
                }
                else {
                    resolve();
                }
            });
        };
        // --------------------   个人自动匹配 --------------------
        /** 自动匹配 */
        GodDmThread.prototype.autoMatch = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_group_autoJoin, null, function ($data) {
                    if (!$data)
                        return;
                    _this._model.matchTime = $data['matchTime'];
                    resolve();
                });
            });
        };
        /** 取消自动匹配 */
        GodDmThread.prototype.cancelAutoMatch = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                PLC.request(Protocol.friend_group_cancelJoin, null, function ($data) {
                    if (!$data)
                        return;
                    var instance = _this._model;
                    instance.matchTime = 0;
                    if ($data.hasOwnProperty("myGroup")) {
                        instance.updateTeamInfo($data['myGroup'], $data['memberList']);
                    }
                    resolve();
                });
            });
        };
        // --------------------   好友邀请组队 --------------------
        /** 显示邀请入队界面 */
        GodDmThread.prototype.showInviteJoinView = function () {
            PLC.request(Protocol.friend_group_getInviteList, null, function ($data) {
                if (!$data)
                    return;
                if (UIMgr.hasStage(UIConst.FightViews))
                    return;
                var list = $data["inviteInfo"] ? $data["inviteInfo"] : [];
                if (list.length == 0)
                    return;
                var lastInfo = list[list.length - 1];
                if (UIMgr.hasStage(UIConst.GodDm_InviteJoinView)) {
                    var view = UIMgr.getUIByName(UIConst.GodDm_InviteJoinView);
                    view.dataSource = lastInfo;
                    view.initView();
                }
                else {
                    UIMgr.showUI(UIConst.GodDm_InviteJoinView, lastInfo);
                }
            });
        };
        /** 加入好友队伍 */
        GodDmThread.prototype.joinInvite = function (playerId) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_acceptInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_group_acceptInvite, args, function ($data) {
                    if (!$data)
                        return;
                    resolve();
                });
            });
        };
        /** 拒绝加入好友队伍 */
        GodDmThread.prototype.refuseInvite = function (playerId) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_refuseInvite.args.playerId] = playerId;
                PLC.request(Protocol.friend_group_refuseInvite, args, function ($data) {
                    if (!$data)
                        return;
                    // refuseInviteId
                    resolve();
                });
            });
        };
        /** 今天拒绝加入某好友队伍 */
        GodDmThread.prototype.todayRefuseJoin = function (playerId, state) {
            return new Promise(function (resolve, reject) {
                var args = {};
                args[Protocol.friend_group_setInvite.args.playerId] = playerId;
                args[Protocol.friend_group_setInvite.args.state] = state;
                PLC.request(Protocol.friend_group_setInvite, args, function ($data) {
                    if (!$data)
                        return;
                    var state = $data['setInvite'][playerId];
                    resolve(state);
                });
            });
        };
        /** 提示被拒绝 */
        GodDmThread.prototype.noticeRefuse = function () {
            PLC.request(Protocol.friend_group_getRefuseInviteList, null, function ($data) {
                if (!$data)
                    return;
                var list = $data["refuseInviteList"] ? $data["refuseInviteList"] : [];
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var name_1 = list_1[_i];
                    showToast(LanMgr.getLan("", 10276, name_1));
                }
            });
        };
        return GodDmThread;
    }());
    game.GodDmThread = GodDmThread;
})(game || (game = {}));
