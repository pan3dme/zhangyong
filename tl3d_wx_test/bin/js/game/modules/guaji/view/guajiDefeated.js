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
    var guajiDefeated = /** @class */ (function (_super) {
        __extends(guajiDefeated, _super);
        function guajiDefeated() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.btn_close.on(Laya.Event.CLICK, _this, _this.close);
            _this._tickFun = function () {
                _this.timeTick();
            };
            return _this;
        }
        guajiDefeated.prototype.timeTick = function () {
            this.time--;
            if (this.time <= 0) {
                this.close();
            }
            this.lab_time.text = String(this.time);
        };
        guajiDefeated.prototype.popup = function () {
            var _this = this;
            _super.prototype.popup.call(this, false, false);
            this.time = 6;
            this._tickFun();
            this.bgPanel.showTitle(false, "zhandoubiaoxian/shibai.png", false, true, false, null, this);
            this.btn_again.visible = false;
            Laya.timer.loop(1000, this, this._tickFun);
            this.btn_close.x = 282;
            this.channel.callback = function () {
                _this.close();
            };
        };
        guajiDefeated.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            AudioMgr.playSound("sound/defeated.mp3");
        };
        guajiDefeated.prototype.close = function () {
            _super.prototype.close.call(this);
            Laya.timer.clear(this, this._tickFun);
            this.bgPanel.closeTitle();
        };
        guajiDefeated.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (UIMgr.hasStage(UIConst.GuajiView)) {
                var view = UIMgr.getUIByName(UIConst.GuajiView);
                view.delayShowBossTips();
            }
        };
        return guajiDefeated;
    }(ui.fight.shibaiUI));
    game.guajiDefeated = guajiDefeated;
})(game || (game = {}));
