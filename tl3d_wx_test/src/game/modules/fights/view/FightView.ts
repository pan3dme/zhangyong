module game {
	import Event = Laya.Event;
	//战斗面板
	export class FightView extends ui.fight.fightsUI {

		// private _actionList: Array<any>;
		private _scene: FightScene;
		private _curspeed: number = 0;
		private _curRound: number;
		static chkCam: boolean;
		//测试模式下，移动的角色
		private _curselect: SceneGodVo;
		private _speedlev: number;
		public talkStart: boolean;

		public fightTitle: FightHeadRender;
		private _bossRankView: BossFightRankView;

		/** 停止战斗结束时的旋转及结算 */
		public stopFightEnd: boolean;
		constructor() {
			super();
			this._scene = new FightScene();
			this.addChildAt(this._scene.gameScene, 0);
			this.addChild(this._scene.game2dScene);
			this.on(Laya.Event.CLICK, this, this.onClick);
			this.btn_speed.on(Laya.Event.CLICK, this, this.onSpeed);
			// this.btn_auto.on(Laya.Event.CLICK, this, this.onAuto);
			// this.btn_stop.on(Laya.Event.CLICK, this, this.onStop);
			this.btn_jump.on(Laya.Event.CLICK, this, this.onJump);
			this.btn_cam.on(Laya.Event.CLICK, this, this.onCamMove);
			Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onkeydown);
			// this.list_skillmodel.visible = false;
			// this.list_skillmodel.mouseThrough = false;
			// this.list_skillmodel.selectHandler = new Handler(this, this.onSelect);
			// this.list_skillmodel.selectEnable = true;
			// this.initList();
			this.addChild(this.img_startbg);

			if (!this.fightTitle) {
				this.fightTitle = new FightHeadRender();
				this.fightTitle.x = 0;
				this.fightTitle.y = GameUtil.isFullScreen() ? (HudModel.TOP_ADD_HEIGHT + 10) : 10;
				this.addChildAt(this.fightTitle, this._childs.length - 1);
			}
			this.on(Event.MOUSE_UP, this, this.onMouseUp);
			this.on(Event.MOUSE_OUT, this, this.onMouseUp);
		}

		setSize(w: number, h: number): void {
			super.setSize(w, h);
			this.width = w;
			this.height = h;
			this.img_startbg.width = w;
			this.img_startbg.height = h;
			// this.btnBox.x = 20;
			// this.btnBox.y = Laya.stage.height - this.btnBox.height - 20;
			let isFull = GameUtil.isFullScreen();
			this.box_blood.y = isFull ? (173 + HudModel.TOP_ADD_HEIGHT) : 173;
			this.list_bossbuff.y = isFull ? (241 + HudModel.TOP_ADD_HEIGHT) : 241;
		}


		// private initList() {
		// 	this._actionList = new Array;
		// 	for (var i = 0; i < 10; i++) {
		// 		let item = new fightActionBarIR();
		// 		item.anchorY = 1;
		// 		item.anchorX = 0.5;
		// 		this.addChild(item);
		// 		this._actionList.push(item);
		// 	}
		// }

		public setAnger(camp, anger) {
			if (camp == this.getFightVo().getCamp()) {
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

		private _bossanger: number = 0;
		public setBossAnger(val) {

			let angerVal = Number((val / tb.TB_skill_set.getSkillSet().spell_anger).toFixed(2));
			angerVal = Math.min(1, angerVal);
			angerVal = Math.max(0.001, angerVal);

			if (angerVal == this._bossanger) return;
			let nwidth = 450 * angerVal;
			if (!this.img_anger.visible && val > 0) {
				this._bossanger = angerVal;
				// this.setUiVisable();
				this.img_anger.width = nwidth;
				this.img_anger_pross.width = nwidth;
				return;
			}

			Laya.Tween.clearTween(this.img_anger);
			Laya.Tween.clearTween(this.img_anger_pross);
			if (this._bossanger < angerVal) {
				//回血
				this.img_anger_pross.width = nwidth;
				Laya.Tween.to(this.img_anger, { width: nwidth }, 1000, null, Laya.Handler.create(this, () => {
					// this.setUiVisable();
				}));
			} else if (this._bossanger > angerVal) {
				//掉血
				this.img_anger.width = nwidth;
				Laya.Tween.to(this.img_anger_pross, { width: nwidth }, 1000, null, Laya.Handler.create(this, () => {
					// this.setUiVisable();
				}));
			}
			this._bossanger = angerVal;
		}

		private _artiface1: ArtifactRender;
		private _artiface2: ArtifactRender;
		public initArtifact(team: number, templatId: number, anger: number) {
			if (team == this.getFightVo().getCamp()) {
				if (!this._artiface1) {
					this._artiface1 = new ArtifactRender();
					this._artiface1.x = 20;
					this._artiface1.bottom = 22;
					this.addChildAt(this._artiface1, this._childs.length - 2);
				}
				this._artiface1.initArtifact(templatId, anger);
			} else {
				if (!this._artiface2) {
					this._artiface2 = new ArtifactRender();
					this._artiface2.y = GameUtil.isFullScreen() ? (HudModel.TOP_ADD_HEIGHT + 145) : 145;
					this._artiface2.right = 16;
					this.addChildAt(this._artiface2, this._childs.length - 2);
				}
				this._artiface2.initArtifact(templatId, anger);
			}
		}


		public onOpened(): void {
			super.onOpened();
			this.setData(this.dataSource);
		}

		public setData(gameData) {
			// if (ExtConfig.RELEASE) {
			// 	FightView.chkCam = false;
			// }
			this.talkStart = false;
			if (!gameData) {
				logerror("战斗vo不存在");
				return;
			}

			UIMgr.getInstance().showLoading();
			this.stopFightEnd = false;
			// this.setNameLab("战斗开始");
			this._curRound = 0;
			this._fightcopyVo = gameData;

			let fightvo = this.getFightVo();

			this.initCamMove();

			this.fightTitle.setVsVis(false);
			this.fightTitle.setVis(false);

			this.setJumpAndStop();
			this.clearArtifact();

			this.setBossBuff(null);
			// this.setActionBar();
			AudioMgr.stopMusic();
			this.setRound(-1);
			let preloadids = fightvo.fightPageControl.getPreloadIds();
			//不能放外面
			let effary = [888888, 1029, 1017, 1024, 10000030];

			let mapid = tb.TB_map.get_TB_map_ById(fightvo.getMapid()).map_id;
			if (!this._scene.gameScene) {
				return;
			}
			if (fightvo.copyType == CopyType.worldboss) {
				if (!this._bossRankView) {
					this._bossRankView = new BossFightRankView();
					this._bossRankView.x = 10;
					this._bossRankView.y = 250;
				}
				this.addChild(this._bossRankView);
				this._bossRankView.dataSource = fightvo.worldBossInfo.rankList;
				this._bossRankView.initView();
			}
			// logfight("开始加载", JSON.stringify(preloadids.skills), JSON.stringify(preloadids.roles));
			LoadeQueue.getInstance().loadAll(this._scene.gameScene, preloadids.skills, preloadids.roles, effary, mapid, (value, type) => {
				let txId:number  = type == 0 ? 10545 : type == 1 ? 10546 : type == 2 ? 10547 : type == 3 ? 10548 : -1;
				let str = LanMgr.getLan(``,txId);
				UIMgr.getInstance().loadingProcess(value, str);
			}, () => {
				logfight("资源加载完成");
				this.initAutoBtn();
				//场景初始化
				this.initScene();
			});
		}

		private initAutoBtn() {
			let vo: FightVo = this.getFightVo();
			if (FightView.chkCam) {
				let camraView = new common.CamraView(this._scene);
				this.addChild(camraView);
				camraView.left = 10;
				camraView.bottom = 10;
				return;
			}
		}

		public startTalkEnd() {
			if (this.talkStart) {
				if (this._scene.init) {
					this._scene.startFight();
				}
			}
		}

		private initScene() {
			//场景加载
			this.box_blood.visible = false;
			this.list_bossbuff.visible = false;
			let fightvo = this.getFightVo();
			this._scene.enterScene(this.talkStart, fightvo, fightvo.getMapid(), () => {
				this.callLater(this.sceneCom);
			});
		}

		private _camTopLimit: number;
		private _camBottomLimit: number;
		private _camLeftLimit: number;
		private _camRightLimit: number;
		private sceneCom() {
			AudioMgr.playMusic("sound/battle_bgm2.mp3");
			UIMgr.getInstance().hideLoading();
			dispatchEvt(new FightsEvent(FightsEvent.SCENE_COMPLETE_EVENT), { type: this.getFightVo().copyType });

			Laya.timer.once(1000, this, () => {
				logfight("监听点击事件开启");
				let fightvo = this.getFightVo();
				let mapvo = tb.TB_map.get_TB_map_ById(fightvo.getMapid());
				this._camTopLimit = mapvo.longitudinal_scope[0]
				this._camBottomLimit = mapvo.longitudinal_scope[1]
				this._camLeftLimit = mapvo.transverse_scope ? mapvo.transverse_scope[0] : NaN;
				this._camRightLimit = mapvo.transverse_scope ? mapvo.transverse_scope[1] : NaN;
				if (!FightView.chkCam && mapvo.canTurn()) {
					this.on(Event.MOUSE_DOWN, this, this.onMouseDown);
				}
			});
		}

		public showStartBg() {
			this.img_startbg.visible = true;
			Laya.timer.once(900, this, () => {
				this.img_startbg.visible = false;
			});
		}

		public initSpeed() {
			let tickspeed = Laya.LocalStorage.getItem(App.hero.playerId + "tickspeed");
			let speed = tickspeed ? Number(tickspeed) : 0;
			this._curspeed = speed;
			this.setSpeedLab();
		}

		public refreshTitle() {
			let fightvo = this.getFightVo();
			this.fightTitle.dataSource = fightvo.getHeadData();
			this.fightTitle.setData();
			this.fightTitle.showEff();
		}

		public setRound($round: number) {
			let allround = this.getFightVo().getAllRound();
			if ($round != -1)
				this._curRound = $round;
			if (this.fightTitle) {
				this.fightTitle.setRound( LanMgr.getLan("",12303) + " " + this._curRound + "/" + allround);
			}
		}

		private _bossblood: number;
		public setBossBlood($bloodnum: number, info: string) {

			logfight("boss血量：", $bloodnum, info);
			this.lab_bosshp.text = info;
			if ($bloodnum == this._bossblood) return;
			let num = $bloodnum / 100;
			let nwidth = 538 * num;
			if (!this.box_blood.visible && $bloodnum > 0) {
				this._bossblood = $bloodnum;
				this.setUiVisable();
				this.img_blood.width = nwidth;
				this.img_pross.width = nwidth;
				return;
			}

			Laya.Tween.clearTween(this.img_blood);
			Laya.Tween.clearTween(this.img_pross);
			if (this._bossblood < $bloodnum) {
				//回血
				this.img_pross.width = nwidth;
				Laya.Tween.to(this.img_blood, { width: nwidth }, 500, null, Laya.Handler.create(this, () => {
					this.setUiVisable();
				}));
			} else if (this._bossblood > $bloodnum) {
				//掉血
				this.img_blood.width = nwidth;
				Laya.Tween.to(this.img_pross, { width: nwidth }, 500, null, Laya.Handler.create(this, () => {
					this.setUiVisable();
				}));
			}
			this._bossblood = $bloodnum;
		}

		private setUiVisable() {
			this.list_bossbuff.visible = this.box_blood.visible = this._bossblood > 0;
		}

		public setBossLev(lev) {
			this.lab_bosslev.visible = false;
			this.lab_bosslev.text = "Lv." + lev;
		}


		public setBossBuff($buffary: Array<GodBuffVo>) {
			this.list_bossbuff.visible = this.box_blood.visible;
			if (this.box_blood.visible && $buffary) {
				this.list_bossbuff.dataSource = $buffary;
				let posx = 360 - (this.list_bossbuff.dataSource.length * 55 >> 1) + Launch.offsetX;
				this.list_bossbuff.x = posx < 0 ? 0 : posx;
			}
		}

		//行动条设置
		// public setActionBar($sdata = null) {
		// 	if ($sdata) {
		// 		$sdata.sort((a, b) => {
		// 			if (!a)
		// 				return 1;
		// 			if (!b)
		// 				return -1;
		// 			if (a.isMain) {
		// 				return -1;
		// 			}
		// 			if (b.isMain) {
		// 				return 1;
		// 			}
		// 			return b.rate - a.rate;
		// 		});
		// 	}
		// 	for (var i = 9; i >= 0; i--) {
		// 		this._actionList[i].dataSource = $sdata == null ? null : $sdata[9 - i];
		// 		if (this._actionList[i].dataSource) {
		// 			logfight("i = " + i, this._actionList[i].dataSource.rate);
		// 		}
		// 	}
		// }


		private onSpeed() {
			this._curspeed += 1;
			this.setSpeedLab();
		}

		private _SpeedKey = [0.6, 0.9];
		private setSpeedLab() {
			let multiple = this._curspeed % 2;
			if (this._curspeed % 2 == 1 && !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.battleSpeed)) {
				let data = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.battleSpeed);
				let str = LanMgr.getLan(``, 10311, data.vip_level);
				str += data.general_level != 999 ? LanMgr.getLan(``, 10312, data.general_level) : "";
				showToast(str);
				this._curspeed++;
				multiple = 0;
			}
			this.setTickSpeed(multiple);
			this.lbl_speed.text = "X" + (multiple + 1);
			Laya.LocalStorage.setItem(App.hero.playerId + "tickspeed", String(multiple));
			dispatchEvt(new FightsEvent(FightsEvent.SWITCH_SPEED_SUCCESS));

		}

		getCurspeed(): number {
			return this._curspeed;
		}

		/**
		 * 战斗结束
		 * @param forceExit 是否中途强制退出标记 
		 */
		public fightEnd(forceExit: boolean = false) {
			logfight("结束战斗");
			//清空行动条
			// this.setActionBar();
			this.onStopSceneTick();
			if (!this.stopFightEnd) {
				this.doFigthEnd(forceExit);
			}
		}

		public doFigthEnd(forceExit): void {
			this.stopFightEnd = false;
			let vo = this.getFightVo();
			if (vo.fightPageControl.getResult() == playState.VICTORY) {
				this._scene.tweenCam(CameraConst.VICTORY, () => {
					this.victoryFun(forceExit);
				});
			} else {
				this._scene.tweenCam(CameraConst.DEFEATED, () => {
					this.defeatedFun(forceExit);
				});
			}
		}

		private victoryFun(forceExit) {
			let copyVo = this.getFightVo();
			if (copyVo.copyType == CopyType.qiecuo || copyVo.copyType == CopyType.escort || copyVo.copyType == CopyType.guildFight || copyVo.copyType == CopyType.island || copyVo.copyType == CopyType.teamCopy) {
				let reward = null;
				if (copyVo.copyType != CopyType.qiecuo) {
					reward = this._fightcopyVo.responseData;
				}
				dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: reward, copyVo: this._fightcopyVo });
			} else if (copyVo.copyType == iface.tb_prop.copyTypeKey.rune) {
				//符文
				let args = {};
				args[Protocol.game_copy_settleRuneCopy.args.copyId] = copyVo.getCopyId();
				PLC.request(Protocol.game_copy_settleRuneCopy, args, ($data: any) => {
					if (!$data) return;
					App.hero.updateGuajiData($data);
					GuajiModel.getInstance().updatePassGuanqia(copyVo.tab_copy.ID, copyVo.tab_copyinfo.ID);
					dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: $data, copyVo: this._fightcopyVo });
				});
			} else if (copyVo.copyType == CopyType.dailycopy) {
				//每日副本
				dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: copyVo.resultData, copyVo: this._fightcopyVo });
			} else if (copyVo.copyType == iface.tb_prop.copyTypeKey.underground) {
				//地下城
				let args = {};
				args[Protocol.game_copy_settleGroundCopy.args.copyId] = copyVo.getCopyId();
				PLC.request(Protocol.game_copy_settleGroundCopy, args, ($data: any) => {
					if (!$data) return;
					dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: $data, copyVo: this._fightcopyVo });
				});
			} else if (copyVo.copyType == iface.tb_prop.copyTypeKey.tower) {
				//试练塔
				dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: copyVo.resultData, copyVo: this._fightcopyVo });
			} else if (copyVo.copyType == CopyType.fogForest) {
				//迷雾森林
				let args = {};
				args[Protocol.game_forest_settleForest.args.floor] = copyVo.getCopyId();
				PLC.request(Protocol.game_forest_settleForest, args, ($data: any, msg: any, msgid: number) => {
					if (msgid === 319) {
						//跨天重置
						dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this._fightcopyVo);
						return;
					}
					if (!$data) return;
					FogForestModel.getInstance().addForestCurFloor();
					dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: $data, copyVo: this._fightcopyVo });
				});
			}
			this.resultFun(forceExit);
		}

		private defeatedFun(forceExit) {
			let copyVo = this.getFightVo();
			let ary = [CopyType.teamCopy, CopyType.jingji_npc, CopyType.dailycopy, CopyType.qiecuo, CopyType.fogForest, CopyType.escort, CopyType.guildFight, CopyType.island];
			if (copyVo.copyType < 5 || ary.indexOf(copyVo.copyType) != -1) {
				dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.FAILURE, copyVo: this._fightcopyVo });
			}
			this.resultFun(forceExit);
		}

		/**
		 * 成功失败都需要发送协议的
		 */
		private resultFun(forceExit) {
			let copyVo = this.getFightVo();
			let resultKey = copyVo.fightPageControl.getResult();
			let result: boolean = resultKey == playState.VICTORY;
			if (copyVo.copyType == CopyType.yuanzhenCopy) {
				if (forceExit) {
					dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: playState.FAILURE, copyVo: this._fightcopyVo });
				} else {
					let hpObjs = this.getLossHpObj(copyVo.fightPageControl.getLossHpObj());
					// 远征
					let args = {};
					let selfHpInfo = copyVo.yuanzhengCopyVo.getSelfHpInfo(hpObjs.atk, copyVo.fightPageControl.getMaxHpObj(), result, copyVo.getTeamLineup());
					args[Protocol.game_expedition_expeditionBattleEnd.args.selfHpInfo] = selfHpInfo;
					args[Protocol.game_expedition_expeditionBattleEnd.args.id] = copyVo.getCopyId();
					args[Protocol.game_expedition_expeditionBattleEnd.args.damageInfo] = result ? null : copyVo.yuanzhengCopyVo.turnTemplatID(hpObjs.def);
					loghgy('打完远征请求参数：', args);
					PLC.request(Protocol.game_expedition_expeditionBattleEnd, args, ($data: any, msg: any, msgid: number) => {
						// logyhj("失落遗迹：", $data, msgid, msg);
						if (msgid === 367) {
							//跨天重置
							dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this._fightcopyVo);
							return;
						}
						if (!$data) return;
						App.hero.updateCopyInfo($data);
						YuanzhengModel.getInstance().updateCurGuanqia();
						dispatchEvt(new FightsEvent(FightsEvent.SHOW_RESULT_EVENT), { type: resultKey, vo: $data, copyVo: this._fightcopyVo });
					});
				}
			} else if (copyVo.copyType == CopyType.glory || copyVo.copyType == CopyType.jingji_pve || copyVo.copyType == CopyType.jingji_record || copyVo.copyType == CopyType.arenaMatch) {
				dispatchEvt(new FightsEvent(FightsEvent.GLORY_RESULT_EVENT), this._fightcopyVo);
			} else if (copyVo.copyType == CopyType.guildCopy || copyVo.copyType == CopyType.worldboss) {
				dispatchEvt(new FightsEvent(FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT), { type: resultKey, copyVo: this._fightcopyVo, vo: this._fightcopyVo.responseData });
			} else if (copyVo.copyType == CopyType.godDomain) {
				dispatchEvt(new FightsEvent(FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT), { type: resultKey, copyVo: this._fightcopyVo, vo: this._fightcopyVo.responseData });
			}
		}

		private getLossHpObj(objs): any {
			let atkobj = {};
			let defobj = {};
			for (let uuid in objs) {
				let team: number = Math.floor(Number(uuid) / 10);
				if (team === battle.BatteConsts.BATTLE_CAMPATK) {
					atkobj[uuid] = objs[uuid];
				} else if (team === battle.BatteConsts.BATTLE_CAMPDEF) {
					defobj[uuid] = objs[uuid];
				}
			}
			return { atk: atkobj, def: defobj }
		}


		private setJumpAndStop() {
			let vo = this.getFightVo();
			this.box_jump.visible = vo.canJump();
			this.box_jump.x = this.width - 109;
			this.box_speed.x = this.box_jump.visible ? this.box_jump.x - 109 : this.box_jump.x;
			this.box_cam.x = this.box_speed.x - 109;
		}

		private initCamMove() {
			let camMove = Laya.LocalStorage.getItem(App.hero.playerId + "camMove");
			let localMove = camMove ? camMove == "1" : true;
			let mapvo = tb.TB_map.get_TB_map_ById(this.getFightVo().getMapid());
			this.camMove.selected = !(localMove && mapvo.canAutoTurn());
			this._scene.setCamMove(!this.camMove.selected);
		}

		private onCamMove() {
			this.camMove.selected = !this.camMove.selected;
			this._scene.setCamMove(!this.camMove.selected);
			this._scene.setSceneMovie();
			Laya.LocalStorage.setItem(App.hero.playerId + "camMove", this.camMove.selected ? "0" : "1");
		}

		private onJump() {
			let vo = this.getFightVo();
			let tbconfig = vo.getConfigSet();

			if (tbconfig.is_skip == 0) {
				showToast(LanMgr.getLan('', 10198));
				return;
			}

			let cb = App.hero.levelPrivilege(7);
			if (tbconfig.is_skipfree == 1) {
				if (cb === true || tbconfig.skipfree_round <= this._curRound || (tbconfig.level_skip > 0 && App.hero.level >= tbconfig.level_skip)) {
					this.JumpFightEnd(vo);
				} else {
					let data = tb.TB_vip_privilege.get_TB_vip_privilegeById(7);
					if (tbconfig.level_skip > 0) {
						showToast(LanMgr.getLan(``, 10313,tbconfig.name,data.vip_level,tbconfig.level_skip));
					} else if (tbconfig.skipfree_round != 999) {
						showToast(LanMgr.getLan(``, 10314,tbconfig.name,data.vip_level,tbconfig.skipfree_round));
					} else {
						showToast(LanMgr.getLan(``, 10315,tbconfig.name,data.vip_level));
					}
					// showToast(LanMgr.getLan(`VIP${data.vip_level}级` + (data.general_level != 999 ? `或者玩家${data.general_level}级` : '') + '可以跳过', -1));
				}
			} else {
				if (cb === true) {
					this.JumpFightEnd(vo);
				} else if (cb === false) {
					let data = tb.TB_vip_privilege.get_TB_vip_privilegeById(7);
					showToast(LanMgr.getLan(``, 10315,tbconfig.name,data.vip_level));
				} else {
					logerror("levelPrivilege cb error!");
				}
			}
		}

		private JumpFightEnd(vo: FightVo) {
			if (!vo.fightPageControl || vo.fightPageControl.isQuick) {
				// logerror("jumpFight error!!");
				return;
			}
			vo.fightPageControl.quickFight();
			this.fightEnd();
		}

		// private onStop() {
		// 	let vo = this.getFightVo();
		// 	if (!vo.fightPageControl) {
		// 		logerror("onStop error!!");
		// 		return;
		// 	}

		// 	if (vo.fightPageControl.isQuick) {
		// 		return;
		// 	}

		// 	common.AlertBox.showAlert({
		// 		text: LanMgr.getLan("战斗还没结束，是否退出?", -1), confirmCb: () => {
		// 			this.fightEnd(true);
		// 		}
		// 	});
		// }

		public onStopSceneTick() {
			this._scene.exitRound();
			this._speedlev = -1;
			this._scene.gameScene.timespeed1 = 0;
			this._scene.game2dScene.timespeed1 = 0;
			// layapan.LayaInsideSprite.timespeed = 0;
			logfight("tick倍数设置1：", this._scene.gameScene.timespeed1);
			let vo = this.getFightVo();
			this._scene.playAction(vo.fightPageControl.getResult());
			this._scene.setSceneMovie(false);
		}

		private setTickSpeed(lev: number) {
			if (this._speedlev !== undefined && lev == this._speedlev) return;
			let vo = this.getFightVo();
			this._speedlev = 0;
			if (vo.fightPageControl && !vo.fightPageControl.isQuick) {
				this._speedlev = lev;
			}
			this._scene.gameScene.timespeed1 = this._scene.game2dScene.timespeed1 = this._SpeedKey[this._speedlev];
			// layapan.LayaInsideSprite.timespeed = this._SpeedKey[this._speedlev];
			logfight("tick倍数设置2：", this._scene.game2dScene.timespeed1);
			AudioMgr.setPlayRate(this._speedlev == 0 ? 1.3 : 1.4);
		}

		private _posAry: Array<SceneGodVo>
		// private _selectTargetFlag: boolean;
		// private onSelect($index: number) {
		// 	if ($index == -1) {
		// 		return;
		// 	}
		// 	//不满足条件不让点
		// 	let selectData = this.skillary[$index];
		// 	let doClickVo = selectData.doClick();
		// 	if (!doClickVo.tag) {
		// 		showToast(LanMgr.getLan(doClickVo.info));
		// 		this.list_skillmodel.selectedIndex = this.lastSelect;
		// 		return;
		// 	}

		// 	this.lastSelect = $index;
		// 	// this.list_skillmodel.refresh();
		// 	//选择技能后，才出现目标提示
		// 	this._scene.selectSkillOk();

		// if (FightView.chkCam) {
		// 	this._posAry = this._scene.getAllCharPos();
		// } else {
		// 	this._posAry = this._scene.getChar3dPosAry(selectData);
		// }

		// 	this._selectTargetFlag = true;
		// 	logdebug("选择技能中");
		// 	dispatchEvt(new FightsEvent(FightsEvent.SKILL_SELECTED));
		// }

		private onClick() {
			if (!FightView.chkCam) {
				return;
			}

			if (!this._posAry) {
				this._posAry = this._scene.getAllCharPos();
			}

			for (var i = 0; this._posAry && i < this._posAry.length; i++) {
				var role: SceneGodVo = this._posAry[i];
				if (!role.char) continue;
				var $hit: boolean = role.char.mouseClik(this._scene.getCam3d(), this._scene.downPointTo3d(Laya.stage.mouseX, Laya.stage.mouseY));
				if ($hit) {
					logfight("选中目标：", role.objId);
					if (FightView.chkCam) {
						this._curselect = role;
						return;
					}
				}
			}
		}

		public fightSelectSkill($data) {
			let vo = this.getFightVo();
			vo.fightPageControl.selectSkillFight($data);
		}

		// public showSelectSkillPanel(datalist: Array<battle.SelectSkillData>) {
		// 	logfight("$skillobj：", datalist);
		// 	this.lastSelect = -1;
		// 	this.skillary = datalist;
		// 	this.list_skillmodel.dataSource = this.skillary;
		// 	this.list_skillmodel.visible = true;
		// 	this.list_skillmodel.x = 205 + Launch.offsetX + (3 - this.skillary.length) * (90 + this.list_skillmodel.spaceX) / 2;
		// 	this.list_skillmodel.selectedIndex = 0;
		// 	this._scene.setSceneMovie(false);
		// 	dispatchEvt(new FightsEvent(FightsEvent.SKILL_PANEL_VISIBLE));
		// }

		// public hideSelectSkillPanel() {
		// 	this._scene.clearSelectEff();
		// 	this.list_skillmodel.selectedIndex = -1;
		// 	this._scene.selectSkillOk();
		// 	UIMgr.hideUIByName(UIConst.SkillTip);
		// 	this.list_skillmodel.visible = false;
		// 	this._selectTargetFlag = false;
		// 	this._posAry = null;
		// 	this._scene.setSceneMovie(true);
		// }

		// public onAuto(): void {
		// 	if (FightView.chkCam) {
		// 		//测试模式
		// 		return;
		// 	}
		// 	if (!this.btn_auto.gray) {
		// 		this.autoNum++;
		// 		dispatchEvt(new FightsEvent(FightsEvent.CLICK_AUTO_SUCCESS));
		// 	} else {
		// 		showToast(LanMgr.getLan('', 10197));
		// 	}
		// }

		public onClosed(): void {
			super.onClosed();
			this.exitView();
			AudioMgr.stopMusic();
			AudioMgr.setPlayRate(1);
			AudioMgr.playMusic();
		}

		public exitView() {
			this.off(Event.MOUSE_DOWN, this, this.onMouseDown);
			this.fightTitle.hide();
			this._bossblood = -1;
			this._bossanger = 0;
			this.stopFightEnd = false;
			// this.hideSelectSkillPanel();
			this.clearArtifact();
			// this.setActionBar();
			this.onStopSceneTick();
			this._scene.exitScene();
			if (this._bossRankView) {
				this._bossRankView.removeSelf();
			}
		}

		private _fightcopyVo: EnterFightVo;
		getFightVo(): FightVo {
			return this._fightcopyVo.vo;
		}




		private initCam(): void {
			this._scene.initCam();

			let looktag = new tl3d.Object3D;
			looktag.rotationX = -14;
			looktag.rotationY = 358;
			looktag.x = -86;
			looktag.y = 281;
			looktag.z = -32;
			this._scene.gameScene.setLook(looktag);
		}

		private onkeydown(e: Laya.Event) {
			if (!FightView.chkCam) {
				return;
			}
			if (!this._curselect) {
				return;
			}
			this._scene.setPos(this._curselect, e.keyCode);
		}

		private _clickBox: Laya.Box
		public addBox(roleId: number): Laya.Box {
			if (!this._clickBox) {
				this._clickBox = new Laya.Box();
				this._clickBox.width = 100;
				this._clickBox.height = 100;
				// this._clickBox.graphics.drawRect(0,0,100,100,"#ff0000");
			}
			Laya.stage.addChild(this._clickBox);
			// roleId
			// 1自己人
			let pos: tl3d.Vector2D = this._scene.getRolePos((roleId == 1 ? 11 : 21));
			this._clickBox.x = roleId == 2 ? (pos.x - this._clickBox.width / 2) : pos.x;
			this._clickBox.y = roleId == 2 ? (pos.y - 30) : pos.y;
			return this._clickBox;
		}


		//初始点击位置 判断单击用
		private downX: number;
		private downY: number;
		//滑动位置记录 用于记录左右滑动的过程量
		private prevX: number;
		private prevY: number;
		private factor: number = 0.15;
		private sfactor: number = 0.05;
		private lastDistance: number = 0;

		private onMouseDown(e: Event): void {
			this.downX = this.prevX = this.stage.mouseX;
			this.downY = this.prevY = this.stage.mouseY;
			this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
			var touches: Array<any> = e.touches;
			if (touches && touches.length == 2) {
				this.lastDistance = getDistance(touches);
			}
		}


		private onMouseMove(e: Event): void {
			//单指
			var posX: number = (this.prevX - this.stage.mouseX) * this.factor;
			var posY: number = (this.prevY - this.stage.mouseY) * this.sfactor;
			this.prevX = this.stage.mouseX;
			this.prevY = this.stage.mouseY;


			this._scene.gameScene.camRotationY = (this._scene.gameScene.camRotationY + posX) % 360;
			this._scene.gameScene.camRotationY = this._scene.gameScene.camRotationY / 180 > 1 ? this._scene.gameScene.camRotationY - 360 : this._scene.gameScene.camRotationY

			if (!isNaN(this._camLeftLimit)) {
				if (this._scene.gameScene.camRotationY < this._camLeftLimit) {
					this._scene.gameScene.camRotationY = this._camLeftLimit;
				}
			}
			if (!isNaN(this._camRightLimit)) {
				if (this._scene.gameScene.camRotationY > this._camRightLimit) {
					this._scene.gameScene.camRotationY = this._camRightLimit;
				}
			}

			this._scene.gameScene.camRotationX += posY;
			if (this._scene.gameScene.camRotationX > this._camBottomLimit) {
				this._scene.gameScene.camRotationX = this._camBottomLimit;
			}
			if (this._scene.gameScene.camRotationX < this._camTopLimit) {
				this._scene.gameScene.camRotationX = this._camTopLimit;
			}
		}

		private onMouseUp(e: Event): void {
			this.off(Event.MOUSE_MOVE, this, this.onMouseMove);
		}

		private _skillBox: game.playSkillRender;
		public playSkillName(name, icon, team) {
			if (!this._skillBox) {
				this._skillBox = new game.playSkillRender;
				this.addChild(this._skillBox);
			}

			this._skillBox.x = team == battle.BatteConsts.BATTLE_CAMPATK ? 20 : Laya.stage.width - 476;
			this._skillBox.y = team == battle.BatteConsts.BATTLE_CAMPATK ? Laya.stage.height - 650 : 420;
			this._skillBox.setData(team, icon, name);
		}
	}
}