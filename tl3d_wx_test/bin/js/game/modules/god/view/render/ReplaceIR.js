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
    var godReplaceIR = /** @class */ (function (_super) {
        __extends(godReplaceIR, _super);
        function godReplaceIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(godReplaceIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.initView();
            },
            enumerable: true,
            configurable: true
        });
        godReplaceIR.prototype.initView = function () {
            var godVo = this.dataSource;
            if (godVo) {
                this.headbox.dataSource = godVo;
                this.lbName.text = godVo.tab_god.name;
                this.btnShangzhen.on(Laya.Event.CLICK, this, this.onShangzhen);
                this.headbox.on(Laya.Event.CLICK, this, this.onShow);
            }
            else {
                this.headbox.dataSource = null;
                this.btnShangzhen.off(Laya.Event.CLICK, this, this.onShangzhen);
                this.headbox.off(Laya.Event.CLICK, this, this.onShow);
            }
        };
        godReplaceIR.prototype.onShangzhen = function () {
            var view = UIMgr.getUIByName(UIConst.God_ReplaceGodView);
            var originGod = view.getGodVo();
            if (this.dataSource) {
                game.GodUtils.replaceGod(originGod, this.dataSource, view.getPos());
            }
        };
        godReplaceIR.prototype.onShow = function () {
            dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), this._dataSource);
        };
        return godReplaceIR;
    }(ui.god.render.ReplaceIRUI));
    game.godReplaceIR = godReplaceIR;
})(game || (game = {}));
