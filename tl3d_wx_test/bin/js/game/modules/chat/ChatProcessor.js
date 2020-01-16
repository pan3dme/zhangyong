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
    var ChatProcessor = /** @class */ (function (_super) {
        __extends(ChatProcessor, _super);
        function ChatProcessor() {
            var _this = _super.call(this) || this;
            _this.gmKey = "nbhero";
            _this.debugKey = "debughero";
            _this._model = game.ChatModel.getInstance();
            return _this;
        }
        ChatProcessor.prototype.getName = function () {
            return "ChatProcessor";
        };
        ChatProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ChatEvent(game.ChatEvent.SHOW_CHAT_PANEL),
                new game.ChatEvent(game.ChatEvent.SEND_CHAT_TEXT),
                new game.ChatEvent(game.ChatEvent.SEND_CHAT_VOICE),
                new game.ChatEvent(game.ChatEvent.ADD_ALL_CHAT),
                new game.ChatEvent(game.ChatEvent.ADD_WORLD_CHAT),
                new game.ChatEvent(game.ChatEvent.ADD_GUILD_CHAT),
                new game.ChatEvent(game.ChatEvent.ADD_GROUP_CHAT),
                new game.ChatEvent(game.ChatEvent.ADD_PROVINCE_CHAT),
                new game.ChatEvent(game.ChatEvent.ADD_CROSS_CHAT),
                new game.ChatEvent(game.ChatEvent.ADD_SYSTEM_CHAT),
            ];
        };
        //处理事件
        ChatProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.ChatEvent) {
                switch ($event.type) {
                    case game.ChatEvent.SHOW_CHAT_PANEL:
                        this.showChatPanel($event.data);
                        break;
                    case game.ChatEvent.SEND_CHAT_TEXT:
                        this.onSendText($event.data);
                        break;
                    case game.ChatEvent.SEND_CHAT_VOICE:
                        this.onSendVoice($event.data);
                        break;
                    case game.ChatEvent.ADD_ALL_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.all);
                        break;
                    case game.ChatEvent.ADD_WORLD_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.world);
                        break;
                    case game.ChatEvent.ADD_GUILD_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.guild);
                        break;
                    case game.ChatEvent.ADD_GROUP_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.group);
                        break;
                    case game.ChatEvent.ADD_PROVINCE_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.province);
                        break;
                    case game.ChatEvent.ADD_CROSS_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.crossServer);
                        break;
                    case game.ChatEvent.ADD_SYSTEM_CHAT:
                        this.addNewChat($event.data, iface.tb_prop.chatChannelTypeKey.system);
                        break;
                }
            }
        };
        /** 打开聊天主界面 */
        ChatProcessor.prototype.showChatPanel = function (data) {
            var _this = this;
            var arg = {};
            arg[Protocol.chat_chat_list.args.channel] = iface.tb_prop.chatChannelTypeKey.all;
            PLC.request(Protocol.chat_chat_list, arg, function (res) {
                if (!res)
                    return;
                _this._model.updateChatList(res);
                UIMgr.showUI(UIConst.ChatView, data);
            });
        };
        /** 聊天文本消息发送 */
        ChatProcessor.prototype.onSendText = function (args) {
            var model = this._model;
            var ct = args[0];
            var channel = model.getChannelByIndex(args[1]);
            if (channel == iface.tb_prop.chatChannelTypeKey.all) {
                channel = iface.tb_prop.chatChannelTypeKey.world;
            }
            var lv = App.getOpenValue(ModuleConst.CHAT);
            if (channel == iface.tb_prop.chatChannelTypeKey.world && !App.IsSysOpen(ModuleConst.CHAT)) {
                showToast(LanMgr.getLan('', 11017, lv));
                return;
            }
            if (channel == iface.tb_prop.chatChannelTypeKey.province && !App.IsSysOpen(ModuleConst.CHAT_PROVI)) {
                showToast(LanMgr.getLan('', 10251, App.getOpenValue(ModuleConst.CHAT_PROVI)));
                return;
            }
            if (channel == iface.tb_prop.chatChannelTypeKey.crossServer && !App.IsSysOpen(ModuleConst.CHAT_CROSSSRV)) {
                showToast(LanMgr.getLan('', 10252, App.getOpenValue(ModuleConst.CHAT_CROSSSRV)));
                return;
            }
            if (channel == iface.tb_prop.chatChannelTypeKey.guild && !App.hero.guildId) {
                showToast(LanMgr.getLan('', 10071));
                return;
            }
            if (channel == iface.tb_prop.chatChannelTypeKey.group && !game.GodDomainModel.getInstance().hasTeam()) {
                showToast(LanMgr.getLan('', 10253));
                return;
            }
            if (!ct || ct == "" || ct.trim().length <= 0) {
                showToast(LanMgr.getLan('', 10012));
                return;
            }
            if (ct == this.gmKey) {
                game.PlayerDetailsView.gmLock = false;
                return;
            }
            else if (ct == this.debugKey) {
                game.PlayerDetailsView.debugLock = false;
                return;
            }
            var cdTime = model.getCdTime(channel);
            var s = Math.ceil(cdTime - App.serverTimeSecond);
            if (channel == iface.tb_prop.chatChannelTypeKey.world && App.serverTimeSecond < cdTime) {
                showToast(LanMgr.getLan('', 10013, s));
                return;
            }
            if (channel == iface.tb_prop.chatChannelTypeKey.province && App.serverTimeSecond < cdTime) {
                var s_1 = Math.ceil(cdTime - App.serverTimeSecond);
                showToast(LanMgr.getLan('', 10254, s_1));
                return;
            }
            if (channel == iface.tb_prop.chatChannelTypeKey.crossServer && App.serverTimeSecond < cdTime) {
                var s_2 = Math.ceil(cdTime - App.serverTimeSecond);
                showToast(LanMgr.getLan('', 10255, s_2));
                return;
            }
            var arg = {};
            arg[Protocol.chat_chat_send.args.channel] = channel;
            arg[Protocol.chat_chat_send.args.type] = iface.tb_prop.chatTypeKey.text;
            arg[Protocol.chat_chat_send.args.content] = ct;
            PLC.request(Protocol.chat_chat_send, arg, function (res) {
                if (!res)
                    return;
                model.setCdTime(res['cdTime'], channel);
                // 同省跟跨服发消息完会获取不到自己发的，需要时间
                game.ChatThread.getInstance().onRequest(channel);
                var ui = UIMgr.getUIByName(UIConst.ChatView);
                if (ui) {
                    ui.afterSend();
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.CHAT_SEND_SUCCESS));
            });
            //聊天上报
            var hero = App.hero;
            var sinfo = window.platform.serverInfo;
            BingoSDK.gameReport("chat", hero.playerId, hero.accountName, sinfo.serverId, sinfo.srv_name, { chatTo: channel, content: ct, level: hero.level, vip: hero.vip, charge: hero.welfare.rechargeSum });
        };
        /** 聊天语音发送 */
        ChatProcessor.prototype.onSendVoice = function (args) {
        };
        /** 新增聊天消息 */
        ChatProcessor.prototype.addNewChat = function (chatList, type) {
            if (!chatList || chatList.length <= 0)
                return;
            // 添加新消息
            if (UIMgr.hasStage(UIConst.ChatView)) {
                var ui_1 = UIMgr.getUIByName(UIConst.ChatView);
                var uiChannel = this._model.getChannelByIndex(ui_1.tabList.selectedIndex);
                if (uiChannel == type) {
                    ui_1.addNewChats(chatList);
                }
            }
            // 更新主界面聊天消息--没有私聊
            if (UIMgr.hasStage(UIConst.Main3DView) && type == iface.tb_prop.chatChannelTypeKey.all) {
                var ui_2 = UIMgr.getUIByName(UIConst.Main3DView);
                ui_2.updateChatList();
            }
            // 更新新消息数量
            if (UIMgr.hasStage(UIConst.ChatView) && type == iface.tb_prop.chatChannelTypeKey.all) {
                var ui_3 = UIMgr.getUIByName(UIConst.ChatView);
                ui_3.updateNewChatNum();
            }
        };
        return ChatProcessor;
    }(tl3d.Processor));
    game.ChatProcessor = ChatProcessor;
})(game || (game = {}));
