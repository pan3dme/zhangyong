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
    var LoginView = /** @class */ (function (_super) {
        __extends(LoginView, _super);
        function LoginView() {
            var _this = _super.call(this) || this;
            _this.btn_login.on(Laya.Event.CLICK, _this, _this.onLoginEvent);
            _this.btn_touristslogin.on(Laya.Event.CLICK, _this, _this.onTouristsLoginEvent);
            _this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.login);
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            return _this;
        }
        LoginView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            BaseSceneMgr.getInstance().showEffect(this, 1, 1000010, 188, -268, 5.8, 0);
        };
        LoginView.prototype.onLoginEvent = function () {
            AudioMgr.playSound();
            var account = this.ed_account.text;
            if (!account || account.length == 0) {
                showToast(LanMgr.getLan("", 10442));
                return;
            }
            this.sendSSO(account);
        };
        /**
         * 游客登陆
         */
        LoginView.prototype.onTouristsLoginEvent = function () {
            AudioMgr.playSound();
            this.sendSSO(randomWord(false, 8, 8));
        };
        /**
         * 发送登陆
         * @param data
         */
        LoginView.prototype.sendSSO = function (account) {
            AudioMgr.playSound();
            var wplatform = window.platform;
            wplatform.gameId = '1';
            wplatform.uid = account;
            wplatform.userName = account;
            wplatform.time = new Date().getTime() / 1000;
            wplatform.head = '';
            wplatform.sex = 0;
            wplatform.fromUid = '';
            //
            wplatform.fcm = 0;
            wplatform.pid = "1";
            wplatform.shiming = 1;
            wplatform.vconsle = 0;
            var evt = new game.LoginEvent(game.LoginEvent.SEND_SSO_EVENT);
            dispatchEvt(evt);
        };
        LoginView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            BaseSceneMgr.getInstance().removeEffect(1000010);
            this.btn_login.off(Laya.Event.CLICK, this, this.onLoginEvent);
            this.btn_touristslogin.off(Laya.Event.CLICK, this, this.onTouristsLoginEvent);
        };
        return LoginView;
    }(ui.login.LoginUI));
    game.LoginView = LoginView;
})(game || (game = {}));
