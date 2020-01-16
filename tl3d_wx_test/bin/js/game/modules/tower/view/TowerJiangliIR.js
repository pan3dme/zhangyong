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
    var TowerJiangliIR = /** @class */ (function (_super) {
        __extends(TowerJiangliIR, _super);
        function TowerJiangliIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TowerJiangliIR.prototype, "dataSource", {
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
        TowerJiangliIR.prototype.refreshData = function () {
            var data = this.dataSource;
            if (this._dataSource) {
                this.lbName.text = data.getNandu();
                this.lbDesc.text = data.tbTrial.desc;
                this.rewardList.dataSource = data.tbTrial.getRewardList();
                this.imgLingqu.visible = data.isReward();
            }
            else {
                this.rewardList.array = null;
            }
        };
        return TowerJiangliIR;
    }(ui.tower.JiangliIRUI));
    game.TowerJiangliIR = TowerJiangliIR;
})(game || (game = {}));
