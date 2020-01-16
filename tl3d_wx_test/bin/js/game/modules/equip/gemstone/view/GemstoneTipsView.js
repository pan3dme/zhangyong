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
    var GemstoneTipsView = /** @class */ (function (_super) {
        __extends(GemstoneTipsView, _super);
        function GemstoneTipsView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GemstoneTipsView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnWear.on(Laya.Event.CLICK, this, this.onWear);
        };
        GemstoneTipsView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        GemstoneTipsView.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        GemstoneTipsView.prototype.initView = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var tbItem = info.gemVo.tbItem;
            var tbGem = info.gemVo.tbGem;
            this.itemBox.dataSource = tbItem;
            this.lbName.text = tbItem.name;
            this.lbNum.text = info.gemVo.num + "";
            this.lbDesc.text = LanMgr.attrName[tbGem.getType()] + "+" + tbGem.getAttrVal();
            this.btnWear.visible = !info.hideBtn;
        };
        GemstoneTipsView.prototype.onWear = function () {
            var info = this.dataSource;
            if (info) {
                dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.WEAR_GEMSTONE), info);
                this.close();
            }
        };
        return GemstoneTipsView;
    }(ui.equip.gemstone.GemstoneTipsUI));
    game.GemstoneTipsView = GemstoneTipsView;
})(game || (game = {}));
