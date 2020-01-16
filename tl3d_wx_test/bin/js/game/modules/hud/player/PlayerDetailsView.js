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
    var PlayerDetailsView = /** @class */ (function (_super) {
        __extends(PlayerDetailsView, _super);
        function PlayerDetailsView() {
            var _this = _super.call(this) || this;
            _this._curIndex = -1;
            _this.KeyLog = [1, 2, 3, 5, 6, 123, 998, 999];
            return _this;
        }
        PlayerDetailsView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.PlayerDetailsView, closeOnSide: this.isModelClose, title: "玩家信息" };
            this._curIndex = -1;
            this.tabBar.selectedIndex = -1;
            this.tabBar.selectHandler = new Handler(this, this.onSelect);
            this.btn_gm.on(Laya.Event.CLICK, this, this.onGm);
            this.btn_vconsole.on(Laya.Event.CLICK, this, this.onConsole);
            this.btn_stats.on(Laya.Event.CLICK, this, this.onStats);
            this.btn_debug.on(Laya.Event.CLICK, this, this.onDebugPanel);
            this.btn_loglevel.on(Laya.Event.CLICK, this, this.onLogLve);
            if (!Laya.Browser.onMiniGame) {
                this.btn_vconsole.visible = true;
            }
        };
        PlayerDetailsView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            var view = this.getView(this._curIndex);
            if (view) {
                view.close();
                view.visible = false;
            }
            this._curIndex = -1;
            this.tabBar.selectedIndex = -1;
        };
        PlayerDetailsView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        PlayerDetailsView.prototype.initView = function () {
            this.setLogBtn();
            var isShowbtn = false;
            if (!ExtConfig.RELEASE || BingoSDK.platparam.pid == "1") {
                this.btn_gm.visible = true;
                isShowbtn = true;
            }
            if (ExtConfig.RELEASE) { //发布环境调试和gm要单独开启
                if (!PlayerDetailsView.debugLock) {
                    this.btn_stats.visible = true;
                    this.btn_debug.visible = true;
                    this.btn_loglevel.visible = true;
                    isShowbtn = true;
                }
            }
            else {
                this.btn_gm.visible = true;
                this.btn_stats.visible = true;
                this.btn_debug.visible = true;
                this.btn_loglevel.visible = true;
                isShowbtn = true;
            }
            this.height = isShowbtn ? 640 : 580;
            this.tabBar.selectedIndex = 0;
        };
        PlayerDetailsView.prototype.onSelect = function (index) {
            if (index == -1)
                return;
            var oldView = this.getView(this._curIndex);
            if (oldView) {
                oldView.close();
                oldView.visible = false;
            }
            this._curIndex = index;
            var newView = this.getView(this._curIndex);
            if (newView) {
                newView.show();
                newView.visible = true;
            }
        };
        // 获取界面
        PlayerDetailsView.prototype.getView = function (index) {
            var view;
            switch (index) {
                case 0:
                    if (!this._tabPlayerView) {
                        this._tabPlayerView = new game.TabPlayerInfoView();
                        this._tabPlayerView.centerX = 0;
                        this.boxContent.addChild(this._tabPlayerView);
                    }
                    view = this._tabPlayerView;
                    break;
                case 1:
                    if (!this._tabSysView) {
                        this._tabSysView = new game.TabSysSettingView();
                        this._tabSysView.centerX = 0;
                        this.boxContent.addChild(this._tabSysView);
                    }
                    view = this._tabSysView;
                    break;
                case 2:
                    if (!this._tabKefuView) {
                        this._tabKefuView = new game.TabCustomerServiceView();
                        this._tabKefuView.centerX = 0;
                        this.boxContent.addChild(this._tabKefuView);
                    }
                    view = this._tabKefuView;
                    break;
            }
            return view;
        };
        PlayerDetailsView.prototype.onGm = function (e) {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_GM_PANEL));
        };
        /**
         * 日志等级
         */
        PlayerDetailsView.prototype.onLogLve = function (e) {
            var idx = this.KeyLog.indexOf(ExtConfig.LOG_LEVEL);
            ExtConfig.LOG_LEVEL = this.KeyLog[++idx % this.KeyLog.length];
            this.setLogBtn();
        };
        /**
         * 日志等级
         */
        PlayerDetailsView.prototype.setLogBtn = function () {
            this.btn_loglevel.label = "loglev(" + ExtConfig.LOG_LEVEL + ")";
        };
        /**
         * laya调试信息
         */
        PlayerDetailsView.prototype.onDebugPanel = function () {
            laya.debug.DebugTool.init();
        };
        /**
         * 插件调试信息
         */
        PlayerDetailsView.prototype.onConsole = function () {
            if (!this._cstats) {
                if (!this._console) {
                    this._console = new VConsole();
                }
                this._console.showSwitch();
                logdebug('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio);
                logdebug('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio);
                logdebug('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.pixelDepth); //screen.deviceXDPI, screen.deviceYDPI,
                logdebug('real scene_height', Browser.clientHeight * Browser.pixelRatio);
            }
            else {
                this._console.hideSwitch();
            }
            this._cstats = !this._cstats;
        };
        /**
         * 帧率信息
         */
        PlayerDetailsView.prototype.onStats = function () {
            if (!this._stats) {
                Laya.Stat.show(0, 0);
            }
            else {
                Laya.Stat.hide();
            }
            this._stats = !this._stats;
        };
        PlayerDetailsView.gmLock = true;
        PlayerDetailsView.debugLock = true;
        return PlayerDetailsView;
    }(ui.hud.player.PlayerDetailsUI));
    game.PlayerDetailsView = PlayerDetailsView;
})(game || (game = {}));
