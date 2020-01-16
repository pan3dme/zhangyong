
class MLH5 {
  constructor() {
    this.systemArgs = {
      sdkHost: "https://sdk.lezhonggame.com",
      wxAppId: "",
      wxAppType: "wxApp",
      appId: 0,
      channelId: 0,
      appKey: "",
      pubKey: "",
      initFlag: false,
      timeOffset: 0,
      authCookie:""
    }

    this.userInfo = {
      sessionKey: "",
      openId: "",
      unionId: "",
      accessToken: "",
      userId: 0,
      adsId:"wxapp"
    }

    this.headerArgs = {
      deviceId: "",
      deviceModel: "",
      OSVersion: "",
      OS: "",
      netType: "",
      extInfo: "",
      platform: "",
      sourceUserId: "0",
      LaunchArgs:""
    }
    this.childSDK=null;
  }
  

  init(opts) {
    var _this=this;
    if(this.childSDK==null){
        wx.showShareMenu({ withShareTicket: true });
        // wx.onShareAppMessage((res) => {
        //   var rs= {
        //     query: "sourceId=" + this.userInfo.userId
        //   };
        //   if (canvas && canvas.toTempFilePathSync) {
        //     rs.imageUrl = canvas.toTempFilePathSync({
        //       destWidth: 500,
        //       destHeight: 400
        //     });
        //   }
        //   return rs;
        // });
    }

    if (!(opts.appId && opts.appKey && opts.channelId && opts.callback)) {
      wx.showModal({
        title: '错误提示',
        content: '初始化失败,初始化参数不完整,接入有误',
        showCancel: false
      });
      return;
    }
    
    //避免重复初始化
    if (_this.systemArgs.initFlag) return;
    _this.systemArgs.appId = opts.appId;
    _this.systemArgs.appKey = opts.appKey;
    _this.systemArgs.channelId = opts.channelId;
    
    //获取系统信息
     wx.getSystemInfo({
      success: function (res) {
        _this.headerArgs.deviceModel = res.model;
        _this.headerArgs.OS = res.platform.toUpperCase();
        _this.headerArgs.OSVersion = res.system;
        if (res.system.indexOf(" ") != 0) {
          var osArr = res.system.split(" ");
          _this.headerArgs.OSVersion = osArr[osArr.length - 1];
        }
      }
    });

    //获取网络类型
     wx.getNetworkType({
      success: res => {
        _this.headerArgs.netType = res.networkType;
      }
    });
    var args = wx.getLaunchOptionsSync();
    if (args.query.sourceId) {
      this.headerArgs.sourceUserId = args.query.sourceId;
      this.userInfo.adsId = "wxapp_wxShare." + args.query.sourceId;
    }
    if (args.query.adsId && args.query.adsId.length > 0) {
      this.userInfo.adsId = "wxapp_" + args.query.adsId;
    }
    this.headerArgs.LaunchArgs = JSON.stringify(args);

    //从服务器请求参数
    _this.request({
      url: "/wx/app/init",
      loading: true,
      pdata: { channelId: this.systemArgs.channelId },
      callback: (res) => {
        if (!(res.data && res.data.result && res.data.result == 200)) {
          wx.showModal({
            title: '错误提示',
            content: "error:" + res.data.msg + "",
            confirmText: "重试",
            showCancel: false,
            success: () => {
              _this.init(opts);
            }
          });
          return;
        } 
        _this.systemArgs.pubKey = res.data.data.publicKey;
        _this.systemArgs.initFlag = true;
        _this.headerArgs.extInfo = res.data.data.extInfo;
        _this.systemArgs.timeOffset = res.data.data.time - new Date().getTime();
        if(res.data.extData&&res.data.extData.appId){
          _this.childSDK=new MLH5();
          _this.childSDK.systemArgs.sdkHost=res.data.extData.appHost;
          _this.childSDK.init({
            appId:res.data.extData.appId,
            channelId:res.data.extData.channelId,
            appKey:res.data.extData.appKey,
            callback:()=>{opts.callback()}
          });
          //console.log(_this);
          return;
        }
        opts.callback();
      }
    });
  }
 
  login(opts) {
    var _this = this;
    if (_this.systemArgs.initFlag == false) {
      if (!opts.repeatTimes) {
        opts.repeatTimes = 0;
      }
      opts.repeatTimes += 1;
      if (opts.repeatTimes > 10) return;
      console.log("初始化未完成，2秒后再重新调用" + opts.repeatTimes);
      setTimeout(login, 2000, opts);
      return;
    }
    if(_this.childSDK!=null){
      _this.childSDK.login({
        callback:res=>{
            //console.log(res);
            wx.showLoading({
              title: '获取用户信息中..',
            });
            _this.request({
              url:"/wx/app/VerifyChannel",
              qdata:{channelId:_this.systemArgs.channelId},
              pdata:{ch_userToken:res.userToken},
              callback:res2=>{
                wx.hideLoading();
                //console.log(res2.data.data);
                
                setTimeout(wx.hideToast, 3000);

                for(var i in res.extData){
                  res2.data.data.extData[i]=res.extData[i];
                }
                _this.userInfo.userId = res2.data.data.userId;
                _this.userInfo.accessToken = res2.data.data.accessToken;
                _this.userInfo.sessionKey = res2.data.data.extData.sessionKey;
                _this.userInfo.openId = res2.data.data.extData.openId;
                _this.userInfo.unionId = res2.data.data.extData.unionId;

                if (opts.callback) {
                  opts.callback(res2.data.data);
                }

              }
            });
        }
      });
      return;
    }
    

    wx.showLoading({
      title: '获取用户信息中..',
    });

    //开始获取用户信息
    wx.login({
      success: res => {
        wx.getUserInfo({
          complete: resInfo => {
            _this.request({
              url: "/wx/app/login",
              pdata: {
                channelId: _this.systemArgs.channelId,
                code: res.code,
                encryptedData: resInfo.encryptedData,
                iv: resInfo.iv,
                signature: resInfo.signature
              },
              callback: res => {
                wx.hideLoading();
                if (!(res.data.result && res.data.result == 200)) {
                  wx.showModal({
                    title: '错误提示',
                    content: "error:" + res.data.msg + "",
                    confirmText: "重新登录",
                    showCancel: false,
                    success: () => {
                      login(opts);
                      return;
                    }
                  });
                  return;
                }
                wx.showToast({
                  title: '用户信息获取成功',
                });
                setTimeout(wx.hideToast, 3000);
                //console.log(res);
                _this.userInfo.userId = res.data.data.userId;
                _this.userInfo.accessToken = res.data.data.accessToken;
                _this.userInfo.sessionKey = res.data.data.extData.sessionKey;
                _this.userInfo.openId = res.data.data.extData.openId;
                _this.userInfo.unionId = res.data.data.extData.unionId;
                if (opts.callback) {
                  opts.callback(res.data.data);
                }
              }
            });
          }
        });
        if (opts.success) opts.success(res);
        //console.log(_this);
      }
    });
  }

  pay(opts) {
    if (!(opts.productId
      && opts.productName
      && opts.productDesc
      && opts.roleId
      && opts.roleName
      && opts.serverId
      && opts.serverName
      && opts.amount && opts.roleLevel)) {
      console.log("支付参数不完整");
      return;
    }
    var _this=this;
    if (this.userInfo.accessToken.length < 1) {
      wx.showModal({
        title: '错误提示',
        content: "你还没登录呢，请先登录",
        confirmText: "重新登录",
        showCancel: false,
        success: () => {
          login({
            callback: (res) => {
              _this.pay(opts);
            }
          });
          return;
        }
      });
      return;
    }
    if (wx.checkSession({
      fail: res => {
        this.login({
          callback: (res) => {
            _this.pay(opts);
          }
        });
      }
    }));

    var pdata = opts;
    pdata.ch_wxOpenId = this.userInfo.openId;
    pdata.ch_sessionKey = this.userInfo.sessionKey;
    pdata.ch_platform = this.headerArgs.OS.toLowerCase();
    if (pdata.ch_platform == "devtools" || 1 < 2) {
      pdata.ch_platform = "android";
    }

    wx.showLoading({
      title: '请求支付信息..',
    });
    this.request({
      url: "/wx/app/order",
      pdata: pdata,
      loading: true,
      callback: res => {
        wx.hideLoading();
        if (!(res.data && res.data.result && res.data.result == 200)) {
          wx.showModal({
            title: '错误提示',
            content: "error:" + res.data.msg + "",
            confirmText: "确定",
            showCancel: false,
            success: () => {
            }
          });
          return;
        }

        if (_this.childSDK != null) {
          var childOpts = {};
          for (var i in opts) {
            childOpts[i] = opts[i];
          }
          childOpts.orderExt=res.data.data.orderId;
          childOpts.callback = function (res2) {
            if (opts.callback) {
              opts.callback({ orderId: res.data.data.orderId, msg:res2.msg, result:res2.result });
            }
          };
          _this.childSDK.pay(childOpts);
          return;
        }


        var payData = res.data.data;
        if (!payData.tradeType) {
          console.log("服务器忙，请稍后重试", res.data);
          return;
        }

        payData.cpCallback = opts.callback ? opts.callback : function () { };

        //JSAPI,小程序支付
        if (payData.tradeType == "JSAPI") {
          delete payData.tradeType;
          payData.success = function (res1) {
            payData.cpCallback({ orderId: res.data.myOrderId, msg: "unknown", result: 200 });
          };
          wx.requestPayment(payData);
          return;
        }
        if (payData.tradeType == "WXGAME") {
          payData.orderId = res.data.myOrderId;
          if (!payData.requestData) payData.requestData = {};
          payData.requestData.success = function (res) {
            _this.wxGameShip({
              orderId: payData.orderId,
              callback: function (res) {
                payData.cpCallback({ orderId: payData.orderId, msg: "unknown", result: 200 });
              }
            });
          };
          _this.wxGamePay(payData);
          return;
        }
        //这里小游戏支付
        console.log("暂时不支持的支付方式", res.data);
      }
    });
  }


  wxGamePay(payData) {
    if (payData.balance == 0) {
      wx.requestMidasPayment(payData.requestData);
      return;
    }

    if (payData.balance > 0) {
      wx.showModal({
        title: '支付提示',
        content: payData.tips,
        confirmText: "确定",
        cancelText: "取消",
        success: (res) => {
          if (res.cancel) { payData.cpCallback({ orderId: payData.orderId, msg: "cancel", result: 0 }); return; }
          if (payData.buyPrice > 0) {
            wx.requestMidasPayment(payData.requestData);
            return;
          }
          payData.requestData.success(res);
        }
      });
      return;
    }
    payData.requestData.success();
  }

  wxGameShip(opts) {
    console.log("请求发货：");
    var pdata = {};
    pdata.accessToken = this.userInfo.accessToken;
    pdata.ch_wxOpenId = this.userInfo.openId;
    pdata.ch_sessionKey = this.userInfo.sessionKey;
    pdata.ch_platform = this.headerArgs.OS.toLowerCase();
    if (pdata.ch_platform == "devtools" || 1 < 2) {
      pdata.ch_platform = "android";
    }
    pdata.orderId = opts.orderId;
    this.request({
      url: "/wx/app/wxGameShip",
      pdata: pdata,
      loading: true,
      callback: res => {
        opts.callback(res);
        if (!(res.data && res.data.result && res.data.result == 200)) {
          wx.showModal({
            title: '错误提示',
            content: "error:" + res.data.msg + "",
            confirmText: "确定",
            showCancel: false,
            success: () => {
            }
          });
          return;
        }
        wx.showToast({
          title: '支付成功',
        });
        setTimeout(wx.hideToast, 3000);
      }

    });
  }

  /**
   * 设置开放域key-value
   * opts:
   * { kv_list: [{ key: "name1", value: "value1" }, { key: "name2", value: "value2" }],callback:res=>{}}
   */
  setUserStorage(opts) {
    if (this.childSDK != null) {
      this.childSDK.setUserStorage(opts);
      return;
    }
    this.request({
      url: "/wx/app/SetUserStorage",
      header: { "content-type": "application/json;charset=utf-8;" },
      qdata: { accessToken: this.userInfo.accessToken, openId: this.userInfo.openId, sessionKey: this.userInfo.sessionKey },
      pdata: { kv_list: opts.kv_list },
      success: res => {
        if (opts.callback)
          opts.callback(res);
      }
    });
  }

  /**
   * 删除开放域key-value
   * opts:
   * {keys: ["name1","name2"],callback:res=>{}}
   */
  removeUserStorage(opts) {
    if(this.childSDK!=null){
      this.childSDK.removeUserStorage(opts);
      return;
    }
    this.request({
      url: "/wx/app/removeUserStorage",
      header: { "content-type": "application/json;charset=utf-8;" },
      qdata: { accessToken: this.userInfo.accessToken, openId: this.userInfo.openId, sessionKey: this.userInfo.sessionKey },
      pdata: { key: opts.keys },
      success: res => {
        if (opts.callback)
          opts.callback(res);
      }
    });
  }

/**
 * 校验一张图片是否含有违法违规内容
 * opts:
 * {filename:"文件名"，media:"把文件转为byte[]后，转成base64格式字符串"}
 */
  imgSecCheck(opts) {
    if (this.childSDK != null) {
      this.childSDK.imgSecCheck(opts);
      return;
    }
    this.request({
      url: "/wx/app/ImgCheck",
      header: { "content-type": "application/json;charset=utf-8;" },
      qdata: { accessToken: this.userInfo.accessToken },
      pdata: { filename: opts.filename, media: opts.media },
      callback: res => {
        if (opts.callback)
          opts.callback(res.data);
      }
    });
  }

  /**
   * 检查一段文本是否含有违法违规内容
   * opts:
   * {content:"文本内容"}
   */
  msgSecCheck(opts) {
    if (this.childSDK != null) {
      this.childSDK.msgSecCheck(opts);
      return;
    }
    this.request({
      url: "/wx/app/MsgCheck",
      header: { "content-type": "application/json;charset=utf-8;" },
      qdata: { accessToken: this.userInfo.accessToken },
      pdata: { content: opts.content },
      callback: res => {
        if (opts.callback)
          opts.callback(res.data);
      }
    });
  }


  request(opts) {
    if (!opts.url) {
      console.error("参数有误!");
      return;
    }
    var req_header = opts.header;
    if (!req_header) req_header = {};
    for (var h in this.headerArgs) {
      if (this.headerArgs[h].length == 0) continue;
      req_header["X-App-" + h] = this.headerArgs[h];
    }

    req_header["X-App-PackId"] = this.systemArgs.channelId +"."+ this.userInfo.adsId;
    req_header["X-App-Sign"] = "wxapp";
    req_header["X-App-Time"] = new Date().getTime() + this.systemArgs.timeOffset;
    if (!req_header["content-type"]) { req_header["content-type"] = "application/x-www-form-urlencoded; charset=UTF-8"; }
    if (this.userInfo.accessToken.length > 0) {
      req_header["X-App-AccessToken"] = this.userInfo.accessToken;
    }

    var reqUrl = this.systemArgs.sdkHost + opts.url;
    if (opts.qdata) {
      var qstr = "";
      for (var q in opts.qdata) {
        qstr += "&" + q + "=" + encodeURIComponent(opts.qdata[q]);
      }
      if (reqUrl.indexOf("?") != -1) {
        reqUrl = reqUrl + qstr;
      } else {
        reqUrl = reqUrl + "?" + qstr.substring(1);
      }
    }

    if (opts.loading) {
      wx.showLoading({
        title: 'Loading...',
      });
    }

    var pdata = {};
    for (var i in opts.pdata) {
      if (opts.pdata[i] == undefined || opts.pdata[i] == null) continue;
      if (typeof opts.pdata[i] == "function") continue;
      pdata[i] = opts.pdata[i];
    }

    wx.request({
      url: reqUrl,
      header: req_header,
      method: opts.method ? opts.method : "POST",
      dataType: opts.dataType ? opts.dataType : "json",
      data: pdata,
      success: (res) => {
        if (opts.callback) {
          if (opts.callback) {
            opts.callback(res);
          }
        }
      }, fail: (res) => {
        if (opts.callback) {
          opts.callback({data:{result:500,msg:res.errMsg}});
        }
      }, complete: (res) => {
        if (opts.loading) {
          wx.hideLoading();
        }

      }
    })

  }

}

var H5Core=new MLH5();

/**
 * 初始化
 */
function init(opts) {
  H5Core.init(opts);
  return;
}

/**
 * 登录
 */
function login(opts) {
  H5Core.login(opts);
};

/**
 * 支付
 */
function pay(opts) {
  H5Core.pay(opts);
};

function setUserStorage(opts){
  H5Core.setUserStorage(opts); 
}
function removeUserStorage(opts) {
  H5Core.removeUserStorage(opts);
}
/**
 * 内容检测
 */
function msgSecCheck(opts) {
  H5Core.msgSecCheck(opts);
}
/**
 * 图片检测
 */
function imgSecCheck(opts) {
  H5Core.imgSecCheck(opts);
}

/**
 * 获取用户信息
 */
function getUserInfo(callback) {
  if (wx.checkSession({
    success: () => {1
      callback(userInfo);
    },
    fail: () => {
      login({
        callback: (res) => {
          callback(userInfo);
        }
      });
    }
  }));
}

module.exports = { init, login, pay, getUserInfo, setUserStorage, removeUserStorage, imgSecCheck, msgSecCheck, H5Core}