import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;
import Handler = Laya.Handler;

Laya.MiniAdpter.init();
tl3d.MiniTL3dAdpter.init();
class Launch {
    static _init:boolean;
    constructor() {
        if(Launch._init)return;
        if(!Launch._init){
             Launch._init=true;
        }
        this.init();
        App.main = this;
    }
    /** 语言类型 */
    static LANGUAGE:string="zh_CN"
    // 最大美术设计画布像素高宽
    static MAX_SCENE_WIDTH: number = 900;
    // 美术设计画布像素高宽
    static SCENE_WIDTH: number = 720;
    static SCENE_HEIGHT: number = 1280;
    //网络是否连接
    static online: boolean = true;
    //网络断开的时间
    private _offlinetime: number = 0;
    //是否离线
    static unline: boolean = true;
    //最后切出的时间
    private _lastime: number = 0;

    /**
     * 初始化
     */
    private init(): void {
        tl3d.Engine.canvas = Laya.init(Launch.SCENE_WIDTH, Launch.SCENE_HEIGHT, Laya.WebGL);
        logdebug("初始化引擎");
        if (Browser.onPC) {
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        }
        else {
            Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
        }
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.mouseThrough = true;
        Laya.stage.bgColor = "#000";
        Laya.SoundManager.autoStopMusic = true;
        Laya.SoundManager.useAudioMusic = true;
        Laya.loader.maxLoader = 1;
        //设置舞台宽高
        Laya.stage.setScreenSize(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio);
        App.init();
        if (Browser.onPC||Browser.onMiniGame) {
            console.log("wx minigame");
            this.loadConfig();
        }
        else{
            console.log("nativeLoadConfig");
            this.nativeLoadConfig();
        }
        Laya.stage.on(/*laya.events.Event.RESIZE*/"resize", this, this._onResize);
    }

    public nativeLoadConfig(): void {
        Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        Laya.URL.customFormat = (originURL) => {
            if (originURL.indexOf("gui/") != -1) {
                console.log("originURL:", originURL);
                return originURL;
            }
            if (originURL.indexOf("icon/") != -1 || originURL.indexOf("sound/") != -1) {
                return originURL;
            }
            if (originURL != "lang.lang" && originURL != "ui.json") //版本文件和语言包放在外面
            {
                originURL = "gui/" + originURL;
            }
            return originURL;
        }
        this.loadUIConfig();
        //手机锁屏回调支持
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.VISIBILITY_CHANGE);
    }

    //激活资源版本控制
    public loadConfig() {
        Laya.URL.basePath = Scene_data.fileRoot = ExtConfig.res_path;
        Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        Laya.ResourceVersion.addVersionPrefix = (originURL) => {
            var manifest = Laya.ResourceVersion.manifest;
            if (!manifest) {
                return originURL;
            }
            if (originURL.indexOf("icon/") != -1 || originURL.indexOf("sound/") != -1) {
                return manifest[originURL] || originURL;
            }
            if (originURL != "lang.lang" && originURL != "ui.json") //版本文件和语言包放在外面
            {
                originURL = "gui/" + originURL;
            }
            return manifest[originURL] || originURL;
        }
        Laya.ResourceVersion.enable("version.json?v=" + BingoSDK.resVersion, Handler.create(this, this.loadUIConfig));
        //手机锁屏回调支持
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.VISIBILITY_CHANGE);

        window.addEventListener('online', () => {
            logyhj("网络已连接！");
            Launch.online = true;
            common.AlertBox.close();
            this.onBeat(this._offlinetime, 30);
            this._offlinetime = 0;
        });

        window.addEventListener('offline', () => {
            logyhj("网络已断开！");
            Launch.online = false;
            this._offlinetime = new Date().getTime() / 1000;
            common.AlertBox.showWarn({ text: LanMgr.getLan(``,10538) });
        });
    }

    /**
     * 切后台
     */
    private VISIBILITY_CHANGE(): void {
        if (Laya.stage.isVisibility) {
            this.onBeat(this._lastime, 60);
        } else {
            logdebug("lose focus");
        }
        this._lastime = new Date().getTime() / 1000;
    }

    private onBeat(lasttime: number, outtime: number) {
        logdebug("on focus");
        var curtime = new Date().getTime() / 1000;
        if (lasttime == 0) {
            lasttime = curtime;
        }
        if (curtime - lasttime >= outtime) { //超过30秒如果断开了就直接刷新
            PLC.needFresh = true;
        }
        PLC.getInstance().sendHearBeat();
    }

    /**
     * 加载UI配置
     */
    private loadUIConfig(): void {
        //加载语言包
        if(this.needLang()){
            UIMgr.getInstance().showLoading(LanMgr.getLan(``,10543));
            UIMgr.getInstance().loadingProcess(0.01);
            Laya.loader.load("lang.lang", Handler.create(this, this.loadUIJson),Handler.create(this, this.onUIProgress));
        }else{
            this.loadUIJson();
        }
    }
    private loadUIJson():void {
        if(this.needLang()){
            let lang = Laya.loader.getRes("lang.lang");
            Laya.Text.langPacks = JSON.parse(lang);
        }
        UIMgr.getInstance().showLoading(LanMgr.getLan(``,10544));
        UIMgr.getInstance().loadingProcess(0.01);
        Laya.loader.load("ui.json", Handler.create(this, this.onUIConfig), Handler.create(this, this.onUIProgress));
    }

    private onUIProgress(num: number) {
        logyhj("加载进度：", num);
        UIMgr.getInstance().loadingProcess(0.01 + num / 10);
    }

    /**
     * 初始化登录模块
     */
    private onUIConfig(data): void {
        View.uiMap = data;
        tl3d.LoadManager.getInstance()._versions = Laya.ResourceVersion.manifest||{};
        //加载配置
        TableData.getInstance().loadGameData("data/tb.txt", () => {
            //飘字版本控制处理，非引擎加载特殊处理
            let manifest = Laya.ResourceVersion.manifest||{};
            let flytextStr = "ui/textlist/flytext.png";
            let publicsStr = "ui/public/publics.png";
            let img_flytext = manifest[flytextStr] || flytextStr;
            let img_publics = manifest[publicsStr] || publicsStr;
            var $baseUiList: Array<any> = [{ xmlurl: "ui/textlist/flytext.txt", picurl: img_flytext, name: tl3d.UIData.flytext }, { xmlurl: "ui/public/publics.txt", picurl: img_publics, name: tl3d.UIData.publicsUi }];
            tl3d.UIData.init($baseUiList, () => {
                Module.registerModule(new game.LoginModule()); //开始登录 
            },
                (value) => {
                    UIMgr.getInstance().loadingProcess(0.4 + value * 0.1);
                }
            );
        }, (num) => {
            UIMgr.getInstance().loadingProcess(0.2 + 0.2 * num);
        });
    }

    /** 是否需要语言包 */
    public needLang():boolean {
        return Launch.LANGUAGE != "zh_CN";
    }

    private _onResize():void{
        Launch._offsetX = (Laya.stage.width - Launch.SCENE_WIDTH) >> 1;
        Launch._offsetY = (Laya.stage.height - Launch.SCENE_HEIGHT) >> 1;
        dispatchEvt(new game.HudEvent(game.HudEvent.SCREEN_SIZE_CHNAGE));
    }

    // ui偏移位置
    static _offsetX: number;
    static _offsetY: number;

    static get offsetX(): number {
        if (isNaN(Launch._offsetX)) {
            Launch._offsetX = (Laya.stage.width - Launch.SCENE_WIDTH) >> 1;
        }
        return Launch._offsetX;
    }
    static get offsetY(): number {
        if (isNaN(Launch._offsetY)) {
            Launch._offsetY = (Laya.stage.height - Launch.SCENE_HEIGHT) >> 1;
        }
        return Launch._offsetY;
    }
}
window['Launch'] = Launch;
new Launch();

