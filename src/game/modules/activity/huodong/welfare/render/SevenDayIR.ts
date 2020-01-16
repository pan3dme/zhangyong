/**
* name 
*/
module game {
	export class SevenDayIR extends ui.activity.huodong.welfare.render.DengjilibaoRenderUI {
		constructor() {
			super();
			this.btn_lingqu.on(Laya.Event.CLICK, this, this.getGigft);
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
				let arrAwerad: Array<ItemVo> = new Array();
				for (let i in $data.reward) {
					arrAwerad.push(new ItemVo($data.reward[i][0], $data.reward[i][1]));
				}
				this.list_item.dataSource = arrAwerad;
				let dayBool = App.hero.welfare.totalLoginDay >= $data.ID;
				this.lab_level.text = $data.ID + LanMgr.getLan("日礼包:", -1);
				this.btn_lingqu.disabled = App.hero.welfare.totalLoginDay < $data.ID;
				this.btn_lingqu.label = dayBool ? LanMgr.getLan("领取", -1) : LanMgr.getLan("未达到", -1);
				this.img_already.visible = $data.ID in App.hero.welfare.loginGiftPack;
				this.btn_lingqu.visible = !this.img_already.visible;
			} else {
			}
		}

		/**领取登录礼包 */
		private getGigft(): void {
			let args = {};
			args[Protocol.game_welfare_loginGiftPack.args.id] = this._dataSource.ID;
			PLC.request(Protocol.game_welfare_loginGiftPack, args, ($data: any, msg: any) => {
				logdebug($data);
				if(!$data) return;
				this.img_already.visible = true;
				this.btn_lingqu.visible = false;
				UIUtil.showRewardView($data.commonData);
			});
		}
	}
}