/**Created by the LayaAirIDE*/
module game {
	export class HudItemVo {
		public data: any;
		public idx: number;
	}
	import Event = Laya.Event;
	export class HudView extends ui.hud.HudBoxUI {
		_ui: UIMgr = UIMgr.getInstance();
		_arrBtn: Array<Laya.Component>;
		private _chatPos: Laya.Point;

		constructor() {
			super();
			this.mouseThrough = true;
			this.btn_main.on(Laya.Event.CLICK, this, this.on3DMain);
			this.btn_shenqi.on(Laya.Event.CLICK, this, this.onShenqi, [0, 0]);
			this.btn_fight.on(Laya.Event.CLICK, this, this.onFight);
			this.btn_god.on(Laya.Event.CLICK, this, this.onShenling, [-1]);
			this.btn_equip.on(Laya.Event.CLICK, this, this.onEquip, [-1]);
			this.btn_bag.on(Laya.Event.CLICK, this, this.onBag, [-1]);
			this.btn_add_zuanshi.on(Laya.Event.CLICK, this, this.recharge);
			this.btn_addgold.on(Laya.Event.CLICK, this, this.exchangeGold);
			this.img_icon.on(Laya.Event.CLICK, this, this.onDetails);
			this.box_vip.on(Laya.Event.CLICK, this, this.onVip);
			this.btn_chat.on(Event.MOUSE_DOWN, this, this.onChat);
			this.btn_chat.on(Event.MOUSE_UP, this, this.onChatUp);
			this.btnPrivateChat.on(Laya.Event.CLICK, this, this.onShowPriChat)
			tl3d.ModuleEventManager.addEvent(ChatEvent.UPDATE_PRIVATE_CHAT, this.updatePrivateChat, this);

			this._arrBtn = [this.btn_main, this.btn_god, this.btn_equip, this.btn_shenqi, this.btn_bag, this.btn_fight];
			UIUtil.createHeadMask(this.img_icon, this.img_icon.width / 2);
			this.frameOnce(2, this, () => {
				this.img_select.x = this.vbox_funs.x + this.img0.x + ((this.img0.width - this.img_select.width) >> 1);
			});
		}

		/** hud屏幕适配 */
		setSize(w: number, h: number): void {
			super.setSize(w, h);
			// 顶部
			this.box_top.width = w;
			this.box_top.height = GameUtil.isFullScreen() ? (123 + HudModel.TOP_ADD_HEIGHT) : 123;
			let helf = Launch.offsetX >> 1;
			this.vbox.space = 25 + helf;
			// 底部
			if (helf <= 60) {
				this.vbox_funs.space = 20 + helf / 2;
			}
			else {
				this.vbox_funs.space = 50;
			}
			this.img_bottom.width = w;
			this._chatPos = new Laya.Point(-1, -1);
			this._chatRect = new Laya.Rectangle(0, 0, w - 64, h - 64);
		}

		/** 设置visible */
		public setVisible(show: boolean): void {
			let oldVis = this.visible;
			this.visible = show;
			if (!show) {
				this.box_top.visible = false;
			} else {
				this.updatePrivateChat();
			}
		}

		/** 更新经验 */
		private updateExp(): void {
			let roletab: tb.TB_role = tb.TB_role.get_TB_rolenById(App.hero.level);
			let tmpexp = App.hero.exp;
			let expvalue: number = 1;
			if (roletab.exp != 0) {
				expvalue = tmpexp / roletab.exp;
			}
			this.pro_exp.value = expvalue;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.onStageResize();
			this.setName();
			this.setHead();
			this.setHeadFrame();
			this.initView();
			this.updatePower(true);
			App.enterGame = true;
			this.updateShenjieRedpt();
			if (!UIMgr.hasStage(UIConst.SysTopView)) {
				this.visible = true;
			}
			this.startTopTween();
			this.updatePrivateChat();
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateExp, this);
			this.updateExp();
		}

		public close() {
			super.close();
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateExp, this);
		}

		public getBtnPos(btn: Laya.Component): Laya.Point {
			return btn.localToGlobal(new Laya.Point(10, 10));
		}

		public setName() {
			this.lbl_name.text = App.hero.name.length > 12 ? LanMgr.getLan("",12211) : App.hero.name;
		}
		//设置头像
		public setHead() {
			this.img_icon.skin = App.hero.headIcon;
		}
		public setHeadFrame() {
			this.imgHeadFrame.visible = App.hero.headFrame > 0;
			if (this.imgHeadFrame.visible) {
				this.imgHeadFrame.skin = SkinUtil.getHeadFrame(App.hero.headFrame);
			}
		}

		/**打开充值界面 */
		private recharge(): void {
			dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
		}

		/**打开VIP特权界面*/
		private onVip(): void {
			dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL), [1]);
		}


		/** 交换金币 */
		private exchangeGold() {
			UIMgr.showUI(UIConst.ExchangeGoldView);
		}

		/**
		 * 初始化界面信息
		 */
		public initView() {
			this.lab_money.text = Snums(App.hero.gold);
			this.lab_zuanshi.text = Snums(App.hero.diamond);
			this.lbl_level.text = App.hero.level.toString();
			this.setVip();
		}
		/** 更新战斗力 */
		public updatePower($init: boolean = false) {
			if ($init) {
				this.clip_xp.dataSource = App.hero.force;
				this.clip_xp.value = String(App.hero.force);
			} else {
				let newforce = App.hero.force;
				let oldforce = Number(this.clip_xp.dataSource);
				if (newforce == oldforce) return;
				UIUtil.upPowerEff(oldforce, newforce);
				this.clip_xp.value = String(newforce);
				this.clip_xp.dataSource = newforce;
			}
		}
		private _chatRect: Laya.Rectangle;

		//打开聊天
		private onChat() {
			if (!GuideManager.isExecuteGuide()) {
				this.btn_chat.startDrag(this._chatRect);
			}
			Laya.Tween.clearAll(this.btn_chat);
			Laya.Tween.to(this.btn_chat, { alpha: 1 }, 500);
		}

		private onChatUp(): void {
			setTimeout(() => {
				Laya.Tween.clearAll(this.btn_chat);
				Laya.Tween.to(this.btn_chat, { alpha: 0.65 }, 500);
			}, 3000);
			//没有拖动就是点击
			if ((this._chatPos.x == -1) || (this.btn_chat.x - this._chatPos.x === 0 && this.btn_chat.y - this._chatPos.y === 0)) {
				dispatchEvt(new ChatEvent(ChatEvent.SHOW_CHAT_PANEL), [OpenType.common, iface.tb_prop.chatChannelTypeKey.all]);
			}
			this._chatPos.x = this.btn_chat.x;
			this._chatPos.y = this.btn_chat.y;
			this.btn_chat.stopDrag();
		}

		private onDetails(e): void {
			this._ui.showUI(UIConst.PlayerDetailsView);
		}


		public setVip() {
			this.lbl_vip.value = App.hero.vip ? "V" + App.hero.vip.toString() : "V0";
		}


		public on3DMain() {
			this.openAlert().then(() => {
				if (!UIMgr.hasStage(UIConst.Main3DView)) {
					UIMgr.showUI(UIConst.Main3DView);
				}
				this.img_select.x = this.vbox_funs.x + this.img0.x + ((this.img0.width - this.img_select.width) >> 1);
				// this.img_select.x = 32;
			});
		}

		/** 打开前的确认 */
		private openAlert(): Promise<any> {
			return GodDmThread.getInstance().leaveViewAlert();
		}

		//战斗
		public onFight(): void {
			if (GodUtils.getGodsNum() <= 0) {
				showToast(LanMgr.getLan('', 10017));
				return;
			}
			this.openAlert().then(() => {
				this.img_select.x = this.vbox_funs.x + this.img5.x + ((this.img5.width - this.img_select.width) >> 1);
				// this.img_select.x = 604;
				dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_GUAJI_PANEL));
			});
		}

		//英雄
		public onShenling(tabIndex: number = -1): void {
			if (GodUtils.getGodsNum() <= 0) {
				showToast(LanMgr.getLan('', 10017));
				return;
			}
			this.openAlert().then(() => {
				this.img_select.x = this.vbox_funs.x + this.img1.x + ((this.img1.width - this.img_select.width) >> 1);
				// this.img_select.x = 154;
				dispatchEvt(new GodEvent(GodEvent.SHOW_SHENGLING_PANEL), [-1, tabIndex]);
			});
		}
		// 装备
		public onEquip(tabIndex: number = -1): void {
			if (GodUtils.getGodsNum() <= 0) {
				showToast(LanMgr.getLan('', 10017));
				return;
			}
			this.openAlert().then(() => {
				this.img_select.x = this.vbox_funs.x + this.img2.x + ((this.img2.width - this.img_select.width) >> 1);
				// this.img_select.x = 263;
				dispatchEvt(new EquipEvent(EquipEvent.SHOW_EQUIP_PANEL), [tabIndex]);
			});
		}


		//背包
		public onBag(tabIndex: number = -1): void {
			this.openAlert().then(() => {
				this.img_select.x = this.vbox_funs.x + this.img4.x + ((this.img4.width - this.img_select.width) >> 1);
				// this.img_select.x = 481;
				dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.BEIBAO, tabIndex]);
			});
		}

		//神器
		public onShenqi(index: number = 0, id: number = 0): void {
			if (!App.IsSysOpen(ModuleConst.ARTIFACT)) {
				let tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.ARTIFACT);
				showToast(tbData.prompt);
				return;
			}
			this.openAlert().then(() => {
				this.img_select.x = this.vbox_funs.x + this.img3.x + ((this.img3.width - this.img_select.width) >> 1);
				// this.img_select.x = 372;
				dispatchEvt(new ArtifactEvent(ArtifactEvent.SHOW_ARTIFACT_PANEL), [index, id]);
			});
		}

		/** 更新神界红点 ： 默认没设置红点名称 -- 通关2-10之后设置红点名称*/
		public updateShenjieRedpt(): void {
			if ((!this.rpMain.redpointName || this.rpMain.redpointName == "") && GuajiModel.getInstance().isPassCopy(common.GlobalData.GUAJI_COPY_2_10)) {
				this.rpMain.setRedPointName("main_group");
			}
		}

		private _lastDialog: string;
		/** 一级界面跳转过去，返回时回到上一个一级界面 */
		private _returnUIlist: string[] = [UIConst.GuajiView, UIConst.God_MainView, UIConst.Main3DView];
		/** 打开一级界面时，隐藏hudView的玩家信息ui */
		private _uiNameList: string[] = [UIConst.God_MainView, UIConst.EquipView, UIConst.ArtifactView];
		onDialogOnClosed(dialog: DialogExt): void {
			if (this._returnUIlist.indexOf(dialog.name) != -1) {
				this._lastDialog = dialog.name;
			} else {
				this._lastDialog = null;
			}
		}
		onDialogOnOpened(dialog: DialogExt): void {
			if (dialog.group == UIConst.hud_group) {
				let oldVisible = this.box_top.visible;
				let isHide = this._uiNameList.indexOf(dialog.name) != -1;
				this.box_top.visible = !isHide;
				if (!oldVisible && !isHide) {
					this.startTopTween();
				}
				this.btn_chat.visible = [UIConst.Main3DView, UIConst.GuajiView].indexOf(dialog.name) != -1;
				this.updatePrivateChat();
			}
		}
		getLastDialog(): string {
			return this._lastDialog;
		}

		private startTopTween(): void {
			UIUtil.boxUpDownTween(this.box_top, -this.box_top.height, 0, false, 310, 0.05);
		}
		/** 更新私聊按钮的显示 */
		private updatePrivateChat(): void {
			let isIn = UIMgr.hasStage(UIConst.Main3DView) || UIMgr.hasStage(UIConst.GuajiView);
			if (isIn) {
				this.btnPrivateChat.visible = ChatModel.getInstance().hasNewPrivateChat();
			} else {
				this.btnPrivateChat.visible = false;
			}
		}
		private onShowPriChat(): void {
			dispatchEvt(new ChatEvent(ChatEvent.SHOW_PRIVATE_CHAT_VIEW));
		}
	}
}