var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /*
    * CopyTeamProcessor
    */
    var CopyTeamProcessor = /** @class */ (function (_super) {
        __extends(CopyTeamProcessor, _super);
        function CopyTeamProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.CopyTeamModel.getInstance();
            _this._thread = game.CopyTeamThread.getInstance();
            return _this;
        }
        CopyTeamProcessor.prototype.getName = function () {
            return "CopyTeamProcessor";
        };
        //监听事件
        CopyTeamProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_MAIN_PANEL),
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_RULE_VIEW),
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_REWARD_VIEW),
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_RANK_VIEW),
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_TEAMBUILD),
                new game.CopyTeamEvent(game.CopyTeamEvent.CREATE_TEAM_VIEW),
                new game.CopyTeamEvent(game.CopyTeamEvent.LEAVE_TEAM),
                new game.CopyTeamEvent(game.CopyTeamEvent.SET_POS_TEAM),
                new game.CopyTeamEvent(game.CopyTeamEvent.APPLY_JOIN_TEAM),
                new game.CopyTeamEvent(game.CopyTeamEvent.APPLY_TEAM_PANEL),
                new game.CopyTeamEvent(game.CopyTeamEvent.KICK_OUT_MEMBER),
                new game.CopyTeamEvent(game.CopyTeamEvent.AGREED_APPLY),
                new game.CopyTeamEvent(game.CopyTeamEvent.TEAM_COPY_BATTLE),
                new game.CopyTeamEvent(game.CopyTeamEvent.DISEVT_JOIN_TEAM),
                new game.CopyTeamEvent(game.CopyTeamEvent.DISEVT_EXIT_TEAM),
                new game.CopyTeamEvent(game.CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM),
                new game.CopyTeamEvent(game.CopyTeamEvent.PLAY_REPORT),
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_INVITE_VIEW),
                new game.CopyTeamEvent(game.CopyTeamEvent.SEND_INVITE),
                new game.CopyTeamEvent(game.CopyTeamEvent.HIDE_TRANSFER_PANEL),
                new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_TRANSFER_PANEL),
                new game.CopyTeamEvent(game.CopyTeamEvent.UPDATE_TEAM_FLOOR),
            ];
        };
        //处理事件
        CopyTeamProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.CopyTeamEvent) {
                switch (event.type) {
                    case game.CopyTeamEvent.SHOW_MAIN_PANEL:
                        this.showMainPanel();
                        break;
                    case game.CopyTeamEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case game.CopyTeamEvent.SHOW_REWARD_VIEW:
                        this.showRewardView();
                        break;
                    case game.CopyTeamEvent.SHOW_RANK_VIEW:
                        this.showRankView();
                        break;
                    case game.CopyTeamEvent.SHOW_TEAMBUILD:
                        this.showTeamList();
                        break;
                    case game.CopyTeamEvent.CREATE_TEAM_VIEW:
                        this.createTeamView();
                        break;
                    case game.CopyTeamEvent.LEAVE_TEAM:
                        this.levelTeam();
                        break;
                    case game.CopyTeamEvent.SET_POS_TEAM:
                        this.setPosTeam(event.data);
                        break;
                    case game.CopyTeamEvent.APPLY_JOIN_TEAM:
                        this.applyJoinTeam(event.data);
                        break;
                    case game.CopyTeamEvent.APPLY_TEAM_PANEL:
                        this.showApplyPanel();
                        break;
                    case game.CopyTeamEvent.AGREED_APPLY:
                        this.agreedApply(event.data);
                        break;
                    case game.CopyTeamEvent.KICK_OUT_MEMBER:
                        this.kickOutMember(event.data);
                        break;
                    case game.CopyTeamEvent.TEAM_COPY_BATTLE:
                        this.teamCopyBattle(event.data);
                        break;
                    case game.CopyTeamEvent.DISEVT_JOIN_TEAM:
                        this.disevtJoinTeam();
                        break;
                    case game.CopyTeamEvent.DISEVT_EXIT_TEAM:
                        this.disevtExitTeam();
                        break;
                    case game.CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM:
                        break;
                    case game.CopyTeamEvent.PLAY_REPORT:
                        this.playReport(event.data);
                        break;
                    case game.CopyTeamEvent.SHOW_INVITE_VIEW:
                        this.showInviteView();
                        break;
                    case game.CopyTeamEvent.SEND_INVITE:
                        this.sendInvite(event.data);
                        break;
                    case game.CopyTeamEvent.HIDE_TRANSFER_PANEL:
                        this.hideTransferPanel();
                        break;
                    case game.CopyTeamEvent.SHOW_TRANSFER_PANEL:
                        this.showTransferPanel();
                        break;
                    case game.CopyTeamEvent.UPDATE_TEAM_FLOOR:
                        this.updateTeamFloor();
                        break;
                }
            }
        };
        CopyTeamProcessor.prototype.showMainPanel = function () {
            var _this = this;
            this._thread.requestMyTeamInfo().then(function () {
                if (!_this.teamCopyView) {
                    UIMgr.showUI(UIConst.Copy_TeamMainView);
                }
            });
        };
        CopyTeamProcessor.prototype.showRuleView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(40003));
        };
        CopyTeamProcessor.prototype.showRewardView = function () {
            UIMgr.showUI(UIConst.CopyTeamRewardView);
        };
        CopyTeamProcessor.prototype.showRankView = function () {
            UIMgr.showUI(UIConst.CopyTeamRank);
        };
        /** 打开队伍列表界面 */
        CopyTeamProcessor.prototype.showTeamList = function () {
            // this._thread.requestMyTeamInfo().then(() => {
            if (this._model.hasTeam()) {
                UIMgr.showUI(UIConst.CopyTeamInfo);
            }
            else {
                this._thread.requestTeamList().then(function () {
                    UIMgr.showUI(UIConst.CopyTeamBuild);
                });
            }
            // });
        };
        /** 创建队伍界面 */
        CopyTeamProcessor.prototype.createTeamView = function () {
            this._thread.createTeam().then(function () {
                UIMgr.showUI(UIConst.CopyTeamInfo);
            });
        };
        /** 离开队伍 */
        CopyTeamProcessor.prototype.levelTeam = function () {
            var _this = this;
            common.AlertBox.showAlert({
                text: "是否要离开队伍?",
                confirmCb: function () {
                    _this._thread.leaveTeam().then(function () {
                        UIMgr.showUI(UIConst.CopyTeamBuild);
                    });
                }, parm: null
            });
        };
        CopyTeamProcessor.prototype.setPosTeam = function (data) {
            var _this = this;
            this._thread.swapMember(data).then(function (succ) {
                if (_this.teamCopyInfoView) {
                    _this.teamCopyInfoView.refreshOpt();
                }
            });
        };
        CopyTeamProcessor.prototype.applyJoinTeam = function (id) {
            var _this = this;
            if (!App.IsSysOpen(ModuleConst.TEAM_COPY)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.TEAM_COPY);
                showToast(tbData.prompt);
                return;
            }
            this._thread.applyJoinTeam(id).then(function (succ) {
                if (_this.teamCopyInfoView) {
                    _this.teamCopyInfoView.refreshOpt();
                }
            });
        };
        CopyTeamProcessor.prototype.showApplyPanel = function () {
            this._thread.getApplyList().then(function (succ) {
                UIMgr.showUI(UIConst.CopyTeamApply);
            });
        };
        CopyTeamProcessor.prototype.disevtJoinTeam = function () {
            showToast(LanMgr.getLan('', 10261, this._model.getLeaderName()));
            if (this.teamCopyView) {
                this.teamCopyView.startTime();
            }
        };
        CopyTeamProcessor.prototype.disevtExitTeam = function () {
            if (this.teamCopyView) {
                this.teamCopyView.stopTime();
            }
        };
        CopyTeamProcessor.prototype.updateTeamFloor = function () {
            if (this.teamCopyView) {
                this.teamCopyView.delayScroll();
            }
        };
        CopyTeamProcessor.prototype.agreedApply = function (data) {
            var _this = this;
            this._thread.applyOpt(data.playerId, data.state).then(function (succ) {
                if (_this.teamCopyApplyView) {
                    _this.teamCopyApplyView.updateList();
                }
            });
        };
        CopyTeamProcessor.prototype.kickOutMember = function (data) {
            var _this = this;
            common.AlertBox.showAlert({
                text: "确定要将玩家名字踢出队伍吗?",
                confirmCb: function () {
                    _this._thread.kickoutMember(data).then(function (succ) {
                        if (_this.teamCopyInfoView) {
                            _this.teamCopyInfoView.refreshOpt();
                        }
                    });
                }, parm: null
            });
        };
        CopyTeamProcessor.prototype.teamCopyBattle = function (copyId) {
            var _this = this;
            var args = {};
            args[Protocol.friend_groupCopy_startBattle.args.id] = copyId;
            PLC.request(Protocol.friend_groupCopy_startBattle, args, function ($data) {
                if (!$data)
                    return;
                //同步关卡状态和进度,需要保证这个时候不会变成没有队伍
                _this._model.updateGroupState($data.myGroup);
                _this.playReport($data);
            });
        };
        CopyTeamProcessor.prototype.playReport = function ($data) {
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.teamCopy;
            copyvo.copyTeamFightVo = new game.CopyTeamFightVo($data.copyFloor, $data.memberInfo);
            var page = new game.ServerPage();
            page.initPage($data.battleReport.reportData);
            page.result = $data.winCamp == 1 ? playState.VICTORY : playState.FAILURE; //左方胜利就为胜
            copyvo.fightPageControl = page;
            //奖励
            if ($data.copyFloor >= this._model.myFloor) {
                //有奖励
                var tab = tb.TB_team_copy.getTB_team_copyById($data.copyFloor);
                $data.extReward = tab.getRewardList();
            }
            var enterVo = { vo: copyvo, event: new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_MAIN_PANEL), responseData: $data };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        CopyTeamProcessor.prototype.showInviteView = function () {
            this._thread.requestInviteList().then(function () {
                UIMgr.showUI(UIConst.CopyTeamInvite);
            });
        };
        CopyTeamProcessor.prototype.sendInvite = function (playerId) {
            this._thread.requestInviteList().then(function () {
            });
        };
        CopyTeamProcessor.prototype.hideTransferPanel = function () {
            if (this.teamCopyTransferView) {
                UIMgr.hideUIByName(UIConst.CopyTeamTransfer);
            }
        };
        CopyTeamProcessor.prototype.showTransferPanel = function () {
            if (this._model.getOtherMembers().length <= 0) {
                showToast(LanMgr.getLan('', 10262));
                return;
            }
            if (!this.teamCopyTransferView) {
                UIMgr.showUI(UIConst.CopyTeamTransfer);
            }
        };
        Object.defineProperty(CopyTeamProcessor.prototype, "teamCopyTransferView", {
            get: function () {
                if (UIMgr.hasStage(UIConst.CopyTeamTransfer)) {
                    return UIMgr.getUIByName(UIConst.CopyTeamTransfer);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyTeamProcessor.prototype, "teamCopyApplyView", {
            get: function () {
                if (UIMgr.hasStage(UIConst.CopyTeamApply)) {
                    return UIMgr.getUIByName(UIConst.CopyTeamApply);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyTeamProcessor.prototype, "teamCopyInfoView", {
            get: function () {
                if (UIMgr.hasStage(UIConst.CopyTeamInfo)) {
                    return UIMgr.getUIByName(UIConst.CopyTeamInfo);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CopyTeamProcessor.prototype, "teamCopyView", {
            get: function () {
                if (UIMgr.hasStage(UIConst.Copy_TeamMainView)) {
                    return UIMgr.getUIByName(UIConst.Copy_TeamMainView);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return CopyTeamProcessor;
    }(tl3d.Processor));
    game.CopyTeamProcessor = CopyTeamProcessor;
})(game || (game = {}));
