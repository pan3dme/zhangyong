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
var DialogExtMgr = /** @class */ (function (_super) {
    __extends(DialogExtMgr, _super);
    function DialogExtMgr() {
        var _this = _super.call(this) || this;
        _this.leftPopupEffHandler = new Handler(_this, _this.leftPopupEff);
        _this.leftCloseEffHandler = new Handler(_this, _this.leftCloseEff);
        // 自定义遮罩关闭事件
        _this.maskLayer.offAll();
        if (UIConfig.closeDialogOnSide) {
            _this.maskLayer.on(Laya.Event.CLICK, _this, _this.closeOnSide);
        }
        return _this;
    }
    DialogExtMgr.prototype.closeOnSide = function (event) {
        var dialog = this.getTopModelDialog();
        if (dialog instanceof DialogExt) {
            if (dialog.isModelClose) {
                AudioMgr.playSound("sound/close.mp3");
                dialog.close("side");
            }
        }
        else if (dialog instanceof Laya.Dialog && dialog.isModal) {
            AudioMgr.playSound("sound/close.mp3");
            dialog.close("side");
        }
    };
    /** 获取最上层第一个正式（如非GuideMask,GuideMask用来挖空去关闭底下的窗口）的窗口 */
    DialogExtMgr.prototype.getTopModelDialog = function () {
        var len = this.numChildren;
        for (var i = len - 1; i >= 0; i--) {
            var dialog = this.getChildAt(i);
            if (dialog.isIgnore) {
                continue;
            }
            return dialog;
        }
        return this.getChildAt(len - 1);
    };
    /**@private 发生层次改变后，重新检查遮罩层是否正确*/
    DialogExtMgr.prototype._checkMask = function () {
        // 重写_checkMask
        // _checkMask只在open与doclose的时候触发,但是当open时,还需要等重新排序childs,因为zOrder不同,所以maskLayer需要在zOrder最大的对象底下
        this.maskLayer.removeSelf();
        var len = this.numChildren;
        var maxZorder = -123456;
        for (var i = len - 1; i > -1; i--) {
            var dialog = this.getChildAt(i);
            if (dialog && dialog.isModal && dialog.zOrder > maxZorder) {
                maxZorder = dialog.zOrder;
            }
        }
        for (var i = len - 1; i > -1; i--) {
            var dialog = this.getChildAt(i);
            if (dialog && dialog.isModal && dialog.zOrder == maxZorder) {
                this.maskLayer.zOrder = dialog.zOrder;
                this.addChildAt(this.maskLayer, i);
                break;
            }
        }
    };
    DialogExtMgr.prototype.leftPopupEff = function (dialog) {
        dialog.x = -dialog.width;
        dialog.alpha = 0.3;
        Laya.Tween.to(dialog, { x: 0, alpha: 1 }, 300, Laya.Ease.strongOut, Handler.create(this, this.doOpen, [dialog]));
    };
    ;
    DialogExtMgr.prototype.leftCloseEff = function (dialog, type) {
        var endX = -dialog.width;
        Laya.Tween.to(dialog, { x: endX, alpha: 0.3 }, 300, Laya.Ease.strongOut, Handler.create(this, this.doClose, [dialog, type]));
    };
    return DialogExtMgr;
}(Laya.DialogManager));
