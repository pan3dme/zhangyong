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
    var EscortIR = /** @class */ (function (_super) {
        __extends(EscortIR, _super);
        function EscortIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EscortIR.prototype, "dataSource", {
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
        EscortIR.prototype.initView = function () {
            var info = this.dataSource;
            if (info) {
                this.imgQuality.skin = SkinUtil.getEscortQulityIcon(info.tbEscort.ID);
                this.img_icon.skin = LanMgr.getLan("husong/husong_{0}.png", -1, info.tbEscort.ID);
                this.itemList.array = info.tbEscort.getRewardList();
            }
            else {
                this.itemList.array = null;
            }
        };
        return EscortIR;
    }(ui.escort.itemRender.EscortIRenderUI));
    game.EscortIR = EscortIR;
})(game || (game = {}));
