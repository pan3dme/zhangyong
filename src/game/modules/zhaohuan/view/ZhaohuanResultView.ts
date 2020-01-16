/**
* name 
*/
module game {
	export class ZhaohuanResultView extends ui.zhaohuan.ResultUI {
		_ui: UIMgr = UIMgr.getInstance();

		private uiScene: Base2dSceneLayer;
		private _particle: tl3d.CombineParticle;
		private _uiGodItem: ZhaohuanBoxIR[];
		constructor() {
			super();
			this.btn_leftpage.on(Laya.Event.CLICK, this, () => {
				// let num = this._curIdx - 1;
				// if (num < 0) num = this.box_ten.array.length - 1;
				// this.box_ten.selectedIndex = num;
			});
			this.btn_rightpage.on(Laya.Event.CLICK, this, () => {
				// let num = (this._curIdx + 1) % (this.box_ten.array.length);
				// this.box_ten.selectedIndex = num;
			});
			this.uiScene = new Base2dSceneLayer();
			this.addChildAt(this.uiScene, 1);
			this.uiScene.setModelBox(this, this.list_stars, this.lab_name);
			// this.box_ten.selectHandler = new Handler(this, this.onSelect);
			this.list_stars.renderHandler = new Handler(this, this.onRenderStar);
			// this.box_ten.selectEnable = true;
			// this.box_ten.selectedIndex = -1;
			this.btn_sure.on(Laya.Event.CLICK, this, this.close);
			this.btn_again.on(Laya.Event.CLICK, this, this.onAgain);
			this.img_tipbg.on(Laya.Event.CLICK, this, () => {
				if (this.lab_txt.visible) {
					this.close();
				}
			});
			this.img_tipbg.skin = SkinUtil.getSysMapSkin(ModuleConst.SUMMON,1);
			// this.ani_item.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);
			// this.ani_item2.on(Laya.UIEvent.COMPLETE, this, this.onAniComplete);
		}

		createChildren(): void {
			super.createChildren();
			this._uiGodItem = [];
			for (let i: number = 0; i < 10; i++) {
				this._uiGodItem[i] = this["ui_god_" + i];
				this._uiGodItem[i].visible = false;
			}
		}

		public popup() {
			this.uiScene.onExit();
			super.popup(false, false);
		}

		public show() {
			this.uiScene.onExit();
			super.show(false, false);
		}

		public onOpened() {
			super.onOpened();
			this.chk_jump.on(Laya.Event.CHANGE, this, this.onChkJump);
			this.initView();
			if (this._particle || ZhaohuanModel.getInstance().jumpAni) {
				// logyhj("存在特效");
				this.onEffComplete();
			} else {
				setTimeout(() => {
					// let pointX = Laya.stage.width >> 2;
					//加载抽卡动画
					this.uiScene.addEffect(this, 1000001, new tl3d.Vector3D(180, 0, -750), 3.5, 30, ($particle: tl3d.CombineParticle) => {
						this._particle = $particle;
						this._particle.addEventListener(tl3d.BaseEvent.COMPLETE, this.onEffComplete, this);
					}, 0, 0, false, 0.9);
				}, 200);
			}

			this.on(Laya.Event.CLICK, this, this.onClickHideModel);
		}

		/**初始化界面*/
		public initView(): void {
			this.uiScene.onShow();
			this.box_btn.visible = false;
			this.lab_txt.visible = false;
			// this.box_ten.visible = false;
			// this.box_ten.array = null;
			// this.box_ten.selectedIndex = -1;
			this.hideUiGodItem();
			this.clearCardModel();
			this.btn_rightpage.visible = this.btn_leftpage.visible = false;
			this.img_starbg.visible = false;
			this.list_stars.visible = false;
			this.box_box.visible = false;
			this.box_eff.visible = false;
			this.img_rewardbg.visible = this.img_reward.visible = false;
			this.chk_jump.selected = ZhaohuanModel.getInstance().jumpAni;
		}

		private removeEff() {
			if (this._particle) {
				this._particle.removeEventListener(tl3d.BaseEvent.COMPLETE, this.onEffComplete, this);
				this.uiScene.removeEffect(this._particle);
				this._particle = null;
			}
		}

		/**抽卡特效播放完毕 */
		private _isShowModel: boolean = false;
		private onEffComplete() {
			if (!this._particle && !ZhaohuanModel.getInstance().jumpAni) return;
			this.removeEff();
			AudioMgr.playSound("sound/zhaohuanSucc.mp3");

			this.box_eff.visible = true;
			//十连抽显示
			let dataary: Array<GodItemVo> = this.dataSource.godlist;
			if (ZhaohuanModel.getInstance().jumpAni) {
				for (let i: number = 0; i < dataary.length; i++) {
					this.showGodItem(i, dataary[i]);
				}
				if (dataary.length > 1) {
					this._uiGodItem[0].x = 160;
					this._uiGodItem[0].y = 100;
				} else {
					this._uiGodItem[0].x = 335;
					this._uiGodItem[0].y = 320;
				}
				this.endEff();
				return;
			}
			if (dataary.length > 1) { //10连抽
				dataary.sort(
					function (a: GodItemVo, b: GodItemVo): number {
						// if (b.tab_god.quality == a.tab_god.quality) {
						// 	return b.getStar() - a.getStar();
						// } else {
						// 	return b.tab_god.quality - a.tab_god.quality;
						// }
						let rand: number = Math.floor(Math.random() * 4) - 2;
						return rand;
					}
				);
				// var godVo = this.dataSource.godlist[0];
				// this._isShowModel = godVo.getStar() >= 4;

				this._isShowModel = false;
				this._uiGodItem[0].x = 160;
				this._uiGodItem[0].y = 100;
				if (!this._isShowModel) {
					for (let i: number = 0; i < this._uiGodItem.length; i++) {
						let card: ZhaohuanBoxIR = this._uiGodItem[i];
						this.addCardModel(card.x + this.box_eff.x - 2, card.y + this.box_eff.y + 106);
					}
				}
				this.uiScene.timespeed1 = 1.2;

				// this.btn_rightpage.visible = this.btn_leftpage.visible = true;
				// this.ani_item.visible = this.ani_item2.visible = false;
				this._totalnum = dataary.length;
				this._effnum = 0;
				this._effidx = 0;
				// this.box_btn.y = 900;
				Laya.timer.callLater(this, this.playEff);
			} else {
				// this.endEff();
				// // this.box_btn.y = 1018;
				// let godVo = this.dataSource.godlist[0];
				// this.drawListView(godVo.tab_god, godVo);
				this.uiScene.timespeed1 = 1.2;
				let card: ZhaohuanBoxIR = this._uiGodItem[0];
				card.x = 335;
				card.y = 320;
				this._isShowModel = false;
				this.addCardModel(card.x + this.box_eff.x - 2, card.y + this.box_eff.y + 106);
				this._totalnum = 1;
				this._effnum = 0;
				Laya.timer.callLater(this, this.playEff);
			}

		}

		private endEff() {
			if (this.dataSource.reward) {
				let reward = this.dataSource.reward[iface.tb_prop.resTypeKey.legendChip];
				if (reward) {
					this.img_reward.visible = this.img_rewardbg.visible = true;
					this.lab_rewardnum.text = "x " + reward;
					this.img_reward.y = this.img_rewardbg.y = this.box_eff.visible ? 220 : 350;
				}
			}
			this.uiScene.timespeed1 = 0;
			this._curIdx = 0;
			this.box_box.y = 0;
			if (!this.box_eff.visible) this.addModelEff();
			this.img_starbg.visible = true;
			this.setBtn();
		}

		//添加模型特效
		private _modelEff: any;
		private _hasModelEff: boolean = false;
		private addModelEff(): void {
			if (this._hasModelEff) return;
			this._hasModelEff = true;
			this.uiScene.addEffect(this, 1000005, new tl3d.Vector3D(180, 0, -630), 1.5, 30, ($particle) => {
				this._modelEff = $particle;
				if (!this._hasModelEff) {
					this.removeModelEff();
				}
			});
		}

		//移除模型特效
		private removeModelEff(): void {
			this._hasModelEff = false;
			if (this._modelEff) {
				this.uiScene.removeEffect(this._modelEff);
				this._modelEff = null;
			}
		}

		private playEff() {
			if (this._effnum >= this._totalnum && !this._isShowModel) {
				this.endEff();
				return;
			}

			// let fanpaiui = this.ani_item;
			// if (this._effnum % 2 == 1) {
			// 	fanpaiui = this.ani_item2;
			// }

			// if (fanpaiui.visible && fanpaiui.isPlaying) {
			// 	this.onAniComplete();
			// }
			var godVo = this.dataSource.godlist[this._effnum];
			if (this._isShowModel) {
				if (godVo.getStar() >= 4) {
					this.showModel(this._effnum);
				} else {
					this._effnum = 0;
					this._isShowModel = false;
					for (let i: number = 0; i < this._uiGodItem.length; i++) {
						let card: ZhaohuanBoxIR = this._uiGodItem[i];
						this.addCardModel(card.x + this.box_eff.x - 2, card.y + this.box_eff.y + 106);
					}
					this.playEff();
					return;
				}
				// fanpaiui.visible = false;

				// this.onAniComplete();
			} else {
				// fanpaiui.visible = true;
				// let cell = this.box_ten.getCell(this._effnum)
				// fanpaiui.x = this.box_ten.x + cell.x + 45;
				// fanpaiui.y = this.box_ten.y + cell.y + 47;


				// fanpaiui.play(0, false);
				this.playCardModelTurn(this._effnum);
				Laya.timer.once(240, this, (idx: number, godvoD: GodItemVo) => {
					this.showGodItem(idx, godvoD);
				}, [this._effnum, godVo]);

				clearTimeout(this._efftag);
				this._efftag = setTimeout(() => {
					this.playEff();
				}, 250);
			}

			this._effnum++;
		}

		private _effidx: number
		private _efftag: number;

		private _effnum: number;
		private _totalnum: number;
		private onAniComplete() {
			// let cell = this.box_ten.getCell(this._effidx);
			// cell.visible = true;
			// this._effidx++;
			// logyhj("this._effnum:", this._effnum, cell.visible);
		}

		private setBtn() {
			let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
			let obj = ZhaohuanModel.getInstance().curObj;
			if (obj.type != -1) {
				let has: number = 0;
				let need: number = 0;
				if (obj.type == ZHAOHUAN.GENERAL) {
					has = App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu);
					this.img_skin.skin = SkinUtil.putong;
					need = obj.isOne ? 1 : 10;
				}
				if (obj.type == ZHAOHUAN.FRIENDSHIP) {
					has = App.hero.friend;
					need = obj.isOne ? tab.friend_cost : (tab.friend_cost * 10);
					this.img_skin.skin = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.friend);
				}
				if (obj.type == ZHAOHUAN.DIAMOND) {
					let middlebooknum: number = App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu);
					let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
					let oneimgurl = SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond);
					has = App.hero.diamond;
					need = obj.isOne ? tab.zuanshi_once : tab.zuanshi_ten;
					if (obj.isOne) {
						if (middlebooknum >= tab.zuanshi_once_priority[1]) {
							has = middlebooknum;
							oneimgurl = SkinUtil.danchou;
							need = tab.zuanshi_once_priority[1];
						}
					} else {
						if (middlebooknum >= tab.zuanshi_ten_priority[1]) {
							has = middlebooknum;
							oneimgurl = SkinUtil.danchou;
							need = tab.zuanshi_ten_priority[1];
						}
					}
					this.img_skin.skin = oneimgurl;
				}
				if (obj.type == ZHAOHUAN.LEGEND) {
					this.img_skin.skin = SkinUtil.chuanshuo;
					has = App.hero.legendChip;
					need = tab.special_employ[1];
				}

				// this.box_cost.x = 402 - (12 * (has.length - 2 + need.length - 2)) / 2
				this.btn_again.label = obj.type == ZHAOHUAN.LEGEND ? LanMgr.getLan("",12106) : obj.isOne ? LanMgr.getLan("",12106) : LanMgr.getLan("",12107);
				this.lab_has.color = Number(has) >= Number(need) ? ColorConst.WHITE : "#f62e08";
				this.lab_has.stroke = Number(has) >= Number(need) ? 0 : 2;
				this.lab_has.text = Snums(Number(has));
				this.lab_need.text = " / " + need;
				this.lab_has.event(Laya.Event.RESIZE);
				this.box_btn.timerOnce(300, this, () => {
					this.box_btn.visible = true;
					dispatchEvt(new SummonEvent(SummonEvent.SHOW_BTN_VISIBLE_TRUE));
				})
			} else {
				this.lab_txt.timerOnce(1000, this, () => {
					this.lab_txt.visible = true;
					dispatchEvt(new SummonEvent(SummonEvent.SHOW_BTN_VISIBLE_TRUE));
				})
			}
		}

		/**再来一次 */
		private onAgain(): void {
			let obj = ZhaohuanModel.getInstance().curObj;
			let newGodNum = obj.isOne ? 1 : 10;
			if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= GodUtils.getGodsNum() + newGodNum) {
				let alertStr = LanMgr.getLan("",10226);
				common.AlertBox.showAlert({
					text: alertStr, confirmCb: () => {
						this.close();
						dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
					}
				});
				return;
			}
			dispatchEvt(new SummonEvent(SummonEvent.SEND_ZHAOHUAN), { isOne: obj.isOne, type: obj.type, again: 1 });
		}

		private _curIdx: number;

		private onSelect(index: number) {
			if (index == -1) return;
			this._curIdx = index;
			var godVo = this.dataSource.godlist[this._curIdx];
			let tabgod: tb.TB_god = godVo.tab_god;
			this.drawListView(tabgod, godVo);
		}

		//显示模型
		private showModel(index: number): void {
			this.box_eff.visible = false;
			var godVo = this.dataSource.godlist[index];
			let tabgod: tb.TB_god = godVo.tab_god;
			this.drawListView(tabgod, godVo);
			this.addModelEff();
		}

		private clearModel(): void {
			this.box_eff.visible = true;
			this.box_box.visible = false;
			this.uiScene.clearSceneChar();
			this.removeModelEff();

			Laya.timer.clearAll(this);
			Laya.Tween.clearAll(this);
		}

		private onClickHideModel(): void {
			if (this.box_box.visible) {
				this.clearModel();
				this.playEff();
			}
		}

		private drawListView(tabgod: tb.TB_god, godVo: GodItemVo) {
			this.lab_name.text = tabgod.name;
			// 星级
			let starNum = godVo.starLevel >= 6 ? godVo.starLevel - 5 : godVo.starLevel;
			let tempStararry = new Array;
			for (let i = 0; i < starNum; i++) {
				tempStararry[i] = godVo.starLevel >= 6;
			}
			this.list_stars.array = tempStararry;
			// this.list_stars.x = this.width/2 - (30 + tempStararry.length * 30 + this.list_stars.spaceX * (tempStararry.length - 1));
			this.list_stars.width = (30 + tempStararry.length * 30 + this.list_stars.spaceX * (tempStararry.length - 1));
			// 大于5星
			Laya.timer.clearAll(this);
			Laya.Tween.clearAll(this);
			this.list_stars.visible = false;
			if (godVo.starLevel >= 5) {
				Laya.timer.once(1000, this, () => {
					let cells = this.list_stars.cells;
					cells.forEach((cell: Laya.Sprite, index) => {
						cell.visible = false;
					});
					this.list_stars.visible = true;
					for (let i = 0; i < cells.length; i++) {
						Laya.timer.once(i * 200, this, (cell: Laya.Sprite, index: number) => {
							cell.scale(2, 2);
							cell.visible = true;
							Laya.Tween.to(cell, { scaleX: 1, scaleY: 1 }, 200);
						}, [cells[i], i]);
					}
				});
			} else {
				this.list_stars.visible = true;
			}

			//召唤光效
			this.setModel(tabgod.model);
			this.uiScene.sceneChar.alpha = 0;
			Laya.Tween.to(this.uiScene.sceneChar, { alpha: 1 }, 2000);
		}

		/**
		 * 设置模型
		 * @param model 模型id
		 */
		public setModel(model): void {
			this.box_box.visible = true;
			this.uiScene.addModelChar(model, 360, 900);
			this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_01, 2);
		}
		private onRenderStar(cell: Laya.Image, index: number): void {
			if (index > this.list_stars.array.length)
				return;
			cell.scale(1, 1);
			let data = this.list_stars.array[index];
			if (data) {
				cell.skin = SkinUtil.superXing;
			} else {
				cell.skin = SkinUtil.xingxing;
			}
		}

		public isCanClose(): boolean {
			return this.box_btn.visible || this.lab_txt.visible;
		}

		private showGodItem(index: number, godvo: GodItemVo): void {
			if (!this._uiGodItem) return;
			if (index < 0 || index >= this._uiGodItem.length) return;
			this._uiGodItem[index].dataSource = godvo;
			this._uiGodItem[index].visible = godvo != null;
		}

		private hideUiGodItem(): void {
			if (this._uiGodItem) {
				for (let i: number = 0; i < this._uiGodItem.length; i++) {
					let godui: ZhaohuanBoxIR = this._uiGodItem[i];
					if (godui) {
						godui.visible = false;
						godui.dataSource = null;
					}
				}
			}
		}

		/** 添加卡牌 */
		private _cardModels: GameUIChar[] = [];
		private addCardModel(postionx: number, postiony: number, rotate: number = 180, scale: number = 1.1) {
			let sceneChar: GameUIChar = new GameUIChar();
			this.uiScene.scene.addMovieDisplay(sceneChar);
			sceneChar.setRoleUrl(getRoleUrl(`100002`));
			sceneChar.play(tl3d.CharAction.STANAD);
			sceneChar.forceRotationY = rotate;
			sceneChar.set2dPos(postionx, postiony);
			sceneChar.scale = scale;
			this._cardModels.push(sceneChar);
		}

		private playCardModelTurn(index: number = -1): void {
			if (!this._cardModels || this._cardModels.length == 0) return;
			if (index < 0 || index >= this._cardModels.length) {

				//全部播放
				this._cardModels.forEach((card: GameUIChar, index) => {
					this.charPlaySkill(card, () => {
						this.uiScene.removeModelChar(card);
					});
				});
			} else {
				let card: GameUIChar = this._cardModels[index];
				this.charPlaySkill(card, () => {
					this.uiScene.removeModelChar(card);
				});
			}
		}

		private clearCardModel(): void {
			if (!this._cardModels || this._cardModels.length == 0) return;
			for (let i: number = 0; i < this._cardModels.length; i++) {
				let card: GameUIChar = this._cardModels[i];
				this.uiScene.removeModelChar(card);
			}
			this._cardModels = [];
		}

		private _guajiskill: tl3d.Skill
		public charPlaySkill($char: GameUIChar, $cb: Function = null): tl3d.Skill {
			this._guajiskill = this.uiScene.scene.skillMgr.getSkill(getSkillUrl(`100002`), `skill_01`, () => {
				this.charPlaySkill($char, $cb);
			});
			if (!this._guajiskill.keyAry) {
				return;
			}
			if (this._guajiskill) {
				this._guajiskill.reset();
				this._guajiskill.isDeath = false;
			}

			if (!$char || !$char.onStage) {
				return;
			}
			this._guajiskill.configFixEffect($char, $cb);
			this._guajiskill.needShock = false;
			this.uiScene.scene.skillMgr.playSkill(this._guajiskill)
		}

		//跳过动画
		private onChkJump(): void {
			ZhaohuanModel.getInstance().jumpAni = this.chk_jump.selected;
		}

		public close(): void {
			super.close("", false);
			Laya.timer.clearAll(this);
			Laya.Tween.clearAll(this);
			this.chk_jump.off(Laya.Event.CHANGE, this, this.onChkJump);
			var scenechar = this.uiScene.sceneChar;
			if (scenechar) {
				if (scenechar.alpha < 1)
					scenechar.alpha = 1;
				Laya.Tween.clearTween(scenechar);
			}
			this.removeEff();
			this.uiScene.onExit();
		}
		public onClosed(type?: string): void {
			super.onClosed(type);
			this.box_btn.visible = false;
			this.lab_txt.visible = false;
			this.off(Laya.Event.CLICK, this, this.onClickHideModel);
			this.clearModel();
			this.removeModelEff();
			clearTimeout(this._efftag);
			this.clearCardModel();
			// this.ani_item.stop();
			// this.ani_item2.stop();
			// this.box_ten.array = null;
			// this.box_ten.selectedIndex = -1;
		}
	}
}