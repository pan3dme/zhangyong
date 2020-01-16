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
    var LbRankIR = /** @class */ (function (_super) {
        __extends(LbRankIR, _super);
        function LbRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(LbRankIR.prototype, "dataSource", {
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
        LbRankIR.prototype.refreshData = function () {
            var info = this.dataSource;
            this.lb_rank.text = info[0];
            if (info[2]) {
                this.lb_name.text = info[2][2];
                this.lb_score.text = info[2][1];
            }
            else {
                this.lb_name.text = "虚位以待";
                this.lb_score.text = info[1] == 0 ? '' : '大于' + info[1];
            }
        };
        return LbRankIR;
    }(ui.activity.limitebuy.render.RankIRUI));
    game.LbRankIR = LbRankIR;
})(game || (game = {}));
