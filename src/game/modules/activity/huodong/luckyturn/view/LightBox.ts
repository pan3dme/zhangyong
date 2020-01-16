/**
* name 
*/
module game {
	export class LightBox extends Laya.Image {
		private _msg: any;
		private _data: any;
		private _isSize: any;
		private _cir: number = 0;
		public offposX: number = -5;
		public offposY: number = -6;
		private _originalSize: any;
		private _arrpos: number[][];
		private _callback: Function;
		private _endIdx: number = 0;
		private _posIdx: number = 0;
		private _randIdx: number = 0;
		private _speed: number = 300;
		private _startIdx: number = 0;
		private _endCir: boolean = false;
		constructor(arrpos?: number[][]) {
			super();
			this.visible = false;
			this._arrpos = arrpos;
			this.sizeGrid = `20,20,20,20`;
			this.skin = SkinUtil.box_xuanzhong;
			this._originalSize = { width: 105, height: 105 };
		}

		set arrpos(value) { this._arrpos = value; }
		set bigSize(value) { this._isSize = value; }
		set smallSize(value) { this._originalSize = value; }
		set endIndex(value) {
			this._endIdx = value;
			this._randIdx = value + 2;
			if (this._randIdx > this._arrpos.length - 1) {
				this._randIdx = this._randIdx + 1 - this._arrpos.length;
			}
		}
		set posindex(value) {
			this._posIdx = value;
			if (this._posIdx > this._arrpos.length - 1) this._posIdx = 0;
			if (this._posIdx === this._startIdx) this._cir++;
			if (this._cir >= 3 && this._posIdx == this._randIdx) {
				this._endCir = true;
			}
			this.setSize();
			this.setSpeed();
			this.setPosition();
		}

		get posindex(): number { return this._posIdx; }

		private setPosition(): void {
			this.pos(this._arrpos[this._posIdx][0] + this.offposX, this._arrpos[this._posIdx][1] + this.offposY);
		}

		private setSize(): void {
			let size = this._isSize && this._posIdx % 3 == 0 ? this._isSize : this._originalSize;
			this.size(size.width, size.height);
		}

		private setSpeed(): void {
			if (!this._endCir) this._speed = this._speed < 60 ? 60 : this._speed -= 80;
			else this._speed = this._speed += 50;
		}

		private isEnd(): boolean {
			if (this._endCir && this._cir >= 3 && this._posIdx == this._endIdx) {
				Laya.timer.once(500, this, this.stopIt);
				Dialog.manager.mouseEnabled = true;
				return true;
			}
			return false;
		}

		private stopIt(): void {
			if (this._msg != "") {
				showToast(this._msg);
			} else {
				this._callback();
				App.hero.refreshData(this._data);
				if (this._data.items) {
					UIMgr.showUI(UIConst.TurnRewardView, this._data.items);
				} else {
					UIUtil.showRewardView(this._data.items ? this._data.items : this._data.commonData);
				}
			}
		}

		/**
		 * 光效开始转动
		 * @param data 服务端返回数据
		 * @param msg 服务端返回msg
		 * @param index	最终停的位置
		 * @param callback 回调
		 */
		public startTurn(data: any, msg: string, index: number, callback: Function): void {
			this.posindex = this._posIdx;
			this._cir = 0;
			this._msg = msg;
			this._data = data;
			this._speed = 450;
			this.endIndex = index;
			this._callback = callback;
			this._startIdx = this._posIdx;
			if (!this.visible) this.visible = true;
			Laya.timer.once(this._speed, this, this.startAction);
			Dialog.manager.mouseEnabled = this._endCir = false;
		}

		/**转圈 */
		private startAction(): void {
			this.posindex = this._posIdx + 1;
			AudioMgr.playSound("sound/xuyuan.mp3");
			if (!this.isEnd()) Laya.timer.once(this._speed, this, this.startAction);
		}
	}
}