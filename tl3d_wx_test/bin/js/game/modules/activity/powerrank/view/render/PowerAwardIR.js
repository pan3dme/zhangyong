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
    var PowerAwardIR = /** @class */ (function (_super) {
        __extends(PowerAwardIR, _super);
        function PowerAwardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PowerAwardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        PowerAwardIR.prototype.refreshData = function (item) {
            if (item) {
                this.lab_condition.text = item.getConditionTitle() + item.getConditionDesc();
                var list = [];
                if (item.reward.special_reward && item.reward.special_reward.length > 0) {
                    list = list.concat.apply(list, ary2prop(item.reward.special_reward));
                }
                list = list.concat.apply(list, ary2prop(item.reward.reward));
                this.list_reward.array = list;
                //排名
                if (item.index < 3) {
                    this.lbRank.visible = false;
                    this.imgRank.visible = true;
                    this.imgRank.skin = SkinUtil.getRankingSkin(item.index);
                }
                else {
                    this.lbRank.visible = true;
                    this.imgRank.visible = false;
                    this.lbRank.text = item.rank;
                }
            }
        };
        return PowerAwardIR;
    }(ui.activity.powerrank.itemIRUI));
    game.PowerAwardIR = PowerAwardIR;
})(game || (game = {}));
