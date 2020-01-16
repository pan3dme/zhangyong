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
    var TowerProcessor = /** @class */ (function (_super) {
        __extends(TowerProcessor, _super);
        function TowerProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.TowerModel.getInstance();
            return _this;
        }
        TowerProcessor.prototype.getName = function () {
            return "TowerProcessor";
        };
        TowerProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.TowerEvent(game.TowerEvent.SHOW_SHILIANTA_PANEL),
                new game.TowerEvent(game.TowerEvent.PROGRESS_CHANGE),
                new game.TowerEvent(game.TowerEvent.CLICK_GUANQIA),
                new game.TowerEvent(game.TowerEvent.CHALLENGE_GUANQIA),
                new game.TowerEvent(game.TowerEvent.SHOW_TOWER_JIANGLI),
                new game.TowerEvent(game.TowerEvent.SHOW_TOWER_RANK),
                new game.TowerEvent(game.TowerEvent.LINGQU_BOSS_JIANGLI),
            ];
        };
        //处理事件
        TowerProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.TowerEvent) {
                switch ($event.type) {
                    case game.TowerEvent.SHOW_SHILIANTA_PANEL:
                        this.showView();
                        break;
                    case game.TowerEvent.PROGRESS_CHANGE:
                        this.renderGuanqia();
                        break;
                    case game.TowerEvent.CLICK_GUANQIA:
                        this.clickGuanqia($event.data);
                        break;
                    case game.TowerEvent.CHALLENGE_GUANQIA:
                        this.challengeGuanqia($event.data);
                        break;
                    case game.TowerEvent.SHOW_TOWER_JIANGLI:
                        this.towerJinagli($event.data);
                        break;
                    case game.TowerEvent.SHOW_TOWER_RANK:
                        this.towerRank($event.data);
                        break;
                    case game.TowerEvent.LINGQU_BOSS_JIANGLI:
                        this.bossJiangli($event.data);
                        break;
                }
            }
        };
        /** 展示试炼塔界面 */
        TowerProcessor.prototype.showView = function () {
            var vo = this._model.putongModel;
            var index = vo.isAllFinish() && !vo.isCanReward() ? 1 : 0;
            this._model.resetTowerData();
            UIMgr.showUI(UIConst.ShiliantaView, index);
        };
        /** 更新关卡 */
        TowerProcessor.prototype.renderGuanqia = function () {
            if (UIMgr.hasStage(UIConst.ShiliantaView)) {
                var view = UIMgr.getUIByName(UIConst.ShiliantaView);
                view.renderGuanqia();
            }
        };
        /** 点击关卡 */
        TowerProcessor.prototype.clickGuanqia = function (guanka) {
            if (guanka.isPass()) {
                showToast(LanMgr.getLan('', 10018));
                return;
            }
            if (!guanka.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            UIMgr.showUI(UIConst.SLT_GuanqiaView, guanka.tbCopyInfo);
        };
        /** 关卡挑战 */
        TowerProcessor.prototype.challengeGuanqia = function (tbCopyInfo) {
            var tbCopy = tb.TB_copy.get_TB_copyById(tbCopyInfo.area);
            var guanka = this._model.getGuanqiaModelVo(tbCopy.sub_type).getGuanqiaVo(tbCopyInfo.ID);
            var power = tbCopyInfo.getConditionVal(CopyConditionType.power);
            if (App.hero.force < power) {
                showToast(LanMgr.getLan('', 10462, power));
                return;
            }
            if (guanka.isPass()) {
                showToast(LanMgr.getLan('', 10018));
                return;
            }
            if (!guanka.isCurrent()) {
                showToast(LanMgr.getLan('', 10014));
                return;
            }
            var modelVo = this._model.getGuanqiaModelVo(guanka.tbCopy.sub_type);
            if (modelVo.isCanReward()) {
                showToast(LanMgr.getLan('', 10032));
                return;
            }
            if (App.hero.level < guanka.getOpenLevel()) {
                showToast(LanMgr.getLan('', 10463, guanka.getOpenLevel()));
                return;
            }
            //开始战斗            
            var vo = new game.FightVo;
            vo.copyType = iface.tb_prop.copyTypeKey.tower;
            vo.tab_copyinfo = guanka.tbCopyInfo;
            vo.tab_copy = tb.TB_copy.get_TB_copyById(vo.tab_copyinfo.area);
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
            arg[Protocol.game_copy_settleTowerCopy.args.copyId] = tbCopyInfo.ID;
            arg[Protocol.game_copy_settleTowerCopy.args.isWin] = isWin;
            PLC.request(Protocol.game_copy_settleTowerCopy, arg, function ($data, $msg) {
                if (!$data)
                    return;
                vo.resultData = $data;
                var enterVo = { vo: vo, event: new game.TowerEvent(game.TowerEvent.SHOW_SHILIANTA_PANEL) };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        /** 试炼塔奖励 */
        TowerProcessor.prototype.towerJinagli = function (type) {
            if (!type)
                type = game.ShiliantaType.jiandan;
            UIMgr.showUI(UIConst.SLT_JiangliView, type);
        };
        /** 试炼塔排名 */
        TowerProcessor.prototype.towerRank = function (type) {
            var _this = this;
            var arg = {};
            arg[Protocol.game_rank_getRankList.args.rankType] = iface.tb_prop.rankTypeKey.towerCopyFloor;
            PLC.request(Protocol.game_rank_getRankList, arg, function (res) {
                if (res) {
                    _this._model.setRankList(res.rankList, res.myRank);
                }
                UIMgr.showUI(UIConst.SLT_RankView, _this._model.getRankListVo());
            });
        };
        /** 领取boss奖励 */
        TowerProcessor.prototype.bossJiangli = function (data) {
            if (!data.isBoss) {
                showToast(LanMgr.getLan('', 10034));
                return;
            }
            if (data.isReward()) {
                showToast(LanMgr.getLan('', 10033));
                return;
            }
            var arg = {};
            arg[Protocol.game_copy_getTowerAward.args.copyId] = data.tbCopyInfo.ID;
            PLC.request(Protocol.game_copy_getTowerAward, arg, function (res) {
                if (res) {
                    UIUtil.showRewardView(res.commonData);
                }
            });
        };
        return TowerProcessor;
    }(tl3d.Processor));
    game.TowerProcessor = TowerProcessor;
})(game || (game = {}));
