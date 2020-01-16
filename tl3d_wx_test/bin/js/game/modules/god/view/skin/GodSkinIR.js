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
    var GodSkinIR = /** @class */ (function (_super) {
        __extends(GodSkinIR, _super);
        function GodSkinIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodSkinIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        GodSkinIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                var skinVo = info.skinVo;
                this.imgBg.skin = skinVo.getBgSkin();
                this.lbName.text = skinVo.getName();
                this.imgWear.visible = info.godVo && skinVo.skinId == info.godVo.skinId;
                var isOpenByTujian = UIMgr.hasStage(UIConst.TujianView);
                this.canActivityRP.visible = !isOpenByTujian && skinVo.isCanActivity();
                this.ani1.play(0, true);
            }
            else {
                this.ani1.gotoAndStop(0);
            }
        };
        return GodSkinIR;
    }(ui.god.render.GodSkinIRUI));
    game.GodSkinIR = GodSkinIR;
})(game || (game = {}));
