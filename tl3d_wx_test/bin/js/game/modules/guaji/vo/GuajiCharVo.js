var game;
(function (game) {
    var GuajiCharVo = /** @class */ (function () {
        function GuajiCharVo() {
            this._guajihp = 0;
            this.guajiMaxHp = 0;
            this._hp = 0;
            this.movesucc = false; //移动状态
            this._deathtickflag = false;
            this.deadIng = false;
            this.delayList = [];
            this._model = game.GuajiModel.getInstance();
        }
        GuajiCharVo.prototype.getFirstSkill = function () {
            var tab;
            for (var key in this.skillMap) {
                tab = tb.TB_skill.get_TB_skillById(Number(key));
                if (tab.type == 1) {
                    return this.skillMap[key];
                }
            }
            return null;
        };
        GuajiCharVo.prototype.deleteBuff = function ($uuid) {
            var kid = this.buffAry.indexOf($uuid);
            if (kid != -1)
                this.buffAry.splice(kid, 1);
        };
        GuajiCharVo.prototype.deathFun = function () {
            this._deathtickflag = false;
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
        GuajiCharVo.prototype.deathTimeOut = function () {
            // if (this.char && this.hpr <= 0 && this.char.onStage && this.onDead) {
            //     this.onDead.call(null, [this.uuid, this.skinId]);
            // }
            if (!this._model.isFight) {
                //如果已经不在战斗中，就不管这个回调
                return;
            }
            // if (this.char && this.hpr <= 0 && this.char.onStage) {
            if (this.char && this.hpr <= 0 && this.char.visible) {
                // this.char.shadow = false;
                // this.char.removeChar();
                this.setCharVisable(false);
            }
        };
        Object.defineProperty(GuajiCharVo.prototype, "hpr", {
            get: function () {
                return this._hpr;
            },
            set: function ($value) {
                this._hpr = $value;
                if (!this.char) {
                    return;
                }
                //需要在添加到舞台以后调用
                if ($value <= 0) {
                    $value = 0;
                    // if (!this.char.onStage) {
                    if (!this.char.visible) {
                        //初始化时。可能设置血量为0的状况，此时模型不存在舞台上。
                        return;
                    }
                    clearTimeout(this._deathTick1);
                    clearTimeout(this._deathTick2);
                    this.char.play(tl3d.CharAction.DEATH, 1, false);
                    if (this._deathtickflag) {
                        var t_1 = this.getresultTime(frame2time(this.tab.death_frame));
                        // logyhj("死亡计时：", t);
                        this._deathTick1 = setTimeout(this.deathFun.bind(this), t_1);
                        this._deathTick2 = setTimeout(this.deathTimeOut.bind(this), t_1);
                        return;
                    }
                    // let deathTick = Pan3d.TimeUtil.hasTimeOut(this.deathFun.bind(this));
                    // if (deathTick) {
                    //     //逻辑计时器
                    //     Pan3d.TimeUtil.removeTimeOut(this.deathFun.bind(this));
                    //     Pan3d.TimeUtil.addTimeOut(1500, this.deathFun.bind(this));
                    //     //死亡动画计时器
                    //     Pan3d.TimeUtil.removeTimeOut(this.deathTimeOut.bind(this));
                    //     Pan3d.TimeUtil.addTimeOut(2500, this.deathTimeOut.bind(this));
                    //     return;
                    // }
                    //死亡
                    this.deadIng = true;
                    this.scene.tagStep("dead" + this.objId);
                    if (this.scene) {
                        //删除buff
                        this.scene.roleDeathClearBuff(this.objId);
                    }
                    // Pan3d.TimeUtil.addTimeOut(2500, this.deathTimeOut.bind(this));
                    // Pan3d.TimeUtil.addTimeOut(1500, this.deathFun.bind(this));
                    var t = this.getresultTime(frame2time(this.tab.death_frame));
                    // logyhj("死亡计时：", t);
                    this._deathTick1 = setTimeout(this.deathFun.bind(this), t);
                    this._deathTick2 = setTimeout(this.deathTimeOut.bind(this), t);
                    this._deathtickflag = true;
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
                    // if (!this.char.onStage) {
                    //     //复活的时候，重置角色回场景
                    //     this.scene.uiScene.scene.addMovieDisplay(this.char);
                    //     this.char.play(Pan3d.CharAction.STANAD, 2, false);
                    // } else {
                    //     if (this.char.curentAction == Pan3d.CharAction.DEATH)
                    //         this.char.play(Pan3d.CharAction.STANAD, 2, false);
                    // }
                    if (!this.char.visible) {
                        this.setCharVisable(true);
                        this.char.play(tl3d.CharAction.STANAD, 2, false);
                    }
                    else {
                        if (this.char.curentAction == tl3d.CharAction.DEATH)
                            this.char.play(tl3d.CharAction.STANAD, 2, false);
                    }
                    // this.initCharBlood();
                }
                // if (this.tab instanceof tb.TB_monster && this.tab.type > 0) {
                //     dispatchEvt(new FightsEvent(FightsEvent.CHANGE_BOSSBLOOD), { vo: $value });
                // } else {
                var temphp = 0;
                if ($value > 0)
                    temphp = $value < 5 ? 5 : $value;
                this.char.lifenumExt = temphp;
                // }
                logfight("角色：", this.objId, this.tab.name, "当前血量：", this._hp, "百分比:", $value);
            },
            enumerable: true,
            configurable: true
        });
        // public initCharBlood(vis: boolean) {
        //     // this.setCharVisable(vis);
        //     logyhj("设置血条显示");
        // }
        GuajiCharVo.prototype.setCharVisable = function (vis) {
            if (!this.char)
                return;
            // logyhj("显示状态：",this.objId,vis);
            this.char.alpha = 1;
            this.char.visible = vis;
            this.char.bloodEnableExt = false;
            this.char.buffEnable = false;
            this.char.roleLevEnable = false;
            if (vis && this.isFight) {
                this.char.bloodEnableExt = vis;
                this.char.setbloodColor(this.team == battle.BatteConsts.BATTLE_CAMPATK);
                this.char.buffEnable = vis;
                this.char.roleLevEnable = vis;
                this.char.setBloodExtOffsetX(10);
                // this.char.bloodPosX = 10;
                // this.char.setBloodOffsetY(-18);
                this.char.setBloodExtOffsetY(-18);
                this.char.setLevOffsetY(-18);
                this.char.setBuffOffsetY(18);
                this.char.setroleLev(this.lev, this.tab.race_type);
            }
        };
        Object.defineProperty(GuajiCharVo.prototype, "hp", {
            get: function () {
                return this._hp;
            },
            set: function ($value) {
                this._hp = $value;
                this._hp = Math.min(this._hp, this.hpMax);
                this._hp = Math.max(this._hp, 0);
                var nhpr = Math.ceil((this._hp / this.hpMax) * 100);
                if (nhpr != this.hpr) {
                    this.hpr = nhpr;
                }
            },
            enumerable: true,
            configurable: true
        });
        //显示场景飘字
        GuajiCharVo.prototype.showJumpText = function (vo) {
            if (!this.flyTextList) {
                this.flyTextList = new Array;
                this.flying = false;
            }
            this.flyTextList.push(vo);
            if (this.flying)
                return;
            this.startShow();
        };
        GuajiCharVo.prototype.startShow = function () {
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
        GuajiCharVo.prototype.JumpPiecewiseOpt = function (vo, starttime) {
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
        GuajiCharVo.prototype.onPiecewise = function (vo, starttime) {
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
                        var lasttime = frame2time($skilleff.frame[w] - initT);
                        // let temptime = statime - starttime;
                        // temptime = temptime / (this.scene.uiScene.timespeed1 + 1)
                        if (!this_1._model.isEnable) {
                            this_1.hp += num;
                            logfight("不在前台分段同步血量：", num);
                            return "continue";
                        }
                        setTimeout(function () {
                            _this.hp += num;
                            logfight("分段同步血量：", num);
                            _this.playJumpText(num, vo.type, tl3d.TimeUtil.getTimer(tl3d.TimeUtil.START_TIME));
                        }, this_1.getresultTime(lasttime));
                    };
                    var this_1 = this, floatFactor;
                    // logyhj("一共要扣 %f的血", hpvalue);
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
                // if (this.char && (vo.type == Pan3d.TextJumpType.N_CRIT
                //     || (vo.type == Pan3d.TextJumpType.N_NORMALDAMAGE && $skilltb.cd > 0))) {
                //     if (this._model.isEnable) {
                //         this.char._scene.skillMgr.shock.shock(300, 10);
                //     }
                // }
            }
            else {
                this.playJumpText(vo.value, vo.type, starttime);
            }
        };
        GuajiCharVo.prototype.getresultTime = function (t) {
            return t / (this.scene.uiScene.timespeed1 + 1);
        };
        GuajiCharVo.prototype.playJumpText = function (value, type, starttime) {
            //如果在后台就不飘字和播放被击打动画
            if (!this._model.isEnable)
                return;
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
            this.scene.uiScene.scene.bloodMgr.setJumpNum($jumpVo);
            this.playInjured(type);
        };
        /**
         * 播放受击动作
         * @param efftab
         * @param step
         */
        GuajiCharVo.prototype.playInjured = function (type) {
            if (type != tl3d.TextJumpType.N_NORMALDAMAGE && type != tl3d.TextJumpType.N_CRIT)
                return;
            //受击动作多次
            if (!this.char || !this.scene || !this.scene.uiScene)
                return;
            this.beatWitheFilter();
            this.scene.uiScene.addEffect(this, 1029, new tl3d.Vector3D(this.char.px, this.char.py + 50, this.char.pz), 2, 30, null, 0, 0, true);
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
        GuajiCharVo.prototype.beatWitheFilter = function () {
            var _this = this;
            clearTimeout(this._tickw);
            this.char.changeColor = [100, 10, 10, 0.7];
            this._tickw = setTimeout(function () {
                _this.char.changeColor = [1, 1, 1, _this.char.alpha];
            }, 150);
        };
        /**击打红色滤镜 */
        GuajiCharVo.prototype.beatRedFilter = function () {
            var _this = this;
            clearTimeout(this._tickr);
            this.char.changeColor = [100, 0, 0, 0.7];
            this._tickr = setTimeout(function () {
                _this.char.changeColor = [1, 1, 1, _this.char.alpha];
            }, 150);
        };
        GuajiCharVo.prototype.onDispose = function () {
            clearTimeout(this._tickw);
            clearTimeout(this._tickr);
            this.buffAry = [];
            this.char.buffary = [];
            this.char.destory();
            this.char = null;
            // if (Pan3d.TimeUtil.hasTimeOut(this.deathTimeOut)) {
            //     Pan3d.TimeUtil.removeTimeOut(this.deathTimeOut);
            // }
            // this.deadIng = false;
            // this.scene.removeStep("dead" + this.objId);
        };
        Object.defineProperty(GuajiCharVo.prototype, "guajihp", {
            get: function () {
                return this._guajihp;
            },
            // private hptick: number;
            set: function (val) {
                if (!this.char) {
                    return;
                }
                if (val > 0) {
                    this.dealthComplete = false;
                    // if (!this.char.onStage) {
                    //     //复活的时候，重置角色回场景
                    //     this.scene.uiScene.scene.addMovieDisplay(this.char);
                    // } else {
                    //     if (this.char.curentAction == Pan3d.CharAction.DEATH)
                    //         this.char.play(Pan3d.CharAction.STANAD, 2, false);
                    // }
                    if (!this.char.visible) {
                        this.setCharVisable(true);
                        if (this.char.curentAction == tl3d.CharAction.DEATH)
                            this.char.play(tl3d.CharAction.STANAD, 2, false);
                    }
                    // //阴影需要先设置，在设置角色的x,y,z.角色接受xyz会修改阴影位置
                    // this.scene.uiScene.scene.addMovieDisplay(this.char);
                    // this.char.shadow = true;
                    // this.char.setShadowSize(6);
                    // this.char.rotationY = this.rotation;
                    // // this.char.visible = true;
                    // this.char.play(Pan3d.CharAction.STANAD, 2, false);
                    // this.char.bloodEnable = false;
                    // this.char.buffEnable = false;
                    // this.char.roleLevEnable = false;
                }
                this._guajihp = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置血量
         */
        GuajiCharVo.prototype.setHp = function (value, $cb) {
            // clearTimeout(this.hptick);
            // this.hptick = setTimeout(() => {
            if (!this.char)
                return;
            if (this.team == battle.BatteConsts.BATTLE_CAMPDEF) {
                this.guajihp -= value;
                if (this.guajihp < 0) {
                    this.guajihp = 0;
                }
            }
            // if (this.char.curentAction != tl3d.CharAction.STANAD)
            //     this.char.play(tl3d.CharAction.STANAD, 2, false);
            this.char.play(this.guajihp <= 0 ? tl3d.CharAction.DEATH : tl3d.CharAction.INJURED, this.guajihp <= 0 ? 1 : 2, false);
            if (this.guajihp <= 0) {
                Laya.Tween.to(this.char, { alpha: 0.3 }, 500);
            }
            if ($cb) {
                $cb(new tl3d.Vector3D(this.char.px, this.char.py + 50, this.char.pz));
            }
            if (this.guajihp <= 0) {
                this.onDie();
            }
            // }, $time);
        };
        GuajiCharVo.prototype.clearGuajiTick = function () {
            // clearTimeout(this.hptick);
            clearTimeout(this.dietick);
        };
        /**
         * 角色死亡
         * @param force
         */
        GuajiCharVo.prototype.onDie = function () {
            var _this = this;
            clearTimeout(this.dietick);
            this.dietick = setTimeout(function () {
                _this.setCharVisable(false);
            }, 1500);
            this.dealthComplete = true;
            if (this.onDead) {
                this.onDead.call(null, [this.uuid, this.skinId]);
            }
            // setTimeout(() => {
            //     //掉落
            //     let charpos: Pan3d.Vector2D = this.char.get2dPos();
            //     dispatchEvt(new GuajiEvent(GuajiEvent.GUAJI_DROP_ITEM, charpos));
            // }, 500);
        };
        GuajiCharVo.prototype.setAnger = function (val) {
            // CHANGE_BOSSANGER
            if (!this.char)
                return;
            this.char.setAnger(val);
        };
        return GuajiCharVo;
    }());
    game.GuajiCharVo = GuajiCharVo;
})(game || (game = {}));
