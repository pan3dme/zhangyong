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
    var CopyTeamInfo = /** @class */ (function (_super) {
        __extends(CopyTeamInfo, _super);
        function CopyTeamInfo() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.team_two_group;
            return _this;
        }
        CopyTeamInfo.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.btn_apply.on(Laya.Event.CLICK, this, this.onApply);
            this.btn_leave.on(Laya.Event.CLICK, this, this.onLeave);
            this.btn_transfer.on(Laya.Event.CLICK, this, this.onTransfer);
            this._model = game.CopyTeamModel.getInstance();
        };
        CopyTeamInfo.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamInfo.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamInfo.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            tl3d.ModuleEventManager.removeEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST, this.updateRender, this);
        };
        CopyTeamInfo.prototype.initView = function () {
            this.refreshOpt();
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST, this.updateRender, this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamInfo, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12483) };
        };
        CopyTeamInfo.prototype.updateRender = function () {
            if (!this._model.hasTeam()) {
                this.close();
                return;
            }
            this.refreshOpt();
        };
        CopyTeamInfo.prototype.refreshOpt = function () {
            this.lab_force.text = String(this._model.getTeamAllForce());
            this.btn_transfer.visible = this.btn_apply.visible = this._model.IsLeader();
            this.btn_leave.x = this._model.IsLeader() ? 61 : 227;
            this.ui_item0.dataSource = this._model.getMemberById(1);
            this.ui_item1.dataSource = this._model.getMemberById(2);
            this.ui_item2.dataSource = this._model.getMemberById(3);
        };
        CopyTeamInfo.prototype.onApply = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.APPLY_TEAM_PANEL));
        };
        CopyTeamInfo.prototype.onLeave = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.LEAVE_TEAM));
        };
        CopyTeamInfo.prototype.onTransfer = function () {
            dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_TRANSFER_PANEL));
        };
        return CopyTeamInfo;
    }(ui.teamcopy.TeamInfoUI));
    game.CopyTeamInfo = CopyTeamInfo;
})(game || (game = {}));
