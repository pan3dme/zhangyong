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
var ToastMgr = /** @class */ (function () {
    function ToastMgr() {
        /**存要弹出提示的数组 */
        this._arrText = new Array();
    }
    ToastMgr.getInstance = function () {
        if (!ToastMgr._instance) {
            ToastMgr._instance = new ToastMgr();
        }
        return ToastMgr._instance;
    };
    /**把需要弹出的提示压到数组 */
    ToastMgr.prototype.arrTextPushBack = function (data) {
        var bool = this._arrText.length == 0;
        this._arrText.push(data);
        if (bool)
            this.isArrText();
    };
    /**数组内是否还有文字 */
    ToastMgr.prototype.isArrText = function () {
        if (this._arrText.length == 0)
            return;
        var textData = this._arrText[0];
        this.createToastWithData(textData.$text, textData.color);
    };
    /**删除数组最后一个并且判断 */
    ToastMgr.prototype.arrTextPop = function () {
        this._arrText.shift();
        this.isArrText();
    };
    /**从对象池中实例化提示窗 */
    ToastMgr.prototype.createToastWithData = function (str, color) {
        var toast = Laya.Pool.getItemByClass('toast', ToastView);
        toast.init(str, color);
        Laya.stage.addChild(toast);
        Laya.timer.once(300, this, this.arrTextPop);
        Laya.Tween.to(toast, { y: toast.y - 200 }, 1000, null, Handler.create(this, function () {
            Laya.Pool.recover('toast', toast);
            Laya.stage.removeChild(toast);
        }));
    };
    return ToastMgr;
}());
var ToastView = /** @class */ (function (_super) {
    __extends(ToastView, _super);
    function ToastView() {
        var _this = _super.call(this) || this;
        _this.zOrder = 9999;
        return _this;
    }
    ToastView.prototype.init = function (str, color) {
        if (!this.lab_text)
            return;
        this.alpha = 1;
        this.lab_text.text = str;
        this.lab_text.color = color;
        this.x = Laya.stage.width / 2;
        this.y = Laya.stage.height * (3 / 4);
    };
    return ToastView;
}(ui.component.ToastViewUI));
