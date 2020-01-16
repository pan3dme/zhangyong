/**
* name 
*/
module game {
	export class ArenaReportVo {
		rank: number = 0;				//排名
		name: string = ``;				//对手名字
		isWin: boolean = false;			//挑战结果
		chgRank: number = 0;			//改变名次
		topRank: number = 0;			//历史最高名次
		chgTopRank: number = 0;			//历史最高改变名次
		addResource: Object = {};		//获得物品
		topRankDiamond: number = 0;		//历史最高获得钻石
		arenaRecordVo: ArenaRecordVo;
		public head : any;
		public headFrame : number;
		public level : number;
		public force : number;//玩家战力
		public targetforce : number;//目标战力
		public type : number;
		constructor(data: any,arenaRecordVo?:ArenaRecordVo) {
			for (let key in this) {
				if (data[key]) {
					this[key] = data[key]
				}
			}
			if (data['commonData'] && data['commonData']['addResource']) {
				this.addResource = data['commonData']['addResource'];
			}
			this.arenaRecordVo = arenaRecordVo
		}

		/**获得奖励 */
		getRewards(): number[][] {
			return map2ary(this.addResource);
		}

		/**是否是观察战报 */
		isLookReport(): boolean {
			return isEmptyObject(this.addResource);
		}

		/**是否是历史最高 */
		isHistoryTop(): boolean {
			return !!this.topRank && !!this.chgTopRank && !!this.topRankDiamond;
		}
	}
}