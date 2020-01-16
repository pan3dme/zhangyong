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
    var UserNoticeView = /** @class */ (function (_super) {
        __extends(UserNoticeView, _super);
        function UserNoticeView() {
            var _this = _super.call(this) || this;
            _this._content = "";
            _this.isModelClose = true;
            return _this;
        }
        UserNoticeView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._htmlText = this.createHtml(this.panel_content.width - 40, this.panel_content.height - 40);
            this._htmlText.x = 20;
            this._htmlText.y = 20;
            this.panel_content.addChild(this._htmlText);
            this.panel_content.vScrollBarSkin = '';
        };
        UserNoticeView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        UserNoticeView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        UserNoticeView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
        };
        UserNoticeView.prototype.initView = function () {
            this._type = this.dataSource ? this.dataSource : 0;
            this._content = "";
            this.btn_sure.on(Laya.Event.CLICK, this, this.onClickSure);
            this.loadText();
            this.updateTitle();
            this.updateView();
        };
        UserNoticeView.prototype.updateTitle = function () {
            var str = LanMgr.getLan("", 12194);
            switch (this._type) {
                case UserNoticeView.TYPE_YINSI: //隐私
                    str = LanMgr.getLan("", 12195);
                    break;
                case UserNoticeView.TYPE_XIEYI: //协议
                    str = LanMgr.getLan("", 12196);
                    break;
            }
            this.bgPanel.updateTitle(str);
        };
        UserNoticeView.prototype.loadText = function () {
            var url = "";
            switch (this._type) {
                case UserNoticeView.TYPE_YINSI: //隐私
                    url = "yinsi.txt";
                    break;
                case UserNoticeView.TYPE_XIEYI: //协议
                    url = "xieyi.txt";
                    break;
            }
            if (url == "")
                return;
            // Laya.loader.load(url, Handler.create(this, this.onLoadTextComplete));
            var self = this;
            tl3d.LoadManager.getInstance().load("usernotice/" + url, tl3d.LoadManager.XML_TYPE, function (str) {
                self.onLoadTextComplete(str);
            });
        };
        UserNoticeView.prototype.onLoadTextComplete = function (str) {
            this._content = str;
            this.updateView();
        };
        UserNoticeView.prototype.updateView = function () {
            this._htmlText.innerHTML = this._content;
            this._htmlText.event(Laya.Event.RESIZE);
            this._htmlText._height = this._htmlText.contextHeight;
        };
        UserNoticeView.prototype.onClickSure = function () {
            this.close();
        };
        UserNoticeView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btn_sure.off(Laya.Event.CLICK, this, this.onClickSure);
            this._htmlText.innerHTML = "";
            this._htmlText.event(Laya.Event.RESIZE);
            this.panel_content.vScrollBar.value = 0;
        };
        UserNoticeView.prototype.createHtml = function (width, height, fontsize, color) {
            if (fontsize === void 0) { fontsize = 20; }
            if (color === void 0) { color = "#7e5336"; }
            var htmlT = new Laya.HTMLDivElement();
            htmlT.style.align = 'left';
            htmlT.style.fontSize = fontsize;
            htmlT.style.color = color;
            htmlT.style.leading = 5;
            htmlT.style.wordWrap = true;
            htmlT.width = width;
            return htmlT;
        };
        UserNoticeView.TYPE_YINSI = 0; //隐私
        UserNoticeView.TYPE_XIEYI = 1; //协议
        return UserNoticeView;
    }(ui.login.UserNoticeUI));
    game.UserNoticeView = UserNoticeView;
})(game || (game = {}));
