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
    var BaoshiIR = /** @class */ (function (_super) {
        __extends(BaoshiIR, _super);
        function BaoshiIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BaoshiIR.prototype, "dataSource", {
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
        BaoshiIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.imgAttr.skin = SkinUtil.getAttrSkin(info.type);
                this.lbAttr.text = "0";
                var gemVo = info.gemVo;
                var isExist = gemVo ? true : false;
                this.itemBox.visible = isExist;
                this.btnAdd.visible = !isExist;
                this.itemBox.dataSource = gemVo;
                this.itemBox.label_number.visible = false;
                this.itemBox.lbLevel.visible = false;
                this.lbName.text = LanMgr.baoshiName[info.type];
                if (gemVo) {
                    this.lbAttr.text = gemVo.tbGem.getAttrVal() + "";
                    this.lbName.text = gemVo.tbItem.name;
                }
                this.redpoint.onDispose();
                if (info.godVo) {
                    this.redpoint.setRedPointName("equip_baoshi_" + info.godVo.uuid + "_" + info.slot);
                }
                this.imgBg.on(Laya.Event.CLICK, this, this.onChange);
            }
            else {
                this.itemBox.dataSource = null;
                this.redpoint.onDispose();
                this.imgBg.off(Laya.Event.CLICK, this, this.onChange);
            }
        };
        BaoshiIR.prototype.playAnim = function () {
            var info = this.dataSource;
            if (!info)
                return;
            this.ani_succ.loadAnimation(ResConst.anim_strength, Handler.create(this, function () {
                this.ani_succ.play(0, false);
                this.ani_succ.visible = true;
            }), ResConst.atlas_strength_effect);
        };
        BaoshiIR.prototype.onChange = function () {
            var info = this.dataSource;
            if (!info)
                return;
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.SHOW_REPLACE_GEM_VIEW), info);
        };
        return BaoshiIR;
    }(ui.equip.gemstone.BaoShiIRUI));
    game.BaoshiIR = BaoshiIR;
})(game || (game = {}));
