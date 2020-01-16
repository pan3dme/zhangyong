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
    var forestRankIR = /** @class */ (function (_super) {
        __extends(forestRankIR, _super);
        function forestRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(forestRankIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        forestRankIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                if (info[0] == 1) {
                    this.lbGuanqia.fontSize = this.lbName.fontSize = this.lbRank.fontSize = 20;
                    // this.lbGuanqia.color = this.lbName.color = this.lbRank.color = ColorConst.getFogForestRankColor(1);
                    this.lbGuanqia.text = info[1][1] + LanMgr.getLan("", 12412);
                    this.lbName.text = info[1][2];
                    this.lbRank.text = "1";
                }
                else if (info[0] == 2) {
                    this.lbGuanqia.fontSize = this.lbName.fontSize = this.lbRank.fontSize = 20;
                    // this.lbGuanqia.color = this.lbName.color = this.lbRank.color = ColorConst.getFogForestRankColor(2);
                    this.lbGuanqia.text = info[1][1] + LanMgr.getLan("", 12412);
                    this.lbName.text = info[1][2];
                    this.lbRank.text = "2";
                }
                else if (info[0] == 3) {
                    this.lbGuanqia.fontSize = this.lbName.fontSize = this.lbRank.fontSize = 20;
                    // this.lbGuanqia.color = this.lbName.color = this.lbRank.color = ColorConst.getFogForestRankColor(3);
                    this.lbGuanqia.text = info[1][1] + LanMgr.getLan("", 12412);
                    this.lbName.text = info[1][2];
                    this.lbRank.text = "3";
                }
            }
            else {
                this.lbGuanqia.text = "";
                this.lbName.text = "";
                this.lbRank.text = "";
            }
        };
        return forestRankIR;
    }(ui.fogforest.RankIRUI));
    game.forestRankIR = forestRankIR;
})(game || (game = {}));
