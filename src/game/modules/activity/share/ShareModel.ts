/**
* ShareModel
*/
module game {
	export class ShareModel {
		private static _instance: ShareModel;
		static getInstance(): ShareModel {
			if (!ShareModel._instance) {
				ShareModel._instance = new ShareModel();
			}
			return ShareModel._instance;
		}

		/** 分享时间戳 */
		public static shareTime: number = 0;

		/**
		 * 累计次数
		 */
		public static totalNum(): number {
			if (App.hero.welfare.hasOwnProperty("shareNumTotal")) {
				return App.hero.welfare.shareNumTotal;
			}
			logerror("share data error!(1)");
			return 0;
		}

		/**
		 * 今日次数
		 */
		public static todayNum(): number {
			if (App.hero.welfare.hasOwnProperty("shareNumToday")) {
				return App.hero.welfare.shareNumToday;
			}
			logerror("share data error!(2)");
			return 0;
		}

		/**
		 * 是否领取首次分享的奖励
		 */
		public static isReceiveFirst() {
			if (App.hero.welfare.hasOwnProperty("doneShares")) {
				let sharelist = App.hero.welfare.doneShares;
				return sharelist.indexOf(0) != -1;
			}
			logerror("share data error!(3)");
			return false;
		}

		getItemList(): Array<ShareItemVo> {

			let ary: Array<tb.TB_share> = tb.TB_share.getTB_share();
			let list: Array<ShareItemVo> = new Array;
			for (var i = 0; i < ary.length; i++) {
				let item: ShareItemVo = new ShareItemVo();
				item.tab = ary[i];
				item.id = i;
				// item.num = item.tab.type == 1?ShareModel.todayNum():ShareModel.totalNum();
				item.recive = ShareModel.receiveState(item.tab.ID);
				list.push(item);
			}
			return list;
		}

		public static receiveState(id: number): boolean {
			let listShare = [];
			if (App.hero.welfare.hasOwnProperty("doneShares")) {
				listShare = App.hero.welfare.doneShares;
			}
			return listShare.indexOf(id) != -1;
		}

		/**
		 * 是否存在红点
		 * id: 首次分享—0 正常分享—表id
		 */
		public static redPointVisiable(id: number) {
			let today = this.todayNum();
			let total = this.totalNum();
			if (id == 0) {
				//首次分享奖励可领取
				return total == 1 && !this.isReceiveFirst();
			} else {
				let tab: tb.TB_share = tb.TB_share.getTB_shareById(id);
				let num = tab.type == 1 ? today : total;
				return tab.share_num <= num && !this.receiveState(tab.ID);
			}
		}
	}
}