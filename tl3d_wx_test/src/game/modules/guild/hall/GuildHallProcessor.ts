/**
* name 
*/
module game {
	export class GuildHallProcessor extends tl3d.Processor {

		private _model : GuildModel;
		constructor() {
			super();
			this._model = GuildModel.getInstance();
		}

		public getName(): string {
			return "GuildHallProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new GuildEvent(GuildEvent.UPDATE_MEMBER_LIST),
				new GuildEvent(GuildEvent.UPDATE_APPLY_LIST),
				new GuildEvent(GuildEvent.SHOW_APPLY_VIEW),
				new GuildEvent(GuildEvent.CHANGE_GUILD_NOTICE),
				new GuildEvent(GuildEvent.CHANGE_GUILD_SETTING),
				new GuildEvent(GuildEvent.MEMBER_SETUP_OPERATE),
				new GuildEvent(GuildEvent.GUILD_ZHAOMU),
				new GuildEvent(GuildEvent.GUILD_HALL_VIEW_CHANGEICON),
			];
		}

		//处理事件
		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof GuildEvent) {
				switch ($event.type) {
					case GuildEvent.SHOW_APPLY_VIEW:
						this.showApplyView();
						break;
					case GuildEvent.UPDATE_MEMBER_LIST:
						this.updateMemberList();
						break;
					case GuildEvent.UPDATE_APPLY_LIST:
						this.updateApplyList();
						break;
					case GuildEvent.CHANGE_GUILD_NOTICE:
						this.sendNotice($event.data);
						break;
					case GuildEvent.CHANGE_GUILD_SETTING:
						this.changeSet($event.data);
						break;
					case GuildEvent.MEMBER_SETUP_OPERATE:
						this.memberOperate($event.data);
						break;
					case GuildEvent.GUILD_ZHAOMU:
						this.onZhaomo($event.data);
						break;
					case GuildEvent.GUILD_HALL_VIEW_CHANGEICON:
						this.changeGuildIcon($event.data);
						break;
				}
			}
		}

		private showApplyView():void {
			PLC.request(Protocol.guild_guild_apply_list, null, ($data: any, msg: any) => {
				if (!$data) return;
				let model = this._model;
				model.setApplyList($data.applyList);
				if(model.getApplyList().length <= 0){
					showToast(LanMgr.getLan('',10155));
					return;
				}
				UIMgr.showUI(UIConst.GuildApplyListView);
			});
		}

		/**刷新公会界面 */
		private updateMemberList(): void {
			if(this.guildInfoView){
				this.guildInfoView.updateMemberList();
			}
		}

		/**刷新公会申请列表 */
		private updateApplyList(): void {
			PLC.request(Protocol.guild_guild_apply_list, null, ($data: any, msg: any) => {
				if (!$data) return;
				this._model.setApplyList($data.applyList);
				if(UIMgr.hasStage(UIConst.GuildApplyListView)){
					this.guildApplyListView.updateApplyList();
				}
			});
		}

		/** 更改公会公告 */
		private sendNotice(text:string): void {
			let arg = {};
			arg[Protocol.guild_guild_notice_modify.args.notice] = text;
			PLC.request(Protocol.guild_guild_notice_modify, arg, ($data: any, msg: any) => {
				if (!$data) return;
				let info = this._model.guildInfo;
				if(info){
					info.notice = text;
				}
				guildMemberChatSend(text);
				UIMgr.hideUIByName(UIConst.GuildNoticeView);
				if(this.guildInfoView){
					this.guildInfoView.renderView();
				}
			});
		}
		/** 更新入会设置 */
		private changeSet(ary:any[]):void {
			let level = ary[0];
			let auto = ary[1];
			let args = {};
			args[Protocol.guild_guild_set.args.level] = level;
			args[Protocol.guild_guild_set.args.auto] = auto;
			PLC.request(Protocol.guild_guild_set, args, ($data: any, msg: any) => {
				if (!$data) return;
				let guildInfo = this._model.guildInfo;
				let changeInfo = $data.guildInfo ? $data.guildInfo : {};
				if(changeInfo.hasOwnProperty('autoJoin')){
					guildInfo.autoJoin = changeInfo.autoJoin;
				}
				if(changeInfo.hasOwnProperty('limitLevel')){
					guildInfo.limitLevel = changeInfo.limitLevel;
				}
				UIMgr.hideUIByName(UIConst.GuildSetUpView);
				if(this.guildInfoView){
					this.guildInfoView.renderView();
				}
			});
		}
		/** 成员操作 */
		private memberOperate(dataAry : any[]):void {
			let type = dataAry[0];
			let data : IGuildMemberData = dataAry[1];
			switch(type){
				case GuildMemberOptType.zhuanrang_hz:
				case GuildMemberOptType.bamian_fhz:
				case GuildMemberOptType.renming_fhz:
                    this.appointMember(type,data);
                    break;
				case GuildMemberOptType.zhuchu_gh:
                    this.kickMember(data);
                    break;
				case GuildMemberOptType.cuanwei:
					this.cuanwei(data);
                    break;
			}
			
		}
		/** 任命 */
		private appointMember(type,data : IGuildMemberData):void {
			let jobKey = iface.tb_prop.guildJobTypeKey;
			if(type == GuildMemberOptType.renming_fhz && this._model.getMemberNum(jobKey.vicePresident) >= tb.TB_guild_set.getSet().vice_chairman_num){
				showToast(LanMgr.getLan('',10406,tb.TB_guild_set.getSet().vice_chairman_num));
				return;
			}
			let job = type == GuildMemberOptType.zhuanrang_hz ? jobKey.president : (type == GuildMemberOptType.renming_fhz ? jobKey.vicePresident : jobKey.member);
			let arg = {};
			arg[Protocol.guild_guild_appoint.args.playerId] = data.playerId;
			arg[Protocol.guild_guild_appoint.args.job] = job;
			PLC.request(Protocol.guild_guild_appoint, arg, ($data: any, msg: any) => {
				if (!$data) return;
				data.job = job;
				if(type == GuildMemberOptType.zhuanrang_hz){
					this._model.guildInfo.job = iface.tb_prop.guildJobTypeKey.member;
					guildMemberChatSend("会长" + App.hero.name + "退位让贤，将会长职位传给了" + data.name);
				}
				this.updateMemberList();
				common.AlertBox.close();
				UIMgr.hideUIByName(UIConst.GuildMemberSetView);
			});
		}
		/**踢出公会请求 */
		private kickMember(info : IGuildMemberData): void {
			if(info){
				let arg = {};
				arg[Protocol.guild_guild_quit.args.playerId] = info.playerId;
				PLC.request(Protocol.guild_guild_quit, arg, ($data: any, msg: any) => {
					if (!$data) return;
					guildMemberChatSend("道不同不相为谋，会长将" + info.name + "踢出了公会。");
					this.updateMemberList();
					common.AlertBox.close();
					UIMgr.hideUIByName(UIConst.GuildMemberSetView);
				});
			}
		}
		/** 篡位 */
		private cuanwei(info : IGuildMemberData): void {
			let guildInfo = this._model.guildInfo;
			let vicePresident = guildInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident;
			let day = vicePresident ? tb.TB_guild_set.getSet().usurper_time[0] : tb.TB_guild_set.getSet().usurper_time[1];
			let isOutTime = info.online != 1 && (App.serverTimeSecond - info.logoutTime) >= TimeConst.ONE_DAY_SEC * day; 
			if(!isOutTime){
				showToast(LanMgr.getLan('',vicePresident?10407:10408,day));
				return;
			}
			PLC.request(Protocol.guild_guild_guildUsurp, null, ($data: any, msg: any) => {
				if (!$data) return;
				this.updateMemberList();
				common.AlertBox.close();
				UIMgr.hideUIByName(UIConst.GuildMemberSetView);
			});
		}

		/** 公会信息界面更改公会图标 */
		private changeGuildIcon($data: IconVo): void {
			let args = {};
			args[Protocol.guild_guild_setHead.args.head] = $data.tbHead.ID;
			PLC.request(Protocol.guild_guild_setHead, args, ($data: any, msg: any) => {
				if (!$data){
					UIMgr.hideUIByName(UIConst.IconChangeView); 
					return;
				} 
				UIMgr.hideUIByName(UIConst.IconChangeView);
				this._model.guildInfo.head = $data.guildInfo.head;
				if (UIMgr.getUIByName(UIConst.GuildInfoView)) {
					let guildInfoView = UIMgr.getUIByName(UIConst.GuildInfoView) as GuildInfoView;
					guildInfoView.updateIcon();
				}
			});
		}

		/** 招募 */
		private onZhaomo(ary:any[]):void {
			let level = ary[0];
			let auto = ary[1];
			let maxCount = tb.TB_guild_set.getSet().daily_recruit_num;
			let count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildRecruitNum);
			if(count >= maxCount) {
				showToast(LanMgr.getLan('',10409));
				return;
			}
			let cost = tb.TB_guild_set.getSet().recruit_cost[count] || 0;
			let temptext = cost<=0?LanMgr.getLan(``,10511):LanMgr.getLan(``,10512,cost)
			let text = LanMgr.getLan(``,10513,temptext,maxCount-count);
			common.AlertBox.showAlert({
				text, confirmCb: () => {
					if(cost > 0 && App.hero.diamond < cost){
						showToast(LanMgr.getLan('',10005));
						return;
					}
					let args = {};
					args[Protocol.guild_guild_sendGuildRecruitNotice.args.level] = level;
					args[Protocol.guild_guild_sendGuildRecruitNotice.args.auto] = auto;
					PLC.request(Protocol.guild_guild_sendGuildRecruitNotice, args, ($data: any, msg: any) => {
						if (!$data) return;
						showToast(LanMgr.getLan('',10411));
						let guildInfo = this._model.guildInfo;
						let changeInfo = $data.guildInfo ? $data.guildInfo : {};
						if(changeInfo.hasOwnProperty('autoJoin')){
							guildInfo.autoJoin = changeInfo.autoJoin;
						}
						if(changeInfo.hasOwnProperty('limitLevel')){
							guildInfo.limitLevel = changeInfo.limitLevel;
						}
						if(this.guildInfoView){
							this.guildInfoView.renderView();
						}
					});
				}
			});
		}

		public get guildInfoView(): GuildInfoView {
			return UIMgr.getUIByName(UIConst.GuildInfoView);
		}

		public get guildApplyListView(): GuildApplyListView {
			return UIMgr.getUIByName(UIConst.GuildApplyListView);
		}
		
	}
}