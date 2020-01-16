/**
* name 
*/
module game {
	export class GloryFightResultView extends ui.fight.GloryFightResultUI {

		// private _isOpen:boolean;
		constructor() {
			super();
			this.isModelClose = true;
			this.closeEffect = null;
			this.btnClose.on(Laya.Event.CLICK, this,this.close);
			this.btnReplay.on(Laya.Event.CLICK, this, this.onPlay);
		}

		private _again:boolean;
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
			// this._isOpen = true;
			// if (this.dataSource) {
			// 	if (this.dataSource.type == playState.VICTORY) {
			// 		AudioManager.playSound("sound/victory.mp3");
			// 	} else {
			// 		AudioManager.playSound("sound/defeated.mp3");
			// 	}
			// }
			let $sdata: EnterFightVo = this.dataSource;
			let copyvo: FightVo = $sdata.vo;
			let infoVo: MatchGroupVo = copyvo.copyType == CopyType.glory ? copyvo.gloryMatchVo : null;
			if (!infoVo) {
				logerror("result error");
				return;
			}
			// AudioMgr.playSound("sound/victory.mp3");
			this.bgPanel.showTitle(true,"zhandoubiaoxian/duizhanjieguo.png", true, true, true, null, this);
			let isLeftWin = infoVo.isLeftWin();
			this.lbName1.text = infoVo.lUser.name;
			this.clip_force1.dataSource = infoVo.lUser.force;
			this.clip_force1.value = String(infoVo.lUser.force);
			this.headBox1.dataSource = infoVo.lUser.headVo;
			if (isLeftWin){
				this.bg1.skin = "zhandoubiaoxian/hongse.png";
				this.lbResult1.skin = "zhandoubiaoxian/sheng.png";
				this.bg1.scaleY = 1;
			}else{
				this.bg1.skin = "zhandoubiaoxian/lanse.png";
				this.lbResult1.skin = "zhandoubiaoxian/bai.png";
				this.bg1.scaleY = -1;
			}

			this.lbName2.text = infoVo.rUser.name;
			this.clip_force2.dataSource = infoVo.rUser.force;
			this.clip_force2.value = String(infoVo.rUser.force);
			this.headBox2.dataSource = infoVo.rUser.headVo;
			if (!isLeftWin){
				this.bg2.skin = "zhandoubiaoxian/hongse.png";
				this.lbResult2.skin = "zhandoubiaoxian/sheng.png";
				this.bg2.scaleY = -1;
			}else{
				this.bg2.skin = "zhandoubiaoxian/lanse.png";
				this.lbResult2.skin = "zhandoubiaoxian/bai.png";
				this.bg2.scaleY = 1;
			}
		}

		public onClosed(): void {
			super.onClosed();
		}

		public close(){
			if (!this._again)
				dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
			super.close();
			this.bgPanel.closeTitle();
		}

		private onPlay() {
			this._again = true;
			// this._isOpen = false;
			let ndata: EnterFightVo = this.copyData();
			this.close();
			dispatchEvt(new FightsEvent(FightsEvent.REPLAY_GAME_EVENT), ndata);
		}

		private copyData(): EnterFightVo {
			let data:EnterFightVo = this.dataSource
			//重新设置战报读取指针
			data.vo.fightPageControl.initState();
			return data;
		}
	}
}