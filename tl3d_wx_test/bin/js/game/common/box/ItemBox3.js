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
* 基础列表格子
* 有底框，如果在基础ItemBoxUI去添加一个底，整体扩大的话 给个ui都要去调，而且精细的居中问题会很麻烦
*/
var common;
(function (common) {
    var ItemBox3 = /** @class */ (function (_super) {
        __extends(ItemBox3, _super);
        function ItemBox3() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemBox3.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var _this = this;
                this._dataSource = data;
                this.itemBox.dataSource = data;
                if (data && data instanceof ItemVo && data.isShowEff) {
                    this.ani_light.visible = true;
                    this.ani_light.loadAnimation(ResConst.anim_teshutishi, Handler.create(null, function () {
                        _this.ani_light.play(1, true);
                    }), ResConst.atlas_teshutishi);
                }
                else {
                    this.ani_light.visible = false;
                    this.ani_light.stop();
                }
            },
            enumerable: true,
            configurable: true
        });
        return ItemBox3;
    }(ui.box.ItemBox3UI));
    common.ItemBox3 = ItemBox3;
})(common || (common = {}));
