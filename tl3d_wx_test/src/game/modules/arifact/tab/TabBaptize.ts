/**
* name 
*/
module game {
	export class TabBaptize extends ui.artifact.tab.ArtifactBaptizeUI {
		private _maxAttriLv: Object;
		private _ispBaptize: boolean;
		private _isgBaptize: boolean;
		private _attriLvSum: number = 0;
		private _suodingNum: number = 0;
		private _tmpAttriLvSum: number = 0;

		private _tbs: Array<tb.TB_baptize> = tb.TB_baptize.get_TB_baptize();

		private _curForce: number = 0;
		private _nextForce: number = 0;

		private _qualityColors: Array<string>;
		private _tbSet: tb.TB_artifact_set;
		private uiScenes: Base2dSceneLayerExt;
		constructor() {
			super();
			this._qualityColors = [`46a035`, `21a1dc`, `c23cf3`, `f26b01`, `ff1726`];
			this.uiScenes = new Base2dSceneLayer();
            this.addChild(this.uiScenes);
		}

		private _raceMap: TabBaptizeMap;
		private initRaceNum() {
			if (this._raceMap) return;
			this._raceMap = new TabBaptizeMap;
			let list = App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack);
			for (let i = 0; i < list.length; i++) {
				this._raceMap.add(list[i]);
			}
		}

		private getTotalForce(baptizeAttrs): number {
			let forceVal = 0;
			for (var key in baptizeAttrs) {
				let data = baptizeAttrs[key];
				forceVal += this.getForce(data[3], data[0], data[2]);
			}

			return Math.floor(forceVal);
		}

		private getForce(race: number, attrKey: number, attrVal: number): number {
			let shenli = 0;
			let num = 0;
			let settab: tb.TB_game_set = tb.TB_game_set.get_TB_game_setById(1);
			if (attrKey > 4 || attrVal >= 1) {
				//固定值
				num = this._raceMap.getNumByRaceType(race);
			} else {
				//百分比
				num = this._raceMap.getValByRaceType(race, attrKey);
			}

			shenli = attrKey > 4 ? (num * attrVal) : Math.floor(num * attrVal);
			// logyhj("数量：", num, "计算值：", attrVal, "神力：", shenli);
			shenli = shenli * Number(settab.attr_para[attrKey - 1][1]);
			return shenli;
		}

		private _curArtifactTemp: tb.TB_artifact;
		public show(temp: tb.TB_artifact): void {
			if (!temp) return;
			this._clickflag = true;
			this.initRaceNum();
			this._curArtifactTemp = temp;
			this._tbSet = tb.TB_artifact_set.get_TB_artifact_setById();
			this._attriLvSum = this._tmpAttriLvSum = 0;
			this._maxAttriLv = null;

			this.btn_lookup.on(Laya.Event.CLICK, this, this.lookup);
			this.btn_change.on(Laya.Event.CLICK, this, this.change);
			this.btn_pBaptize.on(Laya.Event.CLICK, this, this.baptize, [Artifact.PBAPTIZE]);
			this.btn_gBaptize.on(Laya.Event.CLICK, this, this.baptize, [Artifact.GBAPTIZE]);
			this.list_attri.renderHandler = Handler.create(this, this.onRender, null, false);
			tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.setCostText, this)
			tl3d.ModuleEventManager.addEvent(ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE, this.updateBaptize, this);

			this.updateView();
			//记录下打开面板时，临时属性是否有数据
			this._hasTempAttr = isEmptyObject(App.hero.artifactBaptizeTempAttr);
		}

		private _hasTempAttr: boolean;
		private _clickflag: boolean;
		private updateBaptizeTick: number;
		private updateBaptize($evt: ArtifactEvent) {
			if ($evt.data == Artifact.GBAPTIZE) {
				this._clickflag = false;
				let point = this.lab_nextforce.localToGlobal(new Laya.Point(0, 0));
            	let v3d = this.uiScenes.get3dPos(point.x-30- Launch.offsetX,point.y+80- Launch.offsetY);
				this.uiScenes.addEffect(this, 10000029, v3d, 4, 30, ($particle) => {
					this._clickflag = true;
				},0,0,true);
				// BaseSceneMgr.getInstance().showEffect(this, -1, 10000029, 220, -640, 4, 0, true, () => {
				// 	this._clickflag = true;
				// });
				clearTimeout(this.updateBaptizeTick);
				this.updateBaptizeTick = setTimeout(() => {
					if (this._hasTempAttr) {
						// this.updateAttr();
						this.updateView();
						this._hasTempAttr = false;
						return;
					}
					// this.baseUpdateAttr();
					this.updateView();
				}, 300);
			}else{
				this.updateView();
			}
		}

		private updateView(): void {
			let baptizeLv: number = App.hero.artifactBaptizeLv;
			this.lab_Lv.text = baptizeLv + LanMgr.getLan("", 10031);
			this.updateAttr();
			this.setCostText();
		}

		private updateAttr(): void {
			this.lab_isNull.visible = isEmptyObject(App.hero.artifactBaptizeTempAttr);
			this.baseUpdateAttr();
		}

		private baseUpdateAttr() {
			this.list_attri.dataSource = App.hero.artifactBaptizeAttrs ? [[], [], []] : null;

			let baptizeAttrs = App.hero.artifactBaptizeAttrs;
			//战力
			this._nextForce = 0;
			this._curForce = this.getTotalForce(baptizeAttrs);
			this.lab_force.text = LanMgr.getLan("", 10117,this._curForce);
			let vis = isEmptyObject(App.hero.artifactBaptizeTempAttr);
			this.lab_nextforce.visible = !vis;
			this.lab_arrow.visible = !vis;
			if (this.lab_nextforce.visible) {
				this._nextForce = this.getTotalForce(App.hero.artifactBaptizeTempAttr);

				this.lab_nextforce.text = LanMgr.getLan("", 10117,this._nextForce);
			}
			//箭头图标
			this.lab_arrow.text = this._curForce > this._nextForce ? " ↓" : this._curForce < this._nextForce ? " ↑" : "";
			this.lab_arrow.x = this.lab_nextforce.x + this.lab_nextforce.width / 2 + 5;
			this.lab_arrow.color = this._curForce > this._nextForce ? "#ff0000" : "#319c28";
		}

		private onRender(cell: ui.artifact.itemRender.BaptizeAttriRenderUI, index: number) {
			let model = ArtifactModel.getInstance();
			let idx = index + 1;
			let baptizeAttrs = App.hero.artifactBaptizeAttrs;
			let baptizeTempAttrs = App.hero.artifactBaptizeTempAttr;
			if (baptizeAttrs.hasOwnProperty(idx)) {
				cell.lab_curValue.text = baptizeAttrs[idx][2] >= 1 ? `+${baptizeAttrs[idx][2]}` : `+${baptizeAttrs[idx][2] * 100}%`;
				cell.lab_curAttri.text = LanMgr.GOD_RACE_NAME[baptizeAttrs[idx][3]] + LanMgr.attrName[baptizeAttrs[idx][0]];
				let quality = this._tbs.findIndex(vo => vo.isOnScope(baptizeAttrs[idx]));
				cell.lab_curValue.color = `#${this._qualityColors[quality]}`;
				this._attriLvSum += quality;
			} else {
				cell.lab_curValue.text = ``;
				cell.lab_curAttri.text = ``;
			}
			if (baptizeTempAttrs && baptizeTempAttrs.hasOwnProperty(idx)) {
				cell.lab_nextValue.text = baptizeTempAttrs[idx][2] >= 1 ? `+${baptizeTempAttrs[idx][2]}` : `+${baptizeTempAttrs[idx][2] * 100}%`;
				cell.lab_nextAttri.text = LanMgr.GOD_RACE_NAME[baptizeTempAttrs[idx][3]] + LanMgr.attrName[baptizeTempAttrs[idx][0]];
				let isMaxAttr = this._tbs[this._tbs.length - 1].isMaxAttr(baptizeTempAttrs[idx]);
				let quality = this._tbs.findIndex(vo => vo.isOnScope(baptizeTempAttrs[idx]));
				this.maxArrtiLv = { Lv: quality + 2, index: idx, isMaxAttr: ~~isMaxAttr };
				cell.lab_nextValue.color = `#${this._qualityColors[quality]}`;
				this._tmpAttriLvSum += quality;
			} else {
				cell.lab_nextValue.text = ``;
				cell.lab_nextAttri.text = ``;
			}

			if (!cell.img_false.hasListener(Laya.Event.CLICK)) cell.img_false.on(Laya.Event.CLICK, this, () => {
				let baptizeAttrs = App.hero.artifactBaptizeAttrs;
				if (this._suodingNum >= 2) {
					showToast(LanMgr.getLan('', 10238))
					return;
				} else if (!baptizeAttrs.hasOwnProperty(idx)) {
					showToast(LanMgr.getLan('', 10239))
					return;
				} else {
					this.setsuodingNum(true);
				}
				cell.img_false.visible = !cell.img_false.visible;
				cell.img_true.visible = !cell.img_false.visible;
			})
			if (!cell.img_true.hasListener(Laya.Event.CLICK)) cell.img_true.on(Laya.Event.CLICK, this, () => {
				if (this._suodingNum > 0) this.setsuodingNum(false);
				cell.img_true.visible = !cell.img_true.visible;
				cell.img_false.visible = !cell.img_true.visible
			})
			cell.lab_nextAttri.event(Laya.Event.RESIZE);
			cell.lab_curAttri.event(Laya.Event.RESIZE);


		}

		private setsuodingNum(type: boolean): void {
			if (type) this._suodingNum++;
			else this._suodingNum--
			if (this._suodingNum > 0) {
				let index = this._tbSet.lock_cost.findIndex(vo => vo[0] == this._suodingNum);
				if (index != -1) this.lab_suo.text = LanMgr.getLan("",12537,this._suodingNum,this._tbSet.lock_cost[index][2]);
			} else {
				this.lab_suo.text = LanMgr.getLan("",12536);
			}

		}

		private setCostText(): void {
			let pbaptizeNum = App.hero.getBagItemNum(this._tbSet.general_baptize[0][0]);
			let gbaptizeNum = App.hero.getBagItemNum(this._tbSet.rare_baptize[0][0]);
			this._ispBaptize = pbaptizeNum >= this._tbSet.general_baptize[0][1];
			this._isgBaptize = gbaptizeNum >= this._tbSet.rare_baptize[0][1];
			this.lab_pHas.color = this._ispBaptize ? ColorConst.normalFont : "#f62e08";
			this.lab_gHas.color = this._isgBaptize ? ColorConst.normalFont : "#f62e08";
			this.lab_pNeed.text = `/${this._tbSet.general_baptize[0][1]}`;
			this.lab_gNeed.text = `/${this._tbSet.rare_baptize[0][1]}`;
			this.lab_pHas.stroke = this._ispBaptize ? 0 : 2;
			this.lab_gHas.stroke = this._isgBaptize ? 0 : 2;
			this.lab_pHas.text = `${pbaptizeNum}`;
			this.lab_gHas.text = `${gbaptizeNum}`;
			this.lab_pHas.event(Laya.Event.RESIZE);
			this.lab_gHas.event(Laya.Event.RESIZE);
		}

		private set maxArrtiLv(data: any) {
			if (!this._maxAttriLv || data.Lv > this._maxAttriLv['Lv'])
				this._maxAttriLv = { Lv: data.Lv, index: data.index };
			if (!this._maxAttriLv['isMaxAttr']) this._maxAttriLv['isMaxAttr'] = 0;
			this._maxAttriLv['isMaxAttr'] += data.isMaxAttr;
		}

		public lookup(): void {
			UIMgr.showUI(UIConst.Artifact_BaptizeTip, this.dataSource);
		}

		public change(): void {
			if (!this._clickflag) {
				return;
			}
			if (isEmptyObject(App.hero.artifactBaptizeTempAttr)) {
				showToast(LanMgr.getLan(``, 10240));
				return;
			}
			if (this._nextForce < this._curForce) {
				common.AlertBox.showAlert({
					text: LanMgr.getLan(``,10241), confirmCb: () => {
						dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION), [this._curArtifactTemp.ID, Artifact.CHANGE]);
					}, parm: null
				});
				return;
			}
			dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION), [this._curArtifactTemp.ID, Artifact.CHANGE]);
		}

		public baptize(type: number): void {
			if (!this._clickflag) {
				return;
			}
			if (type == Artifact.PBAPTIZE && !this._ispBaptize) {
				showToast(LanMgr.getLan(``, Lans.cost, this._tbSet.general_baptize[0][0]))
				return;
			} else if (type == Artifact.GBAPTIZE && !this._isgBaptize) {
				showToast(LanMgr.getLan('', Lans.cost, this._tbSet.rare_baptize[0][0]))
				return;
			}
			if (this._nextForce > this._curForce) {
				let self = this;
				common.AlertBox.showAlert({
					text: LanMgr.getLan(``,10495), confirmCb: () => {
						self.onSurebaptize(type);
					}, parm: null
				});
				return;
			}
			this.onSurebaptize(type);
		}

		private onSurebaptize(type: number): void {
			let arr: Array<number> = [];
			type = type == Artifact.PBAPTIZE ? iface.tb_prop.baptizeTypeKey.normal : iface.tb_prop.baptizeTypeKey.advanced;
			this.list_attri.cells.forEach((vo: ui.artifact.itemRender.BaptizeAttriRenderUI, index: number) => { if (vo.img_true.visible) arr.push(index + 1) });

			if (arr.length > 0) {
				let index = this._tbSet.lock_cost.findIndex(vo => vo[0] == this._suodingNum);
				if (index != -1 && App.hero.diamond < this._tbSet.lock_cost[index][2]) {
					showToast(LanMgr.getLan('', 10005))
					return;
				}
			}

			if (!isEmptyObject(this._maxAttriLv) && !arr.some(vo => vo == this._maxAttriLv['index']) && this._maxAttriLv['Lv'] >= 5 && !ArtifactModel.getInstance().hint) {
				common.TishiView.showTishi({
					text: LanMgr.getLan(``,12538), confirmCb: (hint) => {
						this.startOperation();
						dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION), [{ id: this._curArtifactTemp.ID, type: type, hint: hint, lockFlag: arr }, Artifact.PBAPTIZE]);
					}, parm: null
				});
				return;
			}

			if (!ExtConfig.RELEASE && ExtConfig.LOG_LEVEL == 123) {
				if (!isEmptyObject(this._maxAttriLv) && this._maxAttriLv['isMaxAttr'] - this._suodingNum > 0 && this._maxAttriLv['Lv'] == 6) {
					this._maxAttriLv['isMaxAttr'] = 0
					return;
				} else {
					Laya.timer.frameOnce(5, this, this.baptize, [Artifact.GBAPTIZE]);
				}
			}

			this.startOperation();
			dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION), [{ id: this._curArtifactTemp.ID, type: type, lockFlag: arr }, Artifact.PBAPTIZE]);
		}

		private startOperation() {
			App.hero.artifactBaptizeTempAttr = {};
			this.lab_isNull.visible = false;
			this.baseUpdateAttr();
		}

		public close(): void {
			this._raceMap = null;
			this.pxilianRP.onDispose();
			this.gxilianRP.onDispose();
			this.btn_lookup.off(Laya.Event.CLICK, this, this.lookup);
			this.btn_change.off(Laya.Event.CLICK, this, this.change);
			this.btn_pBaptize.off(Laya.Event.CLICK, this, this.baptize);
			this.btn_gBaptize.off(Laya.Event.CLICK, this, this.baptize);
			if (this.list_attri.renderHandler) {
				this.list_attri.renderHandler.recover();
				this.list_attri.renderHandler = null;
			}
			tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.setCostText, this)
			tl3d.ModuleEventManager.removeEvent(ArtifactEvent.ARTIFACT_BAPTIZE_CHANGE, this.updateBaptize, this);
			clearTimeout(this.updateBaptizeTick);
			this.uiScenes.onExit();
		}
	}
}