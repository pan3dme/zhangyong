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
    var GuildInitProcessor = /** @class */ (function (_super) {
        __extends(GuildInitProcessor, _super);
        function GuildInitProcessor() {
            return _super.call(this) || this;
        }
        GuildInitProcessor.prototype.getName = function () {
            return "GuildInitProcessor";
        };
        GuildInitProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.CREATE_GUILD),
                new game.GuildEvent(game.GuildEvent.CHANGE_GUILD_ICON),
                new game.GuildEvent(game.GuildEvent.CREATE_GUILD_CHANGEICON),
            ];
        };
        //处理事件
        GuildInitProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GuildEvent) {
                switch ($event.type) {
                    case game.GuildEvent.CREATE_GUILD:
                        this.createGuild($event.data);
                        break;
                    case game.GuildEvent.CHANGE_GUILD_ICON:
                        this.showChangeIconView($event.data);
                        break;
                    case game.GuildEvent.CREATE_GUILD_CHANGEICON:
                        this.createGuildChangeIcon($event.data);
                        break;
                }
            }
        };
        /** 创建公会 */
        GuildInitProcessor.prototype.createGuild = function (info) {
            var name = info.name;
            var level = info.level;
            var auto = info.auto;
            var head = info.head;
            if (App.hero.guildId) {
                showToast(LanMgr.getLan("", 10421));
                return;
            }
            var needVip = tb.TB_guild_set.getSet().create_viplevel;
            if (App.hero.vip < needVip) {
                showToast(LanMgr.getLan("", 10422, needVip));
                return;
            }
            if (!name || name == "") {
                showToast(LanMgr.getLan("", 10160));
                return;
            }
            var costAry = tb.TB_guild_set.getSet().create_cost;
            if (UIUtil.checkNotEnough(costAry[0], costAry[1])) {
                return;
            }
            var args = {};
            args[Protocol.guild_guild_create.args.name] = name;
            args[Protocol.guild_guild_create.args.level] = level;
            args[Protocol.guild_guild_create.args.auto] = auto ? iface.tb_prop.guildAutoJoinTypeKey.yes : iface.tb_prop.guildAutoJoinTypeKey.no;
            args[Protocol.guild_guild_create.args.head] = head;
            PLC.request(Protocol.guild_guild_create, args, function ($data, msg) {
                if (msg)
                    showToast(msg);
                if (!$data)
                    return;
                UIMgr.hideUIByName(UIConst.GuildinitView);
                UIMgr.hideUIByName(UIConst.CreateGuildView);
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL));
            });
        };
        /** 更改ICON图标界面 */
        GuildInitProcessor.prototype.showChangeIconView = function ($data) {
            UIMgr.showUI(UIConst.IconChangeView, $data);
        };
        /** 更改创建公会界面公会图标 */
        GuildInitProcessor.prototype.createGuildChangeIcon = function ($data) {
            UIMgr.hideUIByName(UIConst.IconChangeView);
            if (UIMgr.getUIByName(UIConst.CreateGuildView)) {
                var createGuildView = UIMgr.getUIByName(UIConst.CreateGuildView);
                createGuildView.changeIconSuccess($data);
            }
        };
        Object.defineProperty(GuildInitProcessor.prototype, "initView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GuildinitView);
            },
            enumerable: true,
            configurable: true
        });
        return GuildInitProcessor;
    }(tl3d.Processor));
    game.GuildInitProcessor = GuildInitProcessor;
})(game || (game = {}));
