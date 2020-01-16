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
    var ALERTTYPE;
    (function (ALERTTYPE) {
        ALERTTYPE[ALERTTYPE["WARN"] = 0] = "WARN";
        ALERTTYPE[ALERTTYPE["PROMPT"] = 1] = "PROMPT";
        ALERTTYPE[ALERTTYPE["NORMAL"] = 2] = "NORMAL";
        ALERTTYPE[ALERTTYPE["RECHARGE"] = 3] = "RECHARGE";
    })(ALERTTYPE = common.ALERTTYPE || (common.ALERTTYPE = {}));
    /** 警告弹框 */
    var AlertBox = /** @class */ (function (_super) {
        __extends(AlertBox, _super);
        function AlertBox() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this.initHtmlText();
            _this.name = UIConst.AlertBox;
            _this.zOrder = UI_DEPATH_VALUE.ALERT;
            if (_this.bgPanel) {
                _this.bgPanel.dataSource = { uiName: UIConst.AlertBox, closeOnSide: _this.isModelClose, closeOnButton: false, title: LanMgr.getLan("", 10536) };
            }
            return _this;
        }
        AlertBox.getInstance = function () {
            if (!AlertBox._alertBox) {
                AlertBox._alertBox = new AlertBox();
            }
            return AlertBox._alertBox;
        };
        AlertBox.close = function () {
            AlertBox.getInstance().close();
        };
        /** 显示确定取消按钮 */
        AlertBox.showAlert = function (data) {
            data.type = ALERTTYPE.NORMAL;
            data.yes = data.yes ? data.yes : LanMgr.getLan("", 10038);
            data.no = data.no ? data.no : LanMgr.getLan("", 10039);
            AlertBox.getInstance().showAlert(data);
        };
        /**
         * 不可操作
         * 强制提示作用
         * @param data
         */
        AlertBox.showWarn = function (data) {
            data.type = ALERTTYPE.WARN;
            AlertBox.getInstance().showAlert(data);
        };
        /**
         * 只显示确定按钮
         * @param data
         * @param recharge 充值等待到账
         */
        AlertBox.showAlertYes = function (data, recharge) {
            data.type = recharge ? ALERTTYPE.RECHARGE : ALERTTYPE.NORMAL;
            data.yes = data.yes ? data.yes : LanMgr.getLan("", 10038);
            AlertBox.getInstance().showAlert(data);
        };
        /**
         * 显示输入框弹窗
         * @param data
         */
        AlertBox.showAlertPrompt = function (data) {
            data.type = ALERTTYPE.PROMPT;
            data.yes = data.yes ? data.yes : LanMgr.getLan("", 10038);
            data.no = data.no ? data.no : LanMgr.getLan("", 10039);
            data.isprompt = true;
            AlertBox.getInstance().showAlert(data);
        };
        AlertBox.prototype.initHtmlText = function () {
            this._htmlText.style.color = ColorConst.normalFont;
            this._htmlText.style.wordWrap = true;
            this._htmlText.mouseEnabled = false;
            this._htmlText.style.align = "center";
            this._htmlText.style.fontSize = 22;
            this._htmlText.style.leading = 15;
            this._htmlText.style.width = 400;
            this.addChild(this._htmlText);
            this._htmlText.y = 105.5;
            this._htmlText.x = 100;
        };
        /**
         *
         * @param data
         * @param ismodel
         * @param recharge 充值等待到账
         */
        AlertBox.prototype.showAlert = function (data) {
            this.img_editbg.visible = data.type == ALERTTYPE.PROMPT;
            if (this.img_editbg.visible) {
                this.edit.prompt = data.text;
            }
            this.isModelClose = data.type == ALERTTYPE.NORMAL; //根据类型来判断是否可以点空白处关闭
            this.popupCenter = true;
            this.isModal = true;
            this._confirmVo = data;
            this.popup(false, false);
            if (this.bgPanel) {
                this.bgPanel.updateTitle(data.title ? data.title : LanMgr.getLan("", 10536));
            }
            this.btnNot.on(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.on(Laya.Event.CLICK, this, this.onConfirm);
            this.btnYes.label = data.yes;
            this.btnNot.label = data.no;
            this.btnYes.visible = data.type == ALERTTYPE.NORMAL || data.type == ALERTTYPE.PROMPT;
            this._htmlText.style.fontSize = data.type == ALERTTYPE.RECHARGE || data.type == ALERTTYPE.WARN ? 28 : 22;
            this._htmlText.y = data.type == ALERTTYPE.RECHARGE || data.type == ALERTTYPE.WARN ? 165 : 105.5;
            this._htmlText.innerHTML = data.isprompt ? "" : data.text;
            if (data.type == ALERTTYPE.RECHARGE) {
                this.timerOnce(3000, this, this.autoClose);
                tl3d.ModuleEventManager.addEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.toClose, this);
            }
            else {
                this._htmlText.y = 125.5 - ((this._htmlText.contextHeight - 20) / 2);
            }
            // 是否需要显示取消按钮
            if (data.no) {
                this.btnNot.visible = true;
                this.btnYes.x = 346;
                this.btnNot.x = 110;
            }
            else {
                this.btnNot.visible = false;
                this.btnYes.x = 229;
            }
        };
        /**自动关闭 */
        AlertBox.prototype.autoClose = function () {
            showToast(LanMgr.getLan("", 10358));
            this.toClose();
        };
        /** 确认回调 */
        AlertBox.prototype.onConfirm = function () {
            if (this._confirmVo.isprompt) {
                var str = this.edit.text;
                if (!str && str.length <= 0) {
                    showToast(LanMgr.getLan("", 10359));
                    return;
                }
            }
            if (this._confirmVo.confirmCb) {
                this._confirmVo.confirmCb(this._confirmVo.isprompt ? this.edit.text : this._confirmVo.parm);
            }
            if (!this._confirmVo.confirmNotClose) {
                this.toClose();
            }
        };
        /** 取消回调 */
        AlertBox.prototype.onCancel = function () {
            if (this._confirmVo.cancelCb) {
                this._confirmVo.cancelCb(this._confirmVo.parm);
            }
            this.toClose();
        };
        AlertBox.prototype.toClose = function () {
            this.close();
            tl3d.ModuleEventManager.removeEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.onClosed, this);
        };
        AlertBox.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            if (this._confirmVo && this._confirmVo.closeCb) {
                this._confirmVo.closeCb();
            }
            this._confirmVo = null;
            this.clearTimer(this, this.autoClose);
            this.btnNot.off(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.off(Laya.Event.CLICK, this, this.onConfirm);
        };
        return AlertBox;
    }(ui.component.AlertBoxUI));
    common.AlertBox = AlertBox;
})(common || (common = {}));
