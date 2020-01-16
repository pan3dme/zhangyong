/**
* name 
*/
module game {
	export class WelfareView extends ui.activity.huodong.welfare.welfareUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.list_btn.selectHandler = new Handler(this, this.onTabSelect);
			this.list_btn.renderHandler = new Handler(this, this.onTabRender);
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
			this.bgPanel.dataSource = { uiName: UIConst.WelfareView, closeOnSide: this.isModelClose, closeOnButton: true, title: "福利大厅" };
			this._selectTabNum = 0;
			this.list_btn.array = HuodongModel.getInstance().welfareTabItemLabel;
			let index = !isNaN(this.dataSource) && this.dataSource >= 0 ? this.dataSource : 0;
			this.list_btn.selectedIndex = index;
			this.onTabSelect(this.list_btn.selectedIndex);
			this.list_btn.scrollTo(0);
			this.btn_left.on(Laya.Event.CLICK, this, this.onLeft);
			this.btn_right.on(Laya.Event.CLICK, this, this.onRight);
			this.btnClose.on(Laya.Event.CLICK, this, this.close);
		}

		private onTabRender(cell: WelfareIR, index: number) {
			// cell.btn_tab.selected = index == this._selectTabNum;
			cell.eff_select.visible = index == this._selectTabNum
			if (index == this._selectTabNum) {
				cell.eff_select.play(0, true);
			} else {
				cell.eff_select.stop();
			}
		}

		private _tosignView: game.ToSignView;
		private _signView: game.SignView;
		private _xuyuanView: game.XuyuanView;
		private _dengjiView: game.DengjiView;
		private _duihuanView: game.DuihuanView;

		private _selectTabNum: number;
		private onTabSelect(index: number) {
			this._selectTabNum = index;
			this.hideAll();
			let btnData = this.list_btn.getItem(index);
			let type = btnData ? btnData[0] : -1;
			switch (type) {
				case WelfareType.daySign:
					if (!this._tosignView) {
						this._tosignView = new game.ToSignView();
						this._tosignView.x = 29;
						this._tosignView.y = 246;
					}
					this.addChild(this._tosignView);
					this._tosignView.onAdd();
					break;
				case WelfareType.monthSign:
					if (!this._signView) {
						this._signView = new game.SignView();
						this._signView.x = 28;
						this._signView.y = 272;
					}
					this.addChild(this._signView);
					this._signView.onAdd();
					break;
				case WelfareType.xuyuan:
					if (!this._xuyuanView) {
						this._xuyuanView = new game.XuyuanView();
						this._xuyuanView.x = 30;
						this._xuyuanView.y = 275;
					}
					this.addChild(this._xuyuanView);
					this._xuyuanView.onAdd();
					break;
				case WelfareType.dengjiLibao:
					if (!this._dengjiView) {
						this._dengjiView = new game.DengjiView();
						this._dengjiView.centerX = 0;
						this._dengjiView.y = 281;
					}
					this.addChild(this._dengjiView);
					this._dengjiView.onAdd();
					break;
				case WelfareType.duihuan:
					if (!this._duihuanView) {
						this._duihuanView = new game.DuihuanView();
						this._duihuanView.x = 47;
						this._duihuanView.y = 270;
					}
					this.addChild(this._duihuanView);
					this._duihuanView.onAdd();
					break;

				default:
					break;
			}
			this.addChild(this.btnClose);
		}

		private hideAll() {
			if (this._tosignView && this._tosignView.parent) {
				this._tosignView.onExit();
				this._tosignView.removeSelf();
			}
			if (this._signView && this._signView.parent) {
				this._signView.onExit();
				this._signView.removeSelf();
			}
			if (this._xuyuanView && this._xuyuanView.parent) {
				this._xuyuanView.onExit();
				this._xuyuanView.removeSelf();
			}
			if (this._dengjiView && this._dengjiView.parent) {
				this._dengjiView.onExit();
				this._dengjiView.removeSelf();
			}
			if (this._duihuanView && this._duihuanView.parent) {
				this._duihuanView.onExit();
				this._duihuanView.removeSelf();
			}
		}


		private onLeft(): void {
			let curIndex = this.list_btn.selectedIndex - 1;
			if (curIndex < 0) return;
			this.list_btn.scrollTo(--this.list_btn.selectedIndex);
		}

		private onRight(): void {
			let curIndex = this.list_btn.selectedIndex + 1;
			if (curIndex > this.list_btn.array.length - 1) return;
			this.list_btn.scrollTo(++this.list_btn.selectedIndex);
		}

		public setwishNums(): void {
			if (this._xuyuanView) {
				this._xuyuanView.setwishNums();
			}
		}


		public startLucik($data: any, msg: any): void {
			if (this._xuyuanView) {
				this._xuyuanView.startAction($data, msg);
			}
		}


		public initSignViewData(): void {
			if (this._signView) {
				this._signView.initView();
			}
		}


		public initDengjiView(): void {
			if (this._dengjiView) {
				this._dengjiView.listRender();
			}
		}


		public onClosed() {
			super.onClosed();
			this.bgPanel.dataSource = null;
			this.btnClose.off(Laya.Event.CLICK, this, this.close);
			this.btn_left.off(Laya.Event.CLICK, this, this.onLeft);
			this.btn_right.off(Laya.Event.CLICK, this, this.onRight);
			this.hideAll();
		}
	}
}