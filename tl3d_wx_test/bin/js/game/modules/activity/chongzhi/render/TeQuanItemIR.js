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
    var TeQuanItemIR = /** @class */ (function (_super) {
        __extends(TeQuanItemIR, _super);
        function TeQuanItemIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(TeQuanItemIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData($value);
            },
            enumerable: true,
            configurable: true
        });
        TeQuanItemIR.prototype.refreshData = function (item) {
            var _this = this;
            if (item) {
                this.visible = true;
                this.ui_item.dataSource = item.item;
                if (item.play) {
                    this.eff.visible = true;
                    this.eff.loadAnimation(ResConst.anim_teshutishi, Handler.create(null, function () {
                        _this.eff.play(1, true);
                    }), ResConst.atlas_teshutishi);
                }
                else {
                    this.eff.visible = false;
                    this.eff.stop();
                }
            }
            else {
                this.visible = false;
                this.eff.stop();
            }
        };
        return TeQuanItemIR;
    }(ui.activity.chongzhi.teQuanItemIRUI));
    game.TeQuanItemIR = TeQuanItemIR;
})(game || (game = {}));
