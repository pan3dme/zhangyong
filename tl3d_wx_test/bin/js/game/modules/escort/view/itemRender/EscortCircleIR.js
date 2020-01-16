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
    /** 护送物品 */
    var EscortCircleIR = /** @class */ (function (_super) {
        __extends(EscortCircleIR, _super);
        function EscortCircleIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EscortCircleIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        EscortCircleIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.img_icon.skin = LanMgr.getLan("husong/husong_{0}.png", -1, info.tbEscort.ID);
                this.img_select.visible = !info.isSelected();
                this.imgQuality.skin = SkinUtil.getEscortQulityIcon(info.tbEscort.ID);
            }
            else {
            }
        };
        return EscortCircleIR;
    }(ui.escort.itemRender.EscortCircleIRUI));
    game.EscortCircleIR = EscortCircleIR;
})(game || (game = {}));
