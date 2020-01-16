

module game {

    export class MatchThread {

        static _instance: MatchThread;
		static getInsatnce(): MatchThread {
			if (!MatchThread._instance) {
				MatchThread._instance = new MatchThread();
			}
			return MatchThread._instance;
		}

		/** 获取匹配赛信息 */
		requestMatchInfo():Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				if (!App.IsSysOpen(ModuleConst.MATCH_FIGHT)) {
                    resolve();
					return;
                }
				PLC.request(Protocol.game_match_getMatchInfo,null,(($data)=>{
					if(!$data) return;
					let model = MatchModel.getInstance();
					model.score = $data['score'];
					model.benfuRank = $data['rank'];
					model.setMatchList($data["clgList"]);
					resolve();
				}));
			});
		}

		/** 刷新列表 */
		refreshList():Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				PLC.request(Protocol.game_match_refreshClgList,null,(($data)=>{
					if(!$data) return;
					let model = MatchModel.getInstance();
					model.lastRefreshTime = $data['clgListTime'];
					model.score = $data['score'];
					model.benfuRank = $data['rank'];
					model.setMatchList($data["clgList"]);
					resolve();
				}));
			});
		}

		/** 领取宝箱 */
		rewardBaoxiang(info:BaoxiangVo):Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				let args = {};
				args[Protocol.game_match_getMatchChest.args.chestId] = info.tbBox.ID;
				PLC.request(Protocol.game_match_getMatchChest,args,(($data)=>{
					if(!$data) return;
					UIUtil.showRewardView($data.commonData);
					MatchModel.getInstance().doneMatchChests = $data['doneMatchChests'];
					dispatchEvt(new ArenaEvent(ArenaEvent.MATCH_REWARD_BOX_SUCC));
					resolve();
				}));
			});
		}

		/** 请求玩家阵容信息 */
		requestLineup(info:MatchPlayerVo):Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				let args = {};
				args[Protocol.center_match_observePlayer.args.obPlayerId] = info.playerId;
				PLC.request(Protocol.center_match_observePlayer,args,(($data)=>{
					if(!$data) return;
					info.setDetailData($data['defInfo']);
					resolve();
				}));
			});
		}

		/** 获取排行榜列表数据 */
		requestRankList(benfu:boolean):Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				let model = MatchModel.getInstance();
				if(benfu){
					PLC.request(Protocol.center_match_getLocalRankList,null,(($data)=>{
						if(!$data) return;
						if($data.hasOwnProperty('rank')){
							model.benfuRank = $data['rank'];
						}
						resolve($data['localRankList']);
					}));
				}else {
					PLC.request(Protocol.center_match_getWorldRankList,null,(($data)=>{
						if(!$data) return;
						if($data.hasOwnProperty('rank')){
							model.kuafuRank = $data['rank'];
						}
						resolve($data['worldRankList']);
					}));
				}
			});
		}

		/** 开始挑战 */
		requestBattleStart(info:MatchPlayerVo):Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				let args = {};
				args[Protocol.game_match_battleStart.args.targetIdx] = info.index;
				PLC.request(Protocol.game_match_battleStart,args,($data)=>{
					if(!$data) return;
					let model = MatchModel.getInstance();
					model.challengeCount = $data['clgMatchNum'];
					let battleEndInfo : {selfChgScore,selfScore,tarChgScore,tarScore} = $data['battleEndInfo'];
					model.score = battleEndInfo.selfScore;
					info.score = battleEndInfo.tarScore;
					resolve($data);
				});
			});
		}

		/** 请求记录列表 */
		requestRecordList():Promise<any>{
			return new Promise<any>((resolve,reject)=>{
				PLC.request(Protocol.game_match_getBattleRecords,null,($data)=>{
					if(!$data) return;
					MatchModel.getInstance().setRecordList($data['battleRecords']);
					resolve();
				});
			});
		}

    }
}