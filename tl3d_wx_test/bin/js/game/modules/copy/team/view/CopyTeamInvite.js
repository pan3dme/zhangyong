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
    var CopyTeamInvite = /** @class */ (function (_super) {
        __extends(CopyTeamInvite, _super);
        function CopyTeamInvite() {
            return _super.call(this) || this;
        }
        CopyTeamInvite.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this._model = game.CopyTeamModel.getInstance();
        };
        CopyTeamInvite.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamInvite.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamInvite.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            tl3d.ModuleEventManager.removeEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = null;
            this.teamList.array = null;
        };
        CopyTeamInvite.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamInvite, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12482) };
            this.updateList();
        };
        CopyTeamInvite.prototype.updateList = function () {
            this.teamList.array = this._model.getInviteList();
            this.imgEmpty.visible = this.lbEmpty.visible = this.teamList.array.length <= 0;
        };
        CopyTeamInvite.prototype.onRefresh = function () {
            var _this = this;
            game.CopyTeamThread.getInstance().requestInviteList(true)
                .then(function () {
                _this.updateList();
            });
        };
        return CopyTeamInvite;
    }(ui.teamcopy.TeamCopyInvitationUI));
    game.CopyTeamInvite = CopyTeamInvite;
})(game || (game = {}));
