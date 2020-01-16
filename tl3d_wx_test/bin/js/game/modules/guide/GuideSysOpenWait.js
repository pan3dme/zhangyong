var game;
(function (game) {
    // ================= 开启神器 ==================
    /** 开启神器 */
    var ShenqiOpenGuide = /** @class */ (function () {
        function ShenqiOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.sq_unlock] = this.unlock.bind(this);
            this.guideList[game.WeakGuideStep.sq_shangzhen] = this.shangzhen.bind(this);
        }
        ShenqiOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideShenqi;
        };
        ShenqiOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        ShenqiOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                // 是否完成第一阶段
                var isFinish = App.hero.tasks.advanceLevel >= 1;
                // 解锁数量
                var count = game.ArtifactModel.getInstance().getUnlockArtifactNum();
                // 是否完成全部步骤
                var hasFinishGuide = game.GuideWeakManager.isFinishStep(game.WeakGuideStep.guideShenqi);
                // 重进时，1、可以解锁时引导解锁；2、中途断掉时，表示已解锁继续引导剩余步骤穿戴神器
                if (isFinish && (count == 0 || !hasFinishGuide)) {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideShenqi, resolve);
                }
                else {
                    game.GuideManager.listenNotification(game.UpRoadEvent.REWARD_SUCCESS, function () {
                        return App.hero.tasks.advanceLevel >= 1;
                    }, _this).then(function () {
                        game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideShenqi, resolve);
                    });
                }
            });
        };
        ShenqiOpenGuide.prototype.unlock = function (next) {
            var _this = this;
            loghgy('解锁第一把神器引导');
            if (game.ArtifactModel.getInstance().getUnlockArtifactNum() >= 1) {
                loghgy('兼容：已解锁第一把神器，直接完成该引导步骤', game.WeakGuideStep.sq_unlock);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.sq_unlock).then(function () {
                    game.GuideMask.hide();
                    next();
                });
                return;
            }
            Promise.resolve().then(function () {
                // 在进阶之路获得的神器碎片
                if (UIMgr.hasStage(UIConst.UpRoadView)) {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ShowRewardItem, _this)
                        .then(function () {
                        var view = UIMgr.getUIByName(UIConst.UpRoadView);
                        game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.UpRoadView, _this);
                    });
                }
                return true;
            }).then(function () {
                return game.GuideWeakManager.listenToMain(3, _this);
            }).then(function () {
                _this._curStep = game.WeakGuideStep.sq_unlock;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12036));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.timeout(100);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ArtifactView);
                game.GuideMask.show(view.btn_unlock, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.sq_unlock);
            }).then(function () {
                _this._curStep = game.WeakGuideStep.sq_shangzhen;
                if (UIMgr.hasStage(UIConst.Artifact_UnLockView)) {
                    return game.GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                }
                else {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Artifact_UnLockView, _this);
                }
            })
                .then(function () {
                game.GuideMask.hide();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Artifact_UnLockView, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        ShenqiOpenGuide.prototype.shangzhen = function (next) {
            var _this = this;
            loghgy('上阵神器引导');
            var type = iface.tb_prop.lineupTypeKey.attack;
            if (App.hero.lineupArtifactInfo.hasOwnProperty(type) && App.hero.lineupArtifactInfo[type] > 0) {
                loghgy('兼容：已上阵过神器，直接完成该引导步骤', game.WeakGuideStep.sq_shangzhen);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.sq_shangzhen).then(function () {
                    next();
                });
                return;
            }
            this._curStep = game.WeakGuideStep.sq_shangzhen;
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12037))
                .then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                if (UIMgr.hasStage(UIConst.ArtifactView)) {
                    return true;
                }
                else {
                    // GuideWeakManager.listenToMain()
                    return game.GuideManager.guideToMainView(3, "", _this);
                }
            }).then(function () {
                //穿戴神器按钮转到神器界面去了
                var view = UIMgr.getUIByName(UIConst.ArtifactView);
                game.GuideMask.show(view.btn_artifact, game.DirectionType.left);
                return game.GuideManager.listenNotification(game.ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS, function () {
                    return App.hero.lineupArtifactInfo.hasOwnProperty(type) && App.hero.lineupArtifactInfo[type] > 0;
                }, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.sq_shangzhen);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12038));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        ShenqiOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return ShenqiOpenGuide;
    }());
    game.ShenqiOpenGuide = ShenqiOpenGuide;
    // ================= 开启神器强化 ==================
    /** 开启神器强化 */
    var ShenqiStrengthOpenGuide = /** @class */ (function () {
        function ShenqiStrengthOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.sqSt_unlock] = this.unlock.bind(this);
            this.guideList[game.WeakGuideStep.sqSt_do] = this.strength.bind(this);
        }
        ShenqiStrengthOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideShenqiStr;
        };
        ShenqiStrengthOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        ShenqiStrengthOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                // 是否完成第二阶段
                var isFinish = App.hero.tasks.advanceLevel >= 2;
                // 解锁数量
                var count = game.ArtifactModel.getInstance().getUnlockArtifactNum();
                // 是否完成全部步骤
                var hasFinishGuide = game.GuideWeakManager.isFinishStep(game.WeakGuideStep.guideShenqiStr);
                // 重进时，1、可以解锁时引导解锁；2、中途断掉时，表示已解锁继续引导剩余步骤穿戴神器
                if (isFinish && (count < 2 || !hasFinishGuide)) {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideShenqiStr, resolve);
                }
                else {
                    game.GuideManager.listenNotification(game.UpRoadEvent.REWARD_SUCCESS, function () {
                        return App.hero.tasks.advanceLevel >= 2;
                    }, _this).then(function () {
                        game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideShenqiStr, resolve);
                    });
                }
            });
        };
        /** 解锁 */
        ShenqiStrengthOpenGuide.prototype.unlock = function (next) {
            var _this = this;
            if (game.ArtifactModel.getInstance().getUnlockArtifactNum() >= 2) {
                loghgy('兼容：已解锁两把神器，直接完成该引导步骤', game.WeakGuideStep.sqSt_unlock);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.sqSt_unlock).then(function () {
                    game.GuideMask.hide();
                    next();
                });
                return;
            }
            Promise.resolve().then(function () {
                // 在进阶之路获得的神器碎片
                if (UIMgr.hasStage(UIConst.UpRoadView)) {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ShowRewardItem, _this)
                        .then(function () {
                        var view = UIMgr.getUIByName(UIConst.UpRoadView);
                        game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.UpRoadView, _this);
                    });
                }
                return true;
            }).then(function () {
                _this._curStep = game.WeakGuideStep.sqSt_unlock;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12039));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenToMain(3, _this);
            }).then(function () {
                return game.GuideManager.timeout(100);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ArtifactView);
                var list = view.list_shenqi.array;
                var index = list.findIndex(function (item) {
                    return game.ArtifactModel.getInstance().isCanActivit(item.ID);
                });
                view.list_shenqi.selectedIndex = index;
                return game.GuideManager.timeout(100);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ArtifactView);
                game.GuideMask.show(view.btn_unlock, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.sqSt_unlock);
            }).then(function () {
                _this._curStep = game.WeakGuideStep.sqSt_do;
                if (UIMgr.hasStage(UIConst.Artifact_UnLockView)) {
                    return game.GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                }
                else {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Artifact_UnLockView, _this);
                }
            })
                .then(function () {
                game.GuideMask.hide();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Artifact_UnLockView, _this);
            })
                .then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        /** 强化 */
        ShenqiStrengthOpenGuide.prototype.strength = function (next) {
            var _this = this;
            if (game.ArtifactModel.getInstance().getUnlockArtifactNum() < 2) {
                loghgy('兼容：没有解锁两把神器不能进行强化，直接完成该引导步骤', game.WeakGuideStep.sqSt_do);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.sqSt_do).then(function () {
                    game.GuideMask.hide();
                    next();
                });
                return;
            }
            this._curStep = game.WeakGuideStep.sqSt_do;
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12040), false).then(function () {
                return game.GuideManager.listenNotification(game.GuideEvent.Guide_Talk_End, null, _this);
            }).then(function () {
                return game.GuideManager.talk(LanMgr.getLan("", 12041));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                if (UIMgr.hasStage(UIConst.ArtifactView)) {
                    return true;
                }
                else {
                    return game.GuideWeakManager.listenToMain(3, _this);
                }
            }).then(function () {
                return game.GuideManager.timeout(100);
            }).then(function () {
                // 手动定位到升级tab
                var view = UIMgr.getUIByName(UIConst.ArtifactView);
                view.tab.selectedIndex = 0;
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ArtifactView);
                game.GuideMask.show(view.btn_strength, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.ArtifactEvent.ARTIFACT_STRENGTH_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.sqSt_do);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        ShenqiStrengthOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return ShenqiStrengthOpenGuide;
    }());
    game.ShenqiStrengthOpenGuide = ShenqiStrengthOpenGuide;
    // ================= 开启竞技场 ==================
    /** 开启竞技场 */
    var JingjichangOpenGuide = /** @class */ (function () {
        function JingjichangOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.jjc_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.jjc_fight] = this.fight.bind(this);
        }
        JingjichangOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideJingjichang;
        };
        JingjichangOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        JingjichangOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.JINGJI, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideJingjichang, resolve);
                });
            });
        };
        /** 开启 */
        JingjichangOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.jjc_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.jjc_open, ModuleConst.JINGJI, _this);
            }).then(function () {
                next();
            });
        };
        /** 挑战 */
        JingjichangOpenGuide.prototype.fight = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.jjc_fight;
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12042))
                .then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.JINGJI, UIConst.ArenaView, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ArenaView);
                view.rankList.scrollBar.touchScrollEnable = false;
                var idx = view.rankList.array.findIndex(function (vo) { return vo.isMySelf(); });
                idx = idx - 1;
                var item = view.rankList.getCell(idx);
                game.GuideMask.show(item, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.PlayerLineupInfoView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.PlayerLineupInfoView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ArenaView);
                view.rankList.scrollBar.touchScrollEnable = true;
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.PlayerLineupInfoView);
                game.GuideMask.show(view.btnChallenge, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.jjc_fight);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        JingjichangOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return JingjichangOpenGuide;
    }());
    game.JingjichangOpenGuide = JingjichangOpenGuide;
    // ================= 开启世界boss ==================
    /** 开启世界boss */
    var WorldBossOpenGuide = /** @class */ (function () {
        function WorldBossOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.boss_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.boss_do] = this.challenge.bind(this);
        }
        WorldBossOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideWorldboss;
        };
        WorldBossOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        WorldBossOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.WORLD_BOSS, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideWorldboss, resolve);
                });
            });
        };
        /** 开启 */
        WorldBossOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.boss_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.boss_open, ModuleConst.WORLD_BOSS, _this);
            }).then(function () {
                next();
            });
        };
        WorldBossOpenGuide.prototype.challenge = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.boss_do;
            Promise.resolve()
                .then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12043));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.WORLD_BOSS, UIConst.WorldBoss_BossView, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.boss_do);
            }).then(function () {
                _this._curStep = 0;
                var view = UIMgr.getUIByName(UIConst.WorldBoss_BossView);
                game.GuideMask.show(view.btnChallege, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.WorldBoss_BossView);
                if (view) {
                    view.bossList.scrollBar.touchScrollEnable = true;
                }
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, _this);
            }).then(function () {
                resolve();
            });
        };
        WorldBossOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return WorldBossOpenGuide;
    }());
    game.WorldBossOpenGuide = WorldBossOpenGuide;
    // ================= 开启神界之门 ==================
    /** 开启神界之门 */
    var ShenjiemenOpenGuide = /** @class */ (function () {
        function ShenjiemenOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.sm_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.sm_do] = this.startGuide.bind(this);
        }
        ShenjiemenOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideShenjiemen;
        };
        ShenjiemenOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        ShenjiemenOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.SHENMEN, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideShenjiemen, resolve);
                });
            });
        };
        /** 开启 */
        ShenjiemenOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.sm_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.sm_open, ModuleConst.SHENMEN, _this);
            }).then(function () {
                next();
            });
        };
        ShenjiemenOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.sm_do;
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12044))
                .then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(0, "", _this);
            }).then(function () {
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Main3DView);
                game.GuideMask.show(view.btn_shenjiezhimen, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.GodDoorView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GodDoorView, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.sm_do);
            }).then(function () {
                _this._curStep = 0;
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GodDoorView);
                game.GuideMask.show(view.vs_item0.boxLeft, game.DirectionType.right, LanMgr.getLan("", 12045), true);
                return game.GuideManager.listenNotification(game.GodDoorEvent.TURN_BUILD_OK, function () {
                    var view = UIMgr.getUIByName(UIConst.GodDoorView);
                    return view.vs_item0.getLastType() == 3;
                }, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GodDoorView);
                game.GuideMask.show(view.vs_item0.btn_kaiqi, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.CommonRewardView, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GodDoorView);
                game.GuideMask.show(view.bgPanel.btnClose, game.DirectionType.left);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GodDoorView, _this);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        ShenjiemenOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return ShenjiemenOpenGuide;
    }());
    game.ShenjiemenOpenGuide = ShenjiemenOpenGuide;
    // ================= 开启每日副本 ==================
    /** 开启每日副本 */
    var DailyCopyOpenGuide = /** @class */ (function () {
        function DailyCopyOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.daily_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.daily_challenge] = this.challenge.bind(this);
        }
        DailyCopyOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideDailyCopy;
        };
        DailyCopyOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        DailyCopyOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.DAILY_COPY, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideDailyCopy, resolve);
                });
            });
        };
        /** 开启 */
        DailyCopyOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.daily_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.daily_open, ModuleConst.DAILY_COPY, _this);
            }).then(function () {
                next();
            });
        };
        /** 挑战 */
        DailyCopyOpenGuide.prototype.challenge = function (resolve) {
            var _this = this;
            if (game.DailyCopyModel.getInstance().isHasChallenge(iface.tb_prop.dailyCopyTypeKey.gold)) {
                loghgy('兼容：已挑战过每日副本，直接完成该引导步骤', game.WeakGuideStep.daily_challenge);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.daily_challenge).then(function () {
                    game.GuideMask.hide();
                    resolve();
                });
                return;
            }
            this._curStep = game.WeakGuideStep.daily_challenge;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12046));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.DAILY_COPY, UIConst.Copy_DailyMainView, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Copy_DailyMainView);
                game.GuideMask.show(view.img_box_0, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.Copy_DailyView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Copy_DailyView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Copy_DailyView);
                view.list.scrollBar.touchScrollEnable = false;
                var item = view.list.getCell(0);
                game.GuideMask.show(item.btn_fight, game.DirectionType.bottom);
                return new game.FightEndWaitStatus(true, _this).execute();
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Copy_DailyView);
                view.list.scrollBar.touchScrollEnable = true;
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.daily_challenge);
            }).then(function () {
                _this._curStep = 0;
                UIMgr.hideUIByName(UIConst.Copy_DailyView);
                var view = UIMgr.getUIByName(UIConst.SysTopView);
                game.GuideMask.show(view.btnClose, game.DirectionType.top);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Copy_DailyMainView, _this);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        DailyCopyOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return DailyCopyOpenGuide;
    }());
    game.DailyCopyOpenGuide = DailyCopyOpenGuide;
    // ================= 装备精炼引导 ==================
    /** 装备精炼引导 */
    var JinglianOpenGuide = /** @class */ (function () {
        function JinglianOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.jl_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.jl_wearEquip] = this.wearEquip.bind(this);
            this.guideList[game.WeakGuideStep.jl_jinglianEquip] = this.jinglianEquip1.bind(this);
        }
        JinglianOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideJinglian;
        };
        JinglianOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        JinglianOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.EQUIP_JINGLIAN, _this).then(function () {
                    // 所有上阵英雄都没有装备且背包无装备的前提下，直接忽略引导
                    var god = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
                    var isPass = god.every(function (vo) {
                        return vo.equipKeys.length <= 0 && !vo.isCanOneKeyEquip();
                    });
                    if (isPass) {
                        loghgy("\u517C\u5BB9\uFF1A\u6240\u6709\u4E0A\u9635\u82F1\u96C4\u90FD\u6CA1\u6709\u88C5\u5907\u4E14\u80CC\u5305\u65E0\u88C5\u5907\u7684\u524D\u63D0\u4E0B\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F31\u5F15\u5BFC\u6B65\u9AA4" + game.WeakGuideStep.guideJinglian);
                        game.GuideManager.guideRequest(0, game.WeakGuideStep.guideJinglian)
                            .then(function () {
                            _this._isPass = true;
                            resolve();
                        });
                        return;
                    }
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideJinglian, resolve);
                });
            });
        };
        /** 开启 */
        JinglianOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.jl_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                game.GuideWeakManager.setCurExcutingStep(game.WeakGuideStep.guideJinglian);
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.jl_open, ModuleConst.EQUIP_JINGLIAN, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12047));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                next();
            });
        };
        /** 穿戴装备 */
        JinglianOpenGuide.prototype.wearEquip = function (next) {
            var _this = this;
            var gods = App.hero.getGodAry();
            var godVo = gods[0];
            if (godVo.equipKeys.length > 0) {
                loghgy("\u517C\u5BB9\uFF1A\u7B2C1\u53EA\u82F1\u96C4\u5DF2\u7A7F\u6234\u4E86\u88C5\u5907\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + game.WeakGuideStep.jl_wearEquip);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.jl_wearEquip)
                    .then(function () {
                    next();
                });
                return;
            }
            this._curStep = game.WeakGuideStep.jl_wearEquip;
            game.GuideWeakManager.listenToMain(2, this)
                .then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                // 手动定位装备界面
                var view = UIMgr.getUIByName(UIConst.EquipView);
                view.onMouseIndex(null, EquipTabType.strength);
                return game.GuideManager.timeout(100);
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_wear, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.EquipEvent.ONEKE_WEAR_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.jl_wearEquip);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        JinglianOpenGuide.prototype.jinglianEquip1 = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.jl_jinglianEquip;
            loghgy('开始引导精炼装备1');
            // 默认选中第一个
            Promise.resolve().then(function () {
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    return true;
                }
                else {
                    return game.GuideWeakManager.listenToMain(2, _this);
                }
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                var tabView = view.view_list.selection;
                if (tabView instanceof game.TabEquip && tabView.curType == EquipTabType.refine) {
                    return true;
                }
                else {
                    game.GuideMask.show(view.list_tab.getCell(EquipTabType.refine), game.DirectionType.left);
                    return game.GuideManager.listenNotification(game.EquipEvent.SWITCH_TAB_SUCCESS, function () {
                        var tabView = view.view_list.selection;
                        return tabView instanceof game.TabEquip && tabView.curType == EquipTabType.refine;
                    }, _this);
                }
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_rootRefine, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.EquipEvent.ONEKE_REFINE_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.jl_jinglianEquip);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                next();
            });
        };
        JinglianOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return JinglianOpenGuide;
    }());
    game.JinglianOpenGuide = JinglianOpenGuide;
    // ================= 开启公会 ==================
    /** 开启公会 */
    var GuildOpenGuide = /** @class */ (function () {
        function GuildOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.guild_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.guild_do] = this.startGuide.bind(this);
        }
        GuildOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideGuild;
        };
        GuildOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        GuildOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.GONGHUI, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideGuild, resolve);
                });
            });
        };
        /** 开启 */
        GuildOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.guild_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.guild_open, ModuleConst.GONGHUI, _this);
            }).then(function () {
                next();
            });
        };
        GuildOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.guild_do;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12048));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(0, "", _this);
            }).then(function () {
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Main3DView);
                game.GuideMask.show(view.btnGonghui, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.GuildinitView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuildinitView, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.guild_do);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12049));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        GuildOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return GuildOpenGuide;
    }());
    game.GuildOpenGuide = GuildOpenGuide;
    // ================= 开启神秘宝藏 ==================
    /** 开启神秘宝藏 */
    var IslandOpenGuide = /** @class */ (function () {
        function IslandOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.island_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.island_do] = this.startGuide.bind(this);
        }
        IslandOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideIsland;
        };
        IslandOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        IslandOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.Island, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideIsland, resolve);
                });
            });
        };
        /** 开启 */
        IslandOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.island_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.island_open, ModuleConst.Island, _this);
            }).then(function () {
                next();
            });
        };
        IslandOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.island_do;
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12050))
                .then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.Island, UIConst.IslandView, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12051));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.IslandView);
                view.itemPanel.hScrollBar.touchScrollEnable = false;
                game.GuideMask.show(view.item0, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.OreMapView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.IslandView);
                view.itemPanel.hScrollBar.touchScrollEnable = true;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12052), false);
            }).then(function () {
                return game.GuideManager.listenNotification(game.GuideEvent.Guide_Talk_End, null, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12053));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.island_do);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                resolve();
            });
        };
        IslandOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return IslandOpenGuide;
    }());
    game.IslandOpenGuide = IslandOpenGuide;
    // ================= 开启远征 ==================
    /** 开启远征 */
    var YuanzhengOpenGuide = /** @class */ (function () {
        function YuanzhengOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.yuanzheng_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.yuanzheng_do] = this.startGuide.bind(this);
        }
        YuanzhengOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideYuanzheng;
        };
        YuanzhengOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        YuanzhengOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.EXPEDITION, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideYuanzheng, resolve);
                });
            });
        };
        /** 开启 */
        YuanzhengOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.yuanzheng_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.yuanzheng_open, ModuleConst.EXPEDITION, _this);
            }).then(function () {
                next();
            });
        };
        YuanzhengOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.yuanzheng_do;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12054));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.EXPEDITION, UIConst.YuanzhengView, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12055));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.YuanzhengView);
                view.itemPanel.hScrollBar.touchScrollEnable = false;
                game.GuideMask.show(view.item1, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.Yuanzheng_ChallengeView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Yuanzheng_ChallengeView, _this);
            }).then(function () {
                var mainView = UIMgr.getUIByName(UIConst.YuanzhengView);
                mainView.itemPanel.hScrollBar.touchScrollEnable = true;
                var view = UIMgr.getUIByName(UIConst.Yuanzheng_ChallengeView);
                game.GuideMask.show(view.btnChallenge, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.BuzhenView, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.yuanzheng_do);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12056));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        YuanzhengOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return YuanzhengOpenGuide;
    }());
    game.YuanzhengOpenGuide = YuanzhengOpenGuide;
    // ================= 迷雾森林 ==================
    /** 迷雾森林 */
    var ForestOpenGuide = /** @class */ (function () {
        function ForestOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.forest_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.forest_challenge] = this.challenge.bind(this);
        }
        ForestOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideFogForest;
        };
        ForestOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        ForestOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.FOG_FOREST, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideFogForest, resolve);
                });
            });
        };
        /** 开启 */
        ForestOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.forest_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.forest_open, ModuleConst.FOG_FOREST, _this);
            }).then(function () {
                next();
            });
        };
        /** 挑战 */
        ForestOpenGuide.prototype.challenge = function (next) {
            var _this = this;
            if (App.hero.forestMaxFloor > 0) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5F15\u5BFC\u8FC7\u8FF7\u96FE\u68EE\u6797\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + game.WeakGuideStep.forest_challenge);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.forest_challenge)
                    .then(function () {
                    next();
                });
                return;
            }
            this._curStep = game.WeakGuideStep.forest_challenge;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12057));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.FOG_FOREST, UIConst.FogForestView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.FogForestView);
                game.GuideMask.show(view.awardUI, game.DirectionType.bottom, LanMgr.getLan("", 12058), false);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.FogForestView);
                game.GuideMask.show(view.guanqia1.boxChallenge, game.DirectionType.bottom);
                return new game.FightEndWaitStatus(true, _this).execute();
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.forest_challenge);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.showWithTransparent();
                if (UIMgr.hasStage(UIConst.FogForestView)) {
                    return game.GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                }
                else {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FogForestView, _this);
                }
            }).then(function () {
                if (UIMgr.hasStage(UIConst.SysTopView)) {
                    return true;
                }
                else {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.SysTopView, _this);
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.SysTopView);
                game.GuideMask.show(view.btnClose, game.DirectionType.top);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FogForestView, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        ForestOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return ForestOpenGuide;
    }());
    game.ForestOpenGuide = ForestOpenGuide;
    // ================= 融魂引导 ==================
    /** 融魂引导 */
    var RonghunOpenGuide = /** @class */ (function () {
        function RonghunOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.ronghun_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.ronghun_do] = this.startGuide.bind(this);
        }
        RonghunOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideRonghun;
        };
        RonghunOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        RonghunOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.RONGHUN, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideRonghun, resolve);
                });
            });
        };
        /** 开启 */
        RonghunOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.ronghun_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.ronghun_open, ModuleConst.RONGHUN, _this);
            }).then(function () {
                next();
            });
        };
        RonghunOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.ronghun_do;
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12059))
                .then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenToMain(1, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                if (view.list_tab.selectedIndex != ShenlingTabType.ronghun) {
                    game.GuideMask.show(view.list_tab.getCell(ShenlingTabType.ronghun), game.DirectionType.left);
                    return game.GuideManager.listenNotification(game.GodEvent.SWITCH_TAB_SUCCESS, function () {
                        // 手动定位融魂界面
                        view.list_tab.selectedIndex = ShenlingTabType.ronghun;
                        return true;
                    }, _this);
                }
                else {
                    return true;
                }
            }).then(function () {
                return game.GuideManager.timeout(100);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewRonghun.jindubox2, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.GodEvent.SELECT_RONGHUN_ITEM, null, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewRonghun.btn_one, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.GodEvent.RONGHUN_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.ronghun_do);
            }).then(function () {
                _this._curStep = 0;
                resolve();
            });
        };
        RonghunOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return RonghunOpenGuide;
    }());
    game.RonghunOpenGuide = RonghunOpenGuide;
    // ================= 开启探险 ==================
    /** 开启探险 */
    var AdventureOpenGuide = /** @class */ (function () {
        function AdventureOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.advt_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.advt_do] = this.startGuide.bind(this);
        }
        AdventureOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideAdventure;
        };
        AdventureOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        AdventureOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.ADVENTURE, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideAdventure, resolve);
                });
            });
        };
        /** 开启 */
        AdventureOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.advt_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.advt_open, ModuleConst.ADVENTURE, _this);
            }).then(function () {
                next();
            });
        };
        AdventureOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.advt_do;
            loghgy('探险开启');
            game.GuideMask.hide();
            game.GuideManager.talk(LanMgr.getLan("", 12060))
                .then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(5, "", _this);
            }).then(function () {
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.bottomUI.btn_adventure, game.DirectionType.top);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.DafuwengView, _this);
            }).then(function () {
                return game.GuideManager.timeout(500);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.DafuwengView);
                game.GuideMask.show(view.btn_play, game.DirectionType.top);
                return game.GuideManager.listenNotification(game.DafuwengEvent.PLAY_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.advt_do);
            }).then(function () {
                _this._curStep = 0;
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.DafuwengView, _this);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        AdventureOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return AdventureOpenGuide;
    }());
    game.AdventureOpenGuide = AdventureOpenGuide;
    // ================= 宝石系统引导 ==================
    /** 宝石系统引导 */
    var BaoshiOpenGuide = /** @class */ (function () {
        function BaoshiOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.bs_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.bs_equip] = this.equip.bind(this);
            this.guideList[game.WeakGuideStep.bs_lvup] = this.gemLvup.bind(this);
        }
        BaoshiOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideBaoshi;
        };
        BaoshiOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        BaoshiOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.EQUIP_BAOSHI, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideBaoshi, resolve);
                });
            });
        };
        /** 开启 */
        BaoshiOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.bs_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.bs_open, ModuleConst.EQUIP_BAOSHI, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12061));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                next();
            });
        };
        /** 装备 */
        BaoshiOpenGuide.prototype.equip = function (next) {
            var _this = this;
            var gods = App.hero.getGodAry();
            var godVo = gods[0];
            if (godVo.equipKeys.length > 0) {
                loghgy("\u517C\u5BB9\uFF1A\u7B2C1\u53EA\u82F1\u96C4\u5DF2\u7A7F\u6234\u4E86\u88C5\u5907\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + game.WeakGuideStep.bs_equip);
                game.GuideManager.guideRequest(0, game.WeakGuideStep.bs_equip)
                    .then(function () {
                    next();
                });
                return;
            }
            this._curStep = game.WeakGuideStep.bs_equip;
            game.GuideWeakManager.listenToMain(2, this)
                .then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                // 手动定位装备界面
                var view = UIMgr.getUIByName(UIConst.EquipView);
                view.onMouseIndex(null, EquipTabType.strength);
                return game.GuideManager.timeout(100);
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_wear, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.EquipEvent.ONEKE_WEAR_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.bs_equip);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        /** 宝石升级 */
        BaoshiOpenGuide.prototype.gemLvup = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.bs_lvup;
            Promise.resolve().then(function () {
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    return true;
                }
                else {
                    return game.GuideWeakManager.listenToMain(2, _this);
                }
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                var tabView = view.view_list.selection;
                if (tabView instanceof game.TabBaoshiNew) {
                    return true;
                }
                else {
                    game.GuideMask.show(view.list_tab.getCell(EquipTabType.baoshi), game.DirectionType.left);
                    return game.GuideManager.listenNotification(game.EquipEvent.SWITCH_TAB_SUCCESS, function () {
                        tabView = view.view_list.selection;
                        return tabView instanceof game.TabBaoshiNew;
                    }, _this);
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(view.viewBaoshi.btnOnekeyWear, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.GemstoneEvent.ONE_KEY_WEAR_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.bs_lvup);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12062));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        BaoshiOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return BaoshiOpenGuide;
    }());
    game.BaoshiOpenGuide = BaoshiOpenGuide;
    // ================= 护送引导 ==================
    /** 护送引导 */
    var EscortOpenGuide = /** @class */ (function () {
        function EscortOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.escort_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.escort_refresh] = this.refresh.bind(this);
            this.guideList[game.WeakGuideStep.escort_go] = this.escort.bind(this);
        }
        EscortOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideEscort;
        };
        EscortOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        EscortOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.CARAVAN_ESCORT, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideEscort, resolve);
                });
            });
        };
        /** 开启 */
        EscortOpenGuide.prototype.open = function (next) {
            var _this = this;
            //承接上一个是失落遗迹的引导未关闭布阵界面
            UIMgr.hideUIByName(UIConst.BuzhenView);
            this._curStep = game.WeakGuideStep.escort_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.escort_open, ModuleConst.CARAVAN_ESCORT, _this);
            }).then(function () {
                next();
            });
        };
        /** 刷新 */
        EscortOpenGuide.prototype.refresh = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.escort_refresh;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                LanMgr.getLan("", 12064);
                return game.GuideManager.talk(LanMgr.getLan("", 12063), false);
            }).then(function () {
                return game.GuideManager.listenNotification(game.GuideEvent.Guide_Talk_End, null, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12064));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.CARAVAN_ESCORT, UIConst.EscortMainView, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EscortMainView);
                game.GuideMask.show(view.btn_refresh, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.EscortEvent.REFRESH_GOODS_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.escort_refresh);
            }).then(function () {
                _this._curStep = game.WeakGuideStep.escort_go;
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenNotification(game.EscortEvent.ANIMATION_END, null, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        /** 护送 */
        EscortOpenGuide.prototype.escort = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.escort_go;
            Promise.resolve().then(function () {
                if (UIMgr.hasStage(UIConst.EscortMainView)) {
                    return true;
                }
                else {
                    return game.GuideWeakManager.listenGoToSys(ModuleConst.CARAVAN_ESCORT, UIConst.EscortMainView, _this);
                }
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EscortMainView);
                game.GuideMask.show(view.btnEscort, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.EscortEvent.ESCORT_GOODS_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.escort_go);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12065));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.SysTopView);
                game.GuideMask.show(view.btnClose, game.DirectionType.top);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.EscortMainView, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        EscortOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return EscortOpenGuide;
    }());
    game.EscortOpenGuide = EscortOpenGuide;
    // ================= 开启试练塔 ==================
    /** 开启试练塔 */
    var TowerOpenGuide = /** @class */ (function () {
        function TowerOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.tower_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.tower_fight] = this.startGuide.bind(this);
        }
        TowerOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideTower;
        };
        TowerOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        TowerOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.SHILIANTA, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideTower, resolve);
                });
            });
        };
        /** 开启 */
        TowerOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.tower_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.tower_open, ModuleConst.SHILIANTA, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        TowerOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.tower_fight;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12066));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideWeakManager.listenGoToSys(ModuleConst.SHILIANTA, UIConst.ShiliantaView, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12067));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ShiliantaView);
                game.GuideMask.show(view.gkitem_0, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.SLT_GuanqiaView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.SLT_GuanqiaView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.SLT_GuanqiaView);
                game.GuideMask.show(view.btnChallenge, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.tower_fight);
            }).then(function () {
                return new game.FightEndWaitStatus(true, _this).execute();
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        TowerOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return TowerOpenGuide;
    }());
    game.TowerOpenGuide = TowerOpenGuide;
    // ================= 英雄觉醒开启 ==================
    /** 英雄觉醒开启 */
    var GodAwakenOpenGuide = /** @class */ (function () {
        function GodAwakenOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.awaken_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.awaken_do] = this.startGuide.bind(this);
        }
        GodAwakenOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideGodAwaken;
        };
        GodAwakenOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        GodAwakenOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.JUEXING, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideGodAwaken, resolve);
                });
            });
        };
        /** 开启 */
        GodAwakenOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.awaken_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.awaken_open, ModuleConst.JUEXING, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        GodAwakenOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.awaken_do;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12068));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(1);
            }).then(function () {
                // 手动定位信息界面
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                view.list_tab.selectedIndex = ShenlingTabType.awaken;
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewJuexing.btn_juexing, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.GodEvent.GOD_AWAKEN_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.awaken_do);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12069));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewJuexing.btnLook, game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GodSkinView, _this);
            }).then(function () {
                game.GuideMask.hide();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GodSkinView, _this);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        GodAwakenOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return GodAwakenOpenGuide;
    }());
    game.GodAwakenOpenGuide = GodAwakenOpenGuide;
    // ================= 圣物开启 ==================
    /** 圣物开启 */
    var TreasureOpenGuide = /** @class */ (function () {
        function TreasureOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.treasure_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.treasure_wear] = this.wear.bind(this);
            this.guideList[game.WeakGuideStep.treasure_streng] = this.strength.bind(this);
        }
        TreasureOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideTreasure;
        };
        TreasureOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        TreasureOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.TREASURE, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideTreasure, resolve);
                });
            });
        };
        /** 开启 */
        TreasureOpenGuide.prototype.open = function (next) {
            this._curStep = game.WeakGuideStep.treasure_open;
            game.GuideWeakManager.guideSysOpenToScene(-1, this)
                .then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.treasure_open);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        TreasureOpenGuide.prototype.wear = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.treasure_wear;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12070));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(1);
            }).then(function () {
                // 手动定位信息界面
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                view.list_tab.selectedIndex = ShenlingTabType.info;
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.godView.treasureUI, game.DirectionType.left);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ChooseTreasureView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ChooseTreasureView);
                game.GuideMask.show(view.itemList.getCell(0), game.DirectionType.bottom);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.TreasureTipsView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TreasureTipsView, _this);
            }).then(function () {
                var view = game.TreasureTipsView.getTipsUI();
                game.GuideMask.show(view.getBtnWear(), game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.TreasureEvent.WEAR_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.treasure_wear);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        TreasureOpenGuide.prototype.strength = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.treasure_streng;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12071));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(1);
            }).then(function () {
                // 手动定位信息界面
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                view.list_tab.selectedIndex = ShenlingTabType.info;
                return game.GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.godView.treasureUI, game.DirectionType.left);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TreasureTipsView, _this);
            }).then(function () {
                var view = game.TreasureTipsView.getTipsUI();
                game.GuideMask.show(view.getBtnStreng(), game.DirectionType.left);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TreasureStrengthView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.TreasureStrengthView);
                game.GuideMask.show(view.itemList.getCell(0), game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.TreasureEvent.SELECT_STRENGTH_TREASURE, null, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.TreasureStrengthView);
                game.GuideMask.show(view.btnStrength, game.DirectionType.bottom);
                return game.GuideManager.listenNotification(game.TreasureEvent.STRENGTH_SUCCESS, null, _this);
            }).then(function () {
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.treasure_streng);
            }).then(function () {
                _this._curStep = 0;
                game.GuideMask.hide();
                next();
            });
        };
        TreasureOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return TreasureOpenGuide;
    }());
    game.TreasureOpenGuide = TreasureOpenGuide;
    // ================= 开启聊天系统 ==================
    /** 开启聊天系统 */
    var ChatOpenGuide = /** @class */ (function () {
        function ChatOpenGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
            this.guideList = {};
            this.guideList[game.WeakGuideStep.chat_open] = this.open.bind(this);
            this.guideList[game.WeakGuideStep.chat_send] = this.startGuide.bind(this);
        }
        ChatOpenGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideChat;
        };
        ChatOpenGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        ChatOpenGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideWeakManager.listenSysOpen(ModuleConst.CHAT, _this).then(function () {
                    game.GuideWeakManager.runGuideList(_this.guideList, game.WeakGuideStep.guideChat, resolve);
                });
            });
        };
        /** 开启 */
        ChatOpenGuide.prototype.open = function (next) {
            var _this = this;
            this._curStep = game.WeakGuideStep.chat_open;
            game.GuideWeakManager.guideSysOpenToScene(5, this)
                .then(function () {
                return game.GuideWeakManager.waitSysOpenAnim(game.WeakGuideStep.chat_open, ModuleConst.CHAT, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
        };
        ChatOpenGuide.prototype.startGuide = function (resolve) {
            var _this = this;
            this._curStep = game.WeakGuideStep.chat_send;
            Promise.resolve().then(function () {
                game.GuideMask.hide();
                return game.GuideManager.talk(LanMgr.getLan("", 12072));
            }).then(function () {
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
            }).then(function () {
                return game.GuideManager.guideToMainView(5);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.HudView);
                var type = view.btn_chat.x >= view.width / 2 ? game.DirectionType.left : game.DirectionType.right;
                game.GuideMask.show(view.btn_chat, type);
                return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ChatView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ChatView);
                game.GuideMask.show(view.btnQuick, game.DirectionType.right);
                return game.GuideManager.listenNotification(game.ChatEvent.SHORTCUTS_OPEN_OR_HIDE, function () {
                    var view = UIMgr.getUIByName(UIConst.ChatView);
                    if (!view.quickUI.visible) {
                        view.quickUI.visible = true;
                    }
                    return true;
                }, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ChatView);
                view.quickUI.forbitHide = true;
                game.GuideMask.show(view.quickUI.lanList.getCell(0), game.DirectionType.top, "");
                return game.GuideManager.listenNotification(game.ChatEvent.CHAT_SEND_SUCCESS, null, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ChatView);
                view.quickUI.forbitHide = false;
                view.quickUI.onOpenOrHide();
                return game.GuideManager.guideRequest(0, game.WeakGuideStep.chat_send);
            }).then(function () {
                game.GuideMask.hide();
                resolve();
            });
        };
        ChatOpenGuide.prototype.dispose = function () {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return ChatOpenGuide;
    }());
    game.ChatOpenGuide = ChatOpenGuide;
})(game || (game = {}));
