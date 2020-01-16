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
    var SevendaysModule = /** @class */ (function (_super) {
        __extends(SevendaysModule, _super);
        function SevendaysModule() {
            return _super.call(this) || this;
        }
        SevendaysModule.prototype.getModuleName = function () {
            return "SevendaysModule";
        };
        SevendaysModule.prototype.listProcessors = function () {
            return [new game.SevendaysProcessor()];
        };
        return SevendaysModule;
    }(tl3d.Module));
    game.SevendaysModule = SevendaysModule;
    var SevendaysEvent = /** @class */ (function (_super) {
        __extends(SevendaysEvent, _super);
        function SevendaysEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SevendaysEvent.UPDATE_SEVENDAYS_PANEL = "UPDATE_SEVENDAYS_PANEL";
        SevendaysEvent.DRAW_SEVENDAYS_REWARD = "DRAW_SEVENDAYS_REWARD";
        SevendaysEvent.SHOW_SEVENDAYS_PANEL = "SHOW_SEVENDAYS_PANEL";
        SevendaysEvent.SEVENDAYS_RED_EVENT = "RED_EVENT";
        return SevendaysEvent;
    }(tl3d.BaseEvent));
    game.SevendaysEvent = SevendaysEvent;
})(game || (game = {}));
