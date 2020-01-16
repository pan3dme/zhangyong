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
    var YuanzhengView = /** @class */ (function (_super) {
        __extends(YuanzhengView, _super);
        function YuanzhengView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            _this.isModelClose = true;
            return _this;
        }
        YuanzhengView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._guanqiaList = [];
            for (var i = 1; i <= 15; i++) {
                this._guanqiaList.push(this["item" + i]);
            }
            this._baoxiangList = [];
            for (var i = 1; i <= 5; i++) {
                this._baoxiangList.push(this["box" + i]);
            }
            this.itemPanel.hScrollBarSkin = "";
            this.imgBg1.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION, 1);
            this.imgBg2.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION, 2);
            this.imgBg3.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION, 3);
            this.imgBg4.skin = SkinUtil.getSysMapSkin(ModuleConst.EXPEDITION, 4);
        };
        YuanzhengView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.showTopView();
            this.initView(true);
        };
        YuanzhengView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.showTopView();
            this.initView(true);
        };
        YuanzhengView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.Tween.clearTween(this.imgArrow);
            for (var i = 0, len = this._guanqiaList.length; i < len; i++) {
                this._guanqiaList[i].dataSource = null;
            }
            for (var i = 0, len = this._baoxiangList.length; i < len; i++) {
                this._baoxiangList[i].dataSource = null;
            }
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateCount, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        YuanzhengView.prototype.showTopView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_shop, callback: this.onShop.bind(this) },
                { btnId: game.BtnFuncId.reviveHero, btnSkin: SkinUtil.btn_fuhuo, text: App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui), callback: this.onFuhuo.bind(this) },
                { btnId: game.BtnFuncId.recoverHero, btnSkin: SkinUtil.btn_huifu, text: App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui), callback: this.onHuifu.bind(this) },
                { btnSkin: SkinUtil.btn_zhuzhan, redpointName: "yuanzheng_dispatch", callback: this.onYuanzhu.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond, iface.tb_prop.resTypeKey.darkEssence];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
        };
        YuanzhengView.prototype.initView = function (scrollTo) {
            if (scrollTo === void 0) { scrollTo = false; }
            var model = game.YuanzhengModel.getInstance();
            var guanqiasData = model.getGuanqiaList();
            for (var i = 0, len = this._guanqiaList.length; i < len; i++) {
                this._guanqiaList[i].dataSource = guanqiasData[i];
            }
            var baoxiangsData = model.getBaoxiangList();
            for (var i = 0, len = this._baoxiangList.length; i < len; i++) {
                this._baoxiangList[i].dataSource = baoxiangsData[i];
            }
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateCount, this);
            var itemRender = this._guanqiaList.find(function (item) {
                return item.dataSource.isCurrent();
            });
            this.setIndexImage(itemRender);
            this.updateCount();
            if (scrollTo) {
                Laya.timer.callLater(this, this.scrollToItemRender, [itemRender ? itemRender : this._guanqiaList[this._guanqiaList.length - 1]]);
            }
        };
        /** 更新药水数量 */
        YuanzhengView.prototype.updateCount = function () {
            var ary = [{ btnId: game.BtnFuncId.reviveHero, text: App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui) }, { btnId: game.BtnFuncId.recoverHero, text: App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui) }];
            dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_SYS_TOP_BTN_INFO), ary);
        };
        /**
         * 设置当前索引位置
         * @param guanqia
         */
        YuanzhengView.prototype.setIndexImage = function (item) {
            if (item) {
                Laya.Tween.clearTween(this.imgArrow);
                this.imgArrow.x = item.x + 13;
                this.imgArrow.y = item.y - 15;
                this.imgArrow.visible = true;
                UIUtil.loop(this.imgArrow, this.imgArrow.x, this.imgArrow.y, 1000, 30, TweenDirection.down);
            }
            else {
                this.imgArrow.visible = false;
                Laya.Tween.clearTween(this.imgArrow);
            }
        };
        /** 定位 */
        YuanzhengView.prototype.scrollToItemRender = function (item) {
            if (item) {
                var scrollX_1 = item.x - 360;
                this.itemPanel.scrollTo(scrollX_1, 0);
            }
        };
        YuanzhengView.prototype.onFuhuo = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_RECOVERY_VIEW, iface.tb_prop.expeditionOpTypeKey.revive));
        };
        YuanzhengView.prototype.onHuifu = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_RECOVERY_VIEW, iface.tb_prop.expeditionOpTypeKey.recover));
        };
        YuanzhengView.prototype.onShop = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_SHOP_VIEW), 4);
        };
        YuanzhengView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_LILIAN));
        };
        YuanzhengView.prototype.onYuanzhu = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_HELP_VIEW));
        };
        return YuanzhengView;
    }(ui.yuanzheng.YuanzhengViewUI));
    game.YuanzhengView = YuanzhengView;
})(game || (game = {}));
