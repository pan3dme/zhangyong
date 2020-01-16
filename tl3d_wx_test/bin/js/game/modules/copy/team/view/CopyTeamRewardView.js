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
    var CopyTeamRewardView = /** @class */ (function (_super) {
        __extends(CopyTeamRewardView, _super);
        function CopyTeamRewardView() {
            return _super.call(this) || this;
        }
        CopyTeamRewardView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12304) };
            this.addChild(this.bgPanel.btnClose);
        };
        CopyTeamRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamRewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.listReward.array = null;
        };
        CopyTeamRewardView.prototype.initView = function () {
            this.listReward.array = game.CopyTeamModel.getInstance().getRewardList(true);
        };
        return CopyTeamRewardView;
    }(ui.teamcopy.TeamCopyRewardUI));
    game.CopyTeamRewardView = CopyTeamRewardView;
})(game || (game = {}));
