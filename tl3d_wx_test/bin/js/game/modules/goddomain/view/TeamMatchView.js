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
    /** 队伍匹配界面 */
    var TeamMatchView = /** @class */ (function (_super) {
        __extends(TeamMatchView, _super);
        function TeamMatchView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            return _this;
        }
        TeamMatchView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.GodDomainModel.getInstance();
            this.memberList.renderHandler = new Handler(this, this.itemRender);
        };
        TeamMatchView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TeamMatchView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnCancel.disabled = false;
            this.memberList.array = null;
            this.btnCancel.off(Laya.Event.CLICK, this, this.onCancel);
            Laya.timer.clearAll(this);
        };
        TeamMatchView.prototype.initView = function () {
            this.memberList.array = this._model.myTeam.getMemberList();
            this.btnCancel.on(Laya.Event.CLICK, this, this.onCancel);
            Laya.timer.loop(2000, this, this.requestBattle);
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
        };
        /** 获取战报 */
        TeamMatchView.prototype.requestBattle = function () {
            var _this = this;
            var args = {};
            args[Protocol.friend_group_getBattleInfo.args.regTime] = this._model.myTeam.regTime;
            PLC.request(Protocol.friend_group_getBattleInfo, args, function ($data, msg, msgid) {
                if (!$data) {
                    loghgy("获取战报报错 ----", msgid);
                    if (msgid == Lans.GroupNotRegTime) {
                        _this.toClose();
                    }
                    return;
                }
                _this.doBattle($data);
            }, false);
        };
        /** 播放战报 */
        TeamMatchView.prototype.doBattle = function ($data) {
            Laya.timer.clearAll(this);
            var myTeam = this._model.myTeam;
            myTeam.setBattleMemberInfo($data["leftInfo"], $data["rightInfo"], $data["waveResults"], $data["winCamp"]);
            myTeam.regTime = 0;
            myTeam.autoStartTime = 0;
            this.btnCancel.disabled = true;
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.godDomain;
            copyvo.godDomainVo = myTeam;
            var page = new game.ServerPage();
            page.initPage($data.battleReport.reportData);
            page.result = $data.winCamp == 1 ? playState.VICTORY : playState.FAILURE; //左方胜利就为胜
            copyvo.fightPageControl = page;
            var enterVo = { vo: copyvo, event: new game.GodDomainEvent(game.GodDomainEvent.SHOW_GODDOMAIN_VIEW), responseData: $data };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        /** 更新时间 */
        TeamMatchView.prototype.updateTime = function () {
            var regTiem = this._model.myTeam.regTime;
            var time = Math.ceil(App.serverTimeSecond - regTiem);
            this.lbTime.text = LanMgr.getLan("", 10507, time);
        };
        /** 取消 */
        TeamMatchView.prototype.onCancel = function () {
            var _this = this;
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10506), confirmCb: function () {
                    var self = _this._model.myTeam.getSelfInfo();
                    game.GodDmThread.getInstance().cancelMatch(self).then(function (data) {
                        if (data.battleReport) {
                            _this.doBattle(data);
                        }
                        else {
                            _this.toClose();
                        }
                    });
                }, parm: null, yes: LanMgr.getLan("", 10508), no: LanMgr.getLan("", 10509)
            });
        };
        /** 关闭界面 : 主动或者被动取消匹配 */
        TeamMatchView.prototype.toClose = function () {
            this._model.myTeam.autoStartTime = Math.floor(App.serverTimeSecond) + 30;
            if (UIMgr.hasStage(UIConst.GodDm_TeamView)) {
                var view = UIMgr.getUIByName(UIConst.GodDm_TeamView);
                view.updateListTick();
                view.checkState();
                view.updateView();
            }
            this.close();
        };
        /** 渲染成员数据 */
        TeamMatchView.prototype.itemRender = function (cell, index) {
            var lbName = cell.getChildByName("lbName");
            var lbCount = cell.getChildByName("lbCount");
            var info = cell.dataSource;
            lbName.text = info.svo.name;
            lbCount.text = info.getRewardCnt() + "";
        };
        return TeamMatchView;
    }(ui.goddomain.TeamMatchUI));
    game.TeamMatchView = TeamMatchView;
})(game || (game = {}));
