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
    * ShareModule
    */
    var ShareModule = /** @class */ (function (_super) {
        __extends(ShareModule, _super);
        function ShareModule() {
            return _super.call(this) || this;
        }
        ShareModule.prototype.getModuleName = function () {
            return "ShareModule";
        };
        ShareModule.prototype.listProcessors = function () {
            return [new game.ShareProcessor()];
        };
        /**
         * 模块入口
         */
        ShareModule.prototype.onRegister = function () {
        };
        return ShareModule;
    }(tl3d.Module));
    game.ShareModule = ShareModule;
    var ShareEvent = /** @class */ (function (_super) {
        __extends(ShareEvent, _super);
        function ShareEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShareEvent.SEND_RECIVE_REWARD = "SEND_RECIVE_REWARD";
        ShareEvent.RED_POINT_CHANGE = "RED_POINT_CHANGE";
        return ShareEvent;
    }(tl3d.BaseEvent));
    game.ShareEvent = ShareEvent;
})(game || (game = {}));
