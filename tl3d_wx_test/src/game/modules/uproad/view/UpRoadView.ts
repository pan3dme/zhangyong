/**
* name 
*/
module game {
	export class UpRoadView extends ui.uproad.UpRoadViewUI {
		private _num;
		constructor() {
			super();
			this.isModelClose = true;
			this.uiScene = new Base2dSceneLayer();
			this.addChildAt(this.uiScene, 8);
		}

		createChildren(): void {
			super.createChildren();
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		public close(type?: string, showEffect?: boolean, sound = true): void {
			super.close();
			tl3d.ModuleEventManager.removeEvent(UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
			tl3d.ModuleEventManager.removeEvent(UpRoadEvent.UR_COUNT_CHANGE, this.onConditionChange, this);
			tl3d.ModuleEventManager.removeEvent(UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
			this.btn_close.off(Laya.Event.CLICK, this, this.close);
			if (this.list_UR.selectHandler) {
				this.list_UR.selectHandler.recover();
				this.list_UR.selectHandler = null;
			}
			this.uiScene.onExit();
			this.stopTaskEff();
			this.list_UR.array = null;
			this.list_URReward.array = null;
			this.list_URTask.array = null;
			this.ui_showitem.dataSource = null;

			this._allAdvanceRoadTs = [];
			this._curAdvanceRoadT = null;
			this._curURIdx = -1;
			this._lastmodel = -1;
		}

		public onClosed(type?: string): void {
			super.onClosed();
		}


		private _maxURLv: number = 0;
		private _curURLv: number = 0;
		private _allAdvanceRoadTs: tb.TB_advance_road[];
		private uiScene: Base2dSceneLayer;
		private initView(): void {

			tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_LEVEL_CHANGE, this.onUpRoadChange, this);
			tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_COUNT_CHANGE, this.onConditionChange, this);
			tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_REWARD_CHANGE, this.onConditionChange, this);
			this.list_UR.selectHandler = Handler.create(this, this.onURSelect, null, false);
			this.btn_close.on(Laya.Event.CLICK, this, this.close);

			this._allAdvanceRoadTs = this.getAllAdvanceRoadT();
			this._maxURLv = this._allAdvanceRoadTs.length;
			this._curURLv = App.hero.tasks.advanceLevel;
			let idx: number = this.dataSource ? this.dataSource : this._curURLv;

			this.updateURList();
			this.onURSelect(idx, true);
			this.list_UR.scrollTo(idx - 1);

		}

		//获取模板
		private getAllAdvanceRoadT(): tb.TB_advance_road[] {
			let arr: tb.TB_advance_road[] = [];
			let data = TableData.getInstance().getTableByName(TableData.tb_advance_road).data;
			if (data) {
				for (let key in data) {
					arr.push(data[key]);
				}
			}
			return arr;
		}

		//阶数变化
		private onUpRoadChange(): void {
			this._curURLv = App.hero.tasks.advanceLevel;
			this.list_UR.refresh();

			this.onURSelect(this._curURLv, true);
			this.list_UR.scrollTo(this._curURLv);

		}

		//任务变化
		private onConditionChange(): void {
			this.list_URTask.refresh();
		}

		private updateURList(): void {
			this.list_UR.array = this._allAdvanceRoadTs;
		}

		private onURSelect(index: number, force: boolean = false): void {
			if (index >= this._maxURLv) index = this._maxURLv - 1;
			if (index == this._curURIdx && !force) return;
			this._curURIdx = index;
			this._curAdvanceRoadT = this._allAdvanceRoadTs[index];
			this.list_UR.selectedIndex = index;
			this.showUR();
		}

		private _curURIdx: number = -1;
		private _curAdvanceRoadT: tb.TB_advance_road;
		private showUR(): void {
			this.updateURReward();
			// this.updateActiveBtn();
			this.updateShow();
			this.updateURTaskList();
			Laya.timer.callLater(this, this.playTaskEff);
		}

		//当前奖励
		private updateURReward(): void {
			if (this._curAdvanceRoadT) {
				this.list_URReward.array = ary2prop(this._curAdvanceRoadT.reward);
				this.list_URReward.repeatX = this.list_URReward.array.length;
				this.list_URReward.x = (this.width - this.list_URReward.width) / 2;
			}
		}

		private updateShow(): void {
			this.lab_propname.visible = this.lab_artifaceinfo.visible = this.lab_artifacename.visible = false;
			if (this._curAdvanceRoadT) {
				let data: string[] = this._curAdvanceRoadT.show.split(',');
				if (data.length > 1) {
					let id: number = parseInt(data[1]);
					if (data[0] == "1") {
						//模型
						let tabArtiface = tb.TB_artifact.get_TB_artifactById(id);
						this.uiScene.onShow();
						this.refreshModel(tabArtiface.model);
						this.box_showitem.visible = false;
						this.ui_showitem.dataSource = null;
						this.lab_artifaceinfo.visible = this.lab_artifacename.visible = true;
						this.lab_artifacename.text = tabArtiface.name
						this.lab_artifaceinfo.text = tabArtiface.desc

					} else {
						this.uiScene.onExit();
						this._lastmodel = -1;
						this.box_showitem.visible = true;
						let item: tb.TB_item = tb.TB_item.get_TB_itemById(id);
						this.ui_showitem.dataSource = new ItemVo(id, 1);
						if (item.type == iface.tb_prop.itemTypeKey.treasure) {
							this.lab_propname.visible = true;
							this.lab_propname.text = `${LanMgr.qualityColor[item.quality]}${LanMgr.getLan("",12113)}-${item.name}`
						}

					}
				}
			}
		}

		/**
         * 刷新模型id
         * @param modeid 模型id
         */
		//防止重复加载
		private _lastmodel: number;
		private _modelpos: any = {
			1: [0, 520, 180, 2.25, 0],
			2: [125, 565, 180, 2, 45],
			3: [150, 600, 180, 2, 45],
			4: [125, 560, 180, 1.8, 45],
			6: [125, 560, 180, 1.62, 45],
		}
		private refreshModel(modelid: number) {
			//因模型和特效的关系，切换模型时，必须重新new 一个scenechar
			if (this._lastmodel == modelid) {
				return;
			}
			let locations = this._modelpos[modelid] ? this._modelpos[modelid] : [0, 520, 180, 2.25, 0];
			this.uiScene.addModelChar(modelid + ``, 360 + Number(locations[0]),
				Number(locations[1]) + 120, Number(locations[2]), Number(locations[3]) * 0.8, Number(locations[4]));
			this._lastmodel = modelid;
		}

		//更新任务
		private updateURTaskList(): void {
			if (this._curAdvanceRoadT && this._curAdvanceRoadT.ID <= this._curURLv + 1) {
				this.list_URTask.array = this._curAdvanceRoadT.getCondition();
				this.box_lock.visible = false;
				this.list_URTask.visible = true;
			} else {
				this.list_URTask.array = null;
				this.list_URTask.visible = false;
				this.box_lock.visible = true;
			}
		}

		//
		private playTaskEff(): void {
			this.stopTaskEff();

			if (this.list_URTask.cells) {
				let wc: number = (Laya.stage.width - this.width) / 2;
				for (let i: number = 0; i < this.list_URTask.cells.length; i++) {
					let cell = this.list_URTask.cells[i];
					let targetpos: number = 0;
					cell.x = - wc - this.width;
					let delatTime: number = 0;
					if (i % 2 == 0) {
						delatTime = 100;
					} else {
						targetpos = cell.width + this.list_URTask.spaceX;
						this.PlayTaskTween(cell, targetpos);
					}
					delatTime += Math.floor(i / 2) * 50;
					Laya.timer.once(delatTime, cell, this.PlayTaskTween, [cell, targetpos]);
				}
			}
		}

		private PlayTaskTween(cell, targetpos: number): void {
			Laya.Tween.to(cell, { "x": targetpos }, 350, Laya.Ease.sineInOut);
		}

		private stopTaskEff(): void {
			if (this.list_URTask.cells) {
				for (let i: number = 0; i < this.list_URTask.cells.length; i++) {
					let cell = this.list_URTask.cells[i];
					Laya.Tween.clearAll(cell);
					Laya.timer.clear(cell, this.PlayTaskTween);
				}
			}
		}




	}
}