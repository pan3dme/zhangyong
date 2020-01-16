module game {
	export class VictoryView extends ui.fight.shengliUI {

		constructor() {
			super();
			this.closeEffect = null;
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
			this.btn_again.on(Laya.Event.CLICK, this, this.onPlay);
			this.list_item.array = [];
			this.listVo = new ListVo(this.list_item);
			this.listVo.setPosition(this.list_item.x + Launch.offsetX, 500 + Launch.offsetY);
		}

		public again: boolean;
		private time: number;
		listVo: ListVo;
		ary: Array<inface.IItemData> = new Array;
		public popup() {
			// this._isOpen = true;
			this.box_content.visible = false;
			this.bgPanel.showTitle(true, "zhandoubiaoxian/shengli.png", true, true, true, Handler.create(this, this.showTitleComplete));
			let copyvo: FightVo = this.dataSource.copyVo.vo;
			let $sdata = this.dataSource.vo;
			if (copyvo.copyType == CopyType.teamCopy) {
				if ($sdata && $sdata.extReward)
					this.ary = $sdata.extReward;
			} else {
				if ($sdata && $sdata.commonData)
					UIUtil.getRewardItemVoList(this.ary, $sdata.commonData);
				if ($sdata && $sdata.firstData)
					UIUtil.getRewardItemVoList(this.ary, $sdata.firstData, true);
			}


			let hasAward = this.ary.length > 0;
			this.box_title.visible = this.imgXian.visible = hasAward;
			this.lab_empty.visible = !this.box_title.visible;
			if (hasAward) {
				this.btn_close.y = this.btn_again.y = 366
				this.height = 500;
			} else {
				this.btn_close.y = this.btn_again.y = 196
				this.height = 330;
			}
			this.showbtn(hasAward);
			this.listVo._dataSource = this.list_item.array = this.ary;
			this.list_item.AutoLayout(this.width);
			this.listVo.setHeight(200);
			this.listVo.setPosition(this.list_item.x + (Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2 + this.list_item.y);
			this.listVo._height = this.list_item.height;
			// this._efflist = common.EffectList.showEffectList(this.listVo);
			// this._onceAgain = false;
			this.mouseEnabled = true;
			this.chk_next.on(Laya.Event.CHANGE, this, this.onChkChange);

			super.popup(false, false);
		}

		private showTitleComplete(): void {
			this.box_content.visible = true;
			this._efflist = common.EffectList.showEffectList(this.listVo);
		}

		public onOpened() {
			super.onOpened();
			this.again = false;
			AudioMgr.setPlayRate(1);
			AudioMgr.playSound("sound/victory.mp3");
		}

		private showbtn(hasAward: boolean = false) {
			let copyvo: FightVo = this.dataSource.copyVo.vo;
			this.lab_time.visible = this.lab_txt.visible = copyvo.copyType == iface.tb_prop.copyTypeKey.main;
			let showAgain = [CopyType.teamCopy, iface.tb_prop.copyTypeKey.main, CopyType.jingji_npc, CopyType.qiecuo, CopyType.escort, CopyType.island, CopyType.guildFight].indexOf(copyvo.copyType) == -1;
			this.btn_close.x = !showAgain ? 282 : 174;
			this.btn_again.visible = showAgain;
			this.btn_again.gray = false;
			this.lbDesc.text = "";
			this.chk_next.visible = false;
			switch (copyvo.copyType) {
				case iface.tb_prop.copyTypeKey.rune:
					this.btn_close.x = 282;
					this.btn_again.visible = false;
					break;
				case iface.tb_prop.copyTypeKey.underground:
					this.btn_again.label = LanMgr.getLan("",12571);
					break;
				case CopyType.dailycopy:
					this.btn_close.x = 282;
					this.btn_again.visible = false;
					break;
				case iface.tb_prop.copyTypeKey.tower:
					let tab = tb.TB_copy_info.get_TB_copy_infoById(copyvo.tab_copyinfo.next);
					this.btn_again.label = LanMgr.getLan("",12572);
					if (copyvo.tab_copyinfo.area_number % 10 == 0) {
						this.btn_close.x = 282;
						this.btn_again.visible = false;
					} else
						this.dataSource.copyVo.vo.tab_copyinfo = tab;
					break;
				case CopyType.island:
					this.lbDesc.text = hasAward ? copyvo.islandOreInfo.getFightDesc() : "";
					break;
				case CopyType.fogForest:
					//判断是否是最后一关
					if (copyvo.forestGuanqia.isLast()) {
						this.btn_close.x = 282;
						this.btn_again.visible = false;
					} else {
						copyvo.forestGuanqia = new ForestGuanqiaVo(tb.TB_forest.getItemById(copyvo.forestGuanqia.tbForest.ID + 1));
						if (App.hero.force >= copyvo.forestGuanqia.tbForest.need_power) {
							this.chk_next.visible = true;
							this.chk_next.selected = FogForestModel.getInstance().autoNext;
							this.onChkChange();
						}
						this.btn_again.label = LanMgr.getLan("",12572);
					}
					break;
				case CopyType.teamCopy:
					this.lbDesc.text = (this.dataSource.vo && !this.dataSource.vo.commonData && this.dataSource.vo.extReward) ? LanMgr.getLan('', 10202):"";
					break;
				case CopyType.yuanzhenCopy:
					if (YuanzhengModel.getInstance().isAllFinish()) {
						this.btn_close.x = 282;
						this.btn_again.visible = false;
					} else {
						this.btn_again.visible = true;
						this.btn_again.label = LanMgr.getLan("",12572);
					}
					break;
				default:
					this.lbDesc.text = "";
					this.btn_again.label = LanMgr.getLan("",12572);
					break;
			}

			let hh: number = 500;
			if (!this.lab_time.visible && !this.chk_next.visible && !this.lab_txt.visible) {
				hh = this.btn_again.y + this.btn_again.height + 30;
			} else {
				hh = this.chk_next.y + this.chk_next.height + 20;
			}
			this.height = this.bgPanel.height = hh;
			this.bgPanel.bg.height = hh - this.bgPanel.bg.y;
		}

		private _nextcd: number = 0;
		public onChkChange(): void {
			FogForestModel.getInstance().autoNext = this.chk_next.selected;
			if (this.chk_next.selected) {
				this._nextcd = FogForestModel.AUTO_NEXXT_CD;
				Laya.timer.loop(1000, this, this.updateNextCD, [1]);
				this.updateNextCD();
			} else {
				Laya.timer.clear(this, this.updateNextCD);
				this.chk_next.label = LanMgr.getLan("",12573);
			}
		}

		private updateNextCD(time: number = 0): void {
			this._nextcd -= time;
			this.chk_next.label = LanMgr.getLan("", 12574, this._nextcd);
			if (this._nextcd <= 0) {
				this.startPlay();
			}
		}

		private qianzhi($nextId: number): boolean {
			let flag: boolean = true;
			let nexttab = tb.TB_copy_info.get_TB_copy_infoById($nextId);
			let openvo = copymodule.CopyUtils.copyOpen(nexttab.precondition, GuajiModel.getInstance().getMaxLev());
			return openvo.isopen;
		}

		private copyData(): EnterFightVo {
			let data: EnterFightVo = this.dataSource.copyVo
			//重新生成一份战报
			data.vo.fightPageControl = data.vo.fightPageControl.clonePage(data.vo);
			return data;
		}

		private isOpen() {
			let copyvo: FightVo = this.dataSource.copyVo.vo;
			switch (copyvo.copyType) {
				case iface.tb_prop.copyTypeKey.rune:
				case iface.tb_prop.copyTypeKey.tower:
					let maxLev = copyvo.copyType == iface.tb_prop.copyTypeKey.tower ? TowerModel.getInstance().getMaxCopyId() : GuajiModel.getInstance().getMaxLev();
					let openVo = copymodule.CopyUtils.copyOpen(copyvo.tab_copyinfo.precondition, maxLev);
					if (!openVo.isopen) {
						showToast(openVo.info);
					}
					return openVo.isopen;
				case CopyType.fogForest:
					let isopen = copyvo.forestGuanqia.tbForest.need_power <= App.hero.force;
					if (!isopen) {
						showToast(LanMgr.getLan("", 11004, copyvo.forestGuanqia.tbForest.need_power));
					}
					return isopen;
			}
		}

		// private _onceAgain: boolean;
		private onPlay() {
			if (this.btn_again.gray) {
				showToast(LanMgr.getLan('', 10046));
				return;
			}

			let copyvo: FightVo = this.dataSource.copyVo.vo;
			if (copyvo.copyType == CopyType.yuanzhenCopy) {
				// 下一关：弹出布阵界面
				PLC.request(Protocol.game_expedition_getChallengerInfo, null, ($data) => {
					if (!$data) return;
					YuanzhengModel.getInstance().updateData($data.challengerInfo);
					dispatchEvt(new GodEvent(GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.expedition);
				});
				return;
			}

			if (this.btn_again.label == LanMgr.getLan("",12572)) {
				//开放判断
				if (this.isOpen()) {
					this.startPlay();
				}
			} else {
				this.startPlay();
			}
		}

		private startPlay() {
			this.again = true;
			let ndata = this.copyData();
			let copyvo: FightVo = ndata.vo;
			// this._onceAgain = true;

			this.close();
			//每日副本没有再来一次，如果需要，则要判断完进入条件后，满足条件，再跳转
			// if (copyvo.copyType == CopyType.dailycopy) {
			// 	// Laya.timer.frameOnce(3, this, () => {
			// 		dispatchEvt(new DailyEvent(DailyEvent.CHALLENGE_BOSS_AGAIN), copyvo.dailyCopyInfo);
			// 	// });
			// 	return;
			// }

			if (copyvo.copyType == iface.tb_prop.copyTypeKey.tower) {
				let playid: number = copyvo.tab_copyinfo.ID;
				let ptl = Protocol.game_copy_settleTowerCopy;
				let arg = {};
				arg[ptl.args.copyId] = playid;
				arg[ptl.args.isWin] = copyvo.fightPageControl.result == playState.VICTORY;
				PLC.request(ptl, arg, ($data, $msg: string) => {
					if (!$data) return;
					ndata.vo.resultData = $data;
					dispatchEvt(new FightsEvent(FightsEvent.REPLAY_GAME_EVENT), ndata);
				});
				return;
			}

			// Laya.timer.frameOnce(3, this, () => {
			// 	dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), ndata);
			// });
			dispatchEvt(new FightsEvent(FightsEvent.REPLAY_GAME_EVENT), ndata);
		}

		private _efflist: common.EffectList;
		public close(): void {
			if (!this.again)
				dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);

			super.close();
			this.bgPanel.closeTitle();
			Laya.timer.clear(this, this.updateNextCD);
			if (this._efflist) {
				this._efflist.stratEndAction();
				this._efflist = null;
			}
			this.list_item.array = null;
			if (this.listVo._dataSource) {
				this.listVo._dataSource.length = 0;
			}
			this.chk_next.off(Laya.Event.CHANGE, this, this.onChkChange);


		}

		public onClosed() {
			super.onClosed();
		}
	}
}