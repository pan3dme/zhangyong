var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var Event = Laya.Event;
    //战斗面板
    var FightView = /** @class */ (function (_super) {
        __extends(FightView, _super);
        function FightView() {
            var _this = _super.call(this) || this;
            _this._curspeed = 0;
            _this._bossanger = 0;
            _this._SpeedKey = [0.6, 0.9];
            _this.factor = 0.15;
            _this.sfactor = 0.05;
            _this.lastDistance = 0;
            _this._scene = new game.FightScene();
            _this.addChildAt(_this._scene.gameScene, 0);
            _this.addChild(_this._scene.game2dScene);
            _this.on(Laya.Event.CLICK, _this, _this.onClick);
            _this.btn_speed.on(Laya.Event.CLICK, _this, _this.onSpeed);
            // this.btn_auto.on(Laya.Event.CLICK, this, this.onAuto);
            // this.btn_stop.on(Laya.Event.CLICK, this, this.onStop);
            _this.btn_jump.on(Laya.Event.CLICK, _this, _this.onJump);
            _this.btn_cam.on(Laya.Event.CLICK, _this, _this.onCamMove);
            Laya.stage.on(Laya.Event.KEY_DOWN, _this, _this.onkeydown);
            // this.list_skillmodel.visible = false;
            // this.list_skillmodel.mouseThrough = false;
            // this.list_skillmodel.selectHandler = new Handler(this, this.onSelect);
            // this.list_skillmodel.selectEnable = true;
            // this.initList();
            _this.addChild(_this.img_startbg);
            if (!_this.fightTitle) {
                _this.fightTitle = new game.FightHeadRender();
                _this.fightTitle.x = 0;
                _this.fightTitle.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 10) : 10;
                _this.addChildAt(_this.fightTitle, _this._childs.length - 1);
            }
            _this.on(Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.on(Event.MOUSE_OUT, _this, _this.onMouseUp);
            return _this;
        }
        FightView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.width = w;
            this.height = h;
            this.img_startbg.width = w;
            this.img_startbg.height = h;
            // this.btnBox.x = 20;
            // this.btnBox.y = Laya.stage.height - this.btnBox.height - 20;
            var isFull = GameUtil.isFullScreen();
            this.box_blood.y = isFull ? (173 + game.HudModel.TOP_ADD_HEIGHT) : 173;
            this.list_bossbuff.y = isFull ? (241 + game.HudModel.TOP_ADD_HEIGHT) : 241;
        };
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
        FightView.prototype.setAnger = function (camp, anger) {
            if (camp == this.getFightVo().getCamp()) {
                this._artiface1.setAnger(anger);
            }
            else {
                this._artiface2.setAnger(anger);
            }
        };
        FightView.prototype.clearArtifact = function () {
            if (this._artiface1) {
                this._artiface1.clearArtifact();
            }
            if (this._artiface2) {
                this._artiface2.clearArtifact();
            }
        };
        FightView.prototype.setBossAnger = function (val) {
            var angerVal = Number((val / tb.TB_skill_set.getSkillSet().spell_anger).toFixed(2));
            angerVal = Math.min(1, angerVal);
            angerVal = Math.max(0.001, angerVal);
            if (angerVal == this._bossanger)
                return;
            var nwidth = 450 * angerVal;
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
                Laya.Tween.to(this.img_anger, { width: nwidth }, 1000, null, Laya.Handler.create(this, function () {
                    // this.setUiVisable();
                }));
            }
            else if (this._bossanger > angerVal) {
                //掉血
                this.img_anger.width = nwidth;
                Laya.Tween.to(this.img_anger_pross, { width: nwidth }, 1000, null, Laya.Handler.create(this, function () {
                    // this.setUiVisable();
                }));
            }
            this._bossanger = angerVal;
        };
        FightView.prototype.initArtifact = function (team, templatId, anger) {
            if (team == this.getFightVo().getCamp()) {
                if (!this._artiface1) {
                    this._artiface1 = new game.ArtifactRender();
                    this._artiface1.x = 20;
                    this._artiface1.bottom = 22;
                    this.addChildAt(this._artiface1, this._childs.length - 2);
                }
                this._artiface1.initArtifact(templatId, anger);
            }
            else {
                if (!this._artiface2) {
                    this._artiface2 = new game.ArtifactRender();
                    this._artiface2.y = GameUtil.isFullScreen() ? (game.HudModel.TOP_ADD_HEIGHT + 145) : 145;
                    this._artiface2.right = 16;
                    this.addChildAt(this._artiface2, this._childs.length - 2);
                }
                this._artiface2.initArtifact(templatId, anger);
            }
        };
        FightView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.setData(this.dataSource);
        };
        FightView.prototype.setData = function (gameData) {
            var _this = this;
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
            var fightvo = this.getFightVo();
            this.initCamMove();
            this.fightTitle.setVsVis(false);
            this.fightTitle.setVis(false);
            this.setJumpAndStop();
            this.clearArtifact();
            this.setBossBuff(null);
            // this.setActionBar();
            AudioMgr.stopMusic();
            this.setRound(-1);
            var preloadids = fightvo.fightPageControl.getPreloadIds();
            //不能放外面
            var effary = [888888, 1029, 1017, 1024, 10000030];
            var mapid = tb.TB_map.get_TB_map_ById(fightvo.getMapid()).map_id;
            if (!this._scene.gameScene) {
                return;
            }
            if (fightvo.copyType == CopyType.worldboss) {
                if (!this._bossRankView) {
                    this._bossRankView = new game.BossFightRankView();
                    this._bossRankView.x = 10;
                    this._bossRankView.y = 250;
                }
                this.addChild(this._bossRankView);
                this._bossRankView.dataSource = fightvo.worldBossInfo.rankList;
                this._bossRankView.initView();
            }
            // logfight("开始加载", JSON.stringify(preloadids.skills), JSON.stringify(preloadids.roles));
            LoadeQueue.getInstance().loadAll(this._scene.gameScene, preloadids.skills, preloadids.roles, effary, mapid, function (value, type) {
                var txId = type == 0 ? 10545 : type == 1 ? 10546 : type == 2 ? 10547 : type == 3 ? 10548 : -1;
                var str = LanMgr.getLan("", txId);
                UIMgr.getInstance().loadingProcess(value, str);
            }, function () {
                logfight("资源加载完成");
                _this.initAutoBtn();
                //场景初始化
                _this.initScene();
            });
        };
        FightView.prototype.initAutoBtn = function () {
            var vo = this.getFightVo();
            if (FightView.chkCam) {
                var camraView = new common.CamraView(this._scene);
                this.addChild(camraView);
                camraView.left = 10;
                camraView.bottom = 10;
                return;
            }
        };
        FightView.prototype.startTalkEnd = function () {
            if (this.talkStart) {
                if (this._scene.init) {
                    this._scene.startFight();
                }
            }
        };
        FightView.prototype.initScene = function () {
            var _this = this;
            //场景加载
            this.box_blood.visible = false;
            this.list_bossbuff.visible = false;
            var fightvo = this.getFightVo();
            this._scene.enterScene(this.talkStart, fightvo, fightvo.getMapid(), function () {
                _this.callLater(_this.sceneCom);
            });
        };
        FightView.prototype.sceneCom = function () {
            var _this = this;
            AudioMgr.playMusic("sound/battle_bgm2.mp3");
            UIMgr.getInstance().hideLoading();
            dispatchEvt(new game.FightsEvent(game.FightsEvent.SCENE_COMPLETE_EVENT), { type: this.getFightVo().copyType });
            Laya.timer.once(1000, this, function () {
                logfight("监听点击事件开启");
                var fightvo = _this.getFightVo();
                var mapvo = tb.TB_map.get_TB_map_ById(fightvo.getMapid());
                _this._camTopLimit = mapvo.longitudinal_scope[0];
                _this._camBottomLimit = mapvo.longitudinal_scope[1];
                _this._camLeftLimit = mapvo.transverse_scope ? mapvo.transverse_scope[0] : NaN;
                _this._camRightLimit = mapvo.transverse_scope ? mapvo.transverse_scope[1] : NaN;
                if (!FightView.chkCam && mapvo.canTurn()) {
                    _this.on(Event.MOUSE_DOWN, _this, _this.onMouseDown);
                }
            });
        };
        FightView.prototype.showStartBg = function () {
            var _this = this;
            this.img_startbg.visible = true;
            Laya.timer.once(900, this, function () {
                _this.img_startbg.visible = false;
            });
        };
        FightView.prototype.initSpeed = function () {
            var tickspeed = Laya.LocalStorage.getItem(App.hero.playerId + "tickspeed");
            var speed = tickspeed ? Number(tickspeed) : 0;
            this._curspeed = speed;
            this.setSpeedLab();
        };
        FightView.prototype.refreshTitle = function () {
            var fightvo = this.getFightVo();
            this.fightTitle.dataSource = fightvo.getHeadData();
            this.fightTitle.setData();
            this.fightTitle.showEff();
        };
        FightView.prototype.setRound = function ($round) {
            var allround = this.getFightVo().getAllRound();
            if ($round != -1)
                this._curRound = $round;
            if (this.fightTitle) {
                this.fightTitle.setRound(LanMgr.getLan("", 12303) + " " + this._curRound + "/" + allround);
            }
        };
        FightView.prototype.setBossBlood = function ($bloodnum, info) {
            var _this = this;
            logfight("boss血量：", $bloodnum, info);
            this.lab_bosshp.text = info;
            if ($bloodnum == this._bossblood)
                return;
            var num = $bloodnum / 100;
            var nwidth = 538 * num;
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
                Laya.Tween.to(this.img_blood, { width: nwidth }, 500, null, Laya.Handler.create(this, function () {
                    _this.setUiVisable();
                }));
            }
            else if (this._bossblood > $bloodnum) {
                //掉血
                this.img_blood.width = nwidth;
                Laya.Tween.to(this.img_pross, { width: nwidth }, 500, null, Laya.Handler.create(this, function () {
                    _this.setUiVisable();
                }));
            }
            this._bossblood = $bloodnum;
        };
        FightView.prototype.setUiVisable = function () {
            this.list_bossbuff.visible = this.box_blood.visible = this._bossblood > 0;
        };
        FightView.prototype.setBossLev = function (lev) {
            this.lab_bosslev.visible = false;
            this.lab_bosslev.text = "Lv." + lev;
        };
        FightView.prototype.setBossBuff = function ($buffary) {
            this.list_bossbuff.visible = this.box_blood.visible;
            if (this.box_blood.visible && $buffary) {
                this.list_bossbuff.dataSource = $buffary;
                var posx = 360 - (this.list_bossbuff.dataSource.length * 55 >> 1) + Launch.offsetX;
                this.list_bossbuff.x = posx < 0 ? 0 : posx;
            }
        };
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
        FightView.prototype.onSpeed = function () {
            this._curspeed += 1;
            this.setSpeedLab();
        };
        FightView.prototype.setSpeedLab = function () {
            var multiple = this._curspeed % 2;
            if (this._curspeed % 2 == 1 && !App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.battleSpeed)) {
                var data = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.battleSpeed);
                var str = LanMgr.getLan("", 10311, data.vip_level);
                str += data.general_level != 999 ? LanMgr.getLan("", 10312, data.general_level) : "";
                showToast(str);
                this._curspeed++;
                multiple = 0;
            }
            this.setTickSpeed(multiple);
            this.lbl_speed.text = "X" + (multiple + 1);
            Laya.LocalStorage.setItem(App.hero.playerId + "tickspeed", String(multiple));
            dispatchEvt(new game.FightsEvent(game.FightsEvent.SWITCH_SPEED_SUCCESS));
        };
        FightView.prototype.getCurspeed = function () {
            return this._curspeed;
        };
        /**
         * 战斗结束
         * @param forceExit 是否中途强制退出标记
         */
        FightView.prototype.fightEnd = function (forceExit) {
            if (forceExit === void 0) { forceExit = false; }
            logfight("结束战斗");
            //清空行动条
            // this.setActionBar();
            this.onStopSceneTick();
            if (!this.stopFightEnd) {
                this.doFigthEnd(forceExit);
            }
        };
        FightView.prototype.doFigthEnd = function (forceExit) {
            var _this = this;
            this.stopFightEnd = false;
            var vo = this.getFightVo();
            if (vo.fightPageControl.getResult() == playState.VICTORY) {
                this._scene.tweenCam(game.CameraConst.VICTORY, function () {
                    _this.victoryFun(forceExit);
                });
            }
            else {
                this._scene.tweenCam(game.CameraConst.DEFEATED, function () {
                    _this.defeatedFun(forceExit);
                });
            }
        };
        FightView.prototype.victoryFun = function (forceExit) {
            var _this = this;
            var copyVo = this.getFightVo();
            if (copyVo.copyType == CopyType.qiecuo || copyVo.copyType == CopyType.escort || copyVo.copyType == CopyType.guildFight || copyVo.copyType == CopyType.island || copyVo.copyType == CopyType.teamCopy) {
                var reward = null;
                if (copyVo.copyType != CopyType.qiecuo) {
                    reward = this._fightcopyVo.responseData;
                }
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: reward, copyVo: this._fightcopyVo });
            }
            else if (copyVo.copyType == iface.tb_prop.copyTypeKey.rune) {
                //符文
                var args = {};
                args[Protocol.game_copy_settleRuneCopy.args.copyId] = copyVo.getCopyId();
                PLC.request(Protocol.game_copy_settleRuneCopy, args, function ($data) {
                    if (!$data)
                        return;
                    App.hero.updateGuajiData($data);
                    game.GuajiModel.getInstance().updatePassGuanqia(copyVo.tab_copy.ID, copyVo.tab_copyinfo.ID);
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: $data, copyVo: _this._fightcopyVo });
                });
            }
            else if (copyVo.copyType == CopyType.dailycopy) {
                //每日副本
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: copyVo.resultData, copyVo: this._fightcopyVo });
            }
            else if (copyVo.copyType == iface.tb_prop.copyTypeKey.underground) {
                //地下城
                var args = {};
                args[Protocol.game_copy_settleGroundCopy.args.copyId] = copyVo.getCopyId();
                PLC.request(Protocol.game_copy_settleGroundCopy, args, function ($data) {
                    if (!$data)
                        return;
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: $data, copyVo: _this._fightcopyVo });
                });
            }
            else if (copyVo.copyType == iface.tb_prop.copyTypeKey.tower) {
                //试练塔
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: copyVo.resultData, copyVo: this._fightcopyVo });
            }
            else if (copyVo.copyType == CopyType.fogForest) {
                //迷雾森林
                var args = {};
                args[Protocol.game_forest_settleForest.args.floor] = copyVo.getCopyId();
                PLC.request(Protocol.game_forest_settleForest, args, function ($data, msg, msgid) {
                    if (msgid === 319) {
                        //跨天重置
                        dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), _this._fightcopyVo);
                        return;
                    }
                    if (!$data)
                        return;
                    game.FogForestModel.getInstance().addForestCurFloor();
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.VICTORY, vo: $data, copyVo: _this._fightcopyVo });
                });
            }
            this.resultFun(forceExit);
        };
        FightView.prototype.defeatedFun = function (forceExit) {
            var copyVo = this.getFightVo();
            var ary = [CopyType.teamCopy, CopyType.jingji_npc, CopyType.dailycopy, CopyType.qiecuo, CopyType.fogForest, CopyType.escort, CopyType.guildFight, CopyType.island];
            if (copyVo.copyType < 5 || ary.indexOf(copyVo.copyType) != -1) {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.FAILURE, copyVo: this._fightcopyVo });
            }
            this.resultFun(forceExit);
        };
        /**
         * 成功失败都需要发送协议的
         */
        FightView.prototype.resultFun = function (forceExit) {
            var _this = this;
            var copyVo = this.getFightVo();
            var resultKey = copyVo.fightPageControl.getResult();
            var result = resultKey == playState.VICTORY;
            if (copyVo.copyType == CopyType.yuanzhenCopy) {
                if (forceExit) {
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: playState.FAILURE, copyVo: this._fightcopyVo });
                }
                else {
                    var hpObjs = this.getLossHpObj(copyVo.fightPageControl.getLossHpObj());
                    // 远征
                    var args = {};
                    var selfHpInfo = copyVo.yuanzhengCopyVo.getSelfHpInfo(hpObjs.atk, copyVo.fightPageControl.getMaxHpObj(), result, copyVo.getTeamLineup());
                    args[Protocol.game_expedition_expeditionBattleEnd.args.selfHpInfo] = selfHpInfo;
                    args[Protocol.game_expedition_expeditionBattleEnd.args.id] = copyVo.getCopyId();
                    args[Protocol.game_expedition_expeditionBattleEnd.args.damageInfo] = result ? null : copyVo.yuanzhengCopyVo.turnTemplatID(hpObjs.def);
                    loghgy('打完远征请求参数：', args);
                    PLC.request(Protocol.game_expedition_expeditionBattleEnd, args, function ($data, msg, msgid) {
                        // logyhj("失落遗迹：", $data, msgid, msg);
                        if (msgid === 367) {
                            //跨天重置
                            dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), _this._fightcopyVo);
                            return;
                        }
                        if (!$data)
                            return;
                        App.hero.updateCopyInfo($data);
                        game.YuanzhengModel.getInstance().updateCurGuanqia();
                        dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_RESULT_EVENT), { type: resultKey, vo: $data, copyVo: _this._fightcopyVo });
                    });
                }
            }
            else if (copyVo.copyType == CopyType.glory || copyVo.copyType == CopyType.jingji_pve || copyVo.copyType == CopyType.jingji_record || copyVo.copyType == CopyType.arenaMatch) {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.GLORY_RESULT_EVENT), this._fightcopyVo);
            }
            else if (copyVo.copyType == CopyType.guildCopy || copyVo.copyType == CopyType.worldboss) {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_GUILD_COPY_RESULT_EVENT), { type: resultKey, copyVo: this._fightcopyVo, vo: this._fightcopyVo.responseData });
            }
            else if (copyVo.copyType == CopyType.godDomain) {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SHOW_GODDOMAIN_RESULT_EVENT), { type: resultKey, copyVo: this._fightcopyVo, vo: this._fightcopyVo.responseData });
            }
        };
        FightView.prototype.getLossHpObj = function (objs) {
            var atkobj = {};
            var defobj = {};
            for (var uuid in objs) {
                var team = Math.floor(Number(uuid) / 10);
                if (team === battle.BatteConsts.BATTLE_CAMPATK) {
                    atkobj[uuid] = objs[uuid];
                }
                else if (team === battle.BatteConsts.BATTLE_CAMPDEF) {
                    defobj[uuid] = objs[uuid];
                }
            }
            return { atk: atkobj, def: defobj };
        };
        FightView.prototype.setJumpAndStop = function () {
            var vo = this.getFightVo();
            this.box_jump.visible = vo.canJump();
            this.box_jump.x = this.width - 109;
            this.box_speed.x = this.box_jump.visible ? this.box_jump.x - 109 : this.box_jump.x;
            this.box_cam.x = this.box_speed.x - 109;
        };
        FightView.prototype.initCamMove = function () {
            var camMove = Laya.LocalStorage.getItem(App.hero.playerId + "camMove");
            var localMove = camMove ? camMove == "1" : true;
            var mapvo = tb.TB_map.get_TB_map_ById(this.getFightVo().getMapid());
            this.camMove.selected = !(localMove && mapvo.canAutoTurn());
            this._scene.setCamMove(!this.camMove.selected);
        };
        FightView.prototype.onCamMove = function () {
            this.camMove.selected = !this.camMove.selected;
            this._scene.setCamMove(!this.camMove.selected);
            this._scene.setSceneMovie();
            Laya.LocalStorage.setItem(App.hero.playerId + "camMove", this.camMove.selected ? "0" : "1");
        };
        FightView.prototype.onJump = function () {
            var vo = this.getFightVo();
            var tbconfig = vo.getConfigSet();
            if (tbconfig.is_skip == 0) {
                showToast(LanMgr.getLan('', 10198));
                return;
            }
            var cb = App.hero.levelPrivilege(7);
            if (tbconfig.is_skipfree == 1) {
                if (cb === true || tbconfig.skipfree_round <= this._curRound || (tbconfig.level_skip > 0 && App.hero.level >= tbconfig.level_skip)) {
                    this.JumpFightEnd(vo);
                }
                else {
                    var data = tb.TB_vip_privilege.get_TB_vip_privilegeById(7);
                    if (tbconfig.level_skip > 0) {
                        showToast(LanMgr.getLan("", 10313, tbconfig.name, data.vip_level, tbconfig.level_skip));
                    }
                    else if (tbconfig.skipfree_round != 999) {
                        showToast(LanMgr.getLan("", 10314, tbconfig.name, data.vip_level, tbconfig.skipfree_round));
                    }
                    else {
                        showToast(LanMgr.getLan("", 10315, tbconfig.name, data.vip_level));
                    }
                    // showToast(LanMgr.getLan(`VIP${data.vip_level}级` + (data.general_level != 999 ? `或者玩家${data.general_level}级` : '') + '可以跳过', -1));
                }
            }
            else {
                if (cb === true) {
                    this.JumpFightEnd(vo);
                }
                else if (cb === false) {
                    var data = tb.TB_vip_privilege.get_TB_vip_privilegeById(7);
                    showToast(LanMgr.getLan("", 10315, tbconfig.name, data.vip_level));
                }
                else {
                    logerror("levelPrivilege cb error!");
                }
            }
        };
        FightView.prototype.JumpFightEnd = function (vo) {
            if (!vo.fightPageControl || vo.fightPageControl.isQuick) {
                // logerror("jumpFight error!!");
                return;
            }
            vo.fightPageControl.quickFight();
            this.fightEnd();
        };
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
        FightView.prototype.onStopSceneTick = function () {
            this._scene.exitRound();
            this._speedlev = -1;
            this._scene.gameScene.timespeed1 = 0;
            this._scene.game2dScene.timespeed1 = 0;
            // layapan.LayaInsideSprite.timespeed = 0;
            logfight("tick倍数设置1：", this._scene.gameScene.timespeed1);
            var vo = this.getFightVo();
            this._scene.playAction(vo.fightPageControl.getResult());
            this._scene.setSceneMovie(false);
        };
        FightView.prototype.setTickSpeed = function (lev) {
            if (this._speedlev !== undefined && lev == this._speedlev)
                return;
            var vo = this.getFightVo();
            this._speedlev = 0;
            if (vo.fightPageControl && !vo.fightPageControl.isQuick) {
                this._speedlev = lev;
            }
            this._scene.gameScene.timespeed1 = this._scene.game2dScene.timespeed1 = this._SpeedKey[this._speedlev];
            // layapan.LayaInsideSprite.timespeed = this._SpeedKey[this._speedlev];
            logfight("tick倍数设置2：", this._scene.game2dScene.timespeed1);
            AudioMgr.setPlayRate(this._speedlev == 0 ? 1.3 : 1.4);
        };
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
        FightView.prototype.onClick = function () {
            if (!FightView.chkCam) {
                return;
            }
            if (!this._posAry) {
                this._posAry = this._scene.getAllCharPos();
            }
            for (var i = 0; this._posAry && i < this._posAry.length; i++) {
                var role = this._posAry[i];
                if (!role.char)
                    continue;
                var $hit = role.char.mouseClik(this._scene.getCam3d(), this._scene.downPointTo3d(Laya.stage.mouseX, Laya.stage.mouseY));
                if ($hit) {
                    logfight("选中目标：", role.objId);
                    if (FightView.chkCam) {
                        this._curselect = role;
                        return;
                    }
                }
            }
        };
        FightView.prototype.fightSelectSkill = function ($data) {
            var vo = this.getFightVo();
            vo.fightPageControl.selectSkillFight($data);
        };
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
        FightView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.exitView();
            AudioMgr.stopMusic();
            AudioMgr.setPlayRate(1);
            AudioMgr.playMusic();
        };
        FightView.prototype.exitView = function () {
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
        };
        FightView.prototype.getFightVo = function () {
            return this._fightcopyVo.vo;
        };
        FightView.prototype.initCam = function () {
            this._scene.initCam();
            var looktag = new tl3d.Object3D;
            looktag.rotationX = -14;
            looktag.rotationY = 358;
            looktag.x = -86;
            looktag.y = 281;
            looktag.z = -32;
            this._scene.gameScene.setLook(looktag);
        };
        FightView.prototype.onkeydown = function (e) {
            if (!FightView.chkCam) {
                return;
            }
            if (!this._curselect) {
                return;
            }
            this._scene.setPos(this._curselect, e.keyCode);
        };
        FightView.prototype.addBox = function (roleId) {
            if (!this._clickBox) {
                this._clickBox = new Laya.Box();
                this._clickBox.width = 100;
                this._clickBox.height = 100;
                // this._clickBox.graphics.drawRect(0,0,100,100,"#ff0000");
            }
            Laya.stage.addChild(this._clickBox);
            // roleId
            // 1自己人
            var pos = this._scene.getRolePos((roleId == 1 ? 11 : 21));
            this._clickBox.x = roleId == 2 ? (pos.x - this._clickBox.width / 2) : pos.x;
            this._clickBox.y = roleId == 2 ? (pos.y - 30) : pos.y;
            return this._clickBox;
        };
        FightView.prototype.onMouseDown = function (e) {
            this.downX = this.prevX = this.stage.mouseX;
            this.downY = this.prevY = this.stage.mouseY;
            this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            var touches = e.touches;
            if (touches && touches.length == 2) {
                this.lastDistance = getDistance(touches);
            }
        };
        FightView.prototype.onMouseMove = function (e) {
            //单指
            var posX = (this.prevX - this.stage.mouseX) * this.factor;
            var posY = (this.prevY - this.stage.mouseY) * this.sfactor;
            this.prevX = this.stage.mouseX;
            this.prevY = this.stage.mouseY;
            this._scene.gameScene.camRotationY = (this._scene.gameScene.camRotationY + posX) % 360;
            this._scene.gameScene.camRotationY = this._scene.gameScene.camRotationY / 180 > 1 ? this._scene.gameScene.camRotationY - 360 : this._scene.gameScene.camRotationY;
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
        };
        FightView.prototype.onMouseUp = function (e) {
            this.off(Event.MOUSE_MOVE, this, this.onMouseMove);
        };
        FightView.prototype.playSkillName = function (name, icon, team) {
            if (!this._skillBox) {
                this._skillBox = new game.playSkillRender;
                this.addChild(this._skillBox);
            }
            this._skillBox.x = team == battle.BatteConsts.BATTLE_CAMPATK ? 20 : Laya.stage.width - 476;
            this._skillBox.y = team == battle.BatteConsts.BATTLE_CAMPATK ? Laya.stage.height - 650 : 420;
            this._skillBox.setData(team, icon, name);
        };
        return FightView;
    }(ui.fight.fightsUI));
    game.FightView = FightView;
})(game || (game = {}));
