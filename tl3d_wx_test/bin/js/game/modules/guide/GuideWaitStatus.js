var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game;
(function (game) {
    /** 通用监听战斗结束 */
    var FightEndWaitStatus = /** @class */ (function () {
        /**
         * 监听副本战斗的开始到结束
         * @param colse 是否引导关闭
         * @param context 作用域
         */
        function FightEndWaitStatus(bool, context) {
            this._close = bool;
            this._context = context;
        }
        FightEndWaitStatus.prototype.getGuideStep = function () {
            return 0;
        };
        FightEndWaitStatus.prototype.getCurChildStep = function () {
            return 0;
        };
        FightEndWaitStatus.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                Promise.resolve().then(function () {
                    if (UIMgr.hasStage(UIConst.FightViews)) {
                        return true;
                    }
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, _this._context);
                }).then(function () {
                    var fightView = UIMgr.getUIByName(UIConst.FightViews);
                    // fightView.btn_stop.disabled = true;
                    game.GuideManager.listenDialogs(common.GlobalEvent.DIALOG_OPENED, [UIConst.FightVictory, UIConst.FightFailure], _this._context)
                        .then(function (dialog) {
                        var victory = dialog.name == UIConst.FightVictory;
                        UIMgr.hideUIByName(UIConst.CommonRuleView);
                        var fightView = UIMgr.getUIByName(UIConst.FightViews);
                        // fightView.btn_stop.disabled = false;
                        if (victory) {
                            var view = UIMgr.getUIByName(UIConst.FightVictory);
                            view.chk_next.selected = false;
                            view.onChkChange();
                            game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                            game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, _this._context).then(function () {
                                resolve();
                            });
                        }
                        else {
                            var view = UIMgr.getUIByName(UIConst.FightFailure);
                            game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                            game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightViews, _this._context).then(function () {
                                resolve();
                            });
                        }
                    });
                });
            });
        };
        FightEndWaitStatus.prototype.dispose = function () {
            tl3d.ModuleEventManager.removeEventByTarget(this._context);
        };
        return FightEndWaitStatus;
    }());
    game.FightEndWaitStatus = FightEndWaitStatus;
    /** 战斗对话引导 */
    var FightTalkGuide = /** @class */ (function () {
        function FightTalkGuide() {
            this._model = game.GuajiModel.getInstance();
            this._copyDic = {};
            var tbData = TableData.getInstance().getTableByName(TableData.tb_copy_info).data;
            for (var key in tbData) {
                var tbCopy = tbData[key];
                if ((tbCopy.before_plot && tbCopy.before_plot.length > 0) || (tbCopy.after_plot && tbCopy.after_plot.length > 0)) {
                    this._copyDic[tbCopy.ID] = tbCopy;
                }
            }
        }
        FightTalkGuide.prototype.getGuideStep = function () {
            return 0;
        };
        FightTalkGuide.prototype.getCurChildStep = function () {
            return 0;
        };
        /**
         *  检测是否可以开启引导对话
         *  是否有对话，并且未通过副本
         */
        FightTalkGuide.prototype.checkStart = function (copyVo) {
            if (!copyVo.tab_copyinfo)
                return false;
            var copyId = copyVo.tab_copyinfo.ID;
            var exist = this._copyDic[copyId] ? true : false;
            if (!exist)
                return false;
            if (copyVo.copyType == iface.tb_prop.copyTypeKey.rune) {
                return !this._model.isPassCopy(copyId);
            }
            else if (copyVo.copyType == iface.tb_prop.copyTypeKey.tower) {
                return !game.TowerModel.getInstance().isPassCopy(copyId);
            }
            return false;
        };
        FightTalkGuide.prototype.execute = function () {
            var _this = this;
            tl3d.ModuleEventManager.removeEventByTarget(this);
            game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, this).then(function () {
                var view = UIMgr.getUIByName(UIConst.FightViews);
                var fightVo = view.dataSource;
                if (_this.checkStart(fightVo.vo)) {
                    _this.startGuide(2, fightVo.vo.tab_copyinfo, _this.execute.bind(_this));
                }
                else {
                    _this.execute();
                }
            });
            game.GuideManager.listenNotification(game.GuajiEvent.ENTER_FIGHT, function ($event) {
                _this._model.startTalkGuide = false;
                if (_this.checkStart($event.data)) {
                    _this.startGuide(1, $event.data.tab_copyinfo, null);
                }
                return false;
            }, this);
        };
        /** 开始引导对话 */
        FightTalkGuide.prototype.startGuide = function (type, tbCopy, resolve) {
            var _this = this;
            loghgy('战斗对话引导');
            var model = this._model;
            var hasStartTalk = tbCopy.before_plot && tbCopy.before_plot.length > 0;
            var hasEndTalk = tbCopy.after_plot && tbCopy.after_plot.length > 0;
            var isVictory = false;
            var view = UIMgr.getUIByName(UIConst.FightViews);
            Promise.resolve().then(function () {
                if (hasStartTalk) {
                    //如果有开场对话
                    if (type == 2) {
                        view.talkStart = true;
                        return game.GuideManager.listenNotification(game.FightsEvent.SCENE_COMPLETE_EVENT, null, _this)
                            .then(function () {
                            var talkAry = [].concat.apply([], tbCopy.before_plot);
                            return _this.talk(talkAry);
                        }).then(function () {
                            var view = UIMgr.getUIByName(UIConst.FightViews);
                            view.startTalkEnd();
                            return game.GuideManager.listenNotification(game.FightsEvent.FIGHT_END, function ($event) {
                                isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                                view.stopFightEnd = hasEndTalk && isVictory;
                                return true;
                            }, _this);
                        });
                    }
                    else if (type == 1) {
                        model.startTalkGuide = true;
                        return game.GuideManager.listenNotification(game.GuajiEvent.CREATE_ROLE_SUCC, null, _this)
                            .then(function () {
                            var talkAry = [].concat.apply([], tbCopy.before_plot);
                            return _this.talk(talkAry);
                        }).then(function () {
                            model.startTalkGuide = false;
                            var view = UIMgr.getUIByName(UIConst.GuajiView);
                            if (view && view.guajiScene && view.guajiScene.startTalkGuideEnd()) {
                                view.guajiScene.startTalkGuideEnd();
                            }
                            return game.GuideManager.listenNotification(game.GuajiEvent.GUAJI_FIGHT_END, function ($event) {
                                isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                                model.hasEndTalkGuide = hasEndTalk;
                                return true;
                            }, _this);
                        });
                    }
                }
                else {
                    if (type == 2) {
                        return game.GuideManager.listenNotification(game.FightsEvent.FIGHT_END, function ($event) {
                            isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                            view.stopFightEnd = hasEndTalk && isVictory;
                            return true;
                        }, _this);
                    }
                    else if (type == 1) {
                        return game.GuideManager.listenNotification(game.GuajiEvent.GUAJI_FIGHT_END, function ($event) {
                            isVictory = $event.data && $event.data == playState.VICTORY ? true : false;
                            model.hasEndTalkGuide = hasEndTalk;
                            return true;
                        }, _this);
                    }
                }
            }).then(function () {
                if (hasEndTalk && isVictory) {
                    var talkAry = [].concat.apply([], tbCopy.after_plot);
                    return _this.talk(talkAry).then(function () {
                        if (type == 1) {
                            var guajiview = UIMgr.getUIByName(UIConst.GuajiView);
                            if (guajiview && guajiview.guajiScene) {
                                guajiview.guajiScene.endFight();
                            }
                            model.hasEndTalkGuide = false;
                        }
                        else if (type == 2) {
                            var view_1 = UIMgr.getUIByName(UIConst.FightViews);
                            view_1.doFigthEnd(false);
                        }
                        return true;
                    });
                }
                else {
                    if (type == 1) {
                        var guajiview = UIMgr.getUIByName(UIConst.GuajiView);
                        if (guajiview && guajiview.guajiScene) {
                            guajiview.guajiScene.endFight();
                        }
                        model.hasEndTalkGuide = false;
                    }
                    return true;
                }
            }).then(function () {
                dispatchEvt(new game.GuajiEvent(game.GuajiEvent.GUAJI_TALK_END));
                if (resolve) {
                    resolve();
                }
            });
        };
        /** 对话 */
        FightTalkGuide.prototype.talk = function (talkAry) {
            return __awaiter(this, void 0, void 0, function () {
                var len, i, tbTalk, isEnd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            len = talkAry.length;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < len)) return [3 /*break*/, 7];
                            tbTalk = tb.TB_plot.getItemById(talkAry[i]);
                            isEnd = (len - 1) == i;
                            return [4 /*yield*/, game.GuideManager.talk(tbTalk.plot, isEnd, tbTalk.model, tbTalk.name, tbTalk.model_multiple, tbTalk.location, true)];
                        case 2:
                            _a.sent();
                            if (!isEnd) return [3 /*break*/, 4];
                            return [4 /*yield*/, game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, this)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, game.GuideManager.listenNotification(game.GuideEvent.Guide_Talk_End, null, this)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        FightTalkGuide.prototype.dispose = function () {
        };
        return FightTalkGuide;
    }());
    game.FightTalkGuide = FightTalkGuide;
    /** 监听战斗界面关闭 -- 失败或者生理时强制引导离开战斗 */
    var ListenFightClosedWaitStatus = /** @class */ (function () {
        function ListenFightClosedWaitStatus() {
        }
        ListenFightClosedWaitStatus.prototype.getGuideStep = function () {
            return 0;
        };
        ListenFightClosedWaitStatus.prototype.getCurChildStep = function () {
            return 0;
        };
        ListenFightClosedWaitStatus.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (UIMgr.hasStage(UIConst.FightViews)) {
                    if (UIMgr.hasStage(UIConst.FightVictory)) {
                        var view = UIMgr.getUIByName(UIConst.FightVictory);
                        game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                        game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightVictory).then(function () {
                            game.GuideMask.hide();
                            _this.dispose();
                            resolve();
                        });
                    }
                    else if (UIMgr.hasStage(UIConst.FightFailure)) {
                        var view = UIMgr.getUIByName(UIConst.FightFailure);
                        game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                        game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightFailure).then(function () {
                            game.GuideMask.hide();
                            _this.dispose();
                            resolve();
                        });
                    }
                    else {
                        game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightVictory, _this).then(function () {
                            var view = UIMgr.getUIByName(UIConst.FightVictory);
                            game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                            return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightVictory);
                        }).then(function () {
                            game.GuideMask.hide();
                            _this.dispose();
                            resolve();
                        });
                        game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightFailure, _this).then(function () {
                            var view = UIMgr.getUIByName(UIConst.FightFailure);
                            game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                            return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightFailure);
                        }).then(function () {
                            game.GuideMask.hide();
                            _this.dispose();
                            resolve();
                        });
                    }
                }
                else {
                    resolve();
                }
            });
        };
        ListenFightClosedWaitStatus.prototype.dispose = function () {
            tl3d.ModuleEventManager.removeEventByTarget(this);
        };
        return ListenFightClosedWaitStatus;
    }());
    game.ListenFightClosedWaitStatus = ListenFightClosedWaitStatus;
    /** 监听弹框队列 */
    var ListenDialogQueueWaitStatus = /** @class */ (function () {
        /**
         * 监听弹框队列
         * @param colse 是否引导关闭
         * @param context 作用域
         */
        function ListenDialogQueueWaitStatus(bool, context) {
            this._close = bool;
            this._context = context;
        }
        ListenDialogQueueWaitStatus.prototype.getGuideStep = function () {
            return 0;
        };
        ListenDialogQueueWaitStatus.prototype.getCurChildStep = function () {
            return 0;
        };
        ListenDialogQueueWaitStatus.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // 延迟，才能精确判断是否有弹窗队列
                game.GuideManager.timeout(300)
                    .then(function () {
                    _this.checkDialog(resolve);
                });
            });
        };
        ListenDialogQueueWaitStatus.prototype.checkDialog = function (resolve) {
            var _this = this;
            // 当前是否是队列弹窗
            // loghgy("队列ui：",DialogQueueMgr.getInstance().getCudDialogName())
            if (DialogQueueMgr.getInstance().hasDialog()) {
                game.GuideMask.hide();
                Promise.resolve()
                    .then(function () {
                    // 特殊：战斗胜利需要引导点击关闭
                    if (UIMgr.hasStage(UIConst.FightVictory)) {
                        return game.GuideManager.timeout(common.GlobalData.DIALOG_EFFECT_TIME).then(function () {
                            var view = UIMgr.getUIByName(UIConst.FightVictory);
                            game.GuideMask.show(view.btn_close, game.DirectionType.bottom);
                            return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.FightVictory, _this._context);
                        });
                    }
                    else {
                        var uiName = DialogQueueMgr.getInstance().getCudDialogName();
                        // 其他界面等待其关闭
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, uiName, _this._context);
                        // return GuideManager.listenNotification(common.GlobalEvent.DIALOG_CLOSED,null,this._context)
                    }
                }).then(function () {
                    return game.GuideManager.timeout(100);
                }).then(function () {
                    _this.checkDialog(resolve);
                });
            }
            else {
                game.GuideMask.hide();
                this.dispose();
                resolve();
            }
        };
        ListenDialogQueueWaitStatus.prototype.dispose = function () {
            tl3d.ModuleEventManager.removeEventByTarget(this._context);
            tl3d.ModuleEventManager.removeEventByTarget(this);
            this._context = null;
            this._close = false;
        };
        return ListenDialogQueueWaitStatus;
    }());
    game.ListenDialogQueueWaitStatus = ListenDialogQueueWaitStatus;
    /** 加入公会引导 */
    var JoinGuildGuide = /** @class */ (function () {
        function JoinGuildGuide() {
            this._isPass = false; // 是否跳过引导
            this._curStep = 0;
        }
        JoinGuildGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideJoinGuild;
        };
        JoinGuildGuide.prototype.getCurChildStep = function () {
            return this._curStep;
        };
        JoinGuildGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuildMainView, _this)
                    .then(function () {
                    _this._curStep = game.WeakGuideStep.guideJoinGuild;
                    game.GuideWeakManager.setCurExcutingStep(game.WeakGuideStep.guideJoinGuild);
                    return game.GuideManager.timeout(300);
                }).then(function () {
                    loghgy('加入公会引导');
                    game.GuideWeakManager.setCurExcutingStep(game.WeakGuideStep.guideJoinGuild);
                    game.GuideMask.hide();
                    return game.GuideManager.talk(LanMgr.getLan("", 12073));
                }).then(function () {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
                }).then(function () {
                    var view = UIMgr.getUIByName(UIConst.GuildMainView);
                    game.GuideMask.show(view.boxHall, game.DirectionType.bottom, LanMgr.getLan("", 12074), false);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, _this);
                }).then(function () {
                    var view = UIMgr.getUIByName(UIConst.GuildMainView);
                    game.GuideMask.show(view.boxDonate, game.DirectionType.left, LanMgr.getLan("", 12075), false);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, _this);
                }).then(function () {
                    var view = UIMgr.getUIByName(UIConst.GuildMainView);
                    game.GuideMask.show(view.boxShop, game.DirectionType.top, LanMgr.getLan("", 12076), false);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, _this);
                }).then(function () {
                    var view = UIMgr.getUIByName(UIConst.GuildMainView);
                    game.GuideMask.show(view.boxSkill, game.DirectionType.top, LanMgr.getLan("", 12077), false);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideMask, _this);
                }).then(function () {
                    var view = UIMgr.getUIByName(UIConst.GuildMainView);
                    game.GuideMask.show(view.boxCopy, game.DirectionType.right);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CREATED, UIConst.GuildCopyView, _this);
                }).then(function () {
                    game.GuideMask.showWithTransparent();
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.GuildCopyView, _this);
                }).then(function () {
                    return game.GuideManager.guideRequest(0, game.WeakGuideStep.guideJoinGuild);
                }).then(function () {
                    _this._curStep = 0;
                    if (game.GuildCopyModel.getInstance().isAllFinish()) {
                        return true;
                    }
                    else {
                        var view = UIMgr.getUIByName(UIConst.GuildCopyView);
                        game.GuideMask.show(view.btnChallenge, game.DirectionType.top);
                        return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.FightViews, _this);
                    }
                }).then(function () {
                    game.GuideMask.hide();
                    resolve();
                });
            });
        };
        JoinGuildGuide.prototype.dispose = function () {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return JoinGuildGuide;
    }());
    game.JoinGuildGuide = JoinGuildGuide;
    /** 首充引导 */
    var ShouchongGuide = /** @class */ (function () {
        function ShouchongGuide() {
            this._isPass = false; // 是否跳过引导
        }
        ShouchongGuide.prototype.getGuideStep = function () {
            return game.WeakGuideStep.guideShouchong;
        };
        ShouchongGuide.prototype.getCurChildStep = function () {
            return game.WeakGuideStep.guideShouchong;
        };
        ShouchongGuide.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve) {
                if (App.hero.welfare.rechargeSum >= 6) {
                    loghgy("\u517C\u5BB9\uFF1A\u5DF2\u7ECF\u9996\u5145\u8FC7\uFF0C\u76F4\u63A5\u5B8C\u6210\u8BE5\u5F31\u5F15\u5BFC\u6B65\u9AA4" + game.WeakGuideStep.guideShouchong);
                    game.GuideManager.guideRequest(0, game.WeakGuideStep.guideShouchong)
                        .then(function () {
                        _this._isPass = true;
                        resolve();
                    });
                    return;
                }
                game.GuideWeakManager.listenSysOpen(ModuleConst.SHOUCHONG, _this)
                    .then(function () {
                    return game.GuideWeakManager.guideSysOpenToScene(0, _this);
                }).then(function () {
                    game.GuideWeakManager.setCurExcutingStep(game.WeakGuideStep.guideShouchong);
                    game.GuideMask.hide();
                    return game.GuideManager.talk(LanMgr.getLan("", 12078));
                }).then(function () {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
                }).then(function () {
                    return game.GuideManager.timeout(300);
                }).then(function () {
                    var view = UIMgr.getUIByName(UIConst.Main3DView);
                    game.GuideMask.show(view.getActivityBtnIR(ModuleConst.SHOUCHONG), game.DirectionType.bottom);
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_OPENED, UIConst.TupUp_FirstView, _this);
                }).then(function () {
                    return game.GuideManager.guideRequest(0, game.WeakGuideStep.guideShouchong);
                }).then(function () {
                    game.GuideMask.hide();
                    return game.GuideManager.talk(LanMgr.getLan("", 12079));
                }).then(function () {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.GuideTalkView, _this);
                }).then(function () {
                    return game.GuideManager.listenDialog(common.GlobalEvent.DIALOG_CLOSED, UIConst.TupUp_FirstView, _this);
                }).then(function () {
                    game.GuideMask.hide();
                    resolve();
                });
            });
        };
        ShouchongGuide.prototype.dispose = function () {
            tl3d.ModuleEventManager.removeEventByTarget(this);
            if (this._isPass)
                return;
            loghgy('执行dispose方法：触发引导完成后释放', this);
            UIMgr.hideUIByName(UIConst.GuideTalkView);
            game.GuideMask.hide();
            game.GuideWeakManager.setCurExcutingStep(-1);
        };
        return ShouchongGuide;
    }());
    game.ShouchongGuide = ShouchongGuide;
})(game || (game = {}));
