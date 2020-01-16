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
    /** 邀请列表界面 */
    var GodDmInviteView = /** @class */ (function (_super) {
        __extends(GodDmInviteView, _super);
        function GodDmInviteView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.GodDm_InviteView, closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12325) };
            return _this;
        }
        GodDmInviteView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GodDmInviteView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.teamList.array = null;
            this.btnRefresh.off(Laya.Event.CLICK, this, this.onRefresh);
        };
        GodDmInviteView.prototype.initView = function () {
            this.updateView();
            this.btnRefresh.on(Laya.Event.CLICK, this, this.onRefresh);
            Laya.timer.loop(10000, this, this.onRefresh);
        };
        GodDmInviteView.prototype.updateView = function () {
            var list = game.GodDomainModel.getInstance().getInviteList();
            this.teamList.array = list;
            this.lbEmpty.visible = list.length <= 0;
        };
        GodDmInviteView.prototype.onRefresh = function () {
            var _this = this;
            game.GodDmThread.getInstance().requestInviteList(true)
                .then(function () {
                _this.updateView();
            });
        };
        return GodDmInviteView;
    }(ui.goddomain.InviteListUI));
    game.GodDmInviteView = GodDmInviteView;
})(game || (game = {}));
