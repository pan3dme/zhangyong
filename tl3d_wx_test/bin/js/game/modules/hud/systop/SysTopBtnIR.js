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
    var SysTopBtnIR = /** @class */ (function (_super) {
        __extends(SysTopBtnIR, _super);
        function SysTopBtnIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SysTopBtnIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        SysTopBtnIR.prototype.refreshView = function () {
            var data = this._dataSource;
            if (data) {
                this.lbText.visible = data.text ? true : false;
                this.lbText.text = data.text;
                this.btnFunc.skin = data.btnSkin;
                this.btnFunc.on(Laya.Event.CLICK, this, this.onClick);
                this.redpoint.setRedPointName(data.redpointName);
            }
            else {
                this.lbText.visible = false;
                this.btnFunc.skin = null;
                this.btnFunc.on(Laya.Event.CLICK, this, this.onClick);
                this.redpoint.onDispose();
            }
        };
        SysTopBtnIR.prototype.onClick = function () {
            var data = this._dataSource;
            if (data && data.callback) {
                data.callback();
            }
        };
        return SysTopBtnIR;
    }(ui.hud.render.SysTopBtnIRUI));
    game.SysTopBtnIR = SysTopBtnIR;
})(game || (game = {}));
