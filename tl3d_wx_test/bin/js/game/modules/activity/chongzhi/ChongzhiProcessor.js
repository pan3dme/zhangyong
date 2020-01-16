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
    var ChongzhiProcessor = /** @class */ (function (_super) {
        __extends(ChongzhiProcessor, _super);
        function ChongzhiProcessor() {
            return _super.call(this) || this;
        }
        ChongzhiProcessor.prototype.getName = function () {
            return "ChongzhiProcessor";
        };
        ChongzhiProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL),
                new game.TopUpEvent(game.TopUpEvent.SHOW_SHOUCHONG_PANEL),
                new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL),
                new game.TopUpEvent(game.TopUpEvent.GET_FIRSTRECHARGE_REWARD),
                new game.ResEvent(game.ResEvent.RESOURCE_CHANGE),
                new game.ResEvent(game.ResEvent.VIP_LEVEL_CHANGE),
                new game.HuodongEvent(game.TopUpEvent.XIANGOU_LIBAO_CHANGE),
            ];
        };
        ChongzhiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.TopUpEvent) {
                switch ($event.type) {
                    case game.TopUpEvent.SHOW_CHONGZHI_PANEL:
                        this.show_ChongzhiView($event.data);
                        break;
                    case game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL:
                        this.show_ChongzhiSuccView($event.data);
                        break;
                    case game.TopUpEvent.SHOW_SHOUCHONG_PANEL:
                        this.showShouchongPanel();
                        break;
                    case game.TopUpEvent.GET_FIRSTRECHARGE_REWARD:
                        this.getRewardById($event.data);
                        break;
                    case game.TopUpEvent.XIANGOU_LIBAO_CHANGE:
                        this.onLibaoUpdate();
                        break;
                }
            }
            else if ($event instanceof game.ResEvent) {
                switch ($event.type) {
                    case game.ResEvent.RESOURCE_CHANGE:
                    case game.ResEvent.VIP_LEVEL_CHANGE:
                        if (this.chongzhiview)
                            this.chongzhiview.refreshData();
                        if (this.hudView) {
                            this.hudView.setVip();
                        }
                        break;
                }
            }
        };
        ChongzhiProcessor.prototype.onLibaoUpdate = function () {
            if (UIMgr.hasStage(UIConst.PayActivityView)) {
                var ui_1 = UIMgr.getUIByName(UIConst.PayActivityView);
                ui_1.updateXiangouLibao();
            }
        };
        ChongzhiProcessor.prototype.show_ChongzhiView = function (eventdata) {
            UIMgr.showUI(UIConst.ChongzhiView, eventdata);
        };
        ChongzhiProcessor.prototype.show_ChongzhiSuccView = function (data) {
            var ids = data.rechargeGoodsIds || [];
            for (var i in ids) {
                if (tb.TB_recharge.get_TB_rechargeById(ids[i]).recharge_type != 3) {
                    game.ChongzhiModel.getInstance().arrPushBack(ids[i]);
                }
                else {
                    //购买礼包弹提示
                    UIMgr.showUI(UIConst.Topup_GiftSuccView, ids[i]);
                }
            }
            if (ids.indexOf(tb.TB_activity_set.getTabSet().level_recharge) != -1) {
                if (UIMgr.hasStage(UIConst.PayActivityView)) {
                    var ui_2 = UIMgr.getUIByName(UIConst.PayActivityView);
                    ui_2.setBtnLabel();
                }
            }
            if (UIMgr.hasStage(UIConst.TupUp_FirstView)) {
                var ui_3 = UIMgr.getUIByName(UIConst.TupUp_FirstView);
                ui_3.updateView();
            }
            if (UIMgr.hasStage(UIConst.Shop_BuyView)) {
                var ui_4 = UIMgr.getUIByName(UIConst.Shop_BuyView);
                ui_4.init();
            }
            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOUCHONG_RED_EVEN));
        };
        ChongzhiProcessor.prototype.updateShouchongPanel = function () {
            if (UIMgr.hasStage(UIConst.TupUp_FirstView)) {
                var uiPanel = UIMgr.getUIByName(UIConst.TupUp_FirstView);
                uiPanel.setViewData(uiPanel._selectTabNum);
            }
        };
        /**领取首充礼包 */
        ChongzhiProcessor.prototype.getRewardById = function (data) {
            var _this = this;
            var args = {};
            args[Protocol.game_welfare_firstRecharge.args.id] = data.id;
            args[Protocol.game_welfare_firstRecharge.args.day] = data.day;
            PLC.request(Protocol.game_welfare_firstRecharge, args, function ($data, msg) {
                if (!$data)
                    return;
                _this.firstview.updateView();
                UIUtil.showRewardView($data.commonData);
                // this.setButtonVisible(this.list_btn.selectedIndex + 1);
                dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOUCHONG_RED_EVEN));
                // if (UIMgr.hasStage(UIConst.GuajiView)) {
                // 	let view: GuajiView = UIMgr.getUIByName(UIConst.GuajiView);
                // 	view.updateShouchongTishi();
                // }
            });
        };
        ChongzhiProcessor.prototype.showShouchongPanel = function () {
            UIMgr.showUI(UIConst.TupUp_FirstView);
        };
        Object.defineProperty(ChongzhiProcessor.prototype, "firstview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.TupUp_FirstView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChongzhiProcessor.prototype, "chongzhiview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.ChongzhiView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChongzhiProcessor.prototype, "hudView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.HudView);
            },
            enumerable: true,
            configurable: true
        });
        return ChongzhiProcessor;
    }(tl3d.Processor));
    game.ChongzhiProcessor = ChongzhiProcessor;
})(game || (game = {}));
