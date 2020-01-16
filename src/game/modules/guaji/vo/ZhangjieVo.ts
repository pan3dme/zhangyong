/**
* name 
*/
module game {
	/**
	 * 挂机章节
	 */
	export class ZhangjieVo {
		//章节的所有关卡
		public guankaMap: Object;//{tbCopyInfo.ID:GuaJiGuanqiaVo}
		//章节信息
		public tbCopy: tb.TB_copy;
		//章节id
		public id: number;
		//本章节最高通关关卡
		public maxGuanka: GuaJiGuanqiaVo = null;

		constructor(copy: tb.TB_copy) {
			this.tbCopy = copy;
			this.id = copy.ID;
			this.guankaMap = [];
			let tbCopyInfos = tb.TB_copy_info.get_TB_copy_info("area", copy.ID.toString());
			for (let index: number = 0; index < tbCopyInfos.length; index++) {
				let vo = new GuaJiGuanqiaVo();
				vo.index = index + 1;
				vo.chapterId = copy.ID;
				vo.chapter = copy.chapter;
				vo.tbCopyInfo = tbCopyInfos[index];
				vo.difflev = copy.sub_type;
				this.guankaMap[vo.tbCopyInfo.ID] = vo;
				this.updateGuaqiaState(vo.tbCopyInfo.ID);
			}
		}

		/**
		 * 更新章节中关卡的通关状态
		 */
		public updateGuaqiaState(id: number) {
			if (this.guankaMap.hasOwnProperty(id)) {
				let vo = this.guankaMap[id];
				this.updateState(vo);
			}
		}

		/**
		 * 更新下一个关卡
		 */
		public updateNextGuaqiaState(id: number): number {
			if (this.guankaMap.hasOwnProperty(id)) {
				let vo: GuaJiGuanqiaVo = this.guankaMap[id];
				let nextid: number = vo.tbCopyInfo.next;
				if (this.guankaMap.hasOwnProperty(nextid)) {
					let nextvo: GuaJiGuanqiaVo = this.guankaMap[nextid];
					this.updateState(nextvo);
					return -1;
				} else {
					//下个章节的关卡开放了
					return nextid;
				}

			}
		}

		private updateState(vo: GuaJiGuanqiaVo) {
			vo.updateState();
			if (vo.isPass) {
				if (!this.maxGuanka || this.maxGuanka.tbCopyInfo.ID < vo.tbCopyInfo.ID) {
					this.maxGuanka = vo;
				}
			}
		}

		/**
		 * 是否全部通关
		 */
		public finish(): boolean {
			for (var key in this.guankaMap) {
				if (this.guankaMap.hasOwnProperty(key)) {
					var element: GuaJiGuanqiaVo = this.guankaMap[key];
					if (!element.isPass) {
						return false;
					}
				}
			}
			return true;
		}

		/**
		 * 是否是新章节
		 * 排除第一章
		 */
		public isNew(): boolean {
			let hasnext: boolean = false;
			for (var key in this.guankaMap) {
				if (this.guankaMap.hasOwnProperty(key)) {
					var element: GuaJiGuanqiaVo = this.guankaMap[key];
					if (element.isPass) {
						return false;
					}
					if (element.isNext()) hasnext = true;
				}
			}
			return hasnext && this.tbCopy.ID != 1000;
		}

		public getOpenLev(){
			for (var key in this.guankaMap) {
				if (this.guankaMap.hasOwnProperty(key)) {
					var element: GuaJiGuanqiaVo = this.guankaMap[key];
					if (element.tbCopyInfo.area_number == 1) {
						return element.needLev();
					}
				}
			}
			return 0;
		}

		/** 章节是否开放 */
		public isOpen(): boolean {
			for (var key in this.guankaMap) {
				if (this.guankaMap.hasOwnProperty(key)) {
					var element: GuaJiGuanqiaVo = this.guankaMap[key];
					if (element.isPass) {
						return true;
					}
					if (element.isNext()) {
						if(element.levPass()){
							return true;
						}
					}
				}
			}
			return false;
		}

		/**获取关卡 */
		public getGuanqiaById(id: number): GuaJiGuanqiaVo {
			if (this.guankaMap.hasOwnProperty(id)) {
				return this.guankaMap[id];
			}
			return null;
		}

		public getNext(): GuaJiGuanqiaVo {
			for (var key in this.guankaMap) {
				if (this.guankaMap.hasOwnProperty(key)) {
					var element: GuaJiGuanqiaVo = this.guankaMap[key];
					if (element.isNext()) {
						return element;
					}
				}
			}
			return null;
		}

		/**
		 * 获得本章最大通关关卡
		 */
		public getMaxPassVo(): GuaJiGuanqiaVo {
			let guanqia: GuaJiGuanqiaVo = null;
			for (var key in this.guankaMap) {
				if (this.guankaMap.hasOwnProperty(key)) {
					var element: GuaJiGuanqiaVo = this.guankaMap[key];
					if (!guanqia && element.isPass) {
						guanqia = element;
						continue;
					}
					if (!guanqia && element.isNext()) {
						guanqia = element;
						continue;
					}
					if(element.isPass && guanqia.tbCopyInfo.ID < element.tbCopyInfo.ID){
						guanqia = element;
					}
				}
			}

			// if(!guanqia && this.tbCopy.ID == 1000){
			// 	guanqia = this.guankaMap[10001];
			// }
			return guanqia;
		}

		public getCurGuanqia(): GuaJiGuanqiaVo {
			let guanqia: GuaJiGuanqiaVo;
			if (this.finish()) {
				guanqia = this.maxGuanka;
			} else {
				guanqia = this.getNext();
			}
			return guanqia;
		}


		public getCurPassGuanqia(): GuaJiGuanqiaVo {
			let guanqia: GuaJiGuanqiaVo;
			if (this.maxGuanka) {
				guanqia = this.maxGuanka;
			} else {
				let keys = Object.keys(this.guankaMap);
				guanqia = this.guankaMap[keys[0]];
			}
			return guanqia;
		}
	}
}