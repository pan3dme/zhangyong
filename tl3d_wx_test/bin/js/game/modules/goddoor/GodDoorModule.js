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
    * ShenjiezhimenModule
    */
    var GodDoorModule = /** @class */ (function (_super) {
        __extends(GodDoorModule, _super);
        function GodDoorModule() {
            return _super.call(this) || this;
        }
        GodDoorModule.prototype.getModuleName = function () {
            return "ShenjiezhimenModule";
        };
        GodDoorModule.prototype.listProcessors = function () {
            return [new game.GodDoorProcessor()];
        };
        /**
         * 模块入口
         */
        GodDoorModule.prototype.onRegister = function () {
        };
        return GodDoorModule;
    }(tl3d.Module));
    game.GodDoorModule = GodDoorModule;
    var GodDoorEvent = /** @class */ (function (_super) {
        __extends(GodDoorEvent, _super);
        function GodDoorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GodDoorEvent.OPEN_SHEN_MEN_VIEW = "OPEN_SHEN_MEN_VIEW";
        GodDoorEvent.OPEN_DOOR_EVENT = "OPEN_DOOR_EVENT";
        GodDoorEvent.TURN_GOD_EVENT = "TURN_GOD_EVENT";
        GodDoorEvent.TURN_GOD_OK = "TURN_GOD_OK";
        /** 旋转成功 */
        GodDoorEvent.TURN_BUILD_OK = "TURN_BUILD_OK";
        GodDoorEvent.KAIQI_SUCCESS = "KAIQI_SUCCESS";
        return GodDoorEvent;
    }(tl3d.BaseEvent));
    game.GodDoorEvent = GodDoorEvent;
})(game || (game = {}));
