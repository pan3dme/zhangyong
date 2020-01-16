

module game {
	export class GuildCopyModel {
		
		private static _instance: GuildCopyModel;
		public static getInstance(): GuildCopyModel {
			if (!GuildCopyModel._instance) {
				GuildCopyModel._instance = new GuildCopyModel();
			}
			return GuildCopyModel._instance;
		}
		constructor() {

		}
		public copyChallengeVo : GuildChallengeVo;
		// -------- 关卡 --------
        /** 章节列表 */
		// private _chapterList : GuildCopyChapterVo[] = [];
		/** 关卡id列表 */
		private _guanqiaIds : number[] = [];
		private _guanqias : GuildGuanqiaVo[] = [];
		initModel():void {
			this._guanqiaIds = [];
			this._guanqias = [];
			let copyList = tb.TB_guild_copy.getList();
			for(let i = 0,len = copyList.length ; i < len ; i ++ ) {
				let vo = new GuildGuanqiaVo(copyList[i],i);
				this._guanqias.push(vo);
				this._guanqiaIds.push(copyList[i].ID);
			}
			this._guanqias.sort((a,b)=>{
				return a.tbCopy.ID - b.tbCopy.ID;
			});
			this._guanqiaIds.sort((a,b)=>{
				return a - b;
			});
            this._rewardList = [];
            let tbReward = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_copy_reward)).data;
            for(let key in tbReward) {
				this._rewardList.push(new GuildRewardVo(tbReward[key]));
			}
            this._rewardList.sort((a,b)=>{
				return a.tbReward.ID - b.tbReward.ID;
			});
			this.copyChallengeVo = new GuildChallengeVo();
		}

		getCopyList():GuildGuanqiaVo[] {
			return this._guanqias;
		}

		/** 获取当前副本ID */
		getCurCopyId():number {
			let guildInfo = GuildModel.getInstance().guildInfo;
            return guildInfo ? guildInfo.copyId : 0;
		}

		/** 获取当前界面副本列表的开始索引 */
		getCurCopyIdx():number {
			let copyId = this.getCurCopyId();
			let startIdx = 0;
			let list = this._guanqias;
			let len = list.length;
			// 是否打过副本
			if(copyId > 0) {
				if(this.isAllFinish()) {
					startIdx = len - 3;
				} else {
					let index : number = list.findIndex((item)=>{
						return item.tbCopy.ID == copyId;
					});
					// 是否最后三关
					if(index >= len - 3) {
						startIdx = len - 3;
					}else{
						startIdx = index;
					}
				}
			}
			return startIdx;
		}

		/** 获取关卡id列表 */
		getGuanqiaIds():number[] {
			return this._guanqiaIds;
		}
		getGuanqiaById(id:number):GuildGuanqiaVo {
			return this._guanqias.find((vo)=>{
				return vo.tbCopy.ID == id;
			});
		}
		/** 是否全部通关 */
		isAllFinish():boolean {
			let lastCopyId = this._guanqiaIds[this._guanqiaIds.length - 1];
			return this.getCurCopyId() == lastCopyId;
		}
		/** 是否可以挑战 */
		isCanChallenge():boolean {
			return GuildModel.getInstance().isHasGuild() &&  App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) > 0 && !this.isAllFinish();
		}
		/** 是否通关 */
        isPass(copyId:number):boolean {
            let guildInfo = GuildModel.getInstance().guildInfo;
            return guildInfo && guildInfo.copyId >= copyId;
        }

        // -------- 通关奖励 --------
		public hasNewAward : boolean = false;
		updateNewAward(flag):void {
            this.hasNewAward = flag;
            dispatchEvt(new GuildEvent(GuildEvent.UPDATE_JIANGLI_INFO));
        }
        private _rewardList : GuildRewardVo[] = [];
        getRewardList():GuildRewardVo[] {
            return this._rewardList;
        }
        /** 设置领取数量 */
        setAwardCount(awardCount:any):void {
            if(!awardCount) return;
            for(let id in awardCount){
                let vo = this.getRewardById(Number(id));
                vo.awardCount = awardCount[id];
            }
			this.hasNewAward = false;
			this._rewardList.sort((a,b)=>{
				return a.getSortNum() - b.getSortNum();
			});
			dispatchEvt(new GuildEvent(GuildEvent.UPDATE_JIANGLI_INFO));
        }
        getRewardById(id:number):GuildRewardVo{
            return this._rewardList.find((vo)=>{
                return vo.tbReward.ID == id;
            });
        }

		/** 是否有可领取的奖励 */
		isCanReward():boolean {
			if(!GuildModel.getInstance().isHasGuild()) return false;
			return this.hasNewAward || this._rewardList.some((vo)=>{
				return vo.isCanReward();
			});
		}

		/** 获取购买挑战次数花费的钻石数量 */
        public getBuyCost():number {
            let set = tb.TB_guild_set.getSet();
            let costAry = set.buy_cost;
            let count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
            if(count >= costAry.length){
                return costAry[costAry.length-1];
            }else{
                return costAry[count];
            }
        }
    }
}