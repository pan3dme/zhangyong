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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var game;
(function (game) {
    var GemstoneCompoundView = /** @class */ (function (_super) {
        __extends(GemstoneCompoundView, _super);
        function GemstoneCompoundView() {
            var _this = _super.call(this) || this;
            _this._curLv = 0;
            _this._curType = 0;
            return _this;
        }
        GemstoneCompoundView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.listGems.mouseHandler = new Handler(this, this.onMouseClick);
            this.listGems.renderHandler = new Handler(this, this.onGenRender);
            this.listYulan.renderHandler = new Handler(this, this.onYulanRender);
            this.btnComp.on(Laya.Event.CLICK, this, this.onOneKeyCompound);
            this.lvCombo.selectedIndex = -1;
            this.typeCombo.selectedIndex = -1;
            this.lvCombo.dataSource = ["2", "3", "4", "5", "6", "7", "8"];
            this.lvCombo.selectHandler = new Handler(this, this.onSelectLv);
            this.lvCombo.showHandler = new Handler(this, this.onShowCombo);
            this.typeCombo.dataSource = [LanMgr.getLan("", 12453), LanMgr.getLan("", 12351), LanMgr.getLan("", 12352), LanMgr.getLan("", 12353)];
            this.typeCombo.selectHandler = new Handler(this, this.onSelectType);
            this.typeCombo.showHandler = new Handler(this, this.onShowCombo);
        };
        GemstoneCompoundView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        GemstoneCompoundView.prototype.show = function () {
            _super.prototype.show.call(this);
            this.initView();
        };
        GemstoneCompoundView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.lvCombo.selectedIndex = -1;
            this.typeCombo.selectedIndex = -1;
            this.listGems.array = null;
            this.listYulan.array = null;
        };
        GemstoneCompoundView.prototype.initView = function () {
            this.refreshView();
            this._curLv = 8;
            this._curType = 0;
            this.lvCombo.selectedIndex = 6;
            this.typeCombo.selectedIndex = 0;
            this.renderYulan();
        };
        GemstoneCompoundView.prototype.onSelectLv = function (index) {
            if (index < 0)
                return;
            this._curLv = this.lvCombo.selectedIndex + 2;
            this.renderYulan();
        };
        GemstoneCompoundView.prototype.onSelectType = function (index) {
            if (index < 0)
                return;
            this._curType = this.typeCombo.selectedIndex;
            this.renderYulan();
        };
        GemstoneCompoundView.prototype.onShowCombo = function (show) {
            this.isModelClose = !show;
        };
        /** 渲染预览 */
        GemstoneCompoundView.prototype.renderYulan = function () {
            var list = game.GemstoneUtils.getCanCompMaxLvList(this._curType, this._curLv);
            this.listYulan.array = list;
            this.listYulan.width = list.length * 100 + (list.length - 1) * this.listYulan.spaceX;
            this.boxEmptyHC.visible = list.length == 0;
        };
        /** 点击宝石 */
        GemstoneCompoundView.prototype.onMouseClick = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var gemVo = this.listGems.getItem(index);
                if (gemVo.gemLv >= game.GemstoneModel.max_gem_lv) {
                    showToast(LanMgr.getLan('', 10298));
                    return;
                }
                UIMgr.showUI(UIConst.SingleCompoundView, gemVo);
            }
        };
        /** 宝石渲染 */
        GemstoneCompoundView.prototype.onGenRender = function (box, index) {
            var gemVo = box.dataSource;
            if (gemVo) {
                var itemBox = box.getChildByName("itemBox");
                var lbLv = box.getChildByName("lbLv");
                var imgRedpoint = box.getChildByName("imgRedpoint");
                itemBox.dataSource = gemVo;
                itemBox.itemBox.lbLevel.visible = false;
                lbLv.text = "" + gemVo.gemLv + LanMgr.getLan("", 10031) + LanMgr.attrName[gemVo.tbGem.getAttrType()];
                imgRedpoint.visible = game.GemstoneUtils.isCanCompoundByMaterial(gemVo.tbItem.ID);
            }
        };
        GemstoneCompoundView.prototype.onYulanRender = function (box, index) {
            var itemVo = box.dataSource;
            if (itemVo) {
                var itemBox = box.getChildByName("itemBox");
                var lbLv = box.getChildByName("lbLv");
                itemBox.dataSource = itemVo;
                itemBox.itemBox.lbLevel.visible = false;
                itemBox.itemBox.addTipsListener();
                var tbItem = tb.TB_item.get_TB_itemById(itemVo.id);
                var tbGem = tb.TB_gemstone_new.getTBOneById(tbItem.defined[0]);
                lbLv.text = "" + tbGem.getLevel() + LanMgr.getLan("", 10031) + LanMgr.attrName[tbGem.getAttrType()];
            }
        };
        /** 刷新界面 */
        GemstoneCompoundView.prototype.refreshView = function () {
            var list = __spreadArrays(game.GemstoneModel.getInstance().getCompoundViewList());
            list.sort(function (a, b) {
                return b.gemLv - a.gemLv;
            });
            this.listGems.array = list;
            this.boxEmptyGems.visible = list.length == 0;
            this.renderYulan();
        };
        /** 一键合成 */
        GemstoneCompoundView.prototype.onOneKeyCompound = function () {
            dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.ONEKEY_COMPOUND_GEM), [this._curLv, this._curType, __spreadArrays(this.listYulan.array)]);
        };
        return GemstoneCompoundView;
    }(ui.equip.gemstone.GemstoneCompoundUI));
    game.GemstoneCompoundView = GemstoneCompoundView;
})(game || (game = {}));
