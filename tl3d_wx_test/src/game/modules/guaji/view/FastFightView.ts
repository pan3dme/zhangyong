/**
* name 
*/
module game {
	export class FastFightView extends ui.guaji.FastFightUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { uiName: UIConst.Guaji_FastView, closeOnSide: this.isModelClose, title: "快速战斗" };
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();

		}

		public onOpened(){
			super.onOpened();
			tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.setFreeNum, this);
			tl3d.ModuleEventManager.addEvent(TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.setFreeNum, this);
		}

		/** 界面移除 */
		public onClosed(): void {
			super.onClosed();
			this.btnFast.off(Laya.Event.CLICK, this, this.onFast);
			tl3d.ModuleEventManager.removeEvent(ResEvent.LIMIT_VALUE_CHANGE, this.setFreeNum, this);
			tl3d.ModuleEventManager.removeEvent(TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.setFreeNum, this);
		}

		private initView(): void {
			this.btnFast.on(Laya.Event.CLICK, this, this.onFast);
			let set = tb.TB_copy_set.getCopySet();
			let cnt = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.quickMainNum);
			
			//this.btnFast.label = `X${set.fighting_cost[cnt]}${LanMgr.getLan('',10006)}`;
			var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum);
			this.lbCount.text = LanMgr.getLan('', 10007, total - cnt, total);
			//收益
			let maxlv = GuajiModel.getInstance().getMaxLev();
			let tab_copyinfo = tb.TB_copy_info.get_TB_copy_infoById(maxlv);
			let arr = [];
			if (tab_copyinfo) {
				let goldVo = new ItemVo(iface.tb_prop.resTypeKey.gold, tab_copyinfo.gold_speed * 120);
				let expVo = new ItemVo(iface.tb_prop.resTypeKey.godExp, tab_copyinfo.exp_speed * 120);
				let roleExpVo = new ItemVo(CostTypeKey.exp, tab_copyinfo.role_exp_speed * 120);
				arr.push(goldVo);
				arr.push(expVo);
				arr.push(roleExpVo);
			}
			this.list_items.array = arr;
			if (arr && arr.length < 3) {
				this.list_items.x = 235 + (310 - (arr.length * 110 - 20)) / 2;
			} else {
				this.list_items.x = 235;
			}

			this.setFreeNum();

		}

		private setFreeNum(){
			let freenum = App.hero.totalFreeCount(iface.tb_prop.limitTypeKey.fastFrightFreeNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.fastFrightFreeNum);
			this.img_zuanshi.visible = freenum <= 0;
			if (freenum > 0) {
				this.lb_cost.text = `每日免费${freenum}次`
				this.lb_cost.x = 321;
			}else{
				this.lb_cost.x = 392;
				let set = tb.TB_copy_set.getCopySet();
				let cnt = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.quickMainNum);
				this.lb_cost.text = 'X' + (cnt >= set.fighting_cost.length ? set.fighting_cost[set.fighting_cost.length - 1] : set.fighting_cost[cnt]);
			}
		}

		private onFast(): void {
			let set = tb.TB_copy_set.getCopySet();
			let cnt = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.quickMainNum);
			if (cnt >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum)) {
				if(App.hero.vip < App.getMaxVipLv()) {
					showToast(LanMgr.getLan("", 10388));
				}else{
					showToast(LanMgr.getLan('', 10011));
				}
				return;
			}
			let freenum = App.hero.totalFreeCount(iface.tb_prop.limitTypeKey.fastFrightFreeNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.fastFrightFreeNum);
			let diamond = parseInt(set.fighting_cost[cnt]);
			if (freenum <= 0 && App.hero.diamond < diamond) {
				showToast(LanMgr.getLan('', 10005));
				return;
			}
			PLC.request(Protocol.game_copy_quickMainBattle, {}, (res) => {
				if (!res) return;
				this.initView();
				UIUtil.showRewardView(res.commonData);
				dispatchEvt(new GuajiEvent(GuajiEvent.FAST_BATTLE_SUCCESS));
			});
		}
	}
}