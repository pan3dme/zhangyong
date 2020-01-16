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
    var SingleCompoundView = /** @class */ (function (_super) {
        __extends(SingleCompoundView, _super);
        function SingleCompoundView() {
            var _this = _super.call(this) || this;
            _this._curNum = 1;
            _this._maxNum = 0;
            return _this;
        }
        SingleCompoundView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 12450) };
            this._curGemvo = game.GemstoneUtils.createGemstoneVo();
            this._nextGemvo = game.GemstoneUtils.createGemstoneVo();
            this._counterBar = new common.CounterBar();
            this._counterBar.setComponent(this.btnAddOne, this.btnAddTen, this.btnRedOne, this.btnRedTen, this.lbInput);
            this.btnComp.on(Laya.Event.CLICK, this, this.onCompound);
        };
        SingleCompoundView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
        };
        SingleCompoundView.prototype.show = function () {
            _super.prototype.show.call(this);
            this.initView();
        };
        SingleCompoundView.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        SingleCompoundView.prototype.initView = function () {
            var info = this.dataSource;
            var curTbItem = info.tbItem;
            this._curGemvo.setData({ equipId: 0, num: 0, templateId: curTbItem.ID });
            var curTbGem = tb.TB_gemstone_new.getTBOneById(curTbItem.defined[0]);
            this.headBox1.dataSource = curTbItem;
            this.headBox1.itemBox.label_number.visible = false;
            this.imgAttr1.skin = SkinUtil.getAttrSkin(curTbGem.getAttrType());
            this.lbAttr1.text = curTbGem.getAttrVal() + "";
            this.lbName1.text = curTbItem.name;
            this._nextGemvo.setData({ equipId: 0, num: 0, templateId: curTbItem.ID + 1 });
            var nexTbItem = tb.TB_item.get_TB_itemById(this._nextGemvo.templateId);
            var nextTbGem = tb.TB_gemstone_new.getTBOneById(nexTbItem.defined[0]);
            this.headBox2.dataSource = nexTbItem;
            this.headBox2.itemBox.label_number.visible = false;
            this.imgAttr2.skin = SkinUtil.getAttrSkin(nextTbGem.getAttrType());
            this.lbAttr2.text = nextTbGem.getAttrVal() + "";
            this.lbName2.text = nexTbItem.name;
            this._maxNum = game.GemstoneUtils.getCompoundNum(nexTbItem.ID);
            this._curNum = Math.max(1, this._maxNum);
            this._counterBar.setInitData(this._curNum, this._maxNum, this.setSumNum.bind(this));
            this.setSumNum();
        };
        /** 设置数量 */
        SingleCompoundView.prototype.setSumNum = function () {
            var compoundObj = game.GemstoneUtils.getCompoundObjById(this._nextGemvo.templateId);
            if (!compoundObj)
                return;
            this._curNum = this._counterBar.getCurNum();
            this.lbInput.text = this._curNum.toString();
            var needNum = compoundObj.materialNum * this._curNum;
            var ownNum = game.GemstoneUtils.getOwnNum(compoundObj.materialId);
            this.pbNum.value = ownNum / needNum;
            this.lbNum.text = ownNum + "/" + needNum;
        };
        /** 刷新界面 */
        SingleCompoundView.prototype.refreshView = function () {
            this.initView();
        };
        SingleCompoundView.prototype.playSuccAnim = function () {
        };
        /** 合成 */
        SingleCompoundView.prototype.onCompound = function () {
            if (this._curNum <= 0) {
                showToast(LanMgr.getLan('', 10299));
                return;
            }
            if (this._curGemvo.templateId) {
                dispatchEvt(new game.GemstoneEvent(game.GemstoneEvent.COMPOUND_GEMSTONE), [this._nextGemvo.templateId, this._curNum]);
            }
        };
        return SingleCompoundView;
    }(ui.equip.gemstone.SingleCompoundUI));
    game.SingleCompoundView = SingleCompoundView;
})(game || (game = {}));
