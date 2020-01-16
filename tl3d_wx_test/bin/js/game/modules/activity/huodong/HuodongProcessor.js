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
    var HuodongProcessor = /** @class */ (function (_super) {
        __extends(HuodongProcessor, _super);
        function HuodongProcessor() {
            return _super.call(this) || this;
        }
        HuodongProcessor.prototype.getName = function () {
            return "HuodongProcessor";
        };
        HuodongProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.HuodongEvent(game.HuodongEvent.MAKE_PROMISE_SUCCESS),
                new game.HuodongEvent(game.HuodongEvent.UPDATE_QIANDAO_PANEL),
                new game.HuodongEvent(game.HuodongEvent.GET_LEVELFUND_REWARD),
                new game.HuodongEvent(game.HuodongEvent.GET_LUCKEQUIP_REWARD),
                new game.HuodongEvent(game.HuodongEvent.REFRESH_YUEKA_PANEL),
                new game.HuodongEvent(game.HuodongEvent.RECHARGE_LAVEL_FUND),
                new game.HuodongEvent(game.HuodongEvent.LUCK_DRWA_OPERATION),
                new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL),
                new game.HuodongEvent(game.HuodongEvent.GET_LUCKY_RECORD),
                new game.HuodongEvent(game.HuodongEvent.AWARD_EVENT),
            ];
        };
        //处理事件
        HuodongProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.HuodongEvent) {
                switch ($event.type) {
                    case game.HuodongEvent.SHOW_HUODONG_PANEL:
                        this.showHuodongPanel($event.data);
                        break;
                    case game.HuodongEvent.MAKE_PROMISE_SUCCESS:
                        this.seconedSure($event.data);
                        break;
                    case game.HuodongEvent.UPDATE_QIANDAO_PANEL:
                        this.updateQianDaoPanel();
                        break;
                    case game.HuodongEvent.RECHARGE_LAVEL_FUND:
                        this.onProtocolRecharge();
                        break;
                    case game.HuodongEvent.GET_LEVELFUND_REWARD:
                        this.onProtocolGift($event.data);
                        break;
                    case game.HuodongEvent.LUCK_DRWA_OPERATION:
                        this.onProtocolLuckdraw($event.data);
                        break;
                    case game.HuodongEvent.GET_LUCKY_RECORD:
                        this.onProtocolLuckRecord($event.data);
                        break;
                    case game.HuodongEvent.GET_LUCKEQUIP_REWARD:
                        this.onProtocolLuckEquipReward($event.data);
                        break;
                    case game.HuodongEvent.REFRESH_YUEKA_PANEL:
                    case game.HuodongEvent.AWARD_EVENT:
                        this.refreshYueka();
                        break;
                }
            }
        };
        /**福利/幸运转盘 */
        HuodongProcessor.prototype.showHuodongPanel = function (dataAry) {
            var uiName = dataAry[0];
            var index = dataAry[1] || 0;
            if (uiName == UIConst.WelfareView) {
                UIMgr.showUI(UIConst.WelfareView, index);
            }
            else if (uiName == UIConst.PayActivityView) {
                UIMgr.showUI(UIConst.PayActivityView, index);
            }
            else if (uiName == UIConst.LuckyTurnView) {
                if (!game.HuodongModel.isOnActivatyTime()) {
                    showToast(LanMgr.getLan("", 10218));
                    return;
                }
                UIMgr.showUI(UIConst.LuckyTurnView);
            }
            else if (uiName == UIConst.RealNameView) {
                UIMgr.showUI(UIConst.RealNameView);
            }
        };
        /**更新签到界面 */
        HuodongProcessor.prototype.updateQianDaoPanel = function () {
            this.HuodongView.initSignViewData();
        };
        /**购买等级基金 */
        HuodongProcessor.prototype.onProtocolRecharge = function () {
            var payid = tb.TB_activity_set.getTabSet().level_recharge;
            var pid = Number(window.platform.pid);
            if (game.ChongzhiModel.isRealPay(pid)) {
                var item = tb.TB_recharge.get_TB_rechargeById(payid);
                game.ChongzhiModel.pay(item);
            }
            else {
                UIUtil.payDebug(payid);
            }
        };
        /**等级基金礼包 */
        HuodongProcessor.prototype.onProtocolGift = function (id) {
            var _this = this;
            var args = {};
            args[Protocol.game_activity_getLevelFundReward.args.id] = id;
            PLC.request(Protocol.game_activity_getLevelFundReward, args, function ($data, $msg) {
                if (!$data)
                    return;
                if (_this.hasPayActivity()) {
                    _this.payActivityView.initJijinlist();
                }
                UIUtil.showRewardView($data.commonData);
            });
        };
        /**寻宝额外奖励 */
        HuodongProcessor.prototype.onProtocolLuckEquipReward = function (id) {
            var args = {};
            args[Protocol.game_activity_getLevelFundReward.args.id] = id;
            PLC.request(Protocol.game_luck_getluckEquipAward, args, function ($data, $msg) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
            });
        };
        /**幸运转盘 */
        HuodongProcessor.prototype.onProtocolLuckdraw = function (args) {
            var _this = this;
            var protocol = game.HuodongModel.getInstance().getProtocol(this.LuckyTurnView.tabIdx);
            PLC.request(protocol, args, function ($data, $msg) {
                if ($data && !$data.hasOwnProperty('luckGodIds') && !$data.hasOwnProperty('luckEquipIds')
                    && !$data.hasOwnProperty('luckArtIds')) {
                    showToast($msg);
                    return;
                }
                if (!$data)
                    return;
                if (_this.LuckyTurnView) {
                    Laya.timer.once(600, _this, function () {
                        _this.LuckyTurnView.startAction($data, $msg);
                    });
                }
            });
        };
        /**转盘记录 */
        HuodongProcessor.prototype.onProtocolLuckRecord = function (type) {
            var proto;
            switch (type) {
                case TURNTABLE.EQUIP:
                    proto = Protocol.center_luck_getLuckEquipRecord;
                    break;
                case TURNTABLE.TREASURE:
                    proto = Protocol.center_luck_getLuckTreasureRecord;
                    break;
                default:
                    proto = Protocol.center_luck_getLuckGodRecord;
                    break;
            }
            PLC.request(proto, null, function ($data, $msg) {
                if (!$data) {
                    return;
                }
                var model = game.HuodongModel.getInstance();
                if ($data.hasOwnProperty('luckEquipRecord')) {
                    model.equipRecord = $data['luckEquipRecord'];
                    // this.LuckyTurnView.turnView.setRecordList($data['luckEquipRecord']);
                }
                else if ($data.hasOwnProperty('luckGodRecord')) {
                    model.godRecord = $data['luckGodRecord'];
                    // this.LuckyTurnView.turnView.setRecordList($data['luckGodRecord']);
                }
                else if ($data.hasOwnProperty('luckTreasureRecord')) {
                    model.treasureRecord = $data['luckTreasureRecord'];
                    // this.LuckyTurnView.turnView.setRecordList($data['luckGodRecord']);
                }
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.LUCK_RECORD_CHANGE));
            });
        };
        /**许愿 */
        HuodongProcessor.prototype.seconedSure = function ($Eventdata) {
            var _this = this;
            var args = {};
            args[Protocol.game_common_wish.args.count] = Number($Eventdata.count);
            // logyhj("许愿-----------------",$Eventdata.count);
            PLC.request(Protocol.game_common_wish, args, function ($data, msg) {
                logdebug("许愿", $data);
                if (!$data)
                    return;
                _this.HuodongView.setwishNums();
                _this.HuodongView.startLucik($data, msg);
            });
        };
        HuodongProcessor.prototype.refreshYueka = function () {
            if (this.hasPayActivity())
                this.payActivityView.initYuekaView();
        };
        Object.defineProperty(HuodongProcessor.prototype, "HuodongView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.WelfareView);
            },
            enumerable: true,
            configurable: true
        });
        HuodongProcessor.prototype.hasWelfareView = function () {
            return UIMgr.hasStage(UIConst.WelfareView);
        };
        HuodongProcessor.prototype.hasPayActivity = function () {
            return UIMgr.hasStage(UIConst.PayActivityView);
        };
        Object.defineProperty(HuodongProcessor.prototype, "payActivityView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.PayActivityView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HuodongProcessor.prototype, "LuckyTurnView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.LuckyTurnView);
            },
            enumerable: true,
            configurable: true
        });
        return HuodongProcessor;
    }(tl3d.Processor));
    game.HuodongProcessor = HuodongProcessor;
})(game || (game = {}));
