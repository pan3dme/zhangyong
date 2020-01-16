/**
* name 
*/
module game {
	export class ArenaModule extends tl3d.Module {
		constructor() {
			super();
		}

		getModuleName(): string {
			return `ArenaModule`;
		}

		protected onRegister(): void {
			MatchModel.getInstance().initModel();
		}

		protected listProcessors(): tl3d.Processor[] {
			return [new ArenaProcessor(),new MatchProcessor()];
		}
	}

	export class ArenaEvent extends tl3d.BaseEvent {
		/**打开竞技场界面 */
		static SHOW_ARENA_PANEL: string = `SHOW_ARENA_PANEL`;
		/**打开匹配赛界面 */
		static SHOW_MATCH_PANEL: string = `SHOW_MATCH_PANEL`;

		/**竞技场翻牌 */
		static TURN_OVER_CAED:string = `TURN_OVER_CAED`;
		/**观看完竞技场战报 */
		static LOOK_REPORT_END:string = `LOOK_REPORT_END`;
		/**清除冷却时间 */
		static CLEAN_ARENA_TIME: string = `CLEAN_ARENA_TIME`;
		/**获取竞技场战报 */
		static GET_ARENA_BAGTTLE:string = `GET_ARENA_BAGTTLE`;
		/**刷新挑战玩家列表 */
		static UPDATE_ARENA_RANK: string = `UPDATE_ARENA_RANK`;
		/**查看防守记录 */
		static SHOW_RECORD_PANLE: string = `SHOW_RECORD_PANLE`;
		/**竞技场购买翻牌道具 */
		static ARENA_BUY_CARDITEM:string = `ARENA_BUY_CARDITEM`;
		/**查看阵容信息 */
		static SHOW_LINUEUP_PANLE: string = `SHOW_LINUEUP_PANLE`;
		/**竞技场战斗开始 */
		static ARENA_BATTEL_START: string = `ARENA_BATTEL_START`;
		/**竞技场扫荡 */
		static ARENA_BATTEL_SWEEP: string = `ARENA_BATTEL_SAODANG`;
		/**更新自己的战斗力 */
		static UPDATE_MYSELF_FORCE: string = `UPDATE_MYSELF_FORCE`;
		/**挑战完成回到界面 */
		static ARENA_CHALLENGE_END: string = `ARENA_CHALLENGE_END`;
		/**购买剩余次数 */
		static BUY_ARENA_CHALLENGE: string = `BUY_ARENA_CHALLENGE`;
		/**打开竞技场排行榜 */
		static SHOW_ARENARANK_PANEL: string = `SHOW_ARENARANK_PANEL`;
		/** 更新战斗记录数据 */
        public static UPDATE_ZHANDOU_JILU_DATA : string = "UPDATE_ZHANDOU_JILU_DATA";

		/** 打开购买次数界面 */
		static SHOW_BUY_VIEW : string = "SHOW_BUY_VIEW";
		/** 打开提示界面 */
		static SHOW_NOTICE_VIEW : string = "SHOW_NOTICE_VIEW";
		/** 打开奖励界面 */
		static SHOW_AWARD_VIEW : string = "SHOW_AWARD_VIEW";
		/** 打开排行榜界面 */
		static SHOW_RANK_VIEW : string = "SHOW_RANK_VIEW";
		/** 打开记录界面 */
		static SHOW_RECORD_VIEW : string = "SHOW_RECORD_VIEW";
		/** 打开阵容界面 */
		static SHOW_PLAYER_LINEUP : string = "SHOW_PLAYER_LINEUP";
		/** 匹配挑战 */
		static MATCH_CHALLENGE : string = "MATCH_CHALLENGE";
		/** 匹配赛领取宝箱 */
		static MATCH_REWARD_BOX : string = "MATCH_REWARD_BOX";
		/** 匹配赛领取宝箱成功 */
		static MATCH_REWARD_BOX_SUCC : string = "MATCH_REWARD_BOX_SUCC";
		/** 刷新匹配列表 */
		static REFRESH_MATCH_LIST : string = "REFRESH_MATCH_LIST";
		/** 匹配赛记录回放 */
		static MATCH_PLAYBACK : string = "MATCH_PLAYBACK";
		/** 战斗结束返回记录界面 */
		static FIGHT_BACK_TO_RECORD : string = "FIGHT_BACK_TO_RECORD";
		data: any;
	}
}