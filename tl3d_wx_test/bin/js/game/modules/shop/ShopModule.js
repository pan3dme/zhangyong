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
    var ShopModule = /** @class */ (function (_super) {
        __extends(ShopModule, _super);
        function ShopModule() {
            return _super.call(this) || this;
        }
        ShopModule.prototype.getModuleName = function () {
            return "ShopModule";
        };
        ShopModule.prototype.listProcessors = function () {
            return [new game.ShopProcessor()];
        };
        /**
         * 初始化数据
         */
        ShopModule.prototype.onRegister = function () {
            game.ShopModel.getInstance().initModel();
        };
        return ShopModule;
    }(tl3d.Module));
    game.ShopModule = ShopModule;
    var ShopEvent = /** @class */ (function (_super) {
        __extends(ShopEvent, _super);
        function ShopEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开商店界面 */
        ShopEvent.SHOW_SHOP_VIEW = "SHOW_SHOP_VIEW";
        /** 刷新集市界面 */
        ShopEvent.REFRESH_JISHI_VIEW = "REFRESH_JISHI_VIEW";
        /** 刷新集市红点 */
        ShopEvent.REFRESH_JISHI_RP = "REFRESH_JISHI_RP";
        /** 更新商店跨天数据 */
        ShopEvent.REFRESH_SHOP_CROSSDAY = "REFRESH_SHOP_CROSSDAY";
        /**购买并刷新荣誉商店界面 */
        ShopEvent.CHANGE_RONGYUSHANGDIAN_PANEL = "CHANGE_RONGYUSHANGDIAN_PANEL";
        /**购买界面 */
        ShopEvent.SHOW_GOUMAI_PANEL = "SHOW_GOUMAI_PANEL";
        /**集市免费次数刷新时间 */
        ShopEvent.MARKET_REFRESH_REPLY_TIME_CHNAGE = "MARKET_REFRESH_REPLY_TIME_CHNAGE";
        /**荣誉商店界面 */
        ShopEvent.SHOW_RONGYUSHANGDIAN_PANEL = "SHOW_RONGYUSHANGDIAN_PANEL";
        return ShopEvent;
    }(tl3d.BaseEvent));
    game.ShopEvent = ShopEvent;
})(game || (game = {}));
