//基础依赖库
require("weapp-adapter.js");
window.Parser=require("js/dom_parser.js"); //parse xml
require("js/inflate.min.js"); //tl3d zip tool
require("js/md5.js"); //md5 tool
window.mlh5=require("./js/mlh5.js"); //乐众小游戏sdk
require("./bingame_sdk.js"); //bingo sdk
require("./extconfig_wx.js"); //web config

const loadTask = wx.loadSubpackage({
  name: 'laya', // name 可以填 name 或者 root
  success:  (res)=> {
    // 分包加载成功后通过 success 回调
    console.log("分包加载成功后通过 success 回调!");
      if (wx.loadSubpackage) {
        //支持分包，加载分包
        console.log("支持分包，加载分包");
      } else {
        //不支持分包，开发者主动调用
        console.log("不支持分包，开发者主动调用");
        //laya引擎
        //require("laya/game.js");
      }
      //业务模块
      require("code.js");
      window.mlh5.init({appId: 53024, channelId: 530241002, appKey:"B2D6E83AA65768A13CD4884E31F70C41",callback:()=>{
          window.mlh5.login({callback:res=>{
            console.log(res);
            BingoSDK.extConfig = window.ExtConfig;
            BingoSDK.init(res,window.mlh5);
            new window.Launch();
          }});
      }});
     
  },
  fail:  (res)=> {
    // 分包加载失败通过 fail 回调 这里失败做一个重启来容错
    console.log("fail:",res);
  }
});

loadTask.onProgressUpdate(res => {
  // console.log('下载进度', res.progress);
  // console.log('已经下载的数据长度', res.totalBytesWritten)
  // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
});