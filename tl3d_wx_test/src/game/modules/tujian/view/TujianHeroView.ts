/**
* name 
*/
module game {
	export class TujianHeroView extends ui.tujian.TujianHeroUI {
		private uiScene: Base2dSceneLayer;

		/** 当前排序的英雄数组 */
		private _arrTotalGods: Array<TuJianGodTemp> = [];
		/** 当前英雄所在数组索引 */
		private _curGodsindex: number = 0;
		constructor() {
			super();
			this.isModelClose = true;
		}

		createChildren(): void {
			super.createChildren();
			this.uiScene = new Base2dSceneLayer();
			this.boxRole.addChild(this.uiScene);
			this.uiScene.setModelBox(this, this.lab_name, this.lbType);
			this.skillList.array = null;
			this.skillList.mouseHandler = new Handler(this, this.onSkillClick);
			this.skillBox.visible = false;
			this.skillBox.dataSource = null;

			this.ui_star.starAlign = common.GodStarInfo.STAR_ALIGN_LEFT;

			this.btn_peiyin.on(Laya.Event.CLICK, this, this.onClickPeiYin);
			this.btn_lihui.on(Laya.Event.CLICK, this, this.onClickLiHui);
			this.btnZiliao.on(Laya.Event.CLICK, this, this.onLookInfo);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.init();
		}
		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.init();
		}
		public close(type?: string, showEffect?: boolean, sound = true): void {
			super.close();
			this.uiScene.onExit();
			this._lastmodel = null;
			this.skillList.array = null;
			this.skillBox.visible = false;
			this.skillBox.dataSource = null;
			this._arrTotalGods = [];
			Laya.timer.clearAll(this);
			Laya.stage.off(Laya.Event.CLICK, this, this.onClickStage);
		}

		private init(): void {
			//监听
			this.btnPrev.on(Laya.Event.CLICK, this, this.onLeft);
			this.btnNext.on(Laya.Event.CLICK, this, this.onRight);
			this.btnClose.on(Laya.Event.CLICK, this, this.onFanHui);
			this.btnSkin.on(Laya.Event.CLICK, this, this.onSkin);
			Laya.stage.on(Laya.Event.CLICK, this, this.onClickStage);
			//模型界面开启
			this.uiScene.onShow();
			//3帧后更新
			this._curGodsindex = this.dataSource[0];	//图鉴数组计数
			this._arrTotalGods = this.dataSource[1];	//图鉴当前数组

			Laya.timer.frameOnce(3, this, this.updatedata, [this._curGodsindex, this._arrTotalGods]);
		}

		private onLookInfo(): void {
			let tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
			if (!tbGod) return;
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_EVALUATION_PANEL), tbGod);
		}

		//配音和立绘
		private onClickLiHui(): void {
			let tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
			if (!tbGod) return;
			if (tbGod && tbGod.paint != 0) UIMgr.showUI(UIConst.GodLiHuiView, tbGod);
		}

		private onClickPeiYin(): void {
			let tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
			if (tbGod) {
				this.playPySound(tbGod.ID, "", true);
				if (this.uiScene.sceneChar) {
					this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
				}
			}
		}

		//防止重复加载
		private _lastmodel: number;
		/**更新英雄详细界面数据 */
		public updatedata(index, array: TuJianGodTemp[]): void {
			this.skillBox.visible = false;
			this.skillBox.dataSource = null;

			this._curGodsindex = index;	//图鉴数组计数
			this._arrTotalGods = array;	//图鉴当前数组
			//获得当前所选择的神灵
			let tbGod: tb.TB_god = array[index].godTemp;
			if (!tbGod) return;
			this.btn_lihui.visible = tbGod.paint > 0
			this.lbDesc.text = "        " + tbGod.desc;
			this.imgRace.skin = SkinUtil.getGodBigRaceSkin(tbGod.race_type);
			let godLv: number = tb.TB_god_evolution.get_TB_god_evolutionById(array[index].starLv).level;
			this.lab_name.text = "Lv." + godLv + "  " + tbGod.name;
			this.lab_name.event(Laya.Event.RESIZE);

			this.lbType.text = LanMgr.godTypeName[tbGod.type];
			// 称谓及星级
			let star = array[index].starLv;
			this.ui_star.starLevel = star;
			this.ui_star.x = this.width / 2 - this.ui_star.getTotalStarWidth() / 2;
			let tempStararry = new Array;
			this.refreshModel(tbGod.model);
			this.btnPrev.gray = index == 0;
			this.btnNext.gray = index >= array.length - 1;
			this.playPySound(tbGod.ID);
			// 技能
			let ary: Array<tb.TB_skill> = tbGod.getAllSkill(star, star);
			let list: any[] = [];
			for (let i in ary) {
				if (ary[i].type != 1) {
					let openDgLv = tbGod.getSkillOpenDgLv(ary[i].ID) || 0;
					list.push({ skill: ary[i], godId: tbGod.ID, openDgLv, dgLv: 10, index: i })
				}
			}
			this.skillList.array = list;
			//居中
			this.skillList.y = 148 + (4 - this.skillList.array.length) * 109 / 2;
		}

		private onSkin(): void {
			let tbGod = this._arrTotalGods[this._curGodsindex].godTemp;
			if (tbGod) {
				UIMgr.getInstance().showUI(UIConst.GodSkinView, [tbGod]);
			}
		}

		/** 点击技能 */
		private onSkillClick(event: Laya.Event, index: number): void {
			if (event.type == Laya.Event.CLICK) {
				let iRender = this.skillList.getCell(index) as GodSkillItemIR;
				if (iRender && iRender.dataSource) {
					this.skillBox.dataSource = iRender.dataSource;
					this.skillBox.y = this.skillList.y + 48 + index * 96 + this.skillList.spaceY;
					this.skillBox.visible = true;
				} else {
					this.skillBox.dataSource = null;
					this.skillBox.visible = false;
				}
			} else if (event.type == Laya.Event.MOUSE_UP || event.type == Laya.Event.MOUSE_OUT) {
				// this.skillBox.dataSource = null;
				// this.skillBox.visible = false;
			}
		}

		private onClickStage(e: Laya.Event): void {
			if (e.target instanceof GodSkillItemIR) return;
			this.skillBox.dataSource = null;
			this.skillBox.visible = false;
		}

		/**
         * 刷新模型id
         * @param modeid 模型id
         */
		public refreshModel(modeid) {
			if (this._lastmodel == modeid) {
				return;
			}
			this.uiScene.addModelChar(modeid, 360, 710, 180, 3);
			this._lastmodel = modeid;
			this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
		}

		private _pyGodId: number = 0;
		private _pySoundUrl: string = "";
		private playPySound(godid: number, url: string = "", force: boolean = true): void {
			if (!force && this._pyGodId == godid) return;
			this.stopPySound();
			this._pyGodId = godid;
			let filetype: string = Laya.Render.isConchApp ? "ogg" : "mp3";
			url = LanMgr.getLan("sound/god_peiyin/{0}/voice_{1}_dub.{2}", -1, filetype, godid, filetype);
			this._pySoundUrl = !url || url == "" ? "sound/godpeiyin.mp3" : url;
			AudioMgr.playSound(this._pySoundUrl);
		}

		private stopPySound(godid: number = 0): void {
			if (godid == 0 || this._pyGodId == godid) {
				AudioMgr.StopSound(this._pySoundUrl);
				this._pyGodId = 0;
			}
		}


		/**评价 */
		private Showpingjia(): void {
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_EVALUATION_PANEL), this._arrTotalGods[this._curGodsindex].godTemp);
		}

		private onLeft(): void {
			if (this.btnPrev.gray) return;
			TujianModel.getInstance().index--;
			this.updatedata(TujianModel.getInstance().index, this._arrTotalGods);
		}

		private onRight(): void {
			if (this.btnNext.gray) return;
			TujianModel.getInstance().index++;
			this.updatedata(TujianModel.getInstance().index, this._arrTotalGods);
		}

		private onFanHui(): void {
			this.close();
		}

	}
}