var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var LoginLoadProcessor = /** @class */ (function (_super) {
        __extends(LoginLoadProcessor, _super);
        function LoginLoadProcessor() {
            var _this = _super.call(this) || this;
            /**=================================================================================
             * 加载UI基础资源
             */
            _this._total0 = 7;
            _this._preloads0 = ["comp/bg.atlas", "comp/button.atlas",
                "comp/image.atlas", "comp/progressbar.atlas", "comp/shuzi.atlas", "effects/ring.atlas"];
            /**=================================================================================
             * 加载剧情必需资源
            */
            _this._preloads1 = ["kaichang/kaichang1.jpg", "kaichang/kaichang2.jpg", "kaichang/kaichang3.jpg"];
            /**=================================================================================
             * HUD预加载资源
             */
            _this._total2 = 2;
            _this._preloads2 = ["hud.atlas"];
            _this._state = -1;
            _this._hudScene = 'scene022';
            _this._uiMgr = UIMgr.getInstance();
            return _this;
        }
        LoginLoadProcessor.prototype.getName = function () {
            return "LoginLoadProcessor";
        };
        LoginLoadProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.LoginLoadEvent(game.LoginLoadEvent.LOADBASE_EVENT),
                new game.LoginLoadEvent(game.LoginLoadEvent.LOADJUQING_EVENT),
                new game.LoginLoadEvent(game.LoginLoadEvent.LOADHUD_EVENT),
                new game.LoginLoadEvent(game.LoginLoadEvent.ENTERHUD_EVENT),
            ];
        };
        //处理事件
        LoginLoadProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.LoginLoadEvent) {
                switch (event.type) {
                    case game.LoginLoadEvent.LOADBASE_EVENT:
                        this.preloadBase();
                        break;
                    case game.LoginLoadEvent.LOADJUQING_EVENT:
                        this._uiMgr.showLoading(LanMgr.getLan("", 10539));
                        this.preloadJuqing();
                        UIMgr.hideUIByName(UIConst.SelectListView);
                        break;
                    case game.LoginLoadEvent.LOADHUD_EVENT:
                        if (this._hudloading || this._hudloaded) { //已经在加载或者加载完了
                            return;
                        }
                        if (!event.data) { //偷偷加载就不要显示进度条胃
                            this._uiMgr.showLoading(LanMgr.getLan("", 10540));
                        }
                        this._hudloading = true;
                        this.preloadHud();
                        break;
                    case game.LoginLoadEvent.ENTERHUD_EVENT:
                        this.enterHud(event.data);
                        break;
                }
            }
        };
        /**
         * 预加载基础资源
         */
        LoginLoadProcessor.prototype.preloadBase = function () {
            this._uiMgr.loadingProcess(((this._total0 - this._preloads0.length) / this._total0) * 0.4 + 0.6);
            if (this._preloads0.length > 0) {
                Laya.loader.load(this._preloads0.pop(), Handler.create(this, this.preloadBase));
            }
            else {
                dispatchEvt(new game.LoginEvent(game.LoginEvent.LOGININIT_EVENT)); //开始登录
            }
        };
        /**
         * 新手剧情预加载资源
         */
        LoginLoadProcessor.prototype.preloadJuqing = function (init) {
            var _this = this;
            if (init === void 0) { init = false; }
            Laya.loader.load(this._preloads1, Handler.create(null, function (result) {
                // logyhj("加载结果：", result);
                if (result === false) {
                    //资源加载出错，就不打开界面
                    //1秒后重新加载
                    Laya.timer.once(1000, _this, _this.preloadJuqing);
                    return;
                }
                _this._uiMgr.hideLoading();
                UIMgr.showUI(UIConst.FirstGuide, null, false);
            }), Handler.create(null, function (value) {
                _this._uiMgr.loadingProcess(value);
            }));
        };
        /**
         * 预加载hud资源
         * 加载完是否直接进入
         */
        LoginLoadProcessor.prototype.preloadHud = function () {
            this._uiMgr.loadingProcess(((this._total2 - this._preloads2.length) / this._total2));
            if (this._preloads2.length > 0) {
                Laya.loader.load(this._preloads2.pop(), Handler.create(this, this.preloadHud));
            }
            else {
                // Pan3d.SceneResManager.getInstance().loadSceneRes(this._hudScene, () => { //预加载hud场景
                this._hudloaded = true;
                if (this._enter) {
                    this.showHud();
                }
                // }, () => { }, ($str: any) => { });
            }
        };
        //进入hud
        LoginLoadProcessor.prototype.enterHud = function (guideStep) {
            if (guideStep) {
                this._state = guideStep;
            }
            this._enter = true;
            if (this._hudloaded) { //如果已经加载完了就直接进入
                this.showHud();
            }
            else { //如果还没加载就先加载
                dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.LOADHUD_EVENT));
            }
        };
        //显示hud
        LoginLoadProcessor.prototype.showHud = function () {
            this._uiMgr.hideLoading();
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW), [ModuleConst.MAIN]);
            if (this._state == -1) { //旧号
                game.GuideManager.startInit();
            }
            else { //剧情结束
                dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.GUIDE_START), this._state);
            }
            if (App.hero.level >= 3) {
                Laya.timer.once(1000, this, function () {
                    if (App.isOpenSvrDay(2)) {
                        //开服大于2天,会显示公告
                        var key = "AppUpdate_Notice_" + game.GameNoticeView.noticeVersion + "_" + App.hero.playerId;
                        if (Laya.LocalStorage.getItem(key)) {
                            game.HuodongModel.getInstance().autoOpenLoginGift();
                        }
                        else {
                            UIMgr.showUI(UIConst.GameNoticeView, { openFlag: true });
                            Laya.LocalStorage.setItem(key, game.GameNoticeView.noticeVersion);
                        }
                    }
                    else {
                        game.HuodongModel.getInstance().autoOpenLoginGift();
                    }
                });
            }
        };
        return LoginLoadProcessor;
    }(tl3d.Processor));
    game.LoginLoadProcessor = LoginLoadProcessor;
})(game || (game = {}));
