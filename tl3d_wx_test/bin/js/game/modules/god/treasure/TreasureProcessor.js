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
var game;
(function (game) {
    var TreasureEvent = /** @class */ (function (_super) {
        __extends(TreasureEvent, _super);
        function TreasureEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // ----------- 界面显示 -----------
        /** 打开圣物选择界面 */
        TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW = "SHOW_CHOOSE_TREASURE_VIEW";
        /** 打开强化界面 */
        TreasureEvent.SHOW_STRENGTH_VIEW = "SHOW_STRENGTH_VIEW";
        /** 打开升星界面 */
        TreasureEvent.SHOW_STARUP_VIEW = "SHOW_STARUP_VIEW";
        /** 星级预览 */
        TreasureEvent.SHOW_STAR_ATTR_PREVIEW = "SHOW_STAR_ATTR_PREVIEW";
        /** 圣物图鉴 */
        TreasureEvent.SHOW_TUJIAN_VIEW = "SHOW_TUJIAN_VIEW";
        /** 重生界面 */
        TreasureEvent.SHOW_REBIRTH_VIEW = "SHOW_REBIRTH_VIEW";
        // ----------- 后端数据更新 -----------
        /** 更新圣物数据 */
        TreasureEvent.UPDATE_TREASURE_DATA = "UPDATE_TREASURE_DATA";
        /** 新增圣物 */
        TreasureEvent.ADD_TREASURE = "ADD_TREASURE";
        /** 删除圣物 */
        TreasureEvent.DEL_TREASURE = "DEL_TREASURE";
        /** 修改圣物 */
        TreasureEvent.MODIFY_TREASURE = "MODIFY_TREASURE";
        /** 修改神灵穿戴的圣物 */
        TreasureEvent.MODIFY_GOD_TREASURE = "MODIFY_GOD_TREASURE";
        /** 更新圣物数据 */
        TreasureEvent.MODIFY_TARGET_TREASURE = "MODIFY_TARGET_TREASURE";
        // ----------- 前端操作 -----------
        /** 圣物操作 */
        TreasureEvent.TREASURE_OPERATION = "TREASURE_OPERATION";
        /**　选择圣物 -- 选择重生的圣物 */
        TreasureEvent.CHOOSE_TREASURE = "CHOOSE_TREASURE";
        /** 穿戴成功 */
        TreasureEvent.WEAR_SUCCESS = "WEAR_TREASURE_SUCCESS";
        /** 强化成功 */
        TreasureEvent.STRENGTH_SUCCESS = "STRENGTH_TREASURE_SUCCESS";
        /** 选择强化材料圣物 */
        TreasureEvent.SELECT_STRENGTH_TREASURE = "SELECT_STRENGTH_TREASURE";
        return TreasureEvent;
    }(tl3d.BaseEvent));
    game.TreasureEvent = TreasureEvent;
    var TreasureOperation;
    (function (TreasureOperation) {
        TreasureOperation[TreasureOperation["wear"] = 1] = "wear";
        TreasureOperation[TreasureOperation["takeoff"] = 2] = "takeoff";
        TreasureOperation[TreasureOperation["strength"] = 3] = "strength";
        TreasureOperation[TreasureOperation["starup"] = 4] = "starup";
        TreasureOperation[TreasureOperation["rebirth"] = 5] = "rebirth";
    })(TreasureOperation = game.TreasureOperation || (game.TreasureOperation = {}));
    var TreasureProcessor = /** @class */ (function (_super) {
        __extends(TreasureProcessor, _super);
        function TreasureProcessor() {
            return _super.call(this) || this;
        }
        TreasureProcessor.prototype.getName = function () {
            return "TreasureProcessor";
        };
        TreasureProcessor.prototype.listenModuleEvents = function () {
            return [
                new TreasureEvent(TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_STRENGTH_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_STARUP_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_STAR_ATTR_PREVIEW),
                new TreasureEvent(TreasureEvent.SHOW_TUJIAN_VIEW),
                new TreasureEvent(TreasureEvent.SHOW_REBIRTH_VIEW),
                new TreasureEvent(TreasureEvent.MODIFY_GOD_TREASURE),
                new TreasureEvent(TreasureEvent.MODIFY_TARGET_TREASURE),
                new TreasureEvent(TreasureEvent.DEL_TREASURE),
                new TreasureEvent(TreasureEvent.ADD_TREASURE),
                new TreasureEvent(TreasureEvent.TREASURE_OPERATION),
                new TreasureEvent(TreasureEvent.CHOOSE_TREASURE),
            ];
        };
        //处理事件
        TreasureProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TreasureEvent) {
                switch ($event.type) {
                    case TreasureEvent.SHOW_STRENGTH_VIEW:
                        this.showStrengthView($event.data);
                        break;
                    case TreasureEvent.SHOW_STARUP_VIEW:
                        this.showStarupView($event.data);
                        break;
                    case TreasureEvent.SHOW_STAR_ATTR_PREVIEW:
                        this.showStarAttrPreview($event.data);
                        break;
                    case TreasureEvent.SHOW_CHOOSE_TREASURE_VIEW:
                        this.showChooseTreasure($event.data);
                        break;
                    case TreasureEvent.SHOW_TUJIAN_VIEW:
                        this.showTujianView();
                        break;
                    case TreasureEvent.SHOW_REBIRTH_VIEW:
                        this.showRebirthView();
                        break;
                    case TreasureEvent.MODIFY_GOD_TREASURE:
                    case TreasureEvent.MODIFY_TARGET_TREASURE:
                        this.refreshGodTreasure($event.data);
                        break;
                    case TreasureEvent.ADD_TREASURE:
                    case TreasureEvent.DEL_TREASURE:
                        this.delTreasure();
                        break;
                    case TreasureEvent.TREASURE_OPERATION:
                        this.treasureOperation($event.data);
                        break;
                    case TreasureEvent.CHOOSE_TREASURE:
                        this.chooseTreasure($event.data);
                        break;
                }
            }
        };
        /** 打开强化界面 */
        TreasureProcessor.prototype.showStrengthView = function (vo) {
            if (vo.isTopStrengthLv()) {
                showToast(LanMgr.getLan("", 10345));
                return;
            }
            UIMgr.showUI(UIConst.TreasureStrengthView, vo);
        };
        /**打开升星界面 */
        TreasureProcessor.prototype.showStarupView = function (vo) {
            if (vo.isForbitStarup()) {
                showToast(LanMgr.getLan("", 10362));
                return;
            }
            if (vo.isTopStarLv()) {
                showToast(LanMgr.getLan("", 10345));
                return;
            }
            UIMgr.showUI(UIConst.TreasureStarupView, vo);
        };
        /** 显示星级属性预览 */
        TreasureProcessor.prototype.showStarAttrPreview = function (vo) {
            if (vo) {
                UIMgr.showUI(UIConst.TreasureStarAttrPreview, vo);
            }
        };
        /** 显示图鉴界面 */
        TreasureProcessor.prototype.showTujianView = function () {
            UIMgr.showUI(UIConst.TreasureTujianView);
        };
        /** 显示重生界面 */
        TreasureProcessor.prototype.showRebirthView = function () {
            UIMgr.showUI(UIConst.TreasureRebirthView);
        };
        /** 显示选择圣物界面 */
        TreasureProcessor.prototype.showChooseTreasure = function (args) {
            var openType = args[0];
            var treasureVo = args[1];
            var godVo = args[2];
            // 选择圣物穿戴或者替换
            if (openType == game.ChooseTreasureOpenType.wear || openType == game.ChooseTreasureOpenType.change) {
                if (!game.TreasureUtil.hasNotWearTreasures()) {
                    showToast(LanMgr.getLan("", 10363));
                    return;
                }
            }
            // 选择圣物重生
            if (openType == game.ChooseTreasureOpenType.rebirth) {
                if (game.TreasureModel.getInstance().getRebirthTreasureList().length == 0) {
                    showToast(LanMgr.getLan("", 10364));
                    return;
                }
            }
            UIMgr.showUI(UIConst.ChooseTreasureView, args);
        };
        /** 更新神灵的圣物 */
        TreasureProcessor.prototype.refreshGodTreasure = function (godIds) {
            if (UIMgr.hasStage(UIConst.God_MainView)) {
                var view = UIMgr.getUIByName(UIConst.God_MainView);
                view.godView.treasureUI.refreshView();
                // 更新信息界面属性
                if (godIds && view.list_tab.selectedIndex == ShenlingTabType.info && view.curVo && godIds.indexOf(view.curVo.uuid) != -1) {
                    view.godView.refreshCurRole();
                }
            }
            if (UIMgr.hasStage(UIConst.God_GodCultureView)) {
                var view = UIMgr.getUIByName(UIConst.God_GodCultureView);
                view.godView.treasureUI.refreshView();
            }
            if (UIMgr.hasStage(UIConst.BagView)) {
                var view = UIMgr.getUIByName(UIConst.BagView);
                view.refreshTreasure(false);
            }
        };
        /** 删除圣物 */
        TreasureProcessor.prototype.delTreasure = function () {
            if (UIMgr.hasStage(UIConst.BagView)) {
                var view = UIMgr.getUIByName(UIConst.BagView);
                view.refreshTreasure(true);
            }
        };
        /** 圣物tips上选择该圣物 */
        TreasureProcessor.prototype.chooseTreasure = function (vo) {
            UIMgr.hideUIByName(UIConst.ChooseTreasureView);
            if (UIMgr.hasStage(UIConst.TreasureRebirthView)) {
                var view = UIMgr.getUIByName(UIConst.TreasureRebirthView);
                view.setTreasureItem(vo);
            }
        };
        /** 圣物操作 */
        TreasureProcessor.prototype.treasureOperation = function (params) {
            var type = params[0];
            var dataAry = params[1];
            if (type == TreasureOperation.wear) {
                this.wearTreasure(dataAry);
            }
            else if (type == TreasureOperation.takeoff) {
                this.takeoff(dataAry);
            }
            else if (type == TreasureOperation.strength) {
                this.strength(dataAry);
            }
            else if (type == TreasureOperation.starup) {
                this.starup(dataAry);
            }
            else if (type == TreasureOperation.rebirth) {
                this.rebirth(dataAry);
            }
        };
        /** 穿戴圣物 */
        TreasureProcessor.prototype.wearTreasure = function (ary) {
            var godVo = ary[0];
            var treasureVo = ary[1];
            var args = {};
            args[Protocol.game_treasure_wearTreasure.args.godId] = godVo.uuid;
            args[Protocol.game_treasure_wearTreasure.args.treasureKey] = treasureVo.uuid;
            PLC.request(Protocol.game_treasure_wearTreasure, args, function (rdata) {
                if (!rdata)
                    return;
                UIMgr.hideUIByName(UIConst.ChooseTreasureView);
                dispatchEvt(new TreasureEvent(TreasureEvent.WEAR_SUCCESS));
            });
        };
        /** 脱下圣物 */
        TreasureProcessor.prototype.takeoff = function (ary) {
            var treasureVo = ary[0];
            var args = {};
            args[Protocol.game_treasure_dischargeTreasure.args.treasureKey] = treasureVo.uuid;
            PLC.request(Protocol.game_treasure_dischargeTreasure, args, function (rdata) {
                if (!rdata)
                    return;
            });
        };
        /** 强化 */
        TreasureProcessor.prototype.strength = function (ary) {
            var treasureVo = ary[0];
            var chooseList = ary[1];
            var bagIds = [];
            var treasureIds = [];
            for (var i = 0; i < chooseList.length; i++) {
                var vo = chooseList[i];
                if (vo instanceof TreasureItemVo) {
                    treasureIds.push(vo.uuid);
                }
                else if (vo instanceof ItemVo) {
                    bagIds.push(vo.id);
                }
            }
            var args = {};
            args[Protocol.game_treasure_strengthTreasure.args.treasureKey] = treasureVo.uuid;
            args[Protocol.game_treasure_strengthTreasure.args.materialArrs] = treasureIds;
            args[Protocol.game_treasure_strengthTreasure.args.itemIds] = bagIds;
            PLC.request(Protocol.game_treasure_strengthTreasure, args, function (rdata) {
                if (!rdata)
                    return;
                if (UIMgr.hasStage(UIConst.TreasureStrengthView)) {
                    var view = UIMgr.getUIByName(UIConst.TreasureStrengthView);
                    view.updateView();
                }
                dispatchEvt(new TreasureEvent(TreasureEvent.STRENGTH_SUCCESS));
            });
        };
        /** 升星 */
        TreasureProcessor.prototype.starup = function (ary) {
            var treasureVo = ary[0];
            var chooseList = ary[1];
            if (treasureVo.isForbitStarup()) {
                showToast(LanMgr.getLan("", 10362));
                return;
            }
            if (treasureVo.isTopStarLv()) {
                showToast(LanMgr.getLan("", 10345));
                return;
            }
            var materialArrs = [];
            var isEnough = chooseList.every(function (vo) {
                return vo.isEnough();
            });
            if (!isEnough) {
                showToast(LanMgr.getLan("", 12000));
                return;
            }
            for (var i = 0; i < chooseList.length; i++) {
                materialArrs.push(chooseList[i].getFormatData());
            }
            var args = {};
            args[Protocol.game_treasure_riseStarTreasure.args.treasureKey] = treasureVo.uuid;
            args[Protocol.game_treasure_riseStarTreasure.args.materialArrs] = materialArrs;
            PLC.request(Protocol.game_treasure_riseStarTreasure, args, function ($data, $msg) {
                if (!$data)
                    return;
                if (UIMgr.hasStage(UIConst.TreasureStarupView)) {
                    var view = UIMgr.getUIByName(UIConst.TreasureStarupView);
                    view.initView();
                }
            });
        };
        /** 重生 */
        TreasureProcessor.prototype.rebirth = function (ary) {
            var treasureVo = ary[0];
            if (!treasureVo.isCanRebirth()) {
                showToast(LanMgr.getLan("", 10364));
                return;
            }
            var cost = tb.TB_treasure_set.getSet().recast_cost;
            for (var _i = 0, cost_1 = cost; _i < cost_1.length; _i++) {
                var ary_1 = cost_1[_i];
                if (UIUtil.checkNotEnough(ary_1[0], ary_1[1])) {
                    return;
                }
            }
            var args = {};
            args[Protocol.game_treasure_recastTreasure.args.treasureKey] = treasureVo.uuid;
            PLC.request(Protocol.game_treasure_recastTreasure, args, function ($data, $msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                if (UIMgr.hasStage(UIConst.TreasureRebirthView)) {
                    var view = UIMgr.getUIByName(UIConst.TreasureRebirthView);
                    view.initView();
                }
                if (UIMgr.hasStage(UIConst.BagView)) {
                    var view = UIMgr.getUIByName(UIConst.BagView);
                    view.refreshTreasure(true);
                }
            });
        };
        return TreasureProcessor;
    }(tl3d.Processor));
    game.TreasureProcessor = TreasureProcessor;
})(game || (game = {}));
