/**
* name 
*/
module game {
	export class GuildNoticeView extends ui.guild.hall.GuildNoticeUI {
		constructor() {
			super();
			this.isModelClose = true;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		private initView():void {
			this.bgPanel.dataSource = { uiName: UIConst.GuildNoticeView, closeOnSide: this.isModelClose, title:"公告" };
			this.btn_sure.on(Laya.Event.CLICK, this, this.onSure);
			this.btn_cancel.on(Laya.Event.CLICK, this, this.onExit);
			this.are_putin.on(Laya.Event.INPUT, this, this.onPutText);
			this.are_putin.text = this.dataSource || "";
		}

		public onPutText(): void {
			this.label_residuetext.text = LanMgr.getLan("可输入文字：{0}", -1, Math.max(0, (60 - this.are_putin.text.length)));
		}

		private onSure(): void {
			let text = this.are_putin.text;
			if(!text || text == ""){
				return;
			}
			dispatchEvt(new GuildEvent(GuildEvent.CHANGE_GUILD_NOTICE,text));
		}

		private onExit(): void {
			UIMgr.hideUIByName(UIConst.GuildNoticeView);
		}

		public onClosed(): void {
			super.onClosed();
			this.bgPanel.dataSource = null;
			this.btn_sure.off(Laya.Event.CLICK, this, this.onSure);
			this.btn_cancel.off(Laya.Event.CLICK, this, this.onExit);
			this.are_putin.off(Laya.Event.INPUT, this, this.onPutText);
		}
	}
}