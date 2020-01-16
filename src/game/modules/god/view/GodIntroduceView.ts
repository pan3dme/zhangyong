module game {

	/** 英雄介绍界面 */
	export class GodIntroduceView extends ui.god.GodIntroduceUI {

		private _curVo: GodItemVo;
		private uiScene: Base2dSceneLayer;
		private _tabInfoList: common.TabOperateInfo[];
		private _tabOperate: common.TabListOperate;
		private _model: GodModel;
		constructor() {
			super();
		}

		createChildren(): void {
			super.createChildren();
			this._model = GodModel.getInstance();
			this.uiScene = new Base2dSceneLayer();
			this.roleBox.addChild(this.uiScene);
			this.uiScene.setModelBox(this, this.hbox, this.roleBox);
			this.list_shuxingup.renderHandler = new Handler(this, this.onUpRender);
			this.starList.renderHandler = new Handler(this, this.onXingjiRender);
			this.btnZiliao.on(Laya.Event.CLICK, this, this.onLookInfo);
			this.btnChange.on(Laya.Event.CLICK, this, this.onChange);
			this.box_model.on(Laya.Event.CLICK, this, this.onClickModel);
			this.btn_gh.on(Laya.Event.CLICK, this, this.onClickGH);
			this.btn_peiyin.on(Laya.Event.CLICK, this, this.onClickPeiYin);
			this.btn_lihui.on(Laya.Event.CLICK, this, this.onClickLiHui);
			this.btnSkin.on(Laya.Event.CLICK, this, this.onSkin);
			this.btnBuzhen.on(Laya.Event.CLICK, this, this.onBuzhen);
			this.list_attr.renderHandler = new Handler(this, this.onAttrRender);
			this.tabList.renderHandler = new Handler(this, this.onRenderIndex);
			this.tabList.selectedIndex = -1;
			let model = this._model;
			this.tabList.array = [...model.tabTypes];
			let tabTypes = model.tabTypes;
			this._tabInfoList = [];
			for (let i = 0; i < tabTypes.length; i++) {
				this._tabInfoList.push(this.buildTabInfo(tabTypes[i]));
			}
			this._tabOperate = new common.TabListOperate(this.tabList, this.viewStack);
			this._tabOperate.setTabItemist(this._tabInfoList);
		}
		private buildTabInfo(type: number): common.TabOperateInfo {
			let model = this._model;
			let viewData = model.getTabViewDatas(type);
			return {
				viewName: viewData.viewName,
				viewClz: viewData.viewClz,
				onSelectVerify: () => {
					let sysId = viewData.sysId;
					let tbData = tb.TB_sys_open.get_TB_sys_openById(sysId);
					if (tbData && !App.IsSysOpen(sysId)) {
						showToast(tbData.prompt);
						return false;
					}
					return true;
				},
				onSelectAfter: () => {
					dispatchEvt(new GodEvent(GodEvent.SWITCH_TAB_SUCCESS));
				},
				onShow: (view: any) => {
					if (view && GameUtil.isFunction(view['init'])) {
						view['init']();
					}
				},
				onHide: (view: any) => {
					// 切换界面,界面隐藏
					if (view && GameUtil.isFunction(view['close'])) {
						view['close']();
					}
				},
				onClosed: (view) => {
					// 界面释放
					if (view && GameUtil.isFunction(view['close'])) {
						view['close']();
					}
				},
				dataSource: null
			}
		}

		/** 打开面板 */
		public toOpen(): void {
			tl3d.ModuleEventManager.addEvent(TreasureEvent.TREASURE_OPERATION, this.treasureOpt, this);
		}

		/** 关闭面板 */
		public toClose(): void {
			tl3d.ModuleEventManager.removeEvent(TreasureEvent.TREASURE_OPERATION, this.treasureOpt, this);
			this._curVo = null;
			Laya.timer.clearAll(this);
			this._lastmodel = 0;
			this.uiScene.onExit();
			this.starList.array = null;
			this.list_shuxingup.array = null;
			this.godSkinRP.onDispose();
			// this.stopPySound();
			this._tabOperate.viewDispose();
		}

		/**
		 * 圣物穿戴变化
		 */
		private treasureOpt(){
			this.timer.frameOnce(5,this,this.changeAttr);
		}


		public set curVo(value: GodItemVo) {
			// 用于创建界面的数据源
			for (let info of this._tabInfoList) {
				info.dataSource = value;
			}
			let isNew: boolean = !this._curVo || this.curVo.uuid != value.uuid;
			this._curVo = value;
			this.playPySound(this._curVo.templateId);
			EquipModel.getInstance().curShowGod = this._curVo;
			// 重置渲染：设置红点等数据
			this.tabList.refresh();
			let godtemp: tb.TB_god = tb.TB_god.get_TB_godById(this._curVo.templateId);
			this.btn_lihui.visible = godtemp && godtemp.paint != 0;
			// 切换英雄
			if (isNew) {
				this.initView();
			} else {
				this.updateView();
			}
		}

		public get curVo(): GodItemVo {
			return this._curVo;
		}

		private initView() {
			this.uiScene.onShow();
			this.initData();
			this.updateView();
			TreasureTipsView.HideTip();
		}
		/** 初始化数据 */
		private initData() {
			let godVo = this._curVo;
			if (godVo) {
				this.updateView();
				let tbGod = godVo.tab_god;
				this.refreshModel();
				this.imgRace.skin = SkinUtil.getGodRaceSkin(godVo.getRaceType());
				this.lab_name.text = tbGod.name;
				this.lab_name.event(Laya.Event.RESIZE);
				this.hbox.refresh();
			}
		}
		/** 更新信息 */
		public updateView() {
			let godVo = this._curVo;
			if (godVo) {
				this.lbShenli.text = godVo.getShenli().toString();
				let star = godVo.isMoreThanSix() ? godVo.getStar() - 5 : godVo.getStar();
				let tempStararry = new Array;
				for (let i = 0; i < star; i++) {
					tempStararry[i] = godVo.starLevel >= 6 ? true : false;
				}
				this.starList.repeatX = star;
				this.starList.array = tempStararry;
				this.starList.x = (this.width - this.starList.width) / 2 - 20;
				this.refreshModel();
				// 圣物
				this.treasureUI.dataSource = godVo;
				this.godSkinRP.setRedPointName(`god_skin_${godVo.uuid}`);
				this.changeAttr();
			}
		}

		/** 英雄页切换 */
		public onSetIndex(index: number): void {
			if (index == -1) return;
			if (this.tabList.selectedIndex == index) {
				let viewName = this._tabOperate.getViewName(index);
				this._tabOperate.updateItemByName(viewName, this._curVo);
			} else {
				this.tabList.selectedIndex = index;
			}
		}
		/** 更新模型 */
		public refreshModel(): void {
			let godVo = this._curVo;
			if (godVo) {
				let tbGod = godVo.tab_god;
				let modelId = GodUtils.getGodModel(godVo.skinId, tbGod);
				// 模型
				if (this._lastmodel != modelId) {
					Laya.timer.once(200, this, this.showModel, [modelId]);
				}
			}
		}

		/** 刷新当前神灵 */
		public refreshCurRole(): void {
			let index = this.tabList.selectedIndex;
			if (index == ShenlingTabType.info) {
				this.viewInfo && this.viewInfo.updateXinxi();
			} else if (index == ShenlingTabType.shengxin) {
				this.viewStarup && this.viewStarup.init();
			} else if (index == ShenlingTabType.ronghun) {
				this.viewRonghun && this.viewRonghun.init();
			} else if (index == ShenlingTabType.awaken) {
				this.viewJuexing && this.viewJuexing.refreshJuexing();
			}
		}

		/** 弹出的属性列表渲染*/
		private onUpRender(cell: Laya.Label, index: number) {
			if (this.list_shuxingup && this.list_shuxingup.dataSource && this.list_shuxingup.dataSource[index] && this.list_shuxingup.dataSource[index].length == 2)
				cell.text = this.list_shuxingup.dataSource[index][0] + "+" + this.list_shuxingup.dataSource[index][1];
		}
        /**
		 * 渲染星星
		 */
		private onXingjiRender(cell: Laya.Image, index: number): void {
			let data = cell.dataSource;
			if (data) {
				cell.skin = SkinUtil.superXing;
				cell.width = 29;
				cell.height = 31;
			} else {
				cell.skin = SkinUtil.xingxing;
			}
		}
		
		private onLookInfo(): void {
			if (this._curVo) {
				dispatchEvt(new TujianEvent(TujianEvent.SHOW_EVALUATION_PANEL), this._curVo.tab_god);
			}
		}

		private onClickModel(): void {
			if (this.uiScene.sceneChar) {
				this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
				if (this._curVo) {
					this.playPySound(this._curVo.templateId);
				}
			}
		}

		/** 更换英雄 */
		private onChange(): void {
			let godVo = this._curVo;
			if (!godVo) return;
			let index = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack, true).findIndex((uuid) => {
				return uuid == godVo.uuid;
			});
			if (index != -1) {
				// 其他位置的id数组
				let ids = this._model.getLinuepGodTbid(iface.tb_prop.lineupTypeKey.attack);
				let idIdx = ids.indexOf(godVo.templateId);
				if (idIdx != -1) {
					ids.splice(idIdx, 1);
				}
				let gods = App.hero.getGodArr();
				let isExist = gods.some((vo) => {
					// 排除其他位置的同种英雄 并且 不是当前英雄
					return ids.indexOf(vo.templateId) == -1 && vo.uuid != godVo.uuid;
				})
				if (!isExist) {
					showToast(LanMgr.getLan(``, 10372))
					return;
				}
				dispatchEvt(new GodEvent(GodEvent.SHOW_REPLACE_VIEW), [godVo, index]);
			}
		}

		/** 渲染tabbar */
		private onRenderIndex(item: ui.god.render.TabItemRenderUI, index: number) {
			if (!this._curVo) return;
			item.img_suo.visible = false;
			let type = item.dataSource;
			if (type == ShenlingTabType.ronghun) {
				item.btn_name.label = LanMgr.getLan("",12344);
				item.img_suo.visible = !App.IsSysOpen(ModuleConst.RONGHUN);
				item.img_suo.dataSource = ModuleConst.RONGHUN;
			} else if (type == ShenlingTabType.awaken) {
				item.btn_name.label = LanMgr.getLan("",12345);
				item.img_suo.visible = !App.IsSysOpen(ModuleConst.JUEXING);
				item.img_suo.dataSource = ModuleConst.JUEXING;
			} else if (type == ShenlingTabType.shengxin) {
				item.btn_name.label = LanMgr.getLan("",12346);
				item.img_suo.visible = !App.IsSysOpen(ModuleConst.SHENGXING);
				item.img_suo.dataSource = ModuleConst.SHENGXING;
			} else {
				item.btn_name.label = LanMgr.getLan("",12347);
			}
			item.btn_name.selected = index == this.tabList.selectedIndex && !item.img_suo.visible ? true : false;
			item.tabRedPoint.onDispose();
			if (!item.img_suo.visible) {
				let redName = this._model.tabredName[index];
				item.tabRedPoint.setRedPointName(`${redName}_${this._curVo.uuid}`);
			}

			item.btn_name.labelSize = this.tabList.selectedIndex == index ? 24 : 22;
			item.btn_name.labelColors = this.tabList.selectedIndex == index ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
		}

		//点击光环
		private onClickGH(): void {
			dispatchEvt(new GodEvent(GodEvent.SHOW_KEZHI_VIEW));
		}

        /**
         * 刷新模型id
         * @param modeid 模型id
         */
		private _lastmodel: number = 0;
		public showModel(modeid) {
			//因模型和特效的关系，切换模型时，必须重新new 一个scenechar
			this._lastmodel = modeid;
			// this.uiScene.clearSceneChar();
			let point = this.roleBox.localToGlobal(new Laya.Point(0, 0));
			this.uiScene.addModelChar(modeid, point.x + this.roleBox.width / 2 - Launch.offsetX, point.y + 10 - Launch.offsetY);
			this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
		}

        /**
         * 升级增加属性
         */
		public sendShuxingEvent() {
			let godVo = this._curVo;
			if (!godVo) return;
			AudioMgr.playSound("sound/goduplevel.mp3");
			let evotab: tb.TB_god_evolution;
			if (godVo.starLevel <= 6 || godVo.degree <= 6)
				evotab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.degree);//阶级
			else
				evotab = tb.TB_god_evolution.get_TB_god_evolutionById(godVo.starLevel);
			let growth: Array<any> = new Array();
			for (let i = 0; i < 3; i++) {
				growth.push([LanMgr.attrName[i+1], Math.floor(godVo.tab_god.attr_grow[i][1] * evotab.star_growth[i][1])]);
			}
			this.showShuxing(growth);
		}


		/** 增加的属性弹出 */
		public showShuxing(now: Array<any>) {
			this.list_shuxingup.zOrder = 9999;
			this.list_shuxingup.dataSource = now;
			this.list_shuxingup.x = 290;
			this.list_shuxingup.y = 456;
			this.list_shuxingup.alpha = 1;
			this.list_shuxingup.visible = true;
			Laya.Tween.clearAll(this.list_shuxingup);

			let point = this.roleBox.localToGlobal(new Laya.Point(0, 0));
            let v3d = this.uiScene.get3dPos(point.x+this.roleBox.width/2- Launch.offsetX,point.y+this.roleBox.height- Launch.offsetY);
			this.uiScene.addEffect(this, 1000004, v3d, 4, 20, null,0,0,true);
			// this.uiScene.scene.playLyf(getEffectUrl("1000004"), new tl3d.Vector3D(180, 0, -440), 20, 4);
			Laya.Tween.to(this.list_shuxingup, { x: 320 }, 100, null, Handler.create(this, () => {
				Laya.Tween.to(this.list_shuxingup, { y: 370, alpha: 0.2 }, 500, null, Handler.create(this, () => {
					this.list_shuxingup.visible = false;
				}));
			}));
		}

        /**
         * 觉醒属性增加弹出
         */
		public showJuexingEffect(attrToast: any[]): void {
			this.list_shuxingup.zOrder = 9999;
			this.list_shuxingup.array = attrToast;
			this.list_shuxingup.x = 290;
			this.list_shuxingup.y = 456;
			this.list_shuxingup.alpha = 1;
			this.list_shuxingup.visible = true;
			Laya.Tween.clearAll(this.list_shuxingup);
			this.uiScene.scene.playLyf(getEffectUrl("1000004"), new tl3d.Vector3D(160, 0, -440), 20, 4);
			Laya.Tween.to(this.list_shuxingup, { x: 320 }, 100, null, Handler.create(this, () => {
				Laya.Tween.to(this.list_shuxingup, { y: 370, alpha: 0.2 }, 500, null, Handler.create(this, () => {
					this.list_shuxingup.visible = false;
				}));
			}));
		}

		private onSkin(): void {
			if (this._curVo) {
				UIMgr.getInstance().showUI(UIConst.GodSkinView, [this._curVo]);
			}
		}
		/** 布阵 */
        public onBuzhen(): void {
            dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
        }

		//配音和立绘
		private onClickLiHui(): void {
			if (!this._curVo) return;
			let godtemp: tb.TB_god = tb.TB_god.get_TB_godById(this._curVo.templateId);
			if (godtemp && godtemp.paint != 0) UIMgr.showUI(UIConst.GodLiHuiView, godtemp);
		}

		private onClickPeiYin(): void {
			if (this._curVo) {
				this.playPySound(this._curVo.templateId, "", true);
				if (this.uiScene.sceneChar) {
					this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
				}
			}
		}

		private _pyGodId: number = 0;
		private _pySoundUrl: string = "";
		private playPySound(godid: number, url: string = "", force: boolean = true): void {
			if (!force && this._pyGodId == godid) return;
			this.stopPySound();
			this._pyGodId = godid;
			let filetype: string = Laya.Render.isConchApp ? "ogg" : "mp3";
			url = LanMgr.getLan("sound/god_peiyin/{0}/voice_{1}_dub.{2}", -1, filetype, godid, filetype);
			this._pySoundUrl = !url || url == "" ? "sound/godpeiyin.mp3" : url;
			AudioMgr.playSound(this._pySoundUrl);
		}

		private stopPySound(godid: number = 0): void {
			if (godid == 0 || this._pyGodId == godid) {
				AudioMgr.StopSound(this._pySoundUrl);
				this._pyGodId = 0;
			}
		}

		/** 属性数组渲染 */
		private onAttrRender(cell: ui.god.render.AttrIRUI, index: number) {
			if (!cell.dataSource) return;
			let attr: number[] = cell.dataSource;
			cell.imgAttr.skin = SkinUtil.getAttrSkin(attr[0]);
			cell.lbvalue.text = ~~attr[1] + ``;
		}

		/** 显示属性 */
		public changeAttr() {
			let godVo = this._curVo;
			if (godVo) {
				let allshuxing = godVo.getAllAttr(iface.tb_prop.lineupTypeKey.attack); //总属性
				this.list_attr.array = allshuxing.filter((v) => v[0] <= 4);
				this.lbShenli.text = godVo.getShenli().toString();
			}
		}

		getView(viewName: string): Laya.Component {
			return this._tabOperate.getViewByName(viewName);
		}

		get viewInfo(): godTabInfoView {
			return this.getView(GodModel.tabInfo) as godTabInfoView;
		}
		get viewJuexing(): godTabAwakeView {
			return this.getView(GodModel.tabAwaken) as godTabAwakeView;
		}
		get viewStarup(): godTabStarupView {
			return this.getView(GodModel.tabStarup) as godTabStarupView;
		}
		get viewRonghun(): godTabfuseView {
			return this.getView(GodModel.tabRonghun) as godTabfuseView;
		}

	}
}