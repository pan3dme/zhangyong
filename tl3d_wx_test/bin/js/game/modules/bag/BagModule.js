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
    var BagModule = /** @class */ (function (_super) {
        __extends(BagModule, _super);
        function BagModule() {
            return _super.call(this) || this;
        }
        BagModule.prototype.getModuleName = function () {
            return "BagModule";
        };
        BagModule.prototype.listProcessors = function () {
            return [new game.BagProcessor()];
        };
        /**
         * 模块初始化
         */
        BagModule.prototype.onRegister = function () {
            game.BagModel.getInstance();
        };
        return BagModule;
    }(tl3d.Module));
    game.BagModule = BagModule;
    var BagEvent = /** @class */ (function (_super) {
        __extends(BagEvent, _super);
        function BagEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示背包
        BagEvent.SHOW_BAG_PANEL = "SHOW_BAG_PANEL";
        //使用多个道具
        BagEvent.USE_MANY_ITEM = "USE_MANY_ITEM";
        //打开批量出售面板
        BagEvent.OPEN_SELL_VIEW = "OPEN_SELL_VIEW";
        BagEvent.FENJIE_EQUIPS = "FENJIE_EQUIPS";
        //背包变化
        BagEvent.CHANGE_ITEM = "CHANGE_ITEM";
        //装备变化
        BagEvent.CHANGE_EQUIP_ITEM = "CHANGE_EQUIP_ITEM";
        //勾选
        BagEvent.SELECT_RECYCLE_ITEM = "SELECT_RECYCLE_ITEM";
        //停止滚动
        BagEvent.STOP_SCROLL = "STOP_SCROLL";
        /** 使用成功 */
        BagEvent.USE_ITEM_SUCCESS = "USE_ITEM_SUCCESS";
        return BagEvent;
    }(tl3d.BaseEvent));
    game.BagEvent = BagEvent;
})(game || (game = {}));
