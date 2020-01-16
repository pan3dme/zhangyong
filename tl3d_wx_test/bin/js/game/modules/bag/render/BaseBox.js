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
    var BaseBox = /** @class */ (function (_super) {
        __extends(BaseBox, _super);
        function BaseBox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BaseBox.prototype, "dataSource", {
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
        BaseBox.prototype.refreshData = function (item) {
            if (item) {
                this.label_number.text = "";
                this.lab_equiprefine.text = "";
                this.img_icon.skin = item.getIconUrl();
                this.img_qulity.skin = item.getQulity();
                this.lbLevel.visible = false;
                if (GameUtil.isFunction(item.getLvStr)) {
                    var str = item.getLvStr();
                    this.lbLevel.visible = str && str != "";
                    this.lbLevel.text = str;
                }
                if (item instanceof ItemVo || item instanceof tb.TB_item) {
                    var num = Number(item.getNum());
                    this.label_number.visible = num > 0;
                    this.label_number.text = "x" + Snums(num);
                }
                else if (item instanceof EquipItemVo) {
                    var refinelev = Number(item.getRefineLevel());
                    this.lab_equiprefine.text = "+" + refinelev;
                    var strenglev = Number(item.getStrengthLv());
                    this.label_number.visible = strenglev != 0;
                    this.label_number.text = "+" + strenglev;
                }
                this.anim_select.visible = item.selectid == item.indexid;
                this.anim_select.play();
            }
            else {
                this.img_icon.skin = "";
                this.img_qulity.skin = "";
                this.label_number.text = "";
                this.lab_equiprefine.text = "";
                this.anim_select.gotoAndStop(0);
            }
        };
        return BaseBox;
    }(ui.bag.BaseBoxUI));
    game.BaseBox = BaseBox;
})(game || (game = {}));
