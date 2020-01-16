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
    var GuildModule = /** @class */ (function (_super) {
        __extends(GuildModule, _super);
        function GuildModule() {
            return _super.call(this) || this;
        }
        GuildModule.prototype.getModuleName = function () {
            return "GuildModule";
        };
        GuildModule.prototype.listProcessors = function () {
            return [
                new game.GuildProcessor(),
                new game.GuildInitProcessor(),
                new game.GuildHallProcessor(),
                new game.GuildDonationProcessor(),
                new game.GuildCopyProcessor(),
                new game.GuildSkillProcessor(),
                new game.GuildFightProcessor(),
                new game.GuildHelpProcessor(),
            ];
        };
        /**
         * 初始化数据
         */
        GuildModule.prototype.onRegister = function () {
            game.GuildModel.getInstance().initModel();
        };
        return GuildModule;
    }(tl3d.Module));
    game.GuildModule = GuildModule;
    var GuildEvent = /** @class */ (function (_super) {
        __extends(GuildEvent, _super);
        function GuildEvent(type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, type) || this;
            _this.data = $data;
            return _this;
        }
        /** 打开公会界面 */
        GuildEvent.SHOW_GUILD_PANEL = "SHOW_GUILD_PANEL";
        /**刷新公会成员列表 */
        GuildEvent.UPDATE_MEMBER_LIST = "UPDATE_MEMBER_LIST";
        /**刷新公会申请列表 */
        GuildEvent.UPDATE_APPLY_LIST = "UPDATE_APPLY_LIST";
        /** 更新申请信息 */
        GuildEvent.UPDATE_APPLY_INFO = "UPDATE_APPLY_INFO";
        /** 展示大厅界面 */
        GuildEvent.SHOW_GUILD_HALL_VIEW = "SHOW_GUILD_HALL_VIEW";
        /** 展示技能界面 */
        GuildEvent.SHOW_GUILD_SKILL_VIEW = "SHOW_GUILD_SKILL_VIEW";
        /** 展示副本界面 */
        GuildEvent.SHOW_GUILD_COPY_VIEW = "SHOW_GUILD_COPY_VIEW";
        /** 展示捐献界面 */
        GuildEvent.SHOW_GUILD_DONATION_VIEW = "SHOW_GUILD_DONATION_VIEW";
        /** 展示战斗界面 */
        GuildEvent.SHOW_GUILD_BATTLE_VIEW = "SHOW_GUILD_BATTLE_VIEW";
        /** 展示商店界面 */
        GuildEvent.SHOW_GUILD_SHOP_VIEW = "SHOW_GUILD_SHOP_VIEW";
        /** 展示公会创建界面 */
        GuildEvent.SHOW_GUILD_INIT_VIEW = "SHOW_GUILD_INIT_VIEW";
        /** 显示公会援助界面 */
        GuildEvent.SHOW_GUILD_HELP_VIEW = "SHOW_GUILD_HELP_VIEW";
        /** 创建公会 */
        GuildEvent.CREATE_GUILD = "CREATE_GUILD";
        /** 更改公会图标界面 */
        GuildEvent.CHANGE_GUILD_ICON = "CHANGE_GUILD_ICON";
        /** 创建公会界面更改公会图标 */
        GuildEvent.CREATE_GUILD_CHANGEICON = "CREATE_GUILD_CHANGEICON";
        /** 公会信息界面更改公会图标 */
        GuildEvent.GUILD_HALL_VIEW_CHANGEICON = "GUILD_HALL_VIEW_CHANGEICON";
        /** 展示申请界面 */
        GuildEvent.SHOW_APPLY_VIEW = "SHOW_APPLY_VIEW";
        /**刷新公会信息 */
        GuildEvent.UPDATE_GUILD_INFO = "UPDATE_GUILD_INFO";
        /** 更改公会公告 */
        GuildEvent.CHANGE_GUILD_NOTICE = "CHANGE_GUILD_NOTICE";
        /** 更改公会设置 */
        GuildEvent.CHANGE_GUILD_SETTING = "CHANGE_GUILD_SETTING";
        /** 公会成员操作 */
        GuildEvent.MEMBER_SETUP_OPERATE = "MEMBER_SETUP_OPERATE";
        /** 公会招募 */
        GuildEvent.GUILD_ZHAOMU = "GUILD_ZHAOMU";
        /** 公会捐献 */
        GuildEvent.GUILD_DONATE = "GUILD_DONATE";
        /** 更新公会捐献 */
        GuildEvent.UPDATE_GUILD_DONATE = "UPDATE_GUILD_DONATE";
        /** 公会捐献成功 */
        GuildEvent.GUILD_DONATE_SUCCESS = "GUILD_DONATE_SUCCESS";
        /** 展示副本规则 */
        GuildEvent.SHOW_COPY_RULE = "SHOW_COPY_RULE";
        /** 展示副本排名 */
        GuildEvent.SHOW_COPY_RANK = "SHOW_COPY_RANK";
        /** 展示击杀排名 */
        GuildEvent.SHOW_ATKEND_RANK = "SHOW_ATKEND_RANK";
        /** 展示副本通关奖励 */
        GuildEvent.SHOW_COPY_TONGGUAN_REWARD = "SHOW_COPY_TONGGUAN_REWARD";
        /** 展示关卡击杀奖励界面 */
        GuildEvent.SHOW_COPY_JISHA_REWARD = "SHOW_COPY_JISHA_REWARD";
        /** 展示挑战次数购买界面 */
        GuildEvent.SHOW_CHALLENGE_NUM_BUY = "SHOW_CHALLENGE_NUM_BUY";
        /** 关卡挑战 */
        GuildEvent.GUANQIA_FIGHT = "GUANQIA_FIGHT";
        /** 公会副本扫荡 */
        GuildEvent.GUILD_COPY_SWEEP = "GUILD_COPY_SWEEP";
        /** 领取通关奖励 */
        GuildEvent.RECEIVE_TONGGUAN_JIANGLI = "RECEIVE_TONGGUAN_JIANGLI";
        /** 领取通关奖励成功 */
        GuildEvent.RECEIVE_JIANGLI_SUCCESS = "RECEIVE_JIANGLI_SUCCESS";
        /** 更新奖励信息 */
        GuildEvent.UPDATE_JIANGLI_INFO = "UPDATE_JIANGLI_INFO";
        /** 公会技能升级 */
        GuildEvent.GUILD_SKILL_LEVELUP = "GUILD_SKILL_LEVELUP";
        /** 公会技能重置 */
        GuildEvent.GUILD_SKILL_RESET = "GUILD_SKILL_RESET";
        /** 公会技能操作成功 */
        GuildEvent.GUILD_SKILL_SUCCESS = "GUILD_SKILL_SUCCESS";
        /** 打开公会战规则界面 */
        GuildEvent.SHOW_FIGHT_RULE_VIEW = "SHOW_FIGHT_RULE_VIEW";
        /** 打开段位宝箱界面 */
        GuildEvent.SHOW_GRADE_CHEST_VIEW = "SHOW_GRADE_CHEST_VIEW";
        /** 打开赛季奖励界面 */
        GuildEvent.SHOW_SEASON_AWARD_VIEW = "SHOW_SEASON_AWARD_VIEW";
        /** 打开荣誉殿堂界面 */
        GuildEvent.SHOW_HONOR_HALL_VIEW = "SHOW_HONOR_HALL_VIEW";
        /** 打开会员排名界面 */
        GuildEvent.SHOW_PERSON_RANK_VIEW = "SHOW_PERSON_RANK_VIEW";
        /** 打开赛区排名 */
        GuildEvent.SHOW_GROUP_RANK_VIEW = "SHOW_GROUP_RANK_VIEW";
        /** 报名 */
        GuildEvent.JOIN_FIGHT = "JOIN_FIGHT";
        /** 查看上轮信息 */
        GuildEvent.CHECK_PREV_GAME = "CHECK_PREV_GAME";
        /** 挑战对手 */
        GuildEvent.CHALLENGE_ENEMY = "CHALLENGE_ENEMY";
        /** 更新匹配信息 */
        GuildEvent.UPDATE_MATCH_INFO = "UPDATE_MATCH_INFO";
        /** 报名成功 */
        GuildEvent.JOIN_FIGHT_SUCCESS = "JOIN_FIGHT_SUCCESS";
        /** 领取宝箱成功 */
        GuildEvent.REWARD_CHEST_SUCCESS = "REWARD_CHEST_SUCCESS";
        /** 更新公会战红点 */
        GuildEvent.UPDATE_WAR_REDPOINT = "UPDATE_WAR_REDPOINT";
        /** 显示求援界面 */
        GuildEvent.SHOW_ASK_HELP_VIEW = "SHOW_ASK_HELP_VIEW";
        /** 领取被帮助奖励 */
        GuildEvent.REWARD_HELPED_ITEM = "REWARD_HELPED_ITEM";
        /** 领取被帮助奖励成功 */
        GuildEvent.REWARD_HELPED_ITEM_SUCC = "REWARD_HELPED_ITEM_SUCC";
        /** 领取宝箱 */
        GuildEvent.HELP_CLICK_BAOXIANG = "HELP_CLICK_BAOXIANG";
        /** 领取宝箱成功 */
        GuildEvent.HELP_CLICK_BAOXIANG_SUCC = "HELP_CLICK_BAOXIANG_SUCC";
        /** 发送求助聊天信息 */
        GuildEvent.SEND_CHAT_HELP = "GH_SEND_CHAT_HELP";
        /** 求援 */
        GuildEvent.SEND_ASK_HELP = "SEND_ASK_HELP";
        /** 求援成功 */
        GuildEvent.SEND_ASK_HELP_SUCC = "SEND_ASK_HELP_SUCC";
        /** 帮助其他人 */
        GuildEvent.HELP_OTHERS = "GH_HELP_OTHERS";
        /** 帮助其他人成功 */
        GuildEvent.HELP_OTHERS_SUCC = "HELP_OTHERS_SUCC";
        /** 更新我的求援列表 */
        GuildEvent.UPDATE_MY_HELP_LIST = "UPDATE_MY_HELP_LIST";
        /** 更新其他人的求援列表 */
        GuildEvent.UPDATE_OTHERS_HELP_LIST = "UPDATE_OTHERS_HELP_LIST";
        return GuildEvent;
    }(tl3d.BaseEvent));
    game.GuildEvent = GuildEvent;
    var GuildIconChangeType;
    (function (GuildIconChangeType) {
        GuildIconChangeType[GuildIconChangeType["createChange"] = 0] = "createChange";
        GuildIconChangeType[GuildIconChangeType["infoChange"] = 1] = "infoChange";
    })(GuildIconChangeType = game.GuildIconChangeType || (game.GuildIconChangeType = {}));
    var GuildSkillType;
    (function (GuildSkillType) {
        GuildSkillType[GuildSkillType["shengming"] = 1] = "shengming";
        GuildSkillType[GuildSkillType["gongji"] = 2] = "gongji";
        GuildSkillType[GuildSkillType["fangyu"] = 3] = "fangyu";
        GuildSkillType[GuildSkillType["sudu"] = 4] = "sudu";
    })(GuildSkillType = game.GuildSkillType || (game.GuildSkillType = {}));
    /** 公会段位 */
    var GuildGrade;
    (function (GuildGrade) {
        GuildGrade[GuildGrade["qingtong"] = 1] = "qingtong";
        GuildGrade[GuildGrade["baiyin"] = 2] = "baiyin";
        GuildGrade[GuildGrade["bojin"] = 3] = "bojin";
        GuildGrade[GuildGrade["wangzhe"] = 4] = "wangzhe";
    })(GuildGrade = game.GuildGrade || (game.GuildGrade = {}));
    var GuildMemberOptType;
    (function (GuildMemberOptType) {
        GuildMemberOptType[GuildMemberOptType["zhuanrang_hz"] = 1] = "zhuanrang_hz";
        GuildMemberOptType[GuildMemberOptType["bamian_fhz"] = 2] = "bamian_fhz";
        GuildMemberOptType[GuildMemberOptType["renming_fhz"] = 3] = "renming_fhz";
        GuildMemberOptType[GuildMemberOptType["zhuchu_gh"] = 4] = "zhuchu_gh";
        GuildMemberOptType[GuildMemberOptType["cuanwei"] = 5] = "cuanwei";
    })(GuildMemberOptType = game.GuildMemberOptType || (game.GuildMemberOptType = {}));
})(game || (game = {}));
