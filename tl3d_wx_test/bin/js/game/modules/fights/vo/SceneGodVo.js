var game;
(function (game) {
    var SceneGodVo = /** @class */ (function () {
        function SceneGodVo() {
            this._hp = 0;
            this.deadIng = false;
            this.delayList = [];
        }
        SceneGodVo.prototype.deleteBuff = function ($uuid) {
            var kid = this.buffAry.indexOf($uuid);
            if (kid != -1)
                this.buffAry.splice(kid, 1);
        };
        SceneGodVo.prototype.deathFun = function () {
            // if (this.char && this.hpr <= 0 && this.char.onStage) {
            //     this.char.shadow = false;
            //     this.char.removeChar();
            // }
            while (this.delayList.length > 0) {
                var vo = this.delayList.shift();
                this.scene.onPlay(vo.step, vo.skillId);
            }
            this.deadIng = false;
            this.scene.removeStep("dead" + this.objId);
        };
        SceneGodVo.prototype.deathTimeOut = function () {
            if (this.char && this.hpr <= 0 && this.char.onStage) {
                this.char.shadow = false;
                this.char.removeChar();
            }
        };
        Object.defineProperty(SceneGodVo.prototype, "hpr", {
            get: function () {
                return this._hpr;
            },
            // private _deathTimeOutFunKey:number;
            set: function ($value) {
                var _this = this;
                logyhj("血量百分比,", $value, this.objId);
                this._hpr = $value;
                //需要在添加到舞台以后调用
                if ($value <= 0) {
                    $value = 0;
                    if (!this.char.onStage) {
                        //初始化时。可能设置血量为0的状况，此时模型不存在舞台上。
                        return;
                    }
                    clearTimeout(this._deathFunKey);
                    // let deathTick = tl3d.TimeUtil.hasTimeOut(this.deathFun.bind(this));
                    this.char.play(tl3d.CharAction.DEATH, 1, false);
                    // if (deathTick) {
                    //     let t = this.getresultTime(frame2time(this.tab.death_frame));
                    //     logyhj("死亡计时：", t);
                    //     //逻辑计时器
                    //     tl3d.TimeUtil.removeTimeOut(this.deathFun.bind(this));
                    //     tl3d.TimeUtil.addTimeOut(t, this.deathFun.bind(this));
                    //     //死亡动画计时器
                    //     tl3d.TimeUtil.removeTimeOut(this.deathTimeOut.bind(this));
                    //     tl3d.TimeUtil.addTimeOut(t, this.deathTimeOut.bind(this));
                    //     return;
                    // }
                    //死亡
                    this.deadIng = true;
                    this.scene.tagStep("dead" + this.objId);
                    if (this.onDead) {
                        this.onDead.call(null, this.objId);
                    }
                    var t = this.getresultTime(frame2time(this.tab.death_frame));
                    // logyhj("死亡计时1：", t);
                    this._deathFunKey = setTimeout(function () {
                        _this.deathFun();
                        _this.deathTimeOut();
                    }, t);
                    // tl3d.TimeUtil.addTimeOut(t, this.deathTimeOut.bind(this));
                    // tl3d.TimeUtil.addTimeOut(t, this.deathFun.bind(this));
                }
                else {
                    var deathTimeTick = tl3d.TimeUtil.hasTimeOut(this.deathTimeOut.bind(this));
                    if (deathTimeTick) {
                        tl3d.TimeUtil.removeTimeOut(this.deathTimeOut.bind(this));
                    }
                    var deathTick1 = tl3d.TimeUtil.hasTimeOut(this.deathFun.bind(this));
                    if (deathTick1) {
                        tl3d.TimeUtil.removeTimeOut(this.deathFun.bind(this));
                    }
                    if (!this.char.onStage) {
                        //复活的时候，重置角色回场景
                        this.scene.gameScene.scene.addMovieDisplay(this.char);
                        this.char.scale = 1;
                        if (this.tab instanceof tb.TB_monster) {
                            this.char.scale = this.tab.model_multiple;
                            if (this.tab.type <= 0) {
                                this.initCharBlood();
                            }
                        }
                        else if (this.tab instanceof tb.TB_god) {
                            this.initCharBlood();
                        }
                        //阴影需要先设置，在设置角色的x,y,z.角色接受xyz会修改阴影位置
                        this.char.shadow = true;
                        this.char.setShadowSize(6);
                        this.char.rotationY = this.rotation;
                        this.char.visible = true;
                        this.char.play(tl3d.CharAction.STANAD, 2, false);
                    }
                    else {
                        if (this.char.curentAction == tl3d.CharAction.DEATH)
                            this.char.play(tl3d.CharAction.STANAD, 2, false);
                    }
                }
                // if (this.tab instanceof tb.TB_monster && this.tab.type > 0) {
                //     dispatchEvt(new FightsEvent(FightsEvent.CHANGE_BOSSBLOOD), { vo: $value, info: Math.floor(this.hp) + "/" + Math.floor(this.hpMax) });
                // } else {
                //     let temphp = 0
                //     if ($value > 0)
                //         temphp = $value < 5 ? 5 : $value;
                //     this.char.lifenum = temphp;
                // }
                logfight("角色：", this.objId, this.tab.name, "当前血量：", this._hp, "百分比:", $value);
            },
            enumerable: true,
            configurable: true
        });
        SceneGodVo.prototype.getresultTime = function (t) {
            return t / (this.scene.gameScene.timespeed1 + 1);
        };
        SceneGodVo.prototype.initCharBlood = function () {
            // this.char.setAngerPlay(true);
            this.char.bloodEnableExt = true;
            this.char.setbloodColor(this.isPlayer);
            this.char.buffEnable = true;
            this.char.roleLevEnable = true;
            // this.char.bloodPosX = 10;
            this.char.setBloodExtOffsetX(10);
            this.char.setroleLev(this.lev, this.tab.race_type);
        };
        Object.defineProperty(SceneGodVo.prototype, "hp", {
            get: function () {
                return this._hp;
            },
            set: function ($value) {
                this._hp = $value;
                this._hp = Math.min(this._hp, this.hpMax);
                this._hp = Math.max(this._hp, 0);
                var nhpr = Math.ceil((this._hp / this.hpMax) * 100);
                // if (nhpr != this.hpr) {
                this.hpr = nhpr;
                // }
                logfight("角色：", this.objId, this.tab.name, "当前血量：", this._hp, "百分比:", nhpr);
                if (this.tab instanceof tb.TB_monster && this.tab.type > 0) {
                    dispatchEvt(new game.FightsEvent(game.FightsEvent.CHANGE_BOSSBLOOD), { vo: nhpr, info: Math.floor(this.hp) + "/" + Math.floor(this.hpMax) });
                }
                else {
                    var temphp = 0;
                    if (nhpr > 0)
                        temphp = nhpr < 5 ? 5 : nhpr;
                    this.char.lifenumExt = temphp;
                }
            },
            enumerable: true,
            configurable: true
        });
        //显示场景飘字
        SceneGodVo.prototype.showJumpText = function (vo) {
            if (!this.flyTextList) {
                this.flyTextList = new Array;
                this.flying = false;
            }
            this.flyTextList.push(vo);
            if (this.flying)
                return;
            this.startShow();
        };
        SceneGodVo.prototype.startShow = function () {
            if (this.flyTextList && this.flyTextList.length > 0) {
                this.flying = true;
                var vo = this.flyTextList.shift();
                this.JumpPiecewiseOpt(vo, tl3d.TimeUtil.getTimer(tl3d.TimeUtil.START_TIME));
                Laya.timer.once(100, this, this.startShow);
            }
            else {
                this.flying = false;
            }
        };
        SceneGodVo.prototype.JumpPiecewiseOpt = function (vo, starttime) {
            //飘字分段
            if (vo.skillid !== undefined) {
                if (vo.type == tl3d.TextJumpType.N_NORMALDAMAGE || vo.type == tl3d.TextJumpType.N_CRIT || vo.type == tl3d.TextJumpType.N_UPHP) {
                    this.onPiecewise(vo, starttime);
                }
                else {
                    this.playJumpText(vo.value, vo.type, starttime);
                }
            }
            else {
                this.playJumpText(vo.value, vo.type, starttime);
            }
        };
        /**
         * 分段判断
         * 如果有分段的需求，则需要自己处理血量的变化。不通过hpchange处理
         * @param vo
         * @param starttime
         */
        SceneGodVo.prototype.onPiecewise = function (vo, starttime) {
            var _this = this;
            var $skilltb = tb.TB_skill.get_TB_skillById(vo.skillid);
            if ($skilltb.effect > 0) {
                // let curtime: number = starttime;
                var $skilleff = tb.TB_skill_effect.get_TB_skill_effectById($skilltb.effect);
                //同步分段伤害的不同出处
                var tbflag = $skilleff.damage_section && $skilleff.damage_section.length == ($skilleff.frame.length - 1);
                var t = $skilleff.frame.length - 1;
                if ($skilleff.frame.length > 2) {
                    //基础帧数
                    var initT = $skilleff.frame[1];
                    var temphp = 0;
                    var hpvalue = vo.value;
                    var _loop_1 = function () {
                        var num = 0; //飘字数值
                        if (tbflag) {
                            var pn = perc2num($skilleff.damage_section[w - 1]);
                            if (w == t) {
                                num = hpvalue - temphp;
                            }
                            else {
                                num = pn * hpvalue;
                            }
                        }
                        else {
                            if (w == t) {
                                num = hpvalue - temphp;
                            }
                            else {
                                floatFactor = utils.random(90, 110) / 100;
                                num = hpvalue / t * floatFactor;
                            }
                        }
                        num = Math.floor(num);
                        temphp += num;
                        // let statime = curtime + 
                        var lasttime = this_1.getresultTime(frame2time($skilleff.frame[w] - initT));
                        // let temptime = statime - starttime;
                        // Pan3d.TimeUtil.addTimeOut(lasttime, () => {
                        //     this.hp += num;
                        //     logfight("分段同步血量：", this.hp);
                        //     this.playJumpText(num, vo.type, Pan3d.TimeUtil.getTimer(this.scene.gameScene.scene.startTime));
                        // });
                        setTimeout(function () {
                            _this.hp += num;
                            logfight("分段同步血量：", _this.hp);
                            _this.playJumpText(num, vo.type, tl3d.TimeUtil.getTimer(tl3d.TimeUtil.START_TIME));
                        }, lasttime);
                    };
                    var this_1 = this, floatFactor;
                    //有分段
                    for (var w = 1; w < $skilleff.frame.length; w++) {
                        _loop_1();
                    }
                }
                else {
                    //没分段
                    this.playJumpText(vo.value, vo.type, starttime);
                }
                //振屏 当触发暴击时，或是放大招时
                if (this.char && vo.type == tl3d.TextJumpType.N_CRIT) {
                    this.char._scene.skillMgr.shock.shock(300, 10);
                }
            }
            else {
                this.playJumpText(vo.value, vo.type, starttime);
            }
        };
        SceneGodVo.prototype.playJumpText = function (value, type, starttime) {
            if (!this.char)
                return;
            var $jumpVo = new tl3d.TextJumpUiVo();
            $jumpVo.pos = new tl3d.Vector3D(this.char.px, 30, this.char.pz);
            $jumpVo.type = Number(type);
            $jumpVo.str = String(value);
            if ($jumpVo.type == tl3d.TextJumpType.N_PASSIVE || $jumpVo.type == tl3d.TextJumpType.N_UPHP) {
                $jumpVo.str = "+" + $jumpVo.str;
            }
            $jumpVo.starttime = starttime;
            $jumpVo.endtime = starttime + 900;
            this.scene.gameScene.scene.bloodMgr.setJumpNum($jumpVo);
            this.playInjured(type);
        };
        /**
         * 播放受击动作
         * @param efftab
         * @param step
         */
        SceneGodVo.prototype.playInjured = function (type) {
            if (type != tl3d.TextJumpType.N_NORMALDAMAGE && type != tl3d.TextJumpType.N_CRIT)
                return;
            //受击动作多次
            if (!this.char || !this.scene || !this.scene.gameScene)
                return;
            this.beatWitheFilter();
            this.scene.gameScene.addEffect(this, 1029, new tl3d.Vector3D(this.char.px, this.char.py + 50, this.char.pz), 2, 30, null, 0, 0, true);
            //如果正处于被击动作，就先恢复idle状态
            if (this.char.curentAction != tl3d.CharAction.STANAD)
                this.char.play(tl3d.CharAction.STANAD, 2, false);
            if (this.hpr > 0) {
                this.char.play(tl3d.CharAction.INJURED, 2, false);
            }
            else {
                this.char.play(tl3d.CharAction.DEATH, 1, false);
            }
        };
        /**击打白色滤镜 */
        SceneGodVo.prototype.beatWitheFilter = function () {
            var _this = this;
            clearTimeout(this._tickw);
            this.char.changeColor = [100, 10, 10, 0.7];
            this._tickw = setTimeout(function () {
                _this.char.changeColor = [1, 1, 1, _this.char.alpha];
            }, 150);
        };
        /**击打红色滤镜 */
        SceneGodVo.prototype.beatRedFilter = function () {
            var _this = this;
            clearTimeout(this._tickr);
            this.char.changeColor = [100, 0, 0, 0.7];
            this._tickr = setTimeout(function () {
                _this.char.changeColor = [1, 1, 1, _this.char.alpha];
            }, 150);
        };
        SceneGodVo.prototype.onDispose = function () {
            clearTimeout(this._tickw);
            clearTimeout(this._tickr);
            this.buffAry = [];
            this.char.destory();
            this.char = null;
            // if (Pan3d.TimeUtil.hasTimeOut(this.deathTimeOut)) {
            //     Pan3d.TimeUtil.removeTimeOut(this.deathTimeOut);
            // }
            // this.deadIng = false;
            // this.scene.removeStep("dead" + this.objId);
        };
        SceneGodVo.prototype.setAnger = function (val) {
            if (!this.char)
                return;
            if (this.tab instanceof tb.TB_monster && this.tab.type > 0) {
                dispatchEvt(new game.FightsEvent(game.FightsEvent.CHANGE_BOSSANGER), val);
            }
            else {
                this.char.setAnger(val);
            }
        };
        return SceneGodVo;
    }());
    game.SceneGodVo = SceneGodVo;
})(game || (game = {}));
