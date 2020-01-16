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
    var ChongzhiModule = /** @class */ (function (_super) {
        __extends(ChongzhiModule, _super);
        function ChongzhiModule() {
            return _super.call(this) || this;
        }
        ChongzhiModule.prototype.getModuleName = function () {
            return "ChongzhiModule";
        };
        ChongzhiModule.prototype.listProcessors = function () {
            return [new game.ChongzhiProcessor()];
        };
        /**
         * 模块初始化
         */
        ChongzhiModule.prototype.onRegister = function () {
            game.ChongzhiModel.getInstance().initModel();
        };
        return ChongzhiModule;
    }(tl3d.Module));
    game.ChongzhiModule = ChongzhiModule;
    var TopUpEvent = /** @class */ (function (_super) {
        __extends(TopUpEvent, _super);
        function TopUpEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**打开充值界面 */
        TopUpEvent.SHOW_CHONGZHI_PANEL = "SHOW_CHONGZHI_PANEL";
        /**打开充值成功弹窗 */
        TopUpEvent.SHOW_CHONGZHISUCC_PANEL = "SHOW_CHONGZHISUCC_PANEL";
        /**打开首充界面 */
        TopUpEvent.SHOW_SHOUCHONG_PANEL = "SHOW_SHOUCHONG_PANEL";
        /**领取首充奖励 */
        TopUpEvent.GET_FIRSTRECHARGE_REWARD = "GET_FIRSTRECHARGE_REWARD";
        /**首充红点事件 */
        TopUpEvent.SHOUCHONG_RED_EVEN = "SHOUCHONG_RED_EVEN";
        /**特权礼包红点*/
        TopUpEvent.UPDATE_TEQUANRED_EVEN = "UPDATE_TEQUANRED_EVEN";
        /** 限购礼包 */
        TopUpEvent.XIANGOU_LIBAO_CHANGE = "XIANGOU_LIBAO_CHANGE";
        /** 充值成功 */
        TopUpEvent.CHONGZHI_SUCCESS = "CHONGZHI_SUCCESS";
        return TopUpEvent;
    }(tl3d.BaseEvent));
    game.TopUpEvent = TopUpEvent;
})(game || (game = {}));
