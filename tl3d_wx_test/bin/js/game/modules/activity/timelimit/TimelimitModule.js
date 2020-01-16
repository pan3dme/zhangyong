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
    * TimelimitactivityModule
    */
    var TimelimitModule = /** @class */ (function (_super) {
        __extends(TimelimitModule, _super);
        function TimelimitModule() {
            return _super.call(this) || this;
        }
        TimelimitModule.prototype.getModuleName = function () {
            return "TimelimitModule";
        };
        TimelimitModule.prototype.listProcessors = function () {
            return [new game.TimelimitProcessor()];
        };
        /**
         * 模块入口
         */
        TimelimitModule.prototype.onRegister = function () {
            /**获得限时活动数据 需要在红点创建之后 */
            game.TimelimitModel.getInstance().getActicity();
        };
        return TimelimitModule;
    }(tl3d.Module));
    game.TimelimitModule = TimelimitModule;
    var TimelimitEvent = /** @class */ (function (_super) {
        __extends(TimelimitEvent, _super);
        function TimelimitEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY = "SHOW_TIMELIMIT_ACTIVITY";
        TimelimitEvent.GET_TAB_EVENT = "GET_TAB_EVENT";
        TimelimitEvent.SELECTED_TAB_DATA_EVENT = "SELECTED_TAB_DATA_EVENT";
        TimelimitEvent.RED_EVENT = "RED_EVENT";
        TimelimitEvent.GROUP_RED_EVENT = "GROUP_RED_EVENT";
        TimelimitEvent.FUND_EVENT = "FUND_EVENT";
        TimelimitEvent.FUND_RED_EVENT = "FUND_RED_EVENT";
        return TimelimitEvent;
    }(tl3d.BaseEvent));
    game.TimelimitEvent = TimelimitEvent;
})(game || (game = {}));
