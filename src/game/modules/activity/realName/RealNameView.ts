/**
* name 
*/
module game {
	export class RealNameView extends ui.activity.realName.realNameUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.RealNameView, closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12625) };
			this.btnSure.on(Laya.Event.CLICK, this, this.onClick);
			tl3d.ModuleEventManager.addEvent(ResEvent.ISCERTIFICATION_EVENT, this.refresh, this);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.init();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.init();
		}

		private init() {
			this.btnSure.gray = this.btnSure.selected = App.hero.welfare.autonymAwardNum == 1;
			this.btnSure.label = (App.hero.welfare.autonymAwardNum == 0 && App.hero.isCertification == 0) ? LanMgr.getLan("",12626) : App.hero.welfare.autonymAwardNum == 1 ? LanMgr.getLan("",10043) : LanMgr.getLan("",12627);
			this.itemList.dataSource = tb.TB_activity_set.getTabSet().autonym_rewrad.map(vo => new ItemVo(vo[0], vo[1]));
			listAtCenter(this.itemList, 319, 3, this.itemList.dataSource.length);
		}

		public refresh(){
			this.init();
		}

		private onClick() {
			logyhj("实名认证结果：%d %d",App.hero.isCertification,App.hero.isIndulge,App.hero.welfare.autonymAwardNum);
			if (App.hero.welfare.autonymAwardNum == 0 && App.hero.isCertification == 0) {
				BingoSDK.doExtraAction("realNameAuth", (result) => {
					logyhj("实名认证结果回调");
					// result.code     //0 成功
					// result.message //错误描述
					// result.data.status  // 0: 未认证，1: 认证成年 2：认证未成年
					// result.data.gameTime //玩家游戏时间，目前QQ大厅返回，用于防成迷
					if (result.code == 0) {
						RealNameModel.RealNameOpt(result.data.status);
					}else{
						showToast(result.message);
					}
				});
			} else if (App.hero.welfare.autonymAwardNum == 0) {
				PLC.request(Protocol.game_welfare_getAutonymAward, null, ($data: Object, $msg) => {
					if (!$data) return;
					this.btnSure.label = LanMgr.getLan("",10043);
					UIUtil.showRewardView($data['commonData']);
					this.btnSure.gray = this.btnSure.selected = true;
					dispatchEvt(new HudEvent(HudEvent.UPDATE_MAINVIEW_BUTTON));
				})
			} else {
				showToast(LanMgr.getLan(``, 10228));
			}
		}
	}
}