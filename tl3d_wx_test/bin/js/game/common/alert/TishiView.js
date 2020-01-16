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
    var TishiView = /** @class */ (function (_super) {
        __extends(TishiView, _super);
        function TishiView() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this.initHtmlText();
            _this.isModelClose = true;
            _this.name = UIConst.TishiView;
            _this.zOrder = UI_DEPATH_VALUE.GUIDE;
            _this.bgPanel.dataSource = { uiName: UIConst.TishiView, closeOnSide: _this.isModelClose, closeOnButton: false, title: LanMgr.getLan('', 10536) };
            return _this;
        }
        TishiView.getInstance = function () {
            if (!TishiView._alertBox) {
                TishiView._alertBox = new TishiView();
            }
            return TishiView._alertBox;
        };
        TishiView.close = function () {
            TishiView.getInstance().close();
        };
        /** 显示确定取消按钮 */
        TishiView.showTishi = function (data) {
            data.yes = data.yes ? data.yes : LanMgr.getLan('', 10038);
            data.no = data.no ? data.yes : LanMgr.getLan('', 10039);
            TishiView.getInstance().showTishi(data);
        };
        /** 只显示确定按钮 */
        TishiView.showTishiYes = function (data) {
            data.yes = data.yes ? data.yes : LanMgr.getLan('', 10038);
            TishiView.getInstance().showTishi(data);
        };
        TishiView.prototype.showTishi = function (data) {
            this._confirmVo = data;
            this.isModal = true;
            this.popupCenter = true;
            this.popup(false);
            this.bgPanel.setTitleVisible(data.title ? true : false);
            if (data.title)
                this.bgPanel.lbTitle.text = data.title;
            this.btn_No.label = data.no;
            this.btn_Yes.label = data.yes;
            this.chk_auto.selected = false;
            this._htmlText.innerHTML = data.text;
            this.btn_No.on(Laya.Event.CLICK, this, this.onClose);
            this.btn_Yes.on(Laya.Event.CLICK, this, this.onConfirm);
            // this._htmlText.x = 78 + ((380 - this._htmlText.contextWidth) / 2);
            this._htmlText.y = 85 - ((this._htmlText.contextHeight - 22) / 2);
            // 是否需要显示取消按钮
            if (data.no) {
                this.btn_No.visible = true;
                this.btn_Yes.right = this.btn_No.left = 90;
            }
            else {
                this.btn_Yes.centerX = 0;
                this.btn_No.visible = false;
            }
        };
        TishiView.prototype.initHtmlText = function () {
            this._htmlText.style.color = ColorConst.normalFont;
            this._htmlText.style.align = "center";
            this._htmlText.style.wordWrap = true;
            this._htmlText.mouseEnabled = false;
            this._htmlText.style.fontSize = 22;
            this._htmlText.style.leading = 5;
            this._htmlText.style.width = 380;
            this.addChild(this._htmlText);
            this._htmlText.x = 110;
            this._htmlText.y = 85;
        };
        /** 确认回调 */
        TishiView.prototype.onConfirm = function () {
            if (this._confirmVo.confirmCb) {
                this._confirmVo.confirmCb(this.chk_auto.selected);
            }
            this.onClose();
        };
        TishiView.prototype.onClose = function () {
            this.close();
        };
        TishiView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._confirmVo = null;
            this.btn_No.off(Laya.Event.CLICK, this, this.onClose);
            this.btn_Yes.off(Laya.Event.CLICK, this, this.onConfirm);
        };
        return TishiView;
    }(ui.component.TishiUI));
    common.TishiView = TishiView;
})(common || (common = {}));
