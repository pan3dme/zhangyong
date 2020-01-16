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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var GuideStep;
    (function (GuideStep) {
        GuideStep[GuideStep["zhaohuan1"] = 1] = "zhaohuan1";
        GuideStep[GuideStep["buzhen1"] = 2] = "buzhen1";
        GuideStep[GuideStep["battleExperienceCopy1"] = 3] = "battleExperienceCopy1";
        GuideStep[GuideStep["godHeCheng"] = 4] = "godHeCheng";
        GuideStep[GuideStep["buzhen2"] = 5] = "buzhen2";
        GuideStep[GuideStep["battleExperienceCopy2"] = 6] = "battleExperienceCopy2";
        GuideStep[GuideStep["rewardGuajiBaoxiang"] = 7] = "rewardGuajiBaoxiang";
        GuideStep[GuideStep["fastFight"] = 8] = "fastFight";
        GuideStep[GuideStep["god1LvupTo5"] = 9] = "god1LvupTo5";
        GuideStep[GuideStep["battleExperienceCopy3"] = 10] = "battleExperienceCopy3";
        GuideStep[GuideStep["wearEquipment1"] = 11] = "wearEquipment1";
        GuideStep[GuideStep["battleExperienceCopy4"] = 12] = "battleExperienceCopy4";
        GuideStep[GuideStep["zhaohuan2"] = 13] = "zhaohuan2";
        GuideStep[GuideStep["buzhen3"] = 14] = "buzhen3";
        GuideStep[GuideStep["rewardUploadJL1"] = 15] = "rewardUploadJL1";
        GuideStep[GuideStep["battleExperienceCopy5"] = 16] = "battleExperienceCopy5";
        GuideStep[GuideStep["receiveTongguanReward"] = 17] = "receiveTongguanReward";
        GuideStep[GuideStep["god1LvupTo10"] = 18] = "god1LvupTo10";
        GuideStep[GuideStep["battleExperienceCopy6"] = 19] = "battleExperienceCopy6";
        GuideStep[GuideStep["strengthEquipmentLv1"] = 20] = "strengthEquipmentLv1";
        GuideStep[GuideStep["battleExperienceCopy7"] = 21] = "battleExperienceCopy7";
        GuideStep[GuideStep["god1LvupTo20"] = 22] = "god1LvupTo20";
        GuideStep[GuideStep["god1Dgup"] = 23] = "god1Dgup";
        GuideStep[GuideStep["lingquQiriJL"] = 24] = "lingquQiriJL";
        GuideStep[GuideStep["endGuide"] = 999] = "endGuide";
    })(GuideStep = game.GuideStep || (game.GuideStep = {}));
    var GuideEvent = /** @class */ (function (_super) {
        __extends(GuideEvent, _super);
        function GuideEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        /** 引导开始 */
        GuideEvent.Guide_Start = "Guide_Start";
        /** 引导结束 */
        GuideEvent.GUIDE_END = "GUIDE_END";
        /** 引导对话框结束 */
        GuideEvent.Guide_Talk_End = 'Guide_Talk_End';
        /** 开始饰品引导 */
        GuideEvent.START_SHIPIN_GUIDE = "START_SHIPIN_GUIDE";
        /** 更新引导状态 */
        GuideEvent.UPDATE_GUIDE_STATUS = "UPDATE_GUIDE_STATUS";
        return GuideEvent;
    }(tl3d.BaseEvent));
    game.GuideEvent = GuideEvent;
    var GuideManager = /** @class */ (function () {
        function GuideManager() {
        }
        GuideManager.startInit = function () {
            game.GuideMask.showWithTransparent();
            // 做延迟让界面出来才可以定位
            Laya.timer.once(500, null, function () {
                game.GuideMask.hide();
                GuideManager.init();
            });
        };
        GuideManager.init = function () {
            if (GuideManager._isInit)
                return;
            GuideManager._isInit = true;
            // 战斗对话引导 
            new game.FightTalkGuide().execute();
            // 查询所有未完成的引导步骤，然后排序
            var guideAry = [];
            var guideStep = GuideManager.getGuideStep();
            for (var _i = 0, _a = GuideManager.GuideList; _i < _a.length; _i++) {
                var guideInfo = _a[_i];
                if (guideStep < guideInfo.step) {
                    guideAry.push(guideInfo);
                }
            }
            if (guideAry.length == 0) {
                game.GuideMask.hide();
                loghgy('强引导已全部完成');
                UIMgr.hideUIByName(UIConst.GuideTalkView);
                game.GuideWeakManager.startRun();
                dispatchEvt(new GuideEvent(GuideEvent.GUIDE_END));
                return;
            }
            guideAry.sort(function (a, b) {
                return a.step - b.step;
            });
            loghgy('进入强引导');
            var lastGuideDispose = null;
            function run() {
                if (lastGuideDispose) {
                    lastGuideDispose.dispose();
                    lastGuideDispose = null;
                }
                if (guideAry.length > 0) {
                    var info = guideAry.shift();
                    lastGuideDispose = info.execute.apply(info, __spreadArrays([run, info.step], info.args));
                }
                else {
                    game.GuideMask.hide();
                    UIMgr.hideUIByName(UIConst.GuideTalkView);
                    loghgy('强制引导全部结束,dispose');
                    game.GuideWeakManager.startRun();
                    dispatchEvt(new GuideEvent(GuideEvent.GUIDE_END));
                    var lastGuideDispose_1 = null;
                }
            }
            run();
        };
        /**
         * 新手引导消息监听
         * @param name 消息名称
         * @param checkFun 是否移除消息的检测方法,返回boolean
         */
        GuideManager.listenNotification = function (eventName, checkFun, caller) {
            if (checkFun === void 0) { checkFun = null; }
            return new Promise(function (resolve, reject) {
                // loghgy('新手引导消息监听',eventName);
                // 作用域
                var context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, function (event) {
                    if (checkFun) {
                        // loghgy('有checkFun方法,开始检测');
                        if (checkFun(event)) {
                            // loghgy('检测条件成功,执行resolve');
                            tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                            resolve(event);
                        }
                        else {
                            // loghgy('检测条件失败,继续监听事件', eventName);
                        }
                    }
                    else {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve(event);
                    }
                }, context);
            });
        };
        /**
         * 引导请求,完成某步骤
         * @param guideStep 强引导步骤
         * @param weakStep  弱引导步骤
         */
        GuideManager.guideRequest = function (guideStep, weakStep) {
            if (weakStep === void 0) { weakStep = 0; }
            return new Promise(function (resolve, reject) {
                var curStep = GuideManager.getGuideStep();
                if (weakStep == 0 && guideStep <= curStep) {
                    loghgy('已完成过该强引导步骤');
                    resolve();
                    return;
                }
                if (guideStep == 0 && game.GuideWeakManager.isFinishStep(weakStep)) {
                    loghgy('已完成过该触发性引导步骤');
                    resolve();
                    return;
                }
                if (guideStep != 0 && weakStep != 0) {
                    logerror('不能同时完成两种引导');
                    reject();
                    return;
                }
                game.GuideMask.showWithTransparent();
                guideStep > 0 ? loghgy('请求完成强引导步骤：', guideStep) : loghgy('请求完成触发下引导步骤：', weakStep);
                var arg = {};
                arg[Protocol.game_guide_getGuideAward.args.guideStep] = guideStep;
                arg[Protocol.game_guide_getGuideAward.args.guideWeakStep] = weakStep;
                PLC.request(Protocol.game_guide_getGuideAward, arg, function (res) {
                    if (!res) {
                        reject('引导响应数据为空');
                    }
                    if (!res)
                        return;
                    if (res.hasOwnProperty('guideStep')) {
                        App.hero.tasks.guideStep = res['guideStep'];
                    }
                    if (res.hasOwnProperty('guideWeakStep')) {
                        if (App.hero.tasks.guideWeakStep.indexOf(res['guideWeakStep']) == -1) {
                            App.hero.tasks.guideWeakStep.push(res['guideWeakStep']);
                        }
                    }
                    loghgy('确定完成强引导步骤：', guideStep, ' 弱引导步骤：', weakStep);
                    game.GuideMask.hide();
                    resolve(res);
                });
            });
        };
        /**
         * 新手引导延迟
         * @param time 延迟时间 毫秒
         * @param args 参数
         */
        GuideManager.timeout = function (time) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                game.GuideMask.showWithTransparent();
                var timeid = setTimeout(function () {
                    clearTimeout(timeid);
                    resolve.apply(void 0, args);
                }, time);
            });
        };
        /** 展示对话框 */
        GuideManager.talk = function (text, remove, model, modelName, modelScale, location, hidePass) {
            if (remove === void 0) { remove = true; }
            if (model === void 0) { model = 100007; }
            if (modelName === void 0) { modelName = null; }
            if (modelScale === void 0) { modelScale = 4; }
            if (location === void 0) { location = 2; }
            if (hidePass === void 0) { hidePass = false; }
            modelName = modelName && modelName != "" ? modelName : LanMgr.getLan("", 12080);
            var opt = { text: text, remove: remove, model: model, location: location, modelScale: modelScale, modelName: modelName, hidePass: hidePass };
            if (UIMgr.hasStage(UIConst.GuideTalkView)) {
                var ui_1 = UIMgr.getUIByName(UIConst.GuideTalkView);
                ui_1.dataSource = opt;
                ui_1.initView();
            }
            else {
                UIMgr.showUI(UIConst.GuideTalkView, opt);
            }
            return Promise.resolve();
        };
        /** 监听dialog的打开及关闭事件 */
        GuideManager.listenDialog = function (eventName, uiname, caller) {
            return new Promise(function (resolve, reject) {
                // loghgy('监听dialog的打开及关闭事件',eventName,uiname);
                // 作用域
                var context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, function ($event) {
                    var dialog = $event.data;
                    var viewName = dialog.dialogInfo ? dialog.dialogInfo.uiname : dialog.name;
                    if (dialog && uiname == viewName) {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve($event.data);
                    }
                }, context);
            });
        };
        /** 监听dialog的打开及关闭事件 */
        GuideManager.listenDialogs = function (eventName, uinames, caller) {
            return new Promise(function (resolve, reject) {
                // loghgy('监听dialog的打开及关闭事件',eventName,uiname);
                // 作用域
                var context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, function ($event) {
                    var dialog = $event.data;
                    var viewName = dialog.dialogInfo ? dialog.dialogInfo.uiname : dialog.name;
                    if (dialog && uinames.indexOf(viewName) != -1) {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve($event.data);
                    }
                }, context);
            });
        };
        /** 监听dialog的组打开关闭事件 */
        GuideManager.listenDialogGroup = function (eventName, uigroup, caller) {
            return new Promise(function (resolve, reject) {
                // loghgy('监听dialog的组打开关闭事件',eventName,uigroup);
                // 作用域
                var context = caller ? caller : GuideManager._instance;
                tl3d.ModuleEventManager.addEvent(eventName, function ($event) {
                    var dialog = $event.data;
                    if (dialog && uigroup == dialog.group) {
                        tl3d.ModuleEventManager.removeEventByNameAndTarget(eventName, context);
                        resolve($event.data);
                    }
                }, context);
            });
        };
        // ================ 战斗引导 ==============
        GuideManager.startFightGuide = function () {
            GuideManager.firstFightGuide();
        };
        /** 战斗引导 */
        GuideManager.firstFightGuide = function () {
            var _this = this;
            var view = UIMgr.getUIByName(UIConst.FirstGuide);
            GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12006) + "</span>", false, 4103, LanMgr.getLan("", 12007))
                .then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12008) + "</span>", true, 20012, LanMgr.getLan("", 12009), 2, game.LocationType.center);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                return true;
            }).then(function () {
                return GuideManager.listenNotification(game.FirstGuideEvent.GUIDE_START);
            }).then(function () {
                return GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12010) + "</span>", true, 3106, LanMgr.getLan("", 12011));
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
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
            }).then(function () {
                return GuideManager.listenNotification(game.FirstGuideEvent.GUIDE_START, function (event) {
                    if (event.data) {
                        return event.data == 9;
                    }
                    else {
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
            }).then(function () {
                return GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12012) + "</span>", false, 4103, LanMgr.getLan("", 12007));
            }).then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12013) + "</span>", true, 3106, LanMgr.getLan("", 12011));
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                Laya.timer.frameOnce(3, _this, function () {
                    dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                });
                // sendDispatchEvent(new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC), view.scene.curVo.id);
                return GuideManager.listenNotification(game.FirstGuideEvent.GUIDE_START);
            }).then(function () {
                return GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12014) + "</span>", false);
            }).then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.talk("<span style='color:#4a1b0c;'>" + LanMgr.getLan("", 12015) + "</span>", true);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                UIMgr.showUI(UIConst.CreateRoleView, null, false);
            });
            return {
                dispose: function () {
                }
            };
        };
        // ================ 强制引导 ==============
        /**
         * 通用挑战历练副本
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         */
        GuideManager.commonBattleExperienceCopy = function (next, step, copyId) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u6311\u6218\u5386\u7EC3\u526F\u672C" + copyId);
            var tbCopy = tb.TB_copy_info.get_TB_copy_infoById(copyId);
            if (!tbCopy) {
                logerror("不存在副本无法进行引导,副本ID：", copyId);
            }
            var model = game.GuajiModel.getInstance();
            if (model.isPassCopy(copyId)) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5B8C\u6210\u6311\u6218\u5386\u7EC3\u526F\u672C" + copyId + "\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            // 在挂机界面还要检测是否有对话及是否第一次打
            // let hasStartTalk: boolean = tbCopy.before_plot && tbCopy.before_plot.length > 0;
            // let hasEndTalk: boolean = tbCopy.after_plot && tbCopy.after_plot.length > 0;
            GuideManager.guideToMainView(5).then(function () {
                return GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.bottomUI.btn_onplay, game.DirectionType.top);
                if (tbCopy.is_enter == 1) {
                    return GuideManager.listenDialogOpened(UIConst.Lilian_RewardView).then(function () {
                        var view = UIMgr.getUIByName(UIConst.Lilian_RewardView);
                        game.GuideMask.show(view.btn_receive, game.DirectionType.bottom);
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews);
                    }).then(function () {
                        return GuideManager.listenNotification(game.FightsEvent.SHOW_RESULT_EVENT, function () {
                            var isFinish = model.isPassCopy(copyId);
                            loghgy("\u68C0\u6D4B\u6761\u4EF6\uFF1A\u526F\u672Cid\u4E3A" + copyId + "\u662F\u5426\u5B8C\u6210\uFF1A" + isFinish);
                            return isFinish;
                        }).then(function () {
                            return GuideManager.guideRequest(step);
                        }).then(function () {
                            if (UIMgr.hasStage(UIConst.FightVictory)) {
                                return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                            }
                            else {
                                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightVictory);
                            }
                        }).then(function () {
                            return GuideManager.timeout(100);
                        }).then(function () {
                            UIMgr.hideUIByName(UIConst.CommonRuleView);
                            var view = UIMgr.getUIByName(UIConst.FightVictory);
                            game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                            return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews);
                        });
                    });
                }
                else {
                    return GuideManager.listenNotification(game.GuajiEvent.ENTER_FIGHT).then(function () {
                        game.GuideMask.showWithTransparent();
                        return GuideManager.listenNotification(game.GuajiEvent.BATTLE_COPY_SUCCESS, function () {
                            var isFinish = model.isPassCopy(copyId);
                            loghgy("\u68C0\u6D4B\u6761\u4EF6\uFF1A\u526F\u672Cid\u4E3A" + copyId + "\u662F\u5426\u5B8C\u6210\uFF1A" + isFinish);
                            return isFinish;
                        });
                    }).then(function () {
                        return GuideManager.guideRequest(step);
                    }).then(function () {
                        return new game.ListenDialogQueueWaitStatus(true, null).execute();
                    });
                }
            }).then(function () {
                UIMgr.hideUIByName(UIConst.LevelUpView);
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /**
         * 通用英雄升级
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         * @param count 几只英雄升级
         * @param level 英雄升到几级
         */
        GuideManager.commonGodLvup = function (next, step, taskId, count, level) {
            // 遍历数组，从第一个开始升级，升级没有满足达到等级的英雄
            var lineupList = game.GodModel.getInstance().getViewGods();
            var index = lineupList.findIndex(function (vo) {
                return vo.godVo && vo.godVo.level < level;
            });
            var model = game.TaskModel.getInstance();
            index = index < 0 ? 0 : index;
            var godVo = lineupList[index].godVo;
            var uuid = godVo.uuid;
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u4E3B\u7EBF\u4EFB\u52A1id" + taskId + ",\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u5347\u7EA7\u5230" + level + "\u7EA7");
            if (model.isFinish(taskId)) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5B8C\u6210\u4E3B\u7EBF\u4EFB\u52A1,id\u4E3A" + taskId + "\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            Promise.resolve().then(function () {
                if (UIMgr.hasStage(UIConst.God_MainView)) {
                    return true;
                }
                else {
                    return GuideManager.guideToMainView(5);
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                var selectIndex = view.roleList.selectedIndex;
                if (selectIndex != index) {
                    game.GuideMask.show(view.roleList.getCell(index), game.DirectionType.top);
                    return GuideManager.listenNotification(game.GodEvent.SELECT_GOD_EVENT, function () {
                        var godVo = App.hero.getGodVoById(uuid);
                        return godVo.uuid == view.curVo.uuid;
                    });
                }
                else {
                    return true;
                }
            }).then(function () {
                // 主线任务前往是主动切换到各个子页面
                // 选中第一个tab界面
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                var viewIdx = view.godView.tabList.selectedIndex;
                if (viewIdx == ShenlingTabType.info) {
                    return true;
                }
                else {
                    return GuideManager.listenNotification(game.GodEvent.SWITCH_TAB_SUCCESS, function () {
                        return view.godView.tabList.selectedIndex == ShenlingTabType.info;
                    });
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewInfo.btn_upGrade, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.GodEvent.USE_EXPPOOL_SUCCESS, function () {
                    var godVo = App.hero.getGodVoById(uuid);
                    var isFinish = model.isFinish(taskId);
                    loghgy("\u68C0\u6D4B\u6761\u4EF6:\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u5347\u7EA7 " + godVo.level + "/" + level + ",\u4E3B\u7EBF\u4EFB\u52A1id\u4E3A" + taskId + "\u662F\u5426\u5B8C\u6210:" + isFinish);
                    return godVo.level >= level || isFinish;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /**
         * 通用一键穿戴装备
         * @param next 回调方法
         * @param step 引导步骤
         * @param count 穿戴装备几次
         */
        GuideManager.commonWearEquipment = function (next, step, taskId, count) {
            if (count === void 0) { count = 1; }
            // 获取有穿戴装备的英雄
            var gods = App.hero.getGodAry(-1, -1);
            var index = gods.findIndex(function (vo) {
                return vo.equipKeys.length > 0;
            });
            index = index < 0 ? 0 : index;
            var godVo = gods[index];
            var uuid = godVo.uuid;
            var model = game.TaskModel.getInstance();
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u4E3B\u7EBF\u4EFB\u52A1id:" + taskId + ",\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u4E00\u952E\u88C5\u5907\u7A7F\u6234" + count + "\u4EF6\u88C5\u5907");
            if (model.isFinish(taskId)) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5B8C\u6210\u4E3B\u7EBF\u4EFB\u52A1,id\u4E3A" + taskId + ",\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            GuideManager.guideToMainView(5).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.EquipView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                var selectIndex = view.list_roles.selectedIndex;
                if (selectIndex != index) {
                    game.GuideMask.show(view.list_roles.getCell(index), game.DirectionType.top);
                    return GuideManager.listenNotification(game.GodEvent.SELECT_GOD_EVENT, function () {
                        var godVo = App.hero.getGodVoById(uuid);
                        return godVo.uuid == view.curVo.uuid;
                    });
                }
                else {
                    return true;
                }
            }).then(function () {
                // 主线任务前往是主动切换到各个子页面
                // 选中第4个tab界面
                var view = UIMgr.getUIByName(UIConst.EquipView);
                var viewIdx = view.view_list.selectedIndex;
                if (viewIdx == EquipTabType.strength) {
                    return true;
                }
                else {
                    return GuideManager.listenNotification(game.EquipEvent.SWITCH_TAB_SUCCESS, function () {
                        return view.view_list.selectedIndex == EquipTabType.strength;
                    });
                }
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_wear, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.EquipEvent.ONEKE_WEAR_SUCCESS, function () {
                    var godVo = App.hero.getGodVoById(uuid);
                    var isFinish = model.isFinish(taskId);
                    loghgy("\u68C0\u6D4B\u6761\u4EF6:\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u7A7F\u6234\u88C5\u5907 " + godVo.equipKeys.length + "\u4EF6,\u4E3B\u7EBF\u4EFB\u52A1id" + taskId + "\u662F\u5426\u5B8C\u6210\uFF1A" + isFinish);
                    return isFinish;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /**
         * 通用一键强化装备
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         * @param type 类型  1：表示强化次数  2：表示几件装备强化到几级
         * @param count type=1时表示总次数 type=2时表示几件装备
         * @param level type=2时存在，表示等级
         */
        GuideManager.commonStrengthEquipment = function (next, step, taskId, type, count, level) {
            // 获取有穿戴装备的英雄
            var gods = App.hero.getGodAry(-1, -1);
            var index = gods.findIndex(function (vo) {
                return vo.equipKeys.length > 0;
            });
            index = index < 0 ? 0 : index;
            var godVo = gods[index];
            var uuid = godVo.uuid;
            if (type == 1) {
                loghgy("\u5F15\u5BFC" + step + "\uFF1A\u4E3B\u7EBF\u4EFB\u52A1id:" + taskId + ",\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u5F3A\u5316\u88C5\u5907" + count + "\u6B21");
            }
            else {
                loghgy("\u5F15\u5BFC" + step + "\uFF1A\u4E3B\u7EBF\u4EFB\u52A1id:" + taskId + ",\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u7684" + count + "\u4EF6\u88C5\u5907\u90FD\u5F3A\u5316\u5230" + level);
            }
            var model = game.TaskModel.getInstance();
            if (model.isFinish(taskId)) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5B8C\u6210\u4E3B\u7EBF\u4EFB\u52A1,id\u4E3A" + taskId + ",\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            Promise.resolve().then(function () {
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    return true;
                }
                else {
                    return GuideManager.guideToMainView(5).then(function () {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.EquipView);
                    });
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                var selectIndex = view.list_roles.selectedIndex;
                if (selectIndex != index) {
                    game.GuideMask.show(view.list_roles.getCell(index), game.DirectionType.top);
                    return GuideManager.listenNotification(game.GodEvent.SELECT_GOD_EVENT, function () {
                        var godVo = App.hero.getGodVoById(uuid);
                        return godVo.uuid == view.curVo.uuid;
                    });
                }
                else {
                    return true;
                }
            }).then(function () {
                // 主线任务前往是主动切换到各个子页面
                var view = UIMgr.getUIByName(UIConst.EquipView);
                var viewIdx = view.view_list.selectedIndex;
                if (viewIdx == EquipTabType.strength) {
                    return true;
                }
                else {
                    return GuideManager.listenNotification(game.EquipEvent.SWITCH_TAB_SUCCESS, function () {
                        return view.view_list.selectedIndex == EquipTabType.strength;
                    });
                }
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_strength, game.DirectionType.top);
                return GuideManager.listenNotification(game.EquipEvent.ONEKE_STRENGTH_SUCCESS, function () {
                    var godVo = App.hero.getGodVoById(uuid);
                    var isFinish = model.isFinish(taskId);
                    if (type == 1) {
                        loghgy("\u68C0\u6D4B\u6761\u4EF6:\u5F3A\u5316\u6B21\u6570 " + godVo.getStrengthNum() + "/" + count + ",\u4E3B\u7EBF\u4EFB\u52A1id" + taskId + "\u662F\u5426\u5B8C\u6210:" + isFinish);
                    }
                    else {
                        loghgy("\u68C0\u6D4B\u6761\u4EF6:\u51E0\u4EF6\u88C5\u5907\u5F3A\u5316\u5230\u51E0\u7EA7 " + godVo.isStrengthToLv(count, level) + ",\u4E3B\u7EBF\u4EFB\u52A1id" + taskId + "\u662F\u5426\u5B8C\u6210:" + isFinish);
                    }
                    return isFinish;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 召唤英雄 */
        GuideManager.zhaohuan1 = function (next, step) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u53EC\u5524\u7B2C\u4E00\u53EA\u82F1\u96C4");
            if (App.hero.getGodAry().length > 0) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u6709\u82F1\u96C4\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            GuideManager.talk(LanMgr.getLan("", 12016))
                .then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End, null);
            }).then(function () {
                return GuideManager.guideToMainView(0);
            }).then(function () {
                var mainView = UIMgr.getUIByName(UIConst.Main3DView);
                game.GuideMask.show(mainView.btnZhaohuan, game.DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_MainView);
            }).then(function () {
                return GuideManager.timeout(800);
            }).then(function () {
                game.GuideMask.hide();
                return GuideManager.talk(LanMgr.getLan("", 12017));
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ZH_MainView);
                var zhaohuantypeUI = view.list_zhaohuan.getCell(2);
                game.GuideMask.show(zhaohuantypeUI.btn_one, game.DirectionType.top);
                return GuideManager.listenNotification(game.SummonEvent.ZHAOHUAN_SUCCESS, function () {
                    return App.hero.getGodAry().length > 0;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                if (UIMgr.hasStage(UIConst.ZH_ResultView)) {
                    return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                }
                else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_ResultView);
                }
            }).then(function () {
                game.GuideMask.showWithTransparent();
                var ui = UIMgr.getUIByName(UIConst.ZH_ResultView);
                if (ui.isCanClose()) {
                    return true;
                }
                else {
                    return GuideManager.listenNotification(game.SummonEvent.SHOW_BTN_VISIBLE_TRUE);
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ZH_ResultView);
                game.GuideMask.show(view.btn_sure, game.DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_ResultView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.SysTopView);
                game.GuideMask.show(view.btnClose, game.DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_MainView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 布阵 */
        GuideManager.buzhen1 = function (next, step) {
            var model = game.GodModel.getInstance();
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u5E03\u9635\u7B2C\u4E00\u53EA\u82F1\u96C4");
            if (model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 1) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u4E0A\u9635\u7B2C\u4E00\u53EA\u82F1\u96C4\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            var godId = tb.TB_god_employ_set.get_TB_god_employ_setnById(1).first_employ[0];
            var tbGod = tb.TB_god.get_TB_godById(godId);
            GuideManager.talk(LanMgr.getLan("", 12018, tbGod.name), false)
                .then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.talk(LanMgr.getLan("", 12019), true, tbGod.model, tbGod.name);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(1);
            }).then(function () {
                if (UIMgr.hasStage(UIConst.BuzhenView)) {
                    return true;
                }
                else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.BuzhenView);
                }
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.BuzhenView);
                game.GuideMask.show(ui.list_buzhenrole.getCell(0), game.DirectionType.bottom, LanMgr.getLan("", 12020), true);
                return GuideManager.listenNotification(game.GodEvent.BUZHEN_SELECT_ROLE, function () {
                    // 需检测是否正确布阵
                    var ui = UIMgr.getUIByName(UIConst.BuzhenView);
                    return ui.isExistLineupByIdx(0);
                });
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.BuzhenView);
                game.GuideMask.show(ui.btn_return, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.GodEvent.BUZHEN_COMPLETE, function () {
                    return model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 1;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 英雄合成 */
        GuideManager.godHecheng = function (next, step) {
            var model = game.GodModel.getInstance();
            if (model.isHasGod(common.GlobalData.HOUYI_GOD_ID)) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u6709\u5FB7\u53E4\u62C9\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u82F1\u96C4\u788E\u7247\u5408\u6210\u82F1\u96C4");
            var itemId = common.GlobalData.getHechengChipId();
            var tbGod = tb.TB_god.get_TB_godById(common.GlobalData.HOUYI_GOD_ID);
            GuideManager.talk(LanMgr.getLan("", 12021, tbGod.name), true)
                .then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(4);
            }).then(function () {
                return GuideManager.timeout(100);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.BagView);
                view.list_buttons.selectedIndex = game.TABTYPE.SUIPIAN;
                return GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.BagView);
                var itemAry = view.bagItemList.dataSource;
                var itemIdx = itemAry.findIndex(function (ary) {
                    return ary.some(function (vo) {
                        return vo.id == itemId;
                    });
                });
                var bagItem = view.bagItemList.getCell(itemIdx);
                var idx = bagItem.list_lineitem.array.findIndex(function (vo) {
                    return vo.id == itemId;
                });
                bagItem.showDetail(bagItem.list_lineitem.array[idx]);
                return GuideManager.timeout(100);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.BagView);
                var itemAry = view.bagItemList.dataSource;
                var itemIdx = itemAry.findIndex(function (ary) {
                    return ary.some(function (vo) {
                        return vo.id == itemId;
                    });
                });
                var bagItem = view.bagItemList.getCell(itemIdx);
                game.GuideMask.show(bagItem.ui_detail.btn_hecheng, game.DirectionType.left);
                return GuideManager.listenNotification(game.BagEvent.USE_ITEM_SUCCESS, function () {
                    return model.isHasGod(common.GlobalData.HOUYI_GOD_ID);
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 布阵 */
        GuideManager.buzhen2 = function (next, step) {
            var _this = this;
            var model = game.GodModel.getInstance();
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u5E03\u9635\u7B2C\u4E8C\u53EA\u82F1\u96C4");
            if (model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 2) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u4E0A\u9635\u7B2C\u4E8C\u53EA\u82F1\u96C4\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            var tbGod = tb.TB_god.get_TB_godById(common.GlobalData.HOUYI_GOD_ID);
            GuideManager.talk(LanMgr.getLan("", 12022, tbGod.name), false)
                .then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                var tbGod = tb.TB_god.get_TB_godById(common.GlobalData.HOUYI_GOD_ID);
                return GuideManager.talk(LanMgr.getLan("", 12023), true, tbGod.model, tbGod.name);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(1);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                var item = view.getCanShangzhenIR();
                game.GuideMask.show(item, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.God_ReplaceGodView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_ReplaceGodView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_ReplaceGodView);
                var item = view.godList.getCell(0);
                game.GuideMask.show(item.btnShangzhen, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.GodEvent.BUZHEN_COMPLETE, function () {
                    return model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 2;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 领取历练宝箱 */
        GuideManager.rewardGuajiBaoxiang = function (next, step) {
            loghgy('引导步骤：领取挂机宝箱奖励', step);
            GuideManager.talk(LanMgr.getLan("", 12024))
                .then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(5);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.bottomUI.box_bxeff, game.DirectionType.top);
                return GuideManager.listenNotification(game.GuajiEvent.REWARD_BAOXIANG_SUCC);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Guaji_ShouyiView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 快速战斗 */
        GuideManager.fastFight = function (next, step) {
            loghgy('引导步骤：快速战斗', step);
            GuideManager.talk(LanMgr.getLan("", 12025))
                .then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(5);
            }).then(function () {
                return GuideManager.timeout(300);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.bottomUI.btn_fast, game.DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.Guaji_FastView);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Guaji_FastView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Guaji_FastView);
                game.GuideMask.show(view.btnFast, game.DirectionType.top);
                return GuideManager.listenNotification(game.GuajiEvent.FAST_BATTLE_SUCCESS);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return new game.ListenDialogQueueWaitStatus(true, null).execute();
            }).then(function () {
                UIMgr.hideUIByName(UIConst.LevelUpView);
                var view = UIMgr.getUIByName(UIConst.Guaji_FastView);
                game.GuideMask.show(view.bgPanel.btnClose, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Guaji_FastView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 第一次穿戴装备 */
        GuideManager.wearEquipment1 = function (next, step) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u7B2C1\u53EA\u82F1\u96C4\u4E00\u952E\u7A7F\u6234\u88C5\u5907");
            var gods = App.hero.getGodAry(-1, -1);
            var uuid = gods[0].uuid;
            GuideManager.talk(LanMgr.getLan("", 12026))
                .then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(2);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                view.view_list.selectedIndex = EquipTabType.strength;
                return GuideManager.timeout(100);
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_wear, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.EquipEvent.ONEKE_WEAR_SUCCESS);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 第二次召唤英雄 */
        GuideManager.zhaohuan2 = function (next, step, taskId, index) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u53EC\u5524\u7B2C\u82F1\u96C4");
            if (App.hero.getGodAry().length >= 3) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u67093\u53EA\u82F1\u96C4\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            GuideManager.talk(LanMgr.getLan("", 12027))
                .then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.guideToMainView(5);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.btn_uproad, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.UpRoadView);
            }).then(function () {
                return GuideManager.timeout(600);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.UpRoadView);
                var itemIR = view.list_URTask.getCell(0);
                game.GuideMask.show(itemIR.btn_receive, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_MainView);
            }).then(function () {
                return GuideManager.timeout(800);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ZH_MainView);
                var zhaohuantypeUI = view.list_zhaohuan.getCell(2);
                game.GuideMask.show(zhaohuantypeUI.btn_one, game.DirectionType.top);
                return GuideManager.listenNotification(game.SummonEvent.ZHAOHUAN_SUCCESS, function () {
                    return App.hero.getGodAry().length >= 3;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                if (UIMgr.hasStage(UIConst.ZH_ResultView)) {
                    return GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME);
                }
                else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ZH_ResultView);
                }
            }).then(function () {
                game.GuideMask.showWithTransparent();
                var ui = UIMgr.getUIByName(UIConst.ZH_ResultView);
                if (ui.isCanClose()) {
                    return true;
                }
                else {
                    return GuideManager.listenNotification(game.SummonEvent.SHOW_BTN_VISIBLE_TRUE);
                }
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.ZH_ResultView);
                game.GuideMask.show(view.btn_sure, game.DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_ResultView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.SysTopView);
                game.GuideMask.show(view.btnClose, game.DirectionType.top);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.ZH_MainView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 布阵 */
        GuideManager.buzhen3 = function (next, step) {
            var _this = this;
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u5E03\u9635\u7B2C\u4E09\u53EA\u82F1\u96C4");
            var model = game.GodModel.getInstance();
            if (model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 3) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u4E0A\u9635\u7B2C\u4E09\u53EA\u82F1\u96C4\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            var godId = tb.TB_god_employ_set.get_TB_god_employ_setnById(1).second_employ[0];
            var tbGod = tb.TB_god.get_TB_godById(godId);
            GuideManager.talk(LanMgr.getLan("", 12028, tbGod.name), false)
                .then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.talk(LanMgr.getLan("", 12029), true, tbGod.model, tbGod.name);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(1);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                var item = view.getCanShangzhenIR();
                game.GuideMask.show(item, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.God_ReplaceGodView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_ReplaceGodView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_ReplaceGodView);
                var item = view.godList.getCell(0);
                game.GuideMask.show(item.btnShangzhen, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.GodEvent.BUZHEN_COMPLETE, function () {
                    return model.getLineupGodCount(iface.tb_prop.lineupTypeKey.attack) >= 3;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 领取进阶奖励 */
        GuideManager.rewardUploadJL1 = function (next, step) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u9886\u53D6\u8FDB\u9636\u5956\u52B1");
            GuideManager.guideToMainView(5).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.btn_uproad, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.UpRoadView);
            }).then(function () {
                return GuideManager.timeout(600);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.UpRoadView);
                var itemIR = view.list_URTask.getCell(0);
                game.GuideMask.show(itemIR.btn_receive, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.UpRoadEvent.REWARD_SUCCESS);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.UpRoadView);
                var itemIR = view.list_URTask.getCell(1);
                game.GuideMask.show(itemIR.btn_receive, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.UpRoadView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 领取挂机通关奖励 */
        GuideManager.receiveTongguanReward = function (next, step) {
            var _this = this;
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u9886\u53D6\u6302\u673A\u901A\u5173\u5956\u52B1");
            GuideManager.talk(LanMgr.getLan("", 12030), false).then(function () {
                return GuideManager.listenNotification(GuideEvent.Guide_Talk_End);
            }).then(function () {
                return GuideManager.talk(LanMgr.getLan("", 12031), true);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(5);
            }).then(function () {
                return GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                game.GuideMask.show(view.img_baoxiang, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Lilian_RewardView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Lilian_RewardView);
                game.GuideMask.show(view.btn_receive, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.TaskEvent.REWARD_TASK_SUCCESS);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.Lilian_RewardView);
                game.GuideMask.show(view.uiPanel.btnClose, game.DirectionType.left);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.Lilian_RewardView);
            }).then(function () {
                UIMgr.hideUIByName(UIConst.Lilian_RewardView);
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 英雄升级第一次 */
        GuideManager.god1LvupTo = function (next, step, index, level, talkType) {
            var talk;
            if (talkType == 1) {
                talk = LanMgr.getLan("", 12005);
            }
            var lineupList = game.GodModel.getInstance().getViewGods();
            var godVo = lineupList[index - 1].godVo;
            var uuid = godVo.uuid;
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u5347\u7EA7\u5230" + level);
            if (godVo.level >= level) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5347\u7EA7\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ")\u5230" + level + "\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            Promise.resolve().then(function () {
                if (talk && talk != "") {
                    game.GuideMask.hide();
                    return GuideManager.talk(talk).then(function () {
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
                    });
                }
                return true;
            }).then(function () {
                return GuideManager.guideToMainView(1);
            }).then(function () {
                return GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewInfo.btn_upGrade, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.GodEvent.USE_EXPPOOL_SUCCESS, function () {
                    var godVo = App.hero.getGodVoById(uuid);
                    loghgy("\u68C0\u6D4B\u6761\u4EF6:\u5347\u7EA7\u82F1\u96C4" + godVo.tab_god.name + "(" + uuid + ") " + godVo.level + "/" + level);
                    return godVo.level >= level;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /**
         * 第一次强化装备
         * @param next 回调方法
         * @param step 引导步骤
         * @param taskId 主线任务id
         * @param count 强化次数
         */
        GuideManager.strengthEquipment1 = function (next, step, count) {
            // 获取有穿戴装备的英雄
            var gods = App.hero.getGodAry();
            var index = gods.findIndex(function (vo) {
                return vo.equipKeys.length > 0;
            });
            index = index < 0 ? 0 : index;
            var godVo = gods[index];
            var uuid = godVo.uuid;
            var isStrength = godVo.equipKeys.some(function (vo) { return vo.strengthLv >= count; });
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u82F1\u96C4" + godVo.tab_god.name + "(" + godVo.uuid + ")\u4E00\u952E\u5F3A\u5316\u88C5\u5907");
            if (isStrength) {
                loghgy("\u517C\u5BB9\uFF1A\u5DF2\u5F3A\u5316\u8FC73\u6B21\u88C5\u5907\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            GuideManager.talk(LanMgr.getLan("", 12032)).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(2);
            }).then(function () {
                // 手动定位
                var view = UIMgr.getUIByName(UIConst.EquipView);
                view.list_roles.selectedIndex = index;
                return GuideManager.timeout(200);
            }).then(function () {
                // 手动定位
                var view = UIMgr.getUIByName(UIConst.EquipView);
                view.view_list.selectedIndex = EquipTabType.strength;
                return GuideManager.timeout(100);
            }).then(function () {
                var ui = UIMgr.getUIByName(UIConst.EquipView);
                game.GuideMask.show(ui.viewEquip.btn_strength, game.DirectionType.top);
                return GuideManager.listenNotification(game.EquipEvent.ONEKE_STRENGTH_SUCCESS, function () {
                    var godVo = App.hero.getGodVoById(uuid);
                    var isStrength = godVo.equipKeys.some(function (vo) { return vo.strengthLv >= count; });
                    return isStrength;
                });
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 英雄升阶 */
        GuideManager.godDgup1 = function (next, step) {
            var _this = this;
            var lineupList = game.GodModel.getInstance().getViewGods();
            var godVo = lineupList[0].godVo;
            var uuid = godVo.uuid;
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u82F1\u96C4\u5347\u9636");
            if (godVo.degree >= 1) {
                loghgy("\u517C\u5BB9\uFF1A\u82F1\u96C4\u5DF2\u5347\u9636\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F15\u5BFC\u6B65\u9AA4" + step);
                GuideManager.guideRequest(step)
                    .then(function () {
                    next();
                });
                return;
            }
            GuideManager.talk(LanMgr.getLan("", 12033)).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideToMainView(1);
            }).then(function () {
                return GuideManager.timeout(200);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                game.GuideMask.show(view.viewInfo.btn_shengjie, game.DirectionType.bottom);
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.God_DgUpView, _this);
            }).then(function () {
                game.GuideMask.showWithTransparent();
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_DgUpView, _this);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.God_DgUpView);
                game.GuideMask.show(view.btn_shengjie, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.GodEvent.GOD_SHENGJIE_SUCCESS);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.God_DgUp_SUCCView, _this);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 领取七日登录奖励 */
        GuideManager.lingquQiriJL = function (next, step) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u9886\u53D6\u4E03\u65E5\u767B\u5F55\u5956\u52B1");
            GuideManager.guideToMainView(0).then(function () {
                var view = UIMgr.getUIByName(UIConst.Main3DView);
                game.GuideMask.show(view.getActivityBtnIR(ModuleConst.LOGIN_QIRI), game.DirectionType.bottom);
                return GuideManager.listenDialogOpened(UIConst.LoginGiftView);
            }).then(function () {
                var view = UIMgr.getUIByName(UIConst.LoginGiftView);
                game.GuideMask.show(view.btn_receive, game.DirectionType.bottom);
                return GuideManager.listenNotification(game.HuodongEvent.LOGIN_GIFT_RECEIVE);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.CommonRewardView);
            }).then(function () {
                return GuideManager.talk(LanMgr.getLan("", 12034));
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.LoginGiftView);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /** 总结引导 */
        GuideManager.endGuide = function (next, step) {
            loghgy("\u5F15\u5BFC" + step + "\uFF1A\u603B\u7ED3\u5F15\u5BFC");
            GuideManager.guideToMainView(5).then(function () {
                return GuideManager.talk(LanMgr.getLan("", 12035));
            }).then(function () {
                return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView);
            }).then(function () {
                return GuideManager.guideRequest(step);
            }).then(function () {
                game.GuideMask.hide();
                next();
            });
            return {
                dispose: function () {
                }
            };
        };
        /**
         * 指引
         * @param index
         */
        GuideManager.guideToMainView = function (index, text, caller) {
            if (text === void 0) { text = ""; }
            if (caller === void 0) { caller = null; }
            return new Promise(function (resolve, reject) {
                var context = caller ? caller : GuideManager._instance;
                var view = UIMgr.getUIByName(UIConst.HudView);
                if (index == 0 && !UIMgr.hasStage(UIConst.Main3DView)) {
                    game.GuideMask.show(view.btn_main, game.DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.Main3DView, context)
                        .then(function () {
                        return GuideManager.timeout(350);
                    }).then(function () {
                        game.GuideMask.hide();
                        resolve();
                    });
                }
                else if (index == 1 && !UIMgr.hasStage(UIConst.God_MainView)) {
                    game.GuideMask.show(view.btn_god, game.DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.God_MainView, context)
                        .then(function () {
                        return GuideManager.timeout(350);
                    }).then(function () {
                        game.GuideMask.hide();
                        resolve();
                    });
                }
                else if (index == 2 && !UIMgr.hasStage(UIConst.EquipView)) {
                    game.GuideMask.show(view.btn_equip, game.DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.EquipView, context)
                        .then(function () {
                        return GuideManager.timeout(350);
                    }).then(function () {
                        game.GuideMask.hide();
                        resolve();
                    });
                }
                else if (index == 3 && !UIMgr.hasStage(UIConst.ArtifactView)) {
                    game.GuideMask.show(view.btn_shenqi, game.DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.ArtifactView, context)
                        .then(function () {
                        return GuideManager.timeout(350);
                    }).then(function () {
                        game.GuideMask.hide();
                        resolve();
                    });
                }
                else if (index == 4 && !UIMgr.hasStage(UIConst.BagView)) {
                    game.GuideMask.show(view.btn_bag, game.DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.BagView, context)
                        .then(function () {
                        return GuideManager.timeout(350);
                    }).then(function () {
                        game.GuideMask.hide();
                        resolve();
                    });
                }
                else if (index == 5 && !UIMgr.hasStage(UIConst.GuajiView)) {
                    game.GuideMask.show(view.btn_fight, game.DirectionType.top, text, true);
                    GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuajiView, context)
                        .then(function () {
                        return GuideManager.timeout(350);
                    }).then(function () {
                        dispatchEvt(new GuideEvent(GuideEvent.UPDATE_GUIDE_STATUS));
                        game.GuideMask.hide();
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        };
        /** 监听弹窗打开 */
        GuideManager.listenDialogOpened = function (uiname, caller) {
            if (caller === void 0) { caller = null; }
            return new Promise(function (resolve) {
                if (UIMgr.getInstance().getUIInfo(uiname).popEffect) {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, uiname, caller)
                        .then(function () {
                        game.GuideMask.showWithTransparent();
                        return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, uiname, caller);
                    }).then(function () {
                        resolve();
                    });
                }
                else {
                    return GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, uiname, caller).then(function () {
                        resolve();
                    });
                }
            });
        };
        /** 获取当前引导步骤 */
        GuideManager.getGuideStep = function () {
            return App.hero.tasks.guideStep;
        };
        /** 是否在强制引导中 */
        GuideManager.isInGuide = function () {
            var guideStep = GuideManager.getGuideStep();
            return guideStep < GuideStep.endGuide;
        };
        /** 是否正在执行引导 */
        GuideManager.isExecuteGuide = function () {
            return GuideManager.isInGuide() || game.GuideWeakManager.isExcuting();
        };
        /** 通过强引导 */
        GuideManager.allPass = function () {
            tl3d.ModuleEventManager.removeEventByTarget(GuideManager._instance);
            GuideManager.guideRequest(GuideStep.endGuide).then(function () {
                game.GuideMask.hide();
                UIMgr.hideUIByName(UIConst.GuideTalkView);
            });
        };
        /** 是否可以显示跳过按钮 */
        GuideManager.canShowPassBtn = function () {
            if (Number(App.hero.isNewPlayer) == 0) {
                return false;
            }
            if (GuideManager.isInGuide()) {
                return true;
            }
            if (game.GuideWeakManager.isExcuting()) {
                return true;
            }
            return false;
        };
        /** 跳过当前引导 */
        GuideManager.passGuide = function () {
            if (GuideManager.isInGuide()) {
                // 记录强制性引导的跳过操作
                var curStep_1 = GuideManager.getGuideStep() + 1;
                var isInGuide = GuideManager.GuideList.some(function (vo) {
                    return vo.step == curStep_1;
                });
                if (isInGuide) {
                    GuideManager.recordJumpGuide(curStep_1);
                }
                loghgy("\u8DF3\u8FC7\u5F3A\u5236\u5F15\u5BFC");
                tl3d.ModuleEventManager.removeEventByTarget(GuideManager._instance);
                GuideManager.guideRequest(GuideStep.endGuide).then(function () {
                    tl3d.ModuleEventManager.removeEventByTarget(GuideManager._instance);
                    game.GuideWeakManager.startRun();
                    UIMgr.hideUIByName(UIConst.GuideTalkView);
                    game.GuideMask.hide();
                    dispatchEvt(new GuideEvent(GuideEvent.GUIDE_END));
                });
                return;
            }
            if (game.GuideWeakManager.curExcutingGuideStep != -1) {
                game.GuideWeakManager.passCurGuide();
                return;
            }
        };
        /** 记录跳过引导操作 */
        GuideManager.recordJumpGuide = function (step) {
            if (step <= 0)
                return;
            loghgy("记录跳过引导步骤:", step);
            var args = {};
            args[Protocol.game_guide_jumpGuide.args.guideStep] = step;
            PLC.request(Protocol.game_guide_jumpGuide, args, function (data) {
                // if(!data){
                //     loghgy("记录跳过引导步骤失败");
                //     return;
                // }
                // loghgy("记录跳过引导步骤成功");
            });
        };
        GuideManager._instance = new GuideManager();
        GuideManager.GuideList = [
            { step: GuideStep.zhaohuan1, args: [], execute: GuideManager.zhaohuan1 },
            { step: GuideStep.buzhen1, args: [], execute: GuideManager.buzhen1 },
            { step: GuideStep.battleExperienceCopy1, args: [common.GlobalData.GUAJI_COPY_1_1], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.godHeCheng, args: [], execute: GuideManager.godHecheng },
            { step: GuideStep.buzhen2, args: [], execute: GuideManager.buzhen2 },
            { step: GuideStep.battleExperienceCopy2, args: [common.GlobalData.GUAJI_COPY_1_2], execute: GuideManager.commonBattleExperienceCopy },
            { step: GuideStep.rewardGuajiBaoxiang, args: [], execute: GuideManager.rewardGuajiBaoxiang },
            { step: GuideStep.fastFight, args: [], execute: GuideManager.fastFight },
            { step: GuideStep.god1LvupTo5, args: [1, 5, 1], execute: GuideManager.god1LvupTo },
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
        ];
        GuideManager._isInit = false;
        return GuideManager;
    }());
    game.GuideManager = GuideManager;
})(game || (game = {}));
