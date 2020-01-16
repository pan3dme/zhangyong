

module common {
    export interface IConfirmData {
        confirmCb?: Function;   // 确定回调
        cancelCb?: Function;    // 取消回调
        closeCb?: Function;     // 关闭时的回调
        title?: string          // 标题
        text: string;           // 内容文本
        yes?: string;           // 确定按钮文本
        no?: string;            // 取消按钮文本
        isprompt?: boolean;     // 显示输入框
        parm?: any;             // 参数
        type?: any;             // 类型 ALERTTYPE
        confirmNotClose ?: boolean; // 确认但不关闭当前提示框
    }

    export enum ALERTTYPE {
        WARN, PROMPT, NORMAL, RECHARGE
    }

    /** 警告弹框 */
    export class AlertBox extends ui.component.AlertBoxUI {
        static _alertBox: AlertBox;
        static getInstance(): AlertBox {
            if (!AlertBox._alertBox) {
                AlertBox._alertBox = new AlertBox();
            }
            return AlertBox._alertBox;
        }
        static close(): void {
            AlertBox.getInstance().close();
        }
        /** 显示确定取消按钮 */
        static showAlert(data: IConfirmData): void {
            data.type = ALERTTYPE.NORMAL;
            data.yes = data.yes ? data.yes : LanMgr.getLan(``,10038);
            data.no = data.no ? data.no : LanMgr.getLan(``,10039);
            AlertBox.getInstance().showAlert(data);
        }
        /**
         * 不可操作
         * 强制提示作用
         * @param data 
         */
        static showWarn(data: IConfirmData): void {
            data.type = ALERTTYPE.WARN;
            AlertBox.getInstance().showAlert(data);
        }
        /**
         * 只显示确定按钮
         * @param data 
         * @param recharge 充值等待到账
         */
        static showAlertYes(data: IConfirmData, recharge?: boolean): void {
            data.type = recharge ? ALERTTYPE.RECHARGE : ALERTTYPE.NORMAL;
            data.yes = data.yes ? data.yes : LanMgr.getLan(``,10038);
            AlertBox.getInstance().showAlert(data);
        }

        /**
         * 显示输入框弹窗
         * @param data 
         */
        static showAlertPrompt(data: IConfirmData): void {
            data.type = ALERTTYPE.PROMPT;
            data.yes = data.yes ? data.yes : LanMgr.getLan(``,10038);
            data.no = data.no ? data.no : LanMgr.getLan(``,10039);
            data.isprompt = true;
            AlertBox.getInstance().showAlert(data);
        }

        private _confirmVo: IConfirmData;
        private _htmlText: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        constructor() {
            super();
            this.initHtmlText();
            this.name = UIConst.AlertBox;
            this.zOrder = UI_DEPATH_VALUE.ALERT;
            if (this.bgPanel) {
                this.bgPanel.dataSource = { uiName: UIConst.AlertBox, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan(``,10536) };
            }
        }

        private initHtmlText(): void {
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
        }

        /**
         * 
         * @param data 
         * @param ismodel 
         * @param recharge 充值等待到账
         */
        public showAlert(data: IConfirmData): void {
            this.img_editbg.visible = data.type == ALERTTYPE.PROMPT;
            if (this.img_editbg.visible) {
                this.edit.prompt = data.text;
            }
            this.isModelClose = data.type == ALERTTYPE.NORMAL;//根据类型来判断是否可以点空白处关闭
            this.popupCenter = true;
            this.isModal = true;
            this._confirmVo = data;
            this.popup(false, false);

            if (this.bgPanel) {
                this.bgPanel.updateTitle(data.title ? data.title : LanMgr.getLan(``,10536));
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
            } else {
                this._htmlText.y = 125.5 - ((this._htmlText.contextHeight - 20) / 2);
            }
            // 是否需要显示取消按钮
            if (data.no) {
                this.btnNot.visible = true;
                this.btnYes.x = 346;
                this.btnNot.x = 110;
            } else {
                this.btnNot.visible = false;
                this.btnYes.x = 229;
            }
        }

        /**自动关闭 */
        private autoClose(): void {
            showToast(LanMgr.getLan(``,10358));
            this.toClose();
        }

        /** 确认回调 */
        private onConfirm(): void {
            if (this._confirmVo.isprompt) {
                let str = this.edit.text;
                if (!str && str.length <= 0) {
                    showToast(LanMgr.getLan(``,10359));
                    return;
                }
            }
            if (this._confirmVo.confirmCb) {
                this._confirmVo.confirmCb(this._confirmVo.isprompt ? this.edit.text : this._confirmVo.parm);
            }
            if(!this._confirmVo.confirmNotClose){
                this.toClose();
            }
        }

        /** 取消回调 */
        private onCancel(): void {
            if (this._confirmVo.cancelCb) {
                this._confirmVo.cancelCb(this._confirmVo.parm);
            }
            this.toClose();
        }

        private toClose(): void {
            this.close();
            tl3d.ModuleEventManager.removeEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.onClosed, this)
        }

        public onClosed(): void {
            super.onClosed();
            if (this._confirmVo && this._confirmVo.closeCb) {
                this._confirmVo.closeCb();
            }
            this._confirmVo = null;
            this.clearTimer(this, this.autoClose)
            this.btnNot.off(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.off(Laya.Event.CLICK, this, this.onConfirm);
        }

    }
}
