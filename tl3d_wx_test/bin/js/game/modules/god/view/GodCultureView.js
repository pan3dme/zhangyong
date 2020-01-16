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
    var GodCultureView = /** @class */ (function (_super) {
        __extends(GodCultureView, _super);
        function GodCultureView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            return _this;
        }
        GodCultureView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnClose.on(Laya.Event.CLICK, this, this.onClick);
            this.btnLeft.on(Laya.Event.CLICK, this, this.onChange, [-1]);
            this.btnRight.on(Laya.Event.CLICK, this, this.onChange, [1]);
        };
        GodCultureView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.godView.height = h;
        };
        GodCultureView.prototype.popup = function () {
            _super.prototype.popup.call(this);
            this.initView();
            this.godView.toOpen();
        };
        GodCultureView.prototype.close = function () {
            _super.prototype.close.call(this);
            this.godView.toClose();
        };
        GodCultureView.prototype.initView = function () {
            var dataAry = this.dataSource;
            this._curSelect = dataAry[0] || 0;
            this._godIdList = dataAry[1] || [];
            var godVo = App.hero.getGodVoById(this._godIdList[this._curSelect]);
            if (godVo) {
                this.godView.curVo = godVo;
                this.godView.tabList.selectedIndex = 0;
                this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHENLING, godVo.tab_god.race_type);
            }
            this.godView.btnChange.visible = this.godView.btn_gh.visible = this.godView.btnBuzhen.visible = false;
            this.updateBtn();
        };
        GodCultureView.prototype.onChange = function (num) {
            this._curSelect += num;
            var godVo = App.hero.getGodVoById(this._godIdList[this._curSelect]);
            if (godVo) {
                var tabIndex = this.godView.tabList.selectedIndex;
                this.godView.curVo = godVo;
                this.godView.onSetIndex(tabIndex);
                this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.SHENLING, godVo.tab_god.race_type);
            }
            this.updateBtn();
        };
        GodCultureView.prototype.updateBtn = function () {
            this.btnLeft.disabled = this._curSelect == 0;
            this.btnRight.disabled = this._curSelect == this._godIdList.length - 1;
        };
        /** 刷新当前神灵数据 */
        GodCultureView.prototype.refreshCurRole = function (godVo) {
            if (!godVo || !this.godView.curVo)
                return;
            if (this.godView.curVo.uuid == godVo.uuid) {
                this.godView.updateView();
                this.godView.refreshCurRole();
            }
        };
        GodCultureView.prototype.onClick = function () {
            this.close();
        };
        Object.defineProperty(GodCultureView.prototype, "viewInfo", {
            get: function () {
                return this.godView.viewInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodCultureView.prototype, "viewJuexing", {
            get: function () {
                return this.godView.viewJuexing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodCultureView.prototype, "viewStarup", {
            get: function () {
                return this.godView.viewStarup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GodCultureView.prototype, "viewRonghun", {
            get: function () {
                return this.godView.viewRonghun;
            },
            enumerable: true,
            configurable: true
        });
        return GodCultureView;
    }(ui.god.GodCultureUI));
    game.GodCultureView = GodCultureView;
})(game || (game = {}));
