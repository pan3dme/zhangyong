/**
* name 
*/
module game {

	export interface IPlfNoticeVo {
		version : string;
		type_name : string;
		title : string;
		content : string;

		isfirst : boolean;
	}

	// 平台登录公告
	export class LoginNoticeView extends ui.hud.view.LoginNoticeUI {
		private _chatNotice: common.Accordion;
		constructor() {
			super()
			this.isModelClose = true;
			this.init();
		}

		private init(){
			this._chatNotice = new common.Accordion(600, 800);
			this._chatNotice.itemRender = LoginNoticeIR;
			this.addChild(this._chatNotice);
			this._chatNotice.spaceY = 10;
			this._chatNotice.x = 25;
			this._chatNotice.y = 125;
			this.btnKnow.on(Laya.Event.CLICK,this,this.close);
			this.bgPanel.dataSource = { uiName: UIConst.LoginNoticeView, closeOnSide: this.isModelClose, closeOnButton: true,title:"公 告" };
			this.checkbox.on(Laya.Event.CHANGE,this,this.onChange);
		}

		public popup(): void {
			super.popup();
			this._chatNotice.dataSource = this.dataSource;
			this.checkbox.selected = Laya.LocalStorage.getItem(App.LOGIN_NOTICE_CHECKBOX) == "1";
		}

		public onClosed(): void {
			super.onClosed();
			this._chatNotice.dataSource = [];
		}

		private onChange():void {
			let isSelect = this.checkbox.selected;
			Laya.LocalStorage.setItem(App.LOGIN_NOTICE_CHECKBOX,isSelect?"1":"0");
		}
	}
}



