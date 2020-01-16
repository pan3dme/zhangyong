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
    var BagProcessor = /** @class */ (function (_super) {
        __extends(BagProcessor, _super);
        function BagProcessor() {
            return _super.call(this) || this;
        }
        BagProcessor.prototype.getName = function () {
            return "BagProcessor";
        };
        BagProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.BagEvent(game.BagEvent.SHOW_BAG_PANEL),
                new game.BagEvent(game.BagEvent.USE_MANY_ITEM),
                new game.BagEvent(game.BagEvent.OPEN_SELL_VIEW),
                new game.BagEvent(game.BagEvent.CHANGE_ITEM),
                new game.BagEvent(game.BagEvent.STOP_SCROLL),
                new game.BagEvent(game.BagEvent.SELECT_RECYCLE_ITEM),
                new game.BagEvent(game.BagEvent.FENJIE_EQUIPS),
                new game.BagEvent(game.BagEvent.CHANGE_EQUIP_ITEM),
                new game.GodEvent(game.GodEvent.ADD_GODS),
                new game.GodEvent(game.GodEvent.GOD_CHANGE),
                new game.GodEvent(game.GodEvent.GOD_PORP_CHANGE),
                new game.GemstoneEvent(game.GemstoneEvent.ADD_GEMTONE),
                new game.GemstoneEvent(game.GemstoneEvent.MODIFY_GEMTONE),
            ];
        };
        BagProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.BagEvent) {
                switch ($event.type) {
                    case game.BagEvent.SHOW_BAG_PANEL:
                        this.show_BagView($event.data);
                        break;
                    case game.BagEvent.STOP_SCROLL:
                        this.stopScroll();
                        break;
                    case game.BagEvent.USE_MANY_ITEM:
                        this.useManyItem($event.data);
                        break;
                    case game.BagEvent.OPEN_SELL_VIEW:
                        this.openSell();
                        break;
                    case game.BagEvent.FENJIE_EQUIPS:
                        this.fenjie($event.data);
                        break;
                    case game.BagEvent.CHANGE_EQUIP_ITEM:
                        //装备变化时，刷新item
                        this.equChange($event.data);
                        break;
                    case game.BagEvent.CHANGE_ITEM:
                        if (this.viewHasStage)
                            this.changeItemVo($event.data);
                        break;
                    case game.BagEvent.SELECT_RECYCLE_ITEM:
                        if (this.reCycleHasStage)
                            this.reCycleview.changImg();
                        break;
                }
            }
            if ($event instanceof game.GodEvent) {
                switch ($event.type) {
                    case game.GodEvent.ADD_GODS:
                    case game.GodEvent.GOD_CHANGE:
                        if (UIMgr.hasStage(UIConst.BagView)) {
                            var view = UIMgr.getUIByName(UIConst.BagView);
                            view.refreshGod();
                        }
                        break;
                    case game.GodEvent.GOD_PORP_CHANGE:
                        if (UIMgr.hasStage(UIConst.BagView) && UIMgr.hasStage(UIConst.God_GodCultureView)) {
                            var view = UIMgr.getUIByName(UIConst.BagView);
                            view.refreshGod();
                        }
                        break;
                }
            }
            if ($event instanceof game.GemstoneEvent) {
                switch ($event.type) {
                    case game.GemstoneEvent.ADD_GEMTONE:
                    case game.GemstoneEvent.MODIFY_GEMTONE:
                        if (UIMgr.hasStage(UIConst.BagView)) {
                            var view = UIMgr.getUIByName(UIConst.BagView);
                            view.materialChange();
                        }
                        break;
                }
            }
        };
        BagProcessor.prototype.equChange = function (data) {
            if (this.viewHasStage) {
                if (data.type == game.EQUTYPE.MODIFY) {
                    this.bagview.updateItem(data.vo);
                }
                else {
                    this.bagview.equchange();
                }
            }
            if (this.reCycleHasStage) {
                if (data.type == game.EQUTYPE.DEL) {
                    this.reCycleview.equchange();
                    this.reCycleview.pingzhi();
                    this.reCycleview.changImg();
                }
            }
        };
        BagProcessor.prototype.showSummonPanel = function ($data) {
            UIMgr.showUI(UIConst.ZH_ResultView, $data);
        };
        BagProcessor.prototype.fenjie = function (recyclelist) {
            if (recyclelist.length > 0) {
                UIMgr.showUI(UIConst.Equip_Recycle, recyclelist);
            }
            else {
                showToast(LanMgr.getLan("", 11011));
            }
        };
        /**
         * 打开背包面板
         */
        BagProcessor.prototype.show_BagView = function (index) {
            if (!this.viewHasStage) {
                game.EquipModel.getInstance().showEquipByView = EquipType.BAG_VIEW;
                UIMgr.showUI(UIConst.BagView, index);
            }
        };
        BagProcessor.prototype.stopScroll = function () {
            if (this.viewHasStage) {
                this.bagview.stopScroll();
            }
        };
        /**
         * 使用多个道具
         * @param itemarry
         */
        BagProcessor.prototype.useManyItem = function (itemarry) {
            var itemVo = itemarry[0];
            var num = itemarry[1];
            var chipCount = 0;
            if (itemVo.count >= num) {
                var args = {};
                args[Protocol.game_item_useItem.args.itemId] = itemVo.id;
                if (itemVo.type == iface.tb_prop.itemTypeKey.chip) {
                    if (Number(itemVo.using[0]) == 1) {
                        chipCount = num * Number(itemVo.using[1]);
                    }
                }
                else {
                    chipCount = num;
                }
                args[Protocol.game_item_useItem.args.count] = chipCount;
                PLC.request(Protocol.game_item_useItem, args, function ($data, $msg) {
                    if (!$data)
                        return;
                    UIUtil.showRewardView($data.commonData);
                    UIMgr.hideUIByName(UIConst.Bag_UseView);
                });
            }
        };
        /**
         * 道具变化时刷新某个格子
         * @param data
         */
        BagProcessor.prototype.changeItemVo = function (vo) {
            vo.show = false;
            vo.bag = true;
            this.bagview.updateItem(vo);
        };
        /**
         * 打开批量出售界面
         */
        BagProcessor.prototype.openSell = function () {
            UIMgr.showUI(UIConst.Bag_RecycleView);
        };
        Object.defineProperty(BagProcessor.prototype, "bagview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.BagView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BagProcessor.prototype, "viewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.BagView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BagProcessor.prototype, "reCycleview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Bag_RecycleView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BagProcessor.prototype, "reCycleHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.Bag_RecycleView);
            },
            enumerable: true,
            configurable: true
        });
        return BagProcessor;
    }(tl3d.Processor));
    game.BagProcessor = BagProcessor;
})(game || (game = {}));
