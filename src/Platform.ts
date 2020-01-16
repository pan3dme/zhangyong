class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() { }
    async sendOpenData(data) { }
    async getShareInfo() { }
    async setUserCloudStorage(data) { }
    async shareAppMessage(data) { }
    async checkviserion() { }
    async updateShareMenu(data) { }
    async getLaunchOptionsSync() { }
    wxGC() { }
    playerBgMusic(url):void{}
    playerSound(url):void{}
    pauseBgMusic():void{}
    resumeBgMusic():void{}
    serverInfo:any;
    serverList:any;
    serverGroupList:any;
    serverRecentList:any;
    noticelist:any;
    uid:string;
    userName:string;
    pid:string="1";
    token:string='';
    sex:number=1;
    head:string="";
    shiming:number=1;
    fcm:number=0;
    login_code:string='';
    time:number=0;
    gameId:string='1';
    fromUid:string='';
    vconsle:number=0;

    //平台类型
    name() { return "window" };
    //是否需要重定向
    redirect=1;

    //上报玩家信息
    public reportInfo():void{
        let serverId=window.platform.serverInfo.serverId;
        let sign2 = hex_md5("gameid="+BingoSDK.gameId+
        "&member_id=4&roleid="+App.hero.playerId+
        "&rolename="+App.hero.accountName+
        "&serverid="+serverId+
        "&servername="+serverId+
        "&key="+BingoSDK.loginKey);
        BingoSDK.report(App.hero.puid,BingoSDK.gameId,serverId,serverId,App.hero.playerId,App.hero.vip,App.hero.level,App.hero.guildName,sign2);
    }
}
 
if(!window["platform"]) {
    window["platform"] = new DebugPlatform();
}
declare let platform: DebugPlatform;
declare interface Window {
    platform: Platform
}