var ModuleConst = /** @class */ (function () {
    function ModuleConst() {
    }
    /** 首页 */
    ModuleConst.MAIN = 1000;
    /** 战斗 */
    ModuleConst.FIGHT = 100;
    /** 快速战斗 */
    ModuleConst.FAST_FIGHT = 110;
    /** 自动战斗 */
    ModuleConst.AUTO_FIGHT = 120;
    /** 聊天 */
    ModuleConst.CHAT = 130;
    /** 同省聊天 */
    ModuleConst.CHAT_PROVI = 131;
    /** 公会聊天 */
    ModuleConst.CHAT_CROSSSRV = 132;
    /** 设置 */
    ModuleConst.SHEZHI = 140;
    /** 邮件 */
    ModuleConst.MAIL = 150;
    /**召唤系统 */
    ModuleConst.SUMMON = 210;
    /** 神秘岛屿 */
    ModuleConst.Island = 220;
    /** 公会 */
    ModuleConst.GONGHUI = 230;
    /** 公会副本 */
    ModuleConst.GONGHUICOPY = 231;
    /** 公会战 */
    ModuleConst.GONGHUI_FIGHT = 232;
    /** 地下城 */
    ModuleConst.DIXIACHENG = 240;
    /** 试炼塔 */
    ModuleConst.SHILIANTA = 250;
    /** 竞技 */
    ModuleConst.JINGJI = 260;
    /**图鉴 */
    ModuleConst.TUJIAN = 270;
    /**好友 */
    ModuleConst.FRIEND = 310;
    /**首充 */
    ModuleConst.SHOUCHONG = 320;
    /**充值 */
    ModuleConst.CHONGZHI = 790;
    /** 荣誉 */
    ModuleConst.HONOR = 330;
    /** 日常 */
    ModuleConst.DAILY = 340;
    /** 集市 */
    ModuleConst.JISHI = 350;
    /** 福利 */
    ModuleConst.FULI = 360;
    /** 付费活动 */
    ModuleConst.PAY_ACTIVITY = 364;
    /** 商店 */
    ModuleConst.SHOP = 370;
    /** 限时活动 */
    ModuleConst.ACTIVITY = 380;
    /** 开服基金 */
    ModuleConst.KAIFU_JIJIN = 393;
    /** 七日登录 */
    ModuleConst.LOGIN_QIRI = 394;
    /** 十四日登录 */
    ModuleConst.LOGIN_SHISIRI = 395;
    /** 内测返利 */
    ModuleConst.TEST_REBATE = 396;
    /** 勇者之证 */
    ModuleConst.WARRIOR_PROVE = 397;
    /** 英雄 */
    ModuleConst.SHENLING = 400;
    /** 升星 */
    ModuleConst.SHENGXING = 770;
    /** 觉醒 */
    ModuleConst.JUEXING = 401;
    /** 融魂 */
    ModuleConst.RONGHUN = 402;
    /** 升阶 */
    ModuleConst.SHENGJIE = 403;
    /** 圣物 */
    ModuleConst.TREASURE = 410;
    /** 背包 */
    ModuleConst.BEIBAO = 500;
    /**装备分解 */
    ModuleConst.EQUIP_FENJIE = 510;
    /** 历练 */
    ModuleConst.FUWEN = 600;
    /**七日狂欢 */
    ModuleConst.QIRIKH = 710;
    /** 失落遗迹（远征） */
    ModuleConst.EXPEDITION = 720;
    /** 每日副本 */
    ModuleConst.DAILY_COPY = 730;
    /** 世界boss */
    ModuleConst.WORLD_BOSS = 740;
    /**排行榜 */
    ModuleConst.PAIHBAN = 750;
    /**神界之门 */
    ModuleConst.SHENMEN = 760;
    /*英雄分解 */
    ModuleConst.FENJIE = 780;
    /** 神器 */
    ModuleConst.ARTIFACT = 800;
    /** 神器洗练 */
    ModuleConst.ARTIFACT_BAPTIZE = 801;
    /** 神器附魔 */
    ModuleConst.ARTIFACT_ENCHANT = 802;
    /** 探险 */
    ModuleConst.ADVENTURE = 810;
    /** 商队护送 */
    ModuleConst.CARAVAN_ESCORT = 820;
    /** 组队副本 */
    ModuleConst.TEAM_COPY = 960;
    /** 迷雾森林 */
    ModuleConst.FOG_FOREST = 830;
    /** 装备 */
    ModuleConst.EQUIPMENT = 910;
    /** 装备强化 */
    ModuleConst.EQUIP_STRENGTH = 911;
    /** 装备精炼 */
    ModuleConst.EQUIP_JINGLIAN = 912;
    /** 宝石 */
    ModuleConst.EQUIP_BAOSHI = 913;
    /** 荣耀之战 */
    ModuleConst.GLORY_FIGHT = 920;
    /** 匹配赛 */
    ModuleConst.MATCH_FIGHT = 930;
    /** 激战神域 */
    ModuleConst.GOD_DOMAIN = 940;
    /** 立绘 */
    ModuleConst.GOD_LIHUI = 1000001;
    /**玩法 */
    ModuleConst.WANFA = 10000;
    /** 登录 */
    ModuleConst.login = 10001;
    /** 加载 */
    ModuleConst.loading = 10002;
    return ModuleConst;
}());
/** 成就选项类型 */
var AchievementTabType;
(function (AchievementTabType) {
    AchievementTabType[AchievementTabType["challenge"] = 1] = "challenge";
    AchievementTabType[AchievementTabType["honor"] = 2] = "honor"; //荣誉
})(AchievementTabType || (AchievementTabType = {}));
/** 缓动方向 */
var TweenDirection;
(function (TweenDirection) {
    TweenDirection[TweenDirection["up"] = 1] = "up";
    TweenDirection[TweenDirection["down"] = 2] = "down";
    TweenDirection[TweenDirection["left"] = 3] = "left";
    TweenDirection[TweenDirection["right"] = 4] = "right";
})(TweenDirection || (TweenDirection = {}));
/** 消耗类型 */
var CostTypeKey;
(function (CostTypeKey) {
    CostTypeKey[CostTypeKey["task_liveness"] = -10] = "task_liveness";
    CostTypeKey[CostTypeKey["exp"] = 5] = "exp";
    CostTypeKey[CostTypeKey["mofajinghua_u"] = 200] = "mofajinghua_u";
    CostTypeKey[CostTypeKey["mofajinghua_m"] = 201] = "mofajinghua_m";
    CostTypeKey[CostTypeKey["mofajinghua_l"] = 202] = "mofajinghua_l";
    CostTypeKey[CostTypeKey["shenlijinghua_u"] = 203] = "shenlijinghua_u";
    CostTypeKey[CostTypeKey["shenlijinghua_m"] = 204] = "shenlijinghua_m";
    CostTypeKey[CostTypeKey["shenlijinghua_l"] = 205] = "shenlijinghua_l";
    CostTypeKey[CostTypeKey["weizhi_zhaohuanshu"] = 206] = "weizhi_zhaohuanshu";
    CostTypeKey[CostTypeKey["shenmi_zhaohuanshu"] = 207] = "shenmi_zhaohuanshu";
    CostTypeKey[CostTypeKey["shenjiemiyao"] = 224] = "shenjiemiyao";
    CostTypeKey[CostTypeKey["jinhuahuizhang"] = 225] = "jinhuahuizhang";
    CostTypeKey[CostTypeKey["shenlijinghua"] = 230] = "shenlijinghua";
    CostTypeKey[CostTypeKey["yuangumibao"] = 231] = "yuangumibao";
    CostTypeKey[CostTypeKey["touzi"] = 234] = "touzi";
    CostTypeKey[CostTypeKey["huifu_yaoshui"] = 303] = "huifu_yaoshui";
    CostTypeKey[CostTypeKey["fuhuo_yaoshui"] = 304] = "fuhuo_yaoshui";
    CostTypeKey[CostTypeKey["suipian_sanxing"] = 350] = "suipian_sanxing";
    CostTypeKey[CostTypeKey["suipian_sixing"] = 351] = "suipian_sixing";
    CostTypeKey[CostTypeKey["suipian_wuxing"] = 352] = "suipian_wuxing";
    CostTypeKey[CostTypeKey["liuxingka"] = 503] = "liuxingka";
    CostTypeKey[CostTypeKey["qixingka"] = 504] = "qixingka";
    CostTypeKey[CostTypeKey["baxingka"] = 505] = "baxingka";
    CostTypeKey[CostTypeKey["jiuxingka"] = 506] = "jiuxingka";
    CostTypeKey[CostTypeKey["qianghuashi"] = 400] = "qianghuashi";
    CostTypeKey[CostTypeKey["jinglianshi"] = 401] = "jinglianshi";
    CostTypeKey[CostTypeKey["xingmangshi"] = 405] = "xingmangshi";
    CostTypeKey[CostTypeKey["longgang"] = 406] = "longgang";
    CostTypeKey[CostTypeKey["risk_updatecard"] = 407] = "risk_updatecard";
    CostTypeKey[CostTypeKey["hun_life"] = 411] = "hun_life";
    CostTypeKey[CostTypeKey["hun_attack"] = 412] = "hun_attack";
    CostTypeKey[CostTypeKey["hun_defense"] = 413] = "hun_defense";
    CostTypeKey[CostTypeKey["baoshi_attack"] = 415] = "baoshi_attack";
    CostTypeKey[CostTypeKey["baoshi_life"] = 416] = "baoshi_life";
    CostTypeKey[CostTypeKey["baoshi_defense"] = 417] = "baoshi_defense";
    CostTypeKey[CostTypeKey["escort_shuaxin"] = 418] = "escort_shuaxin";
    CostTypeKey[CostTypeKey["escort_husong"] = 419] = "escort_husong";
    CostTypeKey[CostTypeKey["treasure_exp"] = 423] = "treasure_exp";
    CostTypeKey[CostTypeKey["treasure_rebirth"] = 424] = "treasure_rebirth";
    CostTypeKey[CostTypeKey["treasure_suipian_purple"] = 425] = "treasure_suipian_purple";
    CostTypeKey[CostTypeKey["treasure_suipian_orange"] = 426] = "treasure_suipian_orange";
    CostTypeKey[CostTypeKey["treasure_suipian_red"] = 427] = "treasure_suipian_red";
    CostTypeKey[CostTypeKey["warrior_prove"] = 750] = "warrior_prove";
    CostTypeKey[CostTypeKey["shenqi_leishenchui"] = 30003] = "shenqi_leishenchui";
})(CostTypeKey || (CostTypeKey = {}));
/** 副本开启条件类型 */
var CopyConditionType;
(function (CopyConditionType) {
    CopyConditionType[CopyConditionType["id"] = 1] = "id";
    CopyConditionType[CopyConditionType["level"] = 2] = "level";
    CopyConditionType[CopyConditionType["taskid"] = 3] = "taskid";
    CopyConditionType[CopyConditionType["power"] = 4] = "power"; // 战力需求
})(CopyConditionType || (CopyConditionType = {}));
/** 系统开启条件类型 */
var SysConditionType;
(function (SysConditionType) {
    SysConditionType[SysConditionType["default"] = 0] = "default";
    SysConditionType[SysConditionType["level"] = 1] = "level";
    SysConditionType[SysConditionType["copy"] = 2] = "copy";
    SysConditionType[SysConditionType["taskId"] = 3] = "taskId"; // 主线任务id
})(SysConditionType || (SysConditionType = {}));
/** 公告参数类型 */
var NoticeParamType;
(function (NoticeParamType) {
    NoticeParamType[NoticeParamType["god"] = 1] = "god";
    NoticeParamType[NoticeParamType["godStar"] = 2] = "godStar";
    NoticeParamType[NoticeParamType["item"] = 3] = "item";
    NoticeParamType[NoticeParamType["itemCnt"] = 4] = "itemCnt";
    NoticeParamType[NoticeParamType["rarityGod"] = 5] = "rarityGod";
    NoticeParamType[NoticeParamType["gloryId"] = 6] = "gloryId";
    NoticeParamType[NoticeParamType["guildHelpItem"] = 7] = "guildHelpItem";
    NoticeParamType[NoticeParamType["gotoGuildHelp"] = 8] = "gotoGuildHelp";
    NoticeParamType[NoticeParamType["joinGuildState"] = 9] = "joinGuildState";
    NoticeParamType[NoticeParamType["joinGuild"] = 10] = "joinGuild";
    NoticeParamType[NoticeParamType["joinTeamGroup"] = 11] = "joinTeamGroup";
})(NoticeParamType || (NoticeParamType = {}));
/** 装备操作类型 */
var EquipOperation;
(function (EquipOperation) {
    /**分解 */
    EquipOperation[EquipOperation["RESOLVE"] = 0] = "RESOLVE";
    /**更换 */
    EquipOperation[EquipOperation["WEAR"] = 1] = "WEAR";
    /**穿戴 */
    EquipOperation[EquipOperation["CHANGE"] = 2] = "CHANGE";
    /**卸下 */
    EquipOperation[EquipOperation["DISCHARGE"] = 3] = "DISCHARGE";
    /**强化 */
    EquipOperation[EquipOperation["STRENGTH"] = 4] = "STRENGTH";
    /**精炼 */
    EquipOperation[EquipOperation["REFINE"] = 5] = "REFINE";
    /**一键操作 */
    EquipOperation[EquipOperation["ROOT_EQUIP_CHANGE"] = 6] = "ROOT_EQUIP_CHANGE";
    /**切换显示装备 */
    EquipOperation[EquipOperation["SWITCH"] = 7] = "SWITCH";
})(EquipOperation || (EquipOperation = {}));
/** 神器操作类型 */
var Artifact;
(function (Artifact) {
    /**附魔 */
    Artifact[Artifact["ENCHANT"] = 0] = "ENCHANT";
    /**重铸 */
    Artifact[Artifact["RECYCLE"] = 1] = "RECYCLE";
    /**解锁 */
    Artifact[Artifact["ACTIVATE"] = 2] = "ACTIVATE";
    /**强化 */
    Artifact[Artifact["STRENGTH"] = 3] = "STRENGTH";
    /**洗练更换 */
    Artifact[Artifact["CHANGE"] = 4] = "CHANGE";
    /**普通洗练 */
    Artifact[Artifact["PBAPTIZE"] = 5] = "PBAPTIZE";
    /**高级洗练 */
    Artifact[Artifact["GBAPTIZE"] = 6] = "GBAPTIZE";
    /**技能升级 */
    Artifact[Artifact["SKILLUPGRADE"] = 7] = "SKILLUPGRADE";
    /**穿戴/卸下 */
    Artifact[Artifact["WEAR_OR_TAKEOFF"] = 8] = "WEAR_OR_TAKEOFF";
})(Artifact || (Artifact = {}));
/**转盘类型 */
var TURNTABLE;
(function (TURNTABLE) {
    TURNTABLE[TURNTABLE["EQUIP"] = 1] = "EQUIP";
    TURNTABLE[TURNTABLE["WISH"] = 3] = "WISH";
    TURNTABLE[TURNTABLE["ART"] = 2] = "ART";
    TURNTABLE[TURNTABLE["GOD"] = 0] = "GOD";
    TURNTABLE[TURNTABLE["TREASURE"] = 4] = "TREASURE";
})(TURNTABLE || (TURNTABLE = {}));
/**时间常数 */
var TimeConst = /** @class */ (function () {
    function TimeConst() {
    }
    /**一小时的秒数*/
    TimeConst.ONE_HOURS_SEC = 3600;
    /**一天的秒数*/
    TimeConst.ONE_DAY_SEC = 86400;
    /**一天的毫秒 */
    TimeConst.ONE_DAY_MILSEC = 86400000;
    return TimeConst;
}());
/** 星期x */
var WeekNum;
(function (WeekNum) {
    WeekNum[WeekNum["Sun"] = 0] = "Sun";
    WeekNum[WeekNum["Mon"] = 1] = "Mon";
    WeekNum[WeekNum["Tue"] = 2] = "Tue";
    WeekNum[WeekNum["Wed"] = 3] = "Wed";
    WeekNum[WeekNum["Thu"] = 4] = "Thu";
    WeekNum[WeekNum["Fri"] = 5] = "Fri";
    WeekNum[WeekNum["Sat"] = 6] = "Sat";
})(WeekNum || (WeekNum = {}));
/** 商店类型 */
var ShopType;
(function (ShopType) {
    ShopType[ShopType["jishi"] = -1] = "jishi";
    ShopType[ShopType["shangcheng"] = 1] = "shangcheng";
    ShopType[ShopType["jingjichang"] = 2] = "jingjichang";
    ShopType[ShopType["guild"] = 3] = "guild";
    ShopType[ShopType["yuanzheng"] = 4] = "yuanzheng";
    ShopType[ShopType["shenjie"] = 5] = "shenjie";
    // fenjie ,         // 英雄商店
    ShopType[ShopType["rongyao"] = 7] = "rongyao";
    ShopType[ShopType["godDm"] = 8] = "godDm"; //神域商店
})(ShopType || (ShopType = {}));
/** 商品限购类别 */
var GoodsLimitType;
(function (GoodsLimitType) {
    GoodsLimitType[GoodsLimitType["none"] = 0] = "none";
    GoodsLimitType[GoodsLimitType["day"] = 1] = "day";
    GoodsLimitType[GoodsLimitType["week"] = 2] = "week";
})(GoodsLimitType || (GoodsLimitType = {}));
/** 装备套装 */
var EquipSuit;
(function (EquipSuit) {
    EquipSuit[EquipSuit["two"] = 2] = "two";
    EquipSuit[EquipSuit["three"] = 3] = "three";
    EquipSuit[EquipSuit["four"] = 4] = "four";
})(EquipSuit || (EquipSuit = {}));
/** 值类型 */
var ValueType;
(function (ValueType) {
    ValueType[ValueType["fixed"] = 0] = "fixed";
    ValueType[ValueType["percent"] = 1] = "percent";
})(ValueType || (ValueType = {}));
/** 碎片标识 */
var ChipType;
(function (ChipType) {
    ChipType[ChipType["normal"] = 1] = "normal";
    ChipType[ChipType["godSkin"] = 2] = "godSkin"; // 神灵皮肤
})(ChipType || (ChipType = {}));
/** 防御类型 */
var GodType;
(function (GodType) {
    GodType[GodType["shuchu"] = 1] = "shuchu";
    GodType[GodType["zhiliao"] = 2] = "zhiliao";
    GodType[GodType["fuzhu"] = 3] = "fuzhu";
    GodType[GodType["kongzhi"] = 4] = "kongzhi";
    GodType[GodType["fangyu"] = 5] = "fangyu";
})(GodType || (GodType = {}));
