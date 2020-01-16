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
    * CopyTeamModule
    */
    var CopyTeamModule = /** @class */ (function (_super) {
        __extends(CopyTeamModule, _super);
        function CopyTeamModule() {
            return _super.call(this) || this;
        }
        CopyTeamModule.prototype.getModuleName = function () {
            return "CopyTeamModule";
        };
        CopyTeamModule.prototype.listProcessors = function () {
            return [new game.CopyTeamProcessor()];
        };
        CopyTeamModule.prototype.onRegister = function () {
        };
        return CopyTeamModule;
    }(tl3d.Module));
    game.CopyTeamModule = CopyTeamModule;
    var CopyTeamEvent = /** @class */ (function (_super) {
        __extends(CopyTeamEvent, _super);
        function CopyTeamEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CopyTeamEvent.SHOW_MAIN_PANEL = "SHOW_MAIN_PANEL";
        CopyTeamEvent.SHOW_TEAMBUILD = "SHOW_TEAMBUILD";
        /** 打开排行界面 */
        CopyTeamEvent.SHOW_RANK_VIEW = "SHOW_RANK_VIEW";
        /** 打开奖励界面 */
        CopyTeamEvent.SHOW_REWARD_VIEW = "SHOW_REWARD_VIEW";
        /** 领取奖励成功 */
        CopyTeamEvent.REWARD_SUCC = "REWARD_SUCC";
        /** 打开规则界面 */
        CopyTeamEvent.SHOW_RULE_VIEW = "SHOW_RULE_VIEW";
        /** 创建队伍界面 */
        CopyTeamEvent.CREATE_TEAM_VIEW = "CREATE_TEAM_VIEW";
        /** 打开邀请界面 */
        CopyTeamEvent.SHOW_INVITE_VIEW = "SHOW_INVITE_VIEW";
        /** 加入队伍 */
        CopyTeamEvent.JOIN_TEAM = "JOIN_TEAM";
        /** 申请加入队伍 */
        CopyTeamEvent.APPLY_JOIN_TEAM = "APPLY_JOIN_TEAM";
        /** 离开队伍 */
        CopyTeamEvent.LEAVE_TEAM = "LEAVE_TEAM";
        /** 设置队伍位置 */
        CopyTeamEvent.SET_POS_TEAM = "SET_POS_TEAM";
        /** 申请列表界面 */
        CopyTeamEvent.APPLY_TEAM_PANEL = "APPLY_TEAM_PANEL";
        /** 同意申请 */
        CopyTeamEvent.AGREED_APPLY = "AGREED_APPLY";
        /** 剔除队伍 */
        CopyTeamEvent.KICK_OUT_MEMBER = "KICK_OUT_MEMBER";
        /** 发起战斗 */
        CopyTeamEvent.TEAM_COPY_BATTLE = "TEAM_COPY_BATTLE";
        /** 监听-加入队伍 */
        CopyTeamEvent.DISEVT_JOIN_TEAM = "DISEVT_JOIN_TEAM";
        /** 监听-退出队伍 */
        CopyTeamEvent.DISEVT_EXIT_TEAM = "DISEVT_EXIT_TEAM";
        /** 监听-从一个队伍加入到另一个队伍 */
        CopyTeamEvent.DISEVT_JOIN_OTHER_TEAM = "DISEVT_JOIN_OTHER_TEAM";
        /** 播放战报 */
        CopyTeamEvent.PLAY_REPORT = "PLAY_REPORT";
        /** 发送邀请 */
        CopyTeamEvent.SEND_INVITE = "SEND_INVITE";
        /** 关闭转移队长界面 */
        CopyTeamEvent.HIDE_TRANSFER_PANEL = "HIDE_TRANSFER_PANEL";
        /** 开启转移队长界面 */
        CopyTeamEvent.SHOW_TRANSFER_PANEL = "SHOW_TRANSFER_PANEL";
        /** 同步成员信息 */
        CopyTeamEvent.UPDATE_MEMBERLIST = "UPDATE_MEMBERLIST";
        /** 更新队伍通关数据 */
        CopyTeamEvent.UPDATE_GROUP_INFO = "UPDATE_GROUP_INFO";
        /** 申请列表红点 */
        CopyTeamEvent.UPDATE_APPLY_RP = "UPDATE_APPLY_RP";
        /** 队伍最高关卡更新 */
        CopyTeamEvent.UPDATE_TEAM_FLOOR = "UPDATE_TEAM_FLOOR";
        return CopyTeamEvent;
    }(tl3d.BaseEvent));
    game.CopyTeamEvent = CopyTeamEvent;
})(game || (game = {}));
