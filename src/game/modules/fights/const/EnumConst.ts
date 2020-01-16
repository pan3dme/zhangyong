enum CopyType {
    jingji_npc = 1001,      // 竞技场npc
    jingji_pve = 1002,      // 竞技场pve
    jingji_record = 1003,      // 竞技场回放
    qiecuo = 2001,          // 玩家切磋
    guildCopy = 4001,       // 公会副本
    guildFight = 4002,      // 公会战
    worldboss = 5001,       // 世界boss
    dailycopy = 5002,       // 每日试炼副本
    yuanzhenCopy = 5003,    // 远征副本
    escort = 5004,          // 商队护送
    fogForest = 5005,       // 迷雾森林
    island = 5006,          // 神秘岛屿
    glory = 5007,           // 荣耀之战
    arenaMatch = 5008,      // 竞技场匹配赛
    godDomain = 5009,       // 激战神域
    teamCopy = 5010,       // 组队副本
    test = 100000,       // 测试
}

enum playState {
    PREPARE = 0,
    FIGHT = 1,
    VICTORY = 2,
    FAILURE = 3
}

enum startOptState{
    START,GUOCHANG,GUOCHANGCOMPLETE
}