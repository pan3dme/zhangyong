var game;
(function (game) {
    var WeakGuideStep;
    (function (WeakGuideStep) {
        WeakGuideStep[WeakGuideStep["guideShouchong"] = 1001] = "guideShouchong";
        WeakGuideStep[WeakGuideStep["guideAdventure"] = 1100] = "guideAdventure";
        WeakGuideStep[WeakGuideStep["advt_open"] = 1101] = "advt_open";
        WeakGuideStep[WeakGuideStep["advt_do"] = 1102] = "advt_do";
        WeakGuideStep[WeakGuideStep["guideJingjichang"] = 1110] = "guideJingjichang";
        WeakGuideStep[WeakGuideStep["jjc_open"] = 1111] = "jjc_open";
        WeakGuideStep[WeakGuideStep["jjc_fight"] = 1112] = "jjc_fight";
        WeakGuideStep[WeakGuideStep["guideDailyCopy"] = 1120] = "guideDailyCopy";
        WeakGuideStep[WeakGuideStep["daily_open"] = 1121] = "daily_open";
        WeakGuideStep[WeakGuideStep["daily_challenge"] = 1122] = "daily_challenge";
        WeakGuideStep[WeakGuideStep["guideShenqi"] = 1130] = "guideShenqi";
        WeakGuideStep[WeakGuideStep["sq_unlock"] = 1131] = "sq_unlock";
        WeakGuideStep[WeakGuideStep["sq_shangzhen"] = 1132] = "sq_shangzhen";
        WeakGuideStep[WeakGuideStep["guideWorldboss"] = 1140] = "guideWorldboss";
        WeakGuideStep[WeakGuideStep["boss_open"] = 1141] = "boss_open";
        WeakGuideStep[WeakGuideStep["boss_do"] = 1142] = "boss_do";
        WeakGuideStep[WeakGuideStep["guideJinglian"] = 1150] = "guideJinglian";
        WeakGuideStep[WeakGuideStep["jl_open"] = 1151] = "jl_open";
        WeakGuideStep[WeakGuideStep["jl_wearEquip"] = 1152] = "jl_wearEquip";
        WeakGuideStep[WeakGuideStep["jl_jinglianEquip"] = 1153] = "jl_jinglianEquip";
        WeakGuideStep[WeakGuideStep["guideShenjiemen"] = 1160] = "guideShenjiemen";
        WeakGuideStep[WeakGuideStep["sm_open"] = 1161] = "sm_open";
        WeakGuideStep[WeakGuideStep["sm_do"] = 1162] = "sm_do";
        WeakGuideStep[WeakGuideStep["guideGuild"] = 1170] = "guideGuild";
        WeakGuideStep[WeakGuideStep["guild_open"] = 1171] = "guild_open";
        WeakGuideStep[WeakGuideStep["guild_do"] = 1172] = "guild_do";
        WeakGuideStep[WeakGuideStep["guideJoinGuild"] = 1180] = "guideJoinGuild";
        WeakGuideStep[WeakGuideStep["guideIsland"] = 1190] = "guideIsland";
        WeakGuideStep[WeakGuideStep["island_open"] = 1191] = "island_open";
        WeakGuideStep[WeakGuideStep["island_do"] = 1192] = "island_do";
        WeakGuideStep[WeakGuideStep["guideYuanzheng"] = 1200] = "guideYuanzheng";
        WeakGuideStep[WeakGuideStep["yuanzheng_open"] = 1201] = "yuanzheng_open";
        WeakGuideStep[WeakGuideStep["yuanzheng_do"] = 1202] = "yuanzheng_do";
        WeakGuideStep[WeakGuideStep["guideFogForest"] = 1210] = "guideFogForest";
        WeakGuideStep[WeakGuideStep["forest_open"] = 1211] = "forest_open";
        WeakGuideStep[WeakGuideStep["forest_challenge"] = 1212] = "forest_challenge";
        WeakGuideStep[WeakGuideStep["guideRonghun"] = 1220] = "guideRonghun";
        WeakGuideStep[WeakGuideStep["ronghun_open"] = 1221] = "ronghun_open";
        WeakGuideStep[WeakGuideStep["ronghun_do"] = 1222] = "ronghun_do";
        WeakGuideStep[WeakGuideStep["guideEscort"] = 1230] = "guideEscort";
        WeakGuideStep[WeakGuideStep["escort_open"] = 1231] = "escort_open";
        WeakGuideStep[WeakGuideStep["escort_refresh"] = 1232] = "escort_refresh";
        WeakGuideStep[WeakGuideStep["escort_go"] = 1233] = "escort_go";
        WeakGuideStep[WeakGuideStep["guideSqXilian"] = 1240] = "guideSqXilian";
        WeakGuideStep[WeakGuideStep["sqxl_open"] = 1241] = "sqxl_open";
        WeakGuideStep[WeakGuideStep["sqxl_do"] = 1242] = "sqxl_do";
        // 暂时注释
        WeakGuideStep[WeakGuideStep["guideBaoshi"] = 1250] = "guideBaoshi";
        WeakGuideStep[WeakGuideStep["bs_open"] = 1251] = "bs_open";
        WeakGuideStep[WeakGuideStep["bs_equip"] = 1252] = "bs_equip";
        WeakGuideStep[WeakGuideStep["bs_lvup"] = 1253] = "bs_lvup";
        WeakGuideStep[WeakGuideStep["guideTower"] = 1270] = "guideTower";
        WeakGuideStep[WeakGuideStep["tower_open"] = 1271] = "tower_open";
        WeakGuideStep[WeakGuideStep["tower_fight"] = 1272] = "tower_fight";
        WeakGuideStep[WeakGuideStep["guideGodAwaken"] = 1280] = "guideGodAwaken";
        WeakGuideStep[WeakGuideStep["awaken_open"] = 1281] = "awaken_open";
        WeakGuideStep[WeakGuideStep["awaken_do"] = 1282] = "awaken_do";
        WeakGuideStep[WeakGuideStep["guideTreasure"] = 1290] = "guideTreasure";
        WeakGuideStep[WeakGuideStep["treasure_open"] = 1291] = "treasure_open";
        WeakGuideStep[WeakGuideStep["treasure_wear"] = 1292] = "treasure_wear";
        WeakGuideStep[WeakGuideStep["treasure_streng"] = 1293] = "treasure_streng";
        WeakGuideStep[WeakGuideStep["guideShenqiStr"] = 1300] = "guideShenqiStr";
        WeakGuideStep[WeakGuideStep["sqSt_unlock"] = 1301] = "sqSt_unlock";
        WeakGuideStep[WeakGuideStep["sqSt_do"] = 1302] = "sqSt_do";
        WeakGuideStep[WeakGuideStep["guideChat"] = 1310] = "guideChat";
        WeakGuideStep[WeakGuideStep["chat_open"] = 1311] = "chat_open";
        WeakGuideStep[WeakGuideStep["chat_send"] = 1312] = "chat_send";
        WeakGuideStep[WeakGuideStep["endAllGuide"] = 99999] = "endAllGuide";
    })(WeakGuideStep = game.WeakGuideStep || (game.WeakGuideStep = {}));
    var GuideWeakManager = /** @class */ (function () {
        function GuideWeakManager() {
        }
        GuideWeakManager.startRun = function () {
            if (GuideWeakManager._isInit)
                return;
            GuideWeakManager._isInit = true;
            GuideWeakManager.setCurExcutingStep(-1);
            // 跳过所有触发性引导
            if (GuideWeakManager.isFinishStep(WeakGuideStep.endAllGuide)) {
                return;
            }
            game.GuideQueueManager.startRun();
            this._stepNames = {};
            this._guideList = {};
            // 系统id开启
            this._guideList[WeakGuideStep.guideShenqi] = new game.ShenqiOpenGuide();
            this._stepNames[WeakGuideStep.guideShenqi] = "\u795E\u5668\u5F00\u542F\u5F15\u5BFC  \u8FDB\u9636\u4E4B\u8DEF1\u9636\u5168\u90E8\u5B8C\u6210";
            this._guideList[WeakGuideStep.guideShenqiStr] = new game.ShenqiStrengthOpenGuide();
            this._stepNames[WeakGuideStep.guideShenqiStr] = "\u795E\u5668\u5F3A\u5316\u5F00\u542F\u5F15\u5BFC  \u8FDB\u9636\u4E4B\u8DEF2\u9636\u5168\u90E8\u5B8C\u6210";
            this._guideList[WeakGuideStep.guideJoinGuild] = new game.JoinGuildGuide();
            this._stepNames[WeakGuideStep.guideJoinGuild] = "创建或加入公会后的大厅引导";
            loghgy('开启无序弱引导');
            var list = [];
            var guideStep = GuideWeakManager.getWeakGuideSteps();
            var _loop_1 = function (key) {
                if (guideStep.indexOf(parseInt(key)) == -1) {
                    var status_1 = this_1._guideList[key];
                    list.push(status_1.execute().then(function () {
                        status_1.dispose();
                    }));
                }
            };
            var this_1 = this;
            for (var key in this._guideList) {
                _loop_1(key);
            }
            if (list.length > 0) {
                Promise.all(list).then(function () {
                    loghgy('完成所有无序弱引导');
                });
            }
        };
        /** 监听系统开启 */
        GuideWeakManager.listenSysOpen = function (sysId, context) {
            return new Promise(function (resolve, reject) {
                loghgy("监听系统开启,系统ID：", sysId);
                // 首冲特殊：不是系统配置等级开启,而是在之后等级开启
                if (sysId == ModuleConst.SHOUCHONG) {
                    if (App.hero.level >= common.GlobalData.SHOUCHONG_OPEN_LV) {
                        resolve();
                        return;
                    }
                    game.GuideManager.listenNotification(game.ResEvent.ROLE_LEVEL_CHANGE, function () {
                        return App.hero.level >= common.GlobalData.SHOUCHONG_OPEN_LV;
                    }, context).then(function () {
                        resolve();
                    });
                    return;
                }
                if (App.IsSysOpen(sysId)) {
                    resolve();
                    return;
                }
                var openType = App.getOpenType(sysId);
                if (openType == SysConditionType.level) {
                    game.GuideManager.listenNotification(game.ResEvent.ROLE_LEVEL_CHANGE, function () {
                        return App.IsSysOpen(sysId);
                    }, context).then(function () {
                        resolve();
                    });
                }
                else if (openType == SysConditionType.copy) {
                    game.GuideManager.listenNotification(game.GuajiEvent.UPDATE_FUWEN_COPY_INFO, function () {
                        return App.IsSysOpen(sysId);
                    }, context).then(function () {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        };
        /** 系统开启时引导到指定场景 */
        GuideWeakManager.guideSysOpenToScene = function (index, context) {
            return new Promise(function (resolve, reject) {
                new game.ListenFightClosedWaitStatus().execute().then(function () {
                    return new game.ListenDialogQueueWaitStatus(true, context).execute();
                }).then(function () {
                    return GuideWeakManager.listenToMain(index, context);
                }).then(function () {
                    game.GuideMask.hide();
                    resolve();
                });
            });
        };
        /** 打开主场景，然后根据index定位到指定主场景 */
        GuideWeakManager.listenToMain = function (index, context) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                Promise.resolve().then(function () {
                    if (UIMgr.getInstance().hasStageByGroup(UIConst.hud_group)) {
                        return true;
                    }
                    return game.GuideManager.listenDialogGroup(common.GlobalEvent.DIALOG_OPENED, UIConst.hud_group, context);
                }).then(function () {
                    return game.GuideManager.timeout(100);
                }).then(function () {
                    // 关闭其他二级界面 : 引导点击返回或者主场景时需要关闭弹窗防止被挡
                    Laya.timer.callLater(_this, function () {
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
                }).then(function () {
                    if (index >= 0) {
                        return game.GuideManager.guideToMainView(index, "", context);
                    }
                    return true;
                }).then(function () {
                    resolve();
                });
            });
        };
        /** 监听SysTopView全部关闭 */
        GuideWeakManager.listenSysTopViewClose = function (endResolve) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                game.GuideManager.timeout(100).then(function () {
                    if (UIMgr.hasStage(UIConst.SysTopView)) {
                        var view = UIMgr.getUIByName(UIConst.SysTopView);
                        game.GuideMask.show(view.btnClose, game.DirectionType.top);
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.SysTopView, _this)
                            .then(function () {
                            GuideWeakManager.listenSysTopViewClose(endResolve || resolve);
                        });
                    }
                    else {
                        if (endResolve) {
                            endResolve();
                        }
                        else {
                            resolve();
                        }
                    }
                });
            });
        };
        /** 执行引导列表 */
        GuideWeakManager.runGuideList = function (guideList, step, resolve) {
            var list = [];
            var guideStep = GuideWeakManager.getWeakGuideSteps();
            for (var key in guideList) {
                var step_1 = parseInt(key);
                if (guideStep.indexOf(step_1) == -1) {
                    list.push(guideList[key]);
                }
            }
            if (list.length > 0) {
                GuideWeakManager.setCurExcutingStep(step);
            }
            else {
                if (step > 0) {
                    game.GuideManager.guideRequest(0, step).then(function () {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
                return;
            }
            var stepName = GuideWeakManager._stepNames[step] || game.GuideQueueManager.getStepName(step);
            loghgy("runGuideList: " + stepName);
            function run() {
                if (list.length > 0) {
                    var fun = list.shift();
                    fun(run);
                }
                else {
                    if (step > 0) {
                        game.GuideManager.guideRequest(0, step).then(function () {
                            resolve();
                        });
                    }
                    else {
                        resolve();
                    }
                }
            }
            run();
        };
        /** 监听奖励界面关闭:   启时，如果奖励界面如果还没关掉,等关掉； */
        GuideWeakManager.listenRewardClose = function (context, timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 200; }
            return new Promise(function (resolve) {
                game.GuideManager.timeout(timeout)
                    .then(function () {
                    game.GuideMask.hide();
                    if (UIMgr.hasStage(UIConst.CommonRewardView)) {
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView, _this);
                    }
                    else {
                        return true;
                    }
                }).then(function () {
                    resolve();
                });
            });
        };
        /** 等待系统开启动画 */
        GuideWeakManager.waitSysOpenAnim = function (step, sysid, caller) {
            var _this = this;
            return new Promise(function (resolve) {
                GuideWeakManager.listenToMain(5, _this).then(function () {
                    if (step > 0) {
                        return game.GuideManager.guideRequest(0, step);
                    }
                    return true;
                }).then(function () {
                    return game.GuideManager.timeout(100);
                }).then(function () {
                    // 遮罩
                    game.GuideMask.showWithTransparent();
                    game.GuideMask.setMaskAlpha(1);
                    // 添加系统开启按钮
                    var openView = new game.GuaJiSysOpenView();
                    openView.setGuideView(sysid);
                    var guajiView = UIMgr.getUIByName(UIConst.GuajiView);
                    openView.anchorX = openView.anchorY = 0.5;
                    openView.scale(0.5, 0.5);
                    openView.alpha = 0;
                    openView.x = Laya.stage.width / 2;
                    openView.y = Laya.stage.height / 2;
                    Laya.stage.addChild(openView);
                    // 获取终点位置
                    var targetPos;
                    var hudView = UIMgr.getUIByName(UIConst.HudView);
                    switch (sysid) {
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
                        default:
                            targetPos = hudView.btn_fight.localToGlobal(new Laya.Point(0, 0));
                            break;
                    }
                    Laya.Tween.to(openView, { alpha: 1, scaleX: 1.5, scaleY: 1.5, x: Laya.stage.width / 2, y: Laya.stage.height / 2 }, 500, Laya.Ease.sineIn, new Handler(_this, function () {
                        openView.setGuideStatus(true);
                        Laya.Tween.clearTween(openView);
                        game.GuideManager.listenNotification(game.GuajiEvent.CONFIRM_SYS_OPEN_BUTTON, null, caller)
                            .then(function () {
                            openView.setGuideStatus(false);
                            Laya.Tween.to(openView, { scaleX: 1, scaleY: 1, x: targetPos.x + 50, y: targetPos.y + 50 }, 800, Laya.Ease.sineIn, new Handler(_this, function () {
                                Laya.Tween.clearTween(openView);
                                Laya.stage.removeChild(openView);
                                game.GuideMask.hide();
                                resolve();
                            }));
                        });
                    }));
                });
            });
        };
        /** 监听进入系统 */
        GuideWeakManager.listenGoToSys = function (sysid, sysVname, caller) {
            return new Promise(function (resolve) {
                var type = 0;
                switch (sysid) {
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
                var viewName = type == 1 ? UIConst.EntranceList_lilian : (type == 2 ? UIConst.EntranceList_jingji : (type == 3 ? UIConst.EntranceList_kaufu : UIConst.EntranceList));
                GuideWeakManager.listenToMain(5, caller)
                    .then(function () {
                    var view = UIMgr.getUIByName(UIConst.GuajiView);
                    var btn = type == 1 ? view.btn_maoxian : (type == 2 ? view.btn_jingji : (type == 3 ? view.btn_kf : view.btn_lilian));
                    game.GuideMask.show(btn, game.DirectionType.bottom);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, viewName, caller);
                }).then(function () {
                    // 开场动画
                    return game.GuideManager.timeout(1000);
                }).then(function () {
                    var view = UIMgr.getUIByName(viewName);
                    view.btnlist.scrollBar.touchScrollEnable = false;
                    var index = view.getIRIndex(sysid);
                    if (index >= 3) {
                        view.btnlist.scrollTo(index - 2);
                        return game.GuideManager.timeout(300);
                    }
                    else {
                        return true;
                    }
                }).then(function () {
                    var view = UIMgr.getUIByName(viewName);
                    game.GuideMask.show(view.getIRBySysid(sysid), game.DirectionType.bottom);
                    if (UIMgr.getInstance().getUIInfo(sysVname).popEffect) {
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, sysVname, caller)
                            .then(function () {
                            game.GuideMask.showWithTransparent();
                            return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, sysVname, caller);
                        });
                    }
                    else {
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, sysVname, caller);
                    }
                }).then(function () {
                    var view = UIMgr.getUIByName(viewName);
                    view.btnlist.scrollBar.touchScrollEnable = true;
                    resolve();
                });
            });
        };
        /** 弱引导完成的步骤列表 */
        GuideWeakManager.getWeakGuideSteps = function () {
            return App.hero.tasks.guideWeakStep;
        };
        /**
         * 设置正在执行的弱引导步骤：如果该引导不是多个子步骤，需要代码设置
         * @param step 步骤
         */
        GuideWeakManager.setCurExcutingStep = function (step) {
            var stepName = this._stepNames[step] || game.GuideQueueManager.getStepName(step);
            if (step == -1) {
                loghgy("移除正在执行的弱引导", stepName);
            }
            else {
                loghgy("设置正在执行的弱引导：", stepName);
            }
            GuideWeakManager.curExcutingGuideStep = step;
            dispatchEvt(new game.GuideEvent(game.GuideEvent.UPDATE_GUIDE_STATUS));
        };
        /** 是否还有引导步骤 */
        GuideWeakManager.isHasStep = function () {
            var has = false;
            var guideStep = GuideWeakManager.getWeakGuideSteps();
            for (var key in this._guideList) {
                if (guideStep.indexOf(parseInt(key)) == -1) {
                    has = true;
                    break;
                }
            }
            return has;
        };
        /** 是否完成该弱引导步骤 */
        GuideWeakManager.isFinishStep = function (step) {
            var arr = GuideWeakManager.getWeakGuideSteps();
            return arr.indexOf(step) != -1;
        };
        /**
         * 是否正在执行某个引导步骤
         * 不传参数就是表示是否在执行触发性引导中
         */
        GuideWeakManager.isExcuting = function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            if (types.length == 0) {
                return GuideWeakManager.curExcutingGuideStep != -1;
            }
            return types.some(function (type) {
                return GuideWeakManager.curExcutingGuideStep == type;
            });
        };
        /** 跳过弱引导 */
        GuideWeakManager.allPass = function () {
            this.passCurGuide();
            game.GuideManager.guideRequest(0, WeakGuideStep.endAllGuide).then(function () {
                game.GuideMask.dispose();
                UIMgr.hideUIByName(UIConst.GuideTalkView);
            });
        };
        /** 跳过当前触发性引导 */
        GuideWeakManager.passCurGuide = function () {
            loghgy('跳过触发性引导', GuideWeakManager.curExcutingGuideStep);
            var curStatus = this._guideList[GuideWeakManager.curExcutingGuideStep];
            // 是否是有序的，需要重新触发
            var isQueue = curStatus ? false : true;
            curStatus = curStatus ? curStatus : game.GuideQueueManager.getGuideStatus(GuideWeakManager.curExcutingGuideStep);
            if (curStatus) {
                // 记录触发性引导的跳过操作-精确到子步骤
                var curChildStep = curStatus.getCurChildStep();
                if (curChildStep > 0 && !GuideWeakManager.isFinishStep(curChildStep)) {
                    game.GuideManager.recordJumpGuide(curChildStep);
                }
                loghgy('跳过触发性引导：', GuideWeakManager.curExcutingGuideStep);
                tl3d.ModuleEventManager.removeEventByTarget(curStatus);
                game.GuideManager.guideRequest(0, GuideWeakManager.curExcutingGuideStep)
                    .then(function () {
                    loghgy('成功跳过触发性引导', GuideWeakManager.curExcutingGuideStep);
                    curStatus.dispose();
                    if (isQueue) {
                        game.GuideQueueManager.runGuide();
                    }
                });
            }
        };
        GuideWeakManager._guideList = {};
        GuideWeakManager._isInit = false; //是否已经初始化 -- 启动弱引导
        GuideWeakManager.curExcutingGuideStep = -1; //当前执行中的 弱引导步骤
        GuideWeakManager._stepNames = {};
        return GuideWeakManager;
    }());
    game.GuideWeakManager = GuideWeakManager;
})(game || (game = {}));
