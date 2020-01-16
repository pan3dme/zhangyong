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
    var LoginNoticeIR = /** @class */ (function (_super) {
        __extends(LoginNoticeIR, _super);
        function LoginNoticeIR() {
            var _this = _super.call(this) || this;
            _this.boxContent.visible = false;
            _this.lab_content.autoSize = true;
            _this.img_bg.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        Object.defineProperty(LoginNoticeIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                if (!$value)
                    return;
                this._dataSource = $value;
                if ($value.isfirst)
                    this.onShow();
                else
                    this.onHide();
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        LoginNoticeIR.prototype.refresh = function (index) {
            var info = this.dataSource;
            if (info) {
                this.lab_title.text = this.dataSource.title;
            }
        };
        /** 展开子任务 */
        LoginNoticeIR.prototype.onShow = function () {
            var info = this.dataSource;
            this.btnArrow.scaleY = 0.8;
            this.boxContent.visible = true;
            this.lab_content.text = info ? info.content : "";
            this.lab_content.event(Laya.Event.RESIZE);
            this.boxContent.height = this.lab_content.y + this.lab_content.height + 30;
            this.height = this.boxContent.y + this.boxContent.height;
        };
        /** 隐藏子任务 */
        LoginNoticeIR.prototype.onHide = function () {
            this.btnArrow.scaleY = -0.8;
            this.boxContent.visible = false;
            this.height = 60;
        };
        /** 是否是展开的 */
        LoginNoticeIR.prototype.isShow = function () {
            return this.btnArrow.scaleY == 0.8;
        };
        LoginNoticeIR.prototype.onClick = function () {
            dispatchEvt(new common.TreeEvent(common.TreeEvent.SELECT_TAB, this));
        };
        return LoginNoticeIR;
    }(ui.hud.render.LoginNoticeIRUI));
    game.LoginNoticeIR = LoginNoticeIR;
})(game || (game = {}));
