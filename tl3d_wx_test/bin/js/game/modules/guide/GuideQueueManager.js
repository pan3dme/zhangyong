var game;
(function (game) {
    /** 队列：有顺序的 */
    var GuideQueueManager = /** @class */ (function () {
        function GuideQueueManager() {
        }
        GuideQueueManager.startRun = function () {
            if (GuideQueueManager._isInit)
                return;
            GuideQueueManager._isInit = true;
            this._stepNames = {};
            this._guideList = [];
            // 有序
            var tbSys;
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHOUCHONG);
            this._stepNames[game.WeakGuideStep.guideShouchong] = "\u9996\u51B2\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A\u56FA\u5B9A" + common.GlobalData.SHOUCHONG_OPEN_LV + "\u7EA7\u5F00\u542F";
            this._guideList.push({ level: common.GlobalData.SHOUCHONG_OPEN_LV, clzVo: new game.ShouchongGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.CHAT);
            this._stepNames[game.WeakGuideStep.guideChat] = "\u804A\u5929\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.ChatOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHILIANTA);
            this._stepNames[game.WeakGuideStep.guideTower] = "\u8BD5\u7EC3\u5854\u5F00\u542F\u5F15\u5F00\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.TowerOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.ADVENTURE);
            this._stepNames[game.WeakGuideStep.guideAdventure] = "\u63A2\u9669\u5927\u5BCC\u7FC1\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.AdventureOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.JINGJI);
            this._stepNames[game.WeakGuideStep.guideJingjichang] = "\u7ADE\u6280\u573A\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.JingjichangOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.WORLD_BOSS);
            this._stepNames[game.WeakGuideStep.guideWorldboss] = "\u4E16\u754Cboss\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.WorldBossOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.DAILY_COPY);
            this._stepNames[game.WeakGuideStep.guideDailyCopy] = "\u6BCF\u65E5\u526F\u672C\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.DailyCopyOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_JINGLIAN);
            this._stepNames[game.WeakGuideStep.guideJinglian] = "\u88C5\u5907\u7CBE\u70BC\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.JinglianOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.JUEXING);
            this._stepNames[game.WeakGuideStep.guideGodAwaken] = "\u82F1\u96C4\u89C9\u9192\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.GodAwakenOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.GONGHUI);
            this._stepNames[game.WeakGuideStep.guideGuild] = "\u516C\u4F1A\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.GuildOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.SHENMEN);
            this._stepNames[game.WeakGuideStep.guideShenjiemen] = "\u795E\u754C\u4E4B\u95E8\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.ShenjiemenOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.RONGHUN);
            this._stepNames[game.WeakGuideStep.guideRonghun] = "\u878D\u9B42\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.RonghunOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.FOG_FOREST);
            this._stepNames[game.WeakGuideStep.guideFogForest] = "\u8FF7\u96FE\u68EE\u6797\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.ForestOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EXPEDITION);
            this._stepNames[game.WeakGuideStep.guideYuanzheng] = "\u8FDC\u5F81\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.YuanzhengOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.CARAVAN_ESCORT);
            this._stepNames[game.WeakGuideStep.guideEscort] = "\u62A4\u9001\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.EscortOpenGuide() });
            // tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_BAOSHI);
            // this._stepNames[WeakGuideStep.guideBaoshi] = `宝石系统开启引导  ${tbSys.prompt}  开启参数：${tbSys.open_parameter}`;
            // this._guideList.push({level:tbSys.open_parameter,clzVo:new BaoshiOpenGuide()});
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.Island);
            this._stepNames[game.WeakGuideStep.guideIsland] = "\u795E\u79D8\u5C9B\u5C7F\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.IslandOpenGuide() });
            tbSys = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.TREASURE);
            this._stepNames[game.WeakGuideStep.guideTreasure] = "\u82F1\u96C4\u5723\u7269\u5F00\u542F\u5F15\u5BFC  " + tbSys.prompt + "  \u5F00\u542F\u53C2\u6570\uFF1A" + tbSys.open_parameter;
            this._guideList.push({ level: tbSys.open_parameter, clzVo: new game.TreasureOpenGuide() });
            // 排序
            this._guideList.sort(function (a, b) {
                return a.level - b.level;
            });
            this._curList = [];
            var guideStep = game.GuideWeakManager.getWeakGuideSteps();
            for (var i = 0; i < this._guideList.length; i++) {
                var status_1 = this._guideList[i].clzVo;
                var step = status_1.getGuideStep ? status_1.getGuideStep() : 0;
                if (step > 0 && guideStep.indexOf(step) == -1) {
                    this._curList.push(status_1);
                }
            }
            GuideQueueManager.runGuide();
        };
        GuideQueueManager.runGuide = function () {
            if (this._curList.length > 0) {
                loghgy('开启有序弱引导');
                var status_2 = this._curList.shift();
                status_2.execute().then(function () {
                    return status_2.dispose();
                }).then(function () {
                    GuideQueueManager.runGuide();
                });
            }
            else {
                loghgy('完成所有有序弱引导');
            }
        };
        /** 获取引导 */
        GuideQueueManager.getGuideStatus = function (step) {
            var obj = this._guideList.find(function (vo) {
                return vo.clzVo.getGuideStep() == step;
            });
            return obj.clzVo;
        };
        GuideQueueManager.getStepName = function (step) {
            return this._stepNames[step];
        };
        GuideQueueManager._guideList = [];
        GuideQueueManager._stepNames = {};
        GuideQueueManager._isInit = false;
        GuideQueueManager._curList = [];
        return GuideQueueManager;
    }());
    game.GuideQueueManager = GuideQueueManager;
})(game || (game = {}));
