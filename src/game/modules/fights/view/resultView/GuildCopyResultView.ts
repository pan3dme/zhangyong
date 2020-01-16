/**
* name 
*/
module game {
	export class GuildCopyResultView extends ui.fight.FightGuildCopyResultUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.closeEffect = null;
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
		}
		private _again: boolean;
		public popup() {
			super.popup(false, false);
			this.initView();
			/** 判断是否弹出防沉迷验证 */
			//sendDispatchEvent(new moduleindulge.IndulgeEvent(moduleindulge.IndulgeEvent.SHOW_FANG_PANEL), moduleindulge.IndulgeType.tishi_YanZheng);
		}

		initView(): void {
			this._again = false;
			if (this.dataSource) {
				AudioMgr.setPlayRate(1);
				if (this.dataSource.type == playState.VICTORY || this.dataSource.copyVo.vo.copyType == CopyType.worldboss) {
					AudioMgr.playSound("sound/victory.mp3");
				} else {
					AudioMgr.playSound("sound/defeated.mp3");
				}
			}
			this.bgPanel.showTitle(true, "zhandoubiaoxian/huodejianli.png", true, true, true, Handler.create(this, this.showTitleComplete), this);
			let $sdata = this.dataSource;
			let copyvo: FightVo = $sdata.copyVo.vo;
			let infoVo: GuildChallengeVo | BossInfoVo;
			if (copyvo.copyType == CopyType.guildCopy) {
				infoVo = copyvo.guildGuanqiaVo;
			} else if (copyvo.copyType == CopyType.worldboss) {
				infoVo = copyvo.worldBossInfo;
			}
			this.lbRank.text = LanMgr.getLan('', 10029, infoVo.getRank());
			this.lbDamage.text = LanMgr.getLan('', 10086, infoVo.getCurDamage());
			this.lbTotalDamage.text = LanMgr.getLan('', 10087, infoVo.getTotalDamage());

			let ary: Array<ItemVo> = new Array;
			if (infoVo.battleEndData.commonData)
				UIUtil.getRewardItemVoList(ary, infoVo.battleEndData.commonData);
			if (infoVo.battleEndData.firstData)
				UIUtil.getRewardItemVoList(ary, infoVo.battleEndData.firstData, true);
			this._listVo = new ListVo(this.rewardList);
			let listY = ((Laya.stage.height - this.height) >> 1) + this.rewardList.y;
			this.rewardList.AutoLayout(this.width, ary);
            this._listVo.setHeight(100);
			this._listVo.setPosition(this.rewardList.x + Launch.offsetX, listY);
			this._listVo._dataSource = ary;

			this.btn_again.on(Laya.Event.CLICK, this, this.onClickAgain);

			this.btn_again.visible = false;
			switch (copyvo.copyType) {
				case CopyType.guildCopy://公会副本
					this.btn_close.x = 290;
					break;
				case CopyType.worldboss://世界boss
					this.btn_close.x = 172;
					this.btn_again.visible = true;
					break;
			}
		}

		private _listVo: ListVo;
		private showTitleComplete(): void {
			this._efflist = common.EffectList.showEffectList(this._listVo);
		}

		private _efflist: common.EffectList;

		public close() {
			if (!this._again)
				dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
			super.close();

			if (this._efflist)  {
				this._efflist.stratEndAction();
				this._efflist = null;
			}
		}

		private onClickAgain(): void {
			// this._again = false;
			let copyvo: FightVo = this.dataSource.copyVo.vo;
			let infoVo: BossInfoVo = copyvo.worldBossInfo;

			let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
			let maxCnt = tb.TB_boss_set.getSet().max_time;
			if (count < 1) {
				showToast(LanMgr.getLan(``,10105));
				dispatchEvt(new game.BossEvent(game.BossEvent.SHOW_BUY_VIEW));
				return;
			}
			this.close();
			dispatchEvt(new game.BossEvent(game.BossEvent.CHALLENGE_BOSS, infoVo));
		}

		public onClosed(): void {
			super.onClosed();
			this.bgPanel.closeTitle();
			this.btn_again.off(Laya.Event.CLICK, this, this.onClickAgain);
			this.rewardList.array = null;
		}
	}
}