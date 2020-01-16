/**
* name 
*/
import Sprite = Laya.Sprite;

enum UI_DEPATH { BOTTOM, MIDDLE, TOP, GUIDE, LOADING, WAITING, ALERT }
enum UI_DEPATH_VALUE { BOTTOM = -20, MIDDLE = -10, TOP = 0, GUIDE = 20, LOADING = 30, WAITING = 40, ALERT = 41 }

/** ui信息 */
interface UIInfo {
	uiname: string;		// ui名称
	cls: any;				// ui逻辑类
	depth: UI_DEPATH;		// ui成绩
	atlases: string[];		// ui预加载资源数组
	destroyAtlases: string[];// 需要释放的资源数组
	popEffect: boolean;	// 是否打开特效
	isModal: boolean;		// 是否模态窗口
	closeOther: boolean;	// 是否关闭其他
	parentUI: string;		// 父类ui名称
	isQueue : boolean;		// 是否是队列弹窗
	adaptStage : boolean;	// 适配舞台
}

class UIMgr {
	public static _instance: UIMgr;
	private _uicache: any;
	private _uiregist: Object = {};

	public static getInstance(): UIMgr {
		if (!UIMgr._instance) {
			UIMgr._instance = new UIMgr();

		}
		return UIMgr._instance;
	}

	constructor() {
		this._uicache = {};
		UIConfig.closeDialogOnSide = true;
		UIConfig.popupBgAlpha = 0.7;
		DialogExt.manager = new DialogExtMgr();
		DialogExt.manager.width = Laya.stage.width;
		DialogExt.manager.height = Laya.stage.height;
		DialogExt.manager.zOrder = 0;
		//hud
		this.registerUI(game.MainView, UIConst.Main3DView, null, null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.ChatView, UIConst.ChatView, ["chat/face.atlas","chat.atlas"], null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.PrivateChatView, UIConst.Chat_SiliaoView, ["chat/face.atlas","chat.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(common.CheatView, UIConst.CheatView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.PlayerDetailsView, UIConst.PlayerDetailsView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.HudChangeNameView, UIConst.Hud_ChangeNameView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.HeroicModelView, UIConst.HeroicModelView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.HudView, UIConst.HudView, null, null, UI_DEPATH.MIDDLE, false, false,false,null,false,true);
		this.registerUI(common.CommonRuleView, UIConst.CommonRuleView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ExchangeGoldView, UIConst.ExchangeGoldView, ["jinbiduihuan.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(common.PlayerInfoView, UIConst.PlayerInfoView, null, null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(common.PlayerLineupInfoView, UIConst.PlayerLineupInfoView, null, null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(common.XianshiBaoxiangView, UIConst.XianshiBaoxiangView, null, ["xianshibaoxiang.atlas"], UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.EntranceListView, UIConst.EntranceList, null, null, UI_DEPATH.BOTTOM, false, false, false,null,false,true);
		this.registerUI(game.EntranceListView, UIConst.EntranceList_lilian, null, null, UI_DEPATH.BOTTOM, false, false, false,null,false,true);
		this.registerUI(game.EntranceListView, UIConst.EntranceList_jingji, null, null, UI_DEPATH.BOTTOM, false, false, false,null,false,true);
		this.registerUI(game.EntranceListView, UIConst.EntranceList_kaufu, null, null, UI_DEPATH.BOTTOM, false, false, false,null,false,true);
		this.registerUI(game.SysTopView, UIConst.SysTopView, null, null, UI_DEPATH.MIDDLE, false, false,false,null,false,true);
		this.registerUI(common.showSkill, UIConst.ShowSkill, null, null, UI_DEPATH.TOP, false, false);
		//登录
		this.registerUI(game.CreateRoleView, UIConst.CreateRoleView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.UserNoticeView, UIConst.UserNoticeView, null, null, UI_DEPATH.TOP, false, true, false);
		this.registerUI(game.SelectServerView, UIConst.SelectListView, null, null, UI_DEPATH.BOTTOM, false, false, true,null,false,true);
		this.registerUI(game.LoginView, UIConst.LoginView, null, null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GuideTalkView, UIConst.GuideTalkView, null, null, UI_DEPATH.GUIDE, false, true,false,null,false,true);
		this.registerUI(game.GuideMask, UIConst.GuideMask, null, null, UI_DEPATH.GUIDE, false, false,false,null,false,true);
		this.registerUI(common.CommonRewardView, UIConst.CommonRewardView, null, null, UI_DEPATH.TOP, true, true,false,null,true);
		this.registerUI(common.ShowRewardView, UIConst.ShowRewardItem, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(common.ShowRole, UIConst.ShowRole, ["effects/godstarup.atlas"], null, UI_DEPATH.TOP, false, true);
		//战斗
		this.registerUI(game.FightView, UIConst.FightViews, ["fight.atlas"], null, UI_DEPATH.TOP, false, false, true,null,false,true);
		//收益详情界面
		this.registerUI(game.ShouYiXiangQingView, UIConst.ShouYiXiangQingView, null, null, UI_DEPATH.TOP, true, true);
		//激战神域战斗开始
		this.registerUI(game.GodDmFightStart, UIConst.GodDomain_FightStart,["jizhanshengyu.atlas"], ["jizhanshengyu/difang_bj1.png","jizhanshengyu/difang_bj.png","jizhanshengyu/wofang_bj.png","jizhanshengyu/wofang_bj1.png"], UI_DEPATH.ALERT,false,true);
		//通用战斗开始
		this.registerUI(game.FightStart, UIConst.General_FightStart,null, null, UI_DEPATH.ALERT,false,true);
		this.registerUI(game.FirstGuideView, UIConst.FirstGuide, null, null, UI_DEPATH.TOP, false, true, true);
		this.registerUI(game.GuildCopyResultView, UIConst.FightGuildCopyResultView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.Failure, UIConst.FightFailure, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true,false,null,true);
		this.registerUI(game.VictoryView, UIConst.FightVictory, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true,false,null,true);
		this.registerUI(game.guajiVictory, UIConst.GuajiVictory, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true,false,null,true);
		this.registerUI(game.guajiDefeated, UIConst.GuajiDefeated, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true,false,null,true);
		this.registerUI(game.VictoryQieCuoView, UIConst.FightVictoryQc, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.FightTishiView, UIConst.FightTishiView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GloryFightResultView, UIConst.GloryFightResultView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		//历练
		this.registerUI(game.GuaiwuxinxiView, UIConst.GuaiwuxinxiView, null, null, UI_DEPATH.LOADING, true, true);
		this.registerUI(game.WorldMapView, UIConst.WordMap, ['guaji/worldmap.atlas'], null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.GuaJiRewardView, UIConst.Lilian_RewardView, null, null, UI_DEPATH.TOP, false, true);
		this.registerUI(game.GuanQiaNewView, UIConst.GuanQiaNewView, null, null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.GuanQiaInfoView, UIConst.GuanQiaInfoView, null, null, UI_DEPATH.TOP, true, true, false);
		//神界之门
		this.registerUI(game.CurMainView, UIConst.GodDoorView, ["shenjiezhimen.atlas"], null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.GodDoorJiangliView, UIConst.GodDoor_JiangliView, null, null, UI_DEPATH.TOP, true, true);
		//竞技场（新）
		this.registerUI(game.ArenaView, UIConst.ArenaView, ['jingjichang.atlas'], null, UI_DEPATH.BOTTOM, false,false,false,null,false,true);
		this.registerUI(game.ArenaTopRankView, UIConst.ArenaTopRankView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArenaResultView, UIConst.ArenaResultView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArenaRecordView, UIConst.ArenaRecordView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArenaFailView, UIConst.ArenaFailView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArenaSuccView, UIConst.ArenaSuccView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArenaRankView, UIConst.ArenaRankView, null, null, UI_DEPATH.TOP, true, true);
		// 匹配赛 
		this.registerUI(game.MatchView, UIConst.ArenaMatchView, null, null, UI_DEPATH.BOTTOM, false, false,false,null,false,true);
		this.registerUI(game.MatchRewardView, UIConst.MatchRewardView,null , null, UI_DEPATH.TOP, true, true, false, UIConst.ArenaMatchView);
		this.registerUI(game.MatchRankView, UIConst.MatchRankView, null, null, UI_DEPATH.TOP, true, true, false, UIConst.ArenaMatchView);
		this.registerUI(game.MatchResultView, UIConst.MatchResultView, ["zhandoubiaoxian.atlas"] , null, UI_DEPATH.TOP, true, true);
		//召唤
		this.registerUI(game.ZhaohuanResultView, UIConst.ZH_ResultView, null, ["tujian.atlas"], UI_DEPATH.TOP, false, true);
		this.registerUI(game.ZhaohuanView, UIConst.ZH_MainView, null, null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		//英雄分解
		this.registerUI(game.FenjieView, UIConst.FenjieView, null, ["shenlingfenjie/ditu.jpg"], UI_DEPATH.TOP,true,true);
		//英雄
		this.registerUI(game.GodMainView, UIConst.God_MainView, ["shenling.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.BuzhenView, UIConst.BuzhenView, null, null, UI_DEPATH.TOP, false, true);
		this.registerUI(game.kezhiView, UIConst.God_kezhiView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.DgUpView, UIConst.God_DgUpView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.DgUpSuccView, UIConst.God_DgUp_SUCCView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GodAttrView, UIConst.God_AttrView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ChooseGodView, UIConst.God_ChooseGodView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ReplaceGodView, UIConst.God_ReplaceGodView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GodSkinView, UIConst.GodSkinView, [`shizhuang.atlas`], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GodCultureView, UIConst.God_GodCultureView, ["shenling.atlas"], null, UI_DEPATH.TOP, true, true,false,null,false,true);
		this.registerUI(game.GodLiHuiView, UIConst.GodLiHuiView, null, null, UI_DEPATH.TOP, true, true,false,null,false,true);
		// 圣物
		this.registerUI(game.ChooseTreasureView, UIConst.ChooseTreasureView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TreasureStrengthView, UIConst.TreasureStrengthView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TreasureStarupView, UIConst.TreasureStarupView, ["baowu.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ChooseTreasureMaterialView, UIConst.ChooseTreasureMaterialView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TreasureStarAttrPreview, UIConst.TreasureStarAttrPreview, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TreasureTujianView, UIConst.TreasureTujianView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TreasureRebirthView, UIConst.TreasureRebirthView, null, null, UI_DEPATH.TOP, true, true);

		this.registerUI(game.fuseView, UIConst.God_fuseView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TupoView, UIConst.God_TupoView, null, null, UI_DEPATH.TOP, true, true);
		//tip
		this.registerUI(common.EffectList, UIConst.EffectList, null, null, UI_DEPATH.TOP);
		this.registerUI(common.SkillTip, UIConst.SkillTip, null, null, UI_DEPATH.LOADING, false, false);
		this.registerUI(common.ItemTip, UIConst.ItemTip, null, null, UI_DEPATH.ALERT, true, true);
		this.registerUI(common.ManyItemsTip, UIConst.ManyItemsTip, null, null, UI_DEPATH.LOADING, true, true);

		this.registerUI(game.GameNoticeView, UIConst.GameNoticeView, null, null, UI_DEPATH.LOADING, true,true);

		//图鉴
		this.registerUI(game.TujianView, UIConst.TujianView, ["tujian.atlas"], null, UI_DEPATH.TOP, true, true, false, UIConst.Main3DView);
		this.registerUI(game.TujianHeroView, UIConst.TujianHeroView, null, ['tujian/beijin.jpg'], UI_DEPATH.TOP,true,true,false);
		this.registerUI(game.AttrView, UIConst.Tujian_AttrView, null, null, UI_DEPATH.TOP, true, true);
		//评价
		this.registerUI(game.PingjiaView, UIConst.Tujian_PingjiaView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.PingjiaShuruView, UIConst.Tujian_PingjiaShuruView, null, null, UI_DEPATH.TOP, false, true);

		// 任务
		this.registerUI(game.TaskView, UIConst.TaskView, ["task.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ChallengeDetailView, UIConst.ChallengeDetailView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.WarriorBuyLevelView, UIConst.WarriorBuyLevelView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.WarriorJinjieView, UIConst.WarriorJinjieView, null, null, UI_DEPATH.TOP, true, true);
		// 邮件
		this.registerUI(game.MailView, UIConst.MailView, ["mail.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.MailReadView, UIConst.MailReadView, null, ["mail/mail_di.png"], UI_DEPATH.TOP, true, true);
		//商店
		this.registerUI(game.ShopView, UIConst.ShopView, ["shop.atlas"], null, UI_DEPATH.BOTTOM, false, false, false,null,false,true);
		this.registerUI(game.RefreshView, UIConst.Shop_RefreshView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.BuyView, UIConst.Shop_BuyView, null, null, UI_DEPATH.TOP, true, true);
		//大富翁
		this.registerUI(game.DafuwengView, UIConst.DafuwengView, ['tanxian.atlas'], null, UI_DEPATH.TOP,false,false,true,null,false,true);
		this.registerUI(game.QiyuView, UIConst.DFW_QiyuView, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.QiyuResultView, UIConst.DFW_QiyuResultView, null, null, UI_DEPATH.TOP,true,true);
		//挂机
		this.registerUI(game.GuajiView, UIConst.GuajiView, ["guaji.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.FastFightView, UIConst.Guaji_FastView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ShouyiUpView, UIConst.Guaji_ShouyiUpView, null, null, UI_DEPATH.TOP,true,false,false,null,true);
		this.registerUI(game.ShouyiView, UIConst.Guaji_ShouyiView, null, null, UI_DEPATH.TOP,true,true,false,null,true);
		this.registerUI(game.OpenChapterView, UIConst.OpenChapterView, ["guaji.atlas"], null, UI_DEPATH.TOP,true,true,false,null,true);
		//好友
		this.registerUI(game.FriendMain, UIConst.Friend_MainView, ["friend.atlas"], null, UI_DEPATH.TOP, true, true,false,UIConst.Main3DView);
		//背包
		this.registerUI(game.BagView, UIConst.BagView, ["bag.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.UseView, UIConst.Bag_UseView, null, null, UI_DEPATH.LOADING, true, true);
		this.registerUI(game.RecycleView, UIConst.Bag_RecycleView, ["bag.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.RewardSelectView, UIConst.RewardSelectView, null, null, UI_DEPATH.TOP, true, true);
		//试炼塔
		this.registerUI(game.TowerView, UIConst.ShiliantaView, ["shilianta.atlas","tanxian/yun11.png","tanxian/yun22.png"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.TowerJiangliView, UIConst.SLT_JiangliView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TowerGuanqiaView, UIConst.SLT_GuanqiaView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TowerRankView, UIConst.SLT_RankView, null, null, UI_DEPATH.TOP, true, true);
		//公会
		this.registerUI(game.CreateGuildView, UIConst.CreateGuildView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildApplyListView, UIConst.GuildApplyListView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildInfoView, UIConst.GuildInfoView, ["gonghui.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildinitView, UIConst.GuildinitView, ["gonghui.atlas"], null, UI_DEPATH.TOP, true, true, false, UIConst.Main3DView);
		this.registerUI(game.GuildNoticeView, UIConst.GuildNoticeView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildSetUpView, UIConst.GuildSetUpView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildMainView, UIConst.GuildMainView, ["gonghui.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GuildDonationView, UIConst.GuildDonationView, ["gonghui/donation.atlas"], null, UI_DEPATH.TOP, true, true, false, UIConst.GuildMainView);
		this.registerUI(game.GuildCopyView, UIConst.GuildCopyView, null, ["gonghui/gonghuifuben_di.jpg"], UI_DEPATH.TOP, true, true, false, UIConst.GuildMainView);
		this.registerUI(game.DamageRankView, UIConst.DamageRankView, null, null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.AtkEndRankView, UIConst.AtkEndRankView, null, null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.JishaJiangliView, UIConst.JishaJiangliView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TongguanJiangliView, UIConst.TongguanJiangliView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.IconChangeView, UIConst.IconChangeView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildSkillView, UIConst.GuildSkillView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildCopySweepResultView, UIConst.GuildCopySweepResultView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildHelpView, UIConst.GuildHelpView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildAskHelpView, UIConst.GuildAskHelpView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GuildMemberSetView, UIConst.GuildMemberSetView, null, null, UI_DEPATH.TOP, true, true);
		// 公会战
		this.registerUI(game.FightMainView, UIConst.FightMainView, ["gonghui/fight.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.FightWaitView, UIConst.FightWaitView, ["gonghui/fight.atlas"], ["gonghui/fight/icon_wangzhe.png"], UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GroupRankView, UIConst.GroupRankView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.PersonRankView, UIConst.PersonRankView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.SeasonAwardView, UIConst.SeasonAwardView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.HonorHallView, UIConst.HonorHallView, null, ["gonghui/fight/icon_wangzhe.png"], UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GradeChestView, UIConst.GradeChestView, null, null, UI_DEPATH.TOP, true, true);
		// 荣耀之战
		this.registerUI(game.GloryWaitView, UIConst.GloryWaitView, ["rongyaozhizhan.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GloryFightView, UIConst.GloryFightView, ["rongyaozhizhan.atlas","gonghui/fight/pic_qizhi1.png"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GloryLastReview, UIConst.GloryLastReview, ["rongyaozhizhan.atlas","gonghui/fight/pic_qizhi1.png"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GloryRecordView, UIConst.GloryRecordView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GloryRewardView, UIConst.GloryRewardView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GloryGroupView, UIConst.GloryGroupView, null, null, UI_DEPATH.TOP, true, true);
		// 激战神域
		this.registerUI(game.GodDomainView, UIConst.GodDomainView, ["jizhanshengyu.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.GodDmTeamView, UIConst.GodDm_TeamView, ["jizhanshengyu.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.AutoMatchView, UIConst.GodDm_AutoMatchView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TeamListView, UIConst.GodDm_TeamListView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GodDmInviteView, UIConst.GodDm_InviteView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TeamMatchView, UIConst.GodDm_TeamMatchView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.BattleSettlementView, UIConst.GodDm_BattleResultView, ["jizhanshengyu.atlas","zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.BattleSettlement, UIConst.GodDm_BattleSettlementView, ["jizhanshengyu.atlas","zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.InviteJoinView, UIConst.GodDm_InviteJoinView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GodDmRankView, UIConst.GodDm_RankView, null, null, UI_DEPATH.TOP, true, true);
		// 升级
		this.registerUI(common.LevelUpView, UIConst.LevelUpView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.LOADING, true, true,false,null,true);
		//首充
		this.registerUI(game.ShouchongView, UIConst.TupUp_FirstView, ["shouchong.atlas"], null, UI_DEPATH.TOP, true, true, false);
		//活动
		this.registerUI(game.TurnRewardView, UIConst.TurnRewardView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.LuckyRecordView, UIConst.LuckRecordView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.RealNameView, UIConst.RealNameView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.LuckyTurnView, UIConst.LuckyTurnView, ['huodong/luckturn.atlas'], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.WelfareView, UIConst.WelfareView, ['fuli.atlas'], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.payActivityView, UIConst.PayActivityView, ['fuli.atlas'], null, UI_DEPATH.BOTTOM, true, true,true,null,false,true);
		this.registerUI(game.LoginGiftView, UIConst.LoginGiftView, ["huodong/logingift.atlas"], null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.TestRebateView, UIConst.TestRebateView, null, null, UI_DEPATH.TOP, true, true);
		//限时活动
		this.registerUI(game.TimeLimitView, UIConst.TimeLimitView, null, null, UI_DEPATH.BOTTOM, true, true,true);
		this.registerUI(game.WeekFundView, UIConst.WeekFundView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ExchangeItemView, UIConst.ExchangeItemView, null, null, UI_DEPATH.TOP, true, true);
		//微端下载
		this.registerUI(game.WeiDuanXiaZaiView, UIConst.WeiDuanXiaZaiView, ["yunyingxuqiu.atlas"], null, UI_DEPATH.TOP, true, true);
		//充值
		this.registerUI(game.ChongzhiView, UIConst.ChongzhiView, ["chongzhitequan.atlas"], null, UI_DEPATH.TOP, true, true);
		// 世界BOSS ["shijieboss.atlas"]
		this.registerUI(game.WorldBossView, UIConst.WorldBoss_BossView, null, null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.BossRankView, UIConst.WorldBoss_RankView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.BossRewardView, UIConst.WorldBoss_RewardView, null, null, UI_DEPATH.TOP, true, true);
		// 组队副本
		this.registerUI(game.CopyTeamMainView, UIConst.Copy_TeamMainView, ["zudui.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.CopyTeamBattleInfo, UIConst.CopyTeamBattleInfo, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.CopyTeamBuild, UIConst.CopyTeamBuild, null, null, UI_DEPATH.TOP,true,true,false,UIConst.Copy_TeamMainView);
		this.registerUI(game.CopyTeamInfo, UIConst.CopyTeamInfo, ["zudui.atlas"], null, UI_DEPATH.TOP,true,true,false,UIConst.Copy_TeamMainView);
		this.registerUI(game.CopyTeamApply, UIConst.CopyTeamApply, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.CopyTeamRewardView, UIConst.CopyTeamRewardView, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.CopyTeamInvite, UIConst.CopyTeamInvite, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.CopyTeamInviteJoinView, UIConst.CopyTeamInviteJoinView, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.CopyTeamTransferLeader, UIConst.CopyTeamTransfer, null, null, UI_DEPATH.TOP,true,true);
		this.registerUI(game.CopyTeamFightStart, UIConst.CopyTeamFightStart,["jizhanshengyu.atlas"], ["jizhanshengyu/difang_bj1.png","jizhanshengyu/wofang_bj1.png"], UI_DEPATH.ALERT,false,true);
		this.registerUI(game.CopyTeamRank, UIConst.CopyTeamRank, null, null, UI_DEPATH.TOP,true,true);
		
		// 每日副本
		this.registerUI(game.DailyCopyMainView, UIConst.Copy_DailyMainView, ["meirufuben.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.DailyCopyView, UIConst.Copy_DailyView, null, null, UI_DEPATH.TOP, true, true, false);
		this.registerUI(game.DailyCopyBuyView, UIConst.Copy_DailyBuyView, null, null, UI_DEPATH.TOP, true, true);
		// 远征
		this.registerUI(game.YuanzhengView, UIConst.YuanzhengView, null, null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.YZChallengeView, UIConst.Yuanzheng_ChallengeView, null, null, UI_DEPATH.TOP, true, true, false, UIConst.YuanzhengView);
		this.registerUI(game.YZJiangliView, UIConst.Yuanzheng_RewardView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.YZHuifuView, UIConst.Yuanzheng_RecoveryView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.YZHelpView, UIConst.Yuanzheng_HelpView, null, null, UI_DEPATH.TOP, true, true);
		// 商队护送
		this.registerUI(game.EscortMainView, UIConst.EscortMainView, ["husong.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.EscortView, UIConst.EscortView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.CaravanInfoView, UIConst.CaravanInfoView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.RobbedRecordView, UIConst.RobbedRecordView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.RewardView, UIConst.EscortRewardView, null, null, UI_DEPATH.TOP, true, true);
		// 迷雾森林
		this.registerUI(game.FogForestView, UIConst.FogForestView, ['miwusenlin.atlas'], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.ForestRewardView, UIConst.FogForestRewardView, null, null, UI_DEPATH.TOP, true, true, false);
		// 神秘岛屿
		this.registerUI(game.IslandView, UIConst.IslandView, ["shenmidaoyu.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.OreMapView, UIConst.OreMapView, ["shenmidaoyu.atlas"], ['shenmidaoyu/lilianbeijing.jpg'], UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.EmptyOreView, UIConst.EmptyOreView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.PlayerOreView, UIConst.PlayerOreView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.OreExplainView, UIConst.OreExplainView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.OreSettlementView, UIConst.OreSettlementView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.SelfOreView, UIConst.SelfOreView, null, null, UI_DEPATH.TOP, true, true);
		//装备
		this.registerUI(game.EquipView, UIConst.EquipView, ["zhaungbei.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		this.registerUI(game.EquipChangeView, UIConst.EquipChangeView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.JumpView, UIConst.Equip_JumpView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.RefineView, UIConst.Equip_Refine, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.StrengthView, UIConst.Equip_StrengthView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.EquipRecycleView, UIConst.Equip_Recycle, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.MasterView, UIConst.Equip_MasterView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.EquipTipsView, UIConst.EquipTip, null, null, UI_DEPATH.LOADING, true, true);
		this.registerUI(game.EquipSuitsView, UIConst.Equip_SuitView,null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.EquipLvupView, UIConst.EquipLvupView,null, null, UI_DEPATH.TOP,false,false);
		this.registerUI(game.EquipSuitLvupView, UIConst.EquipSuitLvupView,null, null, UI_DEPATH.TOP,false,false);
		//宝石
		this.registerUI(game.GemstoneReplaceView, UIConst.GemstoneReplaceView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GemstoneTipsView, UIConst.GemstoneTipsView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.GemstoneCompoundView, UIConst.GemstoneCompoundView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.SingleCompoundView, UIConst.SingleCompoundView, null, null, UI_DEPATH.TOP, true, true);
		//排行榜
		this.registerUI(game.RankModuleView, UIConst.RankView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.RankTabView, UIConst.RankTabView, null, null, UI_DEPATH.TOP, true, true);
		//公告
		this.registerUI(game.LoginNoticeView, UIConst.LoginNoticeView, null, null, UI_DEPATH.ALERT, true, true);
		//七日狂欢
		this.registerUI(game.SevendaysView, UIConst.SevendaysView,null, null, UI_DEPATH.TOP, true, true);
		//神器
		this.registerUI(game.UnLockView, UIConst.Artifact_UnLockView, null, null, UI_DEPATH.TOP,false,false,false,null,false,true);
		this.registerUI(game.BaptizeTip, UIConst.Artifact_BaptizeTip, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.EnchantTip, UIConst.Artifact_EnchantTip, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ObtainTip, UIConst.Artifact_ObtainTip, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArtifactListView, UIConst.ArtifactListView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ArtifactView, UIConst.ArtifactView, ["shenqi.atlas"], null, UI_DEPATH.BOTTOM,false,false,false,null,false,true);
		//充值成功弹窗
		this.registerUI(game.RechargeSuccView, UIConst.Topup_SuccView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.ALERT, true, true);
		this.registerUI(game.RechargeGiftSuccView, UIConst.Topup_GiftSuccView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.ALERT, true, true);
		this.registerUI(game.BuySuccView, UIConst.Topup_ScoreView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ChatNoticeEffect, UIConst.ChatNoticeEffect, null, null, UI_DEPATH.ALERT);
		this.registerUI(common.UpPower, UIConst.UpPower, null, null, UI_DEPATH.LOADING);
		this.registerUI(common.VipLvUpView, UIConst.VipLvUpView, ["zhandoubiaoxian.atlas"], null, UI_DEPATH.TOP, true, true);
		//神力排行
		this.registerUI(game.MainPage, UIConst.PowerRank, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.PowerRank, UIConst.Pow_List, null, null, UI_DEPATH.TOP, true, true);
		//开服豪礼
		this.registerUI(game.OsMainPage, UIConst.OpenReward, null, null, UI_DEPATH.TOP, true, true);
		//开服礼包
		this.registerUI(game.OpenServerGiftView, UIConst.OpenServerGift, null, null, UI_DEPATH.TOP, true, true);
		//在线奖励
		this.registerUI(game.OnlineMainPage, UIConst.OnLineReward, null, null, UI_DEPATH.TOP, true, true);
		//绑定手机
		this.registerUI(game.BindPhoneView, UIConst.BindPhone, ['yunyingxuqiu.atlas'], null, UI_DEPATH.TOP, true, true);
		//分享
		this.registerUI(game.FirstPage, UIConst.FirstShare, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.ShareMainPage, UIConst.MainShare, null, null, UI_DEPATH.TOP, true, true);
		// 限购活动
		this.registerUI(game.LimiteBuyView, UIConst.LimiteBuyView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.JiangLiView, UIConst.Lim_JiangLiView, null, null, UI_DEPATH.TOP, true, true);
		// 超级会员
		this.registerUI(game.SuperVipView, UIConst.SuperVipView, ["yunyingxuqiu.atlas"], null, UI_DEPATH.TOP, true, true);
		// 变强
		this.registerUI(game.BianQiangView, UIConst.BianQiangView, null, null, UI_DEPATH.TOP, true, true); 
		// 购买次数
		this.registerUI(common.BuyBattleCountView, UIConst.BuyBattleCount, null, null, UI_DEPATH.GUIDE, true, true);
		// 进阶之路
		this.registerUI(game.UpRoadView, UIConst.UpRoadView, null, null, UI_DEPATH.TOP, true, true);
		this.registerUI(game.UpRoadSuccessView, UIConst.UpRoadSuccessView, null, null, UI_DEPATH.TOP, true, true);
	}

	//注册ui
	public registerUI(ui: any, uiname: string, atlases: Array<string>, destroyAtlases: Array<string>, depth: UI_DEPATH, popEffect: boolean = false, isModal: boolean = false, closeOther: boolean = false, parentUI: string = null,isQueue:boolean = false,adaptStage:boolean=false ): void {
		if (!this._uiregist[uiname]) {
			let info: UIInfo = { uiname, cls: ui, atlases, depth, popEffect, isModal, closeOther, parentUI, destroyAtlases, isQueue,adaptStage };
			this._uiregist[uiname] = info;
		}
	}

	/**过场加载面板 */
	private _loadui: common.LoadingView;

	/**
	 * 显示过场加载
	 */
	public showLoading(text?: string): void {
		logyhj("显示load");
		if (!this._loadui) {
			this._loadui = new common.LoadingView();
			this._loadui.zOrder = UI_DEPATH_VALUE.LOADING;
		}
		if (text) {
			this._loadui.dataSource = text;
		}
		this._loadui.show(false, false);
	}

	public get loadui():common.LoadingView{
		return this._loadui;
	}

	/**
	 * 加载进度
	 * @param value 
	 */
	public loadingProcess(value: number, text?: string): void {
		if (this._loadui) {
			if (text) {
				this._loadui.dataSource = text;
			}
			this._loadui.setProgress(value);
		}
	}

	/**
	 * 隐藏过场加载
	 */
	public hideLoading() {
		logyhj("隐藏load");
		if (this._loadui) {
			this._loadui.close(null, false, false);
		}
	}

	/**加载转圈 */
	private _waitui: common.WaitView;

	/**
	 * 显示加载转圈
	 */
	public showWaiting(text?: string): void {
		if (!this._waitui) {
			this._waitui = new common.WaitView();
			this._waitui.zOrder = UI_DEPATH_VALUE.WAITING;
		}
		if (text) {
			this._waitui.dataSource = text;
		}
		this._waitui.show(false);
	}

	/**
	 * 加载进度
	 * @param value 
	 */
	public waitingProgress(value: number): void {
		if (this._waitui) {
			this._waitui.setProgress(value);
		}
	}

	/**
	 * 隐藏加载转圈
	 */
	public hideWaiting() {
		if (this._waitui) {
			this._waitui.close(null, false, false);
		}
	}

	public getUIInfo(uiname:string):UIInfo {
		return this._uiregist[uiname];
	}

	/** 正在加载资源的ui */
	private _loadingResUi : string[] = [];
	/**显示ui */
	public showUI(uiname: string, dataSource?: any, sound = true, preinit: boolean = false): void {
		//创建
		let uiinfo = this._uiregist[uiname] as UIInfo;
		if (!uiinfo) {
			logdebug("can not find ui name:", uiname);
			return;
		}
		// 是队列弹窗
		if(uiinfo.isQueue) {
			// 当前舞台有队列弹窗,插入队列等待
			if(DialogQueueMgr.getInstance().hasDialog()) {
				DialogQueueMgr.getInstance().push(uiname,dataSource);
				return;
			}else{
				DialogQueueMgr.getInstance().setCurDialog(uiname);
			}
		}
		logdebug("showUI:", uiname);
		var self = this;
		let dialogExt: DialogExt = this._uicache[uiname];
		if (!dialogExt) {
			//如果需要预加载资源
			if (uiinfo.atlases || uiinfo.destroyAtlases) {
				//开始加载ui
				let atlases = GameUtil.concatArray(uiinfo.atlases, uiinfo.destroyAtlases);
				if(this._loadingResUi.indexOf(uiname) == -1) {
					this._loadingResUi.push(uiname);
					this.showWaiting();
					Laya.loader.load(atlases, Handler.create(null, ($dataSource: any,result) => { //加载完
						// logyhj("加载结果：",result);
						if(result === false){
							this.delLoadingUi(uiname);
							//资源加载出错，就不打开界面
							DialogQueueMgr.getInstance().showFail(uiname);
							return;
						}
						this.hideWaiting();
						this.delLoadingUi(uiname);
						dialogExt = new uiinfo.cls();
						if(uiinfo.adaptStage){
							dialogExt.setSize(Laya.stage.width,Laya.stage.height);
						}
						dialogExt.name = uiinfo.uiname;
						dialogExt.dialogInfo = uiinfo;
						this.catchCom(dialogExt, uiinfo, $dataSource, preinit);
					}, [dataSource]));
				}
			} else {
				dialogExt = new uiinfo.cls();
				if(uiinfo.adaptStage){
					dialogExt.setSize(Laya.stage.width,Laya.stage.height);
				}
				dialogExt.name = uiinfo.uiname;
				dialogExt.dialogInfo = uiinfo;
				this.catchCom(dialogExt, uiinfo, dataSource, preinit);
			}
		} else {
			this.catchCom(dialogExt, uiinfo, dataSource, preinit);
		}
	}
	/** 删除正在加载的ui */
	private delLoadingUi(uiname:string):void {
		let index = this._loadingResUi.indexOf(uiname);
		if(index != -1) {
			this._loadingResUi.splice(index,1);
		}
	}

	/**
	 * @param dialog 
	 * @param uiname 
	 * @param uiinfo 
	 * @param fun 
	 */
	private catchCom(dialog: DialogExt, uiinfo: UIInfo, dataSource: any, preinit: boolean = false) {
		if (!dialog) {
			logerror("uierror");
			DialogQueueMgr.getInstance().showFail(uiinfo.uiname);
			return;
		}
		//已经显示了，就不处理了
		if (dialog.parent){
			return;
		}else{
			//缓存
			if (!this._uicache.hasOwnProperty(uiinfo.uiname)){
				this._uicache[uiinfo.uiname] = dialog;
			}
		}
		dialog.dataSource = dataSource;
		dialog.isModal = uiinfo.isModal;
		if (preinit) { //预创建就不显示了
			return;
		}
		if (dialog.group) { //UI组互斥把同组的其他面板关掉
			DialogExt.manager.closeByGroup(dialog.group);
			if (dialog.group == UIConst.hud_group) {
				DialogExt.manager.closeByGroup(UIConst.two_group);
			}
		}
		if (uiinfo.parentUI) { //如果有夫面板，就先把夫面板也开一下
			this.showUI(uiinfo.parentUI);
		}
		switch (uiinfo.depth) {
			case UI_DEPATH.BOTTOM:
				dialog.zOrder = UI_DEPATH_VALUE.BOTTOM;
				break;
			case UI_DEPATH.MIDDLE:
				dialog.zOrder = UI_DEPATH_VALUE.MIDDLE;
				break;
			case UI_DEPATH.TOP:
				dialog.zOrder = UI_DEPATH_VALUE.TOP;
				break;
			case UI_DEPATH.GUIDE:
				dialog.zOrder = UI_DEPATH_VALUE.GUIDE;
				break;
			case UI_DEPATH.LOADING:
				dialog.zOrder = UI_DEPATH_VALUE.LOADING;
				break;
			case UI_DEPATH.WAITING:
				dialog.zOrder = UI_DEPATH_VALUE.WAITING;
				break;
			case UI_DEPATH.ALERT:
				dialog.zOrder = UI_DEPATH_VALUE.ALERT;
				break;
		}
		if (uiinfo.isModal) {
			dialog.popup(uiinfo.closeOther, uiinfo.popEffect);
		}
		else {
			dialog.show(uiinfo.closeOther, uiinfo.popEffect);
		}

		//聊天特殊，打开其他界面关闭聊天
		if (uiinfo.depth == UI_DEPATH.BOTTOM){
			this.hideUIByName(UIConst.ChatView);
		}
	}

	/**隐藏ui */
	public hideUIByName(uiname: string,showEffect?:boolean): void {
		let cui: DialogExt = this._uicache[uiname];
		if (cui && this.hasStage(uiname)) {
			logdebug(`hideUIByName:${uiname}`);
			cui.close("hideUIByName", showEffect, false);
		}
	}

	/**
	 * 隐藏多个ui
	 * @param depths 层级
	 * @param excludes 排除的ui
	 */
	public hideUIByDepth(depths: number[], excludes: string[] = []): void {
		for (let depth of depths) {
			let len = DialogExt.manager.numChildren;
			for (let i = len - 1; i >= 0; i--) {
				let dialog = <common.DialogExt>DialogExt.manager.getChildAt(i);
				if (dialog && dialog.zOrder == depth && excludes.indexOf(dialog.name) == -1 && GameUtil.isFunction(dialog.close)) {
					dialog.close("hideUIByDepth", false, false);
				}
			}
		}
	}


	/**获取ui */
	public getUIByName(uiname: string): any {
		return this._uicache[uiname];
	}

	public hasStage(uiname: string): boolean {
		let cui: Sprite = this._uicache[uiname];
		if (cui && cui.parent)
			return true;
		else
			return false;
	}

	/** 舞台上是否有该ui组 */
	public hasStageByGroup(uigroup: string): boolean {
		let group = DialogExt.manager.getDialogsByGroup(uigroup);
		return group && group.length > 0;
	}

	public clearUICache(): void {
		this._uicache = {};
	}



	/**显示ui */
	static showUI(uiname: string, dataSource?: any, sound = true, preinit: boolean = false){
		UIMgr.getInstance().showUI(uiname,dataSource,sound,preinit);
	}
	/**隐藏ui */
	static hideUIByName(uiname: string,showEffect?:boolean): void {
		UIMgr.getInstance().hideUIByName(uiname,showEffect);
	}
	public static getUIByName(uiname: string): any {
		return UIMgr.getInstance().getUIByName(uiname);
	}
	public static hasStage(uiname: string): boolean {
		return UIMgr.getInstance().hasStage(uiname);
	}
}