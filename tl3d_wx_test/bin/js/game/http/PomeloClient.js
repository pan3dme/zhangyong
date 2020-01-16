var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var REALMFLAG = /** @class */ (function () {
    function REALMFLAG() {
    }
    REALMFLAG.REALM_FLAG_CLOSE = 0; // 关闭
    REALMFLAG.REALM_FLAG_RUNNING = 1; // 正在启动中
    return REALMFLAG;
}());
var SrvState;
(function (SrvState) {
    SrvState[SrvState["NORNAL"] = 0] = "NORNAL";
    SrvState[SrvState["BETTER"] = 1] = "BETTER";
    SrvState[SrvState["HOT"] = 2] = "HOT";
})(SrvState || (SrvState = {}));
var PLC = /** @class */ (function () {
    function PLC() {
        this.posturl = "";
        this.RES_OK = 200;
        this.state = true;
        this.RES_FAIL = 500;
        this.RES_OLD_CLIENT = 501;
        this.decodeIO_protobuf = null;
        this.decodeIO_encoder = null;
        this.decodeIO_decoder = null;
        this.reqId = 0;
        this.heartbeatInterval = 0;
        this.heartbeatTimeout = 0;
        this.nextHeartbeatTimeout = 0;
        this.gapThreshold = 3000; // heartbeat gap threashold
        this.heartbeatId = null;
        this.heartbeatTimeoutId = null;
        this.handshakeCallback = null;
        this.heartbeatTime = 0;
        this.initCallback = null;
        this.beatinit = false;
        this.useCrypto = false;
        this.routeMap = {};
        this.dict = {}; // route string to code
        this.abbrs = {}; // code to route string
        this.protobuf = null;
        this.serverProtos = {};
        this.clientProtos = {};
        this.protoVersion = 0;
        this._callbacks = {};
        this.JS_WS_CLIENT_TYPE = 'js-http';
        this.ingoreList = [Protocol.game_guide_getGuideAward.key, Protocol.game_activity_updateActivityCondCount.key, Protocol.game_rank_getRankList.key];
        this.handlers = new Array();
        this.handlers[Package.TYPE_HANDSHAKE] = this.handshake.bind(this);
        this.handlers[Package.TYPE_HEARTBEAT] = this.heartbeat.bind(this);
        this.handlers[Package.TYPE_DATA] = this.onData.bind(this);
        this.handlers[Package.TYPE_KICK] = this.onKick.bind(this);
        this.callbacks = new Array();
    }
    PLC.getInstance = function () {
        if (!this._instance) {
            this._instance = new PLC();
        }
        return this._instance;
    };
    PLC.prototype.on = function (event, fn) {
        (this._callbacks[event] = this._callbacks[event] || []).push(fn);
    };
    PLC.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var params = [].slice.call(arguments, 1);
        var callbacks = this._callbacks[event];
        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, params);
            }
        }
        return this;
    };
    PLC.prototype.off = function (event, fn) {
        this.removeAllListeners(event, fn);
    };
    PLC.prototype.removeAllListeners = function (event, fn) {
        // all
        if (0 === arguments.length) {
            this._callbacks = {};
            return;
        }
        // specific event
        var callbacks = this._callbacks[event];
        if (!callbacks) {
            return;
        }
        // remove all handlers
        if (event && !fn) {
            delete this._callbacks[event];
            return;
        }
        // remove specific handler
        var i = this.index(callbacks, fn._off || fn);
        if (~i) {
            callbacks.splice(i, 1);
        }
        return;
    };
    PLC.prototype.index = function (arr, obj) {
        if ([].indexOf) {
            return arr.indexOf(obj);
        }
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === obj)
                return i;
        }
        return -1;
    };
    /**
     * 解析协议
     * @param data
     */
    PLC.prototype.decode = function (data) {
        var msg = Message.decode(data);
        if (msg.id > 0) {
            msg.route = this.routeMap[msg.id];
            delete this.routeMap[msg.id];
            if (!msg.route) {
                return;
            }
        }
        msg.body = this.deCompose(msg);
        return msg;
    };
    /**
     * 接受服务器数据
     * @param respone httpbody
     */
    PLC.prototype.processPackage = function (bytes) {
        var msg = Package.decode(bytes);
        this.handlers[msg.type].apply(this, [msg.body]);
    };
    PLC.prototype.processMessage = function (pomelo, msg) {
        this.printMsg(msg.body);
        if (!msg.id) {
            pomelo.emit(msg.route.name, msg.body);
            return;
        }
        var data = utils.getMsgValue(msg.body.value, msg.route.returns);
        if (!data) {
            return;
        }
        //if have a id then find the callback function with the request
        var cb = this.callbacks[msg.id];
        delete this.callbacks[msg.id];
        if (typeof cb !== 'function') {
            return;
        }
        cb(data);
        return;
    };
    ;
    PLC.prototype.processMessageBatch = function (pomelo, msgs) {
        for (var i = 0, l = msgs.length; i < l; i++) {
            this.processMessage(pomelo, msgs[i]);
        }
    };
    ;
    PLC.prototype.printMsg = function (body) {
        if (body && body.msg) {
            var msg = body.msg;
            if (typeof msg === "string") {
                body.args ? logdebug.apply(void 0, __spreadArrays([msg], body.args)) : logdebug(msg);
            }
            else if (typeof msg === "number") {
                var msgInfo = tb.TB_msgCode.get_TB_msgCodeById(msg);
                if (msgInfo) {
                    body.args ? logdebug.apply(void 0, __spreadArrays([msgInfo.text], body.args)) : logdebug(msgInfo.text);
                }
            }
        }
    };
    PLC.prototype.deCompose = function (msg) {
        var route = msg.route && msg.route.name;
        if (msg.compressRoute) {
            if (!this.abbrs[route]) {
                return {};
            }
            route = msg.route = this.abbrs[route];
        }
        var body = new Laya.Byte();
        var index = 0;
        var bytesLen = msg.body.byteLength;
        for (; index < bytesLen; index++) {
            body.writeByte(msg.body[index]);
        }
        body.pos = 0;
        var bodystr = body.readUTFBytes();
        if (this.protobuf && this.serverProtos[route]) {
            return this.protobuf.decode(route, msg.body);
        }
        else if (this.decodeIO_decoder && this.decodeIO_decoder.lookup(route)) {
            return this.decodeIO_decoder.build(route).decode(msg.body);
        }
        else {
            return JSON.parse(bodystr);
        }
    };
    PLC.prototype.encode = function (reqId, route, msg) {
        var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
        if (this.protobuf && this.clientProtos[route]) {
            msg = this.protobuf.encode(route, msg);
        }
        else if (this.decodeIO_encoder && this.decodeIO_encoder.lookup(route)) {
            var Builder = this.decodeIO_encoder.build(route);
            msg = new Builder(msg).encodeNB();
        }
        else {
            msg = utils.strencode(JSON.stringify(msg));
        }
        var compressRoute = 0;
        if (this.dict && this.dict[route]) {
            route = this.dict[route];
            compressRoute = 1;
        }
        return Message.encode(reqId, type, compressRoute, route, msg);
    };
    //
    PLC.prototype.sendloginmsg = function ($objthis, $sign, $parameters, $httpType, $comFun, $errFun) {
        if ($errFun === void 0) { $errFun = null; }
        var _http = new http.SingleHttp;
        _http.addCallback(function (data) {
            $comFun.call($objthis, [data]);
        }, function (data) {
            logdebug("http错误");
            if ($errFun) {
                $errFun.call($objthis, [data]);
            }
        });
        _http.send(ExtConfig.net_host + $sign, $parameters, $httpType);
    };
    //
    PLC.prototype.sendServermsg = function ($objthis, host, $parameters, $httpType, $comFun, $errFun) {
        if ($errFun === void 0) { $errFun = null; }
        var _http = new http.SingleHttp;
        _http.addCallback(function (data) {
            $comFun.call($objthis, [data]);
        }, function (data) {
            logdebug("http错误");
            if ($errFun) {
                $errFun.call($objthis, [data]);
            }
        });
        _http.send(host, $parameters, $httpType);
    };
    //自动链接游戏
    PLC.prototype.authEntry = function (token, uid, server, callback) {
        var self = this;
        this.queryEntry(uid, server, function (host, port) {
            self.entry(host, port, token, callback);
        });
    };
    //链接网关服
    PLC.prototype.queryEntry = function (uid, server, callback) {
        var self = this;
        this.pomeloInit(server.host, server.port, function () {
            var route = Protocol.gate_gate_queryEntry;
            var args = {};
            args[route.args.uid] = uid;
            self.request(route, args, function (data) {
                if (!data) {
                    return;
                }
                self.disconnect(null);
                callback(data.host, data.httpPort);
            });
        });
    };
    //链接游戏服
    PLC.prototype.entry = function (host, port, token, callback) {
        var self = this;
        this.pomeloInit(host, port, function () {
            var route = Protocol.game_enter_entry;
            var args = {};
            args[route.args.token] = token;
            logyhj("链接游戏服：", window.platform.serverInfo);
            args[route.args.sid] = window.platform.serverInfo.srv_id;
            setTimeout(function () {
                self.request(route, args, function (data) {
                    if (!data) {
                        callback(null);
                        return;
                    }
                    if (data.isNew) {
                        //进入游戏上报
                        var hero = data.base;
                        var sinfo = window.platform.serverInfo;
                        BingoSDK.gameReport("createRole", hero.playerId, hero.accountName, sinfo.serverId, sinfo.srv_name, { level: 1, vip: 0, charge: 0 });
                    }
                    self.on("reconnect", function () {
                        self.entry(host, port, token, null);
                    });
                    LoginMsgHandler.init(args);
                    GameMsgHandler.init();
                    if (callback) {
                        callback();
                    }
                });
            }, 500);
        });
    };
    //初始化游戏服链接
    PLC.prototype.pomeloInit = function ($host, $port, $comFun) {
        this.initCallback = $comFun;
        this.posturl = $host;
        var handshakeBuffer = {
            'sys': {
                type: this.JS_WS_CLIENT_TYPE,
                version: PLC.JS_WS_CLIENT_VERSION,
                rsa: {}
            },
            'user': {}
        };
        var _json = JSON.stringify(handshakeBuffer);
        var _strencode = utils.strencode(_json);
        var packet = Package.encode(Package.TYPE_HANDSHAKE, _strencode);
        this.send(packet);
    };
    PLC.prototype.handshake = function (data) {
        if (data.code === this.RES_OLD_CLIENT) {
            this.emit('error', 'client version not fullfill');
            logerror("client version not fullfill");
            common.AlertBox.showAlertYes({
                text: LanMgr.getLan("", 10488), confirmCb: function () {
                    BingoSDK.gameRefresh();
                }
            });
            return;
        }
        if (data.code !== this.RES_OK) {
            this.emit('error', 'handshake fail');
            logerror("handshake fail");
            return;
        }
        this.sid = data.sid;
        this.handshakeInit(data);
        var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK, utils.strencode(JSON.stringify({ sid: this.sid })));
        this.send(obj, false);
    };
    ;
    PLC.prototype.send = function (packet, loadFlag) {
        if (loadFlag === void 0) { loadFlag = false; }
        var _http = http.NativeHttp.getHttp();
        _http.setData(this.posturl, packet.buffer, loadFlag);
        HttpQueueMgr.push(_http);
    };
    ;
    PLC.prototype.request = function (route, msg, cb, $loadflg) {
        if ($loadflg === void 0) { $loadflg = true; }
        if (arguments.length === 2 && typeof msg === 'function') {
            cb = msg;
            msg = {};
        }
        else {
            msg = msg || {};
        }
        var routeName = route.key || msg.name;
        if (!routeName) {
            return;
        }
        if (!this._routeObj) {
            this._routeObj = {};
        }
        // 不在忽略列表里面，就执行防双击和快速点击的处理
        if (this.ingoreList.indexOf(routeName) == -1) {
            var ct = Date.now();
            if (this._routeObj.hasOwnProperty(routeName)) {
                var tim = this._routeObj[routeName];
                if ((ct - tim) > 80) {
                    this._routeObj[routeName] = ct;
                }
                else {
                    //如果在冷却时间内，就不发送请求
                    return;
                }
            }
            else {
                this._routeObj[routeName] = ct;
            }
        }
        this.reqId++;
        // logdebug("PomeloCilent.request：", routeName, msg, this.reqId);
        this.sendMessage(this.reqId, routeName, msg, $loadflg);
        this.callbacks[this.reqId] = cb;
        this.routeMap[this.reqId] = route;
    };
    /**
     * 同类请求与请求之间不能少于100mm间隔
     * @param route
     * @param msg
     * @param cb
     * @param loadflg
     */
    PLC.request = function (route, msg, cb, loadflg) {
        if (loadflg === void 0) { loadflg = true; }
        PLC.getInstance().request(route, msg, cb, loadflg);
    };
    PLC.prototype.sendMessage = function (reqId, route, msg, loadFlag) {
        msg.sid = this.sid;
        if (this.useCrypto) {
            msg = JSON.stringify(msg);
            var sig = "";
            //rsa.signString(msg, "sha256");
            msg = JSON.parse(msg);
            msg['__crypto__'] = sig;
        }
        if (this.encode) {
            msg = this.encode(reqId, route, msg);
        }
        var cpacket = new Laya.Byte(msg.length);
        cpacket.writeArrayBuffer(msg, 0, msg.length);
        var packet = Package.encode(Package.TYPE_DATA, cpacket);
        this.send(packet, loadFlag);
    };
    ;
    PLC.prototype.handshakeInit = function (data) {
        if (data.sys && data.sys.heartbeat) {
            this.heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval
            this.heartbeatTimeout = this.heartbeatInterval * 2; // max heartbeat timeout
        }
        else {
            this.heartbeatInterval = 0;
            this.heartbeatTimeout = 0;
        }
        this.initData(data);
        this.state = true; //握手成功连接上了
        if (typeof this.handshakeCallback === 'function') {
            this.handshakeCallback(data.user);
        }
    };
    //Initilize data used in pomelo client
    PLC.prototype.initData = function (data) {
        if (!data || !data.sys || !data.sid) {
            return;
        }
        this.sid = data.sid;
        this.dict = data.sys.dict;
        var protos = data.sys.protos;
        //Init compress dict
        if (this.dict) {
            this.abbrs = {};
            for (var route in this.dict) {
                this.abbrs[this.dict[route]] = route;
            }
        }
        //Init protobuf protos
        if (protos) {
            this.protoVersion = protos.version || 0;
            this.serverProtos = protos.server || {};
            this.clientProtos = protos.client || {};
            if (!!this.protobuf) {
                this.protobuf.init({ encoderProtos: protos.client, decoderProtos: protos.server });
            }
            if (!!this.decodeIO_protobuf) {
                this.decodeIO_encoder = this.decodeIO_protobuf.loadJson(this.clientProtos);
                this.decodeIO_decoder = this.decodeIO_protobuf.loadJson(this.serverProtos);
            }
        }
        if (!!this.decodeIO_protobuf) {
            this.decodeIO_encoder = this.decodeIO_protobuf.loadJson(this.clientProtos);
            this.decodeIO_decoder = this.decodeIO_protobuf.loadJson(this.serverProtos);
        }
    };
    //发送心跳
    PLC.prototype.sendHearBeat = function () {
        var obj = Package.encode(Package.TYPE_HEARTBEAT, utils.strencode(JSON.stringify({ sid: this.sid })));
        this.send(obj);
    };
    //心跳
    PLC.prototype.heartbeat = function (respData) {
        if (respData && respData.hasOwnProperty('now')) {
            App.serverTime = respData.now;
        }
        if (this.heartbeatTime > 0) {
            var interval = Date.now() - this.heartbeatTime;
            // logdebug("heartbeat interval:", interval, this.sid);
        }
        this.heartbeatTime = Date.now();
        if (this.initCallback) {
            this.initCallback();
            this.initCallback = null;
        }
        if (!this.heartbeatInterval) {
            logwarn("no heartbeat");
            return;
        }
        if (!this.beatinit) {
            this.beatinit = true;
            this.sendHearBeat();
        }
        if (this.heartbeatTimeoutId) {
            clearTimeout(this.heartbeatTimeoutId);
            this.heartbeatTimeoutId = null;
        }
        if (this.heartbeatId) {
            // already in a heartbeat interval
            return;
        }
        this.heartbeatId = setTimeout(function () {
            this.heartbeatId = null;
            this.sendHearBeat();
            this.nextHeartbeatTimeout = Date.now() + this.heartbeatTimeout;
            this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb.bind(this), this.heartbeatTimeout);
        }.bind(this), this.heartbeatInterval);
    };
    /**
     * 更新角色信息
     * @param name
     * @param sex
     * @param callback
     */
    PLC.prototype.updateName = function (name, sex, callback) {
        var route = Protocol.game_common_changePlayerData;
        var args = {};
        args[route.args.name] = name;
        args[route.args.sex] = sex;
        this.request(route, args, function (data) {
            if (!data) {
                return;
            }
            if (callback) {
                callback(data);
            }
        });
    };
    PLC.prototype.enterGame = function (calback) {
        var route = Protocol.game_enter_enterGame;
        var self = this;
        this.request(route, {}, function (data) {
            if (!data) {
                return;
            }
            logdebug("enterGame succ!![%j]", data);
            Launch.unline = false;
            if (calback) {
                calback(data);
            }
        });
    };
    //心跳超时回调
    PLC.prototype.heartbeatTimeoutCb = function () {
        var gap = Math.abs(Date.now() - this.nextHeartbeatTimeout);
        if (gap < this.gapThreshold) {
            this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb.bind(this), gap);
        }
        else {
            logerror('heartbeatTimeout' + Date.now(), gap, this.nextHeartbeatTimeout, this.gapThreshold);
            this.disconnect("timeOut");
        }
    };
    //接收数据dis
    PLC.prototype.onData = function (data) {
        if (!data)
            return;
        var msg = data;
        if (this.decode) {
            msg = this.decode(msg);
        }
        if (!msg)
            return;
        //logdebug('onData.decode:', msg);
        if (!msg.id) { // server push message
            this.emit(msg.route.name, msg.body);
            return;
        }
        var reqdata = utils.getMsgValue(msg.body.value, msg.route.returns);
        // logdebug('response:struct:', reqdata);
        var cb = this.callbacks[msg.id];
        delete this.callbacks[msg.id];
        if (typeof cb !== 'function') {
            return;
        }
        //分发事件处理msg  Fix
        var strmsg = "";
        if (typeof msg.body.msg === "string") {
            if (msg.body.args) {
                strmsg = FormatStr(msg.body.msg, msg.body.args);
            }
            else {
                strmsg = msg.body.msg;
            }
        }
        else if (typeof msg.body.msg === "number") {
            var tab = tb.TB_msgCode.get_TB_msgCodeById(msg.body.msg);
            if (tab) {
                if (msg.body.args) {
                    strmsg = FormatStr(tab.text, msg.body.args);
                }
                else {
                    strmsg = tab.text;
                }
            }
        }
        if (msg.route.name != Protocol.game_common_wish.name && msg.body.msg != Lans.GroupNotRegTime) {
            //logerror("服务端错误：",strmsg);
            showToast(strmsg);
        }
        App.hero.refreshData(reqdata, msg.route.name);
        cb(reqdata, strmsg, msg.body.msg);
    };
    ;
    //被踢
    PLC.prototype.onKick = function (data) {
        logwarn("onKick", data);
        Launch.unline = true;
        this.closeheartbeat();
        App.offline();
        if (PLC.needFresh) { //切换后天被T直接刷新，不询问了
            PLC.needFresh = false;
            BingoSDK.gameRefresh();
            return;
        }
        var tstr = iface.tb_prop.exitType.hasOwnProperty(data) ? LanMgr.getLan("", 10490, data) : LanMgr.getLan("", 10491);
        if (data == iface.tb_prop.exitTypeKey.accountConflict) {
            tstr = LanMgr.getLan("", 10489);
        }
        common.AlertBox.showAlertYes({
            text: LanMgr.getLan(tstr, -1), confirmCb: function () {
                BingoSDK.gameRefresh();
            }
        });
    };
    //断开链接
    PLC.prototype.disconnect = function (event) {
        if (this._init && event) {
            logwarn("relogin");
            dispatchEvt(new game.LoginEvent(game.LoginEvent.SEND_RELOGIN_EVENT));
        }
        this._init = true;
        this.state = false;
        logwarn("disconnect");
        this.emit("close", event);
        this.closeheartbeat();
    };
    PLC.prototype.closeheartbeat = function () {
        if (this.heartbeatId) {
            clearTimeout(this.heartbeatId);
            this.heartbeatId = null;
        }
        if (this.heartbeatTimeoutId) {
            clearTimeout(this.heartbeatTimeoutId);
            this.heartbeatTimeoutId = null;
        }
        this.heartbeatTime = null;
        this.heartbeatInterval = null;
    };
    PLC.SSO = "/sso"; //外网登录
    PLC.SSO_LEZHONG = "/sso_lezhong"; //乐众登录
    PLC.NOTICELIST = "/noticelist"; //获取公告列表
    PLC.JS_WS_CLIENT_VERSION = "1";
    return PLC;
}());
