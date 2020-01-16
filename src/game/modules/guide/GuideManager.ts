
module game {

    export enum GuideStep {
        zhaohuan1 = 1,                  // 召唤第一个英雄
        buzhen1 = 2,                    // 布阵一个英雄
        battleExperienceCopy1 = 3,      // 挑战历练副本1-1
        godHeCheng = 4,                 // 英雄合成
        buzhen2 = 5,                    // 布阵二个英雄
        battleExperienceCopy2 = 6,      // 挑战历练副本1-2
        rewardGuajiBaoxiang = 7,        // 领取挂机宝箱
        fastFight = 8,                  // 快速战斗
        god1LvupTo5 = 9,                // 升到5级
        battleExperienceCopy3 = 10,     // 打副本
        wearEquipment1 = 11,            // 穿戴装备
        battleExperienceCopy4 = 12,     // 打副本1-4
        zhaohuan2 = 13,                 // 召唤
        buzhen3 = 14,                   // 布阵三个英雄
        rewardUploadJL1 = 15,           // 领取进阶之路奖励
        battleExperienceCopy5 = 16,     // 打副本1-5
        receiveTongguanReward = 17,     // 领取通关奖励
        god1LvupTo10 = 18,              // 升级到10级
        battleExperienceCopy6 = 19,     // 打副本1-6
        strengthEquipmentLv1 = 20,      // 强化装备
        battleExperienceCopy7 = 21,     // 打副本1-7
        god1LvupTo20 = 22,              // 升级到20级
        god1Dgup = 23,                  // 升阶
        lingquQiriJL = 24,             // 领取七日登录奖励
        endGuide = 999,                 // 引导结束语,结束设置大一点
    }
    
    export interface IGuideExecuteInfo {
        step: number;      // 引导步骤
        execute: (next?: Function, ...args) => IGuideDispose;   // 执行方法
        args?: any[];      // 引导参数
    }
    export interface IGuideDispose {
        dispose(): void;
    }

    export class GuideEvent extends tl3d.BaseEvent {
        /** 引导开始 */
        static Guide_Start: string = "Guide_Start";
        /** 引导结束 */
        static GUIDE_END: string = "GUIDE_END";
        /** 引导对话框结束 */
        static Guide_Talk_End: string = 'Guide_Talk_End';

        /** 开始饰品引导 */
        static START_SHIPIN_GUIDE: string = "START_SHIPIN_GUIDE";
        /** 更新引导状态 */
        static UPDATE_GUIDE_STATUS: string = "UPDATE_GUIDE_STATUS";
        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }

    export class GuideManager {

        public static _instance: GuideManager = new GuideManager();
        static GuideList: IGuideExecuteInfo[] = [
            { step: GuideStep.zhaohuan1, args: [], execute: GuideManager.zhaohuan1 },
            { step: GuideStep.buzhen1, args: [], execute: GuideManager.buzhen1 },
            { step: GuideStep.battleExperienceCopy1, args: [common.GlobalData.GUAJI_COPY_1_1], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.godHeCheng, args: [], execute: GuideManager.godHecheng },
            { step: GuideStep.buzhen2, args: [], execute: GuideManager.buzhen2 },
            { step: GuideStep.battleExperienceCopy2, args: [common.GlobalData.GUAJI_COPY_1_2], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.rewardGuajiBaoxiang, args: [], execute: GuideManager.rewardGuajiBaoxiang },
            { step: GuideStep.fastFight, args: [], execute: GuideManager.fastFight },
            { step: GuideStep.god1LvupTo5, args: [1, 5,1], execute: GuideManager.god1LvupTo },
            { step: GuideStep.battleExperienceCopy3, args: [common.GlobalData.GUAJI_COPY_1_3], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.wearEquipment1, args: [], execute: GuideManager.wearEquipment1 },
            { step: GuideStep.battleExperienceCopy4, args: [common.GlobalData.GUAJI_COPY_1_4], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.zhaohuan2, args: [], execute: GuideManager.zhaohuan2 },
            { step: GuideStep.buzhen3, args: [], execute: GuideManager.buzhen3 },
            { step: GuideStep.rewardUploadJL1, args: [], execute: GuideManager.rewardUploadJL1 },
            { step: GuideStep.battleExperienceCopy5, args: [common.GlobalData.GUAJI_COPY_1_5], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.receiveTongguanReward, args: [], execute: GuideManager.receiveTongguanReward },
            { step: GuideStep.god1LvupTo10, args: [1, 10], execute: GuideManager.god1LvupTo },
            { step: GuideStep.battleExperienceCopy6, args: [common.GlobalData.GUAJI_COPY_1_6], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.strengthEquipmentLv1, args: [3], execute: GuideManager.strengthEquipment1 },
            { step: GuideStep.battleExperienceCopy7, args: [common.GlobalData.GUAJI_COPY_1_7], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.god1LvupTo20, args: [1, 20], execute: GuideManager.god1LvupTo },
            { step: GuideStep.god1Dgup, args: [], execute: GuideManager.godDgup1 },
            { step: GuideStep.lingquQiriJL, args: [], execute: GuideManager.lingquQiriJL },
            { step: GuideStep.endGuide, execute: GuideManager.endGuide }

        ]

        static startInit(): void {
            GuideMask.showWithTransparent();
            // 做延迟让界面出来才可以定位
			Laya.timer.once(500, null, ()=>{
                GuideMask.hide();
				GuideManager.init();
			});
        }

        private static _isInit: boolean = false;
        static init(): void {
            if (GuideManager._isInit) return;
            GuideManager._isInit = true;
            // 战斗对话引导 
            new FightTalkGuide().execute();

            // 查询所有未完成的引导步骤，然后排序
            let guideAry: IGuideExecuteInfo[] = [];
            let guideStep = GuideManager.getGuideStep();
            for (let guideInfo of GuideManager.GuideList) {
                if (guideStep < guideInfo.step) {
                    guideAry.push(guideInfo);
                }
            }
            if (guideAry.length == 0) {
                GuideMask.hide();
                loghgy('强引导已全部完成');
                UIMgr.hideUIByName(UIConst.GuideTalkView);
                GuideWeakManager.startRun();
                dispatchEvt(new GuideEvent(GuideEvent.GUIDE_END));
                return;
            }
            guideAry.sort((a, b) => {
                return a.step - b.step;
            });
            loghgy('进入强引导');
            let lastGuideDispose: IGuideDispose = null;
            function run(): void {
                if (lastGuideDispose) {
                    lastGuideDispose.dispose();
                    lastGuideDispose = null;
                }
                if (guideAry.length > 0) {
                    let info = guideAry.shift();
                    lastGuideDispose = info.execute(run, info.step, ...info.args);
                } else {
                    GuideMask.hide();
                    UIMgr.hideUIByName(UIConst.GuideTalkView);
                    loghgy('强制引导全部结束,dispose');
                    GuideWeakManager.startRun();
                    dispatchEvt(new GuideEvent(GuideEvent.GUIDE_END));
                    let lastGuideDispose: IGuideDispose = null;
                }
            }
            run();
        }

        /**
         * 新手引导消息监听
         * @param name 消息名称
         * @param checkFun 是否移除消息的检测方法,返回boolean
         */
        static listenNotification(eventName, checkFun: Function = null, caller?: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // loghgy('新手引导消息监听',eventName);
                // 作用域
                let context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, (event: tl3d.BaseEvent) => {
                    if (checkFun) {
                        // loghgy('有checkFun方法,开始检测');
                        if (checkFun(event)) {
                            // loghgy('检测条件成功,执行resolve');
                            tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                            resolve(event);
                        } else {
                            // loghgy('检测条件失败,继续监听事件', eventName);
                        }
                    } else {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve(event);
                    }
                }, context);
            });
        }

        /**
         * 引导请求,完成某步骤
         * @param guideStep 强引导步骤
         * @param weakStep  弱引导步骤
         */
        static guideRequest(guideStep: number, weakStep: number = 0): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let curStep = GuideManager.getGuideStep();
                if (weakStep == 0 && guideStep <= curStep) {
                    loghgy('已完成过该强引导步骤');
                    resolve();
                    return;
                }
                if (guideStep == 0 && GuideWeakManager.isFinishStep(weakStep)) {
                    loghgy('已完成过该触发性引导步骤');
                    resolve();
                    return;
                }
                if (guideStep != 0 && weakStep != 0) {
                    logerror('不能同时完成两种引导');
                    reject();
                    return;
                }
                GuideMask.showWithTransparent();
                guideStep > 0 ? loghgy('请求完成强引导步骤：', guideStep) : loghgy('请求完成触发下引导步骤：', weakStep);
                let arg = {};
                arg[Protocol.game_guide_getGuideAward.args.guideStep] = guideStep;
                arg[Protocol.game_guide_getGuideAward.args.guideWeakStep] = weakStep;
                PLC.request(Protocol.game_guide_getGuideAward, arg, (res) => {
                    if (!res) {
                        reject('引导响应数据为空');
                    }
                    if (!res) return;
                    if (res.hasOwnProperty('guideStep')) {
                        App.hero.tasks.guideStep = res['guideStep'];
                    }
                    if (res.hasOwnProperty('guideWeakStep')) {
                        if (App.hero.tasks.guideWeakStep.indexOf(res['guideWeakStep']) == -1) {
                            App.hero.tasks.guideWeakStep.push(res['guideWeakStep'])
                        }
                    }
                    loghgy('确定完成强引导步骤：', guideStep, ' 弱引导步骤：', weakStep);
                    GuideMask.hide();
                    resolve(res);
                });
            });
        }

        /**
         * 新手引导延迟
         * @param time 延迟时间 毫秒
         * @param args 参数
         */
        static timeout(time, ...args): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                GuideMask.showWithTransparent();
                let timeid = setTimeout(() => {
                    clearTimeout(timeid);
                    resolve(...args);
                }, time);
            });
        }

        /** 展示对话框 */
        static talk(text: string, remove: boolean = true, model: number = 100007, modelName: string = null, modelScale: number = 4, location: number = 2,hidePass:boolean=false): Promise<any> {
            modelName = modelName && modelName!="" ? modelName : LanMgr.getLan("",12080);
            let opt: IGuideTalkOpt = { text, remove, model, location, modelScale, modelName,hidePass };
            if (UIMgr.hasStage(UIConst.GuideTalkView)) {
                let ui: GuideTalkView = UIMgr.getUIByName(UIConst.GuideTalkView);
                ui.dataSource = opt;
                ui.initView();
            } else {
                UIMgr.showUI(UIConst.GuideTalkView, opt);
            }
            return Promise.resolve();
        }

        /** 监听dialog的打开及关闭事件 */
        static listenDialog(eventName: string, uiname: string, caller?: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // loghgy('监听dialog的打开及关闭事件',eventName,uiname);
                // 作用域
                let context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, ($event: common.GlobalEvent) => {
                    let dialog = $event.data as DialogExt;
                    let viewName = dialog.dialogInfo ? dialog.dialogInfo.uiname : dialog.name;
                    if (dialog && uiname == viewName) {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve($event.data);
                    }
                }, context);
            });
        }
        /** 监听dialog的打开及关闭事件 */
        static listenDialogs(eventName: string, uinames: string[], caller?: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // loghgy('监听dialog的打开及关闭事件',eventName,uiname);
                // 作用域
                let context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, ($event: common.GlobalEvent) => {
                    let dialog = $event.data as DialogExt;
                    let viewName = dialog.dialogInfo ? dialog.dialogInfo.uiname : dialog.name;
                    if (dialog && uinames.indexOf(viewName) != -1) {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve($event.data);
                    }
                }, context);
            });
        }

        /** 监听dialog的组打开关闭事件 */
        static listenDialogGroup(eventName: string, uigroup: string, caller?: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // loghgy('监听dialog的组打开关闭事件',eventName,uigroup);
                // 作用域
                let context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, ($event: common.GlobalEvent) => {
                    let dialog = $event.data as DialogExt;
                    if (dialog && uigroup == dialog.group) {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve($event.data);
                    }
                }, context);
            });
        }


        // ================ 战斗引导 ==============
        static startFightGuide() {
            GuideManager.firstFightGuide();
        }
        /** 战斗引导 */
        static firstFightGuide(): IGuideDispose {
            let view = UIMgr.getUIByName(UIConst.FirstGuide) as FirstGuideView;
            GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12006)}</span>`, false, 4103, LanMgr.getLan("",12007))
                .then(() => {
                    return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
                }).then(() => {
                    return GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12008)}</span>`, true, 20012,  LanMgr.getLan("",12009), 2, LocationType.center);
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                }).then(() => {
                    dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                    return true;
                }).then(() => {
                    return GuideManager.listenNotification(FirstGuideEvent.GUIDE_START);
                }).then(() => {
                    return GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12010)}</span>`, true, 3106, LanMgr.getLan("",12011));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                }).then(() => {
                    dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                    return true;
                // }).then(() => {
                    // return GuideManager.listenNotification(FirstGuideEvent.GUIDE_START, (event) => {
                    //     if (event.data) {
                    //         return event.data == 5;
                    //     } else {
                    //         return false;
                    //     }
                    // });
                // }).then(() => {
                //     return GuideManager.talk(`<span style='color:#4a1b0c;'>诸神的力量！</span>`, true, 3014, "贝奥武夫");
                // }).then(() => {
                //     return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                // }).then(() => {
                //     Laya.timer.frameOnce(3, this, () => {
                //         dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                //     });
                    // return GuideManager.listenNotification(firstguidemodule.FirstGuideEvent.GUIDE_START);
                // }).then(() => {
                //     GuideMask.show(view.list_skillmodel.getCell(1), DirectionType.top, `<span style='color:#4a1b0c;'>选择贝奥武夫的技能</span>`, true);
                //     return GuideManager.listenNotification(firstguidemodule.FirstGuideEvent.FIGHT_SKILL_SELECT);
                // }).then(() => {
                //     GuideMask.show(view.addBox("1"), DirectionType.left, `<span style='color:#4a1b0c;'>选择要释放的目标</span>`, true);
                //     return GuideManager.listenNotification(firstguidemodule.FirstGuideEvent.FIRST_GUIDE_SELECT_TAR_SUCC);
                // }).then(() => {
                //     view.hideBox();
                //     GuideMask.hide();
                    // return GuideManager.listenNotification(FirstGuideEvent.GUIDE_START, (event) => {
                    //     if (event.data) {
                    //         return event.data == 7;
                    //     } else {
                    //         return false;
                    //     }
                    // });
                // }).then(() => {
                //     return GuideManager.talk(`<span style='color:#4a1b0c;'>吃我一刀</span>`, true, 3014, "贝奥武夫");
                // }).then(() => {
                //     return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                // }).then(() => {
                //     dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                //     return true;
                }).then(() => {
                    return GuideManager.listenNotification(FirstGuideEvent.GUIDE_START, (event) => {
                        if (event.data) {
                            return event.data == 9;
                        } else {
                            return false;
                        }
                    });
                // }).then(() => {
                //     GuideMask.show(view.list_skillmodel.getCell(2), DirectionType.top, `<span style='color:#4a1b0c;'>选择托尔的终极技</span>`, true);
                //     return GuideManager.listenNotification(FirstGuideEvent.FIGHT_SKILL_SELECT);
                // }).then(() => {
                //     view.hideBox();
                //     GuideMask.hide();
                //     return GuideManager.listenNotification(FirstGuideEvent.GUIDE_START);
                }).then(() => {
                    return GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12012)}</span>`, false,4103, LanMgr.getLan("",12007));
                }).then(() => {
                    return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
                }).then(() => {
                    return GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12013)}</span>`, true,3106, LanMgr.getLan("",12011));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                }).then(() => {
                    Laya.timer.frameOnce(3, this, () => {
                        dispatchEvt(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                    });
                    // sendDispatchEvent(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                    return GuideManager.listenNotification(FirstGuideEvent.GUIDE_START);
                }).then(() => {
                    return GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12014)}</span>`, false);
                }).then(() => {
                    return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
                }).then(() => {
                    return GuideManager.talk(`<span style='color:#4a1b0c;'>${LanMgr.getLan("",12015)}</span>`, true);
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                }).then(() => {
                    UIMgr.showUI(UIConst.CreateRoleView, null, false);
                });
            return {
                dispose(): void {

                }
            }
        }

        // ================ 强制引导 ==============

        /**
         * 通用挑战历练副本
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         */
        static commonBattleExperienceCopy(next: Function, step: number, copyId: number): IGuideDispose {
            loghgy(`引导${step}：挑战历练副本${copyId}`);
            let tbCopy = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if(!tbCopy) {
                logerror("不存在副本无法进行引导,副本ID：",copyId);
            }
            let model = GuajiModel.getInstance();
            if (model.isPassCopy(copyId)) {
                loghgy(`兼容：已完成挑战历练副本${copyId}，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            // 在挂机界面还要检测是否有对话及是否第一次打
            // let hasStartTalk: boolean = tbCopy.before_plot && tbCopy.before_plot.length > 0;
            // let hasEndTalk: boolean = tbCopy.after_plot && tbCopy.after_plot.length > 0;
            GuideManager.guideToMainView(5).then(()=>{
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                GuideMask.show(view.bottomUI.btn_onplay, DirectionType.top);
                if(tbCopy.is_enter == 1) {
                    return GuideManager.listenDialogOpened(UIConst.Lilian_RewardView).then(()=>{
                        let view = UIMgr.getUIByName(UIConst.Lilian_RewardView) as GuaJiRewardView;
                        GuideMask.show(view.btn_receive,DirectionType.bottom);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews);
                    }).then(()=>{
                        return GuideManager.listenNotification(FightsEvent.SHOW_RESULT_EVENT, () => {
                            let isFinish = model.isPassCopy(copyId);
                            loghgy(`检测条件：副本id为${copyId}是否完成：${isFinish}`);
                            return isFinish;
                        }).then(() => {
                            return GuideManager.guideRequest(step);
                        }).then(() => {
                            if (UIMgr.hasStage(UIConst.FightVictory)) {
                                return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                            } else {
                                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightVictory);
                            }
                        }).then(()=>{
                            return GuideManager.timeout(100);
                        }).then(() => {
                            UIMgr.hideUIByName(UIConst.CommonRuleView);
                            let view = UIMgr.getUIByName(UIConst.FightVictory) as VictoryView;
                            GuideMask.show(view.btn_close, DirectionType.bottom);
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews);
                        });
                    });
                }else{
                    return GuideManager.listenNotification(GuajiEvent.ENTER_FIGHT).then(()=>{
                        GuideMask.showWithTransparent();
                        return GuideManager.listenNotification(GuajiEvent.BATTLE_COPY_SUCCESS,()=>{
                            let isFinish = model.isPassCopy(copyId);
                                loghgy(`检测条件：副本id为${copyId}是否完成：${isFinish}`);
                                return isFinish;
                            });
                        }).then(() => {
                            return GuideManager.guideRequest(step);
                        }).then(()=>{
                            return new ListenDialogQueueWaitStatus(true,null).execute();
                        });
                }
            }).then(() => {
                UIMgr.hideUIByName(UIConst.LevelUpView);
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /**
         * 通用英雄升级
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         * @param count 几只英雄升级
         * @param level 英雄升到几级
         */
        static commonGodLvup(next: Function, step: number, taskId: number, count: number, level: number): IGuideDispose {
            // 遍历数组，从第一个开始升级，升级没有满足达到等级的英雄
            let lineupList = GodModel.getInstance().getViewGods();
            let index = lineupList.findIndex((vo) => {
                return vo.godVo && vo.godVo.level < level;
            });
            let model = TaskModel.getInstance();
            index = index < 0 ? 0 : index;
            let godVo: GodItemVo = lineupList[index].godVo;
            let uuid = godVo.uuid;
            loghgy(`引导${step}：主线任务id${taskId},英雄${godVo.tab_god.name}(${uuid})升级到${level}级`);
            if (model.isFinish(taskId)) {
                loghgy(`兼容：已完成主线任务,id为${taskId}，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            Promise.resolve().then(() => {
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    return true;
                } else {
                    return GuideManager.guideToMainView(5);
                }
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                let selectIndex = view.roleList.selectedIndex;
                if (selectIndex != index) {
                    GuideMask.show(view.roleList.getCell(index), DirectionType.top);
                    return GuideManager.listenNotification(GodEvent.SELECT_GOD_EVENT, () => {
                        let godVo: GodItemVo = App.hero.getGodVoById(uuid);
                        return godVo.uuid == view.curVo.uuid;
                    });
                } else {
                    return true;
                }
            }).then(() => {
                // 主线任务前往是主动切换到各个子页面
                // 选中第一个tab界面
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                let viewIdx = view.godView.tabList.selectedIndex;
                if (viewIdx == ShenlingTabType.info) {
                    return true;
                } else {
                    return GuideManager.listenNotification(GodEvent.SWITCH_TAB_SUCCESS, () => {
                        return view.godView.tabList.selectedIndex == ShenlingTabType.info;
                    });
                }
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.viewInfo.btn_upGrade, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.USE_EXPPOOL_SUCCESS, () => {
                    let godVo: GodItemVo = App.hero.getGodVoById(uuid);
                    let isFinish = model.isFinish(taskId);
                    loghgy(`检测条件:英雄${godVo.tab_god.name}(${uuid})升级 ${godVo.level}/${level},主线任务id为${taskId}是否完成:${isFinish}`);
                    return godVo.level >= level || isFinish;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /**
         * 通用一键穿戴装备
         * @param next 回调方法
         * @param step 引导步骤
         * @param count 穿戴装备几次
         */
        static commonWearEquipment(next: Function, step: number, taskId: number, count: number = 1): IGuideDispose {
            // 获取有穿戴装备的英雄
            let gods = App.hero.getGodAry(-1, -1);
            let index = gods.findIndex((vo) => {
                return vo.equipKeys.length > 0;
            })
            index = index < 0 ? 0 : index;
            let godVo: GodItemVo = gods[index];
            let uuid = godVo.uuid;
            let model = TaskModel.getInstance();
            loghgy(`引导${step}：主线任务id:${taskId},英雄${godVo.tab_god.name}(${uuid})一键装备穿戴${count}件装备`);
            if (model.isFinish(taskId)) {
                loghgy(`兼容：已完成主线任务,id为${taskId},直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            GuideManager.guideToMainView(5).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.EquipView);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                let selectIndex = view.list_roles.selectedIndex;
                if (selectIndex != index) {
                    GuideMask.show(view.list_roles.getCell(index), DirectionType.top);
                    return GuideManager.listenNotification(GodEvent.SELECT_GOD_EVENT, () => {
                        let godVo: GodItemVo = App.hero.getGodVoById(uuid);
                        return godVo.uuid == view.curVo.uuid;
                    });
                } else {
                    return true;
                }
            }).then(() => {
                // 主线任务前往是主动切换到各个子页面
                // 选中第4个tab界面
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                let viewIdx = view.view_list.selectedIndex;
                if (viewIdx == EquipTabType.strength) {
                    return true;
                } else {
                    return GuideManager.listenNotification(EquipEvent.SWITCH_TAB_SUCCESS, () => {
                        return view.view_list.selectedIndex == EquipTabType.strength;
                    });
                }
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                GuideMask.show(ui.viewEquip.btn_wear, DirectionType.bottom);
                return GuideManager.listenNotification(EquipEvent.ONEKE_WEAR_SUCCESS, () => {
                    let godVo = App.hero.getGodVoById(uuid);
                    let isFinish: boolean = model.isFinish(taskId);
                    loghgy(`检测条件:英雄${godVo.tab_god.name}(${uuid})穿戴装备 ${godVo.equipKeys.length}件,主线任务id${taskId}是否完成：${isFinish}`);
                    return isFinish;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /**
         * 通用一键强化装备
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         * @param type 类型  1：表示强化次数  2：表示几件装备强化到几级
         * @param count type=1时表示总次数 type=2时表示几件装备
         * @param level type=2时存在，表示等级
         */
        static commonStrengthEquipment(next: Function, step: number, taskId: number, type: number, count: number, level: number): IGuideDispose {
            // 获取有穿戴装备的英雄
            let gods = App.hero.getGodAry(-1, -1);
            let index = gods.findIndex((vo) => {
                return vo.equipKeys.length > 0;
            });
            index = index < 0 ? 0 : index;
            let godVo: GodItemVo = gods[index];
            let uuid = godVo.uuid;
            if (type == 1) {
                loghgy(`引导${step}：主线任务id:${taskId},英雄${godVo.tab_god.name}(${uuid})强化装备${count}次`);
            } else {
                loghgy(`引导${step}：主线任务id:${taskId},英雄${godVo.tab_god.name}(${uuid})的${count}件装备都强化到${level}`);
            }
            let model = TaskModel.getInstance();
            if (model.isFinish(taskId)) {
                loghgy(`兼容：已完成主线任务,id为${taskId},直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            Promise.resolve().then(() => {
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    return true;
                } else {
                    return GuideManager.guideToMainView(5).then(() => {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.EquipView);
                    })
                }
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                let selectIndex = view.list_roles.selectedIndex;
                if (selectIndex != index) {
                    GuideMask.show(view.list_roles.getCell(index), DirectionType.top);
                    return GuideManager.listenNotification(GodEvent.SELECT_GOD_EVENT, () => {
                        let godVo: GodItemVo = App.hero.getGodVoById(uuid);
                        return godVo.uuid == view.curVo.uuid;
                    });
                } else {
                    return true;
                }
            }).then(() => {
                // 主线任务前往是主动切换到各个子页面
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                let viewIdx = view.view_list.selectedIndex;
                if (viewIdx == EquipTabType.strength) {
                    return true;
                } else {
                    return GuideManager.listenNotification(EquipEvent.SWITCH_TAB_SUCCESS, () => {
                        return view.view_list.selectedIndex == EquipTabType.strength;
                    });
                }
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                GuideMask.show(ui.viewEquip.btn_strength, DirectionType.top);
                return GuideManager.listenNotification(EquipEvent.ONEKE_STRENGTH_SUCCESS, () => {
                    let godVo = App.hero.getGodVoById(uuid);
                    let isFinish = model.isFinish(taskId);
                    if (type == 1) {
                        loghgy(`检测条件:强化次数 ${godVo.getStrengthNum()}/${count},主线任务id${taskId}是否完成:${isFinish}`);
                    } else {
                        loghgy(`检测条件:几件装备强化到几级 ${godVo.isStrengthToLv(count, level)},主线任务id${taskId}是否完成:${isFinish}`);
                    }
                    return isFinish;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 召唤英雄 */
        static zhaohuan1(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：召唤第一只英雄`);
            if (App.hero.getGodAry().length > 0) {
                loghgy(`兼容：已有英雄，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            GuideManager.talk(LanMgr.getLan("",12016))
                .then(() => {
                    return GuideManager.listenNotification(GuideEvent.Guide_Talk_End, null);
                }).then(() => {
                    return GuideManager.guideToMainView(0);
                }).then(() => {
                    let mainView = UIMgr.getUIByName(UIConst.Main3DView) as MainView;
                    GuideMask.show(mainView.btnZhaohuan, DirectionType.top);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_MainView);
                }).then(()=>{
                    return GuideManager.timeout(800);
                }).then(() => {
                    GuideMask.hide();
                    return GuideManager.talk(LanMgr.getLan("",12017));
                }).then(() => {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.ZH_MainView) as ZhaohuanView;
                    let zhaohuantypeUI = view.list_zhaohuan.getCell(2) as ZhaohuanIR;
                    GuideMask.show(zhaohuantypeUI.btn_one, DirectionType.top);
                    return GuideManager.listenNotification(SummonEvent.ZHAOHUAN_SUCCESS, () => {
                        return App.hero.getGodAry().length > 0;
                    });
                }).then(() => {
                    return GuideManager.guideRequest(step);
                }).then(() => {
                    if (UIMgr.hasStage(UIConst.ZH_ResultView)) {
                        return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                    } else {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_ResultView);
                    }
                }).then(() => {
                    GuideMask.showWithTransparent();
                    let ui = UIMgr.getUIByName(UIConst.ZH_ResultView) as ZhaohuanResultView;
                    if (ui.isCanClose()) {
                        return true;
                    } else {
                        return GuideManager.listenNotification(SummonEvent.SHOW_BTN_VISIBLE_TRUE);
                    }
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.ZH_ResultView) as ZhaohuanResultView;
                    GuideMask.show(view.btn_sure, DirectionType.top);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_ResultView);
                }).then(() => {
                    let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                    GuideMask.show(view.btnClose, DirectionType.top);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_MainView);
                }).then(() => {
                    GuideMask.hide();
                    next();
                });
            return {
                dispose(): void {

                }
            }
        }

        /** 布阵 */
        static buzhen1(next: Function, step: number): IGuideDispose {
            let model = GodModel.getInstance();
            loghgy(`引导${step}：布阵第一只英雄`);
            if (model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 1) {
                loghgy(`兼容：已上阵第一只英雄，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            let godId = tb.TB_god_employ_set.get_TB_god_employ_setnById(1).first_employ[0];
            let tbGod = tb.TB_god.get_TB_godById(godId);
            GuideManager.talk(LanMgr.getLan("",12018,tbGod.name), false)
            .then(()=>{
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(() => {
                return GuideManager.talk(LanMgr.getLan("",12019), true, tbGod.model, tbGod.name);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(1);
            }).then(()=>{
                if(UIMgr.hasStage(UIConst.BuzhenView)) {
                    return true;
                }else{
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.BuzhenView); 
                }
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.BuzhenView) as BuzhenView;
                GuideMask.show(ui.list_buzhenrole.getCell(0), DirectionType.bottom, LanMgr.getLan("",12020), true);
                return GuideManager.listenNotification(GodEvent.BUZHEN_SELECT_ROLE, () => {
                    // 需检测是否正确布阵
                    let ui = UIMgr.getUIByName(UIConst.BuzhenView) as BuzhenView;
                    return ui.isExistLineupByIdx(0);
                });
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.BuzhenView) as BuzhenView;
                GuideMask.show(ui.btn_return, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.BUZHEN_COMPLETE, () => {
                    return model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 1;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 英雄合成 */
        static godHecheng(next: Function, step: number):IGuideDispose {
            let model = GodModel.getInstance();
            if(model.isHasGod(common.GlobalData.HOUYI_GOD_ID)) {
                loghgy(`兼容：已有德古拉，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                .then(() => {
                    next();
                });
                return;
            }
            loghgy(`引导${step}：英雄碎片合成英雄`);
            let itemId = common.GlobalData.getHechengChipId();
            let tbGod = tb.TB_god.get_TB_godById(common.GlobalData.HOUYI_GOD_ID);
            GuideManager.talk(LanMgr.getLan("",12021,tbGod.name), true)
            .then(()=>{
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(4);
            }).then(()=>{
                return GuideManager.timeout(100);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
                view.list_buttons.selectedIndex = TABTYPE.SUIPIAN;
                return GuideManager.timeout(300);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
                let itemAry : any[] = view.bagItemList.dataSource;
                let itemIdx = itemAry.findIndex((ary:ItemVo[])=>{
                    return ary.some((vo)=>{
                        return vo.id == itemId;
                    });
                });
                let bagItem = view.bagItemList.getCell(itemIdx) as BagIR;
                let idx = bagItem.list_lineitem.array.findIndex((vo:ItemVo)=>{
                    return vo.id == itemId;
                });
                bagItem.showDetail(bagItem.list_lineitem.array[idx]);
                return GuideManager.timeout(100);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
                let itemAry : any[] = view.bagItemList.dataSource;
                let itemIdx = itemAry.findIndex((ary:ItemVo[])=>{
                    return ary.some((vo)=>{
                        return vo.id == itemId;
                    });
                });
                let bagItem = view.bagItemList.getCell(itemIdx) as BagIR;
                GuideMask.show(bagItem.ui_detail.btn_hecheng,DirectionType.left);
                return GuideManager.listenNotification(BagEvent.USE_ITEM_SUCCESS,()=>{
                    return model.isHasGod(common.GlobalData.HOUYI_GOD_ID);
                });
            }).then(()=>{
                return GuideManager.guideRequest(step);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(()=>{
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 布阵 */
        static buzhen2(next: Function, step: number): IGuideDispose {
            let model = GodModel.getInstance();
            loghgy(`引导${step}：布阵第二只英雄`);
            if (model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 2) {
                loghgy(`兼容：已上阵第二只英雄，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            let tbGod = tb.TB_god.get_TB_godById(common.GlobalData.HOUYI_GOD_ID);
            GuideManager.talk(LanMgr.getLan("",12022,tbGod.name), false)
            .then(()=>{
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(() => {
                let tbGod = tb.TB_god.get_TB_godById(common.GlobalData.HOUYI_GOD_ID);
                return GuideManager.talk(LanMgr.getLan("",12023), true, tbGod.model, tbGod.name);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(1);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                let item = view.getCanShangzhenIR();
                GuideMask.show(item, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.God_ReplaceGodView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_ReplaceGodView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_ReplaceGodView) as ReplaceGodView;
                let item = view.godList.getCell(0) as godReplaceIR;
                GuideMask.show(item.btnShangzhen, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.BUZHEN_COMPLETE, () => {
                    return model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 2;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 领取历练宝箱 */
        static rewardGuajiBaoxiang(next: Function, step: number): IGuideDispose {
            loghgy('引导步骤：领取挂机宝箱奖励', step);
            GuideManager.talk(LanMgr.getLan("",12024))
            .then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(5)
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                GuideMask.show(view.bottomUI.box_bxeff, DirectionType.top);
                return GuideManager.listenNotification(GuajiEvent.REWARD_BAOXIANG_SUCC);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Guaji_ShouyiView);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {
                }
            }
        }

        /** 快速战斗 */
        static fastFight(next: Function, step: number): IGuideDispose {
            loghgy('引导步骤：快速战斗', step);
            GuideManager.talk(LanMgr.getLan("",12025))
            .then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(5)
            }).then(()=>{
                return GuideManager.timeout(300);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                GuideMask.show(view.bottomUI.btn_fast, DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED,UIConst.Guaji_FastView);
            }).then(()=>{
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED,UIConst.Guaji_FastView);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.Guaji_FastView) as FastFightView;
                GuideMask.show(view.btnFast, DirectionType.top);
                return GuideManager.listenNotification(GuajiEvent.FAST_BATTLE_SUCCESS);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                return new ListenDialogQueueWaitStatus(true,null).execute();
            }).then(()=>{
                UIMgr.hideUIByName(UIConst.LevelUpView);
                let view = UIMgr.getUIByName(UIConst.Guaji_FastView) as FastFightView;
                GuideMask.show(view.bgPanel.btnClose,DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Guaji_FastView);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {
                }
            }
        }

        /** 第一次穿戴装备 */
        static wearEquipment1(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：第1只英雄一键穿戴装备`);
            let gods = App.hero.getGodAry(-1, -1);
            let uuid = gods[0].uuid;
            GuideManager.talk(LanMgr.getLan("",12026))
            .then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(2);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                view.view_list.selectedIndex = EquipTabType.strength;
                return GuideManager.timeout(100);
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                GuideMask.show(ui.viewEquip.btn_wear, DirectionType.bottom);
                return GuideManager.listenNotification(EquipEvent.ONEKE_WEAR_SUCCESS);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 第二次召唤英雄 */
        static zhaohuan2(next: Function, step: number, taskId: number, index: number): IGuideDispose {
            loghgy(`引导${step}：召唤第英雄`);
            if (App.hero.getGodAry().length >= 3) {
                loghgy(`兼容：已有3只英雄，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            GuideManager.talk(LanMgr.getLan("",12027))
            .then(() => {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(() => {
                return GuideManager.guideToMainView(5);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                GuideMask.show(view.btn_uproad, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.UpRoadView);
            }).then(()=>{
                return GuideManager.timeout(600);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.UpRoadView) as UpRoadView;
                let itemIR = view.list_URTask.getCell(0) as UpRoadTaskIR;
                GuideMask.show(itemIR.btn_receive, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_MainView); 
            }).then(()=>{
                    return GuideManager.timeout(800);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ZH_MainView) as ZhaohuanView;
                let zhaohuantypeUI = view.list_zhaohuan.getCell(2) as ZhaohuanIR;
                GuideMask.show(zhaohuantypeUI.btn_one, DirectionType.top);
                return GuideManager.listenNotification(SummonEvent.ZHAOHUAN_SUCCESS, () => {
                    return App.hero.getGodAry().length >= 3;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                if (UIMgr.hasStage(UIConst.ZH_ResultView)) {
                    return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                } else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_ResultView);
                }
            }).then(() => {
                GuideMask.showWithTransparent();
                let ui = UIMgr.getUIByName(UIConst.ZH_ResultView) as ZhaohuanResultView;
                if (ui.isCanClose()) {
                    return true;
                } else {
                    return GuideManager.listenNotification(SummonEvent.SHOW_BTN_VISIBLE_TRUE);
                }
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.ZH_ResultView) as ZhaohuanResultView;
                GuideMask.show(view.btn_sure, DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_ResultView);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                GuideMask.show(view.btnClose, DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_MainView);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 布阵 */
        static buzhen3(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：布阵第三只英雄`);
            let model = GodModel.getInstance();
            if (model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 3) {
                loghgy(`兼容：已上阵第三只英雄，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            let godId = tb.TB_god_employ_set.get_TB_god_employ_setnById(1).second_employ[0];
            let tbGod = tb.TB_god.get_TB_godById(godId);
            GuideManager.talk(LanMgr.getLan("",12028,tbGod.name), false)
            .then(()=>{
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(() => {
                return GuideManager.talk(LanMgr.getLan("",12029), true, tbGod.model, tbGod.name);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(1);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                let item = view.getCanShangzhenIR();
                GuideMask.show(item, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.God_ReplaceGodView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_ReplaceGodView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_ReplaceGodView) as ReplaceGodView;
                let item = view.godList.getCell(0) as godReplaceIR;
                GuideMask.show(item.btnShangzhen, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.BUZHEN_COMPLETE, () => {
                    return model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 3;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 领取进阶奖励 */
        static rewardUploadJL1(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：领取进阶奖励`);
            GuideManager.guideToMainView(5).then(()=>{
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                GuideMask.show(view.btn_uproad, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.UpRoadView);
            }).then(()=>{
                return GuideManager.timeout(600);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.UpRoadView) as UpRoadView;
                let itemIR = view.list_URTask.getCell(0) as UpRoadTaskIR;
                GuideMask.show(itemIR.btn_receive, DirectionType.bottom);
                return GuideManager.listenNotification(UpRoadEvent.REWARD_SUCCESS); 
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(()=>{
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.UpRoadView) as UpRoadView;
                let itemIR = view.list_URTask.getCell(1) as UpRoadTaskIR;
                GuideMask.show(itemIR.btn_receive, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.UpRoadView);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 领取挂机通关奖励 */
        static receiveTongguanReward(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：领取挂机通关奖励`);
            GuideManager.talk(LanMgr.getLan("",12030),false).then(()=>{
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(()=>{
                return GuideManager.talk(LanMgr.getLan("",12031),true);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(() => {
                return GuideManager.guideToMainView(5);
            }).then(() => {
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                GuideMask.show(view.img_baoxiang, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Lilian_RewardView, this);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.Lilian_RewardView) as GuaJiRewardView;
                GuideMask.show(view.btn_receive, DirectionType.bottom);
                return GuideManager.listenNotification(TaskEvent.REWARD_TASK_SUCCESS);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(()=>{
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.Lilian_RewardView) as GuaJiRewardView;
                GuideMask.show(view.uiPanel.btnClose, DirectionType.left);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Lilian_RewardView);
            }).then(() => {
                UIMgr.hideUIByName(UIConst.Lilian_RewardView);
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 英雄升级第一次 */
        static god1LvupTo(next: Function, step: number, index: number, level: number,talkType:number): IGuideDispose {
            let talk : string;
            if(talkType == 1){
                talk = LanMgr.getLan("",12005);
            }
            let lineupList = GodModel.getInstance().getViewGods();
            let godVo: GodItemVo = lineupList[index-1].godVo;
            let uuid = godVo.uuid;
            loghgy(`引导${step}：英雄${godVo.tab_god.name}(${uuid})升级到${level}`);
            if (godVo.level >= level) {
                loghgy(`兼容：已升级英雄${godVo.tab_god.name}(${uuid})到${level}，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                .then(() => {
                    next();
                });
                return;
            }
            Promise.resolve().then(()=>{
                if(talk && talk!= "") {
                    GuideMask.hide();
                    return GuideManager.talk(talk).then(()=>{
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                    });
                }
                return true;
            }).then(()=>{
                return GuideManager.guideToMainView(1);
            }).then(()=>{
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.viewInfo.btn_upGrade, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.USE_EXPPOOL_SUCCESS, () => {
                    let godVo: GodItemVo = App.hero.getGodVoById(uuid);
                    loghgy(`检测条件:升级英雄${godVo.tab_god.name}(${uuid}) ${godVo.level}/${level}`);
                    return godVo.level >= level;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }
        
        /** 
         * 第一次强化装备
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         * @param count 强化次数
         */
        static strengthEquipment1(next: Function, step: number,count: number): IGuideDispose {
            // 获取有穿戴装备的英雄
            let gods = App.hero.getGodAry();
            let index = gods.findIndex((vo) => {
                return vo.equipKeys.length > 0;
            });
            index = index < 0 ? 0 : index;
            let godVo: GodItemVo = gods[index];
            let uuid = godVo.uuid;
            let isStrength : boolean = godVo.equipKeys.some( vo => vo.strengthLv >= count);
            loghgy(`引导${step}：英雄${godVo.tab_god.name}(${godVo.uuid})一键强化装备`);
            if (isStrength) {
                loghgy(`兼容：已强化过3次装备，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                    .then(() => {
                        next();
                    });
                return;
            }
            GuideManager.talk(LanMgr.getLan("",12032)).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView)
            }).then(()=>{
                return GuideManager.guideToMainView(2);
            }).then(()=>{
                // 手动定位
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                view.list_roles.selectedIndex = index;
                return GuideManager.timeout(200);
            }).then(() => {
                // 手动定位
                let view = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                view.view_list.selectedIndex = EquipTabType.strength;
                return GuideManager.timeout(100);
            }).then(() => {
                let ui = UIMgr.getUIByName(UIConst.EquipView) as EquipView;
                GuideMask.show(ui.viewEquip.btn_strength, DirectionType.top);
                return GuideManager.listenNotification(EquipEvent.ONEKE_STRENGTH_SUCCESS, () => {
                    let godVo = App.hero.getGodVoById(uuid);
                    let isStrength : boolean = godVo.equipKeys.some( vo => vo.strengthLv >= count);
                    return isStrength;
                });
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 英雄升阶 */
        static godDgup1(next: Function, step: number): IGuideDispose {
            let lineupList = GodModel.getInstance().getViewGods();
            let godVo: GodItemVo = lineupList[0].godVo;
            let uuid = godVo.uuid;
            loghgy(`引导${step}：英雄升阶`);
            if (godVo.degree >= 1) {
                loghgy(`兼容：英雄已升阶，直接完成该引导步骤${step}`);
                GuideManager.guideRequest(step)
                .then(() => {
                    next();
                });
                return;
            }
            GuideManager.talk(LanMgr.getLan("",12033)).then(()=>{
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(()=>{
                return GuideManager.guideToMainView(1);
            }).then(()=>{
                return GuideManager.timeout(200);
            }).then(() => {
                let view = UIMgr.getUIByName(UIConst.God_MainView) as GodMainView;
                GuideMask.show(view.viewInfo.btn_shengjie, DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.God_DgUpView, this);
            }).then(() => {
                GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_DgUpView, this);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.God_DgUpView) as DgUpView;
                GuideMask.show(view.btn_shengjie, DirectionType.bottom);
                return GuideManager.listenNotification(GodEvent.GOD_SHENGJIE_SUCCESS);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(()=>{
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.God_DgUp_SUCCView, this);
            }).then(() => {
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 领取七日登录奖励 */
        static lingquQiriJL(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：领取七日登录奖励`);
            GuideManager.guideToMainView(0).then(() => {
                let view = UIMgr.getUIByName(UIConst.Main3DView) as MainView;
                GuideMask.show(view.getActivityBtnIR(ModuleConst.LOGIN_QIRI), DirectionType.bottom);
                return GuideManager.listenDialogOpened(UIConst.LoginGiftView);
            }).then(()=>{
                let view = UIMgr.getUIByName(UIConst.LoginGiftView) as LoginGiftView;
                GuideMask.show(view.btn_receive, DirectionType.bottom);
                return GuideManager.listenNotification(HuodongEvent.LOGIN_GIFT_RECEIVE);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(() => {
                return GuideManager.talk(LanMgr.getLan("",12034));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.LoginGiftView);
            }).then(()=>{
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }

        /** 总结引导 */
        static endGuide(next: Function, step: number): IGuideDispose {
            loghgy(`引导${step}：总结引导`);
            GuideManager.guideToMainView(5).then(() => {
                return GuideManager.talk(LanMgr.getLan("",12035));
            }).then(() => {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(() => {
                return GuideManager.guideRequest(step);
            }).then(()=>{
                GuideMask.hide();
                next();
            });
            return {
                dispose(): void {

                }
            }
        }


        /**
         * 指引
         * @param index 
         */
        static guideToMainView(index: number, text: string = "", caller: any = null): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let context = caller ? caller : GuideManager._instance;
                let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
                if (index == 0 && !UIMgr.hasStage(UIConst.Main3DView)) {
                    GuideMask.show(view.btn_main, DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Main3DView, context)
                    .then(()=>{
                        return GuideManager.timeout(350);
                    }).then(() => {
                        GuideMask.hide();
                        resolve();
                    });
                } else if (index == 1 && !UIMgr.hasStage(UIConst.God_MainView)) {
                    GuideMask.show(view.btn_god, DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_MainView, context)
                    .then(()=>{
                        return GuideManager.timeout(350);
                    }).then(() => {
                        GuideMask.hide();
                        resolve();
                    });
                } else if (index == 2 && !UIMgr.hasStage(UIConst.EquipView)) {
                    GuideMask.show(view.btn_equip, DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.EquipView, context)
                    .then(()=>{
                        return GuideManager.timeout(350);
                    }).then(() => {
                        GuideMask.hide();
                        resolve();
                    });
                } else if (index == 3 && !UIMgr.hasStage(UIConst.ArtifactView)) {
                    GuideMask.show(view.btn_shenqi, DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ArtifactView, context)
                    .then(()=>{
                        return GuideManager.timeout(350);
                    }).then(() => {
                        GuideMask.hide();
                        resolve();
                    });
                } else if (index == 4 && !UIMgr.hasStage(UIConst.BagView)) {
                    GuideMask.show(view.btn_bag, DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.BagView, context)
                    .then(()=>{
                        return GuideManager.timeout(350);
                    }).then(() => {
                        GuideMask.hide();
                        resolve();
                    });
                } else if (index == 5 && !UIMgr.hasStage(UIConst.GuajiView)) {
                    GuideMask.show(view.btn_fight, DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuajiView, context)
                    .then(()=>{
                        return GuideManager.timeout(350);
                    }).then(() => {
                        dispatchEvt(new GuideEvent(GuideEvent.UPDATE_GUIDE_STATUS));
                        GuideMask.hide();
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        }

        /** 监听弹窗打开 */
        static listenDialogOpened(uiname:string,caller:any=null):Promise<any> {
            return new Promise<any>((resolve)=>{
                if(UIMgr.getInstance().getUIInfo(uiname).popEffect) {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, uiname, caller)
                    .then(()=>{
                        GuideMask.showWithTransparent();
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, uiname, caller);
                    }).then(()=>{
                        resolve();
                    });
                }else{
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, uiname, caller).then(()=>{
                        resolve();
                    });
                }
            });
        }

        /** 获取当前引导步骤 */
        static getGuideStep(): number {
            return App.hero.tasks.guideStep;
        }

        /** 是否在强制引导中 */
        static isInGuide(): boolean {
            let guideStep = GuideManager.getGuideStep();
            return guideStep < GuideStep.endGuide;
        }

        /** 是否正在执行引导 */
        static isExecuteGuide(): boolean {
            return GuideManager.isInGuide() || GuideWeakManager.isExcuting();
        }

        /** 通过强引导 */
        static allPass(): void {
            tl3d.ModuleEventManager.removeEventByTarget(GuideManager._instance);
            GuideManager.guideRequest(GuideStep.endGuide).then(()=>{
                GuideMask.hide();
                UIMgr.hideUIByName(UIConst.GuideTalkView);
            });
        }

        /** 是否可以显示跳过按钮 */
        static canShowPassBtn(): boolean {
            if (Number(App.hero.isNewPlayer) == 0) {
                return false;
            }
            if (GuideManager.isInGuide()) {
                return true;
            }
            if(GuideWeakManager.isExcuting()){
                return true;
            }
            return false;
        }

        /** 跳过当前引导 */
        static passGuide(): void {
            if (GuideManager.isInGuide()) {

                // 记录强制性引导的跳过操作
                let curStep = GuideManager.getGuideStep() + 1;
                let isInGuide = GuideManager.GuideList.some((vo)=>{
                    return vo.step == curStep;
                });
                if(isInGuide) {
                    GuideManager.recordJumpGuide(curStep);
                }

                loghgy(`跳过强制引导`);
                tl3d.ModuleEventManager.removeEventByTarget(GuideManager._instance);
                GuideManager.guideRequest(GuideStep.endGuide).then(() => {
                    tl3d.ModuleEventManager.removeEventByTarget(GuideManager._instance);
                    GuideWeakManager.startRun();
                    UIMgr.hideUIByName(UIConst.GuideTalkView);
                    GuideMask.hide();
                    dispatchEvt(new GuideEvent(GuideEvent.GUIDE_END));
                });
                return;
            }
            if (GuideWeakManager.curExcutingGuideStep != -1) {
                GuideWeakManager.passCurGuide();
                return;
            }
        }
        /** 记录跳过引导操作 */
        static recordJumpGuide(step:number):void {
            if(step <= 0) return;
            loghgy("记录跳过引导步骤:",step);
            let args = {};
            args[Protocol.game_guide_jumpGuide.args.guideStep] = step;
            PLC.request(Protocol.game_guide_jumpGuide,args,(data)=>{
                // if(!data){
                //     loghgy("记录跳过引导步骤失败");
                //     return;
                // }
                // loghgy("记录跳过引导步骤成功");
            });
        }

    }
}