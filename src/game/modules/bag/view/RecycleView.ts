module game {
	export class RecycleView extends ui.bag.RecycleUI {

		private _model: BagModel;
		constructor() {
			super();
			this.isModelClose = true;
			this.btn_recycle.on(Laya.Event.CLICK, this, this.onRecycle);
			this.btn_white.on(Laya.Event.CLICK, this, this.onChoose, [QualityConst.WHITE]);
			this.btn_green.on(Laya.Event.CLICK, this, this.onChoose, [QualityConst.GREEN]);
			this.btn_blue.on(Laya.Event.CLICK, this, this.onChoose, [QualityConst.BLUE]);
			this.btn_purple.on(Laya.Event.CLICK, this, this.onChoose, [QualityConst.PURPLE]);
			this.bgPanel.dataSource = { uiName: UIConst.Bag_RecycleView, closeOnSide: this.isModelClose, title: LanMgr.getLan("",12591) };
			this._model = BagModel.getInstance();
		}

		/**
		 * 关闭批量出售界面
		 */
		public close() {
			super.close("", true);
			this.list_equips.array = null;
		}

		/**
		 * 展示符文
		 */
		public popup() {
			super.popup(false, true);
			this.init();
		}

		public init() {
			this.equchange();
			this.pingzhi();
			this.changImg();
			//特殊处理 有白色和绿色的装备，默认勾选
			this.chooseItem(QualityConst.WHITE);
			this.chooseItem(QualityConst.GREEN);
			this._clickflag = true;
		}

		private chooseItem(itemnum:number){
			if (this._numAry[itemnum - 1] > 0) {
				let selimg: Laya.Image = this["img_" + itemnum];
				if (!selimg.visible) {
					this.onChoose(itemnum);
				}
			}
		}

		public equchange() {
			this.list_equips.array = this._model.getEquList();
		}

		private _clickflag: boolean;
		/**
		 * 点击出售
		 */
		private onRecycle() {
			if (!this._clickflag) {
				showToast(LanMgr.getLan("", 11012))
				return;
			}
			this._clickflag = false;
			Laya.timer.once(200, this, () => {
				this._clickflag = true;
			});
			let recycleAry: Array<EquipItemVo> = new Array
			for (var i = 0; i < this.list_equips.array.length; i++) {
				var element: EquipItemVo = this.list_equips.array[i];
				if (element.selected) {
					recycleAry.push(element);
				}
			}
			if (recycleAry.length <= 0) {
				showToast(LanMgr.getLan("", 11011))
				return;
			}
			dispatchEvt(new BagEvent(BagEvent.FENJIE_EQUIPS), recycleAry);
		}

		/**
		 * 品质对应数量
		 */
		private _numAry: Array<number>;
		public pingzhi() {
			this._numAry = BagModel.getInstance().countQuality(this.list_equips.array);
			this.showQualityNum(this._numAry);
		}

		/**
		 * 选择品质个数
		 * @param arry 
		 */
		public showQualityNum(arry: Array<number>) {
			this.btn_white.label = "X" + arry[0];
			this.btn_green.label = "X" + arry[1];
			this.btn_blue.label = "X" + arry[2];
			this.btn_purple.label = "X" + arry[3];
		}

		/**
		 * 点击选择品质按钮
		 * @param num 
		 */
		private onChoose(quality: number) {
			if (this._numAry.length > 0 && this._numAry[quality - 1] > 0) {
				let selimg: Laya.Image = this["img_" + quality];
				selimg.visible = !selimg.visible;
				for (var i = 0; i < this.list_equips.array.length; i++) {
					var element: EquipItemVo = this.list_equips.array[i];
					if (element.quality == quality && element.selected != selimg.visible) {
						element.selected = selimg.visible;
						this.list_equips.setItem(i, element);
					}
				}
			} else {
				showToast(LanMgr.getLan("", 11013))
			}
		}

		public changImg() {
			let white: number = 0;
			let green: number = 0;
			let blue: number = 0;
			let purple: number = 0;
			for (var i = 0; i < this.list_equips.array.length; i++) {
				var element: EquipItemVo = this.list_equips.array[i];
				if (element.selected) {
					if (element.quality == QualityConst.WHITE) {
						white++;
					} else if (element.quality == QualityConst.GREEN) {
						green++;
					} else if (element.quality == QualityConst.BLUE) {
						blue++;
					} else if (element.quality == QualityConst.PURPLE) {
						purple++;
					}
				}
			}
			this.img_1.visible = this._numAry && white != 0 && this._numAry.length > 0 && this._numAry[0] == white;
			this.img_2.visible = this._numAry && green != 0 && this._numAry.length > 0 && this._numAry[1] == green;
			this.img_3.visible = this._numAry && blue != 0 && this._numAry.length > 0 && this._numAry[2] == blue;
			this.img_4.visible = this._numAry && purple != 0 && this._numAry.length > 0 && this._numAry[3] == purple;
		}
	}
}