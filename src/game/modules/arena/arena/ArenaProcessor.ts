/**
* name 
*/
module game {
	export class ArenaProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		getName(): string {
			return `ArenaProcessor`;
		}

		protected listenModuleEvents(): tl3d.BaseEvent[] {
			return [
				new ArenaEvent(ArenaEvent.SHOW_ARENA_PANEL),
				new ArenaEvent(ArenaEvent.SHOW_ARENARANK_PANEL),
				new ArenaEvent(ArenaEvent.BUY_ARENA_CHALLENGE),
				new ArenaEvent(ArenaEvent.UPDATE_MYSELF_FORCE),
				new ArenaEvent(ArenaEvent.ARENA_CHALLENGE_END),
				new ArenaEvent(ArenaEvent.SHOW_LINUEUP_PANLE),
				new ArenaEvent(ArenaEvent.ARENA_BUY_CARDITEM),
				new ArenaEvent(ArenaEvent.ARENA_BATTEL_SWEEP),
				new ArenaEvent(ArenaEvent.ARENA_BATTEL_START),
				new ArenaEvent(ArenaEvent.SHOW_RECORD_PANLE),
				new ArenaEvent(ArenaEvent.GET_ARENA_BAGTTLE),
				new ArenaEvent(ArenaEvent.UPDATE_ARENA_RANK),
				new ArenaEvent(ArenaEvent.CLEAN_ARENA_TIME),
				new ArenaEvent(ArenaEvent.LOOK_REPORT_END),
				new ArenaEvent(ArenaEvent.TURN_OVER_CAED),
			]
		}

		protected receivedModuleEvent(event: tl3d.BaseEvent): void {
			if (event instanceof ArenaEvent) {
				switch (event.type) {
					case ArenaEvent.SHOW_ARENA_PANEL:
						this.showArenaView();
						break;
					case ArenaEvent.LOOK_REPORT_END:
						this.lookReportEnd();
						break;
					case ArenaEvent.TURN_OVER_CAED:
						this.turnOverCard(event.data);
						break;
					case ArenaEvent.CLEAN_ARENA_TIME:
						this.clearArenaCd();
						break;
					case ArenaEvent.UPDATE_ARENA_RANK:
						this.updateClgList();
						break;
					case ArenaEvent.GET_ARENA_BAGTTLE:
						this.getBattleReport(event.data);
						break;
					case ArenaEvent.SHOW_RECORD_PANLE:
						this.showRecordView();
						break;
					case ArenaEvent.ARENA_BATTEL_START:
						this.battleStart(event.data);
						break;
					case ArenaEvent.ARENA_BATTEL_SWEEP:
						this.battleSweep(event.data);
						break;
					case ArenaEvent.ARENA_BUY_CARDITEM:
						this.buyCardItems(event.data);
						break;
					case ArenaEvent.SHOW_LINUEUP_PANLE:
						this.showLinueView(event.data);
						break;
					case ArenaEvent.BUY_ARENA_CHALLENGE:
						this.buyBattleCnt();
						break;
					case ArenaEvent.ARENA_CHALLENGE_END:
						this.challengeEnd(event.data);
						break;
					case ArenaEvent.SHOW_ARENARANK_PANEL:
						this.showRankView();
						break;
				}
			}
		}

		/**打开竞技界面 */
		private showArenaView(): void {
			this.refreshClgList().then((data) => {
				if (data) UIMgr.showUI(UIConst.ArenaView, data);
			})
		}

		/**刷新竞技界面 */
		private updateClgList(): void {
			this.refreshClgList().then((data) => {
				if (data && this.ArenaViewHasStage) {
					this.ArenaView.dataSource = data;
					this.ArenaView.setArenaInfo();
				}
			})
		}

		/**挑战完成回到界面 */
		private challengeEnd(data: ArenaReportVo): void {
			this.showArenaView();
			if (data.isHistoryTop()) {
				UIMgr.showUI(UIConst.ArenaTopRankView, data);
			}
		}

		/**打开排行榜界面 */
		private showRankView(): void {
			this.getArenaRankList().then((data) => {
				if (data) UIMgr.showUI(UIConst.ArenaRankView, data);
			})
		}

		/**打开防守记录界面 */
		private showRecordView(): void {
			this.getBattleRecords().then((data) => {
				if (data) UIMgr.showUI(UIConst.ArenaRecordView, data);
			})
		}

		/**观看战报回到界面 */
		private lookReportEnd(): void {
			this.refreshClgList().then((data) => {
				if (data) UIMgr.showUI(UIConst.ArenaView, data);
				this.getBattleRecords().then((data) => {
					if (data) UIMgr.showUI(UIConst.ArenaRecordView, data);
				})
			})
		}

		// private _myRank: number = 0;
		/**刷新挑战玩家列表请求 */
		private refreshClgList(): Promise<any> {
			return new Promise<any>((resolve, reject) => {
				PLC.request(Protocol.center_arena_refreshClgList, null, ($data: any, msg: any) => {
					if (!$data) {
						resolve(null);
						return;
					}
					let info = new ArenaInfo($data);
					// this._myRank = info.rank;
					resolve(info);
				});
			})
		}

		/**获取竞技场排行榜请求 */
		private getArenaRankList(): Promise<any> {
			return new Promise<any>((resolve, reject) => {
				PLC.request(Protocol.center_arena_getArenaRankList, null, ($data: any, msg: any) => {
					if (!$data) {
						resolve(null);
						return;
					}
					resolve(new ArenaInfo($data));
				});
			})
		}

		/**获取防守记录请求 */
		private getBattleRecords(): Promise<any> {
			return new Promise<any>((resolve, reject) => {
				PLC.request(Protocol.center_arena_getBattleRecords, null, ($data: any, msg: any) => {
					if (!$data) {
						resolve(null);
						return;
					}
					resolve(ArenaRecordVo.parseRecord($data.battleRecords));
				});
			})
		}

		/** 竞技场扫荡 */
		private battleSweep(info: ArenaInfoVo): void {
			let args = {};
			args[Protocol.game_arena_arenaSweep.args.targetId] = info.playerId;
			args[Protocol.game_arena_arenaSweep.args.targetRank] = info.rank;
			args[Protocol.game_arena_arenaSweep.args.selfRank] = info.myRank;
			PLC.request(Protocol.game_arena_arenaSweep, args, ($data: any, msg: any) => {
				if (!$data) return;
				// let reportData = $data.battleReport.reportData;
				// if (!reportData) return;
				$data['name'] = info.name;
				// this.doPlayback($data, new ArenaEvent(ArenaEvent.ARENA_CHALLENGE_END), null, info);
				let vo = this.getVo($data, null, null, info);
				vo.eventdata.type = ArenaBattleType.SWEEP;
				UIMgr.showUI(UIConst.ArenaSuccView, vo);
			})
		}

		/**竞技场战斗开始 */
		private battleStart(info: ArenaInfoVo): void {
			// if (App.hero.arenaNum <= 0) {
			// 	this.buyBattleCnt();
			// 	showToast(LanMgr.getLan(`挑战次数不足！`, -1));
			// 	return;
			// }
			// if (this.ArenaView.getChallengeFailCD() > 0) {
			// 	this.clearArenaCd();
			// 	showToast(LanMgr.getLan(`竞技场冷却时间中，无法挑战`, -1));
			// 	return;
			// }
			let args = {};
			args[Protocol.game_arena_battleStart.args.targetId] = info.playerId;
			args[Protocol.game_arena_battleStart.args.targetRank] = info.rank;
			args[Protocol.game_arena_battleStart.args.selfRank] = info.myRank;
			PLC.request(Protocol.game_arena_battleStart, args, ($data: any, msg: any) => {
				if (!$data) return;
				let reportData = $data.battleReport.reportData;
				if (!reportData) return;
				$data['name'] = info.name;
				this.doPlayback($data, new ArenaEvent(ArenaEvent.ARENA_CHALLENGE_END), null, info);
			})
		}

		/**获取竞技场战报 */
		private getBattleReport(data: ArenaRecordVo): void {
			let args = {};
			args[Protocol.center_arena_getBattleReport.args.idx] = data.id;
			PLC.request(Protocol.center_arena_getBattleReport, args, ($data: any, msg: any) => {
				if (!$data) return;
				let reportData = $data.battleReport.reportData;
				if (!reportData) return;
				$data['name'] = data.name;
				this.doPlayback($data, new ArenaEvent(ArenaEvent.LOOK_REPORT_END), data, null);
			})
		}

		private getVo($data: any, event: ArenaEvent, arenaRecordVo?: ArenaRecordVo, info?: ArenaInfoVo) {
			let vo = new FightVo();
			vo.arenaReportVo = new ArenaReportVo($data, arenaRecordVo);
			if (info) {
				vo.arenaReportVo.head = info.head;
				vo.arenaReportVo.level = info.level;
				vo.arenaReportVo.force = info.force;
				vo.arenaReportVo.targetforce = 0;
				vo.arenaReportVo.headFrame = info.headFrame;
			} else if (arenaRecordVo) {
				vo.arenaReportVo.head = arenaRecordVo.head;
				vo.arenaReportVo.level = arenaRecordVo.level;
				vo.arenaReportVo.force = arenaRecordVo.getForce();
				vo.arenaReportVo.targetforce = arenaRecordVo.getTagForce();
				vo.arenaReportVo.headFrame = arenaRecordVo.headFrame;
			}
			if (event && event.type == ArenaEvent.LOOK_REPORT_END) {
				vo.copyType = CopyType.jingji_record;
			} else {
				vo.copyType = CopyType.jingji_pve;
			}
			let serverPage = new ServerPage();
			if ($data.battleReport) {
				serverPage.initPage($data.battleReport.reportData);
				logzhanbao($data.battleReport.reportData);
			}
			let isWin = arenaRecordVo ? arenaRecordVo.isWin : vo.arenaReportVo.isWin
			serverPage.result = isWin ? playState.VICTORY : playState.FAILURE;
			vo.fightPageControl = serverPage;
			let enterVo: EnterFightVo = { vo: vo, event: event, eventdata: vo.arenaReportVo };
			return enterVo;
		}

		/** 开始回放 */
		private doPlayback($data: any, event: ArenaEvent, arenaRecordVo?: ArenaRecordVo, info?: ArenaInfoVo): void {
			let vo = this.getVo($data, event, arenaRecordVo, info);
			vo.eventdata.type = ArenaBattleType.BATTLE;
			dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT),vo);
		}

		/**购买挑战次数 */
		private buyBattleCnt(): void {
			if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyArenaNum) >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum)) {
				if (App.hero.vip >= tb.TB_vip.getMaxVip()) {
					showToast(LanMgr.getLan(``,10360));
				} else {
					showToast(LanMgr.getLan("", 10361));
					dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL), [1]);
				}
				return;
			}
			UIMgr.showUI(UIConst.BuyBattleCount, {
				type: common.BuyBattleCountView.TYPE_ARENA, callback: (num: number) => {
					let arg = {};
					arg[Protocol.game_arena_buyBattleCnt.args.count] = num;
					PLC.request(Protocol.game_arena_buyBattleCnt, arg, ($data: any, msg: any) => {
						if (!$data) return;
						this.ArenaView.setChallengeNum();
					});
				}
			});
		}

		/**竞技场清除挑战cd */
		private clearArenaCd(): void {
			// let cost = tb.TB_arena_new_set.getArenaNewSet().clear_cost;//<br/><br/>
			// let img = HtmlUtil.convertHtmlText(`<img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img>`);
			// common.AlertBox.showAlert({
			// 	title: `清除冷却时间`, text: `确定要花费${img}${cost}清除冷却时间?`, confirmCb: () => {
			// 		PLC.request(Protocol.game_arena_clearArenaCd, null, ($data: any, msg: any) => {
			// 			if (!$data) return;
			// 			this.ArenaView.setArenaChallengeCD();
			// 		});
			// 	}
			// });
		}

		/**查看阵容信息 */
		private showLinueView(vo: ArenaInfoVo): void {
			if (vo.isNpc() && vo.tbData) {
				UIMgr.showUI(UIConst.PlayerLineupInfoView, vo);
			} else {
				let arg = {};
				arg[Protocol.center_arena_observeArenaPlayer.args.obPlayerId] = vo.playerId;
				PLC.request(Protocol.center_arena_observeArenaPlayer, arg, ($data: any, msg: any) => {
					if (!$data) return;
					vo.setDefInfo($data.targetDefInfo);
					UIMgr.showUI(UIConst.PlayerLineupInfoView, vo);
				});
			}
		}

		/**竞技场翻牌 */
		private turnOverCard(idx: number): void {
			let arg = {};
			arg[Protocol.game_arena_turnOverCard.args.idx] = idx;
			PLC.request(Protocol.game_arena_turnOverCard, arg, ($data: any, msg: any) => {
				if (!$data) return;
				Laya.timer.frameOnce(50, this, () => { UIUtil.showRewardView($data.commonData); });
				this.ArenaSuccView.setItemListCells($data.cardInfos);
			});
		}

		/**竞技场购买翻牌道具 */
		private buyCardItems(idx: number): void {
			let arg = {};
			arg[Protocol.game_arena_turnOverCard.args.idx] = idx;
			PLC.request(Protocol.game_arena_buyCardItems, arg, ($data: any, msg: any) => {
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
				this.ArenaSuccView.setItemListCellById(idx);
			});
		}

		get ArenaView(): ArenaView {
			return UIMgr.getUIByName(UIConst.ArenaView);
		}

		get ArenaViewHasStage(): boolean {
			return UIMgr.hasStage(UIConst.ArenaView);
		}

		get ArenaSuccView(): ArenaSuccView {
			return UIMgr.getUIByName(UIConst.ArenaSuccView);
		}
	}
}