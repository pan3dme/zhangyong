/**
* name 
*/
module game {
	/**
	 * 挂机关卡
	 */
	export class GuaJiGuanqiaVo {
		//是否已过关卡
		public isPass: boolean;
		//关卡信息
		public tbCopyInfo: tb.TB_copy_info;
		//关卡索引
		public index: number;
		//难度
		public difflev: number;
		//章节
		public chapter: number;
		//章节id
		public chapterId: number;
		//未开放原因
		// public openinfo: string = "";
		//是否开放
		// public isopen: boolean;

		private _model: GuajiModel

		constructor() {
			this._model = GuajiModel.getInstance();
		}

		/** 是否boss关卡 */
		public isboss(): boolean {
			return this.tbCopyInfo && this.tbCopyInfo.boss_icon ? true : false;
		}

		/** 更新关卡通关状态 */
		public updateState(): void {
			if (this.isPass) return;
			if (App.hero.runeCopyInfo.hasOwnProperty(this.chapter)) {
				let passid: number = Number(App.hero.runeCopyInfo[this.chapter]);
				this.isPass = passid >= this.tbCopyInfo.ID;
				dispatchEvt(new GuajiEvent(GuajiEvent.RED_CHANGE));
			} else {
				this.isPass = false;
			}
			// let openvo = copymodule.Util.copyOpen(this.tbCopyInfo.precondition, this._model.getMaxLev());
			// this.isopen = openvo.isopen;
			// this.openinfo = openvo.info;
		}

		/**
		 * 是否为接下去的关卡
		 */
		public isNext() {
			let preid: number = this.preId();
			//第一关特殊
			if (preid == 0 && isEmptyObject(App.hero.runeCopyInfo)) return true;
			//如果通关的最高关卡 == 前置关卡，则为下一个开放关卡。
			return this._model.getMaxLev() == preid;
		}

		private preId(): number {
			for (var i = 0; this.tbCopyInfo.precondition && i < this.tbCopyInfo.precondition.length; i++) {
				var element = this.tbCopyInfo.precondition[i];
				if (element[0] == CopyConditionType.id) {
					return element[1];
				}
			}
			return 0;
		}

		
		public levPass():boolean{
			return this.needLev() <= App.hero.level;
		}	

		public needLev(): number {
			for (var i = 0; this.tbCopyInfo.precondition && i < this.tbCopyInfo.precondition.length; i++) {
				var element = this.tbCopyInfo.precondition[i];
				if (element[0] == CopyConditionType.level) {
					return element[1];
				}
			}
			return 0;
		}

		hasNotReceive(): boolean {
			return App.hero.mapBoxAwardIds.indexOf(this.tbCopyInfo.ID) == -1;
		}
	}
}