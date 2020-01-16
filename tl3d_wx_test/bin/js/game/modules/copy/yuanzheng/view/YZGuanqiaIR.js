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
    var YZGuanqiaIR = /** @class */ (function (_super) {
        __extends(YZGuanqiaIR, _super);
        function YZGuanqiaIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(YZGuanqiaIR.prototype, "dataSource", {
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
        YZGuanqiaIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.btnOpen.skin = info.isPass() || info.isCurrent() ? SkinUtil.zuobiao_liang : SkinUtil.zuobiao_an;
                this.box.visible = info.isPass();
                this.lbName.text = info.index.toString();
                this.on(Laya.Event.CLICK, this, this.onClick);
            }
            else {
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        };
        YZGuanqiaIR.prototype.onClick = function () {
            dispatchEvt(new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_CHALLENGE_VIEW, this.dataSource));
        };
        return YZGuanqiaIR;
    }(ui.yuanzheng.GuanqiaIRUI));
    game.YZGuanqiaIR = YZGuanqiaIR;
})(game || (game = {}));
