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
    /** 邮件 */
    var MailIR = /** @class */ (function (_super) {
        __extends(MailIR, _super);
        function MailIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(MailIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        MailIR.prototype.refreshView = function () {
            var mail = this.dataSource;
            if (mail) {
                this.lbTitle.text = mail.getTitle();
                this.imgBox.visible = mail.isHaveGift();
                this.imgBox.skin = SkinUtil.getTaskBaoxiang(4, mail.isReward());
                this.lbTime.text = mail.getTime();
                this.imgIcon.skin = SkinUtil.getMailStateUrl(mail.isUnread() ? 1 : 2);
                this.imgIcon.gray = mail.isRead() || mail.isReward();
            }
            else {
                this.lbTitle.text = "";
                this.lbTime.text = "";
            }
        };
        return MailIR;
    }(ui.mail.MailIRUI));
    game.MailIR = MailIR;
})(game || (game = {}));
