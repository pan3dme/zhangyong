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
    var GuildCopyProcessor = /** @class */ (function (_super) {
        __extends(GuildCopyProcessor, _super);
        function GuildCopyProcessor() {
            return _super.call(this) || this;
        }
        GuildCopyProcessor.prototype.getName = function () {
            return "GuildCopyProcessor";
        };
        GuildCopyProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.GuildEvent(game.GuildEvent.SHOW_COPY_RULE),
                new game.GuildEvent(game.GuildEvent.SHOW_COPY_RANK),
                new game.GuildEvent(game.GuildEvent.SHOW_ATKEND_RANK),
                new game.GuildEvent(game.GuildEvent.SHOW_COPY_TONGGUAN_REWARD),
                new game.GuildEvent(game.GuildEvent.SHOW_COPY_JISHA_REWARD),
                new game.GuildEvent(game.GuildEvent.SHOW_CHALLENGE_NUM_BUY),
                new game.GuildEvent(game.GuildEvent.GUANQIA_FIGHT),
                new game.GuildEvent(game.GuildEvent.RECEIVE_TONGGUAN_JIANGLI),
                new game.GuildEvent(game.GuildEvent.GUILD_COPY_SWEEP),
            ];
        };
        //处理事件
        GuildCopyProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.GuildEvent) {
                switch ($event.type) {
                    case game.GuildEvent.SHOW_COPY_RULE:
                        this.showRule();
                        break;
                    case game.GuildEvent.SHOW_COPY_RANK:
                        this.showRank($event.data);
                        break;
                    case game.GuildEvent.SHOW_ATKEND_RANK:
                        this.showAtkEndRank($event.data);
                        break;
                    case game.GuildEvent.SHOW_COPY_TONGGUAN_REWARD:
                        this.showTongguanReward($event.data);
                        break;
                    case game.GuildEvent.SHOW_COPY_JISHA_REWARD:
                        this.showJishaReward($event.data);
                        break;
                    case game.GuildEvent.SHOW_CHALLENGE_NUM_BUY:
                        this.showBuyNum();
                        break;
                    case game.GuildEvent.GUANQIA_FIGHT:
                        this.guanqiaFight($event.data);
                        break;
                    case game.GuildEvent.RECEIVE_TONGGUAN_JIANGLI:
                        this.receiveJiangli($event.data);
                        break;
                    case game.GuildEvent.GUILD_COPY_SWEEP:
                        this.guanqiaSweep($event.data);
                        break;
                }
            }
        };
        /** 展示副本规则 */
        GuildCopyProcessor.prototype.showRule = function () {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20002));
        };
        /** 展示副本排名 */
        GuildCopyProcessor.prototype.showRank = function (guanqia) {
            UIMgr.showUI(UIConst.DamageRankView, guanqia);
        };
        /** 展示击杀排名 */
        GuildCopyProcessor.prototype.showAtkEndRank = function (guanqia) {
            UIMgr.showUI(UIConst.AtkEndRankView, guanqia);
        };
        /** 展示副本奖励 */
        GuildCopyProcessor.prototype.showTongguanReward = function (guanqia) {
            var _this = this;
            if (UIMgr.hasStage(UIConst.TongguanJiangliView)) {
                this.jiangliView.refreshView();
            }
            else {
                UIMgr.showUI(UIConst.TongguanJiangliView, guanqia);
            }
            PLC.request(Protocol.guild_guildCopy_rewardInfo, null, function ($data) {
                if (!$data)
                    return;
                game.GuildCopyModel.getInstance().setAwardCount($data.awardCount);
                if (UIMgr.hasStage(UIConst.TongguanJiangliView)) {
                    _this.jiangliView.refreshView();
                }
            });
        };
        /** 展示关卡奖励界面 */
        GuildCopyProcessor.prototype.showJishaReward = function (vo) {
            UIMgr.showUI(UIConst.JishaJiangliView, vo);
        };
        /** 展示挑战次数购买界面 */
        GuildCopyProcessor.prototype.showBuyNum = function () {
            var _this = this;
            var num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
            if (num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)) {
                if (App.hero.vip < tb.TB_vip.getMaxVip()) {
                    showToast(LanMgr.getLan('', 10082));
                }
                else {
                    showToast(LanMgr.getLan("", 10401));
                }
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, { type: common.BuyBattleCountView.TYPE_GUILDCOPY, callback: function (num) {
                    var arg = {};
                    arg[Protocol.game_common_buyGuildCopyBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_common_buyGuildCopyBattleCnt, arg, function ($data) {
                        if (!$data)
                            return;
                        _this.copyView.updateCount();
                        if (UIMgr.hasStage(UIConst.GuildCopySweepResultView)) {
                            var sweepview = UIMgr.getUIByName(UIConst.GuildCopySweepResultView);
                            if (sweepview)
                                sweepview.updateCount();
                        }
                    });
                } });
            // let cost = HtmlUtil.convertHtmlText(`是否花费${GuildCopyModel.getInstance().getBuyCost()} <img style='padding:10px 3px 3px 3px;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img> 购买1次挑战次数`);
            // common.AlertBox.showAlert({
            //     text: cost, confirmCb: () => {
            //         PomeloClient.getInstance().request(Protocol.game_common_buyGuildCopyBattleCnt,null,($data)=>{
            // 			if (!$data) return;
            // 			this.copyView.updateCount();
            // 		});
            //     }, parm: null,yes:"购买"
            // });
        };
        /** 扫荡 */
        GuildCopyProcessor.prototype.guanqiaSweep = function (vo) {
            var _this = this;
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (vo.isPass()) {
                showToast(LanMgr.getLan('', 10083));
                return;
            }
            if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) <= 0) {
                var num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
                if (num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)) {
                    showToast(LanMgr.getLan('', 10084));
                    return;
                }
                else {
                    this.showBuyNum();
                    return;
                }
                // showToast(LanMgr.getLan('',10084));
                // return;
            }
            if (!vo.isKillMonsters(App.hero.playerId)) {
                showToast(LanMgr.getLan('', 10402));
                return;
            }
            common.AlertBox.showAlert({
                text: LanMgr.getLan("", 10510, App.hero.guildCopyMaxDmg[vo.tbCopy.ID]),
                confirmCb: function (cdata) {
                    var arg = {};
                    arg[Protocol.game_guildCopy_sweepGuildCopy.args.id] = cdata.tbCopy.ID;
                    PLC.request(Protocol.game_guildCopy_sweepGuildCopy, arg, function (sdata) {
                        if (!sdata)
                            return;
                        var guildInfo = game.GuildModel.getInstance().guildInfo;
                        if (guildInfo && sdata.hasOwnProperty("copyId") && sdata["copyId"]) {
                            guildInfo.copyId = sdata["copyId"];
                        }
                        _this.copyView.updateGuanQiaInfo(vo.guanqiaVo);
                        vo.battleEndData = sdata ? sdata : {};
                        vo.enemyLossHp = { 1: vo.getTotalDamage() - vo.svo.totalDamage };
                        vo.svo.totalDamage = vo.getTotalDamage();
                        if (UIMgr.hasStage(UIConst.GuildCopySweepResultView)) {
                            var sweepview = UIMgr.getUIByName(UIConst.GuildCopySweepResultView);
                            if (sweepview) {
                                sweepview.dataSource = vo;
                                sweepview.initView();
                            }
                        }
                        else {
                            UIMgr.showUI(UIConst.GuildCopySweepResultView, vo);
                        }
                    });
                }, parm: vo
            });
        };
        /** 挑战 */
        GuildCopyProcessor.prototype.guanqiaFight = function (vo) {
            var _this = this;
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (vo.isPass()) {
                showToast(LanMgr.getLan('', 10083));
                return;
            }
            if (App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.guildCopyNum) <= 0) {
                var num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
                if (num >= App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum)) {
                    showToast(LanMgr.getLan('', 10084));
                    return;
                }
                else {
                    this.showBuyNum();
                    return;
                }
                // showToast(LanMgr.getLan('',10084));
                // return;
            }
            var arg = {};
            arg[Protocol.guild_guildCopy_copyBattleStart.args.id] = vo.tbCopy.ID;
            PLC.request(Protocol.guild_guildCopy_copyBattleStart, arg, function ($data) {
                if (!$data) {
                    _this.copyView.grayGuanqia();
                    game.GuildModel.getInstance().checkGuildExist(true).then(function () {
                        showToast(LanMgr.getLan('', 10403));
                    });
                    return;
                }
                vo.svo.mosterInfo = $data['mosterInfo'];
                _this.doFight(vo);
            });
        };
        GuildCopyProcessor.prototype.doFight = function (vo) {
            var copyvo = new game.FightVo();
            copyvo.copyType = CopyType.guildCopy;
            copyvo.guildGuanqiaVo = vo;
            var battleScene = new battle.BattleScenePve(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            var page = new game.ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;
            vo.enemyLossHp = copyvo.turnTemplatID(battleScene.getLossHpObj(battle.BatteConsts.BATTLE_CAMPDEF));
            // loghgy('公会副本：',vo.svo.copyId,isSuccess,obj,copyvo);
            var arg = {};
            arg[Protocol.guild_guildCopy_copyBattleEnd.args.id] = vo.tbCopy.ID;
            arg[Protocol.guild_guildCopy_copyBattleEnd.args.damageInfo] = vo.enemyLossHp;
            PLC.request(Protocol.guild_guildCopy_copyBattleEnd, arg, function ($data) {
                if (!$data)
                    return;
                vo.battleEndData = $data ? $data : {};
                var enterVo = { vo: copyvo, event: new game.GuildEvent(game.GuildEvent.SHOW_GUILD_COPY_VIEW) };
                dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        };
        /** 领取通关奖励 */
        GuildCopyProcessor.prototype.receiveJiangli = function (vo) {
            var _this = this;
            if (!vo.isPass()) {
                showToast(LanMgr.getLan('', 10090));
                return;
            }
            if (vo.awardCount <= 0) {
                showToast(LanMgr.getLan('', 10091));
                return;
            }
            var arg = {};
            arg[Protocol.game_guild_getCopyReward.args.id] = vo.tbReward.ID;
            PLC.request(Protocol.game_guild_getCopyReward, arg, function ($data) {
                if ($data) {
                    App.hero.modifyCopyAwardCount($data);
                    game.GuildCopyModel.getInstance().setAwardCount($data.modifyAwardCount);
                    UIUtil.showRewardView($data.commonData);
                    _this.jiangliView.refreshView();
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.RECEIVE_JIANGLI_SUCCESS));
                }
                else {
                    // 领取次数更新重新请求
                    _this.showTongguanReward(null);
                }
            });
        };
        Object.defineProperty(GuildCopyProcessor.prototype, "jiangliView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.TongguanJiangliView);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuildCopyProcessor.prototype, "copyView", {
            get: function () {
                return UIMgr.getUIByName(UIConst.GuildCopyView);
            },
            enumerable: true,
            configurable: true
        });
        return GuildCopyProcessor;
    }(tl3d.Processor));
    game.GuildCopyProcessor = GuildCopyProcessor;
})(game || (game = {}));
