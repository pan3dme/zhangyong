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
/**
* name
*/
var game;
(function (game) {
    var GuajiScene = /** @class */ (function (_super) {
        __extends(GuajiScene, _super);
        function GuajiScene() {
            var _this = _super.call(this) || this;
            /** UI特效显示场景 */
            // public ui2dScene: Base2dSceneLayer;
            /**英雄列表 */
            // private _cachePlayerGuid: Object;
            // public players: Array<GameUIChar>;
            /**怪物列表 */
            // public monsters: Array<GameUIChar>;
            //技能播放完成标志位
            // public attacksucc: boolean = false;
            /**场景是否可见 */
            _this._sceneEabled = false;
            _this._model = game.GuajiModel.getInstance();
            //我的信息
            _this.myInfo = [
                { stapx: -50, px: 250, py: 650, pr: 90, showBar: false },
                { stapx: -50, px: 250, py: 850, pr: 90, showBar: false },
                { stapx: -200, px: 100, py: 600, pr: 90, showBar: false },
                { stapx: -200, px: 100, py: 700, pr: 90, showBar: false },
                { stapx: -200, px: 100, py: 800, pr: 90, showBar: false },
                { stapx: -200, px: 100, py: 900, pr: 90, showBar: false },
            ];
            //怪物信息
            _this.enimyInfo = [
                { stapx: 762, px: 462, py: 650, pr: 250, showBar: true },
                { stapx: 762, px: 462, py: 850, pr: 250, showBar: true },
                { stapx: 912, px: 612, py: 600, pr: 250, showBar: true },
                { stapx: 912, px: 612, py: 700, pr: 250, showBar: true },
                { stapx: 912, px: 612, py: 800, pr: 250, showBar: true },
                { stapx: 912, px: 612, py: 900, pr: 250, showBar: true },
            ];
            //boss怪物信息
            _this.bossenimyInfo = [
                { stapx: 740, px: 440, py: 650, pr: 250, showBar: true },
                { stapx: 740, px: 440, py: 935, pr: 250, showBar: true },
                { stapx: 740, px: 440, py: 850, pr: 250, showBar: true },
                { stapx: 740, px: 612, py: 980, pr: 250, showBar: true },
                { stapx: 912, px: 612, py: 800, pr: 250, showBar: true },
                { stapx: 912, px: 612, py: 1020, pr: 250, showBar: true },
            ];
            //神器站位
            _this.shenqiInfo = [
                { px: 175, py: 840 },
                { px: 537, py: 840 },
            ];
            //boss信息
            _this.skillPoint_atk = new tl3d.Vector3D(88, 0, -594);
            _this.skillPoint_def = new tl3d.Vector3D(268, 0, -594);
            _this._inited = false;
            _this._attacksucc = false;
            _this.rewardobj = { 1: 10, 6: 10 };
            _this.lastTalkTime = 0;
            _this._attackIndex = 0;
            _this._fightspeed = 0.6;
            _this._guajispeed = 0.25;
            //技能回调标记位
            // private _skilltag: boolean
            //时间回调标记位
            // private _actiontag: boolean
            //攻击连接延迟
            _this.ATTACK_DELAY = 300;
            _this.REMOTE_DELAY = 500;
            // private stopGuajiSkill() {
            // 	if (this._guajiskill) {
            // 		this._guajiskill.removeSkillForce();
            // 		this._guajiskill = null;
            // 		clearTimeout(this.timetick);
            // 	}
            // 	if (this._curskill) {
            // 		//技能的完成包含两部分，一是技能自身回调 ，二是技能表配置的技能时间上限
            // 		clearTimeout(this._actiontick);
            // 		this._actiontag = true;
            // 		this._curskill.removeSkillForce();
            // 	}
            // }
            //========================================= 帧事件 ======================================================
            _this._loginindex = 0;
            _this.x = 0;
            _this.y = 784;
            _this.uiScene = new Base2dSceneLayer();
            _this.uiScene.scene.changeBloodManager(new BloodManagerExt);
            // this.ui2dScene = new Base2dSceneLayer();
            // this.ui2dScene.scene.changeBloodManager(new BloodManagerExt);
            // this.players = new Array<GameUIChar>();
            _this._cachePlayerGuid = {};
            _this._cacheMonsterGuid = {};
            // this.monsters = new Array<GameUIChar>();
            _this.uiScene.setPos(Launch.offsetX, Launch.offsetY + game.GuajiView.OffY);
            return _this;
            // this.ui2dScene.setPos(Launch.offsetX, Launch.offsetY + GuajiView.OffY);
        }
        /**
         * 初始化场景
         */
        GuajiScene.prototype.initScene = function () {
            if (!this._inited) {
                this._inited = true;
                // this.createGods();
                // this._model.isRefresh = false;
            }
        };
        GuajiScene.prototype.refreshRole = function () {
            // if(this._model.isRefresh){
            // 	this._model.isRefresh = false;
            this.createGods();
            // }
        };
        GuajiScene.prototype.playEff = function (effid, posx, posy, scale) {
            var _this = this;
            // Pan3d.CombineParticle
            if (!this._particleObj)
                this._particleObj = {};
            if (this._particleObj.hasOwnProperty(effid))
                return;
            this.uiScene.addEffect(this, effid, new tl3d.Vector3D(posx, 0, posy), scale, 30, function ($particle) {
                if (_this._particleObj.hasOwnProperty(effid)) {
                    _this.uiScene.removeEffect($particle);
                    return;
                }
                _this._particleObj[effid] = $particle;
            });
        };
        GuajiScene.prototype.removeEff = function (effid) {
            if (this._particleObj && this._particleObj.hasOwnProperty(effid)) {
                this.uiScene.removeEffect(this._particleObj[effid]);
                delete this._particleObj[effid];
            }
        };
        GuajiScene.prototype.tickGuaji = function () {
            if (!this.sceneEabled)
                return;
            if (game.FightView.chkCam) {
                return;
            }
            this.loopAttack();
        };
        /**
         * 创建出战英雄
         */
        GuajiScene.prototype.createGods = function () {
            // this.uiScene.timespeed1 = 0;
            this.uiScene.timespeed1 = this._guajispeed;
            //获得上阵阵容
            var godlist = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack, true);
            // let godlist: Array<GodItemVo> = App.hero.getTestTeam();
            //先创建在删除
            var locationInfo = null;
            //创建出战英雄
            for (var i = 0, len = godlist.length; i < len; i++) {
                var god = godlist[i];
                if (god) {
                    locationInfo = this.myInfo[i];
                    var stepVo = { objId: i + 11, atkSpd: 100, level: god.level, hpMax: 300, hp: 300, objType: battle.BatteConsts.BATTLE_CAMPATK };
                    var oldGod = this._cachePlayerGuid[String(god.uuid + "_" + god.skinId)];
                    if (oldGod) {
                        //如果原来就在，重新设置属性就好
                        // logyhj("原来就在", oldGod);
                        this.setRoleAttr(stepVo, oldGod, locationInfo);
                    }
                    else {
                        oldGod = this.addBaseRole(god.uuid, god.templateId, god.skinId, stepVo.objType, 6, 10);
                        this.setRoleAttr(stepVo, oldGod, locationInfo);
                        // logyhj("添加：", oldGod);
                    }
                    oldGod.isFight = false;
                    this.resetSkill(oldGod.tab.skill, stepVo.objType, 6, 10, oldGod);
                    oldGod.char.scale = 0.9;
                    oldGod.char.shadow = true;
                    oldGod.char.setShadowSize(6);
                    oldGod.onDead = this.removeMonster.bind(this);
                    //初始化血量
                    oldGod.guajiMaxHp = stepVo.hpMax;
                    oldGod.guajihp = stepVo.hp;
                    // oldGod.initCharBlood(false);
                    oldGod.setCharVisable(true);
                }
            }
            //从cache中删除已替换的
            this.clearModel(godlist, this._cachePlayerGuid);
            this.changeState(tl3d.CharAction.WALK, tl3d.CharAction.ATTACK_01);
        };
        GuajiScene.prototype.setRoleAttr = function (goddata, sceneRole, infovo) {
            sceneRole.objId = goddata.objId;
            sceneRole.locad = goddata.objId % 10 - 1;
            sceneRole.team = Math.floor(goddata.objId / 10);
            // let infovo = goddata.objType == battle.BatteConsts.BATTLE_CAMPATK ? this.myInfo[sceneRole.locad] : this.enimyInfo[sceneRole.locad];
            // let infovo = goddata.objType == battle.BatteConsts.BATTLE_CAMPATK ? this.myInfo[sceneRole.locad] : sceneRole.tab.type && sceneRole.tab.type != 0?this.bossEnimyInfo:this.enimyInfo[sceneRole.locad];
            if (!infovo || !infovo.pr) {
                logfight("ss");
            }
            sceneRole.rotation = infovo.pr;
            sceneRole.atkSpd = goddata.atkSpd;
            sceneRole.lev = goddata.level;
            sceneRole.atkBar = -1;
            // let pos2d = sceneRole.char.get2dPos();
            // if (pos2d.x != infovo.px || pos2d.y != infovo.py) {
            // 	sceneRole.char.set2dPos(infovo.px, infovo.py);  //坐标
            // }
            sceneRole.char.set2dPos(infovo.px, infovo.py); //坐标
            sceneRole.pos2d = new tl3d.Vector2D(infovo.px, infovo.py);
            sceneRole.pos = new tl3d.Vector3D(sceneRole.char.px, sceneRole.char.py, sceneRole.char.pz);
            sceneRole.buffAry = [];
            sceneRole.char.rotationY = sceneRole.rotation;
        };
        /**
         * 清理当前怪物
         */
        // public clearMonster(): void {
        // 	while (this.monsters.length) {
        // 		let monster: GameUIChar = this.monsters.pop();
        // 		Laya.Tween.clearAll(monster);
        // 		monster.removeSelf();
        // 	}
        // 	this.monsters.length = 0;
        // }
        //下一关
        GuajiScene.prototype.nextGuanqia = function (guanqia) {
            //强制下一关
            this._model.moveState = true;
            // this._moveSucc = false;
            this.attacksucc = false;
            // if (isMove) {
            // 	this.startMove(guanqia);
            // } else {
            this.creatGuanqiaData(guanqia);
            // }
        };
        // private _starTimeout: number;
        // private _stopTimeout: number = 0;
        // private _moveSucc: boolean = false;
        GuajiScene.prototype.getMonsterIds = function (monsterTemps) {
            var atklen = [];
            var taglineUp = App.hero.lineupInfo[iface.tb_prop.lineupTypeKey.attack];
            for (var key in taglineUp) {
                if (taglineUp[key]) {
                    atklen.push(key);
                }
            }
            var deflen = [];
            for (var defid in monsterTemps) {
                var def = monsterTemps[defid];
                if (def && def.type == 0) {
                    deflen.push(def);
                }
            }
            var rand = utils.random(1, 2);
            var radNums = getRandomNumAssgin(rand, 0, atklen.length);
            var tagAry = getRandomNumAssgin(radNums.length, 0, deflen.length);
            var resetObj = [];
            //组装
            for (var i = 0; i < tagAry.length; i++) {
                resetObj.push({ idx: Number(atklen[radNums[i]]), tag: deflen[tagAry[i]] });
            }
            return resetObj;
        };
        /**
         * 创建关卡数据
         */
        GuajiScene.prototype.creatGuanqiaData = function (guanqia) {
            var _this = this;
            if (this._model.isFight)
                return;
            var copyinfo = guanqia.tbCopyInfo;
            var monsterTemps = copyinfo.getAllMonsters();
            if (monsterTemps.length <= 0)
                return;
            var obj = this.getMonsterIds(monsterTemps);
            var _loop_1 = function (k) {
                var index = obj[k].idx;
                var item = obj[k].tag;
                if (item == null)
                    return "continue";
                // if (item.type == 2) continue;//大boss不要
                // let infovo = copyinfo.boss_icon != 0 ? this.bossenimyInfo[index] : this.enimyInfo[index];
                var infovo = this_1.enimyInfo[index];
                var stepVo = { objId: 21 + index, atkSpd: 100, level: item.level, hpMax: 300, hp: 300, objType: battle.BatteConsts.BATTLE_CAMPDEF };
                var uuid = item.ID + "_0";
                var oldGod = this_1._cacheMonsterGuid[String(uuid)];
                if (oldGod) {
                    //如果原来就在，重新设置属性就好
                    // logyhj("原来就在", oldGod);
                    this_1.setRoleAttr(stepVo, oldGod, infovo);
                }
                else {
                    oldGod = this_1.addBaseRole(String(item.ID), item.ID, 0, stepVo.objType, 6, 10);
                    this_1.setRoleAttr(stepVo, oldGod, infovo);
                    // logyhj("添加：", oldGod);
                }
                oldGod.isFight = false;
                this_1.resetSkill(oldGod.tab.skill, stepVo.objType, 6, 10, oldGod);
                oldGod.char.scale = item.model_multiple * 0.9;
                oldGod.char.shadow = true;
                oldGod.char.setShadowSize(6 * item.model_multiple);
                //初始化血量
                oldGod.guajiMaxHp = oldGod.tab.type != 0 ? 200 : 100;
                oldGod.guajihp = oldGod.tab.type != 0 ? 200 : 100;
                oldGod.onDead = this_1.removeMonster.bind(this_1);
                // oldGod.initCharBlood(false);
                // logyhj("----------------------设置可见--------------------",oldGod.objId);
                oldGod.setCharVisable(true);
                //是否移动
                // if (isMove) {
                var atklocal = this_1.myInfo[index];
                var atkhero = this_1.getAtkHero(index);
                oldGod.actiontag = false;
                this_1.charMove(oldGod, new tl3d.Vector2D(infovo.stapx, infovo.py), new tl3d.Vector2D(atklocal.px + 100, infovo.py), 3, null);
                // } else {
                // 	oldGod.movesucc = true;
                // }
                oldGod.char.play(tl3d.CharAction.WALK);
                oldGod.char.movetocb = function (pixelPos) {
                    if (!oldGod.actiontag && pixelPos.x < atklocal.px + 200) {
                        oldGod.actiontag = true;
                        // atkhero.char.play("m_attack_01", 1, true, () => {
                        // 	atkhero.char.play(tl3d.CharAction.WALK);
                        // });
                        var skillkey = atkhero.tab.fight_skill ? atkhero.tab.fight_skill : 333;
                        _this.charPlaySkill(atkhero, String(skillkey), "skill_04", null, null, 0, function () {
                            atkhero.char.play(tl3d.CharAction.WALK);
                        });
                        // this.changeState(tl3d.CharAction.STANAD, tl3d.CharAction.ATTACK_01);
                        // this._model.moveState = false;
                        setTimeout(function () {
                            if (_this._model.isFight)
                                return;
                            // this._model.moveState = true;
                            _this.atkPlayTag(oldGod);
                            // this.atkPlay(atkhero, tl3d.CharAction.WALK);
                            // this.changeState();
                        }, 300);
                    }
                };
                oldGod.char.moveokcb = function () {
                    // logyhj("============移动完成");
                    oldGod.movesucc = true;
                    // this._model.moveState = false;
                    // this.atkPlay(atkhero, tl3d.CharAction.ATTACK_01);
                };
            };
            var this_1 = this;
            // logyhj("刷出怪物：", obj);
            for (var k = 0; k < obj.length; k++) {
                _loop_1(k);
            }
            var _loop_2 = function () {
                var oldGod = this_2._cacheMonsterGuid[key];
                var findVo = obj.find(function (vo, idx) {
                    return vo && vo.tag && oldGod.uuid == String(vo.tag.ID);
                });
                if (!findVo) {
                    this_2.removePlayer(this_2._cacheMonsterGuid[key]);
                }
            };
            var this_2 = this;
            //从cache中删除已替换的
            for (var key in this._cacheMonsterGuid) {
                _loop_2();
            }
            // if (!isMove) {
            // 	// this._model.moveState = false;
            // 	this.moveSuccFun();
            // }
        };
        GuajiScene.prototype.atkPlay = function (atk, action) {
            if (atk && atk.char && atk.char.curentAction != action) {
                atk.char.play(action);
            }
        };
        GuajiScene.prototype.getAtkHero = function (idx) {
            var findVo = null;
            for (var key in this._cachePlayerGuid) {
                findVo = this._cachePlayerGuid[key];
                if (findVo && findVo.objId == idx + 11) {
                    return findVo;
                }
            }
            return null;
        };
        GuajiScene.prototype.atkPlayTag = function (tag) {
            this.setTagHp(tag, 100);
        };
        /**
         * 出场移动
         * @param uichar 移动对象
         * @param tx 移动目标坐标
         */
        GuajiScene.prototype.charMove = function (uichar, start, tag, speed, moveEndAction) {
            if (moveEndAction === void 0) { moveEndAction = tl3d.CharAction.STANAD; }
            uichar.char.runspeed = speed;
            // logyhj("初始化位置：", start.x, start.y, tag);
            uichar.char.set2dPos(start.x, start.y);
            uichar.char.moveEndAction = moveEndAction;
            uichar.char.moveTopos(tag);
        };
        /**
         * 使用技能攻击目标
         * @param caster 攻击者
         * @param target 受击者
         */
        GuajiScene.prototype.attackTarget = function (caster) {
            var _this = this;
            // logdebug('attackTarget', caster.tab.name);
            if (!caster || !caster.char || caster.guajihp <= 0) {
                this.attacksucc = true;
                return;
            }
            // 我方攻击怪物从第一个开始直至死亡才开始下一个
            var target = caster.team == battle.BatteConsts.BATTLE_CAMPATK ? this.randomMonsters() : this.randomPlayer();
            var skill = caster.getFirstSkill();
            var damge = 100;
            //目标没死
            if (skill && target && target.guajihp > 0) {
                var tabskill = tb.TB_skill.get_TB_skillById(skill.skillid);
                if (!tabskill) {
                    return;
                }
                //每当开始释放有效技能前，都需要将所有的目标重置回原来的位置，移除之前的所有技能
                // this.skillBefore();
                var tabskilleff_1 = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect);
                var time = frame2time(tabskilleff_1.frame[1]);
                if (tabskilleff_1 && tabskilleff_1.att_type == 1) {
                    time += this.ATTACK_DELAY;
                    this.jinzhan(caster, target, function () {
                        _this.playFight(caster, target, tabskilleff_1, 0);
                    });
                }
                else {
                    time += this.REMOTE_DELAY;
                    this.playFight(caster, target, tabskilleff_1, this.REMOTE_DELAY);
                }
                //和技能回调时间做个容错。保证技能回调在设置血量之后执行
                // time = this.getresultTime(Math.min(time, frame2time(tabskilleff.frame[0]) - 100));
                // target.setHp(damge, this.getresultTime(time), ($pos: tl3d.Vector3D) => {
                // 	this.uiScene.addEffect(this, 1029, $pos, 1.5, 0, null, 0, 0, true);
                // });
                this.setHp(damge, this.getresultTime(time), target, tabskilleff_1);
            }
            else {
                this.attacksucc = true;
            }
        };
        GuajiScene.prototype.setHp = function (totaldmg, delay, tag, efftab) {
            var _this = this;
            // logyhj("扣血");
            clearTimeout(this._setHpTick);
            this._setHpTick = setTimeout(function () {
                // logyhj("实际扣血");
                if (efftab.frame.length > 2) {
                    //同步分段伤害的不同出处
                    var tbflag = efftab.damage_section && efftab.damage_section.length == (efftab.frame.length - 1);
                    var t = efftab.frame.length - 1;
                    //基础帧数
                    var initT = efftab.frame[1];
                    var temphp = 0, num_1 = 0;
                    //有分段
                    for (var w = 1; w < efftab.frame.length; w++) {
                        num_1 = 0; //飘字数值
                        if (w == t) {
                            num_1 = totaldmg - temphp;
                        }
                        else {
                            if (tbflag) {
                                num_1 = perc2num(efftab.damage_section[w - 1]) * totaldmg;
                            }
                            else {
                                num_1 = totaldmg / t * utils.random(90, 110) / 100;
                            }
                        }
                        num_1 = Math.floor(num_1);
                        temphp += num_1;
                        var lasttime = _this.getresultTime(frame2time(efftab.frame[w] - initT));
                        setTimeout(function () {
                            _this.setTagHp(tag, num_1);
                        }, lasttime);
                    }
                }
                else {
                    //没分段
                    _this.setTagHp(tag, totaldmg);
                }
            }, delay);
        };
        GuajiScene.prototype.setTagHp = function (tag, num) {
            var _this = this;
            tag.setHp(num, function ($pos) {
                _this.uiScene.addEffect(_this, 1029, $pos, 1.5, 0, null, 0, 0, true);
                setTimeout(function () {
                    _this.uiScene.addEffect(_this, 1029, $pos, 1.5, 0, null, 0, 0, true);
                }, 300);
            });
        };
        // private skillBefore() {
        // 	this.resetGuajiState();
        // 	this.resetRolePos(this._cachePlayerGuid);
        // 	this.resetRolePos(this._cacheMonsterGuid);
        // }
        GuajiScene.prototype.resetRolePos = function (source) {
            for (var atk in source) {
                var charvo = source[atk];
                charvo.char.px = charvo.pos.x;
                charvo.char.py = charvo.pos.y;
                charvo.char.pz = charvo.pos.z;
                charvo.char.forceRotationY = charvo.rotation;
                charvo.char.play(tl3d.CharAction.STANAD, 2, false);
            }
        };
        GuajiScene.prototype.randomPlayer = function () {
            var keyary = Object.keys(this._cachePlayerGuid);
            var key = keyary[random(keyary.length)];
            return this._cachePlayerGuid[key];
        };
        GuajiScene.prototype.randomMonsters = function () {
            var randomlist = new Array;
            for (var key in this._cacheMonsterGuid) {
                var vo = this._cacheMonsterGuid[key];
                if (vo.movesucc && vo.guajihp > 0)
                    randomlist.push(vo);
            }
            return randomlist[random(randomlist.length)];
        };
        GuajiScene.prototype.playFight = function (caster, target, tabskilleff, addtime) {
            var _this = this;
            this.charPlaySkill(caster, String(tabskilleff.effect_id), tabskilleff.action, tabskilleff, target, addtime, function () {
                if (!caster.actiontag || !caster.skilltag)
                    return;
                // logyhj("技能播放完成，回调");
                //技能正常播放结束时
                _this._guajiskill = null;
                if (_this._sceneEabled)
                    _this.skillcb(tabskilleff, caster);
                else
                    _this.attacksucc = true;
            });
        };
        Object.defineProperty(GuajiScene.prototype, "attacksucc", {
            get: function () {
                return this._attacksucc;
            },
            set: function (val) {
                this._attacksucc = val;
            },
            enumerable: true,
            configurable: true
        });
        GuajiScene.prototype.skillcb = function (tabskilleff, caster) {
            if (!caster || !caster.char || !caster.char.visible)
                return;
            // if (tabskilleff && tabskilleff.att_type == 1) {
            // 	caster.char.rotationY += 180;
            // 	caster.char.play(tl3d.CharAction.WALK, 2, false);
            // 	Laya.Tween.to(caster.char, { "px": caster.pos.x, "pz": caster.pos.z }, this.getresultTime(this.ATTACK_DELAY), null, Laya.Handler.create(this, () => {
            // 		this.attacksucc = true;
            // 		if (!caster || !caster.char) return;
            // 		if (this._model.moveState) {
            // 			caster.char.play(tl3d.CharAction.WALK, 2, false);
            // 		} else {
            // 			caster.char.play(tl3d.CharAction.STANAD, 2, false);
            // 		}
            // 		caster.char.rotationY = caster.rotation;
            // 	}));
            // } else {
            this.attacksucc = true;
            // caster.char.rotationY = caster.rotation;
            // }
        };
        /**
         * 因需求 现只需释放普工，所以无需随机技能
         * @deprecated 弃用
         * @param skillData
         */
        GuajiScene.prototype.getRandomSkill = function (skillData) {
            return skillData[random(skillData.length)];
        };
        GuajiScene.prototype.charPlaySkill = function ($char, $skillfile, $skilleff, $tab, $target, addtime, $cb) {
            var _this = this;
            if ($cb === void 0) { $cb = null; }
            if (!this._sceneEabled) { //如果没在这边
                return;
            }
            if (!$char.char || !$char.char._scene.ready) {
                return;
            }
            //如果技能存在，先强制结束
            // this.stopGuajiSkill();
            // logyhj("$skillfile:", $skillfile, $skilleff);
            this._guajiskill = this.uiScene.scene.skillMgr.getSkill(getSkillUrl($skillfile), $skilleff, function () {
                _this.charPlaySkill($char, $skillfile, $skilleff, $tab, $target, addtime, $cb);
            });
            if (!this._guajiskill.keyAry) {
                return;
            }
            if (this._guajiskill) {
                this._guajiskill.reset();
                this._guajiskill.isDeath = false;
            }
            // if (!$target) {
            // 	return;
            // }
            if (!$char || !$char.char.visible) {
                return;
            }
            // $char.actiontag = false;
            // $char.skilltag = false;
            // if ($tab.att_type == 2 && $tab.ballistic == 1) {
            // 	tl3d.PathManager.init();
            // 	this._guajiskill.configTrajectory($char.char, $target.char, () => {
            // 		$char.skilltag = true;
            // 		if ($cb) {
            // 			$cb();
            // 		}
            // 	});
            // } else {
            // let ary = null;
            // if ($tab.att_type == 2 && $tab.ballistic == 2) {
            // 	ary = [$target.pos];
            // }
            // this._guajiskill.configFixEffect($char.char, () => {
            // 	$char.skilltag = true;
            // 	if ($cb) {
            // 		$cb();
            // 	}
            // }, ary);
            // }
            this._guajiskill.configFixEffect($char.char, function () {
                if ($cb) {
                    $cb();
                }
            }, null);
            this._guajiskill.needShock = false;
            this.uiScene.scene.skillMgr.playSkill(this._guajiskill);
            //如果是近战，需要移动回原来的位置
            // if ($tab.att_type == 1) {
            // 	this.backMoveTick = setTimeout(() => {
            // 		this.backMove($char);
            // 	}, this.getresultTime(frame2time($tab.action_frame)));
            // }
            // this.timetick = setTimeout(() => {
            // 	$char.actiontag = true;
            // 	if ($cb) {
            // 		$cb();
            // 	}
            // }, this.getresultTime(addtime));
        };
        GuajiScene.prototype.backMove = function ($charVo) {
            if ($charVo && $charVo.char) {
                $charVo.char.rotationY = $charVo.rotation + 180;
                $charVo.char.play(tl3d.CharAction.WALK, 2, false);
                var time = this.getresultTime(this.ATTACK_DELAY);
                Laya.Tween.to($charVo.char, { "px": $charVo.pos.x, "pz": $charVo.pos.z }, time, null, Laya.Handler.create(this, function () {
                    if (!$charVo || !$charVo.char)
                        return;
                    if ($charVo.char.curentAction != tl3d.CharAction.STANAD)
                        $charVo.char.play(tl3d.CharAction.STANAD);
                    $charVo.char.rotationY = $charVo.rotation;
                }));
            }
        };
        GuajiScene.prototype.jinzhan = function ($char, $target, movecb) {
            $char.char.watch($target.char);
            $char.char.play(tl3d.CharAction.WALK, 2, false);
            //法线延长线坐标
            var dis = tl3d.Vector3D.distance($target.pos, $char.pos);
            var normalV3 = $target.pos.subtract($char.pos);
            normalV3.normalize();
            normalV3.scaleBy(dis * 0.7);
            var $c3d = $char.pos.add(normalV3);
            Laya.Tween.to($char.char, { "px": $c3d.x, "pz": $c3d.z }, this.getresultTime(300), null, Laya.Handler.create(this, function ($handlerChar, $skitab) {
                if (movecb)
                    movecb();
            }));
        };
        /**怪物死亡回调 */
        GuajiScene.prototype.removeMonster = function (par) {
            if (this._cacheMonsterGuid[par[0] + "_" + par[1]]) {
                if (this.sceneEabled) {
                    //掉落
                    var charpos = this._cacheMonsterGuid[par[0] + "_" + par[1]].char.get2dPos();
                    charpos.y += game.GuajiView.OffY / 0.5 - 150;
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.GUAJI_DROP_ITEM, charpos));
                }
                // this.removePlayer(this._cacheMonsterGuid[par[0] + "_" + par[1]]);
            }
            //怪物都被杀光了
            if (!this.hasMonster()) {
                this._talkEnd = false;
                this.guanqiaStep = setTimeout(function () {
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.GUANQIA_STEP_COMPLETE));
                }, 900);
            }
        };
        GuajiScene.prototype.hasMonster = function () {
            for (var key in this._cacheMonsterGuid) {
                if (!this._cacheMonsterGuid[key].dealthComplete) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 移除英雄
         * @param char
         */
        GuajiScene.prototype.removePlayer = function (god) {
            if (!god) {
                return;
            }
            logyhj("移除：", god.uuid);
            var key = String(god.uuid + "_" + god.skinId);
            if (this._cacheMonsterGuid[key]) {
                delete this._cacheMonsterGuid[key];
            }
            if (this._cachePlayerGuid[key]) {
                delete this._cachePlayerGuid[key];
            }
            god.char.shadow = false;
            // this.uiScene.scene.removeMovieDisplay(god.char);
            Laya.Pool.recover("guajicharvo", god);
            // god.onDispose();
            // let index = this.players.indexOf(god);
            // if (index != -1) {
            // 	this.players.splice(index, 1);
            // }
            // let gid = god.guid;
            // if (this._cachePlayerGuid[gid]) {
            // 	delete this._cachePlayerGuid[gid];
            // }
        };
        GuajiScene.prototype.clearGuajiAll = function () {
            // clearInterval(this._runStateTick);
            // this.changeState(tl3d.CharAction.STANAD);
            // clearTimeout(this._starTimeout);
            this.stopGuajiSkill();
            //停止所有正在移动的模型
            this.stopMoveTags(this._cacheMonsterGuid);
            this.stopMoveTags(this._cachePlayerGuid);
            this._model.moveState = false;
            this.stopTween(this._cacheMonsterGuid);
            this.stopTween(this._cachePlayerGuid);
            clearTimeout(this.guanqiaStep);
            this.attacksucc = true;
        };
        GuajiScene.prototype.stopFightSkill = function () {
            if (this._curskill) {
                //技能的完成包含两部分，一是技能自身回调 ，二是技能表配置的技能时间上限
                clearTimeout(this._actiontick);
                this._curskill.removeSkillForce();
            }
        };
        GuajiScene.prototype.stopGuajiSkill = function () {
            clearTimeout(this.backMoveTick);
            if (this._guajiskill) {
                this._guajiskill.removeSkillForce();
                this._guajiskill = null;
            }
            clearTimeout(this.timetick);
        };
        GuajiScene.prototype.stopTween = function (tags) {
            for (var uuid in tags) {
                var monster = tags[uuid];
                Laya.Tween.clearAll(monster.char);
                monster.clearGuajiTick();
                monster.setCharVisable(false);
            }
        };
        GuajiScene.prototype.stopMoveTags = function (tags) {
            for (var uuid in tags) {
                var monster = tags[uuid];
                monster.char.stopMove(monster.pos2d);
                monster.movesucc = true;
            }
        };
        //跑步动作回调
        // private _runStateTick: number;
        /**
         * 开始移动
         */
        GuajiScene.prototype.startMove = function (guanqia) {
            // clearInterval(this._runStateTick);
            // //跑步动作回调
            // this._runStateTick = setInterval(this.changeState.bind(this), 100);
            //走3秒停下来继续干
            // clearTimeout(this._starTimeout);
            // this._starTimeout = setTimeout(() => {
            // 	// this.clearMonster();
            // 	this.creatGuanqiaData(guanqia);
            // }, 2500);
        };
        // public resetGuajiState() {
        // 	this.stopGuajiSkill();
        // 	this.stopGuajiAll();
        // }
        /**
         * 停止所有挂机的模型和时间事件
         */
        // public stopGuajiAll() {
        // 	this._model.moveState = false;
        // 	clearInterval(this._runStateTick);
        // 	clearTimeout(this._starTimeout);
        // }
        GuajiScene.prototype.changeState = function (action, filter) {
            if (action === void 0) { action = tl3d.CharAction.WALK; }
            if (!this._cachePlayerGuid || isEmptyObject(this._cachePlayerGuid))
                return;
            for (var key in this._cachePlayerGuid) {
                var rolevo = this._cachePlayerGuid[key];
                if (rolevo && rolevo.char && rolevo.char.curentAction != action && rolevo.char.curentAction != filter) {
                    // logyhj("播放动作");
                    rolevo.char.play(action);
                }
            }
        };
        /**
         * 停止移动
         */
        GuajiScene.prototype.stopMove = function () {
            // logyhj("移动完成");
            this.uiScene.timespeed1 = this._fightspeed;
            //停止跑动动作
            // clearInterval(this._runStateTick);
            // Laya.timer.clear(this, this.changeState);
            this.changeState(tl3d.CharAction.STANAD);
            //对话判断
            var curTime = Date.now();
            var nextTalkTime = this.lastTalkTime + 10000;
            // if (nextTalkTime < curTime) {
            // 	//随机是否出对话
            // 	let talkFlag: boolean = Math.random() < 0.5;
            // 	if (talkFlag) {
            // 		this.lastTalkTime = curTime;
            // 		this.onTalk();
            // 	} else {
            // 		//攻击
            // 		this.setSortList();
            // 	}
            // } else {
            //攻击
            this.setSortList();
            // }
        };
        GuajiScene.prototype.onTalk = function () {
            var _this = this;
            var moveOkAry = [];
            for (var uuid in this._cacheMonsterGuid) {
                if (this._cacheMonsterGuid[uuid].movesucc) {
                    moveOkAry.push(this._cacheMonsterGuid[uuid]);
                }
            }
            var key = random(moveOkAry.length);
            var target = moveOkAry[key];
            if (!target)
                return;
            var monstertab = tb.TB_monster.get_TB_monsterById(target.templatId);
            var str = tb.TB_model_dialogue.getRandomTalk(monstertab.model);
            if (str == '') {
                logerror("随机对话出错", target.templatId);
            }
            else {
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.PLAYER_TALK_SHOW), { str: str, pos: target.char.get2dPos() });
            }
            clearTimeout(this._talkTick);
            this._talkTick = setTimeout(function () {
                //攻击
                _this.setSortList();
            }, 1500);
        };
        GuajiScene.prototype.loopAttack = function () {
            if (!this._talkEnd || !this.attacksucc)
                return;
            this.attacksucc = false;
            this.attackTarget(this._sortList[this._attackIndex]);
            this._attackIndex++;
            if (this._attackIndex >= this._sortList.length) {
                this._attackIndex = 0;
            }
        };
        GuajiScene.prototype.setSortList = function () {
            this.attacksucc = true;
            this._talkEnd = true;
            this._attackIndex = 0;
            this._sortList = [];
            //攻击队列为相互交错出手
            // let len = Math.max(this.players.length, this.monsters.length);
            // for (let i = 0; i < len; i++) {
            // 	if (this.players.length > i) {
            // 		this._sortList.push(this.players[i]);
            // 	}
            // 	if (this.monsters.length > i) {
            // 		this._sortList.push(this.monsters[i]);
            // 	}
            // }
            //攻击队列改为我放先出手
            for (var atkuuid in this._cachePlayerGuid) {
                this._sortList.push(this._cachePlayerGuid[atkuuid]);
            }
            for (var defuuid in this._cacheMonsterGuid) {
                this._sortList.push(this._cacheMonsterGuid[defuuid]);
            }
        };
        GuajiScene.prototype.moveSuccFun = function () {
            //有一个人敌方移动结束，就完成移动
            for (var key in this._cacheMonsterGuid) {
                var oldGod = this._cacheMonsterGuid[key];
                if (!oldGod.movesucc) {
                    return;
                }
            }
            this.stopMove();
        };
        Object.defineProperty(GuajiScene.prototype, "sceneEabled", {
            // public getPlayerids(): string[] {
            // 	let ids = [];
            // 	for (let gid in this._cachePlayerGuid) {
            // 		ids.push(gid);
            // 	}
            // 	return ids;
            // }
            get: function () {
                return this._sceneEabled;
            },
            set: function (value) {
                this._sceneEabled = value;
                this.attacksucc = false;
            },
            enumerable: true,
            configurable: true
        });
        //进入游戏场景
        GuajiScene.prototype.enterFightScene = function (fightvo, comolete) {
            DialogExt.manager.mouseEnabled = false;
            this.playerInfo = [];
            this.monsterInfo = [];
            this._model.moveState = false;
            // Laya.stage.mouseEnabled = false;
            // logyhj("Laya.stage.mouseEnabled：",Laya.stage.mouseEnabled);
            this._endFlag = false;
            // this.skillBefore();
            this.clearGuajiAll();
            this._showOpenEff = false;
            this._copyVo = fightvo;
            this.sceneComplete = comolete;
            this.stepOverAry = new Array;
            this.roundAry = [];
            this.curRound = null;
        };
        GuajiScene.prototype.endFight = function () {
            var _this = this;
            this._endFlag = true;
            setTimeout(function () {
                // logyhj("完成战斗延迟");
                _this.uiScene.timespeed1 = _this._guajispeed;
                _this.removeAllBuff();
                //移除战斗角色
                _this.removeRole();
                //神器移除
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CLEAR_ARTIFACE));
                //重置标志位
                _this._model.isFight = false;
                _this.doFigthEnd(function () {
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CHANGE_GUAJI_BTN));
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.GUANQIA_STEP_COMPLETE));
                });
            }, 1000);
        };
        GuajiScene.prototype.exitBattleBoss = function () {
            this._copyVo = null;
        };
        GuajiScene.prototype.doFigthEnd = function (cb) {
            if (!this._copyVo)
                return;
            if (this._copyVo.fightPageControl.getResult() == playState.VICTORY) {
                this.victoryFun(cb);
            }
            else {
                this.defeatedFun(cb);
            }
        };
        GuajiScene.prototype.defeatedFun = function (cb) {
            this.exitBattleBoss();
            UIMgr.showUI(UIConst.GuajiDefeated);
            if (cb) {
                cb();
            }
        };
        GuajiScene.prototype.victoryFun = function (cb) {
            var _this = this;
            var oldLv = App.hero.level;
            //符文
            var args = {};
            args[Protocol.game_copy_settleRuneCopy.args.copyId] = this._copyVo.getCopyId();
            PLC.request(Protocol.game_copy_settleRuneCopy, args, function ($data) {
                if (!$data)
                    return;
                // if ($data.hasOwnProperty("lastProgressTime")) {
                // 	App.hero.lastProgressTime = $data.lastProgressTime;
                // 	dispatchEvt(new GuajiEvent(GuajiEvent.CHANGE_GUAJI_BTN));
                // }
                App.hero.updateGuajiData($data);
                _this._model.updatePassGuanqia(_this._copyVo.tab_copy.ID, _this._copyVo.tab_copyinfo.ID);
                _this.exitBattleBoss();
                // 已经在弱引导之中，但不是打boss胜利触发的引导时，不弹胜利框
                var newLv = App.hero.level;
                var isCantShow = game.GuideWeakManager.isExcuting() && newLv <= oldLv;
                if (!isCantShow) {
                    UIMgr.showUI(UIConst.GuajiVictory, { vo: $data });
                }
                if (cb) {
                    cb();
                }
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SHOW_SHOUYI_UP_VIEW));
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.BATTLE_COPY_SUCCESS));
            });
        };
        GuajiScene.prototype.checkTimeOutTag = function () {
            if (!this.stepOverAry) {
                return false;
            }
            //计算一次当前时间
            var curT = Date.now() - 15000;
            for (var i = 0; i < this.stepOverAry.length; i++) {
                var step = this.stepOverAry[i];
                if (step.time < curT) {
                    //15秒超时
                    return true;
                }
            }
            return false;
        };
        GuajiScene.prototype.TickUpdate = function () {
            //回合集
            //外层通过分发回合到这里
            //回合执行完，就通过事件去外部取
            //外部是个管理器
            //如果是播放录像，就直接通过当前波数和回合数，取得下一个回合（需要判断是否需要过场）
            //如果是实时操作，则分发事件到逻辑层取当前回合的报文
            //{0:[],sillid:[]}
            //检测是否有超时的标记
            if (!this._model.startTalkGuide && this.checkTimeOutTag()) {
                var curT = Date.now() - 15000;
                for (var i_1 = 0; i_1 < this.stepOverAry.length; i_1++) {
                    var step = this.stepOverAry[i_1];
                    if (step.time < curT) {
                        //15秒超时
                        var errorStr = String(step.name);
                        this.removeStep(errorStr);
                        BingoSDK.reportError("挂机战斗异常：" + JSON.stringify(errorStr));
                        // throw new Error(errorStr);
                    }
                }
            }
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
                if (this._endFlag)
                    return;
                if (this._model.hasEndTalkGuide) {
                    return;
                }
                logfight("战斗结束");
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.GUAJI_FIGHT_END), this._copyVo.fightPageControl.getResult());
                if (!this._model.hasEndTalkGuide) {
                    this.endFight();
                }
                return;
            }
            if (this.curRound && this.curRound.roundary && this.curRound.roundary.length > 0) {
                var stepItem = this.curRound.roundary.shift();
                for (var i = 0; i < stepItem.length; i++) {
                    var vo = stepItem[i];
                    this.onPlayBefore(vo);
                }
                // let stepList: Array<Array<StepVo>> = this.groupByStep(stepItem);
                // for (var k = 0; k < stepList.length; k++) {
                //     this.objOpt(stepList[k]);
                // }
                return;
            }
            if (this.roundAry && this.roundAry.length > 0) {
                this.curRound = this.roundAry.shift();
            }
            else {
                //获取下一条数据
                this.roundAry = this._copyVo.getNextRound();
            }
        };
        GuajiScene.prototype.onPlayBefore = function (vo, skillId) {
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
        GuajiScene.prototype.getWorldBuff = function (kid) {
            if (this.buffMap && this.buffMap.has(kid)) {
                return this.buffMap.get(kid);
            }
            return null;
        };
        GuajiScene.prototype.getRoleById = function (objid) {
            if (this.roleMap && this.roleMap.has(objid)) {
                return this.roleMap.get(objid);
            }
            return null;
        };
        /**
         * 步骤执行入口
         * @param itemvo 步骤对象
         * @param skillid 是否来自技能
         */
        GuajiScene.prototype.onPlay = function (itemvo, skillid) {
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
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SET_ANGER), itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.trigPasvSkill) {
                this.trigPasvSkill(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.hpMaxChange) {
                this.hpMaxChange(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.roleAngerChange) {
                this.roleAngerChange(itemvo);
            }
            else if (itemvo.type == iface.tb_prop.battleOpTypeKey.nextRound) {
                if (itemvo.round) {
                    logfight("回合：", itemvo.round);
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CHANGE_ROUND), itemvo.round);
                }
                this._curRoleId = itemvo.objId;
                // this.setCurRole();
                // dispatchEvt(new FightsEvent(FightsEvent.SET_ROUND_TEXT), itemvo.round);
            }
        };
        /**
         * 往池子里面放耗时操作标记
         * @param  tagKey
         */
        GuajiScene.prototype.tagStep = function ($tagKey) {
            if (!this.hasTag($tagKey)) {
                this.stepOverAry.push({ name: $tagKey, time: Date.now() });
                if ($tagKey == String(iface.tb_prop.battleOpTypeKey.objInit)) {
                    //objinfo类型的初始化处理
                    if (this.buffMap) {
                        this.removeAllBuff();
                    }
                    else {
                        this.buffMap = new Map;
                    }
                    // this._bossType = 0;
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
                        // dispatchEvt(new FightsEvent(FightsEvent.CLEAR_ARTIFACE));
                    }
                    else {
                        this.artifactMap = new Map;
                    }
                }
            }
        };
        GuajiScene.prototype.hasTag = function ($tagKey) {
            if (!this.stepOverAry) {
                this.stepOverAry = [];
                return false;
            }
            return this.stepOverAry.findIndex(function (vo) {
                return vo.name == $tagKey;
            }) != -1;
        };
        /**
         * 从池子里删除标记
         * @param tagKey
         */
        GuajiScene.prototype.removeStep = function ($tagKey) {
            if (!this.stepOverAry) {
                this.stepOverAry = [];
                return;
            }
            var itemindex = this.stepOverAry.findIndex(function (vo) {
                return vo.name == $tagKey;
            });
            if (itemindex != -1)
                this.stepOverAry.splice(itemindex, 1);
        };
        GuajiScene.prototype.removeRole = function () {
            //不删除角色本身，只清空rolemap
            this.roleMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                if (element) {
                    element.buffAry = [];
                    if (element.char)
                        element.char.buffary = element.buffAry;
                    element.setCharVisable(false);
                }
            });
            this.roleMap.clear();
        };
        GuajiScene.prototype.removeArtifact = function () {
            this.artifactMap.forEach(function (element, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                if (element) {
                    element.buffAry = [];
                    if (element.char)
                        element.char.buffary = element.buffAry;
                    element.onDispose();
                }
            });
            this.artifactMap.clear();
        };
        GuajiScene.prototype.removeAllBuff = function () {
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
        GuajiScene.prototype.removeBuffByOne = function (uuid) {
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
                    this.uiScene.removeEffect(buffvo.particle);
                }
                this.buffMap.delete(uuid);
                logfight("删除buff：", buffvo.uuid, this.buffMap.has(uuid));
                Laya.timer.frameOnce(3, this, this.showBuff);
            }
        };
        GuajiScene.prototype.fight = function (step) {
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
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SET_FIGHT_BLACK_BG), true);
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.PLAY_SKILL_EFF), { name: _tbskillobj.name, icon: casterRole.tab.icon, team: casterRole.team });
            }
            //重置标记位
            casterRole.actiontag = false;
            casterRole.skilltag = false;
            if (efftab.att_type == 1) {
                //近战 只会有一个目标
                time += this.ATTACK_DELAY;
                this.jinzhans(step, casterRole, _tbskillobj);
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
            setTimeout(function () {
                _this.triggerEffect(step);
            }, this.getresultTime(time));
        };
        GuajiScene.prototype.yuancheng = function (efftab, step, casterRole, _tbskillobj, cbtime, speedobj) {
            var _this = this;
            if (efftab.ballistic == 1) {
                //弹道类型
                if (!step.targetIds) {
                    logerror("目标不存在");
                    return;
                }
                var maxlen = step.targetIds.length;
                if (this.sceneEabled) {
                    for (var i = 0; i < maxlen; i++) {
                        var element = this.getRoleById(step.targetIds[i]);
                        if (!element)
                            continue;
                        var len = i + 1;
                        this.charDandaoPlaySkill(casterRole, _tbskillobj, element, len == maxlen ? step : null, speedobj);
                    }
                }
                else {
                    clearTimeout(this._actiontick);
                    setTimeout(function () {
                        casterRole.actiontag = true;
                        casterRole.skilltag = true;
                        _this.skillComplete(casterRole, _tbskillobj, step);
                    }, this.getresultTime((cbtime + speedobj.speednum)));
                }
                if (maxlen > 0) {
                    this._actiontick = setTimeout(function () {
                        casterRole.actiontag = true;
                        _this.skillComplete(casterRole, _tbskillobj, step);
                    }, this.getresultTime(cbtime + speedobj.speednum));
                }
            }
            else if (efftab.ballistic == 0) {
                //给友方加buff的技能 特殊处理回血和复活 无敌
                this.charPlaySkills(casterRole, _tbskillobj, step);
                if (!step.targetIds) {
                    logerror("目标不存在");
                    return;
                }
                // if (_tbskillobj.priority <= 2) {
                // 	if (_tbskillobj.priority == 2 && step.targetIds[0] == casterRole.objId) {
                // 		//守护类
                // 		return;
                // 	}
                // 	this.playEffSkill(step.targetIds, 1017);
                // }
                // if (_tbskillobj.priority == 3) {
                // 	//回血
                // 	this.playEffSkill(step.targetIds, 1024);
                // }
            }
            else {
                var dot = casterRole.rotation == 90 ? this.skillPoint_def : this.skillPoint_atk;
                var ary = (efftab.ballistic == 3 || efftab.ballistic == 0) ? null : [dot];
                if (efftab.ballistic == 3) {
                    casterRole.char.watch(dot);
                }
                this.charPlaySkills(casterRole, _tbskillobj, step, ary);
            }
        };
        //处理特殊技能和特效的关系
        GuajiScene.prototype.playEffSkill = function (targetIds, effid) {
            for (var k = 0; k < targetIds.length; k++) {
                var id = targetIds[k];
                var tag = this.getRoleById(id);
                this.addEffect(effid, tag, 0);
            }
        };
        /**
         * 播放特效
         * @param eff_id
         * @param role 特效播放角色对象
         * @param efflocal 特效播放位置 1 = 头上 其他 = 特效自己控制
         * @param callback
         */
        GuajiScene.prototype.addEffect = function (eff_id, role, efflocal, callback) {
            var modelscale = 1;
            var effscale = 1;
            if (role.tab instanceof tb.TB_monster && role.tab.type > 0) {
                effscale = role.tab.type == 1 ? role.tab.model_multiple : 4;
                modelscale = role.tab.model_multiple;
            }
            var title = role.char.getCharHeight();
            title *= modelscale;
            title += 37;
            if (role.tab instanceof tb.TB_monster) {
                if (role.tab.type == 2) {
                    title += 60;
                }
            }
            var effy = efflocal == 1 ? title : role.char.py;
            this.uiScene.addEffect(this, eff_id, new tl3d.Vector3D(role.char.px, effy, role.char.pz), effscale, 10, function ($particle) {
                $particle.x = role.char.px;
                $particle.z = role.char.pz;
                if (callback) {
                    callback($particle);
                }
            });
        };
        GuajiScene.prototype.jinzhans = function (step, casterRole, _tbskillobj) {
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
            normalV3.scaleBy(dis * 0.7);
            var $c3d = casterRole.pos.add(normalV3);
            var time = this.getresultTime(this.ATTACK_DELAY);
            Laya.timer.callLater(this, this.moveChar, [casterRole, $c3d, time, step, _tbskillobj]);
        };
        GuajiScene.prototype.moveChar = function (casterRole, $c3d, time, step, _tbskillobj) {
            var _this = this;
            //如果不在首页，就不播放跑步缓动
            this.moveUnvisable(casterRole, false);
            this._movecharTween = Laya.Tween.to(casterRole.char, { "px": $c3d.x, "pz": $c3d.z }, time, null, Laya.Handler.create(this, function ($handlerChar, $skitab) {
                clearTimeout(_this._movecharTick);
                _this.charPlaySkills($handlerChar, $skitab, step);
            }, [casterRole, _tbskillobj]));
            //容错，如果关闭至后台，缓动没有执行，就有超时处理
            this._movecharTick = setTimeout(function () {
                Laya.Tween.clear(_this._movecharTween);
                casterRole.char.px = $c3d.x;
                casterRole.char.pz = $c3d.z;
                _this.charPlaySkills(casterRole, _tbskillobj, step);
            }, time + 200);
        };
        /**
         * 移动时，隐藏buff
         */
        GuajiScene.prototype.moveUnvisable = function (role, visible) {
            for (var i = 0; role && i < role.buffAry.length; i++) {
                var buffvo = this.getWorldBuff(role.buffAry[i]);
                if (!buffvo)
                    continue;
                if (buffvo.particle) {
                    buffvo.particle.sceneVisible = visible;
                    if (visible) {
                        buffvo.particle.x = role.char.px;
                        buffvo.particle.z = role.char.pz;
                    }
                }
            }
        };
        GuajiScene.prototype.triggerEffect = function (step) {
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
                            // Pan3d.TimeUtil.addTimeOut(time, () => {
                            // 	this.onPlayBefore(skillstep, step.skillId);
                            // });
                            setTimeout(function () {
                                _this.onPlayBefore(skillstep, step.skillId);
                            }, this.getresultTime(time));
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
        GuajiScene.prototype.artifactInfo = function (itemvo) {
            this.addArtifact(itemvo);
            dispatchEvt(new game.GuajiEvent(game.GuajiEvent.INIT_ARTIFACE), itemvo);
            Laya.timer.frameOnce(2, this, this.artifactInfoCom, [itemvo]);
        };
        GuajiScene.prototype.artifactInfoCom = function (itemvo) {
            this.removeStep(String(itemvo.type));
        };
        GuajiScene.prototype.addArtifact = function (artifactVo) {
            var sceneVo = new game.GuajiCharVo;
            sceneVo.scene = this;
            sceneVo.objId = 1000 + artifactVo.camp;
            sceneVo.locad = 6;
            sceneVo.team = artifactVo.camp;
            sceneVo.rotation = artifactVo.camp == this._copyVo.getCamp() ? 90 : 250;
            //预加载技能 并保存技能对象
            sceneVo.skillMap = new Object;
            var tabskill = tb.TB_skill.get_TB_skillById(artifactVo.skillId);
            var sceneSkill = new GodSkillVo;
            sceneSkill.skillid = artifactVo.skillId;
            if (tabskill.effect > 0) {
                var effecttab = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect);
                sceneSkill.skillfile = String(effecttab.effect_id);
                sceneSkill.effectName = effecttab.action;
            }
            sceneVo.skillMap[tabskill.ID] = sceneSkill;
            sceneVo.templatId = artifactVo.templateId;
            sceneVo.tab = tb.TB_artifact.get_TB_artifactById(sceneVo.templatId);
            var $baseChar = new FightChar();
            $baseChar.setRoleUrl(getRoleUrl(String(sceneVo.tab.model)));
            $baseChar.rotationY = sceneVo.rotation;
            sceneVo.char = $baseChar;
            this.artifactMap.set(artifactVo.camp, sceneVo);
        };
        GuajiScene.prototype.artifactFight = function (step) {
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
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SET_FIGHT_BLACK_BG), true);
                // dispatchEvt(new GuajiEvent(GuajiEvent.PLAY_SKILL_EFF), { name: _tbskillobj.name, icon: casterRole.tab.icon, team: casterRole.team });
            }
            casterRole.actiontag = true;
            casterRole.skilltag = true;
            if (step.camp == battle.BatteConsts.BATTLE_CAMPATK && this.sceneEabled) {
                UIMgr.showUI(UIConst.ShowSkill, {
                    text: _tbskillobj.name, model: casterRole.tab.model, scale: casterRole.tab.location[3] + 2, charx: 180, chary: 1250, effz: -490, cb: function () {
                        _this.onArtifactFight(casterRole, efftab, time, step, _tbskillobj);
                    }
                });
            }
            else {
                this.onArtifactFight(casterRole, efftab, time, step, _tbskillobj);
            }
        };
        GuajiScene.prototype.onArtifactFight = function (casterRole, efftab, time, step, _tbskillobj) {
            var _this = this;
            var aa = casterRole.rotation == 90 ? this.shenqiInfo[0] : this.shenqiInfo[1];
            casterRole.char.set2dPos(aa.px, aa.py);
            this.uiScene.scene.addMovieDisplay(casterRole.char);
            var speedObj = { speednum: 0 };
            if (efftab.att_type == 1) {
                //近战 只会有一个目标
                time += this.ATTACK_DELAY;
                this.jinzhans(step, casterRole, _tbskillobj);
            }
            else if (efftab && efftab.att_type == 2) {
                //远攻 攻击几个，就有几个目标
                // showToast("帧数："+efftab.frame[0]);
                this.yuancheng(efftab, step, casterRole, _tbskillobj, frame2time(efftab.frame[0]), speedObj);
            }
            time += Number(speedObj.speednum);
            //播放被击打效果
            // TimeUtil.addTimeOut(time, () => {
            // 	this.triggerEffect(step);
            // });
            setTimeout(function () {
                _this.triggerEffect(step);
            }, this.getresultTime(time));
        };
        GuajiScene.prototype.getArtifactById = function (camp) {
            if (this.artifactMap && this.artifactMap.has(camp)) {
                return this.artifactMap.get(camp);
            }
            return null;
        };
        GuajiScene.prototype.roleAtkSpdChange = function (itemvo) {
            var role = this.getRoleById(itemvo.objId);
            if (!role) {
                return;
            }
            role.atkSpd = itemvo.atkSpd;
        };
        GuajiScene.prototype.hpchange = function (step, skillid) {
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
        GuajiScene.prototype.flytest = function (step, skillid) {
            var role = this.getRoleById(step.objId);
            if (role) {
                if (iface.tb_prop.flyTextTypeKey.reborn == step.flyTextType) {
                    //播放复活特效
                    this.playEffSkill([step.objId], 1017);
                    //回到起始点
                    role.char.set2dPos(role.pos2d.x, role.pos2d.y);
                }
                if (step.hasOwnProperty("showeff")) {
                    //播放回血特效
                    this.playEffSkill([step.objId], 1024);
                }
                var flyvo = new game.FlyText;
                flyvo.type = this.getFlyType(step.flyTextType, step.value);
                flyvo.value = step.value || 0;
                flyvo.skillid = skillid;
                role.showJumpText(flyvo);
                logfight("飘字：", step.objId, step.flyTextType, step.value);
            }
        };
        /**
         * 行动条变化
         * @param step
         */
        GuajiScene.prototype.changeActionBar = function (step) {
            var role = this.getRoleById(step.objId);
            if (!role)
                return;
            role.atkBar = step.atkBar;
        };
        /**
             * 英雄创建
             */
        GuajiScene.prototype.roleInfo = function (itemvo) {
            var _this = this;
            // this.addBaseRole(itemvo.uuid, itemvo.templateId, itemvo.skinId, itemvo.objType);
            // this.setRoleAttr(stepVo, oldGod, locationInfo);
            var oldGod = null;
            if (itemvo.objType == battle.BatteConsts.BATTLE_CAMPATK) {
                oldGod = this._cachePlayerGuid[String(itemvo.uuid + "_" + itemvo.skinId)];
            }
            else {
                oldGod = this._cacheMonsterGuid[String(itemvo.uuid + "_" + itemvo.skinId)];
            }
            if (!oldGod) {
                oldGod = this.addBaseRole(itemvo.uuid, itemvo.templateId, itemvo.skinId, itemvo.objType, itemvo.degree, itemvo.starLev);
                // logyhj("添加：", oldGod);
            }
            else {
                //如果原来就在，重新设置属性就好
                // logyhj("原来就在", oldGod);
            }
            this.resetSkill(oldGod.tab.skill, itemvo.objType, itemvo.degree, itemvo.starLev, oldGod);
            oldGod.isFight = true;
            oldGod.char.scale = oldGod.tab.model_multiple ? oldGod.tab.model_multiple * 0.9 : 0.9;
            oldGod.char.shadow = true;
            oldGod.char.setShadowSize(6 * oldGod.char.scale);
            var idx = itemvo.objId % 10 - 1;
            var infovo = null;
            if (oldGod.objType == battle.BatteConsts.BATTLE_CAMPATK) {
                infovo = this.myInfo[idx];
            }
            else {
                if (this._copyVo && this._copyVo.tab_copyinfo.boss_icon != 0) {
                    infovo = this.bossenimyInfo[idx];
                }
                else {
                    infovo = this.enimyInfo[idx];
                }
            }
            // let infovo = oldGod.objType == battle.BatteConsts.BATTLE_CAMPATK ? this.myInfo[idx] : this.bossenimyInfo[idx];
            this.setRoleAttr(itemvo, oldGod, infovo);
            oldGod.onDead = this.roleDeath.bind(this);
            //初始化血量
            oldGod.hpMax = itemvo.hpMax;
            oldGod.hp = itemvo.hp;
            // oldGod.initCharBlood(true);
            oldGod.setCharVisable(true);
            // oldGod.char.setAnger(itemvo.anger);
            oldGod.setAnger(itemvo.anger);
            oldGod.char.moveokcb = function () {
                oldGod.movesucc = true;
                _this.fightMoveSuccFun();
            };
            oldGod.char.play(tl3d.CharAction.WALK);
            this.charMove(oldGod, new tl3d.Vector2D(infovo.stapx, infovo.py), new tl3d.Vector2D(infovo.px, infovo.py), 8);
            this.roleMap.set(oldGod.objId, oldGod);
            if (itemvo.objType == battle.BatteConsts.BATTLE_CAMPATK) {
                this.playerInfo.push(oldGod);
            }
            else {
                this.monsterInfo.push(oldGod);
            }
            //加载完后，延迟清理没用模型
            Laya.timer.frameOnce(2, this, this.resetRoleInfo);
        };
        GuajiScene.prototype.resetRoleInfo = function () {
            this.clearModel(this.playerInfo, this._cachePlayerGuid);
            this.clearModel(this.monsterInfo, this._cacheMonsterGuid);
            this.playerInfo = [];
            this.monsterInfo = [];
        };
        GuajiScene.prototype.clearModel = function (godlist, source) {
            //从cache中删除已替换的
            var _loop_3 = function () {
                var oldGod = source[key];
                var findVo = godlist.find(function (vo) {
                    return vo && vo.uuid == oldGod.uuid && vo.skinId == oldGod.skinId;
                });
                if (!findVo) {
                    this_3.removePlayer(source[key]);
                }
            };
            var this_3 = this;
            for (var key in source) {
                _loop_3();
            }
        };
        /** 角色进场完毕 */
        GuajiScene.prototype.roleInfoCom = function () {
            this.mainSceneComplete();
            this.startFight();
        };
        GuajiScene.prototype.startTalkGuideEnd = function () {
            // layapan.LayaInsideSprite.timespeed = this._fightspeed;
            this.uiScene.timespeed1 = this._fightspeed;
            this.removeStep(String(iface.tb_prop.battleOpTypeKey.objInit));
        };
        GuajiScene.prototype.startFight = function () {
            var _this = this;
            dispatchEvt(new game.GuajiEvent(game.GuajiEvent.REFRESH_TITLE_EVENT));
            this._copyVo.fightStart(startOptState.START, function () {
                DialogExt.manager.mouseEnabled = true;
                // this.stage.mouseEnabled = false;
                //对话
                if (!_this._model.startTalkGuide) {
                    _this.startTalkGuideEnd();
                }
                else {
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.CREATE_ROLE_SUCC));
                }
                // dispatchEvt(new FightsEvent(FightsEvent.INIT_SPEED));
                // //播放弹幕
                // if (this._copyVo.barrageList && this._copyVo.barrageList.length > 0) {
                //     for (let i = 0; i < this._copyVo.barrageList.length; i++) {
                //         let vo = this._copyVo.barrageList[i];
                //         vo.parentBox = UIMgr.getUIByName(UIConst.FightViews);
                //     }
                //     BarrageMgr.getInstance().addBarrages(this._copyVo.barrageList);
                // }
            });
        };
        //场景加载完毕
        GuajiScene.prototype.mainSceneComplete = function () {
            if (this.sceneComplete) {
                Laya.timer.frameOnce(2, this, this.sceneComplete.bind(this));
            }
        };
        /**
         * 提供给对象池创建角色对象的方法
         */
        GuajiScene.prototype.createCharFun = function () {
            // console.log("通过方法创建对象");
            var sceneVo = new game.GuajiCharVo;
            var $baseChar = new FightChar();
            $baseChar.is2d = true;
            sceneVo.char = $baseChar;
            this.uiScene.scene.addMovieDisplay(sceneVo.char);
            // sceneVo.char.shadow = true;
            return sceneVo;
        };
        //添加角色
        GuajiScene.prototype.addBaseRole = function (uuid, templateId, skinId, objType, degree, starLev) {
            var sceneVo = Laya.Pool.getItemByCreateFun("guajicharvo", this.createCharFun.bind(this));
            sceneVo.scene = this;
            sceneVo.uuid = uuid;
            sceneVo.templatId = templateId;
            sceneVo.objType = objType;
            sceneVo.skinId = skinId;
            var roletab = objType == battle.BatteConsts.BATTLE_CAMPATK ? tb.TB_god.get_TB_godById(templateId) : tb.TB_monster.get_TB_monsterById(templateId);
            sceneVo.tab = roletab;
            var model = game.GodUtils.getGodModel(skinId, sceneVo.tab);
            sceneVo.char.setRoleUrl(getRoleUrl(String(model)));
            if (objType == battle.BatteConsts.BATTLE_CAMPATK) {
                this._cachePlayerGuid[String(sceneVo.uuid + "_" + sceneVo.skinId)] = sceneVo;
            }
            else {
                this._cacheMonsterGuid[String(sceneVo.uuid + "_" + sceneVo.skinId)] = sceneVo;
            }
            return sceneVo;
        };
        GuajiScene.prototype.resetSkill = function (skills, objType, degree, starLev, sceneVo) {
            var skillmap = [];
            if (objType == battle.BatteConsts.BATTLE_CAMPATK) {
                var skilllist = getSkillList(skills, degree, starLev);
                for (var h = 0; h < skilllist.length; h++) {
                    if (skilllist[h][1] <= degree) {
                        skillmap.push(skilllist[h][0]);
                    }
                }
            }
            else {
                skillmap = skills;
            }
            replaceSkill(skillmap);
            // sceneVo.onDead = this.roleDeath.bind(this);
            //预加载技能 并保存技能对象
            sceneVo.skillMap = new Object;
            for (var i = 0; i < skillmap.length; i++) {
                var tabskill = tb.TB_skill.get_TB_skillById(skillmap[i]);
                if (!tabskill)
                    continue;
                var sceneSkill = new GodSkillVo;
                sceneSkill.skillid = tabskill.ID;
                if (tabskill.effect > 0) {
                    var effecttab = tb.TB_skill_effect.get_TB_skill_effectById(tabskill.effect);
                    sceneSkill.skillfile = String(effecttab.effect_id);
                    sceneSkill.effectName = effecttab.action;
                }
                sceneVo.skillMap[tabskill.ID] = sceneSkill;
            }
        };
        GuajiScene.prototype.fightMoveSuccFun = function () {
            Laya.timer.frameOnce(10, this, this.godMoveSuccFun);
            // if (this._moveSucc) {
            // 	return;
            // }
            // this._moveSucc = true;
            // this.stopMove();
        };
        GuajiScene.prototype.getRoleMoveResult = function () {
            this.roleMap.forEach(function (element, index, array) {
                if (!element.movesucc) {
                    return false;
                }
            });
            return true;
        };
        GuajiScene.prototype.godMoveSuccFun = function () {
            if (this._showOpenEff) {
                return;
            }
            if (!this.getRoleMoveResult()) {
                return;
            }
            this._showOpenEff = true;
            this.roleInfoCom();
        };
        /**
         * 死亡时瞬时清除角色身上的buff
         * @param objid
         */
        GuajiScene.prototype.roleDeathClearBuff = function (objid) {
            //角色死亡回调 需要清空身上的buff和世界buff.
            var role = this.getRoleById(objid);
            if (!role)
                return;
            while (role.buffAry && role.buffAry.length > 0) {
                var kid = role.buffAry.shift();
                this.removeBuffByOne(kid);
            }
        };
        //角色移除回调
        GuajiScene.prototype.roleDeath = function (objid) {
            //角色死亡回调 需要清空身上的buff和世界buff.
            var role = this.getRoleById(objid);
            if (!role)
                return;
            while (role.buffAry && role.buffAry.length > 0) {
                var kid = role.buffAry.shift();
                this.removeBuffByOne(kid);
            }
        };
        GuajiScene.prototype.updataBuff = function ($stepVo) {
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
        GuajiScene.prototype.addBuff = function (step) {
            var buffvo = new game.GodBuffVo;
            buffvo.casterId = step.casterId;
            buffvo.round = step.round;
            buffvo.skillId = step.skillId;
            buffvo.targetId = step.objId;
            buffvo.stackCnt = step.stackCnt;
            buffvo.uuid = step.buffInstId;
            buffvo.tb_buff = tb.TB_buff.get_TB_buffById(step.buffId);
            this.buffMap.set(buffvo.uuid, buffvo);
            // let role: GuajiCharVo = this.getRoleById(buffvo.targetId);
            // if (role) {
            // 	this.buffJumpText(buffvo, role);
            // }
            this.showBuffFlyText(buffvo, step.hasOwnProperty("showeff"));
            this.addBuffByOne(buffvo);
            Laya.timer.frameOnce(3, this, this.showBuff);
        };
        GuajiScene.prototype.showBuffFlyText = function (buffvo, isshow) {
            var role = this.getRoleById(buffvo.targetId);
            if (role && isshow) {
                this.buffJumpText(buffvo, role);
            }
        };
        GuajiScene.prototype.showBuff = function () {
            var _this = this;
            this.roleMap.forEach(function (role, index, array) {
                // element: 指向当前元素的值
                // index: 指向当前索引
                // array: 指向Array对象本身
                //记录行动条上次显示位置
                var bufflist = new Array;
                for (var i = 0; role && i < role.buffAry.length; i++) {
                    var element = role.buffAry[i];
                    var vo = _this.getWorldBuff(element);
                    if (vo && vo.tb_buff.is_show && vo.tb_buff.round != 9999) {
                        bufflist.push(JSON.parse(JSON.stringify(vo)));
                    }
                }
                // if (role.tab instanceof tb.TB_monster && role.tab.type > 0)
                // 	dispatchEvt(new FightsEvent(FightsEvent.CHANGE_BOSSBUFF), bufflist);
                // else
                role.char.buffary = bufflist;
            });
        };
        GuajiScene.prototype.addBuffByOne = function (vo) {
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
                            _this.uiScene.removeEffect($particle);
                        }
                    }
                });
            }
            role.buffAry.push(vo.uuid);
        };
        GuajiScene.prototype.removeBuff = function ($stepvo) {
            var uuid = $stepvo.buffInstId;
            this.removeBuffByOne(uuid);
        };
        GuajiScene.prototype.trigPasvSkill = function (stepvo) {
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
        GuajiScene.prototype.hpMaxChange = function (stepvo) {
            var role = this.getRoleById(stepvo.objId);
            if (!role) {
                return;
            }
            logfight("血量变化：", stepvo.hp);
            role.hpMax = stepvo.hpMax;
            role.hp = stepvo.hp;
        };
        GuajiScene.prototype.roleAngerChange = function (stepvo) {
            var role = this.getRoleById(stepvo.objId);
            if (!role) {
                return;
            }
            // role.char.setAnger(stepvo.anger);
            role.setAnger(stepvo.anger);
        };
        // public setCurRole() {
        // 	let curRole = this.getRoleById(this._curRoleId);
        // 	if (curRole) {
        // 		this.hideRolePar();
        // 		let effscale: number = 1;
        // 		if (curRole.tab instanceof tb.TB_monster && curRole.tab.type > 0)
        // 			effscale = curRole.tab.type == 1 ? curRole.tab.model_multiple : 4;
        // 		this.uiScene.addEffect(this, 888888, curRole.pos, effscale, 5, ($particle) => {
        // 			this._lastRolePar = $particle;
        // 		});
        // 	}
        // }
        //最后一个出手玩家的特效
        // private _lastRolePar: Pan3d.CombineParticle;
        // private hideRolePar() {
        // 	if (this._lastRolePar) {
        // 		this.uiScene.removeEffect(this._lastRolePar);
        // 		this._lastRolePar = null;
        // 	}
        // }
        GuajiScene.prototype.getresultTime = function (t) {
            return t / (this._fightspeed + 1);
        };
        GuajiScene.prototype.skillCompleteForce = function ($charVo, $skiltab, $step) {
            $charVo.skilltag = true;
            this.skillComplete($charVo, $skiltab, $step);
        };
        //使用技能
        GuajiScene.prototype.charPlaySkills = function ($charVo, $skiltab, $step, $skillTargetDot) {
            var _this = this;
            if ($skillTargetDot === void 0) { $skillTargetDot = null; }
            var efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            this._actiontick = setTimeout(function () {
                $charVo.actiontag = true;
                _this.skillComplete($charVo, $skiltab, $step);
            }, this.getresultTime(frame2time(efftab.frame[0])));
            if (this.sceneEabled) {
                //如果在前台观看战斗
                if (!$charVo.char._scene.ready) {
                    this.skillCompleteForce($charVo, $skiltab, $step);
                    return;
                }
                var scskill = $charVo.skillMap[$skiltab.ID];
                // if (!scskill) {
                //     logerror("caonima");
                // }
                if (!scskill || scskill.skillfile == "0") {
                    this.skillCompleteForce($charVo, $skiltab, $step);
                    return;
                }
                this._curskill = this.uiScene.scene.skillMgr.getSkill(getSkillUrl(scskill.skillfile), scskill.effectName, function () {
                    logfight("技能加载完成");
                    _this.charPlaySkills($charVo, $skiltab, $step, $skillTargetDot);
                });
                if (!this._curskill || !this._curskill.keyAry) {
                    return;
                }
                if (this._curskill) {
                    this._curskill.reset();
                    this._curskill.isDeath = false;
                }
                this._curskill.needShock = false;
                this._curskill.configFixEffect($charVo.char, function () {
                    _this.skillCompleteForce($charVo, $skiltab, $step);
                }, $skillTargetDot);
                this.uiScene.scene.skillMgr.playSkill(this._curskill);
                //动作结束时间
                if (efftab.att_type == 1) {
                    setTimeout(function () {
                        _this.roleMove($charVo);
                    }, this.getresultTime(frame2time(efftab.action_frame)));
                }
            }
            else {
                //如果切换到后台等待战斗结束
                clearTimeout(this._actiontick);
                setTimeout(function () {
                    console.log("切换到后台技能释放完成");
                    $charVo.actiontag = true;
                    $charVo.skilltag = true;
                    // this.roleMove($charVo);
                    //$charVo.pos不存在则表示是神器
                    if ($charVo && $charVo.char && $charVo.pos) {
                        $charVo.char.px = $charVo.pos.x;
                        $charVo.char.pz = $charVo.pos.z;
                        $charVo.char.forceRotationY = $charVo.rotation;
                        _this.moveUnvisable($charVo, true);
                    }
                    _this.skillComplete($charVo, $skiltab, $step);
                }, this.getresultTime(frame2time(efftab.frame[0])));
            }
        };
        /**
         * 技能播放结束回调
         */
        GuajiScene.prototype.skillComplete = function ($charVo, $skiltab, $step) {
            if ($skiltab.skill_feature == 1) {
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SET_FIGHT_BLACK_BG), false);
            }
            if (this.sceneEabled && (!$charVo.skilltag || !$charVo.actiontag))
                return;
            if (!this.roleMap)
                return;
            if (!$charVo || !$charVo.char)
                return;
            logfight("战斗技能结束", $step.skillId);
            if ($step.type == iface.tb_prop.battleOpTypeKey.atftUseSkill) {
                this.uiScene.scene.removeMovieDisplay($charVo.char);
                this.removeStep($step.type + "_" + $step.skillId);
                return;
            }
            // let efftab = tb.TB_skill_effect.get_TB_skill_effectById($skiltab.effect);
            // if (efftab.att_type == 1) {
            // $charVo.char.forceRotationY = $charVo.char.rotationY + 180;
            // $charVo.char.play(Pan3d.CharAction.WALK, 2, false);
            // let time = this.ATTACK_DELAY / (this.uiScene.timespeed1 + 1);
            // this._skillcbTween = Laya.Tween.to($charVo.char, { "px": $charVo.pos.x, "pz": $charVo.pos.z }, time, null, Laya.Handler.create(this, () => {
            // 	clearTimeout(this._tweenskillCbTick);
            // 	if (!$charVo || !$charVo.char) return;
            // 	$charVo.char.forceRotationY = $charVo.rotation;
            // 	this.moveUnvisable($charVo, true);
            // 	this.removeStep($step.type + "_" + $step.skillId);
            // }));
            // this._tweenskillCbTick = setTimeout(() => {
            // 	Laya.Tween.clear(this._skillcbTween);
            // 	if (!$charVo || !$charVo.char) return;
            // 	$charVo.char.px = $charVo.pos.x
            // 	$charVo.char.pz = $charVo.pos.z
            // 	$charVo.char.forceRotationY = $charVo.rotation;
            // 	this.moveUnvisable($charVo, true);
            // 	this.removeStep($step.type + "_" + $step.skillId);
            // }, time);
            // this.moveUnvisable($charVo, true);
            // 	this.removeStep($step.type + "_" + $step.skillId);
            // } else {
            // $charVo.char.forceRotationY = $charVo.rotation;
            this.removeStep($step.type + "_" + $step.skillId);
            // }
            this._curskill = null;
        };
        GuajiScene.prototype.roleMove = function ($charVo) {
            var _this = this;
            if ($charVo && $charVo.char) {
                $charVo.char.forceRotationY = $charVo.char.rotationY + 180;
                $charVo.char.play(tl3d.CharAction.WALK, 2, false);
                var time = this.getresultTime(this.ATTACK_DELAY);
                this.moveUnvisable($charVo, false);
                this._skillcbTween = Laya.Tween.to($charVo.char, { "px": $charVo.pos.x, "pz": $charVo.pos.z }, time, null, Laya.Handler.create(this, function () {
                    clearTimeout(_this._tweenskillCbTick);
                    if (!$charVo || !$charVo.char)
                        return;
                    if ($charVo.char.curentAction != tl3d.CharAction.STANAD)
                        $charVo.char.play(tl3d.CharAction.STANAD);
                    $charVo.char.forceRotationY = $charVo.rotation;
                    _this.moveUnvisable($charVo, true);
                }));
                this._tweenskillCbTick = setTimeout(function () {
                    Laya.Tween.clear(_this._skillcbTween);
                    if (!$charVo || !$charVo.char)
                        return;
                    $charVo.char.px = $charVo.pos.x;
                    $charVo.char.pz = $charVo.pos.z;
                    $charVo.char.forceRotationY = $charVo.rotation;
                    _this.moveUnvisable($charVo, true);
                }, time);
            }
        };
        GuajiScene.prototype.charDandaoPlaySkill = function ($charVo, $skiltab, $target, step, speedobj) {
            var _this = this;
            if (!$charVo.char._scene.ready) {
                return;
            }
            var scskill = $charVo.skillMap[$skiltab.ID];
            if (!scskill || scskill.skillfile == "0") {
                return;
            }
            this._curskill = this.uiScene.scene.skillMgr.getSkill(getSkillUrl(scskill.skillfile), scskill.effectName, function () {
                logfight("技能加载完成");
                _this.charDandaoPlaySkill($charVo, $skiltab, $target, step, speedobj);
            });
            if (!this._curskill || !this._curskill.keyAry) {
                return;
            }
            var skillobj = this._curskill.keyAry[0];
            if (skillobj && skillobj instanceof tl3d.SkillTrajectory) {
                logfight("弹道速度:", skillobj.data.speed);
                if (skillobj.data.speed < 10) {
                    speedobj.speednum = this.REMOTE_DELAY;
                }
            }
            if (this._curskill) {
                this._curskill.reset();
                this._curskill.isDeath = false;
            }
            tl3d.PathManager.init();
            this._curskill.needShock = false;
            this._curskill.configTrajectory($charVo.char, $target.char, step == null ? null : function () {
                // showToast("技能回调");
                $charVo.skilltag = true;
                logfight("技能回调skilltag:true");
                _this.skillComplete($charVo, $skiltab, step);
                // Laya.timer.frameOnce(3, this, this.skillComplete, [$charVo, $skiltab, step]);
            });
            // $skill.configTrajectory($charVo.char, $target.char);
            //面向目标
            $charVo.char.watch($target.char);
            this.uiScene.scene.skillMgr.playSkill(this._curskill);
        };
        /**
         * 飘字转换枚举
         */
        GuajiScene.prototype.getFlyType = function ($type, $num) {
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
        GuajiScene.prototype.buffJumpText = function (vo, role) {
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
        /**
         * 退出场景
         */
        GuajiScene.prototype.onExit = function () {
            //挂机战斗后台可运行
            clearTimeout(this.guanqiaStep);
            if (this._model.isFight) {
                this.stopFightSkill();
            }
            else {
                this.clearGuajiAll();
            }
            // this.resetGuajiState();
            // Laya.timer.clear(this, this.changeState);
            // this.stopGuajiSkill();
            // this.resetPlayers();
            // this.clearMonster();
            // clearTimeout(this._starTimeout);
            clearTimeout(this._talkTick);
        };
        GuajiScene.prototype.updataTick = function () {
            if (this._model.isFight) {
                this._loginindex = 0;
                this.TickUpdate();
                return;
            }
            if (this._loginindex > 2) { //逻辑可以不需要每帧执行
                this.tickGuaji();
                this._loginindex = 0;
            }
            this._loginindex++;
        };
        return GuajiScene;
    }(Laya.Sprite));
    game.GuajiScene = GuajiScene;
})(game || (game = {}));
