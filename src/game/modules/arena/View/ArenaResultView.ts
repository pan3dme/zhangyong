/**
* name 
*/
module game {
	export class ArenaResultView extends ui.fight.GloryFightResultUI {

		private _again:boolean;
		constructor() {
			super();
			this.isModelClose = true;
			this.closeEffect = null;
			this.btnClose.on(Laya.Event.CLICK, this,this.close);
			this.btnReplay.on(Laya.Event.CLICK, this, this.onPlay);
		}

		public popup() {
			super.popup(false, false);
			this.initView();
		}

		public show() {
			super.show(false, false);
			this.initView();
		}

		initView(): void {
			this._again = false;
			let $sdata: EnterFightVo = this.dataSource;
			let copyvo: FightVo = $sdata.vo;
			let infoVo: IArenaReportVo = copyvo.copyType == CopyType.arenaMatch ? copyvo.arenaMatchVo : copyvo.arenaReportVo.arenaRecordVo;
			if (!infoVo) {
				logerror("result error");
				return;
			}
			this.bgPanel.showTitle(true, "zhandoubiaoxian/duizhanjieguo.png", true, true, true, null, this);
			let myInfo = App.hero;
			let isLeftWin = infoVo.isWin;
			this.lbName1.text = myInfo.name;
			this.clip_force1.visible = this.img_flag1.visible = this.img_flag11.visible = false;
			this.headBox1.dataSource = new UserHeadVo(myInfo.getHeadId(),myInfo.level,myInfo.headFrame);
			if (isLeftWin){
				this.bg1.skin = "zhandoubiaoxian/hongse.png";
				this.lbResult1.skin = "zhandoubiaoxian/sheng.png";
				this.bg1.scaleY = 1;
			} else {
				this.bg1.skin = "zhandoubiaoxian/lanse.png";
				this.lbResult1.skin = "zhandoubiaoxian/bai.png";
				this.bg1.scaleY = -1;
			}

			this.lbName2.text = infoVo.name;
			this.clip_force2.visible = this.img_flag2.visible = this.img_flag22.visible = false;
			this.headBox2.dataSource = new UserHeadVo(infoVo.head,infoVo.level,infoVo.headFrame);
			if (!isLeftWin){
				this.bg2.skin = "zhandoubiaoxian/hongse.png";
				this.lbResult2.skin = "zhandoubiaoxian/sheng.png";
				this.bg2.scaleY = -1;
			} else {
				this.bg2.skin = "zhandoubiaoxian/lanse.png";
				this.lbResult2.skin = "zhandoubiaoxian/bai.png";
				this.bg2.scaleY = 1;
			}
		}

		public onClosed(): void {
			super.onClosed();
		}

		public close() {
			if(!this._again)dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
			super.close();
			this.bgPanel.closeTitle();
		}

		private onPlay() {
			this._again = true;
			let ndata = this.copyData();
			this.close();
			// Laya.timer.frameOnce(3, this, () => {
			// 	dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), ndata);
			// });
			dispatchEvt(new FightsEvent(FightsEvent.REPLAY_GAME_EVENT), ndata);
		}

		private copyData(): EnterFightVo {
			// let sdata: EnterFightVo = this.dataSource;
			// let copyvo: FightVo = sdata.vo;
			// let nVo: FightVo = new FightVo;
			// nVo.copyType = copyvo.copyType;
			// nVo.arenaMatchVo = copyvo.arenaMatchVo;
			// nVo.arenaReportVo = copyvo.arenaReportVo;
			// nVo.fightPageControl = copyvo.fightPageControl.clonePage(nVo);
			// let data: EnterFightVo = { vo: nVo, event: sdata.event, eventdata:sdata.eventdata };
			// return data;

			let data: EnterFightVo = this.dataSource
			//��������ս����ȡָ��
			data.vo.fightPageControl.initState();
			return data;
		}
	}
}