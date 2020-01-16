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
    var ClgRewardIR = /** @class */ (function (_super) {
        __extends(ClgRewardIR, _super);
        function ClgRewardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ClgRewardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                if (!!v)
                    this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        ClgRewardIR.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                var childs = this._childs;
                var item = tb.TB_item.get_TB_itemById(data[0]);
                childs[1].text = "+" + data[1];
                childs[0].skin = SkinUtil.getCostSkin(item.ID);
                childs[0].size(36, 36);
                this.refresh();
            }
        };
        return ClgRewardIR;
    }(Laya.HBox));
    game.ClgRewardIR = ClgRewardIR;
})(game || (game = {}));
