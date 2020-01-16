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
    var GuildinitRender = /** @class */ (function (_super) {
        __extends(GuildinitRender, _super);
        function GuildinitRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildinitRender.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        GuildinitRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.lab_name.text = data.name;
                this.btn_apply.visible = data.isApplay == 0;
                this.btn_cancel.visible = data.isApplay != 0;
                this.lab_level.text = data.level + LanMgr.getLan("级", -1);
                this.lab_limit.text = data.limitLevel + LanMgr.getLan("级", -1);
                this.lab_people.text = data.num + "/" + tb.TB_guild.get_TB_guildById(data.level).limit_num;
                this.btn_apply.label = data.autoJoin == iface.tb_prop.guildAutoJoinTypeKey.yes ? LanMgr.getLan("加入", -1) : LanMgr.getLan("申请", -1);
                this.btn_apply.on(Laya.Event.CLICK, this, this.applyJoin);
                this.btn_cancel.on(Laya.Event.CLICK, this, this.applyJoin);
            }
            else {
                this.lab_name.text = "";
                this.lab_level.text = "";
                this.lab_people.text = "";
                this.btn_apply.off(Laya.Event.CLICK, this, this.applyJoin);
                this.btn_cancel.off(Laya.Event.CLICK, this, this.applyJoin);
            }
        };
        /**申请/取消申请 */
        GuildinitRender.prototype.applyJoin = function () {
            var _this = this;
            var data = this.dataSource;
            if (App.hero.level < data.limitLevel) {
                showToast(LanMgr.getLan("", 10159));
                return;
            }
            var args = {};
            args[Protocol.guild_guild_apply.args.guildId] = data.guildId;
            PLC.request((this.btn_apply.visible) ? Protocol.guild_guild_apply : Protocol.guild_guild_apply_cancel, args, function ($data, msg) {
                if (!$data) {
                    //为空说明数据有问题，重新请求下最新数据
                    var initView = UIMgr.getUIByName(UIConst.GuildinitView);
                    if (initView)
                        initView.requestGuildList();
                    return;
                }
                if ($data.addMember) {
                    UIMgr.hideUIByName(UIConst.GuildinitView);
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
                    return;
                }
                _this.btn_apply.visible = !_this.btn_apply.visible;
                _this.btn_cancel.visible = !_this.btn_apply.visible;
                _this.btn_apply.selected = _this.btn_cancel.selected = false;
            });
        };
        return GuildinitRender;
    }(ui.guild.init.GuildinitRenderUI));
    game.GuildinitRender = GuildinitRender;
})(game || (game = {}));
