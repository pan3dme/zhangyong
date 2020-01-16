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
    var DailyCopyModule = /** @class */ (function (_super) {
        __extends(DailyCopyModule, _super);
        function DailyCopyModule() {
            return _super.call(this) || this;
        }
        DailyCopyModule.prototype.getModuleName = function () {
            return "DailyCopyModule";
        };
        DailyCopyModule.prototype.listProcessors = function () {
            return [new game.DailyCopyProcessor()];
        };
        /**
         * 初始化数据
         */
        DailyCopyModule.prototype.onRegister = function () {
            game.DailyCopyModel.getInstance().initModel();
        };
        return DailyCopyModule;
    }(tl3d.Module));
    game.DailyCopyModule = DailyCopyModule;
    var DailyEvent = /** @class */ (function (_super) {
        __extends(DailyEvent, _super);
        function DailyEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        DailyEvent.SHOW_DAILY_COPY_VIEW = "SHOW_DAILY_COPY_VIEW";
        /** 展示购买界面 */
        DailyEvent.SHOW_BUY_VIEW = "SHOW_BUY_VIEW";
        /** 挑战boss */
        DailyEvent.CHALLENGE_BOSS = "CHALLENGE_DAILY_BOSS";
        /** 再来一次 */
        DailyEvent.CHALLENGE_BOSS_AGAIN = "CHALLENGE_BOSS_AGAIN";
        /** 购买每日副本挑战次数 */
        DailyEvent.BUY_DAILY_COPY_COUNT = "BUY_DAILY_COPY_COUNT";
        /** 每日副本通关id变化 */
        DailyEvent.DAILY_COPY_ID_CHANGE = "DAILY_COPY_ID_CHANGE";
        return DailyEvent;
    }(tl3d.BaseEvent));
    game.DailyEvent = DailyEvent;
})(game || (game = {}));
