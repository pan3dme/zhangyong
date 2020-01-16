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
    var GuildSkillProcessor = /** @class */ (function (_super) {
        __extends(GuildSkillProcessor, _super);
        function GuildSkillProcessor() {
            return _super.call(this) || this;
        }
        GuildSkillProcessor.prototype.getName = function () {
            return "GuildSkillProcessor";
        };
        GuildSkillProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.GUILD_SKILL_LEVELUP),
                new game.GuildEvent(game.GuildEvent.GUILD_SKILL_RESET),
            ];
        };
        GuildSkillProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GuildEvent) {
                switch ($event.type) {
                    case game.GuildEvent.GUILD_SKILL_LEVELUP:
                        this.skillLevelUp($event.data);
                        break;
                    case game.GuildEvent.GUILD_SKILL_RESET:
                        this.skillReset();
                        break;
                }
            }
        };
        /** 公会技能升级 */
        GuildSkillProcessor.prototype.skillLevelUp = function ($data) {
            //判断该技能是否满级
            if ($data.tbSkill.cost == 0) {
                showToast(LanMgr.getLan("", 10423));
                return;
            }
            //判断帮贡是否足够
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.guildDonate, $data.tbSkill.cost)) {
                return;
            }
            ;
            var args = {};
            args[Protocol.game_guild_upgradeSkill.args.id] = "" + $data.godType + $data.attrType;
            // 技能升级请求
            PLC.request(Protocol.game_guild_upgradeSkill, args, function ($data, msg) {
                if (!$data) {
                    showToast(msg);
                    return;
                }
                for (var key in $data.modifyGuildSkillInfo) {
                    App.hero.guildSkillInfo[key] = $data.modifyGuildSkillInfo[key];
                }
                game.GuildSkillModel.getInstance().updateSkillData();
                // 更新界面
                if (UIMgr.getUIByName(UIConst.GuildSkillView)) {
                    var guildSkillView = UIMgr.getUIByName(UIConst.GuildSkillView);
                    guildSkillView.updateView();
                }
            });
        };
        /** 公会技能重置 */
        GuildSkillProcessor.prototype.skillReset = function () {
            //判断钻石是否足够
            var costAry = tb.TB_guild_set.getSet().resetskill_cost;
            if (UIUtil.checkNotEnough(costAry[0][0], costAry[0][1])) {
                return;
            }
            var args = {};
            // 发送技能重置请求 
            PLC.request(Protocol.game_guild_resetSkill, args, function ($data, msg) {
                if (!$data)
                    return;
                App.hero.guildSkillInfo = {};
                game.GuildSkillModel.getInstance().updateSkillData();
                if (UIMgr.getUIByName(UIConst.GuildSkillView)) {
                    var guildSkillView = UIMgr.getUIByName(UIConst.GuildSkillView);
                    guildSkillView.updateView();
                }
            });
        };
        return GuildSkillProcessor;
    }(tl3d.Processor));
    game.GuildSkillProcessor = GuildSkillProcessor;
})(game || (game = {}));
