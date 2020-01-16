/**
 * Created by enger on 2019/3/12.
 * bingo game sdk
 */
var BingoSDK = (function() {
    function BingoSDK() {};
    BingoSDK.gameId = 0;
    BingoSDK.appId = 0;
    BingoSDK.channelId = 0;
    BingoSDK.gameName = '英雄计划3D';
    BingoSDK.loginKey = '7938f82ad03a912ea81884c8a0d42642';
    BingoSDK.payKey = '4505e6d82c430110112c10b316910a7e';
    BingoSDK.ser_idx = 10120000;
    BingoSDK.userToken = "";
    BingoSDK.extConfig;
    BingoSDK.clientVersion = 0;
    BingoSDK.resVersion = 3;
    BingoSDK.sdkVersion = 0;
    BingoSDK.shareSuccess;
    BingoSDK.paySuccess;
    BingoSDK.loginCbFun;
    BingoSDK.loginCbFun;
    BingoSDK.platparam;
    BingoSDK.devenv = -1;
    BingoSDK.pid = 2;

    //获取参数
    BingoSDK.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }

    //刷新游戏
    BingoSDK.gameRefresh = function(action, callback) {
            window.location.reload();
        }
        //设置提示
    BingoSDK.setGameFunc = function(type, callbak) {

        }
        //上报信息
    BingoSDK.gameReport = function(action, playId, nickname, area, group, extendData) {}

    //sdk查询接口是否在游戏显示及状态
    BingoSDK.queryExtraStatus = function(callback) {}

    //sdk-按钮功能
    BingoSDK.doExtraAction = function(action, callback) {}
        //设备类型
    BingoSDK.ispc = function() {
            var _ispc = true;
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                _ispc = false;

            }
            return _ispc;
        }
        //手机类型
    BingoSDK.devOS = function() {
        var _devOS = 1;
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua) && /os 8_/.test(ua)) {
            _devOS = 2;
        } else {
            _devOS = 1;
        }
        return _devOS;
    }

    //设置进度
    BingoSDK.setProgress = function(value) {

    }

    //获取渠道信息
    BingoSDK.getPlatform = function(callback) {
        if (callback) {
            callback(result);
        }
    }

    //上报信息
    BingoSDK.report = function(uid, gameId, server, serverName, role, vip, level, partyName, sign) {
        var extraDataInfo = new Object();
        extraDataInfo.uid = uid;
        extraDataInfo.gameId = gameId;
        extraDataInfo.serverId = BingoSDK.ser_idx + server;
        extraDataInfo.serverName = serverName;
        extraDataInfo.roleId = role;
        extraDataInfo.vip = vip;
        extraDataInfo.level = level;
        extraDataInfo.partyName = partyName;
        extraDataInfo.sign = sign;
        extraDataInfo.signType = "md5";
        //<!-- 角色信息上传接口 -->
        console.log("上报信息", extraDataInfo);
        BingoSDK.request(BingoSDK.cksdk + "api/role", null, { type: "post", data: JSON.stringify(extraDataInfo) });
    }

    //ajax请求
    BingoSDK.request = function(url, cb, param) {
        var param = param || {};
        var type = param.type || 'get';
        var data = param.data || null;
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.responseText == 'error') {
                        console.error('请求' + url + '返回error');
                        return;
                    }
                    cb && cb(xhr.responseText);
                }
            };
            xhr.send(data);
        } catch (e) {
            console.error('xhr出错', e);
            return false;
        }
    };

    //上报步骤
    BingoSDK.reportStep = function(cusStep) {
        if (!BingoSDK.extConfig || !BingoSDK.extConfig.reportUrl) return;
        var repUrl = BingoSDK.extConfig.reportUrl + "?data=";
        var pinfo = BingoSDK.platparam;
        var repData = "version=" + (pinfo.clientVersion != null ? pinfo.clientVersion : "1");
        var devOS = BingoSDK.devOS();
        repData += "&devOS=" + devOS;
        repData += "&device=" + devOS;
        repData += "&uuid=" + pinfo.uid;
        repData += "&pf_id=" + pinfo.pid;
        repData += "&account_id=" + pinfo.uname;
        repData += "&ip=0.0.0.0";
        repData += "&step=" + cusStep;
        repData += "&deviceTime=" + Math.floor(new Date().getTime() / 1000);
        repUrl += encodeURIComponent(repData);
        repUrl += "&time=" + pinfo.time;
        repUrl += "&sign=" + hex_md5(repData + pinfo.time + BingoSDK.report_sing_key);
        BingoSDK.request(repUrl);
    };

    //上报加载时间
    BingoSDK.reportLoadingTime = function(cusType, cusTime) {
        if (!BingoSDK.extConfig || !BingoSDK.extConfig.reportLoadingTimeUrl) return;
        var d = new Date();
        var time;
        if (cusType == 1) {
            time = d.getTime() - startTime;
        } else {
            time = cusTime;
        }
        var pinfo = BingoSDK.platparam;
        var repUrl = BingoSDK.extConfig.reportLoadingTimeUrl + "?data=";
        var repData = "version=" + (pinfo.clientVersion != null ? pinfo.clientVersion : "");
        var devOS = BingoSDK.devOS();
        repData += "&devOS=" + devOS;
        repData += "&device=" + devOS;
        repData += "&uuid=" + pinfo.uid;
        repData += "&pf_id=" + pinfo.pid;
        repData += "&account_id=" + pinfo.uname;
        repData += "&ip=0.0.0.0";
        repData += "&load_type=" + cusType;
        repData += "&loading_time=" + time;
        repData += "&deviceTime=" + Math.floor(new Date().getTime() / 1000);
        repUrl += encodeURIComponent(repData);
        repUrl += "&time=" + pinfo.time;
        repUrl += "&sign=" + hex_md5(repData + pinfo.time + BingoSDK.extConfig.report_loading_time_sing_key);
        BingoSDK.request(repUrl);
    };

    /** 初始化 */
    BingoSDK.initSDK = function() {
            if (BingoSDK.extConfig && BingoSDK.extConfig.initSDK) {
                console.log("BingoSDK.initSDK ");
                console.log(BingoSDK.extConfig);
                console.log(window);
                BingoSDK.extConfig.initSDK();
            }
        }
        /** 唤起登录 */
    BingoSDK.login = function() {
            console.log("BingoSDK.login ");
            console.log(BingoSDK.extConfig);
            if (BingoSDK.extConfig && BingoSDK.extConfig.login) {
                BingoSDK.extConfig.login();
            }
        }
        /** 登出sdk账号 */
    BingoSDK.loginout = function() {
            if (BingoSDK.extConfig && BingoSDK.extConfig.logout) {
                BingoSDK.extConfig.logout();
            }
        }
        /** 调用支付 */
    BingoSDK.pay = function(args, callback) {
            if (BingoSDK.extConfig && BingoSDK.extConfig.pay) {
                BingoSDK.extConfig.pay(args, callback);
            }
        }
        /** 调用 分享方法 */
    BingoSDK.share = function(title, desc, imgUrl, callback) {
            if (BingoSDK.extConfig && BingoSDK.extConfig.share) {
                BingoSDK.extConfig.share(title, desc, imgUrl, callback);
            }
        }
        /** 获取签名 */
    BingoSDK.getSign = function() {
        // 平台独自的获取方式
        if (BingoSDK.extConfig && BingoSDK.extConfig.getSign) {
            return BingoSDK.extConfig.getSign();
        }
        // 平台url传过来的sign
        return BingoSDK.platparam ? BingoSDK.platparam.sign : "";
    }
    BingoSDK.getUserToken = function() {
        return BingoSDK.extConfig && BingoSDK.extConfig.userToken ? BingoSDK.extConfig.userToken : "";
    }
    return BingoSDK;
}());
window.BingoSDK = BingoSDK;