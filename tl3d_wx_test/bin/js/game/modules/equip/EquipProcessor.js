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
/**
* name
*/
var game;
(function (game) {
    var EquipProcessor = /** @class */ (function (_super) {
        __extends(EquipProcessor, _super);
        function EquipProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.EquipModel.getInstance();
            return _this;
        }
        EquipProcessor.prototype.getName = function () {
            return "EquipProcessor";
        };
        EquipProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.EquipEvent(game.EquipEvent.EQUIP_OPERATION),
                new game.EquipEvent(game.EquipEvent.SHOW_EQUIPREFINE_PANEL),
                new game.EquipEvent(game.EquipEvent.SHOW_EQUIP_STH_PANEL),
                new game.EquipEvent(game.EquipEvent.CHANGE_EQUIP_ITEM),
                new game.EquipEvent(game.EquipEvent.SHOW_EQUIP_PANEL),
                new game.EquipEvent(game.EquipEvent.SWITCH_TAB_SUCCESS),
                new game.EquipEvent(game.EquipEvent.CLOSE_JUMP_VIEW),
                new game.EquipEvent(game.EquipEvent.OPEN_EQUIP_PANEL),
                new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE),
            ];
        };
        //处理事件
        EquipProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.EquipEvent) {
                switch ($event.type) {
                    case game.EquipEvent.EQUIP_OPERATION:
                        this.equipOperation($event.data);
                        break;
                    case game.EquipEvent.SHOW_EQUIPREFINE_PANEL:
                        this.showRefinePanel($event.data);
                        break;
                    case game.EquipEvent.SHOW_EQUIP_STH_PANEL:
                        this.showStrengthPanel($event.data);
                        break;
                    case game.EquipEvent.SHOW_EQUIP_PANEL:
                        this.showPanel($event.data);
                        break;
                    case game.EquipEvent.CLOSE_JUMP_VIEW:
                        this.jumpview.close();
                        break;
                    case game.EquipEvent.CHANGE_EQUIP_ITEM:
                        if (UIMgr.hasStage(UIConst.EquipView))
                            this.equipview.refreshData($event.data);
                        break;
                    case game.EquipEvent.OPEN_EQUIP_PANEL:
                        this.openShipin($event.data);
                        break;
                }
            }
        };
        //装备一系列操作
        EquipProcessor.prototype.equipOperation = function (data) {
            switch (data[1]) {
                case EquipOperation.RESOLVE: /**分解 */
                    this.onProtocolRecycle(data[0]);
                    break;
                case EquipOperation.WEAR: /**更换 */
                case EquipOperation.CHANGE: /**穿戴 */
                    this.onProtocolWearOrChange(data[0]);
                    break;
                case EquipOperation.DISCHARGE: /**卸下 */
                    this.onProtocolDischarge(data[0]);
                    break;
                case EquipOperation.STRENGTH: /**强化 */
                    this.onProtocolStrength(data[0]);
                    break;
                case EquipOperation.REFINE: /**精炼 */
                    this.onProtocolRefine(data[0]);
                    break;
                case EquipOperation.ROOT_EQUIP_CHANGE: /**一键操作 */
                    this.onProtocolQuick(data[0], data[2]);
                    break;
                case EquipOperation.SWITCH: /**切换显示装备 */
                    this.switch(data[0]);
                    break;
            }
        };
        EquipProcessor.prototype.openShipin = function (pos) {
            UIMgr.showUI(UIConst.EquipChangeView, pos);
        };
        /**打开精炼界面 */
        EquipProcessor.prototype.showRefinePanel = function (data) {
            if (!App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN)) {
                showToast(this._model.getRefineOpenData().prompt);
                return;
            }
            if (!data.isExsitGod()) {
                showToast(LanMgr.getLan("", 10293));
                return;
            }
            UIMgr.showUI(UIConst.Equip_Refine, data);
        };
        /**打开强化界面 */
        EquipProcessor.prototype.showStrengthPanel = function (data) {
            if (!App.IsSysOpen(ModuleConst.EQUIP_STRENGTH)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIP_STRENGTH);
                showToast(tbData.prompt);
                return;
            }
            if (!data.isExsitGod()) {
                showToast(LanMgr.getLan("", 10290));
                return;
            }
            UIMgr.showUI(UIConst.Equip_StrengthView, data);
        };
        /**装备卸下 */
        EquipProcessor.prototype.onProtocolDischarge = function (data) {
            var _this = this;
            var args = {};
            args[Protocol.game_equip_discharge.args.equipKey] = data.uuid;
            PLC.request(Protocol.game_equip_discharge, args, function ($data, msg) {
                if (!$data)
                    return;
                if (_this.viewIsShow(UIConst.EquipChangeView))
                    _this.shipinview.updateItem(data);
            });
        };
        /**装备分解 */
        EquipProcessor.prototype.onProtocolRecycle = function (data) {
            UIMgr.showUI(UIConst.Equip_Recycle, [data]);
        };
        /**穿戴/更换装备 */
        EquipProcessor.prototype.onProtocolWearOrChange = function (data) {
            var god = this._model.curShowGod;
            var lastSuit = god.getMaxQualityAnNum();
            var args = {};
            args[Protocol.game_equip_wear.args.godId] = god.uuid;
            args[Protocol.game_equip_wear.args.equipKey] = data.uuid;
            PLC.request(Protocol.game_equip_wear, args, function ($data, msg) {
                if (!$data)
                    return;
                UIMgr.hideUIByName(UIConst.EquipChangeView);
                UIMgr.hideUIByName(UIConst.Equip_Recycle);
                UIUtil.checkEquipSuitLvup(lastSuit, god.getMaxQualityAnNum());
                dispatchEvt(new game.EquipEvent(game.EquipEvent.WEAR_EQUIPMENT_SUCCESS));
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    var view = UIMgr.getUIByName(UIConst.EquipView);
                    if (view.list_tab.selectedIndex == EquipTabType.baoshi) {
                        view.viewBaoshi.selectedEquip(data.uuid);
                    }
                }
            });
        };
        /**装备强化 */
        EquipProcessor.prototype.onProtocolStrength = function (info) {
            var _this = this;
            var equipVo = App.hero.getEquipByuuid(info.uuid);
            var godVo = App.hero.getGodVoById(equipVo.godId);
            if (!godVo) {
                showToast(LanMgr.getLan('', 10290));
                return;
            }
            var lastStnLv = godVo.countMasterLevel();
            if (this._model.isCanSth(equipVo, null, true)) {
                var args = {};
                args[Protocol.game_equip_strength.args.type] = info.type;
                args[Protocol.game_equip_strength.args.equipKey] = info.uuid;
                PLC.request(Protocol.game_equip_strength, args, function ($data, msg) {
                    if (!$data)
                        return;
                    var curLv = godVo.countMasterLevel();
                    if (curLv > lastStnLv) {
                        UIUtil.showEquipLvupView(0, curLv);
                    }
                    _this.setView($data.targetEquips);
                    AudioMgr.playSound("sound/equstrength.mp3");
                    dispatchEvt(new game.EquipEvent(game.EquipEvent.EQUIP_STRENGTH_SUCCESS));
                });
            }
        };
        /**装备精炼 */
        EquipProcessor.prototype.onProtocolRefine = function (info) {
            var _this = this;
            var equipVo = App.hero.getEquipByuuid(info.uuid);
            var godVo = App.hero.getGodVoById(equipVo.godId);
            if (!godVo) {
                showToast(LanMgr.getLan('', 10293));
                return;
            }
            if (this._model.isCanRefine(equipVo, null, true)) {
                var lastRefLv_1 = godVo.refineMasterLevel();
                var args = {};
                args[Protocol.game_equip_refine.args.equipKey] = info.uuid;
                args[Protocol.game_equip_refine.args.refNum] = info.refNum;
                PLC.request(Protocol.game_equip_refine, args, function ($data, msg) {
                    if (!$data)
                        return;
                    var curLv = godVo.refineMasterLevel();
                    if (curLv > lastRefLv_1) {
                        UIUtil.showEquipLvupView(1, curLv);
                    }
                    _this.setView($data.targetEquips);
                    dispatchEvt(new game.EquipEvent(game.EquipEvent.DEFINE_EQUIPMENT_SUCCESS));
                });
            }
        };
        /**一键装备/强化 */
        EquipProcessor.prototype.onProtocolQuick = function (type, isFive) {
            var _this = this;
            var model = this._model;
            var args = {};
            var godVo = model.curShowGod;
            if (type == game.EquipRoot.TakeOff) {
                args[Protocol.game_equip_quickDischarge.args.godId] = godVo.uuid;
                PLC.request(Protocol.game_equip_quickDischarge, args, function ($data, msg) {
                });
            }
            else if (type == game.EquipRoot.Refine) {
                if (model.isCanRefine(null, godVo, true)) {
                    var lastRefLv_2 = godVo.refineMasterLevel();
                    var lowSlot_1 = godVo.getLowestEquipSlots(EquipTabType.refine);
                    args[Protocol.game_equip_quickRefine.args.godId] = godVo.uuid;
                    args[Protocol.game_equip_quickRefine.args.type] = isFive ? iface.tb_prop.equipUpgradeTypeKey.five : iface.tb_prop.equipUpgradeTypeKey.one;
                    PLC.request(Protocol.game_equip_quickRefine, args, function ($data, msg) {
                        var _a;
                        if ($data) {
                            _this.equipview.viewEquip.list_equips.refresh();
                            (_a = _this.equipview.viewEquip).playEffect.apply(_a, lowSlot_1);
                            var curLv = godVo.refineMasterLevel();
                            if (curLv > lastRefLv_2) {
                                UIUtil.showEquipLvupView(1, curLv);
                            }
                            dispatchEvt(new game.EquipEvent(game.EquipEvent.ONEKE_REFINE_SUCCESS));
                        }
                    });
                }
            }
            else if (type == game.EquipRoot.Strength) {
                if (model.isCanSth(null, godVo, true)) {
                    var lastStnLv_1 = godVo.countMasterLevel();
                    var lowSlot_2 = godVo.getLowestEquipSlots(EquipTabType.strength);
                    args[Protocol.game_equip_quickStth.args.godId] = godVo.uuid;
                    args[Protocol.game_equip_quickStth.args.type] = isFive ? iface.tb_prop.equipUpgradeTypeKey.five : iface.tb_prop.equipUpgradeTypeKey.one;
                    PLC.request(Protocol.game_equip_quickStth, args, function ($data, msg) {
                        var _a;
                        if ($data) {
                            _this.equipview.viewEquip.list_equips.refresh();
                            (_a = _this.equipview.viewEquip).playEffect.apply(_a, lowSlot_2);
                            var curLv = godVo.countMasterLevel();
                            if (curLv > lastStnLv_1) {
                                UIUtil.showEquipLvupView(0, curLv);
                            }
                            dispatchEvt(new game.EquipEvent(game.EquipEvent.ONEKE_STRENGTH_SUCCESS));
                        }
                    });
                }
            }
            else if (type == game.EquipRoot.Wear) {
                var lastSuit_1 = godVo.getMaxQualityAnNum();
                var equips = model.equipQiuck(godVo);
                var uuids = equips.map(function (vo) { return vo ? vo.uuid : ""; });
                args[Protocol.game_equip_quickWear.args.godId] = godVo.uuid;
                args[Protocol.game_equip_quickWear.args.equipKeys] = uuids;
                PLC.request(Protocol.game_equip_quickWear, args, function ($data, msg) {
                    if (!$data)
                        return;
                    UIUtil.checkEquipSuitLvup(lastSuit_1, godVo.getMaxQualityAnNum());
                    dispatchEvt(new game.EquipEvent(game.EquipEvent.ONEKE_WEAR_SUCCESS));
                });
            }
        };
        /**切换显示的装备 */
        EquipProcessor.prototype.switch = function (data) {
            var model = this._model;
            var listdata = this.equipview.viewEquip.list_equips.array;
            if (data.type == -1) {
                for (var i = Number(data.equip.slot - 1); i >= 0; i--) {
                    if (listdata[i] && listdata[i].slot != data.equip.slot) {
                        model.curPointEquipData = listdata[i];
                        this.setView(listdata[i], 1);
                        break;
                    }
                }
            }
            else {
                for (var i = Number(data.equip.slot - 1); i < 6; i++) {
                    if (listdata[i] && listdata[i].slot != data.equip.slot) {
                        model.curPointEquipData = listdata[i];
                        this.setView(listdata[i], 1);
                        break;
                    }
                }
            }
        };
        EquipProcessor.prototype.setView = function (data, type) {
            if (type === void 0) { type = 0; }
            var vo = data;
            if (type == 0) {
                var key = getobjectFirstAttribute(data);
                vo = new EquipItemVo(data[key]);
                vo.uuid = key;
            }
            if (this.viewIsShow(UIConst.EquipChangeView))
                this.shipinview.updateItem(vo);
            if (this.viewIsShow(UIConst.Equip_Refine))
                this.EquipRefine.initView(vo);
            if (this.viewIsShow(UIConst.Equip_StrengthView))
                this.EquipStrengthen.initView(vo);
        };
        /**
         * 打开面板
         */
        EquipProcessor.prototype.showPanel = function (data) {
            if (!App.IsSysOpen(ModuleConst.EQUIPMENT)) {
                var tbData = tb.TB_sys_open.get_TB_sys_openById(ModuleConst.EQUIPMENT);
                showToast(tbData.prompt);
                return;
            }
            var flag = UIMgr.hasStage(UIConst.EquipView);
            if (!flag)
                UIMgr.showUI(UIConst.EquipView, data);
        };
        /**界面是否处于显示状态 */
        EquipProcessor.prototype.viewIsShow = function (uiConst) {
            return UIMgr.hasStage(uiConst);
        };
        Object.defineProperty(EquipProcessor.prototype, "EquipStrengthen", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Equip_StrengthView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipProcessor.prototype, "EquipRefine", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Equip_Refine);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipProcessor.prototype, "shipinview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.EquipChangeView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipProcessor.prototype, "shenlingview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.God_MainView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipProcessor.prototype, "equipview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.EquipView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EquipProcessor.prototype, "jumpview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Equip_JumpView);
            },
            enumerable: true,
            configurable: true
        });
        return EquipProcessor;
    }(tl3d.Processor));
    game.EquipProcessor = EquipProcessor;
})(game || (game = {}));
