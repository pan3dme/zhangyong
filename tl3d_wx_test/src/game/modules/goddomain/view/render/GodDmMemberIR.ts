


module game {
	export class GodDmMemberIR extends ui.goddomain.render.MemberIRUI {

		private uiScene: Base2dSceneLayer;
		private _modelId: number;
		public uiPos: Laya.Point;
		constructor() {
			super();
			this._modelId = 0;
			this.uiScene = new Base2dSceneLayer();
			this.boxRole.addChild(this.uiScene);
			this.htmlText.style.fontSize = 22;
			this.htmlText.style.wordWrap = true;
			this.htmlText.style.color = "#7e5336";
		}
		public initData(): void {
			// 聊天层级最高，移到父级
			this.parent.addChild(this.imgChat);
			this.imgChat.visible = false;
		}

		public set dataSource($value: GodDmMemberVo) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource(): GodDmMemberVo {
			return this._dataSource;
		}

		public refreshData() {
			let info = this.dataSource;
			if (info) {
				this.lbPos.text = info.pos + "";
				this.uiScene.onShow();
				if (info.isExist()) {
					this.imgDi.visible = this.imgDesc.visible = this.boxForce.visible = this.lbGuild.visible = this.lbName.visible = true;
					this.btnInvite.visible = false;
					this.lbName.text = info.svo.name;
					this.lbGuild.text = LanMgr.getLan("",12560,info.svo.guildName ? info.svo.guildName : LanMgr.getLan("",12084));
					this.lbForce.text = info.svo.force + "";
					this.lbForce.event(Laya.Event.RESIZE);
					this.imgDesc.skin = info.isCaptain() ? SkinUtil.izsy_di13 : SkinUtil.izsy_di14;
					this.imgDesc.width = info.isCaptain() ? 80 : (info.isReady() ? 120 : 100);
					this.lbDesc.text = info.isCaptain() ? LanMgr.getLan("",12329) : (info.isReady() ? LanMgr.getLan("",12327) : LanMgr.getLan("",12328));
					if (this._modelId != info.getModel()) {
						this._modelId = info.getModel();
						Laya.timer.clear(this, this.delayShow);
						Laya.timer.once(200, this, this.delayShow, [this._modelId]);
					}
				} else {
					this.imgDi.visible = this.imgDesc.visible = this.boxForce.visible = this.lbGuild.visible = this.lbName.visible = false;
					this.btnInvite.visible = true;
					Laya.timer.clearAll(this);
					this.uiScene.onExit();
					this._modelId = 0;
					this.imgChat.visible = false;
				}
				this.btnInvite.on(Laya.Event.CLICK, this, this.onInvite);
			} else {
				Laya.timer.clearAll(this);
				this.uiScene.onExit();
				this._modelId = 0;
				this.imgChat.visible = false;
				this.btnInvite.off(Laya.Event.CLICK, this, this.onInvite);
			}
		}

		/** 对话 */
		addChat(info: ChatInfoVo): void {
			this.htmlText.innerHTML = info.getContent();
			this.imgChat.height = this.htmlText.y + this.htmlText.contextHeight + 50;
			this.imgChat.x = this.uiPos.x + (this.width >> 1) - 25;
			this.imgChat.y = this.uiPos.y - this.imgChat.height;
			// 聊天时候层级最上面
			this.parent.setChildIndex(this.imgChat, this.parent.numChildren - 1);
			this.imgChat.visible = true;
			Laya.timer.clear(this, this.clearChat);
			Laya.timer.once(10000, this, this.clearChat);
		}
		/** 清除对话 */
		clearChat(): void {
			Laya.timer.clear(this, this.clearChat);
			this.imgChat.visible = false;
			this.htmlText.innerHTML = "";
		}

		/** 开始移动 */
		startMove(): void {
			Laya.timer.clear(this, this.updatePosition);
			Laya.timer.frameLoop(2, this, this.updatePosition);
		}
		/** 更新位置 */
		private updatePosition(): void {
			if (this.uiScene.sceneChar) {
				let point = this.lbName.localToGlobal(new Laya.Point(0, 0));
				this.uiScene.sceneChar.set2dPos(point.x + this.lbName.width / 2 - Launch.offsetX, point.y + 10 - Launch.offsetY);
			}
		}
		/** 停止移动 */
		stopMove(): void {
			Laya.timer.clear(this, this.updatePosition);
			this.pos(this.uiPos.x, this.uiPos.y);
			this.updatePosition();
		}

		/** 邀请 */
		private onInvite(): void {
			let info = this.dataSource;
			if (info && !info.isExist()) {
				dispatchEvt(new GodDomainEvent(GodDomainEvent.SHOW_INVITE_VIEW), this.dataSource);
			}
		}


		/** 延迟展示模型（延迟主要为了定位） */
		private delayShow(modeid: any): void {
			let point = this.lbName.localToGlobal(new Laya.Point(0, 0));
			this.uiScene.addModelChar(modeid, point.x + this.lbName.width / 2 - Launch.offsetX, point.y + 10 - Launch.offsetY, 180, 2);
			this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
		}

		/** 是否在初始范围内 */
		isInInitArea(cx: number, cy: number): boolean {
			return (cx >= this.uiPos.x && cx <= this.uiPos.x + this.width) && (cy >= this.uiPos.y && cy <= this.uiPos.y + this.height);
		}
	}
}