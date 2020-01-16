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
var common;
(function (common) {
    var DialogOpenEff = /** @class */ (function (_super) {
        __extends(DialogOpenEff, _super);
        function DialogOpenEff() {
            var _this = _super.call(this) || this;
            _this._isInit = false;
            return _this;
        }
        DialogOpenEff.prototype.showEff = function (parent, handler) {
            if (handler === void 0) { handler = null; }
            if (!this._isInit) {
                this._isInit = true;
                this.zOrder = parent.zOrder;
                this.x += parent.x;
                this.y += parent.y;
            }
            parent.visible = false;
            Dialog.manager.addChild(this);
            this.visible = true;
            this.play();
            Laya.timer.once(100, this, function () {
                parent.visible = true;
                parent.popupEffect.runWith(parent);
                if (handler)
                    handler.run();
            });
            Laya.timer.once(500, this, this.closeEff);
        };
        DialogOpenEff.prototype.closeEff = function () {
            this.removeSelf();
            this.visible = false;
            this.stop();
            Laya.timer.clearAll(this);
        };
        return DialogOpenEff;
    }(Laya.Animation));
    common.DialogOpenEff = DialogOpenEff;
})(common || (common = {}));
