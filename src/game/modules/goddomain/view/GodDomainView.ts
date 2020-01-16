module game {

	/** 激战神域主界面 */
	export class GodDomainView extends ui.goddomain.GodDomainUI {

		private uiScene: Base2dSceneLayer;
		private _model: GodDomainModel;
		constructor() {
			super();
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		createChildren(): void {
			super.createChildren();
			this.group = UIConst.hud_group;
			this._model = GodDomainModel.getInstance();
			this.uiScene = new Base2dSceneLayer();
			this.boxContent.addChild(this.uiScene);
			this.uiScene.setModelBox(this.roleBox, this.lbCoin, this.lbName);
			this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.GOD_DOMAIN);
			this.btnAdd.on(Laya.Event.CLICK, this, this.onAdd);
			this.btnCreate.on(Laya.Event.CLICK, this, this.onTeam);
			this.btnMatch.on(Laya.Event.CLICK, this, this.onMatch);
		}

		public onClosed(): void {
			super.onClosed();
			this.uiScene.onExit();
			Laya.timer.clear(this, this.delayShow);
			this.rewardList.array = null;
			tl3d.ModuleEventManager.removeEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateRewardCount, this);
			tl3d.ModuleEventManager.removeEvent(GodEvent.BUZHEN_COMPLETE, this.delayShow, this);
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateCoin, this);
			UIMgr.hideUIByName(UIConst.SysTopView);
		}

		private initView(): void {
			let funList: BtnFuncVo[] = [
				{ btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
				{ btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
				{ btnSkin: SkinUtil.btn_buzhen, callback: this.onBuzhen.bind(this) },
				{ btnSkin: SkinUtil.btn_rank, callback: this.onRank.bind(this) }
			];
			let resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.godDomain];
			UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry, funList, closeCallback: this.onFanHui.bind(this) });
			this.updateName();
			this.updateForce();
			this.lbTime.text = this._model.doubleTimeStr;
			let items = tb.TB_fight_goddomain_set.getSet().getWinReward();
			this.rewardList.array = items;
			this.rewardList.width = items.length * 90 + (items.length - 1) * this.rewardList.spaceX;
			this.uiScene.onShow();
			Laya.timer.once(200, this, this.delayShow);
			tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateRewardCount, this);
			tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.delayShow, this);
			this.updateRewardCount();
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateCoin, this);
			this.updateCoin();
		}

		public updateName(): void {
			this.lbName.text = App.hero.name;
		}
		public updateForce(): void {
			this.lbForce.value = App.hero.force + "";
			this.lbForce.event(Laya.Event.RESIZE);
		}

		private updateCoin(): void {
			this.lbScore.text = "神域积分：" + GodDomainModel.getInstance().score;
			this.lbCoin.text = "神域币：" + App.hero.godDomain;
		}

		/** 更新奖励次数 */
		public updateRewardCount(): void {
			this.lbCount.text = `奖励次数：${App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.godDmRewardNum)}次`;
		}
		/** 购买次数 */
		private onAdd(): void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_BUY_VIEW));
		}
		
		/** 自动匹配 */
		private onMatch(): void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_AUTO_MATCH_VIEW));
		}
		private onRule(event: Laya.Event): void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_RULE_VIEW));
		}

		private onFanHui(): void {
			dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_KUAFU));
		}

		/** 延迟展示模型（延迟主要为了定位） */
		private delayShow(): void {
			let modeid: any = GodUtils.getShowGodModel(App.hero.showGodId,App.hero.showSkinId);
			let point = this.lbName.localToGlobal(new Laya.Point(0, 0));
			this.uiScene.addModelChar(modeid, point.x + this.lbName.width / 2 - Launch.offsetX, point.y - 20 - Launch.offsetY, 180, 2.5);
			this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
		}

		private onRank(event: Laya.Event): void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_RANK_VIEW));
		}
		private onShop(): void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_SHOP_VIEW));
		}
		private onBuzhen(): void {
			dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
		}
		private onTeam(): void {
			dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_TEAM_LIST));
		}
	}
}