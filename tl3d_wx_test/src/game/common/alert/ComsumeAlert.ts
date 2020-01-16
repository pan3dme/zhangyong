module common {
    export class ComsumeAlert extends ui.component.ConsumeAlertUI {
        static comsumeAlert: ComsumeAlert;
        static getInstance(): ComsumeAlert {
            if (!ComsumeAlert.comsumeAlert) {
                ComsumeAlert.comsumeAlert = new ComsumeAlert();
            }
            return ComsumeAlert.comsumeAlert;
        }
        static close(): void {
            ComsumeAlert.getInstance().close();
        }
        /** 显示确定取消按钮 */
        static showAlert(data: ComsumeAlertData): void {
            data.type = ComsumeAlertType.NORMAL;
            data.yes = data.yes ? data.yes : LanMgr.getLan('', 10038);
            data.no = data.no ? data.no : LanMgr.getLan('', 10039);
            ComsumeAlert.getInstance().showAlert(data);
        }

        constructor() {
            super();
            this.name = UIConst.ComsumeAlert;
            this.zOrder = UI_DEPATH_VALUE.ALERT;
            this.bgPanel.dataSource = { uiName: UIConst.ComsumeAlert, closeOnSide: this.isModelClose, closeOnButton: false, title: "提 示" };
        }

        private _confirmVo: ComsumeAlertData;
        /**
         * 
         * @param data 
         * @param ismodel 
         * @param recharge 充值等待到账
         */
        public showAlert(data: ComsumeAlertData): void {
            this.isModelClose = (data.type != ComsumeAlertType.NORMAL)?true:false ;//根据类型来判断是否可以点空白处关闭
            this.popupCenter = true;
            this.isModal = true;
            this._confirmVo = data;
            this.popup(false);
            
            this.bgPanel.setTitleVisible(data.title ? true : false);
            if (data.title) this.bgPanel.lbTitle.text = data.title;

            this.btnNot.on(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.on(Laya.Event.CLICK, this, this.onConfirm);
            this.btnYes.label = data.yes;
            this.btnNot.label = data.no;

            this.lab_content0.text = data.text ? data.text : "";
            this.lab_content1.text = data.text1 ? data.text1 : "";
            this.lab_content2.text = data.text2 ? data.text2 : "";
            this.hbox.refresh();
        }

        /** 确认回调 */
        private onConfirm(): void {
            if (this._confirmVo.confirmCb) {
                this._confirmVo.confirmCb();
            }
            this.onClose();
        }

        /** 取消回调 */
        private onCancel(): void {
            if (this._confirmVo.cancelCb) {
                this._confirmVo.cancelCb();
            }
            this.onClose();
        }

        private onClose(): void {
            this.close();
        }

        public onClosed(): void {
            super.onClosed();
            this._confirmVo = null;
            this.btnNot.off(Laya.Event.CLICK, this, this.onCancel);
            this.btnYes.off(Laya.Event.CLICK, this, this.onConfirm);
        }
    }
}

interface ComsumeAlertData {
    confirmCb?: Function;
    cancelCb?: Function;
    type?: any;//类型 ALERTTYPE  todo:如果后面改动到，希望统一其他类型。
    title?: string
    text?: string;//对应ui:lab_content0
    text1?: string;//对应ui:lab_content1
    text2?: string;//对应ui:lab_content2
    yes?: string;
    no?: string;
}

enum ComsumeAlertType {
    NORMAL
}
