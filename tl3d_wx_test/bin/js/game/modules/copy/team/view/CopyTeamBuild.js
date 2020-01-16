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
    /** 队伍列表界面 */
    var CopyTeamBuild = /** @class */ (function (_super) {
        __extends(CopyTeamBuild, _super);
        function CopyTeamBuild() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.team_two_group;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.CopyTeamBuild, closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12484) };
            return _this;
        }
        CopyTeamBuild.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamBuild.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            tl3d.ModuleEventManager.removeEvent(game.CopyTeamEvent.DISEVT_JOIN_TEAM, this.disJoinTeam, this);
            this.teamList.array = null;
            this.timer.clear(this, this.onRefresh);
            this.btnRefresh.off(Laya.Event.CLICK, this, this.onRefresh);
            this.btnCreateTeam.off(Laya.Event.CLICK, this, this.onCreat);
        };
        CopyTeamBuild.prototype.initView = function () {
            this.updateView();
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.DISEVT_JOIN_TEAM, this.disJoinTeam, this);
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btnCreateTeam.on(Laya.Event.CLICK, this, this.onCreat);
            this.timer.loop(5000, this, this.onRefresh);
        };
        CopyTeamBuild.prototype.disJoinTeam = function () {
            UIMgr.showUI(UIConst.CopyTeamInfo);
        };
        CopyTeamBuild.prototype.updateView = function () {
            var list = game.CopyTeamModel.getInstance().getTeamList();
            this.teamList.array = list;
            this.imgEmpty.visible = this.lbEmpty.visible = list.length <= 0;
        };
        CopyTeamBuild.prototype.onRefresh = function () {
            var _this = this;
            game.CopyTeamThread.getInstance().requestTeamList(true)
                .then(function () {
                _this.updateView();
            });
        };
        CopyTeamBuild.prototype.onCreat = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.CREATE_TEAM_VIEW));
        };
        return CopyTeamBuild;
    }(ui.teamcopy.TeamBuildUI));
    game.CopyTeamBuild = CopyTeamBuild;
})(game || (game = {}));
