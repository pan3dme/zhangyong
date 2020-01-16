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
    var UpRoadModule = /** @class */ (function (_super) {
        __extends(UpRoadModule, _super);
        function UpRoadModule() {
            return _super.call(this) || this;
        }
        UpRoadModule.prototype.getModuleName = function () {
            return "UpRoadModule";
        };
        UpRoadModule.prototype.listProcessors = function () {
            return [new game.UpRoadProcessor()];
        };
        /**
         * 初始化数据
         */
        UpRoadModule.prototype.onRegister = function () {
        };
        return UpRoadModule;
    }(tl3d.Module));
    game.UpRoadModule = UpRoadModule;
    var UpRoadEvent = /** @class */ (function (_super) {
        __extends(UpRoadEvent, _super);
        function UpRoadEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**等级变化 */
        UpRoadEvent.UR_LEVEL_CHANGE = "UR_LEVEL_CHANGE";
        /**完成次数变化 */
        UpRoadEvent.UR_COUNT_CHANGE = "UR_COUNT_CHANGE";
        /**领奖次数变化 */
        UpRoadEvent.UR_REWARD_CHANGE = "UR_REWARD_CHANGE";
        /** 领取奖励成功 */
        UpRoadEvent.REWARD_SUCCESS = "UPROAD_REWARD_SUCCESS";
        return UpRoadEvent;
    }(tl3d.BaseEvent));
    game.UpRoadEvent = UpRoadEvent;
})(game || (game = {}));
