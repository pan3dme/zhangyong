/***********************************************************************/ 
/***************本代码由协议工具自动生成，请勿手动修改****************/
/***********************************************************************/



class Protocol {

/**
 * @args {uid:"账号ID"}
 * @isWorker 1
 * @returns QueryEntryData
 */
public static gate_gate_queryEntry = {
type : "null",
key : "gate_gate_queryEntry",
name : "gate.gateHandler.queryEntry",
args : {
    uid : "_0"//账号ID
},
returns : "QueryEntryData",
};
/**
 * New client entry game server. Check token and bind user info into session.
 * @args {token:"密钥", sid:"服务器ID"}
 * @isWorker 1
 * @returns EntryData
 */
public static game_enter_entry = {
type : "null",
key : "game_enter_entry",
name : "game.enterHandler.entry",
args : {
    token : "_0"//密钥
    ,sid : "_1"//服务器ID
},
returns : "EntryData",
};
/**
 * Player enter game, and response the related information such as playerInfo.
 *
 * @args 
 * @type
 * @isWorker 1
 * @returns EnterGameData
 */
public static game_enter_enterGame = {
type : "null",
key : "game_enter_enterGame",
name : "game.enterHandler.enterGame",
returns : "EnterGameData",
};
/**
 * 修改角色信息（改名和性别，新手引导结束后使用）
 * @args {name:"角色名",sex:"性别"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_changePlayerData = {
type : "null",
key : "game_common_changePlayerData",
name : "game.commonHandler.changePlayerData",
args : {
    name : "_0"//角色名
    ,sex : "_1"//性别
},
returns : "CommonOperateData",
};
/**
 * 修改角色名字
 * @args {newName:"新的角色名"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_changePlayerName = {
type : "null",
key : "game_common_changePlayerName",
name : "game.commonHandler.changePlayerName",
args : {
    newName : "_0"//新的角色名
},
returns : "CommonOperateData",
};
/**
 * 获取跨天刷新数据(当客户端跨天刷新时间与当前时间不是同一天时，才请求)
 * @args 
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_getCrossDayInfo = {
type : "null",
key : "game_common_getCrossDayInfo",
name : "game.commonHandler.getCrossDayInfo",
returns : "CommonOperateData",
};
/**
 * 调整布阵
 * @args {type:"布阵类型", godIds:"神灵ID集合"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_ajustLineup = {
type : "null",
key : "game_common_ajustLineup",
name : "game.commonHandler.ajustLineup",
args : {
    type : "_0"//布阵类型
    ,godIds : "_1"//神灵ID集合
},
returns : "CommonOperateData",
};
/**
 * 快速下阵
 * @args {godId:"神灵ID"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_quickQuitLineup = {
type : "null",
key : "game_common_quickQuitLineup",
name : "game.commonHandler.quickQuitLineup",
args : {
    godId : "_0"//神灵ID
},
returns : "CommonOperateData",
};
/**
 * 许愿
 * @args {count:"次数"}
 * @type wish
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_wish = {
type : "wish",
key : "game_common_wish",
name : "game.commonHandler.wish",
args : {
    count : "_0"//次数
},
returns : "CommonOperateData",
};
/**
 * 红点数据信息
 * @args 
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_redPoint = {
type : "null",
key : "game_common_redPoint",
name : "game.commonHandler.redPoint",
returns : "CommonOperateData",
};
/**
 * 购买公会副本挑战次数
 * @args {count:"购买次数"}
 * @type guild
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_buyGuildCopyBattleCnt = {
type : "guild",
key : "game_common_buyGuildCopyBattleCnt",
name : "game.commonHandler.buyGuildCopyBattleCnt",
args : {
    count : "_0"//购买次数
},
returns : "CommonOperateData",
};
/**
 * 购买每日试炼副本挑战次数
 * @args {type:"每日试炼副本类型",count:"购买次数"}
 * @type dailyCopy
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_buyDailyCopyBattleCnt = {
type : "dailyCopy",
key : "game_common_buyDailyCopyBattleCnt",
name : "game.commonHandler.buyDailyCopyBattleCnt",
args : {
    type : "_0"//每日试炼副本类型
    ,count : "_1"//购买次数
},
returns : "CommonOperateData",
};
/**
 * 购买世界boss挑战次数
 * @args {count:"购买次数"}
 * @type worldBoss
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_buyWorldBossBattleCnt = {
type : "worldBoss",
key : "game_common_buyWorldBossBattleCnt",
name : "game.commonHandler.buyWorldBossBattleCnt",
args : {
    count : "_0"//购买次数
},
returns : "CommonOperateData",
};
/**
 * 购买矿点掠夺次数
 * @args {count:"购买次数"}
 * @type mine
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_buyMineRobCnt = {
type : "mine",
key : "game_common_buyMineRobCnt",
name : "game.commonHandler.buyMineRobCnt",
args : {
    count : "_0"//购买次数
},
returns : "CommonOperateData",
};
/**
 * 领取新功能开启宝箱
 * @args {sysOpenId:"系统开启ID"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_getSysOpenChest = {
type : "null",
key : "game_common_getSysOpenChest",
name : "game.commonHandler.getSysOpenChest",
args : {
    sysOpenId : "_0"//系统开启ID
},
returns : "CommonOperateData",
};
/**
 * 打开UI界面
 * @args {type:"ui界面类型(tb_prop.uiTypeKey)"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_openUI = {
type : "null",
key : "game_common_openUI",
name : "game.commonHandler.openUI",
args : {
    type : "_0"//ui界面类型(tb_prop.uiTypeKey)
},
returns : "CommonOperateData",
};
/**
 * 购买激战神域奖励次数
 * @args {count:"购买次数"}
 * @type godDomain
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_buyGodDomainRewardNum = {
type : "godDomain",
key : "game_common_buyGodDomainRewardNum",
name : "game.commonHandler.buyGodDomainRewardNum",
args : {
    count : "_0"//购买次数
},
returns : "CommonOperateData",
};
/**
 * 设置头像
 * @args {headId:"0表示外部头像，-1表示男头像，-2表示女头像，其他为神灵头像"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_setPlayerHead = {
type : "null",
key : "game_common_setPlayerHead",
name : "game.commonHandler.setPlayerHead",
args : {
    headId : "_0"//0表示外部头像，-1表示男头像，-2表示女头像，其他为神灵头像
},
returns : "CommonOperateData",
};
/**
 * 更新新数据
 * @args
 * @type
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_updateCommonData = {
type : "null",
key : "game_common_updateCommonData",
name : "game.commonHandler.updateCommonData",
returns : "CommonOperateData",
};
/**
 * 调整阵容英雄装备
 * @args {type:"布阵类型", srcId:"源神灵ID", dstId:"目地神灵ID"}
 * @type equip
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_ajustLineupEquip = {
type : "equip",
key : "game_common_ajustLineupEquip",
name : "game.commonHandler.ajustLineupEquip",
args : {
    type : "_0"//布阵类型
    ,srcId : "_1"//源神灵ID
    ,dstId : "_2"//目地神灵ID
},
returns : "CommonOperateData",
};
/**
 * 设置头像框
 * @args {id:"头像框ID"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_setPlayerHeadFrame = {
type : "null",
key : "game_common_setPlayerHeadFrame",
name : "game.commonHandler.setPlayerHeadFrame",
args : {
    id : "_0"//头像框ID
},
returns : "CommonOperateData",
};
/**
 * 设置形象
 * @args {godId:"神灵模板ID", skinId:"皮肤ID(0为原来模型ID,-1为觉醒模型ID,>0为时装模型ID)"}
 * @isWorker 1
 * @returns CommonOperateData
 */
public static game_common_setPlayerShow = {
type : "null",
key : "game_common_setPlayerShow",
name : "game.commonHandler.setPlayerShow",
args : {
    godId : "_0"//神灵模板ID
    ,skinId : "_1"//皮肤ID(0为原来模型ID,-1为觉醒模型ID,>0为时装模型ID)
},
returns : "CommonOperateData",
};
/**
 * 使用物品
 * @args {itemId:"物品模板ID", count:"使用个数", optionId:"选项ID"}
 * @type bag
 * @isWorker 1
 * @returns ItemOperateData
 */
public static game_item_useItem = {
type : "bag",
key : "game_item_useItem",
name : "game.itemHandler.useItem",
args : {
    itemId : "_0"//物品模板ID
    ,count : "_1"//使用个数
    ,optionId : "_2"//选项ID
},
returns : "ItemOperateData",
};
/**
 * 兑换物品
 * @args {exchangeId:"兑换ID(tb_exchange表的ID)", num:"兑换次数"}
 * @isWorker 1
 * @returns ItemOperateData
 */
public static game_item_exchange = {
type : "null",
key : "game_item_exchange",
name : "game.itemHandler.exchange",
args : {
    exchangeId : "_0"//兑换ID(tb_exchange表的ID)
    ,num : "_1"//兑换次数
},
returns : "ItemOperateData",
};
/**
 * 使用限时物品
 * @args {timeKey:"限时物品实例id"}
 * @type bag
 * @isWorker 1
 * @returns ItemOperateData
 */
public static game_item_useTimeItem = {
type : "bag",
key : "game_item_useTimeItem",
name : "game.itemHandler.useTimeItem",
args : {
    timeKey : "_0"//限时物品实例id
},
returns : "ItemOperateData",
};
/**
 * 穿戴装备
 * @args {godId:"神灵ID", equipKey:"装备实例id"}
 * @type equip
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_wear = {
type : "equip",
key : "game_equip_wear",
name : "game.equipHandler.wear",
args : {
    godId : "_0"//神灵ID
    ,equipKey : "_1"//装备实例id
},
returns : "EquipOperateData",
};
/**
 * 一键穿戴装备
 * @args {godId:"神灵ID", equipKeys:"穿戴的装备集合"}
 * @type equip
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_quickWear = {
type : "equip",
key : "game_equip_quickWear",
name : "game.equipHandler.quickWear",
args : {
    godId : "_0"//神灵ID
    ,equipKeys : "_1"//穿戴的装备集合
},
returns : "EquipOperateData",
};
/**
 * 卸下装备
 * @args {equipKey:"装备实例id"}
 * @type equip
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_discharge = {
type : "equip",
key : "game_equip_discharge",
name : "game.equipHandler.discharge",
args : {
    equipKey : "_0"//装备实例id
},
returns : "EquipOperateData",
};
/**
 * 一键卸下装备
 * @args {godId:"神灵ID"}
 * @type equip
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_quickDischarge = {
type : "equip",
key : "game_equip_quickDischarge",
name : "game.equipHandler.quickDischarge",
args : {
    godId : "_0"//神灵ID
},
returns : "EquipOperateData",
};
/**
 * 强化装备
 * @args {equipKey:"装备实例id", type:"强化类型"}
 * @type equipStrength
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_strength = {
type : "equipStrength",
key : "game_equip_strength",
name : "game.equipHandler.strength",
args : {
    equipKey : "_0"//装备实例id
    ,type : "_1"//强化类型
},
returns : "EquipOperateData",
};
/**
 * 一键强化装备
 * @args {godId:"神灵ID", type:"一键强化类型"}
 * @type equipStrength
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_quickStth = {
type : "equipStrength",
key : "game_equip_quickStth",
name : "game.equipHandler.quickStth",
args : {
    godId : "_0"//神灵ID
    ,type : "_1"//一键强化类型
},
returns : "EquipOperateData",
};
/**
 * 精炼装备
 * @args {equipKey:"装备实例id", refNum:"精炼次数"}
 * @type equipRefine
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_refine = {
type : "equipRefine",
key : "game_equip_refine",
name : "game.equipHandler.refine",
args : {
    equipKey : "_0"//装备实例id
    ,refNum : "_1"//精炼次数
},
returns : "EquipOperateData",
};
/**
 * 一键精炼装备
 * @args {godId:"神灵ID", type:"一键精炼类型"}
 * @type equipRefine
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_quickRefine = {
type : "equipRefine",
key : "game_equip_quickRefine",
name : "game.equipHandler.quickRefine",
args : {
    godId : "_0"//神灵ID
    ,type : "_1"//一键精炼类型
},
returns : "EquipOperateData",
};
/**
 * 回收装备
 * @args {equipKeys:"装备实例id集合"}
 * @type equip
 * @isWorker 1
 * @returns EquipOperateData
 */
public static game_equip_recycle = {
type : "equip",
key : "game_equip_recycle",
name : "game.equipHandler.recycle",
args : {
    equipKeys : "_0"//装备实例id集合
},
returns : "EquipOperateData",
};
/**
 * 召唤神灵
 * @args {godEmployType: "神灵召唤类型"}
 * @type employ
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_employ = {
type : "employ",
key : "game_god_employ",
name : "game.godHandler.employ",
args : {
    godEmployType : "_0"//神灵召唤类型
},
returns : "GodOperateData",
};
/**
 * 神灵升级
 * @args {godId:"神灵ID", count:"升级次数"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_upgrade = {
type : "god",
key : "game_god_upgrade",
name : "game.godHandler.upgrade",
args : {
    godId : "_0"//神灵ID
    ,count : "_1"//升级次数
},
returns : "GodOperateData",
};
/**
 * 神灵进阶
 * @args {godId:"神灵ID"}
 * @type raiseDegree
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_raiseDegree = {
type : "raiseDegree",
key : "game_god_raiseDegree",
name : "game.godHandler.raiseDegree",
args : {
    godId : "_0"//神灵ID
},
returns : "GodOperateData",
};
/**
 * 神灵觉醒
 * @args {godId:"神灵ID", materialArrs:"材料数组([godArr1, itemArr1],[godArr2, itemArr2], ...)"}
 * @type awaken
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_awaken = {
type : "awaken",
key : "game_god_awaken",
name : "game.godHandler.awaken",
args : {
    godId : "_0"//神灵ID
    ,materialArrs : "_1"//材料数组([godArr1, itemArr1],[godArr2, itemArr2], ...)
},
returns : "GodOperateData",
};
/**
 * 神灵升星
 * @args {godId:"神灵ID", materialArrs:"材料数组([godArr1, itemArr1],[godArr2, itemArr2], ...)"}
 * @type raiseStar
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_raiseStar = {
type : "raiseStar",
key : "game_god_raiseStar",
name : "game.godHandler.raiseStar",
args : {
    godId : "_0"//神灵ID
    ,materialArrs : "_1"//材料数组([godArr1, itemArr1],[godArr2, itemArr2], ...)
},
returns : "GodOperateData",
};
/**
 * 神灵分解
 * @args {rsvIds:"分解的神灵ID列表"}
 * @type resolve
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_resolve = {
type : "resolve",
key : "game_god_resolve",
name : "game.godHandler.resolve",
args : {
    rsvIds : "_0"//分解的神灵ID列表
},
returns : "GodOperateData",
};
/**
 * 获取神灵图鉴奖励
 * @args {id:"神灵模板ID"}
 * @type album
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_getAlbumAward = {
type : "album",
key : "game_god_getAlbumAward",
name : "game.godHandler.getAlbumAward",
args : {
    id : "_0"//神灵模板ID
},
returns : "GodOperateData",
};
/**
 * 发布神灵评论
 * @args {templateId:"神灵模板ID", isOpen:"是否公开神灵", content:"评论内容"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_publishComment = {
type : "god",
key : "game_god_publishComment",
name : "game.godHandler.publishComment",
args : {
    templateId : "_0"//神灵模板ID
    ,isOpen : "_1"//是否公开神灵
    ,content : "_2"//评论内容
},
returns : "GodOperateData",
};
/**
 * 获取神灵评论
 * @args {templateId:"神灵模板ID"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_getComment = {
type : "god",
key : "game_god_getComment",
name : "game.godHandler.getComment",
args : {
    templateId : "_0"//神灵模板ID
},
returns : "GodOperateData",
};
/**
 * 点赞神灵评论
 * @args {templateId:"神灵模板ID", value:"评论"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_likeComment = {
type : "god",
key : "game_god_likeComment",
name : "game.godHandler.likeComment",
args : {
    templateId : "_0"//神灵模板ID
    ,value : "_1"//评论
},
returns : "GodOperateData",
};
/**
 * 查看评论的神灵
 * @args {playerId:"玩家ID", templateId:"神灵模板ID"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_observeGod = {
type : "god",
key : "game_god_observeGod",
name : "game.godHandler.observeGod",
args : {
    playerId : "_0"//玩家ID
    ,templateId : "_1"//神灵模板ID
},
returns : "GodOperateData",
};
/**
 * 神界之门召唤
 * @args {race:"召唤的种族"}
 * @type door
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_doorEmploy = {
type : "door",
key : "game_god_doorEmploy",
name : "game.godHandler.doorEmploy",
args : {
    race : "_0"//召唤的种族
},
returns : "GodOperateData",
};
/**
 * 神界之门转换
 * @args {godId:"被转换的神灵ID"}
 * @type door
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_doorConvert = {
type : "door",
key : "game_god_doorConvert",
name : "game.godHandler.doorConvert",
args : {
    godId : "_0"//被转换的神灵ID
},
returns : "GodOperateData",
};
/**
 * 神界之门保存转换
 * @args {godId:"被转换的神灵ID"}
 * @type door
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_doorConvertSave = {
type : "door",
key : "game_god_doorConvertSave",
name : "game.godHandler.doorConvertSave",
args : {
    godId : "_0"//被转换的神灵ID
},
returns : "GodOperateData",
};
/**
 * 神灵融魂
 * @args {godId:"神灵ID", attrType:"融魂属性类型", numType:"融魂次数类型"}
 * @type fuseSoul
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_fuseSoul = {
type : "fuseSoul",
key : "game_god_fuseSoul",
name : "game.godHandler.fuseSoul",
args : {
    godId : "_0"//神灵ID
    ,attrType : "_1"//融魂属性类型
    ,numType : "_2"//融魂次数类型
},
returns : "GodOperateData",
};
/**
 * 神灵突破
 * @args {godId:"神灵ID"}
 * @type fuseSoul
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_break = {
type : "fuseSoul",
key : "game_god_break",
name : "game.godHandler.break",
args : {
    godId : "_0"//神灵ID
},
returns : "GodOperateData",
};
/**
 * 神灵分解查询
 * @args {rsvIds:"分解的神灵ID列表"}
 * @type resolve
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_queryResolve = {
type : "resolve",
key : "game_god_queryResolve",
name : "game.godHandler.queryResolve",
args : {
    rsvIds : "_0"//分解的神灵ID列表
},
returns : "GodOperateData",
};
/**
 * 神灵图鉴激活
 * @args {id:"图鉴组合ID"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_godFate = {
type : "god",
key : "game_god_godFate",
name : "game.godHandler.godFate",
args : {
    id : "_0"//图鉴组合ID
},
returns : "GodOperateData",
};
/**
 * 设置神灵皮肤ID
 * @args {godId:"神灵ID", skinId:"皮肤ID(0为原来模型ID,-1为觉醒模型ID,>0为时装模型ID)"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_setGodSkinId = {
type : "god",
key : "game_god_setGodSkinId",
name : "game.godHandler.setGodSkinId",
args : {
    godId : "_0"//神灵ID
    ,skinId : "_1"//皮肤ID(0为原来模型ID,-1为觉醒模型ID,>0为时装模型ID)
},
returns : "GodOperateData",
};
/**
 * 激活神灵皮肤
 * @args {godId:"神灵ID", skinId:"皮肤ID"}
 * @type god
 * @isWorker 1
 * @returns GodOperateData
 */
public static game_god_activeGodSkin = {
type : "god",
key : "game_god_activeGodSkin",
name : "game.godHandler.activeGodSkin",
args : {
    godId : "_0"//神灵ID
    ,skinId : "_1"//皮肤ID
},
returns : "GodOperateData",
};
/**
 * 领取主线挂机奖励
 * @args 
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_getMainAfkAward = {
type : "null",
key : "game_copy_getMainAfkAward",
name : "game.copyHandler.getMainAfkAward",
returns : "CopyOperateData",
};
/**
 * 主线快速战斗
 * @args 
 * @type quickBattle
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_quickMainBattle = {
type : "quickBattle",
key : "game_copy_quickMainBattle",
name : "game.copyHandler.quickMainBattle",
returns : "CopyOperateData",
};
/**
 * 结算符文副本
 * @args {copyId:"副本ID"}
 * @type runeCopy
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_settleRuneCopy = {
type : "runeCopy",
key : "game_copy_settleRuneCopy",
name : "game.copyHandler.settleRuneCopy",
args : {
    copyId : "_0"//副本ID
},
returns : "CopyOperateData",
};
/**
 * 结算地下城副本
 * @args {copyId:"副本ID", isWin:"是否获胜"}
 * @type background
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_settleGroundCopy = {
type : "background",
key : "game_copy_settleGroundCopy",
name : "game.copyHandler.settleGroundCopy",
args : {
    copyId : "_0"//副本ID
    ,isWin : "_1"//是否获胜
},
returns : "CopyOperateData",
};
/**
 * 结算试炼塔副本
 * @args {copyId:"副本ID", isWin:"是否获胜"}
 * @type tower
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_settleTowerCopy = {
type : "tower",
key : "game_copy_settleTowerCopy",
name : "game.copyHandler.settleTowerCopy",
args : {
    copyId : "_0"//副本ID
    ,isWin : "_1"//是否获胜
},
returns : "CopyOperateData",
};
/**
 * 获取试炼塔副本奖励
 * @args {copyId:"副本ID"}
 * @type tower
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_getTowerAward = {
type : "tower",
key : "game_copy_getTowerAward",
name : "game.copyHandler.getTowerAward",
args : {
    copyId : "_0"//副本ID
},
returns : "CopyOperateData",
};
/**
 * 每日试炼副本
 * @args {copyId:"副本ID", isWin:"是否获胜"}
 * @type dailyCopy
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_dailyCopyBattle = {
type : "dailyCopy",
key : "game_copy_dailyCopyBattle",
name : "game.copyHandler.dailyCopyBattle",
args : {
    copyId : "_0"//副本ID
    ,isWin : "_1"//是否获胜
},
returns : "CopyOperateData",
};
/**
 * 每日试炼副本扫荡
 * @args {copyId:"副本ID", num:"扫荡次数"}
 * @type dailyCopy
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_dailyCopySweep = {
type : "dailyCopy",
key : "game_copy_dailyCopySweep",
name : "game.copyHandler.dailyCopySweep",
args : {
    copyId : "_0"//副本ID
    ,num : "_1"//扫荡次数
},
returns : "CopyOperateData",
};
/**
 * 副本解锁关卡
 * @args {id:"关卡ID"}
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_copyUnlock = {
type : "null",
key : "game_copy_copyUnlock",
name : "game.copyHandler.copyUnlock",
args : {
    id : "_0"//关卡ID
},
returns : "CopyOperateData",
};
/**
 * 进入下一关
 * @args
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_enterNextCopy = {
type : "null",
key : "game_copy_enterNextCopy",
name : "game.copyHandler.enterNextCopy",
returns : "CopyOperateData",
};
/**
 * 获取通关奖励
 * @args {id:"奖励ID"}
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_getMapBoxAward = {
type : "null",
key : "game_copy_getMapBoxAward",
name : "game.copyHandler.getMapBoxAward",
args : {
    id : "_0"//奖励ID
},
returns : "CopyOperateData",
};
/**
 * 挑战副本
 * @args {copyId:"副本ID"}
 * @isWorker 1
 * @returns CopyOperateData
 */
public static game_copy_clgCopy = {
type : "null",
key : "game_copy_clgCopy",
name : "game.copyHandler.clgCopy",
args : {
    copyId : "_0"//副本ID
},
returns : "CopyOperateData",
};
/**
 * 领取任务奖励
 * @args {taskId:"任务Id"}
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getTaskAward = {
type : "null",
key : "game_task_getTaskAward",
name : "game.taskHandler.getTaskAward",
args : {
    taskId : "_0"//任务Id
},
returns : "TaskOperateData",
};
/**
 * 领取日常任务奖励
 * @args {dailyId:"日常任务Id"}
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getDailyAward = {
type : "null",
key : "game_task_getDailyAward",
name : "game.taskHandler.getDailyAward",
args : {
    dailyId : "_0"//日常任务Id
},
returns : "TaskOperateData",
};
/**
 * 领取活跃度宝箱
 * @args {chestId:"活跃度宝箱Id"}
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getLivenessChest = {
type : "null",
key : "game_task_getLivenessChest",
name : "game.taskHandler.getLivenessChest",
args : {
    chestId : "_0"//活跃度宝箱Id
},
returns : "TaskOperateData",
};
/**
 * 领取进阶之路奖励
 * @args {id:"任务Id"}
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getAdvanceReward = {
type : "null",
key : "game_task_getAdvanceReward",
name : "game.taskHandler.getAdvanceReward",
args : {
    id : "_0"//任务Id
},
returns : "TaskOperateData",
};
/**
 * 领取勇者之证周任务奖励
 * @args {id:"任务Id"}
 * @type warrior
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getWarriorWeekReward = {
type : "warrior",
key : "game_task_getWarriorWeekReward",
name : "game.taskHandler.getWarriorWeekReward",
args : {
    id : "_0"//任务Id
},
returns : "TaskOperateData",
};
/**
 * 领取勇者之证月任务奖励
 * @args {id:"任务Id"}
 * @type warrior
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getWarriorMonthReward = {
type : "warrior",
key : "game_task_getWarriorMonthReward",
name : "game.taskHandler.getWarriorMonthReward",
args : {
    id : "_0"//任务Id
},
returns : "TaskOperateData",
};
/**
 * 领取勇者之证等级奖励
 * @args {id:"奖励Id"}
 * @type warrior
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getWarriorLevelAward = {
type : "warrior",
key : "game_task_getWarriorLevelAward",
name : "game.taskHandler.getWarriorLevelAward",
args : {
    id : "_0"//奖励Id
},
returns : "TaskOperateData",
};
/**
 * 领取勇者之证进阶奖励
 * @args {id:"奖励Id"}
 * @type warrior
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getWarriorAdvanceAward = {
type : "warrior",
key : "game_task_getWarriorAdvanceAward",
name : "game.taskHandler.getWarriorAdvanceAward",
args : {
    id : "_0"//奖励Id
},
returns : "TaskOperateData",
};
/**
 * 购买勇者之证等级
 * @args {level:"级数"}
 * @type warrior
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_buyWarriorLevel = {
type : "warrior",
key : "game_task_buyWarriorLevel",
name : "game.taskHandler.buyWarriorLevel",
args : {
    level : "_0"//级数
},
returns : "TaskOperateData",
};
/**
 * 领取勇者之证进阶周礼包
 * @args
 * @type warrior
 * @isWorker 1
 * @returns TaskOperateData
 */
public static game_task_getWarriorAdvanceWeekAward = {
type : "warrior",
key : "game_task_getWarriorAdvanceWeekAward",
name : "game.taskHandler.getWarriorAdvanceWeekAward",
returns : "TaskOperateData",
};
/**
 * 获取邮件列表
 * @args
 * @type mail
 * @isWorker 1
 * @returns MailOperateData
 */
public static game_mail_mailList = {
type : "mail",
key : "game_mail_mailList",
name : "game.mailHandler.mailList",
returns : "MailOperateData",
};
/**
 * 更新邮件状态
 * @args {id:"邮件Id"}
 * @type mail
 * @isWorker 1
 * @returns MailOperateData
 */
public static game_mail_mailUpdateState = {
type : "mail",
key : "game_mail_mailUpdateState",
name : "game.mailHandler.mailUpdateState",
args : {
    id : "_0"//邮件Id
},
returns : "MailOperateData",
};
/**
 * 领取邮件
 * @args {id:"邮件id"}
 * @type mail
 * @isWorker 1
 * @returns MailOperateData
 */
public static game_mail_mailGet = {
type : "mail",
key : "game_mail_mailGet",
name : "game.mailHandler.mailGet",
args : {
    id : "_0"//邮件id
},
returns : "MailOperateData",
};
/**
 * 领取删除
 * @args {id:"邮件id"}
 * @type mail
 * @isWorker 1
 * @returns MailOperateData
 */
public static game_mail_mailDelete = {
type : "mail",
key : "game_mail_mailDelete",
name : "game.mailHandler.mailDelete",
args : {
    id : "_0"//邮件id
},
returns : "MailOperateData",
};
/**
 * 购买挑战次数
 * @args {count:"购买次数"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static game_arena_buyBattleCnt = {
type : "arena",
key : "game_arena_buyBattleCnt",
name : "game.arenaHandler.buyBattleCnt",
args : {
    count : "_0"//购买次数
},
returns : "ArenaOperateData",
};
/**
 * 竞技场清除挑战cd
 * @args 
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static game_arena_clearArenaCd = {
type : "arena",
key : "game_arena_clearArenaCd",
name : "game.arenaHandler.clearArenaCd",
returns : "ArenaOperateData",
};
/**
 * 竞技场战斗开始
 * @args {targetRank:"挑战目标的排名", targetId:"挑战目标的玩家ID(机器人则为null)", selfRank:"自己的排名"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static game_arena_battleStart = {
type : "arena",
key : "game_arena_battleStart",
name : "game.arenaHandler.battleStart",
args : {
    targetRank : "_0"//挑战目标的排名
    ,targetId : "_1"//挑战目标的玩家ID(机器人则为null)
    ,selfRank : "_2"//自己的排名
},
returns : "ArenaOperateData",
};
/**
 * 竞技场翻牌
 * @args {idx:"牌的序号(1,2,3)"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static game_arena_turnOverCard = {
type : "arena",
key : "game_arena_turnOverCard",
name : "game.arenaHandler.turnOverCard",
args : {
    idx : "_0"//牌的序号(1,2,3)
},
returns : "ArenaOperateData",
};
/**
 * 竞技场购买翻牌道具
 * @args {idx:"牌的序号(1,2,3)"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static game_arena_buyCardItems = {
type : "arena",
key : "game_arena_buyCardItems",
name : "game.arenaHandler.buyCardItems",
args : {
    idx : "_0"//牌的序号(1,2,3)
},
returns : "ArenaOperateData",
};
/**
 * 竞技场扫荡
 * @args {targetRank:"挑战目标的排名", targetId:"挑战目标的玩家ID(机器人则为null)", selfRank:"自己的排名"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static game_arena_arenaSweep = {
type : "arena",
key : "game_arena_arenaSweep",
name : "game.arenaHandler.arenaSweep",
args : {
    targetRank : "_0"//挑战目标的排名
    ,targetId : "_1"//挑战目标的玩家ID(机器人则为null)
    ,selfRank : "_2"//自己的排名
},
returns : "ArenaOperateData",
};
/**
 * 刷新挑战玩家列表
 * @args
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static center_arena_refreshClgList = {
type : "arena",
key : "center_arena_refreshClgList",
name : "center.arenaHandler.refreshClgList",
returns : "ArenaOperateData",
};
/**
 * 观察竞技场玩家阵容
 * @args {obPlayerId:"观察的玩家ID"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static center_arena_observeArenaPlayer = {
type : "arena",
key : "center_arena_observeArenaPlayer",
name : "center.arenaHandler.observeArenaPlayer",
args : {
    obPlayerId : "_0"//观察的玩家ID
},
returns : "ArenaOperateData",
};
/**
 * 获取防守记录
 * @args 
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static center_arena_getBattleRecords = {
type : "arena",
key : "center_arena_getBattleRecords",
name : "center.arenaHandler.getBattleRecords",
returns : "ArenaOperateData",
};
/**
 * 获取竞技场战报
 * @args {idx:"观看的战报在列表里的序号"}
 * @type arena
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static center_arena_getBattleReport = {
type : "arena",
key : "center_arena_getBattleReport",
name : "center.arenaHandler.getBattleReport",
args : {
    idx : "_0"//观看的战报在列表里的序号
},
returns : "ArenaOperateData",
};
/**
 * 获取竞技场排行榜
 * @args
 * @type rank
 * @isWorker 1
 * @returns ArenaOperateData
 */
public static center_arena_getArenaRankList = {
type : "rank",
key : "center_arena_getArenaRankList",
name : "center.arenaHandler.getArenaRankList",
returns : "ArenaOperateData",
};
/**
 * 删除好友
 * @args {playerId:"玩家Id"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_delete = {
type : "friend",
key : "friend_friend_delete",
name : "friend.friendHandler.delete",
args : {
    playerId : "_0"//玩家Id
},
returns : "FriendOperateData",
};
/**
 * 好友赠送
 * @args {playerId:"玩家Id"}
 * @type friend
 * @isWorker 1
 * @returns PointOperateData
 */
public static friend_friend_give = {
type : "friend",
key : "friend_friend_give",
name : "friend.friendHandler.give",
args : {
    playerId : "_0"//玩家Id
},
returns : "PointOperateData",
};
/**
 * 推荐好友
 * @args
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_recommend = {
type : "friend",
key : "friend_friend_recommend",
name : "friend.friendHandler.recommend",
returns : "FriendOperateData",
};
/**
 * 查找好友
 * @args {name:"玩家名字"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_find = {
type : "friend",
key : "friend_friend_find",
name : "friend.friendHandler.find",
args : {
    name : "_0"//玩家名字
},
returns : "FriendOperateData",
};
/**
 * 好友申请
 * @args {playerId:"玩家Id"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_apply = {
type : "friend",
key : "friend_friend_apply",
name : "friend.friendHandler.apply",
args : {
    playerId : "_0"//玩家Id
},
returns : "FriendOperateData",
};
/**
 * 好友申请操作
 * @args {playerId:"玩家Id",opt_type:"0同意1拒绝"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_apply_opt = {
type : "friend",
key : "friend_friend_apply_opt",
name : "friend.friendHandler.apply_opt",
args : {
    playerId : "_0"//玩家Id
    ,opt_type : "_1"//0同意1拒绝
},
returns : "FriendOperateData",
};
/**
 * 获取好友列表
 * @args
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_list = {
type : "friend",
key : "friend_friend_list",
name : "friend.friendHandler.list",
returns : "FriendOperateData",
};
/**
 * 获取好友申请列表
 * @args
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_apply_list = {
type : "friend",
key : "friend_friend_apply_list",
name : "friend.friendHandler.apply_list",
returns : "FriendOperateData",
};
/**
 * 领取友情点
 * @args {playerId:"玩家ID"}
 * @type friend
 * @isWorker 1
 * @returns PointOperateData
 */
public static friend_friend_pointGet = {
type : "friend",
key : "friend_friend_pointGet",
name : "friend.friendHandler.pointGet",
args : {
    playerId : "_0"//玩家ID
},
returns : "PointOperateData",
};
/**
 * 拉黑
 * @args {playerId:"玩家ID"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_pullBlack = {
type : "friend",
key : "friend_friend_pullBlack",
name : "friend.friendHandler.pullBlack",
args : {
    playerId : "_0"//玩家ID
},
returns : "FriendOperateData",
};
/**
 * 拉白
 * @args {playerId:"玩家ID"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_pullWhite = {
type : "friend",
key : "friend_friend_pullWhite",
name : "friend.friendHandler.pullWhite",
args : {
    playerId : "_0"//玩家ID
},
returns : "FriendOperateData",
};
/**
 * 好友一键申请
 * @args {playerIds:"玩家Id数组"}
 * @type friend
 * @isWorker 1
 * @returns FriendOperateData
 */
public static friend_friend_oneKeyApply = {
type : "friend",
key : "friend_friend_oneKeyApply",
name : "friend.friendHandler.oneKeyApply",
args : {
    playerIds : "_0"//玩家Id数组
},
returns : "FriendOperateData",
};
/**
 * 获取集市列表
 * @args
 * @type market
 * @isWorker 1
 * @returns MarketOperateData
 */
public static game_market_list = {
type : "market",
key : "game_market_list",
name : "game.marketHandler.list",
returns : "MarketOperateData",
};
/**
 * 刷新集市列表
 * @args
 * @type market
 * @isWorker 1
 * @returns MarketOperateData
 */
public static game_market_refresh = {
type : "market",
key : "game_market_refresh",
name : "game.marketHandler.refresh",
returns : "MarketOperateData",
};
/**
 * 购买集市商品
 * @args {id:"集市商品id"}
 * @type market
 * @isWorker 1
 * @returns MarketOperateData
 */
public static game_market_buy = {
type : "market",
key : "game_market_buy",
name : "game.marketHandler.buy",
args : {
    id : "_0"//集市商品id
},
returns : "MarketOperateData",
};
/**
 * 获取商店列表
 * @args {type:"商店类型"}
 * @type shop
 * @isWorker 1
 * @returns ShopOperateData
 */
public static game_shop_list = {
type : "shop",
key : "game_shop_list",
name : "game.shopHandler.list",
args : {
    type : "_0"//商店类型
},
returns : "ShopOperateData",
};
/**
 * 商品购买
 * @args {id:"商品id", num:"购买数量"}
 * @type shop
 * @isWorker 1
 * @returns ShopOperateData
 */
public static game_shop_buy = {
type : "shop",
key : "game_shop_buy",
name : "game.shopHandler.buy",
args : {
    id : "_0"//商品id
    ,num : "_1"//购买数量
},
returns : "ShopOperateData",
};
/**
 * 特殊购买
 * @args {id:"购买物品ID"}
 * @type shop
 * @isWorker 1
 * @returns ShopOperateData
 */
public static game_shop_specialItemBuy = {
type : "shop",
key : "game_shop_specialItemBuy",
name : "game.shopHandler.specialItemBuy",
args : {
    id : "_0"//购买物品ID
},
returns : "ShopOperateData",
};
/**
 * 金币兑换
 * @args
 * @type shop
 * @isWorker 1
 * @returns ShopOperateData
 */
public static game_shop_goldBuy = {
type : "shop",
key : "game_shop_goldBuy",
name : "game.shopHandler.goldBuy",
returns : "ShopOperateData",
};
/**
 * 创建公会 
 * @args {name:"公会名字", level:"等级", auto:"自动加入", head:"头像ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_create = {
type : "guild",
key : "guild_guild_create",
name : "guild.guildHandler.create",
args : {
    name : "_0"//公会名字
    ,level : "_1"//等级
    ,auto : "_2"//自动加入
    ,head : "_3"//头像ID
},
returns : "GuildOperateData",
};
/**
 * 申请加入
 * @args {guildId:"公会Id"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_apply = {
type : "guild",
key : "guild_guild_apply",
name : "guild.guildHandler.apply",
args : {
    guildId : "_0"//公会Id
},
returns : "GuildOperateData",
};
/**
 * 取消申请加入
 * @args {guildId:"公会Id"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_apply_cancel = {
type : "guild",
key : "guild_guild_apply_cancel",
name : "guild.guildHandler.apply_cancel",
args : {
    guildId : "_0"//公会Id
},
returns : "GuildOperateData",
};
/**
 * 公会申请操作
 * @args {playerId:"玩家Id",type:"0同意1拒绝"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_apply_opt = {
type : "guild",
key : "guild_guild_apply_opt",
name : "guild.guildHandler.apply_opt",
args : {
    playerId : "_0"//玩家Id
    ,type : "_1"//0同意1拒绝
},
returns : "GuildOperateData",
};
/**
 * 获取公会列表
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_list = {
type : "guild",
key : "guild_guild_list",
name : "guild.guildHandler.list",
returns : "GuildOperateData",
};
/**
 * 获取公会申请列表
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_apply_list = {
type : "guild",
key : "guild_guild_apply_list",
name : "guild.guildHandler.apply_list",
returns : "GuildOperateData",
};
/**
 * 获取公会成员列表
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_member_list = {
type : "guild",
key : "guild_guild_member_list",
name : "guild.guildHandler.member_list",
returns : "GuildOperateData",
};
/**
 * 入会设置
 * @args {level:"限制等级",auto:"自动加入"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_set = {
type : "guild",
key : "guild_guild_set",
name : "guild.guildHandler.set",
args : {
    level : "_0"//限制等级
    ,auto : "_1"//自动加入
},
returns : "GuildOperateData",
};
/**
 * 头像设置
 * @args {head:"头像ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_setHead = {
type : "guild",
key : "guild_guild_setHead",
name : "guild.guildHandler.setHead",
args : {
    head : "_0"//头像ID
},
returns : "GuildOperateData",
};
/**
 * 公告修改
 * @args {notice:"公告内容"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_notice_modify = {
type : "guild",
key : "guild_guild_notice_modify",
name : "guild.guildHandler.notice_modify",
args : {
    notice : "_0"//公告内容
},
returns : "GuildOperateData",
};
/**
 * 公会捐赠
 * @args {id:"捐赠ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_donate = {
type : "guild",
key : "guild_guild_donate",
name : "guild.guildHandler.donate",
args : {
    id : "_0"//捐赠ID
},
returns : "GuildOperateData",
};
/**
 * 退出公会
 * @args {playerId:"被踢玩家id"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_quit = {
type : "guild",
key : "guild_guild_quit",
name : "guild.guildHandler.quit",
args : {
    playerId : "_0"//被踢玩家id
},
returns : "GuildOperateData",
};
/**
 * 解散公会
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_dissolve = {
type : "guild",
key : "guild_guild_dissolve",
name : "guild.guildHandler.dissolve",
returns : "GuildOperateData",
};
/**
 * 任命
 * @args {playerId:"玩家id", job:"职位"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_appoint = {
type : "guild",
key : "guild_guild_appoint",
name : "guild.guildHandler.appoint",
args : {
    playerId : "_0"//玩家id
    ,job : "_1"//职位
},
returns : "GuildOperateData",
};
/**
 * 公会搜索
 * @args {name:"名字"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_find = {
type : "guild",
key : "guild_guild_find",
name : "guild.guildHandler.find",
args : {
    name : "_0"//名字
},
returns : "GuildOperateData",
};
/**
 * 获取自己公会信息
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_info = {
type : "guild",
key : "guild_guild_info",
name : "guild.guildHandler.info",
returns : "GuildOperateData",
};
/**
 * 获取公会等级排行信息
 * @args
 * @type rank
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_levelRankList = {
type : "rank",
key : "guild_guild_levelRankList",
name : "guild.guildHandler.levelRankList",
returns : "GuildOperateData",
};
/**
 * 获取公会副本排行信息
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_copyRankList = {
type : "guild",
key : "guild_guild_copyRankList",
name : "guild.guildHandler.copyRankList",
returns : "GuildOperateData",
};
/**
 * 获取排行榜首页
 * @args
 * @type rank
 * @isWorker 1
 * @returns RankOperateData
 */
public static guild_guild_getRankTopList = {
type : "rank",
key : "guild_guild_getRankTopList",
name : "guild.guildHandler.getRankTopList",
returns : "RankOperateData",
};
/**
 * 公会篡位
 * @args
 * @type rank
 * @isWorker 1
 * @returns RankOperateData
 */
public static guild_guild_guildUsurp = {
type : "rank",
key : "guild_guild_guildUsurp",
name : "guild.guildHandler.guildUsurp",
returns : "RankOperateData",
};
/**
 * 发布招募消息
 * @args {level:"限制等级",auto:"自动加入"}
 * @type guild
 * @isWorker 1
 * @returns GuildOperateData
 */
public static guild_guild_sendGuildRecruitNotice = {
type : "guild",
key : "guild_guild_sendGuildRecruitNotice",
name : "guild.guildHandler.sendGuildRecruitNotice",
args : {
    level : "_0"//限制等级
    ,auto : "_1"//自动加入
},
returns : "GuildOperateData",
};
/**
 * 发送聊天
 * @args {channel:"频道", type:"类型", content:"内容", receiveId:"接收者id"}
 * @type chat
 * @isWorker 1
 * @returns ChatOperateData
 */
public static chat_chat_send = {
type : "chat",
key : "chat_chat_send",
name : "chat.chatHandler.send",
args : {
    channel : "_0"//频道
    ,type : "_1"//类型
    ,content : "_2"//内容
    ,receiveId : "_3"//接收者id
},
returns : "ChatOperateData",
};
/**
 * 获取聊天列表
 * @args {channel:"类型",receiveId:"私聊对象id"}
 * @type
 * @isWorker 1
 * @returns ChatOperateData
 */
public static chat_chat_list = {
type : "null",
key : "chat_chat_list",
name : "chat.chatHandler.list",
args : {
    channel : "_0"//类型
    ,receiveId : "_1"//私聊对象id
},
returns : "ChatOperateData",
};
/**
 * 新手引导
 * @args {guideStep:"引导步数", guideWeakStep:"弱引导步数"}
 * @isWorker 1
 * @returns GuideOperateData
 */
public static game_guide_getGuideAward = {
type : "null",
key : "game_guide_getGuideAward",
name : "game.guideHandler.getGuideAward",
args : {
    guideStep : "_0"//引导步数
    ,guideWeakStep : "_1"//弱引导步数
},
returns : "GuideOperateData",
};
/**
 * 跳过新手引导
 * @args {guideStep:"引导步数"}
 * @isWorker 1
 * @returns GuideOperateData
 */
public static game_guide_jumpGuide = {
type : "null",
key : "game_guide_jumpGuide",
name : "game.guideHandler.jumpGuide",
args : {
    guideStep : "_0"//引导步数
},
returns : "GuideOperateData",
};
/**
 * GM命令
 * @args {content:"内容"}
 * @isWorker 1
 * @returns GmOperateData
 */
public static game_gm_command = {
type : "null",
key : "game_gm_command",
name : "game.gmHandler.command",
args : {
    content : "_0"//内容
},
returns : "GmOperateData",
};
/**
 * 每月签到
 * @args
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_dailySignIn = {
type : "welfare",
key : "game_welfare_dailySignIn",
name : "game.welfareHandler.dailySignIn",
returns : "WelfareOperateData",
};
/**
 * 每日签到补签
 * @args
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_dailySignInSupply = {
type : "welfare",
key : "game_welfare_dailySignInSupply",
name : "game.welfareHandler.dailySignInSupply",
returns : "WelfareOperateData",
};
/**
 * 累计签到
 * @args {id:"领取id"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_totalSignIn = {
type : "welfare",
key : "game_welfare_totalSignIn",
name : "game.welfareHandler.totalSignIn",
args : {
    id : "_0"//领取id
},
returns : "WelfareOperateData",
};
/**
 * 登录礼包
 * @args {id:"领取id"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_loginGiftPack = {
type : "welfare",
key : "game_welfare_loginGiftPack",
name : "game.welfareHandler.loginGiftPack",
args : {
    id : "_0"//领取id
},
returns : "WelfareOperateData",
};
/**
 * 等级礼包
 * @args {id:"领取id"}
 * @type levelAward
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_levelGiftPack = {
type : "levelAward",
key : "game_welfare_levelGiftPack",
name : "game.welfareHandler.levelGiftPack",
args : {
    id : "_0"//领取id
},
returns : "WelfareOperateData",
};
/**
 * 领取等级基金奖励
 * @args {id:"奖励id"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getLevelFundReward = {
type : "welfare",
key : "game_welfare_getLevelFundReward",
name : "game.welfareHandler.getLevelFundReward",
args : {
    id : "_0"//奖励id
},
returns : "WelfareOperateData",
};
/**
 * 首充礼包
 * @args {id:"领取id", day:"天数"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_firstRecharge = {
type : "welfare",
key : "game_welfare_firstRecharge",
name : "game.welfareHandler.firstRecharge",
args : {
    id : "_0"//领取id
    ,day : "_1"//天数
},
returns : "WelfareOperateData",
};
/**
 * 激活码兑换
 * @args {code:"激活码"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_activationCode = {
type : "welfare",
key : "game_welfare_activationCode",
name : "game.welfareHandler.activationCode",
args : {
    code : "_0"//激活码
},
returns : "WelfareOperateData",
};
/**
 * 特权礼包
 * @args {id:"礼包id"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_privilegeGiftPack = {
type : "welfare",
key : "game_welfare_privilegeGiftPack",
name : "game.welfareHandler.privilegeGiftPack",
args : {
    id : "_0"//礼包id
},
returns : "WelfareOperateData",
};
/**
 * 月卡奖励
 * @args
 * @type monthCard
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getMonthCardAward = {
type : "monthCard",
key : "game_welfare_getMonthCardAward",
name : "game.welfareHandler.getMonthCardAward",
returns : "WelfareOperateData",
};
/**
 * 终身卡奖励
 * @args
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getLifelongCardAward = {
type : "welfare",
key : "game_welfare_getLifelongCardAward",
name : "game.welfareHandler.getLifelongCardAward",
returns : "WelfareOperateData",
};
/**
 * 每日签到奖励
 * @args {id:"奖励ID", type:"类型（1：登录，2：VIP，3：充值）"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_everyDaySignIn = {
type : "welfare",
key : "game_welfare_everyDaySignIn",
name : "game.welfareHandler.everyDaySignIn",
args : {
    id : "_0"//奖励ID
    ,type : "_1"//类型（1：登录，2：VIP，3：充值）
},
returns : "WelfareOperateData",
};
/**
 * 实名认证奖励
 * @args
 * @type realNameAuth
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getAutonymAward = {
type : "realNameAuth",
key : "game_welfare_getAutonymAward",
name : "game.welfareHandler.getAutonymAward",
returns : "WelfareOperateData",
};
/**
 * 在线奖励
 * @args {id:"奖励ID"}
 * @type onlineAward
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getOnlineAward = {
type : "onlineAward",
key : "game_welfare_getOnlineAward",
name : "game.welfareHandler.getOnlineAward",
args : {
    id : "_0"//奖励ID
},
returns : "WelfareOperateData",
};
/**
 * 设置手机号码
 * @args {number:"手机号码"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_setMobileNumber = {
type : "welfare",
key : "game_welfare_setMobileNumber",
name : "game.welfareHandler.setMobileNumber",
args : {
    number : "_0"//手机号码
},
returns : "WelfareOperateData",
};
/**
 * 获取绑定手机奖励
 * @args
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getBindMobileAward = {
type : "welfare",
key : "game_welfare_getBindMobileAward",
name : "game.welfareHandler.getBindMobileAward",
returns : "WelfareOperateData",
};
/**
 * 下载微端奖励
 * @args
 * @type microClient
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getDownloadApkAward = {
type : "microClient",
key : "game_welfare_getDownloadApkAward",
name : "game.welfareHandler.getDownloadApkAward",
returns : "WelfareOperateData",
};
/**
 * 超级会员奖励
 * @args
 * @type superVip
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getSuperVipAward = {
type : "superVip",
key : "game_welfare_getSuperVipAward",
name : "game.welfareHandler.getSuperVipAward",
returns : "WelfareOperateData",
};
/**
 * 更新实名信息
 * @args {fcm:"防沉迷（0不防沉迷，1防沉迷）", shiming:"实名（0未实名，1实名）"}
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_updateRealName = {
type : "welfare",
key : "game_welfare_updateRealName",
name : "game.welfareHandler.updateRealName",
args : {
    fcm : "_0"//防沉迷（0不防沉迷，1防沉迷）
    ,shiming : "_1"//实名（0未实名，1实名）
},
returns : "WelfareOperateData",
};
/**
 * 领取周基金奖励
 * @args {id:"奖励ID"}
 * @type weekFund
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getWeekFundAward = {
type : "weekFund",
key : "game_welfare_getWeekFundAward",
name : "game.welfareHandler.getWeekFundAward",
args : {
    id : "_0"//奖励ID
},
returns : "WelfareOperateData",
};
/**
 * 领取每日福利
 * @args
 * @type welfare
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getDailyWelfare = {
type : "welfare",
key : "game_welfare_getDailyWelfare",
name : "game.welfareHandler.getDailyWelfare",
returns : "WelfareOperateData",
};
/**
 * 领取充值福利
 * @args
 * @type rechargeRebate
 * @isWorker 1
 * @returns WelfareOperateData
 */
public static game_welfare_getRechargeRebate = {
type : "rechargeRebate",
key : "game_welfare_getRechargeRebate",
name : "game.welfareHandler.getRechargeRebate",
returns : "WelfareOperateData",
};
/**
 * 获取公会副本信息
 * @args {id:"副本ID"}
 * @type guildCopy
 * @isWorker 1
 * @returns GuildCopyOperateData
 */
public static guild_guildCopy_copyInfo = {
type : "guildCopy",
key : "guild_guildCopy_copyInfo",
name : "guild.guildCopyHandler.copyInfo",
args : {
    id : "_0"//副本ID
},
returns : "GuildCopyOperateData",
};
/**
 * 获取副本通关奖励信息
 * @args
 * @type guildCopy
 * @isWorker 1
 * @returns GuildCopyOperateData
 */
public static guild_guildCopy_rewardInfo = {
type : "guildCopy",
key : "guild_guildCopy_rewardInfo",
name : "guild.guildCopyHandler.rewardInfo",
returns : "GuildCopyOperateData",
};
/**
 * 公会副本战斗开始
 * @args {id:"副本Id"}
 * @type guildCopy
 * @isWorker 1
 * @returns GuildCopyOperateData
 */
public static guild_guildCopy_copyBattleStart = {
type : "guildCopy",
key : "guild_guildCopy_copyBattleStart",
name : "guild.guildCopyHandler.copyBattleStart",
args : {
    id : "_0"//副本Id
},
returns : "GuildCopyOperateData",
};
/**
 * 公会副本战斗结算
 * @args {id:"副本Id", damageInfo:"怪物伤害信息"}
 * @type guildCopy
 * @isWorker 1
 * @returns GuildCopyOperateData
 */
public static guild_guildCopy_copyBattleEnd = {
type : "guildCopy",
key : "guild_guildCopy_copyBattleEnd",
name : "guild.guildCopyHandler.copyBattleEnd",
args : {
    id : "_0"//副本Id
    ,damageInfo : "_1"//怪物伤害信息
},
returns : "GuildCopyOperateData",
};
/**
 * 获取活动列表
 * @args
 * @type activity
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getActivityList = {
type : "activity",
key : "game_activity_getActivityList",
name : "game.activityHandler.getActivityList",
returns : "ActivityOperateData",
};
/**
 * 获取活动详细信息
 * @args {id:"活动id"}
 * @type activity
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getActivityInfo = {
type : "activity",
key : "game_activity_getActivityInfo",
name : "game.activityHandler.getActivityInfo",
args : {
    id : "_0"//活动id
},
returns : "ActivityOperateData",
};
/**
 * 领取活动奖励
 * @args {id:"奖励id", num:"奖励次数"}
 * @type activity
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getActivityReward = {
type : "activity",
key : "game_activity_getActivityReward",
name : "game.activityHandler.getActivityReward",
args : {
    id : "_0"//奖励id
    ,num : "_1"//奖励次数
},
returns : "ActivityOperateData",
};
/**
 * 更新活动条件次数
 * @args {id:"活动类型"}
 * @type activity
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_updateActivityCondCount = {
type : "activity",
key : "game_activity_updateActivityCondCount",
name : "game.activityHandler.updateActivityCondCount",
args : {
    id : "_0"//活动类型
},
returns : "ActivityOperateData",
};
/**
 * 领取新手狂欢七天活动奖励
 * @args {id:"奖励id", num:"奖励次数"}
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getSevenDayReward = {
type : "null",
key : "game_activity_getSevenDayReward",
name : "game.activityHandler.getSevenDayReward",
args : {
    id : "_0"//奖励id
    ,num : "_1"//奖励次数
},
returns : "ActivityOperateData",
};
/**
 * 领取新手狂欢七天活动累计奖励
 * @args {id:"奖励id"}
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getSevenDayExtraReward = {
type : "null",
key : "game_activity_getSevenDayExtraReward",
name : "game.activityHandler.getSevenDayExtraReward",
args : {
    id : "_0"//奖励id
},
returns : "ActivityOperateData",
};
/**
 * 更新新手狂欢七天活动完成次数
 * @args
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_updateSevenDayCondCount = {
type : "null",
key : "game_activity_updateSevenDayCondCount",
name : "game.activityHandler.updateSevenDayCondCount",
returns : "ActivityOperateData",
};
/**
 * 分享成功
 * @args
 * @type share
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_shareSucc = {
type : "share",
key : "game_activity_shareSucc",
name : "game.activityHandler.shareSucc",
returns : "ActivityOperateData",
};
/**
 * 领取首次分享奖励
 * @args
 * @type share
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getFirstShareAward = {
type : "share",
key : "game_activity_getFirstShareAward",
name : "game.activityHandler.getFirstShareAward",
returns : "ActivityOperateData",
};
/**
 * 领取分享奖励
 * @args {id:"奖励id"}
 * @type share
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getShareAward = {
type : "share",
key : "game_activity_getShareAward",
name : "game.activityHandler.getShareAward",
args : {
    id : "_0"//奖励id
},
returns : "ActivityOperateData",
};
/**
 * 购买限时召唤道具
 * @args {type:"限时召唤类型"}
 * @type timeLimitBuy
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_summonBuy = {
type : "timeLimitBuy",
key : "game_activity_summonBuy",
name : "game.activityHandler.summonBuy",
args : {
    type : "_0"//限时召唤类型
},
returns : "ActivityOperateData",
};
/**
 * 领取限时召唤宝箱
 * @args {id:"宝箱id"}
 * @type timeLimitBuy
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getSummonChests = {
type : "timeLimitBuy",
key : "game_activity_getSummonChests",
name : "game.activityHandler.getSummonChests",
args : {
    id : "_0"//宝箱id
},
returns : "ActivityOperateData",
};
/**
 * 获取限时团购信息
 * @args
 * @type timeLimitBuy
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getGroupBuyInfo = {
type : "timeLimitBuy",
key : "game_activity_getGroupBuyInfo",
name : "game.activityHandler.getGroupBuyInfo",
returns : "ActivityOperateData",
};
/**
 * 购买限时团购道具
 * @args {tpltId:"团购模板id"}
 * @type timeLimitBuy
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_groupBuy = {
type : "timeLimitBuy",
key : "game_activity_groupBuy",
name : "game.activityHandler.groupBuy",
args : {
    tpltId : "_0"//团购模板id
},
returns : "ActivityOperateData",
};
/**
 * 获取全服首充人数
 * @args
 * @type
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getRechargePlayerNum = {
type : "null",
key : "game_activity_getRechargePlayerNum",
name : "game.activityHandler.getRechargePlayerNum",
returns : "ActivityOperateData",
};
/**
 * 领取开服团购奖励
 * @args {id:"奖励id"}
 * @type
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static game_activity_getOpenSvrGroupBuyAward = {
type : "null",
key : "game_activity_getOpenSvrGroupBuyAward",
name : "game.activityHandler.getOpenSvrGroupBuyAward",
args : {
    id : "_0"//奖励id
},
returns : "ActivityOperateData",
};
/**
 * 获取限时召唤排行榜
 * @args
 * @type activity
 * @isWorker 1
 * @returns ActivityOperateData
 */
public static center_activity_getSummonRankList = {
type : "activity",
key : "center_activity_getSummonRankList",
name : "center.activityHandler.getSummonRankList",
returns : "ActivityOperateData",
};
/**
 * 领取副本通关奖励
 * @args {id:"副本章节ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildCopyOperateData
 */
public static game_guild_getCopyReward = {
type : "guild",
key : "game_guild_getCopyReward",
name : "game.guildHandler.getCopyReward",
args : {
    id : "_0"//副本章节ID
},
returns : "GuildCopyOperateData",
};
/**
 * 公会技能升级
 * @args {id:"技能ID（AB:A为类型B为属性类型）"}
 * @type guild
 * @isWorker 1
 * @returns GuildSkillOperateData
 */
public static game_guild_upgradeSkill = {
type : "guild",
key : "game_guild_upgradeSkill",
name : "game.guildHandler.upgradeSkill",
args : {
    id : "_0"//技能ID（AB:A为类型B为属性类型）
},
returns : "GuildSkillOperateData",
};
/**
 * 公会技能重置
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildSkillOperateData
 */
public static game_guild_resetSkill = {
type : "guild",
key : "game_guild_resetSkill",
name : "game.guildHandler.resetSkill",
returns : "GuildSkillOperateData",
};
/**
 * 领取公会战宝箱奖励
 * @args {grade:"段位ID", pos:"宝箱位置ID(第一个从0开始)"}
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static game_guild_getGuildWarBoxReward = {
type : "guild",
key : "game_guild_getGuildWarBoxReward",
name : "game.guildHandler.getGuildWarBoxReward",
args : {
    grade : "_0"//段位ID
    ,pos : "_1"//宝箱位置ID(第一个从0开始)
},
returns : "GuildWarOperateData",
};
/**
 * 公会援助
 * @args {id:"援助索引ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static game_guild_addGuildHelpNum = {
type : "guild",
key : "game_guild_addGuildHelpNum",
name : "game.guildHandler.addGuildHelpNum",
args : {
    id : "_0"//援助索引ID
},
returns : "GuildHelpOperateData",
};
/**
 * 发送求援公告
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static game_guild_sendGuildHelpNotice = {
type : "guild",
key : "game_guild_sendGuildHelpNotice",
name : "game.guildHandler.sendGuildHelpNotice",
returns : "GuildHelpOperateData",
};
/**
 * 更新充值数据
 * @args
 * @isWorker 1
 * @returns RechargeOperateData
 */
public static game_recharge_updateRecharge = {
type : "null",
key : "game_recharge_updateRecharge",
name : "game.rechargeHandler.updateRecharge",
returns : "RechargeOperateData",
};
/**
 * 获取排行榜
 * @args {rankType:"排行榜类型"}
 * @type rank
 * @isWorker 1
 * @returns RankOperateData
 */
public static game_rank_getRankList = {
type : "rank",
key : "game_rank_getRankList",
name : "game.rankHandler.getRankList",
args : {
    rankType : "_0"//排行榜类型
},
returns : "RankOperateData",
};
/**
 * 膜拜
 * @args {rankType:"排行榜类型"}
 * @type rank
 * @isWorker 1
 * @returns RankOperateData
 */
public static game_rank_worship = {
type : "rank",
key : "game_rank_worship",
name : "game.rankHandler.worship",
args : {
    rankType : "_0"//排行榜类型
},
returns : "RankOperateData",
};
/**
 * 获取跨服排行榜
 * @args {rankType:"排行榜类型"}
 * @type rank
 * @isWorker 1
 * @returns RankOperateData
 */
public static game_rank_getWorldRankList = {
type : "rank",
key : "game_rank_getWorldRankList",
name : "game.rankHandler.getWorldRankList",
args : {
    rankType : "_0"//排行榜类型
},
returns : "RankOperateData",
};
/**
 * 远征神灵操作
 * @args {godId:"神灵ID", opType:"操作类型1：回复血量，2：复活"}
 * @type expedition
 * @isWorker 1
 * @returns ExpeditionOperateData
 */
public static game_expedition_expeditionGodOperate = {
type : "expedition",
key : "game_expedition_expeditionGodOperate",
name : "game.expeditionHandler.expeditionGodOperate",
args : {
    godId : "_0"//神灵ID
    ,opType : "_1"//操作类型1：回复血量，2：复活
},
returns : "ExpeditionOperateData",
};
/**
 * 获取挑战者信息
 * @args
 * @type expedition
 * @isWorker 1
 * @returns ExpeditionOperateData
 */
public static game_expedition_getChallengerInfo = {
type : "expedition",
key : "game_expedition_getChallengerInfo",
name : "game.expeditionHandler.getChallengerInfo",
returns : "ExpeditionOperateData",
};
/**
 * 挑战远征结束
 * @args {id:"当前挑战关卡id", selfHpInfo:"伤害信息（key：神灵id, value: 剩余血量万分比）", damageInfo:"伤害信息（key：神灵id, value: 剩余血量）"}
 * @type expedition
 * @isWorker 1
 * @returns ExpeditionOperateData
 */
public static game_expedition_expeditionBattleEnd = {
type : "expedition",
key : "game_expedition_expeditionBattleEnd",
name : "game.expeditionHandler.expeditionBattleEnd",
args : {
    id : "_0"//当前挑战关卡id
    ,selfHpInfo : "_1"//伤害信息（key：神灵id, value: 剩余血量万分比）
    ,damageInfo : "_2"//伤害信息（key：神灵id, value: 剩余血量）
},
returns : "ExpeditionOperateData",
};
/**
 * 获取宝箱奖励ID
 * @args {id:"关卡id"}
 * @type expedition
 * @isWorker 1
 * @returns ExpeditionOperateData
 */
public static game_expedition_getBoxReward = {
type : "expedition",
key : "game_expedition_getBoxReward",
name : "game.expeditionHandler.getBoxReward",
args : {
    id : "_0"//关卡id
},
returns : "ExpeditionOperateData",
};
/**
 * 获取登录公告列表
 * @args
 * @isWorker 1
 * @returns NoticeOperateData
 */
public static chat_notice_getNoticelist = {
type : "null",
key : "chat_notice_getNoticelist",
name : "chat.noticeHandler.getNoticelist",
returns : "NoticeOperateData",
};
/**
 * 获取跑马灯列表
 * @args
 * @isWorker 1
 * @returns NoticeOperateData
 */
public static chat_notice_getNewslist = {
type : "null",
key : "chat_notice_getNewslist",
name : "chat.noticeHandler.getNewslist",
returns : "NoticeOperateData",
};
/**
 * 查询玩家信息
 * @args {playerId:"查询玩家ID"}
 * @type
 * @isWorker 1
 * @returns QueryOperateData
 */
public static center_query_queryPlayer = {
type : "null",
key : "center_query_queryPlayer",
name : "center.queryHandler.queryPlayer",
args : {
    playerId : "_0"//查询玩家ID
},
returns : "QueryOperateData",
};
/**
 * 查询世界服玩家信息
 * @args {playerId:"查询玩家ID"}
 * @type
 * @isWorker 1
 * @returns QueryOperateData
 */
public static center_query_queryWorldPlayer = {
type : "null",
key : "center_query_queryWorldPlayer",
name : "center.queryHandler.queryWorldPlayer",
args : {
    playerId : "_0"//查询玩家ID
},
returns : "QueryOperateData",
};
/**
 * 获取世界boss信息
 * @args
 * @type worldBoss
 * @isWorker 1
 * @returns WorldBossOperateData
 */
public static center_boss_getWorldBossInfo = {
type : "worldBoss",
key : "center_boss_getWorldBossInfo",
name : "center.worldBossHandler.getWorldBossInfo",
returns : "WorldBossOperateData",
};
/**
 * 挑战世界boss开始
 * @args {id:"bossId"}
 * @type worldBoss
 * @isWorker 1
 * @returns WorldBossOperateData
 */
public static center_boss_worldBossBattleStart = {
type : "worldBoss",
key : "center_boss_worldBossBattleStart",
name : "center.worldBossHandler.worldBossBattleStart",
args : {
    id : "_0"//bossId
},
returns : "WorldBossOperateData",
};
/**
 * 挑战世界boss结束
 * @args {id:"bossId", damage:"boss伤害值"}
 * @type worldBoss
 * @isWorker 1
 * @returns WorldBossOperateData
 */
public static center_boss_worldBossBattleEnd = {
type : "worldBoss",
key : "center_boss_worldBossBattleEnd",
name : "center.worldBossHandler.worldBossBattleEnd",
args : {
    id : "_0"//bossId
    ,damage : "_1"//boss伤害值
},
returns : "WorldBossOperateData",
};
/**
 * 获取世界boss排行榜
 * @args {id:"bossId"}
 * @type worldBoss
 * @isWorker 1
 * @returns WorldBossOperateData
 */
public static center_boss_getRankList = {
type : "worldBoss",
key : "center_boss_getRankList",
name : "center.worldBossHandler.getRankList",
args : {
    id : "_0"//bossId
},
returns : "WorldBossOperateData",
};
/**
 * 神器解锁
 * @args {id:"神器id"}
 * @type artifact
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_artifactActivate = {
type : "artifact",
key : "game_artifact_artifactActivate",
name : "game.artifactHandler.artifactActivate",
args : {
    id : "_0"//神器id
},
returns : "ArtifactOperateData",
};
/**
 * 神器强化
 * @args {id:"神器id"}
 * @type artifact
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_artifactStrength = {
type : "artifact",
key : "game_artifact_artifactStrength",
name : "game.artifactHandler.artifactStrength",
args : {
    id : "_0"//神器id
},
returns : "ArtifactOperateData",
};
/**
 * 神器技能升级
 * @args {id:"神器id"}
 * @type artifact
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_artifactSkillUpgrade = {
type : "artifact",
key : "game_artifact_artifactSkillUpgrade",
name : "game.artifactHandler.artifactSkillUpgrade",
args : {
    id : "_0"//神器id
},
returns : "ArtifactOperateData",
};
/**
 * 神器穿戴卸下
 * @args {type:"布阵类型", id:"神器id（id为0表示卸下，不为0表示穿戴或替换）"}
 * @type artifact
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_ajustLineupArtifact = {
type : "artifact",
key : "game_artifact_ajustLineupArtifact",
name : "game.artifactHandler.ajustLineupArtifact",
args : {
    type : "_0"//布阵类型
    ,id : "_1"//神器id（id为0表示卸下，不为0表示穿戴或替换）
},
returns : "ArtifactOperateData",
};
/**
 * 神器洗练
 * @args {id:"神器id", type:"洗练类型", lockFlag:"锁定标志"}
 * @type artifactBaptize
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_baptize = {
type : "artifactBaptize",
key : "game_artifact_baptize",
name : "game.artifactHandler.baptize",
args : {
    id : "_0"//神器id
    ,type : "_1"//洗练类型
    ,lockFlag : "_2"//锁定标志
},
returns : "ArtifactOperateData",
};
/**
 * 神器更换洗练属性
 * @args {id: "神器id"}
 * @type artifactBaptize
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_baptizeSave = {
type : "artifactBaptize",
key : "game_artifact_baptizeSave",
name : "game.artifactHandler.baptizeSave",
args : {
    id : "_0"//神器id
},
returns : "ArtifactOperateData",
};
/**
 * 神器附魔
 * @args {id:"神器id"}
 * @type artifactEnchant
 * @isWorker 1
 * @returns ArtifactOperateData
 */
public static game_artifact_enchant = {
type : "artifactEnchant",
key : "game_artifact_enchant",
name : "game.artifactHandler.enchant",
args : {
    id : "_0"//神器id
},
returns : "ArtifactOperateData",
};
/**
 * 获取玩家商队护送被劫记录信息
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_getRecordList = {
type : "escort",
key : "game_escort_getRecordList",
name : "game.escortHandler.getRecordList",
returns : "EscortOperateData",
};
/**
 * 快速完成护送
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_quickEscort = {
type : "escort",
key : "game_escort_quickEscort",
name : "game.escortHandler.quickEscort",
returns : "EscortOperateData",
};
/**
 * 刷新品质
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_refreshQuality = {
type : "escort",
key : "game_escort_refreshQuality",
name : "game.escortHandler.refreshQuality",
returns : "EscortOperateData",
};
/**
 * 一键刷新橙色
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_refreshOrange = {
type : "escort",
key : "game_escort_refreshOrange",
name : "game.escortHandler.refreshOrange",
returns : "EscortOperateData",
};
/**
 * 商队护送
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_tradeEscort = {
type : "escort",
key : "game_escort_tradeEscort",
name : "game.escortHandler.tradeEscort",
returns : "EscortOperateData",
};
/**
 * 抢占商队战斗开始
 * @args {playerId:"玩家ID"}
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_robTradeBattleStart = {
type : "escort",
key : "game_escort_robTradeBattleStart",
name : "game.escortHandler.robTradeBattleStart",
args : {
    playerId : "_0"//玩家ID
},
returns : "EscortOperateData",
};
/**
 * 抢占商队战斗结算
 * @args {playerId:"玩家ID", isWin:"是否获胜"}
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_robTradeBattleEnd = {
type : "escort",
key : "game_escort_robTradeBattleEnd",
name : "game.escortHandler.robTradeBattleEnd",
args : {
    playerId : "_0"//玩家ID
    ,isWin : "_1"//是否获胜
},
returns : "EscortOperateData",
};
/**
 * 领取商队护送奖励
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static game_escort_receiveAwards = {
type : "escort",
key : "game_escort_receiveAwards",
name : "game.escortHandler.receiveAwards",
returns : "EscortOperateData",
};
/**
 * 获取商队护送列表
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static center_escort_getEscortList = {
type : "escort",
key : "center_escort_getEscortList",
name : "center.escortHandler.getEscortList",
returns : "EscortOperateData",
};
/**
 * 获取玩家商队护送信息
 * @args {playerId:"玩家ID"}
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static center_escort_getTargetInfo = {
type : "escort",
key : "center_escort_getTargetInfo",
name : "center.escortHandler.getTargetInfo",
args : {
    playerId : "_0"//玩家ID
},
returns : "EscortOperateData",
};
/**
 * 更新玩家商队护送信息
 * @args
 * @type escort
 * @isWorker 1
 * @returns EscortOperateData
 */
public static center_escort_getSelfInfo = {
type : "escort",
key : "center_escort_getSelfInfo",
name : "center.escortHandler.getSelfInfo",
returns : "EscortOperateData",
};
/**
 * 矿点占领
 * @args {mineIndex:"矿点索引"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineOccupy = {
type : "mine",
key : "game_mine_mineOccupy",
name : "game.mineHandler.mineOccupy",
args : {
    mineIndex : "_0"//矿点索引
},
returns : "MineOperateData",
};
/**
 * 矿点抢占战斗开始
 * @args {mineIndex:"矿点索引", playerId:"当前占领玩家id"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineOccupyStart = {
type : "mine",
key : "game_mine_mineOccupyStart",
name : "game.mineHandler.mineOccupyStart",
args : {
    mineIndex : "_0"//矿点索引
    ,playerId : "_1"//当前占领玩家id
},
returns : "MineOperateData",
};
/**
 * 矿点抢占战斗结算
 * @args {mineIndex:"矿点索引", isWin:"是否获胜"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineOccupyEnd = {
type : "mine",
key : "game_mine_mineOccupyEnd",
name : "game.mineHandler.mineOccupyEnd",
args : {
    mineIndex : "_0"//矿点索引
    ,isWin : "_1"//是否获胜
},
returns : "MineOperateData",
};
/**
 * 矿点掠夺战斗开始
 * @args {mineIndex:"矿点索引", playerId:"当前占领玩家id"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineRobStart = {
type : "mine",
key : "game_mine_mineRobStart",
name : "game.mineHandler.mineRobStart",
args : {
    mineIndex : "_0"//矿点索引
    ,playerId : "_1"//当前占领玩家id
},
returns : "MineOperateData",
};
/**
 * 矿点掠夺战斗结算
 * @args {mineIndex:"矿点索引", isWin:"是否获胜"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineRobEnd = {
type : "mine",
key : "game_mine_mineRobEnd",
name : "game.mineHandler.mineRobEnd",
args : {
    mineIndex : "_0"//矿点索引
    ,isWin : "_1"//是否获胜
},
returns : "MineOperateData",
};
/**
 * 获取矿点被抢占列表
 * @args
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineRobList = {
type : "mine",
key : "game_mine_mineRobList",
name : "game.mineHandler.mineRobList",
returns : "MineOperateData",
};
/**
 * 获取矿点记录列表
 * @args
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineRecordList = {
type : "mine",
key : "game_mine_mineRecordList",
name : "game.mineHandler.mineRecordList",
returns : "MineOperateData",
};
/**
 * 更新矿点记录状态
 * @args {id:"矿点记录Id"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_recordMineUpdateState = {
type : "mine",
key : "game_mine_recordMineUpdateState",
name : "game.mineHandler.recordMineUpdateState",
args : {
    id : "_0"//矿点记录Id
},
returns : "MineOperateData",
};
/**
 * 领取矿点记录奖励
 * @args {id:"矿点记录id"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static game_mine_mineRecordGet = {
type : "mine",
key : "game_mine_mineRecordGet",
name : "game.mineHandler.mineRecordGet",
args : {
    id : "_0"//矿点记录id
},
returns : "MineOperateData",
};
/**
 * 获取自己占领矿点信息
 * @args
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static center_mine_getMyMineInfo = {
type : "mine",
key : "center_mine_getMyMineInfo",
name : "center.mineHandler.getMyMineInfo",
returns : "MineOperateData",
};
/**
 * 获取岛屿矿点列表
 * @args {islandId:"岛屿ID"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static center_mine_getMineList = {
type : "mine",
key : "center_mine_getMineList",
name : "center.mineHandler.getMineList",
args : {
    islandId : "_0"//岛屿ID
},
returns : "MineOperateData",
};
/**
 * 获取目标矿点信息
 * @args {mineIndex:"矿点索引"}
 * @type mine
 * @isWorker 1
 * @returns MineOperateData
 */
public static center_mine_getTargetMineInfo = {
type : "mine",
key : "center_mine_getTargetMineInfo",
name : "center.mineHandler.getTargetMineInfo",
args : {
    mineIndex : "_0"//矿点索引
},
returns : "MineOperateData",
};
/**
 * 刷新探险任务
 * @args
 * @type adventure
 * @isWorker 1
 * @returns AdventureOperateData
 */
public static game_adventure_refresh = {
type : "adventure",
key : "game_adventure_refresh",
name : "game.adventureHandler.refresh",
returns : "AdventureOperateData",
};
/**
 * 探险派遣
 * @args {idx:"探险任务序号", godIds:"派遣的神灵集合"}
 * @type adventure
 * @isWorker 1
 * @returns AdventureOperateData
 */
public static game_adventure_dispatch = {
type : "adventure",
key : "game_adventure_dispatch",
name : "game.adventureHandler.dispatch",
args : {
    idx : "_0"//探险任务序号
    ,godIds : "_1"//派遣的神灵集合
},
returns : "AdventureOperateData",
};
/**
 * 探险加速
 * @args {advtKey:"探险任务实例id"}
 * @type adventure
 * @isWorker 1
 * @returns AdventureOperateData
 */
public static game_adventure_speedUp = {
type : "adventure",
key : "game_adventure_speedUp",
name : "game.adventureHandler.speedUp",
args : {
    advtKey : "_0"//探险任务实例id
},
returns : "AdventureOperateData",
};
/**
 * 领取探险奖励
 * @args {advtKey:"探险任务实例id"}
 * @type adventure
 * @isWorker 1
 * @returns AdventureOperateData
 */
public static game_adventure_getAward = {
type : "adventure",
key : "game_adventure_getAward",
name : "game.adventureHandler.getAward",
args : {
    advtKey : "_0"//探险任务实例id
},
returns : "AdventureOperateData",
};
/**
 * 结算迷雾森林
 * @args {floor:"层数"}
 * @type forest
 * @isWorker 1
 * @returns ForestOperateData
 */
public static game_forest_settleForest = {
type : "forest",
key : "game_forest_settleForest",
name : "game.forestHandler.settleForest",
args : {
    floor : "_0"//层数
},
returns : "ForestOperateData",
};
/**
 * 获取迷雾森林宝箱奖励
 * @args {floor:"层数"}
 * @type forest
 * @isWorker 1
 * @returns ForestOperateData
 */
public static game_forest_getChestAward = {
type : "forest",
key : "game_forest_getChestAward",
name : "game.forestHandler.getChestAward",
args : {
    floor : "_0"//层数
},
returns : "ForestOperateData",
};
/**
 * 扫荡迷雾森林
 * @args
 * @type forest
 * @isWorker 1
 * @returns ForestOperateData
 */
public static game_forest_sweepForest = {
type : "forest",
key : "game_forest_sweepForest",
name : "game.forestHandler.sweepForest",
returns : "ForestOperateData",
};
/**
 * 获取当前赛季信息
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getGuildWarSession = {
type : "guild",
key : "guild_guildWar_getGuildWarSession",
name : "guild.guildWarHandler.getGuildWarSession",
returns : "GuildWarOperateData",
};
/**
 * 公会战报名
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_guildWarReg = {
type : "guild",
key : "guild_guildWar_guildWarReg",
name : "guild.guildWarHandler.guildWarReg",
returns : "GuildWarOperateData",
};
/**
 * 获取公会战匹配信息
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getGuildWarMatchInfo = {
type : "guild",
key : "guild_guildWar_getGuildWarMatchInfo",
name : "guild.guildWarHandler.getGuildWarMatchInfo",
returns : "GuildWarOperateData",
};
/**
 * 公会战挑战开始
 * @args {playerId:"玩家ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_guildWarBattleStart = {
type : "guild",
key : "guild_guildWar_guildWarBattleStart",
name : "guild.guildWarHandler.guildWarBattleStart",
args : {
    playerId : "_0"//玩家ID
},
returns : "GuildWarOperateData",
};
/**
 * 公会战挑战结算
 * @args {playerId:"玩家ID", hpInfo:"伤害信息（key：神灵id, value: 剩余血量）"}
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_guildWarBattleEnd = {
type : "guild",
key : "guild_guildWar_guildWarBattleEnd",
name : "guild.guildWarHandler.guildWarBattleEnd",
args : {
    playerId : "_0"//玩家ID
    ,hpInfo : "_1"//伤害信息（key：神灵id, value: 剩余血量）
},
returns : "GuildWarOperateData",
};
/**
 * 获取小组列表
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getGroupList = {
type : "guild",
key : "guild_guildWar_getGroupList",
name : "guild.guildWarHandler.getGroupList",
returns : "GuildWarOperateData",
};
/**
 * 获取王者排名
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getGradeList = {
type : "guild",
key : "guild_guildWar_getGradeList",
name : "guild.guildWarHandler.getGradeList",
returns : "GuildWarOperateData",
};
/**
 * 获取宝箱信息
 * @args {grade:"段位ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getBoxList = {
type : "guild",
key : "guild_guildWar_getBoxList",
name : "guild.guildWarHandler.getBoxList",
args : {
    grade : "_0"//段位ID
},
returns : "GuildWarOperateData",
};
/**
 * 获取本公会成员排行信息
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getMemberRankList = {
type : "guild",
key : "guild_guildWar_getMemberRankList",
name : "guild.guildWarHandler.getMemberRankList",
returns : "GuildWarOperateData",
};
/**
 * 获取赛季排行信息
 * @args {session:"赛季ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildWarOperateData
 */
public static guild_guildWar_getSessionRankList = {
type : "guild",
key : "guild_guildWar_getSessionRankList",
name : "guild.guildWarHandler.getSessionRankList",
args : {
    session : "_0"//赛季ID
},
returns : "GuildWarOperateData",
};
/**
 * 神灵转盘购买
 * @args {id:"神灵转盘id", count:"购买次数(1和10)"}
 * @type luckTurnTable
 * @isWorker 1
 * @returns LuckOperateData
 */
public static game_luck_buyluckGod = {
type : "luckTurnTable",
key : "game_luck_buyluckGod",
name : "game.luckHandler.buyluckGod",
args : {
    id : "_0"//神灵转盘id
    ,count : "_1"//购买次数(1和10)
},
returns : "LuckOperateData",
};
/**
 * 装备转盘购买
 * @args {id:"装备转盘id", count:"购买次数(1和10)"}
 * @type luckTurnTable
 * @isWorker 1
 * @returns LuckOperateData
 */
public static game_luck_buyluckEquip = {
type : "luckTurnTable",
key : "game_luck_buyluckEquip",
name : "game.luckHandler.buyluckEquip",
args : {
    id : "_0"//装备转盘id
    ,count : "_1"//购买次数(1和10)
},
returns : "LuckOperateData",
};
/**
 * 领取装备转盘额外奖励
 * @args {id:"装备转盘id"}
 * @type luckTurnTable
 * @isWorker 1
 * @returns LuckOperateData
 */
public static game_luck_getluckEquipAward = {
type : "luckTurnTable",
key : "game_luck_getluckEquipAward",
name : "game.luckHandler.getluckEquipAward",
args : {
    id : "_0"//装备转盘id
},
returns : "LuckOperateData",
};
/**
 * 神器转盘购买
 * @args {id:"神器转盘id", count:"购买次数(1和10)"}
 * @type luckTurnTable
 * @isWorker 1
 * @returns LuckOperateData
 */
public static game_luck_buyluckArt = {
type : "luckTurnTable",
key : "game_luck_buyluckArt",
name : "game.luckHandler.buyluckArt",
args : {
    id : "_0"//神器转盘id
    ,count : "_1"//购买次数(1和10)
},
returns : "LuckOperateData",
};
/**
 * 宝物转盘购买
 * @args {id:"宝物转盘id", count:"购买次数(1和10)"}
 * @type luckTurnTable
 * @isWorker 1
 * @returns LuckOperateData
 */
public static game_luck_buyluckTreasure = {
type : "luckTurnTable",
key : "game_luck_buyluckTreasure",
name : "game.luckHandler.buyluckTreasure",
args : {
    id : "_0"//宝物转盘id
    ,count : "_1"//购买次数(1和10)
},
returns : "LuckOperateData",
};
/**
 * 领取宝物转盘额外奖励
 * @args {id:"宝物转盘id"}
 * @type luckTurnTable
 * @isWorker 1
 * @returns LuckOperateData
 */
public static game_luck_getluckTreasureAward = {
type : "luckTurnTable",
key : "game_luck_getluckTreasureAward",
name : "game.luckHandler.getluckTreasureAward",
args : {
    id : "_0"//宝物转盘id
},
returns : "LuckOperateData",
};
/**
 * 获取神灵转盘记录
 * @args
 * @type activity
 * @isWorker 1
 * @returns LuckOperateData
 */
public static center_luck_getLuckGodRecord = {
type : "activity",
key : "center_luck_getLuckGodRecord",
name : "center.luckHandler.getLuckGodRecord",
returns : "LuckOperateData",
};
/**
 * 获取装备转盘记录
 * @args
 * @type activity
 * @isWorker 1
 * @returns LuckOperateData
 */
public static center_luck_getLuckEquipRecord = {
type : "activity",
key : "center_luck_getLuckEquipRecord",
name : "center.luckHandler.getLuckEquipRecord",
returns : "LuckOperateData",
};
/**
 * 获取宝物转盘记录
 * @args
 * @type activity
 * @isWorker 1
 * @returns LuckOperateData
 */
public static center_luck_getLuckTreasureRecord = {
type : "activity",
key : "center_luck_getLuckTreasureRecord",
name : "center.luckHandler.getLuckTreasureRecord",
returns : "LuckOperateData",
};
/**
 * 获取排行榜
 * @args {id:"排行榜ID"}
 * @type rank
 * @isWorker 1
 * @returns RankOperateData
 */
public static center_global_getRankList = {
type : "rank",
key : "center_global_getRankList",
name : "center.globalHandler.getRankList",
args : {
    id : "_0"//排行榜ID
},
returns : "RankOperateData",
};
/**
 * 荣耀之战报名
 * @args
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static game_honour_reg = {
type : "honour",
key : "game_honour_reg",
name : "game.honourHandler.reg",
returns : "HonourOperateData",
};
/**
 * 押注
 * @args {recordId:"记录ID", stage:"阶段", playerId:"玩家ID"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static game_honour_honourWarBet = {
type : "honour",
key : "game_honour_honourWarBet",
name : "game.honourHandler.honourWarBet",
args : {
    recordId : "_0"//记录ID
    ,stage : "_1"//阶段
    ,playerId : "_2"//玩家ID
},
returns : "HonourOperateData",
};
/**
 * 获取当前赛季信息
 * @args
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getHonourWarSession = {
type : "honour",
key : "center_honour_getHonourWarSession",
name : "center.honourHandler.getHonourWarSession",
returns : "HonourOperateData",
};
/**
 * 获取战斗回放
 * @args {recordId:"记录ID", stage:"阶段"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getHonourWarPlayback = {
type : "honour",
key : "center_honour_getHonourWarPlayback",
name : "center.honourHandler.getHonourWarPlayback",
args : {
    recordId : "_0"//记录ID
    ,stage : "_1"//阶段
},
returns : "HonourOperateData",
};
/**
 * 获取我的比赛列表
 * @args
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getHonourWarMyList = {
type : "honour",
key : "center_honour_getHonourWarMyList",
name : "center.honourHandler.getHonourWarMyList",
returns : "HonourOperateData",
};
/**
 * 获取本届比赛列表
 * @args {stage:"阶段"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getSessionList = {
type : "honour",
key : "center_honour_getSessionList",
name : "center.honourHandler.getSessionList",
args : {
    stage : "_0"//阶段
},
returns : "HonourOperateData",
};
/**
 * 获取上届比赛列表
 * @args {stage:"阶段"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getLastSessionList = {
type : "honour",
key : "center_honour_getLastSessionList",
name : "center.honourHandler.getLastSessionList",
args : {
    stage : "_0"//阶段
},
returns : "HonourOperateData",
};
/**
 * 获取玩家信息
 * @args {recordId:"记录ID", stage:"阶段", playerId:"玩家ID"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getHonourWarPlayerInfo = {
type : "honour",
key : "center_honour_getHonourWarPlayerInfo",
name : "center.honourHandler.getHonourWarPlayerInfo",
args : {
    recordId : "_0"//记录ID
    ,stage : "_1"//阶段
    ,playerId : "_2"//玩家ID
},
returns : "HonourOperateData",
};
/**
 * 获取比赛信息
 * @args {type:"赛季（0为本届，1为上届）",stage:"阶段"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getSessionListInfo = {
type : "honour",
key : "center_honour_getSessionListInfo",
name : "center.honourHandler.getSessionListInfo",
args : {
    type : "_0"//赛季（0为本届，1为上届）
    ,stage : "_1"//阶段
},
returns : "HonourOperateData",
};
/**
 * 获取荣耀之战信息
 * @args {type:"赛季（0为本届，1为上届）", stage:"阶段", pos:"位置"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getHonourWarInfo = {
type : "honour",
key : "center_honour_getHonourWarInfo",
name : "center.honourHandler.getHonourWarInfo",
args : {
    type : "_0"//赛季（0为本届，1为上届）
    ,stage : "_1"//阶段
    ,pos : "_2"//位置
},
returns : "HonourOperateData",
};
/**
 * 获取玩家信息
 * @args {type:"赛季（0为本届，1为上届）",stage:"阶段",pos:"位置", playerId:"玩家ID"}
 * @type honour
 * @isWorker 1
 * @returns HonourOperateData
 */
public static center_honour_getHonourWarPlayerData = {
type : "honour",
key : "center_honour_getHonourWarPlayerData",
name : "center.honourHandler.getHonourWarPlayerData",
args : {
    type : "_0"//赛季（0为本届，1为上届）
    ,stage : "_1"//阶段
    ,pos : "_2"//位置
    ,playerId : "_3"//玩家ID
},
returns : "HonourOperateData",
};
/**
 * 获取匹配赛信息
 * @args
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static game_match_getMatchInfo = {
type : "match",
key : "game_match_getMatchInfo",
name : "game.matchHandler.getMatchInfo",
returns : "MatchOperateData",
};
/**
 * 刷新挑战玩家列表
 * @args
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static game_match_refreshClgList = {
type : "match",
key : "game_match_refreshClgList",
name : "game.matchHandler.refreshClgList",
returns : "MatchOperateData",
};
/**
 * 购买挑战次数
 * @args {count:"购买次数"}
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static game_match_buyBattleCnt = {
type : "match",
key : "game_match_buyBattleCnt",
name : "game.matchHandler.buyBattleCnt",
args : {
    count : "_0"//购买次数
},
returns : "MatchOperateData",
};
/**
 * 匹配赛战斗开始
 * @args {targetIdx:"挑战目标的序号"}
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static game_match_battleStart = {
type : "match",
key : "game_match_battleStart",
name : "game.matchHandler.battleStart",
args : {
    targetIdx : "_0"//挑战目标的序号
},
returns : "MatchOperateData",
};
/**
 * 获取战斗记录
 * @args 
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static game_match_getBattleRecords = {
type : "match",
key : "game_match_getBattleRecords",
name : "game.matchHandler.getBattleRecords",
returns : "MatchOperateData",
};
/**
 * 领取匹配赛挑战宝箱
 * @args {chestId:"宝箱Id"}
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static game_match_getMatchChest = {
type : "match",
key : "game_match_getMatchChest",
name : "game.matchHandler.getMatchChest",
args : {
    chestId : "_0"//宝箱Id
},
returns : "MatchOperateData",
};
/**
 * 观察玩家阵容
 * @args {obPlayerId:"观察的玩家ID"}
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static center_match_observePlayer = {
type : "match",
key : "center_match_observePlayer",
name : "center.matchHandler.observePlayer",
args : {
    obPlayerId : "_0"//观察的玩家ID
},
returns : "MatchOperateData",
};
/**
 * 获取跨服排行榜
 * @args
 * @type rank
 * @isWorker 1
 * @returns MatchOperateData
 */
public static center_match_getWorldRankList = {
type : "rank",
key : "center_match_getWorldRankList",
name : "center.matchHandler.getWorldRankList",
returns : "MatchOperateData",
};
/**
 * 获取本服排行榜
 * @args
 * @type rank
 * @isWorker 1
 * @returns MatchOperateData
 */
public static center_match_getLocalRankList = {
type : "rank",
key : "center_match_getLocalRankList",
name : "center.matchHandler.getLocalRankList",
returns : "MatchOperateData",
};
/**
 * 获取匹配赛战报
 * @args {idx:"观看的战报在列表里的序号"}
 * @type match
 * @isWorker 1
 * @returns MatchOperateData
 */
public static center_match_getBattleReport = {
type : "match",
key : "center_match_getBattleReport",
name : "center.matchHandler.getBattleReport",
args : {
    idx : "_0"//观看的战报在列表里的序号
},
returns : "MatchOperateData",
};
/**
 * 获取队伍列表
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_groupList = {
type : "godDomain",
key : "friend_group_groupList",
name : "friend.groupHandler.groupList",
returns : "GroupOperateData",
};
/**
 * 获取队伍信息
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_getGroupInfo = {
type : "godDomain",
key : "friend_group_getGroupInfo",
name : "friend.groupHandler.getGroupInfo",
returns : "GroupOperateData",
};
/**
 * 创建队伍
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_groupCreate = {
type : "godDomain",
key : "friend_group_groupCreate",
name : "friend.groupHandler.groupCreate",
returns : "GroupOperateData",
};
/**
 * 加入队伍
 * @args {groupId:"队伍Id"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_groupJoin = {
type : "godDomain",
key : "friend_group_groupJoin",
name : "friend.groupHandler.groupJoin",
args : {
    groupId : "_0"//队伍Id
},
returns : "GroupOperateData",
};
/**
 * 退出队伍
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_groupExit = {
type : "godDomain",
key : "friend_group_groupExit",
name : "friend.groupHandler.groupExit",
returns : "GroupOperateData",
};
/**
 * 设置允许加入
 * @args {autoJoin:"加入类型"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_setJoin = {
type : "godDomain",
key : "friend_group_setJoin",
name : "friend.groupHandler.setJoin",
args : {
    autoJoin : "_0"//加入类型
},
returns : "GroupOperateData",
};
/**
 * 设置位置
 * @args {src_pos:"起始位置", dst_pos:"终点位置"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_setPos = {
type : "godDomain",
key : "friend_group_setPos",
name : "friend.groupHandler.setPos",
args : {
    src_pos : "_0"//起始位置
    ,dst_pos : "_1"//终点位置
},
returns : "GroupOperateData",
};
/**
 * 任命队长
 * @args {playerId:"玩家id"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_groupAppoint = {
type : "godDomain",
key : "friend_group_groupAppoint",
name : "friend.groupHandler.groupAppoint",
args : {
    playerId : "_0"//玩家id
},
returns : "GroupOperateData",
};
/**
 * 踢人
 * @args {playerId:"玩家id"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_groupKick = {
type : "godDomain",
key : "friend_group_groupKick",
name : "friend.groupHandler.groupKick",
args : {
    playerId : "_0"//玩家id
},
returns : "GroupOperateData",
};
/**
 * 获取邀请好友列表
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_inviteList = {
type : "godDomain",
key : "friend_group_inviteList",
name : "friend.groupHandler.inviteList",
returns : "GroupOperateData",
};
/**
 * 邀请好友
 * @args {playerId:"玩家id"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_inviteFriend = {
type : "godDomain",
key : "friend_group_inviteFriend",
name : "friend.groupHandler.inviteFriend",
args : {
    playerId : "_0"//玩家id
},
returns : "GroupOperateData",
};
/**
 * 获取邀请列表
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_getInviteList = {
type : "godDomain",
key : "friend_group_getInviteList",
name : "friend.groupHandler.getInviteList",
returns : "GroupOperateData",
};
/**
 * 接受邀请
 * @args {playerId:"邀请玩家id"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_acceptInvite = {
type : "godDomain",
key : "friend_group_acceptInvite",
name : "friend.groupHandler.acceptInvite",
args : {
    playerId : "_0"//邀请玩家id
},
returns : "GroupOperateData",
};
/**
 * 拒绝邀请
 * @args {playerId:"邀请玩家id"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_refuseInvite = {
type : "godDomain",
key : "friend_group_refuseInvite",
name : "friend.groupHandler.refuseInvite",
args : {
    playerId : "_0"//邀请玩家id
},
returns : "GroupOperateData",
};
/**
 * 设置邀请状态
 * @args {playerId:"玩家ID", state:"邀请类型"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_setInvite = {
type : "godDomain",
key : "friend_group_setInvite",
name : "friend.groupHandler.setInvite",
args : {
    playerId : "_0"//玩家ID
    ,state : "_1"//邀请类型
},
returns : "GroupOperateData",
};
/**
 * 获取拒绝邀请列表
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_getRefuseInviteList = {
type : "godDomain",
key : "friend_group_getRefuseInviteList",
name : "friend.groupHandler.getRefuseInviteList",
returns : "GroupOperateData",
};
/**
 * 设置准备
 * @args {state:"准备状态"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_setState = {
type : "godDomain",
key : "friend_group_setState",
name : "friend.groupHandler.setState",
args : {
    state : "_0"//准备状态
},
returns : "GroupOperateData",
};
/**
 * 一键邀请
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_oneKeyInvite = {
type : "godDomain",
key : "friend_group_oneKeyInvite",
name : "friend.groupHandler.oneKeyInvite",
returns : "GroupOperateData",
};
/**
 * 自动匹配队伍
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_autoJoin = {
type : "godDomain",
key : "friend_group_autoJoin",
name : "friend.groupHandler.autoJoin",
returns : "GroupOperateData",
};
/**
 * 取消自动匹配
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_cancelJoin = {
type : "godDomain",
key : "friend_group_cancelJoin",
name : "friend.groupHandler.cancelJoin",
returns : "GroupOperateData",
};
/**
 * 开始战斗
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_startBattle = {
type : "godDomain",
key : "friend_group_startBattle",
name : "friend.groupHandler.startBattle",
returns : "GroupOperateData",
};
/**
 * 获取战斗信息
 * @args {regTime: "开始战斗时间"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_getBattleInfo = {
type : "godDomain",
key : "friend_group_getBattleInfo",
name : "friend.groupHandler.getBattleInfo",
args : {
    regTime : "_0"//开始战斗时间
},
returns : "GroupOperateData",
};
/**
 * 取消匹配
 * @args {regTime: "开始战斗时间"}
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_cancelReg = {
type : "godDomain",
key : "friend_group_cancelReg",
name : "friend.groupHandler.cancelReg",
args : {
    regTime : "_0"//开始战斗时间
},
returns : "GroupOperateData",
};
/**
 * 获取奖励加成信息
 * @args
 * @type godDomain
 * @isWorker 1
 * @returns GroupOperateData
 */
public static friend_group_getRewardAddInfo = {
type : "godDomain",
key : "friend_group_getRewardAddInfo",
name : "friend.groupHandler.getRewardAddInfo",
returns : "GroupOperateData",
};
/**
 * 获取订单信息
 * @args {goodId:"商品ID"}
 * @type
 * @isWorker 1
 * @returns RechargeOperateData
 */
public static center_recharge_getOrderInfo = {
type : "null",
key : "center_recharge_getOrderInfo",
name : "center.rechargeHandler.getOrderInfo",
args : {
    goodId : "_0"//商品ID
},
returns : "RechargeOperateData",
};
/**
 * 摇色子
 * @args {count:"次数"}
 * @type adventure
 * @isWorker 1
 * @returns RiskOperateData
 */
public static game_risk_rollDice = {
type : "adventure",
key : "game_risk_rollDice",
name : "game.riskHandler.rollDice",
args : {
    count : "_0"//次数
},
returns : "RiskOperateData",
};
/**
 * 答题
 * @args {riskKey:"奇遇ID",id:"选项ID"}
 * @type adventure
 * @isWorker 1
 * @returns RiskOperateData
 */
public static game_risk_answer = {
type : "adventure",
key : "game_risk_answer",
name : "game.riskHandler.answer",
args : {
    riskKey : "_0"//奇遇ID
    ,id : "_1"//选项ID
},
returns : "RiskOperateData",
};
/**
 * 猜拳
 * @args {riskKey:"奇遇ID",id:"选项ID"}
 * @type adventure
 * @isWorker 1
 * @returns RiskOperateData
 */
public static game_risk_fingerGuess = {
type : "adventure",
key : "game_risk_fingerGuess",
name : "game.riskHandler.fingerGuess",
args : {
    riskKey : "_0"//奇遇ID
    ,id : "_1"//选项ID
},
returns : "RiskOperateData",
};
/**
 * 猜大小
 * @args {riskKey:"奇遇ID",id:"选项ID"}
 * @type adventure
 * @isWorker 1
 * @returns RiskOperateData
 */
public static game_risk_sizeGuess = {
type : "adventure",
key : "game_risk_sizeGuess",
name : "game.riskHandler.sizeGuess",
args : {
    riskKey : "_0"//奇遇ID
    ,id : "_1"//选项ID
},
returns : "RiskOperateData",
};
/**
 * 比眼力
 * @args {riskKey:"奇遇ID",id:"选项ID"}
 * @type adventure
 * @isWorker 1
 * @returns RiskOperateData
 */
public static game_risk_eyesightGuess = {
type : "adventure",
key : "game_risk_eyesightGuess",
name : "game.riskHandler.eyesightGuess",
args : {
    riskKey : "_0"//奇遇ID
    ,id : "_1"//选项ID
},
returns : "RiskOperateData",
};
/**
 * 不想玩了
 * @args {riskKey:"奇遇ID"}
 * @type adventure
 * @isWorker 1
 * @returns RiskOperateData
 */
public static game_risk_deleteRisk = {
type : "adventure",
key : "game_risk_deleteRisk",
name : "game.riskHandler.deleteRisk",
args : {
    riskKey : "_0"//奇遇ID
},
returns : "RiskOperateData",
};
/**
 * 穿戴宝物
 * @args {godId:"神灵ID", treasureKey:"宝物实例id"}
 * @type treasure
 * @isWorker 1
 * @returns TreasureOperateData
 */
public static game_treasure_wearTreasure = {
type : "treasure",
key : "game_treasure_wearTreasure",
name : "game.treasureHandler.wearTreasure",
args : {
    godId : "_0"//神灵ID
    ,treasureKey : "_1"//宝物实例id
},
returns : "TreasureOperateData",
};
/**
 * 卸下宝物
 * @args {treasureKey:"宝物实例id"}
 * @type treasure
 * @isWorker 1
 * @returns TreasureOperateData
 */
public static game_treasure_dischargeTreasure = {
type : "treasure",
key : "game_treasure_dischargeTreasure",
name : "game.treasureHandler.dischargeTreasure",
args : {
    treasureKey : "_0"//宝物实例id
},
returns : "TreasureOperateData",
};
/**
 * 强化装备
 * @args {treasureKey:"宝物实例id", materialArrs:"宝物材料数组([treasureKey1, ... treasureKeyN])", itemIds:"宝物强化石数组([itemId1, ... itemIdN])"}
 * @type treasure
 * @isWorker 1
 * @returns TreasureOperateData
 */
public static game_treasure_strengthTreasure = {
type : "treasure",
key : "game_treasure_strengthTreasure",
name : "game.treasureHandler.strengthTreasure",
args : {
    treasureKey : "_0"//宝物实例id
    ,materialArrs : "_1"//宝物材料数组([treasureKey1, ... treasureKeyN])
    ,itemIds : "_2"//宝物强化石数组([itemId1, ... itemIdN])
},
returns : "TreasureOperateData",
};
/**
 * 升星宝物
 * @args {treasureKey:"宝物实例id", materialArrs:"宝物材料2维数组([[treasureKey1, ... treasureKeyN],[treasureKey1, ... treasureKeyN]])"}
 * @type treasure
 * @isWorker 1
 * @returns TreasureOperateData
 */
public static game_treasure_riseStarTreasure = {
type : "treasure",
key : "game_treasure_riseStarTreasure",
name : "game.treasureHandler.riseStarTreasure",
args : {
    treasureKey : "_0"//宝物实例id
    ,materialArrs : "_1"//宝物材料2维数组([[treasureKey1, ... treasureKeyN],[treasureKey1, ... treasureKeyN]])
},
returns : "TreasureOperateData",
};
/**
 * 宝物重生
 * @args {treasureKey:"宝物实例id"}
 * @type treasure
 * @isWorker 1
 * @returns TreasureOperateData
 */
public static game_treasure_recastTreasure = {
type : "treasure",
key : "game_treasure_recastTreasure",
name : "game.treasureHandler.recastTreasure",
args : {
    treasureKey : "_0"//宝物实例id
},
returns : "TreasureOperateData",
};
/**
 * 获取宝物重生返还材料
 * @args {treasureKey:"宝物实例id"}
 * @type treasure
 * @isWorker 1
 * @returns TreasureOperateData
 */
public static game_treasure_recastReturnItems = {
type : "treasure",
key : "game_treasure_recastReturnItems",
name : "game.treasureHandler.recastReturnItems",
args : {
    treasureKey : "_0"//宝物实例id
},
returns : "TreasureOperateData",
};
/**
 * 穿戴宝石
 * @args {godId:"神灵ID", slot:"槽位", gemKey:"宝石实例id"}
 * @type gemstone
 * @isWorker 1
 * @returns GemstoneOperateData
 */
public static game_gemstone_wearGemstone = {
type : "gemstone",
key : "game_gemstone_wearGemstone",
name : "game.gemstoneHandler.wearGemstone",
args : {
    godId : "_0"//神灵ID
    ,slot : "_1"//槽位
    ,gemKey : "_2"//宝石实例id
},
returns : "GemstoneOperateData",
};
/**
 * 一键穿戴装备
 * @args {godId:"神灵ID", gemKeys:"穿戴的宝石集合{slot:gemKey}"}
 * @type gemstone
 * @isWorker 1
 * @returns GemstoneOperateData
 */
public static game_gemstone_oneKeyWearGemstone = {
type : "gemstone",
key : "game_gemstone_oneKeyWearGemstone",
name : "game.gemstoneHandler.oneKeyWearGemstone",
args : {
    godId : "_0"//神灵ID
    ,gemKeys : "_1"//穿戴的宝石集合{slot:gemKey}
},
returns : "GemstoneOperateData",
};
/**
 * 卸下宝石
 * @args {gemKey:"宝石实例id"}
 * @type gemstone
 * @isWorker 1
 * @returns GemstoneOperateData
 */
public static game_gemstone_dischargeGemstone = {
type : "gemstone",
key : "game_gemstone_dischargeGemstone",
name : "game.gemstoneHandler.dischargeGemstone",
args : {
    gemKey : "_0"//宝石实例id
},
returns : "GemstoneOperateData",
};
/**
 * 一键卸下宝石
 * @args {godId:"神灵ID"}
 * @type gemstone
 * @isWorker 1
 * @returns GemstoneOperateData
 */
public static game_gemstone_oneKeyDischargeGemstone = {
type : "gemstone",
key : "game_gemstone_oneKeyDischargeGemstone",
name : "game.gemstoneHandler.oneKeyDischargeGemstone",
args : {
    godId : "_0"//神灵ID
},
returns : "GemstoneOperateData",
};
/**
 * 宝石合成
 * @args {id:"合成ID", num:"合成次数"}
 * @type gemstone
 * @isWorker 1
 * @returns GemstoneOperateData
 */
public static game_gemstone_gemstoneCompound = {
type : "gemstone",
key : "game_gemstone_gemstoneCompound",
name : "game.gemstoneHandler.gemstoneCompound",
args : {
    id : "_0"//合成ID
    ,num : "_1"//合成次数
},
returns : "GemstoneOperateData",
};
/**
 * 一键宝石合成
 * @args {level:"合成等级上限", type:"合成类型（0：所有）"}
 * @type gemstone
 * @isWorker 1
 * @returns GemstoneOperateData
 */
public static game_gemstone_oneKeyGemstoneCompound = {
type : "gemstone",
key : "game_gemstone_oneKeyGemstoneCompound",
name : "game.gemstoneHandler.oneKeyGemstoneCompound",
args : {
    level : "_0"//合成等级上限
    ,type : "_1"//合成类型（0：所有）
},
returns : "GemstoneOperateData",
};
/**
 * 公会副本扫荡
 * @args {id:"副本Id"}
 * @type guildCopy
 * @isWorker 1
 * @returns GuildCopyOperateData
 */
public static game_guildCopy_sweepGuildCopy = {
type : "guildCopy",
key : "game_guildCopy_sweepGuildCopy",
name : "game.guildCopyHandler.sweepGuildCopy",
args : {
    id : "_0"//副本Id
},
returns : "GuildCopyOperateData",
};
/**
 * 用户反馈
 * @args {type:"类型", content:"内容"}
 * @isWorker 1
 * @returns ApiOperateData
 */
public static game_api_userQuestion = {
type : "null",
key : "game_api_userQuestion",
name : "game.apiHandler.userQuestion",
args : {
    type : "_0"//类型
    ,content : "_1"//内容
},
returns : "ApiOperateData",
};
/**
 * 公会求援
 * @args {pos:"位置", type:"求援类型", notice:"是否公告"}
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static guild_guildHelp_createGuildHelp = {
type : "guild",
key : "guild_guildHelp_createGuildHelp",
name : "guild.guildHelpHandler.createGuildHelp",
args : {
    pos : "_0"//位置
    ,type : "_1"//求援类型
    ,notice : "_2"//是否公告
},
returns : "GuildHelpOperateData",
};
/**
 * 获取我的公会援助列表
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static guild_guildHelp_getMyGuildHelpList = {
type : "guild",
key : "guild_guildHelp_getMyGuildHelpList",
name : "guild.guildHelpHandler.getMyGuildHelpList",
returns : "GuildHelpOperateData",
};
/**
 * 公会援助列表
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static guild_guildHelp_getGuildHelpList = {
type : "guild",
key : "guild_guildHelp_getGuildHelpList",
name : "guild.guildHelpHandler.getGuildHelpList",
returns : "GuildHelpOperateData",
};
/**
 * 领取公会援助
 * @args {id:"援助索引ID"}
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static guild_guildHelp_getGuildHelpNum = {
type : "guild",
key : "guild_guildHelp_getGuildHelpNum",
name : "guild.guildHelpHandler.getGuildHelpNum",
args : {
    id : "_0"//援助索引ID
},
returns : "GuildHelpOperateData",
};
/**
 * 领取公会援助完成奖励
 * @args
 * @type guild
 * @isWorker 1
 * @returns GuildHelpOperateData
 */
public static guild_guildHelp_getGuildHelpAward = {
type : "guild",
key : "guild_guildHelp_getGuildHelpAward",
name : "guild.guildHelpHandler.getGuildHelpAward",
returns : "GuildHelpOperateData",
};
/**
 * 好友助阵
 * @args {godId:"神灵ID"}
 * @type friend
 * @isWorker 1
 * @returns FriendHelpOperateData
 */
public static friend_friendHelp_createFriendHelp = {
type : "friend",
key : "friend_friendHelp_createFriendHelp",
name : "friend.friendHelpHandler.createFriendHelp",
args : {
    godId : "_0"//神灵ID
},
returns : "FriendHelpOperateData",
};
/**
 * 获取我的好友援助列表
 * @args
 * @type friend
 * @isWorker 1
 * @returns FriendHelpOperateData
 */
public static friend_friendHelp_getMyFriendHelpList = {
type : "friend",
key : "friend_friendHelp_getMyFriendHelpList",
name : "friend.friendHelpHandler.getMyFriendHelpList",
returns : "FriendHelpOperateData",
};
/**
 * 好友援助列表
 * @args
 * @type friend
 * @isWorker 1
 * @returns FriendHelpOperateData
 */
public static friend_friendHelp_getFriendHelpList = {
type : "friend",
key : "friend_friendHelp_getFriendHelpList",
name : "friend.friendHelpHandler.getFriendHelpList",
returns : "FriendHelpOperateData",
};
/**
 * 雇佣好友助阵
 * @args {helpId:"助阵ID"}
 * @type friend
 * @isWorker 1
 * @returns FriendHelpOperateData
 */
public static friend_friendHelp_hireFriendHelp = {
type : "friend",
key : "friend_friendHelp_hireFriendHelp",
name : "friend.friendHelpHandler.hireFriendHelp",
args : {
    helpId : "_0"//助阵ID
},
returns : "FriendHelpOperateData",
};
/**
 * 获取队伍列表
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_groupList = {
type : "groupCopy",
key : "friend_groupCopy_groupList",
name : "friend.groupCopyHandler.groupList",
returns : "GroupCopyOperateData",
};
/**
 * 获取队伍信息
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_getGroupInfo = {
type : "groupCopy",
key : "friend_groupCopy_getGroupInfo",
name : "friend.groupCopyHandler.getGroupInfo",
returns : "GroupCopyOperateData",
};
/**
 * 创建队伍
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_groupCreate = {
type : "groupCopy",
key : "friend_groupCopy_groupCreate",
name : "friend.groupCopyHandler.groupCreate",
returns : "GroupCopyOperateData",
};
/**
 * 加入队伍
 * @args {groupId:"队伍Id"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_groupJoin = {
type : "groupCopy",
key : "friend_groupCopy_groupJoin",
name : "friend.groupCopyHandler.groupJoin",
args : {
    groupId : "_0"//队伍Id
},
returns : "GroupCopyOperateData",
};
/**
 * 退出队伍
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_groupExit = {
type : "groupCopy",
key : "friend_groupCopy_groupExit",
name : "friend.groupCopyHandler.groupExit",
returns : "GroupCopyOperateData",
};
/**
 * 获取申请列表
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_getApplyList = {
type : "groupCopy",
key : "friend_groupCopy_getApplyList",
name : "friend.groupCopyHandler.getApplyList",
returns : "GroupCopyOperateData",
};
/**
 * 操作申请列表
 * @args {playerId:"玩家Id",opt_type:"操作类型见枚举applyOptType"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_applyListOpt = {
type : "groupCopy",
key : "friend_groupCopy_applyListOpt",
name : "friend.groupCopyHandler.applyListOpt",
args : {
    playerId : "_0"//玩家Id
    ,opt_type : "_1"//操作类型见枚举applyOptType
},
returns : "GroupCopyOperateData",
};
/**
 * 设置位置
 * @args {src_pos:"起始位置", dst_pos:"终点位置"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_setPos = {
type : "groupCopy",
key : "friend_groupCopy_setPos",
name : "friend.groupCopyHandler.setPos",
args : {
    src_pos : "_0"//起始位置
    ,dst_pos : "_1"//终点位置
},
returns : "GroupCopyOperateData",
};
/**
 * 任命队长
 * @args {playerId:"玩家id"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_groupAppoint = {
type : "groupCopy",
key : "friend_groupCopy_groupAppoint",
name : "friend.groupCopyHandler.groupAppoint",
args : {
    playerId : "_0"//玩家id
},
returns : "GroupCopyOperateData",
};
/**
 * 踢人
 * @args {playerId:"玩家id"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_groupKick = {
type : "groupCopy",
key : "friend_groupCopy_groupKick",
name : "friend.groupCopyHandler.groupKick",
args : {
    playerId : "_0"//玩家id
},
returns : "GroupCopyOperateData",
};
/**
 * 获取邀请好友列表
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_inviteList = {
type : "groupCopy",
key : "friend_groupCopy_inviteList",
name : "friend.groupCopyHandler.inviteList",
returns : "GroupCopyOperateData",
};
/**
 * 邀请好友
 * @args {playerId:"玩家id"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_inviteFriend = {
type : "groupCopy",
key : "friend_groupCopy_inviteFriend",
name : "friend.groupCopyHandler.inviteFriend",
args : {
    playerId : "_0"//玩家id
},
returns : "GroupCopyOperateData",
};
/**
 * 获取邀请列表
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_getInviteList = {
type : "groupCopy",
key : "friend_groupCopy_getInviteList",
name : "friend.groupCopyHandler.getInviteList",
returns : "GroupCopyOperateData",
};
/**
 * 接受邀请
 * @args {playerId:"邀请玩家id"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_acceptInvite = {
type : "groupCopy",
key : "friend_groupCopy_acceptInvite",
name : "friend.groupCopyHandler.acceptInvite",
args : {
    playerId : "_0"//邀请玩家id
},
returns : "GroupCopyOperateData",
};
/**
 * 拒绝邀请
 * @args {playerId:"邀请玩家id"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_refuseInvite = {
type : "groupCopy",
key : "friend_groupCopy_refuseInvite",
name : "friend.groupCopyHandler.refuseInvite",
args : {
    playerId : "_0"//邀请玩家id
},
returns : "GroupCopyOperateData",
};
/**
 * 设置邀请状态
 * @args {playerId:"玩家ID", state:"邀请类型"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_setInvite = {
type : "groupCopy",
key : "friend_groupCopy_setInvite",
name : "friend.groupCopyHandler.setInvite",
args : {
    playerId : "_0"//玩家ID
    ,state : "_1"//邀请类型
},
returns : "GroupCopyOperateData",
};
/**
 * 获取拒绝邀请列表
 * @args
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_getRefuseInviteList = {
type : "groupCopy",
key : "friend_groupCopy_getRefuseInviteList",
name : "friend.groupCopyHandler.getRefuseInviteList",
returns : "GroupCopyOperateData",
};
/**
 * 开始战斗
 * @args {id:"副本ID"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_startBattle = {
type : "groupCopy",
key : "friend_groupCopy_startBattle",
name : "friend.groupCopyHandler.startBattle",
args : {
    id : "_0"//副本ID
},
returns : "GroupCopyOperateData",
};
/**
 * 获取每章奖励
 * @args {id:"奖励ID"}
 * @type groupCopy
 * @isWorker 1
 * @returns GroupCopyOperateData
 */
public static friend_groupCopy_getChapterAward = {
type : "groupCopy",
key : "friend_groupCopy_getChapterAward",
name : "friend.groupCopyHandler.getChapterAward",
args : {
    id : "_0"//奖励ID
},
returns : "GroupCopyOperateData",
};
}