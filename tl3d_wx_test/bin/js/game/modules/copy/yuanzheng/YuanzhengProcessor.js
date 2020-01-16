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
    var YuanzhengProcessor = /** @class */ (function (_super) {
        __extends(YuanzhengProcessor, _super);
        function YuanzhengProcessor() {
            return _super.call(this) || this;
        }
        YuanzhengProcessor.prototype.getName = function () {
            return "YuanzhengProcessor";
        };
        YuanzhengProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_MAIN_VIEW),
                new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_RECOVERY_VIEW),
                new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_CHALLENGE_VIEW),
                new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_SHOP_VIEW),
                new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_HELP_VIEW),
                new game.YuanzhengEvent(game.YuanzhengEvent.GOTO_SET_LINUEP),
                new game.YuanzhengEvent(game.YuanzhengEvent.GUANQIA_CHALLENGE),
                new game.YuanzhengEvent(game.YuanzhengEvent.GUANQIA_REWARD),
                new game.YuanzhengEvent(game.YuanzhengEvent.RECOVERY_GOD),
                new game.YuanzhengEvent(game.YuanzhengEvent.UPDATE_VIEW),
            ];
        };
        //处理事件
        YuanzhengProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.YuanzhengEvent) {
                switch ($event.type) {
                    case game.YuanzhengEvent.SHOW_MAIN_VIEW:
                        this.showMainView();
                        break;
                    case game.YuanzhengEvent.SHOW_RECOVERY_VIEW:
                        this.showRecoveryView($event.data);
                        break;
                    case game.YuanzhengEvent.SHOW_CHALLENGE_VIEW:
                        this.showChallengeView($event.data);
                        break;
                    case game.YuanzhengEvent.SHOW_SHOP_VIEW:
                        this.showShopView($event.data);
                        break;
                    case game.YuanzhengEvent.SHOW_HELP_VIEW:
                        this.showHelpView();
                        break;
                    case game.YuanzhengEvent.GOTO_SET_LINUEP:
                        this.gotoBuzhen($event.data);
                        break;
                    case game.YuanzhengEvent.GUANQIA_CHALLENGE:
                        this.challengeGuanqia();
                        break;
                    case game.YuanzhengEvent.GUANQIA_REWARD:
                        this.rewardGuanqia($event.data);
                        break;
                    case game.YuanzhengEvent.RECOVERY_GOD:
                        this.recoveryGod($event.data);
                        break;
                    case game.YuanzhengEvent.UPDATE_VIEW:
                        this.updateView();
                        break;
                }
            }
        };
        YuanzhengProcessor.prototype.updateView = function () {
            if (UIMgr.hasStage(UIConst.YuanzhengView)) {
                var view = UIMgr.getUIByName(UIConst.YuanzhengView);
                view.initView();
            }
        };
        /** 打开界面 */
        YuanzhengProcessor.prototype.showMainView = function () {
            UIMgr.showUI(UIConst.YuanzhengView);
        };
        /** 展示关卡挑战信息界面 */
        YuanzhengProcessor.prototype.showChallengeView = function (info) {
            if (info.isPass()) {
                showToast(LanMgr.getLan('', 10107));
                return;
            }
            if (!info.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            var model = game.YuanzhengModel.getInstance();
            var challengeVo = model.curChallengeVo;
            if (challengeVo.guanqiaVo != info) {
                logwarn('数据不匹配,不是当前挑战关卡');
                return;
            }
            PLC.request(Protocol.game_expedition_getChallengerInfo, null, function ($data) {
                if (!$data)
                    return;
                model.updateData($data.challengerInfo);
                UIMgr.showUI(UIConst.Yuanzheng_ChallengeView, challengeVo);
            });
        };
        /** 展示回复血量或者复活界面 */
        YuanzhengProcessor.prototype.showRecoveryView = function (type) {
            var list = game.YuanzhengModel.getInstance().getGodsByRecoveryType(type);
            if (list.length <= 0) {
                showToast(LanMgr.getLan('', (type == iface.tb_prop.expeditionOpTypeKey.recover ? 10127 : 10128)));
                return;
            }
            UIMgr.showUI(UIConst.Yuanzheng_RecoveryView, type);
        };
        /** 展示商店界面 */
        YuanzhengProcessor.prototype.showShopView = function (type) {
            dispatchEvt(new game.ShopEvent(game.ShopEvent.SHOW_SHOP_VIEW), ShopType.yuanzheng);
        };
        /** 展示援助界面 */
        YuanzhengProcessor.prototype.showHelpView = function () {
            UIMgr.showUI(UIConst.Yuanzheng_HelpView);
        };
        /** 前往布阵 */
        YuanzhengProcessor.prototype.gotoBuzhen = function (info) {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), iface.tb_prop.lineupTypeKey.expedition);
        };
        /** 关卡挑战 */
        YuanzhengProcessor.prototype.challengeGuanqia = function () {
            if (UIUtil.checkUnableToEnterFight(iface.tb_prop.lineupTypeKey.expedition)) {
                return;
            }
            var vo = new game.FightVo;
            vo.copyType = CopyType.yuanzhenCopy;
            vo.yuanzhengCopyVo = game.YuanzhengModel.getInstance().curChallengeVo;
            var battleScene = new battle.BattleScenePvp(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.god, vo.getAllRound(), vo.getTeamHp());
            // vo.fightPageControl = new ClientPage();
            // vo.fightPageControl.initPage(battleScene);
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.NewClientPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            page.defType = iface.tb_prop.battleObjTypeKey.god;
            vo.fightPageControl = page;
            vo.fightPageControl.lossHpObj = battleScene.getLossHpObj();
            vo.fightPageControl.maxHpObj = battleScene.getMaxHpObj();
            var enterVo = { vo: vo, event: new game.YuanzhengEvent(game.YuanzhengEvent.SHOW_MAIN_VIEW) };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        /** 领取关卡奖励 */
        YuanzhengProcessor.prototype.rewardGuanqia = function (itemRender) {
            var info = itemRender.dataSource;
            if (!info)
                return;
            if (info.isCanReward()) {
                var args = {};
                args[Protocol.game_expedition_getBoxReward.args.id] = info.tbCopy.ID;
                PLC.request(Protocol.game_expedition_getBoxReward, args, function ($data) {
                    if (!$data)
                        return;
                    App.hero.updateCopyInfo($data);
                    UIUtil.showRewardView($data.commonData);
                    itemRender.refreshView();
                });
            }
            else {
                UIMgr.showUI(UIConst.ManyItemsTip, { data: info.tbCopy.getBoxRewardList() });
            }
        };
        /** 回复血量或复活英雄 */
        YuanzhengProcessor.prototype.recoveryGod = function (info) {
            var _this = this;
            var model = game.YuanzhengModel.getInstance();
            var type = info.type;
            var godVo = info.godVo;
            if (type == iface.tb_prop.expeditionOpTypeKey.recover && App.hero.getBagItemNum(CostTypeKey.huifu_yaoshui) <= 0) {
                var cost = LanMgr.getLan("", 10307, model.getMedicineCost(CostTypeKey.huifu_yaoshui)) + ("<img style='padding:10px 3px 3px 3px;' src='" + SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond) + "' ></img>") + LanMgr.getLan("", 10498);
                common.AlertBox.showAlert({
                    text: cost, confirmCb: function () {
                        _this.buyYaoshui(info);
                    }, parm: null, yes: LanMgr.getLan("", 10499)
                });
                return;
            }
            else if (type == iface.tb_prop.expeditionOpTypeKey.revive && App.hero.getBagItemNum(CostTypeKey.fuhuo_yaoshui) <= 0) {
                var cost = LanMgr.getLan("", 10307, model.getMedicineCost(CostTypeKey.fuhuo_yaoshui)) + ("<img style='padding:10px 3px 3px 3px;' src='" + SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond) + "' ></img>") + LanMgr.getLan("", 10498);
                common.AlertBox.showAlert({
                    text: cost, confirmCb: function () {
                        _this.buyYaoshui(info);
                    }, parm: null, yes: LanMgr.getLan("", 10499)
                });
                return;
            }
            var args = {};
            args[Protocol.game_expedition_expeditionGodOperate.args.godId] = godVo.uuid;
            args[Protocol.game_expedition_expeditionGodOperate.args.opType] = type;
            PLC.request(Protocol.game_expedition_expeditionGodOperate, args, function ($data) {
                if (!$data)
                    return;
                showToast(LanMgr.getLan('', (type == iface.tb_prop.expeditionOpTypeKey.recover ? 10115 : 10116)));
                App.hero.updateCopyInfo($data);
                var view = UIMgr.getUIByName(UIConst.Yuanzheng_RecoveryView);
                if (view) {
                    view.delItem();
                }
            });
        };
        /** 购买药水 */
        YuanzhengProcessor.prototype.buyYaoshui = function (info) {
            var _this = this;
            var type = info.type;
            var godVo = info.godVo;
            var cost = game.YuanzhengModel.getInstance().getMedicineCost(type);
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, cost)) {
                return;
            }
            var itemId = type == iface.tb_prop.expeditionOpTypeKey.recover ? CostTypeKey.huifu_yaoshui : CostTypeKey.fuhuo_yaoshui;
            var args = {};
            args[Protocol.game_shop_specialItemBuy.args.id] = itemId;
            PLC.request(Protocol.game_shop_specialItemBuy, args, function ($data) {
                if (!$data)
                    return;
                _this.recoveryGod(info);
            });
        };
        Object.defineProperty(YuanzhengProcessor.prototype, "yuanzhengView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.YuanzhengView);
            },
            enumerable: true,
            configurable: true
        });
        return YuanzhengProcessor;
    }(tl3d.Processor));
    game.YuanzhengProcessor = YuanzhengProcessor;
})(game || (game = {}));
