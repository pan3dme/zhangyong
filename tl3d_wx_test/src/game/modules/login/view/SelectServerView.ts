module game {
    export class SelectServerView extends ui.login.SelectServerUI {

        constructor() {
            super();
            this.group = UIConst.hud_group;
            this.btn_entergame.on(Laya.Event.CLICK, this, this.onStartGameEvent);
            this.btn_exit.on(Laya.Event.CLICK, this, this.onExitEvent);
            this.btnNotice.on(Laya.Event.CLICK, this, this.getChatNotice);
            this.btn_selectlist.on(Laya.Event.CLICK, this, this.onSelectListEvent);
            this.btn_ok.on(Laya.Event.CLICK, this, this.onSelectOkEvent);
            this.btn_cancel.on(Laya.Event.CLICK, this, this.onSelectCanelEvent);
            //list渲染:单元格渲染处理器(默认返回参数cell:Box,index:int)。
            this.list_serverlist.renderHandler = new Handler(this, this.onSRender);
            this.list_group.renderHandler = new Handler(this, this.onGRender);
            this.list_serverlist.selectHandler = new Handler(this, this.onSSelect);
            this.list_group.selectHandler = new Handler(this, this.onGSelect);
            this.list_group.selectEnable = true;
            this.list_serverlist.selectEnable = true;
        }

        private curArea: ServerAreaInfo;
        private _curServer: any;

        set curServer(val) {
            this._curServer = val;
        }

        get curServer() {
            return this._curServer;
        }

        private _time: number;
        public onOpened() {
            super.onOpened();
            // this.getChatNotice();
            this._time = Math.floor(Date.now() / 1000);
            this.box_entergame.visible = true;
            this.box_selectserver.visible = false;
            BaseSceneMgr.getInstance().showEffect(this, 1, 1000010, 188, -268, 5.8, 0);
            this.list_group.dataSource = LoginModel.getInstance().areas;
            this.list_group.selectedIndex = 0;
            this.curServer = this.dataSource;
            this.initCurrect();
            this.btn_exit.visible = true;
            this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.login);;
            if (ExtConfig.RELEASE && Number(window.platform.pid) != iface.tb_prop.platformTypeKey.lezhong) { //发布环境调试和gm要单独开启
                this.btn_exit.visible = false;
            }
            UIMgr.getInstance().hideLoading();
            let userNoticeVal = Laya.LocalStorage.getItem("UserNotice");
            this.chk_un.selected = !userNoticeVal || userNoticeVal == "0";

            this.lab_xieyi.on(Laya.Event.CLICK, this, this.onClickUserNotice, [UserNoticeView.TYPE_XIEYI]);
            this.lab_yinsi.on(Laya.Event.CLICK, this, this.onClickUserNotice, [UserNoticeView.TYPE_YINSI]);
        }

        /**获取公告 */
        private getChatNotice(): void {
            dispatchEvt(new LoginEvent(LoginEvent.SHOW_CHATNOTICE_PANEL));
        }

        /**指定时间内按钮只能按一次 */
        private touchtime: boolean = true;

        private onStartGameEvent() {
            if (!this.chk_un.selected) {
                showToast(LanMgr.getLan("", 10443));
                return;
            }
            if (!this.curServer) {
                showToast(LanMgr.getLan("", 10444));
                return;
            }
            if (this.curServer.status == REALMFLAG.REALM_FLAG_CLOSE) {
                showToast(LanMgr.getLan("", 10445));
                return;
            }
            if (this.curServer.open_time > App.getServerTime()) {
                showToast(LanMgr.getLan(``, 10446, getTimeShortStr(this.curServer.open_time)));
                return;
            }
            if (!this.touchtime) return;
            this.touchtime = false;
            Laya.timer.once(1000, this, () => { this.touchtime = true });
            dispatchEvt(new LoginEvent(LoginEvent.SEND_LOGIN_EVENT), this.curServer);
        }

        private onExitEvent() {
            BingoSDK.loginout();
            this.clearLoacal();
            UIMgr.showUI(UIConst.LoginView, null, false);
            this.close();
        }

        private onSelectListEvent() {
            this.box_selectserver.visible = true;
            this.box_entergame.visible = false;

        }

        private onSSelect(idx: number) {
            AudioMgr.playSound();
            this.curServer = this.list_serverlist.selectedItem;
            this.list_serverlist.cells.forEach((item, index, array) => { item.selected = index == idx; });
            this.initCurrect();
        }

        private onGSelect(idx: number) {
            AudioMgr.playSound();
            this.curArea = this.list_group.selectedItem;
            this.list_serverlist.array = this.curArea.servers;
            this.list_serverlist.selectedIndex = 0;
            this.list_group.cells.forEach((item, index, array) => { item.selected = index == idx; });
        }

        private onSelectOkEvent() {
            this.onSelectCanelEvent();
            if (this.list_serverlist.selectedItem)
                this.curServer = this.list_serverlist.selectedItem;
            this.initCurrect();
            // logyhj("本地id：", App.hero.uid + "selectLineId");
            // Laya.LocalStorage.setItem(App.hero.uid + "selectLineId", this.list_serverlist.selectedItem.serverId.toString());
        }

        private onSelectCanelEvent() {
            this.box_selectserver.visible = false;
            this.box_entergame.visible = true;
        }

        private clearLoacal() {
            // Laya.LocalStorage.setItem("selectLineId", "");
            Laya.LocalStorage.setItem("puid", "");
            Laya.LocalStorage.setItem("pid", "");
            Laya.LocalStorage.setItem("uname", "");
        }

        //显示服务器列表
        private onGRender(cell: Laya.Button, index: number) {
            cell.label = cell.dataSource.areaName;
        }

        //显示服务器列表
        private onSRender(cell: Laya.Button, index: number) {
            var data: any = cell.dataSource;
            var state: Laya.Image = cell.getChildByName("state") as Laya.Image;
            cell.label = data.srv_name;
            state.skin = SkinUtil.getServerState(data);

            var img_new: Laya.Image = cell.getChildByName("img_new") as Laya.Image;
            img_new.visible = (this._time - Number(data.open_time)) <= (3 * TimeConst.ONE_DAY_SEC);
        }

        private initCurrect(): void {
            if (this.curServer) {
                this.lbl_cname.text = this.curServer.srv_name;
                this.img_cstate.skin = SkinUtil.getServerState(this.curServer);
                this.img_curnew.visible = (this._time - Number(this.curServer.open_time)) <= (3 * TimeConst.ONE_DAY_SEC);
            }
        }

        private onClickUserNotice(type: number): void {
            UIMgr.showUI(UIConst.UserNoticeView, type);
        }

        public onClosed() {
            super.onClosed();
            BaseSceneMgr.getInstance().removeEffect(1000010);
            Laya.loader.clearTextureRes(this.img_bg.skin);
            let userNotice = this.chk_un.selected ? "0" : "1";
            Laya.LocalStorage.setItem("UserNotice", userNotice);
            this.lab_xieyi.off(Laya.Event.CLICK, this, this.onClickUserNotice);
            this.lab_yinsi.off(Laya.Event.CLICK, this, this.onClickUserNotice);
        }
    }
}