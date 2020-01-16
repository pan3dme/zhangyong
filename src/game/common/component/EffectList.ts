module common {
	export class EffectList extends DialogExt {
		/**把需要弹出的提示压到数组 */
		public static showEffectList(listVo: ListVo): common.EffectList {
			if (listVo._dataSource.length <= 0) return null;
			let efflist: common.EffectList = Laya.Pool.getItemByClass('EffectList', common.EffectList);
			efflist.initView(listVo);
			Dialog.manager.addChild(efflist);
			return efflist;
		}

		public static updateEffectShow(): void {
			for (let dialog of Dialog.manager._childs) {
				if (dialog.name == 'EffectList') {
					if (!this.viewIsShow(UIConst.FightGuildCopyResultView) &&
						!this.viewIsShow(UIConst.CommonRewardView) &&
						!this.viewIsShow(UIConst.FightVictory) &&
						!this.viewIsShow(UIConst.GuajiVictory) &&
						!this.viewIsShow(UIConst.Topup_GiftSuccView) &&
						!this.viewIsShow(UIConst.Topup_SuccView) &&
						!this.viewIsShow(UIConst.LevelUpView) &&
						!this.viewIsShow(UIConst.ShowRewardItem) &&
						!this.viewIsShow(UIConst.DFW_QiyuResultView) &&
						!this.viewIsShow(UIConst.GuildCopySweepResultView)) {
						let effectList: common.EffectList = dialog;
						effectList.stratEndAction();
					}
				}
			}
		}

		public startEnd: boolean = false;
		private list_item: Laya.List;
		private listVo: ListVo;
		private index: number = 0;
		constructor() {
			super();
			this.zOrder = UI_DEPATH_VALUE.TOP + 5;
			this.mouseThrough = true;
			this.name = 'EffectList';
			this.isIgnore = true;
			this.close = null;
		}

		public initView(listVo: ListVo): void {
			this.listVo = listVo;
			if (!this.list_item) {
				this.list_item = new Laya.List();
				this.list_item.itemRender = common.ItemBox;
				this.list_item.vScrollBarSkin = "";
				this.addChild(this.list_item);
			}
			this.list_item.height = listVo._height ? listVo._height : 200;
			this.list_item.x = listVo._x;
			this.zOrder = listVo.Zorder;
			this.list_item.spaceX = listVo._spaceX;
			this.list_item.spaceY = listVo._spaceY;
			this.list_item.repeatX = listVo._repeatX;
			this.list_item.y = listVo._y;
			this.list_item.array = this.setVoToItemVo(listVo._dataSource);
			if (listVo._width) this.list_item.width = listVo._width;
			else this.list_item.width = null;
			this.height = this.list_item.height;
			this.width = this.list_item.width;
			this.startEnd = false;
			this.index = 0;
			Laya.timer.loop(150, this, this.itemBoxStartAction);
			tl3d.ModuleEventManager.addEvent(game.HudEvent.SCREEN_SIZE_CHNAGE, this._onResize, this);
		}

		private _onResize(): void {
			this.x = Launch.offsetX;
			this.y = Launch.offsetY;
		}

		private setVoToItemVo(data: Array<any>): Array<any> {
			for (let i in data) {
				if (data[i] instanceof EquipItemVo) {
					data[i].startAction = true;
					data[i].templateId = null;
					data[i].show = true;
				}
			}
			return data
		}

		public static viewIsShow(uiConst: string): boolean {
			return UIMgr.hasStage(uiConst);
		}

		/**逐个飞物品格子 */
		private itemBoxStartAction(): void {
			if (!this.list_item || !this.list_item.array) return;
			if (this.index == this.list_item.array.length) {
				Laya.timer.clear(this, this.itemBoxStartAction);
				return;
			}
			let itemBox = this.list_item.getCell(this.index);
			if (itemBox) {
				this.index++;
				if (itemBox.dataSource) {
					itemBox.visible = true;
					itemBox.dataSource.startAction = false;
					Laya.Tween.to(itemBox, { scaleX: 1, scaleY: 1 }, 150);
				} else {
					itemBox.visible = false;
				}
			}
		}

		public isStartEndAction(): boolean {
			return !this.list_item || this.list_item.length == 0;
		}

		/**开始结束动画 */
		public stratEndAction(): void {
			if (this.isStartEndAction()) return;
			Laya.timer.clear(this, this.itemBoxStartAction);
			this.list_item.scrollTo(0);
			this.list_item.width = 999;
			this.list_item.height = 800;
			// this.list_item.mouseEnabled = false;
			this.index = this.list_item.length;
			for (let i = 0; i < this.index; i++) {
				let itemBox = this.list_item.getCell(i);
				Laya.Tween.clearTween(itemBox);
				if (itemBox) {
					itemBox.scale(1, 1);
					itemBox.visible = true;
					itemBox.dataSource.startAction = false;
				}
			}
			this.itemBoxEndAction();
			let speed = this.index >= 6 ? 50 : 100;
			Laya.timer.loop(speed, this, this.itemBoxEndAction);
			tl3d.ModuleEventManager.removeEvent(game.HudEvent.SCREEN_SIZE_CHNAGE, this._onResize, this);
		}

		/**回到背包 */
		private itemBoxEndAction(): void {
			if (this.index < 0) {
				Laya.timer.clear(this, this.itemBoxEndAction);
				return;
			}
			this.index--;
			let uiPanel: game.HudView = UIMgr.getUIByName(UIConst.HudView);
			let pos = this.list_item.globalToLocal(uiPanel.getBtnPos(uiPanel.btn_bag));
			let isEnd: boolean = this.index <= 0;
			let itemBox: common.ItemBox = <common.ItemBox>this.list_item.getCell(this.index);
			if (itemBox) {
				BezierTween.clear(itemBox);
				itemBox.scale(1, 1);
				BezierTween.to(itemBox, 500, [{ x: itemBox.x, y: itemBox.y }, { x: pos.x, y: pos.y }], { scaleX: 0.5, scaleY: 0.5 }, null, new Handler(this, () => {
					itemBox.visible = false;
					if (isEnd) {
						this.list_item.array = null;
						this.removeSelf();
						// Dialog.manager.removeChild(this);
						Laya.Pool.recover('EffectList', this);
					}
				}));
			}
		}
	}
}