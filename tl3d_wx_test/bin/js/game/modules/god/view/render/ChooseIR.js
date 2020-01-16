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
    var godChooseIR = /** @class */ (function (_super) {
        __extends(godChooseIR, _super);
        function godChooseIR() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.CLICK, _this, _this.onBtnClick);
            return _this;
        }
        godChooseIR.prototype.onBtnClick = function () {
            if (!this._dataSource)
                return;
            var godVo = this.dataSource;
            if (!godVo.isInLinuep()) {
                this._dataSource.selected = !this._dataSource.selected;
                this.img_gouxuan.visible = this._dataSource.selected;
            }
        };
        Object.defineProperty(godChooseIR.prototype, "dataSource", {
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
        godChooseIR.prototype.refreshData = function () {
            if (!this._dataSource)
                return;
            var item = this._dataSource;
            this.img_gouxuan.visible = item.selected;
            if (this.dataSource instanceof GodItemVo) {
                this.god_icon.dataSource = item;
            }
            else {
                this.item_icon.dataSource = item;
            }
            if (this.dataSource instanceof GodItemVo) {
                this.gray = this.dataSource.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            }
            else {
                this.gray = false;
            }
            this.item_icon.visible = this.dataSource instanceof ItemVo;
            this.god_icon.visible = this.dataSource instanceof GodItemVo;
        };
        return godChooseIR;
    }(ui.god.render.ChooseBoxUI));
    game.godChooseIR = godChooseIR;
})(game || (game = {}));
