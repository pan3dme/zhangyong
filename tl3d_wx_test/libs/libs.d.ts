/**
 * 调试
 */
declare class VConsole{
    /**关闭调试 */
    showSwitch():void;
    /**显示调试 */
    hideSwitch():void;
}

/**
 * 项目配置
 */
declare class ExtConfig{
    /**客户端地址 */
    static res_path:string; 
    /**登录服地址 */
    static net_host:string;
    /**服务器列表获取地址 */
    static server_host:string;
    /** 后台公告地址 */
    static notice_host:string;
    /**服务器列表获取签名key */
    static getplKey:string;
    /**服务器公告获取签名key */
    static noticeKey:string;
    /**日志等级 */
    static LOG_LEVEL:number;
    /**是否调试 */
    static RELEASE:boolean;
    /**是否版署 */
    static BANSHU:boolean;
    /**是否本地 */
    static isLocal:boolean;
     /**外部参数 */
    static platparam:any;
    /**错误上报地址 */
    static reportErrorUrl:string;
}

declare function hex_md5(str);
declare function hex_sha1(str);
declare function unescape(str);

/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 * 获取本次分享的群信息：wx.getShareInfo
 * 游戏数据托管在微信后台 wx.setUserCloudStorage()
 * 主动转发 wx.shareAppMessage
 */
declare interface Platform {
    gameId:string;
    uid:string;
    userName:string;
    pid:string;
    fcm:number;
    fromUid:string;
    time:number;
    shiming:number;
    token:string;
    serverInfo:any;
    serverList:any;
    serverGroupList:any;
    serverRecentList:any;
    noticelist:any;
    name;
    sex:number;
    head:string;
    redirect:number;
    vconsle:number;

    getUserInfo(): Promise<any>;
    login(): Promise<any>;
    sendOpenData(data);
    getShareInfo(): Promise<any>;
    setUserCloudStorage(data): Promise<any>;
    shareAppMessage(data): Promise<any>;
    checkviserion(): Promise<any>;
    wxGC();
    playerBgMusic(url);
    playerSound(url);
    pauseBgMusic();
    resumeBgMusic();
    updateShareMenu(data);
    getLaunchOptionsSync(): Promise<any>;
    //上报玩家信息
    reportInfo():void;
}
/**冰菓sdk接口 */
declare class BingoSDK {
    //获取当前环境的配置文件
	static getConfig();
    //调用 设置当前进度
	static setProgress(value);
    //调用 获取渠道信息
	static getPlatform(callback);
    //调用 刷新游戏
	static gameRefresh();
	//调用 分享方法
	static share(title,desc,imgUrl,callback);
    /** 调用支付 */
    static pay(args:any,callback:Function);
    /** 登录 */
    static login();
    /** 登出 -- 切换账号 */
    static loginout();
    /** 退出游戏,关闭应用 */
    static exitGame();
	//sdk数据上报
    static gameReport(action, playId, playerName, serverId, serverName, parms);
	//sdk按钮操作
    static doExtraAction(action, callback);
	//sdk游戏提示框绑定
    static setGameFunc(action, callback);
	//sdk查询功能状态接口
    static queryExtraStatus(callback);
	//上报信息
	static report(uid,gameId,server,serverName,role,vip,level,partyName,sign);
	//获取浏览器参数
    static getQueryString(name); 
	//签名
    static getSign(dat); 
    static getUserToken(); 
	//ajax请求
	static request(url,cb,param);
	//上报步骤
	static reportStep(cusStep);
	//上报加载时间
	static reportLoadingTime(cusType,cusTime);
	//上报错误
	static reportError(cusContent);
    //参数
    static platparam:any;
    static clientVersion;
	static resVersion;
    static sdkVersion;
    static configs:any;
	static gameName:string;
	static gameId:string;
	static open_id:string;
	static loginKey:string;
	static payKey:string;
	static channelId:number;
    static shareSuccess:Function;
	static paySuccess:Function;
}

declare namespace Zlib{
    class Inflate{
        constructor(str)
        decompress();
    }
}

/**语音sdk接口 */
declare class IMblend{
    //初始化sdk
    constructor(data);
    //登录房间
    loginRoom(data);
    //开始录音
    startRecords(data);
    //停止录音
    stopRecord();
    //播放语音
    playOnlineAudio(data);
    //停止播放语音
    stopPlayAudio();
    //设置语音识别
    setRecognize(value);
}
