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
    /*
    * TimelimitactivityProcessor
    */
    var TimelimitProcessor = /** @class */ (function (_super) {
        __extends(TimelimitProcessor, _super);
        function TimelimitProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.TimelimitModel.getInstance();
            return _this;
        }
        TimelimitProcessor.prototype.getName = function () {
            return "TimelimitProcessor";
        };
        //监听事件
        TimelimitProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TimelimitEvent(game.TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY),
                new game.TimelimitEvent(game.TimelimitEvent.GET_TAB_EVENT),
                new game.TimelimitEvent(game.TimelimitEvent.SELECTED_TAB_DATA_EVENT),
                new game.TimelimitEvent(game.TimelimitEvent.RED_EVENT),
                new game.TimelimitEvent(game.TimelimitEvent.GROUP_RED_EVENT),
                new game.TimelimitEvent(game.TimelimitEvent.FUND_EVENT),
                new game.TimelimitEvent(game.TimelimitEvent.FUND_RED_EVENT),
            ];
        };
        //处理事件
        TimelimitProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.TimelimitEvent) {
                switch (event.type) {
                    case game.TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY:
                        this.showUi();
                        break;
                    case game.TimelimitEvent.GET_TAB_EVENT:
                        this.getTabEvent(event.data);
                        break;
                    case game.TimelimitEvent.SELECTED_TAB_DATA_EVENT:
                    case game.TimelimitEvent.RED_EVENT:
                    case game.TimelimitEvent.GROUP_RED_EVENT:
                        this.selectedTabData();
                        break;
                    case game.TimelimitEvent.FUND_EVENT:
                    case game.TimelimitEvent.FUND_RED_EVENT:
                        this.refreshFund();
                        break;
                }
            }
        };
        TimelimitProcessor.prototype.showUi = function () {
            this._model.clearActicity();
            var hasactivity = this._model.hasActivity();
            if (hasactivity) {
                UIMgr.showUI(UIConst.TimeLimitView);
            }
            else {
                showToast(LanMgr.getLan('', 10125));
            }
        };
        TimelimitProcessor.prototype.selectedTabData = function () {
            if (this.timelimitactivityview)
                this.timelimitactivityview.showSelectTab(false);
        };
        //刷新基金
        TimelimitProcessor.prototype.refreshFund = function () {
            if (this.weekFundView)
                this.weekFundView.showSelectTab();
        };
        TimelimitProcessor.prototype.getTabEvent = function (data) {
            if (this.timelimitactivityview)
                this.timelimitactivityview.setTab(data);
        };
        Object.defineProperty(TimelimitProcessor.prototype, "timelimitactivityview", {
            get: function () {
                return UIMgr.getUIByName(UIConst.TimeLimitView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelimitProcessor.prototype, "weekFundView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.WeekFundView);
            },
            enumerable: true,
            configurable: true
        });
        return TimelimitProcessor;
    }(tl3d.Processor));
    game.TimelimitProcessor = TimelimitProcessor;
})(game || (game = {}));
