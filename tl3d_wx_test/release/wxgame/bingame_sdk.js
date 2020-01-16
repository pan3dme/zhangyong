/**
 * Created by enger on 2019/3/12.
 * bingo game sdk
 */
var BingoSDK = (function () {
	function BingoSDK() { };
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
	BingoSDK.resVersion = 4;
	BingoSDK.sdkVersion = 0;
	BingoSDK.shareSuccess;
	BingoSDK.paySuccess;
	BingoSDK.loginCbFun;

	//刷新游戏
	BingoSDK.gameRefresh = function (action, callback) {
		window.location.reload();
	}
	//设置提示
	BingoSDK.setGameFunc = function (type, callbak) {

	}
	//上报信息
	BingoSDK.gameReport = function (action, playId, nickname, area, group, extendData) {
	}

  //上报信息
  BingoSDK.report = function (uid, gameId, server, serverName, role, vip, level, partyName, sign) {
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
  }

	//sdk查询接口是否在游戏显示及状态
	BingoSDK.queryExtraStatus = function (callback) {
	}

	//sdk-按钮功能
	BingoSDK.doExtraAction = function (action, callback) {
	}

	//获取当前环境的配置文件
	BingoSDK.getConfig = function () {
		var devenv = BingoSDK.devenv;
		return BingoSDK.configs[devenv] || BingoSDK.configs[-1];
	}

	//设置进度
	BingoSDK.setProgress = function (value) {

	}

	//获取渠道信息
	BingoSDK.getPlatform = function (callback) {
		if (callback) {
			callback(result);
		}
	}

	/** 初始化 */
    BingoSDK.initSDK = function(){
		if(BingoSDK.extConfig && BingoSDK.extConfig.initSDK) {
			BingoSDK.extConfig.initSDK();
		}
    }
	/** 唤起登录 */
	BingoSDK.login = function(){
		if(BingoSDK.extConfig && BingoSDK.extConfig.login) {
			BingoSDK.extConfig.login();
		}
	}
	/** 登出sdk账号 */
	BingoSDK.loginout = function(){
		if(BingoSDK.extConfig && BingoSDK.extConfig.logout) {
			BingoSDK.extConfig.logout();
		}
	}

  BingoSDK.exitGame=function(){

  }

	/** 调用支付 */ 
	BingoSDK.pay = function (args,callback) {
		if(BingoSDK.extConfig && BingoSDK.extConfig.pay) {
			BingoSDK.extConfig.pay(args,callback);
		}
	}
	/** 调用 分享方法 */
	BingoSDK.share = function (title, desc, imgUrl, callback) {
		if(BingoSDK.extConfig && BingoSDK.extConfig.share) {
			BingoSDK.extConfig.share(title, desc, imgUrl, callback);
		}
	}
	/** 获取签名 */
	BingoSDK.getSign = function () {
		// 平台独自的获取方式
		if(BingoSDK.extConfig && BingoSDK.extConfig.getSign) {
			return BingoSDK.extConfig.getSign();
		}
		// 平台url传过来的sign
		return BingoSDK.platparam ? BingoSDK.platparam.sign : "";
	}
	BingoSDK.getUserToken = function () {
		return BingoSDK.extConfig && BingoSDK.extConfig.userToken ? BingoSDK.extConfig.userToken : "";
	}

  BingoSDK.initSDK = function () {
    return BingoSDK.extConfig && BingoSDK.extConfig.userToken ? BingoSDK.extConfig.userToken : "";
  }

  BingoSDK.init=function(data,sdk){
    BingoSDK.extConfig.userToken = data.userToken;
    BingoSDK.extConfig.lzSDK=sdk;
    var platparam = {};
    // uid 跟 userName 必填
    platparam.uid = data.userId;
    platparam.userName = data.chUserId;
    platparam.time = new Date().getTime();
    platparam.head = '';
    platparam.sex = '';
    //other
    platparam.pid = 2; //平台
    platparam.ag = 1; //渠道
    console.log("bingame_sdk.外部参数：", platparam);
    BingoSDK.platparam = platparam; // 传入外部参数
  }


	return BingoSDK;
}());
window.BingoSDK = BingoSDK;