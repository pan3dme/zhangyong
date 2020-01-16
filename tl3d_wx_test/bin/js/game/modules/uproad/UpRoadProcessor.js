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
    var UpRoadProcessor = /** @class */ (function (_super) {
        __extends(UpRoadProcessor, _super);
        function UpRoadProcessor() {
            return _super.call(this) || this;
        }
        UpRoadProcessor.prototype.getName = function () {
            return "UpRoadProcessor";
        };
        UpRoadProcessor.prototype.listenModuleEvents = function () {
            return [];
        };
        //处理事件
        UpRoadProcessor.prototype.receivedModuleEvent = function ($event) {
        };
        return UpRoadProcessor;
    }(tl3d.Processor));
    game.UpRoadProcessor = UpRoadProcessor;
})(game || (game = {}));
