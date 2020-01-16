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
    * OpenserverProcessor
    */
    var OpenserverProcessor = /** @class */ (function (_super) {
        __extends(OpenserverProcessor, _super);
        function OpenserverProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.OpenserverModel.getInstance();
            return _this;
        }
        OpenserverProcessor.prototype.getName = function () {
            return "OpenserverProcessor";
        };
        //监听事件
        OpenserverProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.OpenserverEvent(game.OpenserverEvent.CLICK_TAB),
                new game.OpenserverEvent(game.OpenserverEvent.VIEW_CHANGE),
            ];
        };
        //处理事件
        OpenserverProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.OpenserverEvent) {
                switch (event.type) {
                    case game.OpenserverEvent.CLICK_TAB:
                        this.clickTab(event.data);
                        break;
                    case game.OpenserverEvent.VIEW_CHANGE:
                        this.viewchange();
                        break;
                }
            }
        };
        OpenserverProcessor.prototype.viewchange = function () {
            if (this.viewHasStage) {
                this.view.updateTab();
            }
        };
        OpenserverProcessor.prototype.clickTab = function (data) {
            if (this.viewHasStage) {
                this.view.onData(data);
            }
        };
        Object.defineProperty(OpenserverProcessor.prototype, "view", {
            get: function () {
                return UIMgr.getUIByName(UIConst.OpenReward);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OpenserverProcessor.prototype, "viewHasStage", {
            get: function () {
                return UIMgr.hasStage(UIConst.OpenReward);
            },
            enumerable: true,
            configurable: true
        });
        return OpenserverProcessor;
    }(tl3d.Processor));
    game.OpenserverProcessor = OpenserverProcessor;
})(game || (game = {}));
