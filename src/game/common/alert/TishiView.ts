/**
* name 
*/
module common{
	export class TishiView extends ui.component.TishiUI{
		static _alertBox: TishiView;
        static getInstance(): TishiView {
            if (!TishiView._alertBox) {
                TishiView._alertBox = new TishiView();
            }
            return TishiView._alertBox;
        }
        static close(): void {
            TishiView.getInstance().close();
        }
        /** 显示确定取消按钮 */
        static showTishi(data: IConfirmData): void {
            data.yes = data.yes ? data.yes : LanMgr.getLan('', 10038);
            data.no = data.no ? data.yes : LanMgr.getLan('', 10039);
            TishiView.getInstance().showTishi(data);
        }
        /** 只显示确定按钮 */
        static showTishiYes(data: IConfirmData): void {
            data.yes = data.yes ? data.yes : LanMgr.getLan('', 10038);
            TishiView.getInstance().showTishi(data);
        }

		private _confirmVo: IConfirmData;
        private _htmlText: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        constructor() {
            super();
            this.initHtmlText();
            this.isModelClose = true;
            this.name = UIConst.TishiView;
            this.zOrder = UI_DEPATH_VALUE.GUIDE;
            this.bgPanel.dataSource = { uiName: UIConst.TishiView, closeOnSide: this.isModelClose, closeOnButton: false, title: LanMgr.getLan('', 10536) };
        }

        public showTishi(data: IConfirmData): void {
            this._confirmVo = data;
            this.isModal = true;
            this.popupCenter = true;
            this.popup(false);

            this.bgPanel.setTitleVisible(data.title ? true : false);
            if (data.title) this.bgPanel.lbTitle.text = data.title;

            this.btn_No.label = data.no;
            this.btn_Yes.label = data.yes;
            this.chk_auto.selected = false;
            this._htmlText.innerHTML = data.text;
			this.btn_No.on(Laya.Event.CLICK, this,this.onClose);
           	this.btn_Yes.on(Laya.Event.CLICK, this,this.onConfirm);
            // this._htmlText.x = 78 + ((380 - this._htmlText.contextWidth) / 2);
            this._htmlText.y = 85 - ((this._htmlText.contextHeight - 22) / 2);
            // 是否需要显示取消按钮
            if (data.no) {
                this.btn_No.visible = true;
                this.btn_Yes.right = this.btn_No.left = 90;
            } else {
                this.btn_Yes.centerX = 0;
                this.btn_No.visible = false;
            }
        }

        private initHtmlText(): void {
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
        }

        /** 确认回调 */
        private onConfirm(): void {
            if (this._confirmVo.confirmCb) {
                this._confirmVo.confirmCb(this.chk_auto.selected);
            }
            this.onClose();
        }

        private onClose(): void {
            this.close();
        }

        public onClosed(): void {
            super.onClosed();
            this._confirmVo = null;
            this.btn_No.off(Laya.Event.CLICK, this, this.onClose);
            this.btn_Yes.off(Laya.Event.CLICK, this, this.onConfirm);
        }
	}
}