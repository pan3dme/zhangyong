/**
* name 
*/
module game {
	export class TotalsignIR extends ui.activity.huodong.welfare.render.TotalsignRenderUI {
		constructor() {
			super();
		}

		public set dataSource($value: any) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refreshData() {
			let $data = this._dataSource;
			if ($data) {
				let signDays: number = HuodongModel.getTotalSignNum();
				let itemData = new ItemVo($data.reward[0], $data.reward[1]);
				if ($data.total_day <= signDays && $data.ID in App.hero.welfare.totalSignIn || $data.total_day > signDays) {
					this.off(Laya.Event.CLICK,this,this.getGift);
					this.imgBg.visible = false;
					Laya.timer.clearAll(this);
					itemData.show = true;
				} else {
					itemData.show = false;
					Laya.timer.clearAll(this);
					this.imgBg.visible = true;
					this.on(Laya.Event.CLICK,this,this.getGift);
					Laya.timer.frameLoop(5, this, () => { this.imgBg.rotation++; })
				}
				this.itemBox.dataSource = itemData;
				this.img_already.visible = $data.ID in App.hero.welfare.totalSignIn;
				this.lab_days.text = $data.total_day + LanMgr.getLan("天", -1);
			} else{
				Laya.timer.clearAll(this);
			}
		}

		public showTip(itemData: ItemVo): void {
			UIUtil.showItemTip(itemData);
		}

		/**累计签到 */
		private getGift(): void {
			let args = {};
			args[Protocol.game_welfare_totalSignIn.args.id] = this._dataSource.ID;
			PLC.request(Protocol.game_welfare_totalSignIn, args, ($data: any, msg: any) => {
				logdebug($data);
				if (!$data) return;
				this.refreshData()
				if (!$data.commonData.addGods) UIUtil.showRewardView($data.commonData);
			});
		}
	}
}