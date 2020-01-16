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
    var GodDmDuizhanIR = /** @class */ (function (_super) {
        __extends(GodDmDuizhanIR, _super);
        function GodDmDuizhanIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GodDmDuizhanIR.prototype, "dataSource", {
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
        GodDmDuizhanIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.ui_head.dataSource = new UserHeadVo(info.head, info.level, info.headFrame);
                this.ui_head.gray = info.state == 0;
                this.img_bg.visible = info.state != 2;
                this.lab_name.text = info.name;
                if (this.img_bg.visible) {
                    this.img_bg.skin = SkinUtil.getChuzhanIcon(info.state);
                    this.lab_info.text = info.state == 0 ? LanMgr.getLan("", 12332) : LanMgr.getLan("", 12333);
                }
            }
            else {
                this.ui_head.dataSource = null;
            }
        };
        return GodDmDuizhanIR;
    }(ui.goddomain.render.DuizhanIRUI));
    game.GodDmDuizhanIR = GodDmDuizhanIR;
})(game || (game = {}));
