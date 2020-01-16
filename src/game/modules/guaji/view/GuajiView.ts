/**
* name 
*/
module game {

	import CharAction = tl3d.CharAction;
	import Event = Laya.Event;
	export class GuajiView extends ui.guaji.GuajiUI {
		private bgviewport: laya.maths.Rectangle;
		public guajiScene: GuajiScene;
		public mLastMouseX: number;
		public mLastMouseY: number;
		public isLoad: boolean;		// 是否加载完成
		public static OffY: number;

		//移动背景
		public bgMap: Laya.Box;
		public bgtile: Laya.Image;
		public bgtile2: Laya.Image;
		//移动地图
		public roadMap: Laya.Box;
		//关卡地图
		public guanqiaMap: Sprite;
		public tile: Laya.Image;
		public tile2: Laya.Image;
		private _model: GuajiModel;

		public fightTitle: FightHeadRender;

		constructor() {
			super();
			this.group = UIConst.hud_group;

			if (!this.fightTitle) {
				this.fightTitle = new FightHeadRender();
				this.fightTitle.x = 0;
				this.fightTitle.y = 270;
				this.fightTitle.setScale(0.9);
				this.addChildAt(this.fightTitle, this._childs.length - 1);
			}
		}

		createChildren(): void {
			super.createChildren();
			this._model = GuajiModel.getInstance();
			//初始化战斗场景 
			this.roadMap = new Laya.Box();
			this.roadMap.x = 0
			// this.roadMap.y = 442;
			this.addChildAt(this.roadMap, 0);
			let stagew = Laya.stage.width;
			this.roadMap.scrollRect = new laya.maths.Rectangle(0, 0, stagew, 635);
			this.tile = new Laya.Image();
			this.tile2 = new Laya.Image()
			this.tile.autoSize = true;
			this.tile2.autoSize = true;
			let runWidth = 720;
			this.tile.width = runWidth;
			this.tile2.width = runWidth;
			this.tile2.x = runWidth;
			this.roadMap.addChild(this.tile);
			this.roadMap.addChild(this.tile2);
			this.roadMap.width = 1440;
			this.roadMap.height = this.roadMap.scrollRect.height;
			this.isLoad = false;
			this.guajiScene = new GuajiScene();

			this.addChildAt(this.img_startbg, 2);
			this.img_startbg.size(Laya.stage.width, Laya.stage.height).pos(0, 0);
			this.addChildAt(this.guajiScene, 3);
			this.addChildAt(this.guajiScene.uiScene, 4);
			// this.addChild(this.guajiScene.ui2dScene);
			this.btn_task.on(Event.CLICK, this, this.onTask);
			this.img_baoxiang.on(Event.CLICK, this, this.onReward);

			this.bgMap = new Laya.Box();
			this.bgMap.x = 0
			this.bgMap.y = 60
			this.addChildAt(this.bgMap, 0);
			this.bgMap.scrollRect = new laya.maths.Rectangle(0, 0, stagew, 900);
			this.bgtile = new Laya.Image();
			this.bgtile2 = new Laya.Image()
			this.bgtile.autoSize = true;
			this.bgtile2.autoSize = true;
			let bgWidth = 1020;
			this.bgtile.width = bgWidth;
			this.bgtile2.width = bgWidth;
			this.bgtile2.x = bgWidth;
			this.bgMap.addChild(this.bgtile);
			this.bgMap.addChild(this.bgtile2);
			this.bgMap.width = 2040;
			this.bgMap.height = this.bgMap.scrollRect.height;

			this.on(Event.MOUSE_WHEEL, this, this.onMouseWheel);
			// this.btn_look.on(Event.CLICK, this, this.onLookShouyi);
			this.bottomUI.btn_onplay.on(Event.CLICK, this, this.onFight);
			//监听
			// this.bg.on(Event.MOUSE_DOWN, this, this.mouseDown);
			// this.bg.on(Event.MOUSE_UP, this, this.mouseUp);
			//按钮事件
			this.bottomUI.btn_fast.on(Event.CLICK, this, this.onFast);
			this.btn_map.on(Event.CLICK, this, this.onClickMap);
			this.bottomUI.btn_adventure.on(Event.CLICK, this, this.onAdventure);
			this.btn_lilian.on(Event.CLICK, this, this.onClickFunction, [tb.TB_function.TYPE_LILIAN]);
			this.btn_maoxian.on(Event.CLICK, this, this.onClickFunction, [tb.TB_function.TYPE_MAOXIAN]);
			this.btn_jingji.on(Event.CLICK, this, this.onClickFunction, [tb.TB_function.TYPE_JINGJI]);
			this.btn_kf.on(Event.CLICK, this, this.onClickFunction, [tb.TB_function.TYPE_KUAFU]);
		}

		setSize(w: number, h: number): void {
			super.setSize(w, h);
			//需要等全部的图片加载完，才重绘坐标正确
			this.ani_bosstips.x = w / 2;
			this.ani_bosstips.y = h - 177;
			this.bottomUI.y = h - 130;
			this.roadMap.y = h - 70 - this.roadMap.scrollRect.height;
			this.box_top.y = GameUtil.isFullScreen() ? (125 + HudModel.TOP_ADD_HEIGHT) : 125;
			this.box_right.y = GameUtil.isFullScreen() ? (73 + HudModel.TOP_ADD_HEIGHT) : 73;
			GuajiView.OffY = (this.roadMap.y - 361) * 0.5
			// logyhj("适配高度计算", this.roadMap.y);
			if (this.guajiScene) {
				this.guajiScene.uiScene.setPos(Launch.offsetX, Launch.offsetY + GuajiView.OffY);
				// this.guajiScene.ui2dScene.setPos(Launch.offsetX, Launch.offsetY + GuajiView.OffY);
			}
			if (this.bottomUI) {
				this.bottomUI.setScenePos();
			}
			if (this.fightTitle) {
				this.fightTitle.x = w / 2 - this.fightTitle.width / 2;
			}
		}

		// private onLookShouyi() {
		// 	let maxlev: number = this._model.getMaxLev();
		// 	if (maxlev != 0) {
		// 		let curCopy = tb.TB_copy_info.get_TB_copy_infoById(maxlev);
		// 		UIMgr.showUI(UIConst.ShouYiXiangQingView, curCopy);
		// 	}
		// }

		public changeStartBg(vis) {
			this.img_startbg.visible = vis;
		}

		private onFight() {

			if (this._model.isFight) {
				//正在挑战
				showToast(LanMgr.getLan("", 10389));
				return;
			} else {
				let result = null;
				//先判断当前章节是否已经全部通关
				if (this._model.currentZhangjie.finish()) {
					if (this._model.currentZhangjie.maxGuanka.tbCopyInfo.next == 0) {
						//全部通关的情况
						this.onClickMap();
						return;
					}
					//取下一章的第一关看开启状态
					let nextItem = this._model.getGuanqiaById(this._model.currentZhangjie.maxGuanka.tbCopyInfo.next);
					result = copymodule.CopyUtils.copyOpen(nextItem.tbCopyInfo.precondition, this._model.getMaxLev());
					if (result && result.isopen) {
						//第十关  显示地图
						this.onClickMap();
						return;
					} else {
						//未通关的，判断是否开启
						showToast(result.info);
						return;
					}
				} else {
					//当前处于倒计时  取下一个关卡
					let curguanqia: GuaJiGuanqiaVo = this._model.currentZhangjie.getNext();
					result = copymodule.CopyUtils.copyOpen(curguanqia.tbCopyInfo.precondition, this._model.getMaxLev());
					if (result && result.isopen) {
						if (App.getServerTime() < App.hero.lastProgressTime) {
							//冷却中
							showToast(LanMgr.getLan("", 10390,App.hero.lastProgressTime - App.getServerTime()));
							return;
						} else {
							//挑战boss
							this.battleBoss();
							this.closeBossTips();
						}
					} else {
						showToast(result.info);
					}
				}


			}
		}

		private battleBoss() {
			if (UIUtil.checkUnableToEnterFight()) {
				return;
			}
			let guanqia = this.getGuanKa();
			if (guanqia && guanqia.isPass) {
				logerror("数据异常", guanqia);
				return;
			}

			//前置条件判断


			if (guanqia.tbCopyInfo.is_enter == 1) {
				dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_JINAGLI_PANEL), guanqia.tbCopyInfo.ID);
			} else {
				let arg = {};
				arg[Protocol.game_copy_clgCopy.args.copyId] = guanqia.tbCopyInfo.ID;
				PLC.request(Protocol.game_copy_clgCopy, arg, ($data, $msg: string) => {
					this.clearArtifact();
					let vo = new FightVo
					vo.copyType = iface.tb_prop.copyTypeKey.rune;
					vo.tab_copyinfo = guanqia.tbCopyInfo;
					vo.tab_copy = tb.TB_copy.get_TB_copyById(vo.tab_copyinfo.area);
					var battleScene = new battle.BattleScenePve(vo.copyType);
					battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, vo.getAllRound(), vo.getTeamHp());
					// vo.fightPageControl = new ClientPage();
					// vo.fightPageControl.initPage(battleScene);

					battleScene.start();
					var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
					logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
					let page = new NewClientPage();
					page.result = isWin ? playState.VICTORY : playState.FAILURE;
					page.initPage(battleScene.battleReport);
					page.defType = iface.tb_prop.battleObjTypeKey.monster;
					vo.fightPageControl = page;
					vo.fightPageControl.getPreloadIds();

					dispatchEvt(new GuajiEvent(GuajiEvent.ENTER_FIGHT), vo);
					this.clearAllRewardEff();
					this.guajiScene.enterFightScene(vo, () => {

					});

					this._fightvo = vo;
					this.fightTitle.setVsVis(false);
					this.setRound(-1);
					//此标志位设置完，会开始执行逻辑回调
					this._model.isFight = true;
					// this.updateAreaVis();
					this.changeBtnState();

				});
			}

		}

		private _fightvo: FightVo
		public refreshTitle() {
			if (this._fightvo) {
				this.fightTitle.dataSource = this._fightvo.getHeadData();
				this.fightTitle.setData();
				this.fightTitle.showEff();
			}
		}

		// private onkeydown(e: Event) {
		// 	// this.setPos(e.keyCode);
		// }

		// private char: GameUIChar;
		// public setPos(pos: any) {
		// 	if (!this.char) {
		// 		return;
		// 	}
		// 	if (pos == Laya.Keyboard.UP) {
		// 		this.char.pz += 1
		// 	} else if (pos == Laya.Keyboard.DOWN) {
		// 		this.char.pz -= 1
		// 	} else if (pos == Laya.Keyboard.LEFT) {
		// 		this.char.px -= 1
		// 	} else if (pos == Laya.Keyboard.RIGHT) {
		// 		this.char.px += 1
		// 	}
		// }

		private _num = 0;
		public onMouseWheel(e: Event): void {
			if (!FightView.chkCam) {
				return;
			}

			// let len = this.guajiScene.getLen();
			// this._num -= (e.delta / Math.abs(e.delta));
			// let id = Math.abs(Math.floor(this._num)) % len;
			// logyhj('id：', id);
			// if (id > 4) {
			// 	id = id - 5;
			// 	this.char = this.guajiScene.getMonster(id);
			// } else {
			// 	this.char = this.guajiScene.getPlayer(id);
			// }
			// logyhj('当前选中：', this._num, id, this.char.tbData.name, this.char.get2dPos());
		}

		// private onBossFight() {
		// 	let maxId: number = this._model.getMaxLev();
		// 	let tbCoppy = tb.TB_copy_info.get_TB_copy_infoById(maxId);
		// 	if (!this.img_battleeff.visible) {
		// 		let curId = tbCoppy ? tbCoppy.area_number : 0;
		// 		curId %= 5;
		// 		curId = 5 - (curId + 1);
		// 		if (curId != 0) {
		// 			showToast(`再通关${curId}关卡可挑战`);
		// 			return;
		// 		}
		// 	}
		// 	if (!tbCoppy) return;
		// 	let nexttbCoppy = tb.TB_copy_info.get_TB_copy_infoById(tbCoppy.next);
		// 	let openvo = copymodule.CopyUtils.copyOpen(nexttbCoppy.precondition, this._model.getMaxLev());
		// 	if (!openvo.isopen) {
		// 		showToast(openvo.info);
		// 		return;
		// 	}
		// 	sendDispatchEvent(new GuajiEvent(GuajiEvent.ENTER_FIGHT_EVENT), nexttbCoppy.ID);
		// }

		private _maxNum: number = 4;
		public setBossData() {
			// let maxId: number = this._model.getMaxLev();
			// let tbCoppy = tb.TB_copy_info.get_TB_copy_infoById(maxId);
			// this.lab_sceneInfo.visible = tbCoppy ? true : false;
			// if (this.lab_sceneInfo.visible) {
			// 	let tabMonster = tb.TB_monster.get_TB_monsterById(tbCoppy.checkpoint_icon);
			// 	this.lab_sceneInfo.text = tbCoppy.scene_desc + "  " + LanMgr.getLan(tbCoppy.monster_desc, -1, tabMonster.name, tabMonster.level);
			// }

			this.updateMap();

			this.setShouyi();
		}

		private onGuanqia() {
			UIMgr.showUI(UIConst.GuanqiaView, this.getGuanKa());
		}

		private onTask(e): void {
			dispatchEvt(new TaskEvent(TaskEvent.SHOW_TASK_VIEW));
		}

		private ui_tishi: ShouchongtishiView;
		/** 首充界面 */
		private onShouchong(e): void {
			dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_SHOUCHONG_PANEL));
		}

		/**更新首充提示状态 */
		public updateShouchongTishi(): void {
			if (this._model.isFight) return;
			if (App.hero.level < 7 || GuideManager.isInGuide())
				return;
			if(this.ui_tishi && this.ui_tishi.parent){
				return;
			}
			let model = ChongzhiModel.getInstance();
			let hastip = model.hasShouChongTip();
			//已充值完所有档位
			if (!hastip) return;
			if (!model.lastCloseTime) {
				Laya.timer.once(3000, this, this.showShouchongTishi);
			}else if ((App.serverTimeSecond - model.lastCloseTime) > 30 * 60) {
				Laya.timer.once(3000, this, this.showShouchongTishi);
			}
		}

		/** 隐藏首充提示 */
		public hideShouchongTishi(): void {
			if(this.ui_tishi){
				this.ui_tishi.removeSelf();
			}
			Laya.timer.clear(this, this.showShouchongTishi);
		}
		/** 显示首充提示 */
		private showShouchongTishi(): void {
			let data = ChongzhiModel.getInstance().getCurData();
			if (!this.ui_tishi) {
				this.ui_tishi = new ShouchongtishiView();
				this.ui_tishi.pos(80, 950);
			}
			this.ui_tishi.dataSource = data.tb.ID;
			this.addChild(this.ui_tishi);
			this.ui_tishi.updateModulePos();
		}

		/**
		 * 打开面板
		 * @param e 
		 */
		public onOpened(): void {
			super.onOpened();
			this.guajiScene.sceneEabled = true;
			this._model.isEnable = true;
			this.isLoad = false;

			this.btn_uproad.show();
			//初始化ui
			if (!this._model.isFight) {
				if (!this._model.inited) {
					this.resetTick();
					this.initZhangjie(false);
				} else {
					this.moveToTargetGuan(this.getGuanKa(), false, false);
				}
			}
			this.showtip();
			this.updateShouchongTishi();
			LoadeQueue.getInstance().addQueueExcute(Laya.Handler.create(this.bottomUI, this.bottomUI.onEnter));
			tl3d.ModuleEventManager.addEvent(GuajiEvent.FUBEN_REWARD_CHANGE, this.updateFuBenReward, this);
			tl3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.setEff, this);
			this.clearAllRewardEff();
			this.setBossData();
			this.updateFuBenReward();

			this.delayShowBossTips();
			dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_SHOUYI_UP_VIEW));
			let targetY = this.height - this.bottomUI.height - 130;
			UIUtil.boxUpDownTween(this.bottomUI, targetY + this.bottomUI.height, targetY, true, 310, 0.1, () => {
				this.changeBtnState();
			});
			ChatThread.getInstance().startAutoRequest(iface.tb_prop.chatChannelTypeKey.all);
			this.updateWanfaBtnState();
		}

		private _artiface1: ArtifactRender;
		private _artiface2: ArtifactRender;
		public initArtifact(team: number, templatId: number, anger: number) {
			if (!this._fightvo) return;
			if (team == this._fightvo.getCamp()) {
				if (!this._artiface1) {
					this._artiface1 = new ArtifactRender();
					this._artiface1.x = 158;
					this._artiface1.y = 373;
					this._artiface1.scale(0.7, 0.7);
					this.addChildAt(this._artiface1, this._childs.length - 2);
				}
				this._artiface1.initArtifact(templatId, anger);
			} else {
				if (!this._artiface2) {
					this._artiface2 = new ArtifactRender();
					this._artiface2.right = 158;
					this._artiface2.y = 373;
					this._artiface2.scale(0.7, 0.7);
					this.addChildAt(this._artiface2, this._childs.length - 2);
				}
				this._artiface2.initArtifact(templatId, anger);
			}
		}

		/** 更新玩法按钮状态 */
		public updateWanfaBtnState(): void {
			let openLv = GameUtil.getMinOpenLv(tb.TB_function.getSysids(tb.TB_function.TYPE_LILIAN));
			this.lbOpenLL.visible = App.hero.level < openLv;
			this.lbOpenLL.text = `${openLv}级开启`;
			openLv = GameUtil.getMinOpenLv(tb.TB_function.getSysids(tb.TB_function.TYPE_MAOXIAN));
			this.lbOpenMX.visible = App.hero.level < openLv;
			this.lbOpenMX.text = `${openLv}级开启`;
			openLv = GameUtil.getMinOpenLv(tb.TB_function.getSysids(tb.TB_function.TYPE_JINGJI));
			this.lbOpenJJ.visible = App.hero.level < openLv;
			this.lbOpenJJ.text = `${openLv}级开启`;
			openLv = GameUtil.getMinOpenLv(tb.TB_function.getSysids(tb.TB_function.TYPE_KUAFU));
			this.lbOpenKF.visible = App.hero.level < openLv;
			this.lbOpenKF.text = `${openLv}级开启`;
		}

		public setAnger(camp, anger) {
			if (!this._fightvo) return;
			if (camp == this._fightvo.getCamp()) {
				this._artiface1.setAnger(anger);
			} else {
				this._artiface2.setAnger(anger);
			}
		}

		public clearArtifact() {
			if (this._artiface1) {
				this._artiface1.clearArtifact();
			}
			if (this._artiface2) {
				this._artiface2.clearArtifact();
			}
		}

		public setShouyi() {
			// let maxlev = this._model.getMaxLev();
			// this.box_reward.visible = maxlev != 0;
			// if (maxlev != 0) {
			// 	let curCopy = tb.TB_copy_info.get_TB_copy_infoById(maxlev);
			// 	this.lab_exp.text = `${curCopy.role_exp_speed}/m`;
			// 	this.lab_gold.text = `${curCopy.gold_speed}/m`;
			// 	this.lab_hunshi.text = `${curCopy.exp_speed}/m`;
			// }
		}

		private setFightHead(isfight) {
			this.fightTitle.visible = isfight;
			this.btn_uproad.visible = !isfight;
			// this.box_right.visible = this.box_reward.visible = this.lab_sceneInfo.visible = !isfight;
			this.box_right.visible = !isfight;
			if (!isfight) {
				this.fightTitle.hide();
			}
		}

		public setRound($round: number) {
			if (this._fightvo) {
				let allround = this._fightvo.getAllRound();
				if (this.fightTitle) {
					this.fightTitle.setRound("回合 " + ($round == -1 ? 0 : $round) + "/" + allround);
				}
			}
		}

		public changeBtnState() {
			this.setFightHead(this._model.isFight);
			Laya.timer.clear(this, this.changeBtnState);
			let bottomUI = this.bottomUI;
			bottomUI.lab_info.visible = bottomUI.img_timeicon.visible = false;
			bottomUI.stopBattleEff();
			//战斗中，不允许切换地图
			if (this._model.isFight) {
				//正在挑战
				bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(GuajiBtnState.FIGHTING);
			} else {
				this._fightvo = null;
				let result = null;
				//先判断当前章节是否已经全部通关
				if (this._model.currentZhangjie.finish()) {
					if (this._model.currentZhangjie.maxGuanka.tbCopyInfo.next == 0) {
						//全部通关的情况
						bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(GuajiBtnState.MAP);
						return;
					}
					//取下一章的第一关看开启状态
					let nextItem = this._model.getGuanqiaById(this._model.currentZhangjie.maxGuanka.tbCopyInfo.next);
					result = copymodule.CopyUtils.copyOpen(nextItem.tbCopyInfo.precondition, this._model.getMaxLev());
					if (result && result.isopen) {
						//第十关  显示地图
						bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(GuajiBtnState.MAP);
					} else {
						//未通关的，判断是否开启
						bottomUI.lab_info.visible = true;
						bottomUI.lab_info.text = result.info;
						bottomUI.lab_info.x = 105;
						bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(GuajiBtnState.OPEN);
					}
				} else {
					//当前处于倒计时  取下一个关卡
					let curguanqia: GuaJiGuanqiaVo = this._model.currentZhangjie.getNext();
					if (!curguanqia) {
						// logyhj("当前章节已全部通关：", this._model.currentZhangjie, this._model.currentZhangjie.getNext());
						curguanqia = this._model.currentZhangjie.getMaxPassVo();
					}

					result = copymodule.CopyUtils.copyOpen(curguanqia.tbCopyInfo.precondition, this._model.getMaxLev());
					if (result && result.isopen) {
						if (App.getServerTime() < App.hero.lastProgressTime) {
							// logyhj("服务器当前时间：", App.getServerTime(), " 目标时间：", App.hero.lastProgressTime);
							//冷却中
							bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(GuajiBtnState.TIME);
							bottomUI.img_timeicon.visible = bottomUI.lab_info.visible = true;
							bottomUI.lab_info.x = 115;
							bottomUI.lab_info.text = StringToTime(App.hero.lastProgressTime - App.getServerTime());
							Laya.timer.once(1000, this, this.changeBtnState);
						} else {
							let isJinging = curguanqia.tbCopyInfo.boss_icon == 0;
							//挑战boss
							bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(isJinging ? GuajiBtnState.JINGYING : GuajiBtnState.CANBOSS);
							// if(isJinging){
							bottomUI.playBattleEff();
							// }
						}
					} else {
						//未通关的，判断是否开启
						bottomUI.lab_info.visible = true;
						bottomUI.lab_info.text = result.info;
						bottomUI.lab_info.x = 105;
						bottomUI.btn_onplay.skin = SkinUtil.guajiBtn(GuajiBtnState.OPEN);
					}
				}
			}
		}


		/**
		 * 移动循环
		 */
		private _hasDropItem: boolean = false;
		private _moveSpeed: number = 2.5;
		private _bgMoveSpeed: number = 0.6;
		private loopMove(): void {
			if (!this._model.moveState) {
				return;
			}

			this.roadMap.scrollRect.x += this._moveSpeed;
			if (this.roadMap.scrollRect.x >= 720) {
				this.roadMap.scrollRect.x = 0;
			}

			this.bgMap.scrollRect.x += this._bgMoveSpeed;
			if (this.bgMap.scrollRect.x >= 1020) {
				this.bgMap.scrollRect.x = 0;
			}
		}

		//播放掉落奖励特效
		private static KILL_MONSTER_NUM: number = 0;
		private _dropItemEff: EffectDropItem[] = [];
		public playerRewardEff(pos: tl3d.Vector2D): void {
			if (!this.guajiScene.sceneEabled) return;
			GuajiView.KILL_MONSTER_NUM += 1;
			let items: any = { 6: 4, 1: 5 };
			if (GuajiView.KILL_MONSTER_NUM >= 5) {
				GuajiView.KILL_MONSTER_NUM -= 5;
				items["999999"] = 1;
			}
			let eff: EffectDropItem = EffectDropItem.getDropItemEffPool();
			eff.dropCb = () => {
				this.bottomUI.bxOpenJTEff();
				eff.playAniEnd(this.bottomUI, this.bottomUI.x + this.bottomUI.box_bxeff.x, this.bottomUI.y + this.bottomUI.box_bxeff.y);
			}
			eff.init(items, pos.x + 20, pos.y);
			this.addChild(eff);
			this._dropItemEff.push(eff);
		}

		private clearAllRewardEff(): void {
			for (let i: number = 0; i < this._dropItemEff.length; i++) {
				EffectDropItem.toDropItemEffPool(this._dropItemEff[i]);
			}
			this._dropItemEff.length = 0;
			this._hasDropItem = false;
		}

		/** 延迟显示特效:  10级及之前，在未战斗情况下;如果停留战斗界面超过5秒，出现手指 */
		public delayShowBossTips(): void {
			this.closeBossTips();
			if (App.hero.level <= 10 && !GuideManager.isExecuteGuide()) {
				Laya.timer.once(5000, this, this.showBossTips);
			}
		}
		/** 显示手指特效 */
		public showBossTips(): void {
			if (!this._model.isFight) {
				this.ani_bosstips.play();
				this.ani_bosstips.visible = true;
				// 一直存在
				// Laya.timer.once(10000, this, this.closeBossTips);
				Laya.timer.clear(this, this.showBossTips);
			}
		}
		public closeBossTips(): void {
			this.ani_bosstips.stop();
			this.ani_bosstips.visible = false;
			Laya.timer.clear(this, this.closeBossTips);
			Laya.timer.clear(this, this.showBossTips);
		}


		/**
		 * 关闭面板
		 * @param e 
		 */
		public onClosed(): void {
			super.onClosed();
			ChatThread.getInstance().stopRequest();
			Laya.timer.clear(this, this.changeBtnState);
			this.closeBossTips();
			this.boxEffStop();
			this.playerTalkHide();
			this.clearTimer(this, this.playerTalkHide);
			Laya.Tween.clearAll(this);
			this.clearAllRewardEff();
			this.aniArrow.stop();
			this.bottomUI.onExit();
			this.guajiScene.sceneEabled = false;
			this._model.isEnable = false;
			this.sceneExit();
			UIMgr.hideUIByName(UIConst.ChatView);
			this.btn_uproad.close();

			tl3d.ModuleEventManager.removeEvent(GuajiEvent.FUBEN_REWARD_CHANGE, this.updateFuBenReward, this);
			tl3d.ModuleEventManager.removeEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO, this.setEff, this);

			this._curFuBenRewardT = null;
			// this.guajiScene.removeEff(1000008);
		}

		public sceneExit() {
			if (this.guajiScene) {
				this.guajiScene.onExit();
			}
		}

		private onClickMap() {
			let model = this._model;
			if (model.currentZhangjie.finish()) {
				let nextZhangJie: ZhangjieVo = model.getNextZj();
				if (nextZhangJie && !model.isUnlockCapter(nextZhangJie.id)) {
					UIMgr.showUI(UIConst.WordMap);
				} else {
					UIMgr.showUI(UIConst.GuanQiaNewView, model.currentZhangjie);
				}

			} else {
				UIMgr.showUI(UIConst.GuanQiaNewView, model.currentZhangjie);
			}
		}

		private onAdventure(e): void {
			dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [ModuleConst.ADVENTURE]);
		}

		public showtip() {
			//新章节提示
			if (GuideManager.isInGuide() || GuideWeakManager.isExcuting()) {
				this.aniArrow.visible = false;
			} else {
				if (this._model.newOpen == this._model.currentZhangjie.id) {
					//如果当前已经在需要引导的地图了。就不用引导了
					this._model.newOpen = 0;
				}
			}
			if (this.aniArrow.visible) {
				this.aniArrow.play();
			} else {
				this.aniArrow.stop();
			}
		}

		private resetTick() {
			this.onGuajiLoop();
			Laya.timer.frameLoop(1, this, this.onGuajiLoop);
		}

		private stopTick() {
			Laya.timer.clear(this, this.onGuajiLoop);
		}

		//挂机心跳
		private onGuajiLoop() {
			if (this.guajiScene) {
				this.guajiScene.updataTick();
			}

			//地图移动驱动
			this.loopMove();
		}

		// private _guanItemRenders: Array<GuanqiaIR>;
		/**
		 * 初始化关卡信息
		 */
		public initZhangjie(ismove: boolean): void {
			// if (UIMgr.hasStage(UIConst.GuajiView)) {
			// 	UIMgr.getInstance().showLoading();
			// }
			this.createGuanqia(this._model.currentZhangjie, ismove);
		}

		/**
		 * 移动到指定关卡
		 */
		public moveToTargetGuan(guanqia: GuaJiGuanqiaVo, isSame: boolean = false, isMove: boolean = false): void {
			// this.guajiScene.visPlayer(true);
			// this.guajiScene.refreshRole();
			// this.updateAreaVis();
			if (this._model.isFight) return;
			this.guajiScene.clearGuajiAll();
			this.guajiScene.createGods();
			this.guajiScene.nextGuanqia(guanqia);
			this.isLoad = true;
			AudioMgr.playMusic();
			dispatchEvt(new GuajiEvent(GuajiEvent.MOVE_TO_TARGET_GK));
			if (isSame) { //同一关卡可以不用设置后面的信息了
				return;
			}
			// this.setZhangjie(guanqia);
		}

		// public moveGuanqia(tx: number, ty: number) {
		// 	let viewport = this.img_viewport.viewport;
		// 	let vw = viewport.width;
		// 	tx = -(tx - vw / 2);
		// 	if (tx < (viewport.width - this.bg.width)) {
		// 		tx = viewport.width - this.bg.width;
		// 	}
		// 	if (tx > 0) {
		// 		tx = 0;
		// 	}
		// 	Laya.Tween.to(this.bg, { "x": tx }, 500);
		// }



		/**
		 * 创建关卡
		 * @param zhanjie 
		 */
		private createGuanqia(zhangjie: ZhangjieVo, ismove: boolean): void {
			// this.sceneExit();
			//初始化关卡
			// let mapkeylist: Array<string> = Object.keys(zhangjie.guankaMap);
			// for (let index: number = 0; index < mapkeylist.length; index++) {
			// 	let itemrender: GuanqiaIR = this._guanItemRenders[index];
			// 	if (!itemrender) {
			// 		itemrender = new GuanqiaIR();
			// 		itemrender.index = index + 1;
			// 		this._guanItemRenders[index] = itemrender;
			// 	}
			// }
			// //设置关卡数据
			// for (let index: number = 0; index < this._guanItemRenders.length; index++) {
			// 	let itemrender: GuanqiaIR = this._guanItemRenders[index];
			// 	if (!itemrender) { break; }
			// 	if (mapkeylist.length > index) {
			// 		let key = mapkeylist[index];
			// 		let item = zhangjie.guankaMap[key];
			// 		this.bg.addChildAt(itemrender, 0);
			// 		itemrender.dataSource = item;
			// 	} else {
			// 		itemrender.removeSelf();
			// 	}
			// }
			// this.bg.addChild(this.indexImage);
			this.setBossData();
			let guanqia: GuaJiGuanqiaVo = this.getGuanKa();
			if (guanqia == null) {
				// logyhj("数据不存在");
				return;
			}
			this.lbl_title.text = zhangjie.tbCopy.name;
			this.img_map.skin = this.getMapBlockSkin(zhangjie.tbCopy.chapter);
			// this.updateMap();
			// guanqia.tbCopyInfo.getMonsters();
			// let models = App.hero.chuzhanModels(5).concat(guanqia.tbCopyInfo.monstersModels);
			if (!this.guajiScene.uiScene) {
				return;
			}
			//加载场景，加载角色
			// LoadeQueue.getInstance().loadAll(this.guajiScene.uiScene, [], models, [1029], "", (value, type) => {
			// 	UIMgr.getInstance().loadingProcess(value * 0.8);
			// }, () => {
			// 	let roadBg = SkinUtil.getGuajiRoadbg(zhangjie.tbCopy.road_id);
			// 	Laya.loader.load(roadBg, Handler.create(null, this.initScene.bind(this), [zhangjie, guanqia]), Handler.create(null, (value) => {
			// 		UIMgr.getInstance().loadingProcess(0.8 + value * 0.2);
			// 	})); //加载地图
			// 	// this.initScene(zhangjie, guanqia);
			// });

			this.initScene(zhangjie, guanqia, ismove);//
		}

		private updateMap() {
			let guanqia: GuaJiGuanqiaVo = this._model.currentZhangjie.getCurPassGuanqia();

			if (guanqia == null) {
				// logyhj("数据不存在");
				this.lab_sceneInfo.visible = false;
				return;
			}
			let tab = tb.TB_copy.get_TB_copyById(guanqia.tbCopyInfo.area);
			this.lab_mapstatus.text = this.getMapBlockLevelDesc(tab.sub_type) + ` ${guanqia.chapter}-${guanqia.tbCopyInfo.area_number}`;


			if (this.lab_sceneInfo.visible) {
				let tabMonster = tb.TB_monster.get_TB_monsterById(guanqia.tbCopyInfo.checkpoint_icon);
				this.lab_sceneInfo.text = guanqia.tbCopyInfo.scene_desc + "  " + LanMgr.getLan(guanqia.tbCopyInfo.monster_desc, -1, tabMonster.name, tabMonster.level);
			}

		}



		//获取地块图片
		private getMapBlockSkin(idx: number): string {
			if (idx < 10) {
				return "guaji/sjdt/sjdt_0" + idx + ".png";
			} else {
				return "guaji/sjdt/sjdt_" + idx + ".png";
			}
		}

		//获取地块难度
		private getMapBlockLevelDesc(lv: number): string {
			switch (lv) {
				case 1:
					return "普通";
				case 2:
					return "困难";
				case 3:
					return "地狱";
				default:
					return "普通";
			}
		}

		// private setZhangjie(vo: GuaJiGuanqiaVo) {
		// 	this.indexImage.visible = vo.isNext();
		// 	if (this.indexImage.visible) {
		// 		this.setIndexImage(vo);
		// 		this.ani_fight.play(1, true);
		// 		// this.playArrowEff();
		// 	} else {
		// 		this.ani_fight.stop();
		// 		// this.stopArrowEff();
		// 	}

		// 	for (var i = 0; i < this._guanItemRenders.length; i++) {
		// 		var element = this._guanItemRenders[i];
		// 		if (!element) { break; }
		// 		//更新关卡显示状态
		// 		element.updateState();
		// 		if (element.dataSource.tbCopyInfo.ID == (vo.tbCopyInfo.ID)) {
		// 			this.moveGuanqia(element.x, element.y);
		// 		}
		// 	}
		// }

		// private playArrowEff() {
		// 	Laya.Tween.clearTween(this.indexImage);
		// 	UIUtil.loop(this.indexImage, this.indexImage.x, this.indexImage.y, 500, 10, TweenDirection.down);
		// }

		// private stopArrowEff() {
		// 	Laya.Tween.clearTween(this.indexImage);
		// }

		/**
		 * 初始化挂机场景
		 * @param zhangjie 
		 */
		private initScene(zhangjie: ZhangjieVo, guanqia: GuaJiGuanqiaVo, ismove: boolean): void {
			// this.lab_title.text = zhangjie.tbCopy.name;
			this.guajiScene.initScene();
			// logerror("刷新怪物2");
			this.moveToTargetGuan(guanqia, false, ismove);
			this.bgtile.skin = this.bgtile2.skin = SkinUtil.getSysMapSkin(ModuleConst.FIGHT, 0, zhangjie.tbCopy.background_id);
			this.tile.skin = this.tile2.skin = SkinUtil.getSysMapSkin(ModuleConst.FIGHT, 1, zhangjie.tbCopy.road_id);
			// UIMgr.getInstance().hideLoading();
			this._model.inited = true;
			// dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_SHOUYI_UP_VIEW));
		}

		private _skill: tl3d.Skill;
		private _probarmask: Laya.Sprite;


		/**
		 * 设置当前索引位置
		 * @param guanqia 
		 */
		// public setIndexImage(guanqia: GuaJiGuanqiaVo): void {
		// 	this.indexImage.dataSource = guanqia;
		// 	this.indexImage.x = guanqia.viewX - 0;
		// 	this.indexImage.y = guanqia.viewY - 30;
		// }

		/**
		 * 鼠标按下拖动地图
		 * @param e 
		 */
		// private mouseDown(e: Event): void {
		// 	if (e.target instanceof Laya.Button) {
		// 		return;
		// 	}
		// 	this.mLastMouseX = this.bg.mouseX;
		// 	this.mLastMouseY = this.bg.mouseY;
		// 	Laya.stage.on(Event.MOUSE_MOVE, this, this.mouseMove);
		// }

		/**
		 * 拖动
		 * @param e 
		 */
		// private mouseMove(e: Event): void {
		// 	let diffx = (this.bg.mouseX - this.mLastMouseX);
		// 	this.bg.x += diffx;
		// 	let viewport = this.img_viewport.viewport;
		// 	let vw = viewport.width;
		// 	let vh = viewport.height;
		// 	if (this.bg.x < (vw - this.bg.width)) {
		// 		this.bg.x = vw - this.bg.width;
		// 	}
		// 	if (this.bg.x > 0) {
		// 		this.bg.x = 0;
		// 	}
		// }

		// private mouseUp(): void {
		// 	Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
		// }

		//更新左边box
		// private updateLeftBox(): void {
		// 	this.box_zxhl.visible = this._btnzxhl && this._btnzxhl.dataSource && this._btnzxhl.dataSource.isOnActivityTime();
		// 	this.box_xskh.visible = this._btnxskh && this._btnxskh.dataSource && this._btnxskh.dataSource.isOnActivityTime();

		// 	//布局
		// 	let posx: number = 98;
		// 	if (this.btn_shouchong.visible) {
		// 		this.btn_shouchong.x = posx;
		// 		posx += 98;
		// 	}
		// 	if (this.box_zxhl.visible) {
		// 		this.box_zxhl.x = posx;
		// 		posx += 98;
		// 	}
		// 	if (this.box_xskh.visible) {
		// 		this.box_xskh.x = posx;
		// 		posx += 98;
		// 	}


		// 	if (this.ui_tishi) {
		// 		this.ui_tishi.pos(this.btn_shouchong.x + 19, this.btn_shouchong.y + this.btn_shouchong.height + 20);
		// 		// this.ui_tishi.pos(this.btn_shouchong.x + this.btn_shouchong.width, this.btn_shouchong.y + this.ui_tishi.height / 2 + this.btn_shouchong.height / 2);
		// 		// this.ui_tishi.pos(this.btn_shouchong.x + this.ui_tishi.width / 2 + this.btn_shouchong.width / 2, this.btn_shouchong.y + this.btn_shouchong.height);
		// 		this.ui_tishi.updateModulePos();
		// 	}
		// }

		private onClickFunction(type: number): void {
			let level = App.hero.level;
			let isOpen: boolean = true;
			let typeList = [tb.TB_function.TYPE_MAOXIAN, tb.TB_function.TYPE_LILIAN, tb.TB_function.TYPE_JINGJI, tb.TB_function.TYPE_KUAFU];
			for (let i = 0; i < typeList.length; i++) {
				if (typeList[i] == type && level < GameUtil.getMinOpenLv(tb.TB_function.getSysids(type))) {
					isOpen = false;
					break;
				}
			}
			if (!isOpen) {
				showToast(LanMgr.getLan(``,10229));
				return;
			}

			dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW, type));
		}

		/**判断是否开启 */
		private isBtnOpen(fundId: number, isTip: boolean = false): boolean {
			let tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
			if (tbData && !App.IsSysOpen(fundId)) {
				if (isTip) showToast(tbData.prompt);
				return true
			}
			return false;
		}

		//通关奖励
		private _curFuBenRewardT: tb.TB_checkpoint_pass;
		private updateFuBenReward(): void {
			let data = TableData.getInstance().getTableByName(TableData.tb_checkpoint_pass).data;
			this._curFuBenRewardT = null;
			for (let key in data) {
				let id: number = data[key].ID;
				if (App.hero.mapBoxAwardIds.indexOf(id) == -1) {
					this._curFuBenRewardT = data[key];
					break;
				}
			}
			this.setEff();
		}

		private setEff() {
			this.boxEffStop();
			if (this.box_boss.visible && this._curFuBenRewardT && App.hero.mapBoxAwardIds.indexOf(this._curFuBenRewardT.ID) == -1) {
				let tbcopyinfo: tb.TB_copy_info = tb.TB_copy_info.get_TB_copy_infoById(this._curFuBenRewardT.para);
				if (App.hero.isPassRuneCopyInfo(tbcopyinfo.ID, tbcopyinfo.getChapter())) {
					this.boxEffPlay();
				}
			}
		}

		private boxEffPlay() {
			this.ani_baoxiang.visible = true;
			// this.ani_baoxiang.play(0, true);
			this.ani_baoxiang.loadAnimation(ResConst.anim_baoxiang, Handler.create(null, () => {
				this.ani_baoxiang.play(0, true);
			}), ResConst.atlas_baoxiang);
			Laya.Tween.to(this.img_baoxiang, { rotation: -20 }, 150, null, Laya.Handler.create(this, () => {
				Laya.Tween.to(this.img_baoxiang, { rotation: 20 }, 300, null, Laya.Handler.create(this, () => {
					Laya.Tween.to(this.img_baoxiang, { rotation: 0 }, 150, null, Laya.Handler.create(this, () => {
						this.setEff();
					}));
				}));
			}));
		}

		private boxEffStop() {
			this.ani_baoxiang.gotoAndStop(0);
			this.ani_baoxiang.visible = false;
			Laya.Tween.clearAll(this.img_baoxiang);
			this.img_baoxiang.rotation = 0;
		}

		/**
		 * 快速战斗
		 * @param e 
		 */
		public onFast(e: Event): void {
			dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_FAST_BATTLE));
		}
		/**
		 * 收益
		 * @param e 
		 */
		public onReward(): void {
			dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_JINAGLI_PANEL), null);
		}

		public playerTalkShow(data) {
			this.box_talk.visible = true;
			this.lab_talk.text = data.str;
			this.box_talk.height = this.lab_talk.height + 20;
			this.box_talk.x = data.pos.x + Launch.offsetX;
			this.box_talk.y = data.pos.y + Launch.offsetY - 120;
			this.timerOnce(1500, this, this.playerTalkHide);
		}

		private playerTalkHide() {
			this.box_talk.visible = false;
		}

		/**
		 * 全部通关就返回本章节最高的
		 * 没有全部通关，就根据当前下一关可挑战的时间去返回
		 */
		getGuanKa(): GuaJiGuanqiaVo {
			//获得当前的关卡
			if (this._model.currentZhangjie.finish()) {
				return this._model.currentZhangjie.maxGuanka;
			} else {
				let curguanqia: GuaJiGuanqiaVo = null;
				// if (App.hero.lastProgressTime == 0) {
				// 	//当前关卡已经打完  取当前通关最高关卡
				// 	curguanqia = this._model.currentZhangjie.getMaxPassVo();
				// 	if (!curguanqia) {
				// 		logerror("挂机关卡异常！", this._model.currentZhangjie);
				// 		return;
				// 	}
				// } else {
				//当前处于倒计时  取下一个关卡
				curguanqia = this._model.currentZhangjie.getNext();
				// }
				return curguanqia;
			}

		}


		private _skillBox: game.playSkillRender;
		public playSkillName(name, icon, team) {
			if (!this._skillBox) {
				this._skillBox = new game.playSkillRender;
				this.addChild(this._skillBox);
				// this._skillBox.y = 537;
				// this._skillBox.centerX = 0;
			}

			// if (team == battle.BatteConsts.BATTLE_CAMPATK) {
			// 	this._skillBox.left = 9;
			// 	this._skillBox.right = null;
			// } else {
			// 	this._skillBox.left = null;
			// 	this._skillBox.right = 9;
			// }
			this._skillBox.x = team == battle.BatteConsts.BATTLE_CAMPATK ? 20 : Laya.stage.width - 476;
			this._skillBox.bottom = team == battle.BatteConsts.BATTLE_CAMPATK ? 550 : 600;
			this._skillBox.setData(team, icon, name);
		}
	}

	export class EffectDropItem extends Laya.View {
		private _itemsData: any;
		private _itemImgArr: Laya.Animation[];
		// private _itemShadomImgArr: Laya.Image[] = [];
		// private _dropRadius: number = 60;
		// private _isAlive: boolean = false;

		public dropCb: Function

		constructor() {
			super();
		}


		public init(items: any, posx: number, posy: number, dropradius: number = 40): void {
			this._itemsData = items;
			this.x = posx;
			if (posy >= Laya.stage.height - 380) {
				posy = Laya.stage.height - 380;
			}
			this.y = posy;
			// this._dropRadius = dropradius;
			// this.width = 120;
			// this.height = 120;

			// this._isAlive = true;
			this.initItem();
			this.dropEff();
		}

		// public isAlive(): boolean {
		// 	return this._isAlive;
		// }

		private initItem(): void {
			if (this._itemImgArr && this._itemImgArr.length > 0) return;
			this._itemImgArr = [];
			for (let id in this._itemsData) {
				let num: number = this._itemsData[id];
				for (let j: number = 0; j < num; j++) {
					this.addItemImg(parseInt(id));
				}
			}
		}

		private addItemImg(id: number): void {

			// let img: Laya.Image = EffectDropItem.getImgPool();
			// img.x = 0;
			// img.y = 0;
			// img.skin = this.getItemIcon(id);
			// if (id == 999999) {
			// 	img.scaleX = 0.8;
			// 	img.scaleY = 0.8;
			// } else if (id == 6) {
			// 	img.scaleX = 0.9;
			// 	img.scaleY = 0.9;
			// }
			// this._itemImgArr.push(img);
			// this.addChild(img);


			let ani: Laya.Animation = new Laya.Animation();
			ani.source = this.getItemIcon(id);
			ani.visible = true;
			this.addChild(ani);
			this._itemImgArr.push(ani);
			// if (!this._aniss) {
			// 	this._aniss = new Laya.Animation();
			// 	this._aniss.source = "eff/GuajiHunEff.ani"
			// 	this.addChild(this._aniss);
			// }
		}

		// private _aniss: Laya.Animation;

		private getItemIcon(id: number): string {
			if (id == 1) {
				return "eff/GuajiCoin.ani";
			} else if (id == 6) {
				return "eff/GuajIHunEff.ani";
			} else if (id == 999999) {
				return "eff/GuajiBoxEff.ani";
			} else {
				return "";
			}
			// if (id == 1) {
			// 	return "comp/image/jinbiyy.png";
			// } else if (id == 6) {
			// 	return "comp/image/hunshiyy.png";
			// } else if (id == 999999) {
			// 	return "comp/image/qiandaiyy.png";
			// } else {
			// 	return "";
			// }
		}

		private _initScale: number = 0.8;
		//掉落表现
		private dropEff(): void {
			for (let i: number = 0; i < this._itemImgArr.length; i++) {
				let ani: Laya.Animation = this._itemImgArr[i];
				ani.visible = true;
				let dropposx: number = Math.random() * 80
				let dropposy: number = Math.random() * 30
				ani.x = dropposx;
				ani.y = dropposy;
				// img.scaleX = 0.5, img.scaleY = 0.5;
				// let lastOne: boolean = i == this._itemImgArr.length - 1;
				// Laya.timer.once(i * 100, this, () => {
				// 	Laya.Tween.to(img, { scaleX: 1, scaleY: 1, alpha: 1, y: dropposy, x: dropposx + 40 }, 200, Laya.Ease.backIn, Handler.create(this, this.onDropComplete, [lastOne]));
				// })
				ani.scale(this._initScale, this._initScale);
				ani.play(0, false);
				// img.alpha = 1;
				// img.x = dropposx;
				// img.y = dropposy - 40;
			}

			// if (this._aniss) {
			// 	this._aniss.scale(1, 1);
			// 	this._aniss.play(0, false);
			// }

			let efftime = 1000 + (this._itemImgArr.length - 1) * 100;
			Laya.timer.once(efftime, this, () => {
				if (this.dropCb) {
					this.dropCb();
				}
			});
		}

		// private onDropComplete(all: boolean = false): void {
		// 	// if (all) this.addShadom();
		// }

		//添加阴影
		// private addShadom(): void {
		// 	for (let i: number = 0; i < this._itemImgArr.length; i++) {
		// 		let img: Laya.Image = this._itemImgArr[i];
		// 		let shadom: Laya.Image = EffectDropItem.getBlackImgPool();
		// 		shadom.skin = "comp/bg/blank.png";
		// 		shadom.alpha = 0.8;
		// 		shadom.width = 25;
		// 		shadom.height = 25;
		// 		shadom.x = img.x;
		// 		shadom.y = img.y + 15;
		// 		this.addChildAt(shadom, 0);
		// 		this._itemShadomImgArr.push(shadom);

		// 	}
		// }

		// private _isPlayIntoEff: boolean = false;
		// public isPlayIntoEff(): boolean {
		// 	return this._isPlayIntoEff;
		// }


		public playAniEnd(view: game.GuajiBottomView, posx: number, posy: number) {
			// if (!this._aniss) return;
			// let tx: number = posx - this.x + 50;
			// let ty: number = posy - this.y + 20;
			// Laya.Tween.to(this._aniss, { scaleX: 0, scaleY: 0, x: tx, y: ty }, 300, Laya.Ease.backIn, null);
			if (!this._itemImgArr) return;
			// this._isPlayIntoEff = true;
			let tx: number = posx - this.x - 135;
			let ty: number = posy - this.y - 20;
			let delay = 0;
			for (let i: number = 0; i < this._itemImgArr.length; i++) {
				delay = 200 + i * 200;
				let ani: Laya.Animation = this._itemImgArr[i];
				ani.stop();
				// Laya.Tween.clearAll(ani);
				BezierTween.clear(ani);
				BezierTween.to(ani, 500, [{ x: ani.x, y: ani.y }, { x: tx, y: ty }], { scaleX: 0.7, scaleY: 0.7 }, null, new Handler(this, () => {
					ani.visible = false;
					view.bxOpenDTEff();
				}));
				// Laya.Tween.to(ani, { scaleX: 0.7, scaleY: 0.7, x: tx, y: ty }, 300, null, ,delay);
			}
			Laya.timer.once(delay + 700, this, this.onIntoBXComplete);
		}

		//收到宝箱里
		// public IntoBXEff(posx: number, posy: number): void {
		// 	this._isPlayIntoEff = true;
		// 	let efftype: number = 0;
		// 	let maxt: number = 0;
		// 	if (efftype == 0) {
		// 		Laya.timer.clearAll(this);
		// 		for (let i: number = 0; i < this._itemImgArr.length; i++) {
		// 			let ani: Laya.Animation = this._itemImgArr[i];
		// 			// let shadomImg: Laya.Image = this._itemShadomImgArr[i];
		// 			Laya.Tween.clearAll(ani);
		// 			// Laya.Tween.clearAll(shadomImg);
		// 			let tt: number = (this._dropRadius - ani.y) * 5;
		// 			if (tt > maxt) maxt = tt;
		// 			Laya.timer.once(tt, this, () => {
		// 				let tx: number = posx - this.x + 50;
		// 				let ty: number = posy - this.y + 20;
		// 				Laya.Tween.to(ani, { scaleX: 0, scaleY: 0, x: tx, y: ty }, 300, Laya.Ease.backIn, null);
		// 				// Laya.Tween.to(shadomImg, { scaleX: 0, scaleY: 0, x: tx, y: ty }, 300, Laya.Ease.backIn, null);
		// 			})
		// 		}
		// 	} else {
		// 		EffectDropItem.toDropItemEffPool(this);
		// 	}

		// 	Laya.timer.once(maxt + 300, this, this.onIntoBXComplete);
		// }

		private onIntoBXComplete(): void {
			// dispatchEvt(new GuajiEvent(GuajiEvent.GET_PROP_EFF));
			// this._isPlayIntoEff = false;
			// this._isAlive = false;
			EffectDropItem.toDropItemEffPool(this);
		}

		public clear(): void {
			// this._isPlayIntoEff = false;
			// this._isAlive = false;
			Laya.timer.clearAll(this);
			// if (this._itemShadomImgArr) {
			// 	for (let i: number = 0; i < this._itemShadomImgArr.length; i++) {
			// 		EffectDropItem.toBlackImgPool(this._itemShadomImgArr[i]);
			// 	}
			// 	this._itemShadomImgArr.length = 0;
			// }
			// if (this._itemImgArr) {
			// for (let i: number = 0; i < this._itemImgArr.length; i++) {
			// EffectDropItem.toImgPool(this._itemImgArr[i]);
			// }
			// this._itemImgArr.length = 0;
			// }

		}


		private static _IMG_BLACK_POOL: Laya.Image[] = [];
		public static getBlackImgPool(): Laya.Image {
			let img: Laya.Image;
			if (this._IMG_BLACK_POOL.length > 0) {
				img = this._IMG_BLACK_POOL.shift();
			} else {
				img = new Laya.Image();
				img.anchorX = 0.5;
				img.anchorY = 0.5;
				// img.width = 40;
				// img.height = 40;
			}
			img.alpha = 1;
			img.scaleX = 1;
			img.scaleY = 1;
			return img;
		}

		public static toBlackImgPool(img: Laya.Image): void {
			if (!img) return;
			Laya.Tween.clearAll(img);
			img.removeSelf();
			this._IMG_BLACK_POOL.push(img);
		}


		private static _IMG_POOL: Laya.Image[] = [];
		public static getImgPool(): Laya.Image {
			let img: Laya.Image;
			if (this._IMG_POOL.length > 0) {
				img = this._IMG_POOL.shift();
			} else {
				img = new Laya.Image();
				img.anchorX = 0.5;
				img.anchorY = 0.5;
				// img.width = 40;
				// img.height = 40;
			}
			img.alpha = 0;
			img.scaleX = 1;
			img.scaleY = 1;
			return img;
		}

		public static toImgPool(img: Laya.Image): void {
			if (!img) return;
			Laya.Tween.clearAll(img);
			img.removeSelf();
			this._IMG_POOL.push(img);
		}

		private static _DROP_ITEM_EFF: EffectDropItem[] = [];
		public static getDropItemEffPool(): EffectDropItem {
			let eff: EffectDropItem;
			if (this._DROP_ITEM_EFF.length > 0) {
				eff = this._DROP_ITEM_EFF.shift();
			} else {
				eff = new EffectDropItem();
			}
			return eff;
		}

		public static toDropItemEffPool(eff: EffectDropItem): void {
			if (!eff) return;
			eff.clear();
			eff.removeSelf();
			this._DROP_ITEM_EFF.push(eff);
		}
	}
}