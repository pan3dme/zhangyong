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
    var TabPlayerInfoView = /** @class */ (function (_super) {
        __extends(TabPlayerInfoView, _super);
        function TabPlayerInfoView() {
            return _super.call(this) || this;
        }
        TabPlayerInfoView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnChangeName.on(Laya.Event.CLICK, this, this.onChangename);
            this.btnChangeModel.on(Laya.Event.CLICK, this, this.onChangeModel);
            this.btnNotice.on(Laya.Event.CLICK, this, this.onGonggao);
        };
        TabPlayerInfoView.prototype.close = function () {
            // super.close();
            this.headBox.dataSource = null;
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.RESOURCE_CHANGE, this.updateExp, this);
            tl3d.ModuleEventManager.removeEvent(game.HudEvent.SET_NAME, this.updateName, this);
            tl3d.ModuleEventManager.removeEvent(game.HudEvent.SET_HEAD_ICON, this.updateHead, this);
        };
        TabPlayerInfoView.prototype.show = function () {
            // super.show();
            this.initView();
        };
        /** 初始化界面 */
        TabPlayerInfoView.prototype.initView = function () {
            this.updateExp();
            this.updateName();
            this.updateHead();
            this.labAccout.text = App.hero.uid;
            this.lbQufu.text = window.platform.serverInfo.srv_name;
            this.lbGuild.text = App.hero.guildName ? App.hero.guildName : '无';
            this.lbLv.text = App.hero.level + "";
            this.lbForce.value = String(App.hero.force);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateExp, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.SET_NAME, this.updateName, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.SET_HEAD_ICON, this.updateHead, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.SET_HEAD_FRAME, this.updateHead, this);
        };
        /** 更新经验 */
        TabPlayerInfoView.prototype.updateExp = function () {
            var roletab = tb.TB_role.get_TB_rolenById(App.hero.level);
            var tmpexp = App.hero.exp;
            var expvalue = 1;
            if (roletab.exp != 0) {
                expvalue = tmpexp / roletab.exp;
            }
            this.pbExp.value = expvalue;
            this.lbExp.text = expvalue >= 1 ? LanMgr.getLan("已满级", -1) : (App.hero.exp + "/" + roletab.exp);
        };
        /** 更新姓名 */
        TabPlayerInfoView.prototype.updateName = function () {
            this.lbName.text = App.hero.name;
        };
        /** 更新头像 */
        TabPlayerInfoView.prototype.updateHead = function () {
            this.headBox.dataSource = new UserHeadVo(App.hero.getHeadId(), App.hero.level, App.hero.headFrame);
            this.headBox.box_lev.visible = false;
        };
        /** 改名 */
        TabPlayerInfoView.prototype.onChangename = function () {
            UIMgr.showUI(UIConst.Hud_ChangeNameView);
        };
        /** 修改形象 */
        TabPlayerInfoView.prototype.onChangeModel = function () {
            UIMgr.showUI(UIConst.HeroicModelView);
        };
        /** 公告 */
        TabPlayerInfoView.prototype.onGonggao = function () {
            if (App.isOpenSvrDay(2) && !game.GuideManager.isExecuteGuide()) {
                UIMgr.showUI(UIConst.GameNoticeView, { openFlag: false });
            }
            else {
                showToast(LanMgr.getLan('', 10440));
            }
        };
        return TabPlayerInfoView;
    }(ui.hud.player.TabPlayerInfoUI));
    game.TabPlayerInfoView = TabPlayerInfoView;
})(game || (game = {}));
