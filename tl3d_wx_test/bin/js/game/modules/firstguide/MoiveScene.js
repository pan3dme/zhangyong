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
    var MoiveScene = /** @class */ (function (_super) {
        __extends(MoiveScene, _super);
        function MoiveScene() {
            var _this = _super.call(this) || this;
            //地下城起始相机角度
            _this.dxc_initHeadCamparm = [-38, 35, 2000, -399, -333, -500];
            //地下城战斗相机角度
            _this.dxc_fightCamparm = [-27, -14, 1623, 128, -56, -500];
            //地下城胜利相机结束
            _this.dxc_victoryCamparm = [-41, 184, 463, 26, 473, 11];
            //地下城小怪失败相机角度
            _this.dxc_enimyBadCamparm = [-35, 4, 1470, -45, -99, -439];
            //地下城boss失败相机角度
            _this.dxc_bossBadCamparm = [-27, 4, 1023, -85, 252, 11];
            //大Boss初始化相机角度
            _this.dxc_initBossCamparm = [-51, 45, 2000, 0, 252, 0];
            //大Boss相机角度
            _this.dxc_fightBossCamparm = [-20, 0, 1637, 0, 150, 0];
            //dxc普通技能点
            _this.dxcmyskillDot = new tl3d.Vector3D(35, 0, -1162);
            _this.dxcenemyskillDot = new tl3d.Vector3D(34, 0, -883);
            //dxcBoss技能点
            _this.dxcBossmyskillDot = new tl3d.Vector3D(0, 0, -285);
            _this.dxcBossenemyskillDot = new tl3d.Vector3D(-28, 0, 51);
            _this.myteam = [{ team: 1, hp: 150000, location: 2, tab: tb.TB_god.get_TB_godById(3006), skill: [300670, 300610], scale: 1, name: "托尔", model: 3106 },
                { team: 1, hp: 150000, location: 3, tab: tb.TB_god.get_TB_godById(4003), skill: [400300, 400310], scale: 1, name: "雅典娜", model: 4103 },
                { team: 1, hp: 150000, location: 4, tab: tb.TB_god.get_TB_godById(3001), skill: [300100, 300110], scale: 1, name: "孙悟空", model: 3101 }
            ];
            _this.enemyteam = [{ team: 2, hp: 300000, location: 4, tab: tb.TB_monster.get_TB_monsterById(2200135), skill: [2001200, 2001210], scale: 1.5, name: "尼德霍格", model: 20012 }];
            //步骤
            // id:用于分发事件时，告知现在处于哪个步骤 
            // type:1引导 2战斗 3过场 4震屏
            // guideid：引导id,不能重复，递增就行
            // tarType：1对敌方 2：对友方
            // skillid：技能id
            // caster:施法者 target：目标 hpAry：血量飘字 
            // times：飘字分段 timelist：飘字分段比例 可选，如有 需要与times的长度相等 flytimes:受伤害时机 第一次受伤害固定为0，后面的时机都是相对于0来计算。可选，如有需要长度和times一致
            _this.stepAry = [
                { id: 1, type: 1, guideid: 1 },
                { id: 2, type: 2, tarType: 1, skillid: 2001200, caster: "2_4", target: ["1_2", "1_3", "1_4"], hpAry: [{ id: "1_2", hp: 32041 }, { id: "1_3", hp: 35989 }, { id: "1_4", hp: 36052 }], times: 3 },
                { id: 3, type: 1, guideid: 2 },
                { id: 4, type: 2, guideid: 3, tarType: 1, skillid: 300610, caster: "1_2", target: ["2_4"], hpAry: [{ id: "2_4", hp: 56201 }], times: 1 },
                // { id: 5, type: 1, guideid: 4 },//引导
                { id: 5, type: 2, tarType: 1, skillid: 400310, caster: "1_3", target: ["2_4"], hpAry: [{ id: "2_4", hp: 58652 }], times: 1 },
                // { id: 5, type: 1, guideid: 6 },//引导
                { id: 6, type: 2, tarType: 1, skillid: 300110, caster: "1_4", target: ["2_4"], hpAry: [{ id: "2_4", hp: 68294 }], times: 1 },
                { id: 7, type: 2, tarType: 1, skillid: 2001210, caster: "2_4", target: ["1_2", "1_3", "1_4"], hpAry: [{ id: "1_2", hp: 91209 }, { id: "1_3", hp: 89326 }, { id: "1_4", hp: 88129 }], times: 3 },
                { id: 8, type: 2, guideid: 8, tarType: 1, skillid: 300670, caster: "1_2", target: ["2_4"], hpAry: [{ id: "2_4", hp: 148921 }], times: 6, timelist: [5, 8, 13, 17, 24, 33], flytimes: [0, 16, 33, 58, 94, 134] },
                { id: 9, type: 4, time: 2000, amp: 30 },
                { id: 10, type: 1, guideid: 9 },
            ];
            //地下城中我的角色
            _this._dxcMyPosition = [
                new tl3d.Vector3D(87, 0, -1194),
                new tl3d.Vector3D(-22, 0, -1201),
                new tl3d.Vector3D(157, 0, -1105),
                new tl3d.Vector3D(44, 0, -1129),
                new tl3d.Vector3D(-69, 0, -1146)
            ]; //第二排右一
            //地下城中小怪的角色
            _this._dxcEnemyPosition = [
                new tl3d.Vector3D(-73, 0, -1005),
                new tl3d.Vector3D(93, 0, -829),
                new tl3d.Vector3D(159, 0, -972),
                new tl3d.Vector3D(33, 0, -937),
                new tl3d.Vector3D(43, 0, -887)
            ]; //第二排右一
            //地下城中boss站位
            _this._dxcBossPosition = [
                new tl3d.Vector3D(-130, 0, -9),
                new tl3d.Vector3D(-73, 0, 209),
                new tl3d.Vector3D(81, 0, 14),
                new tl3d.Vector3D(-73, 0, 209),
                new tl3d.Vector3D(0, 0, 168)
            ]; //第二排右一
            //地下城中boss关卡我的站位
            _this._dxcBossMyPosition = [
                new tl3d.Vector3D(-75, 0, -250),
                new tl3d.Vector3D(75, 0, -250),
                new tl3d.Vector3D(0, 0, -250),
                new tl3d.Vector3D(-70, 0, -380),
                new tl3d.Vector3D(70, 0, -380),
                new tl3d.Vector3D(113, 0, -350) //第二排右一
                // new tl3d.Vector3D(66, 0, -320),//左上
                // new tl3d.Vector3D(-66, 0, -321),//右上
                // new tl3d.Vector3D(119, 0, -219),//第二排左一
                // new tl3d.Vector3D(0, 0, -250),//第二排左中
                // new tl3d.Vector3D(-113, 0, -246)//第二排右一
            ];
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this.gameScene = new Base3dSceneLayerExt();
            _this.gameScene.scene.changeBloodManager(new BloodManagerExt);
            _this.addChild(_this.gameScene);
            //
            _this._sceneTransitionUi = new Laya.Image("preload/black.jpg");
            _this._sceneTransitionUi.x = _this._sceneTransitionUi.y = 0;
            _this._sceneTransitionUi.width = Laya.stage.width;
            _this._sceneTransitionUi.height = Laya.stage.height;
            _this._sceneTransitionUi.alpha = 0;
            _this._sceneTransitionUi.visible = false;
            Laya.stage.addChild(_this._sceneTransitionUi);
            _this._stepIdx = 0;
            return _this;
        }
        /**
         * 初始化相机角度
         */
        MoiveScene.prototype.initCam = function ($parm) {
            if ($parm === void 0) { $parm = null; }
            var camParm;
            if ($parm) {
                camParm = $parm;
            }
            else {
                camParm = this.dxc_initHeadCamparm;
            }
            //相机角度
            this.gameScene.camRotationX = camParm[0]; //垂直角度
            this.gameScene.camRotationY = camParm[1]; //水平角度
            //相机距离
            this.gameScene.camDistance = camParm[2];
            //相机位置
            this.gameScene.camPositionX = camParm[3]; //左右
            this.gameScene.camPositionY = camParm[4]; //上下
            this.gameScene.camPositionZ = camParm[5]; //前后
        };
        MoiveScene.prototype.nextStep = function ($stepId) {
            var _this = this;
            this._stepIdx = $stepId;
            this.curVo = this.stepAry[this._stepIdx];
            if (!this.curVo) {
                logerror("引导步骤错误：", this._stepIdx);
                BingoSDK.reportError("引导步骤错误：" + this._stepIdx);
                return;
            }
            this._stepIdx++;
            if (this.curVo.type == 1) {
                //引导 去除第一条
                if (this.curVo.id > 1)
                    dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.GUIDE_START), this.curVo.id);
            }
            else if (this.curVo.type == 2) {
                //战斗
                if (this.curVo.guideid && this.curVo.guideid > 0)
                    dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.GUIDE_START), this.curVo.id);
                this.onFight(this.curVo);
            }
            else if (this.curVo.type == 3) {
                //过场
                this.hideRolePar();
                this.guochang(this.curVo);
            }
            else if (this.curVo.type == 4) {
                //震屏
                this.gameScene.scene.skillMgr.shock.clearShock();
                this.gameScene.scene.skillMgr.shock.shock(999999999, this.curVo.amp);
                setTimeout(function () {
                    _this.gameScene.scene.skillMgr.shock.shock(3000, 4);
                    // this.sendsucc(this.curVo.id);
                    dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.GUIDE_START), _this.curVo.id);
                }, this.curVo.time);
            }
        };
        MoiveScene.prototype.onFight = function (step) {
            this.setCurRole(step.caster);
            var casterVo = this.roleMap[step.caster];
            //技能cd回合重置
            for (var key in casterVo.skillMap) {
                var skillvo = casterVo.skillMap[key];
                if (skillvo.cd > 0) {
                    skillvo.cd--;
                }
            }
            // if (step.hasOwnProperty("auto") && step.auto == 1) {
            //     //等待选择技能
            // dispatchEvt(new FirstGuideEvent(FirstGuideEvent.SHOW_SKILL_EVENT), { vo: casterVo.skillMap, type: -100, clickman: step.id });
            // } else {
            this.fight(step);
            // }
        };
        /**
         * 显示技能目标选取箭头特效
         * @param idsary
         * @return 可选取目标对象集
         */
        MoiveScene.prototype.getChar3dPosAry = function ($casting_target, $targetlimit) {
            var _this = this;
            this.clearSelectEff();
            var posary = new Array;
            var mapobj;
            if ($casting_target == 1 || $casting_target == 3) {
                mapobj = this.getMinHpTarget($casting_target, $targetlimit);
            }
            else {
                mapobj = this.roleMap;
            }
            for (var key in mapobj) {
                var vo = mapobj[key];
                if (vo.hpr > 0) {
                    if ((vo.rotation > 0 && $casting_target < 3) || (vo.rotation == 0 && $casting_target > 2)) {
                        var effscale = vo.char.scale;
                        var effpos = new tl3d.Vector3D(vo.pos.x, vo.char.getCharHeight() + 17, vo.pos.z);
                        if (vo.godid == "2_4") {
                            if (vo.tab.ID == 2200135) {
                                effpos.x += 6;
                                effpos.y = effpos.y + 20;
                                effpos.z -= 160;
                            }
                            else {
                                effpos.x -= 12;
                                effpos.y = effpos.y + 20;
                                effpos.z -= 120;
                            }
                        }
                        this.gameScene.addEffect(this, 1000003, effpos, effscale, 10, function ($particle) {
                            _this._selectEffAry.push($particle);
                        });
                        posary.push(vo);
                    }
                }
            }
            return posary;
        };
        /**
        * 从targetObj获得血量最低的num个英雄的id
        * @param targetObj
        * @param num
        */
        MoiveScene.prototype.getMinHpTarget = function ($casting_target, $num) {
            var enemyList = new Array;
            for (var key in this.roleMap) {
                var vo = this.roleMap[key];
                if ((vo.rotation > 0 && $casting_target < 3) || (vo.rotation == 0 && $casting_target > 2)) {
                    enemyList.push(vo);
                }
            }
            var obj = {};
            enemyList.sort(function (a, b) {
                return a.hpr - b.hpr;
            });
            for (var i = 0; i < $num; i++) {
                if (i >= enemyList.length) {
                    break;
                }
                obj[enemyList[i].godid] = enemyList[i];
            }
            return obj;
        };
        MoiveScene.prototype.clearSelectEff = function () {
            if (!this._selectEffAry) {
                this._selectEffAry = new Array;
            }
            while (this._selectEffAry.length > 0) {
                this.gameScene.removeEffect(this._selectEffAry[0]);
                this._selectEffAry.shift();
            }
        };
        MoiveScene.prototype.selectSkill = function () {
            this.fight(this.curVo);
        };
        MoiveScene.prototype.guochang = function (step) {
            var _this = this;
            this.setTeamRoleAction(tl3d.CharAction.WALK, 0);
            this._sceneTransitionUi.visible = true;
            Laya.Tween.to(this._sceneTransitionUi, { alpha: 1 }, step.time >> 1, null, Laya.Handler.create(this, function () {
                _this.refreshEnemy(1, 2);
                _this.setTeamRoleAction(tl3d.CharAction.STANAD, 0);
                _this.initCam(_this.dxc_initBossCamparm);
                Laya.Tween.to(_this._sceneTransitionUi, { alpha: 0 }, step.time >> 1, null, Laya.Handler.create(_this, function () {
                    _this.tweenCam(5, function () {
                        //下一步
                        _this.sendsucc(step.id);
                    });
                    _this._sceneTransitionUi.visible = false;
                }));
            }));
        };
        MoiveScene.prototype.setTeamRoleAction = function ($action, $compstate) {
            for (var key in this.roleMap) {
                if (this.roleMap[key] && this.roleMap[key]["rotation"] == 0) {
                    var role = this.roleMap[key];
                    role.char.play($action, $compstate, false);
                }
            }
        };
        MoiveScene.prototype.initRoles = function () {
            var _this = this;
            //我方阵容
            var godary = this.myteam;
            godary.forEach(function (element) {
                _this.addBaseRole(element);
            });
        };
        MoiveScene.prototype.refreshEnemy = function ($curIdx, $bosstype) {
            this._curIdx = $curIdx;
            this._bossType = $bosstype;
            this.refreshEnemyRole();
        };
        MoiveScene.prototype.refreshEnemyRole = function () {
            var _this = this;
            //先删除上局残留的敌方角色
            for (var key in this.roleMap) {
                var role = this.roleMap[key];
                if (role) {
                    if (role.rotation > 0) {
                        this.roleMap[key].char.delUIConatiner();
                        delete this.roleMap[key];
                    }
                    else {
                        role.buffAry = [];
                        if (role.char)
                            role.char.buffary = role.buffAry;
                    }
                }
            }
            var monsterAry = this.enemyteam;
            //敌方阵容
            monsterAry.forEach(function (vo) {
                _this.addBaseRole(vo);
            });
            this.setTeamPost();
        };
        MoiveScene.prototype.setTeamPost = function () {
            for (var key in this.roleMap) {
                var god = this.roleMap[key];
                //boss地图特殊处理
                if (this._bossType > 0) {
                    //boss关卡
                    god.pos = god.rotation == 0 ? this._dxcBossMyPosition[god.locad] : this._dxcBossPosition[god.locad];
                }
                else {
                    //小怪关卡
                    god.pos = god.rotation == 0 ? this._dxcMyPosition[god.locad] : this._dxcEnemyPosition[god.locad];
                }
                god.char.px = god.pos.x;
                god.char.py = god.pos.y;
                god.char.pz = god.pos.z;
            }
        };
        MoiveScene.prototype.getRolePos = function ($id) {
            var role = this.roleMap[$id];
            return role.char.math3DWorldtoDisplay2DPos(new tl3d.Vector3D(role.char.px, (role.char.py + role.char.tittleHeight) >> 1, role.char.pz));
        };
        //场景加载完毕
        MoiveScene.prototype.mainSceneComplete = function () {
            if (this.sceneComplete) {
                this.sceneComplete();
            }
        };
        //添加角色
        MoiveScene.prototype.addBaseRole = function ($goddata) {
            var sceneVo = new game.MoiveGodVo;
            sceneVo.godid = $goddata.team + "_" + $goddata.location;
            sceneVo.locad = $goddata.location;
            sceneVo.rotation = $goddata.team == 1 ? 0 : 180;
            sceneVo.lev = 10;
            sceneVo.tab = $goddata.tab;
            sceneVo.maxhp = $goddata.hp;
            //预加载技能 并保存技能对象
            sceneVo.skillMap = new Object;
            for (var k = 0; k < $goddata.skill.length; k++) {
                var element = $goddata.skill[k];
                var sceneSkill = new GodSkillVo;
                sceneSkill.skillid = element;
                var tabskill = tb.TB_skill.get_TB_skillById(element);
                sceneSkill.cd = 0;
                sceneSkill.tabskill1 = tabskill;
                if (tabskill.effect > 0) {
                    var effecttab = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect);
                    sceneSkill.skillfile = String(effecttab.effect_id);
                    sceneSkill.effectName = effecttab.action;
                }
                sceneVo.skillMap[element] = sceneSkill;
            }
            var $baseChar = new FightChar();
            this.gameScene.scene.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl(String($goddata.model)));
            $baseChar.scale = $goddata.scale;
            if ($goddata.tab instanceof tb.TB_monster) {
                if ($goddata.tab.type > 0) {
                    //boss血条和buff
                    dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.CHANGE_BOSSBLOOD), { vo: 100, type: -300 });
                }
                else {
                    $baseChar.bloodEnableExt = true;
                    $baseChar.setbloodColor($goddata.team == 1);
                    $baseChar.nameEnable = true;
                    $baseChar.charName = $goddata.name;
                }
            }
            else {
                $baseChar.bloodEnableExt = true;
                $baseChar.setbloodColor($goddata.team == 1);
                $baseChar.nameEnable = true;
                $baseChar.charName = $goddata.name;
            }
            //阴影需要先设置，在设置角色的x,y,z.角色接受xyz会修改阴影位置
            $baseChar.shadow = true;
            $baseChar.setShadowSize(6);
            $baseChar.rotationY = sceneVo.rotation;
            $baseChar.visible = true;
            $baseChar.setAnger(100);
            sceneVo.char = $baseChar;
            sceneVo.setHp($goddata.hp, 2);
            if (!this.roleMap) {
                this.roleMap = {};
            }
            this.roleMap[sceneVo.godid] = sceneVo;
        };
        MoiveScene.prototype.getCam3d = function () {
            return new tl3d.Vector3D(this.gameScene.copyCam3d.x, this.gameScene.copyCam3d.y, this.gameScene.copyCam3d.z);
        };
        MoiveScene.prototype.downPointTo3d = function ($x, $y) {
            var $pos = this.gameScene.getGroundPos($x, $y);
            return $pos;
        };
        MoiveScene.prototype.enterScene = function (mapid, comolete) {
            this._curmapid = mapid;
            this.sceneComplete = comolete;
            // //需要保证在逻辑层先分发INIT_MONSTER_EVENT事件
            // this.refreshEnemyRole();
            this.gameScene.scene.loadScene(mapid, function () { }, function (num) {
                if (num >= 1) {
                    return;
                }
                UIMgr.getInstance().loadingProcess(0.8 + num * 0.2);
            }, this.mainSceneComplete.bind(this));
        };
        /**
         * 相机动画切换
         * @param camParm
         */
        MoiveScene.prototype.tweenCam = function (type, $cb) {
            if ($cb === void 0) { $cb = null; }
            var camParm;
            switch (type) {
                case 2:
                    camParm = this.dxc_fightCamparm;
                    break;
                case 3:
                    camParm = this.dxc_victoryCamparm;
                    break;
                case 4:
                    camParm = this._bossType > 0 ? this.dxc_bossBadCamparm : this.dxc_enimyBadCamparm;
                    break;
                case 5:
                    camParm = this.dxc_fightBossCamparm;
                    break;
            }
            Laya.Tween.to(this.gameScene, { camRotationX: camParm[0] }, 1000);
            Laya.Tween.to(this.gameScene, { camRotationY: camParm[1] }, 1000);
            Laya.Tween.to(this.gameScene, { camDistance: camParm[2] }, 1000);
            Laya.Tween.to(this.gameScene, { camPositionX: camParm[3] }, 1000);
            Laya.Tween.to(this.gameScene, { camPositionY: camParm[4] }, 1000);
            Laya.Tween.to(this.gameScene, { camPositionZ: camParm[5] }, 1000, null, Handler.create(this, function () {
                if ($cb) {
                    $cb();
                }
            }));
        };
        /**
         * 退出场景
         */
        MoiveScene.prototype.exitScene = function () {
            TimeUtil.removeAllTickOut();
            this.roleMap = null;
            this.clearSelectEff();
            this.gameScene.onExit();
        };
        MoiveScene.prototype.setCurRole = function ($id) {
            var _this = this;
            var curRole = this.roleMap[$id];
            this.hideRolePar();
            this.gameScene.addEffect(this, 888888, curRole.pos, curRole.godid == "2_4" ? 2.5 : curRole.char.scale, 5, function ($particle) {
                _this._lastRolePar = $particle;
            });
        };
        MoiveScene.prototype.hideRolePar = function () {
            if (this._lastRolePar) {
                this.gameScene.removeEffect(this._lastRolePar);
                this._lastRolePar = null;
            }
        };
        MoiveScene.prototype.flytext = function (step) {
            var _this = this;
            var _loop_1 = function () {
                var itemVo = step.hpAry[i];
                var role = this_1.roleMap[itemVo.id];
                if (role) {
                    var jumptype_1 = tl3d.TextJumpType.N_NORMALDAMAGE;
                    if (step.tarType == 1) {
                        jumptype_1 = Math.random() < 0.5 ? tl3d.TextJumpType.N_NORMALDAMAGE : tl3d.TextJumpType.N_CRIT;
                    }
                    else {
                        jumptype_1 = tl3d.TextJumpType.N_UPHP;
                    }
                    //振屏
                    if (jumptype_1 == tl3d.TextJumpType.N_CRIT) {
                        this_1.gameScene.scene.skillMgr.shock.shock(300, 10);
                    }
                    if (step.tarType == 2) {
                        //加血
                        // this.gameScene.addEffect(this, 1024, role.pos, 2, 10, () => {
                        setTimeout(function () {
                            role.setHp(itemVo.hp, step.tarType);
                            _this.showJumpText(_this.gameScene.scene, new tl3d.Vector3D(role.char.px, role.char.py, role.char.pz), itemVo.hp, jumptype_1, tl3d.TimeUtil.getTimer(_this.gameScene.scene.startTime));
                        }, 300);
                        // });
                    }
                    else {
                        //同步分段伤害的不同出处
                        var curtime = tl3d.TimeUtil.getTimer(tl3d.TimeUtil.START_TIME);
                        if (step.times > 1) {
                            //注：step.times 和 step.timelist.length要对应
                            //有分段
                            var t = step.times;
                            //分段系数
                            var tlist = step.timelist || [];
                            if (tlist.length == 0) {
                                var temp = Math.floor(100 / t);
                                for (var x = 0; x < t; x++) {
                                    if (x == t - 1) {
                                        tlist.push(100 - ((t - 1) * temp));
                                    }
                                    else {
                                        tlist.push(temp);
                                    }
                                }
                            }
                            var totalHp = 0;
                            var _loop_2 = function () {
                                var num = 0;
                                if (w == t - 1) {
                                    num = itemVo.hp - totalHp;
                                }
                                else {
                                    num = tlist[w] / 100 * itemVo.hp;
                                }
                                num = Math.floor(num);
                                totalHp += num;
                                var ts = step.flytimes ? frame2time(step.flytimes[w]) : w * 300;
                                ts = ts / (this_1.gameScene.timespeed1 + 1);
                                var statime = curtime + ts;
                                this_1.showJumpText(this_1.gameScene.scene, new tl3d.Vector3D(role.char.px, role.char.py, role.char.pz), num, jumptype_1, statime);
                                // this.playInjured1(role);
                                if (ts == 0) {
                                    role.setHp(num, step.tarType);
                                    this_1.playInjured1(role);
                                }
                                else {
                                    tl3d.TimeUtil.addTimeOut(ts, function () {
                                        role.setHp(num, step.tarType);
                                        _this.playInjured1(role);
                                    });
                                }
                            };
                            for (var w = 0; w < t; w++) {
                                _loop_2();
                            }
                        }
                        else {
                            //没分段
                            role.setHp(itemVo.hp, step.tarType);
                            this_1.showJumpText(this_1.gameScene.scene, new tl3d.Vector3D(role.char.px, role.char.py, role.char.pz), itemVo.hp, jumptype_1, curtime);
                            this_1.playInjured1(role);
                        }
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < step.hpAry.length; i++) {
                _loop_1();
            }
        };
        /**
         * 播放受击动作
         * @param efftab
         * @param step
         */
        MoiveScene.prototype.playInjured1 = function (role) {
            //受击动作多次
            if (role) {
                role.beatWitheFilter();
                this.gameScene.addEffect(this, 1029, new tl3d.Vector3D(role.char.x, role.char.y + 50, role.char.z), 2, 0, null, 0, 0, true);
                if (role.char.curentAction != tl3d.CharAction.DEATH) {
                    //如果正处于被击动作，就先恢复idle状态
                    if (role.char.curentAction == tl3d.CharAction.INJURED)
                        role.char.play(tl3d.CharAction.STANAD, 2, false);
                    role.char.play(tl3d.CharAction.INJURED, 2, false);
                }
            }
        };
        MoiveScene.prototype.roleDeath = function (char) {
            // TimeUtil.addTimeOut(500, () => {
            //     char.play(Pan3d.CharAction.DEATH, 1, false);
            // });
            // TimeUtil.addTimeOut(1500, () => {
            //     //死亡时，将这个角色对象移除
            //     if (char)
            //         this.gameScene.scene.removeMovieDisplay(char);
            // });
        };
        MoiveScene.prototype.fight = function (step) {
            var _this = this;
            //{ id: 2, type: 2, tarType: 1, skillid: 400410, caster: "1_0", target: ["2_0", "2_2", "2_4"], hpAry: [{ id: "2_0", hp: 25222 }, { id: "2_2", hp: 28598 }, { id: "2_4", hp: 27882 }] },
            var _tbskillobj = tb.TB_skill.get_TB_skillById(step.skillid);
            if (!_tbskillobj) {
                this.sendsucc(step.id);
                return;
            }
            //延长时间
            var time = 0;
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById(_tbskillobj.effect);
            if (efftab && efftab.frame && efftab.frame.length > 0) {
                time = frame2time(efftab.frame[1]);
            }
            var casterRole = this.roleMap[step.caster];
            //技能cd
            var scskill = casterRole.skillMap[step.skillid];
            scskill.cd = 0;
            if (efftab && efftab.att_type == 1) {
                //近战 只会有一个目标
                time += 500;
                this.jinzhan(step, casterRole, _tbskillobj);
            }
            else if (efftab && efftab.att_type == 2) {
                //远攻 攻击几个，就有几个目标
                this.yuancheng(efftab, step, casterRole, _tbskillobj);
            }
            //播放被击打效果
            TimeUtil.addTimeOut(time / (this.gameScene.timespeed1 + 1), function () {
                _this.flytext(step);
            });
        };
        /**
         * 播放受击动作
         * @param efftab
         * @param step
         */
        MoiveScene.prototype.playInjured = function (efftab, step) {
            var _this = this;
            //受击动作多次
            if (efftab && efftab.frame && efftab.frame.length > 1) {
                for (var t = 1; t < efftab.frame.length; t++) {
                    var element = efftab.frame[t];
                    var injuredtime = efftab.att_type == 1 ? (500 + frame2time(efftab.frame[t])) : frame2time(efftab.frame[t]);
                    injuredtime = injuredtime / (this.gameScene.timespeed1 + 1);
                    TimeUtil.addTimeOut(injuredtime, function () {
                        for (var i = 0; i < step.target.length; i++) {
                            var role = _this.roleMap[step.target[i]];
                            if (role && role.char.onStage && role.char.curentAction != tl3d.CharAction.DEATH) {
                                //如果正处于被击动作，就先恢复idle状态
                                if (role.char.curentAction == tl3d.CharAction.INJURED)
                                    role.char.play(tl3d.CharAction.STANAD, 2, false);
                                role.char.play(tl3d.CharAction.INJURED, 2, false);
                            }
                        }
                    });
                }
            }
        };
        MoiveScene.prototype.jinzhan = function (step, casterRole, _tbskillobj) {
            var _this = this;
            var targetVo = this.roleMap[step.target[0]];
            var targChar = targetVo.char;
            casterRole.char.watch(targChar);
            casterRole.char.play(tl3d.CharAction.WALK, 2, false);
            //法线延长线坐标
            var dis = tl3d.Vector3D.distance(targetVo.pos, casterRole.pos);
            var normalV3 = targetVo.pos.subtract(casterRole.pos);
            normalV3.normalize();
            normalV3.scaleBy(dis * 0.6);
            var $c3d = casterRole.pos.add(normalV3);
            var time = 500 / (this.gameScene.timespeed1 + 1);
            Laya.Tween.to(casterRole.char, { "px": $c3d.x, "pz": $c3d.z }, time, null, Laya.Handler.create(this, function ($handlerChar, $skitab) {
                _this.charPlaySkill($handlerChar, $skitab, step);
            }, [casterRole, _tbskillobj]));
        };
        MoiveScene.prototype.yuancheng = function (efftab, step, casterRole, _tbskillobj) {
            if (efftab.ballistic == 1) {
                //弹道类型
                var targetRoleList = this.getTargetRoleList(step.target);
                for (var i = 0; i < targetRoleList.length; i++) {
                    var len = i + 1;
                    if (len == targetRoleList.length)
                        casterRole.char.watch(targetRoleList[i].char);
                    this.charDandaoPlaySkill(casterRole, _tbskillobj, targetRoleList[i], len == targetRoleList.length ? step : null);
                }
            }
            else {
                var dot = void 0;
                //boss地图特殊处理
                if (this._bossType > 0) {
                    //boss关卡
                    dot = casterRole.rotation == 0 ? this.dxcBossenemyskillDot : this.dxcBossmyskillDot;
                }
                else {
                    //小怪关卡
                    dot = casterRole.rotation == 0 ? this.dxcenemyskillDot : this.dxcmyskillDot;
                }
                var ary = (efftab.ballistic == 3 || efftab.ballistic == 0) ? null : [dot];
                if (efftab.ballistic == 3) {
                    this.watchPoint(dot, casterRole.char);
                }
                this.charPlaySkill(casterRole, _tbskillobj, step, ary);
            }
        };
        MoiveScene.prototype.getTargetRoleList = function ($targetIdAry) {
            var rolelist = new Array;
            for (var i = 0; $targetIdAry && i < $targetIdAry.length; i++) {
                rolelist.push(this.roleMap[$targetIdAry[i]]);
            }
            return rolelist;
        };
        /**
         * 角色 转向 到某个点
         * @param obj
         * @param char
         */
        MoiveScene.prototype.watchPoint = function ($obj, char) {
            var xx = $obj.x - char.px;
            var yy = $obj.z - char.pz;
            var distance = Math.sqrt(xx * xx + yy * yy);
            xx /= distance;
            yy /= distance;
            var angle = Math.asin(xx) / Math.PI * 180;
            if (yy <= 0) {
                angle = 180 - angle;
            }
            if (!isNaN(angle)) {
                char.forceRotationY = angle;
            }
        };
        /**
         * 技能播放结束回调
         */
        MoiveScene.prototype.skillComplete = function ($charVo, $skiltab, $step) {
            var _this = this;
            if (!this.roleMap)
                return;
            for (var i = 0; i < $step.target.length; i++) {
                var role = this.roleMap[$step.target[i]];
                if (role && role.hpr <= 0) {
                    this.roleDeath(role.char);
                }
            }
            TimeUtil.addTimeOut(300, function () {
                var efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
                if (efftab.att_type == 1) {
                    $charVo.char.rotationY += 180;
                    $charVo.char.play(tl3d.CharAction.WALK, 2, false);
                    var time = 500 / (_this.gameScene.timespeed1 + 1);
                    Laya.Tween.to($charVo.char, { "px": $charVo.pos.x, "pz": $charVo.pos.z }, time, null, Laya.Handler.create(_this, function () {
                        $charVo.char.rotationY = $charVo.rotation;
                        _this.sendsucc($step.id);
                    }));
                }
                else {
                    $charVo.char.rotationY = $charVo.rotation;
                    _this.sendsucc($step.id);
                }
            });
        };
        MoiveScene.prototype.sendsucc = function (id) {
            // setTimeout(() => {
            dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), id);
            // }, 1000);
        };
        MoiveScene.prototype.charDandaoPlaySkill = function ($charVo, $skiltab, $target, step) {
            var _this = this;
            if (step === void 0) { step = null; }
            if (!$charVo.char._scene.ready) {
                return;
            }
            var scskill = $charVo.skillMap[$skiltab.ID];
            // if (!scskill) {
            //     logerror("caonima");
            // }
            if (scskill.skillfile == "0") {
                return;
            }
            var $skill = this.gameScene.scene.skillMgr.getSkill(getSkillUrl(scskill.skillfile), scskill.effectName, function () {
                logdebug("技能加载完成");
                _this.charDandaoPlaySkill($charVo, $skiltab, $target, step);
            });
            if (!$skill.keyAry) {
                return;
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
                _this.skillComplete($charVo, $skiltab, step);
            });
            this.gameScene.scene.skillMgr.playSkill($skill);
        };
        //使用技能
        MoiveScene.prototype.charPlaySkill = function ($charVo, $skiltab, $step, $skillTargetDot) {
            var _this = this;
            if ($skillTargetDot === void 0) { $skillTargetDot = null; }
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            if (!$charVo.char._scene.ready) {
                return;
            }
            var scskill = $charVo.skillMap[$skiltab.ID];
            // if (!scskill) {
            //     logerror("caonima");
            // }
            if (scskill.skillfile == "0") {
                return;
            }
            var $skill = this.gameScene.scene.skillMgr.getSkill(getSkillUrl(scskill.skillfile), scskill.effectName, function () {
                logdebug("技能加载完成");
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
                _this.skillComplete($charVo, $skiltab, $step);
            }, $skillTargetDot);
            this.gameScene.scene.skillMgr.playSkill($skill);
        };
        //显示场景飘字
        MoiveScene.prototype.showJumpText = function ($scene, $pos, $hp, $type, starttime) {
            var $jumpVo = new tl3d.TextJumpUiVo();
            if ($type == tl3d.TextJumpType.N_NORMALDAMAGE
                || $type == tl3d.TextJumpType.N_CRIT) {
                $jumpVo.str = "-" + $hp;
            }
            else {
                $jumpVo.str = "+" + $hp;
            }
            // $jumpVo.str = String($hp);
            $jumpVo.pos = new tl3d.Vector3D();
            $jumpVo.pos.x = $pos.x + 25;
            $jumpVo.pos.z = $pos.z + 25;
            $jumpVo.pos.y = 30;
            $jumpVo.type = Number($type);
            $jumpVo.starttime = starttime;
            $jumpVo.endtime = starttime + 1200;
            $scene.bloodMgr.setJumpNum($jumpVo);
            // if ($type == Pan3d.TextJumpType.N_RESISTANCE) {
            //     //抵抗后飘伤害
            //     this.showJumpText($scene, $pos, $hp, Pan3d.TextJumpType.N_NORMALDAMAGE, starttime + 300);
            // }
            // if ($type == Pan3d.TextJumpType.N_RESURGENCE) {
            //     //复活
            //     this.showJumpText($scene, $pos, $hp, Pan3d.TextJumpType.N_UPHP, starttime + 300);
            // }
        };
        return MoiveScene;
    }(Laya.Sprite));
    game.MoiveScene = MoiveScene;
})(game || (game = {}));
