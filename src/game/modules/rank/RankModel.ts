/**
* name 
*/
enum RankListType {
		/**神力 */
		Power = 1,
		/**等级 */
		Level = 2,
		/**竞技场 */
		Arena = 3,
		/**公会 */
		Guild = 4,
		/**作战 */
		Zuozhan = 5,
		/**副本 */
		Copy = 6,
		/**试炼塔 */
		Tower = 7
	}
module game {
	export class RankModel {
		/**当前排行榜 */
		curRankType: number;
		rankingList: Object = {};
		public arrRankListName : any[];
		constructor() {
			this.arrRankListName = [
				[LanMgr.getLan("",12081), "shenli", RankListType.Power, LanMgr.getLan("",12081),LanMgr.getLan("",12178),"shenli.png"],
				[LanMgr.getLan("",12179), "dengji", RankListType.Level ,LanMgr.getLan("",12179),LanMgr.getLan("",12180),"dengji.png"],
				[LanMgr.getLan("",12181), "lilian", RankListType.Copy, LanMgr.getLan("",12181),LanMgr.getLan("",12182),"guanka.png"],
				[LanMgr.getLan("",12183), "shilianta", RankListType.Tower, LanMgr.getLan("",12181),LanMgr.getLan("",12182),"shilian.png"],
				[LanMgr.getLan("",12184), "gonghui", RankListType.Guild, LanMgr.getLan("",12179),LanMgr.getLan("",12185),"gonghui.png"],
			];
		}

		private static _instance: RankModel;
		static getInstance(): RankModel {
			if (!RankModel._instance) {
				RankModel._instance = new RankModel();
			}
			return RankModel._instance;
		}

		getValueName(): string {
			return LanMgr.getLan(this.arrRankListName.find(vo => vo[2] == this.curRankType)[4], -1) + "：";
		}

		getValue(): string {
			return this.getvalueBytype(this.curRankType);
		}

		getvalueBytype(type: number): string {
			switch (type) {
				case RankListType.Level:
					return App.hero.level.toString();
				case RankListType.Power:
					return App.hero.maxHistoryForce.toString();
				case RankListType.Copy:
					return GuajiModel.getInstance().getSelfRankDesc();
				case RankListType.Tower:
					return TowerModel.getInstance().getSelfRankDesc();
				case RankListType.Guild:
					return App.hero.guildLv != 0 ? App.hero.guildLv.toString() : LanMgr.getLan("",12084);
			}
		}

		canRedPoint(id): boolean {
			if(id == RankListType.Guild && App.hero.guildNum <= 0) return false;
			return App.hero.worshipInfo[id] ? false : true;
		}

		//获取所有排行榜数据
		public getAllRankData():Object{
			return this.rankingList;
		}

		//获取排行榜数据
		public getRankData(type:number):any{
			return this.rankingList[type];
		}

		//设置排行榜数据
		public setRankData(type:number, data):void{
			this.rankingList[type] = data;
			dispatchEvt(new RankingListEvent(RankingListEvent.RANK_DATA_CHANGE), type);

		}
	}

	export class ServerRankListVo {
		value: any
		head: number
		headFrame: number
		name: string
		level: number
		playerId: string
		guildName: string
		king: number = null;
		constructor(data) {
			this.head = data[3];
			this.name = data[2];
			this.value = data[1];
			this.level = data[4];
			this.playerId = data[0];
			this.guildName = data[5];
			this.headFrame = data[6];
			if (RankModel.getInstance().curRankType == RankListType.Tower) {
				this.value = TowerModel.getInstance().getCopyRankDesc(this.value);
			} else if (RankModel.getInstance().curRankType == RankListType.Copy) {
				this.value = GuajiModel.getInstance().getCopyRankDesc(this.value);
			}
		}
	}

	export class JingjiRankListVo {
		sex: number
		name: string
		value: number
		level: number
		playerId: string
		guildName: string
		king: number = null;
		constructor(data) {
			this.sex = data.sex;
			this.name = data.name;
			this.level = data.level;
			this.value = data.score;
			this.playerId = data.playerId;
			this.guildName = data.guildName;
		}
	}

	export class GuildRankListVo {
		head: string
		name: string
		value: number
		level: number
		playerId: string
		guildName: string
		king: number = null;
		constructor(data) {
			this.value = data.level;
			this.head = data.head ? data.head : 1;
			this.guildName = data.name;
			this.name = data.playerName;
			this.level = data.level//data.playerLevel;
			this.playerId = data.playerId;
		}
	}

}