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
/**
* name
*/
var game;
(function (game) {
    var GuildInfoView = /** @class */ (function (_super) {
        __extends(GuildInfoView, _super);
        function GuildInfoView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this._model = game.GuildModel.getInstance();
            return _this;
        }
        GuildInfoView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btn_setup.on(Laya.Event.CLICK, this, this.setup);
            this.btn_input.on(Laya.Event.CLICK, this, this.input);
            this.btn_applyList.on(Laya.Event.CLICK, this, this.onApply);
            this.btn_exitGuild.on(Laya.Event.CLICK, this, this.exitGuild);
            this.img_icon.on(Laya.Event.CLICK, this, this.changeIcon);
            this.btn_seticon.on(Laya.Event.CLICK, this, this.changeIcon);
            this.bgPanel.dataSource = { uiName: UIConst.GuildInfoView, closeOnSide: this.isModelClose, title: "公会大厅" };
            this.list_Member.array = null;
            this.lbName.text = "";
        };
        GuildInfoView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildInfoView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        /** 界面移除 */
        GuildInfoView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list_Member.array = null;
        };
        GuildInfoView.prototype.initView = function () {
            var model = this._model;
            this.list_Member.array = model.getMemberList(false);
            this.renderView();
            this.updateMemberList();
        };
        /** 公会信息UI赋值 */
        GuildInfoView.prototype.renderView = function () {
            var guildInfo = this._model.guildInfo;
            this.lbGuildName.text = guildInfo.name;
            // 是否管理者
            var isController = [iface.tb_prop.guildJobTypeKey.president, iface.tb_prop.guildJobTypeKey.vicePresident].indexOf(guildInfo.job) != -1;
            this.btn_seticon.visible = this.btn_input.visible = isController;
            this.btn_setup.gray = this.btn_applyList.gray = !isController;
            this.lab_level.text = guildInfo.level + "\u7EA7";
            var tbGuild = tb.TB_guild.get_TB_guildById(guildInfo.level);
            this.lab_exp.text = guildInfo.exp + "/" + tbGuild.need_exp;
            var autoJoinText = LanMgr.getLan("", (iface.tb_prop.guildAutoJoinTypeKey.yes ? 10153 : 10154));
            this.lab_auto.text = guildInfo.limitLevel + autoJoinText;
            this.lab_people.text = guildInfo.num + "/" + tb.TB_guild.get_TB_guildById(guildInfo.level).limit_num;
            this.are_putin.text = guildInfo.notice ? guildInfo.notice : LanMgr.getLan("", 10152);
            this.updateIcon();
        };
        /** 更新公会图标 */
        GuildInfoView.prototype.updateIcon = function () {
            var guildInfo = this._model.guildInfo;
            this.img_icon.skin = SkinUtil.getGuildHeadIconById(guildInfo.head);
        };
        GuildInfoView.prototype.updateMemberList = function () {
            var _this = this;
            PLC.request(Protocol.guild_guild_member_list, null, function ($data, msg) {
                if (!$data)
                    return;
                var model = _this._model;
                model.setMemberList($data.memberList);
                var members = model.getMemberList(true);
                _this.list_Member.array = members;
                var guildInfo = model.guildInfo;
                _this.btn_exitGuild.label = LanMgr.getLan('', (guildInfo.job == iface.tb_prop.guildJobTypeKey.president ? 10151 : 10150));
                var leader = members.find(function (vo) {
                    return vo.job == iface.tb_prop.guildJobTypeKey.president;
                });
                _this.lbName.text = leader ? leader.name : "无";
            });
        };
        /** 退出/解散公会 */
        GuildInfoView.prototype.exitGuild = function () {
            var _this = this;
            var guildInfo = this._model.guildInfo;
            var isCaptain = guildInfo.job == iface.tb_prop.guildJobTypeKey.president;
            var labZhu = isCaptain ? LanMgr.getLan("", 10514, guildInfo.name) : LanMgr.getLan("", 10515, guildInfo.name);
            var uidata = {
                text: labZhu, confirmCb: function () {
                    if (isCaptain) {
                        _this.dissolveGuild();
                    }
                    else {
                        _this.quitGuild();
                    }
                }
            };
            common.AlertBox.showAlert(uidata);
        };
        /** 退出公会请求 */
        GuildInfoView.prototype.quitGuild = function () {
            var _this = this;
            var arg = {};
            arg[Protocol.guild_guild_quit.args.playerId] = null;
            PLC.request(Protocol.guild_guild_quit, arg, function ($data, msg) {
                if (!$data)
                    return;
                _this._model.updateGuildInfo(null);
                guildMemberChatSend(LanMgr.getLan("", 10516, App.hero.name));
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_INIT_VIEW));
                UIMgr.hideUIByName(UIConst.GuildInfoView);
            });
        };
        /** 解散公会请求 */
        GuildInfoView.prototype.dissolveGuild = function () {
            var _this = this;
            PLC.request(Protocol.guild_guild_dissolve, null, function ($data, msg) {
                if (!$data)
                    return;
                _this._model.updateGuildInfo(null);
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_INIT_VIEW));
                UIMgr.hideUIByName(UIConst.GuildInfoView);
            });
        };
        /** 打开输入公告界面 */
        GuildInfoView.prototype.input = function () {
            if (!this._model.isController()) {
                showToast(LanMgr.getLan('', 10412));
                return;
            }
            UIMgr.showUI(UIConst.GuildNoticeView, this._model.guildInfo.notice);
        };
        /** 更改公会图标 */
        GuildInfoView.prototype.changeIcon = function () {
            if (!this._model.isController()) {
                showToast(LanMgr.getLan('', 10412));
                return;
            }
            var model = this._model;
            var dataSource = { type: game.GuildIconChangeType.infoChange, iconId: model.guildInfo.head, list_icon: model.getIconList() };
            dispatchEvt(new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_ICON), dataSource);
        };
        /** 入会设置 */
        GuildInfoView.prototype.setup = function () {
            if (!this._model.isController()) {
                showToast(LanMgr.getLan('', 10412));
                return;
            }
            UIMgr.showUI(UIConst.GuildSetUpView);
        };
        /** 打开申请列表 */
        GuildInfoView.prototype.onApply = function () {
            if (!this._model.isController()) {
                showToast(LanMgr.getLan('', 10412));
                return;
            }
            dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_APPLY_VIEW));
        };
        return GuildInfoView;
    }(ui.guild.hall.GuildInfoUI));
    game.GuildInfoView = GuildInfoView;
})(game || (game = {}));
