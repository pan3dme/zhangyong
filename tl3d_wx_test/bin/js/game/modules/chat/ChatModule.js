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
    var ChatModule = /** @class */ (function (_super) {
        __extends(ChatModule, _super);
        function ChatModule() {
            return _super.call(this) || this;
        }
        ChatModule.prototype.getModuleName = function () {
            return "ChatModule";
        };
        ChatModule.prototype.listProcessors = function () {
            return [new game.ChatProcessor(), new game.PrivateChatProcessor()];
        };
        /**
         * 模块初始化
         */
        ChatModule.prototype.onRegister = function () {
        };
        return ChatModule;
    }(tl3d.Module));
    game.ChatModule = ChatModule;
    var ChatEvent = /** @class */ (function (_super) {
        __extends(ChatEvent, _super);
        function ChatEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开聊天主界面 */
        ChatEvent.SHOW_CHAT_PANEL = "SHOW_CHAT_PANEL";
        /** 发送消息 */
        ChatEvent.SEND_CHAT_TEXT = "SEND_CHAT_TEXT";
        /** 发送语音消息 */
        ChatEvent.SEND_CHAT_VOICE = "SEND_CHAT_VOICE";
        /** 添加全部频道的聊天消息 */
        ChatEvent.ADD_ALL_CHAT = "ADD_ALL_CHAT";
        /** 添加世界频道的聊天消息 */
        ChatEvent.ADD_WORLD_CHAT = "ADD_WORLD_CHAT";
        /** 添加工会频道的聊天消息 */
        ChatEvent.ADD_GUILD_CHAT = "ADD_GUILD_CHAT";
        /** 添加组队频道的聊天消息 */
        ChatEvent.ADD_GROUP_CHAT = "ADD_GROUP_CHAT";
        /** 添加同省频道的聊天信息 */
        ChatEvent.ADD_PROVINCE_CHAT = "ADD_PROVINCE_CHAT";
        /** 添加跨服频道的聊天信息 */
        ChatEvent.ADD_CROSS_CHAT = "ADD_CROSS_CHAT";
        /** 添加系统频道的聊天信息 */
        ChatEvent.ADD_SYSTEM_CHAT = "ADD_SYSTEM_CHAT";
        /** 更新新消息数量 */
        ChatEvent.UPDATE_NEW_CHAT_COUNT = "UPDATE_NEW_CHAT_COUNT";
        /** 更新世界聊天 */
        ChatEvent.UPDATE_WORLD_CHAT = "UPDATE_WORLD_CHAT";
        /** 更新工会聊天 */
        ChatEvent.UPDATE_CLUB_CHAT = "UPDATE_CLUB_CHAT";
        /** 打开私聊聊天主界面 */
        ChatEvent.SHOW_PRIVATE_CHAT_VIEW = "SHOW_PRIVATE_CHAT_VIEW";
        /** 发送私聊消息 */
        ChatEvent.SEND_PRIVATE_CHAT = "SEND_PRIVATE_CHAT";
        /** 删除私聊信息 */
        ChatEvent.DEL_PRIVATE_CHAT = "DEL_PRIVATE_CHAT";
        /** 添加私聊频道的聊天消息 */
        ChatEvent.ADD_PRIVATE_CHAT = "ADD_PRIVATE_CHAT";
        /** 新发起的私聊 */
        ChatEvent.NEW_PERSON_PRIVATE_CHAT = "NEW_PERSON_PRIVATE_CHAT";
        /** 开始定时请求私聊数据 */
        ChatEvent.START_REQUEST_PRIVATE_CHAT = "START_REQUEST_PRIVATE_CHAT";
        /** 停止请求私聊数据 */
        ChatEvent.STOP_REQUEST_PRIVATE_CHAT = "STOP_REQUEST_PRIVATE_CHAT";
        /** 更新私聊 */
        ChatEvent.UPDATE_PRIVATE_CHAT = "UPDATE_PRIVATE_CHAT";
        /** 快捷语打开或隐藏 */
        ChatEvent.SHORTCUTS_OPEN_OR_HIDE = "SHORTCUTS_OPEN_OR_HIDE";
        /** 聊天发送成功 */
        ChatEvent.CHAT_SEND_SUCCESS = "CHAT_SEND_SUCCESS";
        return ChatEvent;
    }(tl3d.BaseEvent));
    game.ChatEvent = ChatEvent;
    /** 打开方式 */
    var OpenType;
    (function (OpenType) {
        OpenType[OpenType["common"] = 0] = "common";
        OpenType[OpenType["godDm"] = 1] = "godDm";
    })(OpenType = game.OpenType || (game.OpenType = {}));
})(game || (game = {}));
