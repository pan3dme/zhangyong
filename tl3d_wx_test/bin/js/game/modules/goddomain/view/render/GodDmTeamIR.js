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
    var GodDmTeamIR = /** @class */ (function (_super) {
        __extends(GodDmTeamIR, _super);
        function GodDmTeamIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodDmTeamIR.prototype, "dataSource", {
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
        GodDmTeamIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbTeam.text = info.svo.name;
                this.lbGuild.text = info.svo.guildName ? info.svo.guildName : LanMgr.getLan("", 12084);
                this.lbCount.text = info.svo.memberNum + "";
                this.lbForce.text = info.svo.force + "";
                this.headBox.dataSource = new UserHeadVo(info.svo.head, info.svo.level, info.svo.headFrame);
                this.btnJoin.on(Laya.Event.CLICK, this, this.onJoin);
            }
            else {
                this.headBox.dataSource = null;
                this.btnJoin.off(Laya.Event.CLICK, this, this.onJoin);
            }
        };
        GodDmTeamIR.prototype.onJoin = function () {
            dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.JOIN_TEAM), this.dataSource);
        };
        return GodDmTeamIR;
    }(ui.goddomain.render.TeamIRUI));
    game.GodDmTeamIR = GodDmTeamIR;
})(game || (game = {}));
