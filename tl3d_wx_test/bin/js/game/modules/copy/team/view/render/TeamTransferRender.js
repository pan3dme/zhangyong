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
    var TeamTransferRender = /** @class */ (function (_super) {
        __extends(TeamTransferRender, _super);
        function TeamTransferRender() {
            var _this = _super.call(this) || this;
            _this.imgBg.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        Object.defineProperty(TeamTransferRender.prototype, "dataSource", {
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
        TeamTransferRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (!info)
                return;
            this.ui_head.dataSource = info.head ? new UserHeadVo(info.head, info.level, info.headFrame) : null;
            this.lab_name.text = info.name;
            this.lab_force.text = String(info.force);
            var tab = tb.TB_team_copy.getTB_team_copyById(info.copyFloor);
            if (tab) {
                this.lab_info.text = LanMgr.getLan("", 12478) + (Math.floor(tab.copy / 10) + "-" + tab.copy % 10);
                this.lab_info.color = info.copyFloor > game.CopyTeamModel.getInstance().captainFloor ? "#ff0000" : "#319c28";
            }
        };
        TeamTransferRender.prototype.onClick = function () {
            var info = this.dataSource;
            if (!info)
                return;
            if (info.copyFloor > game.CopyTeamModel.getInstance().captainFloor) {
                showToast(LanMgr.getLan("", 10270));
                return;
            }
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10271, info.name),
                confirmCb: function () {
                    game.CopyTeamThread.getInstance().appointCaptain(info.playerId).then(function () {
                        dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.HIDE_TRANSFER_PANEL));
                    });
                },
                parm: null
            });
        };
        return TeamTransferRender;
    }(ui.teamcopy.render.TeamTransferRenderUI));
    game.TeamTransferRender = TeamTransferRender;
})(game || (game = {}));
