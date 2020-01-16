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
    var FogForestProcessor = /** @class */ (function (_super) {
        __extends(FogForestProcessor, _super);
        function FogForestProcessor() {
            var _this = _super.call(this) || this;
            _this._model = game.FogForestModel.getInstance();
            return _this;
        }
        FogForestProcessor.prototype.getName = function () {
            return "FogForestProcessor";
        };
        FogForestProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.FogForestEvent(game.FogForestEvent.SHOW_MAIN_VIEW),
                new game.FogForestEvent(game.FogForestEvent.SHOW_REWARD_VIEW),
                new game.FogForestEvent(game.FogForestEvent.OPEN_BAOXIANG),
                new game.FogForestEvent(game.FogForestEvent.GUANQIA_CHALLENGE),
                new game.FogForestEvent(game.FogForestEvent.ONE_KEY_PASS),
                new game.FogForestEvent(game.FogForestEvent.UPDATE_VIEW),
            ];
        };
        //处理事件
        FogForestProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.FogForestEvent) {
                switch ($event.type) {
                    case game.FogForestEvent.SHOW_MAIN_VIEW:
                        this.showMainView();
                        break;
                    case game.FogForestEvent.SHOW_REWARD_VIEW:
                        this.showRewardView();
                        break;
                    case game.FogForestEvent.OPEN_BAOXIANG:
                        this.openBaoxiang($event.data);
                        break;
                    case game.FogForestEvent.GUANQIA_CHALLENGE:
                        this.challenge($event.data);
                        break;
                    case game.FogForestEvent.ONE_KEY_PASS:
                        this.oneKeyPass();
                        break;
                    case game.FogForestEvent.UPDATE_VIEW:
                        this._model.initNum();
                        this.initView();
                        break;
                }
            }
        };
        /** 打开界面 */
        FogForestProcessor.prototype.showMainView = function () {
            this._model.firstLogin = false;
            UIMgr.showUI(UIConst.FogForestView);
        };
        FogForestProcessor.prototype.showRewardView = function () {
            UIMgr.showUI(UIConst.FogForestRewardView);
        };
        /** 打开宝箱 */
        FogForestProcessor.prototype.openBaoxiang = function (itemRender) {
            var info = itemRender.dataSource;
            if (!info || !info.isCanReward()) {
                showToast(LanMgr.getLan('', 10317));
                return;
            }
            var args = {};
            args[Protocol.game_forest_getChestAward.args.floor] = info.tbForest.ID;
            PLC.request(Protocol.game_forest_getChestAward, args, function ($data) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                itemRender.refreshView();
                var fogForestView = UIMgr.getUIByName(UIConst.FogForestView);
                // if (fogForestView) fogForestView.refreshBaoxiang();
                var view = UIMgr.getUIByName(UIConst.FogForestRewardView);
                if (view)
                    view.initView();
                //为后面红点设置监听
                dispatchEvt(new game.FogForestEvent(game.FogForestEvent.RECEIVE_SUCCESS));
            });
        };
        /** 扫荡 */
        FogForestProcessor.prototype.oneKeyPass = function () {
            var _this = this;
            var model = this._model;
            /** 是否全部完成 */
            if (model.isMaxFloor()) {
                showToast(LanMgr.getLan('', 10185));
                return;
            }
            /** VIP是否能够开启扫荡迷雾森林 */
            var vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.forest);
            if (!(App.hero.vip >= vipPrivilege.vip_level || (vipPrivilege.para && App.hero.forestMaxFloor >= vipPrivilege.para))) {
                showToast(LanMgr.getLan("", 10318, vipPrivilege.para, vipPrivilege.vip_level));
                return;
            }
            /** 扫荡请求 */
            var args = {};
            PLC.request(Protocol.game_forest_sweepForest, args, function ($data) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                model.forestCurFloor = App.hero.forestMaxFloor;
                _this.initView();
                dispatchEvt(new game.FogForestEvent(game.FogForestEvent.ALL_PASS_SUCCESS));
            });
        };
        /** 挑战 */
        FogForestProcessor.prototype.challenge = function (info) {
            /** 是否全部完成 */
            if (this._model.isAllFinish()) {
                showToast(LanMgr.getLan('', 10185));
                return;
            }
            if (info.isPass()) {
                showToast(LanMgr.getLan('', 10319));
                return;
            }
            if (info.tbForest.need_power > App.hero.force) {
                showToast(LanMgr.getLan('', 10200, info.tbForest.need_power));
                return;
            }
            var vo = new game.FightVo;
            vo.copyType = CopyType.fogForest;
            vo.forestGuanqia = info;
            var battleScene = new battle.BattleScenePve(vo.copyType);
            battleScene.init([vo.getOwnTeam()], vo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, vo.getAllRound(), vo.getTeamHp());
            // vo.fightPageControl = new ClientPage();
            // vo.fightPageControl.initPage(battleScene);
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.NewClientPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            page.defType = iface.tb_prop.battleObjTypeKey.monster;
            vo.fightPageControl = page;
            var enterVo = { vo: vo, event: new game.FogForestEvent(game.FogForestEvent.SHOW_MAIN_VIEW) };
            dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
        };
        /** 初始化关卡数据 */
        FogForestProcessor.prototype.initView = function () {
            var fogForestView = UIMgr.getUIByName(UIConst.FogForestView);
            if (fogForestView)
                fogForestView.initView();
            if (UIMgr.hasStage(UIConst.SysTopView)) {
                var view = UIMgr.getUIByName(UIConst.SysTopView);
                view.updateFogforest();
            }
        };
        return FogForestProcessor;
    }(tl3d.Processor));
    game.FogForestProcessor = FogForestProcessor;
})(game || (game = {}));
