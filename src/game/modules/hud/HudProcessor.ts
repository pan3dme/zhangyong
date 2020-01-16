/*
* name;
*/
module game {
    export class HudProcessor extends tl3d.Processor {

        constructor() {
            super();
        }

        public getName(): string {
            return "HudProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new HudEvent(HudEvent.UPDATE_CHATNOTICE_TEXT),
                new HudEvent(HudEvent.SHOW_CHATNOTICE_PANEL),
                new HudEvent(HudEvent.UPDATE_EXP_AND_MONEY),
                new HudEvent(HudEvent.SHOW_MODULE_VIEW),
                new HudEvent(HudEvent.SHOW_GM_PANEL),
                new HudEvent(HudEvent.SET_NAME),
                new HudEvent(HudEvent.SET_HEAD_ICON),
                new HudEvent(HudEvent.SET_HEAD_FRAME),
                new HudEvent(HudEvent.SHOW_PLAYER_INFO_VIEW),
                new HudEvent(HudEvent.QIECUO_BACK),
                new HudEvent(HudEvent.SHOW_PLAYER_LINEUP_VIEW),
                new HudEvent(HudEvent.SET_VOLUME),
                new HudEvent(HudEvent.SET_SOUND),
                new HudEvent(HudEvent.UPDATE_POWER),
                new HudEvent(HudEvent.RETURN_LASTVIEW),
                new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW),
                new GuajiEvent(GuajiEvent.LINGQU_GUAJI_JIANGLI),
                new GuajiEvent(GuajiEvent.UPDATE_FUWEN_COPY_INFO),
                new common.GlobalEvent(common.GlobalEvent.DIALOG_OPENED),
                new common.GlobalEvent(common.GlobalEvent.DIALOG_CLOSED),
                new ResEvent(ResEvent.RESOURCE_CHANGE),
                new ResEvent(ResEvent.ROLE_LEVEL_CHANGE),
                new HuodongEvent(game.TopUpEvent.CHONGZHI_SUCCESS)
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {

            if ($event instanceof HudEvent) {
                switch ($event.type) {
                    case HudEvent.UPDATE_CHATNOTICE_TEXT:
                        this.updateChatNoticeText();
                        break;
                    case HudEvent.SHOW_MODULE_VIEW:
                        this.showModuleView($event.data);
                        break;
                    case HudEvent.SHOW_GM_PANEL:
                        this.showGmPanel();
                        break;
                    case HudEvent.UPDATE_EXP_AND_MONEY:
                        this.update_exp_and_money();
                        break;
                    case HudEvent.SET_NAME:
                        this.setNewName();
                        break;
                    case HudEvent.SET_HEAD_ICON:
                        this.setNewHeadIcon();
                        break;
                    case HudEvent.SET_HEAD_FRAME:
                        this.setHeadFrame();
                        break;
                    case HudEvent.SHOW_PLAYER_INFO_VIEW:
                        this.showPlayerInfo($event.data);
                        break;
                    case HudEvent.QIECUO_BACK:
                        this.qiecuoBack($event.data);
                        break;
                    case HudEvent.SHOW_PLAYER_LINEUP_VIEW:
                        this.showPlayerLineup($event.data);
                        break;
                    case HudEvent.UPDATE_POWER:
                        Laya.timer.frameOnce(3, this, () => {
                            this.updatePower();
                        });
                        break;
                    case HudEvent.SET_VOLUME:
                        SoundManager.setMusicVolume($event.data / 100);
                        break;
                    case HudEvent.SET_SOUND:
                        SoundManager.setSoundVolume($event.data / 100);
                        break;
                    case HudEvent.RETURN_LASTVIEW:
                        this.returnLastView($event.data);
                        break;
                    case HudEvent.SHOW_ENTRANCE_VIEW:
                        this.showEntranceView($event.data);
                        break;
                }
            } else if ($event instanceof ResEvent) {
                switch ($event.type) {
                    case ResEvent.RESOURCE_CHANGE:
                        logdebug("hud中收到货币变化");
                        this.changeRes();
                        break;
                    case ResEvent.ROLE_LEVEL_CHANGE:
                        if (UIMgr.hasStage(UIConst.Main3DView)) {
                            let uiPanel: MainView = UIMgr.getUIByName(UIConst.Main3DView);
                            uiPanel.updateBtnType();
                        }
                        break;
                }
            } else if ($event instanceof common.GlobalEvent) {
                switch ($event.type) {
                    case common.GlobalEvent.DIALOG_OPENED:
                        this.dialogOnOpened($event);
                        break;
                    case common.GlobalEvent.DIALOG_CLOSED:
                        this.dialogOnClosed($event.data);
                        break;
                }
            } else if ($event instanceof GuajiEvent) {
                switch ($event.type) {
                    case GuajiEvent.LINGQU_GUAJI_JIANGLI:
                        this.showReardEffect();
                        break;
                    case GuajiEvent.UPDATE_FUWEN_COPY_INFO:
                        this.updateCopyInfo();
                        break;
                }
            } else if ($event instanceof HuodongEvent) {
                switch ($event.type) {
                    case TopUpEvent.CHONGZHI_SUCCESS:
                        if (UIMgr.hasStage(UIConst.Main3DView)) {
                            let uiPanel: MainView = UIMgr.getUIByName(UIConst.Main3DView);
                            uiPanel.updateBtnType();
                        }
                        break;
                }
            }
        }

        /** 界面关闭 */
        private dialogOnOpened(event: common.GlobalEvent): void {
            let dialog = event.data as DialogExt;
            if (!dialog) return;
            if (UIMgr.hasStage(UIConst.HudView)) {
                let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
                view.onDialogOnOpened(dialog);
            }
        }
        /** 界面关闭 */
        private dialogOnClosed(dialog: DialogExt): void {
            if (!dialog) return;
            if (UIMgr.hasStage(UIConst.HudView)) {
                let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
                view.onDialogOnClosed(dialog);
            }
        }

        /** 更新神力 */
        private updatePower() {
            if (this.hudView) {
                this.hudView.updatePower();
            }
        }

        /** 领取挂机奖励 */
        private showReardEffect(): void {
            if(App.hero.getEqusNum() >= tb.TB_game_set.get_TB_game_setById(1).limit_equip){
                showToast(LanMgr.getLan("", 10426));
                return;
            }
            PLC.request(Protocol.game_copy_getMainAfkAward, {}, (resData) => {
                if (!resData) return;
                //显示挂机收益
                let lastAfkTime: number = App.hero.lastGetAfkTime;
                let time = App.serverTimeSecond - lastAfkTime;
                Laya.timer.once(time < 300 ? 200:800, this, () => {
                    UIMgr.showUI(UIConst.Guaji_ShouyiView, { lastTime: lastAfkTime, data: resData });
                });
                App.hero.updateGuajiData(resData);
                if (UIMgr.hasStage(UIConst.GuajiView)) {
                    let view = UIMgr.getUIByName(UIConst.GuajiView) as GuajiView;
                    view.bottomUI.afterRewardSucc();
                    view.bottomUI.updateInterval();
                }
                dispatchEvt(new GuajiEvent(GuajiEvent.LINGQU_GUAJI_JIANGLI_SUCC));
            });
        }

        /** 更新挂机副本信息时更新相关信息 */
        private updateCopyInfo(): void {
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if (view) {
                view.updateShenjieRedpt();
            }
        }

        
        /** 请求公告 */
        private updateChatNoticeText(): void {
            PLC.request(Protocol.chat_notice_getNewslist, null, ($data: any, msg: any) => {
                if (!$data || !$data.newsList) return;
                for (let i = $data.newsList.length - 1; i >= 0; i--) {
                    ChatNoticeMgr.getInstance().addNoticeToPush(new NoticeVo($data.newsList[i]));
                }
            }, false);
        }
        /** 资源更新 */
        private changeRes() {
            if (this.hudView) {
                this.hudView.initView();
            }
        }
        /** 更名 */
        private setNewName() {
            if (UIMgr.hasStage(UIConst.HudView)) {
                this.hudView.setName();
            }
        }

        //设置新的头像
        private setNewHeadIcon() {
            if (UIMgr.hasStage(UIConst.HudView)) {
                this.hudView.setHead();
            }
        }
        private setHeadFrame() {
            if (UIMgr.hasStage(UIConst.HudView)) {
                this.hudView.setHeadFrame();
            }
        }

        /** 显示入口界面 */
        private showEntranceView(type:number):void {
            switch (type) {
				case tb.TB_function.TYPE_LILIAN:
					UIMgr.showUI(UIConst.EntranceList, type);
					break;
				case tb.TB_function.TYPE_MAOXIAN:
					UIMgr.showUI(UIConst.EntranceList_lilian, type);
					break;
				case tb.TB_function.TYPE_JINGJI:
					UIMgr.showUI(UIConst.EntranceList_jingji, type);
					break;
				case tb.TB_function.TYPE_KUAFU:
					UIMgr.showUI(UIConst.EntranceList_kaufu, type);
					break;
			}
        }

        private update_exp_and_money(): void {
            this.changeRes();
        }

        /** 模块跳转 */
        private showModuleView(link: any): void {
            if (!link || !Array.isArray(link) || link.length < 1) return;
            let sysID = link[0];
            let param1 = link[1];
            let param2 = link[2];
            let tbSys = tb.TB_sys_open.get_TB_sys_openById(parseInt(sysID));
            /** 判断系统是否开启 */
            if (tbSys && !App.IsSysOpen(tbSys.ID)) {
                showToast(tbSys.prompt);
                return;
            }
            /** 任务界面跳转成功关闭任务界面 */
            if (UIMgr.hasStage(UIConst.TaskView)) {
                // 任务界面中跳转到日常
                if(sysID == ModuleConst.DAILY){
                    let taskView = UIMgr.getUIByName(UIConst.TaskView) as TaskView;
                    taskView.onSelectTab(TaskTabType.daily);
                    return;
                }else{
                    UIMgr.hideUIByName(UIConst.TaskView);
                }
            }
            /** 活动界面跳转成功关闭活动界面 */
            if (parseInt(sysID) != ModuleConst.MAIN && UIMgr.hasStage(UIConst.TimeLimitView)) {
                UIMgr.hideUIByName(UIConst.TimeLimitView);
            }
            /** 变强界面跳转成功关闭变强界面 */
            if (UIMgr.hasStage(UIConst.BianQiangView)) {
                UIMgr.hideUIByName(UIConst.BianQiangView);
            }
            /** 进阶之路跳转成功关闭进阶之路界面 */
            if (UIMgr.hasStage(UIConst.UpRoadView)) {
                UIMgr.hideUIByName(UIConst.UpRoadView);
            }
            /** 七天狂欢跳转成功关闭七天狂欢界面 */
            if (UIMgr.hasStage(UIConst.SevendaysView)) {
                UIMgr.hideUIByName(UIConst.SevendaysView);
            }
            switch (parseInt(sysID)) {
                case ModuleConst.MAIN:
                    this.showHudMenuView(ModuleConst.MAIN);
                    break;
                case ModuleConst.FIGHT:
                    this.showHudMenuView(ModuleConst.FIGHT);
                    break;
                case ModuleConst.SHENLING:
                    this.showHudMenuView(ModuleConst.SHENLING, [ShenlingTabType.info]);
                    if (!isNaN(param1) && Number(param1) == 1) {
                        dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
                    }
                    break;
                case ModuleConst.RONGHUN:
                    this.showHudMenuView(ModuleConst.SHENLING, [ShenlingTabType.ronghun]);
                    break;
                case ModuleConst.JUEXING:
                    this.showHudMenuView(ModuleConst.SHENLING, [ShenlingTabType.awaken]);
                    break;
                case ModuleConst.SHENGXING:
                    this.showHudMenuView(ModuleConst.SHENLING, [ShenlingTabType.shengxin]);
                    break;
                case ModuleConst.EQUIPMENT:
                case ModuleConst.EQUIP_STRENGTH:
                    this.showHudMenuView(ModuleConst.EQUIPMENT, [EquipTabType.strength]);
                    break;
                case ModuleConst.EQUIP_JINGLIAN:
                    this.showHudMenuView(ModuleConst.EQUIPMENT, [EquipTabType.refine]);
                    break;
                case ModuleConst.EQUIP_BAOSHI:
                    this.showHudMenuView(ModuleConst.EQUIPMENT, [EquipTabType.baoshi]);
                    if(param2 == 1){
                        UIMgr.showUI(UIConst.GemstoneCompoundView);
                    }
                    break;
                case ModuleConst.FUWEN:
                    this.showHudMenuView(ModuleConst.FIGHT);
                    let guajiview:GuajiView = UIMgr.getUIByName(UIConst.GuajiView);
                    if (guajiview && !GuideManager.isExecuteGuide()) {
                        guajiview.showBossTips();
                    }
                    if (param1) {
                        let model = GuajiModel.getInstance();
                        let capter = tb.TB_copy_info.get_TB_copy_infoById(param1) ? tb.TB_copy_info.get_TB_copy_infoById(param1).area : 0;
                        if (!model.isUnlockCapter(capter)) {
                            showToast(LanMgr.getLan("", 10427));
                            return;
                        }
                        let pa1 = Number(param1);
                        let isCanChag = model.isCanChallenge(pa1);
                        if (isCanChag) {
                            UIMgr.showUI(UIConst.GuanqiaView, model.getGuanqiaById(pa1));
                        } else {
                            let tbCoppy = model.getCanChallengeMaxCopy();
                            if (tbCoppy) {
                                UIMgr.showUI(UIConst.GuanqiaView, model.getGuanqiaById(tbCoppy.ID));
                            }
                        }
                    }
                    break;
                case ModuleConst.ARTIFACT:
                case ModuleConst.ARTIFACT_BAPTIZE:
                case ModuleConst.ARTIFACT_ENCHANT:
                    let cc: number[] = [];
                    if (param1) cc[0] = parseInt(param1);
                    if (param2) cc[1] = parseInt(param2);
                    this.showHudMenuView(parseInt(sysID), cc);
                    break;
                case ModuleConst.BEIBAO:
                    param1 = !isNaN(param1) ? Number(param1) : 1;
                    dispatchEvt(new BagEvent(BagEvent.SHOW_BAG_PANEL), param1);
                    break;
                case ModuleConst.EQUIP_FENJIE:
                    this.showHudMenuView(ModuleConst.BEIBAO, [4]);
                    dispatchEvt(new BagEvent(BagEvent.OPEN_SELL_VIEW));
                    break;
                case ModuleConst.JINGJI:
                    dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_ARENA_PANEL));
                    break;
                case ModuleConst.MATCH_FIGHT:
                    dispatchEvt(new ArenaEvent(ArenaEvent.SHOW_MATCH_PANEL));
                    break;
                case ModuleConst.FAST_FIGHT:
                    dispatchEvt(new GuajiEvent(GuajiEvent.SHOW_FAST_BATTLE));
                    break;
                case ModuleConst.FRIEND:
                    dispatchEvt(new FriendEvent(FriendEvent.SHOW_FRIEND_PANEL));
                    break;
                case ModuleConst.HONOR:
                    dispatchEvt(new TaskEvent(TaskEvent.SHOW_TASK_VIEW, param1));
                    break;
                case ModuleConst.SHOUCHONG:
                    UIMgr.showUI(UIConst.Main3DView);
                    dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_SHOUCHONG_PANEL));
                    break;
                case ModuleConst.JISHI:
                    dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), -1);
                    break;
                case ModuleConst.ACTIVITY:
                    dispatchEvt(new TimelimitEvent(TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY));
                    break;
                case ModuleConst.FULI:
                    let index = !isNaN(param1) ? (param1-1) : 0;
                    dispatchEvt(new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.WelfareView,index]);
                    break;
                case ModuleConst.PAY_ACTIVITY:
                    let idxtab = !isNaN(param1) ? (param1-1) : 0;
                    dispatchEvt(new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.PayActivityView,idxtab]);
                    break;
                case ModuleConst.SHOP:
                    dispatchEvt(new ShopEvent(ShopEvent.SHOW_SHOP_VIEW), ShopType.shangcheng);
                    break;
                case ModuleConst.MAIL:
                    dispatchEvt(new MailEvent(MailEvent.SHOW_MAIL_PANEL, param1));
                    break;
                case ModuleConst.GONGHUI:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));
                    break;
                case ModuleConst.GONGHUICOPY:
                    dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_COPY_VIEW));
                    break;
                case ModuleConst.SUMMON:
                    dispatchEvt(new SummonEvent(SummonEvent.SHOW_ZHAOHUAN_PANEL));
                    break;
                case ModuleConst.SHILIANTA:
                    dispatchEvt(new TowerEvent(TowerEvent.SHOW_SHILIANTA_PANEL));
                    break;
                case ModuleConst.CHONGZHI:
                    dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
                case ModuleConst.CHAT:
                    dispatchEvt(new ChatEvent(ChatEvent.SHOW_CHAT_PANEL), [OpenType.common, iface.tb_prop.chatChannelTypeKey.all]);
                    break;
                case ModuleConst.TUJIAN:
                    dispatchEvt(new TujianEvent(TujianEvent.SHOW_TUJIAN_PANEL));
                    break;
                case ModuleConst.DAILY_COPY:
                    dispatchEvt(new DailyEvent(DailyEvent.SHOW_DAILY_COPY_VIEW));
                    break;
                case ModuleConst.WORLD_BOSS:
                    dispatchEvt(new BossEvent(BossEvent.SHOW_BOSS_VIEW));
                    break;
                case ModuleConst.EXPEDITION:
                    dispatchEvt(new YuanzhengEvent(YuanzhengEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.Island:
                    dispatchEvt(new IslandsEvent(IslandsEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.PAIHBAN:
                    dispatchEvt(new RankingListEvent(RankingListEvent.SHOW_RANKINGLIST_PANEL), 1);
                    break;
                case ModuleConst.QIRIKH:
                    dispatchEvt(new SevendaysEvent(SevendaysEvent.SHOW_SEVENDAYS_PANEL));
                    break;
                case ModuleConst.SHENMEN:
                    UIMgr.showUI(UIConst.GodDoorView);
                    break;
                case ModuleConst.FENJIE:
                    dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
                    break;
                case ModuleConst.ADVENTURE:
                    UIMgr.showUI(UIConst.DafuwengView);
                    break;
                case ModuleConst.CARAVAN_ESCORT:
                    dispatchEvt(new EscortEvent(EscortEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.FOG_FOREST:
                    dispatchEvt(new FogForestEvent(FogForestEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.GOD_DOMAIN:
                    dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_GODDOMAIN_VIEW));
                    break;
                case ModuleConst.GLORY_FIGHT:
                    dispatchEvt(new GloryEvent(GloryEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.TEAM_COPY:
                    dispatchEvt(new CopyTeamEvent(CopyTeamEvent.SHOW_MAIN_PANEL));
                    break;
            }
        }

        private showHudMenuView(sysid: number, args: any[] = []): void {
            if (!UIMgr.hasStage(UIConst.HudView)) {
                UIMgr.showUI(UIConst.HudView);
            }
            let ui = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if (ui) {
                switch (sysid) {
                    case ModuleConst.MAIN:
                        ui.on3DMain();
                        break;
                    case ModuleConst.FIGHT:
                        ui.onFight();
                        break;
                    case ModuleConst.SHENLING:
                        ui.onShenling(args[0]);
                        break;
                    case ModuleConst.EQUIPMENT:
                        ui.onEquip(args[0]);
                        break;
                    case ModuleConst.ARTIFACT:
                        let idx: number = args.length > 0 ? args[0] : 0;
                        let id:number = args.length > 1 ? args[1] : 0;
                        ui.onShenqi(idx, id);
                        break;
                    case ModuleConst.ARTIFACT_BAPTIZE:
                        ui.onShenqi(2);
                        break;
                    case ModuleConst.ARTIFACT_ENCHANT:
                        ui.onShenqi(3);
                        break;
                }
            }
        }

        private showGmPanel(): void {
            UIMgr.showUI(UIConst.CheatView);
        }
        /** 返回上一级界面 */
        private returnLastView(uiName: string): void {
            // 默认打开界面
            uiName = uiName || UIConst.GuajiView;
            let view = UIMgr.getUIByName(UIConst.HudView) as HudView;
            if (view) {
                let lastView = view.getLastDialog();
                uiName = lastView || uiName;
            }
            UIMgr.showUI(uiName);
        }

        /** 显示玩家信息 */
        private showPlayerInfo(userData: { playerId: string, event: tl3d.BaseEvent, eventData: any ,hideAllBtn:boolean,isCrossSvr:boolean,clientVo:any }): void {
            if (!userData || !userData.playerId) return;
            if (userData.playerId == App.hero.playerId) {
                return;
            }
            if(userData.isCrossSvr) {
                let arg = {};
                arg[Protocol.center_query_queryWorldPlayer.args.playerId] = userData.playerId;
                PLC.request(Protocol.center_query_queryWorldPlayer, arg, ($data) => {
                    if (!$data) return;
                    let info: common.PlayerInfoVo = new common.PlayerInfoVo();
                    info.setData($data, userData.playerId, userData.event, userData.eventData,userData.hideAllBtn,userData.isCrossSvr);
                    info.clientVo = userData.clientVo;
                    UIMgr.showUI(UIConst.PlayerInfoView, info);
                });
            }else{
                let arg = {};
                arg[Protocol.center_query_queryPlayer.args.playerId] = userData.playerId;
                PLC.request(Protocol.center_query_queryPlayer, arg, ($data) => {
                    if (!$data) return;
                    let info: common.PlayerInfoVo = new common.PlayerInfoVo();
                    info.setData($data, userData.playerId, userData.event, userData.eventData,userData.hideAllBtn,userData.isCrossSvr);
                    info.clientVo = userData.clientVo;
                    UIMgr.showUI(UIConst.PlayerInfoView, info);
                });
            }
        }
        /** 切磋返回 */
        private qiecuoBack(userData: any): void {
            // UIMgr.showUI(UIConst.MainView);
            this.showPlayerInfo(userData);
        }
        /** 显示玩家阵容信息 */
        private showPlayerLineup(info: common.IPlayerLinuepInfo): void {
            if (!info) return;
            UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
        }

        public get hudView(): HudView {
            return UIMgr.getUIByName(UIConst.HudView);
        }
    }
}
