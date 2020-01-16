/**
* name 
*/
module game {
	export class LoginNoticeIR extends ui.hud.render.LoginNoticeIRUI implements common.IAccordionItemRenderer {
		constructor() {
			super();
			this.boxContent.visible = false;
			this.lab_content.autoSize = true;
			this.img_bg.on(Laya.Event.CLICK, this, this.onClick);
		}

		public set dataSource($value:IPlfNoticeVo) {
			if(!$value)return;
			this._dataSource = $value;
			if ($value.isfirst)
				this.onShow();
			else
				this.onHide();
			this.refresh();
		}

		public get dataSource() {
			return this._dataSource;
		}

		refresh(index?:number): void {
			let info = this.dataSource;
			if(info){
				this.lab_title.text = this.dataSource.title;
			}
		}

		/** 展开子任务 */
		public onShow(): void {
			let info = this.dataSource;
			this.btnArrow.scaleY = 0.8;
			this.boxContent.visible = true;
			this.lab_content.text = info ? info.content : "";
			this.lab_content.event(Laya.Event.RESIZE);
			this.boxContent.height = this.lab_content.y + this.lab_content.height + 30;
			this.height = this.boxContent.y + this.boxContent.height;
		}

		/** 隐藏子任务 */
		public onHide(): void {
			this.btnArrow.scaleY = -0.8;
			this.boxContent.visible = false;
			this.height = 60;
		}

		/** 是否是展开的 */
		public isShow(): boolean {
			return this.btnArrow.scaleY == 0.8;
		}

		public onClick(): void {
			dispatchEvt(new common.TreeEvent(common.TreeEvent.SELECT_TAB, this));
		}
	}
}