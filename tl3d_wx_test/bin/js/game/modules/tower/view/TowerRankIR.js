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
/**
* name
*/
var game;
(function (game) {
    var TowerRankIR = /** @class */ (function (_super) {
        __extends(TowerRankIR, _super);
        function TowerRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TowerRankIR.prototype, "dataSource", {
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
        TowerRankIR.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.lbName.text = data.name;
                this.lbGuild.text = data.guildName ? LanMgr.getLan("", 12125, data.guildName) : '';
                this.lbDesc.text = data.getDesc();
                this.lbValue.text = data.getValue();
                this.headBox.dataSource = data.getHeadVo();
                this.headBox.on(Laya.Event.CLICK, this, this.onShowInfo);
                this.ui_view.dataSource = { rank: data.getRank() };
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        };
        TowerRankIR.prototype.onShowInfo = function () {
            var info = this.dataSource;
            if (info && info.uid) {
                UIUtil.showPlayerLineupInfo(info.uid);
            }
        };
        return TowerRankIR;
    }(ui.tower.RankIRUI));
    game.TowerRankIR = TowerRankIR;
})(game || (game = {}));
