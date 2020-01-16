module game {
    /*
    * name;
    */
    export class LoginProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "LoginProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new LoginEvent(LoginEvent.LOGININIT_EVENT),
                new LoginEvent(LoginEvent.SEND_SERVERLIST_EVENT),
                new LoginEvent(LoginEvent.SEND_SSO_EVENT),
                new LoginEvent(LoginEvent.SEND_LOGIN_EVENT),
                new LoginEvent(LoginEvent.SEND_RELOGIN_EVENT),
                new LoginEvent(LoginEvent.SHOW_CHATNOTICE_PANEL),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof LoginEvent) {
                switch (event.type) {
                    case LoginEvent.LOGININIT_EVENT:
                        this.initLogin();
                        break;
                    case LoginEvent.SEND_SERVERLIST_EVENT:
                        this.reloginState = false;
                        this.sendRealmList();
                        break;
                    case LoginEvent.SEND_RELOGIN_EVENT:
                        this.reLogin();
                        break;
                    case LoginEvent.SEND_SSO_EVENT:
                        this.sendSSO();
                        break;
                    case LoginEvent.SEND_LOGIN_EVENT:
                        this.sendLogin(event.data);
                        break;
                    case LoginEvent.SHOW_CHATNOTICE_PANEL:
                        this.showChatNoticePanel(true);
                        break;
                }
            }
        }

        /**
         * 初始化登录参数
         */
        private initLogin(): void {
            let time = new Date().getTime();
            let platparam = BingoSDK.platparam;
            let wplatform = window.platform;
            if (platparam) {
                wplatform.gameId = platparam.gameId || 1;
                wplatform.uid = platparam.uid || "";
                wplatform.userName = platparam.userName || "";
                wplatform.time = platparam.time || 0;
                wplatform.head = platparam.head || "";
                wplatform.sex = platparam.sex || 0;
                wplatform.fromUid = platparam.fromUid;
                //
                wplatform.fcm = 0;//platparam.fcm;
                wplatform.pid = platparam.pid || 1;
                wplatform.shiming = platparam.shiming || 0;
                wplatform.vconsle = platparam.vconsle;
                logNeed("外部登陆参数", platparam);
            }
            else //填充默认参数
            {
                BingoSDK.platparam = { clientVersion: "1", pid: "1", uid: 1, uname: 1, time: Math.floor(time / 1000) };
                logNeed("没有外部参数", platparam);
            }
            BingoSDK.platparam.hero = App.hero;
            let version = tb.Tb_version.get_TB_version_ById(1);
            PLC.JS_WS_CLIENT_VERSION = version ? version.version : "1"; //读取数据版本号
            //如果是正式环境
            if (!ExtConfig.RELEASE)  {
                if (!wplatform.userName) {
                    wplatform.userName = Laya.LocalStorage.getItem("uname");
                }
                if (!wplatform.uid) {
                    wplatform.uid = Laya.LocalStorage.getItem("puid");
                }
            }
            if (wplatform.pid && wplatform.uid && wplatform.userName) //检查外部参数
            {
                logyhj("开始登录");
                UIMgr.getInstance().showWaiting(LanMgr.getLan(``,10533));
                let evt = new LoginEvent(LoginEvent.SEND_SSO_EVENT);
                dispatchEvt(evt);
            }
            else if (!ExtConfig.RELEASE) //非调试模式禁止其他方式登录
            {
                UIMgr.showUI(UIConst.LoginView, null, false);
                UIMgr.getInstance().hideLoading();
            }
            else {
                common.AlertBox.showAlert({ text: LanMgr.getLan(``,10532) });
            }
        }

        /**公告 */
        private showChatNoticePanel(forceShow:boolean): void {
            let repUrl: any;
            let pid: any = window.platform.pid;
            let time = Math.floor(new Date().getTime() / 1000);
            repUrl = "data=";
            var repData = "pf_id=" + pid;
            repData += "&channel_id=" + (BingoSDK.channelId || 0);
            repUrl += encodeURIComponent(repData);
            repUrl += "&time=" + time;
            repUrl += "&sign=" + hex_md5(repData + time + ExtConfig.noticeKey);
            if(!ExtConfig.notice_host){
                return;
            }
            PLC.getInstance().sendServermsg(this, ExtConfig.notice_host, repUrl, 'post', (svrdata: any) => {
                if (!svrdata) return;
                let objdata = JSON.parse(svrdata[0]);
                let noticelist: any[] = objdata && objdata.data && objdata.data.bulletin_list ? objdata.data.bulletin_list : {};
                let oldVersion = Laya.LocalStorage.getItem(App.LOGIN_NOTICE_VERSION);
                let curVersion = objdata && objdata.data ? objdata.data.version : "-1";
                Laya.LocalStorage.setItem(App.LOGIN_NOTICE_VERSION,curVersion);
                let isNew : boolean = !oldVersion || oldVersion != curVersion;
                // 如果公告有更新了，则登陆时候自动清除改勾选状态，即登陆会自动弹出
                if(isNew) {
                    Laya.LocalStorage.removeItem(App.LOGIN_NOTICE_CHECKBOX);
                }
                logdebug("是否有新公告：",oldVersion,curVersion);
                if (Object.keys(noticelist).length > 0) {
                    let arrVo: IPlfNoticeVo[] = [];
                    for (let key in noticelist) {
                        let vo = noticelist[key];
                        arrVo.push(vo);
                    }
                    arrVo[0].isfirst = true;
                    window.platform.noticelist = arrVo;
                    let notShow = Laya.LocalStorage.getItem(App.LOGIN_NOTICE_CHECKBOX) == "1";
                    if(forceShow || !notShow){
                        UIMgr.showUI(UIConst.LoginNoticeView, arrVo);
                    }
                }
            });
        }

        /**
         * 登陆
         */
        private sendLogin(serverInfo) {
            window.platform.serverInfo = serverInfo;
            window.platform.serverInfo.serverId = window.platform.serverInfo.srv_id % 100000;
            if (!this.reloginState) {
                UIMgr.getInstance().showLoading(LanMgr.getLan(``,10541));
            }
            logNeed("reportErrorUrl:", ExtConfig.reportErrorUrl);
            UIMgr.hideUIByName(UIConst.SelectListView);
            logNeed("登陆游戏服", window.platform.token, App.hero.uid, window.platform.pid);
            if (ExtConfig.isLocal) {
                //如果是本地 ，默认取上次登录的区服
                let lastid = Laya.LocalStorage.setItem(App.hero.uid + "selectLineId", serverInfo.srv_id);
            }

            let url = serverInfo.address ? serverInfo.address : `https://${serverInfo.domain}/server${serverInfo.merge_id !== "0"?serverInfo.merge_id:serverInfo.srv_id}/gateway`;
            PLC.getInstance().authEntry(window.platform.token, App.hero.uid, { host: url }, () => {
                logNeed("=============connect ok!");
                PLC.getInstance().enterGame((data) => {
                    //绑定游戏内提示框
                    this.setGameFunc();
                    if (App.hero.initData) { //断线重连重新初始化一下数据
                        App.hero.setData(App.hero.initData);
                        this.reloginState = false; //重连成功了
                        return;
                    }
                    App.hero.guildNum = data.guildNum;
                    App.hero.initData = data.curPlayer;
                    App.hero.openSvrTime = data.openSvrTime || 0;
                    App.hero.signInStartTime = data.signInStartTime || 0;
                    var friend=data.curPlayer.friend;
                    App.hero.blockLists = (friend&&friend.blackLists) || [];
                    App.hero.honourStage = data.honourStage || 0;
                    App.hero.kuafuHonourStage = data.kuafuHonourStage || 0;
                    App.hero.rechargePlayerNum = data.rechargePlayerNum ? Number(data.rechargePlayerNum) : 0;
                    App.hero.guildHelpNum = data.guildHelpNum || 0;
                    //启动模块
                    ModuleList.startup();
                    //进入游戏上报
                    var hero = App.hero;
                    var sinfo = window.platform.serverInfo;
                    BingoSDK.gameReport("enterGame", hero.playerId, hero.accountName, sinfo.serverId, sinfo.srv_name, { level: hero.level, vip: hero.vip, charge: hero.welfare.rechargeSum });
                });
            });
        }

        //重连状态
        private reloginState: boolean;

        /**
         * 断线重连
         */
        private reLogin(): void {
            if (this.reloginState) {
                return;
            }
            this.reloginState = true;
            UIMgr.getInstance().showWaiting(LanMgr.getLan(``,10549));
            this.sendSSO();
        }

        //用户登录信息
        userinfo = { userName: '', uid: '', sex: 0, head: "", pid: 1, gameId: 1, robot: 1, fcm: 0, shiming: 0, time: 0, sign: '', userToken: '' };
        /**
         * 游客和帐号登陆
         * 只有108和使用。平台不使用
         */
        private sendSSO() {
            let wplatform = window.platform;
            //拷贝参数
            for (var key in this.userinfo) {
                if (wplatform.hasOwnProperty(key)) {
                    this.userinfo[key] = wplatform[key];
                }
            }
            //-------!!!调试时，角色uid设置!!! 配置表的服务器地址和登录地址需要时也要修改--------
            // this.userinfo.pid = 5//账号所在的平台
            // this.userinfo.uid = "53000849781";//账号uid
            // window.platform.pid = '5';//获取服务器列表pid
            // this.userinfo.userName = "manling_53000849781"
            // this.userinfo['channelId'] = 530240202;
            //如果是本地客户端调试外网的账号，sso用冰菓sso
            // let sso = PLC.SSO;
            var typekey=iface.tb_prop.platformTypeKey;
            var pid= Number(window.platform.pid);
            let sso = (pid== typekey.version||pid== typekey.lezhong) ? PLC.SSO_LEZHONG : PLC.SSO;

            this.userinfo.robot = window.platform.redirect; //是否跳转
            this.userinfo.userToken = encodeURIComponent(BingoSDK.getUserToken());
            this.userinfo.sign = this.getSign();
            
            App.hero.accountName = this.userinfo.userName;
            App.hero.puid = this.userinfo.uid;
            Laya.LocalStorage.setItem("uname", this.userinfo.userName);
            Laya.LocalStorage.setItem("puid", this.userinfo.uid);
            
            logNeed("sso帐号验证", this.userinfo);
            
            //开始登录
            PLC.getInstance().sendloginmsg(this, sso, this.userinfo, 'get', ($data: any) => {
                let objdata = JSON.parse($data[0]);
                logNeed("======帐号验证成功!======", objdata);
                if (objdata.code == 200) {
                    App.hero.uid = objdata.uid;
                    window.platform.token = objdata.token;
                    if (objdata.pid) {
                        Laya.LocalStorage.setItem("pid", objdata.pid);
                    }
                    if (objdata.uid) {
                        this.sendRealmList(); //开始选服
                    }
                    else {
                        showToast(objdata.msg ? objdata.msg : "serverlist error");
                    }
                    this.showChatNoticePanel(false);
                }
            });
        }

        /**
         * 获取服务器列表
         */
        private sendRealmList() {
            let repUrl: any;
            let pid: any = window.platform.pid;
            if (ExtConfig.isLocal) {
                repUrl = { uid: App.hero.uid, platformId: pid };
            } else {
                let ct = Math.floor(new Date().getTime() / 1000);
                repUrl = "data=";
                var repData = "pf_id=" + pid;
                repData += "&user_name=" + this.userinfo.userName;
                repData += "&recent_login_srv=1";
                repUrl += encodeURIComponent(repData);
                repUrl += "&time=" + ct;
                repUrl += "&sign=" + hex_md5(repData + ct + ExtConfig.getplKey);
            }

            logNeed("请求服务器列表", App.hero.uid, pid, window.platform.token);
            PLC.getInstance().sendServermsg(this, ExtConfig.server_host, repUrl, 'post', ($data: any) => {
                AudioMgr.playMusic("sound/bgm_login.mp3");
                UIMgr.getInstance().hideWaiting();
                let objdata = JSON.parse($data[0]);
                logNeed("======请求服务器列表成功======", objdata);
                if (objdata && objdata.status == 1) {
                    let datas = objdata.data;
                    if (!datas) return;
                    if (!datas.hasOwnProperty("srv_list")) {
                        logerror(objdata.msg ? objdata.msg : "get serverList error");
                        BingoSDK.reportError(objdata.msg ? objdata.msg : "get serverList error");
                        common.AlertBox.showAlertYes({
                            text: LanMgr.getLan("", 10534), confirmCb: () => {
                                BingoSDK.gameRefresh();
                            }
                        });
                        return;
                    }
                    else if(datas.srv_list.length == 0) {
                        common.AlertBox.showAlertYes({
                            text: LanMgr.getLan("",10535), confirmCb: () => {
                            }
                        });
                        return;
                    }
                    window.platform.serverGroupList = datas.group_list;
                    window.platform.serverList = datas.srv_list;
                    window.platform.serverRecentList = datas.hasOwnProperty("recent_login_srv") ? isArrayFn(datas.recent_login_srv) ? {} : datas.recent_login_srv : {};
                    LoginModel.getInstance().initAreas();
                    let curServer = LoginModel.getInstance().curServer;
                    if (this.reloginState) { //重连就不用显示UI啥的了
                        //开始登录游戏服
                        dispatchEvt(new LoginEvent(LoginEvent.SEND_LOGIN_EVENT), curServer);
                        return;
                    }
                    UIMgr.showUI(UIConst.SelectListView, curServer, false);
                    UIMgr.getInstance().hideWaiting();
                    // 清除ui缓存，因为绑定在显示对象的红点规则被释放，需要重新创建显示对象才能重新绑定红点规则
                    UIMgr.getInstance().clearUICache();
                }
            });
        }

        /**
         * sdk绑定ui
         */
        private setGameFunc() {
            BingoSDK.setGameFunc("alert", (title, msg, callback) => {
                common.AlertBox.showAlertYes({
                    title: title && title.length > 0 ? title : LanMgr.getLan(``,10536),
                    text: msg, confirmCb: () => {
                        if (callback) {
                            callback();
                        }
                    }
                });
            });
            BingoSDK.setGameFunc("confirm", (title, msg, fnYes, fnNo) => {
                common.AlertBox.showAlert({
                    title: title && title.length > 0 ? title : LanMgr.getLan(``,10536),
                    text: msg, confirmCb: () => {
                        if (fnYes) {
                            fnYes();
                        }
                    }, cancelCb: () => {
                        if (fnNo) {
                            fnNo();
                        }
                    }
                });
            });
            BingoSDK.setGameFunc("prompt", (title, defaultTxt, fnYes, fnNo) => {
                common.AlertBox.showAlertPrompt({
                    title: title && title.length > 0 ? title : LanMgr.getLan(``,10359),
                    text: defaultTxt, confirmCb: (msg) => {
                        logyhj("输入的信息是：", msg);
                        if (fnYes) {
                            fnYes(msg);
                        }
                    }, cancelCb: () => {
                        if (fnNo) {
                            fnNo();
                        }
                    }
                });
            });
        }

         //获取sign
        private getSign(): string {
            let sign = BingoSDK.getSign(null);
            return sign || hex_md5("gameId=" + this.userinfo.gameId + "&time=" + this.userinfo.time + "&uid=" + encodeURIComponent(this.userinfo.uid) + "&userName=" + encodeURIComponent(this.userinfo.userName) + "&key=" + BingoSDK.loginKey);
        }
    }
}