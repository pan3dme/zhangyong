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
    var BossProcessor = /** @class */ (function (_super) {
        __extends(BossProcessor, _super);
        function BossProcessor() {
            return _super.call(this) || this;
        }
        BossProcessor.prototype.getName = function () {
            return "BossProcessor";
        };
        BossProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.BossEvent(game.BossEvent.SHOW_BOSS_VIEW),
                new game.BossEvent(game.BossEvent.SHOW_RANK_VIEW),
                new game.BossEvent(game.BossEvent.SHOW_REWARD_VIEW),
                new game.BossEvent(game.BossEvent.SHOW_RULE_VIEW),
                new game.BossEvent(game.BossEvent.SHOW_BUY_VIEW),
                new game.BossEvent(game.BossEvent.CHALLENGE_BOSS),
            ];
        };
        //处理事件
        BossProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.BossEvent) {
                switch ($event.type) {
                    case game.BossEvent.SHOW_BOSS_VIEW:
                        this.showBossView($event.data);
                        break;
                    case game.BossEvent.SHOW_RANK_VIEW:
                        this.showRankView($event.data);
                        break;
                    case game.BossEvent.SHOW_REWARD_VIEW:
                        this.showRewardView($event.data);
                        break;
                    case game.BossEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case game.BossEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case game.BossEvent.CHALLENGE_BOSS:
                        this.challengeBoss($event.data);
                        break;
                }
            }
        };
        /** 打开界面 */
        BossProcessor.prototype.showBossView = function (bossId) {
            PLC.request(Protocol.center_boss_getWorldBossInfo, null, function ($data) {
                game.BossModel.getInstance().updateBossInfo($data);
                UIMgr.showUI(UIConst.WorldBoss_BossView, bossId);
            });
        };
        /** 打开排行界面 */
        BossProcessor.prototype.showRankView = function (info) {
            if (info.svo.bossRankNum <= 0) {
                showToast(LanMgr.getLan('', 10147));
                return;
            }
            UIMgr.showUI(UIConst.WorldBoss_RankView, info);
        };
        BossProcessor.prototype.showRewardView = function (info) {
            if (info) {
                UIMgr.showUI(UIConst.WorldBoss_RewardView, info);
            }
        };
        /** 打开规则界面 */
        BossProcessor.prototype.showRuleView = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20008));
        };
        /** 展示挑战次数购买界面 */
        BossProcessor.prototype.showBuyView = function () {
            var _this = this;
            if (!UIUtil.checkLimitEnough(iface.tb_prop.limitTypeKey.buyWorldBossNum, iface.tb_prop.vipPrivilegeTypeKey.worldBossNum)) {
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {
                type: common.BuyBattleCountView.TYPE_BOSS, callback: function (num) {
                    var arg = {};
                    arg[Protocol.game_common_buyWorldBossBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_common_buyWorldBossBattleCnt, arg, function ($data) {
                        if (!$data)
                            return;
                        _this.newBossView.updateCount();
                    });
                }
            });
        };
        /** 挑战boss */
        BossProcessor.prototype.challengeBoss = function (info) {
            var _this = this;
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (!info.isOpen()) {
                showToast(LanMgr.getLan('', 10035, info.tbBoss.level));
                return;
            }
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            if (count <= 0) {
                var num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyWorldBossNum);
                var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.worldBossNum);
                if (num < total) {
                    this.showBuyView();
                }
                showToast(LanMgr.getLan('', 10084));
                return;
            }
            if (info.isDead()) {
                var delTime = info.svo.bossReviveTime - App.serverTimeSecond;
                showToast(LanMgr.getLan('', 10101, Math.ceil(delTime / 60)));
                return;
            }
            var args = {};
            args[Protocol.center_boss_worldBossBattleStart.args.id] = info.tbBoss.ID;
            PLC.request(Protocol.center_boss_worldBossBattleStart, args, function ($data) {
                if (!$data)
                    return;
                game.BossModel.getInstance().updateBossInfo($data.WorldBossInfo);
                info.setRankList($data.damageRankInfo);
                if (_this.newBossView) {
                    _this.newBossView.updateCount();
                }
                _this.doFight(info, $data.bossRecords);
            });
        };
        BossProcessor.prototype.doFight = function (vo, bossRecords) {
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.worldboss;
            copyvo.worldBossInfo = vo;
            var battleScene = new battle.BattleScenePve(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
            //弹幕设置
            if (bossRecords && bossRecords instanceof Array) {
                var tempAry = [];
                for (var k = 0; k < bossRecords.length; k++) {
                    var vo_1 = bossRecords[k];
                    var barragevo = new BarrageVo();
                    barragevo.barrageText = LanMgr.getLan("", 12500, vo_1.name, vo_1.damage);
                    tempAry.push(barragevo);
                }
                copyvo.barrageList = tempAry;
            }
            var damage = 0;
            var objs = battleScene.getLossHpObj(battle.BatteConsts.BATTLE_CAMPDEF);
            for (var idx in objs) {
                damage += Number(objs[idx]);
            }
            vo.enemyLossHp = Math.floor(damage);
            loghgy('世界boss：', vo.tbBoss.ID, vo.tbMonster.ID, vo.getBossHp(), vo.getBossTotalHp(), isWin, "伤害：", vo.enemyLossHp);
            var arg = {};
            arg[Protocol.center_boss_worldBossBattleEnd.args.id] = vo.tbBoss.ID;
            arg[Protocol.center_boss_worldBossBattleEnd.args.damage] = vo.enemyLossHp;
            PLC.request(Protocol.center_boss_worldBossBattleEnd, arg, function ($data) {
                vo.battleEndData = $data ? $data : {};
                var bossInfo = $data.WorldBossBattleInfo;
                vo.battleEndData['rank'] = bossInfo ? bossInfo.myRank : 0;
                vo.battleEndData['totalDamage'] = bossInfo ? bossInfo.totalDamage : 0;
                var enterVo = { vo: copyvo, event: new game.BossEvent(game.BossEvent.SHOW_BOSS_VIEW), eventdata: vo.tbBoss.ID };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        Object.defineProperty(BossProcessor.prototype, "newBossView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.WorldBoss_BossView);
            },
            enumerable: true,
            configurable: true
        });
        return BossProcessor;
    }(tl3d.Processor));
    game.BossProcessor = BossProcessor;
})(game || (game = {}));
