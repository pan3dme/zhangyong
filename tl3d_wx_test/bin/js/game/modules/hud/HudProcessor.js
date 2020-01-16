var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var game;
(function (game) {
    var HudProcessor = /** @class */ (function (_super) {
        __extends(HudProcessor, _super);
        function HudProcessor() {
            return _super.call(this) || this;
        }
        HudProcessor.prototype.getName = function () {
            return "HudProcessor";
        };
        HudProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.HudEvent(game.HudEvent.UPDATE_CHATNOTICE_TEXT),
                new game.HudEvent(game.HudEvent.SHOW_CHATNOTICE_PANEL),
                new game.HudEvent(game.HudEvent.UPDATE_EXP_AND_MONEY),
                new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW),
                new game.HudEvent(game.HudEvent.SHOW_GM_PANEL),
                new game.HudEvent(game.HudEvent.SET_NAME),
                new game.HudEvent(game.HudEvent.SET_HEAD_ICON),
                new game.HudEvent(game.HudEvent.SET_HEAD_FRAME),
                new game.HudEvent(game.HudEvent.SHOW_PLAYER_INFO_VIEW),
                new game.HudEvent(game.HudEvent.QIECUO_BACK),
                new game.HudEvent(game.HudEvent.SHOW_PLAYER_LINEUP_VIEW),
                new game.HudEvent(game.HudEvent.SET_VOLUME),
                new game.HudEvent(game.HudEvent.SET_SOUND),
                new game.HudEvent(game.HudEvent.UPDATE_POWER),
                new game.HudEvent(game.HudEvent.RETURN_LASTVIEW),
                new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW),
                new game.GuajiEvent(game.GuajiEvent.LINGQU_GUAJI_JIANGLI),
                new game.GuajiEvent(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO),
                new common.GlobalEvent(common.GlobalEvent.DIALOG_OPENED),
                new common.GlobalEvent(common.GlobalEvent.DIALOG_CLOSED),
                new game.ResEvent(game.ResEvent.RESOURCE_CHANGE),
                new game.ResEvent(game.ResEvent.ROLE_LEVEL_CHANGE),
                new game.HuodongEvent(game.TopUpEvent.CHONGZHI_SUCCESS)
            ];
        };
        //处理事件
        HudProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof game.HudEvent) {
                switch ($event.type) {
                    case game.HudEvent.UPDATE_CHATNOTICE_TEXT:
                        this.updateChatNoticeText();
                        break;
                    case game.HudEvent.SHOW_MODULE_VIEW:
                        this.showModuleView($event.data);
                        break;
                    case game.HudEvent.SHOW_GM_PANEL:
                        this.showGmPanel();
                        break;
                    case game.HudEvent.UPDATE_EXP_AND_MONEY:
                        this.update_exp_and_money();
                        break;
                    case game.HudEvent.SET_NAME:
                        this.setNewName();
                        break;
                    case game.HudEvent.SET_HEAD_ICON:
                        this.setNewHeadIcon();
                        break;
                    case game.HudEvent.SET_HEAD_FRAME:
                        this.setHeadFrame();
                        break;
                    case game.HudEvent.SHOW_PLAYER_INFO_VIEW:
                        this.showPlayerInfo($event.data);
                        break;
                    case game.HudEvent.QIECUO_BACK:
                        this.qiecuoBack($event.data);
                        break;
                    case game.HudEvent.SHOW_PLAYER_LINEUP_VIEW:
                        this.showPlayerLineup($event.data);
                        break;
                    case game.HudEvent.UPDATE_POWER:
                        Laya.timer.frameOnce(3, this, function () {
                            _this.updatePower();
                        });
                        break;
                    case game.HudEvent.SET_VOLUME:
                        SoundManager.setMusicVolume($event.data / 100);
                        break;
                    case game.HudEvent.SET_SOUND:
                        SoundManager.setSoundVolume($event.data / 100);
                        break;
                    case game.HudEvent.RETURN_LASTVIEW:
                        this.returnLastView($event.data);
                        break;
                    case game.HudEvent.SHOW_ENTRANCE_VIEW:
                        this.showEntranceView($event.data);
                        break;
                }
            }
            else if ($event instanceof game.ResEvent) {
                switch ($event.type) {
                    case game.ResEvent.RESOURCE_CHANGE:
                        logdebug("hud中收到货币变化");
                        this.changeRes();
                        break;
                    case game.ResEvent.ROLE_LEVEL_CHANGE:
                        if (UIMgr.hasStage(UIConst.Main3DView)) {
                            var uiPanel = UIMgr.getUIByName(UIConst.Main3DView);
                            uiPanel.updateBtnType();
                        }
                        break;
                }
            }
            else if ($event instanceof common.GlobalEvent) {
                switch ($event.type) {
                    case common.GlobalEvent.DIALOG_OPENED:
                        this.dialogOnOpened($event);
                        break;
                    case common.GlobalEvent.DIALOG_CLOSED:
                        this.dialogOnClosed($event.data);
                        break;
                }
            }
            else if ($event instanceof game.GuajiEvent) {
                switch ($event.type) {
                    case game.GuajiEvent.LINGQU_GUAJI_JIANGLI:
                        this.showReardEffect();
                        break;
                    case game.GuajiEvent.UPDATE_FUWEN_COPY_INFO:
                        this.updateCopyInfo();
                        break;
                }
            }
            else if ($event instanceof game.HuodongEvent) {
                switch ($event.type) {
                    case game.TopUpEvent.CHONGZHI_SUCCESS:
                        if (UIMgr.hasStage(UIConst.Main3DView)) {
                            var uiPanel = UIMgr.getUIByName(UIConst.Main3DView);
                            uiPanel.updateBtnType();
                        }
                        break;
                }
            }
        };
        /** 界面关闭 */
        HudProcessor.prototype.dialogOnOpened = function (event) {
            var dialog = event.data;
            if (!dialog)
                return;
            if (UIMgr.hasStage(UIConst.HudView)) {
                var view = UIMgr.getUIByName(UIConst.HudView);
                view.onDialogOnOpened(dialog);
            }
        };
        /** 界面关闭 */
        HudProcessor.prototype.dialogOnClosed = function (dialog) {
            if (!dialog)
                return;
            if (UIMgr.hasStage(UIConst.HudView)) {
                var view = UIMgr.getUIByName(UIConst.HudView);
                view.onDialogOnClosed(dialog);
            }
        };
        /** 更新神力 */
        HudProcessor.prototype.updatePower = function () {
            if (this.hudView) {
                this.hudView.updatePower();
            }
        };
        /** 领取挂机奖励 */
        HudProcessor.prototype.showReardEffect = function () {
            var _this = this;
            if (App.hero.getEqusNum() >= tb.TB_game_set.get_TB_game_setById(1).limit_equip) {
                showToast(LanMgr.getLan("", 10426));
                return;
            }
            PLC.request(Protocol.game_copy_getMainAfkAward, {}, function (resData) {
                if (!resData)
                    return;
                //显示挂机收益
                var lastAfkTime = App.hero.lastGetAfkTime;
                var time = App.serverTimeSecond - lastAfkTime;
                Laya.timer.once(time < 300 ? 200 : 800, _this, function () {
                    UIMgr.showUI(UIConst.Guaji_ShouyiView, { lastTime: lastAfkTime, data: resData });
                });
                App.hero.updateGuajiData(resData);
                if (UIMgr.hasStage(UIConst.GuajiView)) {
                    var view = UIMgr.getUIByName(UIConst.GuajiView);
                    view.bottomUI.afterRewardSucc();
                    view.bottomUI.updateInterval();
                }
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.LINGQU_GUAJI_JIANGLI_SUCC));
            });
        };
        /** 更新挂机副本信息时更新相关信息 */
        HudProcessor.prototype.updateCopyInfo = function () {
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                view.updateShenjieRedpt();
            }
        };
        /** 请求公告 */
        HudProcessor.prototype.updateChatNoticeText = function () {
            PLC.request(Protocol.chat_notice_getNewslist, null, function ($data, msg) {
                if (!$data || !$data.newsList)
                    return;
                for (var i = $data.newsList.length - 1; i >= 0; i--) {
                    game.ChatNoticeMgr.getInstance().addNoticeToPush(new game.NoticeVo($data.newsList[i]));
                }
            }, false);
        };
        /** 资源更新 */
        HudProcessor.prototype.changeRes = function () {
            if (this.hudView) {
                this.hudView.initView();
            }
        };
        /** 更名 */
        HudProcessor.prototype.setNewName = function () {
            if (UIMgr.hasStage(UIConst.HudView)) {
                this.hudView.setName();
            }
        };
        //设置新的头像
        HudProcessor.prototype.setNewHeadIcon = function () {
            if (UIMgr.hasStage(UIConst.HudView)) {
                this.hudView.setHead();
            }
        };
        HudProcessor.prototype.setHeadFrame = function () {
            if (UIMgr.hasStage(UIConst.HudView)) {
                this.hudView.setHeadFrame();
            }
        };
        /** 显示入口界面 */
        HudProcessor.prototype.showEntranceView = function (type) {
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
        };
        HudProcessor.prototype.update_exp_and_money = function () {
            this.changeRes();
        };
        /** 模块跳转 */
        HudProcessor.prototype.showModuleView = function (link) {
            if (!link || !Array.isArray(link) || link.length < 1)
                return;
            var sysID = link[0];
            var param1 = link[1];
            var param2 = link[2];
            var tbSys = tb.TB_sys_open.get_TB_sys_openById(parseInt(sysID));
            /** 判断系统是否开启 */
            if (tbSys && !App.IsSysOpen(tbSys.ID)) {
                showToast(tbSys.prompt);
                return;
            }
            /** 任务界面跳转成功关闭任务界面 */
            if (UIMgr.hasStage(UIConst.TaskView)) {
                // 任务界面中跳转到日常
                if (sysID == ModuleConst.DAILY) {
                    var taskView = UIMgr.getUIByName(UIConst.TaskView);
                    taskView.onSelectTab(game.TaskTabType.daily);
                    return;
                }
                else {
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
                        dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.attack);
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
                    if (param2 == 1) {
                        UIMgr.showUI(UIConst.GemstoneCompoundView);
                    }
                    break;
                case ModuleConst.FUWEN:
                    this.showHudMenuView(ModuleConst.FIGHT);
                    var guajiview = UIMgr.getUIByName(UIConst.GuajiView);
                    if (guajiview && !game.GuideManager.isExecuteGuide()) {
                        guajiview.showBossTips();
                    }
                    if (param1) {
                        var model = game.GuajiModel.getInstance();
                        var capter = tb.TB_copy_info.get_TB_copy_infoById(param1) ? tb.TB_copy_info.get_TB_copy_infoById(param1).area : 0;
                        if (!model.isUnlockCapter(capter)) {
                            showToast(LanMgr.getLan("", 10427));
                            return;
                        }
                        var pa1 = Number(param1);
                        var isCanChag = model.isCanChallenge(pa1);
                        if (isCanChag) {
                            UIMgr.showUI(UIConst.GuanqiaView, model.getGuanqiaById(pa1));
                        }
                        else {
                            var tbCoppy = model.getCanChallengeMaxCopy();
                            if (tbCoppy) {
                                UIMgr.showUI(UIConst.GuanqiaView, model.getGuanqiaById(tbCoppy.ID));
                            }
                        }
                    }
                    break;
                case ModuleConst.ARTIFACT:
                case ModuleConst.ARTIFACT_BAPTIZE:
                case ModuleConst.ARTIFACT_ENCHANT:
                    var cc = [];
                    if (param1)
                        cc[0] = parseInt(param1);
                    if (param2)
                        cc[1] = parseInt(param2);
                    this.showHudMenuView(parseInt(sysID), cc);
                    break;
                case ModuleConst.BEIBAO:
                    param1 = !isNaN(param1) ? Number(param1) : 1;
                    dispatchEvt(new game.BagEvent(game.BagEvent.SHOW_BAG_PANEL), param1);
                    break;
                case ModuleConst.EQUIP_FENJIE:
                    this.showHudMenuView(ModuleConst.BEIBAO, [4]);
                    dispatchEvt(new game.BagEvent(game.BagEvent.OPEN_SELL_VIEW));
                    break;
                case ModuleConst.JINGJI:
                    dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_ARENA_PANEL));
                    break;
                case ModuleConst.MATCH_FIGHT:
                    dispatchEvt(new game.ArenaEvent(game.ArenaEvent.SHOW_MATCH_PANEL));
                    break;
                case ModuleConst.FAST_FIGHT:
                    dispatchEvt(new game.GuajiEvent(game.GuajiEvent.SHOW_FAST_BATTLE));
                    break;
                case ModuleConst.FRIEND:
                    dispatchEvt(new game.FriendEvent(game.FriendEvent.SHOW_FRIEND_PANEL));
                    break;
                case ModuleConst.HONOR:
                    dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_TASK_VIEW, param1));
                    break;
                case ModuleConst.SHOUCHONG:
                    UIMgr.showUI(UIConst.Main3DView);
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_SHOUCHONG_PANEL));
                    break;
                case ModuleConst.JISHI:
                    dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), -1);
                    break;
                case ModuleConst.ACTIVITY:
                    dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY));
                    break;
                case ModuleConst.FULI:
                    var index = !isNaN(param1) ? (param1 - 1) : 0;
                    dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.WelfareView, index]);
                    break;
                case ModuleConst.PAY_ACTIVITY:
                    var idxtab = !isNaN(param1) ? (param1 - 1) : 0;
                    dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.PayActivityView, idxtab]);
                    break;
                case ModuleConst.SHOP:
                    dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.shangcheng);
                    break;
                case ModuleConst.MAIL:
                    dispatchEvt(new game.MailEvent(game.MailEvent.SHOW_MAIL_PANEL, param1));
                    break;
                case ModuleConst.GONGHUI:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
                    break;
                case ModuleConst.GONGHUICOPY:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_COPY_VIEW));
                    break;
                case ModuleConst.SUMMON:
                    dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_ZHAOHUAN_PANEL));
                    break;
                case ModuleConst.SHILIANTA:
                    dispatchEvt(new game.TowerEvent(game.TowerEvent.SHOW_SHILIANTA_PANEL));
                    break;
                case ModuleConst.CHONGZHI:
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
                case ModuleConst.CHAT:
                    dispatchEvt(new game.ChatEvent(game.ChatEvent.SHOW_CHAT_PANEL), [game.OpenType.common, iface.tb_prop.chatChannelTypeKey.all]);
                    break;
                case ModuleConst.TUJIAN:
                    dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_TUJIAN_PANEL));
                    break;
                case ModuleConst.DAILY_COPY:
                    dispatchEvt(new game.DailyEvent(game.DailyEvent.SHOW_DAILY_COPY_VIEW));
                    break;
                case ModuleConst.WORLD_BOSS:
                    dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_BOSS_VIEW));
                    break;
                case ModuleConst.EXPEDITION:
                    dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.Island:
                    dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.PAIHBAN:
                    dispatchEvt(new game.RankingListEvent(game.RankingListEvent.SHOW_RANKINGLIST_PANEL), 1);
                    break;
                case ModuleConst.QIRIKH:
                    dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SHOW_SEVENDAYS_PANEL));
                    break;
                case ModuleConst.SHENMEN:
                    UIMgr.showUI(UIConst.GodDoorView);
                    break;
                case ModuleConst.FENJIE:
                    dispatchEvt(new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW));
                    break;
                case ModuleConst.ADVENTURE:
                    UIMgr.showUI(UIConst.DafuwengView);
                    break;
                case ModuleConst.CARAVAN_ESCORT:
                    dispatchEvt(new game.EscortEvent(game.EscortEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.FOG_FOREST:
                    dispatchEvt(new game.FogForestEvent(game.FogForestEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.GOD_DOMAIN:
                    dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_GODDOMAIN_VIEW));
                    break;
                case ModuleConst.GLORY_FIGHT:
                    dispatchEvt(new game.GloryEvent(game.GloryEvent.SHOW_MAIN_VIEW));
                    break;
                case ModuleConst.TEAM_COPY:
                    dispatchEvt(new game.CopyTeamEvent(game.CopyTeamEvent.SHOW_MAIN_PANEL));
                    break;
            }
        };
        HudProcessor.prototype.showHudMenuView = function (sysid, args) {
            if (args === void 0) { args = []; }
            if (!UIMgr.hasStage(UIConst.HudView)) {
                UIMgr.showUI(UIConst.HudView);
            }
            var ui = UIMgr.getUIByName(UIConst.HudView);
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
                        var idx = args.length > 0 ? args[0] : 0;
                        var id = args.length > 1 ? args[1] : 0;
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
        };
        HudProcessor.prototype.showGmPanel = function () {
            UIMgr.showUI(UIConst.CheatView);
        };
        /** 返回上一级界面 */
        HudProcessor.prototype.returnLastView = function (uiName) {
            // 默认打开界面
            uiName = uiName || UIConst.GuajiView;
            var view = UIMgr.getUIByName(UIConst.HudView);
            if (view) {
                var lastView = view.getLastDialog();
                uiName = lastView || uiName;
            }
            UIMgr.showUI(uiName);
        };
        /** 显示玩家信息 */
        HudProcessor.prototype.showPlayerInfo = function (userData) {
            if (!userData || !userData.playerId)
                return;
            if (userData.playerId == App.hero.playerId) {
                return;
            }
            if (userData.isCrossSvr) {
                var arg = {};
                arg[Protocol.center_query_queryWorldPlayer.args.playerId] = userData.playerId;
                PLC.request(Protocol.center_query_queryWorldPlayer, arg, function ($data) {
                    if (!$data)
                        return;
                    var info = new common.PlayerInfoVo();
                    info.setData($data, userData.playerId, userData.event, userData.eventData, userData.hideAllBtn, userData.isCrossSvr);
                    info.clientVo = userData.clientVo;
                    UIMgr.showUI(UIConst.PlayerInfoView, info);
                });
            }
            else {
                var arg = {};
                arg[Protocol.center_query_queryPlayer.args.playerId] = userData.playerId;
                PLC.request(Protocol.center_query_queryPlayer, arg, function ($data) {
                    if (!$data)
                        return;
                    var info = new common.PlayerInfoVo();
                    info.setData($data, userData.playerId, userData.event, userData.eventData, userData.hideAllBtn, userData.isCrossSvr);
                    info.clientVo = userData.clientVo;
                    UIMgr.showUI(UIConst.PlayerInfoView, info);
                });
            }
        };
        /** 切磋返回 */
        HudProcessor.prototype.qiecuoBack = function (userData) {
            // UIMgr.showUI(UIConst.MainView);
            this.showPlayerInfo(userData);
        };
        /** 显示玩家阵容信息 */
        HudProcessor.prototype.showPlayerLineup = function (info) {
            if (!info)
                return;
            UIMgr.showUI(UIConst.PlayerLineupInfoView, info);
        };
        Object.defineProperty(HudProcessor.prototype, "hudView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.HudView);
            },
            enumerable: true,
            configurable: true
        });
        return HudProcessor;
    }(tl3d.Processor));
    game.HudProcessor = HudProcessor;
})(game || (game = {}));
