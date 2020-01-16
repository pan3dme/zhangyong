/**
* name 
*/
module game {
	export class GuildFightProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "GuildFightProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.SHOW_FIGHT_RULE_VIEW),
				new GuildEvent(GuildEvent.SHOW_GRADE_CHEST_VIEW),
				new GuildEvent(GuildEvent.SHOW_HONOR_HALL_VIEW),
				new GuildEvent(GuildEvent.SHOW_PERSON_RANK_VIEW),
				new GuildEvent(GuildEvent.SHOW_SEASON_AWARD_VIEW),
				new GuildEvent(GuildEvent.SHOW_GROUP_RANK_VIEW),
				new GuildEvent(GuildEvent.JOIN_FIGHT),
				new GuildEvent(GuildEvent.CHALLENGE_ENEMY),
				new GuildEvent(GuildEvent.UPDATE_MATCH_INFO),
			];
		}

		//处理事件
		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof GuildEvent) {
				switch ($event.type) {
					case GuildEvent.SHOW_FIGHT_RULE_VIEW:
						this.showRuleView();
						break;
					case GuildEvent.SHOW_GRADE_CHEST_VIEW:
						this.showChestView();
						break;
					case GuildEvent.SHOW_SEASON_AWARD_VIEW:
						this.showSeasonAward();
						break;
					case GuildEvent.SHOW_HONOR_HALL_VIEW:
						this.showHonorView();
						break;
					case GuildEvent.SHOW_PERSON_RANK_VIEW:
						this.showPersonRank();
						break;
					case GuildEvent.SHOW_GROUP_RANK_VIEW:
						this.showGroupRank();
						break;
					case GuildEvent.JOIN_FIGHT:
						this.join();
						break;
					case GuildEvent.CHALLENGE_ENEMY:
						this.challengeEnemy($event.data);
						break;
					case GuildEvent.UPDATE_MATCH_INFO:
						this.updateView();
						break;
				}
			}
		}
		/** 规则 */
		private showRuleView():void {
			UIUtil.showCommonTipView(LanMgr.getLanArr(20013));
		}
		/** 段位宝箱 */
		private showChestView():void{
			UIMgr.showUI(UIConst.GradeChestView);
		}
		/** 赛季奖励 */
		private showSeasonAward():void {
			UIMgr.showUI(UIConst.SeasonAwardView);
		}
		/** 荣誉殿堂 */
		private showHonorView():void{
			UIMgr.showUI(UIConst.HonorHallView);
		}
		/** 个人排名 */
		private showPersonRank():void{
			UIMgr.showUI(UIConst.PersonRankView);
		}
		/** 赛区排名 */
		private showGroupRank():void {
			UIMgr.showUI(UIConst.GroupRankView);
		}
		/** 报名 */
		private join():void {
			if(GuildModel.getInstance().guildInfo.job != iface.tb_prop.guildJobTypeKey.president){
				showToast(LanMgr.getLan("",10393));
				return;
			}
			let curDate = new Date(App.serverTime);
            let week = curDate.getDay();
			if(week == WeekNum.Sat){
				showToast(LanMgr.getLan("",10394));
				return;
			}
			PLC.request(Protocol.guild_guildWar_guildWarReg,null,($data)=>{
				if(!$data) return;
				GuildFightModel.getInstance().updateSeason($data);
				if(UIMgr.hasStage(UIConst.FightWaitView)){
					this.fightWaitView.initView();
				}
				dispatchEvt(new GuildEvent(GuildEvent.JOIN_FIGHT_SUCCESS));
			});
		}

		/** 挑战对手 */
		private challengeEnemy(info:GuildFightMemberVo):void{
			let self = GuildFightModel.getInstance().myTeamVo.getMember(App.hero.playerId);
			if(!self){
				showToast(LanMgr.getLan("",10395));
				return;
			}
			if(self.svo.atkCount <= 0){
				showToast(LanMgr.getLan("",10396));
				return;
			}
			if(info.isDead()){
				showToast(LanMgr.getLan("",10397));
				return;
			}
			let args = {};
            args[Protocol.guild_guildWar_guildWarBattleStart.args.playerId] = info.svo.playerId;
			PLC.request(Protocol.guild_guildWar_guildWarBattleStart,args,($data)=>{
				let model = GuildFightModel.getInstance();
				if(!$data) {
					model.setMatchInfo($data)
					return;
				}
				model.setMatchInfo($data)
				this.doFight(info);
			});
		}
		private doFight(dataVo:GuildFightMemberVo):void {
			let info = GuildFightMemberVo.copy(dataVo);

			let copyvo = new FightVo();
            copyvo.copyType = CopyType.guildFight;
            copyvo.guildMemberVo = info;
			
            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;

			let enemyHpObj = copyvo.turnTemplatID(battleScene.getLossHpObj(battle.BatteConsts.BATTLE_CAMPDEF));
            let args = {};
			args[Protocol.guild_guildWar_guildWarBattleEnd.args.hpInfo] = isWin ? null : info.getEnemyHpInfo(enemyHpObj);
            args[Protocol.guild_guildWar_guildWarBattleEnd.args.playerId] = info.svo.playerId;
			loghgy('工会战战果：',copyvo.guildMemberVo,enemyHpObj,args);
            PLC.request(Protocol.guild_guildWar_guildWarBattleEnd,args,($data:any)=>{
                if(!$data) return;
				let enterVo: EnterFightVo = { vo: copyvo, event: new GuildEvent(GuildEvent.SHOW_GUILD_BATTLE_VIEW),responseData: $data };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
		}

		private updateView():void {
			if(UIMgr.hasStage(UIConst.FightMainView)){
				this.fightMainView.updateView();
			}
		}

		get fightMainView():FightMainView {
			return UIMgr.getUIByName(UIConst.FightMainView);
		}
		get fightWaitView():FightWaitView {
			return UIMgr.getUIByName(UIConst.FightWaitView);
		}
	}
}