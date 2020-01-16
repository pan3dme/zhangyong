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
    var WelfareView = /** @class */ (function (_super) {
        __extends(WelfareView, _super);
        function WelfareView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this.list_btn.selectHandler = new Handler(_this, _this.onTabSelect);
            _this.list_btn.renderHandler = new Handler(_this, _this.onTabRender);
            return _this;
        }
        WelfareView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        WelfareView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        WelfareView.prototype.initView = function () {
            this.bgPanel.dataSource = { uiName: UIConst.WelfareView, closeOnSide: this.isModelClose, closeOnButton: true, title: "福利大厅" };
            this._selectTabNum = 0;
            this.list_btn.array = game.HuodongModel.getInstance().welfareTabItemLabel;
            var index = !isNaN(this.dataSource) && this.dataSource >= 0 ? this.dataSource : 0;
            this.list_btn.selectedIndex = index;
            this.onTabSelect(this.list_btn.selectedIndex);
            this.list_btn.scrollTo(0);
            this.btn_left.on(Laya.Event.CLICK, this, this.onLeft);
            this.btn_right.on(Laya.Event.CLICK, this, this.onRight);
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        };
        WelfareView.prototype.onTabRender = function (cell, index) {
            // cell.btn_tab.selected = index == this._selectTabNum;
            cell.eff_select.visible = index == this._selectTabNum;
            if (index == this._selectTabNum) {
                cell.eff_select.play(0, true);
            }
            else {
                cell.eff_select.stop();
            }
        };
        WelfareView.prototype.onTabSelect = function (index) {
            this._selectTabNum = index;
            this.hideAll();
            var btnData = this.list_btn.getItem(index);
            var type = btnData ? btnData[0] : -1;
            switch (type) {
                case game.WelfareType.daySign:
                    if (!this._tosignView) {
                        this._tosignView = new game.ToSignView();
                        this._tosignView.x = 29;
                        this._tosignView.y = 246;
                    }
                    this.addChild(this._tosignView);
                    this._tosignView.onAdd();
                    break;
                case game.WelfareType.monthSign:
                    if (!this._signView) {
                        this._signView = new game.SignView();
                        this._signView.x = 28;
                        this._signView.y = 272;
                    }
                    this.addChild(this._signView);
                    this._signView.onAdd();
                    break;
                case game.WelfareType.xuyuan:
                    if (!this._xuyuanView) {
                        this._xuyuanView = new game.XuyuanView();
                        this._xuyuanView.x = 30;
                        this._xuyuanView.y = 275;
                    }
                    this.addChild(this._xuyuanView);
                    this._xuyuanView.onAdd();
                    break;
                case game.WelfareType.dengjiLibao:
                    if (!this._dengjiView) {
                        this._dengjiView = new game.DengjiView();
                        this._dengjiView.centerX = 0;
                        this._dengjiView.y = 281;
                    }
                    this.addChild(this._dengjiView);
                    this._dengjiView.onAdd();
                    break;
                case game.WelfareType.duihuan:
                    if (!this._duihuanView) {
                        this._duihuanView = new game.DuihuanView();
                        this._duihuanView.x = 47;
                        this._duihuanView.y = 270;
                    }
                    this.addChild(this._duihuanView);
                    this._duihuanView.onAdd();
                    break;
                default:
                    break;
            }
            this.addChild(this.btnClose);
        };
        WelfareView.prototype.hideAll = function () {
            if (this._tosignView && this._tosignView.parent) {
                this._tosignView.onExit();
                this._tosignView.removeSelf();
            }
            if (this._signView && this._signView.parent) {
                this._signView.onExit();
                this._signView.removeSelf();
            }
            if (this._xuyuanView && this._xuyuanView.parent) {
                this._xuyuanView.onExit();
                this._xuyuanView.removeSelf();
            }
            if (this._dengjiView && this._dengjiView.parent) {
                this._dengjiView.onExit();
                this._dengjiView.removeSelf();
            }
            if (this._duihuanView && this._duihuanView.parent) {
                this._duihuanView.onExit();
                this._duihuanView.removeSelf();
            }
        };
        WelfareView.prototype.onLeft = function () {
            var curIndex = this.list_btn.selectedIndex - 1;
            if (curIndex < 0)
                return;
            this.list_btn.scrollTo(--this.list_btn.selectedIndex);
        };
        WelfareView.prototype.onRight = function () {
            var curIndex = this.list_btn.selectedIndex + 1;
            if (curIndex > this.list_btn.array.length - 1)
                return;
            this.list_btn.scrollTo(++this.list_btn.selectedIndex);
        };
        WelfareView.prototype.setwishNums = function () {
            if (this._xuyuanView) {
                this._xuyuanView.setwishNums();
            }
        };
        WelfareView.prototype.startLucik = function ($data, msg) {
            if (this._xuyuanView) {
                this._xuyuanView.startAction($data, msg);
            }
        };
        WelfareView.prototype.initSignViewData = function () {
            if (this._signView) {
                this._signView.initView();
            }
        };
        WelfareView.prototype.initDengjiView = function () {
            if (this._dengjiView) {
                this._dengjiView.listRender();
            }
        };
        WelfareView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.bgPanel.dataSource = null;
            this.btnClose.off(Laya.Event.CLICK, this, this.close);
            this.btn_left.off(Laya.Event.CLICK, this, this.onLeft);
            this.btn_right.off(Laya.Event.CLICK, this, this.onRight);
            this.hideAll();
        };
        return WelfareView;
    }(ui.activity.huodong.welfare.welfareUI));
    game.WelfareView = WelfareView;
})(game || (game = {}));
