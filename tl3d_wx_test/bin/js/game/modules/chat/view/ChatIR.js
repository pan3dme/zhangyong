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
    var ChatIR = /** @class */ (function (_super) {
        __extends(ChatIR, _super);
        function ChatIR() {
            var _this = _super.call(this) || this;
            _this.lbName.autoSize = true;
            _this.lbChannel.autoSize = true;
            _this._htmlText = new Laya.HTMLDivElement();
            _this._htmlText.style.align = 'left';
            _this._htmlText.style.fontSize = 23;
            _this._htmlText.style.wordWrap = true;
            _this._htmlText.style.leading = 5;
            _this._htmlText.autoSize = true;
            _this.addChild(_this._htmlText);
            _this._htmlText.on(Laya.Event.LINK, _this, _this.onLink);
            return _this;
        }
        Object.defineProperty(ChatIR.prototype, "dataSource", {
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
        ChatIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                this.lbName.color = data.getTitleColor();
                this._htmlText.style.color = data.getContentColor();
                this.lbChannel.text = "\u3010" + (data.channel == iface.tb_prop.chatChannelTypeKey.province ? data.getCity() : data.channelName) + "\u3011";
                this.lbChannel.color = data.getChannelColor();
                if (data.isSystem()) {
                    this.lbName.text = "";
                    this.headBox.dataSource = null;
                    this.imgBg.visible = this.headBox.visible = false;
                    this.lbChannel.x = 10;
                    this._htmlText.x = this.lbChannel.x + this.lbChannel.width;
                    this._htmlText.y = this.lbChannel.y;
                    // 设置高度
                    this._htmlText.style.wordWrap = true;
                    // this._htmlText.style.align = 'left';
                    this._htmlText.width = 500;
                    this._htmlText.innerHTML = data.getContent();
                    this.height = this._htmlText.y + this._htmlText.contextHeight + 10;
                }
                else {
                    this.lbName.text = data.getName();
                    // 文本气泡背景图需要自适应文本内容的宽高
                    this.imgBg.visible = this.headBox.visible = true;
                    this.headBox.dataSource = data.headVo;
                    // 设置不换行，为了输入文本内容时，可以得出该文本的宽度
                    this._htmlText.style.wordWrap = false;
                    this._htmlText.innerHTML = data.getContent();
                    // 最大文本宽度 = 总宽度 - 头像宽度95 - 气泡头部空隙20(文本在气泡里面的开始距离) - 气泡尾部10(文本在气泡里面的结束距离) - 气尾部空隙10
                    var maxTextWidth = this.width - 145;
                    if (this._htmlText.contextWidth > maxTextWidth) {
                        // 超宽时，设置换行，固定文本的宽度
                        this._htmlText.style.wordWrap = true;
                        this._htmlText.width = maxTextWidth;
                    }
                    // 气泡的宽度是文本宽度 + 头部空隙20 + 尾部空隙10
                    this.imgBg.width = this._htmlText.contextWidth + 30;
                    if (data.isSelf()) {
                        this.headBox.x = this.width - this.headBox.width;
                        this.imgBg.scaleX = -1;
                        this.imgBg.skin = SkinUtil.chatBg2;
                        this.imgBg.x = this.headBox.x - 10;
                        this.lbChannel.x = this.headBox.x - this.lbChannel.width;
                        // 私聊
                        if (data.channel == iface.tb_prop.chatChannelTypeKey.whisper) {
                            this.lbChannel.text = "";
                            this.lbName.x = this.headBox.x - this.lbName.width - 10;
                        }
                        else {
                            this.lbName.x = this.lbChannel.x - this.lbName.width;
                        }
                        this._htmlText.x = this.imgBg.x - this._htmlText.contextWidth - 20;
                        this._htmlText.y = this.imgBg.y + 10;
                        // this._htmlText.style.align = 'right';
                        this.imgBg.height = this._htmlText.y + this._htmlText.contextHeight + 5 - this.imgBg.y;
                        var lastH = this.imgBg.y + this.imgBg.height + 5;
                        lastH = lastH > this.headBox.height ? lastH : this.headBox.height;
                        this.height = lastH;
                    }
                    else {
                        this.headBox.x = 0;
                        this.imgBg.scaleX = 1;
                        this.imgBg.skin = SkinUtil.chatBg1;
                        this.imgBg.x = this.lbChannel.x = this.headBox.x + this.headBox.width;
                        if (data.channel == iface.tb_prop.chatChannelTypeKey.whisper) {
                            this.lbChannel.text = "";
                            this.lbName.x = this.lbChannel.x;
                        }
                        else {
                            this.lbName.x = this.lbChannel.x + this.lbChannel.width;
                        }
                        this._htmlText.x = this.imgBg.x + 20;
                        this._htmlText.y = this.imgBg.y + 10;
                        // this._htmlText.style.align = 'left';
                        this.imgBg.height = this._htmlText.y + this._htmlText.contextHeight + 5 - this.imgBg.y;
                        var lastH = this.imgBg.y + this.imgBg.height + 5;
                        lastH = lastH > this.headBox.height ? lastH : this.headBox.height;
                        this.height = lastH;
                    }
                }
                this.headBox.on(Laya.Event.CLICK, this, this.onShowPlayer);
            }
            else {
                this.headBox.dataSource = null;
                this._htmlText.innerHTML = "";
                this.headBox.off(Laya.Event.CLICK, this, this.onShowPlayer);
            }
        };
        ChatIR.prototype.onLink = function (data) {
            var info = JSON.parse(data);
            var type = info.type;
            if (type == NoticeParamType.item) {
                UIUtil.showItemTip(new ItemVo(info.id, info.num));
            }
            else if (type == NoticeParamType.god) {
                var tbItem = tb.TB_item.get_TB_itemById(info.id);
                if (tbItem) {
                    UIUtil.showTip(tbItem, info.num > 0 ? { degree: info.num, starLevel: info.num } : null);
                }
            }
            else if (type == NoticeParamType.rarityGod) {
                var tbGod = tb.TB_god.get_TB_godById(info.id);
                if (tbGod) {
                    UIUtil.showTip(tbGod, { degree: info.num, starLevel: info.num });
                }
            }
            else if (type == NoticeParamType.gotoGuildHelp) {
                UIMgr.hideUIByName(UIConst.ChatView);
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_HELP_VIEW), 1);
            }
            else if (type == NoticeParamType.joinGuild) {
                if (game.GuildModel.getInstance().isHasGuild()) {
                    showToast(LanMgr.getLan("", 10256));
                    return;
                }
                var args = {};
                args[Protocol.guild_guild_apply.args.guildId] = info.guildId;
                PLC.request(Protocol.guild_guild_apply, args, function ($data, msg) {
                    if (!$data) {
                        return;
                    }
                    if ($data.addMember) {
                        showToast(LanMgr.getLan("", 10257), info.guildName);
                        UIMgr.hideUIByName(UIConst.ChatView);
                        dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
                        return;
                    }
                    else {
                        showToast(LanMgr.getLan("", 10258));
                    }
                });
            }
            else if (type == NoticeParamType.joinTeamGroup) {
                dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.APPLY_JOIN_TEAM), info.teamGroupId);
            }
        };
        ChatIR.prototype.onShowPlayer = function () {
            var info = this.dataSource;
            if (!info)
                return;
            // 同省聊天和跨服聊天不能操作，隐藏按钮
            var isCrossSvr = [iface.tb_prop.chatChannelTypeKey.province, iface.tb_prop.chatChannelTypeKey.crossServer].indexOf(info.channel) != -1;
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW), { playerId: info.svo.senderId, hideAllBtn: isCrossSvr, isCrossSvr: isCrossSvr });
        };
        return ChatIR;
    }(ui.chat.ChatIRUI));
    game.ChatIR = ChatIR;
})(game || (game = {}));
