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
    var UpRoadTabIR = /** @class */ (function (_super) {
        __extends(UpRoadTabIR, _super);
        function UpRoadTabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(UpRoadTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        UpRoadTabIR.prototype.refresh = function () {
            var data = this.dataSource;
            if (data) {
                var lv = App.hero.tasks.advanceLevel;
                this.img_icon.gray = data.ID > lv + 1;
                this.img_icon.skin = LanMgr.getLan("zhaohuanshi/{0}.png", -1, data.ID);
                this.ani_select.loadAnimation(ResConst.anim_circle_select, Handler.create(this, function () {
                    this.ani_select.play();
                }), ResConst.atlas_circle_select);
            }
            else {
                this.ani_select.gotoAndStop(0);
            }
        };
        UpRoadTabIR.prototype.destroy = function (destroyChild) {
            if (destroyChild === void 0) { destroyChild = true; }
            _super.prototype.destroy.call(this, destroyChild);
        };
        return UpRoadTabIR;
    }(ui.uproad.UpRoadTabIRUI));
    game.UpRoadTabIR = UpRoadTabIR;
})(game || (game = {}));
