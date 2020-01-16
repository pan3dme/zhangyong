

module game {

    export interface IGuideWaitStatus {
        getGuideStep: Function;        // 引导大步骤
        getCurChildStep: Function;
        execute(): Promise<any>;    // 执行
        callBack?: Function;        // 回调
        dispose(): void;        // 释放
    }

    // ================= 开启神器 ==================
    /** 开启神器 */
    export class ShenqiOpenGuide implements IGuideWaitStatus {

        private guideList: any;
        private _isPass: boolean = false;  // 是否跳过引导
        private _curStep: number = 0;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.sq_unlock] = this.unlock.bind(this);
            this.guideList[WeakGuideStep.sq_shangzhen] = this.shangzhen.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideShenqi;
        }
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                // 是否完成第一阶段
                let isFinish = App.hero.tasks.advanceLevel >= 1;
                // 解锁数量
                let count: number = ArtifactModel.getInstance().getUnlockArtifactNum();
                // 是否完成全部步骤
                let hasFinishGuide: boolean = GuideWeakManager.isFinishStep(WeakGuideStep.guideShenqi);
                // 重进时，1、可以解锁时引导解锁；2、中途断掉时，表示已解锁继续引导剩余步骤穿戴神器
                if (isFinish && (count == 0 || !hasFinishGuide)) {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideShenqi, resolve);
                } else {
                    GuideManager.listenNotification(UpRoadEvent.REWARD_SUCCESS, () => {
                        return App.hero.tasks.advanceLevel >= 1;
                    }, this).then(() => {
                        GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideShenqi, resolve);
                    });
                }
            });
        }

        unlock(next: Function): void {
            loghgy('解锁第一把神器引导');
            if (ArtifactModel.getInstance().getUnlockArtifactNum() >= 1) {
                loghgy('兼容：已解锁第一把神器，直接完成该引导步骤', WeakGuideStep.sq_unlock);
                GuideManager.guideRequest(0, WeakGuideStep.sq_unlock).then(() => {
                    GuideMask.hide();
                    next();
                });
                return;
            }
            Promise.resolve().then(() => {
                // 在进阶之路获得的神器碎片
                if (UIMgr.hasStage(UIConst.UpRoadView)) {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ShowRewardItem, this)
                        .then(() => {
                            let view = UIMgr.getUIByName(UIConst.UpRoadView) as UpRoadView;
                            GuideMask.show(view.btn_close, DirectionType.bottom)
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.UpRoadView, this)
                        });
                }
                return true;
            }).then(() => {
                return GuideWeakManager.listenToMain(3, this);
            }).then(() => {
                this._curStep = WeakGuideStep.sq_unlock;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12036));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.timeout(100);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ArtifactView) as ArtifactView;
                GuideMask.show(view.btn_unlock, DirectionType.bottom);
                return GuideManager.listenNotification(ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.sq_unlock);
            }).then(() => {
                this._curStep = WeakGuideStep.sq_shangzhen;
                if (UIMgr.hasStage(UIConst.Artifact_UnLockView)) {
                    return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                } else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Artifact_UnLockView, this);
                }
            })
                .then(() => {
                    GuideMask.hide();
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Artifact_UnLockView, this);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        shangzhen(next: Function): void {
            loghgy('上阵神器引导');
            let type = iface.tb_prop.lineupTypeKey.attack;
            if (App.hero.lineupArtifactInfo.hasOwnProperty(type) && App.hero.lineupArtifactInfo[type] > 0) {
                loghgy('兼容：已上阵过神器，直接完成该引导步骤', WeakGuideStep.sq_shangzhen);
                GuideManager.guideRequest(0, WeakGuideStep.sq_shangzhen).then(() => {
                    next();
                });
                return;
            }
            this._curStep = WeakGuideStep.sq_shangzhen;
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12037))
                .then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    if (UIMgr.hasStage(UIConst.ArtifactView)) {
                        return true;
                    } else {
                        // GuideWeakManager.listenToMain()
                        return GuideManager.guideToMainView(3, "", this);
                    }
                }).then(() => {
                    //穿戴神器按钮转到神器界面去了
                    let view = UIMgr.getUIByName(UIConst.ArtifactView) as ArtifactView;
                    GuideMask.show(view.btn_artifact, DirectionType.left);
                    return GuideManager.listenNotification(ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS, () => {
                        return App.hero.lineupArtifactInfo.hasOwnProperty(type) && App.hero.lineupArtifactInfo[type] > 0;
                    }, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.sq_shangzhen);
                }).then(() => {
                    this._curStep = 0;
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12038));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启神器强化 ==================
    /** 开启神器强化 */
    export class ShenqiStrengthOpenGuide implements IGuideWaitStatus {

        private guideList: any;
        private _isPass: boolean = false;  // 是否跳过引导
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.sqSt_unlock] = this.unlock.bind(this);
            this.guideList[WeakGuideStep.sqSt_do] = this.strength.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideShenqiStr;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                // 是否完成第二阶段
                let isFinish = App.hero.tasks.advanceLevel >= 2;
                // 解锁数量
                let count: number = ArtifactModel.getInstance().getUnlockArtifactNum();
                // 是否完成全部步骤
                let hasFinishGuide: boolean = GuideWeakManager.isFinishStep(WeakGuideStep.guideShenqiStr);
                // 重进时，1、可以解锁时引导解锁；2、中途断掉时，表示已解锁继续引导剩余步骤穿戴神器
                if (isFinish && (count < 2 || !hasFinishGuide)) {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideShenqiStr, resolve);
                } else {
                    GuideManager.listenNotification(UpRoadEvent.REWARD_SUCCESS, () => {
                        return App.hero.tasks.advanceLevel >= 2;
                    }, this).then(() => {
                        GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideShenqiStr, resolve);
                    });
                }
            });
        }
        /** 解锁 */
        unlock(next: Function): void {
            if (ArtifactModel.getInstance().getUnlockArtifactNum() >= 2) {
                loghgy('兼容：已解锁两把神器，直接完成该引导步骤', WeakGuideStep.sqSt_unlock);
                GuideManager.guideRequest(0, WeakGuideStep.sqSt_unlock).then(() => {
                    GuideMask.hide();
                    next();
                });
                return;
            }
            Promise.resolve().then(() => {
                // 在进阶之路获得的神器碎片
                if (UIMgr.hasStage(UIConst.UpRoadView)) {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ShowRewardItem, this)
                        .then(() => {
                            let view = UIMgr.getUIByName(UIConst.UpRoadView) as UpRoadView;
                            GuideMask.show(view.btn_close, DirectionType.bottom)
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.UpRoadView, this)
                        });
                }
                return true;
            }).then(() => {
                this._curStep = WeakGuideStep.sqSt_unlock;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12039));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideWeakManager.listenToMain(3, this);
            }).then(() => {
                return GuideManager.timeout(100);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ArtifactView) as ArtifactView;
                let list: tb.TB_artifact[] = view.list_shenqi.array;
                let index = list.findIndex((item) => {
                    return ArtifactModel.getInstance().isCanActivit(item.ID);
                });
                view.list_shenqi.selectedIndex = index;
                return GuideManager.timeout(100);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ArtifactView) as ArtifactView;
                GuideMask.show(view.btn_unlock, DirectionType.bottom);
                return GuideManager.listenNotification(ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.sqSt_unlock);
            }).then(() => {
                this._curStep = WeakGuideStep.sqSt_do;
                if (UIMgr.hasStage(UIConst.Artifact_UnLockView)) {
                    return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                } else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Artifact_UnLockView, this);
                }
            })
                .then(() => {
                    GuideMask.hide();
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Artifact_UnLockView, this);
                })
                .then(() => {
                    GuideMask.hide();
                    next();
                });
        }
        /** 强化 */
        private strength(next: Function): void {
            if (ArtifactModel.getInstance().getUnlockArtifactNum() < 2) {
                loghgy('兼容：没有解锁两把神器不能进行强化，直接完成该引导步骤', WeakGuideStep.sqSt_do);
                GuideManager.guideRequest(0, WeakGuideStep.sqSt_do).then(() => {
                    GuideMask.hide();
                    next();
                });
                return;
            }
            this._curStep = WeakGuideStep.sqSt_do;
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12040), false).then(() => {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End, null, this);
            }).then(() => {
                return GuideManager.talk(LanMgr.getLan("",12041));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                if (UIMgr.hasStage(UIConst.ArtifactView)) {
                    return true;
                } else {
                    return GuideWeakManager.listenToMain(3, this);
                }
            }).then(() => {
                return GuideManager.timeout(100);
            }).then(() => {
                // 手动定位到升级tab
                let view = UIMgr.getUIByName(UIConst.ArtifactView) as ArtifactView;
                view.tab.selectedIndex = 0;
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ArtifactView) as ArtifactView;
                GuideMask.show(view.btn_strength, DirectionType.bottom);
                return GuideManager.listenNotification(ArtifactEvent.ARTIFACT_STRENGTH_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.sqSt_do);
            }).then(() => {
                GuideMask.hide();
                next();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启竞技场 ==================
    /** 开启竞技场 */
    export class JingjichangOpenGuide implements IGuideWaitStatus {

        private guideList: any;
        private _isPass: boolean = false;  // 是否跳过引导
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.jjc_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.jjc_fight] = this.fight.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideJingjichang;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.JINGJI, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideJingjichang, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.jjc_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.jjc_open, ModuleConst.JINGJI, this);
                }).then(() => {
                    next();
                });
        }

        /** 挑战 */
        private fight(next: Function): void {
            this._curStep = WeakGuideStep.jjc_fight;
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12042))
                .then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideWeakManager.listenGoToSys(ModuleConst.JINGJI, UIConst.ArenaView, this);
                }).then(() => {
                    return GuideManager.timeout(300);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.ArenaView) as ArenaView;
                    view.rankList.scrollBar.touchScrollEnable = false;
                    let idx = view.rankList.array.findIndex((vo: ArenaInfoVo) => vo.isMySelf());
                    idx = idx - 1;
                    let item = view.rankList.getCell(idx);
                    GuideMask.show(item, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.PlayerLineupInfoView, this);
                }).then(() => {
                    GuideMask.showWithTransparent();
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.PlayerLineupInfoView, this);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.ArenaView) as ArenaView;
                    view.rankList.scrollBar.touchScrollEnable = true;
                    return GuideManager.timeout(200);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.PlayerLineupInfoView) as common.PlayerLineupInfoView;
                    GuideMask.show(view.btnChallenge, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this)
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.jjc_fight);
                }).then(() => {
                    this._curStep = 0;
                    GuideMask.hide();
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, this);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }
        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启世界boss ==================
    /** 开启世界boss */
    export class WorldBossOpenGuide implements IGuideWaitStatus {

        private guideList: any;
        private _isPass: boolean = false;  // 是否跳过引导
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.boss_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.boss_do] = this.challenge.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideWorldboss;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.WORLD_BOSS, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideWorldboss, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.boss_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.boss_open, ModuleConst.WORLD_BOSS, this);
                }).then(() => {
                    next();
                });
        }

        private challenge(resolve: Function): void {
            this._curStep = WeakGuideStep.boss_do;
            Promise.resolve()
                .then(() => {
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12043))
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideWeakManager.listenGoToSys(ModuleConst.WORLD_BOSS, UIConst.WorldBoss_BossView, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.boss_do);
                }).then(() => {
                    this._curStep = 0;
                    let view = UIMgr.getUIByName(UIConst.WorldBoss_BossView) as WorldBossView;
                    GuideMask.show(view.btnChallege, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.WorldBoss_BossView) as WorldBossView;
                    if (view) {
                        view.bossList.scrollBar.touchScrollEnable = true;
                    }
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, this);
                }).then(() => {
                    resolve();
                });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }
    // ================= 开启神界之门 ==================
    /** 开启神界之门 */
    export class ShenjiemenOpenGuide implements IGuideWaitStatus {
        private guideList: any;
        private _isPass: boolean = false;  // 是否跳过引导
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.sm_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.sm_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideShenjiemen;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.SHENMEN, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideShenjiemen, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.sm_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.sm_open, ModuleConst.SHENMEN, this);
                }).then(() => {
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.sm_do;
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12044))
                .then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideManager.guideToMainView(0, "", this);
                }).then(() => {
                    return GuideManager.timeout(200);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.Main3DView) as MainView;
                    GuideMask.show(view.btn_shenjiezhimen, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.GodDoorView, this);
                }).then(() => {
                    GuideMask.showWithTransparent();
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GodDoorView, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.sm_do);
                }).then(() => {
                    this._curStep = 0;
                    return GuideManager.timeout(300);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.GodDoorView) as CurMainView;
                    GuideMask.show(view.vs_item0.boxLeft, DirectionType.right, LanMgr.getLan("",12045), true);
                    return GuideManager.listenNotification(GodDoorEvent.TURN_BUILD_OK, () => {
                        let view = UIMgr.getUIByName(UIConst.GodDoorView) as CurMainView;
                        return view.vs_item0.getLastType() == 3;
                    }, this);
                }).then(() => {
                    return GuideManager.timeout(300);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.GodDoorView) as CurMainView;
                    GuideMask.show(view.vs_item0.btn_kaiqi, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.CommonRewardView, this);
                }).then(() => {
                    GuideMask.hide();
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView, this);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.GodDoorView) as CurMainView;
                    GuideMask.show(view.bgPanel.btnClose, DirectionType.left);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GodDoorView, this);
                }).then(() => {
                    GuideMask.hide();
                    resolve();
                });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启每日副本 ==================
    /** 开启每日副本 */
    export class DailyCopyOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.daily_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.daily_challenge] = this.challenge.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideDailyCopy;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.DAILY_COPY, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideDailyCopy, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.daily_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.daily_open, ModuleConst.DAILY_COPY, this);
                }).then(() => {
                    next();
                });
        }

        /** 挑战 */
        private challenge(resolve: Function): void {
            if (DailyCopyModel.getInstance().isHasChallenge(iface.tb_prop.dailyCopyTypeKey.gold)) {
                loghgy('兼容：已挑战过每日副本，直接完成该引导步骤', WeakGuideStep.daily_challenge);
                GuideManager.guideRequest(0, WeakGuideStep.daily_challenge).then(() => {
                    GuideMask.hide();
                    resolve();
                });
                return;
            }
            this._curStep = WeakGuideStep.daily_challenge;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12046));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideWeakManager.listenGoToSys(ModuleConst.DAILY_COPY, UIConst.Copy_DailyMainView, this);
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.Copy_DailyMainView) as DailyCopyMainView;
                GuideMask.show(view.img_box_0, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.Copy_DailyView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Copy_DailyView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.Copy_DailyView) as DailyCopyView;
                view.list.scrollBar.touchScrollEnable = false;
                let item = view.list.getCell(0) as DailyCopyIR;
                GuideMask.show(item.btn_fight, DirectionType.bottom);
                return new FightEndWaitStatus(true, this).execute();
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.Copy_DailyView) as DailyCopyView;
                view.list.scrollBar.touchScrollEnable = true;
                return GuideManager.guideRequest(0, WeakGuideStep.daily_challenge);
            }).then(() => {
                this._curStep = 0;
                UIMgr.hideUIByName(UIConst.Copy_DailyView);
                let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                GuideMask.show(view.btnClose, DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Copy_DailyMainView, this);
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 装备精炼引导 ==================
    /** 装备精炼引导 */
    export class JinglianOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.jl_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.jl_wearEquip] = this.wearEquip.bind(this);
            this.guideList[WeakGuideStep.jl_jinglianEquip] = this.jinglianEquip1.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideJinglian;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.EQUIP_JINGLIAN, this).then(() => {
                    // 所有上阵英雄都没有装备且背包无装备的前提下，直接忽略引导
                    let god = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
                    let isPass = god.every((vo) => {
                        return vo.equipKeys.length <= 0 && !vo.isCanOneKeyEquip();
                    });
                    if (isPass) {
                        loghgy(`兼容：所有上阵英雄都没有装备且背包无装备的前提下，直接完成该弱引导步骤${WeakGuideStep.guideJinglian}`);
                        GuideManager.guideRequest(0, WeakGuideStep.guideJinglian)
                            .then(() => {
                                this._isPass = true;
                                resolve();
                            });
                        return;
                    }
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideJinglian, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.jl_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    GuideWeakManager.setCurExcutingStep(WeakGuideStep.guideJinglian);
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.jl_open, ModuleConst.EQUIP_JINGLIAN, this);
                }).then(() => {
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12047));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    next();
                });
        }

        /** 穿戴装备 */
        private wearEquip(next: Function): void {
            let gods = App.hero.getGodAry();
            let godVo = gods[0];
            if (godVo.equipKeys.length > 0) {
                loghgy(`兼容：第1只英雄已穿戴了装备，直接完成该引导步骤${WeakGuideStep.jl_wearEquip}`);
                GuideManager.guideRequest(0, WeakGuideStep.jl_wearEquip)
                    .then(() => {
                        next();
                    });
                return;
            }
            this._curStep = WeakGuideStep.jl_wearEquip;
            GuideWeakManager.listenToMain(2, this)
                .then(() => {
                    return GuideManager.timeout(300);
                }).then(() => {
                    // 手动定位装备界面
                    let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    view.onMouseIndex(null, EquipTabType.strength);
                    return GuideManager.timeout(100);
                }).then(() => {
                    let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    GuideMask.show(ui.viewEquip.btn_wear, DirectionType.bottom);
                    return GuideManager.listenNotification(EquipEvent.ONEKE_WEAR_SUCCESS, null, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.jl_wearEquip);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        private jinglianEquip1(next: Function): void {
            this._curStep = WeakGuideStep.jl_jinglianEquip;
            loghgy('开始引导精炼装备1');
            // 默认选中第一个
            Promise.resolve().then(() => {
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    return true;
                } else {
                    return GuideWeakManager.listenToMain(2, this);
                }
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                let tabView = view.view_list.selection;
                if (tabView instanceof TabEquip && tabView.curType == EquipTabType.refine) {
                    return true;
                } else {
                    GuideMask.show(view.list_tab.getCell(EquipTabType.refine), DirectionType.left);
                    return GuideManager.listenNotification(EquipEvent.SWITCH_TAB_SUCCESS, () => {
                        let tabView = view.view_list.selection;
                        return tabView instanceof TabEquip && tabView.curType == EquipTabType.refine;
                    }, this);
                }
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                GuideMask.show(ui.viewEquip.btn_rootRefine, DirectionType.bottom);
                return GuideManager.listenNotification(EquipEvent.ONEKE_REFINE_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.jl_jinglianEquip);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                next();
            })
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启公会 ==================
    /** 开启公会 */
    export class GuildOpenGuide implements IGuideWaitStatus {

        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.guild_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.guild_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideGuild;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.GONGHUI, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideGuild, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.guild_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.guild_open, ModuleConst.GONGHUI, this);
                }).then(() => {
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.guild_do;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12048))
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.guideToMainView(0, "", this);
            }).then(() => {
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.Main3DView) as MainView;
                GuideMask.show(view.btnGonghui, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.GuildinitView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuildinitView, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.guild_do);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12049));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启神秘宝藏 ==================
    /** 开启神秘宝藏 */
    export class IslandOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.island_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.island_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideIsland;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.Island, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideIsland, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.island_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.island_open, ModuleConst.Island, this);
                }).then(() => {
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.island_do;
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12050))
                .then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideWeakManager.listenGoToSys(ModuleConst.Island, UIConst.IslandView, this);
                }).then(() => {
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12051));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.IslandView) as IslandView;
                    view.itemPanel.hScrollBar.touchScrollEnable = false;
                    GuideMask.show(view.item0, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.OreMapView, this);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.IslandView) as IslandView;
                    view.itemPanel.hScrollBar.touchScrollEnable = true;
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12052), false);
                }).then(() => {
                    return GuideManager.listenNotification(GuideEvent.Guide_Talk_End, null, this);
                }).then(() => {
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12053));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.island_do);
                }).then(() => {
                    this._curStep = 0;
                    GuideMask.hide();
                    resolve();
                });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启远征 ==================
    /** 开启远征 */
    export class YuanzhengOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.yuanzheng_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.yuanzheng_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideYuanzheng;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.EXPEDITION, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideYuanzheng, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.yuanzheng_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.yuanzheng_open, ModuleConst.EXPEDITION, this);
                }).then(() => {
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.yuanzheng_do;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12054));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideWeakManager.listenGoToSys(ModuleConst.EXPEDITION, UIConst.YuanzhengView, this);
            }).then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12055));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.YuanzhengView) as YuanzhengView;
                view.itemPanel.hScrollBar.touchScrollEnable = false
                GuideMask.show(view.item1, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.Yuanzheng_ChallengeView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Yuanzheng_ChallengeView, this);
            }).then(() => {
                let mainView = UIMgr.getUIByName(UIConst.YuanzhengView) as YuanzhengView;
                mainView.itemPanel.hScrollBar.touchScrollEnable = true
                let view = UIMgr.getUIByName(UIConst.Yuanzheng_ChallengeView) as YZChallengeView;
                GuideMask.show(view.btnChallenge, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.BuzhenView, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.yuanzheng_do);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12056));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 迷雾森林 ==================
    /** 迷雾森林 */
    export class ForestOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.forest_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.forest_challenge] = this.challenge.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideFogForest;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.FOG_FOREST, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideFogForest, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.forest_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.forest_open, ModuleConst.FOG_FOREST, this);
                }).then(() => {
                    next();
                });
        }

        /** 挑战 */
        private challenge(next: Function): void {
            if (App.hero.forestMaxFloor > 0) {
                loghgy(`兼容：已引导过迷雾森林，直接完成该引导步骤${WeakGuideStep.forest_challenge}`);
                GuideManager.guideRequest(0, WeakGuideStep.forest_challenge)
                    .then(() => {
                        next();
                    });
                return;
            }
            this._curStep = WeakGuideStep.forest_challenge;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12057));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideWeakManager.listenGoToSys(ModuleConst.FOG_FOREST, UIConst.FogForestView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.FogForestView) as FogForestView;
                GuideMask.show(view.awardUI, DirectionType.bottom, LanMgr.getLan("",12058), false);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.FogForestView) as FogForestView;
                GuideMask.show(view.guanqia1.boxChallenge, DirectionType.bottom);
                return new FightEndWaitStatus(true, this).execute();
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.forest_challenge)
            }).then(() => {
                this._curStep = 0;
                GuideMask.showWithTransparent();
                if (UIMgr.hasStage(UIConst.FogForestView)) {
                    return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                } else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FogForestView, this);
                }
            }).then(() => {
                if (UIMgr.hasStage(UIConst.SysTopView)) {
                    return true;
                } else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.SysTopView, this);
                }
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                GuideMask.show(view.btnClose, DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FogForestView, this);
            }).then(() => {
                GuideMask.hide();
                next();
            })
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 融魂引导 ==================
    /** 融魂引导 */
    export class RonghunOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.ronghun_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.ronghun_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideRonghun;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.RONGHUN, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideRonghun, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.ronghun_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.ronghun_open, ModuleConst.RONGHUN, this);
                }).then(() => {
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.ronghun_do;
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12059))
                .then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideWeakManager.listenToMain(1, this);
                }).then(() => {
                    return GuideManager.timeout(300);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                    if (view.list_tab.selectedIndex != ShenlingTabType.ronghun) {
                        GuideMask.show(view.list_tab.getCell(ShenlingTabType.ronghun) as Laya.Sprite, DirectionType.left);
                        return GuideManager.listenNotification(GodEvent.SWITCH_TAB_SUCCESS, () => {
                            // 手动定位融魂界面
                            view.list_tab.selectedIndex = ShenlingTabType.ronghun;
                            return true;
                        }, this);
                    } else {
                        return true;
                    }
                }).then(() => {
                    return GuideManager.timeout(100);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                    GuideMask.show(view.viewRonghun.jindubox2, DirectionType.bottom);
                    return GuideManager.listenNotification(GodEvent.SELECT_RONGHUN_ITEM, null, this);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                    GuideMask.show(view.viewRonghun.btn_one, DirectionType.bottom);
                    return GuideManager.listenNotification(GodEvent.RONGHUN_SUCCESS, null, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.ronghun_do);
                }).then(() => {
                    this._curStep = 0;
                    resolve();
                });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启探险 ==================
    /** 开启探险 */
    export class AdventureOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.advt_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.advt_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideAdventure;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.ADVENTURE, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideAdventure, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.advt_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.advt_open, ModuleConst.ADVENTURE, this);
                }).then(() => {
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.advt_do;
            loghgy('探险开启');
            GuideMask.hide();
            GuideManager.talk(LanMgr.getLan("",12060))
                .then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    return GuideManager.guideToMainView(5, "", this);
                }).then(() => {
                    return GuideManager.timeout(200);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                    GuideMask.show(view.bottomUI.btn_adventure, DirectionType.top);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.DafuwengView, this);
                }).then(() => {
                    return GuideManager.timeout(500);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.DafuwengView) as DafuwengView;
                    GuideMask.show(view.btn_play, DirectionType.top);
                    return GuideManager.listenNotification(DafuwengEvent.PLAY_SUCCESS, null, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.advt_do);
                }).then(() => {
                    this._curStep = 0;
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.DafuwengView, this);
                }).then(() => {
                    GuideMask.hide();
                    resolve();
                });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 宝石系统引导 ==================
    /** 宝石系统引导 */
    export class BaoshiOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.bs_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.bs_equip] = this.equip.bind(this);
            this.guideList[WeakGuideStep.bs_lvup] = this.gemLvup.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideBaoshi;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.EQUIP_BAOSHI, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideBaoshi, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.bs_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.bs_open, ModuleConst.EQUIP_BAOSHI, this);
                }).then(() => {
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12061));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(() => {
                    next();
                });
        }

        /** 装备 */
        private equip(next: Function): void {
            let gods = App.hero.getGodAry();
            let godVo = gods[0];
            if (godVo.equipKeys.length > 0) {
                loghgy(`兼容：第1只英雄已穿戴了装备，直接完成该引导步骤${WeakGuideStep.bs_equip}`);
                GuideManager.guideRequest(0, WeakGuideStep.bs_equip)
                    .then(() => {
                        next();
                    });
                return;
            }
            this._curStep = WeakGuideStep.bs_equip;
            GuideWeakManager.listenToMain(2, this)
                .then(() => {
                    return GuideManager.timeout(300);
                }).then(() => {
                    // 手动定位装备界面
                    let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    view.onMouseIndex(null, EquipTabType.strength);
                    return GuideManager.timeout(100);
                }).then(() => {
                    let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                    GuideMask.show(ui.viewEquip.btn_wear, DirectionType.bottom);
                    return GuideManager.listenNotification(EquipEvent.ONEKE_WEAR_SUCCESS, null, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.bs_equip);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }
        /** 宝石升级 */
        private gemLvup(next: Function): void {
            this._curStep = WeakGuideStep.bs_lvup;
            Promise.resolve().then(() => {
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    return true;
                } else {
                    return GuideWeakManager.listenToMain(2, this);
                }
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                let tabView = view.view_list.selection;
                if (tabView instanceof TabBaoshiNew) {
                    return true;
                } else {
                    GuideMask.show(view.list_tab.getCell(EquipTabType.baoshi), DirectionType.left);
                    return GuideManager.listenNotification(EquipEvent.SWITCH_TAB_SUCCESS, () => {
                        tabView = view.view_list.selection;
                        return tabView instanceof TabBaoshiNew;
                    }, this);
                }
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                GuideMask.show(view.viewBaoshi.btnOnekeyWear, DirectionType.bottom);
                return GuideManager.listenNotification(GemstoneEvent.ONE_KEY_WEAR_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.bs_lvup);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12062));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                GuideMask.hide();
                next();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 护送引导 ==================
    /** 护送引导 */
    export class EscortOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.escort_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.escort_refresh] = this.refresh.bind(this);
            this.guideList[WeakGuideStep.escort_go] = this.escort.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideEscort;
        }
        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.CARAVAN_ESCORT, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideEscort, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            //承接上一个是失落遗迹的引导未关闭布阵界面
            UIMgr.hideUIByName(UIConst.BuzhenView);
            this._curStep = WeakGuideStep.escort_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.escort_open, ModuleConst.CARAVAN_ESCORT, this);
                }).then(() => {
                    next();
                });
        }

        /** 刷新 */
        private refresh(next: Function): void {
            this._curStep = WeakGuideStep.escort_refresh;
            Promise.resolve().then(() => {
                GuideMask.hide();LanMgr.getLan("",12064)
                return GuideManager.talk(LanMgr.getLan("",12063), false);
            }).then(() => {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End, null, this);
            }).then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12064))
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideWeakManager.listenGoToSys(ModuleConst.CARAVAN_ESCORT, UIConst.EscortMainView, this);
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EscortMainView) as EscortMainView;
                GuideMask.show(view.btn_refresh, DirectionType.bottom);
                return GuideManager.listenNotification(EscortEvent.REFRESH_GOODS_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.escort_refresh)
            }).then(() => {
                this._curStep = WeakGuideStep.escort_go;
                GuideMask.showWithTransparent();
                return GuideManager.listenNotification(EscortEvent.ANIMATION_END, null, this);
            }).then(() => {
                GuideMask.hide();
                next();
            });
        }
        /** 护送 */
        private escort(next: Function): void {
            this._curStep = WeakGuideStep.escort_go;
            Promise.resolve().then(() => {
                if (UIMgr.hasStage(UIConst.EscortMainView)) {
                    return true;
                } else {
                    return GuideWeakManager.listenGoToSys(ModuleConst.CARAVAN_ESCORT, UIConst.EscortMainView, this);
                }
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EscortMainView) as EscortMainView;
                GuideMask.show(view.btnEscort, DirectionType.bottom);
                return GuideManager.listenNotification(EscortEvent.ESCORT_GOODS_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.escort_go);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12065));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                GuideMask.show(view.btnClose, DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.EscortMainView, this);
            }).then(() => {
                GuideMask.hide();
                next();
            });
        }


        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启试练塔 ==================
    /** 开启试练塔 */
    export class TowerOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.tower_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.tower_fight] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideTower;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.SHILIANTA, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideTower, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.tower_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.tower_open, ModuleConst.SHILIANTA, this);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.tower_fight;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12066));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideWeakManager.listenGoToSys(ModuleConst.SHILIANTA, UIConst.ShiliantaView, this);
            }).then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12067));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ShiliantaView) as TowerView;
                GuideMask.show(view.gkitem_0, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.SLT_GuanqiaView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.SLT_GuanqiaView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.SLT_GuanqiaView) as TowerGuanqiaView;
                GuideMask.show(view.btnChallenge, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this);
            }).then(()=>{
                return GuideManager.guideRequest(0, WeakGuideStep.tower_fight);
            }).then(()=>{
                return new FightEndWaitStatus(true, this).execute();
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 英雄觉醒开启 ==================
    /** 英雄觉醒开启 */
    export class GodAwakenOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.awaken_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.awaken_do] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideGodAwaken;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.JUEXING, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideGodAwaken, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.awaken_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.awaken_open, ModuleConst.JUEXING, this);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.awaken_do;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12068));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.guideToMainView(1);
            }).then(() => {
                // 手动定位信息界面
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                view.list_tab.selectedIndex = ShenlingTabType.awaken;
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.viewJuexing.btn_juexing, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.GOD_AWAKEN_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.awaken_do);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12069));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.viewJuexing.btnLook, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GodSkinView, this);
            }).then(() => {
                GuideMask.hide();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GodSkinView, this);
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 圣物开启 ==================
    /** 圣物开启 */
    export class TreasureOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.treasure_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.treasure_wear] = this.wear.bind(this);
            this.guideList[WeakGuideStep.treasure_streng] = this.strength.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideTreasure;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.TREASURE, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideTreasure, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.treasure_open;
            GuideWeakManager.guideSysOpenToScene(-1, this)
                .then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.treasure_open);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        private wear(resolve: Function): void {
            this._curStep = WeakGuideStep.treasure_wear;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12070));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.guideToMainView(1);
            }).then(() => {
                // 手动定位信息界面
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                view.list_tab.selectedIndex = ShenlingTabType.info;
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.godView.treasureUI, DirectionType.left);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ChooseTreasureView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ChooseTreasureView) as ChooseTreasureView;
                GuideMask.show(view.itemList.getCell(0), DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.TreasureTipsView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TreasureTipsView, this);
            }).then(() => {
                let view = TreasureTipsView.getTipsUI();
                GuideMask.show(view.getBtnWear(), DirectionType.bottom);
                return GuideManager.listenNotification(TreasureEvent.WEAR_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.treasure_wear);
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        strength(next: Function): void {
            this._curStep = WeakGuideStep.treasure_streng;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12071));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.guideToMainView(1);
            }).then(() => {
                // 手动定位信息界面
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                view.list_tab.selectedIndex = ShenlingTabType.info;
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.godView.treasureUI, DirectionType.left);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TreasureTipsView, this);
            }).then(() => {
                let view = TreasureTipsView.getTipsUI();
                GuideMask.show(view.getBtnStreng(), DirectionType.left);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TreasureStrengthView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.TreasureStrengthView) as TreasureStrengthView;
                GuideMask.show(view.itemList.getCell(0), DirectionType.bottom);
                return GuideManager.listenNotification(TreasureEvent.SELECT_STRENGTH_TREASURE, null, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.TreasureStrengthView) as TreasureStrengthView;
                GuideMask.show(view.btnStrength, DirectionType.bottom);
                return GuideManager.listenNotification(TreasureEvent.STRENGTH_SUCCESS, null, this);
            }).then(() => {
                return GuideManager.guideRequest(0, WeakGuideStep.treasure_streng);
            }).then(() => {
                this._curStep = 0;
                GuideMask.hide();
                next();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    // ================= 开启聊天系统 ==================
    /** 开启聊天系统 */
    export class ChatOpenGuide implements IGuideWaitStatus {
        private _isPass: boolean = false;  // 是否跳过引导
        private guideList: any;
        constructor() {
            this.guideList = {};
            this.guideList[WeakGuideStep.chat_open] = this.open.bind(this);
            this.guideList[WeakGuideStep.chat_send] = this.startGuide.bind(this);
        }
        getGuideStep(): number {
            return WeakGuideStep.guideChat;
        }

        private _curStep: number = 0;
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideWeakManager.listenSysOpen(ModuleConst.CHAT, this).then(() => {
                    GuideWeakManager.runGuideList(this.guideList, WeakGuideStep.guideChat, resolve);
                });
            });
        }

        /** 开启 */
        private open(next: Function): void {
            this._curStep = WeakGuideStep.chat_open;
            GuideWeakManager.guideSysOpenToScene(5, this)
                .then(() => {
                    return GuideWeakManager.waitSysOpenAnim(WeakGuideStep.chat_open, ModuleConst.CHAT, this);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
        }

        private startGuide(resolve: Function): void {
            this._curStep = WeakGuideStep.chat_send;
            Promise.resolve().then(() => {
                GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("",12072));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
            }).then(() => {
                return GuideManager.guideToMainView(5);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
                let type = view.btn_chat.x >= view.width / 2 ? DirectionType.left : DirectionType.right;
                GuideMask.show(view.btn_chat, type);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ChatView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                GuideMask.show(view.btnQuick, DirectionType.right);
                return GuideManager.listenNotification(ChatEvent.SHORTCUTS_OPEN_OR_HIDE, () => {
                    let view = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                    if (!view.quickUI.visible) {
                        view.quickUI.visible = true;
                    }
                    return true;
                }, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                view.quickUI.forbitHide = true;
                GuideMask.show(view.quickUI.lanList.getCell(0), DirectionType.top, "");
                return GuideManager.listenNotification(ChatEvent.CHAT_SEND_SUCCESS, null, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ChatView) as ChatView;
                view.quickUI.forbitHide = false;
                view.quickUI.onOpenOrHide();
                return GuideManager.guideRequest(0, WeakGuideStep.chat_send);
            }).then(() => {
                GuideMask.hide();
                resolve();
            });
        }

        dispose(): void {
            this._curStep = 0;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }
}