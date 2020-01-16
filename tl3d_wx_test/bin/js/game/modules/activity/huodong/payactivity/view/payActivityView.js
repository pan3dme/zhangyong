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
    var payActivityView = /** @class */ (function (_super) {
        __extends(payActivityView, _super);
        function payActivityView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list_btn.selectHandler = new Handler(_this, _this.onTabSelect);
            _this.list_btn.renderHandler = new Handler(_this, _this.onTabRender);
            return _this;
        }
        payActivityView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        payActivityView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        payActivityView.prototype.initView = function () {
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.onUpdateRes, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
            this.onUpdateRes();
            this.list_btn.array = game.HuodongModel.getInstance().payTabItemLabel;
            var index = !isNaN(this.dataSource) && this.dataSource >= 0 ? this.dataSource : 0;
            this.list_btn.selectedIndex = index;
            this.onTabSelect(this.list_btn.selectedIndex);
            this.list_btn.scrollTo(0);
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        };
        payActivityView.prototype.onTabRender = function (cell, index) {
            cell.selectBox.selected = index == this._selectTabNum;
        };
        payActivityView.prototype.onTabSelect = function (index) {
            if (this._selectTabNum == index)
                return;
            var uiskin = null;
            this._selectTabNum = index;
            this.hideAll();
            var btnData = this.list_btn.getItem(index);
            var type = btnData ? btnData[0] : -1;
            switch (type) {
                case game.WelfareType.dayLibao:
                case game.WelfareType.weekLibao:
                case game.WelfareType.monthLibao:
                    if (!this._xiangouLibaoView) {
                        this._xiangouLibaoView = new game.XiangouLibaoView();
                        this._xiangouLibaoView.centerX = 0;
                        this._xiangouLibaoView.y = 456;
                    }
                    this.addChildAt(this._xiangouLibaoView, 2);
                    this._xiangouLibaoView.onEnter(type);
                    uiskin = SkinUtil.getWelfareTitle(type);
                    break;
                case game.WelfareType.yueka:
                    if (!this._yuekaView) {
                        this._yuekaView = new game.YuekaView();
                        this._yuekaView.centerX = 0;
                        this._yuekaView.y = 460;
                    }
                    this.addChildAt(this._yuekaView, 2);
                    this._yuekaView.onAdd();
                    uiskin = "fuli/yuekainfo.jpg";
                    break;
                case game.WelfareType.dengjiJijin:
                    if (!this._jijinView) {
                        this._jijinView = new game.JijinView();
                        this._jijinView.centerX = 0;
                        this._jijinView.y = 107;
                    }
                    this.addChildAt(this._jijinView, 2);
                    this._jijinView.onAdd();
                    uiskin = "fuli/guanggaotu2.jpg";
                    break;
                default:
                    break;
            }
            this.imgTitle.skin = uiskin;
            Laya.Tween.clearTween(this.imgTitle);
            this.imgTitle.x = 0;
            var tagX = this.imgTitle.x + 720;
            Laya.Tween.from(this.imgTitle, { x: tagX }, 500, Laya.Ease.backOut);
        };
        payActivityView.prototype.hideAll = function () {
            if (this._xiangouLibaoView && this._xiangouLibaoView.parent) {
                this._xiangouLibaoView.onExit();
                this._xiangouLibaoView.removeSelf();
            }
            if (this._yuekaView && this._yuekaView.parent) {
                this._yuekaView.onExit();
                this._yuekaView.removeSelf();
            }
            if (this._jijinView && this._jijinView.parent) {
                this._jijinView.onExit();
                this._jijinView.removeSelf();
            }
        };
        payActivityView.prototype.setBtnLabel = function () {
            if (this._jijinView) {
                this._jijinView.setBtnLabel();
            }
        };
        payActivityView.prototype.initJijinlist = function () {
            if (this._jijinView) {
                this._jijinView.initView();
            }
        };
        payActivityView.prototype.initYuekaView = function () {
            if (this._yuekaView) {
                this._yuekaView.initView();
            }
        };
        payActivityView.prototype.updateXiangouLibao = function () {
            if (this._xiangouLibaoView) {
                this._xiangouLibaoView.initView();
            }
        };
        payActivityView.prototype.close = function () {
            _super.prototype.close.call(this);
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, [ModuleConst.MAIN]));
        };
        payActivityView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.btnClose.off(Laya.Event.CLICK, this, this.close);
            this.hideAll();
            this._selectTabNum = -1;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.onUpdateRes, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
        };
        /** 更新资源 (页面显示该商店所需要的资源图标 + 玩家拥有数目)*/
        payActivityView.prototype.onUpdateRes = function () {
            this.boxRes.width = 312;
            this.lab_zuanshi.text = Snums(App.hero.diamond);
            this.lab_money.text = Snums(App.hero.gold);
        };
        return payActivityView;
    }(ui.activity.huodong.welfare.payActivityUI));
    game.payActivityView = payActivityView;
})(game || (game = {}));
