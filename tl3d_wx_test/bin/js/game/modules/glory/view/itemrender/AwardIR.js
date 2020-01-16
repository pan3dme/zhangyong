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
    var gloryAwardIR = /** @class */ (function (_super) {
        __extends(gloryAwardIR, _super);
        function gloryAwardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(gloryAwardIR.prototype, "dataSource", {
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
        gloryAwardIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = info.title;
                var costList = info.costList ? info.costList : [];
                var rewewardList = info.rewardList ? info.rewardList : [];
                if (costList.length > 0) {
                    this.itemList.width = costList.length * 90 + (costList.length - 1) * this.itemList.spaceX;
                    this.rewardList.x = this.itemList.x + this.itemList.width + 50;
                    this.rewardList.spaceX = 10;
                }
                else {
                    this.itemList.width = 0;
                    this.rewardList.x = this.itemList.x;
                    this.rewardList.spaceX = 10;
                }
                this.rewardList.width = rewewardList.length * 90 + (rewewardList.length - 1) * this.rewardList.spaceX;
                this.itemList.array = costList;
                this.rewardList.array = rewewardList;
            }
            else {
                this.itemList.array = null;
                this.rewardList.array = null;
            }
        };
        return gloryAwardIR;
    }(ui.glory.iRender.AwardIRUI));
    game.gloryAwardIR = gloryAwardIR;
})(game || (game = {}));
