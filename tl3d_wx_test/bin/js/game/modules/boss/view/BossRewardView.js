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
    var BossRewardView = /** @class */ (function (_super) {
        __extends(BossRewardView, _super);
        function BossRewardView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        BossRewardView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        BossRewardView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        BossRewardView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rewardList.array = null;
            this.bgPanel.dataSource = null;
        };
        BossRewardView.prototype.initView = function () {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12261) };
            var info = this.dataSource;
            this.rewardList.array = info.getRewardList();
        };
        return BossRewardView;
    }(ui.boss.RewardUI));
    game.BossRewardView = BossRewardView;
})(game || (game = {}));
