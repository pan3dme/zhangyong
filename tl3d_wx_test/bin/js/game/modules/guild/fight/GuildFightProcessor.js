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
    var GuildFightProcessor = /** @class */ (function (_super) {
        __extends(GuildFightProcessor, _super);
        function GuildFightProcessor() {
            return _super.call(this) || this;
        }
        GuildFightProcessor.prototype.getName = function () {
            return "GuildFightProcessor";
        };
        GuildFightProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.SHOW_FIGHT_RULE_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GRADE_CHEST_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_HONOR_HALL_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_PERSON_RANK_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_SEASON_AWARD_VIEW),
                new game.GuildEvent(game.GuildEvent.SHOW_GROUP_RANK_VIEW),
                new game.GuildEvent(game.GuildEvent.JOIN_FIGHT),
                new game.GuildEvent(game.GuildEvent.CHALLENGE_ENEMY),
                new game.GuildEvent(game.GuildEvent.UPDATE_MATCH_INFO),
            ];
        };
        //处理事件
        GuildFightProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GuildEvent) {
                switch ($event.type) {
                    case game.GuildEvent.SHOW_FIGHT_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case game.GuildEvent.SHOW_GRADE_CHEST_VIEW:
                        this.showChestView();
                        break;
                    case game.GuildEvent.SHOW_SEASON_AWARD_VIEW:
                        this.showSeasonAward();
                        break;
                    case game.GuildEvent.SHOW_HONOR_HALL_VIEW:
                        this.showHonorView();
                        break;
                    case game.GuildEvent.SHOW_PERSON_RANK_VIEW:
                        this.showPersonRank();
                        break;
                    case game.GuildEvent.SHOW_GROUP_RANK_VIEW:
                        this.showGroupRank();
                        break;
                    case game.GuildEvent.JOIN_FIGHT:
                        this.join();
                        break;
                    case game.GuildEvent.CHALLENGE_ENEMY:
                        this.challengeEnemy($event.data);
                        break;
                    case game.GuildEvent.UPDATE_MATCH_INFO:
                        this.updateView();
                        break;
                }
            }
        };
        /** 规则 */
        GuildFightProcessor.prototype.showRuleView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20013));
        };
        /** 段位宝箱 */
        GuildFightProcessor.prototype.showChestView = function () {
            UIMgr.showUI(UIConst.GradeChestView);
        };
        /** 赛季奖励 */
        GuildFightProcessor.prototype.showSeasonAward = function () {
            UIMgr.showUI(UIConst.SeasonAwardView);
        };
        /** 荣誉殿堂 */
        GuildFightProcessor.prototype.showHonorView = function () {
            UIMgr.showUI(UIConst.HonorHallView);
        };
        /** 个人排名 */
        GuildFightProcessor.prototype.showPersonRank = function () {
            UIMgr.showUI(UIConst.PersonRankView);
        };
        /** 赛区排名 */
        GuildFightProcessor.prototype.showGroupRank = function () {
            UIMgr.showUI(UIConst.GroupRankView);
        };
        /** 报名 */
        GuildFightProcessor.prototype.join = function () {
            var _this = this;
            if (game.GuildModel.getInstance().guildInfo.job != iface.tb_prop.guildJobTypeKey.president) {
                showToast(LanMgr.getLan("", 10393));
                return;
            }
            var curDate = new Date(App.serverTime);
            var week = curDate.getDay();
            if (week == WeekNum.Sat) {
                showToast(LanMgr.getLan("", 10394));
                return;
            }
            PLC.request(Protocol.guild_guildWar_guildWarReg, null, function ($data) {
                if (!$data)
                    return;
                game.GuildFightModel.getInstance().updateSeason($data);
                if (UIMgr.hasStage(UIConst.FightWaitView)) {
                    _this.fightWaitView.initView();
                }
                dispatchEvt(new game.GuildEvent(game.GuildEvent.JOIN_FIGHT_SUCCESS));
            });
        };
        /** 挑战对手 */
        GuildFightProcessor.prototype.challengeEnemy = function (info) {
            var _this = this;
            var self = game.GuildFightModel.getInstance().myTeamVo.getMember(App.hero.playerId);
            if (!self) {
                showToast(LanMgr.getLan("", 10395));
                return;
            }
            if (self.svo.atkCount <= 0) {
                showToast(LanMgr.getLan("", 10396));
                return;
            }
            if (info.isDead()) {
                showToast(LanMgr.getLan("", 10397));
                return;
            }
            var args = {};
            args[Protocol.guild_guildWar_guildWarBattleStart.args.playerId] = info.svo.playerId;
            PLC.request(Protocol.guild_guildWar_guildWarBattleStart, args, function ($data) {
                var model = game.GuildFightModel.getInstance();
                if (!$data) {
                    model.setMatchInfo($data);
                    return;
                }
                model.setMatchInfo($data);
                _this.doFight(info);
            });
        };
        GuildFightProcessor.prototype.doFight = function (dataVo) {
            var info = game.GuildFightMemberVo.copy(dataVo);
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.guildFight;
            copyvo.guildMemberVo = info;
            var battleScene = new battle.BattleScenePvp(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
            var enemyHpObj = copyvo.turnTemplatID(battleScene.getLossHpObj(battle.BatteConsts.BATTLE_CAMPDEF));
            var args = {};
            args[Protocol.guild_guildWar_guildWarBattleEnd.args.hpInfo] = isWin ? null : info.getEnemyHpInfo(enemyHpObj);
            args[Protocol.guild_guildWar_guildWarBattleEnd.args.playerId] = info.svo.playerId;
            loghgy('工会战战果：', copyvo.guildMemberVo, enemyHpObj, args);
            PLC.request(Protocol.guild_guildWar_guildWarBattleEnd, args, function ($data) {
                if (!$data)
                    return;
                var enterVo = { vo: copyvo, event: new game.GuildEvent(game.GuildEvent.SHOW_GUILD_BATTLE_VIEW), responseData: $data };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        GuildFightProcessor.prototype.updateView = function () {
            if (UIMgr.hasStage(UIConst.FightMainView)) {
                this.fightMainView.updateView();
            }
        };
        Object.defineProperty(GuildFightProcessor.prototype, "fightMainView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.FightMainView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuildFightProcessor.prototype, "fightWaitView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.FightWaitView);
            },
            enumerable: true,
            configurable: true
        });
        return GuildFightProcessor;
    }(tl3d.Processor));
    game.GuildFightProcessor = GuildFightProcessor;
})(game || (game = {}));
