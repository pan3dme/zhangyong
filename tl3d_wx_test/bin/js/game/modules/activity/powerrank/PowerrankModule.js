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
    * PowerrankModule
    */
    var PowerrankModule = /** @class */ (function (_super) {
        __extends(PowerrankModule, _super);
        function PowerrankModule() {
            return _super.call(this) || this;
        }
        PowerrankModule.prototype.getModuleName = function () {
            return "PowerrankModule";
        };
        PowerrankModule.prototype.listProcessors = function () {
            return [new game.PowerrankProcessor()];
        };
        /**
         * 模块入口
         */
        PowerrankModule.prototype.onRegister = function () {
        };
        return PowerrankModule;
    }(tl3d.Module));
    game.PowerrankModule = PowerrankModule;
    var PowerrankEvent = /** @class */ (function (_super) {
        __extends(PowerrankEvent, _super);
        function PowerrankEvent($type, $data) {
            if ($data === void 0) { $data = null; }
            var _this = _super.call(this, $type) || this;
            _this.data = $data;
            return _this;
        }
        PowerrankEvent.SHOW_VIEW_EVENT = "SHOW_VIEW_EVENT";
        PowerrankEvent.OPEN_DETAIL_PANEL = "OPEN_DETAIL_PANEL";
        PowerrankEvent.SHOW_RANKVIEW_EVENT = "SHOW_RANKVIEW_EVENT";
        PowerrankEvent.UPDATE_REDPOINT = "UPDATE_REDPOINT";
        return PowerrankEvent;
    }(tl3d.BaseEvent));
    game.PowerrankEvent = PowerrankEvent;
})(game || (game = {}));
