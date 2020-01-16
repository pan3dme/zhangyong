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
    var JiangLiView = /** @class */ (function (_super) {
        __extends(JiangLiView, _super);
        function JiangLiView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        JiangLiView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        JiangLiView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        JiangLiView.prototype.close = function (type, showEffect, sound) {
            _super.prototype.close.call(this, type, showEffect, sound);
        };
        JiangLiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        JiangLiView.prototype.initView = function () {
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "排名奖励" };
            this.list_jiangli.array = this.dataSource;
        };
        return JiangLiView;
    }(ui.activity.limitebuy.JiangLiUI));
    game.JiangLiView = JiangLiView;
})(game || (game = {}));
