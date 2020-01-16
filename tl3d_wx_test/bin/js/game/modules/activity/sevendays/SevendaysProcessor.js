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
    var SevendaysProcessor = /** @class */ (function (_super) {
        __extends(SevendaysProcessor, _super);
        function SevendaysProcessor() {
            return _super.call(this) || this;
        }
        SevendaysProcessor.prototype.getName = function () {
            return "sevendaysProcessor";
        };
        SevendaysProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.SevendaysEvent(game.SevendaysEvent.UPDATE_SEVENDAYS_PANEL),
                new game.SevendaysEvent(game.SevendaysEvent.DRAW_SEVENDAYS_REWARD),
                new game.SevendaysEvent(game.SevendaysEvent.SHOW_SEVENDAYS_PANEL),
                new game.SevendaysEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT),
            ];
        };
        SevendaysProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.SevendaysEvent) {
                switch ($event.type) {
                    case game.SevendaysEvent.UPDATE_SEVENDAYS_PANEL:
                        this.SevendaysView.refreshLiveness();
                        var day = this.SevendaysView.selectDaysNum;
                        var item = this.SevendaysView.selectTodayNum;
                        game.SevendaysModel.getInstance().UpdateSevendayByday(day, item);
                        this.SevendaysView.initView(day);
                        break;
                    case game.SevendaysEvent.DRAW_SEVENDAYS_REWARD:
                        this.drawReward($event.data);
                        break;
                    case game.SevendaysEvent.SHOW_SEVENDAYS_PANEL:
                        UIMgr.showUI(UIConst.SevendaysView);
                        break;
                }
            }
        };
        /** 领取活跃度奖励 */
        SevendaysProcessor.prototype.drawReward = function (rewardData) {
            var _this = this;
            if (!rewardData.isReward() && rewardData.isFinish()) {
                var args = {};
                args[Protocol.game_activity_getSevenDayExtraReward.args.id] = rewardData.tbReward.ID;
                PLC.request(Protocol.game_activity_getSevenDayExtraReward, args, function ($data) {
                    if (!$data)
                        return;
                    UIUtil.showRewardView($data.commonData);
                    _this.SevendaysView.refreshLiveness();
                    dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT));
                });
            }
        };
        Object.defineProperty(SevendaysProcessor.prototype, "SevendaysView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.SevendaysView);
            },
            enumerable: true,
            configurable: true
        });
        return SevendaysProcessor;
    }(tl3d.Processor));
    game.SevendaysProcessor = SevendaysProcessor;
})(game || (game = {}));
