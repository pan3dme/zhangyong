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
    var DailyCopyProcessor = /** @class */ (function (_super) {
        __extends(DailyCopyProcessor, _super);
        function DailyCopyProcessor() {
            return _super.call(this) || this;
        }
        DailyCopyProcessor.prototype.getName = function () {
            return "DailyCopyProcessor";
        };
        DailyCopyProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.DailyEvent(game.DailyEvent.SHOW_DAILY_COPY_VIEW),
                new game.DailyEvent(game.DailyEvent.CHALLENGE_BOSS),
                new game.DailyEvent(game.DailyEvent.CHALLENGE_BOSS_AGAIN),
                new game.DailyEvent(game.DailyEvent.SHOW_BUY_VIEW),
                new game.DailyEvent(game.DailyEvent.BUY_DAILY_COPY_COUNT),
            ];
        };
        //处理事件
        DailyCopyProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.DailyEvent) {
                switch ($event.type) {
                    case game.DailyEvent.SHOW_DAILY_COPY_VIEW:
                        this.showMainView($event.data);
                        break;
                    case game.DailyEvent.CHALLENGE_BOSS:
                    case game.DailyEvent.CHALLENGE_BOSS_AGAIN:
                        this.challengeBoss($event.data);
                        break;
                    case game.DailyEvent.SHOW_BUY_VIEW:
                        this.showBuyView($event.data);
                        break;
                    case game.DailyEvent.BUY_DAILY_COPY_COUNT:
                        // this.buyCount($event.data);
                        break;
                }
            }
        };
        /** 打开界面 */
        DailyCopyProcessor.prototype.showMainView = function (data) {
            UIMgr.showUI(UIConst.Copy_DailyMainView, data);
        };
        /** 挑战 */
        DailyCopyProcessor.prototype.challengeBoss = function (dailyVo) {
            var _this = this;
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (dailyVo.isLvLimit()) {
                showToast(LanMgr.getLan('', 10104));
                return;
            }
            var count = App.hero.getOverplusValue(dailyVo.getOverplusType());
            if (count <= 0) {
                // showToast(LanMgr.getLan('', 10105));
                // dispatchEvt(new DailyEvent(DailyEvent.SHOW_BUY_VIEW, dailyVo.type));
                if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, game.DailyCopyModel.getInstance().getBuyCost(dailyVo.getLimitType()))) {
                    showToast(LanMgr.getLan('', 10105));
                    return;
                }
                var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum);
                var count_1 = total - App.hero.getlimitValue(dailyVo.getLimitType());
                if (count_1 <= 0) {
                    if (App.hero.vip < tb.TB_vip.getMaxVip()) {
                        showToast(LanMgr.getLan('', 10082));
                    }
                    else {
                        showToast(LanMgr.getLan('', 10260));
                    }
                    return;
                }
            }
            // 扣除次数
            if (App.hero.isPassDailyCopy(dailyVo.tbCopy.ID)) {
                //扫荡
                var arg = {};
                arg[Protocol.game_copy_dailyCopySweep.args.copyId] = dailyVo.tbCopy.ID;
                arg[Protocol.game_copy_dailyCopySweep.args.num] = 1;
                PLC.request(Protocol.game_copy_dailyCopySweep, arg, function ($data) {
                    if (!$data)
                        return;
                    if (_this.dailyCopyView) {
                        _this.dailyCopyView.updateView();
                    }
                    UIUtil.showRewardView($data.commonData);
                    // this.doFight(dailyVo);
                });
            }
            else {
                this.doFight(dailyVo);
            }
        };
        DailyCopyProcessor.prototype.doFight = function (dailyVo) {
            var _this = this;
            var vo = new game.FightVo;
            vo.copyType = CopyType.dailycopy;
            vo.dailyCopyInfo = dailyVo;
            var battleScene = new battle.BattleScenePve(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, vo.getAllRound(), vo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.NewClientPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            page.defType = iface.tb_prop.battleObjTypeKey.monster;
            vo.fightPageControl = page;
            var arg = {};
            arg[Protocol.game_copy_dailyCopyBattle.args.copyId] = dailyVo.tbCopy.ID;
            arg[Protocol.game_copy_dailyCopyBattle.args.isWin] = isWin;
            PLC.request(Protocol.game_copy_dailyCopyBattle, arg, function ($data, msg) {
                if (!$data)
                    return;
                vo.resultData = $data;
                if (_this.dailyCopyView) {
                    _this.dailyCopyView.updateView();
                }
                var enterVo = { vo: vo, event: new game.DailyEvent(game.DailyEvent.SHOW_DAILY_COPY_VIEW), eventdata: dailyVo.getCopyType() };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        // /** 展示购买界面 */
        // private showBuyView(copyType: number): void {
        //     UIMgr.showUI(UIConst.Copy_DailyBuyView, copyType);
        // }
        /** 购买次数 */
        DailyCopyProcessor.prototype.showBuyView = function (copyType) {
            var _this = this;
            var model = game.DailyCopyModel.getInstance();
            var limitType = model.getLimitType(copyType);
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, model.getBuyCost(limitType))) {
                showToast(LanMgr.getLan('', 10105));
                return;
            }
            var total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum);
            var count = total - App.hero.getlimitValue(limitType);
            if (count <= 0) {
                if (App.hero.vip < tb.TB_vip.getMaxVip()) {
                    showToast(LanMgr.getLan('', 10082));
                }
                else {
                    showToast(LanMgr.getLan('', 10260));
                }
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {
                type: model.getBuyBattleType(copyType), callback: function (num) {
                    var args = {};
                    args[Protocol.game_common_buyDailyCopyBattleCnt.args.type] = copyType;
                    args[Protocol.game_common_buyDailyCopyBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_common_buyDailyCopyBattleCnt, args, function ($data) {
                        if (!$data)
                            return;
                        if (_this.dailyCopyView) {
                            _this.dailyCopyView.updateView();
                        }
                        UIMgr.hideUIByName(UIConst.Copy_DailyBuyView);
                    });
                }
            });
        };
        Object.defineProperty(DailyCopyProcessor.prototype, "dailyCopyView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.Copy_DailyView);
            },
            enumerable: true,
            configurable: true
        });
        return DailyCopyProcessor;
    }(tl3d.Processor));
    game.DailyCopyProcessor = DailyCopyProcessor;
})(game || (game = {}));
