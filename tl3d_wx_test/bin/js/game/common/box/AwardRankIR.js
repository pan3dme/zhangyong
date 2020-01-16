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
var common;
(function (common) {
    /** 奖励排行itemrender */
    var AwardRankIR = /** @class */ (function (_super) {
        __extends(AwardRankIR, _super);
        function AwardRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(AwardRankIR.prototype, "dataSource", {
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
        AwardRankIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var rankStr = info.getRankStr();
                var len = rankStr.length;
                // this.lbRank.fontSize = len <= 1 ? 55 : (len <= 4 ? 40 : 27);
                this.lbRank.text = rankStr;
                this.lbRank.visible = true;
                this.imgRank.visible = false;
                var rank = info.getRank();
                if (!isNaN(rank)) {
                    this.lbRank.visible = rank > 3;
                    this.imgRank.visible = rank <= 3;
                    this.imgRank.skin = rank <= 3 ? info.getRankSkin(rank) : "";
                }
                this.lbRank.event(Laya.Event.RESIZE);
                this.itemList.array = info.getRewardList();
            }
            else {
                this.itemList.array = null;
            }
        };
        return AwardRankIR;
    }(ui.box.AwardRankIRUI));
    common.AwardRankIR = AwardRankIR;
})(common || (common = {}));
