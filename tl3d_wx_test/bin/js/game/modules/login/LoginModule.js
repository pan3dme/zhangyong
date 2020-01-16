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
var game;
(function (game) {
    /*
    * name;
    */
    var LoginModule = /** @class */ (function (_super) {
        __extends(LoginModule, _super);
        function LoginModule() {
            return _super.call(this) || this;
        }
        LoginModule.prototype.getModuleName = function () {
            return "LoginModule";
        };
        LoginModule.prototype.listProcessors = function () {
            return [new game.LoginProcessor(), new game.LoginLoadProcessor()];
        };
        /**
         * 初始化数据
         */
        LoginModule.prototype.onRegister = function () {
            var gameVolume = Laya.LocalStorage.getItem("GameVolume");
            if (!gameVolume || gameVolume.length == 0) {
                gameVolume = "45";
                Laya.LocalStorage.setItem("GameVolume", gameVolume);
            }
            var volume = Number(gameVolume) / 100;
            SoundManager.setMusicVolume(volume);
            var gameSound = Laya.LocalStorage.getItem("GameSound");
            if (!gameSound || gameSound.length == 0) {
                gameSound = "80";
                Laya.LocalStorage.setItem("GameSound", gameSound);
            }
            var sound = Number(gameSound) / 100;
            SoundManager.setSoundVolume(sound);
            //
            Laya.timer.frameOnce(1, this, function () {
                layapan.LayaScene2dInit.initData(); //初始化3dengine
                Laya.stage.setScreenSize(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio);
            });
            Laya.timer.frameOnce(2, this, function () {
                dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.LOADBASE_EVENT));
            });
        };
        return LoginModule;
    }(tl3d.Module));
    game.LoginModule = LoginModule;
    var LoginEvent = /** @class */ (function (_super) {
        __extends(LoginEvent, _super);
        function LoginEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        LoginEvent.LOGININIT_EVENT = "LOGININIT_EVENT";
        LoginEvent.SEND_SSO_EVENT = "SEND_SSO_EVENT";
        LoginEvent.SEND_LOGIN_EVENT = "SEND_LOGIN_EVENT";
        LoginEvent.SEND_RELOGIN_EVENT = "SEND_RELOGIN_EVENT";
        LoginEvent.SEND_SERVERLIST_EVENT = "SEND_SERVERLIST_EVENT";
        LoginEvent.SHOW_CHATNOTICE_PANEL = "SHOW_CHATNOTICE_PANEL";
        return LoginEvent;
    }(tl3d.BaseEvent));
    game.LoginEvent = LoginEvent;
    var LoginLoadEvent = /** @class */ (function (_super) {
        __extends(LoginLoadEvent, _super);
        function LoginLoadEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //加载ui基础资源
        LoginLoadEvent.LOADBASE_EVENT = "LOADBASE_EVENT";
        //加载HUD必须资源
        LoginLoadEvent.LOADHUD_EVENT = "LOADHUD_EVENT";
        //加载剧情必须资源
        LoginLoadEvent.LOADJUQING_EVENT = "LOADJUQING_EVENT";
        //显示HUD
        LoginLoadEvent.ENTERHUD_EVENT = "ENTERHUD_EVENT";
        return LoginLoadEvent;
    }(tl3d.BaseEvent));
    game.LoginLoadEvent = LoginLoadEvent;
})(game || (game = {}));
