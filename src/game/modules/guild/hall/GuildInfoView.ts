/**
* name 
*/
module game {
	export class GuildInfoView extends ui.guild.hall.GuildInfoUI {

		private _model: GuildModel;
		constructor() {
			super();
			this.isModelClose = true;
			this._model = GuildModel.getInstance();
		}

		createChildren(): void {
			super.createChildren();
			this.btn_setup.on(Laya.Event.CLICK, this, this.setup);
			this.btn_input.on(Laya.Event.CLICK, this, this.input);
			this.btn_applyList.on(Laya.Event.CLICK, this, this.onApply);
			this.btn_exitGuild.on(Laya.Event.CLICK, this, this.exitGuild);
			this.img_icon.on(Laya.Event.CLICK, this, this.changeIcon);
			this.btn_seticon.on(Laya.Event.CLICK, this, this.changeIcon);
			this.bgPanel.dataSource = { uiName: UIConst.GuildInfoView, closeOnSide: this.isModelClose, title: "公会大厅" };
			this.list_Member.array = null;
			this.lbName.text = "";
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

		/** 界面移除 */
		public onClosed(): void {
			super.onClosed();
			this.list_Member.array = null;
		}

		private initView(): void {
			let model = this._model;
			this.list_Member.array = model.getMemberList(false);
			this.renderView();
			this.updateMemberList();
		}

		/** 公会信息UI赋值 */
		public renderView(): void {
			let guildInfo = this._model.guildInfo;
			this.lbGuildName.text = guildInfo.name;
			// 是否管理者
			let isController = [iface.tb_prop.guildJobTypeKey.president, iface.tb_prop.guildJobTypeKey.vicePresident].indexOf(guildInfo.job) != -1;
			this.btn_seticon.visible = this.btn_input.visible = isController;
			this.btn_setup.gray = this.btn_applyList.gray = !isController;
			this.lab_level.text = `${guildInfo.level}级`;
			let tbGuild = tb.TB_guild.get_TB_guildById(guildInfo.level);
			this.lab_exp.text = `${guildInfo.exp}/${tbGuild.need_exp}`;
			let autoJoinText = LanMgr.getLan("", (iface.tb_prop.guildAutoJoinTypeKey.yes ? 10153 : 10154));
			this.lab_auto.text = guildInfo.limitLevel + autoJoinText;
			this.lab_people.text = guildInfo.num + "/" + tb.TB_guild.get_TB_guildById(guildInfo.level).limit_num;
			this.are_putin.text = guildInfo.notice ? guildInfo.notice : LanMgr.getLan("", 10152);
			this.updateIcon();
		}
		/** 更新公会图标 */
		public updateIcon(): void {
			let guildInfo = this._model.guildInfo;
			this.img_icon.skin = SkinUtil.getGuildHeadIconById(guildInfo.head);
		}

		public updateMemberList(): void {
			PLC.request(Protocol.guild_guild_member_list, null, ($data: any, msg: any) => {
				if (!$data) return;
				let model = this._model;
				model.setMemberList($data.memberList);
				let members = model.getMemberList(true);
				this.list_Member.array = members;
				let guildInfo = model.guildInfo;
				this.btn_exitGuild.label = LanMgr.getLan('', (guildInfo.job == iface.tb_prop.guildJobTypeKey.president ? 10151 : 10150))
				let leader = members.find((vo) => {
					return vo.job == iface.tb_prop.guildJobTypeKey.president;
				});
				this.lbName.text = leader ? leader.name : "无";
			});
		}

		/** 退出/解散公会 */
		private exitGuild(): void {
			let guildInfo = this._model.guildInfo;
			let isCaptain = guildInfo.job == iface.tb_prop.guildJobTypeKey.president;

			let labZhu = isCaptain ? LanMgr.getLan(``, 10514, guildInfo.name) : LanMgr.getLan(``, 10515, guildInfo.name);
			let uidata: common.IConfirmData = {
				text: labZhu, confirmCb: () => {
					if (isCaptain) {
						this.dissolveGuild();
					} else {
						this.quitGuild();
					}
				}
			};
			common.AlertBox.showAlert(uidata)
		}

		/** 退出公会请求 */
		private quitGuild(): void {
			let arg = {};
			arg[Protocol.guild_guild_quit.args.playerId] = null;
			PLC.request(Protocol.guild_guild_quit, arg, ($data: any, msg: any) => {
				if (!$data) return;
				this._model.updateGuildInfo(null);
				guildMemberChatSend(LanMgr.getLan(``, 10516, App.hero.name));
				dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_INIT_VIEW));
				UIMgr.hideUIByName(UIConst.GuildInfoView);
			});
		}

		/** 解散公会请求 */
		private dissolveGuild(): void {
			PLC.request(Protocol.guild_guild_dissolve, null, ($data: any, msg: any) => {
				if (!$data) return;
				this._model.updateGuildInfo(null);
				dispatchEvt(new GuildEvent(GuildEvent.SHOW_GUILD_INIT_VIEW));
				UIMgr.hideUIByName(UIConst.GuildInfoView);
			});
		}

		/** 打开输入公告界面 */
		private input(): void {
			if (!this._model.isController()) {
				showToast(LanMgr.getLan('', 10412));
				return;
			}
			UIMgr.showUI(UIConst.GuildNoticeView, this._model.guildInfo.notice);
		}
		/** 更改公会图标 */
		private changeIcon(): void {
			if (!this._model.isController()) {
				showToast(LanMgr.getLan('', 10412));
				return;
			}
			let model = this._model;
			let dataSource = { type: GuildIconChangeType.infoChange, iconId: model.guildInfo.head, list_icon: model.getIconList() };
			dispatchEvt(new GuildEvent(GuildEvent.CHANGE_GUILD_ICON), dataSource);
		}

		/** 入会设置 */
		private setup(): void {
			if (!this._model.isController()) {
				showToast(LanMgr.getLan('', 10412));
				return;
			}
			UIMgr.showUI(UIConst.GuildSetUpView);
		}

		/** 打开申请列表 */
		private onApply(): void {
			if (!this._model.isController()) {
				showToast(LanMgr.getLan('', 10412));
				return;
			}
			dispatchEvt(new GuildEvent(GuildEvent.SHOW_APPLY_VIEW));
		}

	}
}