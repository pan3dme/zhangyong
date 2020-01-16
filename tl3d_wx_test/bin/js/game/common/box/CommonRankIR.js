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
    var CommonRankIR = /** @class */ (function (_super) {
        __extends(CommonRankIR, _super);
        function CommonRankIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(CommonRankIR.prototype, "dataSource", {
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
        CommonRankIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.imgRank.visible = info.rank <= 3;
                if (this.imgRank.visible) {
                    this.imgRank.skin = SkinUtil.getRankingSkin(info.rank - 1);
                }
                this.lbRank.text = info.rank + '';
                this.lbRank.visible = info.rank > 3;
            }
        };
        return CommonRankIR;
    }(ui.component.CommonRankItemUI));
    common.CommonRankIR = CommonRankIR;
})(common || (common = {}));
