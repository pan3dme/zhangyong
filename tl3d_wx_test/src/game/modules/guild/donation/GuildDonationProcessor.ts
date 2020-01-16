/**
* name 
*/
module game {
	export class GuildDonationProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "GuildDonationProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.GUILD_DONATE),
				new GuildEvent(GuildEvent.UPDATE_GUILD_DONATE),
			];
		}

		//处理事件
		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof GuildEvent) {
				switch ($event.type) {
					case GuildEvent.GUILD_DONATE:
						this.guildDonate($event.data);
						break;
					case GuildEvent.UPDATE_GUILD_DONATE:
						this.updateDonate();
						break;
				}
			}
		}

		/** 公会捐献 */
		private guildDonate(donateVo:GuildDonationVo): void {
			//判断消耗是否足够
            if(UIUtil.checkNotEnough(donateVo.tbDonate.cost[0],donateVo.tbDonate.cost[1])){
                return;
            }
			if(App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate) != 0) {
				showToast(LanMgr.getLan('', 10392));
				return;
			}
			let arg = {};
            arg[Protocol.guild_guild_donate.args.id] = donateVo.tbDonate.ID;
            PLC.request(Protocol.guild_guild_donate,arg,(data:any)=>{
                if(!data) return;
				if(data.hasOwnProperty('modifyGuildExp')){
					App.hero.guildExp = data.modifyGuildExp;
					let info = GuildModel.getInstance().guildInfo;
					if(info){
						info.exp = data.modifyGuildExp;
						info.level = data.modifyGuildLevel;
					}
				}
                UIUtil.showRewardView(data.commonData);
                this.donateView.renderView();
				dispatchEvt(new GuildEvent(GuildEvent.GUILD_DONATE_SUCCESS));
            });
		}

		/** 更新公会捐献 */
		private updateDonate(): void {
			if(this.donateView){
				this.donateView.renderView();
			}
		}

		public get donateView(): GuildDonationView {
			return UIMgr.getUIByName(UIConst.GuildDonationView);
		}

		
	}
}