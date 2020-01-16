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
    var GuanQiaNewIR = /** @class */ (function (_super) {
        __extends(GuanQiaNewIR, _super);
        function GuanQiaNewIR() {
            var _this = _super.call(this) || this;
            _this._isSelect = false;
            _this.setSelect(false, true);
            return _this;
        }
        Object.defineProperty(GuanQiaNewIR.prototype, "dataSource", {
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
        GuanQiaNewIR.prototype.refreshView = function () {
            var data = this.dataSource;
            if (data) {
                if (data.tbCopyInfo.area_number == 10) {
                    this.img_boss.visible = true;
                }
                else {
                    this.img_boss.visible = false;
                }
            }
            else {
                this.img_boss.visible = false;
            }
        };
        GuanQiaNewIR.prototype.setSelect = function (val, force) {
            if (force === void 0) { force = false; }
            if (this._isSelect == val && !force)
                return;
            this._isSelect = val;
            this.img_icon.skin = val ? "comp/image/gq_zuobiao2.png" : "comp/image/gq_zuobiao.png";
            this.img_boss.gray = !val;
        };
        return GuanQiaNewIR;
    }(ui.guaji.GuanQiaNewIRUI));
    game.GuanQiaNewIR = GuanQiaNewIR;
})(game || (game = {}));
