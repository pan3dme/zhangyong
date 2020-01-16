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
    * OnlineModule
    */
    var OnlineModule = /** @class */ (function (_super) {
        __extends(OnlineModule, _super);
        function OnlineModule() {
            return _super.call(this) || this;
        }
        OnlineModule.prototype.getModuleName = function () {
            return "OnlineModule";
        };
        OnlineModule.prototype.listProcessors = function () {
            return [new game.OnlineProcessor()];
        };
        /**
         * 模块入口
         */
        OnlineModule.prototype.onRegister = function () {
        };
        return OnlineModule;
    }(tl3d.Module));
    game.OnlineModule = OnlineModule;
    var OnlineEvent = /** @class */ (function (_super) {
        __extends(OnlineEvent, _super);
        function OnlineEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OnlineEvent.SEND_RECEIVE_EVENT = "SEND_RECEIVE_EVENT";
        OnlineEvent.RED_CHANGE_EVENT = "RED_CHANGE_EVENT";
        return OnlineEvent;
    }(tl3d.BaseEvent));
    game.OnlineEvent = OnlineEvent;
})(game || (game = {}));
