/**
* UI枚举
*/
var UIConst = /** @class */ (function () {
    function UIConst() {
    }
    UIConst.hud_group = "hud"; // 一级界面
    /**二级界面group */
    UIConst.two_group = "two";
    UIConst.team_two_group = "team_two_group";
    UIConst.login_group = "login";
    //hud
    UIConst.HudView = "HudView";
    UIConst.SelectListView = "SelectListView";
    UIConst.LoginView = "LoginView";
    UIConst.Main3DView = "Main3DView";
    UIConst.ChatView = "ChatView";
    UIConst.XianshiBaoxiangView = "XianshiBaoxiangView";
    UIConst.SysTopView = "SysTopView";
    UIConst.ShowSkill = "ShowSkill";
    // 玩家详细界面
    UIConst.PlayerDetailsView = "PlayerDetailsView";
    // 英雄形象界面
    UIConst.HeroicModelView = "HeroicModelView";
    UIConst.CheatView = "CheatView";
    UIConst.Hud_ChangeNameView = "Hud_ChangeNameView";
    /**私聊界面 */
    UIConst.Chat_SiliaoView = "Chat_SiliaoView";
    UIConst.CommonRewardView = "CommonRewardView";
    UIConst.GuideTalkView = "GuideTalkView";
    UIConst.GuideMask = "GuideMask";
    UIConst.CommonRuleView = "CommonRuleView";
    UIConst.CommonItemBuyView = "CommonItemBuyView";
    UIConst.PlayerInfoView = "PlayerInfoView";
    UIConst.ComsumeAlert = "ComsumeAlert";
    UIConst.AlertBox = "AlertBox";
    UIConst.ExchangeGoldView = "ExchangeGoldView";
    UIConst.PlayerLineupInfoView = "PlayerLineupInfoView";
    //战斗
    UIConst.FightViews = "FightViews";
    UIConst.FightResultView = "FightResultView";
    UIConst.FightActivityResultView = "FightActivityResultView";
    UIConst.FightGuildCopyResultView = "FightGuildCopyResultView";
    UIConst.FightFailure = "FightFailure";
    UIConst.FightVictory = "FightVictory";
    UIConst.FightVictoryQc = "FightVictoryQc";
    UIConst.FirstGuide = "FirstGuide";
    UIConst.FightTishiView = "FightTishiView";
    UIConst.GloryFightResultView = "GloryFightResultView";
    //挂机
    UIConst.GuajiView = "GuajiView";
    UIConst.GuanqiaView = "GuanqiaView";
    UIConst.OpenChapterView = "OpenChapterView";
    /**挂机快速战斗 */
    UIConst.Guaji_FastView = "Guaji_FastView";
    /**挂机收益提升界面 */
    UIConst.Guaji_ShouyiUpView = "Guaji_ShouyiUpView";
    /**挂机收益界面 */
    UIConst.Guaji_ShouyiView = "Guaji_ShouyiView";
    /**神界之门主界面 */
    UIConst.GodDoorView = "GodDoorView";
    /**神界之门奖励预览界面 */
    UIConst.GodDoor_JiangliView = "GodDoor_JiangliView";
    /**召唤结果页面 */
    UIConst.ZH_ResultView = "ZH_ResultView";
    /**召唤主页面 */
    UIConst.ZH_MainView = "ZH_MainView";
    /**英雄主界面 */
    UIConst.God_MainView = "God_MainView";
    UIConst.BuzhenView = "BuzhenView";
    /**阵营克制界面 */
    UIConst.God_kezhiView = "God_kezhiView";
    UIConst.XuanzeView = "XuanzeView";
    UIConst.SkillupView = "SkillupView";
    UIConst.GodUpStarView = "GodUpStarView";
    UIConst.GodUpLevelView = "GodUpLevelView";
    /**升阶界面 */
    UIConst.God_DgUpView = "God_DgUpView";
    /**升阶成功 */
    UIConst.God_DgUp_SUCCView = "God_DgUp_SUCCView";
    /**神灵属性总览 */
    UIConst.God_AttrView = "God_AttrView";
    /**融魂等级介绍界面 */
    UIConst.God_fuseView = "God_fuseView";
    /**突破界面 */
    UIConst.God_TupoView = "God_TupoView";
    /**选择英雄界面 : 新 */
    UIConst.God_ChooseGodView = "God_ChooseGodView";
    /** 英雄更换界面 */
    UIConst.God_ReplaceGodView = "God_ReplaceGodView";
    /** 英雄养成界面 */
    UIConst.God_GodCultureView = "God_GodCultureView";
    UIConst.GodSkinView = "GodSkinView";
    /** 立绘 */
    UIConst.GodLiHuiView = "GodLiHuiView";
    /** 用户须知 */
    UIConst.UserNoticeView = "UserNoticeView";
    /** 选择圣物界面 */
    UIConst.ChooseTreasureView = "ChooseTreasureView";
    /** 圣物强化 */
    UIConst.TreasureStrengthView = "TreasureStrengthView";
    /** 圣物物升星 */
    UIConst.TreasureStarupView = "TreasureStarupView";
    /** 圣物tips */
    UIConst.TreasureTipsView = "TreasureTipsView";
    /** 选择圣物材料界面 */
    UIConst.ChooseTreasureMaterialView = "ChooseTreasureMaterialView";
    /** 圣物星级预览 */
    UIConst.TreasureStarAttrPreview = "TreasureStarAttrPreview";
    /** 圣物图鉴界面 */
    UIConst.TreasureTujianView = "TreasureTujianView";
    /** 圣物重生界面 */
    UIConst.TreasureRebirthView = "TreasureRebirthView";
    /** 登入礼包 */
    UIConst.LoginGiftView = "LoginGiftView";
    /** 内侧返利 */
    UIConst.TestRebateView = "TestRebateView";
    //toast
    UIConst.PromptToast = "PromptToast";
    UIConst.ItemTip = "ItemTip";
    UIConst.SkillTip = "SkillTip";
    UIConst.EffectList = "EffectList";
    UIConst.ManyItemsTip = "ManyItemsTip";
    UIConst.EquipTip = "EquipTip";
    /**许愿 */
    UIConst.XuyuanView = "XuyuanView";
    UIConst.TishiView = "TishiView";
    /**图鉴主界面 */
    UIConst.TujianView = "TujianView";
    /**评价输入界面 */
    UIConst.Tujian_PingjiaShuruView = "Tujian_PingjiaShuruView";
    /**英雄详细 */
    UIConst.TujianHeroView = "TujianHeroView";
    /** 羁绊属性界面 */
    UIConst.Tujian_AttrView = "Tujian_AttrView";
    /** 任务 */
    UIConst.TaskView = "TaskView";
    /** 成就：挑战详细任务 */
    UIConst.ChallengeDetailView = "ChallengeDetailView";
    UIConst.WarriorBuyLevelView = "WarriorBuyLevelView";
    UIConst.WarriorJinjieView = "WarriorJinjieView";
    /** 邮件 */
    UIConst.MailView = "MailView";
    UIConst.MailReadView = "MailReadView";
    /**集市刷新界面 */
    UIConst.ShopView = "ShopView";
    UIConst.Shop_RefreshView = "Shop_RefreshView";
    /**荣誉商店购买界面 */
    UIConst.Shop_BuyView = "Shop_BuyView";
    /**英雄评价 */
    UIConst.Tujian_PingjiaView = "Tujian_PingjiaView";
    /**怪物信息 */
    UIConst.GuaiwuxinxiView = "GuaiwuxinxiView";
    UIConst.WordMap = "WordMap";
    /**符文背包 */
    UIConst.FuwenBagView = "FuwenBagView";
    /**符文详细说明 */
    UIConst.FuwenBagDetails = "FuwenBagDetails";
    /**好友主界面 */
    UIConst.Friend_MainView = "Friend_MainView";
    /**符文强化 */
    UIConst.FuwenStrength = "FuwenStrength";
    /**背包主界面 */
    UIConst.BagView = "BagView";
    UIConst.ItemDetailView = "ItemDetailView";
    /**背包使用物品界面 */
    UIConst.Bag_UseView = "Bag_UseView";
    /**背包分解界面 */
    UIConst.Bag_RecycleView = "Bag_RecycleView";
    //展示模型
    UIConst.ShowRole = "ShowRole";
    /**试炼塔 */
    UIConst.ShiliantaView = "ShiliantaView";
    UIConst.SLT_GuanqiaView = "SLT_GuanqiaView";
    UIConst.SLT_JiangliView = "SLT_JiangliView";
    UIConst.SLT_RankView = "SLT_RankView";
    //探险
    UIConst.TanxianView = "TanxianView";
    //公会
    UIConst.GuildinitView = "GuildinitView";
    UIConst.GuildApplyListView = "GuildApplyListView";
    UIConst.CreateGuildView = "CreateGuildView";
    UIConst.GuildInfoView = "GuildInfo";
    UIConst.GuildNoticeView = "GuildNoticeView";
    UIConst.GuildSetUpView = "GuildSetUpView";
    UIConst.GuildMainView = "GuildMainView";
    UIConst.GuildDonationView = "GuildDonationView";
    UIConst.GuildCopyView = "GuildCopyView";
    UIConst.DamageRankView = "DamageRankView";
    UIConst.AtkEndRankView = "AtkEndRankView";
    UIConst.GuildNumBuyView = "GuildNumBuyView";
    UIConst.JishaJiangliView = "JishaJiangliView";
    UIConst.TongguanJiangliView = "TongguanJiangliView";
    UIConst.IconChangeView = "IconChangeView";
    UIConst.GuildSkillView = "GuildSkillView";
    UIConst.GuildCopySweepResultView = "GuildCopySweepResultView";
    UIConst.GuildHelpView = "GuildHelpView";
    UIConst.GuildAskHelpView = "GuildAskHelpView";
    /** 公会成员设置 */
    UIConst.GuildMemberSetView = "GuildMemberSetView";
    // 公会战
    UIConst.FightMainView = "FightMainView";
    UIConst.FightWaitView = "FightWaitView";
    UIConst.GroupRankView = "GroupRankView";
    UIConst.PersonRankView = "PersonRankView";
    UIConst.SeasonAwardView = "SeasonAwardView";
    UIConst.HonorHallView = "HonorHallView";
    UIConst.GradeChestView = "GradeChestView";
    // 荣耀之战
    UIConst.GloryFightView = "GloryFightView";
    UIConst.GloryLastReview = "GloryLastReview";
    UIConst.GloryWaitView = "GloryWaitView";
    UIConst.GloryRewardView = "GloryRewardView";
    UIConst.GloryRecordView = "GloryRecordView";
    UIConst.GloryGroupView = "GloryGroupView";
    // 升级
    UIConst.LevelUpView = "LevelUpView";
    //合成
    UIConst.HechengView = "HechengView";
    /**首充 */
    UIConst.TupUp_FirstView = "TupUp_FirstView";
    UIConst.ShouchongtishiView = "ShouchongtishiView";
    //活动
    UIConst.WelfareView = "WelfareView";
    UIConst.PayActivityView = "PayActivityView";
    UIConst.RealNameView = "RealNameView";
    UIConst.LuckyTurnView = "LuckyTurnView";
    UIConst.TurnRewardView = "TurnRewardView";
    UIConst.LuckRecordView = "LuckRecordView";
    //充值
    UIConst.ChongzhiView = "ChongzhiView";
    //大富翁
    UIConst.DafuwengView = "DafuwengView";
    UIConst.DFW_QiyuView = "DFW_QiyuView";
    UIConst.DFW_QiyuResultView = "DFW_QiyuResultView";
    //历练奖励
    UIConst.Lilian_RewardView = "Lilian_RewardView";
    //输入名字
    UIConst.CreateRoleView = "CreateRoleView";
    /**世界boss主界面 */
    UIConst.WorldBoss_BossView = "WorldBoss_BossView";
    /** 伤害排行 */
    UIConst.WorldBoss_RankView = "WorldBoss_RankView";
    UIConst.WorldBoss_RewardView = "WorldBoss_RewardView";
    /**组队副本主界面 */
    UIConst.Copy_TeamMainView = "Copy_TeamMainView";
    /** 组队副本挑战界面*/
    UIConst.CopyTeamBattleInfo = "CopyTeamBattleInfo";
    /** 组队副本组队大厅界面*/
    UIConst.CopyTeamBuild = "CopyTeamBuild";
    /** 组队副本队伍中界面*/
    UIConst.CopyTeamInfo = "CopyTeamInfo";
    /** 组队副本申请界面 */
    UIConst.CopyTeamApply = "CopyTeamApply";
    /** 组队副本奖励界面 */
    UIConst.CopyTeamRewardView = "CopyTeamRewardView";
    /** 组队副本邀请界面 */
    UIConst.CopyTeamInvite = "CopyTeamInvite";
    /** 组队副本邀请加入界面 */
    UIConst.CopyTeamInviteJoinView = "CopyTeamInviteJoinView";
    /** 组队副本转移队长界面 */
    UIConst.CopyTeamTransfer = "CopyTeamTransfer";
    //组队副本战斗开场ui
    UIConst.CopyTeamFightStart = "CopyTeamFightStart";
    //组队副本战斗开场ui
    UIConst.CopyTeamRank = "CopyTeamRank";
    /**每日副本主界面 */
    UIConst.Copy_DailyView = "Copy_DailyView";
    /**每日副本主界面 */
    UIConst.Copy_DailyMainView = "Copy_DailyMainView";
    /**每日副本购买次数界面 */
    UIConst.Copy_DailyBuyView = "Copy_DailyBuyView";
    // 远征
    UIConst.YuanzhengView = "YuanzhengView";
    /**远征回复血量界面 */
    UIConst.Yuanzheng_RecoveryView = "Yuanzheng_RecoveryView";
    /**远征奖励界面 */
    UIConst.Yuanzheng_RewardView = "Yuanzheng_RewardView";
    /**远征挑战界面 */
    UIConst.Yuanzheng_ChallengeView = "Yuanzheng_ChallengeView";
    /**远征挑战界面 */
    UIConst.Yuanzheng_HelpView = "Yuanzheng_HelpView";
    // 商队护送
    UIConst.EscortMainView = "EscortMainView";
    UIConst.CaravanInfoView = "CaravanInfoView";
    UIConst.EscortView = "EscortView";
    UIConst.RobbedRecordView = "RobbedRecordView";
    UIConst.EscortRewardView = "EscortRewardView";
    // 探险
    // static RiskView: string = "RiskView";
    // static DispatchGodsView: string = "DispatchGodsView";
    // 迷雾森林
    UIConst.FogForestView = "FogForestView";
    UIConst.FogForestRewardView = "FogForestRewardView";
    // 神秘岛屿
    UIConst.IslandView = "IslandView";
    UIConst.OreMapView = "OreMapView";
    UIConst.EmptyOreView = "EmptyOreView";
    UIConst.PlayerOreView = "PlayerOreView";
    UIConst.OreExplainView = "OreExplainView";
    UIConst.OreSettlementView = "OreSettlementView";
    UIConst.SelfOreView = "SelfOreView";
    //挂机失败
    UIConst.GuajiDefeated = "GuajiDefeated";
    //挂机胜利
    UIConst.GuajiVictory = "GuajiVictory";
    //更换装备
    UIConst.EquipChangeView = "EquipChangeView";
    //装备
    UIConst.EquipView = "EquipView";
    // 装备强化大师或精炼大师升级提示
    UIConst.EquipLvupView = "EquipLvupView";
    // 装备套装升级提示
    UIConst.EquipSuitLvupView = "EquipSuitLvupView";
    /**装备材料获取跳转界面 */
    UIConst.Equip_JumpView = "Equip_JumpView";
    /**装备精炼界面 */
    UIConst.Equip_Refine = "Equip_Refine";
    /**装备强化界面 */
    UIConst.Equip_StrengthView = "Equip_StrengthView";
    /**装备分解界面 */
    UIConst.Equip_Recycle = "Equip_Recycle";
    /**装备精炼、强化大师界面 */
    UIConst.Equip_MasterView = "Equip_MasterView";
    /** 装备套装 */
    UIConst.Equip_SuitView = "Equip_SuitView";
    //限时活动
    UIConst.TimeLimitView = "TimeLimitView";
    //兑换物品界面
    UIConst.ExchangeItemView = "ExchangeItemView";
    //周基金
    UIConst.WeekFundView = "WeekFundView";
    /**排行榜界面 */
    UIConst.RankView = "RankView";
    /**排行榜界面 */
    UIConst.RankTabView = "RankTabView";
    // 平台公告
    UIConst.LoginNoticeView = "LoginNoticeView";
    //等级基金
    UIConst.RatingFundView = "RatingFundView";
    //七日狂欢
    /**神器解锁界面 */
    UIConst.Artifact_UnLockView = "Artifact_UnLockView";
    /**神器洗练tip */
    UIConst.Artifact_BaptizeTip = "Artifact_BaptizeTip";
    /**神器附魔tip */
    UIConst.Artifact_EnchantTip = "Artifact_EnchantTip";
    /**神器收集Tip */
    UIConst.Artifact_ObtainTip = "Artifact_ObtainTip";
    /**神器穿戴界面 */
    UIConst.Artifact_WearView = "Artifact_WearView";
    UIConst.SevendaysView = "SevendaysView";
    /**神器主界面 */
    UIConst.ArtifactView = "ArtifactView";
    /**神器选择界面 */
    UIConst.ArtifactListView = "ArtifactListView";
    /**充值成功弹窗*/
    UIConst.Topup_SuccView = "Topup_SuccView";
    /**购买成功弹窗*/
    UIConst.Topup_GiftSuccView = "Topup_GiftSuccView";
    /**购买成功增加积分 */
    UIConst.Topup_ScoreView = "Topup_ScoreView";
    UIConst.ChatNoticeEffect = "ChatNoticeEffect";
    //英雄分解
    UIConst.FenjieView = "FenjieView";
    UIConst.StoreView = "StoreView";
    //战力提升
    UIConst.UpPower = "UpPower";
    UIConst.VipLvUpView = "VipLvUpView";
    //首次分享
    UIConst.FirstShare = "FirstShare";
    //分享
    UIConst.MainShare = "MainShare";
    //绑定手机
    UIConst.BindPhone = "BindPhone";
    //在线奖励
    UIConst.OnLineReward = "OnLineReward";
    //开服豪礼
    UIConst.OpenReward = "OpenReward";
    //神力排行
    UIConst.PowerRank = "PowerRank";
    UIConst.Pow_List = "Pow_List";
    //限购活动
    UIConst.LimiteBuyView = "LimiteBuyView";
    UIConst.Lim_JiangLiView = "Lim_JiangLiView";
    //微端下载
    UIConst.WeiDuanXiaZaiView = "WeiDuanXiaZaiView";
    /** 超级会员 */
    UIConst.SuperVipView = "SuperVipView";
    //推荐阵容
    UIConst.TuijianView = "TuijianView";
    /**竞技场新 */
    UIConst.ArenaView = "ArenaView";
    UIConst.ArenaRankView = "ArenaRankView";
    UIConst.ArenaFailView = "ArenaFailView";
    UIConst.ArenaSuccView = "ArenaSuccView";
    UIConst.ArenaResultView = "ArenaResultView";
    UIConst.ArenaRecordView = "ArenaRecordView";
    UIConst.ArenaTopRankView = "Arena_HistoryMaxView";
    // 匹配赛
    UIConst.ArenaMatchView = "ArenaMatchView";
    UIConst.MatchRewardView = "MatchRewardView";
    UIConst.MatchRankView = "MatchRankView";
    UIConst.MatchResultView = "MatchResultView";
    // 激战神域
    UIConst.GodDomainView = "GodDomainView";
    UIConst.GodDm_AutoMatchView = "GodDm_AutoMatchView";
    UIConst.GodDm_TeamView = "GodDm_TeamView";
    UIConst.GodDm_TeamListView = "GodDm_TeamListView";
    UIConst.GodDm_InviteView = "GodDm_InviteView";
    UIConst.GodDm_TeamMatchView = "GodDm_TeamMatchView";
    UIConst.GodDm_BattleResultView = "GodDm_BattleResultView";
    UIConst.GodDm_BattleSettlementView = "GodDm_BattleSettlementView";
    UIConst.GodDm_InviteJoinView = "GodDm_InviteJoinView";
    UIConst.GodDm_RankView = "GodDm_RankView";
    //我要变强
    UIConst.BianQiangView = "BianQiangView";
    UIConst.ShouYiXiangQingView = "ShouYiXiangQingView";
    //入口列表
    UIConst.EntranceList = "EntranceList";
    UIConst.EntranceList_lilian = "EntranceList_lilian";
    UIConst.EntranceList_jingji = "EntranceList_jingji";
    UIConst.EntranceList_kaufu = "EntranceList_kuafu";
    //战斗开场ui
    UIConst.General_FightStart = "General_FightStart";
    //激战神域战斗开场ui
    UIConst.GodDomain_FightStart = "GodDomain_FightStart";
    //购买战斗次数
    UIConst.BuyBattleCount = "BuyBattleCount";
    //开服礼包
    UIConst.OpenServerGift = "OpenServerGift";
    //自选包选择界面
    UIConst.RewardSelectView = "RewardSelectView";
    // 游戏内公告
    UIConst.GameNoticeView = "GameNoticeView";
    //进阶之路
    UIConst.UpRoadView = "UpRoadView";
    //进阶之路激活成功
    UIConst.UpRoadSuccessView = "UpRoadSuccessView";
    //展示奖励物品
    UIConst.ShowRewardItem = "ShowRewardItem";
    //关卡新界面
    UIConst.GuanQiaNewView = "GuanQiaNewView";
    //关卡信息
    UIConst.GuanQiaInfoView = "GuanQiaInfoView";
    /** 宝石替换界面 */
    UIConst.GemstoneReplaceView = "GemstoneReplaceView";
    /** 宝石合成界面 */
    UIConst.GemstoneCompoundView = "GemstoneCompoundView";
    UIConst.SingleCompoundView = "SingleCompoundView";
    /** 宝石tips */
    UIConst.GemstoneTipsView = "GemstoneTipsView";
    return UIConst;
}());
