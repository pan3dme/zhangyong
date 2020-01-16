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
    var ComsumeAlert = /** @class */ (function (_super) {
        __extends(ComsumeAlert, _super);
        function ComsumeAlert() {
            var _this = _super.call(this) || this;
            _this.name = UIConst.ComsumeAlert;
            _this.zOrder = UI_DEPATH_VALUE.ALERT;
            _this.bgPanel.dataSource = { uiName: UIConst.ComsumeAlert, closeOnSide: _this.isModelClose, closeOnButton: false, title: "提 示" };
            return _this;
        }
        ComsumeAlert.getInstance = function () {
            if (!ComsumeAlert.comsumeAlert) {
                ComsumeAlert.comsumeAlert = new ComsumeAlert();
            }
            return ComsumeAlert.comsumeAlert;
        };
        ComsumeAlert.close = function () {
            ComsumeAlert.getInstance().close();
        };
        /** 显示确定取消按钮 */
        ComsumeAlert.showAlert = function (data) {
            data.type = ComsumeAlertType.NORMAL;
            data.yes = data.yes ? data.yes : LanMgr.getLan('', 10038);
            data.no = data.no ? data.no : LanMgr.getLan('', 10039);
            ComsumeAlert.getInstance().showAlert(data);
        };
        /**
         *
         * @param data
         * @param ismodel
         * @param recharge 充值等待到账
         */
        ComsumeAlert.prototype.showAlert = function (data) {
            this.isModelClose = (data.type != ComsumeAlertType.NORMAL) ? true : false; //根据类型来判断是否可以点空白处关闭
            this.popupCenter = true;
            this.isModal = true;
            this._confirmVo = data;
            this.popup(false);
            this.bgPanel.setTitleVisible(data.title ? true : false);
            if (data.title)
                this.bgPanel.lbTitle.text = data.title;
            this.btnNot.on(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.on(Laya.Event.CLICK, this, this.onConfirm);
            this.btnYes.label = data.yes;
            this.btnNot.label = data.no;
            this.lab_content0.text = data.text ? data.text : "";
            this.lab_content1.text = data.text1 ? data.text1 : "";
            this.lab_content2.text = data.text2 ? data.text2 : "";
            this.hbox.refresh();
        };
        /** 确认回调 */
        ComsumeAlert.prototype.onConfirm = function () {
            if (this._confirmVo.confirmCb) {
                this._confirmVo.confirmCb();
            }
            this.onClose();
        };
        /** 取消回调 */
        ComsumeAlert.prototype.onCancel = function () {
            if (this._confirmVo.cancelCb) {
                this._confirmVo.cancelCb();
            }
            this.onClose();
        };
        ComsumeAlert.prototype.onClose = function () {
            this.close();
        };
        ComsumeAlert.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this._confirmVo = null;
            this.btnNot.off(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.off(Laya.Event.CLICK, this, this.onConfirm);
        };
        return ComsumeAlert;
    }(ui.component.ConsumeAlertUI));
    common.ComsumeAlert = ComsumeAlert;
})(common || (common = {}));
var ComsumeAlertType;
(function (ComsumeAlertType) {
    ComsumeAlertType[ComsumeAlertType["NORMAL"] = 0] = "NORMAL";
})(ComsumeAlertType || (ComsumeAlertType = {}));
