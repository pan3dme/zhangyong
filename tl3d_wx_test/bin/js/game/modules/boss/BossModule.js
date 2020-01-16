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
    var BossModule = /** @class */ (function (_super) {
        __extends(BossModule, _super);
        function BossModule() {
            return _super.call(this) || this;
        }
        BossModule.prototype.getModuleName = function () {
            return "BossModule";
        };
        BossModule.prototype.listProcessors = function () {
            return [new game.BossProcessor()];
        };
        /**
         * 初始化数据
         */
        BossModule.prototype.onRegister = function () {
            game.BossModel.getInstance().initModel();
        };
        return BossModule;
    }(tl3d.Module));
    game.BossModule = BossModule;
    var BossEvent = /** @class */ (function (_super) {
        __extends(BossEvent, _super);
        function BossEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开界面 */
        BossEvent.SHOW_BOSS_VIEW = "SHOW_BOSS_PANEL";
        /** 打开排行界面 */
        BossEvent.SHOW_RANK_VIEW = "SHOW_RANK_VIEW";
        /** 打开奖励界面 */
        BossEvent.SHOW_REWARD_VIEW = "SHOW_REWARD_VIEW";
        /** 打开规则界面 */
        BossEvent.SHOW_RULE_VIEW = "SHOW_RULE_VIEW";
        /** 打开购买界面 */
        BossEvent.SHOW_BUY_VIEW = "WB_SHOW_BUY_VIEW";
        /** 更新了boss最新消息 */
        BossEvent.UPDATE_BOSS_INFO = "UPDATE_WORLD_BOSS_INFO";
        /** 挑战boss */
        BossEvent.CHALLENGE_BOSS = "CHALLENGE_BOSS";
        return BossEvent;
    }(tl3d.BaseEvent));
    game.BossEvent = BossEvent;
})(game || (game = {}));
