var game;
(function (game) {
    var ChatModel = /** @class */ (function () {
        function ChatModel() {
            /** 新消息数量 */
            this._newNumMap = {};
            /** 世界聊天频道列表 */
            this._worldChatList = [];
            /** 工会聊天频道列表 */
            this._guildChatList = [];
            /** 私聊频道列表 */
            this._privateChatMap = new Laya.Dictionary();
            /** 队伍列表 */
            this._groupChatList = [];
            /** 同省聊天列表 */
            this._provinceChatList = [];
            /** 跨服聊天列表 */
            this._crossChatList = [];
            /** 系统信息列表 */
            this._systemList = [];
            this._cdDic = {};
            /** 频道映射 分页--频道 */
            this.channelMap = [
                iface.tb_prop.chatChannelTypeKey.world, iface.tb_prop.chatChannelTypeKey.guild,
                iface.tb_prop.chatChannelTypeKey.province, iface.tb_prop.chatChannelTypeKey.crossServer,
                iface.tb_prop.chatChannelTypeKey.system, iface.tb_prop.chatChannelTypeKey.group
            ];
        }
        ChatModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ChatModel();
            }
            return this._instance;
        };
        /** 初始化：私聊的缓存数据 */
        ChatModel.prototype.initModel = function () {
            this._storage = game.PrivateChatStorage.getInstance();
            this._storage.initStorage();
            this.addCustomChat(LanMgr.getLan("", 12495));
        };
        /** 添加世界自定义消息 */
        ChatModel.prototype.addCustomChat = function (content, channel, type) {
            if (channel === void 0) { channel = iface.tb_prop.chatChannelTypeKey.world; }
            if (type === void 0) { type = iface.tb_prop.chatTypeKey.text; }
            var svo = { type: type, time: App.getServerTime(), content: content };
            var info = new game.ChatInfoVo(svo, channel);
            if (channel == iface.tb_prop.chatChannelTypeKey.guild) {
                this._guildChatList.push(info);
            }
            else {
                this._worldChatList.push(info);
            }
            dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_ALL_CHAT, [info]));
        };
        ChatModel.prototype.loginVoice = function () {
            if (!this.main) {
                // appId	String	是	应用编号(需向CloudVoice申请，统一由CloudVoice分配)
                // environment	Number	是	0为国内正式环境
                // isRecognize	Number	是	是否开启语音识别1为开启，0为关闭
                var initData = { appid: 1003447, environment: 0, isRecognize: 1 };
                initData.complate = function (data) {
                    var _this = this;
                    console.log('初始化成功', data);
                    setTimeout(function () {
                        _this.loginVoice();
                    }, 100);
                };
                this.main = new IMblend(initData); // 初始化实例
                // userId	String	是	透传接入方用户id
                // roomId	String	是	房间号
                // complate	Function	是	接收返回结果函数
                var logData = {};
                logData.roomId = "1";
                logData.userId = App.hero.playerId;
                logData.complate = function (data) {
                    if (data.result == 0) {
                        // result 	Number		处理结果，成功为0，其他错误
                        // msg 	String 		返回的消息   
                        console.log('登陆成功', data);
                    }
                    ;
                };
                this.main.loginRoom(logData); // 登陆房间：调用该接口前请先初始化。
            }
        };
        //开始录音
        ChatModel.prototype.startRecord = function () {
            if (!this.main) {
                showToast(LanMgr.getLan("", 10250));
                return;
            }
            // ext	String	否	扩展字段，录音结束时返回
            // start	function	否	录音开始回调函数
            // finish	function	是	录音结束回调函数
            // recognitionFinish	function	否	开启语音识别时需要传递此函数
            this.main.startRecords({
                ext: new Date().getTime(),
                start: function () {
                    console.log('录音开始');
                },
                finish: function (data) {
                    console.log('录音结束，在此处调用发送信息接口可以将语音发送给同房间的其他用户');
                    console.log(data);
                    dispatchEvt(new game.ChatEvent(game.ChatEvent.SEND_CHAT_TEXT, [data.voiceFilePath, 1]));
                },
                recognitionFinish: function (data) {
                    console.log('语音识别回调成功');
                    console.log(data);
                }
            }); // 开始录音：调用该接口前请先登陆房间。
        };
        //停止录音
        ChatModel.prototype.stopRecord = function () {
            if (!this.main) {
                showToast(LanMgr.getLan("", 10250));
                return;
            }
            //result	Number		错误码：0为成功，其他为失败
            // msg	String		错误原因
            // voiceUrl	String		上传回调语音文件url（网络地址）
            // text	String		识别内容（finish回调中无此字段）
            this.main.stopRecord(); // 调用该接口后startRecords接口的finish函数接口录音结果, recognitionFinish接收识别返回结果
        };
        //播放线上录音：调用该接口前请先登陆房间。
        ChatModel.prototype.playChatVoice = function (msg) {
            if (!this.main) {
                showToast(LanMgr.getLan("", 10250));
                return;
            }
            //voiceFilePath	String	是	语音文件网络地址
            this.main.playOnlineAudio({
                voiceFilePath: msg.voiceFilePath,
                start: function () {
                    console.log('播放开始');
                },
                error: function () {
                    console.log('播放出错');
                },
                stop: function (data) {
                    console.log('播放完成');
                }
            }); // 播放线上录音：调用该接口前请先登陆房间。
        };
        //停止播放：调用该接口前请先登陆房间。
        ChatModel.prototype.stopChatVoice = function () {
            if (!this.main) {
                showToast(LanMgr.getLan("", 10250));
                return;
            }
            this.main.stopPlayAudio(); // 停止播放：调用该接口前请先登陆房间。
        };
        //设置语音识别
        ChatModel.prototype.setRecognize = function () {
            if (!this.main) {
                showToast(LanMgr.getLan("", 10250));
                return;
            }
            this.main.setRecognize(1); // 开启语音识别
            this.main.setRecognize(0); // 关闭语音识别
        };
        /**
         * 表情路径
         * @param str 代号 如：##00 ##01 (#会跟颜色#000000冲突)
         * 符号更改需改动的地方 getBqList、ChatInfoVo.formatHtmlText、getExpressionUrl
         */
        ChatModel.getExpressionUrl = function (str) {
            // 符号2位
            var bqid = parseInt(str.substring(2));
            return SkinUtil.getExpressionUrl(bqid);
        };
        /** 是否是表情代号 */
        ChatModel.isExpression = function (str) {
            if (str.length != 4)
                return false;
            if (str[0] != "#" && str[1] != "#")
                return false;
            // 符号2位
            var bqid = parseInt(str.substring(2));
            return bqid >= 0 && bqid < ChatModel.ExpressionNum;
        };
        /** 获取表情列表 */
        ChatModel.prototype.getBqList = function () {
            if (!this._bqList) {
                this._bqList = [];
                for (var i = 0; i < ChatModel.ExpressionNum; i++) {
                    var id = i < 10 ? "##0" + i : "##" + i;
                    this._bqList.push({ url: SkinUtil.getExpressionUrl(i), id: id, index: i });
                }
            }
            return this._bqList;
        };
        /** 获取聊天频道 */
        ChatModel.prototype.getChatListByType = function (type, count) {
            if (count === void 0) { count = 0; }
            if (type == iface.tb_prop.chatChannelTypeKey.world) {
                return this._worldChatList;
            }
            else if (type == iface.tb_prop.chatChannelTypeKey.guild) {
                return this._guildChatList;
            }
            else if (type == iface.tb_prop.chatChannelTypeKey.group) {
                return this._groupChatList;
            }
            else if (type == iface.tb_prop.chatChannelTypeKey.province) {
                return this._provinceChatList;
            }
            else if (type == iface.tb_prop.chatChannelTypeKey.crossServer) {
                return this._crossChatList;
            }
            else if (type == iface.tb_prop.chatChannelTypeKey.system) {
                return this._systemList;
            }
            else {
                var chats = this._worldChatList.concat(this._guildChatList).concat(this._provinceChatList).concat(this._crossChatList);
                chats.sort(function (a, b) {
                    return a.svo.time - b.svo.time;
                });
                // 获取最新的几条
                if (count > 0 && chats.length > 0) {
                    var start = chats.length - count;
                    start = start < 0 ? 0 : start;
                    chats = chats.slice(start, chats.length);
                }
                return chats;
            }
        };
        ChatModel.prototype.updateChatList = function (data) {
            if (!data) {
                return;
            }
            var allArr = [];
            var info;
            // 世界系统消息
            var worldSysList = [];
            var worldList = data['worldList'] || [];
            if (worldList && worldList.length > 0) {
                worldList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var wchangeList = [];
                var newNum = 0;
                for (var i = 0, len = worldList.length; i < len; i++) {
                    var svo = worldList[i];
                    //过滤掉黑名单
                    if (svo.senderId && App.hero.isInBlockList(svo.senderId)) {
                        continue;
                    }
                    info = new game.ChatInfoVo(svo, iface.tb_prop.chatChannelTypeKey.world);
                    // 世界频道内，公告且senderid为空 也要添加进系统频道
                    if (info.svo.type == iface.tb_prop.chatTypeKey.notice && info.isSystem()) {
                        worldSysList.push(svo);
                    }
                    wchangeList.push(info);
                    this._worldChatList.push(info);
                    allArr.push(info);
                    if (!info.isSelf()) {
                        newNum++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.world, newNum);
                if (this._worldChatList.length > ChatModel.MAX_COUNT) {
                    this._worldChatList.slice(0, ChatModel.MAX_COUNT);
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_WORLD_CHAT, [].concat(wchangeList)));
            }
            var guildList = data['guildList'] || [];
            if (guildList.length > 0) {
                guildList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var gchangeList = [];
                var newNum = 0;
                for (var i = 0, len = guildList.length; i < len; i++) {
                    var svo = guildList[i];
                    //过滤掉黑名单
                    if (svo.senderId && App.hero.isInBlockList(svo.senderId)) {
                        continue;
                    }
                    info = new game.ChatInfoVo(svo, iface.tb_prop.chatChannelTypeKey.guild);
                    gchangeList.push(info);
                    this._guildChatList.push(info);
                    allArr.push(info);
                    if (!info.isSelf()) {
                        newNum++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.guild, newNum);
                if (this._guildChatList.length > ChatModel.MAX_COUNT) {
                    this._guildChatList.slice(0, ChatModel.MAX_COUNT);
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_GUILD_CHAT, [].concat(gchangeList)));
            }
            var groupList = data['groupList'] || [];
            if (groupList.length > 0) {
                groupList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var tchangeList = [];
                var newNum = 0;
                for (var i = 0, len = groupList.length; i < len; i++) {
                    info = new game.ChatInfoVo(groupList[i], iface.tb_prop.chatChannelTypeKey.group);
                    tchangeList.push(info);
                    this._groupChatList.push(info);
                    allArr.push(info);
                    if (!info.isSelf()) {
                        newNum++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.group, newNum);
                if (this._groupChatList.length > ChatModel.MAX_COUNT) {
                    this._groupChatList.slice(0, ChatModel.MAX_COUNT);
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_GROUP_CHAT, [].concat(tchangeList)));
            }
            var provinceList = data['provinceList'] || [];
            if (provinceList.length > 0) {
                provinceList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var pchangeList = [];
                var newNum = 0;
                for (var i = 0, len = provinceList.length; i < len; i++) {
                    info = new game.ChatInfoVo(provinceList[i], iface.tb_prop.chatChannelTypeKey.province);
                    pchangeList.push(info);
                    this._provinceChatList.push(info);
                    allArr.push(info);
                    if (!info.isSelf()) {
                        newNum++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.province, newNum);
                if (this._provinceChatList.length > ChatModel.MAX_COUNT) {
                    this._provinceChatList.slice(0, ChatModel.MAX_COUNT);
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_PROVINCE_CHAT, [].concat(pchangeList)));
            }
            var crossList = data['crossList'] || [];
            if (crossList.length > 0) {
                crossList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var tchangeList = [];
                var newNum = 0;
                for (var i = 0, len = crossList.length; i < len; i++) {
                    info = new game.ChatInfoVo(crossList[i], iface.tb_prop.chatChannelTypeKey.crossServer);
                    tchangeList.push(info);
                    this._crossChatList.push(info);
                    allArr.push(info);
                    if (!info.isSelf()) {
                        newNum++;
                    }
                }
                this.addNewNum(iface.tb_prop.chatChannelTypeKey.crossServer, newNum);
                if (this._crossChatList.length > ChatModel.MAX_COUNT) {
                    this._crossChatList.slice(0, ChatModel.MAX_COUNT);
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_CROSS_CHAT, [].concat(tchangeList)));
            }
            var systemList = data['systemList'] || [];
            if (worldSysList.length > 0 || systemList.length > 0) {
                systemList = worldSysList.concat(systemList);
                systemList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var schangeList = [];
                for (var i = 0, len = systemList.length; i < len; i++) {
                    info = new game.ChatInfoVo(systemList[i], iface.tb_prop.chatChannelTypeKey.system);
                    schangeList.push(info);
                    this._systemList.push(info);
                    allArr.push(info);
                }
                if (this._systemList.length > ChatModel.MAX_COUNT) {
                    this._systemList.slice(0, ChatModel.MAX_COUNT);
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_SYSTEM_CHAT, [].concat(schangeList)));
            }
            var whisperList = data['whisperList'] || [];
            if (whisperList.length > 0) {
                whisperList.sort(function (a, b) {
                    return a.time - b.time;
                });
                var newPersonAry = [];
                for (var i = 0, len = whisperList.length; i < len; i++) {
                    var svo = whisperList[i];
                    //过滤掉黑名单
                    if (svo.senderId && App.hero.isInBlockList(svo.senderId)) {
                        continue;
                    }
                    info = new game.ChatInfoVo(svo, iface.tb_prop.chatChannelTypeKey.whisper);
                    var friendId = info.getFriendId();
                    var privateChatInfo = this._privateChatMap.get(friendId);
                    if (!privateChatInfo) {
                        privateChatInfo = this.createPrivateChatInfo(friendId);
                        newPersonAry.push(privateChatInfo);
                    }
                    if (!privateChatInfo.isExitChat(info.svo.senderId, info.svo.time)) {
                        privateChatInfo.addChat(info);
                    }
                }
                this._storage.resetStorage();
                if (newPersonAry.length > 0) {
                    dispatchEvt(new game.ChatEvent(game.ChatEvent.NEW_PERSON_PRIVATE_CHAT, newPersonAry));
                }
                dispatchEvt(new game.ChatEvent(game.ChatEvent.UPDATE_PRIVATE_CHAT));
            }
            if (allArr.length > 0) {
                allArr.sort(function (a, b) {
                    return a.svo.time - b.svo.time;
                });
                dispatchEvt(new game.ChatEvent(game.ChatEvent.ADD_ALL_CHAT, allArr));
            }
        };
        /** 冷却时间(可以发言的时间戳) */
        ChatModel.prototype.setCdTime = function (cdTime, channel) {
            if (cdTime && cdTime > 0) {
                this._cdDic[channel] = cdTime;
            }
        };
        ChatModel.prototype.getCdTime = function (channel) {
            return this._cdDic[channel] || 0;
        };
        ChatModel.prototype.clearCdTime = function () {
            this._cdDic = {};
        };
        /** 新增新聊天消息数量 */
        ChatModel.prototype.addNewNum = function (channel, count) {
            if (count == 0)
                return;
            if (!this._newNumMap.hasOwnProperty(channel)) {
                this._newNumMap[channel] = 0;
            }
            this._newNumMap[channel] += count;
            dispatchEvt(new game.ChatEvent(game.ChatEvent.UPDATE_NEW_CHAT_COUNT));
        };
        /** 重置数量 */
        ChatModel.prototype.resetNewNum = function (channel) {
            this._newNumMap[channel] = 0;
            dispatchEvt(new game.ChatEvent(game.ChatEvent.UPDATE_NEW_CHAT_COUNT));
        };
        /** 获取新消息数量 */
        ChatModel.prototype.getNewNum = function (channel) {
            return this._newNumMap[channel] || 0;
        };
        /** 是否有新聊天消息 */
        ChatModel.prototype.hasNewNum = function () {
            var num = 0;
            for (var channel in this._newNumMap) {
                num += this.getNewNum(Number(channel));
            }
            return num > 0 ? true : false;
        };
        // ================ 私聊 ================
        ChatModel.prototype.hasNewPrivateChat = function () {
            var ary = this._privateChatMap.values;
            return ary.some(function (vo) {
                return vo.newNum > 0;
            });
        };
        /** 创建私聊信息 */
        ChatModel.prototype.createPrivateChatInfo = function (playerId) {
            if (!this._privateChatMap.get(playerId)) {
                this._privateChatMap.set(playerId, new game.PrivateChatInfoVo(playerId));
            }
            return this._privateChatMap.get(playerId);
        };
        ChatModel.prototype.getPrivateChatMap = function () {
            return this._privateChatMap;
        };
        /** 是否有私聊列表 */
        ChatModel.prototype.hasPrivateChat = function () {
            return this._privateChatMap.values.length > 0;
        };
        /** 获取私聊好友列表 */
        ChatModel.prototype.getPrivateChatList = function () {
            var list = [];
            for (var _i = 0, _a = this._privateChatMap.values; _i < _a.length; _i++) {
                var info = _a[_i];
                if (game.FriendModel.getInstance().isMyFriend(info.playerId)) {
                    list.push(info);
                }
            }
            list.sort(function (a, b) {
                return b.lastTime - a.lastTime;
            });
            return list;
        };
        /** 删除私聊信息 */
        ChatModel.prototype.delPrivateChat = function (playerId) {
            this._privateChatMap.remove(playerId);
            this._storage.delStorage(playerId);
            dispatchEvt(new game.ChatEvent(game.ChatEvent.UPDATE_PRIVATE_CHAT));
        };
        /** 获取标签页名称 */
        ChatModel.prototype.getTabbarDatas = function (openType) {
            openType = isNaN(openType) ? 0 : openType;
            var arg = [iface.tb_prop.chatChannelTypeKey.world, iface.tb_prop.chatChannelTypeKey.guild, iface.tb_prop.chatChannelTypeKey.province, iface.tb_prop.chatChannelTypeKey.crossServer, iface.tb_prop.chatChannelTypeKey.system];
            if (openType == game.OpenType.godDm) {
                arg.push(iface.tb_prop.chatChannelTypeKey.group);
                return arg;
            }
            else {
                return arg;
            }
        };
        ChatModel.prototype.getChannelByIndex = function (index) {
            return this.channelMap[index];
        };
        ChatModel.prototype.getIndexByChannel = function (channel) {
            return this.channelMap.indexOf(channel);
        };
        ChatModel.MAX_COUNT = 50;
        ChatModel.SAVE_PEOPLE_COUNT = 10; // 缓存人数
        ChatModel.SAVE_CHAT_COUNT = 20; // 缓存聊天数据条数
        ChatModel.STORAGE_KEY = "slqy_chat";
        /** 表情数量 从0开始 */
        ChatModel.ExpressionNum = 26;
        return ChatModel;
    }());
    game.ChatModel = ChatModel;
})(game || (game = {}));
