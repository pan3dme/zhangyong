/**
* name 
*/
module game {
	export class GodLiHuiView extends ui.god.GodLiHuiUI {

		static SCALE_MIN: number = 50;
		static SCALE_MAX: number = 150;

		private factor: number = 0.15;

		//上次记录的两个触模点之间距离 用于双指缩放
		private lastDistance: number = 0;

		private _godTemp: tb.TB_god;
		constructor() {
			super();
			this.isModelClose = true;
			this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.GOD_LIHUI);
			this.panel_main.width = Laya.stage.width;
			this.panel_main.height = Laya.stage.height;
		}

		public popup(): void {
			super.popup();
			this.initView();
		}

		private initView(): void {
			this.panel_main.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
			this.panel_main.on(Laya.Event.MOUSE_UP, this, this.onUp);
			this.panel_main.on(Laya.Event.MOUSE_OUT, this, this.onUp);
			this.btn_reduce.on(Laya.Event.CLICK, this, this.onClickReduce);
			this.btn_add.on(Laya.Event.CLICK, this, this.onClickAdd);
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
			this.sl_scale.changeHandler = Handler.create(this, this.onScaleChange, null, false);
			this.sl_scale.showLabel = false;
			this._godTemp = this.dataSource;
			this.lab_title.text = this._godTemp.name;
			this.updateView();
		}

		private updateView(): void {
			this.img_god.skin = SkinUtil.getLiHuiIcon(this._godTemp.paint);
			this.img_god.scale(1, 1);
			this.img_god.x = this.panel_main.width / 2;
			this.img_god.y = this.panel_main.height / 2;
			Laya.timer.frameOnce(3, this, () => {
				this.sl_scale.value = 100;
			});
		}

		private _isDown: boolean = false;
		private _lastPosX: number = 0;
		private _lastPosY: number = 0;
		private onDown(e: Laya.Event): void {
			this._isDown = true;
			this._lastPosX = e.currentTarget.mouseX;
			this._lastPosY = e.currentTarget.mouseY;
			this.panel_main.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
			var touches: Array<any> = e.touches;
			if (touches && touches.length == 2) {
				this.lastDistance = this.getDistance(touches);
			}
		}

		/**计算两个触摸点之间的距离*/
		private getDistance(points: Array<any>): number {
			var distance: number = 0;
			if (points && points.length == 2) {
				var dx: number = points[0].stageX - points[1].stageX;
				var dy: number = points[0].stageY - points[1].stageY;

				distance = Math.sqrt(dx * dx + dy * dy);
			}
			return distance;
		}

		private onMove(e: Laya.Event): void {
			if (!this._isDown) return;
			var touches: Array<any> = e.touches;
			if (touches && touches.length == 2) {
				//双指
				var distance: number = this.getDistance(e.touches);

				//判断当前距离与上次距离变化，确定是放大还是缩小
				let scale = (distance - this.lastDistance) * this.factor;
				this.lastDistance = distance;
				scale += this.sl_scale.value;
				scale = Math.min(GodLiHuiView.SCALE_MAX, scale);
				this.sl_scale.value = Math.max(GodLiHuiView.SCALE_MIN, scale);

			} else {
				let newPosx: number = e.currentTarget.mouseX;
				let newPosy: number = e.currentTarget.mouseY;
				let chaposx: number = newPosx - this._lastPosX;
				let chaposy: number = newPosy - this._lastPosY;
				this._lastPosX = newPosx;
				this._lastPosY = newPosy;
				this.img_god.x += chaposx;
				this.img_god.y += chaposy;
			}
		}

		private onUp(e: Laya.Event): void {
			this._isDown = false;
			this.panel_main.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
		}

		private _posx: number;
		private _posy: number;
		private onScaleChange(value: number): void {
			let per: number = this.getScaleBySliderValue(value);
			this.img_god.scale(per, per);
		}

		private onClickReduce(): void {
			this.sl_scale.value = Math.max(GodLiHuiView.SCALE_MIN, this.sl_scale.value - 1);
		}

		private onClickAdd(): void {
			this.sl_scale.value = Math.min(GodLiHuiView.SCALE_MAX, this.sl_scale.value + 1);
		}

		private getScaleBySliderValue(sliderVal: number): number {
			let val: number = sliderVal / 100;
			return val;
		}

		public onClosed(): void {
			super.onClosed();
			this.panel_main.off(Laya.Event.MOUSE_DOWN, this, this.onDown);
			this.panel_main.off(Laya.Event.MOUSE_UP, this, this.onUp);
			this.panel_main.off(Laya.Event.MOUSE_OUT, this, this.onUp);
			this.btn_reduce.off(Laya.Event.CLICK, this, this.onClickReduce);
			this.btn_add.off(Laya.Event.CLICK, this, this.onClickAdd);
			this.btn_close.off(Laya.Event.CLICK, this, this.close);
			if (this.sl_scale.changeHandler) {
				this.sl_scale.changeHandler.recover();
				this.sl_scale.changeHandler = null;
			}
			this._godTemp = null;
		}
	}
}