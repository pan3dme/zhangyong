
module game{
	export class TabCustomerServiceView extends ui.hud.player.TabCustomerServiceUI{
		constructor(){
			super();
		}
        
        createChildren():void {
            super.createChildren();
            this.cbBug.selected = true;
			this.cbTips.selected = false;
			this.cbBug.on(Laya.Event.CLICK, this, this.onBugSelc);
			this.cbTips.on(Laya.Event.CLICK, this, this.onTipSelc);
			this.lbFankui.on(Laya.Event.INPUT, this, this.onLabelChg);
			this.btn_sure.on(Laya.Event.CLICK, this, this.onFankuiSure);
        }

		public close(){
			// super.close();
		}
		public show(){
			// super.show();
            this.initView();
		}

        private initView():void {
            
        }

        private onBugSelc(event: Laya.Event): void {
			this.cbBug.selected = true;
			this.cbTips.selected = false;
		}
		private onTipSelc(event: Laya.Event): void {
			this.cbBug.selected = false;
			this.cbTips.selected = true;
		}
		/** 内容变化 */
		private onLabelChg(): void {
			if (this.lbFankui.text.length > 200) {
				showToast(LanMgr.getLan("", 10436));
				this.lbFankui.text = this.lbFankui.text.slice(0, 200);
			}
		}
		/** 提交反馈 */
		private onFankuiSure(): void {
			let ct = this.lbFankui.text.trim();
			if (!ct || ct == "") {
				showToast(LanMgr.getLan("", 10437));
				return;
			}
			if (3 - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.userQuestionNum) <= 0) {
				showToast(LanMgr.getLan("", 10438));
				return;
			}
			let args = {};
			args[Protocol.game_api_userQuestion.args.content] = ct;
			args[Protocol.game_api_userQuestion.args.type] = this.cbBug.selected ? 1 : 2;
			PLC.request(Protocol.game_api_userQuestion, args, (data, msg) => {
				if (!data) {
					showToast(LanMgr.getLan("", 10439));
					return;
				}
				showToast(LanMgr.getLan("", 10484));
				this.lbFankui.text = "";
				//进入游戏
				var hero = App.hero;
				var sinfo = window.platform.serverInfo;
				BingoSDK.gameReport("kf", hero.playerId, hero.accountName, sinfo.serverId, sinfo.srv_name, { level: hero.level, vip: hero.vip, charge: hero.welfare.rechargeSum });
			});
		}

	}
}