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
    var TongguanJiangliView = /** @class */ (function (_super) {
        __extends(TongguanJiangliView, _super);
        function TongguanJiangliView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        TongguanJiangliView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        TongguanJiangliView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TongguanJiangliView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.rewardList.array = null;
            this.bgPanel.dataSource = null;
            this.tabbar.selectedIndex = -1;
            this.guanquaUI.onExit();
        };
        TongguanJiangliView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.TongguanJiangliView, closeOnSide: this.isModelClose, closeOnButton: false, title: "奖励" };
            this.tabbar.selectHandler = new Handler(this, this.onTabSelect);
            this.tabbar.selectedIndex = 0;
        };
        TongguanJiangliView.prototype.onTabSelect = function (index) {
            if (index == -1)
                return;
            this.viewStack.selectedIndex = index;
            if (index == 0) {
                this.rewardList.array = game.GuildCopyModel.getInstance().getRewardList();
            }
            else if (index == 1) {
                this.guanquaUI.onEnter(this.dataSource);
            }
        };
        TongguanJiangliView.prototype.refreshView = function () {
            this.rewardList.array = game.GuildCopyModel.getInstance().getRewardList();
        };
        return TongguanJiangliView;
    }(ui.guild.copy.TongguanJiangliUI));
    game.TongguanJiangliView = TongguanJiangliView;
})(game || (game = {}));
