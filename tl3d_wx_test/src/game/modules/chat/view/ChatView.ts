

module game {
	export class ChatView extends ui.chat.ChatUI {

		private _buffList: common.BuffRenderList;
		private _openType: number;
		constructor() {
			super();
		}

		initialize(): void {
			super.initialize();
			let mgr = DialogExt.manager as DialogExtMgr;
			this.popupEffect = mgr.leftPopupEffHandler;
			this.closeEffect = mgr.leftCloseEffHandler;
			this.popupCenter = false;
			this.centerY = -60;
			this.isModelClose = true;
		}

		createChildren(): void {
			super.createChildren();
			this._openType = -1;
			this.width = this.bg.width = Math.min(Laya.stage.width, 910);
			let boxWid = this.bg.width - this.chatBox.left - this.chatBox.right;
			this._buffList = new common.BuffRenderList(boxWid, this.chatBox.height, null, 50, 2, false);
			this._buffList.isAutoScroll = true;
			this._buffList.spaceY = 10;
			this._buffList.itemRender = ChatIR;
			this._buffList.itemRenderWidth = (boxWid - 20 < 580 ? 580 : (boxWid - 20));
			this._buffList.setScrollChangeHandler(this.onScrollChange, this);
			this.chatBox.addChild(this._buffList);
			this.tabList.selectHandler = new Handler(this, this.onTabSelect);
			this.tabList.renderHandler = new Handler(this, this.onTabRender);
			this.tabList.selectedIndex = -1;

			this.btnClose.on(Laya.Event.CLICK, this, this.onExit);
			this.btnFace.on(Laya.Event.CLICK, this, this.onFaceOpenOrHide);
			this.btnQuick.on(Laya.Event.CLICK, this, this.onQuickOpenOrHide);
			this.btnSend.on(Laya.Event.CLICK, this, this.onSend);
			this.imgScroll.on(Laya.Event.CLICK, this, this.scrollToBottom);
			this.textInput.on(Laya.Event.ENTER, this, this.onSend);
		}

		public close(): void {
			super.close();
			this._openType = -1;
			this.tabList.array = null;
			this.tabList.selectedIndex = -1;
			this.faceUI.onExit();
			this.quickUI.onExit();
		}
		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		private initView(): void {
			this.faceUI.onEnter(this.clickFaceCb.bind(this), this.imgFace);
			this.quickUI.onEnter(this.clickQuickCb.bind(this), this.imgQuick);
			this.imgScroll.visible = false;
			let dataAry: any[] = this.dataSource ? this.dataSource : [];
			this._openType = isNaN(dataAry[0]) ? OpenType.common : dataAry[0];
			let channel = isNaN(dataAry[1]) ? 0 : dataAry[1];
			let model = ChatModel.getInstance();
			let index = model.getIndexByChannel(channel);
			index = index >= 0 ? index : 0;
			this.tabList.array = model.getTabbarDatas(this._openType);
			this.tabList.selectedIndex = index;
		}

		private defaultText = '                    ' + LanMgr.getLan("",12499);
		private onTabSelect(index: number): void {
			if (index == -1) return;
			this.imgScroll.visible = false;
			this._buffList.removeAll();
			let model = ChatModel.getInstance();
			let channel = model.getChannelByIndex(this.tabList.selectedIndex);
			let arr = model.getChatListByType(channel);
			this._buffList.dataSource = arr.concat();
			this._buffList.isAutoScroll = true;
			this._buffList.updateScrollMaxForce();
			let lv = App.getOpenValue(ModuleConst.CHAT);
			if (index == 0 || index == 1) {
				this.textInput.prompt = App.hero.level >= lv ? this.defaultText : LanMgr.getLan('', 11017, lv);
			} else {
				this.textInput.prompt = this.defaultText;
			}
			model.resetNewNum(channel);
			let isSys = channel == iface.tb_prop.chatChannelTypeKey.system;
			this.btnQuick.visible = this.btnFace.visible = this.btnSend.visible = this.bgInput.visible = !isSys;
			this.imgFace.visible = this.imgQuick.visible = false;
			this.tabList.refresh();
		}

		addNewChats(chatList: ChatInfoVo[]): void {
			if (!this._buffList || !chatList || chatList.length == 0) return;
			let len = chatList.length;
			for (let i = 0; i < len; i++) {
				this._buffList.addItem(chatList[i]);
			}
			if (this._buffList.isAutoScroll) {
				this._buffList.updateScrollMaxForce();
			} else {
				this.imgScroll.visible = true;
			}
		}

		private onTabRender(cell: ChatTabIR, index: number): void {
			if (!cell) return;
			let curIndex: number = this.tabList.selectedIndex;
			let btn = cell.btnChannel;
			btn.selected = index == curIndex;
			btn.labelSize = index == curIndex ? 26 : 22;
			btn.labelColors = index == curIndex ? "#7e5336,#7e5336,#7e5336" : "#e6ca91,#e6ca91,#e6ca91";
		}

		/** 更新新消息数量 */
		public updateNewChatNum(): void {
			let model = ChatModel.getInstance();
			let channel = model.getChannelByIndex(this.tabList.selectedIndex);
			model.resetNewNum(channel);
			this.tabList.refresh();
		}

		public afterSend(): void {
			this._buffList.isAutoScroll = true;
			this.imgScroll.visible = false;
			this.textInput.text = "";
		}

		/** 滚动位置更新 */
		private onScrollChange(value: number, isDown: boolean): void {
			if (value >= this._buffList.scrollBar.max) {
				this._buffList.isAutoScroll = true;
				this.imgScroll.visible = false;
			} else {
				this._buffList.isAutoScroll = false;
			}
		}

		/** 滚动到底部 */
		private scrollToBottom(): void {
			this._buffList.isAutoScroll = true;
			this.imgScroll.visible = false;
			this._buffList.updateScrollMaxForce();
		}

		/** 发送消息 */
		private onSend(): void {
			dispatchEvt(new ChatEvent(ChatEvent.SEND_CHAT_TEXT, [this.textInput.text, this.tabList.selectedIndex]));
		}

		/** 点击表情回调 */
		private clickFaceCb(face: IExpressionVo): void {
			this.textInput.text += face.id;
		}
		private clickQuickCb(info: tb.TB_chat_quick): void {
			if (!info) return;
			if (info.ID == 4 && !GuildModel.getInstance().isHasGuild()) {
				showToast(LanMgr.getLan(``, 10259));
				return;
			}
			dispatchEvt(new ChatEvent(ChatEvent.SEND_CHAT_TEXT, [info.desc, this.tabList.selectedIndex]));
		}
		/**点击表情按钮 */
		private onFaceOpenOrHide(): void {
			this.faceUI.onOpenOrHide();
		}
		private onQuickOpenOrHide(): void {
			this.quickUI.onOpenOrHide();
			dispatchEvt(new ChatEvent(ChatEvent.SHORTCUTS_OPEN_OR_HIDE));
		}

		private onExit(): void {
			UIMgr.hideUIByName(UIConst.ChatView);
		}
	}
}