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
    var BoxIR = /** @class */ (function (_super) {
        __extends(BoxIR, _super);
        function BoxIR() {
            var _this = _super.call(this) || this;
            _this.list_star.renderHandler = new Handler(_this, _this.onStarRender);
            return _this;
        }
        Object.defineProperty(BoxIR.prototype, "dataSource", {
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
        BoxIR.prototype.refreshData = function () {
            if (this._dataSource) {
                var item = this._dataSource;
                this.ui_base.dataSource = item;
                var isChip = item.isChip();
                this.img_suipian.visible = isChip;
                if (isChip && GameUtil.isFunction(item.getChipSkin)) {
                    this.img_suipian.skin = item.getChipSkin();
                }
                var star = Number(item.getStar());
                this.list_star.visible = star != 0;
                this.drawStar(star);
                var race = Number(item.showRace());
                this.img_race.visible = race != 0;
                if (this.img_race.visible) {
                    this.img_race.skin = SkinUtil.getGodRaceSkin(race);
                }
                this.img_zhizhen.visible = item.selectid == item.indexid;
                if (item instanceof ItemVo) {
                    if (item.type == iface.tb_prop.itemTypeKey.gift || item.type == iface.tb_prop.itemTypeKey.optionalCard) {
                        this.redpoint.setRedPointName("bag_material_" + item.id);
                    }
                    else if (item.type == iface.tb_prop.itemTypeKey.chip) {
                        this.redpoint.setRedPointName("bag_suipian_" + item.id);
                    }
                    else if (item.type == iface.tb_prop.itemTypeKey.timeItem) {
                        this.redpoint.setRedPointName("bag_timeItem_" + item['uuid']);
                    }
                    else
                        this.redpoint.onDispose();
                }
                else {
                    this.redpoint.onDispose();
                }
            }
            else {
                this.ui_base.dataSource = null;
                this.img_suipian.visible = false;
                this.list_star.visible = false;
                this.img_race.skin = "";
                this.img_zhizhen.visible = false;
                this.redpoint.onDispose();
            }
        };
        BoxIR.prototype.drawStar = function (star) {
            if (this.list_star.visible) {
                var ary = new Array;
                var flag = star > 5;
                var len = flag ? star - 5 : star;
                for (var i = 0; i < len; i++) {
                    ary.push(flag ? SkinUtil.superXing : SkinUtil.iconxing);
                }
                this.list_star.dataSource = ary;
            }
        };
        BoxIR.prototype.onStarRender = function ($cell) {
            $cell.skin = $cell.dataSource;
        };
        return BoxIR;
    }(ui.bag.ItemBoxUI));
    game.BoxIR = BoxIR;
})(game || (game = {}));
