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
    // 平台登录公告
    var LoginNoticeView = /** @class */ (function (_super) {
        __extends(LoginNoticeView, _super);
        function LoginNoticeView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.init();
            return _this;
        }
        LoginNoticeView.prototype.init = function () {
            this._chatNotice = new common.Accordion(600, 800);
            this._chatNotice.itemRender = game.LoginNoticeIR;
            this.addChild(this._chatNotice);
            this._chatNotice.spaceY = 10;
            this._chatNotice.x = 25;
            this._chatNotice.y = 125;
            this.btnKnow.on(Laya.Event.CLICK, this, this.close);
            this.bgPanel.dataSource = { uiName: UIConst.LoginNoticeView, closeOnSide: this.isModelClose, closeOnButton: true, title: "公 告" };
            this.checkbox.on(Laya.Event.CHANGE, this, this.onChange);
        };
        LoginNoticeView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this._chatNotice.dataSource = this.dataSource;
            this.checkbox.selected = Laya.LocalStorage.getItem(App.LOGIN_NOTICE_CHECKBOX) == "1";
        };
        LoginNoticeView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._chatNotice.dataSource = [];
        };
        LoginNoticeView.prototype.onChange = function () {
            var isSelect = this.checkbox.selected;
            Laya.LocalStorage.setItem(App.LOGIN_NOTICE_CHECKBOX, isSelect ? "1" : "0");
        };
        return LoginNoticeView;
    }(ui.hud.view.LoginNoticeUI));
    game.LoginNoticeView = LoginNoticeView;
})(game || (game = {}));
