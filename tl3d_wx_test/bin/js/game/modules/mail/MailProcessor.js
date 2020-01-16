/*
 * @Author: HuangGuoYong
 * @Date: 2018-10-10 11:12:19
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2018-12-05 20:34:51
 */
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
    var MailProcessor = /** @class */ (function (_super) {
        __extends(MailProcessor, _super);
        function MailProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.MailModel.getInstance();
            return _this;
        }
        MailProcessor.prototype.getName = function () {
            return "MailProcessor";
        };
        MailProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.MailEvent(game.MailEvent.SHOW_MAIL_PANEL), new game.MailEvent(game.MailEvent.MAIL_REWARD),
                new game.MailEvent(game.MailEvent.SHOW_MAIL_READ_PANEL), new game.MailEvent(game.MailEvent.GET_ALL_MAIL),
                new game.MailEvent(game.MailEvent.DEL_All_MAIL), new game.MailEvent(game.MailEvent.DEL_MAIL)
            ];
        };
        //处理事件
        MailProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.MailEvent) {
                switch ($event.type) {
                    case game.MailEvent.SHOW_MAIL_PANEL:
                        this.showMailPanel($event.data);
                        break;
                    case game.MailEvent.MAIL_REWARD:
                        this.mailReward($event.data);
                        break;
                    case game.MailEvent.SHOW_MAIL_READ_PANEL:
                        this.showMailReadView($event.data);
                        break;
                    case game.MailEvent.GET_ALL_MAIL:
                        this.getAllMail();
                        break;
                    case game.MailEvent.DEL_All_MAIL:
                        this.delMails(null);
                        break;
                    case game.MailEvent.DEL_MAIL:
                        this.delMails($event.data);
                        break;
                }
            }
        };
        /** 打开邮箱 */
        MailProcessor.prototype.showMailPanel = function (index) {
            if (index === void 0) { index = 0; }
            var model = this._model;
            if (model.needRequestMail()) {
                PLC.request(Protocol.game_mail_mailList, {}, function (data) {
                    if (data && data.mailList) {
                        model.setMailList(data.mailList);
                    }
                    UIMgr.showUI(UIConst.MailView, index ? index : 0);
                });
            }
            else {
                UIMgr.showUI(UIConst.MailView, index ? index : 0);
            }
        };
        /** 打开邮件阅读界面 */
        MailProcessor.prototype.showMailReadView = function (arg) {
            var mail = arg[0];
            var item = arg[1];
            if (mail.isUnread()) {
                var arg_1 = {};
                arg_1[Protocol.game_mail_mailUpdateState.args.id] = mail.svo.mailId;
                PLC.request(Protocol.game_mail_mailUpdateState, arg_1, function (resData) {
                    if (resData && resData.updateMail) {
                        game.MailModel.getInstance().updateMailState(resData.updateMail);
                    }
                    item.refreshView();
                    UIMgr.showUI(UIConst.MailReadView, mail);
                });
            }
            else {
                UIMgr.showUI(UIConst.MailReadView, mail);
            }
        };
        /** 领取邮件附件 */
        MailProcessor.prototype.mailReward = function (mail) {
            var _this = this;
            if (mail.isExpired()) {
                showToast(LanMgr.getLan('', 10000));
                return;
            }
            var arg = {};
            arg[Protocol.game_mail_mailGet.args.id] = mail.svo.mailId;
            PLC.request(Protocol.game_mail_mailGet, arg, function (resData) {
                if (!resData)
                    return;
                if (resData.updateMail) {
                    _this._model.updateMailState(resData.updateMail);
                }
                if (resData.commonData) {
                    UIUtil.showRewardView(resData.commonData);
                }
                _this.delMails(mail);
            });
        };
        /** 删除邮件 */
        MailProcessor.prototype.delMails = function (info) {
            var model = this._model;
            var mailId = null;
            if (info) {
                mailId = info.svo.mailId;
            }
            else {
                if (model.getCanDelMailCnt() <= 0) {
                    showToast(LanMgr.getLan('', 10001));
                    return;
                }
            }
            var arg = {};
            arg[Protocol.game_mail_mailDelete.args.id] = mailId ? mailId : 0;
            PLC.request(Protocol.game_mail_mailDelete, arg, function (resData) {
                if (!resData)
                    return;
                if (resData.delMail) {
                    model.delMails(resData.delMail);
                }
                if (UIMgr.hasStage(UIConst.MailView)) {
                    var mailUI = UIMgr.getUIByName(UIConst.MailView);
                    mailUI.resetView();
                }
                UIMgr.hideUIByName(UIConst.MailReadView);
            });
        };
        /** 一键领取邮件 */
        MailProcessor.prototype.getAllMail = function () {
            var model = this._model;
            if (model.getCanGetMailCnt() <= 0) {
                showToast(LanMgr.getLan('', 10002));
                return;
            }
            var arg = {};
            arg[Protocol.game_mail_mailGet.args.id] = 0;
            PLC.request(Protocol.game_mail_mailGet, arg, function (resData) {
                if (resData && resData.updateMail) {
                    model.updateMailState(resData.updateMail);
                }
                if (resData && resData.commonData) {
                    UIUtil.showRewardView(resData.commonData);
                }
                if (UIMgr.hasStage(UIConst.MailView)) {
                    var mailUI = UIMgr.getUIByName(UIConst.MailView);
                    mailUI.refreshView();
                }
            });
        };
        return MailProcessor;
    }(tl3d.Processor));
    game.MailProcessor = MailProcessor;
})(game || (game = {}));
