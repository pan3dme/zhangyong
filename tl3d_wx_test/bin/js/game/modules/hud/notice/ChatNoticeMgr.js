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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var ChatNoticeMgr = /** @class */ (function () {
        function ChatNoticeMgr() {
            /** 存要弹出提示的数组 */
            this._noticeAry = new Array();
        }
        ChatNoticeMgr.getInstance = function () {
            if (!ChatNoticeMgr._instance) {
                ChatNoticeMgr._instance = new ChatNoticeMgr();
            }
            return ChatNoticeMgr._instance;
        };
        /** 添加公告 */
        ChatNoticeMgr.prototype.addNoticeToPush = function (noticeVo) {
            var bool = this._noticeAry.length == 0;
            this._noticeAry.push(noticeVo);
            if (bool)
                this.showNotice();
        };
        /** 添加自定义公告,仅自己可见 */
        ChatNoticeMgr.prototype.addCustomNotice = function (content) {
            var vo = new NoticeVo([-1, content]);
            this.addNoticeToPush(vo);
        };
        /** 删除数组最后一个并且开始下一个 */
        ChatNoticeMgr.prototype.startNext = function () {
            this._noticeAry.shift();
            this.showNotice();
        };
        /** 播放公告 */
        ChatNoticeMgr.prototype.showNotice = function () {
            if (this._noticeAry.length == 0) {
                var uiPanel = UIMgr.getUIByName(UIConst.ChatNoticeEffect);
                uiPanel.removeSelf();
                return;
            }
            var noticeText = this._noticeAry[0].getText();
            if (noticeText) {
                if (UIMgr.hasStage(UIConst.ChatNoticeEffect)) {
                    var uiPanel = UIMgr.getUIByName(UIConst.ChatNoticeEffect);
                    uiPanel.startAction(noticeText);
                }
                else {
                    UIMgr.showUI(UIConst.ChatNoticeEffect, noticeText);
                }
            }
        };
        /** 获取公告内容 */
        ChatNoticeMgr.prototype.getNoticeText = function (ary, formatHtml) {
            if (formatHtml === void 0) { formatHtml = false; }
            var id = ary.shift();
            var data = ary;
            var tbNotice = tb.TB_notice.get_TB_notice_ById(id);
            // 有点击参数时,替换数据
            if (tbNotice && tbNotice.par_click) {
                var obj = void 0;
                var tbGod = void 0;
                var godName = void 0, godid = void 0;
                for (var key in data) {
                    var type = tbNotice.getType(Number(key));
                    switch (type) {
                        case NoticeParamType.god:
                            godid = data[key];
                            tbGod = tb.TB_god.get_TB_godById(parseInt(godid));
                            godName = tbGod ? tbGod.name : "";
                            if (tbGod && formatHtml) {
                                var godStar = data[tbNotice.getIndex(NoticeParamType.godStar)];
                                obj = { type: type, id: godid, num: godStar ? godStar : 1 };
                                data[key] = "<span href='" + JSON.stringify(obj) + "'>" + godName + "</span>";
                            }
                            else {
                                data[key] = godName;
                            }
                            break;
                        case NoticeParamType.rarityGod:
                            godid = data[key];
                            tbGod = tb.TB_god.get_TB_godById(parseInt(godid));
                            godName = tbGod ? tbGod.name : "";
                            godName = godName;
                            if (tbGod && formatHtml) {
                                var godStar = data[tbNotice.getIndex(NoticeParamType.godStar)];
                                obj = { type: type, id: godid, num: godStar ? godStar : 1 };
                                data[key] = "<span href='" + JSON.stringify(obj) + "'>" + godName + "</span>";
                            }
                            else {
                                data[key] = godName;
                            }
                            break;
                        case NoticeParamType.item:
                            var itemid = data[key];
                            var tbItem = tb.TB_item.get_TB_itemById(parseInt(itemid));
                            var itemName = tbItem ? tbItem.name : "";
                            if (tbItem && formatHtml) {
                                var itemCnt = data[tbNotice.getIndex(NoticeParamType.itemCnt)];
                                obj = { type: type, id: itemid, num: itemCnt ? itemCnt : 1 };
                                data[key] = "<span href='" + JSON.stringify(obj) + "'>" + itemName + "</span>";
                            }
                            else {
                                data[key] = itemName;
                            }
                            break;
                        case NoticeParamType.guildHelpItem:
                            var itemAry = data[key];
                            var str = "";
                            for (var i = 0, len = itemAry.length; i < len; i++) {
                                var helpId = itemAry[i][0];
                                var tbHelp = tb.TB_guild_help.getItemnById(parseInt(helpId));
                                if (tbHelp) {
                                    str += tbHelp.desc + "x" + itemAry[i][1] + (i < len - 1 ? '，' : '');
                                }
                            }
                            data[key] = str;
                            break;
                        case NoticeParamType.gloryId:
                            var gloryId = data[key];
                            var tbHonour = tb.TB_honour_reward.getItemById(parseInt(gloryId));
                            data[key] = tbHonour ? tbHonour.desc : "未知";
                            break;
                        case NoticeParamType.joinGuildState:
                            var isYes = Number(data[key]) == iface.tb_prop.guildAutoJoinTypeKey.yes;
                            data[key] = isYes ? "加入" : "申请";
                            break;
                        case NoticeParamType.joinGuild:
                            var guildId = data[key];
                            obj = { type: type, guildId: guildId, guildName: data[1] || "" };
                            if (formatHtml) {
                                data[key] = "<span style=\"color:#f66227;\" href='" + JSON.stringify(obj) + "'>\u6211\u8981\u52A0\u5165</span>";
                            }
                            else {
                                data[key] = "<span style=\"color:#f66227;\">\u6211\u8981\u52A0\u5165</span>";
                            }
                            break;
                        case NoticeParamType.joinTeamGroup:
                            var teamGroupId = data[key];
                            obj = { type: type, teamGroupId: teamGroupId };
                            if (formatHtml) {
                                data[key] = "<span style=\"color:#f66227;\" href='" + JSON.stringify(obj) + "'>\u70B9\u51FB\u52A0\u5165</span>";
                            }
                            else {
                                data[key] = "<span style=\"color:#f66227;\">\u70B9\u51FB\u52A0\u5165</span>";
                            }
                            break;
                    }
                }
            }
            return tbNotice ? FormatStr(tbNotice.content, data).replace(/[\\]/ig, "") : "";
        };
        return ChatNoticeMgr;
    }());
    game.ChatNoticeMgr = ChatNoticeMgr;
    var ChatNoticeEffect = /** @class */ (function (_super) {
        __extends(ChatNoticeEffect, _super);
        function ChatNoticeEffect() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this._imgBg = new Laya.Image(SkinUtil.chatnotice);
            _this.close = null;
            //
            _this.isIgnore = true;
            _this._imgBg.width = Laya.stage.width;
            _this._imgBg.height = 50;
            _this._imgBg.anchorX = 0.5;
            _this._imgBg.anchorY = 0.5;
            _this.addChild(_this._imgBg);
            _this._imgBg.x = Laya.stage.width / 2;
            _this._imgBg.top = 80;
            _this._imgBg.alpha = 0.5;
            // 
            _this._htmlText.style.fontSize = 27;
            _this.addChild(_this._htmlText);
            _this._htmlText.style.color = '#ffffff';
            _this._htmlText.style.align = 'center';
            _this._htmlText.style.wordWrap = false;
            _this._htmlText.style.valign = 'center';
            //
            _this._initPosX = _this._imgBg.x + (_this._imgBg.width / 2);
            _this._endPosX = _this._initPosX - _this._imgBg.width - (_this._htmlText.width * 1.2);
            _this.popupCenter = false;
            _this.mouseEnabled = false;
            _this._imgBg.sizeGrid = "5,5,5,5";
            return _this;
        }
        ChatNoticeEffect.prototype.isHideBg = function () {
            if (this._imgBg.skin)
                this._imgBg.skin = null;
        };
        ChatNoticeEffect.prototype.isShowbg = function () {
            if (!this._imgBg.skin)
                this._imgBg.skin = SkinUtil.chatnotice;
        };
        ChatNoticeEffect.prototype.startAction = function (text) {
            this._htmlText.y = this._imgBg.y - 12;
            this._htmlText.innerHTML = text;
            this._htmlText.x = this._imgBg.x + this._initPosX;
            var totalwidth = this._htmlText.width + this._imgBg.width; //总的长度为文本长度和屏幕宽度
            this._endPosX = this._initPosX - totalwidth;
            text.length != 0 ? this.isShowbg() : this.isHideBg();
            var t = totalwidth / 110;
            Laya.Tween.to(this._htmlText, { x: this._endPosX }, t * 1000, null, Handler.create(this, function () { ChatNoticeMgr.getInstance().startNext(); }));
        };
        ChatNoticeEffect.prototype.show = function () {
            _super.prototype.show.call(this, false, false);
            this.startAction(this.dataSource);
        };
        return ChatNoticeEffect;
    }(DialogExt));
    game.ChatNoticeEffect = ChatNoticeEffect;
    var NoticeVo = /** @class */ (function () {
        function NoticeVo(data) {
            this.ID = data.shift();
            this.data = data;
        }
        NoticeVo.prototype.getText = function () {
            if (this.ID == -1) {
                return this.data[0];
            }
            else {
                return ChatNoticeMgr.getInstance().getNoticeText(__spreadArrays([this.ID], this.data), false);
            }
        };
        return NoticeVo;
    }());
    game.NoticeVo = NoticeVo;
})(game || (game = {}));
