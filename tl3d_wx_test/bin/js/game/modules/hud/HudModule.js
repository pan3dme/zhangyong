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
/*
* name;
*/
var game;
(function (game) {
    var HudModule = /** @class */ (function (_super) {
        __extends(HudModule, _super);
        function HudModule() {
            return _super.call(this) || this;
        }
        HudModule.prototype.getModuleName = function () {
            return "HudModule";
        };
        HudModule.prototype.listProcessors = function () {
            return [new game.HudProcessor()];
        };
        HudModule.prototype.onRegister = function () {
            game.HudModel.getInstance().initModel();
            game.PlayerDetailsView.gmLock = ExtConfig.net_host == "http://192.168.1.108" ? false : true;
            game.PlayerDetailsView.debugLock = ExtConfig.net_host == "http://192.168.1.108" ? false : true;
        };
        return HudModule;
    }(tl3d.Module));
    game.HudModule = HudModule;
    var HudEvent = /** @class */ (function (_super) {
        __extends(HudEvent, _super);
        function HudEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        HudEvent.SHOW_CHATNOTICE_PANEL = 'SHOW_CHATNOTICE_PANEL';
        HudEvent.UPDATE_CHATNOTICE_TEXT = 'UPDATE_CHATNOTICE_TEXT';
        /**领取系统开启奖励 */
        HudEvent.GET_SYSOPEN_REWARD = "GET_SYSOPEN_REWARD";
        /** 打开模块 */
        HudEvent.SHOW_MODULE_VIEW = 'SHOW_MODULE_VIEW';
        /** 打开排行榜 */
        HudEvent.SHOW_RANK_MODULE = "SHOW_RANK_MODULE";
        /** 打开gm调试面板 */
        HudEvent.SHOW_GM_PANEL = "SHOW_GM_PANEL";
        /** 打开玩家信息界面 */
        HudEvent.SHOW_PLAYER_INFO_VIEW = "SHOW_PLAYER_INFO_VIEW";
        HudEvent.QIECUO_BACK = "QIECUO_BACK";
        /** 打开玩家阵容信息界面 */
        HudEvent.SHOW_PLAYER_LINEUP_VIEW = "SHOW_PLAYER_LINEUP_VIEW";
        /**刷新金币和经验面板 */
        HudEvent.UPDATE_EXP_AND_MONEY = "UPDATE_EXP_AND_MONEY";
        /**设置名字 */
        HudEvent.SET_NAME = "SET_NAME";
        /**设置头像 */
        HudEvent.SET_HEAD_ICON = "SET_HEAD_ICON";
        /** 设置头像 */
        HudEvent.SET_HEAD_FRAME = "SET_HEAD_BOX_ICON";
        /** 设置英雄形象 */
        HudEvent.SET_SHOW_GOD_MODEL = "SET_SHOW_GOD_MODEL";
        /**金币兑换 */
        HudEvent.EXCHANGE_GOLD_CHANGE = "EXCHANGE_GOLD_CHANGE";
        /**刷新面板按钮事件 */
        HudEvent.UPDATE_MAINVIEW_BUTTON = "UPDATE_MAINVIEW_BUTTON";
        HudEvent.UPDATE_POWER = "UPDATE_POWER";
        HudEvent.UPDATE_ONLINEREWARD = "UPDATE_ONLINEREWARD";
        /** 返回上一个界面 */
        HudEvent.RETURN_LASTVIEW = "RETURN_LASTVIEW";
        /** 打开入口界面 */
        HudEvent.SHOW_ENTRANCE_VIEW = "SHOW_ENTRANCE_VIEW";
        /** 更新跨天数据 */
        HudEvent.UPDATE_CROSS_DAY_INFO = "UPDATE_CROSS_DAY_INFO";
        /** 设置音量 */
        HudEvent.SET_VOLUME = "SET_VOLUME";
        /** 设置音效 */
        HudEvent.SET_SOUND = "SET_SOUND";
        /** 2d分辨率适配重置 */
        HudEvent.SCREEN_SIZE_CHNAGE = "SCREEN_SIZE_CHNAGE";
        /** 更新全屏界面顶部按钮信息 */
        HudEvent.UPDATE_SYS_TOP_BTN_INFO = "UPDATE_SYS_TOP_BTN";
        return HudEvent;
    }(tl3d.BaseEvent));
    game.HudEvent = HudEvent;
})(game || (game = {}));
