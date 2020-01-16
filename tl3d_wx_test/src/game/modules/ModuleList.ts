import Module = tl3d.Module;
class ModuleList {
    public constructor() {

    }
    public static allModules: Array<Module>;

    private static getModuleList(): Array<Module> {
        if (ModuleList.allModules) {
            return ModuleList.allModules;
        }
        //所有的需要注册的模块  都写在这里
        ModuleList.allModules = [
            new game.GuajiModule(),
            new game.FirstGuideModule(),
            new game.FightsModule(),
            new game.ResModule(),
            new game.ZhaohuanModule(),
            new game.HudModule(),
            new game.GodModule(),
            new game.TaskModule(),
            new game.MailModule(),
            new game.ChatModule(),
            new game.TujianModule(),
            new game.FriendModule(),
            new game.BagModule(),
            new game.TowerModule(),
            new game.GuildModule(),
            new game.HuodongModule(),
            new game.ChongzhiModule(),
            new game.EquipModule(),
            new game.TimelimitModule(),
            new game.BossModule(),
            new game.RankModule(),
            new game.DailyCopyModule(),
            new game.YuanzhengModule(),
            new game.SevendaysModule(),
            new game.FenjieModule(),
            new game.GodDoorModule(),
            new game.ArtifactModule(),
            new game.EscortModule(),
            new game.FogForestModule(),
            new game.IslandModule(),
            new game.ShareModule(),
            new game.OpenserverModule(),
            new game.OnlineModule(),
            new game.PowerrankModule(),
            new game.LimiteBuyModule(),
            new game.ShopModule(),
            new game.GloryModule(),
            new game.ArenaModule(),
            new game.GodDomainModule(),
            new game.DownloadModule(),
            new game.DafuwengModule(),
            new game.UpRoadModule(),
            new game.CopyTeamModule(),
        ];
        return ModuleList.allModules;
    }

    static mtotal: number = 0;

    /**
     * 启动所有模块 
     */
    public static startup(): void {
        App.hero.setData(App.hero.initData);
        var allModules: Array<Module> = ModuleList.getModuleList();
        UIMgr.getInstance().showLoading(LanMgr.getLan(``,10542));
        ModuleList.mtotal = ModuleList.allModules.length;
        Laya.timer.frameLoop(1, ModuleList, ModuleList.startModule);
    }


    /**
     * 逐个启动模块
     */
    private static startModule(): void {
        let mlen = ModuleList.allModules.length;
        if (mlen > 0) {
            UIMgr.getInstance().loadingProcess(1 - (mlen / ModuleList.mtotal));
            Module.registerModule(ModuleList.allModules.shift());
        }
        else {
            Laya.timer.clear(ModuleList, ModuleList.startModule);
            game.registerRedPoint();// 注册红点:设置玩家数据及模块加载完毕之后再注册红点数据
            var isNotNew = (Number(App.hero.isNewPlayer) != 0);
            if (isNotNew) { //旧号
                dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.ENTERHUD_EVENT));
            }
            else {  //新号
                // if (ExtConfig.RELEASE) {
                dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.LOADJUQING_EVENT),true);
                // } else {
                // dispatchEvt(new game.LoginLoadEvent(game.LoginLoadEvent.ENTERHUD_EVENT), 9);
                // UIMgr.showUI(UIConst.CreateRoleView, null, false);
                // }
            }
        }
    }
}

