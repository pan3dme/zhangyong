

module game {

    /** 队列：有顺序的 */
    export class GuideQueueManager {

        constructor() {
        }

        private static _guideList: {level:number,clzVo:IGuideWaitStatus}[] = [];
        private static _stepNames: any = {};

        private static _isInit: boolean = false;
        static startRun(): void {
            if (GuideQueueManager._isInit) return;
            GuideQueueManager._isInit = true;
            this._stepNames = {};
            this._guideList = [];
            // 有序
            let tbSys : tb.TB_sys_open;
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHOUCHONG);
            this._stepNames[WeakGuideStep.guideShouchong] = `首冲引导  ${tbSys.prompt}  开启参数：固定${common.GlobalData.SHOUCHONG_OPEN_LV}级开启`;
            this._guideList.push({level:common.GlobalData.SHOUCHONG_OPEN_LV,clzVo:new ShouchongGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.CHAT);
            this._stepNames[WeakGuideStep.guideChat] = `聊天开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new ChatOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHILIANTA);
            this._stepNames[WeakGuideStep.guideTower] = `试练塔开启引开导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new TowerOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.ADVENTURE);
            this._stepNames[WeakGuideStep.guideAdventure] = `探险大富翁开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new AdventureOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.JINGJI);
            this._stepNames[WeakGuideStep.guideJingjichang] = `竞技场开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new JingjichangOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.WORLD_BOSS);
            this._stepNames[WeakGuideStep.guideWorldboss] = `世界boss开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new WorldBossOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.DAILY_COPY);
            this._stepNames[WeakGuideStep.guideDailyCopy] = `每日副本开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new DailyCopyOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_JINGLIAN);
            this._stepNames[WeakGuideStep.guideJinglian] = `装备精炼开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new JinglianOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.JUEXING);
            this._stepNames[WeakGuideStep.guideGodAwaken] = `英雄觉醒开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new GodAwakenOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.GONGHUI);
            this._stepNames[WeakGuideStep.guideGuild] = `公会开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new GuildOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHENMEN);
            this._stepNames[WeakGuideStep.guideShenjiemen] = `神界之门开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new ShenjiemenOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.RONGHUN);
            this._stepNames[WeakGuideStep.guideRonghun] = `融魂开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new RonghunOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.FOG_FOREST);
            this._stepNames[WeakGuideStep.guideFogForest] = `迷雾森林开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new ForestOpenGuide()});
            
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EXPEDITION);
            this._stepNames[WeakGuideStep.guideYuanzheng] = `远征开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new YuanzhengOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.CARAVAN_ESCORT);
            this._stepNames[WeakGuideStep.guideEscort] = `护送开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new EscortOpenGuide()});

            // tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_BAOSHI);
            // this._stepNames[WeakGuideStep.guideBaoshi] = `宝石系统开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            // this._guideList.push({level:tbSys.open_parameter,clzVo:new BaoshiOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.Island);
            this._stepNames[WeakGuideStep.guideIsland] = `神秘岛屿开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new IslandOpenGuide()});

            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.TREASURE);
            this._stepNames[WeakGuideStep.guideTreasure] = `英雄圣物开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            this._guideList.push({level:tbSys.open_parameter,clzVo:new TreasureOpenGuide()});
            
            // 排序
            this._guideList.sort((a,b)=>{
                return a.level - b.level;
            });

            this._curList = [];
            let guideStep = GuideWeakManager.getWeakGuideSteps();
            for(let i = 0 ; i < this._guideList.length ; i++){
                let status: IGuideWaitStatus = this._guideList[i].clzVo;
                let step = status.getGuideStep ? status.getGuideStep() : 0;
                if(step > 0 && guideStep.indexOf(step) == -1){
                    this._curList.push(status);
                }
            }
            GuideQueueManager.runGuide();
        }

        public static _curList : IGuideWaitStatus[] = [];
        public static runGuide():void {
            if (this._curList.length > 0) {
                loghgy('开启有序弱引导');
                let status: IGuideWaitStatus = this._curList.shift();
                status.execute().then(()=>{
                    return status.dispose();
                }).then(()=>{
                    GuideQueueManager.runGuide();
                })
            }else{
                loghgy('完成所有有序弱引导');
            }
        }

        /** 获取引导 */
        public static getGuideStatus(step:number):IGuideWaitStatus {
            let obj = this._guideList.find((vo)=>{
                return vo.clzVo.getGuideStep() == step;
            });
            return obj.clzVo;
        }

        public static getStepName(step:number):string {
            return this._stepNames[step];
        }
    }
}