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
/*
* name;
*/
var game;
(function (game) {
    var ResProcessor = /** @class */ (function (_super) {
        __extends(ResProcessor, _super);
        function ResProcessor() {
            return _super.call(this) || this;
        }
        ResProcessor.prototype.getName = function () {
            return "ResProcessor";
        };
        ResProcessor.prototype.listenModuleEvents = function () {
            return [];
        };
        //处理事件
        ResProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.ResEvent) {
                switch ($event.type) {
                    case game.ResEvent.RESOURCE_CHANGE:
                        logdebug("货币变化");
                        break;
                    case game.ResEvent.PROP_CHANGE:
                        logdebug("道具变化");
                        break;
                }
            }
        };
        return ResProcessor;
    }(tl3d.Processor));
    game.ResProcessor = ResProcessor;
})(game || (game = {}));
