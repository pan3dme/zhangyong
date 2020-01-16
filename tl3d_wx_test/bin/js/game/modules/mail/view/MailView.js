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
    var MailView = /** @class */ (function (_super) {
        __extends(MailView, _super);
        function MailView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { closeOnSide: _this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12191) };
            _this.mailList.mouseHandler = new Handler(_this, _this.onClickHandler);
            return _this;
        }
        MailView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        MailView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        MailView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.mailList.array = null;
            this.btnGetAll.off(Laya.Event.CLICK, this, this.onGetAll);
            this.btnDelAll.off(Laya.Event.CLICK, this, this.onDelAll);
        };
        MailView.prototype.initView = function () {
            this.resetView();
            this.btnGetAll.on(Laya.Event.CLICK, this, this.onGetAll);
            this.btnDelAll.on(Laya.Event.CLICK, this, this.onDelAll);
        };
        /** 重置邮件列表 */
        MailView.prototype.resetView = function () {
            var list1 = game.MailModel.getInstance().getMailList();
            this.mailList.array = list1;
            this.box_empty.visible = list1.length == 0;
            this.lab_mail_num.text = LanMgr.getLan("", -12190, list1.length);
        };
        /** 刷新界面 */
        MailView.prototype.refreshView = function () {
            this.mailList.refresh();
            this.box_empty.visible = this.mailList.array.length == 0;
            this.lab_mail_num.text = LanMgr.getLan("", 12190, this.mailList.array.length);
        };
        /** 点击阅读邮件 */
        MailView.prototype.onClickHandler = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                dispatchEvt(new game.MailEvent(game.MailEvent.SHOW_MAIL_READ_PANEL, [this.mailList.getItem(index), this.mailList.getCell(index)]));
            }
        };
        /** 一键领取邮件 */
        MailView.prototype.onGetAll = function () {
            dispatchEvt(new game.MailEvent(game.MailEvent.GET_ALL_MAIL));
        };
        /** 一键删除邮件 */
        MailView.prototype.onDelAll = function () {
            dispatchEvt(new game.MailEvent(game.MailEvent.DEL_All_MAIL));
        };
        return MailView;
    }(ui.mail.MailViewUI));
    game.MailView = MailView;
})(game || (game = {}));
