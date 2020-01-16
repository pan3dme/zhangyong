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
    * FightsModule
    */
    var FightsModule = /** @class */ (function (_super) {
        __extends(FightsModule, _super);
        function FightsModule() {
            return _super.call(this) || this;
        }
        FightsModule.prototype.getModuleName = function () {
            return "FightsModule";
        };
        FightsModule.prototype.listProcessors = function () {
            return [new game.FightsProcessor()];
        };
        /**
         * 模块入口
         */
        FightsModule.prototype.onRegister = function () {
        };
        return FightsModule;
    }(tl3d.Module));
    game.FightsModule = FightsModule;
    var FightsEvent = /** @class */ (function (_super) {
        __extends(FightsEvent, _super);
        function FightsEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightsEvent.FIGHT_END = "FIGHT_END";
        FightsEvent.CHANGE_BOSSBLOOD = "CHANGE_BOSSBLOOD";
        FightsEvent.CHANGE_BOSSANGER = "CHANGE_BOSSANGER";
        FightsEvent.CHANGE_ACTIONBAR = "CHANGE_ACTIONBAR";
        FightsEvent.CHANGE_BOSSBUFF = "CHANGE_BOSSBUFF";
        FightsEvent.CHANGE_BOSSLEV = "CHANGE_BOSSLEV";
        FightsEvent.INIT_ARTIFACE = "INIT_ARTIFACE";
        FightsEvent.REFRESH_TITLE_EVENT = "REFRESH_TITLE_EVENT";
        FightsEvent.HIDE_TITLE_EVENT = "HIDE_TITLE_EVENT";
        FightsEvent.SET_ANGER = "SET_ANGER";
        FightsEvent.SET_ROUND_TEXT = "SET_ROUND_TEXT";
        FightsEvent.CLEAR_ARTIFACE = "CLEAR_ARTIFACE";
        FightsEvent.INIT_SPEED = "INIT_SPEED";
        FightsEvent.ENTER_FIGHT_EVENT = "ENTER_FIGHT_EVENT";
        FightsEvent.EXIT_FIGHT_EVENT = "EXIT_FIGHT_EVENT";
        FightsEvent.SHOW_RESULT_EVENT = "SHOW_RESULT_EVENT";
        FightsEvent.GLORY_RESULT_EVENT = "GLORY_RESULT_EVENT";
        FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT = "SHOW_GUILD_COPY_RESULT_EVENT";
        /** 激战神域 */
        FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT = "SHOW_GODDOMAIN_RESULT_EVENT";
        /** 技能选中 */
        FightsEvent.SKILL_SELECTED = "SKILL_SELECTED";
        /** 点击角色成功 */
        FightsEvent.CLICK_ROLE_SUCCESS = "CLICK_ROLE_SUCCESS";
        /** 自动战斗成功 */
        FightsEvent.CLICK_AUTO_SUCCESS = "CLICK_AUTO_SUCCESS";
        /** 切换速度成功 */
        FightsEvent.SWITCH_SPEED_SUCCESS = "SWITCH_SPEED_SUCCESS";
        /** 表现层complete */
        FightsEvent.SCENE_COMPLETE_EVENT = "SCENE_COMPLETE_EVENT";
        /** 技能面板显示 */
        FightsEvent.SKILL_PANEL_VISIBLE = "SKILL_PANEL_VISIBLE";
        FightsEvent.SHOW_START_BG = "SHOW_START_BG";
        FightsEvent.PLAY_SKILL_EFF = "PLAY_SKILL_EFF";
        FightsEvent.REPLAY_GAME_EVENT = "REPLAY_GAME_EVENT";
        return FightsEvent;
    }(tl3d.BaseEvent));
    game.FightsEvent = FightsEvent;
})(game || (game = {}));
