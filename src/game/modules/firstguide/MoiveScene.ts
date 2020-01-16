module game {
    export class MoiveScene extends Laya.Sprite {
        private _sceneTransitionUi: Laya.Image;
        private sceneComplete: Function;
        //地下城起始相机角度
        private dxc_initHeadCamparm = [-38, 35, 2000, -399, -333, -500];
        //地下城战斗相机角度
        private dxc_fightCamparm = [-27, -14, 1623, 128, -56, -500];
        //地下城胜利相机结束
        private dxc_victoryCamparm = [-41, 184, 463, 26, 473, 11];
        //地下城小怪失败相机角度
        private dxc_enimyBadCamparm = [-35, 4, 1470, -45, -99, -439];
        //地下城boss失败相机角度
        private dxc_bossBadCamparm = [-27, 4, 1023, -85, 252, 11];
        //大Boss初始化相机角度
        public dxc_initBossCamparm = [-51, 45, 2000, 0, 252, 0];
        //大Boss相机角度
        public dxc_fightBossCamparm = [-20, 0, 1637, 0, 150, 0];
        //dxc普通技能点
        private dxcmyskillDot: tl3d.Vector3D = new tl3d.Vector3D(35, 0, -1162);
        private dxcenemyskillDot: tl3d.Vector3D = new tl3d.Vector3D(34, 0, -883);
        //dxcBoss技能点
        private dxcBossmyskillDot: tl3d.Vector3D = new tl3d.Vector3D(0, 0, -285);
        private dxcBossenemyskillDot: tl3d.Vector3D = new tl3d.Vector3D(-28, 0, 51);

        private myteam = [{ team: 1, hp: 150000, location: 2, tab: tb.TB_god.get_TB_godById(3006), skill: [300670, 300610], scale: 1, name: "托尔",model:3106 }
            , { team: 1, hp: 150000, location: 3, tab: tb.TB_god.get_TB_godById(4003), skill: [400300, 400310], scale: 1, name: "雅典娜",model:4103 }
            , { team: 1, hp: 150000, location: 4, tab: tb.TB_god.get_TB_godById(3001), skill: [300100, 300110], scale: 1, name: "孙悟空",model:3101 }
        ];

        private enemyteam = [{ team: 2, hp: 300000, location: 4, tab: tb.TB_monster.get_TB_monsterById(2200135), skill: [2001200, 2001210], scale: 1.5, name: "尼德霍格",model:20012 }];

        //步骤
        // id:用于分发事件时，告知现在处于哪个步骤 
        // type:1引导 2战斗 3过场 4震屏
        // guideid：引导id,不能重复，递增就行
        // tarType：1对敌方 2：对友方
        // skillid：技能id
        // caster:施法者 target：目标 hpAry：血量飘字 
        // times：飘字分段 timelist：飘字分段比例 可选，如有 需要与times的长度相等 flytimes:受伤害时机 第一次受伤害固定为0，后面的时机都是相对于0来计算。可选，如有需要长度和times一致
        public stepAry = [
            { id: 1, type: 1, guideid: 1 },//引导
            { id: 2, type: 2, tarType: 1, skillid: 2001200, caster: "2_4", target: ["1_2", "1_3", "1_4"], hpAry: [{ id: "1_2", hp: 32041 }, { id: "1_3", hp: 35989 }, { id: "1_4", hp: 36052 }], times: 3 },
            { id: 3, type: 1, guideid: 2 },//引导
            { id: 4, type: 2, guideid: 3, tarType: 1, skillid: 300610, caster: "1_2", target: ["2_4"], hpAry: [{ id: "2_4", hp: 56201 }], times: 1 },
            // { id: 5, type: 1, guideid: 4 },//引导
            { id: 5, type: 2, tarType: 1, skillid: 400310, caster: "1_3", target: ["2_4"], hpAry: [{ id: "2_4", hp: 58652 }], times: 1 },
            // { id: 5, type: 1, guideid: 6 },//引导
            { id: 6, type: 2, tarType: 1, skillid: 300110, caster: "1_4", target: ["2_4"], hpAry: [{ id: "2_4", hp: 68294 }], times: 1 },
            { id: 7, type: 2, tarType: 1, skillid: 2001210, caster: "2_4", target: ["1_2", "1_3", "1_4"], hpAry: [{ id: "1_2", hp: 91209 }, { id: "1_3", hp: 89326 }, { id: "1_4", hp: 88129 }], times: 3 },
            { id: 8, type: 2, guideid: 8, tarType: 1, skillid: 300670, caster: "1_2", target: ["2_4"], hpAry: [{ id: "2_4", hp: 148921 }], times: 6, timelist: [5, 8, 13, 17, 24, 33], flytimes: [0, 16, 33, 58, 94, 134] },
            { id: 9, type: 4, time: 2000, amp: 30 },//震屏
            { id: 10, type: 1, guideid: 9 },//引导
        ];

        private _stepIdx: number;
        constructor() {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.gameScene = new Base3dSceneLayerExt();
            this.gameScene.scene.changeBloodManager(new BloodManagerExt);
            this.addChild(this.gameScene);
            //
            this._sceneTransitionUi = new Laya.Image("preload/black.jpg");
            this._sceneTransitionUi.x = this._sceneTransitionUi.y = 0;
            this._sceneTransitionUi.width = Laya.stage.width;
            this._sceneTransitionUi.height = Laya.stage.height;
            this._sceneTransitionUi.alpha = 0;
            this._sceneTransitionUi.visible = false;
            Laya.stage.addChild(this._sceneTransitionUi);
            this._stepIdx = 0;
        }

        /**
         * 初始化相机角度
         */
        public initCam($parm: Array<number> = null): void {
            let camParm: Array<number>;
            if ($parm) {
                camParm = $parm;
            } else {
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
        }

        public curVo: any;
        public nextStep($stepId) {
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
                    dispatchEvt(new FirstGuideEvent(FirstGuideEvent.GUIDE_START), this.curVo.id);
            } else if (this.curVo.type == 2) {
                //战斗
                if (this.curVo.guideid && this.curVo.guideid > 0)
                    dispatchEvt(new FirstGuideEvent(FirstGuideEvent.GUIDE_START), this.curVo.id);
                this.onFight(this.curVo);
            } else if (this.curVo.type == 3) {
                //过场
                this.hideRolePar();
                this.guochang(this.curVo);
            } else if (this.curVo.type == 4) {
                //震屏
                this.gameScene.scene.skillMgr.shock.clearShock();
                this.gameScene.scene.skillMgr.shock.shock(999999999, this.curVo.amp);
                setTimeout(() => {
                    this.gameScene.scene.skillMgr.shock.shock(3000, 4);
                    // this.sendsucc(this.curVo.id);
                    dispatchEvt(new FirstGuideEvent(FirstGuideEvent.GUIDE_START), this.curVo.id);
                }, this.curVo.time);
            }
        }

        private onFight(step: any) {
            this.setCurRole(step.caster);
            let casterVo: MoiveGodVo = this.roleMap[step.caster];
            //技能cd回合重置
            for (var key in casterVo.skillMap) {
                let skillvo: GodSkillVo = casterVo.skillMap[key];
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
        }

        private _selectEffAry: Array<tl3d.CombineParticle>
        /**
         * 显示技能目标选取箭头特效
         * @param idsary 
         * @return 可选取目标对象集
         */
        public getChar3dPosAry($casting_target: number, $targetlimit: number): Array<MoiveGodVo> {
            this.clearSelectEff();
            let posary: Array<MoiveGodVo> = new Array;
            let mapobj;
            if ($casting_target == 1 || $casting_target == 3) {
                mapobj = this.getMinHpTarget($casting_target, $targetlimit);
            } else {
                mapobj = this.roleMap;
            }
            for (var key in mapobj) {
                let vo: MoiveGodVo = mapobj[key];
                if (vo.hpr > 0) {
                    if ((vo.rotation > 0 && $casting_target < 3) || (vo.rotation == 0 && $casting_target > 2)) {
                        let effscale: number = vo.char.scale;
                        let effpos = new tl3d.Vector3D(vo.pos.x, vo.char.getCharHeight() + 17, vo.pos.z);
                        if (vo.godid == "2_4") {
                            if (vo.tab.ID == 2200135) {
                                effpos.x += 6;
                                effpos.y = effpos.y + 20;
                                effpos.z -= 160;
                            } else {
                                effpos.x -= 12;
                                effpos.y = effpos.y + 20;
                                effpos.z -= 120;
                            }
                        }
                        this.gameScene.addEffect(this, 1000003, effpos, effscale, 10, ($particle) => {
                            this._selectEffAry.push($particle);
                        });
                        posary.push(vo);
                    }
                }
            }
            return posary;
        }

        /**
        * 从targetObj获得血量最低的num个英雄的id
        * @param targetObj 
        * @param num 
        */
        private getMinHpTarget($casting_target: number, $num: number): Object {
            let enemyList: Array<MoiveGodVo> = new Array
            for (var key in this.roleMap) {
                let vo: MoiveGodVo = this.roleMap[key];
                if ((vo.rotation > 0 && $casting_target < 3) || (vo.rotation == 0 && $casting_target > 2)) {
                    enemyList.push(vo);
                }
            }
            let obj: Object = {};
            enemyList.sort(
                function (a: MoiveGodVo, b: MoiveGodVo): number {
                    return a.hpr - b.hpr;
                }
            );
            for (var i = 0; i < $num; i++) {
                if (i >= enemyList.length) {
                    break;
                }
                obj[enemyList[i].godid] = enemyList[i];
            }
            return obj;
        }


        public clearSelectEff() {
            if (!this._selectEffAry) {
                this._selectEffAry = new Array;
            }
            while (this._selectEffAry.length > 0) {
                this.gameScene.removeEffect(this._selectEffAry[0]);
                this._selectEffAry.shift();
            }
        }

        public selectSkill() {
            this.fight(this.curVo);
        }

        private guochang(step: any) {
            this.setTeamRoleAction(tl3d.CharAction.WALK, 0);
            this._sceneTransitionUi.visible = true;
            Laya.Tween.to(this._sceneTransitionUi, { alpha: 1 }, step.time >> 1, null, Laya.Handler.create(this, () => {
                this.refreshEnemy(1, 2);
                this.setTeamRoleAction(tl3d.CharAction.STANAD, 0);
                this.initCam(this.dxc_initBossCamparm);
                Laya.Tween.to(this._sceneTransitionUi, { alpha: 0 }, step.time >> 1, null, Laya.Handler.create(this, () => {
                    this.tweenCam(5, () => {
                        //下一步
                        this.sendsucc(step.id);
                    });
                    this._sceneTransitionUi.visible = false;
                }));
            }));
        }

        private setTeamRoleAction($action: string, $compstate: number) {
            for (var key in this.roleMap) {
                if (this.roleMap[key] && this.roleMap[key]["rotation"] == 0) {
                    var role: MoiveGodVo = this.roleMap[key];
                    role.char.play($action, $compstate, false);
                }
            }
        }

        public initRoles(): void {
            //我方阵容
            let godary = this.myteam;
            godary.forEach(element => {
                this.addBaseRole(element);
            });
        }

        private _curIdx: number
        public refreshEnemy($curIdx: number, $bosstype: number) {
            this._curIdx = $curIdx;
            this._bossType = $bosstype;
            this.refreshEnemyRole();
        }

        private _bossType: number;

        private refreshEnemyRole() {
            //先删除上局残留的敌方角色
            for (var key in this.roleMap) {
                let role: MoiveGodVo = this.roleMap[key]
                if (role) {
                    if (role.rotation > 0) {
                        this.roleMap[key].char.delUIConatiner();
                        delete this.roleMap[key];
                    } else {
                        role.buffAry = [];
                        if (role.char)
                            role.char.buffary = role.buffAry;
                    }
                }
            }

            let monsterAry = this.enemyteam;
            //敌方阵容
            monsterAry.forEach(vo => {
                this.addBaseRole(vo);
            })

            this.setTeamPost();
        }

        private setTeamPost() {
            for (var key in this.roleMap) {
                let god: MoiveGodVo = this.roleMap[key];
                //boss地图特殊处理
                if (this._bossType > 0) {
                    //boss关卡
                    god.pos = god.rotation == 0 ? this._dxcBossMyPosition[god.locad] : this._dxcBossPosition[god.locad];
                } else {
                    //小怪关卡
                    god.pos = god.rotation == 0 ? this._dxcMyPosition[god.locad] : this._dxcEnemyPosition[god.locad];
                }

                god.char.px = god.pos.x;
                god.char.py = god.pos.y;
                god.char.pz = god.pos.z;
            }
        }

        public getRolePos($id: string): tl3d.Vector2D {
            let role: MoiveGodVo = this.roleMap[$id];
            return role.char.math3DWorldtoDisplay2DPos(new tl3d.Vector3D(role.char.px, (role.char.py + role.char.tittleHeight) >> 1, role.char.pz));
        }

        //场景加载完毕
        private mainSceneComplete(): void {
            if (this.sceneComplete) {
                this.sceneComplete();
            }

        }

        public gameScene: Base3dSceneLayerExt;
        public roleMap: Object;    // {godid:MoiveGodVo}

        //地下城中我的角色
        private _dxcMyPosition: Array<tl3d.Vector3D> = [
            new tl3d.Vector3D(87, 0, -1194),//右下
            new tl3d.Vector3D(-22, 0, -1201),//左下
            new tl3d.Vector3D(157, 0, -1105),//第二排右一
            new tl3d.Vector3D(44, 0, -1129),//第二排右中
            new tl3d.Vector3D(-69, 0, -1146)];//第二排右一

        //地下城中小怪的角色
        private _dxcEnemyPosition: Array<tl3d.Vector3D> = [
            new tl3d.Vector3D(-73, 0, -1005),//右下
            new tl3d.Vector3D(93, 0, -829),//左下
            new tl3d.Vector3D(159, 0, -972),//第二排右一
            new tl3d.Vector3D(33, 0, -937),//第二排右中
            new tl3d.Vector3D(43, 0, -887)];//第二排右一

        //地下城中boss站位
        private _dxcBossPosition: Array<tl3d.Vector3D> = [
            new tl3d.Vector3D(-130, 0, -9),//左上
            new tl3d.Vector3D(-73, 0, 209),//右上
            new tl3d.Vector3D(81, 0, 14),//第二排左一
            new tl3d.Vector3D(-73, 0, 209),//第二排左中
            new tl3d.Vector3D(0, 0, 168)];//第二排右一

        //地下城中boss关卡我的站位
        private _dxcBossMyPosition: Array<tl3d.Vector3D> = [
            new tl3d.Vector3D(-75, 0, -250),//左上
            new tl3d.Vector3D(75, 0, -250),//右上
            new tl3d.Vector3D(0, 0, -250),//第二排左一
            new tl3d.Vector3D(-70, 0, -380),//第二排左中
            new tl3d.Vector3D(70, 0, -380),//第二排右一
            new tl3d.Vector3D(113, 0, -350)//第二排右一
            // new tl3d.Vector3D(66, 0, -320),//左上
            // new tl3d.Vector3D(-66, 0, -321),//右上
            // new tl3d.Vector3D(119, 0, -219),//第二排左一
            // new tl3d.Vector3D(0, 0, -250),//第二排左中
            // new tl3d.Vector3D(-113, 0, -246)//第二排右一
        ];

        //添加角色
        private addBaseRole($goddata: any): void {
            let sceneVo: MoiveGodVo = new MoiveGodVo;
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
                let sceneSkill: GodSkillVo = new GodSkillVo;
                sceneSkill.skillid = element;
                let tabskill: tb.TB_skill = tb.TB_skill.get_TB_skillById(element);
                sceneSkill.cd = 0;
                sceneSkill.tabskill1 = tabskill;
                if (tabskill.effect > 0) {
                    let effecttab = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect);
                    sceneSkill.skillfile = String(effecttab.effect_id);
                    sceneSkill.effectName = effecttab.action;
                }
                sceneVo.skillMap[element] = sceneSkill;
            }

            var $baseChar: FightChar = new FightChar();
            this.gameScene.scene.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl(String($goddata.model)));
            $baseChar.scale = $goddata.scale;
            if ($goddata.tab instanceof tb.TB_monster) {
                if ($goddata.tab.type > 0) {
                    //boss血条和buff
                    dispatchEvt(new FirstGuideEvent(FirstGuideEvent.CHANGE_BOSSBLOOD), { vo: 100, type: -300 });
                } else {
                    $baseChar.bloodEnableExt = true;
                    $baseChar.setbloodColor($goddata.team == 1);
                    $baseChar.nameEnable = true;
                    $baseChar.charName = $goddata.name;
                }
            } else {
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
        }

        public getCam3d(): tl3d.Vector3D {
            return new tl3d.Vector3D(this.gameScene.copyCam3d.x, this.gameScene.copyCam3d.y, this.gameScene.copyCam3d.z);
        }

        public downPointTo3d($x: number, $y: number): tl3d.Vector3D {
            var $pos: tl3d.Vector3D = this.gameScene.getGroundPos($x, $y);
            return $pos;
        }

        //进入游戏场景
        private _curmapid: string;
        public enterScene(mapid: string, comolete: Function): void {
            this._curmapid = mapid;
            this.sceneComplete = comolete;
            // //需要保证在逻辑层先分发INIT_MONSTER_EVENT事件
            // this.refreshEnemyRole();
            this.gameScene.scene.loadScene(mapid, () => { }, (num: number) => {
                if (num >= 1) {
                    return;
                }
                UIMgr.getInstance().loadingProcess(0.8 + num * 0.2);
            }, this.mainSceneComplete.bind(this));
        }

        /**
         * 相机动画切换
         * @param camParm 
         */
        public tweenCam(type: number, $cb: Function = null): void {
            let camParm;
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
            Laya.Tween.to(this.gameScene, { camPositionZ: camParm[5] }, 1000, null, Handler.create(this, () => {
                if ($cb) {
                    $cb();
                }
            }));
        }

        /**
         * 退出场景
         */
        public exitScene(): void {
            TimeUtil.removeAllTickOut();
            this.roleMap = null;
            this.clearSelectEff();
            this.gameScene.onExit();
        }

        private _lastRolePar: tl3d.CombineParticle;

        public setCurRole($id) {
            let curRole: MoiveGodVo = this.roleMap[$id]
            this.hideRolePar();
            this.gameScene.addEffect(this, 888888, curRole.pos, curRole.godid == "2_4" ? 2.5 : curRole.char.scale, 5, ($particle) => {
                this._lastRolePar = $particle;
            });
        }

        private hideRolePar() {
            if (this._lastRolePar) {
                this.gameScene.removeEffect(this._lastRolePar);
                this._lastRolePar = null;
            }
        }

        private flytext(step: any) {
            for (var i = 0; i < step.hpAry.length; i++) {
                let itemVo = step.hpAry[i];
                let role: MoiveGodVo = this.roleMap[itemVo.id];
                if (role) {
                    let jumptype: number = tl3d.TextJumpType.N_NORMALDAMAGE;
                    if (step.tarType == 1) {
                        jumptype = Math.random() < 0.5 ? tl3d.TextJumpType.N_NORMALDAMAGE : tl3d.TextJumpType.N_CRIT;
                    } else {
                        jumptype = tl3d.TextJumpType.N_UPHP;
                    }

                    //振屏
                    if (jumptype == tl3d.TextJumpType.N_CRIT) {
                        this.gameScene.scene.skillMgr.shock.shock(300, 10);
                    }

                    if (step.tarType == 2) {
                        //加血
                        // this.gameScene.addEffect(this, 1024, role.pos, 2, 10, () => {
                        setTimeout(() => {
                            role.setHp(itemVo.hp, step.tarType);
                            this.showJumpText(this.gameScene.scene, new tl3d.Vector3D(role.char.px, role.char.py, role.char.pz), itemVo.hp, jumptype, tl3d.TimeUtil.getTimer(this.gameScene.scene.startTime));
                        }, 300);
                        // });
                    } else {
                        //同步分段伤害的不同出处
                        let curtime: number = tl3d.TimeUtil.getTimer(tl3d.TimeUtil.START_TIME);
                        if (step.times > 1) {
                            //注：step.times 和 step.timelist.length要对应
                            //有分段
                            let t = step.times;
                            //分段系数
                            let tlist = step.timelist || [];
                            if (tlist.length == 0) {
                                let temp = Math.floor(100 / t);
                                for (var x = 0; x < t; x++) {
                                    if (x == t - 1) {
                                        tlist.push(100 - ((t - 1) * temp));
                                    } else {
                                        tlist.push(temp);
                                    }
                                }
                            }
                            let totalHp: number = 0;
                            for (var w = 0; w < t; w++) {
                                let num = 0;
                                if (w == t - 1) {
                                    num = itemVo.hp - totalHp;
                                } else {
                                    num = tlist[w] / 100 * itemVo.hp;
                                }
                                num = Math.floor(num);
                                totalHp += num;

                                let ts = step.flytimes ? frame2time(step.flytimes[w]) : w * 300;
                                ts = ts / (this.gameScene.timespeed1 + 1);
                                let statime = curtime + ts;
                                this.showJumpText(this.gameScene.scene, new tl3d.Vector3D(role.char.px, role.char.py, role.char.pz), num, jumptype, statime);
                                // this.playInjured1(role);
                                if (ts == 0) {
                                    role.setHp(num, step.tarType);
                                    this.playInjured1(role);
                                } else {
                                    tl3d.TimeUtil.addTimeOut(ts, () => {
                                        role.setHp(num, step.tarType);
                                        this.playInjured1(role);
                                    });
                                }
                            }
                        } else {
                            //没分段
                            role.setHp(itemVo.hp, step.tarType);
                            this.showJumpText(this.gameScene.scene, new tl3d.Vector3D(role.char.px, role.char.py, role.char.pz), itemVo.hp, jumptype, curtime);
                            this.playInjured1(role);
                        }
                    }
                }
            }
        }

        /**
         * 播放受击动作
         * @param efftab 
         * @param step 
         */
        private playInjured1(role: MoiveGodVo) {
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


        }

        private roleDeath(char: FightChar) {
            // TimeUtil.addTimeOut(500, () => {
            //     char.play(Pan3d.CharAction.DEATH, 1, false);
            // });
            // TimeUtil.addTimeOut(1500, () => {
            //     //死亡时，将这个角色对象移除
            //     if (char)
            //         this.gameScene.scene.removeMovieDisplay(char);
            // });
        }

        private fight(step: any) {
            //{ id: 2, type: 2, tarType: 1, skillid: 400410, caster: "1_0", target: ["2_0", "2_2", "2_4"], hpAry: [{ id: "2_0", hp: 25222 }, { id: "2_2", hp: 28598 }, { id: "2_4", hp: 27882 }] },
            let _tbskillobj: tb.TB_skill = tb.TB_skill.get_TB_skillById(step.skillid);
            if (!_tbskillobj) {
                this.sendsucc(step.id);
                return;
            }
            //延长时间
            let time: number = 0;
            let efftab = tb.TB_skill_effect.get_TB_skill_effectById(_tbskillobj.effect);
            if (efftab && efftab.frame && efftab.frame.length > 0) {
                time = frame2time(efftab.frame[1]);
            }
            let casterRole: MoiveGodVo = this.roleMap[step.caster];
            //技能cd
            let scskill: GodSkillVo = casterRole.skillMap[step.skillid];
            scskill.cd = 0;

            if (efftab && efftab.att_type == 1) {
                //近战 只会有一个目标
                time += 500
                this.jinzhan(step, casterRole, _tbskillobj);
            } else if (efftab && efftab.att_type == 2) {
                //远攻 攻击几个，就有几个目标
                this.yuancheng(efftab, step, casterRole, _tbskillobj);
            }

            //播放被击打效果
            TimeUtil.addTimeOut(time / (this.gameScene.timespeed1 + 1), () => {
                this.flytext(step);
            });
        }


        /**
         * 播放受击动作
         * @param efftab 
         * @param step 
         */
        private playInjured(efftab: tb.TB_skill_effect, step: any) {
            //受击动作多次
            if (efftab && efftab.frame && efftab.frame.length > 1) {
                for (var t = 1; t < efftab.frame.length; t++) {
                    var element = efftab.frame[t];
                    let injuredtime: number = efftab.att_type == 1 ? (500 + frame2time(efftab.frame[t])) : frame2time(efftab.frame[t]);
                    injuredtime = injuredtime / (this.gameScene.timespeed1 + 1);
                    TimeUtil.addTimeOut(injuredtime, () => {
                        for (var i = 0; i < step.target.length; i++) {
                            let role: MoiveGodVo = this.roleMap[step.target[i]];
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
        }

        private jinzhan(step: any, casterRole: MoiveGodVo, _tbskillobj) {
            let targetVo: MoiveGodVo = this.roleMap[step.target[0]];
            let targChar = targetVo.char;
            casterRole.char.watch(targChar);
            casterRole.char.play(tl3d.CharAction.WALK, 2, false);
            //法线延长线坐标
            var dis: number = tl3d.Vector3D.distance(targetVo.pos, casterRole.pos);
            var normalV3: tl3d.Vector3D = targetVo.pos.subtract(casterRole.pos);
            normalV3.normalize();
            normalV3.scaleBy(dis * 0.6);
            var $c3d: tl3d.Vector3D = casterRole.pos.add(normalV3);
            let time = 500 / (this.gameScene.timespeed1 + 1);
            Laya.Tween.to(casterRole.char, { "px": $c3d.x, "pz": $c3d.z }, time, null,
                Laya.Handler.create(this, ($handlerChar, $skitab) => {
                    this.charPlaySkill($handlerChar, $skitab, step);
                }, [casterRole, _tbskillobj]));
        }

        private yuancheng(efftab, step: any, casterRole, _tbskillobj) {

            if (efftab.ballistic == 1) {
                //弹道类型
                let targetRoleList: Array<MoiveGodVo> = this.getTargetRoleList(step.target);
                for (var i = 0; i < targetRoleList.length; i++) {
                    let len: number = i + 1;
                    if (len == targetRoleList.length)
                        casterRole.char.watch(targetRoleList[i].char);
                    this.charDandaoPlaySkill(casterRole, _tbskillobj, targetRoleList[i], len == targetRoleList.length ? step : null);
                }
            } else {
                let dot: tl3d.Vector3D
                //boss地图特殊处理
                if (this._bossType > 0) {
                    //boss关卡
                    dot = casterRole.rotation == 0 ? this.dxcBossenemyskillDot : this.dxcBossmyskillDot;
                } else {
                    //小怪关卡
                    dot = casterRole.rotation == 0 ? this.dxcenemyskillDot : this.dxcmyskillDot;
                }

                let ary = (efftab.ballistic == 3 || efftab.ballistic == 0) ? null : [dot];
                if (efftab.ballistic == 3) {
                    this.watchPoint(dot, casterRole.char);
                }
                this.charPlaySkill(casterRole, _tbskillobj, step, ary);
            }
        }

        private getTargetRoleList($targetIdAry: Array<string>): Array<MoiveGodVo> {
            let rolelist: Array<MoiveGodVo> = new Array
            for (var i = 0; $targetIdAry && i < $targetIdAry.length; i++) {
                rolelist.push(this.roleMap[$targetIdAry[i]]);
            }
            return rolelist;
        }

        /**
         * 角色 转向 到某个点
         * @param obj 
         * @param char 
         */
        private watchPoint($obj: tl3d.Vector3D, char: FightChar): void {
            var xx: number = $obj.x - char.px;
            var yy: number = $obj.z - char.pz;
            var distance: number = Math.sqrt(xx * xx + yy * yy);
            xx /= distance;
            yy /= distance;
            var angle: number = Math.asin(xx) / Math.PI * 180;
            if (yy <= 0) {
                angle = 180 - angle;
            }
            if (!isNaN(angle)) {
                char.forceRotationY = angle
            }
        }

        /**
         * 技能播放结束回调
         */
        private skillComplete($charVo: MoiveGodVo, $skiltab: tb.TB_skill, $step: any) {
            if (!this.roleMap) return;
            for (var i = 0; i < $step.target.length; i++) {
                let role: MoiveGodVo = this.roleMap[$step.target[i]];
                if (role && role.hpr <= 0) {
                    this.roleDeath(role.char);
                }
            }
            TimeUtil.addTimeOut(300, () => {
                let efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
                if (efftab.att_type == 1) {
                    $charVo.char.rotationY += 180;
                    $charVo.char.play(tl3d.CharAction.WALK, 2, false);
                    let time = 500 / (this.gameScene.timespeed1 + 1);
                    Laya.Tween.to($charVo.char, { "px": $charVo.pos.x, "pz": $charVo.pos.z }, time, null, Laya.Handler.create(this, () => {
                        $charVo.char.rotationY = $charVo.rotation;
                        this.sendsucc($step.id);
                    }));
                } else {
                    $charVo.char.rotationY = $charVo.rotation;
                    this.sendsucc($step.id);
                }
            });
        }

        private sendsucc(id: number) {
            // setTimeout(() => {
            dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), id);
            // }, 1000);
        }

        private charDandaoPlaySkill($charVo: MoiveGodVo, $skiltab: tb.TB_skill, $target: MoiveGodVo, step: any = null) {
            if (!$charVo.char._scene.ready) {
                return;
            }

            let scskill: GodSkillVo = $charVo.skillMap[$skiltab.ID];
            // if (!scskill) {
            //     logerror("caonima");
            // }
            if (scskill.skillfile == "0") {
                return;
            }
            var $skill: tl3d.Skill = this.gameScene.scene.skillMgr.getSkill(getSkillUrl(scskill.skillfile), scskill.effectName, () => {
                logdebug("技能加载完成");
                this.charDandaoPlaySkill($charVo, $skiltab, $target, step);
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
            $skill.configTrajectory($charVo.char, $target.char, step == null ? null : () => {
                this.skillComplete($charVo, $skiltab, step);
            });
            this.gameScene.scene.skillMgr.playSkill($skill)
        }

        //使用技能
        private charPlaySkill($charVo: MoiveGodVo, $skiltab: tb.TB_skill, $step: any, $skillTargetDot: Array<tl3d.Vector3D> = null): void {
            let efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            if (!$charVo.char._scene.ready) {
                return;
            }

            let scskill: GodSkillVo = $charVo.skillMap[$skiltab.ID];
            // if (!scskill) {
            //     logerror("caonima");
            // }
            if (scskill.skillfile == "0") {
                return;
            }

            var $skill: tl3d.Skill = this.gameScene.scene.skillMgr.getSkill(getSkillUrl(scskill.skillfile), scskill.effectName, () => {
                logdebug("技能加载完成");
                this.charPlaySkill($charVo, $skiltab, $step, $skillTargetDot);
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
            $skill.configFixEffect($charVo.char, () => {
                this.skillComplete($charVo, $skiltab, $step);
            }, $skillTargetDot);
            this.gameScene.scene.skillMgr.playSkill($skill);
        }

        //显示场景飘字
        public showJumpText($scene: tl3d.SceneManager, $pos: tl3d.Vector3D, $hp: number, $type: number, starttime: number): void {
            var $jumpVo: tl3d.TextJumpUiVo = new tl3d.TextJumpUiVo()
            if ($type == tl3d.TextJumpType.N_NORMALDAMAGE
                || $type == tl3d.TextJumpType.N_CRIT) {
                $jumpVo.str = "-" + $hp;
            } else {
                $jumpVo.str = "+" + $hp;
            }
            // $jumpVo.str = String($hp);
            $jumpVo.pos = new tl3d.Vector3D();
            $jumpVo.pos.x = $pos.x + 25
            $jumpVo.pos.z = $pos.z + 25
            $jumpVo.pos.y = 30
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
        }
    }
}