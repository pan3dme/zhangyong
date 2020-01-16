/**
* name 
*/
module game {
	export class GuildInitProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "GuildInitProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.CREATE_GUILD),
				new GuildEvent(GuildEvent.CHANGE_GUILD_ICON),
				new GuildEvent(GuildEvent.CREATE_GUILD_CHANGEICON),
			];
		}

		//处理事件
		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof GuildEvent) {
				switch ($event.type) {
					case GuildEvent.CREATE_GUILD:
                        this.createGuild($event.data);
						break;
					case GuildEvent.CHANGE_GUILD_ICON:
						this.showChangeIconView($event.data);
						break;
					case GuildEvent.CREATE_GUILD_CHANGEICON:
						this.createGuildChangeIcon($event.data);						
						break;
				}
			}
		}
        
        /** 创建公会 */
        private createGuild(info:any):void {
            let name = info.name;
            let level = info.level;
            let auto = info.auto;
			let head = info.head;
            if (App.hero.guildId) {
				showToast(LanMgr.getLan("", 10421));
				return;
			}
			let needVip = tb.TB_guild_set.getSet().create_viplevel;
			if(App.hero.vip < needVip){
				showToast(LanMgr.getLan("", 10422,needVip));
				return;
			}
			if (!name || name == "") {
				showToast(LanMgr.getLan("", 10160));
				return;
			}
			let costAry = tb.TB_guild_set.getSet().create_cost; 
			if(UIUtil.checkNotEnough(costAry[0],costAry[1])){
				return;
			}
			let args = {};
			args[Protocol.guild_guild_create.args.name] = name;
			args[Protocol.guild_guild_create.args.level] = level;
			args[Protocol.guild_guild_create.args.auto] = auto ? iface.tb_prop.guildAutoJoinTypeKey.yes : iface.tb_prop.guildAutoJoinTypeKey.no;
			args[Protocol.guild_guild_create.args.head] = head;
			PLC.request(Protocol.guild_guild_create, args, ($data: any, msg: any) => {
				if (msg) showToast(msg);
				if (!$data) return;
				UIMgr.hideUIByName(UIConst.GuildinitView);
				UIMgr.hideUIByName(UIConst.CreateGuildView);
				dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_PANEL));
			});
        }

		/** 更改ICON图标界面 */
		private showChangeIconView($data: any): void {
			UIMgr.showUI(UIConst.IconChangeView, $data);
		}

		/** 更改创建公会界面公会图标 */
		private createGuildChangeIcon($data: IconVo): void {
			UIMgr.hideUIByName(UIConst.IconChangeView);
			if(UIMgr.getUIByName(UIConst.CreateGuildView)){
					let createGuildView = UIMgr.getUIByName(UIConst.CreateGuildView) as CreateGuildView;
					createGuildView.changeIconSuccess($data);
			}
		}

        get initView():GuildinitView{
            return UIMgr.getUIByName(UIConst.GuildinitView);
        }
    }
}