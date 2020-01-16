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
    var BossRankIR = /** @class */ (function (_super) {
        __extends(BossRankIR, _super);
        function BossRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BossRankIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        BossRankIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.headBox.dataSource = new UserHeadVo(info.svo.head, info.svo.playerLevel, info.svo.headFrame);
                this.lbName.text = info.svo.playerName;
                this.lbDamage.text = info.svo.value.toString();
                this.headBox.on(Laya.Event.CLICK, this, this.onShowInfo);
                this.ui_view.dataSource = { rank: info.rank };
            }
            else {
                this.headBox.dataSource = null;
                this.headBox.off(Laya.Event.CLICK, this, this.onShowInfo);
            }
        };
        BossRankIR.prototype.onShowInfo = function () {
            var info = this.dataSource;
            if (info && info.svo && info.svo.playerId) {
                UIUtil.showPlayerLineupInfo(info.svo.playerId);
            }
        };
        return BossRankIR;
    }(ui.boss.RankIRUI));
    game.BossRankIR = BossRankIR;
})(game || (game = {}));
