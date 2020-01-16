module game {

    /** 通用监听战斗结束 */
    export class FightEndWaitStatus implements IGuideWaitStatus {

        private _close: boolean;
        private _context: any;
        /**
         * 监听副本战斗的开始到结束
         * @param colse 是否引导关闭
         * @param context 作用域
         */
        constructor(bool: boolean, context: any) {
            this._close = bool;
            this._context = context;
        }
        getGuideStep(): number {
            return 0;
        }
        getCurChildStep(): number {
            return 0;
        }
        
        execute(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                Promise.resolve().then(()=>{
                    if(UIMgr.hasStage(UIConst.FightViews)){
                        return true;
                    }
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this._context)
                }).then(() => {
                    let fightView = UIMgr.getUIByName(UIConst.FightViews) as FightView;
                    // fightView.btn_stop.disabled = true;
                    GuideManager.listenDialogs(common.GlobalEvent.DIALOG_OPENED, [UIConst.FightVictory, UIConst.FightFailure], this._context)
                        .then((dialog: DialogExt) => {
                            let victory = dialog.name == UIConst.FightVictory;
                            UIMgr.hideUIByName(UIConst.CommonRuleView);
                            let fightView = UIMgr.getUIByName(UIConst.FightViews) as FightView;
                            // fightView.btn_stop.disabled = false;
                            if (victory) {
                                let view = UIMgr.getUIByName(UIConst.FightVictory) as VictoryView;
                                view.chk_next.selected = false;
                                view.onChkChange();
                                GuideMask.show(view.btn_close, DirectionType.bottom);
                                GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, this._context).then(() => {
                                    resolve();
                                });
                            } else {
                                let view = UIMgr.getUIByName(UIConst.FightFailure) as Failure;
                                GuideMask.show(view.btn_close, DirectionType.bottom);
                                GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, this._context).then(() => {
                                    resolve();
                                });
                            }
                        });
                    });
            });
        }
        dispose(): void {
            tl3d.ModuleEventManager.removeEventByTarget(this._context);
        }
    }

    /** 战斗对话引导 */
    export class FightTalkGuide implements IGuideWaitStatus {

        private _copyDic: any;
        private _model : GuajiModel;
        constructor() {
            this._model = GuajiModel.getInstance();
            this._copyDic = {};
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_copy_info)).data;
            for (let key in tbData) {
                let tbCopy = tbData[key] as tb.TB_copy_info;
                if ((tbCopy.before_plot && tbCopy.before_plot.length > 0) || (tbCopy.after_plot && tbCopy.after_plot.length > 0)) {
                    this._copyDic[tbCopy.ID] = tbCopy;
                }
            }
        }
        getGuideStep(): number {
            return 0;
        }
        getCurChildStep(): number {
            return 0;
        }

        /** 
         *  检测是否可以开启引导对话
         *  是否有对话，并且未通过副本
         */
        checkStart(copyVo: FightVo): boolean {
            if (!copyVo.tab_copyinfo) return false;
            let copyId = copyVo.tab_copyinfo.ID;
            let exist = this._copyDic[copyId] ? true : false;
            if (!exist) return false;
            if (copyVo.copyType == iface.tb_prop.copyTypeKey.rune) {
                return !this._model.isPassCopy(copyId);
            } else if (copyVo.copyType == iface.tb_prop.copyTypeKey.tower) {
                return !TowerModel.getInstance().isPassCopy(copyId);
            }
            return false;
        }

        execute(): any {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this).then(() => {
                let view = UIMgr.getUIByName(UIConst.FightViews) as FightView;
                let fightVo = view.dataSource as EnterFightVo;
                if (this.checkStart(fightVo.vo)) {
                    this.startGuide(2, fightVo.vo.tab_copyinfo, this.execute.bind(this));
                } else {
                    this.execute();
                }
            });

            GuideManager.listenNotification(GuajiEvent.ENTER_FIGHT, ($event: GuajiEvent) => {
                this._model.startTalkGuide = false;
                if (this.checkStart($event.data)) {
                    this.startGuide(1, $event.data.tab_copyinfo, null);
                }
                return false;
            }, this);
        }
        /** 开始引导对话 */
        private startGuide(type: number, tbCopy: tb.TB_copy_info, resolve: Function): void {
            loghgy('战斗对话引导');
            let model = this._model;
            let hasStartTalk: boolean = tbCopy.before_plot && tbCopy.before_plot.length > 0;
            let hasEndTalk: boolean = tbCopy.after_plot && tbCopy.after_plot.length > 0;
            let isVictory: boolean = false;
            let view = UIMgr.getUIByName(UIConst.FightViews) as FightView;
            Promise.resolve().then(() => {
                if (hasStartTalk) {
                    //如果有开场对话
                    if (type == 2) {
                        view.talkStart = true;
                        return GuideManager.listenNotification(FightsEvent.SCENE_COMPLETE_EVENT, null, this)
                            .then(() => {
                                let talkAry = [].concat(...tbCopy.before_plot);
                                return this.talk(talkAry);
                            }).then(() => {
                                let view = UIMgr.getUIByName(UIConst.FightViews) as FightView;
                                view.startTalkEnd();
                                return GuideManager.listenNotification(FightsEvent.FIGHT_END, ($event: FightsEvent) => {
                                    isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                                    view.stopFightEnd = hasEndTalk && isVictory;
                                    return true;
                                }, this);
                            });
                    } else if (type == 1) {
                        model.startTalkGuide = true;
                        return GuideManager.listenNotification(GuajiEvent.CREATE_ROLE_SUCC, null, this)
                            .then(() => {
                                let talkAry = [].concat(...tbCopy.before_plot);
                                return this.talk(talkAry);
                            }).then(() => {
                                model.startTalkGuide = false;
                                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                                if (view && view.guajiScene && view.guajiScene.startTalkGuideEnd()) {
                                    view.guajiScene.startTalkGuideEnd();
                                }
                                return GuideManager.listenNotification(GuajiEvent.GUAJI_FIGHT_END, ($event: GuajiEvent) => {
                                    isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                                    model.hasEndTalkGuide = hasEndTalk;
                                    return true;
                                }, this);
                            });
                    }

                } else {
                    if (type == 2) {
                        return GuideManager.listenNotification(FightsEvent.FIGHT_END, ($event: FightsEvent) => {
                            isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                            view.stopFightEnd = hasEndTalk && isVictory;
                            return true;
                        }, this);
                    } else if (type == 1) {
                        return GuideManager.listenNotification(GuajiEvent.GUAJI_FIGHT_END, ($event: GuajiEvent) => {
                            isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                            model.hasEndTalkGuide = hasEndTalk;
                            return true;
                        }, this);
                    }
                }
            }).then(() => {
                if (hasEndTalk && isVictory) {
                    let talkAry = [].concat(...tbCopy.after_plot);
                    return this.talk(talkAry).then(() => {
                        if (type == 1) {
                            let guajiview = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                            if (guajiview && guajiview.guajiScene) {
                                guajiview.guajiScene.endFight();
                            }
                            model.hasEndTalkGuide = false;
                        } else if (type == 2) {
                            let view = UIMgr.getUIByName(UIConst.FightViews) as FightView;
                            view.doFigthEnd(false);
                        }
                        return true;
                    });
                } else {
                    if (type == 1) {
                        let guajiview = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                        if (guajiview && guajiview.guajiScene) {
                            guajiview.guajiScene.endFight();
                        }
                        model.hasEndTalkGuide = false;
                    }
                    return true;
                }
            }).then(() => {
                dispatchEvt(new GuajiEvent(GuajiEvent.GUAJI_TALK_END));
                if (resolve) {
                    resolve();
                }
            });
        }

        /** 对话 */
        async talk(talkAry: number[]): Promise<any> {
            let len = talkAry.length;
            for (let i = 0; i < len; i++) {
                let tbTalk = tb.TB_plot.getItemById(talkAry[i]);
                let isEnd = (len - 1) == i;
                await GuideManager.talk(tbTalk.plot, isEnd, tbTalk.model, tbTalk.name, tbTalk.model_multiple, tbTalk.location,true);
                if (isEnd) {
                    await GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                } else {
                    await GuideManager.listenNotification(GuideEvent.Guide_Talk_End, null, this);
                }
            }
        }

        dispose(): void {
        }
    }

    /** 监听战斗界面关闭 -- 失败或者生理时强制引导离开战斗 */
    export class ListenFightClosedWaitStatus implements IGuideWaitStatus {

        constructor() {
            
        }
        getGuideStep(): number {
            return 0;
        }
        getCurChildStep(): number {
            return 0;
        }
        execute(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if(UIMgr.hasStage(UIConst.FightViews)){
                    if(UIMgr.hasStage(UIConst.FightVictory)) {
                        let view = UIMgr.getUIByName(UIConst.FightVictory) as VictoryView;
                        GuideMask.show(view.btn_close,DirectionType.bottom);
                        GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED,UIConst.FightVictory).then(()=>{
                            GuideMask.hide();
                            this.dispose();
                            resolve();
                        });
                    }else if (UIMgr.hasStage(UIConst.FightFailure)) {
                        let view = UIMgr.getUIByName(UIConst.FightFailure) as Failure;
                        GuideMask.show(view.btn_close,DirectionType.bottom);
                        GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED,UIConst.FightFailure).then(()=>{
                            GuideMask.hide();
                            this.dispose();
                            resolve();
                        });
                    }else{
                        GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED,UIConst.FightVictory,this).then(()=>{
                            let view = UIMgr.getUIByName(UIConst.FightVictory) as VictoryView;
                            GuideMask.show(view.btn_close,DirectionType.bottom);
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED,UIConst.FightVictory);
                        }).then(()=>{
                            GuideMask.hide();
                            this.dispose();
                            resolve();
                        });
                        GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED,UIConst.FightFailure,this).then(()=>{
                            let view = UIMgr.getUIByName(UIConst.FightFailure) as Failure;
                            GuideMask.show(view.btn_close,DirectionType.bottom);
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED,UIConst.FightFailure);
                        }).then(()=>{
                            GuideMask.hide();
                            this.dispose();
                            resolve();
                        });
                    }
                }else{
                    resolve();
                }
            });
        }

        dispose(): void {
            tl3d.ModuleEventManager.removeEventByTarget(this);
        }
    }

    /** 监听弹框队列 */
    export class ListenDialogQueueWaitStatus implements IGuideWaitStatus {

        private _close: boolean;
        private _context: any;
        /**
         * 监听弹框队列
         * @param colse 是否引导关闭
         * @param context 作用域
         */
        constructor(bool: boolean, context: any) {
            this._close = bool;
            this._context = context;
        }
        getGuideStep(): number {
            return 0;
        }
        getCurChildStep(): number {
            return 0;
        }
        
        execute(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // 延迟，才能精确判断是否有弹窗队列
                GuideManager.timeout(300)
                .then(()=>{
                    this.checkDialog(resolve);
                });
            });
        }

        checkDialog(resolve):void {
            // 当前是否是队列弹窗
            // loghgy("队列ui：",DialogQueueMgr.getInstance().getCudDialogName())
            if(DialogQueueMgr.getInstance().hasDialog()) {
                GuideMask.hide();
                Promise.resolve()
                .then(()=>{
                    // 特殊：战斗胜利需要引导点击关闭
                    if(UIMgr.hasStage(UIConst.FightVictory)) {
                        return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME).then(()=>{
                            let view = UIMgr.getUIByName(UIConst.FightVictory) as VictoryView;
                            GuideMask.show(view.btn_close,DirectionType.bottom);
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED,UIConst.FightVictory,this._context);
                        });
                    }else{
                        let uiName = DialogQueueMgr.getInstance().getCudDialogName();
                        // 其他界面等待其关闭
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED,uiName,this._context);
                        // return GuideManager.listenNotification(common.GlobalEvent.DIALOG_CLOSED,null,this._context)
                    }
                }).then(()=>{
                    return GuideManager.timeout(100);
                }).then(()=>{
                    this.checkDialog(resolve);
                });
            }else{
                GuideMask.hide();
                this.dispose();
                resolve();
            }
        }

        dispose(): void {
            tl3d.ModuleEventManager.removeEventByTarget(this._context);
            tl3d.ModuleEventManager.removeEventByTarget(this);
            this._context = null;
            this._close = false;
        }
    }

    

    /** 加入公会引导 */
    export class JoinGuildGuide implements IGuideWaitStatus {

        private _isPass: boolean = false;  // 是否跳过引导
        private _curStep : number = 0;
        constructor() {
        }
        getGuideStep(): number {
            return WeakGuideStep.guideJoinGuild;
        }
        getCurChildStep(): number {
            return this._curStep;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuildMainView, this)
                    .then(() => {
                        this._curStep = WeakGuideStep.guideJoinGuild;
                        GuideWeakManager.setCurExcutingStep(WeakGuideStep.guideJoinGuild);
                        return GuideManager.timeout(300);
                    }).then(() => {
                        loghgy('加入公会引导');
                        GuideWeakManager.setCurExcutingStep(WeakGuideStep.guideJoinGuild);
                        GuideMask.hide();
                        return GuideManager.talk(LanMgr.getLan("",12073));
                    }).then(() => {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                    }).then(() => {
                        let view = UIMgr.getUIByName(UIConst.GuildMainView) as GuildMainView;
                        GuideMask.show(view.boxHall, DirectionType.bottom, LanMgr.getLan("",12074), false);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, this);
                    }).then(() => {
                        let view = UIMgr.getUIByName(UIConst.GuildMainView) as GuildMainView;
                        GuideMask.show(view.boxDonate, DirectionType.left, LanMgr.getLan("",12075), false);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, this);
                    }).then(() => {
                        let view = UIMgr.getUIByName(UIConst.GuildMainView) as GuildMainView;
                        GuideMask.show(view.boxShop, DirectionType.top, LanMgr.getLan("",12076), false);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, this);
                    }).then(() => {
                        let view = UIMgr.getUIByName(UIConst.GuildMainView) as GuildMainView;
                        GuideMask.show(view.boxSkill, DirectionType.top, LanMgr.getLan("",12077), false);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, this);
                    }).then(() => {
                        let view = UIMgr.getUIByName(UIConst.GuildMainView) as GuildMainView;
                        GuideMask.show(view.boxCopy, DirectionType.right);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.GuildCopyView, this);
                    }).then(() => {
                        GuideMask.showWithTransparent();
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuildCopyView, this);
                    }).then(() => {
                        return GuideManager.guideRequest(0, WeakGuideStep.guideJoinGuild);
                    }).then(() => {
                        this._curStep = 0;
                        if (GuildCopyModel.getInstance().isAllFinish()) {
                            return true;
                        } else {
                            let view = UIMgr.getUIByName(UIConst.GuildCopyView) as GuildCopyView;
                            GuideMask.show(view.btnChallenge, DirectionType.top);
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this);
                        }
                    }).then(() => {
                        GuideMask.hide();
                        resolve();
                    });
            });
        }

        dispose(): void {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }

    /** 首充引导 */
    export class ShouchongGuide implements IGuideDispose {
        private _isPass: boolean = false;  // 是否跳过引导

        constructor() {
        }
        getGuideStep(): number {
            return WeakGuideStep.guideShouchong;
        }
        getCurChildStep(): number {
            return WeakGuideStep.guideShouchong;
        }

        execute(): Promise<any> {
            return new Promise<any>((resolve) => {
                if (App.hero.welfare.rechargeSum >= 6) {
                    loghgy(`兼容：已经首充过，直接完成该弱引导步骤${WeakGuideStep.guideShouchong}`);
                    GuideManager.guideRequest(0, WeakGuideStep.guideShouchong)
                        .then(() => {
                            this._isPass = true;
                            resolve();
                        });
                    return;
                }
                GuideWeakManager.listenSysOpen(ModuleConst.SHOUCHONG, this)
                .then(() => {
                    return GuideWeakManager.guideSysOpenToScene(0,this);
                }).then(()=>{
                    GuideWeakManager.setCurExcutingStep(WeakGuideStep.guideShouchong);
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12078))
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(()=>{
                    return GuideManager.timeout(300);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.Main3DView) as MainView;
                    GuideMask.show(view.getActivityBtnIR(ModuleConst.SHOUCHONG), DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TupUp_FirstView, this);
                }).then(() => {
                    return GuideManager.guideRequest(0, WeakGuideStep.guideShouchong);
                }).then(()=>{
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12079));
                }).then(()=>{
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this);
                }).then(()=>{
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.TupUp_FirstView, this);
                }).then(() => {
                    GuideMask.hide();
                    resolve();
                });
            });
        }

        dispose(): void {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass) return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            GuideMask.hide();
            GuideWeakManager.setCurExcutingStep(-1);
        }
    }


}