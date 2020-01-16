/**
* name 
*/
module game{
	export class ArenaInfo implements IArenaInfo{
		rankInfoList:ArenaRankVo[];//排行榜列表
		clgInfoList:ArenaInfoVo[]; //对手列表
		topRank:number;
		rank:number
		constructor(data:any){
			this.rank = data.rank;
			this.topRank = data.topRank;
			if(data.clgList) this.clgInfoList = this.parseClg(data.clgList,data.rank);
			if(data.rankList) this.rankInfoList = this.parseRank(data.rankList);
		}
		
		/**解析对手排名数据 */
		private parseClg(data: Object,myRank:number): ArenaInfoVo[] {
			let clgInfoVo: ArenaInfoVo[] = [];
			for(let key in data) {
				let info = new ArenaInfoVo(data[key],myRank);
				if(info.rank == 2000 && this.rank == 2000) {
					info.setDataAtAppHero();
				}
				clgInfoVo.push(info);
			}
			return clgInfoVo;
		}

		/**解析排行榜排名数据 */
		private parseRank(data:Object): ArenaRankVo[] {
			let rankInfoVo: ArenaRankVo[] = [];
			for(let i:number = 1;i < 51; i++) {
				let isNpc = true;
				for(let key in data) {
					if(~~key == i) {
						let info = new ArenaRankVo();
						info.setSvo(data[key]);
						info.rank = i;
						rankInfoVo.push(info);
						isNpc = false;
						break;
					}
				}
				if(isNpc) {
					let info = new ArenaRankVo();
					info.rank = i;
					info.initNpcData();
					rankInfoVo.push(info);
				}
			}
			return rankInfoVo;
		}

	}

	export interface IArenaInfo {
		rankInfoList:ArenaRankVo[];
		clgInfoList:ArenaInfoVo[];
		topRank:number
		rank:number;
	}
}