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
var common;
(function (common) {
    var DialogExt = /** @class */ (function (_super) {
        __extends(DialogExt, _super);
        function DialogExt() {
            return _super.call(this) || this;
        }
        /** 监听舞台宽高变化 */
        DialogExt.prototype.onStageResize = function () {
            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        };
        DialogExt.prototype.onResize = function (e) {
            this.setSize(Laya.stage.width, Laya.stage.height);
        };
        /** 设置宽高 */
        DialogExt.prototype.setSize = function (w, h) {
            this.size(w, h);
        };
        /**
         * 关闭对话框。
         * @param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null。
         * @param showEffect 是否显示关闭效果
         */
        DialogExt.prototype.close = function (type, showEffect, sound) {
            showEffect = showEffect !== undefined ? showEffect : (this.dialogInfo ? this.dialogInfo.popEffect : false);
            _super.prototype.close.call(this, type, showEffect);
        };
        DialogExt.prototype.popup = function (closeOther, showEffect) {
            showEffect = showEffect !== undefined ? showEffect : (this.dialogInfo ? this.dialogInfo.popEffect : false);
            _super.prototype.popup.call(this, closeOther, showEffect);
            dispatchEvt(new common.GlobalEvent(common.GlobalEvent.DIALOG_CREATED, this));
        };
        DialogExt.prototype.show = function (closeOther, showEffect) {
            showEffect = showEffect !== undefined ? showEffect : (this.dialogInfo ? this.dialogInfo.popEffect : false);
            _super.prototype.show.call(this, closeOther, showEffect);
            dispatchEvt(new common.GlobalEvent(common.GlobalEvent.DIALOG_CREATED, this));
        };
        DialogExt.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            if (this.dialogInfo) {
                ResUseMgr.useRes(this.dialogInfo.destroyAtlases);
            }
            dispatchEvt(new common.GlobalEvent(common.GlobalEvent.DIALOG_OPENED, this));
        };
        DialogExt.prototype.onClosed = function (type) {
            _super.prototype.onClosed.call(this, type);
            this.dataSource = null;
            this.scale(1, 1);
            if (this.dialogInfo) {
                ResUseMgr.releaseRes(this.dialogInfo.destroyAtlases);
                DialogQueueMgr.getInstance().pushNext(this.dialogInfo.uiname);
            }
            dispatchEvt(new common.GlobalEvent(common.GlobalEvent.DIALOG_CLOSED, this));
            Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        };
        return DialogExt;
    }(Laya.Dialog));
    common.DialogExt = DialogExt;
})(common || (common = {}));
