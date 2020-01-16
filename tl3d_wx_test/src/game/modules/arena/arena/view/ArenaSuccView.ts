/**
* name 
*/
module game {
	export class ArenaSuccView extends ui.arena.arena.ArenaSuccUI {
		private uiScene: Base2dSceneLayer;
		private _cards: GameUIChar[] = [];
		constructor() {
			super();
			this.itemList.array = [[], [], []];
			this.itemList.zOrder = this._childs.length - 1;
			this.uiScene = new Base2dSceneLayer();
			this.uiScene.setPosition(137, 803);
			this.box_content.addChild(this.uiScene);
		}

		popup(): void {
			this.initView();
			super.popup(false, false);

		}

		private initView(): void {
			AudioMgr.playSound("sound/victory.mp3");
			this.itemList.selectHandler = new Handler(this, this.onSelect);
			let data: ArenaReportVo = this.dataSource.eventdata;
			this.rewardList.array = data.getRewards();
			if (isEmptyObject(data.addResource)) {
				this.itemList.visible = this.lbbox.visible = this.box_chou.visible = this.box_reward.visible = false;
				this.setModelClose(true);
				this.uiScene.onExit();
				this.setLayout(false);
			} else {
				this.itemList.visible = this.lbbox.visible = this.box_chou.visible = this.box_reward.visible = true;
				this.setModelClose(false);
				this.addChildModel();
				this.setLayout(true);
			}
			this.bgPanel.showTitle(true, data.type != ArenaBattleType.SWEEP ? "zhandoubiaoxian/shengli.png" : "comp/title/saodangchenggong.png", true, true, true, new Handler(this,()=>{
				this.setModelClose(false);
			}), this);

			this.lab_rank_title.visible = this.lbrank.visible = data.type != ArenaBattleType.SWEEP;
			this.lbup.text = `(${data.chgRank}`;
			this.lbrank.text = `${data.rank}`;

			this.lbrank.event(Laya.Event.RESIZE);
			this.lbup.event(Laya.Event.RESIZE);
			this.hbox.event(Laya.Event.RESIZE);
			this.lbup.visible = this.imgchg.visible = this.lbright.visible = data.chgRank != 0;
		}

		private onSelect(index: number): void {
			this.lbbox.visible = false;
			this.itemList.selectHandler = null;
			dispatchEvt(new ArenaEvent(ArenaEvent.TURN_OVER_CAED), index + 1);
		}

		/**设置奖品数据 */
		setItemListCells(infos: any): void {
			let cells = this.itemList.cells;
			cells.forEach((cell: ArenaBrandIR, index) => {
				let key = index + 1;
				// cell.setChildData(infos[key],key);
				cell.setVis(false);
			});

			this._cards.forEach((card: GameUIChar, index) => {
				let itemKey = index + 1;
				this.charPlaySkill(card, () => {
					card.play(tl3d.CharAction.WALK, 1, false);
				});

				this.timer.once(500,this,()=>{
					cells[index].setChildData(infos[itemKey], itemKey);
				});
			});

			Laya.timer.frameOnce(31, this, () => { this.setModelClose(true); });
		}

		/**设置某个奖品数据 */
		setItemListCellById(index: number): void {
			let cells = this.itemList.cells;
			let cell: ArenaBrandIR = cells.find((itemIr: ArenaBrandIR) => {
				return itemIr.getIndex() == index;
			});
			if (cell) {
				cell.setBuyNodeVisible(false);
			}
		}

		/**设置空白区域关闭 */
		private setModelClose(bool: boolean): void {
			this.isModelClose = this.lbclose.visible = bool;
		}

		private addChildModel(): void {
			this.uiScene.onExit();
			this.itemList.array.forEach((data: any, index: number) => {
				let cell = this.itemList.getCell(index) as ArenaBrandIR;
				cell.box.visible = false;
				this.addModelChar(`100002`, cell.x, 0);
			})
		}

		/** 添加ui角色 */
		private addModelChar(mid: string, postionx: number, postiony: number, rotate: number = 180, scale: number = 1.1) {
			let sceneChar: GameUIChar = new GameUIChar();
			this.uiScene.scene.addMovieDisplay(sceneChar);
			sceneChar.setRoleUrl(getRoleUrl(mid));
			sceneChar.play(tl3d.CharAction.STANAD);
			sceneChar.forceRotationY = rotate;
			sceneChar.set2dPos(postionx, postiony);
			sceneChar.scale = scale;
			this._cards.push(sceneChar);
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

		private setLayout(hasReward: boolean): void {
			if (hasReward) {
				this.lab_rank_title.y = this.hbox.y = 76;
				this.bgPanel.height = 610;
			} else {
				this.bgPanel.height = 200;
				this.lab_rank_title.y = this.hbox.y = 100;
			}
			this.height = this.bgPanel.height;
		}

		close(): void {
			if(!this.isModelClose){
				showToast(LanMgr.getLan(``, 10237))
				return;
			}
			super.close();
			this.bgPanel.closeTitle();
			this._cards = [];
			this.uiScene.onExit();
			this.lbbox.visible = true;
			this.itemList.selectedIndex = -1;
			this.itemList.cells.forEach((cell: ArenaBrandIR, index: number) => {
				cell.box.visible = false;
			})
			dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
		}
	}
}