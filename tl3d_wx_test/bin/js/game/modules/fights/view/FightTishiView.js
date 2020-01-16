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
    var FightTishiView = /** @class */ (function (_super) {
        __extends(FightTishiView, _super);
        function FightTishiView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.bgPanel.dataSource = { uiName: UIConst.FightTishiView, closeOnSide: _this.isModelClose, title: LanMgr.getLan("", 10536) };
            return _this;
        }
        FightTishiView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
        };
        FightTishiView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
        };
        FightTishiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return FightTishiView;
    }(ui.fight.FightTishiUI));
    game.FightTishiView = FightTishiView;
})(game || (game = {}));
