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
    var OreExplainView = /** @class */ (function (_super) {
        __extends(OreExplainView, _super);
        function OreExplainView() {
            return _super.call(this) || this;
        }
        OreExplainView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.lbGain.autoSize = true;
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12210) };
        };
        OreExplainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        OreExplainView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        OreExplainView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.itemList.array = null;
        };
        OreExplainView.prototype.initView = function () {
            var tbOre = this.dataSource;
            this.bgPanel.updateTitle(tbOre.name);
            this.lbGain.text = LanMgr.getLan('', 10191, tbOre.reward[1]);
            this.lbMinu.text = "/" + Math.floor(tbOre.interval / 60) + LanMgr.getLan("", 12090);
            this.lbGain.x = this.width / 2 - (this.lbGain.width + 145) / 2;
            this.imgGain.skin = SkinUtil.getCostSkin(tbOre.reward[0]);
            this.imgGain.x = this.lbGain.x + this.lbGain.width + 5;
            this.lbMinu.x = this.imgGain.x + this.imgGain.width + 5;
            this.itemList.array = tbOre.getRateList();
        };
        return OreExplainView;
    }(ui.island.OreExplainUI));
    game.OreExplainView = OreExplainView;
})(game || (game = {}));
