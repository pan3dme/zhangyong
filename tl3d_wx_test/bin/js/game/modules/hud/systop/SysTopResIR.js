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
    var SysTopResIR = /** @class */ (function (_super) {
        __extends(SysTopResIR, _super);
        function SysTopResIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SysTopResIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        SysTopResIR.prototype.refreshView = function () {
            var resType = this._dataSource;
            if (resType) {
                this.imgRes.skin = SkinUtil.getCostSkin(resType);
                this.lbNum.text = Snums(App.getResNum(resType));
                this.btnAdd.on(Laya.Event.CLICK, this, this.onClick);
                var ary = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
                this.btnAdd.visible = ary.indexOf(resType) != -1;
                this.width = ary.indexOf(resType) != -1 ? 130 : 110;
            }
            else {
                this.imgRes.skin = null;
                this.lbNum.text = "";
                this.btnAdd.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        SysTopResIR.prototype.onClick = function () {
            var resType = this._dataSource;
            switch (resType) {
                case iface.tb_prop.resTypeKey.gold:
                    // 交换金币
                    UIMgr.showUI(UIConst.ExchangeGoldView);
                    break;
                case iface.tb_prop.resTypeKey.diamond:
                    // 打开充值界面
                    dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                    break;
            }
        };
        return SysTopResIR;
    }(ui.hud.render.SysTopResIRUI));
    game.SysTopResIR = SysTopResIR;
})(game || (game = {}));
