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
    var YZJiangliView = /** @class */ (function (_super) {
        __extends(YZJiangliView, _super);
        function YZJiangliView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        YZJiangliView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        YZJiangliView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        YZJiangliView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        YZJiangliView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
        };
        YZJiangliView.prototype.initView = function () {
            var info = this.dataSource;
            this.rewardList.array = info.tbCopy.getBoxRewardList();
            this.rewardList.width = (90 + this.rewardList.spaceX) * this.rewardList.length;
            this.bgPanel.dataSource = { uiName: UIConst.Yuanzheng_RewardView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12468) };
        };
        return YZJiangliView;
    }(ui.yuanzheng.JiangliViewUI));
    game.YZJiangliView = YZJiangliView;
})(game || (game = {}));
