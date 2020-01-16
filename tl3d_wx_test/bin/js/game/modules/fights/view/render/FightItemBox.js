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
    var FightItemBox = /** @class */ (function (_super) {
        __extends(FightItemBox, _super);
        function FightItemBox() {
            return _super.call(this) || this;
        }
        return FightItemBox;
    }(ui.fight.box.FightItemBoxUI));
    game.FightItemBox = FightItemBox;
})(game || (game = {}));
