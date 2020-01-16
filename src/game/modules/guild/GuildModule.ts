/**
* name 
*/
module game{
	export class GuildModule extends tl3d.Module{
		constructor(){
			super();
		}

		public getModuleName(): string {
            return "GuildModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [
                new GuildProcessor(),
                new GuildInitProcessor(),
                new GuildHallProcessor(),
                new GuildDonationProcessor(),
                new GuildCopyProcessor(),
                new GuildSkillProcessor(),
                new GuildFightProcessor(),
                new GuildHelpProcessor(),
            ];
        }

        /**
         * 初始化数据
         */
        protected onRegister(){
            GuildModel.getInstance().initModel();
        }
	}

	export class GuildEvent extends tl3d.BaseEvent {
        /** 打开公会界面 */
        public static SHOW_GUILD_PANEL: string = "SHOW_GUILD_PANEL";
        /**刷新公会成员列表 */
        public static UPDATE_MEMBER_LIST:string = "UPDATE_MEMBER_LIST";
        /**刷新公会申请列表 */
        public static UPDATE_APPLY_LIST:string = "UPDATE_APPLY_LIST";
        /** 更新申请信息 */
        public static UPDATE_APPLY_INFO : string = "UPDATE_APPLY_INFO";

        /** 展示大厅界面 */
        public static SHOW_GUILD_HALL_VIEW : string = "SHOW_GUILD_HALL_VIEW";
        /** 展示技能界面 */
        public static SHOW_GUILD_SKILL_VIEW : string = "SHOW_GUILD_SKILL_VIEW";
        /** 展示副本界面 */
        public static SHOW_GUILD_COPY_VIEW : string = "SHOW_GUILD_COPY_VIEW";
        /** 展示捐献界面 */
        public static SHOW_GUILD_DONATION_VIEW : string = "SHOW_GUILD_DONATION_VIEW";
        /** 展示战斗界面 */
        public static SHOW_GUILD_BATTLE_VIEW : string = "SHOW_GUILD_BATTLE_VIEW";
        /** 展示商店界面 */
        public static SHOW_GUILD_SHOP_VIEW : string = "SHOW_GUILD_SHOP_VIEW";
        /** 展示公会创建界面 */
        public static SHOW_GUILD_INIT_VIEW : string = "SHOW_GUILD_INIT_VIEW";
        /** 显示公会援助界面 */
        public static SHOW_GUILD_HELP_VIEW : string = "SHOW_GUILD_HELP_VIEW";

        /** 创建公会 */
        public static CREATE_GUILD : string = "CREATE_GUILD";
        /** 更改公会图标界面 */
        public static CHANGE_GUILD_ICON : string = "CHANGE_GUILD_ICON";
        /** 创建公会界面更改公会图标 */
        public static CREATE_GUILD_CHANGEICON : string = "CREATE_GUILD_CHANGEICON";
        /** 公会信息界面更改公会图标 */
        public static GUILD_HALL_VIEW_CHANGEICON : string = "GUILD_HALL_VIEW_CHANGEICON";

        /** 展示申请界面 */
        public static SHOW_APPLY_VIEW : string = "SHOW_APPLY_VIEW";
        /**刷新公会信息 */
        public static UPDATE_GUILD_INFO:string = "UPDATE_GUILD_INFO";
        /** 更改公会公告 */
        public static CHANGE_GUILD_NOTICE : string = "CHANGE_GUILD_NOTICE";
        /** 更改公会设置 */
        public static CHANGE_GUILD_SETTING : string = "CHANGE_GUILD_SETTING";
        /** 公会成员操作 */
        public static MEMBER_SETUP_OPERATE : string = "MEMBER_SETUP_OPERATE";
        /** 公会招募 */
        public static GUILD_ZHAOMU : string = "GUILD_ZHAOMU";

        /** 公会捐献 */
        public static GUILD_DONATE : string = "GUILD_DONATE";
        /** 更新公会捐献 */
        public static UPDATE_GUILD_DONATE : string = "UPDATE_GUILD_DONATE";
        /** 公会捐献成功 */
        public static GUILD_DONATE_SUCCESS : string = "GUILD_DONATE_SUCCESS";

        /** 展示副本规则 */
        public static SHOW_COPY_RULE : string = "SHOW_COPY_RULE";
        /** 展示副本排名 */
        public static SHOW_COPY_RANK : string = "SHOW_COPY_RANK";
        /** 展示击杀排名 */
        public static SHOW_ATKEND_RANK : string = "SHOW_ATKEND_RANK";
        /** 展示副本通关奖励 */
        public static SHOW_COPY_TONGGUAN_REWARD : string = "SHOW_COPY_TONGGUAN_REWARD";
        /** 展示关卡击杀奖励界面 */
        public static SHOW_COPY_JISHA_REWARD : string = "SHOW_COPY_JISHA_REWARD";
        /** 展示挑战次数购买界面 */
        public static SHOW_CHALLENGE_NUM_BUY : string = "SHOW_CHALLENGE_NUM_BUY";
        /** 关卡挑战 */
        public static GUANQIA_FIGHT : string = "GUANQIA_FIGHT";
        /** 公会副本扫荡 */
        public static GUILD_COPY_SWEEP : string = "GUILD_COPY_SWEEP";
        /** 领取通关奖励 */
        public static RECEIVE_TONGGUAN_JIANGLI : string = "RECEIVE_TONGGUAN_JIANGLI";
        /** 领取通关奖励成功 */
        public static RECEIVE_JIANGLI_SUCCESS : string = "RECEIVE_JIANGLI_SUCCESS";
        /** 更新奖励信息 */
        public static UPDATE_JIANGLI_INFO : string = "UPDATE_JIANGLI_INFO";

        /** 公会技能升级 */
        public static GUILD_SKILL_LEVELUP : string = "GUILD_SKILL_LEVELUP";
        /** 公会技能重置 */
        public static GUILD_SKILL_RESET : string = "GUILD_SKILL_RESET";
        /** 公会技能操作成功 */
        public static GUILD_SKILL_SUCCESS : string = "GUILD_SKILL_SUCCESS";

        /** 打开公会战规则界面 */
        public static SHOW_FIGHT_RULE_VIEW : string = "SHOW_FIGHT_RULE_VIEW";
        /** 打开段位宝箱界面 */
        public static SHOW_GRADE_CHEST_VIEW : string = "SHOW_GRADE_CHEST_VIEW";
        /** 打开赛季奖励界面 */
        public static SHOW_SEASON_AWARD_VIEW : string = "SHOW_SEASON_AWARD_VIEW";
        /** 打开荣誉殿堂界面 */
        public static SHOW_HONOR_HALL_VIEW : string = "SHOW_HONOR_HALL_VIEW";
        /** 打开会员排名界面 */
        public static SHOW_PERSON_RANK_VIEW : string = "SHOW_PERSON_RANK_VIEW";
        /** 打开赛区排名 */
        public static SHOW_GROUP_RANK_VIEW : string = "SHOW_GROUP_RANK_VIEW";
        /** 报名 */
        public static JOIN_FIGHT : string = "JOIN_FIGHT";
        /** 查看上轮信息 */
        public static CHECK_PREV_GAME : string = "CHECK_PREV_GAME";
        /** 挑战对手 */
        public static CHALLENGE_ENEMY : string = "CHALLENGE_ENEMY";
        /** 更新匹配信息 */
        public static UPDATE_MATCH_INFO : string = "UPDATE_MATCH_INFO";
        /** 报名成功 */
        public static JOIN_FIGHT_SUCCESS : string = "JOIN_FIGHT_SUCCESS";
        /** 领取宝箱成功 */
        public static REWARD_CHEST_SUCCESS : string = "REWARD_CHEST_SUCCESS";
        /** 更新公会战红点 */
        public static UPDATE_WAR_REDPOINT : string = "UPDATE_WAR_REDPOINT";

        /** 显示求援界面 */
        public static SHOW_ASK_HELP_VIEW : string = "SHOW_ASK_HELP_VIEW";
        /** 领取被帮助奖励 */
        public static REWARD_HELPED_ITEM : string = "REWARD_HELPED_ITEM";
        /** 领取被帮助奖励成功 */
        public static REWARD_HELPED_ITEM_SUCC : string = "REWARD_HELPED_ITEM_SUCC";
        /** 领取宝箱 */
        public static HELP_CLICK_BAOXIANG : string = "HELP_CLICK_BAOXIANG";
        /** 领取宝箱成功 */
        public static HELP_CLICK_BAOXIANG_SUCC : string = "HELP_CLICK_BAOXIANG_SUCC";
        /** 发送求助聊天信息 */
        public static SEND_CHAT_HELP : string = "GH_SEND_CHAT_HELP";
        /** 求援 */
        public static SEND_ASK_HELP : string = "SEND_ASK_HELP";
        /** 求援成功 */
        public static SEND_ASK_HELP_SUCC : string = "SEND_ASK_HELP_SUCC";
        /** 帮助其他人 */
        public static HELP_OTHERS : string = "GH_HELP_OTHERS";
        /** 帮助其他人成功 */
        public static HELP_OTHERS_SUCC : string = "HELP_OTHERS_SUCC";
        /** 更新我的求援列表 */
        public static UPDATE_MY_HELP_LIST : string = "UPDATE_MY_HELP_LIST";
        /** 更新其他人的求援列表 */
        public static UPDATE_OTHERS_HELP_LIST : string = "UPDATE_OTHERS_HELP_LIST";

        public data: any;

        constructor(type:string,$data:any=null){
            super(type);
            this.data = $data;
        }
             
    }

    /** 公会信息 */
    export interface IGuildInfo {
        autoJoin: number;       // 公会自动加入（0：是，1：不是）
        exp: number;            // 公会当前经验
        guildId: string;        // 公会id
        job: number;            // 自己的职位
        level: number;          // 公会等级
        limitLevel: number;     // 公会限制等级
        name: string;           // 公会名字
        num: number;            // 公会人数
        notice : string;        // 公会公告
        copyId : number;        // 当前通关副本ID
        head : number;          // 公会头像
    }

    export interface IGuildData  {
        guildId : string;    // 公会id
        name : string;       // 公会名字
        level : number;      // 公会等级
        num : number;        // 公会人数
        limitLevel : number; // 公会限制等级
        autoJoin : number;   // 公会自动加入（0：是，1：不是）
        isApplay : number;   // 是否已经申请加入
        head : number;       // 公会头像
    }

    export interface IGuildApplyData {
        playerId : string;   // 玩家id
        name : string;       // 玩家名字
        level : number;      // 玩家等级
        applyTime : number;  // 申请时间
        force : number;  // 战力
    }

    export interface IGuildMemberData {
        playerId : string;   // 成员id
        name : string;       // 成员名字
        level : number;      // 成员等级
        head : any;       // 成员头像
        headFrame : number;       // 成员头像
        online : number;     // 成员是否在线
        logoutTime : number; // 成员下线时间
        job : number;        // 成员职位
        force : number;
    }

    export interface IGuildChallengeInfo {
        copyId : number;        // 最新工会通关的副本ID 慎用
        mosterInfo : any;       // 怪物剩余血量
        rankInfo : any;
        totalDamage : number;   // 我的伤害
    }
 
    export enum GuildIconChangeType {
        createChange,
        infoChange
    }

    export enum GuildSkillType {
        shengming = 1,
        gongji,
        fangyu,
        sudu,
    }

    /** 公会段位 */
    export enum GuildGrade {
        qingtong = 1,
        baiyin = 2,
        bojin = 3,
        wangzhe = 4
    }

    export enum GuildMemberOptType {
        zhuanrang_hz = 1,   // 转让会长
        bamian_fhz = 2,     // 罢免副会长
        renming_fhz = 3,    // 任命副会长
        zhuchu_gh = 4,       // 逐出公会
        cuanwei = 5,       // 篡位会长
    }
}