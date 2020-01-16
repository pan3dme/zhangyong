var game;
(function (game) {
    /** 聊天消息 */
    var ChatInfoVo = /** @class */ (function () {
        function ChatInfoVo(vo, channel) {
            this._htmlReg = /<\/?.+?\/?>/ig;
            this.hasImg = false;
            this.svo = vo;
            this.channel = channel;
            var isSystem = this.isSystem();
            // 系统公告不屏蔽
            this.content = isSystem ? vo.content : doShield1(vo.content);
            this.channelName = "";
            if (isSystem) {
                this.channelName = LanMgr.getLan("", 12496);
            }
            else {
                this.channelName = LanMgr.channelNames[this.channel];
            }
            this.headVo = isSystem ? null : new UserHeadVo(vo.senderHead, vo.senderLevel, vo.senderHeadFrame);
        }
        /** 获取内容 */
        ChatInfoVo.prototype.getContent = function () {
            if (!this._content) {
                if (this.svo.type == iface.tb_prop.chatTypeKey.notice) {
                    // 公告的内容有带html格式的内容
                    var noticeCt = game.ChatNoticeMgr.getInstance().getNoticeText(JSON.parse(this.content), true);
                    this._content = this.formatHtmlText(noticeCt);
                }
                else {
                    this._content = this.formatHtmlText(this.content);
                }
                // 格式成html文本之前需要确认  不是html标签格式的,且第一个字符是<时，需要把<字符去除，否则htmltext组件会报错
                var isHtml = this._htmlReg.test(this._content);
                if (!isHtml && this._content.indexOf("<") == 0) {
                    this._content = "*" + this._content.slice(1);
                }
            }
            return this._content;
        };
        /** 获取简单内容 */
        ChatInfoVo.prototype.getSimpleCt = function (count) {
            if (count === void 0) { count = 20; }
            if (!this._simpleCt) {
                // 公告的内容有带html格式的内容
                if (this.svo.type == iface.tb_prop.chatTypeKey.notice) {
                    var noticeCt = game.ChatNoticeMgr.getInstance().getNoticeText(JSON.parse(this.content), false);
                    // 去除html标签格式<>
                    var ct = noticeCt.replace(/<\/?.+?\/?>/ig, "");
                    if (ct.length > count) {
                        var delCt = ct.slice(count);
                        for (var i = delCt.length - 1; i >= 0; i--) {
                            // 忽略ASCII字符，怕删除后解析错误
                            var code = delCt.charCodeAt(i);
                            if (code > 127) {
                                var index = noticeCt.lastIndexOf(delCt[i]);
                                if (index != -1) {
                                    noticeCt = noticeCt.substring(0, index) + noticeCt.substring(index + 1);
                                }
                            }
                        }
                        noticeCt += "...";
                    }
                    this._simpleCt = this.formatHtmlText(noticeCt);
                    return this._simpleCt;
                }
                else {
                    this._simpleCt = this.formatHtmlText(this.content, true);
                    this._simpleCt = this._simpleCt.length >= count ? this._simpleCt.slice(0, count) + "..." : this._simpleCt;
                }
                // 格式成html文本之前需要确认  不是html标签格式的,且第一个字符是<时，需要把<字符去除，否则htmltext组件会报错
                var isHtml = this._htmlReg.test(this._simpleCt);
                if (!isHtml && this._simpleCt.indexOf("<") == 0) {
                    this._simpleCt = "*" + this._simpleCt.slice(1);
                }
            }
            return this._simpleCt;
        };
        /** 频道颜色 */
        ChatInfoVo.prototype.getChannelColor = function () {
            if (this.isSystem()) {
                return ColorConst.RED;
            }
            switch (this.channel) {
                case iface.tb_prop.chatChannelTypeKey.world:
                    return ColorConst.CHAT_WORLD;
                case iface.tb_prop.chatChannelTypeKey.guild:
                    return ColorConst.CHAT_GUILD;
                case iface.tb_prop.chatChannelTypeKey.province:
                    return ColorConst.CHAT_PROVINCE;
                case iface.tb_prop.chatChannelTypeKey.crossServer:
                    return ColorConst.CHAT_CROSS_SVR;
                default:
                    return ColorConst.RED;
            }
        };
        ChatInfoVo.prototype.getName = function () {
            return this.isSystem() ? LanMgr.getLan("", 10040) : this.svo.senderName;
        };
        /** 获取私聊的的好友id */
        ChatInfoVo.prototype.getFriendId = function () {
            if (this.channel != iface.tb_prop.chatChannelTypeKey.whisper) {
                return "";
            }
            return this.svo.senderId == App.hero.playerId ? this.svo.receiveId : this.svo.senderId;
        };
        /** 获取城市 */
        ChatInfoVo.prototype.getCity = function () {
            return this.svo.city || LanMgr.getLan("", 12230);
        };
        /** 是否自己 */
        ChatInfoVo.prototype.isSelf = function () {
            return this.svo.senderId == App.hero.playerId;
        };
        /** 是否系统 */
        ChatInfoVo.prototype.isSystem = function () {
            return !this.svo.senderId || this.svo.senderId == "";
        };
        /** 标题颜色 */
        ChatInfoVo.prototype.getTitleColor = function () {
            return ColorConst.normalFont;
        };
        /** 获取内容颜色 */
        ChatInfoVo.prototype.getContentColor = function () {
            return ColorConst.normalFont;
        };
        /** 格式化 */
        ChatInfoVo.prototype.formatHtmlText = function (ct, isSimple) {
            if (isSimple === void 0) { isSimple = false; }
            // 注意不能span标签包含span标签
            // 匹配表情
            var strArr = this.formatStrToArr(ct, new RegExp('##[0-9]{2}', "g"));
            var resultArr = [];
            this.hasImg = strArr.length > 1;
            for (var i = 0, len = strArr.length; i < len; i++) {
                resultArr.push(strArr[i]);
                // // 匹配英雄
                // resultArr.push(...this.formatStrToArr(strArr[i],new RegExp('{gid[0-9]+}', "g")));
            }
            // 循环遍历resultArr数组,
            var result = "";
            for (var i = 0, len = resultArr.length; i < len; i++) {
                var str = resultArr[i];
                if (isSimple) {
                    if (game.ChatModel.isExpression(str)) {
                        result += "[" + LanMgr.getLan("", 12497) + "]";
                    }
                    else {
                        result += str;
                    }
                }
                else {
                    if (game.ChatModel.isExpression(str)) {
                        //width='40' height='40'
                        result += "<img style='padding:-10px -3px 0 -3px;' src='" + game.ChatModel.getExpressionUrl(str) + "' ></img>";
                    }
                    else {
                        // result += (this.hasImg ? `<span style='padding:-15px 0 0 0;'>${str}</span>` : `${str}`);
                        result += "" + str;
                    }
                    // else if( str.match(new RegExp('{gid[0-9]+}', "g")) ){
                    //     let godid = str.substring(4,str.length-1);
                    //     let godName = tb.TB_god.get_TB_godById(parseInt(godid)).name;
                    //     let obj = {type:NoticeParamType.god,gid:godid};
                    //     result += (this.hasImg ? `<span style='padding:-15px 0 0 0;' href='${JSON.stringify(obj)}'>${godName}</span>` : `<span href='${JSON.stringify(obj)}'>${godName}</span>`);
                    // }
                }
            }
            return result;
        };
        ChatInfoVo.prototype.formatStrToArr = function (str, reg) {
            var execArr = [];
            var r;
            var strArr = [];
            // 获取成功匹配该正则表达式的所有内容
            while (r = reg.exec(str)) {
                execArr.push(r);
            }
            var start = 0;
            for (var i = 0, len = execArr.length; i < len; i++) {
                var execObj = execArr[i];
                var index = execObj['index'];
                var execLen = execObj['0'].length;
                // 如果第一个索引大于0表示,前面有内容,先截取保存
                if (index > start) {
                    strArr.push(str.substring(start, index));
                }
                // 然后保存匹配的字符串
                strArr.push(str.substring(index, index + execLen));
                start = index + execLen;
            }
            // 最后把结尾的内容保存
            if (str.length > start) {
                strArr.push(str.substring(start));
            }
            return strArr;
        };
        return ChatInfoVo;
    }());
    game.ChatInfoVo = ChatInfoVo;
})(game || (game = {}));
