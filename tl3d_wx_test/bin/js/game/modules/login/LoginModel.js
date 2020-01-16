/**
* name
*/
var game;
(function (game) {
    var LoginModel = /** @class */ (function () {
        function LoginModel() {
            this._isInit = false;
            this.areas = new Array();
            this._grops = {};
        }
        LoginModel.getInstance = function () {
            if (!LoginModel._instance) {
                LoginModel._instance = new LoginModel();
            }
            return LoginModel._instance;
        };
        LoginModel.prototype.initAreas = function () {
            if (this._isInit)
                return;
            this._isInit = true;
            var slistobj = window.platform.serverList || {};
            var recentobj = window.platform.serverRecentList;
            if (!recentobj)
                recentobj = {};
            var recentlist = convertMapValueToArr(recentobj);
            if (recentlist && recentlist.length > 0) {
                recentlist.sort(//区服排序
                function (a, b) {
                    return b.login_time - a.login_time;
                });
                var recent_ary = [];
                for (var i = 0; i < recentlist.length; i++) {
                    var recent = recentlist[i];
                    if (slistobj.hasOwnProperty(recent.srv_id)) {
                        recent_ary.push(slistobj[recent.srv_id]);
                    }
                }
                this.addServerInfo(LanMgr.getLan("", 12192), recent_ary); //其他
                this.lastServer = recent_ary[0];
            }
            var svrTypeValObj = {};
            for (var key in slistobj) {
                var svritem = slistobj[key];
                if (svritem.hasOwnProperty("srv_type")) {
                    var svrtype = svritem.srv_type;
                    if (!svrTypeValObj.hasOwnProperty(svrtype)) {
                        svrTypeValObj[svrtype] = {};
                    }
                    svrTypeValObj[svrtype][key] = svritem;
                }
            }
            var slisttypelist = window.platform.serverGroupList || [];
            //容错，防止平台给的数据不是数组
            if (!isArrayFn(slisttypelist)) {
                slisttypelist = [slisttypelist];
            }
            for (var key in svrTypeValObj) {
                var slist = convertMapValueToArr(svrTypeValObj[key]);
                var typeitem = slisttypelist.find(function (item) { return String(item.srv_type) == String(key); });
                var srvinfo = this.createServerInfo(slist, typeitem ? typeitem.type_name : LanMgr.getLan("", 12193));
                if (!this.newServer || Number(this.newServer.open_time) < Number(srvinfo.open_time)) {
                    this.newServer = srvinfo;
                }
            }
            if (ExtConfig.isLocal) {
                //如果是本地 ，默认取上次登录的区服
                var lastid = Laya.LocalStorage.getItem(App.hero.uid + "selectLineId");
                for (var key in slistobj) {
                    var svritem = slistobj[key];
                    if (svritem.srv_id == lastid) {
                        this.lastServer = svritem;
                        break;
                    }
                }
            }
        };
        LoginModel.prototype.createServerInfo = function (slist, typename) {
            if (slist && slist.length > 0) {
                slist.sort(//区服排序
                function (a, b) {
                    return b.open_time - a.open_time;
                });
            }
            this.addServerInfo(typename, slist); //其他
            return slist[0]; //返回最近的那个
        };
        Object.defineProperty(LoginModel.prototype, "curServer", {
            //当前可以进的服务器
            get: function () {
                return this.lastServer || this.newServer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加服务器信息
         * @param group 分组
         * @param serverInfo 服务器信息
         */
        LoginModel.prototype.addServerInfo = function (group, serverInfo) {
            var sinfo = this._grops[group];
            if (!sinfo) {
                sinfo = new game.ServerAreaInfo();
                this._grops[group] = sinfo;
                this.areas.push(sinfo);
            }
            sinfo.areaName = group;
            if (serverInfo instanceof Array) {
                sinfo.servers = sinfo.servers.concat(serverInfo);
            }
            else {
                sinfo.servers.push(serverInfo);
            }
        };
        return LoginModel;
    }());
    game.LoginModel = LoginModel;
})(game || (game = {}));
