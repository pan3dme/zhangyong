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
    var ForestRewardIR = /** @class */ (function (_super) {
        __extends(ForestRewardIR, _super);
        function ForestRewardIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ForestRewardIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        ForestRewardIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.lbName.text = LanMgr.getLan("", 12002, info.tbForest.ID);
                this.btnLingqu.visible = !info.isReward();
                this.btnLingqu.label = info.isCanReward() ? LanMgr.getLan("", 10041) : LanMgr.getLan("", 10045);
                this.btnLingqu.gray = !info.isCanReward();
                this.imgYilingqu.visible = info.isReward();
                this.itemList.array = info.tbForest.getBossRewards();
                this.btnLingqu.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.btnLingqu.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        ForestRewardIR.prototype.onClick = function () {
            dispatchEvt(new game.FogForestEvent(game.FogForestEvent.OPEN_BAOXIANG, this));
        };
        return ForestRewardIR;
    }(ui.fogforest.RewardIRUI));
    game.ForestRewardIR = ForestRewardIR;
})(game || (game = {}));
