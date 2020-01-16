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
    var CopyTeamRankRender = /** @class */ (function (_super) {
        __extends(CopyTeamRankRender, _super);
        function CopyTeamRankRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CopyTeamRankRender.prototype, "dataSource", {
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
        CopyTeamRankRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.ui_bg.dataSource = { rank: info.rank };
                this.boxInfo.visible = info.playerId != null;
                this.labInfo.visible = info.playerId == null;
                if (this.boxInfo.visible) {
                    this.lbName.text = info.name;
                    this.lbMid.text = String(info.force);
                    var tab = tb.TB_team_copy.getTB_team_copyById(info.value);
                    if (tab) {
                        this.lbValue.text = Math.floor(tab.copy / 10) + "-" + tab.copy % 10;
                    }
                    this.headBox.dataSource = info.getHeadVo();
                    this.headBox.on(Laya.Event.CLICK, this, this.onShowInfo);
                }
                else {
                    this.headBox.dataSource = null;
                    this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
                }
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        };
        CopyTeamRankRender.prototype.onShowInfo = function () {
            var info = this.dataSource;
            if (!info || !info.playerId)
                return;
            UIUtil.showPlayerLineupInfo(info.playerId);
        };
        return CopyTeamRankRender;
    }(ui.teamcopy.render.TeamRankRenderUI));
    game.CopyTeamRankRender = CopyTeamRankRender;
})(game || (game = {}));
