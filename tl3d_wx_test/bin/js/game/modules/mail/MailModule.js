/*
 * @Author: HuangGuoYong
 * @Date: 2018-10-10 11:12:54
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2018-11-06 19:33:28
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
    var MailModule = /** @class */ (function (_super) {
        __extends(MailModule, _super);
        function MailModule() {
            return _super.call(this) || this;
        }
        MailModule.prototype.getModuleName = function () {
            return "MailModule";
        };
        MailModule.prototype.listProcessors = function () {
            return [new game.MailProcessor()];
        };
        /**
         * 初始化数据
         */
        MailModule.prototype.onRegister = function () {
            game.MailModel.getInstance();
        };
        return MailModule;
    }(tl3d.Module));
    game.MailModule = MailModule;
    var MailEvent = /** @class */ (function (_super) {
        __extends(MailEvent, _super);
        function MailEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开邮件界面 */
        MailEvent.SHOW_MAIL_PANEL = "SHOW_MAIL_PANEL";
        /** 打开邮件阅读界面 */
        MailEvent.SHOW_MAIL_READ_PANEL = "SHOW_MAIL_READ_PANEL";
        /** 领取奖励 */
        MailEvent.MAIL_REWARD = "MAIL_REWARD";
        /** 一键领取邮件 */
        MailEvent.GET_ALL_MAIL = "GET_ALL_MAIL";
        /** 一键删除邮件 */
        MailEvent.DEL_All_MAIL = "DEL_All_MAIL";
        /** 删除邮件 */
        MailEvent.DEL_MAIL = "DEL_MAIL";
        /** 更新邮件数据 */
        MailEvent.UPDATE_MAIL_DATA = "UPDATE_MAIL_DATA";
        /** 更新友情点数据 */
        MailEvent.UPDATE_FRIEND_POINT_DATA = "UPDATE_FRIEND_POINT_DATA";
        return MailEvent;
    }(tl3d.BaseEvent));
    game.MailEvent = MailEvent;
    var MailTabType;
    (function (MailTabType) {
        MailTabType[MailTabType["mail"] = 0] = "mail";
        MailTabType[MailTabType["friendPoint"] = 1] = "friendPoint";
    })(MailTabType = game.MailTabType || (game.MailTabType = {}));
})(game || (game = {}));
