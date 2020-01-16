var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var SelectServerView = /** @class */ (function (_super) {
        __extends(SelectServerView, _super);
        function SelectServerView() {
            var _this = _super.call(this) || this;
            /**指定时间内按钮只能按一次 */
            _this.touchtime = true;
            _this.group = UIConst.hud_group;
            _this.btn_entergame.on(Laya.Event.CLICK, _this, _this.onStartGameEvent);
            _this.btn_exit.on(Laya.Event.CLICK, _this, _this.onExitEvent);
            _this.btnNotice.on(Laya.Event.CLICK, _this, _this.getChatNotice);
            _this.btn_selectlist.on(Laya.Event.CLICK, _this, _this.onSelectListEvent);
            _this.btn_ok.on(Laya.Event.CLICK, _this, _this.onSelectOkEvent);
            _this.btn_cancel.on(Laya.Event.CLICK, _this, _this.onSelectCanelEvent);
            //list渲染:单元格渲染处理器(默认返回参数cell:Box,index:int)。
            _this.list_serverlist.renderHandler = new Handler(_this, _this.onSRender);
            _this.list_group.renderHandler = new Handler(_this, _this.onGRender);
            _this.list_serverlist.selectHandler = new Handler(_this, _this.onSSelect);
            _this.list_group.selectHandler = new Handler(_this, _this.onGSelect);
            _this.list_group.selectEnable = true;
            _this.list_serverlist.selectEnable = true;
            return _this;
        }
        Object.defineProperty(SelectServerView.prototype, "curServer", {
            get: function () {
                return this._curServer;
            },
            set: function (val) {
                this._curServer = val;
            },
            enumerable: true,
            configurable: true
        });
        SelectServerView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            // this.getChatNotice();
            this._time = Math.floor(Date.now() / 1000);
            this.box_entergame.visible = true;
            this.box_selectserver.visible = false;
            BaseSceneMgr.getInstance().showEffect(this, 1, 1000010, 188, -268, 5.8, 0);
            this.list_group.dataSource = game.LoginModel.getInstance().areas;
            this.list_group.selectedIndex = 0;
            this.curServer = this.dataSource;
            this.initCurrect();
            this.btn_exit.visible = true;
            this.img_bg.skin = SkinUtil.getSysMapSkin(ModuleConst.login);
            ;
            if (ExtConfig.RELEASE && Number(window.platform.pid) != iface.tb_prop.platformTypeKey.lezhong) { //发布环境调试和gm要单独开启
                this.btn_exit.visible = false;
            }
            UIMgr.getInstance().hideLoading();
            var userNoticeVal = Laya.LocalStorage.getItem("UserNotice");
            this.chk_un.selected = !userNoticeVal || userNoticeVal == "0";
            this.lab_xieyi.on(Laya.Event.CLICK, this, this.onClickUserNotice, [game.UserNoticeView.TYPE_XIEYI]);
            this.lab_yinsi.on(Laya.Event.CLICK, this, this.onClickUserNotice, [game.UserNoticeView.TYPE_YINSI]);
        };
        /**获取公告 */
        SelectServerView.prototype.getChatNotice = function () {
            dispatchEvt(new game.LoginEvent(game.LoginEvent.SHOW_CHATNOTICE_PANEL));
        };
        SelectServerView.prototype.onStartGameEvent = function () {
            var _this = this;
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
                showToast(LanMgr.getLan("", 10446, getTimeShortStr(this.curServer.open_time)));
                return;
            }
            if (!this.touchtime)
                return;
            this.touchtime = false;
            Laya.timer.once(1000, this, function () { _this.touchtime = true; });
            dispatchEvt(new game.LoginEvent(game.LoginEvent.SEND_LOGIN_EVENT), this.curServer);
        };
        SelectServerView.prototype.onExitEvent = function () {
            BingoSDK.loginout();
            this.clearLoacal();
            UIMgr.showUI(UIConst.LoginView, null, false);
            this.close();
        };
        SelectServerView.prototype.onSelectListEvent = function () {
            this.box_selectserver.visible = true;
            this.box_entergame.visible = false;
        };
        SelectServerView.prototype.onSSelect = function (idx) {
            AudioMgr.playSound();
            this.curServer = this.list_serverlist.selectedItem;
            this.list_serverlist.cells.forEach(function (item, index, array) { item.selected = index == idx; });
            this.initCurrect();
        };
        SelectServerView.prototype.onGSelect = function (idx) {
            AudioMgr.playSound();
            this.curArea = this.list_group.selectedItem;
            this.list_serverlist.array = this.curArea.servers;
            this.list_serverlist.selectedIndex = 0;
            this.list_group.cells.forEach(function (item, index, array) { item.selected = index == idx; });
        };
        SelectServerView.prototype.onSelectOkEvent = function () {
            this.onSelectCanelEvent();
            if (this.list_serverlist.selectedItem)
                this.curServer = this.list_serverlist.selectedItem;
            this.initCurrect();
            // logyhj("本地id：", App.hero.uid + "selectLineId");
            // Laya.LocalStorage.setItem(App.hero.uid + "selectLineId", this.list_serverlist.selectedItem.serverId.toString());
        };
        SelectServerView.prototype.onSelectCanelEvent = function () {
            this.box_selectserver.visible = false;
            this.box_entergame.visible = true;
        };
        SelectServerView.prototype.clearLoacal = function () {
            // Laya.LocalStorage.setItem("selectLineId", "");
            Laya.LocalStorage.setItem("puid", "");
            Laya.LocalStorage.setItem("pid", "");
            Laya.LocalStorage.setItem("uname", "");
        };
        //显示服务器列表
        SelectServerView.prototype.onGRender = function (cell, index) {
            cell.label = cell.dataSource.areaName;
        };
        //显示服务器列表
        SelectServerView.prototype.onSRender = function (cell, index) {
            var data = cell.dataSource;
            var state = cell.getChildByName("state");
            cell.label = data.srv_name;
            state.skin = SkinUtil.getServerState(data);
            var img_new = cell.getChildByName("img_new");
            img_new.visible = (this._time - Number(data.open_time)) <= (3 * TimeConst.ONE_DAY_SEC);
        };
        SelectServerView.prototype.initCurrect = function () {
            if (this.curServer) {
                this.lbl_cname.text = this.curServer.srv_name;
                this.img_cstate.skin = SkinUtil.getServerState(this.curServer);
                this.img_curnew.visible = (this._time - Number(this.curServer.open_time)) <= (3 * TimeConst.ONE_DAY_SEC);
            }
        };
        SelectServerView.prototype.onClickUserNotice = function (type) {
            UIMgr.showUI(UIConst.UserNoticeView, type);
        };
        SelectServerView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            BaseSceneMgr.getInstance().removeEffect(1000010);
            Laya.loader.clearTextureRes(this.img_bg.skin);
            var userNotice = this.chk_un.selected ? "0" : "1";
            Laya.LocalStorage.setItem("UserNotice", userNotice);
            this.lab_xieyi.off(Laya.Event.CLICK, this, this.onClickUserNotice);
            this.lab_yinsi.off(Laya.Event.CLICK, this, this.onClickUserNotice);
        };
        return SelectServerView;
    }(ui.login.SelectServerUI));
    game.SelectServerView = SelectServerView;
})(game || (game = {}));
