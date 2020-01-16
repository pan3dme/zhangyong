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
    var TeamListView = /** @class */ (function (_super) {
        __extends(TeamListView, _super);
        function TeamListView() {
            return _super.call(this) || this;
        }
        TeamListView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.GodDm_TeamListView, closeOnSide: this.isModelClose, closeOnButton: true, title: "组队信息" };
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            this.btnCreate.on(Laya.Event.CLICK, this, this.onCreate);
        };
        TeamListView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TeamListView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.teamList.array = null;
            Laya.timer.clearAll(this);
        };
        TeamListView.prototype.initView = function () {
            this.updateView();
            Laya.timer.loop(10000, this, this.onRefresh);
        };
        TeamListView.prototype.updateView = function () {
            var list = game.GodDomainModel.getInstance().getTeamList();
            this.teamList.array = list;
            this.lbEmpty.visible = list.length <= 0;
        };
        TeamListView.prototype.onRefresh = function () {
            var _this = this;
            game.GodDmThread.getInstance().requestTeamList(true)
                .then(function () {
                _this.updateView();
            });
        };
        /** 创建队伍 */
        TeamListView.prototype.onCreate = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.CREATE_TEAM_VIEW));
        };
        return TeamListView;
    }(ui.goddomain.TeamListUI));
    game.TeamListView = TeamListView;
})(game || (game = {}));
