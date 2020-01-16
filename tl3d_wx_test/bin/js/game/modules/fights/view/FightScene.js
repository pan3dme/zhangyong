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
    var FightScene = /** @class */ (function (_super) {
        __extends(FightScene, _super);
        function FightScene() {
            var _this = _super.call(this) || this;
            _this.isNewWave = false;
            _this.awake_section = tb.TB_god_set.get_TB_god_set().awake_section;
            //攻击连接延迟
            _this.ATTACK_DELAY = 300;
            _this.REMOTE_DELAY = 500;
            //死亡动画延迟
            _this.DEATH_DELAY = 800;
            //结束播放动画延迟
            _this.END_DELAY = 200;
            _this.toflag = false;
            _this._camAutoMove = false;
            _this.gameScene = new Base3dSceneLayerExt();
            _this.gameScene.camMoveFun = function () {
                _this.camMove();
            };
            // this.gameScene = new Base3dSceneLayer();
            _this.gameScene.scene.changeBloodManager(new BloodManagerExt);
            // this.addChild(this.gameScene);
            _this.game2dScene = new Base2dSceneLayer();
            // this.addChild(this.game2dScene);
            _this._sceneTransitionUi = new Laya.Image("preload/black.jpg");
            _this._sceneTransitionUi.x = _this._sceneTransitionUi.y = 0;
            _this._sceneTransitionUi.width = Laya.stage.width;
            _this._sceneTransitionUi.height = Laya.stage.height;
            _this._sceneTransitionUi.alpha = 0;
            _this._sceneTransitionUi.visible = false;
            Laya.stage.addChild(_this._sceneTransitionUi);
            return _this;
        }
        /**
         * 初始化相机角度
         */
        FightScene.prototype.initCam = function ($parm) {
            if ($parm === void 0) { $parm = null; }
            var camParm;
            if ($parm) {
                camParm = $parm;
            }
            else {
                camParm = tb.TB_map.get_TB_map_ById(this._curmapid).mcamera[0];
                // logerror("地图id:", this._curmapid, "初始化角度到：", camParm);
            }
            //相机角度
            this.gameScene.camRotationX = Number(camParm[0]); //垂直角度
            this.gameScene.camRotationY = Number(camParm[1]); //水平角度
            //相机距离
            this.gameScene.camDistance = Number(camParm[2]);
            //相机位置
            this.gameScene.camPositionX = Number(camParm[3]); //左右
            this.gameScene.camPositionY = Number(camParm[4]); //上下
            this.gameScene.camPositionZ = Number(camParm[5]); //前后
        };
        FightScene.prototype.StartRound = function () {
            this.frameLoop(1, this, this.TickUpdate);
        };
        FightScene.prototype.exitRound = function () {
            this.clearTimer(this, this.TickUpdate);
            this.removeAllBuff();
        };
        FightScene.prototype.TickUpdate = function () {
            //回合集
            //外层通过分发回合到这里
            //回合执行完，就通过事件去外部取
            //外部是个管理器
            //如果是播放录像，就直接通过当前波数和回合数，取得下一个回合（需要判断是否需要过场）
            //如果是实时操作，则分发事件到逻辑层取当前回合的报文
            //{0:[],sillid:[]}
            if (!this._copyVo) {
                return;
            }
            if (!this.stepOverAry) {
                this.stepOverAry = new Array;
            }
            //播放队列阻塞则计时器空跑
            if (this.stepOverAry.length != 0) {
                return;
            }
            // this.roundAry === null 代表战斗结束  this.roundAry === undefined 代表等待选择技能
            if (this.roundAry === null) {
                //结束
                logfight("战斗结束");
                dispatchEvt(new game.FightsEvent(game.FightsEvent.FIGHT_END), this._copyVo.fightPageControl.getResult());
                return;
            }
            if (this.isNewWave) {
                //过场
                this.hideRolePar();
                this.guochang();
                return;
            }
            if (game.FightView.chkCam && this._stop) {
                //调试站位中
                return;
            }
            if (this.curRound && this.curRound.roundary && this.curRound.roundary.length > 0) {
                var stepItem = this.curRound.roundary.shift();
                for (var i = 0; i < stepItem.length; i++) {
                    var vo = stepItem[i];
                    this.onPlayBefore(vo);
                }
                this._stop = game.FightView.chkCam;
                // let stepList: Array<Array<StepVo>> = this.groupByStep(stepItem);
                // for (var k = 0; k < stepList.length; k++) {
                //     this.objOpt(stepList[k]);
                // }
                return;
            }
            if (this.roundAry && this.roundAry.length > 0) {
                this.curRound = this.roundAry.shift();
                if (this.curRound) {
                    this.isNewWave = this.curRound.newWave;
                }
            }
            else {
                //获取下一条数据
                this.roundAry = this._copyVo.getNextRound();
            }
        };
        FightScene.prototype.onPlayBefore = function (vo, skillId) {
            if (vo.hasOwnProperty("objId") || vo.type == iface.tb_prop.battleOpTypeKey.rmBuff) {
                var role = this.getRoleById(vo.objId);
                if (!role) {
                    var buff = this.getWorldBuff(vo.buffInstId);
                    if (buff)
                        role = this.getRoleById(buff.targetId);
                }
                if (role) {
                    if (role.deadIng) {
                        role.delayList.push(new game.sStep(vo, skillId));
                    }
                    else {
                        this.onPlay(vo, skillId);
                    }
                }
                else {
                    this.onPlay(vo, skillId);
                }
            }
            else {
                this.onPlay(vo, skillId);
            }
        };
        // private groupByStep(stepItem: Array<StepVo>): Array<Array<StepVo>> {
        //     let stepList: Array<Array<StepVo>> = [];
        //     let keyList: Array<number> = [];
        //     let curObjid: number = -1;
        //     for (var i = 0; stepItem && i < stepItem.length; i++) {
        //         let step: StepVo = stepItem[i];
        //         if (step.objId) {
        //             curObjid = Number(step.objId);
        //             let idx = keyList.indexOf(curObjid);
        //             if (idx == -1) {
        //                 keyList.push(curObjid);
        //                 stepList.push([step]);
        //             } else {
        //                 if (stepList[idx]) {
        //                     stepList[idx].push(step);
        //                 }
        //             }
        //         } else {
        //             stepList.push([step]);
        //         }
        //     }
        //     return stepList;
        // }
        // /** 等待执行所有自己的逻辑 */
        // objOpt(stepList: StepVo[]) {
        //     let a = stepList.shift();
        //     this.onPlay(a);
        //     this.sss(a, stepList);
        // }
        // sss(curstep: StepVo, stepList: StepVo[]) {
        //     if (!this.hasTag(String(curstep.objId + "dead"))) {
        //         if (stepList.length <= 0)
        //             return;
        //         this.objOpt(stepList);
        //     } else {
        //         Laya.timer.frameOnce(2, this, () => {
        //             this.sss(curstep, stepList);
        //         });
        //     }
        // }
        FightScene.prototype.getRoleById = function (objid) {
            if (this.roleMap && this.roleMap.has(objid)) {
                return this.roleMap.get(objid);
            }
            return null;
        };
        FightScene.prototype.getArtifactById = function (camp) {
            if (this.artifactMap && this.artifactMap.has(camp)) {
                return this.artifactMap.get(camp);
            }
            return null;
        };
        /**
         * 步骤执行入口
         * @param itemvo 步骤对象
         * @param skillid 是否来自技能
         */
        FightScene.prototype.onPlay = function (itemvo, skillid) {
            if (itemvo.type == iface.tb_prop.battleOpTypeKey.useSkill) {
                //使用技能
                this.tagStep(itemvo.type + "_" + itemvo.skillId);
                this.fight(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.atftInit) {
                //神器初始化
                this.tagStep(String(itemvo.type));
                this.artifactInfo(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.atftUseSkill) {
                //神器使用技能
                this.tagStep(itemvo.type + "_" + itemvo.skillId);
                this.artifactFight(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.atkSpdChange) {
                //攻速变化
                this.roleAtkSpdChange(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.atkBarMax) {
                //攻击条上限
                this._atkMax = itemvo.atkBarMax;
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.hpChange) {
                //血量变化
                this.hpchange(itemvo, skillid);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.flyText) {
                //飘字
                this.flytest(itemvo, skillid);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.atkBar) {
                //行动条变化
                this.changeActionBar(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.objInit) {
                //出场
                this.tagStep(String(itemvo.type));
                this.roleInfo(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.buffChange) {
                this.updataBuff(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.addBuff) {
                this.addBuff(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.rmBuff) {
                this.removeBuff(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.angerChange) {
                //怒气变化
                dispatchEvt(new game.FightsEvent(game.FightsEvent.SET_ANGER), itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.trigPasvSkill) {
                this.trigPasvSkill(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.hpMaxChange) {
                this.hpMaxChange(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.roleAngerChange) {
                //怒气值变化
                this.angerChange(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.nextRound) {
                if (itemvo.round) {
                    logfight("回合：", itemvo.round);
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.SET_ROUND_TEXT), itemvo.round);
                }
                this._curRoleId = itemvo.objId;
                this.setCurRole();
            }
        };
        /**
         * 往池子里面放耗时操作标记
         * @param  tagKey
         */
        FightScene.prototype.tagStep = function ($tagKey) {
            var idx = this.stepOverAry.indexOf($tagKey);
            if (idx == -1) {
                this.stepOverAry.push($tagKey);
                if ($tagKey == String(iface.tb_prop.battleOpTypeKey.objInit)) {
                    //objinfo类型的初始化处理
                    if (this.buffMap) {
                        this.removeAllBuff();
                    }
                    else {
                        this.buffMap = new Map;
                    }
                    this._bossType = 0;
                    if (this.roleMap) {
                        this.removeRole();
                    }
                    else {
                        this.roleMap = new Map;
                    }
                }
                if ($tagKey == String(iface.tb_prop.battleOpTypeKey.atftInit)) {
                    if (this.artifactMap) {
                        this.removeArtifact();
                        dispatchEvt(new game.FightsEvent(game.FightsEvent.CLEAR_ARTIFACE));
                    }
                    else {
                        this.artifactMap = new Map;
                    }
                }
            }
        };
        FightScene.prototype.hasTag = function ($tagKey) {
            return this.stepOverAry.indexOf($tagKey) != -1;
        };
        /**
         * 从池子里删除标记
         * @param tagKey
         */
        FightScene.prototype.removeStep = function ($tagKey) {
            var idx = this.stepOverAry.indexOf($tagKey);
            if (idx != -1)
                this.stepOverAry.splice(idx, 1);
        };
        /**
         * 从池子里删除指定标记前缀的标记
         */
        FightScene.prototype.removeStepByType = function (type) {
            var flag = true;
            // let num = 1;
            var i = 0;
            while (flag) {
                // logfight("循环 %d", num);
                if (!this.stepOverAry || this.stepOverAry.length == 0) {
                    break;
                }
                // num++;
                for (i = 0; i < this.stepOverAry.length; i++) {
                    var item = this.stepOverAry[i];
                    if (item.indexOf(type + "_") != -1) {
                        this.stepOverAry.splice(i, 1);
                        break;
                    }
                    if (this.stepOverAry.length - 1 <= i) {
                        flag = false;
                    }
                }
            }
        };
        FightScene.prototype.angerChange = function (itemvo) {
            var role = this.getRoleById(itemvo.objId);
            if (!role)
                return;
            role.setAnger(itemvo.anger);
        };
        /**
         * 神器创建
         */
        FightScene.prototype.artifactInfo = function (itemvo) {
            this.addArtifact(itemvo);
            dispatchEvt(new game.FightsEvent(game.FightsEvent.INIT_ARTIFACE), itemvo);
            Laya.timer.frameOnce(2, this, this.artifactInfoCom, [itemvo]);
        };
        FightScene.prototype.artifactInfoCom = function (itemvo) {
            this.removeStep(String(itemvo.type));
        };
        /**
         * 英雄创建
         */
        FightScene.prototype.roleInfo = function (itemvo) {
            this.addBaseRole(itemvo);
            Laya.timer.frameOnce(2, this, this.roleInfoCom, [itemvo]);
        };
        /** 角色进场完毕 */
        FightScene.prototype.roleInfoCom = function (itemvo) {
            var _this = this;
            this.setTeamPost();
            if (!this.init) {
                //首次进入
                this.init = true;
                this.mainSceneComplete();
                this.initCam();
                this.tweenCam(game.CameraConst.MAIN, function () {
                    if (_this._talkStart) {
                        return;
                    }
                    _this.startFight();
                });
            }
            else {
                this.guochang2();
            }
        };
        FightScene.prototype.startFight = function () {
            var _this = this;
            dispatchEvt(new game.FightsEvent(game.FightsEvent.REFRESH_TITLE_EVENT));
            this._copyVo.fightStart(startOptState.START, function () {
                _this.removeStep(String(iface.tb_prop.battleOpTypeKey.objInit));
                dispatchEvt(new game.FightsEvent(game.FightsEvent.INIT_SPEED));
                // let tbmap: tb.TB_map = tb.TB_map.get_TB_map_ById(this._curmapid);
                // this.setCamMove(tbmap.canAutoTurn());
                _this.setSceneMovie();
                //播放弹幕
                if (_this._copyVo && _this._copyVo.barrageList && _this._copyVo.barrageList.length > 0) {
                    for (var i = 0; i < _this._copyVo.barrageList.length; i++) {
                        var vo = _this._copyVo.barrageList[i];
                        vo.parentBox = UIMgr.getUIByName(UIConst.FightViews);
                    }
                    BarrageMgr.getInstance().addBarrages(_this._copyVo.barrageList);
                }
            });
        };
        FightScene.prototype.setTeamPost = function () {
            var _this = this;
            this.roleMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                _this.setRolePos(element);
                _this.moveUnvisable(element, true);
            });
        };
        FightScene.prototype.setRolePos = function (god) {
            var tbmap = tb.TB_map.get_TB_map_ById(this._curmapid);
            if (this._bossType == 2) {
                //大boss关卡
                god.pos = god.rotation == 0 ? this.ary2v3(tbmap.blocal_god[god.locad % 6]) : this.ary2v3(tbmap.blocal_monster[god.locad % 6]);
            }
            else if (this._bossType == 1) {
                //小Boss关卡
                god.pos = god.rotation == 0 ? this.ary2v3(tbmap.mlocal_god[god.locad % 6]) : this.ary2v3(tbmap.mlocal_boss[god.locad % 6]);
            }
            else if (this._bossType == 0) {
                //小怪关卡
                god.pos = god.rotation == 0 ? this.ary2v3(tbmap.mlocal_god[god.locad % 6]) : this.ary2v3(tbmap.mlocal_monster[god.locad % 6]);
            }
            god.char.px = god.pos.x;
            god.char.py = god.pos.y;
            god.char.pz = god.pos.z;
        };
        FightScene.prototype.ary2v3 = function (ary) {
            return new tl3d.Vector3D(Number(ary[0]), Number(ary[1]), Number(ary[2]));
        };
        FightScene.prototype.addArtifact = function (artifactVo) {
            var sceneVo = new game.SceneGodVo;
            sceneVo.scene = this;
            sceneVo.objId = 1000 + artifactVo.camp;
            sceneVo.locad = 6; //神器站位6
            sceneVo.team = artifactVo.camp;
            sceneVo.rotation = artifactVo.camp == this._copyVo.getCamp() ? 0 : 180;
            //预加载技能 并保存技能对象
            // sceneVo.skillMap = new Object;
            // let tabskill = tb.TB_skill.get_TB_skillById(artifactVo.skillId);
            // let sceneSkill: GodSkillVo = new GodSkillVo;
            // sceneSkill.skillid = artifactVo.skillId;
            // if (tabskill.effect > 0) {
            //     let effecttab = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect);
            //     sceneSkill.skillfile = String(effecttab.effect_id);
            //     sceneSkill.effectName = effecttab.action;
            // }
            // sceneVo.skillMap[tabskill.ID] = sceneSkill;
            sceneVo.templatId = artifactVo.templateId;
            sceneVo.tab = tb.TB_artifact.get_TB_artifactById(sceneVo.templatId);
            var $baseChar = new FightChar();
            $baseChar.setRoleUrl(getRoleUrl(String(sceneVo.tab.model)));
            $baseChar.rotationY = sceneVo.rotation;
            sceneVo.char = $baseChar;
            this.artifactMap.set(artifactVo.camp, sceneVo);
        };
        /**
         * 提供给对象池创建角色对象的方法
         */
        FightScene.prototype.createCharFun = function () {
            console.log("通过方法创建对象");
            var sceneVo = new game.SceneGodVo;
            var $baseChar = new FightChar();
            sceneVo.char = $baseChar;
            return sceneVo;
        };
        //添加角色
        FightScene.prototype.addBaseRole = function ($goddata) {
            var sceneVo = Laya.Pool.getItemByCreateFun("fightChar", this.createCharFun.bind(this));
            sceneVo.scene = this;
            sceneVo.objId = $goddata.objId;
            sceneVo.objType = $goddata.objType;
            sceneVo.templatId = $goddata.templateId;
            sceneVo.locad = $goddata.objId % 10 - 1;
            sceneVo.team = Math.floor($goddata.objId / 10);
            sceneVo.isPlayer = sceneVo.team == this._copyVo.getCamp();
            sceneVo.rotation = sceneVo.isPlayer ? 0 : 180;
            sceneVo.atkBar = -1;
            sceneVo.atkSpd = $goddata.atkSpd;
            sceneVo.lev = $goddata.level;
            var roletab = $goddata.objType == battle.BatteConsts.BATTLE_CAMPATK ? tb.TB_god.get_TB_godById($goddata.templateId) : tb.TB_monster.get_TB_monsterById($goddata.templateId);
            sceneVo.tab = roletab;
            sceneVo.onDead = this.roleDeath.bind(this);
            var model = game.GodUtils.getGodModel($goddata.skinId, sceneVo.tab);
            sceneVo.char.setRoleUrl(getRoleUrl(String(model)));
            //初始化血量
            sceneVo.hpMax = $goddata.hpMax;
            sceneVo.hp = $goddata.hp;
            sceneVo.setAnger($goddata.anger);
            if (sceneVo.tab instanceof tb.TB_monster) {
                //boss类型设定
                if (sceneVo.tab.type > this._bossType)
                    this._bossType = sceneVo.tab.type;
                //boss等级
                if (sceneVo.tab.type > 0)
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.CHANGE_BOSSLEV), sceneVo.lev);
            }
            sceneVo.buffAry = [];
            this.roleMap.set(sceneVo.objId, sceneVo);
        };
        //进入游戏场景
        FightScene.prototype.enterScene = function (talkStart, fightvo, mapid, comolete) {
            this.init = false;
            this._talkStart = talkStart;
            this._copyVo = fightvo;
            // this.gameScene.camAotuMove = false;
            // this.gameScene.camMoveFun = () => {
            //     this.camMove();
            // };
            this._curmapid = mapid;
            this.sceneComplete = comolete;
            this.stepOverAry = new Array;
            this.roundAry = [];
            this.curRound = null;
            this.StartRound();
            // this.setTest();
        };
        FightScene.prototype.setTest = function () {
            tl3d.ProgrmaManager.getInstance().registe(tl3d.LineDisplayShader.LineShader, new tl3d.LineDisplayShader);
            var $GridLineSprite = new tl3d.GridLineSprite();
            this.gameScene.scene.addDisplay($GridLineSprite);
        };
        FightScene.prototype.camMove = function () {
            var tabmap = tb.TB_map.get_TB_map_ById(this._curmapid);
            if (this.gameScene.camRotationY < Number(tabmap.auto_scope[0]) || this.gameScene.camRotationY > Number(tabmap.auto_scope[1])) {
                return;
            }
            var temp = this.toflag ? (this.gameScene.camRotationY + tabmap.amp) : (this.gameScene.camRotationY - tabmap.amp);
            if (temp <= Number(tabmap.auto_scope[0]) || temp >= Number(tabmap.auto_scope[1])) {
                this.toflag = !this.toflag;
            }
            this.gameScene.camRotationY = this.toflag ? (this.gameScene.camRotationY + tabmap.amp) : (this.gameScene.camRotationY - tabmap.amp);
        };
        //场景加载完毕
        FightScene.prototype.mainSceneComplete = function () {
            if (this.sceneComplete) {
                Laya.timer.frameOnce(2, this, this.sceneComplete.bind(this));
            }
        };
        FightScene.prototype.playAction = function ($parm) {
            this.setTeamRoleAction(tl3d.CharAction.ATTACK_01, 0, $parm == playState.VICTORY ? 1 : 2);
            // this.roleMap.forEach((element, index, array) => {
            //     // element: 指向当前元素的值
            //     // index: 指向当前索引
            //     // array: 指向Array对象本身
            //     if (element.hpr > 0) {
            //         if (($parm == playState.VICTORY && element.rotation == 0) || ($parm == playState.FAILURE && element.rotation != 0))
            //             element.char.play(Pan3d.CharAction.ATTACK_01, 0, false);
            //     }
            // });
        };
        /**
         * 相机动画切换
         * @param camParm
         */
        FightScene.prototype.tweenCam = function (type, $cb) {
            if ($cb === void 0) { $cb = null; }
            Laya.Tween.clearAll(this.gameScene);
            var tbmap = tb.TB_map.get_TB_map_ById(this._curmapid);
            var camParm;
            switch (type) {
                case game.CameraConst.MAIN:
                    camParm = tbmap.mcamera[1]; //小怪战斗角度2
                    break;
                case game.CameraConst.VICTORY:
                    this.clearGuoChang();
                    if (this._copyVo.getCamp() == battle.BatteConsts.BATTLE_CAMPATK) {
                        camParm = this._bossType == 2 ? tbmap.bcamera[2] : tbmap.mcamera[2]; //胜利角度3
                    }
                    else {
                        camParm = this._bossType == 2 ? tbmap.bcamera[3] : tbmap.mcamera[3]; //失败角度4
                    }
                    break;
                case game.CameraConst.DEFEATED:
                    this.clearGuoChang();
                    if (this._copyVo.getCamp() == battle.BatteConsts.BATTLE_CAMPATK) {
                        camParm = this._bossType == 2 ? tbmap.bcamera[3] : tbmap.mcamera[3]; //失败角度4
                    }
                    else {
                        camParm = this._bossType == 2 ? tbmap.bcamera[2] : tbmap.mcamera[2]; //胜利角度3
                    }
                    break;
                case game.CameraConst.BOSSMAIN:
                    camParm = tbmap.bcamera[1]; //boss战斗角度5
                    break;
            }
            Laya.Tween.to(this.gameScene, { camRotationX: Number(camParm[0]) }, 800);
            Laya.Tween.to(this.gameScene, { camRotationY: Number(camParm[1]) }, 800);
            Laya.Tween.to(this.gameScene, { camDistance: Number(camParm[2]) }, 800);
            Laya.Tween.to(this.gameScene, { camPositionX: Number(camParm[3]) }, 800);
            Laya.Tween.to(this.gameScene, { camPositionY: Number(camParm[4]) }, 800);
            Laya.Tween.to(this.gameScene, { camPositionZ: Number(camParm[5]) }, 800, null, Handler.create(this, function () {
                if ($cb) {
                    $cb();
                }
            }));
        };
        FightScene.prototype.clearGuoChang = function () {
            Laya.Tween.clearAll(this._sceneTransitionUi);
            this._sceneTransitionUi.alpha = 0;
            this._sceneTransitionUi.visible = false;
        };
        FightScene.prototype.roleAtkSpdChange = function (itemvo) {
            var role = this.getRoleById(itemvo.objId);
            if (!role) {
                return;
            }
            role.atkSpd = itemvo.atkSpd;
        };
        /**
         * 退出场景
         */
        FightScene.prototype.exitScene = function () {
            if (this._copyVo && this._copyVo.barrageList) {
                this._copyVo.barrageList = null;
                BarrageMgr.getInstance().removeBarrageByBox(UIMgr.getUIByName(UIConst.FightViews));
            }
            TimeUtil.removeAllTickOut();
            this.exitRound();
            this._copyVo = null;
            logfight("设置copyvo == null");
            this.removeRole();
            this.game2dScene.onExit();
            this.gameScene.onExit();
        };
        FightScene.prototype.removeRole = function () {
            this.roleMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                if (element) {
                    element.buffAry = [];
                    if (element.char) {
                        element.char.buffary = element.buffAry;
                        element.char.shadow = false;
                        element.char.removeChar();
                    }
                    Laya.Pool.recover("fightChar", element);
                }
            });
            this.roleMap.clear();
        };
        FightScene.prototype.removeArtifact = function () {
            this.artifactMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                if (element) {
                    element.buffAry = [];
                    if (element.char) {
                        element.char.buffary = element.buffAry;
                    }
                    element.onDispose();
                }
            });
            this.artifactMap.clear();
        };
        FightScene.prototype.removeAllBuff = function () {
            var _this = this;
            this.buffMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                _this.removeBuffByOne(index);
            });
            // for (var key in this.buffMap.keys()) {
            //     this.removeBuffByOne(Number(key));
            // }
        };
        FightScene.prototype.setCurRole = function () {
            var _this = this;
            this.hideRolePar();
            var curRole = this.getRoleById(this._curRoleId);
            if (curRole) {
                var effscale = 1;
                if (curRole.tab instanceof tb.TB_monster && curRole.tab.type > 0)
                    effscale = curRole.tab.type == 1 ? curRole.tab.model_multiple : 4;
                this.gameScene.addEffect(this, 888888, curRole.pos, effscale, 5, function ($particle) {
                    _this._lastRolePar = $particle;
                });
            }
        };
        FightScene.prototype.hideRolePar = function () {
            if (this._lastRolePar) {
                this.gameScene.removeEffect(this._lastRolePar);
                this._lastRolePar = null;
            }
        };
        /**
         * 行动条变化
         * @param step
         */
        FightScene.prototype.changeActionBar = function (step) {
            var role = this.getRoleById(step.objId);
            if (!role)
                return;
            role.atkBar = step.atkBar;
            Laya.timer.frameOnce(3, this, this.showActionBar);
        };
        FightScene.prototype.showActionBar = function () {
            var _this = this;
            var tempatkprelist = new Array;
            this.roleMap.forEach(function (role, index, array) {
                //记录行动条上次显示位置
                role.lastAction = role.char.actionRatio;
                if (_this._atkMax == undefined || _this._atkMax == 0)
                    logerror("atkMax error");
                var barprec = role.atkBar / _this._atkMax;
                barprec = barprec > 1 ? 1 : barprec;
                barprec = Math.floor(barprec * 100);
                tempatkprelist.push({ roleid: role.objId, atkpre: barprec, speed: role.atkSpd, team: role.team });
            });
            this.atkBarRank(tempatkprelist);
            var tempList = new Array;
            var actionDataAry = [null, null, null, null, null, null, null, null, null, null];
            for (var i = 0; i < tempatkprelist.length; i++) {
                var barVo = tempatkprelist[i];
                var role = this.getRoleById(barVo.roleid);
                if (!role)
                    continue;
                if (barVo.roleid == this._curRoleId) {
                    //是我的回合
                    role.char.actionRatio = 108;
                }
                else {
                    //递归处理使行动条错开
                    this.diguiFun(tempList, barVo.atkpre, role.char);
                }
                if (role.hpr > 0) {
                    var idx = role.rotation == 0 ? role.locad : 5 + role.locad;
                    actionDataAry[idx] = { roleid: role.objId, lastrate: role.lastAction, rate: role.char.actionRatio, img: role.tab.icon, isMain: role.objId == this._curRoleId, team: role.team };
                }
                logfight(role.objId + "行动条设置：" + role.char.actionRatio);
            }
            logfight("行动条设置完成");
            this.changeActionEvent(actionDataAry);
        };
        FightScene.prototype.diguiFun = function (tempList, vo, char) {
            if (this.hasItem(tempList, vo)) {
                vo -= 3;
                this.diguiFun(tempList, vo, char);
            }
            else {
                char.actionRatio = Math.max(vo, 0);
                tempList.push(vo);
            }
        };
        FightScene.prototype.hasItem = function (list, rate) {
            for (var i = 0; i < list.length; i++) {
                if (!list[i])
                    return false;
                if ((list[i] - 3) <= rate)
                    return true;
            }
            return false;
        };
        FightScene.prototype.atkBarRank = function (list) {
            list.sort(function (a, b) {
                if (a.atkpre !== b.atkpre) {
                    return b.atkpre - a.atkpre;
                }
                if (a.speed !== b.speed) {
                    return b.speed - a.speed;
                }
                if (a.team !== b.team) {
                    return a.team - b.team; // pve里，我方先出手
                }
                return a.roleid - b.roleid; // 站位前的先出手
            });
            //如果是pvp
            // list.sort(
            //     function (a: AtkBarVo, b: AtkBarVo): number {
            //         if (a.atkpre !== b.atkpre) {
            //             return b.atkpre - a.atkpre;
            //         }
            //         if (a.speed !== b.speed) {
            //             return b.speed - a.speed;
            //         }
            //         return Math.random() < 0.5 ? 1 : -1;   // 站位前的先出手
            //     });
        };
        FightScene.prototype.changeActionEvent = function (actionDataAry) {
            if (actionDataAry === void 0) { actionDataAry = null; }
            if (actionDataAry == null) {
                this.roleMap.forEach(function (element, index, array) {
                    // element: 指向当前元素的值
                    // index: 指向当前索引
                    // array: 指向Array对象本身
                    //记录行动条上次显示位置
                    element.lastAction = 0;
                });
            }
            dispatchEvt(new game.FightsEvent(game.FightsEvent.CHANGE_ACTIONBAR), { vo: actionDataAry });
        };
        FightScene.prototype.hpchange = function (step, skillid) {
            //分段的血量变化，不处理。在飘字那处理
            if (skillid !== undefined) {
                var $skilltb = tb.TB_skill.get_TB_skillById(skillid);
                if ($skilltb.effect > 0) {
                    var $skilleff = tb.TB_skill_effect.get_TB_skill_effectById($skilltb.effect);
                    if ($skilleff.frame.length > 2) {
                        return;
                    }
                }
            }
            var role = this.getRoleById(step.objId);
            if (!role)
                return;
            logfight("血量变化：", step.hp);
            role.hp = step.hp;
        };
        FightScene.prototype.flytest = function (step, skillid) {
            var role = this.getRoleById(step.objId);
            if (role) {
                if (iface.tb_prop.flyTextTypeKey.reborn == step.flyTextType) {
                    //播放复活特效
                    this.playEffSkill([step.objId], 1017);
                    //回到起始点
                    this.setRolePos(role);
                }
                if (step.hasOwnProperty("showeff")) {
                    //播放回血特效
                    this.playEffSkill([step.objId], 1024);
                }
                var flyvo = new game.FlyText;
                flyvo.type = this.getFlyType(step.flyTextType, step.value);
                flyvo.value = step.value;
                flyvo.skillid = skillid;
                role.showJumpText(flyvo);
                logfight("飘字：", step.objId, step.flyTextType, step.value);
            }
        };
        /**
         * 飘字转换枚举
         */
        FightScene.prototype.getFlyType = function ($type, $num) {
            switch ($type) {
                case iface.tb_prop.flyTextTypeKey.hpChange:
                    //血量变化
                    if ($num > 0) {
                        return tl3d.TextJumpType.N_UPHP;
                    }
                    else {
                        return tl3d.TextJumpType.N_NORMALDAMAGE;
                    }
                case iface.tb_prop.flyTextTypeKey.crit:
                    //暴击
                    return tl3d.TextJumpType.N_CRIT;
                case iface.tb_prop.flyTextTypeKey.resist:
                    //抵抗
                    return tl3d.TextJumpType.N_RESISTANCES;
                case iface.tb_prop.flyTextTypeKey.rampage:
                    //追加回合
                    return tl3d.TextJumpType.N_ONCEATTACK;
                case iface.tb_prop.flyTextTypeKey.passive:
                    //被动技能
                    return tl3d.TextJumpType.N_PASSIVE;
                case iface.tb_prop.flyTextTypeKey.reborn:
                    //复活
                    return tl3d.TextJumpType.N_RESURGENCE;
                case iface.tb_prop.flyTextTypeKey.strikeBack:
                    //反击
                    return tl3d.TextJumpType.N_BEATBACK;
                case iface.tb_prop.flyTextTypeKey.banRecover:
                    //无法回血
                    return tl3d.TextJumpType.N_DOWNHP;
                case iface.tb_prop.flyTextTypeKey.shield:
                    //护盾
                    return tl3d.TextJumpType.N_SHIELD;
                case iface.tb_prop.flyTextTypeKey.god:
                    //无敌
                    return tl3d.TextJumpType.N_INVINCIBLE;
                case iface.tb_prop.flyTextTypeKey.immune:
                    //免疫
                    return tl3d.TextJumpType.N_IMMUNE;
                case iface.tb_prop.flyTextTypeKey.share:
                    //分摊
                    return tl3d.TextJumpType.N_SHARE;
                case iface.tb_prop.flyTextTypeKey.reboundDmg:
                    //反弹
                    return tl3d.TextJumpType.N_FANTAN;
                case iface.tb_prop.flyTextTypeKey.angerDown:
                    //减怒
                    return tl3d.TextJumpType.N_ANGER_DOWN;
            }
        };
        FightScene.prototype.addBuff = function (step) {
            var buffvo = new game.GodBuffVo;
            buffvo.casterId = step.casterId;
            buffvo.round = step.round;
            buffvo.skillId = step.skillId;
            buffvo.targetId = step.objId;
            buffvo.stackCnt = step.stackCnt;
            buffvo.uuid = step.buffInstId;
            buffvo.tb_buff = tb.TB_buff.get_TB_buffById(step.buffId);
            this.buffMap.set(buffvo.uuid, buffvo);
            // let role: SceneGodVo = this.getRoleById(buffvo.targetId);
            // if (role && step.hasOwnProperty("showeff")) {
            //     this.buffJumpText(buffvo, role);
            // }
            this.showBuffFlyText(buffvo, step.hasOwnProperty("showeff"));
            this.addBuffByOne(buffvo);
            Laya.timer.frameOnce(3, this, this.showBuff);
        };
        FightScene.prototype.showBuffFlyText = function (buffvo, isshow) {
            var role = this.getRoleById(buffvo.targetId);
            if (role && isshow) {
                this.buffJumpText(buffvo, role);
            }
        };
        FightScene.prototype.showBuff = function () {
            var _this = this;
            this.roleMap.forEach(function (role, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                //记录行动条上次显示位置
                var bufflist = new Array;
                for (var i = 0; i < role.buffAry.length; i++) {
                    var element = role.buffAry[i];
                    var vo = _this.getWorldBuff(element);
                    if (vo && vo.tb_buff.is_show && vo.tb_buff.round != 9999) {
                        bufflist.push(JSON.parse(JSON.stringify(vo)));
                    }
                }
                if (role.tab instanceof tb.TB_monster && role.tab.type > 0)
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.CHANGE_BOSSBUFF), bufflist);
                else
                    role.char.buffary = bufflist;
            });
        };
        FightScene.prototype.addBuffByOne = function (vo) {
            var _this = this;
            var role = this.getRoleById(vo.targetId);
            if (!role)
                return;
            if (vo.tb_buff.index != 0) {
                var tabeff_1 = tb.TB_buff_effect.get_TB_buff_effectById(vo.tb_buff.index);
                this.addEffect(tabeff_1.effect_id, role, tabeff_1.location, function ($particle) {
                    if (tabeff_1.is_cycle == 1) {
                        vo.particle = $particle;
                        //加载完持续buff特效后,判断改特效还在世界中不
                        if (!_this.buffMap.has(vo.uuid)) {
                            _this.gameScene.removeEffect($particle);
                        }
                    }
                });
            }
            role.buffAry.push(vo.uuid);
        };
        /**
         * 播放特效
         * @param eff_id
         * @param role 特效播放角色对象
         * @param efflocal 特效播放位置 1 = 头上 其他 = 特效自己控制
         * @param callback
         */
        FightScene.prototype.addEffect = function (eff_id, role, efflocal, callback) {
            var modelscale = 1;
            var effscale = 1;
            if (role.tab instanceof tb.TB_monster && role.tab.type > 0) {
                effscale = role.tab.type == 1 ? role.tab.model_multiple : 4;
                modelscale = role.tab.model_multiple;
            }
            var title = role.char.getCharHeight();
            title *= modelscale;
            if (role.rotation == 0) {
                title += 17;
                if (role.tab instanceof tb.TB_monster) {
                    if (role.tab.type == 2) {
                        title += 40;
                    }
                }
            }
            var effy = efflocal == 1 ? title : role.char.py;
            // logyhj("特效位置：%f,%f,%f", role.char.px, effy, role.char.pz);
            this.gameScene.addEffect(this, eff_id, new tl3d.Vector3D(role.char.px, effy, role.char.pz), effscale, 10, function ($particle) {
                if (callback) {
                    callback($particle);
                }
                //特效加载完成后，重置位置
                // logyhj("修正特效位置：%f,%f", role.char.px, role.char.pz);
                $particle.x = role.char.px;
                $particle.z = role.char.pz;
            });
        };
        FightScene.prototype.buffJumpText = function (vo, role) {
            // flyTextType : {"1":'血量变化',"2":'暴击',"3":'抵抗',"4":'追加回合',"5":'被动技能',"6":'复活',"7":'反击',"8":'无法回血',"9":'无敌'},
            var type = -1;
            if (vo.tb_buff.type == 1) {
                if (vo.tb_buff.type_param == 2) {
                    //攻击
                    type = vo.tb_buff.status_type == 1 ? tl3d.TextJumpType.N_ATTACK_UP : tl3d.TextJumpType.N_ATTACK_DOWN;
                }
                else if (vo.tb_buff.type_param == 3) {
                    //防御
                    type = vo.tb_buff.status_type == 1 ? tl3d.TextJumpType.N_DEFENSE_UP : tl3d.TextJumpType.N_DEFENSE_DOWN;
                }
                else if (vo.tb_buff.type_param == 4) {
                    //速度
                    type = vo.tb_buff.status_type == 1 ? tl3d.TextJumpType.N_SPEED_UP : tl3d.TextJumpType.N_SPEED_DOWN;
                }
                else if (vo.tb_buff.type_param == 5) {
                    //暴击率
                    type = vo.tb_buff.status_type == 1 ? tl3d.TextJumpType.N_CRIT_RATE_UP : tl3d.TextJumpType.N_CRIT_RATE_DOWN;
                }
                else if (vo.tb_buff.type_param == 7) {
                    //命中
                    type = vo.tb_buff.status_type == 1 ? tl3d.TextJumpType.N_HIT_UP : tl3d.TextJumpType.N_HIT_DOWN;
                }
                else if (vo.tb_buff.type_param == 8) {
                    //抵抗
                    type = vo.tb_buff.status_type == 1 ? tl3d.TextJumpType.N_RESIST_RATE_UP : tl3d.TextJumpType.N_RESIST_RATE_DOWN;
                }
            }
            else if (vo.tb_buff.type == 2) {
                type = tl3d.TextJumpType.N_IMMUNE;
            }
            else if (vo.tb_buff.type == 3) {
                type = tl3d.TextJumpType.N_INVINCIBLE;
            }
            else if (vo.tb_buff.type == 7) {
                var temp = vo.tb_buff.type_param % 10;
                type = tl3d.TextJumpType.N_BLEED;
                if (temp == 1) {
                    type = tl3d.TextJumpType.N_ZHONGDU;
                }
                else if (temp == 2) {
                    type = tl3d.TextJumpType.N_ZHUOSHAO;
                }
            }
            else if (vo.tb_buff.type == 8) {
                type = tl3d.TextJumpType.N_DIZZY;
                if (vo.tb_buff.type_param == 1) {
                    type = tl3d.TextJumpType.N_BINGFENG;
                }
                else if (vo.tb_buff.type_param == 2) {
                    type = tl3d.TextJumpType.N_SHUFU;
                }
                else if (vo.tb_buff.type_param == 3) {
                    type = tl3d.TextJumpType.N_MEIHUO;
                }
                else if (vo.tb_buff.type_param == 4) {
                    type = tl3d.TextJumpType.N_SHIHUA;
                }
                else if (vo.tb_buff.type_param == 5) {
                    type = tl3d.TextJumpType.N_MABI;
                }
                else if (vo.tb_buff.type_param == 6) {
                    type = tl3d.TextJumpType.N_FENNU;
                }
            }
            else if (vo.tb_buff.type == 9) {
                type = tl3d.TextJumpType.N_DOWNHP;
            }
            else if (vo.tb_buff.type == 10) {
                type = tl3d.TextJumpType.N_SILENCE;
            }
            else if (vo.tb_buff.type == 13) {
                type = tl3d.TextJumpType.N_SARCASM;
            }
            else if (vo.tb_buff.type == 17) {
                type = tl3d.TextJumpType.N_SLEEP;
            }
            else if (vo.tb_buff.type == 18) {
                type = tl3d.TextJumpType.N_SHIELD;
            }
            else if (vo.tb_buff.type == 20) {
                type = tl3d.TextJumpType.N_TARGET;
                if (vo.tb_buff.type_param == 1) {
                    type = tl3d.TextJumpType.N_LEIDIAN;
                }
                else if (vo.tb_buff.type_param == 2) {
                    type = tl3d.TextJumpType.N_WANGLING;
                }
            }
            else if (vo.tb_buff.type == 24) {
                type = tl3d.TextJumpType.N_SHARE;
            }
            if (type == -1)
                return;
            var flyvo = new game.FlyText;
            flyvo.type = type;
            flyvo.value = 0;
            role.showJumpText(flyvo);
        };
        FightScene.prototype.removeBuff = function ($stepvo) {
            var uuid = $stepvo.buffInstId;
            this.removeBuffByOne(uuid);
        };
        FightScene.prototype.removeBuffByOne = function (uuid) {
            var buffvo = this.getWorldBuff(uuid);
            if (buffvo) {
                var role = this.getRoleById(buffvo.targetId);
                if (role) {
                    //移除角色身上索引
                    role.deleteBuff(uuid);
                }
                //移除场景表现
                if (buffvo.particle) {
                    logfight("移除特效：", buffvo.targetId, "的" + tb.TB_buff_effect.get_TB_buff_effectById(buffvo.tb_buff.index).name);
                    this.gameScene.removeEffect(buffvo.particle);
                }
                this.buffMap.delete(uuid);
                logfight("删除buff：", buffvo.uuid, this.buffMap.has(uuid));
                Laya.timer.frameOnce(3, this, this.showBuff);
            }
        };
        FightScene.prototype.updataBuff = function ($stepVo) {
            if (this.buffMap.has($stepVo.buffInstId)) {
                var buffvo = this.buffMap.get($stepVo.buffInstId);
                buffvo.round = $stepVo.round;
                buffvo.stackCnt = $stepVo.stackCnt;
                this.showBuffFlyText(buffvo, $stepVo.hasOwnProperty("showeff"));
                Laya.timer.frameOnce(3, this, this.showBuff);
            }
            else {
                this.addBuff($stepVo);
            }
        };
        FightScene.prototype.hpMaxChange = function (stepvo) {
            var role = this.getRoleById(stepvo.objId);
            if (!role) {
                return;
            }
            logfight("血量变化：", stepvo.hp);
            role.hpMax = stepvo.hpMax;
            role.hp = stepvo.hp;
        };
        FightScene.prototype.trigPasvSkill = function (stepvo) {
            //被动是个需要表现的技能
            var skiKey = String(stepvo.skillId);
            var _tbskillobj = tb.TB_skill.get_TB_skillById(Number(skiKey));
            if (_tbskillobj && _tbskillobj.effect > 0) {
                logfight("被动存在技能表现");
                this.tagStep(stepvo.type + "_" + stepvo.skillId);
                this.fight(stepvo);
            }
            else {
                if (this.curRound.succOpt.indexOf(Number(skiKey)) == -1 && this.curRound.roundmap.hasOwnProperty(skiKey)) {
                    this.curRound.succOpt.push(Number(skiKey));
                    var skillary = this.curRound.roundmap[skiKey];
                    // let stepList: Array<Array<StepVo>> = this.groupByStep(skillary);
                    // for (var k = 0; k < stepList.length; k++) {
                    //     this.objOpt(stepList[k]);
                    // }
                    for (var i = 0; skillary && i < skillary.length; i++) {
                        var skillstep = skillary[i];
                        this.onPlayBefore(skillstep, stepvo.skillId);
                    }
                }
            }
        };
        FightScene.prototype.roleDeath = function (objid) {
            //角色死亡回调 需要清空身上的buff和世界buff.
            var role = this.getRoleById(objid);
            if (!role)
                return;
            while (role.buffAry && role.buffAry.length > 0) {
                var kid = role.buffAry.shift();
                this.removeBuffByOne(kid);
            }
        };
        FightScene.prototype.getWorldBuff = function (kid) {
            if (this.buffMap && this.buffMap.has(kid)) {
                return this.buffMap.get(kid);
            }
            return null;
        };
        FightScene.prototype.resetScene = function () {
            // this.gameScene.camAotuMove = false;
            var camParm = tb.TB_map.get_TB_map_ById(this._curmapid).mcamera[1];
            this.initCam(camParm);
        };
        FightScene.prototype.setTeamRoleAction = function ($action, $compstate, $team) {
            if ($team === void 0) { $team = -1; }
            this.roleMap.forEach(function (element, index, array) {
                if (element.hpr > 0 && ($team == -1 || $team == element.team)) {
                    element.char.play($action, $compstate, false);
                }
            });
        };
        FightScene.prototype.guochang = function () {
            var _this = this;
            this.setSceneMovie(false);
            this.tagStep("sceneSwitch");
            this.isNewWave = false;
            this.resetScene();
            //每波数据只过场时清空
            //清空神器
            if (this.artifactMap) {
                this.removeArtifact();
                dispatchEvt(new game.FightsEvent(game.FightsEvent.CLEAR_ARTIFACE));
            }
            this.setTeamRoleAction(this._copyVo.guochangAction(), 0);
            this._copyVo.fightStart(startOptState.GUOCHANG, function () {
                _this.guochang1();
            });
        };
        FightScene.prototype.guochang1 = function () {
            this.changeActionEvent();
            dispatchEvt(new game.FightsEvent(game.FightsEvent.SET_ROUND_TEXT), -1);
            this.removeStep("sceneSwitch");
        };
        FightScene.prototype.guochang2 = function () {
            var _this = this;
            dispatchEvt(new game.FightsEvent(game.FightsEvent.HIDE_TITLE_EVENT));
            //地下城boss场景特殊处理
            if (this._bossType == 2) {
                this.initCam(tb.TB_map.get_TB_map_ById(this._curmapid).bcamera[0]);
            }
            this._copyVo.fightStart(startOptState.GUOCHANGCOMPLETE, function () {
                _this.guochang3();
            });
        };
        FightScene.prototype.guochang3 = function () {
            var _this = this;
            if (this._bossType == 2) {
                this.tweenCam(game.CameraConst.BOSSMAIN, function () {
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.REFRESH_TITLE_EVENT));
                    _this.removeStep(String(iface.tb_prop.battleOpTypeKey.objInit));
                    _this.setSceneMovie();
                });
            }
            else {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.REFRESH_TITLE_EVENT));
                this.removeStep(String(iface.tb_prop.battleOpTypeKey.objInit));
                this.setSceneMovie();
            }
            this._sceneTransitionUi.visible = false;
        };
        FightScene.prototype.setCamMove = function ($val) {
            this._camAutoMove = $val;
        };
        FightScene.prototype.setSceneMovie = function ($val) {
            if ($val === void 0) { $val = this._camAutoMove; }
            this.gameScene.camAotuMove = $val;
        };
        FightScene.prototype.artifactFight = function (step) {
            var _this = this;
            logfight("神器释放技能：", step.skillId, "施法阵营 =>" + step.camp, "受击者 =>" + step.targetIds);
            var _tbskillobj = tb.TB_skill.get_TB_skillById(step.skillId);
            //延长时间
            var time = 0;
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById(_tbskillobj.effect);
            if (!efftab) {
                logerror("efftab null");
                return;
            }
            if (efftab.frame && efftab.frame.length > 0) {
                logfight("打击帧数：", efftab.frame[1]);
                time = frame2time(efftab.frame[1]);
            }
            var casterRole = this.getArtifactById(step.camp);
            if (!casterRole)
                return;
            if (_tbskillobj.skill_feature == 1) {
                // this.gameScene.addEffect(this,10000030,new tl3d.Vector3D(50,0,50),1,0);
                // dispatchEvt(new FightsEvent(FightsEvent.PLAY_SKILL_EFF), { name: _tbskillobj.name, icon: casterRole.tab.icon, team: casterRole.team });
            }
            //重置标记位
            casterRole.skilltag = false;
            casterRole.actiontag = false;
            if (step.camp == battle.BatteConsts.BATTLE_CAMPATK) {
                UIMgr.showUI(UIConst.ShowSkill, {
                    text: _tbskillobj.name, model: casterRole.tab.model, scale: casterRole.tab.location[3] + 2, charx: 180, chary: 1400, effz: -640, cb: function () {
                        _this.onArtifactFight(casterRole, efftab, time, step, _tbskillobj);
                    }
                });
            }
            else {
                this.onArtifactFight(casterRole, efftab, time, step, _tbskillobj);
            }
        };
        FightScene.prototype.onArtifactFight = function (casterRole, efftab, time, step, _tbskillobj) {
            var _this = this;
            this.setRolePos(casterRole);
            this.gameScene.scene.addMovieDisplay(casterRole.char);
            var speedObj = { speednum: 0 };
            if (efftab.att_type == 1) {
                //近战 只会有一个目标
                time += this.ATTACK_DELAY;
                this.jinzhan(step, casterRole, _tbskillobj);
            }
            else if (efftab && efftab.att_type == 2) {
                //远攻 攻击几个，就有几个目标
                // showToast("帧数："+efftab.frame[0]);
                this.yuancheng(efftab, step, casterRole, _tbskillobj, frame2time(efftab.frame[0]), speedObj);
            }
            time += Number(speedObj.speednum);
            //播放被击打效果
            TimeUtil.addTimeOut(this.getresultTime(time), function () {
                _this.triggerEffect(step);
            });
        };
        FightScene.prototype.fight = function (step) {
            var _this = this;
            logfight("当前释放技能：", step.skillId, "施法者 =>" + step.objId, "受击者 =>" + step.targetIds);
            var speedObj = { speednum: 0 };
            var _tbskillobj = tb.TB_skill.get_TB_skillById(step.skillId);
            //延长时间
            var time = 0;
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById(_tbskillobj.effect);
            if (!efftab) {
                logerror("efftab null");
                this.triggerEffect(step);
                this.removeStep(step.type + "_" + step.skillId);
                return;
            }
            if (efftab.frame && efftab.frame.length > 0) {
                logfight("打击帧数：", efftab.frame[1]);
                time = frame2time(efftab.frame[1]);
            }
            var casterRole = this.getRoleById(step.objId);
            if (!casterRole)
                return;
            if (_tbskillobj.skill_feature == 1) {
                // this.gameScene.addEffect(this,10000030,new tl3d.Vector3D(50,0,50),1,0);
                dispatchEvt(new game.FightsEvent(game.FightsEvent.PLAY_SKILL_EFF), { name: _tbskillobj.name, icon: casterRole.tab.icon, team: casterRole.team });
            }
            //重置标记位
            casterRole.actiontag = false;
            casterRole.skilltag = false;
            if (efftab.att_type == 1) {
                //近战 只会有一个目标
                time += this.ATTACK_DELAY;
                this.jinzhan(step, casterRole, _tbskillobj);
            }
            else if (efftab && efftab.att_type == 2) {
                //远攻 攻击几个，就有几个目标
                // showToast("帧数："+efftab.frame[0]);
                //这里不添加延迟，从需求上来讲，弹道又分为轨迹弹道和定点出现弹道。当为定点出现时，则弹道运动速度配置为10。
                // if (efftab.ballistic == 1) {
                //     time += this.REMOTE_DELAY;
                // }
                this.yuancheng(efftab, step, casterRole, _tbskillobj, frame2time(efftab.frame[0]), speedObj);
            }
            time += Number(speedObj.speednum);
            logfight("播放被击打效果:", time, step);
            //播放被击打效果
            TimeUtil.addTimeOut(this.getresultTime(time), function () {
                _this.triggerEffect(step);
            });
        };
        FightScene.prototype.triggerEffect = function (step) {
            var _this = this;
            logfight("触发被击打效果:", step);
            if (this.curRound.succOpt.indexOf(Number(step.skillId)) != -1 || !this.curRound.roundmap.hasOwnProperty(String(step.skillId))) {
                return;
            }
            this.curRound.succOpt.push(Number(step.skillId));
            var skillary = this.curRound.roundmap[String(step.skillId)];
            // let stepList: Array<Array<StepVo>> = this.groupByStep(skillary);
            // for (var k = 0; k < stepList.length; k++) {
            //     this.objOpt(stepList[k]);
            // }
            for (var i = 0; skillary && i < skillary.length; i++) {
                var skillstep = skillary[i];
                if (skillstep.type == iface.tb_prop.battleOpTypeKey.trigPasvSkill) {
                    //技能为分段攻击时，强行做一个时间处理。
                    var $skilltb = tb.TB_skill.get_TB_skillById(step.skillId);
                    if ($skilltb && $skilltb.effect > 0) {
                        var $skilleff = tb.TB_skill_effect.get_TB_skill_effectById($skilltb.effect);
                        if ($skilleff.frame.length > 2) {
                            //分段
                            var time = frame2time($skilleff.frame[0] - $skilleff.frame[1]);
                            tl3d.TimeUtil.addTimeOut(this.getresultTime(time), function () {
                                _this.onPlayBefore(skillstep, step.skillId);
                            });
                        }
                        else {
                            this.onPlayBefore(skillstep, step.skillId);
                        }
                    }
                    else {
                        this.onPlayBefore(skillstep, step.skillId);
                    }
                }
                else {
                    this.onPlayBefore(skillstep, step.skillId);
                }
            }
        };
        /**
         * 移动时，隐藏buff
         */
        FightScene.prototype.moveUnvisable = function (role, visible) {
            for (var i = 0; i < role.buffAry.length; i++) {
                var buffvo = this.getWorldBuff(role.buffAry[i]);
                if (!buffvo)
                    continue;
                if (buffvo.particle) {
                    buffvo.particle.sceneVisible = visible;
                    if (visible) {
                        // logyhj("再一次修正特效位置：%f,%f", role.char.px, role.char.pz);
                        buffvo.particle.x = role.char.px;
                        buffvo.particle.z = role.char.pz;
                    }
                }
            }
        };
        FightScene.prototype.jinzhan = function (step, casterRole, _tbskillobj) {
            var targetVo = this.getRoleById(step.targetIds[0]);
            if (!targetVo) {
                return;
            }
            var targChar = targetVo.char;
            casterRole.char.watch(targChar);
            casterRole.char.play(tl3d.CharAction.WALK, 2, false);
            //法线延长线坐标
            var dis = tl3d.Vector3D.distance(targetVo.pos, casterRole.pos);
            var normalV3 = targetVo.pos.subtract(casterRole.pos);
            normalV3.normalize();
            normalV3.scaleBy(dis * 0.8);
            var $c3d = casterRole.pos.add(normalV3);
            var time = this.getresultTime(this.ATTACK_DELAY);
            Laya.timer.callLater(this, this.moveChar, [casterRole, $c3d, time, step, _tbskillobj]);
        };
        FightScene.prototype.getresultTime = function (t) {
            return t / (this.gameScene.timespeed1 + 1);
        };
        FightScene.prototype.moveChar = function (casterRole, $c3d, time, step, _tbskillobj) {
            var _this = this;
            this.moveUnvisable(casterRole, false);
            Laya.Tween.to(casterRole.char, { "px": $c3d.x, "pz": $c3d.z }, time, null, Laya.Handler.create(this, function ($handlerChar, $skitab) {
                _this.charPlaySkill($handlerChar, $skitab, step);
            }, [casterRole, _tbskillobj]));
        };
        FightScene.prototype.yuancheng = function (efftab, step, casterRole, _tbskillobj, cbtime, speedobj) {
            var _this = this;
            if (efftab.ballistic == 1) {
                //弹道类型
                if (!step.targetIds) {
                    logerror("目标不存在");
                    return;
                }
                var maxlen = step.targetIds.length;
                for (var i = 0; i < maxlen; i++) {
                    var element = this.getRoleById(step.targetIds[i]);
                    if (!element)
                        continue;
                    var len = i + 1;
                    this.charDandaoPlaySkill(casterRole, _tbskillobj, element, len == maxlen ? step : null, speedobj);
                }
                if (maxlen > 0) {
                    logfight("actiontag:cbtime", cbtime + speedobj.speednum);
                    TimeUtil.addTimeOut(this.getresultTime(cbtime + speedobj.speednum), function () {
                        casterRole.actiontag = true;
                        logfight("actiontag:true");
                        // this.skillComplete(casterRole, _tbskillobj, step);
                        Laya.timer.frameOnce(3, _this, _this.skillComplete, [casterRole, _tbskillobj, step]);
                    });
                }
            }
            else if (efftab.ballistic == 0) {
                //给友方加buff的技能 特殊处理回血和复活 无敌
                this.charPlaySkill(casterRole, _tbskillobj, step);
                if (!step.targetIds) {
                    logerror("目标不存在");
                    return;
                }
            }
            else {
                var tbmap = tb.TB_map.get_TB_map_ById(this._curmapid);
                var dot = void 0;
                if (this._bossType == 2) {
                    //boss关卡
                    dot = casterRole.rotation == 0 ? this.ary2v3(tbmap.bskilldot[1]) : this.ary2v3(tbmap.bskilldot[0]);
                }
                else {
                    //小怪关卡
                    dot = casterRole.rotation == 0 ? this.ary2v3(tbmap.mskilldot[1]) : this.ary2v3(tbmap.mskilldot[0]);
                }
                var ary = (efftab.ballistic == 3 || efftab.ballistic == 0) ? null : [dot];
                if (efftab.ballistic == 3) {
                    casterRole.char.watch(dot);
                }
                this.charPlaySkill(casterRole, _tbskillobj, step, ary);
            }
        };
        //处理特殊技能和特效的关系
        FightScene.prototype.playEffSkill = function (targetIds, effid) {
            for (var k = 0; k < targetIds.length; k++) {
                var id = targetIds[k];
                var tag = this.getRoleById(id);
                this.addEffect(effid, tag, 0);
            }
        };
        /**
         * 技能播放结束回调
         */
        FightScene.prototype.skillComplete = function ($charVo, $skiltab, $step) {
            if (!$charVo.skilltag || !$charVo.actiontag)
                return;
            if (!this.roleMap)
                return;
            if (!$charVo || !$charVo.char)
                return;
            logfight("战斗技能结束", $step.skillId);
            if ($step.type == iface.tb_prop.battleOpTypeKey.atftUseSkill) {
                this.gameScene.scene.removeMovieDisplay($charVo.char);
                this.removeStep($step.type + "_" + $step.skillId);
                return;
            }
            $charVo.char.forceRotationY = $charVo.rotation;
            this.removeStep($step.type + "_" + $step.skillId);
            //特殊处理,被动技能如果是弹道技能,可能会同时多人释放,同一个弹道技能多次释放，只会有一个回调
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            if ($step.type == iface.tb_prop.battleOpTypeKey.trigPasvSkill && efftab.att_type == 2 && efftab.ballistic == 1) {
                this.removeStepByType($step.type);
            }
        };
        FightScene.prototype.charDandaoPlaySkill = function ($charVo, $skiltab, $target, step, speedobj) {
            var _this = this;
            if (!$charVo.char._scene.ready) {
                return;
            }
            var effecttab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            if (!effecttab) {
                logerror("技能效果不存在", $skiltab.effect);
                return;
            }
            var $skill = this.gameScene.scene.skillMgr.getSkill(getSkillUrl(String(effecttab.effect_id)), effecttab.action, function () {
                logfight("技能加载完成");
                _this.charDandaoPlaySkill($charVo, $skiltab, $target, step, speedobj);
            });
            if (!$skill.keyAry) {
                return;
            }
            var skillobj = $skill.keyAry[0];
            if (skillobj && skillobj instanceof tl3d.SkillTrajectory) {
                logfight("弹道速度:", skillobj.data.speed);
                if (skillobj.data.speed < 10) {
                    speedobj.speednum = this.REMOTE_DELAY;
                }
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            tl3d.PathManager.init();
            // $skill.setendParticleRoation(new Pan3d.Vector3D(0, $charVo.char.rotationY, 0));
            // $skill.setendParticleRoation(new Pan3d.Vector3D($charVo.char.rotationX, $charVo.char.rotationY, $charVo.char.rotationZ));
            // $skill.needSound = true;
            $skill.configTrajectory($charVo.char, $target.char, step == null ? null : function () {
                // showToast("技能回调");
                $charVo.skilltag = true;
                logfight("技能回调skilltag:true");
                Laya.timer.frameOnce(3, _this, _this.skillComplete, [$charVo, $skiltab, step]);
                // this.skillComplete($charVo, $skiltab, step);
            });
            // $skill.configTrajectory($charVo.char, $target.char);
            //面向目标
            $charVo.char.watch($target.char);
            this.gameScene.scene.skillMgr.playSkill($skill);
        };
        //使用技能
        FightScene.prototype.charPlaySkill = function ($charVo, $skiltab, $step, $skillTargetDot) {
            var _this = this;
            if ($skillTargetDot === void 0) { $skillTargetDot = null; }
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            if (!$charVo || !$charVo.char || !$charVo.char._scene || !$charVo.char._scene.ready) {
                return;
            }
            var effecttab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            if (!effecttab) {
                logerror("技能效果不存在", $skiltab.effect);
                return;
            }
            var $skill = this.gameScene.scene.skillMgr.getSkill(getSkillUrl(String(effecttab.effect_id)), effecttab.action, function () {
                logfight("技能加载完成");
                _this.charPlaySkill($charVo, $skiltab, $step, $skillTargetDot);
            });
            if (!$skill.keyAry) {
                return;
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            // $skill.setendParticleRoation(new Pan3d.Vector3D($charVo.char.rotationX, $charVo.char.rotationY, $charVo.char.rotationZ));
            // $skill.setendParticleRoation(new Pan3d.Vector3D(0, $charVo.char.rotationY, 0));
            // $skill.needSound = true;
            $skill.configFixEffect($charVo.char, function () {
                $charVo.skilltag = true;
                logfight("skilltag:true");
                Laya.timer.frameOnce(3, _this, _this.skillComplete, [$charVo, $skiltab, $step]);
                // this.skillComplete($charVo, $skiltab, $step);
            }, $skillTargetDot);
            this.gameScene.scene.skillMgr.playSkill($skill);
            TimeUtil.addTimeOut(this.getresultTime(frame2time(efftab.frame[0])), function () {
                // this._actiontag = true;
                $charVo.actiontag = true;
                logfight("actiontag:time:", frame2time(efftab.frame[0]));
                Laya.timer.frameOnce(3, _this, _this.skillComplete, [$charVo, $skiltab, $step]);
            });
            //如果是近战，需要移动回原来的位置
            if (efftab.att_type == 1) {
                TimeUtil.addTimeOut(this.getresultTime(frame2time(efftab.action_frame)), function () {
                    _this.roleMove($charVo);
                });
            }
        };
        FightScene.prototype.roleMove = function ($charVo) {
            var _this = this;
            if ($charVo && $charVo.char) {
                $charVo.char.forceRotationY = $charVo.char.rotationY + 180;
                $charVo.char.play(tl3d.CharAction.WALK, 2, false);
                var time = this.getresultTime(this.ATTACK_DELAY);
                Laya.Tween.to($charVo.char, { "px": $charVo.pos.x, "pz": $charVo.pos.z }, time, null, Laya.Handler.create(this, function () {
                    if (!$charVo || !$charVo.char)
                        return;
                    if ($charVo.char.curentAction != tl3d.CharAction.STANAD)
                        $charVo.char.play(tl3d.CharAction.STANAD);
                    _this.moveUnvisable($charVo, true);
                    $charVo.char.forceRotationY = $charVo.rotation;
                }));
            }
        };
        /**
         * 测试模式下，获得所有角色对象
         */
        FightScene.prototype.getAllCharPos = function () {
            var posary = new Array;
            this.roleMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                posary.push(element);
            });
            return posary;
        };
        FightScene.prototype.selectSkillOk = function () {
            if (!this._tempDeathRoleList || this._tempDeathRoleList.length == 0) {
                return;
            }
            for (var i = 0; i < this._tempDeathRoleList.length; i++) {
                var sceneRole = this._tempDeathRoleList[i];
                sceneRole.char.alpha = 1;
                this.gameScene.scene.removeMovieDisplay(sceneRole.char);
            }
            this._tempDeathRoleList = null;
        };
        FightScene.prototype.getCam3d = function () {
            return new tl3d.Vector3D(this.gameScene.copyCam3d.x, this.gameScene.copyCam3d.y, this.gameScene.copyCam3d.z);
        };
        FightScene.prototype.downPointTo3d = function ($x, $y) {
            var $pos = this.gameScene.getGroundPos($x, $y);
            return $pos;
        };
        FightScene.prototype.setPos = function (role, pos) {
            var srole = this.getRoleById(role.objId);
            if (srole) {
                // if (pos instanceof Pan3d.Vector3D) {
                //     srole.char.px = pos.x
                //     srole.char.py = pos.y
                //     srole.char.pz = pos.z
                // } else {
                if (pos == Laya.Keyboard.UP) {
                    srole.char.pz += 1;
                }
                else if (pos == Laya.Keyboard.DOWN) {
                    srole.char.pz -= 1;
                }
                else if (pos == Laya.Keyboard.LEFT) {
                    srole.char.px -= 1;
                }
                else if (pos == Laya.Keyboard.RIGHT) {
                    srole.char.px += 1;
                }
                // }
            }
        };
        FightScene.prototype.LogPos = function () {
            var localmap = {};
            this.roleMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                localmap[element.objId] = new tl3d.Vector3D(element.char.px, element.char.py, element.char.pz);
            });
            logfight("----------新坐标------", localmap);
        };
        FightScene.prototype.getRolePos = function (pos) {
            var role = this.getRoleById(pos);
            return role.char.math3DWorldtoDisplay2DPos(new tl3d.Vector3D(role.char.px, (role.char.py + role.char.tittleHeight) >> 1, role.char.pz));
        };
        return FightScene;
    }(Laya.Sprite));
    game.FightScene = FightScene;
})(game || (game = {}));
