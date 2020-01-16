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
    var CurMainView = /** @class */ (function (_super) {
        __extends(CurMainView, _super);
        function CurMainView() {
            var _this = _super.call(this) || this;
            _this._helpPoint = new Laya.Point();
            _this.isModelClose = true;
            _this.group = UIConst.two_group;
            _this.bgPanel.dataSource = { uiName: UIConst.GodDoorView, closeOnSide: false, title: "神界之门" };
            _this.bgPanel.box_Content.addChild(_this.viewStack);
            _this.list_tab.dataSource = [{ label: "神界之门" }, { label: "英雄转换" }];
            return _this;
        }
        CurMainView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.init();
        };
        CurMainView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.init();
        };
        CurMainView.prototype.init = function () {
            this.list_tab.selectHandler = Handler.create(this, this.onTab, null, false);
            this.onTab(0);
            this.drawMoney();
            this.btn_tishi.on(Laya.Event.CLICK, this, this.tishi);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.drawMoney, this);
        };
        CurMainView.prototype.drawMoney = function () {
            this.lab_jiejingnum.text = Snums(App.hero.godCrystal);
            this.lab_xingchennum.text = Snums(App.hero.convertDust);
            this.lab_miyaonum.text = Snums(App.hero.getBagItemNum(CostTypeKey.shenjiemiyao));
        };
        CurMainView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.onTab(-1);
            if (this.list_tab.selectHandler) {
                this.list_tab.selectHandler.recover();
                this.list_tab.selectHandler = null;
            }
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.drawMoney, this);
        };
        CurMainView.prototype.onTab = function (index) {
            this.list_tab.selectedIndex = index;
            this.viewStack.selectedIndex = index;
            common.TabIR3.onSelectCell(this.list_tab.cells, index);
            if (index == 0) {
                //神界之门界面
                this.vs_item0.init();
                this.vs_item1.close();
            }
            else if (index == 1) {
                //神力转换界面
                this.vs_item0.close();
                this.vs_item1.init();
            }
            else {
                this.vs_item0.close();
                this.vs_item1.close();
            }
        };
        CurMainView.prototype.tishi = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20021));
        };
        CurMainView.prototype.addBoxMask = function (callback) {
            if (callback === void 0) { callback = null; }
            if (!this._hitBoxArea) {
                this._hitBoxArea = this.box_mask.hitArea = new Laya.HitArea();
                var posx = (this.width - Laya.stage.width) / 2;
                var posy = (this.height - Laya.stage.height) / 2;
                this.box_mask.x = posx;
                this.box_mask.y = posy;
                this.box_mask.width = Laya.stage.width;
                this.box_mask.height = Laya.stage.height;
                this._hitBoxArea.hit.drawRect(0, 0, this.box_mask.width, this.box_mask.height, "#000000");
            }
            this.box_mask.visible = true;
            this._hitBoxArea.unHit.clear();
            this.box_mask.on(Laya.Event.CLICK, this, this.onClickBoxMask);
            if (this._hitBoxMaskCB)
                this._hitBoxMaskCB.recover();
            this._hitBoxMaskCB = callback;
        };
        CurMainView.prototype.onClickBoxMask = function () {
            if (this._hitBoxMaskCB) {
                this._hitBoxMaskCB.run();
            }
        };
        CurMainView.prototype.addBoxMaskUnit = function (target) {
            if (!target || !this._hitBoxArea)
                return;
            this._helpPoint.setTo(0, 0);
            this._helpPoint = target.localToGlobal(this._helpPoint);
            this._helpPoint = this.box_mask.globalToLocal(this._helpPoint);
            this._hitBoxArea.unHit.drawRect(this._helpPoint.x, this._helpPoint.y, target.width, target.height, "#000000");
        };
        //移除遮罩
        CurMainView.prototype.removeBoxMask = function () {
            this.box_mask.visible = false;
            if (this._hitBoxArea) {
                this._hitBoxArea.unHit.clear();
            }
            this.box_mask.off(Laya.Event.CLICK, this, this.onClickBoxMask);
            if (this._hitBoxMaskCB)
                this._hitBoxMaskCB.recover();
            this._hitBoxMaskCB = null;
        };
        return CurMainView;
    }(ui.goddoor.CurMainUI));
    game.CurMainView = CurMainView;
})(game || (game = {}));
