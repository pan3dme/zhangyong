module game {
	export class Failure extends ui.fight.shibaiUI {


		constructor() {
			super();
			// this.isModelClose=true;
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
			this.closeEffect = null;
			this.btn_again.on(Laya.Event.CLICK, this, this.onPlay);
			this._tickFun = () => {
				this.timeTick();
			}
			this.channel.callback = this.channelCb.bind(this);
		}

		createChildren(): void {
			super.createChildren();

			this.bgPanel.bg.height = this.bgPanel.height - this.bgPanel.bg.y;
		}

		private channelCb(jump: boolean): void {
			if (jump && this.dataSource && this.dataSource.copyVo) {
				let enterVo: EnterFightVo = this.dataSource.copyVo;
				enterVo['flag'] = true;
			}
			this.close();
		}

		private timeTick() {
			this.time--;
			if (this.time <= 0) {
				this.close();
			}
			this.lab_time.text = String(this.time);
		}

		private _tickFun: Function;
		private time: number;
		public popup() {
			super.popup(false, false);
			this.bgPanel.showTitle(false, "zhandoubiaoxian/shibai.png", false, true, false, null, this);
			this.showbtn();
		}

		private _again:boolean;
		public onOpened() {
			super.onOpened();
			this._again = false;
			AudioMgr.setPlayRate(1);
			AudioMgr.playSound("sound/defeated.mp3");
		}


		private showbtn() {
			let copyvo: FightVo = this.dataSource.copyVo.vo
			this.lab_time.visible = this.lab_txt.visible = copyvo.copyType == iface.tb_prop.copyTypeKey.main;
			this.btn_again.visible = [CopyType.teamCopy,CopyType.jingji_npc, CopyType.yuanzhenCopy, CopyType.escort, CopyType.island, CopyType.guildFight].indexOf(copyvo.copyType) == -1;
			this.btn_close.x = !this.btn_again.visible ? 282 : 174;
			if (copyvo.copyType == iface.tb_prop.copyTypeKey.main) {
				this.time = 10;
				this.lab_time.text = String(this.time);
				this.timerLoop(1000, this, this._tickFun);
			} else if (copyvo.copyType == iface.tb_prop.copyTypeKey.rune) {
				//特殊处理。当大于某些关卡时，才显示下一关
				this.btn_again.visible = false;
				this.btn_close.x = 282;
				// if (copyvo.tab_copyinfo.ID <= tb.TB_copy_set.getCopySet().next_open) {
				// 	this.btn_again.visible = false;
				// 	this.btn_close.x = 282;
				// }
			}

			if (this.btn_again.visible) {
				this.btn_again.label = LanMgr.getLan("",12571);
			}
		}

		private copyData(): EnterFightVo {
			let data:EnterFightVo = this.dataSource.copyVo
			//重新生成一份战报
			data.vo.fightPageControl = data.vo.fightPageControl.clonePage(data.vo);
			return data;
		}

		private onPlay() {
			this._again = true;
			let ndata = this.copyData();
			let copyvo: FightVo = ndata.vo;

			// if (copyvo.copyType == CopyType.dailycopy) {
			// 	Laya.timer.frameOnce(3, this, () => {
			// 		dispatchEvt(new DailyEvent(DailyEvent.CHALLENGE_BOSS_AGAIN), copyvo.dailyCopyInfo);
			// 	});
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
					this.close();
				});
				return;
			}

			// Laya.timer.frameOnce(3, this, () => {
			// 	dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), ndata);
			// });
			dispatchEvt(new FightsEvent(FightsEvent.REPLAY_GAME_EVENT), ndata);

			this.close();
		}


		public onClosed() {
			super.onClosed();
		}

		public close(): void {
			if(!this._again)dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
			super.close();
			this.bgPanel.closeTitle();
			this.clearTimer(this, this._tickFun);

		}
	}
}