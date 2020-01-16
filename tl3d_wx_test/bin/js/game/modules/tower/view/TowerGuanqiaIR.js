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
    var TowerGuanqiaIR = /** @class */ (function (_super) {
        __extends(TowerGuanqiaIR, _super);
        function TowerGuanqiaIR() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            return _this;
        }
        Object.defineProperty(TowerGuanqiaIR.prototype, "dataSource", {
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
        TowerGuanqiaIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                this.lbNum.text = data.tbCopyInfo.area_number + '';
                if (data.isPass()) {
                    this.btnRing.stateNum = 2;
                    this.btnRing.skin = SkinUtil.getGuankaStateUrl(1);
                }
                else if (data.isCurrent()) {
                    this.btnRing.stateNum = 2;
                    this.btnRing.skin = SkinUtil.getGuankaStateUrl(2);
                }
                else {
                    this.btnRing.stateNum = 1;
                    this.btnRing.skin = SkinUtil.getGuankaStateUrl(0);
                }
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
            this.box.visible = this.index != 9;
        };
        TowerGuanqiaIR.prototype.onClick = function () {
            dispatchEvt(new game.TowerEvent(game.TowerEvent.CLICK_GUANQIA, this.dataSource));
        };
        return TowerGuanqiaIR;
    }(ui.tower.GuanqiaIRUI));
    game.TowerGuanqiaIR = TowerGuanqiaIR;
})(game || (game = {}));
