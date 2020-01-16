/**
* UI枚举
*/
 class UIConst {
        static hud_group: string = "hud";       // 一级界面
        /**二级界面group */
        static two_group: string = "two";
        static team_two_group: string = "team_two_group";
        static login_group: string = "login";
        //hud
        static HudView: string = "HudView";
        static SelectListView: string = "SelectListView";
        static LoginView: string = "LoginView";
        static Main3DView: string = "Main3DView";
        static ChatView: string = "ChatView";
        static XianshiBaoxiangView: string = "XianshiBaoxiangView";
        static SysTopView: string = "SysTopView";
        static ShowSkill: string = "ShowSkill";
        // 玩家详细界面
        static PlayerDetailsView: string = "PlayerDetailsView";
        // 英雄形象界面
        static HeroicModelView : string = "HeroicModelView";
        static CheatView: string = "CheatView";
        static Hud_ChangeNameView: string = "Hud_ChangeNameView";
        /**私聊界面 */
        static Chat_SiliaoView: string = "Chat_SiliaoView";
        static CommonRewardView: string = "CommonRewardView";
        static GuideTalkView: string = "GuideTalkView";
        static GuideMask: string = "GuideMask";
        static CommonRuleView: string = "CommonRuleView";
        static CommonItemBuyView: string = "CommonItemBuyView";
        static PlayerInfoView: string = "PlayerInfoView";
        static ComsumeAlert: string = "ComsumeAlert";
        static AlertBox: string = "AlertBox";
        static ExchangeGoldView: string = "ExchangeGoldView";
        static PlayerLineupInfoView: string = "PlayerLineupInfoView";
        //战斗
        static FightViews: string = "FightViews";
        static FightResultView: string = "FightResultView";
        static FightActivityResultView: string = "FightActivityResultView";
        static FightGuildCopyResultView: string = "FightGuildCopyResultView";
        static FightFailure: string = "FightFailure";
        static FightVictory: string = "FightVictory";
        static FightVictoryQc: string = "FightVictoryQc";
        static FirstGuide: string = "FirstGuide";
        static FightTishiView: string = "FightTishiView"
        static GloryFightResultView: string = "GloryFightResultView"
        //挂机
        static GuajiView: string = "GuajiView";
        static GuanqiaView: string = "GuanqiaView";
        static OpenChapterView: string = "OpenChapterView";
        /**挂机快速战斗 */
        static Guaji_FastView: string = "Guaji_FastView";
        /**挂机收益提升界面 */
        static Guaji_ShouyiUpView: string = "Guaji_ShouyiUpView";
        /**挂机收益界面 */
        static Guaji_ShouyiView: string = "Guaji_ShouyiView";
        /**神界之门主界面 */
        static GodDoorView: string = "GodDoorView";
        /**神界之门奖励预览界面 */
        static GodDoor_JiangliView: string = "GodDoor_JiangliView";
        /**召唤结果页面 */
        static ZH_ResultView: string = "ZH_ResultView";
        /**召唤主页面 */
        static ZH_MainView: string = "ZH_MainView";
        /**英雄主界面 */
        static God_MainView: string = "God_MainView";
        static BuzhenView: string = "BuzhenView";
        /**阵营克制界面 */
        static God_kezhiView: string = "God_kezhiView";
        static XuanzeView: string = "XuanzeView";
        static SkillupView: string = "SkillupView";
        static GodUpStarView: string = "GodUpStarView";
        static GodUpLevelView: string = "GodUpLevelView";
        /**升阶界面 */
        static God_DgUpView: string = "God_DgUpView";
        /**升阶成功 */
        static God_DgUp_SUCCView: string = "God_DgUp_SUCCView";
        /**神灵属性总览 */
        static God_AttrView: string = "God_AttrView";
        /**融魂等级介绍界面 */
        static God_fuseView: string = "God_fuseView";
        /**突破界面 */
        static God_TupoView: string = "God_TupoView";
        /**选择英雄界面 : 新 */
        static God_ChooseGodView: string = "God_ChooseGodView";
        /** 英雄更换界面 */
        static God_ReplaceGodView: string = "God_ReplaceGodView";
        /** 英雄养成界面 */
        static God_GodCultureView: string = "God_GodCultureView";
        static GodSkinView: string = "GodSkinView";
        /** 立绘 */
        static GodLiHuiView: string = "GodLiHuiView";
         /** 用户须知 */
        static UserNoticeView: string = "UserNoticeView";

        /** 选择圣物界面 */
        static ChooseTreasureView: string = "ChooseTreasureView";
        /** 圣物强化 */
        static TreasureStrengthView : string = "TreasureStrengthView";
        /** 圣物物升星 */
        static TreasureStarupView : string = "TreasureStarupView";
        /** 圣物tips */
        static TreasureTipsView : string = "TreasureTipsView";
        /** 选择圣物材料界面 */
        static ChooseTreasureMaterialView : string = "ChooseTreasureMaterialView";
        /** 圣物星级预览 */
        static TreasureStarAttrPreview : string = "TreasureStarAttrPreview";
        /** 圣物图鉴界面 */
        static TreasureTujianView : string = "TreasureTujianView";
        /** 圣物重生界面 */
        static TreasureRebirthView : string = "TreasureRebirthView";
        /** 登入礼包 */
        static LoginGiftView : string = "LoginGiftView";
        /** 内侧返利 */
        static TestRebateView : string = "TestRebateView";
        
        //toast
        static PromptToast: string = "PromptToast";
        static ItemTip: string = "ItemTip";
        static SkillTip: string = "SkillTip";
        static EffectList: string = "EffectList";
        static ManyItemsTip: string = "ManyItemsTip";
        static EquipTip: string = "EquipTip";
        /**许愿 */
        static XuyuanView: string = "XuyuanView";
        static TishiView: string = "TishiView";
        /**图鉴主界面 */
        static TujianView: string = "TujianView";
        /**评价输入界面 */
        static Tujian_PingjiaShuruView: string = "Tujian_PingjiaShuruView";
        /**英雄详细 */
        static TujianHeroView: string = "TujianHeroView";
        /** 羁绊属性界面 */
        static Tujian_AttrView: string = "Tujian_AttrView";
        /** 任务 */
        static TaskView: string = "TaskView";
        /** 成就：挑战详细任务 */
        static ChallengeDetailView: string = "ChallengeDetailView";
        static WarriorBuyLevelView: string = "WarriorBuyLevelView";
        static WarriorJinjieView: string = "WarriorJinjieView";
        
        /** 邮件 */
        static MailView: string = "MailView";
        static MailReadView: string = "MailReadView";
        /**集市刷新界面 */
        static ShopView: string = "ShopView";
        static Shop_RefreshView: string = "Shop_RefreshView";
        /**荣誉商店购买界面 */
        static Shop_BuyView: string = "Shop_BuyView";
        /**英雄评价 */
        static Tujian_PingjiaView: string = "Tujian_PingjiaView";
        /**怪物信息 */
        static GuaiwuxinxiView: string = "GuaiwuxinxiView";
        static WordMap: string = "WordMap";
        /**符文背包 */
        static FuwenBagView: string = "FuwenBagView";
        /**符文详细说明 */
        static FuwenBagDetails: string = "FuwenBagDetails";
        /**好友主界面 */
        static Friend_MainView: string = "Friend_MainView";
        /**符文强化 */
        static FuwenStrength: string = "FuwenStrength";
        /**背包主界面 */
        static BagView: string = "BagView";
        static ItemDetailView: string = "ItemDetailView";
        /**背包使用物品界面 */
        static Bag_UseView: string = "Bag_UseView";
        /**背包分解界面 */
        static Bag_RecycleView: string = "Bag_RecycleView";
        //展示模型
        static ShowRole: string = "ShowRole";
        /**试炼塔 */
        static ShiliantaView: string = "ShiliantaView";
        static SLT_GuanqiaView: string = "SLT_GuanqiaView";
        static SLT_JiangliView: string = "SLT_JiangliView";
        static SLT_RankView: string = "SLT_RankView";
        //探险
        static TanxianView: string = "TanxianView";
        //公会
        static GuildinitView: string = "GuildinitView";
        static GuildApplyListView: string = "GuildApplyListView";
        static CreateGuildView: string = "CreateGuildView";
        static GuildInfoView: string = "GuildInfo";
        static GuildNoticeView: string = "GuildNoticeView";
        static GuildSetUpView: string = "GuildSetUpView";
        static GuildMainView: string = "GuildMainView";
        static GuildDonationView: string = "GuildDonationView";
        static GuildCopyView: string = "GuildCopyView";
        static DamageRankView: string = "DamageRankView";
        static AtkEndRankView: string = "AtkEndRankView";
        static GuildNumBuyView: string = "GuildNumBuyView";
        static JishaJiangliView: string = "JishaJiangliView";
        static TongguanJiangliView: string = "TongguanJiangliView";
        static IconChangeView: string = "IconChangeView";
        static GuildSkillView: string = "GuildSkillView";
        static GuildCopySweepResultView: string = "GuildCopySweepResultView";
        static GuildHelpView: string = "GuildHelpView";
        static GuildAskHelpView: string = "GuildAskHelpView";
        /** 公会成员设置 */
        static GuildMemberSetView : string = "GuildMemberSetView";
        // 公会战
        static FightMainView: string = "FightMainView";
        static FightWaitView: string = "FightWaitView";
        static GroupRankView: string = "GroupRankView";
        static PersonRankView: string = "PersonRankView";
        static SeasonAwardView: string = "SeasonAwardView";
        static HonorHallView: string = "HonorHallView";
        static GradeChestView: string = "GradeChestView";
        // 荣耀之战
        static GloryFightView: string = "GloryFightView";
        static GloryLastReview: string = "GloryLastReview";
        static GloryWaitView: string = "GloryWaitView";
        static GloryRewardView: string = "GloryRewardView";
        static GloryRecordView: string = "GloryRecordView";
        static GloryGroupView: string = "GloryGroupView";
        // 升级
        static LevelUpView: string = "LevelUpView";
        //合成
        static HechengView: string = "HechengView";
        /**首充 */
        static TupUp_FirstView: string = "TupUp_FirstView";
        static ShouchongtishiView: string = "ShouchongtishiView";
        //活动
        static WelfareView: string = "WelfareView";
        static PayActivityView: string = "PayActivityView";
        static RealNameView: string = "RealNameView";
        static LuckyTurnView: string = "LuckyTurnView";
        static TurnRewardView: string = "TurnRewardView";
        static LuckRecordView: string = "LuckRecordView";
        //充值
        static ChongzhiView: string = "ChongzhiView";
        //大富翁
        static DafuwengView: string = "DafuwengView";
        static DFW_QiyuView: string = "DFW_QiyuView";
        static DFW_QiyuResultView: string = "DFW_QiyuResultView";
        //历练奖励
        static Lilian_RewardView: string = "Lilian_RewardView";
        //输入名字
        static CreateRoleView: string = "CreateRoleView";
        /**世界boss主界面 */
        static WorldBoss_BossView: string = "WorldBoss_BossView";
        /** 伤害排行 */
        static WorldBoss_RankView: string = "WorldBoss_RankView";
        static WorldBoss_RewardView: string = "WorldBoss_RewardView";

        
        /**组队副本主界面 */
        static Copy_TeamMainView: string = "Copy_TeamMainView";
        /** 组队副本挑战界面*/
        static CopyTeamBattleInfo: string = "CopyTeamBattleInfo";
        /** 组队副本组队大厅界面*/
        static CopyTeamBuild: string = "CopyTeamBuild";
        /** 组队副本队伍中界面*/
        static CopyTeamInfo: string = "CopyTeamInfo";
        /** 组队副本申请界面 */
        static CopyTeamApply: string = "CopyTeamApply";
        /** 组队副本奖励界面 */
        static CopyTeamRewardView: string = "CopyTeamRewardView";
        /** 组队副本邀请界面 */
        static CopyTeamInvite: string = "CopyTeamInvite";
        /** 组队副本邀请加入界面 */
        static CopyTeamInviteJoinView: string = "CopyTeamInviteJoinView";
        /** 组队副本转移队长界面 */
        static CopyTeamTransfer: string = "CopyTeamTransfer";
        //组队副本战斗开场ui
        static CopyTeamFightStart : string = "CopyTeamFightStart";
        //组队副本战斗开场ui
        static CopyTeamRank : string = "CopyTeamRank";

        /**每日副本主界面 */
        static Copy_DailyView: string = "Copy_DailyView";
        /**每日副本主界面 */
        static Copy_DailyMainView: string = "Copy_DailyMainView";
        /**每日副本购买次数界面 */
        static Copy_DailyBuyView: string = "Copy_DailyBuyView";
        // 远征
        static YuanzhengView: string = "YuanzhengView";
        /**远征回复血量界面 */
        static Yuanzheng_RecoveryView: string = "Yuanzheng_RecoveryView";
        /**远征奖励界面 */
        static Yuanzheng_RewardView: string = "Yuanzheng_RewardView";
        /**远征挑战界面 */
        static Yuanzheng_ChallengeView: string = "Yuanzheng_ChallengeView";
        /**远征挑战界面 */
        static Yuanzheng_HelpView: string = "Yuanzheng_HelpView";
        // 商队护送
        static EscortMainView: string = "EscortMainView";
        static CaravanInfoView: string = "CaravanInfoView";
        static EscortView: string = "EscortView";
        static RobbedRecordView: string = "RobbedRecordView";
        static EscortRewardView: string = "EscortRewardView";
        // 探险
        // static RiskView: string = "RiskView";
        // static DispatchGodsView: string = "DispatchGodsView";
        // 迷雾森林
        static FogForestView: string = "FogForestView";
        static FogForestRewardView: string = "FogForestRewardView";
        // 神秘岛屿
        static IslandView: string = "IslandView";
        static OreMapView: string = "OreMapView";
        static EmptyOreView: string = "EmptyOreView";
        static PlayerOreView: string = "PlayerOreView";
        static OreExplainView: string = "OreExplainView";
        static OreSettlementView: string = "OreSettlementView";
        static SelfOreView: string = "SelfOreView";
        //挂机失败
        static GuajiDefeated: string = "GuajiDefeated";
        //挂机胜利
        static GuajiVictory: string = "GuajiVictory";
        //更换装备
        static EquipChangeView: string = "EquipChangeView";
        //装备
        static EquipView: string = "EquipView";
        // 装备强化大师或精炼大师升级提示
        static EquipLvupView: string = "EquipLvupView";
        // 装备套装升级提示
        static EquipSuitLvupView: string = "EquipSuitLvupView";
        /**装备材料获取跳转界面 */
        static Equip_JumpView: string = "Equip_JumpView";
        /**装备精炼界面 */
        static Equip_Refine: string = "Equip_Refine";
        /**装备强化界面 */
        static Equip_StrengthView: string = "Equip_StrengthView";
        /**装备分解界面 */
        static Equip_Recycle: string = "Equip_Recycle";
        /**装备精炼、强化大师界面 */
        static Equip_MasterView: string = "Equip_MasterView";
        /** 装备套装 */
        static Equip_SuitView: string = "Equip_SuitView";
        //限时活动
        static TimeLimitView: string = "TimeLimitView";
        //兑换物品界面
        static ExchangeItemView: string = "ExchangeItemView";
        //周基金
        static WeekFundView: string = "WeekFundView";
        /**排行榜界面 */
        static RankView: string = "RankView";
        /**排行榜界面 */
        static RankTabView: string = "RankTabView";
        // 平台公告
        static LoginNoticeView: string = "LoginNoticeView";
        //等级基金
        static RatingFundView: string = "RatingFundView";
        //七日狂欢
        /**神器解锁界面 */
        static Artifact_UnLockView: string = "Artifact_UnLockView";
        /**神器洗练tip */
        static Artifact_BaptizeTip: string = "Artifact_BaptizeTip";
        /**神器附魔tip */
        static Artifact_EnchantTip: string = "Artifact_EnchantTip";
        /**神器收集Tip */
        static Artifact_ObtainTip: string = "Artifact_ObtainTip";
        /**神器穿戴界面 */
        static Artifact_WearView: string = "Artifact_WearView";
        static SevendaysView: string = "SevendaysView";
        /**神器主界面 */
        static ArtifactView: string = "ArtifactView";
        /**神器选择界面 */
        static ArtifactListView: string = "ArtifactListView";
        /**充值成功弹窗*/
        static Topup_SuccView: string = "Topup_SuccView";
         /**购买成功弹窗*/
        static Topup_GiftSuccView: string = "Topup_GiftSuccView";
        /**购买成功增加积分 */
        static Topup_ScoreView: string = "Topup_ScoreView";
        static ChatNoticeEffect: string = "ChatNoticeEffect";
        //英雄分解
        static FenjieView: string = "FenjieView";
        static StoreView: string = "StoreView";
        //战力提升
        static UpPower: string = "UpPower";
        static VipLvUpView: string = "VipLvUpView";

        //首次分享
        static FirstShare: string = "FirstShare";
        //分享
        static MainShare: string = "MainShare";
        //绑定手机
        static BindPhone: string = "BindPhone";
        //在线奖励
        static OnLineReward: string = "OnLineReward";
        //开服豪礼
        static OpenReward: string = "OpenReward";
        //神力排行
        static PowerRank: string = "PowerRank";
        static Pow_List: string = "Pow_List";
        //限购活动
        static LimiteBuyView: string = "LimiteBuyView";
        static Lim_JiangLiView: string = "Lim_JiangLiView";
        //微端下载
        static WeiDuanXiaZaiView: string = "WeiDuanXiaZaiView";
        /** 超级会员 */
        static SuperVipView: string = "SuperVipView";

        //推荐阵容
        static TuijianView: string = "TuijianView";
        /**竞技场新 */
        static ArenaView: string = "ArenaView";
        static ArenaRankView: string = "ArenaRankView";
        static ArenaFailView: string = "ArenaFailView";
        static ArenaSuccView: string = "ArenaSuccView";
        static ArenaResultView: string = "ArenaResultView";
        static ArenaRecordView: string = "ArenaRecordView";
        static ArenaTopRankView: string = "Arena_HistoryMaxView";
        // 匹配赛
        static ArenaMatchView: string = "ArenaMatchView";
        static MatchRewardView: string = "MatchRewardView";
        static MatchRankView: string = "MatchRankView";
        static MatchResultView: string = "MatchResultView";
        // 激战神域
        static GodDomainView : string = "GodDomainView";
        static GodDm_AutoMatchView : string = "GodDm_AutoMatchView";
        static GodDm_TeamView : string = "GodDm_TeamView";
        static GodDm_TeamListView : string = "GodDm_TeamListView";
        static GodDm_InviteView : string = "GodDm_InviteView";
        static GodDm_TeamMatchView : string = "GodDm_TeamMatchView";
        static GodDm_BattleResultView : string = "GodDm_BattleResultView";
        static GodDm_BattleSettlementView : string = "GodDm_BattleSettlementView";
        static GodDm_InviteJoinView : string = "GodDm_InviteJoinView";
        static GodDm_RankView : string = "GodDm_RankView";
        //我要变强
        static BianQiangView : string = "BianQiangView";
        static ShouYiXiangQingView : string = "ShouYiXiangQingView";
        //入口列表
        static EntranceList : string = "EntranceList";
        static EntranceList_lilian : string = "EntranceList_lilian";
        static EntranceList_jingji : string = "EntranceList_jingji";
        static EntranceList_kaufu : string = "EntranceList_kuafu";
        //战斗开场ui
        static General_FightStart : string = "General_FightStart";
        //激战神域战斗开场ui
        static GodDomain_FightStart : string = "GodDomain_FightStart";
        //购买战斗次数
        static BuyBattleCount : string = "BuyBattleCount";
        //开服礼包
        static OpenServerGift : string = "OpenServerGift";
        //自选包选择界面
        static RewardSelectView : string = "RewardSelectView";
        // 游戏内公告
        static GameNoticeView : string = "GameNoticeView";
        //进阶之路
        static UpRoadView : string = "UpRoadView";
        //进阶之路激活成功
        static UpRoadSuccessView : string = "UpRoadSuccessView";
        //展示奖励物品
        static ShowRewardItem : string = "ShowRewardItem";
        //关卡新界面
        static GuanQiaNewView : string = "GuanQiaNewView";
        //关卡信息
        static GuanQiaInfoView : string = "GuanQiaInfoView";

        /** 宝石替换界面 */
        static GemstoneReplaceView : string = "GemstoneReplaceView";
        /** 宝石合成界面 */
        static GemstoneCompoundView : string = "GemstoneCompoundView";
        static SingleCompoundView : string = "SingleCompoundView";
        /** 宝石tips */
        static GemstoneTipsView : string = "GemstoneTipsView";
}