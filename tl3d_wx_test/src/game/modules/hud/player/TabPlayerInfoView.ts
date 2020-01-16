module game{
	export class TabPlayerInfoView extends ui.hud.player.TabPlayerInfoUI{
		constructor(){
			super();
		}

        createChildren():void {
            super.createChildren();
            this.btnChangeName.on(Laya.Event.CLICK, this, this.onChangename);
			this.btnChangeModel.on(Laya.Event.CLICK, this, this.onChangeModel);
            this.btnNotice.on(Laya.Event.CLICK, this, this.onGonggao);
        }

		public close(){
			// super.close();
            this.headBox.dataSource = null;
            tl3d.ModuleEventManager.removeEvent(ResEvent.RESOURCE_CHANGE, this.updateExp, this);
            tl3d.ModuleEventManager.removeEvent(HudEvent.SET_NAME, this.updateName, this);
            tl3d.ModuleEventManager.removeEvent(HudEvent.SET_HEAD_ICON, this.updateHead, this);
		}

		public show(){
			// super.show();
            this.initView();
		}
        /** 初始化界面 */
		private initView(): void {
			this.updateExp();
			this.updateName();
			this.updateHead();
			this.labAccout.text = App.hero.uid;
			this.lbQufu.text = window.platform.serverInfo.srv_name;
			this.lbGuild.text = App.hero.guildName ? App.hero.guildName : '无';
            this.lbLv.text = App.hero.level + "";
			this.lbForce.value = String(App.hero.force);
			tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateExp, this);
			tl3d.ModuleEventManager.addEvent(HudEvent.SET_NAME, this.updateName, this);
			tl3d.ModuleEventManager.addEvent(HudEvent.SET_HEAD_ICON, this.updateHead, this);
			tl3d.ModuleEventManager.addEvent(HudEvent.SET_HEAD_FRAME, this.updateHead, this);
		}
		/** 更新经验 */
		private updateExp(): void {
			let roletab: tb.TB_role = tb.TB_role.get_TB_rolenById(App.hero.level);
			let tmpexp = App.hero.exp;
			let expvalue: number = 1;
			if (roletab.exp != 0) {
				expvalue = tmpexp / roletab.exp;
			}
			this.pbExp.value = expvalue;
			this.lbExp.text = expvalue >= 1 ? LanMgr.getLan("已满级", -1) : (App.hero.exp + "/" + roletab.exp);
		}
        /** 更新姓名 */
		public updateName() {
			this.lbName.text = App.hero.name;
		}
        /** 更新头像 */
		public updateHead() {
			this.headBox.dataSource = new UserHeadVo(App.hero.getHeadId(), App.hero.level,App.hero.headFrame);
            this.headBox.box_lev.visible = false;
		}


		/** 改名 */
		private onChangename() {
			UIMgr.showUI(UIConst.Hud_ChangeNameView);
		}
		/** 修改形象 */
		private onChangeModel() {
			UIMgr.showUI(UIConst.HeroicModelView);
		}
        /** 公告 */
		private onGonggao() {
			if (App.isOpenSvrDay(2) && !GuideManager.isExecuteGuide()) {
				UIMgr.showUI(UIConst.GameNoticeView,{openFlag:false});
			} else {
				showToast(LanMgr.getLan('',10440));
			}
		}

    }
}