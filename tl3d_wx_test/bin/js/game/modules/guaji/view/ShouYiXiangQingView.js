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
    var ShouYiXiangQingView = /** @class */ (function (_super) {
        __extends(ShouYiXiangQingView, _super);
        function ShouYiXiangQingView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.ShouYiXiangQingView, closeOnSide: _this.isModelClose, title: "奖励详情" };
            return _this;
        }
        ShouYiXiangQingView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        ShouYiXiangQingView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        ShouYiXiangQingView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        ShouYiXiangQingView.prototype.initView = function () {
            var tab = this.dataSource;
            this.lab_exp.text = tab.role_exp_speed + "/\u5206\u949F";
            this.lab_gold.text = tab.gold_speed + "/\u5206\u949F";
            this.lab_hunshi.text = tab.exp_speed + "/\u5206\u949F";
            this.lab_name.text = tab.name;
            this.list_reward.dataSource = tab.getRewardShowItems();
        };
        return ShouYiXiangQingView;
    }(ui.guaji.ShouYiXiangQingUI));
    game.ShouYiXiangQingView = ShouYiXiangQingView;
})(game || (game = {}));
