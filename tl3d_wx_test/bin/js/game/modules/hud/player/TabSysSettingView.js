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
    var TabSysSettingView = /** @class */ (function (_super) {
        __extends(TabSysSettingView, _super);
        function TabSysSettingView() {
            return _super.call(this) || this;
        }
        TabSysSettingView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.slider_Music.changeHandler = new Handler(this, this.setMusicVolume);
            this.slider_Sound.changeHandler = new Handler(this, this.setSoundVolume);
            this.img_yinyueon.on(Laya.Event.CLICK, this, this.onYinyue);
            this.img_yinyueoff.on(Laya.Event.CLICK, this, this.onYinyue);
            this.img_yinxiaoon.on(Laya.Event.CLICK, this, this.onYinxiao);
            this.img_yinxiaooff.on(Laya.Event.CLICK, this, this.onYinxiao);
            this.btnExitGame.on(Laya.Event.CLICK, this, this.onExitGame);
            this.btnSwitchAcc.on(Laya.Event.CLICK, this, this.onSwitchAcc);
        };
        TabSysSettingView.prototype.close = function () {
            // super.close();
        };
        TabSysSettingView.prototype.show = function () {
            // super.show();
            this.initView();
        };
        TabSysSettingView.prototype.initView = function () {
            var gameVolume = Laya.LocalStorage.getItem("GameVolume");
            if (!gameVolume || gameVolume.length == 0) {
                gameVolume = "45";
                Laya.LocalStorage.setItem("GameVolume", gameVolume);
            }
            this.slider_Music.value = Number(gameVolume);
            var gameSound = Laya.LocalStorage.getItem("GameSound");
            if (!gameSound || gameSound.length == 0) {
                gameSound = "80";
                Laya.LocalStorage.setItem("GameSound", gameSound);
            }
            this.slider_Sound.value = Number(gameSound);
            this.lab_resVersion.text = "resVersion\uFF1A" + BingoSDK.resVersion;
            this.lab_clientVersion.text = "clientVersion\uFF1A" + BingoSDK.clientVersion;
            Laya.Slider.label.fontSize = 22;
        };
        TabSysSettingView.prototype.onYinxiao = function () {
            var flag = 0;
            if (this.img_yinxiaoon.visible)
                flag = 1;
            else
                flag = 0;
            switch (flag) {
                case 0:
                    this.img_yinxiaooff.visible = false;
                    this.img_yinxiaoon.visible = true;
                    AudioMgr.SOUNDSTOP = false;
                    AudioMgr.playSound();
                    break;
                case 1:
                    this.img_yinxiaooff.visible = true;
                    this.img_yinxiaoon.visible = false;
                    AudioMgr.pauseSound();
                    break;
            }
            this.slider_Sound.value = flag == 0 ? 1 : 0;
        };
        TabSysSettingView.prototype.onYinyue = function () {
            var flag = 0;
            if (this.img_yinyueon.visible)
                flag = 1;
            else
                flag = 0;
            switch (flag) {
                case 0:
                    this.img_yinyueoff.visible = false;
                    this.img_yinyueon.visible = true;
                    AudioMgr.MUSICPAUSE = false;
                    AudioMgr.resumeMusic();
                    break;
                case 1:
                    this.img_yinyueoff.visible = true;
                    this.img_yinyueon.visible = false;
                    AudioMgr.pauseMusic();
                    break;
            }
            this.slider_Music.value = flag == 0 ? 1 : 0;
        };
        TabSysSettingView.prototype.setMusicVolume = function (value) {
            dispatchEvt(new game.HudEvent(game.HudEvent.SET_VOLUME), value);
            Laya.LocalStorage.setItem("GameVolume", String(value));
            if (this.img_yinyueoff.visible && value > 0) {
                this.img_yinyueoff.visible = false;
                this.img_yinyueon.visible = true;
            }
            if (this.img_yinyueon.visible && value == 0) {
                this.img_yinyueoff.visible = true;
                this.img_yinyueon.visible = false;
            }
        };
        TabSysSettingView.prototype.setSoundVolume = function (value) {
            dispatchEvt(new game.HudEvent(game.HudEvent.SET_SOUND), value);
            Laya.LocalStorage.setItem("GameSound", String(value));
            if (this.img_yinxiaooff.visible && value > 0) {
                this.img_yinxiaooff.visible = false;
                this.img_yinxiaoon.visible = true;
            }
            if (this.img_yinxiaoon.visible && value == 0) {
                this.img_yinxiaooff.visible = true;
                this.img_yinxiaoon.visible = false;
            }
        };
        /** 退出游戏 */
        TabSysSettingView.prototype.onExitGame = function () {
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10528), confirmCb: function () {
                    BingoSDK.exitGame();
                }
            });
        };
        /** 切换账号 */
        TabSysSettingView.prototype.onSwitchAcc = function () {
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10529), confirmCb: function () {
                    BingoSDK.loginout();
                }
            });
        };
        return TabSysSettingView;
    }(ui.hud.player.TabSysSettingUI));
    game.TabSysSettingView = TabSysSettingView;
})(game || (game = {}));
