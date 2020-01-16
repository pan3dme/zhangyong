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
    var GemstoneEvent = /** @class */ (function (_super) {
        __extends(GemstoneEvent, _super);
        function GemstoneEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // ---------- 后端数据响应更新 ------------
        /** 初始化宝石数据 */
        GemstoneEvent.INIT_GEM_DATA = "INIT_GEM_DATE";
        /** 新增宝石 */
        GemstoneEvent.ADD_GEMTONE = "ADD_GEMTONE";
        /** 删除宝石 */
        GemstoneEvent.DEL_GEMTONE = "DEL_GEMTONE";
        /** 修改宝石 */
        GemstoneEvent.MODIFY_GEMTONE = "MODIFY_GEMTONE";
        /** 修改装备镶嵌的宝石 */
        GemstoneEvent.MODIFY_GOD_GEMTONE = "MODIFY_EQUIP_GEMTONE";
        /** 更新宝石数据 */
        GemstoneEvent.MODIFY_TARGET_GEMTONE = "MODIFY_TARGET_GEMTONE";
        // ---------- 界面操作 ------------
        /** 展示替换界面 */
        GemstoneEvent.SHOW_REPLACE_GEM_VIEW = "SHOW_REPLACE_GEM_VIEW";
        /** 展示合成界面 */
        GemstoneEvent.SHOW_COMPOUND_VIEW = "SHOW_COMPOUND_VIEW";
        // ---------- 客户端请求 ------------
        /** 镶嵌宝石 */
        GemstoneEvent.WEAR_GEMSTONE = "WEAR_GEMSTONE";
        GemstoneEvent.WEAR_SUCCESS = "WEAR_SUCCESS";
        /** 一键卸下 */
        GemstoneEvent.ONE_KEY_UNLOAD = "ONE_KEY_UNLOAD";
        /** 一键镶嵌 */
        GemstoneEvent.ONE_KEY_WEAR = "ONE_KEY_WEAR";
        GemstoneEvent.ONE_KEY_WEAR_SUCCESS = "ONE_KEY_WEAR_SUCCESS";
        /** 合成宝石 */
        GemstoneEvent.COMPOUND_GEMSTONE = "COMPOUND_GEMSTONE";
        /** 一键合成宝石 */
        GemstoneEvent.ONEKEY_COMPOUND_GEM = "ONEKEY_COMPOUND_GEM";
        return GemstoneEvent;
    }(tl3d.BaseEvent));
    game.GemstoneEvent = GemstoneEvent;
    var GemstoneProcessor = /** @class */ (function (_super) {
        __extends(GemstoneProcessor, _super);
        function GemstoneProcessor() {
            return _super.call(this) || this;
        }
        GemstoneProcessor.prototype.getName = function () {
            return "GemstoneProcessor";
        };
        GemstoneProcessor.prototype.listenModuleEvents = function () {
            return [
                new GemstoneEvent(GemstoneEvent.SHOW_REPLACE_GEM_VIEW),
                new GemstoneEvent(GemstoneEvent.SHOW_COMPOUND_VIEW),
                new GemstoneEvent(GemstoneEvent.WEAR_GEMSTONE),
                new GemstoneEvent(GemstoneEvent.ONE_KEY_UNLOAD),
                new GemstoneEvent(GemstoneEvent.ONE_KEY_WEAR),
                new GemstoneEvent(GemstoneEvent.COMPOUND_GEMSTONE),
                new GemstoneEvent(GemstoneEvent.ONEKEY_COMPOUND_GEM),
                new GemstoneEvent(GemstoneEvent.MODIFY_GOD_GEMTONE),
                new GemstoneEvent(GemstoneEvent.MODIFY_TARGET_GEMTONE),
            ];
        };
        //处理事件
        GemstoneProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof GemstoneEvent) {
                switch (event.type) {
                    case GemstoneEvent.SHOW_REPLACE_GEM_VIEW:
                        this.showReplaceView(event.data);
                        break;
                    case GemstoneEvent.SHOW_COMPOUND_VIEW:
                        this.showCompoundView();
                        break;
                    case GemstoneEvent.WEAR_GEMSTONE:
                        this.wearGemstone(event.data);
                        break;
                    case GemstoneEvent.ONE_KEY_UNLOAD:
                        this.oneKeyUnload(event.data);
                        break;
                    case GemstoneEvent.ONE_KEY_WEAR:
                        this.oneKeyWear(event.data);
                        break;
                    case GemstoneEvent.COMPOUND_GEMSTONE:
                        this.compoundGem(event.data);
                        break;
                    case GemstoneEvent.ONEKEY_COMPOUND_GEM:
                        this.oneKeyCompound(event.data);
                        break;
                    case GemstoneEvent.MODIFY_GOD_GEMTONE:
                        this.modifyEquipGem(event.data);
                        break;
                    case GemstoneEvent.MODIFY_TARGET_GEMTONE:
                        this.modifyGemData(event.data);
                        break;
                }
            }
        };
        /** 展示替换界面 */
        GemstoneProcessor.prototype.showReplaceView = function (info) {
            if (info) {
                UIMgr.showUI(UIConst.GemstoneReplaceView, info);
            }
        };
        /** 展示合成界面 */
        GemstoneProcessor.prototype.showCompoundView = function () {
            UIMgr.showUI(UIConst.GemstoneCompoundView);
        };
        /** 更新装备身上的宝石 */
        GemstoneProcessor.prototype.modifyEquipGem = function (info) {
            if (UIMgr.hasStage(UIConst.EquipView)) {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                if (view.list_tab.selectedIndex == EquipTabType.baoshi) {
                    var baoshiUI = view.viewBaoshi;
                    baoshiUI.list_equip.refresh();
                    baoshiUI.renderEquipInfo();
                }
            }
        };
        /** 更新宝石数据 */
        GemstoneProcessor.prototype.modifyGemData = function (info) {
            if (UIMgr.hasStage(UIConst.EquipView)) {
                var view = UIMgr.getUIByName(UIConst.EquipView);
                if (view.list_tab.selectedIndex == EquipTabType.baoshi) {
                    var baoshiUI = view.viewBaoshi;
                    baoshiUI.renderEquipInfo();
                }
            }
        };
        /** 镶嵌宝石 */
        GemstoneProcessor.prototype.wearGemstone = function (info) {
            if (!info)
                return;
            var args = {};
            args[Protocol.game_gemstone_wearGemstone.args.godId] = Number(info.godVo.uuid);
            args[Protocol.game_gemstone_wearGemstone.args.gemKey] = info.gemVo.uuid;
            args[Protocol.game_gemstone_wearGemstone.args.slot] = info.slot;
            PLC.request(Protocol.game_gemstone_wearGemstone, args, function (rdata) {
                if (!rdata)
                    return;
                UIMgr.hideUIByName(UIConst.GemstoneReplaceView);
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    var view = UIMgr.getUIByName(UIConst.EquipView);
                    if (view.list_tab.selectedIndex == EquipTabType.baoshi) {
                        var baoshiUI = view.viewBaoshi;
                        baoshiUI.playAnim([info.gemVo.gemType]);
                    }
                }
                dispatchEvt(new GemstoneEvent(GemstoneEvent.WEAR_SUCCESS));
            });
        };
        /** 一键卸下 */
        GemstoneProcessor.prototype.oneKeyUnload = function (info) {
            if (!info)
                return;
            var args = {};
            args[Protocol.game_gemstone_oneKeyDischargeGemstone.args.godId] = Number(info.uuid);
            PLC.request(Protocol.game_gemstone_oneKeyDischargeGemstone, args, function (rdata) {
                if (!rdata)
                    return;
            });
        };
        /** 一键镶嵌 */
        GemstoneProcessor.prototype.oneKeyWear = function (info) {
            if (!info)
                return;
            var gemDic = game.GemstoneUtils.getCanWearGemList(info);
            if (Object.keys(gemDic).length == 0) {
                showToast(LanMgr.getLan('', 10294));
                return;
            }
            var changeTypes = [];
            var gemKeys = {};
            for (var slot in gemDic) {
                gemKeys[slot] = gemDic[slot].uuid;
            }
            var args = {};
            args[Protocol.game_gemstone_oneKeyWearGemstone.args.godId] = info.uuid;
            args[Protocol.game_gemstone_oneKeyWearGemstone.args.gemKeys] = gemKeys;
            PLC.request(Protocol.game_gemstone_oneKeyWearGemstone, args, function (rdata) {
                if (!rdata)
                    return;
                if (UIMgr.hasStage(UIConst.EquipView)) {
                    var view = UIMgr.getUIByName(UIConst.EquipView);
                    if (view.list_tab.selectedIndex == EquipTabType.baoshi) {
                        var baoshiUI = view.viewBaoshi;
                        baoshiUI.playAnim(changeTypes);
                    }
                }
                dispatchEvt(new GemstoneEvent(GemstoneEvent.ONE_KEY_WEAR_SUCCESS));
            });
        };
        /** 宝石合成 */
        GemstoneProcessor.prototype.compoundGem = function (dataAry) {
            if (!dataAry)
                return;
            var tbid = dataAry[0];
            var compNum = dataAry[1];
            var compoundObj = game.GemstoneUtils.getCompoundObjById(tbid);
            if (!compoundObj) {
                showToast(LanMgr.getLan('', 10295, tbid));
                return;
            }
            var maxNum = game.GemstoneUtils.getCompoundNum(tbid);
            if (compNum > maxNum) {
                showToast(LanMgr.getLan('', 10296, compNum * compoundObj.materialNum));
                return;
            }
            var args = {};
            args[Protocol.game_gemstone_gemstoneCompound.args.id] = compoundObj.ID;
            args[Protocol.game_gemstone_gemstoneCompound.args.num] = compNum;
            PLC.request(Protocol.game_gemstone_gemstoneCompound, args, function (rdata) {
                if (!rdata)
                    return;
                UIMgr.hideUIByName(UIConst.SingleCompoundView);
                if (UIMgr.hasStage(UIConst.GemstoneCompoundView)) {
                    var view = UIMgr.getUIByName(UIConst.GemstoneCompoundView);
                    view.refreshView();
                }
                UIUtil.showRewardView(rdata.commonData);
            });
        };
        /** 一键合成 */
        GemstoneProcessor.prototype.oneKeyCompound = function (dataAry) {
            var level = dataAry[0] || game.GemstoneModel.max_gem_lv;
            var type = dataAry[1] || 0;
            var itemVoList = dataAry[2];
            if (!game.GemstoneUtils.isCanCompound(type, level)) {
                showToast(LanMgr.getLan('', 10297));
                return;
            }
            var args = {};
            args[Protocol.game_gemstone_oneKeyGemstoneCompound.args.level] = level;
            args[Protocol.game_gemstone_oneKeyGemstoneCompound.args.type] = type;
            PLC.request(Protocol.game_gemstone_oneKeyGemstoneCompound, args, function (rdata) {
                if (!rdata)
                    return;
                if (UIMgr.hasStage(UIConst.GemstoneCompoundView)) {
                    var view = UIMgr.getUIByName(UIConst.GemstoneCompoundView);
                    view.refreshView();
                }
                UIUtil.showRewardView({ "clientAddItemVoList": itemVoList });
            });
        };
        return GemstoneProcessor;
    }(tl3d.Processor));
    game.GemstoneProcessor = GemstoneProcessor;
})(game || (game = {}));
