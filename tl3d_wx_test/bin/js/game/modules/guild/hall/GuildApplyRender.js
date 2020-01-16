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
    var GuildApplyRender = /** @class */ (function (_super) {
        __extends(GuildApplyRender, _super);
        function GuildApplyRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GuildApplyRender.prototype, "dataSource", {
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
        GuildApplyRender.prototype.refreshData = function () {
            var data = this.dataSource;
            if (data) {
                this.lab_name.text = data.name;
                this.lab_level.text = data.level + LanMgr.getLan("级", -1);
                this.lab_power.text = String(Math.round(data.force));
                this.btn_yes.on(Laya.Event.CLICK, this, this.apply, [0]);
                this.btn_no.on(Laya.Event.CLICK, this, this.apply, [1]);
            }
            else {
                this.lab_name.text = "";
                this.lab_level.text = "";
                this.btn_yes.off(Laya.Event.CLICK, this, this.apply);
                this.btn_no.off(Laya.Event.CLICK, this, this.apply);
            }
        };
        /**公会申请操作 */
        GuildApplyRender.prototype.apply = function (type) {
            var data = this.dataSource;
            var arg = {};
            arg[Protocol.guild_guild_apply_opt.args.type] = type;
            arg[Protocol.guild_guild_apply_opt.args.playerId] = data.playerId;
            PLC.request(Protocol.guild_guild_apply_opt, arg, function ($data, msg) {
                if (!$data)
                    return;
                if ($data.addMember) {
                    guildMemberChatSend("欢迎" + data.name + "加入了大家庭，一同求道！");
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_MEMBER_LIST));
                }
                // sendDispatchEvent(new GuildEvent(GuildEvent.UPDATE_APPLY_LIST));
                if ($data.delApply) {
                    var model = game.GuildModel.getInstance();
                    var arr = model.getApplyList();
                    model.setApplyList(arr.filter(function (item) {
                        return item.playerId != $data.delApply;
                    }));
                    var guildApplyListView = UIMgr.getUIByName(UIConst.GuildApplyListView);
                    if (guildApplyListView) {
                        guildApplyListView.updateApplyList();
                    }
                }
            });
        };
        return GuildApplyRender;
    }(ui.guild.hall.GuildApplyRenderUI));
    game.GuildApplyRender = GuildApplyRender;
})(game || (game = {}));
