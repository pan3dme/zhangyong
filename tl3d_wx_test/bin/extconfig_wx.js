window.ExtConfig = function () {
  function t() { };
  //资源地址
  t.res_path ="https://h5.bingame.net/wxres/";
  //服务器链接地址
  // t.net_host = "https://game2slqy3d.wejust.cn";
  //服务器列表获取
  // t.server_host = "https://srvmgrapislqy3d.wejust.cn/ApiServer/getPfSrvList/g/19";
  //测试地址
	t.net_host="https://gameserver1.bingame.net";
	//服务器列表获取
	t.server_host = "https://testsrvmgrapi.xmylhy.com/ApiServer/getPfSrvList/g/19";
	//获取区服列表时加密的key
	t.getplKey="2CQe6tGqzqZ5Z5VjTwTYEdvCoUx7aN8a";

  //步骤上报地址
  t.reportUrl = "https://webgmsapislqy3d.wejust.cn/Api/ClientServer/loginStepLogs/g/19";
  //错误上报地址
  t.reportErrorUrl = "https://webgmsapislqy3d.wejust.cn/Api/ClientServer/clientBugLogs/g/19";
  //加载时间上报地址
  t.reportLoadingTimeUrl = "https://webgmsapislqy3d.wejust.cn/Api/ClientServer/loadingTimeLog/g/19";
  t.report_sing_key = "2CQe6tGqzqZ5Z5VjTwTYEdvCoUx7aN8a";
  t.report_loading_time_sing_key = "2CQe6tGqzqZ5Z5VjTwTYEdvCoUx7aN8a";
  // 公告秘钥
  t.noticeKey = "6RTW7CD^6LZmQ;2@5RCIkOmHiYX19";
  // 后台公告地址
  t.notice_host = "https://webgmsapislqy3d.wejust.cn/Api/Bulletin/getLoginBulletins/g/19";
  //是否版署
  t.BANSHU = 0;
  //日志打印等级
  t.LOG_LEVEL = 1;
  //是否调试版本
  t.RELEASE = true;
  //错误是否发送邮件
  t.sendMail = true;
  //是否本地
  t.isLocal = false;

  /** 初始化 */
  t.initSDK = function () {
  
  }
  /** 唤起登录 */
  t.login = function () {
   
  }
  /** 登出sdk账号 */
  t.loginout = function () {
  
  }
  /** 退出游戏 */
  t.exitGame = function () {
    console.log("exitGame");
  }
  /** 调用 分享方法 */
  t.share = function (title, desc, imgUrl, callback) {
    console.log("分享", "title:" + title, "desc:" + desc, "imgUrl:" + imgUrl);
  }
  t.cusEvent = function (args) {
    console.log("cusEvent:",cusEvent);
  };
  //调用支付 
  t.pay = function (args, callback) {
    var money = args['money'] * 100;
    var goodsId = args['goodsId'];
    var goodsName = args['goodsName'];
    var goodsDesc = args['goodsDesc'];
    var playerId = args['playerId'];
    var playerName = args["playerName"];
    var playerLevel = args["playerLevel"];
    var serverId = args['serverId'];
    var serverName = args['serverName'];
    BingoSDK.paySuccess = callback;
    console.log("请求支付", args);
    t.lzSDK.pay({
      amount: money,
      currency: "CNY",
      productId: goodsId + "",
      productName: goodsName,		// 不能为空
      productDesc: goodsDesc,		// 不能为空
      roleId: playerId,
      roleName: playerName,
      roleLevel: playerLevel,
      serverId: serverId + "",
      serverName: serverId + "",	// 不能为空
      orderExt: "",
      noticeUrl: "",
      callback:(res)=>{
        console.log("pay callback:",res);
      }
    });
  }

  // t.getSign = function () {
  //   return hex_md5(t.userToken + t.appSecret);
  // }

  // 登录token
  t.appSecret ="A94825FE3622DC1AA6D810DB586A14FB";
  t.userToken = "";
  t.lzSDK={};
  //数据上报
  t.gameReport = function (action, playId, nickname, area, group, extendData) {
    var repData = {
      eventName: action,	//事件名称，固定为:是   createRole,upgrade,enterGame,exitGame,kf
      roleId: playId,	//角色Id	是
      roleName: nickname,	//角色名称	是
      serverId: area,	//区服Id	是
      serverName: group,	//区服名称	是
    }
    if (action == "itemChange") {
      repData.itemName = extendData.itemName;	//道具名称，如：钻石，金币	是
      repData.count = extendData.count;	//变动数量,增加为正数，减少为负数，转为字符串	是
      repData.reason = extendData.reason;	//变动原因，不能为nil，可以为空字符串	是
      repData.balance = extendData.balance;	//对应道具当前余额
    }
    else if (action == "chat") {
      repData.roleLevel = extendData.level;	//角色当前等级，整数转为字符串	是
      repData.vipLevel = extendData.vip;	//角色Vip等级，整数转为字符串	是
      repData.chatTo = extendData.channel;	 //1.世界聊天时：世界
      //2.公会聊天时：公会_{公会Id}_{公会名称}
      //3.私聊时：私聊_{私聊角色Id}_{私聊角色名称}
      //4:其它, {自定义场景}_{自定义参数}
      //5.投诉聊天：投诉@{被投诉对象角色Id}  	 
      repData.content = extendData.content;	//聊天内容（当chatTo为投诉时,传投诉相关内容）	 
      repData.recharge = extendData.charge;//角色累计充值金额，单位：元 如果旧包确实无法获取的，传:-1
    }
    else {
      repData.roleLevel = extendData.level;	//角色当前等级，整数转为字符串	是
      repData.vipLevel = extendData.vip;	//角色Vip等级，整数转为字符串	是
      repData.recharge = extendData.charge;	//角色累计充值金额，单位：元 联系客服事件必须传入。如果旧包确实无法获取的，传:-1 否
    }
    t.cusEvent(repData);
  };

   BingoSDK.extConfig = t;
    var platparam = {};
    // uid 跟 userName 必填
    platparam.uid = "enger";
    platparam.userName = "enger";
    BingoSDK.extConfig.userToken = "";
    platparam.time = new Date().getTime();
    platparam.head = "";
    platparam.sex = "";
    platparam.fromUid = "";
    //other
    platparam.fcm = 1;
    platparam.pid = 1; //平台
    platparam.ag = 0; //渠道
    platparam.shiming = 1;
    platparam.vconsle = 0;
    console.log("bingame_sdk.外部参数：", platparam);
    BingoSDK.platparam = platparam; // 传入外部参数
  return t;
}();