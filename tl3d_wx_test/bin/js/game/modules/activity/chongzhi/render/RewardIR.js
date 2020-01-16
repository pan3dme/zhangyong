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
    var RewardIR = /** @class */ (function (_super) {
        __extends(RewardIR, _super);
        function RewardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RewardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (value) {
                this._dataSource = value;
                if (!!value)
                    this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        RewardIR.prototype.refresh = function () {
            var data = this.dataSource;
            var isFinish = data.isFinish();
            var isReward = data.isReward();
            this.itemList.array = data.reward;
            this.imgAlready.visible = isReward;
            var canReward = isFinish && !isReward;
            this._day = this.parent.getChildIndex(this) + 1;
            this.lbday.changeText("\u7B2C" + this._day + "\u5929\u514D\u8D39\u9886");
            this.itemList.x = 31 + (4 - this.itemList.length) * (90 + this.itemList.spaceX) / 2;
        };
        return RewardIR;
    }(ui.activity.shouchong.RewardIRUI));
    game.RewardIR = RewardIR;
})(game || (game = {}));
