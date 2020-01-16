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
    var TeamInviteRender = /** @class */ (function (_super) {
        __extends(TeamInviteRender, _super);
        function TeamInviteRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TeamInviteRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        TeamInviteRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (!info)
                return;
            this.ui_render.dataSource = info;
            var now = App.serverTime / 1000;
            var t = now - info.logoutTime;
            t = Math.min(t, TimeConst.ONE_DAY_SEC * 7);
            this.lab_online.text = info.logoutTime == 0 ? LanMgr.getLan("", 12248) : GameUtil.getOfflineTimeStr(now - t, now);
            this.lab_online.color = info.logoutTime == 0 ? "#18ad00" : "#535353";
        };
        return TeamInviteRender;
    }(ui.teamcopy.render.TeamInvitationRenderUI));
    game.TeamInviteRender = TeamInviteRender;
})(game || (game = {}));
