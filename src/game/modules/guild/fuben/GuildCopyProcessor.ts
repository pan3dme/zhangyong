/**
* name 
*/
module game {
	export class GuildCopyProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "GuildCopyProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.SHOW_COPY_RULE),
				new GuildEvent(GuildEvent.SHOW_COPY_RANK),
				new GuildEvent(GuildEvent.SHOW_ATKEND_RANK),
				new GuildEvent(GuildEvent.SHOW_COPY_TONGGUAN_REWARD),
				new GuildEvent(GuildEvent.SHOW_COPY_JISHA_REWARD),
				new GuildEvent(GuildEvent.SHOW_CHALLENGE_NUM_BUY),
				new GuildEvent(GuildEvent.GUANQIA_FIGHT),
				new GuildEvent(GuildEvent.RECEIVE_TONGGUAN_JIANGLI),
				new GuildEvent(GuildEvent.GUILD_COPY_SWEEP),
			];
		}

		//处理事件
		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof GuildEvent) {
				switch ($event.type) {
					case GuildEvent.SHOW_COPY_RULE:
						this.showRule();
						break;
					case GuildEvent.SHOW_COPY_RANK:
						this.showRank($event.data);
						break;
					case GuildEvent.SHOW_ATKEND_RANK:
						this.showAtkEndRank($event.data);
						break;
					case GuildEvent.SHOW_COPY_TONGGUAN_REWARD:
						this.showTongguanReward($event.data);
						break;
					case GuildEvent.SHOW_COPY_JISHA_REWARD:
						this.showJishaReward($event.data);
						break;
					case GuildEvent.SHOW_CHALLENGE_NUM_BUY:
						this.showBuyNum();
						break;
					case GuildEvent.GUANQIA_FIGHT:
						this.guanqiaFight($event.data);
						break;
					case GuildEvent.RECEIVE_TONGGUAN_JIANGLI:
						this.receiveJiangli($event.data);
						break;
					case GuildEvent.GUILD_COPY_SWEEP:
						this.guanqiaSweep($event.data);
						break;
				}
			}
		}

		/** 展示副本规则 */
		private showRule(): void {
			UIUtil.showCommonTipView(LanMgr.getLanArr(20002));
		}

		/** 展示副本排名 */
		private showRank(guanqia:GuildGuanqiaVo): void {
			UIMgr.showUI(UIConst.DamageRankView, guanqia);
		}
		/** 展示击杀排名 */
		private showAtkEndRank(guanqia:GuildGuanqiaVo): void {
			UIMgr.showUI(UIConst.AtkEndRankView, guanqia);
		}

        /** 展示副本奖励 */
        private showTongguanReward(guanqia:GuildGuanqiaVo):void {
			if(UIMgr.hasStage(UIConst.TongguanJiangliView)){
				this.jiangliView.refreshView();
			}else{
				UIMgr.showUI(UIConst.TongguanJiangliView,guanqia);
			}
			PLC.request(Protocol.guild_guildCopy_rewardInfo,null,($data)=>{
				if(!$data) return;
				GuildCopyModel.getInstance().setAwardCount($data.awardCount);
				if(UIMgr.hasStage(UIConst.TongguanJiangliView)){
					this.jiangliView.refreshView();
				}
			});
        }

		/** 展示关卡奖励界面 */
		private showJishaReward(vo:GuildChallengeVo):void {
			UIMgr.showUI(UIConst.JishaJiangliView,vo);
		}

		/** 展示挑战次数购买界面 */
		private showBuyNum():void {
			let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
            if(num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)){
				if (App.hero.vip < tb.TB_vip.getMaxVip()){
                    showToast(LanMgr.getLan('', 10082));
                }else{
					showToast(LanMgr.getLan(``,10401));
                }
				return;
			}
			UIMgr.showUI(UIConst.BuyBattleCount, {type:common.BuyBattleCountView.TYPE_GUILDCOPY, callback:(num:number)=>{
				let arg = {};
				arg[Protocol.game_common_buyGuildCopyBattleCnt.args.count] = num;
				PLC.request(Protocol.game_common_buyGuildCopyBattleCnt,arg,($data)=>{
						if (!$data) return;
						this.copyView.updateCount();
						if (UIMgr.hasStage(UIConst.GuildCopySweepResultView)){
							let sweepview:GuildCopySweepResultView = UIMgr.getUIByName(UIConst.GuildCopySweepResultView);
							if (sweepview) sweepview.updateCount();
						}
					});
			}});
			// let cost = HtmlUtil.convertHtmlText(`是否花费${GuildCopyModel.getInstance().getBuyCost()} <img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img> 购买1次挑战次数`);
            // common.AlertBox.showAlert({
            //     text: cost, confirmCb: () => {
            //         PomeloClient.getInstance().request(Protocol.game_common_buyGuildCopyBattleCnt,null,($data)=>{
			// 			if (!$data) return;
			// 			this.copyView.updateCount();
			// 		});
            //     }, parm: null,yes:"购买"
            // });
		}

		/** 扫荡 */
		private guanqiaSweep(vo:GuildChallengeVo):void {
			if(UIUtil.checkUnableToEnterFight()){
                return;
            }
			if(vo.isPass()){
				showToast(LanMgr.getLan('',10083));
				return;
			}
			if(App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) <= 0){
				let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
				if(num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)){
					showToast(LanMgr.getLan('',10084));
					return;
				}else{
					this.showBuyNum();
					return;
				}
				// showToast(LanMgr.getLan('',10084));
				// return;
			}
			if (!vo.isKillMonsters(App.hero.playerId)){
				showToast(LanMgr.getLan('',10402));
				return;
			}

			common.AlertBox.showAlert({
				text: LanMgr.getLan("", 10510, App.hero.guildCopyMaxDmg[vo.tbCopy.ID]),
				confirmCb: (cdata:GuildChallengeVo) => {
					let arg = {};
					arg[Protocol.game_guildCopy_sweepGuildCopy.args.id] = cdata.tbCopy.ID;
					PLC.request(Protocol.game_guildCopy_sweepGuildCopy,arg,(sdata)=>{
						if (!sdata) return;
						let guildInfo = GuildModel.getInstance().guildInfo;
                        if(guildInfo &&sdata.hasOwnProperty("copyId") && sdata["copyId"]){
                            guildInfo.copyId = sdata["copyId"];
                        }
						this.copyView.updateGuanQiaInfo(vo.guanqiaVo);
						vo.battleEndData = sdata ? sdata : {};
						vo.enemyLossHp = {1:vo.getTotalDamage() - vo.svo.totalDamage};
						vo.svo.totalDamage = vo.getTotalDamage();
						if (UIMgr.hasStage(UIConst.GuildCopySweepResultView)){
							let sweepview:GuildCopySweepResultView = UIMgr.getUIByName(UIConst.GuildCopySweepResultView);
							if (sweepview){
								sweepview.dataSource = vo;
								sweepview.initView();
							}
						}else{
							UIMgr.showUI(UIConst.GuildCopySweepResultView, vo);
						}
						
					})
				}, parm: vo
			});
		}
		
		/** 挑战 */
		private guanqiaFight(vo:GuildChallengeVo):void {
			if(UIUtil.checkUnableToEnterFight()){
                return;
            }
			if(vo.isPass()){
				showToast(LanMgr.getLan('',10083));
				return;
			}
			if(App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) <= 0){
				let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
				if(num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)){
					showToast(LanMgr.getLan('',10084));
					return;
				}else{
					this.showBuyNum();
					return;
				}
				// showToast(LanMgr.getLan('',10084));
				// return;
			}
			let arg = {};
			arg[Protocol.guild_guildCopy_copyBattleStart.args.id] = vo.tbCopy.ID;
			PLC.request(Protocol.guild_guildCopy_copyBattleStart,arg,($data)=>{
				if(!$data){
					this.copyView.grayGuanqia();
					GuildModel.getInstance().checkGuildExist(true).then(()=>{
						showToast(LanMgr.getLan('',10403));
					});
					return;
				}
				vo.svo.mosterInfo = $data['mosterInfo'];
				this.doFight(vo);
			});
		}
		private doFight(vo:GuildChallengeVo):void {
			let copyvo = new FightVo();
            copyvo.copyType = CopyType.guildCopy;
            copyvo.guildGuanqiaVo = vo;

            var battleScene = new battle.BattleScenePve(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
			vo.enemyLossHp = copyvo.turnTemplatID(battleScene.getLossHpObj(battle.BatteConsts.BATTLE_CAMPDEF));

			// loghgy('公会副本：',vo.svo.copyId,isSuccess,obj,copyvo);
            let arg = {};
			arg[Protocol.guild_guildCopy_copyBattleEnd.args.id] = vo.tbCopy.ID;
            arg[Protocol.guild_guildCopy_copyBattleEnd.args.damageInfo] = vo.enemyLossHp;
            PLC.request(Protocol.guild_guildCopy_copyBattleEnd,arg,($data:any)=>{
				if(!$data) return;
                vo.battleEndData = $data ? $data : {};
				let enterVo: EnterFightVo = { vo: copyvo, event: new GuildEvent(GuildEvent.SHOW_GUILD_COPY_VIEW) };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
		}

		/** 领取通关奖励 */
		private receiveJiangli(vo:GuildRewardVo):void {
			if(!vo.isPass()){
				showToast(LanMgr.getLan('',10090));
				return;
			}
			if(vo.awardCount <= 0){
				showToast(LanMgr.getLan('',10091));
				return;
			}
			let arg = {};
			arg[Protocol.game_guild_getCopyReward.args.id] = vo.tbReward.ID;
			PLC.request(Protocol.game_guild_getCopyReward,arg,($data)=>{
				if($data){
					App.hero.modifyCopyAwardCount($data);
					GuildCopyModel.getInstance().setAwardCount($data.modifyAwardCount);
					UIUtil.showRewardView($data.commonData);
					this.jiangliView.refreshView();
					dispatchEvt(new GuildEvent(GuildEvent.RECEIVE_JIANGLI_SUCCESS));
				}else{
					// 领取次数更新重新请求
					this.showTongguanReward(null);
				}
			});
		}

		private get jiangliView():TongguanJiangliView {
			return UIMgr.getUIByName(UIConst.TongguanJiangliView);
		}

		private get copyView():GuildCopyView {
			return UIMgr.getUIByName(UIConst.GuildCopyView);
		}
	}
}