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
    var TowerModule = /** @class */ (function (_super) {
        __extends(TowerModule, _super);
        function TowerModule() {
            return _super.call(this) || this;
        }
        TowerModule.prototype.getModuleName = function () {
            return "TowerModule";
        };
        TowerModule.prototype.listProcessors = function () {
            return [new game.TowerProcessor()];
        };
        /**
         * 初始化数据
         */
        TowerModule.prototype.onRegister = function () {
            game.TowerModel.getInstance().initModel();
        };
        return TowerModule;
    }(tl3d.Module));
    game.TowerModule = TowerModule;
    var TowerEvent = /** @class */ (function (_super) {
        __extends(TowerEvent, _super);
        function TowerEvent(type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开试炼塔界面 */
        TowerEvent.SHOW_SHILIANTA_PANEL = "SHOW_SHILIANTA_PANEL";
        /** 关卡进度更新 */
        TowerEvent.PROGRESS_CHANGE = "PROGRESS_CHANGE";
        /** 领取boss奖励成功 */
        TowerEvent.GET_BOSS_AWARD_SUC = "GET_BOSS_AWARD_SUC";
        /** 点击关卡 */
        TowerEvent.CLICK_GUANQIA = "CLICK_GUANQIA";
        /** 关卡挑战 */
        TowerEvent.CHALLENGE_GUANQIA = "CHALLENGE_GUANQIA";
        /** 试炼塔奖励 */
        TowerEvent.SHOW_TOWER_JIANGLI = "SHOW_TOWER_JIANGLI";
        /** 试炼塔排行榜 */
        TowerEvent.SHOW_TOWER_RANK = "SHOW_TOWER_RANK";
        /** 领取boss奖励 */
        TowerEvent.LINGQU_BOSS_JIANGLI = "LINGQU_BOSS_JIANGLI";
        return TowerEvent;
    }(tl3d.BaseEvent));
    game.TowerEvent = TowerEvent;
    var ShiliantaType;
    (function (ShiliantaType) {
        ShiliantaType[ShiliantaType["all"] = 0] = "all";
        ShiliantaType[ShiliantaType["jiandan"] = 1] = "jiandan";
        ShiliantaType[ShiliantaType["kunnan"] = 2] = "kunnan"; // 困难
    })(ShiliantaType = game.ShiliantaType || (game.ShiliantaType = {}));
})(game || (game = {}));
