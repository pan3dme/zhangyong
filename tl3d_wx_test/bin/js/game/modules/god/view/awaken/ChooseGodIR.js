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
    var ChooseGodIR = /** @class */ (function (_super) {
        __extends(ChooseGodIR, _super);
        function ChooseGodIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChooseGodIR.prototype, "dataSource", {
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
        /** 初始化界面 */
        ChooseGodIR.prototype.initView = function () {
            if (!this._dataSource)
                return;
            var info = this.dataSource;
            if (info) {
                this.redpoint.onDispose();
                this.img_gouxuan.visible = false;
                this.god_icon.dataSource = null;
                this.item_icon.dataSource = null;
                this.god_icon.visible = this.item_icon.visible = false;
                this.gray = false;
                if (info instanceof GodItemVo) {
                    this.god_icon.dataSource = info;
                    this.god_icon.visible = true;
                    this.gray = this.dataSource.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
                }
                else {
                    this.item_icon.dataSource = info;
                    this.item_icon.visible = true;
                }
            }
            else {
                this.redpoint.onDispose();
                this.god_icon.dataSource = null;
                this.item_icon.dataSource = null;
                this.god_icon.visible = this.item_icon.visible = false;
                this.gray = false;
            }
        };
        /** 更新数据 */
        ChooseGodIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                if (info instanceof GodItemVo) {
                    this.gray = this.dataSource.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
                }
            }
        };
        return ChooseGodIR;
    }(ui.god.render.ChooseBoxUI));
    game.ChooseGodIR = ChooseGodIR;
})(game || (game = {}));
