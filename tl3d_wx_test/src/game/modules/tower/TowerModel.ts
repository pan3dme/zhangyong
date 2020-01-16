
module game {
	export class TowerModel {

		/** 普通模式 */
		public putongModel: GuanqiaModelVo;
		/** 困难模式 */
		public kunnanModel: GuanqiaModelVo;
		/** 试炼塔重置时间 毫秒*/
		public resetTime: number = 0;
		public static PAGE_NUM: number = 10;
		constructor() {

		}
		private static _instance: TowerModel;
		public static getInstance(): TowerModel {
			if (!this._instance) {
				this._instance = new TowerModel();
			}
			return this._instance;
		}

		/** 初始化列表数据 */
		public initModel(): void {
			let arr = tb.TB_copy.shilianFuben;
			for (let i = 0, len = arr.length; i < len; i++) {
				let copy = arr[i];
				if (copy.sub_type == ShiliantaType.jiandan) {
					this.putongModel = new GuanqiaModelVo(copy);
				} else if (copy.sub_type == ShiliantaType.kunnan) {
					this.kunnanModel = new GuanqiaModelVo(copy);
				}
			}
			this.updateTime();
			this.updateData();
		}
		/** cd时间到，重置试炼塔数据 */
		public resetTowerData(): void {
			if (App.serverTime > this.resetTime) {
				App.hero.towerCopyInfo = {};
				this.updateTime();
				this.updateData();
				logdebug('重置时间到,重置试炼塔数据：');
			}
		}

		/** 更新重置倒计时 */
		public updateTime(): void {
			this.resetTime = getNextMonthTime(App.serverTime);
		}

		/** 更新关卡数据 */
		public updateData(): void {
			this.putongModel.updateGuanqia();
			this.kunnanModel.updateGuanqia();
		}

		/** 获取难度模式数据 */
		public getGuanqiaModelVo(subType: number): GuanqiaModelVo {
			if (subType == ShiliantaType.jiandan) {
				return this.putongModel;
			} else if (subType == ShiliantaType.kunnan) {
				return this.kunnanModel;
			}
			return null;
		}

		getJiangliList(type: number): JiangliVo[] {
			return type == ShiliantaType.jiandan ? this.putongModel.getJiangliList() : this.kunnanModel.getJiangliList();
		}

		/** 获取关卡 */
		getGuanqiaByIndex(idx:number,type:number=ShiliantaType.jiandan):GuanqiaVo{
			return type == ShiliantaType.jiandan ? this.putongModel.getGuanqiaVoByIndex(idx) : this.kunnanModel.getGuanqiaVoByIndex(idx);
		}
		getGuanqiaById(id:number,type:number=ShiliantaType.jiandan):GuanqiaVo{
			if(type == ShiliantaType.all){
				return this.putongModel.getGuanqiaVoById(id) || this.kunnanModel.getGuanqiaVoById(id);
			}
			return type == ShiliantaType.jiandan ? this.putongModel.getGuanqiaVoById(id) : this.kunnanModel.getGuanqiaVoById(id);
		}
		/** 是否领取 */
		isRewardByIndex(idx:number,type:number=ShiliantaType.jiandan):boolean {
			let guanqiavo = this.getGuanqiaByIndex(idx,type);
			return guanqiavo.isReward();
		}
		isRewardById(id:number,type:number=ShiliantaType.jiandan):boolean {
			let guanqiavo = this.getGuanqiaById(id,type);
			return guanqiavo.isReward();
		}

		/** 是否通关副本 */
		public isPassCopy(copyId: number): boolean {
			let tbCpInfo = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			let tbCopy = tb.TB_copy.get_TB_copyById(tbCpInfo.area);
			let curCopyId = this.getMaxCopyIdByChapter(tbCopy.chapter);
			return curCopyId >= copyId;
		}
		/**
         * 获得当前章节通关的最高Id
         * 如当前章节，未通关过任何关卡，返回-1
         * @param chapter 
         */
		public getMaxCopyIdByChapter(chapter: number): number {
			let copyid: number = -1;
			if (App.hero.towerCopyInfo.hasOwnProperty(chapter)){
				copyid = Number(App.hero.towerCopyInfo[chapter]);
			}
			return copyid;
		}
		public getMaxCopyId():number {
			let copyid: number = -1;
			for(let key in App.hero.towerCopyInfo){
				if(App.hero.towerCopyInfo[key] > copyid){
					copyid = App.hero.towerCopyInfo[key];
				}
			}
			return copyid;
		}

		// ============  排行榜 =============
		private _rankListVo : game.ICommonRankListVo;
		public setRankList(list: any, myRank: number): void {
			let ary = [];
			for (let id in list) {
				let vo = new RankVo(list[id], parseInt(id));
				ary.push(vo);
			}
			this._rankListVo = {
				getList:()=>{ return ary},
				getRankDesc:()=>{ return myRank > 0 ? LanMgr.getLan('',10029,myRank) : LanMgr.getLan('',10028); }
			};
		}
		public getRankListVo():game.ICommonRankListVo{
			return this._rankListVo;
		}

		getCopyRankDesc(copyId: number): string {
			let info = tb.TB_copy_info.get_TB_copy_infoById(copyId);
			if (info) {
				let copy = tb.TB_copy.get_TB_copyById(info.area);
				return LanMgr.getLan('', (copy.sub_type == ShiliantaType.jiandan ? 10102 : 10103), info.area_number);
			}
			return '无';
		}

		getSelfRankDesc(): string {
			let copyId = App.hero.towerCopyInfo['2'] ? App.hero.towerCopyInfo['2'] : App.hero.towerCopyInfo['1'];
			return this.getCopyRankDesc(copyId);
		}
	}

	
}
