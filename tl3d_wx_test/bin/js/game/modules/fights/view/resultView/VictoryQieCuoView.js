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
    var VictoryQieCuoView = /** @class */ (function (_super) {
        __extends(VictoryQieCuoView, _super);
        function VictoryQieCuoView() {
            return _super.call(this) || this;
        }
        VictoryQieCuoView.prototype.popup = function () {
            _super.prototype.popup.call(this, false, false);
            this.mouseEnabled = true;
            this.btn_close.on(Laya.Event.CLICK, this, this.close);
        };
        VictoryQieCuoView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            AudioMgr.setPlayRate(1);
            AudioMgr.playSound("sound/victory.mp3");
            this.bg.showTitle(true, SkinUtil.title_shengli, true, true, true, null, this);
        };
        VictoryQieCuoView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.btn_close.off(Laya.Event.CLICK, this, this.close);
            dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
        };
        VictoryQieCuoView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return VictoryQieCuoView;
    }(ui.fight.shengliQieCuoUI));
    game.VictoryQieCuoView = VictoryQieCuoView;
})(game || (game = {}));
