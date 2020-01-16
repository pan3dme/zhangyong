/**
* name 
*/
module game {
	export class payActivityView extends ui.activity.huodong.welfare.payActivityUI {
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
			tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.onUpdateRes, this);
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);
			this.onUpdateRes();
			this.list_btn.array = HuodongModel.getInstance().payTabItemLabel;
			let index = !isNaN(this.dataSource) && this.dataSource >= 0 ? this.dataSource : 0;
			this.list_btn.selectedIndex = index;
			this.onTabSelect(this.list_btn.selectedIndex);
			this.list_btn.scrollTo(0);
			this.btnClose.on(Laya.Event.CLICK, this, this.close);
		}

		private onTabRender(cell: game.PayActivityTabIR, index: number) {
			cell.selectBox.selected = index == this._selectTabNum;
		}

		private _xiangouLibaoView: game.XiangouLibaoView;
		private _yuekaView: game.YuekaView;
		private _jijinView: game.JijinView;

		private _selectTabNum: number;
		private onTabSelect(index: number) {
			if (this._selectTabNum == index) return;
			let uiskin = null;
			this._selectTabNum = index;
			this.hideAll();
			let btnData = this.list_btn.getItem(index);
			let type = btnData ? btnData[0] : -1;
			switch (type) {
				case WelfareType.dayLibao:
				case WelfareType.weekLibao:
				case WelfareType.monthLibao:
					if (!this._xiangouLibaoView) {
						this._xiangouLibaoView = new game.XiangouLibaoView();
						this._xiangouLibaoView.centerX = 0;
						this._xiangouLibaoView.y = 456;
					}
					this.addChildAt(this._xiangouLibaoView, 2);
					this._xiangouLibaoView.onEnter(type);
					uiskin = SkinUtil.getWelfareTitle(type);
					break;
				case WelfareType.yueka:
					if (!this._yuekaView) {
						this._yuekaView = new game.YuekaView();
						this._yuekaView.centerX = 0;
						this._yuekaView.y = 460;
					}
					this.addChildAt(this._yuekaView, 2);
					this._yuekaView.onAdd();
					uiskin = "fuli/yuekainfo.jpg"
					break;
				case WelfareType.dengjiJijin:
					if (!this._jijinView) {
						this._jijinView = new game.JijinView();
						this._jijinView.centerX = 0;
						this._jijinView.y = 107;
					}
					this.addChildAt(this._jijinView, 2);
					this._jijinView.onAdd();
					uiskin = "fuli/guanggaotu2.jpg"
					break;
				default:
					break;
			}
			this.imgTitle.skin = uiskin;
			Laya.Tween.clearTween(this.imgTitle);
			this.imgTitle.x = 0;
			let tagX = this.imgTitle.x + 720;
			Laya.Tween.from(this.imgTitle,{x:tagX},500,Laya.Ease.backOut);
		}

		private hideAll() {
			if (this._xiangouLibaoView && this._xiangouLibaoView.parent) {
				this._xiangouLibaoView.onExit();
				this._xiangouLibaoView.removeSelf();
			}
			if (this._yuekaView && this._yuekaView.parent) {
				this._yuekaView.onExit();
				this._yuekaView.removeSelf();
			}
			if (this._jijinView && this._jijinView.parent) {
				this._jijinView.onExit();
				this._jijinView.removeSelf();
			}
		}

		public setBtnLabel(): void {
			if (this._jijinView) {
				this._jijinView.setBtnLabel();
			}
		}

		public initJijinlist(): void {
			if (this._jijinView) {
				this._jijinView.initView();
			}
		}

		public initYuekaView(): void {
			if (this._yuekaView) {
				this._yuekaView.initView();
			}
		}

		public updateXiangouLibao(): void {
			if (this._xiangouLibaoView) {
				this._xiangouLibaoView.initView();
			}
		}

		public close(){
			super.close();
			dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, [ModuleConst.MAIN]));
		}

		public onClosed() {
			super.onClosed();
			this.btnClose.off(Laya.Event.CLICK, this, this.close);
			this.hideAll();
			this._selectTabNum = -1;

			tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.onUpdateRes, this);
			tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.onUpdateRes, this);

			
		}


		/** 更新资源 (页面显示该商店所需要的资源图标 + 玩家拥有数目)*/
		private onUpdateRes(): void {
			this.boxRes.width = 312;
			this.lab_zuanshi.text = Snums(App.hero.diamond);
			this.lab_money.text = Snums(App.hero.gold);
		}

	}
}