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
    var GuildHelpProcessor = /** @class */ (function (_super) {
        __extends(GuildHelpProcessor, _super);
        function GuildHelpProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.GuildHelpModel.getInstance();
            return _this;
        }
        GuildHelpProcessor.prototype.getName = function () {
            return "GuildHelpProcessor";
        };
        GuildHelpProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.SHOW_ASK_HELP_VIEW),
                new game.GuildEvent(game.GuildEvent.REWARD_HELPED_ITEM),
                new game.GuildEvent(game.GuildEvent.HELP_CLICK_BAOXIANG),
                new game.GuildEvent(game.GuildEvent.SEND_CHAT_HELP),
                new game.GuildEvent(game.GuildEvent.SEND_ASK_HELP),
                new game.GuildEvent(game.GuildEvent.HELP_OTHERS),
            ];
        };
        //处理事件
        GuildHelpProcessor.prototype.receivedModuleEvent = function (event) {
            if (event instanceof game.GuildEvent) {
                switch (event.type) {
                    case game.GuildEvent.SHOW_ASK_HELP_VIEW:
                        this.showAskHelpView(event.data);
                        break;
                    case game.GuildEvent.REWARD_HELPED_ITEM:
                        this.rewardHelpedItem(event.data);
                        break;
                    case game.GuildEvent.HELP_CLICK_BAOXIANG:
                        this.onClickBX();
                        break;
                    case game.GuildEvent.SEND_CHAT_HELP:
                        this.sendChatHelp();
                        break;
                    case game.GuildEvent.SEND_ASK_HELP:
                        this.sendAskHelp(event.data);
                        break;
                    case game.GuildEvent.HELP_OTHERS:
                        this.helpOthers(event.data);
                        break;
                }
            }
        };
        /** 打开求援界面 */
        GuildHelpProcessor.prototype.showAskHelpView = function (info) {
            UIMgr.showUI(UIConst.GuildAskHelpView, info);
        };
        /** 领取被帮助物品 */
        GuildHelpProcessor.prototype.rewardHelpedItem = function (info) {
            var _this = this;
            if (!info.isCanReward()) {
                showToast(LanMgr.getLan('', 10413));
                return;
            }
            var args = {};
            args[Protocol.guild_guildHelp_getGuildHelpNum.args.id] = info.svo.helpId;
            PLC.request(Protocol.guild_guildHelp_getGuildHelpNum, args, function (data) {
                if (!data) {
                    return;
                }
                _this._model.updateHelpAwardNum(info, data['guildHelpInfo']);
                var view = UIMgr.getUIByName(UIConst.GuildHelpView);
                view.updateMyListSimple();
                view.updateBaoxiangState();
                UIUtil.showRewardView(data['commonData']);
                dispatchEvt(new game.GuildEvent(game.GuildEvent.REWARD_HELPED_ITEM_SUCC));
            });
        };
        /** 点击宝箱 */
        GuildHelpProcessor.prototype.onClickBX = function () {
            var model = this._model;
            if (model.isCanRewardBX()) {
                PLC.request(Protocol.guild_guildHelp_getGuildHelpAward, null, function (data) {
                    if (!data) {
                        return;
                    }
                    var view = UIMgr.getUIByName(UIConst.GuildHelpView);
                    view.updateBaoxiangState();
                    UIUtil.showRewardView(data['commonData']);
                });
            }
            else {
                var reward = tb.TB_guild_set.getSet().help_box;
                var list = reward.map(function (ary) {
                    return new ItemVo(ary[0], ary[1]);
                });
                UIMgr.showUI(UIConst.ManyItemsTip, { data: list });
            }
        };
        /** 聊天公会频道发送求助 */
        GuildHelpProcessor.prototype.sendChatHelp = function () {
            if (this._model.getAskHelpNum() <= 0 || this._model.isAllFinish()) {
                showToast(LanMgr.getLan('', 10414));
                return;
            }
            if (App.serverTimeSecond < App.hero.guildHelpEndTime) {
                showToast(LanMgr.getLan('', 10415));
                return;
            }
            PLC.request(Protocol.game_guild_sendGuildHelpNotice, null, function (data) {
                if (!data) {
                    return;
                }
                showToast(LanMgr.getLan('', 10416));
                App.hero.guildHelpEndTime = data["guildHelpEndTime"] || 0;
            });
        };
        /** 求援 */
        GuildHelpProcessor.prototype.sendAskHelp = function (ary) {
            var _this = this;
            var pos = ary[0];
            var info = ary[1];
            var selectIdx = ary[2] ? 1 : 0;
            if (this._model.isExistHelp(info.ID)) {
                showToast(LanMgr.getLan('', 10417));
                return;
            }
            var args = {};
            args[Protocol.guild_guildHelp_createGuildHelp.args.type] = info.ID;
            args[Protocol.guild_guildHelp_createGuildHelp.args.notice] = selectIdx;
            args[Protocol.guild_guildHelp_createGuildHelp.args.pos] = pos;
            PLC.request(Protocol.guild_guildHelp_createGuildHelp, args, function (data) {
                if (!data) {
                    return;
                }
                _this._model.addHelp(data['addGuildHelp']);
                UIMgr.hideUIByName(UIConst.GuildAskHelpView);
                var view = UIMgr.getUIByName(UIConst.GuildHelpView);
                view.updateMyListSimple();
                view.updateInterval();
                dispatchEvt(new game.GuildEvent(game.GuildEvent.SEND_ASK_HELP_SUCC));
            });
        };
        /** 援助其他人 */
        GuildHelpProcessor.prototype.helpOthers = function (info) {
            var model = this._model;
            if (info.isFinish()) {
                showToast(LanMgr.getLan('', 10418));
                return;
            }
            if (!model.isFreeHelp()) {
                if (model.isCostMax()) {
                    showToast(LanMgr.getLan('', 10419));
                    return;
                }
                else {
                    var cost = tb.TB_guild_set.getSet().help_cost;
                    for (var _i = 0, cost_1 = cost; _i < cost_1.length; _i++) {
                        var ary = cost_1[_i];
                        if (UIUtil.checkNotEnough(ary[0], ary[1])) {
                            return;
                        }
                    }
                }
            }
            var args = {};
            args[Protocol.game_guild_addGuildHelpNum.args.id] = info.svo.helpId;
            PLC.request(Protocol.game_guild_addGuildHelpNum, args, function (data) {
                if (!data)
                    return;
                UIUtil.showRewardView(data['commonData']);
                model.updateOthersNum(data['guildHelpInfo']);
                var view = UIMgr.getUIByName(UIConst.GuildHelpView);
                view.updateOtherHelpUI();
                dispatchEvt(new game.GuildEvent(game.GuildEvent.HELP_OTHERS_SUCC));
            });
        };
        return GuildHelpProcessor;
    }(tl3d.Processor));
    game.GuildHelpProcessor = GuildHelpProcessor;
})(game || (game = {}));
