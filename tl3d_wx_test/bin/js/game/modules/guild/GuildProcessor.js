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
    var GuildProcessor = /** @class */ (function (_super) {
        __extends(GuildProcessor, _super);
        function GuildProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.GuildModel.getInstance();
            return _this;
        }
        GuildProcessor.prototype.getName = function () {
            return "GuildProcessor";
        };
        GuildProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_PANEL),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_HALL_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_BATTLE_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_COPY_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_SKILL_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_DONATION_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_SHOP_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_INIT_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GUILD_HELP_VIEW),
            ];
        };
        //处理事件
        GuildProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.GuildEvent) {
                switch (event.type) {
                    case game.GuildEvent.SHOW_GUILD_PANEL:
                        this.showGuildPanel();
                        break;
                    case game.GuildEvent.SHOW_GUILD_HALL_VIEW:
                        this.showHallView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_SKILL_VIEW:
                        this.showSkillView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_COPY_VIEW:
                        this.showCopyView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_DONATION_VIEW:
                        this.showDonationView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_BATTLE_VIEW:
                        this.showBattleView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_SHOP_VIEW:
                        this.showShopView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_INIT_VIEW:
                        this.showInitView();
                        break;
                    case game.GuildEvent.SHOW_GUILD_HELP_VIEW:
                        this.showHelpView(event.data);
                        break;
                }
            }
        };
        /**公会界面 */
        GuildProcessor.prototype.showGuildPanel = function (callback) {
            var _this = this;
            var model = this._model;
            model.checkGuildExist(true)
                .then(function () {
                if (model.guildInfo) {
                    UIMgr.showUI(UIConst.GuildMainView);
                }
                else {
                    _this.showInitView();
                }
                if (callback) {
                    callback(model.guildInfo ? true : false);
                }
            });
        };
        /** 大厅 */
        GuildProcessor.prototype.showHallView = function () {
            UIMgr.showUI(UIConst.GuildInfoView);
        };
        /** 技能 */
        GuildProcessor.prototype.showSkillView = function () {
            UIMgr.showUI(UIConst.GuildSkillView);
            game.GuildSkillModel.getInstance().check = false;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_SKILL_SUCCESS));
        };
        /** 副本 */
        GuildProcessor.prototype.showCopyView = function () {
            var model = this._model;
            model.checkGuildExist(true)
                .then(function () {
                if (model.guildInfo) {
                    UIMgr.showUI(UIConst.GuildCopyView);
                }
                else {
                    UIMgr.showUI(UIConst.GuildinitView);
                }
            });
        };
        /** 打开捐献界面 */
        GuildProcessor.prototype.showDonationView = function () {
            UIMgr.showUI(UIConst.GuildDonationView);
        };
        /** 打开求援界面 */
        GuildProcessor.prototype.showHelpView = function (index) {
            if (UIMgr.hasStage(UIConst.GuildMainView)) {
                UIMgr.showUI(UIConst.GuildHelpView, index);
            }
            else {
                this.showGuildPanel(function (hasGuild) {
                    if (hasGuild) {
                        UIMgr.showUI(UIConst.GuildHelpView, index);
                    }
                });
            }
        };
        /** 公会战 */
        GuildProcessor.prototype.showBattleView = function () {
            var model = game.GuildFightModel.getInstance();
            if (model.openTime > App.serverTimeSecond) {
                var time = model.openTime - App.serverTimeSecond;
                var str = void 0;
                if (time > 86400) {
                    str = Math.ceil(time / 86400) + "天";
                }
                else if (time > 3600) {
                    str = Math.ceil(time / 3600) + "小时";
                }
                else {
                    str = Math.ceil(time / 86400) + "分钟";
                }
                showToast(LanMgr.getLan('', 10404, str));
                return;
            }
            // 请求赛季信息
            model.fightThreadVo.requestSeason().then(function () {
                if (model.isStart()) {
                    // 请求匹配信息
                    model.fightThreadVo.requestMatchInfo().then(function () {
                        if (model.matchType == 0) {
                            UIMgr.showUI(UIConst.FightMainView);
                        }
                        else {
                            UIMgr.showUI(UIConst.FightWaitView);
                        }
                    });
                }
                else {
                    UIMgr.showUI(UIConst.FightWaitView);
                }
            });
        };
        /** 商店 */
        GuildProcessor.prototype.showShopView = function () {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.guild);
        };
        /** 展示初始化界面 */
        GuildProcessor.prototype.showInitView = function () {
            UIMgr.showUI(UIConst.GuildinitView);
            UIMgr.hideUIByName(UIConst.GuildMainView);
            UIMgr.hideUIByName(UIConst.GuildInfoView);
            UIMgr.hideUIByName(UIConst.GuildCopyView);
            UIMgr.hideUIByName(UIConst.GuildDonationView);
            UIMgr.hideUIByName(UIConst.FightMainView);
            UIMgr.hideUIByName(UIConst.GuildSkillView);
        };
        return GuildProcessor;
    }(tl3d.Processor));
    game.GuildProcessor = GuildProcessor;
})(game || (game = {}));
