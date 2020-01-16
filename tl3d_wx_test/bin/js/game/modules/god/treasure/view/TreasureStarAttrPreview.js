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
* name
*/
var game;
(function (game) {
    /** 选择圣物界面 */
    var TreasureStarAttrPreview = /** @class */ (function (_super) {
        __extends(TreasureStarAttrPreview, _super);
        function TreasureStarAttrPreview() {
            return _super.call(this) || this;
        }
        TreasureStarAttrPreview.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12383) };
            this._buffList = new common.BuffRenderList(this.contentBox.width, this.contentBox.height, null, 50, 2, false);
            this._buffList.isAutoScroll = false;
            this._buffList.spaceY = 10;
            this._buffList.itemRender = game.TreasureStarAttrPreviewIR;
            this.contentBox.addChild(this._buffList);
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        };
        TreasureStarAttrPreview.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        TreasureStarAttrPreview.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._buffList.removeAll();
        };
        TreasureStarAttrPreview.prototype.initView = function () {
            var treasureVo = this.dataSource;
            var list = tb.TB_treasure_star.getList2(treasureVo.quality, treasureVo.slot);
            this._buffList.dataSource = list.map(function (tbData) {
                return [tbData, treasureVo.starLv];
            });
        };
        return TreasureStarAttrPreview;
    }(ui.god.treasure.StarAttrPreviewUI));
    game.TreasureStarAttrPreview = TreasureStarAttrPreview;
})(game || (game = {}));
