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
    var ForestRewardView = /** @class */ (function (_super) {
        __extends(ForestRewardView, _super);
        function ForestRewardView() {
            return _super.call(this) || this;
        }
        ForestRewardView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12261) };
        };
        ForestRewardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        ForestRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        ForestRewardView.prototype.close = function (type, showEffect, sound) {
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        ForestRewardView.prototype.initView = function () {
            this.rewardList.array = game.FogForestModel.getInstance().getChestList(true);
        };
        return ForestRewardView;
    }(ui.fogforest.RewardViewUI));
    game.ForestRewardView = ForestRewardView;
})(game || (game = {}));
