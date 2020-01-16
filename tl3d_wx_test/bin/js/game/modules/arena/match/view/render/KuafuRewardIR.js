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
    var KuafuRewardIR = /** @class */ (function (_super) {
        __extends(KuafuRewardIR, _super);
        function KuafuRewardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(KuafuRewardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        KuafuRewardIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                this.lbName.text = data.name;
                this.lbRank.text = data.getRankText();
                this.rewardList.array = data.getRewardList();
                this.lbName.color = this.lbRank.color = ColorConst.getGradeColor(data.type);
            }
            else {
                this.rewardList.array = null;
            }
        };
        return KuafuRewardIR;
    }(ui.arena.match.render.KuafuRewardIRUI));
    game.KuafuRewardIR = KuafuRewardIR;
})(game || (game = {}));
