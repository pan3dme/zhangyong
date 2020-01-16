//+++++++++++++++++公用数据结构 开始+++++++++++++++

exports.NullData = function () {
};

exports.QueryEntryData = function () {
    this.host = null;
    this.port = null;
    this.httpPort = null;
};

exports.EntryData = function () {
    this.base = null;           // 玩家基本数据
    this.isNew = null;          // 是否创建角色
};

exports.OfflineEarnInfo = function () {
    this.afkAward = null;       // 挂机奖励(物品二维数组)
    this.offlineTime = null;    // 离线时间(秒)
};

exports.EnterGameData = function () {
    this.curPlayer = null;      // 玩家登陆数据
    this.offlineEarn = null;    // 离线收益 OfflineEarnInfo
    this.openSvrTime = null;    // 开服时间
    this.signInStartTime = null;// 每轮签到开始时间
    this.guildNum = null;       // 当前公会数量
    this.honourStage = null;     // 荣耀之战本服阶段(>0即开启)
    this.kuafuHonourStage = null;     // 荣耀之战跨服阶段(>0即开启)
    this.rechargePlayerNum = null;     // 全服首充玩家数
    this.guildHelpNum = null;     // 公会援助数
    this.guildHelpCanGetNum = null;     // 公会援助可领取数（大于0说明有可领取）
};

exports.PlayerData = function () {
    this.playerId = null;       // 玩家ID
    this.base = null;           // 玩家基础信息
    this.extend = null;         // 玩家扩展信息
    this.bag = null;            // 背包信息
    this.god = null;            // 神灵信息
    this.currency = null;       // 货币信息
    this.tasks = null;          // 任务信息
    this.welfare = null;        // 福利信息
    this.copy = null;           // 副本信息
    this.adventure = null;      // 探索信息
    this.friend = null;         // 好友信息
};

exports.GodInfo = function () {
    this.templateId = null;     // 神灵模板ID
    this.starLevel = null;      // 星级
    this.degree = null;         // 阶级
	this.level = null;          // 等级
    this.awakenLv = null;       // 觉醒等级 
    this.equipKeys = null;      // 神灵穿戴的装备集合 {1号位：equipKey1, 2号位：equipKey2, 3号位：equipKey3, 4号位：equipKey4}
    this.fuseLevel = null;      // 神灵融魂等级
    this.fuseAttrLevels = null; // 神灵融魂各属性等级
    this.skinId = null;         // 神灵皮肤ID
    this.treasureKeys = null;   // 神灵穿戴的宝物集合 {1号位：treasureKey1}
    this.gemInfo = null;        // 神灵宝石集合 {1号位：gemKey1}
};

exports.TaskInfo = function () {
    this.count = null;
    this.acceptTime = null;
};

exports.DailyInfo = function () {
    this.count = null;
    this.done = null;
};

exports.AdvanceInfo = function () {
    this.count = null;          // 条件次数
    this.reward = null;         // 奖励次数
};

exports.WairrorInfo = function () {
    this.count = null;          // 条件次数
    this.reward = null;         // 奖励次数
};

exports.FriendHelpData = function () {
    this.helpId = null;             // 援助索引ID
    this.force = null;              // 玩家神力
    this.godInfo = null;            // 神灵信息
};

exports.CommonData = function () {
    this.addGods = null;        // 添加的神灵集合 {GodInfo1, ..., GodInfoN}
    this.delGods = null;        // 删除的神灵集合 [神灵ID1, ..., 神灵IDN]
    this.addEquips = null;      // 添加的装备集合 {EquipInfo1, ..., EquipInfoN}
    this.delEquips = null;      // 删除的装备集合 [equipKey1, ..., equipKeyN]
    this.addResource = null;    // 增加的资源 资源类型具体见tb_prop.resTypeKey
    this.costResource = null;   // 消耗的资源 资源类型具体见tb_prop.resTypeKey
    this.addBagItems = null;    // 添加的物品ID集合 {物品ID1:数量1, ..., 物品IDN:数量N}
    this.delBagItems = null;    // 删除的物品ID集合 {物品ID1:数量1, ..., 物品IDN:数量N}
    this.addTimeItems = null;   // 添加的限时物品集合 {TimeItemInfo1, ..., TimeItemInfoN}
    this.delTimeItems = null;   // 删除的限时物品集合 [timeKey1, ..., timeKeyN]
    this.addGodAlbum = null;    // 增加的神灵图鉴信息 [神灵模板ID1, ..., 神灵模板IDN]
    this.addTreasures = null;   // 添加的宝物集合 {TreasureInfo1, ..., TreasureInfoN}
    this.delTreasures = null;   // 删除的宝物集合 [treasureKey1, ..., treasureKeyN]
    this.modifyLimits = null;   // 修改的限制信息集合 {限制类型1次数, ..., 限制类型N次数}
    this.modifyTasks = null;    // 修改的任务信息集合 {TaskInfo1, ..., TaskInfoN}
    this.modifyDailys = null;   // 修改的日常任务信息集合 {DailyInfo1, ..., DailyInfoN}
    this.modifyOverplus = null; // 修改的剩余次数信息集合 {剩余类型1次数, ..., 剩余类型N次数}
    this.modifyEquips = null;   // 修改的装备信息集合 {equipKey1: godId1, ..., equipKeyN: godIdN}
    this.modifyGodEquips = null;// 修改的神灵装备索引集合 {godId1: equips1(1号位：equipKey1, 2号位：equipKey2, 3号位：equipKey3, 4号位：equipKey4), ..., godIdN: equipsN}
    this.modifySevenDays = null;  // 修改的七天条件信息集合 {完成次数1, ..., 完成次数N}
    this.modifyLineups = null;    // 修改的阵容集合 {阵容类型1：阵容1([godId1, godId2, godId3, godId4, godId5]), ..., 阵容类型N：阵容N}
    this.modifyReplyTime = null; // 修改世界boss回复时间
    this.modifyMaxHistoryForce = null;  // 修改最大历史神力值
    this.modifyMineRobReplyTime = null; // 修改矿点掠夺回复时间
    this.modifyCondInfo = null;     // 更新运营活动条件次数
    this.vipLevel = null;           // vip等级
    this.addRechargeNum = null;     // 增加的充值数
    this.modifyForce = null;        // 修改当前神力值
    this.useGodItems = null;        // 使用神灵碎片对应的物品ID和数量{物品ID:数量}
    this.modifyTreasureNum = null;      // 修改的宝物数量集合 {treasureKey1: num1, ..., treasureKeyN: numN}
    this.modifyTreasures = null;        // 修改的宝物信息集合 {treasureKey1: godId1, ..., treasureKeyN: godIdN}
    this.modifyGodTreasures = null;     // 修改的神灵装备索引集合 {godId1: treasureKey1, ..., godIdN: treasureKeyN}
    this.addTreasureBook = null;        // 增加的宝物图鉴信息 [宝物模板ID1, ..., 宝物模板IDN]
    this.modifyAdvanceCount = null;     // 修改的进阶之路完成次数集合 {id1:count1, ..., idN:countN}
    this.lastProgressTime = null;       // 下一关开始时间
    this.addGemstones = null;           // 添加的宝石集合 {GemstoneInfo1, ..., GemstoneInfoN}
    this.delGemstones = null;           // 删除的宝石集合 [GemstoneKey1, ..., GemstoneKeyN]
    this.modifyGemstoneNum = null;      // 修改的宝石数量集合 {GemstoneKey1: num1, ..., GemstoneKeyN: numN}
    this.modifyGemstones = null;        // 修改的宝石信息集合 {GemstoneKey1: equipId1, ..., GemstoneKeyN: equipIdN}
    this.modifyGodGemstones = null;     // 修改的神灵宝石索引集合 {godId1: GemstoneKey1, ..., godIdN: GemstoneKeyN}
    this.modifyMarketRefreshTime = null;// 修改集市免费次数回复时间
    this.modifyMaxStarLvInfo = null;    // 修改获得神灵最高星级信息 {godTemplateId1:starLv1, ..., godTemplateIdN:starLvN}
    this.addFirstIds = null;            // 添加首次ID
    this.warriorLevel = null;           // 修改勇者之证等级
    this.warriorAdvance = null;         // 修改勇者之证进阶标识
    this.modifyWarriorWeekCount = null; // 修改的勇者之证完成次数集合 {id1:count1, ..., idN:countN}
    this.modifyWarriorMonthCount = null;// 修改的勇者之证完成次数集合 {id1:count1, ..., idN:countN}
};

exports.CommonOperateData = function () {
    this.commonData = null;             // 通用数据集合
    this.wishId = null;                 // 许愿结果ID
    this.lastRefreshTime = null;        // 上次跨天刷新时间
    this.dailyTasks = null;             // 日常任务列表 {DailyInfo1, ..., DailyInfoN}
    this.liveness = null;               // 活跃度
    this.doneChests = null;             // 已领取的活跃度宝箱 [已领取宝箱ID1, ..., 已领取宝箱IDN]
    this.limitInfo = null;              // 玩家限制信息 {限制类型1次数, ..., 限制类型N次数}
    this.name = null;                   // 玩家名字
    this.sex = null;                    // 玩家性别
    this.head = null;                   // 玩家头像
    this.redPointInfo = null;           // 红点数据信息 {类型1:值1, ..., 类型N:值N}
    this.thewSignIn = null;             // 三餐签到
    this.monthCardAward = null;         // 月卡领奖
    this.lifelongCardAward = null;      // 终身卡领奖
    this.shopList = null;               // 商品购买次数
    this.overplusInfo = null;           // 剩余次数
    this.worshipInfo = null;            // 膜拜信息
    this.expeditionRewardInfo = null;   // 黑暗森林奖励领取次数信息
    this.expeditionSelfHpInfo = null;   // 黑暗森林玩家自身血量信息
    this.expeditionId = null;           // 黑暗森林通关关卡ID
    this.indulgeOnlineTime = null;      // 防沉迷在线时间
    this.indulgeEndTime = null;         // 防沉迷统计时间
    this.loginCount = null;             // 今日登录次数
    this.dailyRechargeSum = null;       // 每天充值总数
    this.signInStartTime = null;        // 每轮签到开始时间
    this.signInLoginCount = null;       // 每日签到登录领取次数
    this.signInVipCount = null;         // 每日签到VIP领取次数
    this.signInRechargeCount = null;    // 每日签到充值领取次数
    this.forestCurFloor = null;         // 迷雾森林当前层
    this.doneForestChests = null;       // 迷雾森林已领取的宝箱
    this.shareNumToday = null;          // 当天分享次数
    this.doneShares = null;             // 已领取的分享奖励
    this.summonScore = null;            // 限时召唤积分
    this.doneSummonChests = null;       // 已领取的限时召唤宝箱
    this.doneSysOpenChests = null;      // 已领取的系统开启宝箱 [openId1, openId2, ...]
    this.clgMatchNum = null;            // 匹配赛主动挑战次数
    this.doneMatchChests = null;        // 已领取的匹配赛宝箱
    this.luckTreasureId = null;         // 宝物转盘ID
    this.luckGodId = null;              // 神灵转盘ID
    this.luckEquipId = null;            // 装备转盘ID
    this.luckArtId = null;              // 神器转盘ID
    this.dayRechargeLimit = null;       // 每日充值可领取次数
    this.weekRechargeLimit = null;      // 每日充值可领取次数
    this.monthRechargeLimit = null;     // 每月充值限制次数
    this.headFrame = null;              // 玩家头像框
    this.showGodId = null;              // 玩家形象神灵模板ID
    this.showSkinId = null;             // 玩家形象神灵皮肤ID(0为原来模型ID,-1为觉醒模型ID,>0为时装模型ID)
    this.friendHelpList = null;         // 好友援助列表
    this.helpGodId = null;              // 已援助神灵ID
    this.warriorLevel = null;           // 勇者之证等级
    this.warriorExp = null;             // 勇者之证经验
    this.warriorAdvance = null;         // 勇者之证进阶奖励激活标识（0：未激活，1：激活）
    this.warriorWeekTasks = null;       // 勇者之证周任务
    this.warriorMonthTasks = null;      // 勇者之证月任务
    this.warriorLevelAwards = null;     // 勇者之证等级奖励
    this.warriorAdvanceAwards = null;   // 勇者之证进阶奖励
    this.warriorWeekAward = null;       // 勇者之证进阶每周奖励领取标识（0：未领取，1：已领取）
};

exports.GodOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.targetGod = null;      // 目标神灵 {godId: GodInfo}
    this.godAlbum = null;       // 所有神灵图鉴信息 [神灵模板ID1, ..., 神灵模板IDN]
    this.allComment = null;     // 所有神灵评论 [评论1, ..., 评论N]
    this.oneComment = null;     // 单条神灵评论 [[发布时间，玩家ID，是否公布神灵，评论内容], 点赞数]
    this.godCounters = null;    // 神灵召唤保底次数
    this.convertTpltId = null;  // 神界之门转换后的模板ID
    this.observeGodInfo = null; // 观察的神灵 [templateId, starLv, level, attrs, degree, awakenLv, skinId]
    this.resolveItem = null;    // 分解神灵返还物品[[itemId1,count1],[itemId2,count2]]
    this.addGodFateId = null;   // 添加图鉴组合ID
    this.addSkinId = null;      // 添加激活神灵皮肤ID
    this.addGodAwakens = null;  // 添加觉醒神灵模板ID
    this.addAlbumAward = null;  // 添加神灵图鉴奖励神灵模板ID
};

exports.ItemOperateData = function () {
    this.commonData = null;     // 通用数据集合
};

exports.TimeItemInfo = function () {
    this.templateId = null;
    this.limitTime = null;
};

exports.EquipInfo = function () {
    this.templateId = null;
    this.slot = null;
    this.quality = null;
    this.strengthLv = null;
    this.refineLv = null;
    this.godId = null;
    this.gemInfo = null;
};

exports.TreasureInfo = function () {
    this.templateId = null;         // 宝物模板ID
    this.num = null;                // 宝物叠加数量
    this.quality = null;            // 宝物品质
    this.slot = null;               // 宝物类型(就是编码)
    this.strengthLv = null;         // 强化等级
    this.starLv = null;             // 星级
    this.godId = null;              // 穿戴神灵ID
};

exports.EquipOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.targetEquips = null;   // 目标装备集合 {equipKey1: EquipInfo1, ..., equipKeyN: EquipInfoN}
};

exports.TreasureOperateData = function () {
    this.commonData = null;         // 通用数据集合
    this.targetTreasure = null;     // 目标宝物集合 {treasureKey1: TreasureInfo1, ..., treasureKeyN: TreasureInfoN}
    this.returnItems = null;        // 返还材料信息[[itemId1,count1], ..., [itemIdN,countN]]
};

exports.CopyOperateData = function () {
    this.commonData = null;         // 通用数据集合
    this.firstData = null;          // 首通数据集合
    this.mainProgress = null;       // 主线进度    
    this.runeCopyInfo = null;       // 符文副本通关数据
    this.groundCopyInfo = null;     // 地下城副本通关数据
    this.towerCopyInfo = null;      // 试炼塔副本通关数据
    this.towerAwardInfo = null;     // 试炼塔额外奖励数据
    this.rankList = null;           // 试炼塔副本排行榜
    this.lastGetAfkTime = null;     // 上次领取挂机奖励时间
    this.addMapBoxAwardIds = null;  // 添加地图宝箱奖励ID
    this.lastAfkTime = null;        // 最后领取挂机奖励时间
    this.afkAward = null;           // 挂机奖励(物品二维数组)
    this.copyUnlockId = null;       // 副本解锁章节
    this.dailyCopyId = null;        // 已通过每日副本ID
};

exports.TaskOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.doneTask = null;       // 完成的任务 taskId
    this.doneDaily = null;      // 完成的日常任务 dailyId
    this.liveness = null;       // 活跃度
    this.doneChests = null;     // 已领取的活跃度宝箱 [已领取宝箱ID1, ..., 已领取宝箱IDN]
    this.modifyAdvanceReward = null;    // 修改的进阶之路领奖次数集合 {id1:count1}
    this.advanceLevel = null;    // 修改进阶之路等级
    this.warriorLevel = null;    // 修改勇者之证等级
    this.warriorExp = null;      // 修改勇者之证经验
    this.modifyWarriorWeekReward = null;    // 修改勇者之证周任务领奖次数集合 {id1:count1}
    this.modifyWarriorMonthReward = null;    // 修改勇者之证月任务领奖次数集合 {id1:count1}
    this.modifyWarriorLevelAward = null;    // 修改勇者之证等级奖励ID
    this.modifyWarriorAdvanceAward = null;    // 修改勇者之证等级进阶奖励ID
    this.modifyWarriorWeekAward = null;         // 修改勇者之证进阶每周奖励领取标识（0：未领取，1：已领取）
};

exports.FriendData = function () {
    this.playerId = null;       // 玩家ID
    this.name = null;           // 玩家名字
    this.head = null;           // 头像
    this.level = null;          // 等级
    this.force = null;          // 神力
    this.logoutTime = null;     // 离线时间（如果是0说明在线）
    this.giveTime = null;       // 赠送友情点时间
    this.pointNum = null;       // 可领取友情点数量（如果是0说明不能领取）
    this.headFrame = null;      // 玩家头像框
};

exports.RecommendData = function () {
    this.playerId = null;       // 玩家ID
    this.name = null;           // 玩家名字
    this.head = null;           // 头像
    this.level = null;          // 等级
    this.force = null;          // 神力
    this.headFrame = null;      // 玩家头像框
};

exports.ApplyPlayerData = function () {
    this.playerId = null;       // 玩家ID
    this.name = null;           // 玩家名字
    this.head = null;           // 头像
    this.level = null;          // 等级
    this.online = null;         // 在线状态
    this.outlineTime = null;    // 离线时间
    this.force = null;          // 神力
    this.headFrame = null;      // 玩家头像框
};

exports.FriendOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.friendList = null;     // 好友列表
    this.requestList = null;    // 申请列表
    this.recommondList = null;  // 推荐好友列表    
    this.targetData = null;     // 目标玩家
    this.addfriend = null;      // 添加好友
    this.delfriend = null;      // 删除好友
    this.addrequest = null;     // 添加申请
    this.delrequest = null;     // 删除申请
    this.addBlack = null;       // 加入黑名单
    this.delBlack = null;       // 移除黑名单
    this.addfriendList = null;  // 添加好友列表
    this.delfriendList = null;  // 删除好友列表
    this.delrequestList = null; // 删除申请列表
    this.delBlackList = null;   // 移除黑名单列表
    this.applyList = null;      // 申请成功列表
};

exports.MailData = function () {
    this.mailId = null;     // 邮件id
    this.type = null;       // 类型
    this.state = null;      // 状态
    this.endtime = null;    // 结束时间
    this.title = null;      // 标题
    this.content = null;    // 内容   
    this.item = null;       // 物品配置
    this.fromTo = null;     // 来源
};

exports.MailOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.mailList = null;       // 邮件列表
    this.addMail = null;        // 添加邮件
    this.delMail = null;        // 删除邮件
    this.updateMail = null;     // 更新邮件
};
 
exports.PointOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.delPoint = null;       // 删除友情点
    this.giveTime = null;       // 赠送友情点时间
    this.giveId = null;         // 赠送者Id
};

exports.ClgListInfo = function () {
    this.playerId = null;
	this.name = null;
	this.head = null;
    this.level = null;
    this.rank = null;
    this.force = null;          // 神力值
    this.maxForceGodId = null;  // 最大神力值的神灵模板Id
    this.guildName = null;
    this.canChallenge = null;   // 是否能挑战
    this.awakenLv = null;       // 最大神力值的神灵觉醒等级
    this.skinId = null;         // 神灵皮肤ID
    this.headFrame = null;      // 玩家头像框
};

exports.ArenaRecordInfo = function () {
    this.playerId = null;
	this.name = null;
	this.head = null;
    this.level = null;
    this.battleTime = null;     // 发生战斗的时间
    this.targetRank = null;     // 目标的排名(打机器人的时候，用于显示机器人头像)
    this.chgRank = null;        // 排名变化
    this.battleType = null;     // 战斗记录类型(1:进攻 2：防守)
    this.isWin = null;          // 竞技场战斗结果
    this.force = null;          // 玩家战力
    this.targetForce = null;    // 目标战力
    this.headFrame = null;      // 玩家头像框
};

exports.RankListInfo = function () {
    this.playerId = null;
	this.name = null;
	this.guildName = null;
	this.head = null;
	this.level = null;
    this.rank = null; 
    this.force = null;          // 神力值
    this.headFrame = null;      // 玩家头像框
};

exports.ReportInfo = function () {
    this.reportData = null;    
};

exports.ReportData = function () {
    this.type = null;   
    this.objId = null;
    this.round = null;
    this.objType = null;
    this.templateId = null;
    this.hp = null; 
    this.hpMax = null;   
    this.atkBar = null;
    this.atkSpd = null;
    this.skillId = null;
    this.targetIds = null;
    this.flyTextType = null;  
    this.casterId = null;  
    this.buffId = null;  
    this.buffInstId = null;  
    this.stackCnt = null;  
    this.atkBarMax = null;  
    this.camp = null;  
    this.anger = null;  
    this.value = null; 
    this.level = null; 
    this.degree = null; 
    this.awakenLv = null; 
    this.skinId = null;
    this.starLev = null;
    this.uuid = null;
    this.bAdd = null;
    this.showeff = null;
};

exports.ArenaOperateData = function () {
    this.commonData = null;     // 通用数据集合
	this.rank = null;           // 排名
	this.chgRank = null;        // 排名变化值
    this.arenaFailTime = null;  // 竞技场挑战失败时间
    this.clgList = null;        // 挑战列表 [ClgListInfo1, ..., ClgListInfoN]
    this.targetDefInfo = null;  // 目标玩家的防守阵容信息 [templateId, starLv, level, attrs, degree, awakenLv, skinId]
    this.battleRecords = null;  // 玩家战斗记录 [BattleRecordInfo1, ..., BattleRecordInfoN]
    this.rankList = null;       // 竞技场排行榜 [RankListInfo1, ..., RankListInfoN]
    this.battleReport = null;   // 战报 ReportInfo
    this.topRank = null;        // 最高排名
    this.chgTopRank = null;     // 最高排名变化值
    this.topRankDiamond = null; // 最高排名奖励钻石数
    this.isWin = null;          // 竞技场战斗结果
    this.cardInfos = null;      // 竞技场翻牌结果 {1: [cardId1, 是否可用], 2: [cardId2, 是否可用], 3: [cardId3, 是否可用]}
};

exports.MatchClgListInfo = function () {
    this.playerId = null;
	this.name = null;
	this.head = null;
    this.level = null;
    this.score = null;
    this.defInfo = null;        // 防守阵容 [templateId, starLv, degree, level, attrs, degree, awakenLv, skinId]
    this.forceNum = null;
    this.guildName = null;
    this.headFrame = null;          // 玩家头像框
};

exports.MatchRecordInfo = function () {
    this.playerId = null;
	this.name = null;
	this.head = null;
    this.level = null;
    this.battleTime = null;     // 发生战斗的时间
    this.chgScore = null;       // 积分变化
    this.battleType = null;     // 战斗记录类型(1:进攻 2：防守)
    this.isWin = null;          // 战斗结果
    this.force = null;          // 玩家战力
    this.targetForce = null;    // 目标战力
    this.headFrame = null;      // 玩家头像框
};

exports.MatchRankListInfo = function () {
    this.playerId = null;
	this.name = null;
	this.guildName = null;
	this.head = null;
    this.level = null;
    this.score = null;
    this.headFrame = null;          // 玩家头像框 
};

exports.MatchEndInfo = function () {
    this.selfScore = null;      // 自己的积分
    this.selfChgScore = null;   // 自己的积分变化值
	this.tarScore = null;       // 对手的积分
    this.tarChgScore = null;    // 对手的积分变化值
};

exports.MatchOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.rank = null;           // 排名
    this.score = null;          // 积分
    this.clgList = null;        // 挑战列表 [MatchClgListInfo1, ..., MatchClgListInfoN]
    this.clgListTime = null;    // 上次刷新挑战列表时间
    this.defInfo = null;        // 目标玩家的防守阵容信息 [templateId, starLv, level, attrs, degree, awakenLv, skinId]
    this.battleRecords = null;  // 玩家战斗记录 [MatchRecordInfo1, ..., MatchRecordInfoN]
    this.worldRankList = null;  // 匹配赛跨服排行榜 [MatchRankListInfo1, ..., MatchRankListInfoN]
    this.localRankList = null;  // 匹配赛本服排行榜 [MatchRankListInfo1, ..., MatchRankListInfoN]
    this.battleReport = null;   // 战报 ReportInfo
    this.battleEndInfo = null;  // 战斗结束信息 MatchEndInfo
    this.clgMatchNum = null;    // 匹配赛主动挑战次数
    this.doneMatchChests = null;// 已领取的匹配赛挑战宝箱
};

exports.MarketData = function () {
    this.id = null;         // 商品id
    this.type = null;       // 商品类型
    this.price = null;      // 商品价格
    this.count = null;      // 购买次数
    this.itemInfo = null;   // 物品信息
};

exports.MarketOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.marketList = null;     // 集市数据列表
    this.buyId = null;          // 已购买商品id
};

exports.ShopData = function () {
    this.id = null;         // 商品id
    this.count = null;      // 购买次数
};

exports.ShopOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.shopList = null;       // 商店数据列表
    this.buyId = null;          // 已购买商品id
};

exports.GuildData = function () {
    this.guildId = null;   // 公会id
    this.name = null;       // 公会名字
    this.head = null;       // 公会头像
    this.level = null;      // 公会等级
    this.num = null;        // 公会人数
    this.limitLevel = null; // 公会限制等级
    this.autoJoin = null;   // 公会自动加入（0：是，1：不是）
    this.isApplay = null;   // 是否已经申请加入
};

exports.GuildApplyData = function () {
    this.playerId = null;   // 玩家id
    this.name = null;       // 玩家名字
    this.level = null;      // 玩家等级
    this.applyTime = null;  // 申请时间
    this.force = null;      // 玩家神力值
};

exports.GuildMemberData = function () {
    this.playerId = null;   // 成员id
    this.name = null;       // 成员名字
    this.level = null;      // 成员等级
    this.head = null;       // 成员头像
    this.online = null;     // 成员是否在线
    this.logoutTime = null; // 成员下线时间
    this.job = null;        // 成员职位
    this.headFrame = null;  // 成员头像框
    this.force = null;      // 成员战斗力
};

exports.GuildInfo = function () {
    this.guildId = null;    // 公会id
    this.name = null;       // 公会名字
    this.head = null;       // 公会头像
    this.level = null;      // 公会等级
    this.num = null;        // 公会人数
    this.limitLevel = null; // 公会限制等级
    this.autoJoin = null;   // 公会自动加入（0：是，1：不是）
    this.notice = null;     // 公会公告
    this.exp = null;        // 公会当前经验
    this.job = null;        // 自己的职位
    this.copyId = null;     // 当前通关副本ID
};

exports.GuildLevelRankInfo = function(){
    this.guildId = null;        // 公会ID 
    this.head = null;           // 公会头像
    this.name = null;           // 公会名字 
    this.level = null;          // 公会等级 
    this.playerId = null;       // 会长ID 
    this.playerLevel = null;    // 会长等级 
    this.playerName = null;     // 会长名字
};

exports.GuildCopyRankInfo = function(){
    this.guildId = null;        // 公会ID 
    this.name = null;           // 公会名字
    this.head = null;           // 公会头像
    this.copyId = null;         // 公会副本ID
    this.level = null;          // 公会等级
    this.leaderName = null;     // 会长名字 
};

exports.GuildUpdateMemberInfo = function(){
    this.playerId = null;       // 玩家ID
    this.job = null;            // 职位
};

exports.GuildOperateData = function () {
    this.commonData = null;     // 通用数据集合
    this.guildList = null;      // 公会列表
    this.applyList = null;      // 公会申请列表
    this.memberList = null;     // 公会成员列表
    this.addGuild = null;       // 添加公会
    this.delGuild = null;       // 解散公会
    this.addApply = null;       // 添加申请
    this.delApply = null;       // 删除申请
    this.cancelApply = null;    // 取消申请
    this.addMember = null;      // 添加成员
    this.delMember = null;      // 踢出成员
    this.updateMember = null;   // 更新成员信息
    this.guildInfo = null;      // 公会信息
    this.signInNum = null;      // 今日签到次数
    this.findList = null;       // 公会搜索列表
    this.oldSignIn = null;      // 昨日签到总人数
    this.signIn = null;         // 今日签到总人数
    this.levelRankList = null;  // 等级排行列表
    this.copyRankList = null;   // 副本排行列表
    this.myRank = null;         // 我的排行
    this.rankValue = null;      // 我的排行值
    this.modifyGuildExp = null; // 公会经验
    this.modifyGuildLevel = null; // 公会等级
    this.addMemberList = null;  // 添加成员列表[成员信息1,成员信息2]
    this.delApplyList = null;   // 添加成员列表[成员id1,成员id2]
};

exports.ChatData = function(){
    this.type = null;           // 聊天类型
    this.senderId = null;       // 发送者id
    this.senderName = null;     // 发送者名字
    this.senderLevel = null;    // 发送者等级
    this.senderHead = null;     // 发送者头像
    this.senderScore = null;    // 发送者积分
    this.time = null;           // 聊天时间
    this.content = null;        // 聊天内容
    this.receiveId = null;      // 私聊对象ID
    this.city = null;           // 城市
    this.senderHeadFrame = null;// 发送者头像框
};

exports.ChatOperateData = function(){
    this.commonData = null;     // 通用数据集合
    this.channelType = null;    // 聊天频道类型
    this.worldList = null;      // 世界聊天列表
    this.guildList = null;      // 公会聊天列表
    this.groupList = null;      // 队伍聊天列表
    this.whisperList = null;    // 私聊聊天列表
    this.cdTime = null;         // 聊天CD时间
    this.crossList = null;      // 跨服聊天列表
    this.provinceList = null;   // 同省聊天列表
    this.systemList = null;     // 系统聊天列表
};

exports.GuideOperateData = function(){
    this.guideStep = null;      // 引导步数
    this.guideWeakStep = null;  // 弱引导步数
};

exports.GmOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.roleLevel = null;          // 角色等级
    this.content = null;            // GM命令文本
    this.battleReport = null;   // 战报 ReportInfo
};

exports.SevendayInfo = function(){
    this.condCount = null;          // 条件完成次数
    this.rewardCount = null;        // 奖励领取次数
};

exports.WelfareOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.dailySignIn = null;        // 每日签到
    this.todaySignIn = null;        // 今日签到日期
    this.totalSignIn = null;        // 累计签到
    this.levelGiftPack = null;      // 等级礼包
    this.loginGiftPack = null;      // 登录礼包
    this.thewGiftPack = null;       // 体力礼包
    this.firstRecharge = null;      // 首充礼包
    this.activationCode = null;     // 激活码礼包
    this.privilegeGiftPack = null;  // 特权礼包
    this.monthCardAward = null;     // 月卡领奖
    this.lifelongCardAward = null;  // 终身卡领奖
    this.signInLoginCount = null;       // 每日签到登录领取次数
    this.signInVipCount = null;         // 每日签到VIP领取次数
    this.signInRechargeCount = null;    // 每日签到充值领取次数
    this.autonymAwardNum = null;    // 实名认证奖励领取次数
    this.onlineTimeAward = null;    // 在线奖励信息
    this.mobileNumber = null;       // 设置手机号码
    this.bindMobileAward = null;    // 设置绑定手机号码奖励
    this.downloadApkAward = null;   // 设置下载微端奖励
    this.superVipAward = null;      // 设置超级会员奖励
    this.weekFundAwardId = null;    // 已领取周基金奖励ID
    this.dailyRechargeNums = null;    // 每日充值可领取次数
    this.dailyRechargeAwardNums = null;    // 每日充值已领取次数
    this.rechargeRebate = null;     // 充值返利领取
    this.levelFundAward = null;     // 修改等级基金奖励次数
};

exports.GuildCopyOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.copyId = null;             // 当前副本ID
    this.rankInfo = null;           // 副本排行信息
    this.mosterInfo = null;         // 副本怪物信息{怪物ID:怪物剩余血量}
    this.awardCount = null;         // 副本通关奖励次数
    this.totalDamage = null;        // 总伤害值
    this.rank = null;               // 当前排名
    this.modifyAwardCount = null;   // 修改副本通关奖励次数
    this.modifyCopyAwardCount = null;   // 修改玩家通关奖励次数
    this.guildCopyMaxDmg = null;    // 公会副本最大伤害
};

exports.ActivityListData = function(){
    this.id = null;                 // 活动ID
    this.startTime = null;          // 活动开始时间
    this.endTime = null;            // 活动结束时间
    this.rewardTime = null;         // 活动最后领奖时间
};

exports.ActivityInfoData = function(){
    this.id = null;                 // 奖励ID
    this.condCount = null;          // 条件完成次数
    this.rewardCount = null;        // 领奖次数
    this.condValue = null;          // 条件达成值
    this.rewardInfo = null;         // 奖励信息
    this.otherInfo = null;          // 其他信息
};

exports.ActivityOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.activityList = null;       // 活动列表
    this.activityAllInfo = null;    // 活动所有奖励信息
    this.activityId = null;         // 活动ID
    this.activityInfo = null;       // 活动奖励信息
    this.modifyCondCount = null;    // 条件完成次数
    this.modifyRewardCount = null;  // 修改奖励次数
    this.modifyCondInfo = null;     // 更新条件次数
    this.sevendayAwardCount = null; // 修改七天领取奖励次数
    this.sevendayExtraAward = null; // 修改七天额外奖励次数
    this.shareNumToday = null;      // 当天分享次数
    this.shareNumTotal = null;      // 累计分享次数
    this.doneShares = null;         // 已领取的分享奖励 [id1, id2, id3, ...] (id为0时表示首次分享奖励)
    this.summonScore = null;        // 限时召唤积分
    this.doneSummonChests = null;   // 已领取的限时召唤宝箱
    this.summonRankList = null;     // 限时召唤排行
    this.mySummonRank = null;       // 我的限时召唤排行(0表示未上榜)
    this.grpBuyTodayNums = null;    // 限时团购当天购买次数 {tpltId: num}
    this.grpBuyTotalNums = null;    // 限时团购全服总购买次数 {tpltId: num}
    this.doneOpenGifts = null;      // 已领取的开服豪礼礼包
    this.rechargePlayerNum = null;  // 全服首充人数
    this.openSvrGroupBuyAward = null;  // 开服团购奖励信息{id: num}
};

exports.RechargeOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.vipLevel = null;           // vip等级
    this.rechargeSum = null;        // 总充值数
    this.diamond = null;            // 当前钻石数
    this.monthCardEndTime = null;   // 月卡结束时间
    this.lifelongCard = null;       // 终身卡（1：已购买）
    this.goodsRechargeCount = null; // 每个挡位充值次数
    this.dailyRechargeNums = null;  // 每日充值可领取次数
    this.rechargeGoodsIds = null;   // 充值商品Id列表
    this.dailyRechargeSum = null;   // 每日充值数
    this.firstRechargeTime = null;  // 各档首充时间戳
    this.superVip = null;           // 是否是超级会员
    this.weekFund = null;           // 已购买周基金ID(数组)
    this.orderInfo = null;          // 订单信息
    this.doneOpenGifts = null;      // 已领取的开服豪礼礼包
    this.openSvrGiftAwardNums = null;  // 已领取的开服礼包次数
    this.dayRechargeLimit = null;       // 每日充值可领取次数
    this.weekRechargeLimit = null;      // 每周充值可领取次数
    this.monthRechargeLimit = null;     // 每月充值限制次数
    this.openSvrRechargeSum = null;     // 开服团购总充值数
    this.vipScore = null;           // vip积分
    this.buyLevelFund = null;       // 购买等级基金
};

exports.RankOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.myRank = null;             // 我的排行
    this.rankList = null;           // 排行榜数据
    this.modifyWorshipInfo = null;  // 修改膜拜信息
    this.forceRankList = null;      // 开服七天战力排行榜
    this.rankValue = null;          // 我的排行值
    this.godInfo = null;            // 开服七天战力排行榜前三名神灵信息{1:[godId,awakenLv,skinId],2:[godId,awakenLv,skinId],3:[godId,awakenLv,skinId]}
    this.topRankList = null;        // 首页排序信息
};

exports.ChallengerInfo = function() {
    this.name = null;               // 挑战者名字
    this.level = null;              // 挑战者等级
    this.sex = null;                // 挑战者性别
    this.force = null;              // 挑战者战斗力
    this.lineupInfo = null;         // 挑战者阵容信息
    this.hpInfo = null;             // 挑战者阵容血量信息
};

exports.ExpeditionOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.modifySelfHpInfo = null;   // 玩家自身血量信息（万分比）
    this.challengerInfo = null;     // 获取挑战者信息
    this.expeditionId = null;       // 黑暗森林通关关卡ID
    this.modifyRewardInfo = null;   // 黑暗森林奖励领取次数信息 
};

exports.NoticeOperateData = function(){
    this.list = null;               // 公告列表信息
    this.newsList = null;           // 跑马灯列表信息
};

exports.QueryOperateData = function(){
    this.name = null;               // 玩家名字
    this.force = null;              // 玩家神力
    this.head = null;               // 玩家性别
    this.level = null;              // 玩家等级
    this.guildName = null;          // 玩家公会名字
    this.lineupInfo = null;         // 玩家阵容信息
    this.headFrame = null;          // 玩家头像框
};

exports.WorldBossInfo = function(){
    this.bossId = null;             // 世界bossID
    this.bossHp = null;             // 世界boss血量
    this.bossReviveTime = null;     // 世界boss复活时间
    this.bossRankNum = null;        // 世界boss排行玩家数量
};

exports.WorldBossRankInfo = function(){
    this.playerId = null;           // 玩家ID
    this.value = null;              // 玩家伤害值
    this.playerLevel = null;        // 玩家等级
    this.head = null;               // 玩家头像
    this.playerName = null;         // 玩家名字
    this.headFrame = null;          // 玩家头像框
};

exports.WorldBossBattleInfo = function(){
    this.myRank = null;             // 我的排行
    this.totalDamage = null;        // 总伤害值
};

exports.WorldBossRecordInfo = function(){
    this.name = null;             // 玩家名字
    this.damage = null;           // 伤害值
};

exports.WorldBossOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.WorldBossInfo = null;      // 世界boss信息
    this.WorldBossRankList = null;  // 世界boss排行列表
    this.WorldBossBattleInfo = null;// 世界boss战斗信息
    this.myRank = null;             // 我的排行
    this.rankValue = null;          // 排行伤害值
    this.bossRecords = null;        // 世界boss记录
    this.damageRankInfo = null;     // 世界boss前三名排行信息
};

exports.ArtifactInfo = function(){
    this.id = null;                 // 神器ID
};

exports.ArtifactOperateData = function(){
    this.commonData = null;             // 通用数据集合
    this.lineupArtifactInfo = null;     // 修改布阵神器信息 {阵容类型1：神器ID1, ..., 阵容类型N：神器IDN}
    this.tmpBaptizeAttrs = null;        // 神器临时洗练属性 {id: attrs}
    this.artifactSkillLv = null;        // 神器技能等级
    this.artifactStrengthLv = null;     // 神器强化等级
    this.artifactBaptizeLv = null;      // 神器洗练等级
    this.artifactBaptizeExp = null;     // 神器洗练经验
    this.artifactStarLv = null;         // 神器星级
    this.artifactStarExp = null;        // 神器星级经验
    this.artifactBaptizeAttrs = null;   // 神器洗练属性
    this.artifactInfo = null;           // 激活目标神器 {id: ArtifactInfo}
};

exports.EscortListInfo = function(){
    this.playerId = null;           // 玩家ID
    this.name = null;               // 玩家名字
    this.tradeId = null;            // 商队ID
    this.endTime = null;            // 护送结束时间
    this.force = null;              // 神力值
};

exports.TargetEscortInfo = function(){
    this.guildName = null;          // 玩家公会
    this.robCount = null;           // 被拦截次数
    this.multiple = null;           // 奖励倍数
    this.lineupInfo = null;         // 布阵信息
    this.force = null;              // 神力值
    this.head = null;               // 头像
    this.level = null;              // 等级
    this.headFrame = null;          // 头像框
};

exports.EscortInfo = function(){
    this.tradeId = null;            // 商队ID
    this.endTime = null;            // 护送结束时间
    this.robCount = null;           // 被拦截次数
    this.multiple = null;           // 奖励倍数
};

exports.EscortRecordInfo = function(){
    this.recordTime = null;         // 被掠夺时间
    this.name = null;               // 掠夺者名字
    this.recordType = null;         // 日志类型（1，抵御成功，2：被掠夺）
    this.tradeId = null;            // 商队ID
    this.multiple = null;           // 奖励倍数
};

exports.EscortOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.escortList = null;         // 商队护送列表
    this.escortInfo = null;         // 商队护送信息
    this.targetInfo = null;         // 目标商队护送信息
    this.recordList = null;         // 被掠夺日志列表
    this.escortTradeId = null;      // 随机护送商队ID
    this.addEscort = null;          // 添加商队护送信息
    this.delEscort = null;          // 删除商队护送信息
};

exports.GuildSkillOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.modifyGuildSkillInfo = null;   // 修改公会技能信息
    this.clearGuildSkillInfo = null;    // 清空公会技能信息
};

exports.MineListInfo = function(){
    this.mineIndex = null;          // 矿点索引
    this.mineId = null;             // 矿点ID
    this.mineType = null;           // 矿点类型
    this.playerId = null;           // 占领玩家ID
    this.playerName = null;         // 占领玩家名字
    this.force = null;              // 占领玩家神力值
};

exports.MineInfo = function(){
    this.playerId = null;           // 占领玩家ID
    this.playerName = null;         // 占领玩家名字
    this.force = null;              // 占领玩家神力值
    this.guildName = null;          // 占领玩家公会名字
    this.lineupInfo = null;         // 占领玩家布阵信息
    this.occupyTime = null;         // 已采集时间
    this.profitInfo = null;         // 当前收益信息
    this.robCount = null;           // 被掠夺次数
    this.startTime = null;          // 收益开始时间戳
    this.head = null;               // 占领玩家头像
    this.level = null;              // 占领玩家等级
    this.headFrame = null;          // 占领玩家头像框
};

exports.MineRecordInfo = function(){
    this.recordId = null;           // 记录id
    this.recordTime = null;         // 被掠夺时间
    this.name = null;               // 掠夺者名字
    this.recordType = null;         // 日志类型（1，抵御成功，2：被掠夺）
    this.mineType = null;           // 矿点类型
    this.rewardInfo = null;         // 奖励信息
    this.state = null;              // 状态
};

exports.MyMineInfo = function(){
    this.islandId = null;           // 岛屿ID
    this.mineId = null;             // 矿点ID
    this.mineType = null;           // 矿点类型
};

exports.MineOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.myInfo = null;             // 玩家占领矿点信息
    this.mineList = null;           // 矿点列表
    this.mineInfo = null;           // 矿点详细信息
    this.recordList = null;         // 记录列表
    this.grabList = null;           // 被抢占记录列表
    this.updateRecordState = null;  // 更新记录状态
};

exports.ForestOperateData = function () {
    this.commonData = null;         // 通用数据集合
    this.forestMaxFloor = null;     // 迷雾森林历史最高层数
    this.doneForestChests = null;   // 已领取的迷雾森林宝箱 [floor1, floor2, ...]
};

exports.AdventureInfo = function(){
    this.templateId = null;         // 探险任务模板ID
	this.endTime = null;            // 任务完成时间
	this.races = null;              // 需求种族 [种族1, 种族2, ...]
	this.godIds = null;             // 派遣的神灵列表
};

exports.AdventureOperateData = function () {
    this.commonData = null;         // 通用数据集合
    this.acceptableList = null;     // 可领取的探险任务列表 {idx1: AdventureInfo, idx2: AdventureInfo, ...}
    this.targetAdvt = null;         // 目标探险任务 {advtKey: AdventureInfo}
    this.delIdx = null;             // 删除的可领取探险任务序号
    this.delAdvtKey = null;         // 删除的探险任务实例id
};

exports.GuildWarMemberInfo = function(){
    this.head = null;               // 玩家头像
    this.level = null;              // 玩家等级
    this.name = null;               // 玩家名字
    this.score = null;              // 玩家总积分
    this.force = null;              // 玩家战力
    this.atkCount = null;           // 玩家剩余攻击次数
    this.lifeNum = null;            // 玩家剩余生命次数
    this.integral = null;           // 玩家分值    
    this.lineupInfo = null;         // 玩家布阵信息    
    this.hpInfo = null;             // 玩家剩余生命信息{神灵ID:生命值}
    this.headFrame = null;          // 玩家头像框
};

exports.GuildWarBaseInfo = function(){
    this.guildId = null;            // 公会ID
    this.guildHead = null;          // 公会头像
    this.guildLevel = null;         // 公会等级
    this.guildName = null;          // 公会名字
    this.dailyScore = null;         // 每日积分
    this.totalScore = null;         // 总积分
    this.totalForce = null;         // 总战斗力
    this.guildGrade = null;         // 公会段位
    this.memberInfo = null;         // 成员信息
};

exports.GuildWarRankInfo = function(){
    this.guildId = null;            // 公会ID
    this.guildHead = null;          // 公会头像
    this.guildLevel = null;         // 公会等级
    this.guildName = null;          // 公会名字
    this.score = null;              // 积分值
    this.force = null;              // 总战斗力
};

exports.GuildWarBoxInfo = function(){
    this.num = null;                // 公会贡献值
    this.name = null;               // 玩家名字(空说明未开启)
};

exports.GuildWarMemberRankInfo = function(){
    this.playerId = null;           // 玩家ID
    this.head = null;               // 玩家头像
    this.level = null;              // 玩家等级
    this.name = null;               // 玩家名字
    this.score = null;              // 总积分值
    this.force = null;              // 总战斗力
    this.headFrame = null;          // 玩家头像框
};

exports.GuildWarSessionRankInfo = function(){
    this.guildRank = null;           // 公会赛季排名
    this.guildHead = null;           // 公会图标
    this.guildLevel = null;          // 公会等级
    this.guildName = null;           // 公会名字
    this.serverName = null;          // 服务器名字
    this.presidentName = null;       // 会长名字
    this.totalForce = null;          // 总战斗力
};

exports.GuildWarOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.session = null;            // 当前是第几赛季
    this.endTime = null;            // 本赛季结束时间
    this.regTime = null;            // 公会报名结束时间（服务器当前时间戳小于这个值说明已报名）
    this.maxGuildGrade = null;      // 公会历史最高段位
    this.matchType = null;          // 匹配类型（0：正常匹配，1：人数不足，2：轮空）
    this.targetInfo = null;         // 目标信息
    this.myInfo = null;             // 我方信息
    this.groupList = null;          // 小组信息
    this.guildGrade = null;         // 当前段位
    this.upGradeType = null;        // 晋级类型
    this.myRank= null;              // 当前王者排名
    this.gradeList = null;          // 王者排行信息
    this.rankValue = null;          // 我的赛季积分
    this.modifyBoxAwardCount = null;   // 修改公会战宝箱领取次数
    this.modifyBoxList = null;      // 修改宝箱列表信息
    this.boxList = null;            // 宝箱列表
    this.memberRankList = null;     // 会员排行列表
    this.sessionRankList = null;    // 赛季排行列表
};

exports.LuckOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.luckGodIds = null;         // 神灵转盘ID
    this.luckGodNum = null;         // 神灵转盘幸运值
    this.luckEquipIds = null;       // 装备转盘ID
    this.luckEquipNum = null;       // 装备转盘幸运值
    this.luckArtIds = null;         // 神器转盘ID
    this.luckEquipAward = null;     // 装备转盘奖励信息
    this.luckGodRecord = null;      // 神灵转盘记录信息
    this.luckEquipRecord = null;    // 装备转盘记录信息
    this.luckTreasureIds = null;    // 宝物转盘ID
    this.luckTreasureNum = null;    // 宝物转盘幸运值
    this.luckTreasureRecord = null; // 宝物转盘记录信息
};

exports.HonourWarInfo = function(){
    this.session = null;            // 当前赛季
    this.endTime = null;            // 当前赛季结束时间
    this.stage = null;              // 当前进度
    this.stageTime = null;          // 当前进度结束时间
};

exports.HonourListInfo = function(){
    this.recordId = null;           // 记录ID
    this.stage = null;              // 阶段ID
    this.groupId = null;            // 小组ID
    this.round = null;              // 轮数
    this.pos = null;                // 位置
    this.winner = null;             // 获胜方（1：左方，2：右方）
    this.betId = null;              // 押注（0：没押注，1：押左方，2：押右方）
    this.leftId = null;             // 左方玩家ID
    this.leftName = null;           // 左方玩家名字
    this.leftForce = null;          // 左方玩家战斗力
    this.leftHead = null;           // 左方玩家头像
    this.leftLevel = null;          // 左方玩家等级
    this.rightId = null;            // 右方玩家ID
    this.rightName = null;          // 右方玩家名字
    this.rightForce = null;         // 右方玩家战斗力
    this.rightHead = null;          // 右方玩家头像
    this.rightLevel = null;         // 右方玩家等级
    this.session = null;            // 赛季ID
    this.leftHeadFrame = null;      // 左方玩家头像框
    this.rightHeadFrame = null;     // 右方玩家头像框
};

exports.HonourPlayerInfo = function(){
    this.guildName = null;          // 玩家公会名字
    this.lineupInfo = null;         // 玩家阵容信息
};

exports.HonourBaseInfo = function(){
    this.name = null;           // 玩家名字
    this.force = null;          // 玩家战斗力
    this.head = null;           // 玩家头像
    this.sex = null;            // 玩家性别
    this.level = null;          // 玩家等级
    this.stage = null;          // 玩家信息阶段
    this.pos = null;            // 玩家信息位置
    this.headFrame = null;      // 玩家头像框
};

exports.HonourOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.honourInfo = null;         // 比赛信息
    this.rankList = null;           // 上一届前三名玩家信息
    this.regTime = null;            // 荣耀之战报名时间
    this.matchList = null;          // 比赛匹配列表
    this.battleInfo = null;         // 战斗回放数据
    this.myList = null;             // 我的比赛数据
    this.stageList = null;          // 上届比赛数据
    this.betId = null;              // 玩家押注ID（1：左方，2：右方）
    this.playerInfo = null;         // 玩家信息
    this.playerPos = null;          // 玩家位置信息
    this.baseInfo = null;           // 玩家基本信息
    this.winPos = null;             // 每一轮获胜位置信息
    this.warInfo = null;            // 每一场匹配信息
    this.betInfo = null;            // 押注信息
};

exports.GroupListInfo = function(){
    this.groupId = null;            // 队伍ID
    this.name = null;               // 队长名字
    this.head = null;               // 队长头像
    this.level = null;              // 队长等级
    this.guildName = null;          // 队长公会名字
    this.memberNum = null;          // 队伍人数
    this.force = null;              // 平均战斗力
    this.headFrame = null;          // 队长头像框
};

exports.GroupInfo = function(){
    this.groupId = null;            // 队伍ID
    this.godDmScore = null;         // 神域积分
    this.myRank = null;             // 我的排行
    this.rewardAdd = null;          // 奖励加成
    this.autoJoin = null;           // 允许加入
    this.regTime = null;            // 开始匹配时间
};

exports.GroupMemberInfo = function(){
    this.playerId = null;           // 成员ID
    this.pos = null;                // 成员位置
    this.job = null;                // 成员类型（枚举groupJobType）
    this.state = null;              // 成员状态（枚举groupStateType）
    this.readyTime = null;          // 自动准备时间戳
    this.name = null;               // 成员名字
    this.force = null;              // 成员战斗力
    this.guildName = null;          // 成员公会名字
    this.godId = null;              // 成员神灵ID
    this.rewardCount = null;        // 成员奖励次数
    this.isRobot = null;            // 是否是机器人（0不是，1是）
    this.awakenLv = null;           // 成员神灵觉醒等级
    this.skinId = null;             // 成员神灵皮肤ID
};

exports.InviteListInfo = function(){
    this.playerId = null;           // 玩家ID
    this.name = null;               // 玩家名字
    this.head = null;               // 玩家头像
    this.level = null;              // 玩家等级
    this.guildName = null;          // 玩家公会名字
    this.force = null;              // 玩家战斗力
    this.inviteTime = null;         // 邀请时间戳（这个时间大于当前时间说明已邀请）
    this.headFrame = null;          // 玩家头像框
};

exports.InviteInfo = function(){
    this.playerId = null;           // 玩家ID
    this.name = null;               // 玩家名字
};

exports.GroupMvpInfo = function(){
    this.name = null;               // 玩家名字
    this.head = null;               // 玩家头像
    this.level = null;              // 玩家等级
    this.force = null;              // 玩家战斗力
    this.headFrame = null;          // 玩家头像框
};

exports.GroupOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.groupList = null;          // 获取队伍列表
    this.myGroup = null;            // 我的队伍
    this.memberList = null;         // 成员列表
    this.autoJoin = null;           // 是否自动加入
    this.setPos = null;             // 设置位置[srcPos, dstPos]
    this.appointId = null;          // 任命成员ID
    this.delMemberId = null;        // 踢出成员ID
    this.inviteList = null;         // 在线好友邀请列表
    this.inviteId = null;           // 邀请好友ID
    this.acceptInviteId = null;     // 接受邀请好友ID
    this.refuseInviteId = null;     // 拒绝邀请好友ID
    this.setState = null;           // 设置准备状态（枚举groupStateType）
    this.readyTime = null;          // 更新玩家自动准备时间
    this.oneKeyInviteCd = null;     // 一键邀请CD
    this.matchTime = null;          // 匹配时间
    this.inviteInfo = null;         // 邀请信息
    this.setInvite = null;          // 是否接受邀请（枚举groupInviteType）
    this.refuseInviteList = null;   // 拒绝邀请列表
    this.oneKeyInviteCd = null;     // 一键邀请CD时间戳
    this.regTime = null;            // 开始匹配时间戳
    this.battleReport = null;       // 战报 ReportInfo
    this.winCamp = null;            // 获胜阵营
    this.leftInfo = null;           // 左方队伍信息[playerId,name,head,level,force,godId,awakenLv,skinId,headFrame]
    this.rightInfo = null;          // 右方队伍信息[playerId,name,head,level,force,godId,awakenLv,skinId,headFrame]
    this.itemData = null;           // 结算奖励（数组）
    this.waveResults = null;        // 击杀次数
    this.mvpInfo = null;            // MVP玩家信息
    this.rewardAddInfo = null;      // 奖励加成信息[活跃用户，好友，公会]
    this.scoreInfo = null;          // 积分信息
};

exports.RechargeOrderData = function(){
    this.open_id = null;            // 平台账号ID
    this.total_fee = null;          // 道具支付金额（单位元），精确到小数点后两位
    this.game_orderno = null;       // 游戏生成的订单号
    this.subject = null;            // 游戏道具名称
    this.notify_url = null;         // 支付完成后通知URL
    this.timestamp = null;          // 时间戳
    this.game_area = null;          // 用户所在的游戏区
    this.game_group = null;         // 用户所在的游戏服
    this.game_level = null;         // 用户在游戏中的等级
    this.game_role_id = null;       // 用户的角色Id
};

exports.RiskInfo = function(){
    this.riskId = null;             // 格子ID
    this.limitTime = null;          // 限制时间
    this.questId = null;            // 问题ID
};

exports.RiskOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.curRiskId = null;          // 大富翁已踩到ID
    this.riskIds = null;            // 当前大富翁ID
    this.diceNum = null;            // 本次摇到的色子点数
    this.clearQuestIds = null;      // 是否要清空问题答案ID(有下发就是要清空)
    this.winType = null;            // 猜拳类型（看枚举guessTypeKey）
    this.addRiskInfo = null;        // 添加奇遇信息
    this.delRiskKey = null;         // 删除奇遇信息key
};

exports.GemstoneInfo = function () {
    this.templateId = null;         // 宝石模板ID
    this.num = null;                // 宝石叠加数量
    this.godId = null;              // 穿戴神灵ID
};

exports.GemstoneOperateData = function () {
    this.commonData = null;         // 通用数据集合
};

exports.ApiOperateData = function () {
    this.commonData = null;         // 通用数据集合
};

exports.GuildHelpInfo = function () {
    this.helpId = null;             // 援助索引ID
    this.helpPos = null;            // 援助位置
    this.helpType = null;           // 援助类型
    this.playerId = null;           // 玩家ID
    this.helpNum = null;            // 援助次数
    this.getNum = null;             // 领取次数
    this.name = null;               // 玩家名字
    this.head = null;               // 玩家头像
    this.level = null;              // 玩家等级
    this.headFrame = null;          // 玩家头像框
};

exports.GuildHelpOperateData = function () {
    this.commonData = null;         // 通用数据集合
    this.addGuildHelp = null;       // 添加公会援助
    this.guildHelpList = null;      // 公会援助列表
    this.guildHelpInfo = null;      // 修改公会援助信息
    this.guildHelpEndTime = null;   // 修改发送求助时间戳
};

exports.FriendHelpInfo = function () {
    this.helpId = null;             // 援助索引ID
    this.playerId = null;           // 玩家ID
    this.name = null;               // 玩家名字
    this.godInfo = null;            // 神灵信息
    this.isHire = null;             // 是否雇佣
};

exports.FriendHelpOperateData = function () {
    this.commonData = null;         // 通用数据集合
    this.addFriendHelp = null;      // 添加好友援助
    this.friendHelpList = null;     // 好友援助列表
    this.addFriendHelpList = null;  // 添加我的好友助阵列表
    this.addHelpGodId = null;       // 添加援助神灵ID
};

exports.GroupCopyApplyListInfo = function(){
    this.playerId = null;           // 玩家ID
    this.name = null;               // 玩家名字
    this.force = null;              // 玩家战力
    this.lineupInfo = null;         // 玩家阵容信息
};

exports.GroupCopyMemberListInfo = function(){
    this.pos = null;                // 成员位置
    this.head = null;               // 成员头像
    this.headFrame = null;          // 成员头像框
    this.level = null;              // 成员等级
};

exports.GroupCopyListInfo = function(){
    this.groupId = null;            // 队伍ID
    this.name = null;               // 队长名字
    this.force = null;              // 总战斗力
    this.copyFloor = null;          // 组队副本关卡
    this.isApply = null;            // 是否申请
    this.memberInfo = null;         // 队长头像框
};

exports.GroupCopyInfo = function(){
    this.groupCopyId = null;        // 队伍ID
    this.groupCopyFloor = null;     // 组队副本关卡
    this.captainCopyFloor = null;   // 队长组队副本关卡
};

exports.GroupCopyMemberInfo = function(){
    this.playerId = null;           // 成员ID
    this.pos = null;                // 成员位置
    this.job = null;                // 成员类型（枚举groupJobType）
    this.name = null;               // 成员名字
    this.force = null;              // 成员战斗力
    this.lineupInfo = null;         // 成员阵容信息
    this.copyFloor = null;          // 成员组队副本关卡
    this.head = null;               // 成员头像
    this.headFrame = null;          // 成员头像框
    this.level = null;              // 成员等级
};

exports.GroupCopyInviteListInfo = function(){
    this.playerId = null;           // 玩家ID
    this.name = null;               // 玩家名字
    this.isInvite = null;           // 是否邀请
    this.force = null;              // 玩家战斗力
    this.lineupInfo = null;         // 成员阵容信息
    this.logoutTime = null;         // 成员离线时间（0为在线，>0为离线时间戳）
};

exports.GroupCopyReportMemberInfo = function(){
	this.pos = null;                // 成员位置
    this.job = null;                // 成员类型（枚举groupJobType）
    this.name = null;               // 成员名字
    this.head = null;               // 成员头像
    this.headFrame = null;          // 成员头像框
    this.level = null;              // 成员等级
    this.force = null;              // 成员战斗力
    this.lineupInfo = null;         // 成员阵容信息
};

exports.GroupCopyOperateData = function(){
    this.commonData = null;         // 通用数据集合
    this.groupList = null;          // 获取队伍列表
    this.myGroup = null;            // 我的队伍
    this.memberList = null;         // 成员列表
    this.setPos = null;             // 设置位置[srcPos, dstPos]
    this.appointId = null;          // 任命成员ID
    this.delMemberId = null;        // 踢出成员ID
    this.inviteList = null;         // 在线好友邀请列表
    this.inviteId = null;           // 邀请好友ID
    this.acceptInviteId = null;     // 接受邀请好友ID
    this.refuseInviteId = null;     // 拒绝邀请好友ID
    this.dismissTime = null;        // 更新自动解散时间
    this.inviteInfo = null;         // 邀请信息
    this.setInvite = null;          // 是否接受邀请（枚举groupInviteType）
    this.refuseInviteList = null;   // 拒绝邀请列表
    this.battleReport = null;       // 战报 ReportInfo
    this.applyList = null;          // 获取申请列表(玩家信息数组)
    this.delApplyList = null;       // 删除申请列表(玩家ID数组)
    this.winCamp = null;            // 获胜阵营
    this.itemData = null;           // 结算奖励（数组）
    this.addChapterAward = null;    // 添加组队副本每章奖励ID
    this.memberInfo = null;         // 战报成员信息
    this.copyFloor = null;          // 战报关卡
};