/**
* name 
*/
module game {
	export class ShouchongtishiView extends ui.activity.shouchong.ShouchongtishiUI {
		private uiScene: Base2dSceneLayer;
		constructor() {
			super();
			this.uiScene = new Base2dSceneLayer();
			this.addChild(this.uiScene);
			this.uiScene.zOrder = 5;

			this.initHtmlText();
			this.btn_close.on(Laya.Event.CLICK, this, () => {
				dispatchEvt(new GuajiEvent(GuajiEvent.CLOSE_SHOUCHONG_TIPS));
			});
			this.img_bg.on(Laya.Event.CLICK, this, this.showShouchong);
		}

		public show(): void {
			super.show(false, false);
		}

		public set dataSource(value) {
			this.initView(value);
		}

		private initHtmlText(): void {
			this._htmlText.style.color = ColorConst.normalFont;
			this._htmlText.style.wordWrap = true;
			this._htmlText.mouseEnabled = false;
			this._htmlText.style.align = "left";
			this._htmlText.style.fontSize = 20;
			this._htmlText.style.leading = 5;
			this._htmlText.style.width = 170;
			this.addChild(this._htmlText);
			this._htmlText.y = 22;
			this._htmlText.x = 36;
		}


		private _htmlText: Laya.HTMLDivElement = new Laya.HTMLDivElement();
		private initView(id: number): void {
			this.uiScene.onShow();
			this.uiScene.setPos(0, Launch.offsetY);
			// let data: tb.TB_first_recharge = tb.TB_first_recharge.get_TB_first_rechargeById(id);
			this._htmlText.innerHTML = this.getContext(id);
			this.refreshModel(1004);
		}

		private getContext(idx: number) {
			switch (idx) {
				case 1:
					return `<span style=\'color:#f66217;\'>首充</span>送<span style=\'color:#ff0000;\'>6星雅典娜</span>，强力输出，颜值担当！`;
				case 2:
					return `<span style=\'color:#f66217;\'>累充98</span>送<span style=\'color:#ff0000;\'>无畏套装</span>，套装激活，属性飞升！`;
				default:
					return `<span style=\'color:#f66217;\'>累充198</span>送<span style=\'color:#ff0000;\'>传说托尔</span>，雷神降临，毁天灭地！`;
			}
		}

		private showShouchong(): void {
			dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_SHOUCHONG_PANEL));
		}

		/**
         * 刷新模型id
         * @param modeid 模型id
         */
		public refreshModel(modeid) {
			this.uiScene.addModelChar(modeid, this.x + 50, this.y + 230, 180, 2);
			this.uiScene.sceneChar.play('idea', 0);
		}

		//刷新模型位置
		public updateModulePos(): void {
			if (this.uiScene && this.uiScene.sceneChar) {
				this.uiScene.sceneChar.set2dPos(this.x - 20, this.y + 230);  //坐标
			}
		}

		//关闭面板
		public onClosed(): void {
			super.onClosed();
			this.uiScene.onExit();
		}
	}
}