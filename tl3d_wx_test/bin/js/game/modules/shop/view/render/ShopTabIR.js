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
    var ShopTabIR = /** @class */ (function (_super) {
        __extends(ShopTabIR, _super);
        function ShopTabIR() {
            var _this = _super.call(this) || this;
            _this._isSelect = false;
            return _this;
        }
        Object.defineProperty(ShopTabIR.prototype, "dataSource", {
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
        ShopTabIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (!info)
                return;
            // this.lab_name.text = info.name;
            this.img_tab.skin = SkinUtil.getShopTabSkin(info.type);
            this.redpoint.onDispose();
            if (info.type === ShopType.jishi) {
                this.redpoint.setRedPointName("jishi_group");
            }
        };
        ShopTabIR.prototype.setSelect = function (val) {
            if (this._isSelect == val)
                return;
            this._isSelect = val;
            this.tab_zhuobu.selected = val;
            // if (this._isSelect){
            // 	this.img_tab.skin = "comp/bg/naniu2.png";
            // 	this.lab_name.color = "#ffeecc";
            // 	this.lab_name.stroke = 4;
            // 	this.lab_name.strokeColor = "#4c260d";
            // }else{
            // 	this.img_tab.skin = "comp/bg/anniu.png";
            // 	this.lab_name.color = "#4c260d";
            // 	this.lab_name.stroke = 0;
            // }
        };
        return ShopTabIR;
    }(ui.shop.ShopTabIRUI));
    game.ShopTabIR = ShopTabIR;
})(game || (game = {}));
