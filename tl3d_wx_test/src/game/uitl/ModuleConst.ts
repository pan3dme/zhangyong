class ModuleConst {
    /** 首页 */
    public static MAIN = 1000;
    /** 战斗 */
    public static FIGHT = 100;
    /** 快速战斗 */
    public static FAST_FIGHT = 110;
    /** 自动战斗 */
    public static AUTO_FIGHT = 120;
    /** 聊天 */
    public static CHAT = 130;
    /** 同省聊天 */
    public static CHAT_PROVI = 131;
    /** 公会聊天 */
    public static CHAT_CROSSSRV = 132;
    /** 设置 */
    public static SHEZHI = 140;
    /** 邮件 */
    public static MAIL = 150;
    /**召唤系统 */
    public static SUMMON = 210;
    /** 神秘岛屿 */
    public static Island = 220;
    /** 公会 */
    public static GONGHUI = 230;
     /** 公会副本 */
    public static GONGHUICOPY = 231;
    /** 公会战 */
    public static GONGHUI_FIGHT = 232;
    /** 地下城 */
    public static DIXIACHENG = 240;
    /** 试炼塔 */
    public static SHILIANTA = 250;
    /** 竞技 */
    public static JINGJI = 260;
    /**图鉴 */
    public static TUJIAN = 270;

    /**好友 */
    public static FRIEND = 310;
    /**首充 */
    public static SHOUCHONG = 320;
    /**充值 */
    public static CHONGZHI = 790;
    /** 荣誉 */
    public static HONOR = 330;
    /** 日常 */
    public static DAILY = 340;
    /** 集市 */
    public static JISHI = 350;
    /** 福利 */
    public static FULI = 360;
    /** 付费活动 */
    public static PAY_ACTIVITY = 364;
    /** 商店 */
    public static SHOP = 370;
    /** 限时活动 */
    public static ACTIVITY = 380;
    /** 开服基金 */
    public static KAIFU_JIJIN = 393;
    /** 七日登录 */
    public static LOGIN_QIRI = 394;
    /** 十四日登录 */
    public static LOGIN_SHISIRI = 395;
    /** 内测返利 */
    public static TEST_REBATE = 396;
    /** 勇者之证 */
    public static WARRIOR_PROVE = 397;

    /** 英雄 */
    public static SHENLING = 400;
    /** 升星 */
    public static SHENGXING = 770;
    /** 觉醒 */
    public static JUEXING = 401;
    /** 融魂 */
    public static RONGHUN = 402;
    /** 升阶 */
    public static SHENGJIE = 403;
    /** 圣物 */
    public static TREASURE = 410;
    /** 背包 */
    public static BEIBAO = 500;
    /**装备分解 */
    public static EQUIP_FENJIE = 510;
    /** 历练 */
    public static FUWEN = 600;

    /**七日狂欢 */
    public static QIRIKH = 710;
    /** 失落遗迹（远征） */
    public static EXPEDITION = 720;
    /** 每日副本 */
    public static DAILY_COPY = 730;
    /** 世界boss */
    public static WORLD_BOSS = 740;
    /**排行榜 */
    public static PAIHBAN = 750;
    /**神界之门 */
    public static SHENMEN = 760;
    /*英雄分解 */
    public static FENJIE = 780;

    /** 神器 */
    public static ARTIFACT = 800;
    /** 神器洗练 */
    public static ARTIFACT_BAPTIZE = 801;
    /** 神器附魔 */
    public static ARTIFACT_ENCHANT = 802;
    /** 探险 */
    public static ADVENTURE = 810;
    /** 商队护送 */
    public static CARAVAN_ESCORT = 820;
    /** 组队副本 */
    public static TEAM_COPY = 960;
    /** 迷雾森林 */
    public static FOG_FOREST = 830;

    /** 装备 */
    public static EQUIPMENT = 910;
    /** 装备强化 */
    public static EQUIP_STRENGTH = 911;
    /** 装备精炼 */
    public static EQUIP_JINGLIAN = 912;
    /** 宝石 */
    public static EQUIP_BAOSHI = 913;
    /** 荣耀之战 */
    public static GLORY_FIGHT = 920;
    /** 匹配赛 */
    public static MATCH_FIGHT = 930;
    /** 激战神域 */
    public static GOD_DOMAIN = 940;
    /** 立绘 */
    public static GOD_LIHUI = 1000001;

    /**玩法 */
    public static WANFA = 10000;
    /** 登录 */
    public static login = 10001;
    /** 加载 */
    public static loading = 10002;
    
}

/** 成就选项类型 */
enum AchievementTabType {
    challenge = 1,  //挑战
    honor = 2       //荣誉
}

/** 缓动方向 */
enum TweenDirection {
    up = 1,
    down = 2,
    left = 3,
    right = 4
}


/** 副本数据 */
interface ICopyInfo {
    expeditionId: number;          // 黑暗森林通关关卡ID
    expeditionRewardInfo: any;     // 黑暗森林奖励领取次数信息
    expeditionSelfHpInfo: any;     // 黑暗森林玩家自身血量信息(万分比整数下发)
    /** 荣誉之战报名之后的本赛季结束时间 */
    honourWarRegTime: number;

    friendHelpList : IFriendHelpSvrData[];         // 远征 - 我雇佣的援助列表 数据格式： [force,[templateId, starLv, level, attrs, degree, awakenLv, skinId]]的数组
    helpGodId : string[];           // 远征 - 已派遣的神灵ID
}

interface IFriendHelpSvrData{
    helpId : string;    //　援助索引
    force : number;
    godInfo : any[];    // 神灵信息 [templateId, starLv, level, attrs, degree, awakenLv, skinId]
}

/** 消耗类型 */
enum CostTypeKey {
    task_liveness = -10,            // 每日任务活跃度
    exp = 5,                        // 经验
    mofajinghua_u = 200,            // 上级魔法精华 
    mofajinghua_m = 201,            // 中级魔法精华 
    mofajinghua_l = 202,            // 下级魔法精华 
    shenlijinghua_u = 203,          // 上级神力精华 
    shenlijinghua_m = 204,          // 中级神力精华 
    shenlijinghua_l = 205,          // 下级神力精华 
    weizhi_zhaohuanshu = 206,       // 未知召唤书
    shenmi_zhaohuanshu = 207,       // 神秘召唤书
    shenjiemiyao = 224,             // 神界密钥
    jinhuahuizhang = 225,           // 进化徽章
    shenlijinghua = 230,            // 神力精华
    yuangumibao = 231,              // 远古秘宝
    touzi = 234,              // 骰子
    huifu_yaoshui = 303,            // 回复血量药水
    fuhuo_yaoshui = 304,            // 复活药水
    suipian_sanxing = 350,          // 3星英雄碎片
    suipian_sixing = 351,           // 4星英雄碎片
    suipian_wuxing = 352,           // 5星英雄碎片
    liuxingka = 503,                // 六星万能卡
    qixingka = 504,
    baxingka = 505,
    jiuxingka = 506,
    qianghuashi = 400,              // 强化石
    jinglianshi = 401,              // 精炼石
    xingmangshi = 405,              // 星芒石
    longgang = 406,                 // 龙钢
    risk_updatecard = 407,          // 探险刷新卡
    hun_life = 411,                 // 生命之魂
    hun_attack = 412,               // 攻击之魂
    hun_defense = 413,              // 防御之魂
    baoshi_attack = 415,            // 攻击宝石
    baoshi_life = 416,              // 生命宝石
    baoshi_defense = 417,           // 防御宝石
    escort_shuaxin = 418,           // 护送刷新卡
    escort_husong = 419,            // 高级护送卡
    treasure_exp = 423,             // 圣物经验石
    treasure_rebirth = 424,         //圣物重生石
    treasure_suipian_purple = 425,     //紫色圣物碎片
    treasure_suipian_orange = 426,     //橙色圣物碎片
    treasure_suipian_red = 427,        //红色圣物碎片
    warrior_prove = 750,            // 勇者之证勋章
    shenqi_leishenchui = 30003,         // 神器-雷神锤
}

/** 副本开启条件类型 */
enum CopyConditionType {
    id = 1,         // 前置关卡id
    level = 2,      // 主角等级
    taskid = 3,      // 任务id
    power = 4      // 战力需求
}

/** 系统开启条件类型 */
enum SysConditionType {
    default = 0,
    level = 1,      // 玩家等级
    copy = 2,       // 通过副本id
    taskId = 3      // 主线任务id
}

/** 公告参数类型 */
enum NoticeParamType {
    god = 1,        // 神灵
    godStar = 2,    // 星级
    item = 3,       // 物品
    itemCnt = 4,    // 数量
    rarityGod = 5,  // 稀有度神灵
    gloryId = 6,    // 荣耀之战奖励id
    guildHelpItem = 7,  // 公会援助物品
    gotoGuildHelp = 8,  // 前往公会援助 - 下划线
    joinGuildState = 9,  // [申请/加入] 加入工会状态
    joinGuild = 10,  // 加入公会 - 下划线
    joinTeamGroup = 11, // 申请加入组队
}

/** 装备操作类型 */
enum EquipOperation {
    /**分解 */
    RESOLVE,
    /**更换 */
    WEAR,
    /**穿戴 */
    CHANGE,
    /**卸下 */
    DISCHARGE,
    /**强化 */
    STRENGTH,
    /**精炼 */
    REFINE,
    /**一键操作 */
    ROOT_EQUIP_CHANGE,
    /**切换显示装备 */
    SWITCH,
}

/** 神器操作类型 */
enum Artifact {
    /**附魔 */
    ENCHANT,
    /**重铸 */
    RECYCLE,
    /**解锁 */
    ACTIVATE,
    /**强化 */
    STRENGTH,
    /**洗练更换 */
    CHANGE,
    /**普通洗练 */
    PBAPTIZE,
    /**高级洗练 */
    GBAPTIZE,
    /**技能升级 */
    SKILLUPGRADE,
    /**穿戴/卸下 */
    WEAR_OR_TAKEOFF,
}

/**转盘类型 */
enum TURNTABLE {
    EQUIP = 1,
    WISH = 3,
    ART = 2,
    GOD = 0,
    TREASURE = 4
}

/**时间常数 */
class TimeConst {
    /**一小时的秒数*/
    public static ONE_HOURS_SEC: number = 3600;
    /**一天的秒数*/
    public static ONE_DAY_SEC: number = 86400;
    /**一天的毫秒 */
    public static ONE_DAY_MILSEC: number = 86400000;
}
/** 星期x */
enum WeekNum {
    Sun = 0,
    Mon = 1,
    Tue = 2,
    Wed = 3,
    Thu = 4,
    Fri = 5,
    Sat = 6
}

/** 商店类型 */
enum ShopType {
    jishi = -1,          // 集市
    shangcheng = 1,     // 商城
    jingjichang = 2,    // 勋章商店
    guild = 3,          // 公会商店
    yuanzheng = 4,      // 遗迹商城
    shenjie = 5,        // 结晶商店
    // fenjie ,         // 英雄商店
    rongyao = 7,        // 荣耀商店
    godDm = 8  //神域商店
}

/** 商品限购类别 */
enum GoodsLimitType {
    none = 0,       // 无限制
    day = 1,        // 每日限购
    week = 2,       // 每周限购
}

/** 装备套装 */
enum EquipSuit {
    two = 2,
    three = 3,
    four = 4
}

/** 值类型 */
enum ValueType {
    fixed = 0,      // 固定值
    percent =1 ,    // 百分比
}

/** 碎片标识 */
enum ChipType {
    normal = 1,     // 通用
    godSkin = 2     // 神灵皮肤
}

/** 防御类型 */
enum GodType {
    shuchu = 1,
    zhiliao = 2,
    fuzhu = 3,
    kongzhi = 4,
    fangyu = 5
}
