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
    var GemstoneReplaceView = /** @class */ (function (_super) {
        __extends(GemstoneReplaceView, _super);
        function GemstoneReplaceView() {
            return _super.call(this) || this;
        }
        GemstoneReplaceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12451) };
            this.listGems.mouseHandler = new Handler(this, this.onSelect);
            this.listGems.renderHandler = new Handler(this, this.onGenRender);
            this.listGems.selectEnable = false;
            this.addChild(this.bgPanel.btnClose);
        };
        GemstoneReplaceView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        GemstoneReplaceView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.listGems.array = null;
        };
        GemstoneReplaceView.prototype.initView = function () {
            var info = this.dataSource;
            var list = game.GemstoneModel.getInstance().getReplaceViewList(info.type, true);
            this.listGems.array = list;
            this.imgEmpty.visible = list.length == 0;
            this.lbEmpty.text = LanMgr.getLan("", 12452, LanMgr.baoshiName[info.type]);
        };
        GemstoneReplaceView.prototype.onSelect = function (evt, index) {
            if (index == -1)
                return;
            if (evt.type == Laya.Event.CLICK) {
                var gemstoneVo = this.listGems.array[index];
                var info = this.dataSource;
                if (!gemstoneVo || !info)
                    return;
                var vo = { gemVo: gemstoneVo, godVo: info.godVo, hideBtn: false, slot: info.slot };
                UIMgr.showUI(UIConst.GemstoneTipsView, vo);
            }
        };
        /** 宝石渲染 */
        GemstoneReplaceView.prototype.onGenRender = function (box, index) {
            var gemVo = box.dataSource;
            if (gemVo) {
                var itemBox = box.getChildByName("itemBox");
                var lbLv = box.getChildByName("lbLv");
                itemBox.dataSource = gemVo;
                itemBox.itemBox.lbLevel.visible = false;
                lbLv.text = "" + gemVo.gemLv + LanMgr.getLan("", 10031) + LanMgr.attrName[gemVo.tbGem.getAttrType()];
            }
        };
        return GemstoneReplaceView;
    }(ui.equip.gemstone.GemstoneReplaceUI));
    game.GemstoneReplaceView = GemstoneReplaceView;
})(game || (game = {}));
