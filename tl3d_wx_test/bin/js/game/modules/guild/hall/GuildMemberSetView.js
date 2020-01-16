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
    var GuildMemberSetView = /** @class */ (function (_super) {
        __extends(GuildMemberSetView, _super);
        function GuildMemberSetView() {
            return _super.call(this) || this;
        }
        GuildMemberSetView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isModelClose = true;
            this._model = game.GuildModel.getInstance();
            this.btnOpt1.on(Laya.Event.CLICK, this, this.onOpt);
            this.btnOpt2.on(Laya.Event.CLICK, this, this.onOpt);
            this.btnOpt3.on(Laya.Event.CLICK, this, this.onOpt);
            this.bgPanel.dataSource = { uiName: UIConst.GuildMemberSetView, closeOnSide: this.isModelClose, title: "xx" };
        };
        GuildMemberSetView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        GuildMemberSetView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildMemberSetView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildMemberSetView.prototype.initView = function () {
            var mInfo = this.dataSource;
            var guildInfo = this._model.guildInfo;
            var isCaptain = guildInfo.job == iface.tb_prop.guildJobTypeKey.president;
            var isViceCaptain = guildInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident;
            this.btnOpt1.visible = this.btnOpt2.visible = this.btnOpt3.visible = true;
            if (isCaptain) {
                this.btnOpt1.label = LanMgr.getLan("", 10522);
                this.btnOpt1.dataSource = { type: game.GuildMemberOptType.zhuanrang_hz };
                this.btnOpt2.label = mInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident ? LanMgr.getLan("", 10523) : LanMgr.getLan("", 10524);
                this.btnOpt2.dataSource = { type: mInfo.job == iface.tb_prop.guildJobTypeKey.vicePresident ? game.GuildMemberOptType.bamian_fhz : game.GuildMemberOptType.renming_fhz };
                this.btnOpt3.label = LanMgr.getLan("", 10525);
                this.btnOpt3.dataSource = { type: game.GuildMemberOptType.zhuchu_gh };
            }
            else if (isViceCaptain) {
                this.btnOpt1.visible = this.btnOpt2.visible = false;
                this.btnOpt3.label = mInfo.job == iface.tb_prop.guildJobTypeKey.president ? LanMgr.getLan("", 10526) : LanMgr.getLan("", 10525);
                this.btnOpt3.dataSource = { type: mInfo.job == iface.tb_prop.guildJobTypeKey.president ? game.GuildMemberOptType.cuanwei : game.GuildMemberOptType.zhuchu_gh };
            }
            else {
                this.btnOpt1.visible = this.btnOpt2.visible = false;
                this.btnOpt3.label = LanMgr.getLan("", 10526);
                this.btnOpt3.dataSource = { type: game.GuildMemberOptType.cuanwei };
            }
            this.lbContent.text = LanMgr.getLan("", 10527, mInfo.name);
            this.bgPanel.updateTitle(mInfo.name);
        };
        GuildMemberSetView.prototype.onOpt = function (event) {
            var info = this.dataSource;
            var btn = event.currentTarget;
            var dataSource = btn.dataSource;
            var type = dataSource ? dataSource['type'] : 0;
            if (!info || type == 0)
                return;
            switch (type) {
                case game.GuildMemberOptType.zhuanrang_hz:
                case game.GuildMemberOptType.bamian_fhz:
                case game.GuildMemberOptType.renming_fhz:
                case game.GuildMemberOptType.zhuchu_gh:
                    var text = "";
                    if (type == game.GuildMemberOptType.zhuanrang_hz) {
                        text = LanMgr.getLan("", 10517, info.name);
                    }
                    else if (type == game.GuildMemberOptType.bamian_fhz) {
                        text = LanMgr.getLan("", 10518, info.name);
                    }
                    else if (type == game.GuildMemberOptType.renming_fhz) {
                        text = LanMgr.getLan("", 10519, info.name);
                    }
                    else if (type == game.GuildMemberOptType.zhuchu_gh) {
                        text = info.job == iface.tb_prop.guildJobTypeKey.vicePresident ? LanMgr.getLan("", 10520, info.name) : LanMgr.getLan("", 10521);
                    }
                    var uidata = {
                        text: text, confirmCb: function () {
                            dispatchEvt(new game.GuildEvent(game.GuildEvent.MEMBER_SETUP_OPERATE), [type, info]);
                        }, confirmNotClose: true
                    };
                    common.AlertBox.showAlert(uidata);
                    break;
                case game.GuildMemberOptType.cuanwei:
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.MEMBER_SETUP_OPERATE), [type, info]);
                    break;
            }
        };
        return GuildMemberSetView;
    }(ui.guild.hall.MemberSetupUI));
    game.GuildMemberSetView = GuildMemberSetView;
})(game || (game = {}));
