/**
* name 
*/
module game {
	export class DuihuanView extends ui.activity.huodong.welfare.tab.DuihuanUI {
		constructor() {
			super();
			this.btn_duihuan.on(Laya.Event.CLICK, this, this.duiHuang);
		}

		public onAdd(){
			
		}

		public onExit(){
			this.close();
		}

		/**兑换请求 */
		private duiHuang(): void {
			if (this.input_duihuanma.text == "") {
				showToast(LanMgr.getLan("", 10221));
				return;
			}

			var args = {};
			args[Protocol.game_welfare_activationCode.args.code] = this.input_duihuanma.text;
			PLC.request(Protocol.game_welfare_activationCode, args, ($data: any, msg: any) => {
				logdebug($data);
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
			});
		}
	}
}