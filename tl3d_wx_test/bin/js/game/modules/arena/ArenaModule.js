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
    var ArenaModule = /** @class */ (function (_super) {
        __extends(ArenaModule, _super);
        function ArenaModule() {
            return _super.call(this) || this;
        }
        ArenaModule.prototype.getModuleName = function () {
            return "ArenaModule";
        };
        ArenaModule.prototype.onRegister = function () {
            game.MatchModel.getInstance().initModel();
        };
        ArenaModule.prototype.listProcessors = function () {
            return [new game.ArenaProcessor(), new game.MatchProcessor()];
        };
        return ArenaModule;
    }(tl3d.Module));
    game.ArenaModule = ArenaModule;
    var ArenaEvent = /** @class */ (function (_super) {
        __extends(ArenaEvent, _super);
        function ArenaEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**打开竞技场界面 */
        ArenaEvent.SHOW_ARENA_PANEL = "SHOW_ARENA_PANEL";
        /**打开匹配赛界面 */
        ArenaEvent.SHOW_MATCH_PANEL = "SHOW_MATCH_PANEL";
        /**竞技场翻牌 */
        ArenaEvent.TURN_OVER_CAED = "TURN_OVER_CAED";
        /**观看完竞技场战报 */
        ArenaEvent.LOOK_REPORT_END = "LOOK_REPORT_END";
        /**清除冷却时间 */
        ArenaEvent.CLEAN_ARENA_TIME = "CLEAN_ARENA_TIME";
        /**获取竞技场战报 */
        ArenaEvent.GET_ARENA_BAGTTLE = "GET_ARENA_BAGTTLE";
        /**刷新挑战玩家列表 */
        ArenaEvent.UPDATE_ARENA_RANK = "UPDATE_ARENA_RANK";
        /**查看防守记录 */
        ArenaEvent.SHOW_RECORD_PANLE = "SHOW_RECORD_PANLE";
        /**竞技场购买翻牌道具 */
        ArenaEvent.ARENA_BUY_CARDITEM = "ARENA_BUY_CARDITEM";
        /**查看阵容信息 */
        ArenaEvent.SHOW_LINUEUP_PANLE = "SHOW_LINUEUP_PANLE";
        /**竞技场战斗开始 */
        ArenaEvent.ARENA_BATTEL_START = "ARENA_BATTEL_START";
        /**竞技场扫荡 */
        ArenaEvent.ARENA_BATTEL_SWEEP = "ARENA_BATTEL_SAODANG";
        /**更新自己的战斗力 */
        ArenaEvent.UPDATE_MYSELF_FORCE = "UPDATE_MYSELF_FORCE";
        /**挑战完成回到界面 */
        ArenaEvent.ARENA_CHALLENGE_END = "ARENA_CHALLENGE_END";
        /**购买剩余次数 */
        ArenaEvent.BUY_ARENA_CHALLENGE = "BUY_ARENA_CHALLENGE";
        /**打开竞技场排行榜 */
        ArenaEvent.SHOW_ARENARANK_PANEL = "SHOW_ARENARANK_PANEL";
        /** 更新战斗记录数据 */
        ArenaEvent.UPDATE_ZHANDOU_JILU_DATA = "UPDATE_ZHANDOU_JILU_DATA";
        /** 打开购买次数界面 */
        ArenaEvent.SHOW_BUY_VIEW = "SHOW_BUY_VIEW";
        /** 打开提示界面 */
        ArenaEvent.SHOW_NOTICE_VIEW = "SHOW_NOTICE_VIEW";
        /** 打开奖励界面 */
        ArenaEvent.SHOW_AWARD_VIEW = "SHOW_AWARD_VIEW";
        /** 打开排行榜界面 */
        ArenaEvent.SHOW_RANK_VIEW = "SHOW_RANK_VIEW";
        /** 打开记录界面 */
        ArenaEvent.SHOW_RECORD_VIEW = "SHOW_RECORD_VIEW";
        /** 打开阵容界面 */
        ArenaEvent.SHOW_PLAYER_LINEUP = "SHOW_PLAYER_LINEUP";
        /** 匹配挑战 */
        ArenaEvent.MATCH_CHALLENGE = "MATCH_CHALLENGE";
        /** 匹配赛领取宝箱 */
        ArenaEvent.MATCH_REWARD_BOX = "MATCH_REWARD_BOX";
        /** 匹配赛领取宝箱成功 */
        ArenaEvent.MATCH_REWARD_BOX_SUCC = "MATCH_REWARD_BOX_SUCC";
        /** 刷新匹配列表 */
        ArenaEvent.REFRESH_MATCH_LIST = "REFRESH_MATCH_LIST";
        /** 匹配赛记录回放 */
        ArenaEvent.MATCH_PLAYBACK = "MATCH_PLAYBACK";
        /** 战斗结束返回记录界面 */
        ArenaEvent.FIGHT_BACK_TO_RECORD = "FIGHT_BACK_TO_RECORD";
        return ArenaEvent;
    }(tl3d.BaseEvent));
    game.ArenaEvent = ArenaEvent;
})(game || (game = {}));
