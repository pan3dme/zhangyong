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
    var CopyTeamTransferLeader = /** @class */ (function (_super) {
        __extends(CopyTeamTransferLeader, _super);
        function CopyTeamTransferLeader() {
            return _super.call(this) || this;
        }
        CopyTeamTransferLeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this._model = game.CopyTeamModel.getInstance();
        };
        CopyTeamTransferLeader.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamTransferLeader.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamTransferLeader.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            tl3d.ModuleEventManager.removeEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = null;
            this.itemlist.dataSource = null;
        };
        CopyTeamTransferLeader.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.UPDATE_MEMBERLIST, this.updateList, this);
            this.bgPanel.dataSource = { uiName: UIConst.CopyTeamTransfer, closeOnSide: this.isModelClose, title: LanMgr.getLan("", 12477) };
            this.updateList();
        };
        CopyTeamTransferLeader.prototype.updateList = function () {
            if (!this._model.hasTeam() || !this._model.IsLeader() || this._model.getOtherMembers().length <= 0) {
                this.close();
                return;
            }
            this.itemlist.dataSource = this._model.getOtherMembers();
            listAtCenter(this.itemlist, 51, 2, this.itemlist.dataSource.length, 176);
        };
        return CopyTeamTransferLeader;
    }(ui.teamcopy.transferLeaderUI));
    game.CopyTeamTransferLeader = CopyTeamTransferLeader;
})(game || (game = {}));
