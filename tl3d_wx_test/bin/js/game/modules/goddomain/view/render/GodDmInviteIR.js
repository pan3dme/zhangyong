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
    var GodDmInviteIR = /** @class */ (function (_super) {
        __extends(GodDmInviteIR, _super);
        function GodDmInviteIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodDmInviteIR.prototype, "dataSource", {
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
        GodDmInviteIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info.svo.name;
                this.lbGuild.text = info.svo.guildName ? info.svo.guildName : LanMgr.getLan("", 12084);
                this.lbForce.text = info.svo.force + "";
                var isInvite = info.isInvite();
                this.btnInvite.label = isInvite ? LanMgr.getLan("", 12330) : LanMgr.getLan("", 12331);
                this.btnInvite.disabled = isInvite;
                this.btnInvite.on(Laya.Event.CLICK, this, this.onInvite);
                this.headBox.dataSource = new UserHeadVo(info.svo.head, info.svo.level, info.svo.headFrame);
            }
            else {
                this.headBox.dataSource = null;
                this.btnInvite.off(Laya.Event.CLICK, this, this.onInvite);
            }
        };
        GodDmInviteIR.prototype.onInvite = function () {
            var _this = this;
            game.GodDmThread.getInstance().inviteFriend(this.dataSource).then(function () {
                _this.refreshData();
            });
        };
        return GodDmInviteIR;
    }(ui.goddomain.render.InviteIRUI));
    game.GodDmInviteIR = GodDmInviteIR;
})(game || (game = {}));
