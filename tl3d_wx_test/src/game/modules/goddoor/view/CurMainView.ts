module game {
	export class CurMainView extends ui.goddoor.CurMainUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.group = UIConst.two_group;
			this.bgPanel.dataSource = {uiName:UIConst.GodDoorView,closeOnSide:false,title:"神界之门"};
			this.bgPanel.box_Content.addChild(this.viewStack);
			this.list_tab.dataSource = [{label:"神界之门"},{label:"英雄转换"}];
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.init();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.init();
		}

		
		private init(): void {
			this.list_tab.selectHandler = Handler.create(this, this.onTab, null, false);
			this.onTab(0);
			this.drawMoney();
			this.btn_tishi.on(Laya.Event.CLICK, this, this.tishi);
			tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.drawMoney, this)
		}

		public drawMoney() {
			this.lab_jiejingnum.text = Snums(App.hero.godCrystal);
			this.lab_xingchennum.text = Snums(App.hero.convertDust);
			this.lab_miyaonum.text = Snums(App.hero.getBagItemNum(CostTypeKey.shenjiemiyao));
		}

		public close(){
			super.close();
			this.onTab(-1);
			if (this.list_tab.selectHandler){
				this.list_tab.selectHandler.recover();
				this.list_tab.selectHandler = null;
			}
            tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.drawMoney, this)
		}

		private onTab(index: number): void {
			this.list_tab.selectedIndex = index;
			this.viewStack.selectedIndex = index;
			common.TabIR3.onSelectCell(this.list_tab.cells, index);
			if (index == 0) {
				//神界之门界面
				this.vs_item0.init();
				this.vs_item1.close();
			}else if(index == 1){
				//神力转换界面
				this.vs_item0.close();
				this.vs_item1.init();
			}else{
				this.vs_item0.close();
				this.vs_item1.close();
			}
		}

		private tishi(): void {
			UIUtil.showCommonTipView(LanMgr.getLanArr(20021));
		}

		//添加遮罩
		private _hitBoxArea:Laya.HitArea;
		private _hitBoxMaskCB:Laya.Handler;
		private _helpPoint:Laya.Point = new Laya.Point();
		public addBoxMask(callback:Laya.Handler = null):void{
			if (!this._hitBoxArea){
				this._hitBoxArea = this.box_mask.hitArea = new Laya.HitArea();
				let posx:number = (this.width - Laya.stage.width)/2;
				let posy:number = (this.height - Laya.stage.height)/2;
				this.box_mask.x = posx;
				this.box_mask.y = posy;
				this.box_mask.width = Laya.stage.width;
				this.box_mask.height = Laya.stage.height;
				this._hitBoxArea.hit.drawRect(0, 0, this.box_mask.width, this.box_mask.height, "#000000");
			}
			this.box_mask.visible = true;
			this._hitBoxArea.unHit.clear();
			this.box_mask.on(Laya.Event.CLICK, this, this.onClickBoxMask);
			if (this._hitBoxMaskCB) this._hitBoxMaskCB.recover();
			this._hitBoxMaskCB = callback;
		}

		private onClickBoxMask():void{
			if (this._hitBoxMaskCB){
				this._hitBoxMaskCB.run();
			}
		}

		public addBoxMaskUnit(target:Laya.Sprite):void{
			if (!target || !this._hitBoxArea) return;
			this._helpPoint.setTo(0, 0);
			this._helpPoint = target.localToGlobal(this._helpPoint);
			this._helpPoint = this.box_mask.globalToLocal(this._helpPoint);
			this._hitBoxArea.unHit.drawRect(this._helpPoint.x, this._helpPoint.y, target.width, target.height, "#000000");
		}

		//移除遮罩
		public removeBoxMask():void{
			this.box_mask.visible = false;
			if (this._hitBoxArea){
				this._hitBoxArea.unHit.clear();
			}
			this.box_mask.off(Laya.Event.CLICK, this, this.onClickBoxMask);
			if (this._hitBoxMaskCB) this._hitBoxMaskCB.recover();
			this._hitBoxMaskCB = null;
		}
	}
}