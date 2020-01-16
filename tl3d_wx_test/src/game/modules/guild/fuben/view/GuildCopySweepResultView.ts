/**
* name 
*/
module game {
	export class GuildCopySweepResultView extends ui.guild.copy.GuildCopySweepResultUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.closeEffect = null;
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
		}

		// private _again:boolean;
		public popup() {
			super.popup(false, false);
			this.initView();
		}

		initView(): void {
			// this._again = false;
			this.bgPanel.showTitle(true, "comp/title/saodangchenggong.png", true, true, true, Handler.create(this, this.showTitleComplete), this);
			AudioMgr.playSound("sound/victory.mp3");

			let copyvo: GuildChallengeVo = this.dataSource;
			let serverData: any = copyvo.battleEndData;

			this.lbRank.text = LanMgr.getLan('', 10029, copyvo.getRank());
			this.lbDamage.text = LanMgr.getLan('', 10086, copyvo.getCurDamage());
			this.lbTotalDamage.text = LanMgr.getLan('', 10087, copyvo.getTotalDamage());

			this.updateCount();
			let ary: Array<ItemVo> = new Array;
			if (serverData.commonData)
				UIUtil.getRewardItemVoList(ary, serverData.commonData);
			if (serverData.firstData)
				UIUtil.getRewardItemVoList(ary, serverData.firstData, true);
			this._listVo = new ListVo(this.rewardList);
			let listY = ((Laya.stage.height - this.height) >> 1) + this.rewardList.y;
			this.rewardList.AutoLayout(this.width, ary);
			this._listVo.setHeight(100);
			this._listVo.setPosition(this.rewardList.x + Launch.offsetX, listY);
			this._listVo._dataSource = ary;

			this.btn_again.visible = this.lab_count.visible = copyvo.getMonstersBlood() > copyvo.getTotalDamage();
			this.btn_close.x = this.btn_again.visible ? 172 : (this.width - this.btn_close.width) / 2;

			this.btn_again.on(Laya.Event.CLICK, this, this.onClickAgain);
		}

		public updateCount(): void {
			this.lab_count.text = LanMgr.getLan('', 10081, App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum));
		}

		private _listVo: ListVo;
		private showTitleComplete(): void {
			if (this._efflist)  {
				this._efflist.stratEndAction();
				this._efflist = null;
			}
			this._efflist = common.EffectList.showEffectList(this._listVo);
		}

		private _efflist;

		public close() {
			if (this.dataSource) {
				dispatchEvt(new FightsEvent(FightsEvent.EXIT_FIGHT_EVENT), this.dataSource.copyVo);
			}
			super.close();
		}

		private onClickAgain(): void {
			// this._again = true;
			if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) <= 0) {
				let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
				if (num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)) {
					showToast(LanMgr.getLan('', 10084));
					return;
				} else {
					dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_CHALLENGE_NUM_BUY));
					return;
				}
			}
			// this.close();
			dispatchEvt(new GuildEvent(GuildEvent.GUILD_COPY_SWEEP, this.dataSource));
		}

		public onClosed(): void {
			super.onClosed();
			this.bgPanel.closeTitle();
			this.btn_again.off(Laya.Event.CLICK, this, this.onClickAgain);
			if (this._efflist)  {
				this._efflist.stratEndAction();
				this._efflist = null;
			}
			this.rewardList.array = null;

		}
	}
}