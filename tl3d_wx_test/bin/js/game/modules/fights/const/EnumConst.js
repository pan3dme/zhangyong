var CopyType;
(function (CopyType) {
    CopyType[CopyType["jingji_npc"] = 1001] = "jingji_npc";
    CopyType[CopyType["jingji_pve"] = 1002] = "jingji_pve";
    CopyType[CopyType["jingji_record"] = 1003] = "jingji_record";
    CopyType[CopyType["qiecuo"] = 2001] = "qiecuo";
    CopyType[CopyType["guildCopy"] = 4001] = "guildCopy";
    CopyType[CopyType["guildFight"] = 4002] = "guildFight";
    CopyType[CopyType["worldboss"] = 5001] = "worldboss";
    CopyType[CopyType["dailycopy"] = 5002] = "dailycopy";
    CopyType[CopyType["yuanzhenCopy"] = 5003] = "yuanzhenCopy";
    CopyType[CopyType["escort"] = 5004] = "escort";
    CopyType[CopyType["fogForest"] = 5005] = "fogForest";
    CopyType[CopyType["island"] = 5006] = "island";
    CopyType[CopyType["glory"] = 5007] = "glory";
    CopyType[CopyType["arenaMatch"] = 5008] = "arenaMatch";
    CopyType[CopyType["godDomain"] = 5009] = "godDomain";
    CopyType[CopyType["teamCopy"] = 5010] = "teamCopy";
    CopyType[CopyType["test"] = 100000] = "test";
})(CopyType || (CopyType = {}));
var playState;
(function (playState) {
    playState[playState["PREPARE"] = 0] = "PREPARE";
    playState[playState["FIGHT"] = 1] = "FIGHT";
    playState[playState["VICTORY"] = 2] = "VICTORY";
    playState[playState["FAILURE"] = 3] = "FAILURE";
})(playState || (playState = {}));
var startOptState;
(function (startOptState) {
    startOptState[startOptState["START"] = 0] = "START";
    startOptState[startOptState["GUOCHANG"] = 1] = "GUOCHANG";
    startOptState[startOptState["GUOCHANGCOMPLETE"] = 2] = "GUOCHANGCOMPLETE";
})(startOptState || (startOptState = {}));
