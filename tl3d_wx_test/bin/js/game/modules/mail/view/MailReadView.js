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
    /** 邮件阅读 */
    var MailReadView = /** @class */ (function (_super) {
        __extends(MailReadView, _super);
        function MailReadView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        MailReadView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        MailReadView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        MailReadView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnOperate.off(Laya.Event.CLICK, this, this.onConfirm);
        };
        /** 初始化界面 */
        MailReadView.prototype.initView = function () {
            var info = this.dataSource;
            this.lab_title.text = info.getTitle();
            this.lbContent.text = "      " + info.getContent();
            this.lbTime.text = info.getTime();
            if (info.isHaveGift()) {
                this.boxItem.visible = true;
                this.list.array = info.itemList;
                this.btnOperate.label = info.isReward() ? LanMgr.getLan("", 10196) : LanMgr.getLan("", 10041);
            }
            else {
                this.boxItem.visible = false;
                this.list.array = null;
                this.btnOperate.label = LanMgr.getLan("", 10196);
            }
            this.btnOperate.on(Laya.Event.CLICK, this, this.onConfirm);
        };
        MailReadView.prototype.onConfirm = function () {
            var info = this.dataSource;
            if (!info)
                return;
            if (info.isCanReward()) {
                dispatchEvt(new game.MailEvent(game.MailEvent.MAIL_REWARD, this.dataSource));
            }
            else {
                dispatchEvt(new game.MailEvent(game.MailEvent.DEL_MAIL, this.dataSource));
            }
        };
        return MailReadView;
    }(ui.mail.MailReadUI));
    game.MailReadView = MailReadView;
})(game || (game = {}));
