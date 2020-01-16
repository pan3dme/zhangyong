

module game {

    export enum WeakGuideStep {

        guideShouchong = 1001,             // 首充引导

        guideAdventure = 1100,           // 探险
        advt_open = 1101,
        advt_do = 1102,

        guideJingjichang = 1110,         // 竞技场开启   
        jjc_open = 1111,                 // 开启
        jjc_fight = 1112,                // 战斗

        guideDailyCopy = 1120,           // 每日副本开启
        daily_open = 1121,               // 开启
        daily_challenge = 1122,          // 挑战一次

        guideShenqi = 1130,              // 神器引导
        sq_unlock = 1131,                // 解锁神器
        sq_shangzhen = 1132,             // 穿戴神器

        guideWorldboss = 1140,           // 世界boss开启  
        boss_open = 1141,
        boss_do = 1142,

        guideJinglian = 1150,            // 装备精炼引导
        jl_open = 1151,
        jl_wearEquip = 1152,             // 穿戴装备
        jl_jinglianEquip = 1153,         // 一键精炼第1次

        guideShenjiemen = 1160,          // 神界之门开启    
        sm_open = 1161,
        sm_do = 1162,

        guideGuild = 1170,               // 公会开启   
        guild_open = 1171,
        guild_do = 1172,

        guideJoinGuild = 1180,           // 加入公会引导
        
        guideIsland = 1190,              // 神秘岛屿开启    
        island_open = 1191,
        island_do = 1192,
        
        guideYuanzheng = 1200,           // 远征开启 
        yuanzheng_open = 1201,   
        yuanzheng_do = 1202,   

        guideFogForest = 1210,           // 迷雾森林
        forest_open = 1211,
        forest_challenge = 1212,         // 挑战一次

        guideRonghun = 1220,             // 融魂
        ronghun_open = 1221,
        ronghun_do = 1222,

        guideEscort = 1230,              // 护送
        escort_open = 1231,
        escort_refresh = 1232,           // 刷新
        escort_go = 1233,                // 护送

        guideSqXilian = 1240,            // 神器洗练
        sqxl_open = 1241,
        sqxl_do = 1242,

        // 暂时注释
        guideBaoshi = 1250,              // 装备宝石
        bs_open = 1251,                  // 开启
        bs_equip = 1252,                 // 没有装备时穿戴
        bs_lvup = 1253,                  // 升级

        guideTower = 1270,           // 试练塔
        tower_open = 1271,
        tower_fight = 1272,

        guideGodAwaken = 1280,       // 英雄觉醒
        awaken_open = 1281,
        awaken_do = 1282,

        guideTreasure = 1290,        // 圣物
        treasure_open = 1291,
        treasure_wear = 1292,
        treasure_streng = 1293,

        guideShenqiStr = 1300,       // 神器强化开启
        sqSt_unlock = 1301,          //　解锁第二把神器
        sqSt_do = 1302,              // 强化一次

        guideChat = 1310,            // 聊天开启
        chat_open = 1311,
        chat_send = 1312,

        endAllGuide = 99999,            // 跳过所有引导（测试用）
    }

    export class GuideWeakManager {

        constructor() {

        }

        private static _guideList: any = {};
        private static _isInit: boolean = false;               //是否已经初始化 -- 启动弱引导
        public static curExcutingGuideStep: number = -1;     //当前执行中的 弱引导步骤
        private static _stepNames: any = {};
        static startRun(): void {
            if (GuideWeakManager._isInit) return;
            GuideWeakManager._isInit = true;
            GuideWeakManager.setCurExcutingStep(-1);
            // 跳过所有触发性引导
            if (GuideWeakManager.isFinishStep(WeakGuideStep.endAllGuide)) {
                return;
            }
            GuideQueueManager.startRun();
            this._stepNames = {};
            this._guideList = {};

            // 系统id开启
            this._guideList[WeakGuideStep.guideShenqi] = new ShenqiOpenGuide();
            this._stepNames[WeakGuideStep.guideShenqi] = `神器开启引导  进阶之路1阶全部完成`;

            this._guideList[WeakGuideStep.guideShenqiStr] = new ShenqiStrengthOpenGuide();
            this._stepNames[WeakGuideStep.guideShenqiStr] = `神器强化开启引导  进阶之路2阶全部完成`;

            this._guideList[WeakGuideStep.guideJoinGuild] = new JoinGuildGuide();
            this._stepNames[WeakGuideStep.guideJoinGuild] = "创建或加入公会后的大厅引导";

            loghgy('开启无序弱引导');
            let list: Promise<any>[] = [];
            let guideStep = GuideWeakManager.getWeakGuideSteps();
            for (let key in this._guideList) {
                if (guideStep.indexOf(parseInt(key)) == -1) {
                    let status: IGuideWaitStatus = this._guideList[key];
                    list.push(status.execute().then(() => {
                        status.dispose();
                    }));
                }
            }
            if (list.length > 0) {
                Promise.all(list).then(() => {
                    loghgy('完成所有无序弱引导');
                });
            }
        }

        /** 监听系统开启 */
        static listenSysOpen(sysId: number, context: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                loghgy("监听系统开启,系统ID：",sysId);
                // 首冲特殊：不是系统配置等级开启,而是在之后等级开启
                if(sysId == ModuleConst.SHOUCHONG) {
                    if(App.hero.level >= common.GlobalData.SHOUCHONG_OPEN_LV) {
                        resolve();
                        return;
                    }
                    GuideManager.listenNotification(ResEvent.ROLE_LEVEL_CHANGE, () => {
                        return App.hero.level >= common.GlobalData.SHOUCHONG_OPEN_LV;
                    }, context).then(() => {
                        resolve();
                    });
                    return;
                }
                if (App.IsSysOpen(sysId)) {
                    resolve();
                    return;
                }
                let openType = App.getOpenType(sysId);
                if (openType == SysConditionType.level) {
                    GuideManager.listenNotification(ResEvent.ROLE_LEVEL_CHANGE, () => {
                        return App.IsSysOpen(sysId);
                    }, context).then(() => {
                        resolve();
                    });
                } else if (openType == SysConditionType.copy) {
                    GuideManager.listenNotification(GuajiEvent.UPDATE_FUWEN_COPY_INFO, () => {
                        return App.IsSysOpen(sysId);
                    }, context).then(() => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        }

        /** 系统开启时引导到指定场景 */
        static guideSysOpenToScene(index: number, context: any):Promise<any> {
            return new Promise<any>((resolve, reject) => {
                new ListenFightClosedWaitStatus().execute().then(()=>{
                    return new ListenDialogQueueWaitStatus(true,context).execute();
                }).then(()=>{
                    return GuideWeakManager.listenToMain(index,context);
                }).then(()=>{
                    GuideMask.hide();
                    resolve();
                });
            });
        }

        /** 打开主场景，然后根据index定位到指定主场景 */
        static listenToMain(index: number, context: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                Promise.resolve().then(() => {
                    if (UIMgr.getInstance().hasStageByGroup(UIConst.hud_group)) {
                        return true;
                    }
                    return GuideManager.listenDialogGroup(common.GlobalEvent.DIALOG_OPENED, UIConst.hud_group, context);
                }).then(()=>{
                    return GuideManager.timeout(100);
                }).then(()=>{
                    // 关闭其他二级界面 : 引导点击返回或者主场景时需要关闭弹窗防止被挡
                    Laya.timer.callLater(this,()=>{
                        UIMgr.getInstance().hideUIByDepth([UI_DEPATH_VALUE.TOP, UI_DEPATH_VALUE.LOADING]);
                    });
                    //如果有SysTopView界面，先移除
                    // if(UIMgr.hasStage(UIConst.SysTopView)) {
                    //     let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                    //     GuideMask.show(view.btnClose,DirectionType.top);
                    //     return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.SysTopView, this).then(()=>{

                    //     });
                    // }
                    return GuideWeakManager.listenSysTopViewClose(null);
                }).then(() => {
                    if(index >= 0) {
                        return GuideManager.guideToMainView(index, "", context);
                    }
                    return true;
                }).then(() => {
                    resolve();
                });
            });
        }

        /** 监听SysTopView全部关闭 */
        static listenSysTopViewClose(endResolve:Function):Promise<any>{
            return new Promise((resolve,reject)=>{
                GuideManager.timeout(100).then(()=>{
                    if(UIMgr.hasStage(UIConst.SysTopView)) {
                        let view = UIMgr.getUIByName(UIConst.SysTopView) as SysTopView;
                        GuideMask.show(view.btnClose,DirectionType.top);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.SysTopView, this)
                        .then(()=>{
                            GuideWeakManager.listenSysTopViewClose(endResolve || resolve);
                        });
                    }else{
                        if(endResolve){
                            endResolve();
                        }else{
                            resolve();
                        }
                    }
                })
            });
        }

        /** 执行引导列表 */
        static runGuideList(guideList: any, step: number, resolve): void {
            let list: Function[] = [];
            let guideStep = GuideWeakManager.getWeakGuideSteps();
            for (let key in guideList) {
                let step = parseInt(key);
                if (guideStep.indexOf(step) == -1) {
                    list.push(guideList[key]);
                }
            }
            if (list.length > 0) {
                GuideWeakManager.setCurExcutingStep(step);
            } else {
                if(step > 0){
                    GuideManager.guideRequest(0, step).then(() => {
                        resolve();
                    });
                }else{
                    resolve();
                }
                return;
            }
            let stepName : string = GuideWeakManager._stepNames[step] || GuideQueueManager.getStepName(step);
            loghgy(`runGuideList: ${stepName}`);
            function run(): void {
                if (list.length > 0) {
                    let fun = list.shift();
                    fun(run);
                } else {
                    if(step > 0){
                        GuideManager.guideRequest(0, step).then(() => {
                            resolve();
                        });
                    }else{
                        resolve();
                    }
                }
            }
            run();
        }

        /** 监听奖励界面关闭:   启时，如果奖励界面如果还没关掉,等关掉； */
        static listenRewardClose(context:any,timeout:number=200):Promise<any> {
            return new Promise<any>((resolve)=>{
                GuideManager.timeout(timeout)
                .then(() => {
                    GuideMask.hide();
                    if (UIMgr.hasStage(UIConst.CommonRewardView)) {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView, this);
                    } else {
                        return true;
                    }
                }).then(()=>{
                    resolve();
                });
            });
        }

        /** 等待系统开启动画 */
        static waitSysOpenAnim(step:number,sysid:number,caller:any):Promise<any>{
            return new Promise<any>((resolve)=>{
                GuideWeakManager.listenToMain(5, this).then(()=>{
                    if(step > 0) {
                        return GuideManager.guideRequest(0,step);
                    }
                    return true;
                }).then(()=>{
                    return GuideManager.timeout(100);
                }).then(()=>{
                    // 遮罩
                    GuideMask.showWithTransparent();
                    GuideMask.setMaskAlpha(1);
                    // 添加系统开启按钮
                    let openView = new GuaJiSysOpenView();
                    openView.setGuideView(sysid);
                    let guajiView = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                    openView.anchorX = openView.anchorY = 0.5;
                    openView.scale(0.5,0.5);
                    openView.alpha = 0;
                    openView.x = Laya.stage.width/2;
                    openView.y = Laya.stage.height/2;
                    Laya.stage.addChild(openView);
                    // 获取终点位置
                    let targetPos : Laya.Point;
                    let hudView = UIMgr.getUIByName(UIConst.HudView) as HudView;
                    switch(sysid){
                        case ModuleConst.SHENMEN:
                        case ModuleConst.GONGHUI:
                            targetPos = hudView.btn_main.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.ADVENTURE:
                            targetPos = guajiView.bottomUI.btn_adventure.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.CHAT:
                            targetPos = hudView.btn_chat.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.RONGHUN:
                        case ModuleConst.SHENGJIE:
                        case ModuleConst.SHENGXING:
                        case ModuleConst.JUEXING:
                            targetPos = hudView.btn_god.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.EQUIPMENT:
                        case ModuleConst.EQUIP_JINGLIAN:
                        case ModuleConst.EQUIP_BAOSHI:
                        case ModuleConst.EQUIP_STRENGTH:
                            targetPos = hudView.btn_equip.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.ARTIFACT:
                        case ModuleConst.ARTIFACT_BAPTIZE:
                        case ModuleConst.ARTIFACT_ENCHANT:
                            targetPos = hudView.btn_shenqi.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.DAILY_COPY:
                        case ModuleConst.EXPEDITION:
                        case ModuleConst.CARAVAN_ESCORT:
                            targetPos = guajiView.btn_lilian.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.WORLD_BOSS:
                        case ModuleConst.FOG_FOREST:
                        case ModuleConst.SHILIANTA:
                            targetPos = guajiView.btn_maoxian.localToGlobal(new Laya.Point(0, 0));
                            break;
                        case ModuleConst.JINGJI:
                        case ModuleConst.Island:
                        case ModuleConst.MATCH_FIGHT:
                        case ModuleConst.GOD_DOMAIN:
                        case ModuleConst.GLORY_FIGHT:
                            targetPos = guajiView.btn_jingji.localToGlobal(new Laya.Point(0, 0));
                            break;
                        default :
                            targetPos = hudView.btn_fight.localToGlobal(new Laya.Point(0, 0));
                            break;
                    }
                    Laya.Tween.to(openView,{alpha:1,scaleX:1.5,scaleY:1.5,x:Laya.stage.width/2,y:Laya.stage.height/2},500,Laya.Ease.sineIn,new Handler(this,()=>{
                        openView.setGuideStatus(true);
                        Laya.Tween.clearTween(openView);
                        GuideManager.listenNotification(GuajiEvent.CONFIRM_SYS_OPEN_BUTTON,null,caller)
                        .then(()=>{
                            openView.setGuideStatus(false);
                            Laya.Tween.to(openView,{scaleX:1,scaleY:1,x:targetPos.x+50,y:targetPos.y+50},800,Laya.Ease.sineIn,new Handler(this,()=>{
                                Laya.Tween.clearTween(openView);
                                Laya.stage.removeChild(openView);
                                GuideMask.hide();
                                resolve();
                            }));
                        })
                    }));
                });
            });
        }

        /** 监听进入系统 */
        static listenGoToSys(sysid:number,sysVname:string,caller:any):Promise<any>{
            return new Promise((resolve)=>{
                let type = 0;
                switch(sysid){
                    case ModuleConst.SHILIANTA:
                    case ModuleConst.WORLD_BOSS:
                    case ModuleConst.FOG_FOREST:
                        type = 1;
                        break;
                    case ModuleConst.JINGJI:
                    case ModuleConst.Island:
                        type = 2;
                        break;
                    case ModuleConst.GLORY_FIGHT:
                    case ModuleConst.MATCH_FIGHT:
                    case ModuleConst.GOD_DOMAIN:
                        type = 3;
                        break;
                }
                let viewName = type == 1 ? UIConst.EntranceList_lilian : (type == 2 ? UIConst.EntranceList_jingji : (type == 3 ? UIConst.EntranceList_kaufu : UIConst.EntranceList));
                GuideWeakManager.listenToMain(5, caller)
                .then(() => {
                    let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                    let btn = type == 1 ? view.btn_maoxian : (type == 2 ? view.btn_jingji : (type == 3 ? view.btn_kf : view.btn_lilian));
                    GuideMask.show(btn, DirectionType.bottom);
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, viewName, caller);
                }).then(()=>{
                    // 开场动画
                    return GuideManager.timeout(1000);
                }).then(()=>{
                    let view = UIMgr.getUIByName(viewName) as EntranceListView;
                    view.btnlist.scrollBar.touchScrollEnable = false;
                    let index = view.getIRIndex(sysid);
                    if(index >= 3){
                        view.btnlist.scrollTo(index-2);
                        return GuideManager.timeout(300);
                    }else{
                        return true;
                    }
                }).then(()=>{
                    let view = UIMgr.getUIByName(viewName) as EntranceListView;
                    GuideMask.show(view.getIRBySysid(sysid),DirectionType.bottom);
                    if(UIMgr.getInstance().getUIInfo(sysVname).popEffect) {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, sysVname, caller)
                        .then(()=>{
                            GuideMask.showWithTransparent();
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, sysVname, caller);
                        });
                    }else{
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, sysVname, caller);
                    }
                }).then(()=>{
                    let view = UIMgr.getUIByName(viewName) as EntranceListView;
                    view.btnlist.scrollBar.touchScrollEnable = true;
                    resolve();
                });
            });
        }

        /** 弱引导完成的步骤列表 */
        static getWeakGuideSteps(): number[] {
            return App.hero.tasks.guideWeakStep;
        }

        /**
         * 设置正在执行的弱引导步骤：如果该引导不是多个子步骤，需要代码设置
         * @param step 步骤
         */
        static setCurExcutingStep(step: number): void {
            let stepName = this._stepNames[step] || GuideQueueManager.getStepName(step);
            if(step == -1){
                loghgy("移除正在执行的弱引导",stepName);
            }else{
                loghgy("设置正在执行的弱引导：",stepName);
            }
            GuideWeakManager.curExcutingGuideStep = step;
            dispatchEvt(new GuideEvent(GuideEvent.UPDATE_GUIDE_STATUS));
        }

        /** 是否还有引导步骤 */
        static isHasStep(): boolean {
            let has: boolean = false;
            let guideStep = GuideWeakManager.getWeakGuideSteps();
            for (let key in this._guideList) {
                if (guideStep.indexOf(parseInt(key)) == -1) {
                    has = true;
                    break;
                }
            }
            return has;
        }

        /** 是否完成该弱引导步骤 */
        static isFinishStep(step: number): boolean {
            let arr = GuideWeakManager.getWeakGuideSteps();
            return arr.indexOf(step) != -1;
        }

        /** 
         * 是否正在执行某个引导步骤 
         * 不传参数就是表示是否在执行触发性引导中
         */
        static isExcuting(...types: WeakGuideStep[]): boolean {
            if(types.length ==0){
                return GuideWeakManager.curExcutingGuideStep != -1;
            }
            return types.some((type) => {
                return GuideWeakManager.curExcutingGuideStep == type;
            });
        }

        /** 跳过弱引导 */
        static allPass(): void {
            this.passCurGuide();
            GuideManager.guideRequest(0, WeakGuideStep.endAllGuide).then(() => {
                GuideMask.dispose();
                UIMgr.hideUIByName(UIConst.GuideTalkView);
            })
        }

        /** 跳过当前触发性引导 */
        static passCurGuide(): void {
            loghgy('跳过触发性引导', GuideWeakManager.curExcutingGuideStep);
            let curStatus: IGuideWaitStatus = this._guideList[GuideWeakManager.curExcutingGuideStep];
            // 是否是有序的，需要重新触发
            let isQueue : boolean = curStatus ? false : true;
            curStatus = curStatus ? curStatus : GuideQueueManager.getGuideStatus(GuideWeakManager.curExcutingGuideStep);
            if (curStatus) {

                // 记录触发性引导的跳过操作-精确到子步骤
                let curChildStep = curStatus.getCurChildStep();
                if(curChildStep > 0 && !GuideWeakManager.isFinishStep(curChildStep)) {
                    GuideManager.recordJumpGuide(curChildStep);
                }

                loghgy('跳过触发性引导：', GuideWeakManager.curExcutingGuideStep);
                tl3d.ModuleEventManager.removeEventByTarget(curStatus);
                GuideManager.guideRequest(0, GuideWeakManager.curExcutingGuideStep)
                .then(() => {
                    loghgy('成功跳过触发性引导', GuideWeakManager.curExcutingGuideStep);
                    curStatus.dispose();
                    if(isQueue) {
                        GuideQueueManager.runGuide();
                    }
                });
            }
        }
    }

}