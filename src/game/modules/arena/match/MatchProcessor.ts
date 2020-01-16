

module game {
	export class MatchProcessor extends tl3d.Processor {

		private _model : MatchModel;
		private _request : MatchThread;
		constructor() {
			super();
			this._model = MatchModel.getInstance();
			this._request = MatchThread.getInsatnce();
		}

		getName(): string {
			return `MatchProcessor`;
		}

		protected listenModuleEvents(): tl3d.BaseEvent[] {
			return [
				new ArenaEvent(ArenaEvent.SHOW_MATCH_PANEL),
				new ArenaEvent(ArenaEvent.SHOW_BUY_VIEW),
				new ArenaEvent(ArenaEvent.SHOW_NOTICE_VIEW),
				new ArenaEvent(ArenaEvent.SHOW_AWARD_VIEW),
				new ArenaEvent(ArenaEvent.SHOW_RANK_VIEW),
				new ArenaEvent(ArenaEvent.SHOW_RECORD_VIEW),
				new ArenaEvent(ArenaEvent.SHOW_PLAYER_LINEUP),
				new ArenaEvent(ArenaEvent.MATCH_REWARD_BOX),
				new ArenaEvent(ArenaEvent.REFRESH_MATCH_LIST),
				new ArenaEvent(ArenaEvent.MATCH_CHALLENGE),
				new ArenaEvent(ArenaEvent.MATCH_PLAYBACK),
				new ArenaEvent(ArenaEvent.FIGHT_BACK_TO_RECORD),
			]
		}

		protected receivedModuleEvent(event: tl3d.BaseEvent): void {
			if (event instanceof ArenaEvent) {
				switch (event.type) {
					case ArenaEvent.SHOW_MATCH_PANEL:
						this.showMatchView();
						break;
					case ArenaEvent.SHOW_BUY_VIEW:
						this.showBuyView();
						break;
					case ArenaEvent.SHOW_NOTICE_VIEW:
						this.showNoticeView();
						break;
					case ArenaEvent.SHOW_AWARD_VIEW:
						this.showRewardView();
						break;
					case ArenaEvent.SHOW_RANK_VIEW:
						this.showRankView();
						break;
					case ArenaEvent.SHOW_RECORD_VIEW:
						this.showRecordView();
						break;
					case ArenaEvent.SHOW_PLAYER_LINEUP:
						this.showLineupView(event.data);
						break;
					case ArenaEvent.MATCH_REWARD_BOX:
						this.rewardBox(event.data);
						break;
					case ArenaEvent.REFRESH_MATCH_LIST:
						this.refreshList();
						break;
					case ArenaEvent.MATCH_CHALLENGE:
						this.matchChallenge(event.data);
						break;
					case ArenaEvent.MATCH_PLAYBACK:
						this.recordPlayback(event.data);
						break;
					case ArenaEvent.FIGHT_BACK_TO_RECORD:
						this.backToRecord();
						break;
				}
			}
		}
        
		/** 打开匹配赛界面 */
		private showMatchView(request:boolean=true):void {
			if(request){
				this._request.requestMatchInfo().then(()=>{
					UIMgr.showUI(UIConst.ArenaMatchView);
				});
			}else{
				UIMgr.showUI(UIConst.ArenaMatchView);
			}
		}

		/** 打开匹配赛购买界面 */
		private showBuyView():void {
			if(!UIUtil.checkLimitEnough(iface.tb_prop.limitTypeKey.buyMatchNum,iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum)){
                return;
            }

			 UIMgr.showUI(UIConst.BuyBattleCount, {type:common.BuyBattleCountView.TYPE_MATCH, callback:(num:number)=>{
				let arg = {};
				arg[Protocol.game_match_buyBattleCnt.args.count] = num;
				PLC.request(Protocol.game_match_buyBattleCnt,arg,($data)=>{
                        if (!$data) return;
                        this.matchView.updateSYCount();
                    });
			}});
		}

		/** 打开匹配赛提示界面 */
		private showNoticeView():void {
			UIUtil.showCommonTipView(LanMgr.getLanArr(20015));
		}

		/** 打开匹配赛奖励界面 */
		private showRewardView():void {
			UIMgr.showUI(UIConst.MatchRewardView);
		}

		/** 打开匹配赛排行界面 */
		private showRankView():void {
			UIMgr.showUI(UIConst.MatchRankView);
		}

		/** 打开匹配赛记录界面 */
		private showRecordView(request:boolean=true):void {
			if(request){
				this._request.requestRecordList().then(()=>{
					let list = this._model.getRecordList();
					if(!list || list.length == 0){
						showToast(LanMgr.getLan('',10070));
						return;
					}
					UIMgr.showUI(UIConst.ArenaRecordView,list);
				});
			}else{
				UIMgr.showUI(UIConst.ArenaRecordView,this._model.getRecordList());
			}
		}

		/** 打开阵容界面 */
		private showLineupView(info:MatchPlayerVo):void {
			if(!info.isHasLineup()){
				this._request.requestLineup(info).then(()=>{
					UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
				})
			}else {
				UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
			}
		}

		/** 领取宝箱 */
        private rewardBox(info:BaoxiangVo):void {
			if(!info.isCanReward()) return;
			this._request.rewardBaoxiang(info).then(()=>{
				this.matchView.updateBox();
			});
        }
		/** 刷新列表 */
		private refreshList():void {
			let time = App.serverTimeSecond - this._model.lastRefreshTime;
			if(time < tb.TB_match_set.getSet().refresh_interval){
				showToast(LanMgr.getLan("",11015));
				return;
			}
			this._request.refreshList().then(()=>{
				this.matchView.refreshList();
				this.matchView.resetRefreshInterval();
			});
		}

		/** 挑战 */
		private matchChallenge(info:MatchPlayerVo):void {
			if(App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.matchNum) <= 0){
				this.showBuyView();
				return;
			}
			this._request.requestBattleStart(info).then(($data)=>{
				this.doChallenge(info,$data);
			});
		}
		/** 开始挑战 */
        private doChallenge(info:MatchPlayerVo,resData):void {
			let battleEndInfo : {selfChgScore,selfScore,tarChgScore,tarScore} = resData['battleEndInfo'];
			let reportData = resData.battleReport.reportData;
			logzhanbao(reportData);
			let isWin = battleEndInfo.selfChgScore > 0;
			info.isWin = isWin;
            let vo = new FightVo();
            vo.copyType = CopyType.arenaMatch;
            vo.arenaMatchVo = info;
            let pageVo = new ServerPage();
			pageVo.initPage(reportData);
			pageVo.result = isWin ? playState.VICTORY : playState.FAILURE;
			vo.fightPageControl = pageVo;
            let enterVo:EnterFightVo = {vo:vo,event:new ArenaEvent(ArenaEvent.SHOW_MATCH_PANEL),responseData:resData};
            dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT),enterVo);
        }

		/** 记录回放 */
		private recordPlayback(info:MatchRecordVo):void {
			let args = {};
			args[Protocol.center_match_getBattleReport.args.idx] = info.index;
			PLC.request(Protocol.center_match_getBattleReport, args, ($data: any, msg: any) => {
				if (!$data) return;
				let reportData = $data.battleReport.reportData;
				if (!reportData) return;
				this.doPlayback($data,info);
			});
		}
		/** 开始回放 */
		private doPlayback($data: any, info:MatchRecordVo): void {
			let reportData = $data.battleReport.reportData;
			logzhanbao(reportData);
			let vo = new FightVo();
			vo.copyType = CopyType.arenaMatch;
			vo.arenaMatchVo = info;
			let serverPage = new ServerPage();
			serverPage.initPage(reportData);
			serverPage.result = info.isWin ? playState.VICTORY : playState.FAILURE;
			vo.fightPageControl = serverPage;
			let enterVo: EnterFightVo = { vo: vo, event: new ArenaEvent(ArenaEvent.FIGHT_BACK_TO_RECORD) };
			dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
		}

		/** 战斗结束返回记录界面 */
		private backToRecord():void {
			this.showMatchView(false);
			this.showRecordView(false);
		}

		get matchView():MatchView {
			return UIMgr.getUIByName(UIConst.ArenaMatchView);
		}
    }
}