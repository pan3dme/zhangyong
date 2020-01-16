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
    * OpenserverModule
    */
    var OpenserverModule = /** @class */ (function (_super) {
        __extends(OpenserverModule, _super);
        function OpenserverModule() {
            return _super.call(this) || this;
        }
        OpenserverModule.prototype.getModuleName = function () {
            return "OpenserverModule";
        };
        OpenserverModule.prototype.listProcessors = function () {
            return [new game.OpenserverProcessor()];
        };
        /**
         * 模块入口
         */
        OpenserverModule.prototype.onRegister = function () {
            game.OpenserverModel.getInstance().init();
        };
        return OpenserverModule;
    }(tl3d.Module));
    game.OpenserverModule = OpenserverModule;
    var OpenserverEvent = /** @class */ (function (_super) {
        __extends(OpenserverEvent, _super);
        function OpenserverEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OpenserverEvent.CLICK_TAB = "CLICK_TAB";
        OpenserverEvent.RED_CHANGE = "RED_CHANGE";
        OpenserverEvent.VIEW_CHANGE = "VIEW_CHANGE";
        OpenserverEvent.OS_GIFT_CHANGE = "OS_GIFT_CHANGE";
        return OpenserverEvent;
    }(tl3d.BaseEvent));
    game.OpenserverEvent = OpenserverEvent;
})(game || (game = {}));
