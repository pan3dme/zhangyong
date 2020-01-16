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
    var LimiteBuyProcessor = /** @class */ (function (_super) {
        __extends(LimiteBuyProcessor, _super);
        function LimiteBuyProcessor() {
            return _super.call(this) || this;
        }
        LimiteBuyProcessor.prototype.getName = function () {
            return "LimiteBuyProcessor";
        };
        LimiteBuyProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.LimiteBuyEvent(game.LimiteBuyEvent.SHOW_LIMITEBUY_VIEW),
                new game.LimiteBuyEvent(game.LimiteBuyEvent.LIMITESUMMON_BUY),
                new game.LimiteBuyEvent(game.LimiteBuyEvent.LIMITESUMMON_REWARD),
                new game.LimiteBuyEvent(game.LimiteBuyEvent.SHOW_RANK_VIEW),
                new game.LimiteBuyEvent(game.LimiteBuyEvent.LIMITEGROUP_BUY),
            ];
        };
        //处理事件
        LimiteBuyProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.LimiteBuyEvent) {
                switch ($event.type) {
                    case game.LimiteBuyEvent.SHOW_LIMITEBUY_VIEW:
                        this.showMainView();
                        break;
                    case game.LimiteBuyEvent.LIMITESUMMON_BUY:
                        this.limiteSummonBuy($event.data);
                        break;
                    case game.LimiteBuyEvent.LIMITEGROUP_BUY:
                        this.limiteGroupBuy($event.data);
                        break;
                    case game.LimiteBuyEvent.LIMITESUMMON_REWARD:
                        this.rewardBox($event.data);
                        break;
                    case game.LimiteBuyEvent.SHOW_RANK_VIEW:
                        this.showRankJiangliView($event.data);
                        break;
                }
            }
        };
        /** 打开限时购买主界面 */
        LimiteBuyProcessor.prototype.showMainView = function () {
            var model = game.LimiteBuyModel.getInstance();
            /** 判断两个活动是否在活动时间内 */
            var isOpenLimiteGroup = model.isOpenLimiteGroup();
            var isOpenLimiteSummon = model.isOpenLimiteSummon();
            if (isOpenLimiteGroup || isOpenLimiteSummon) {
                if (isOpenLimiteGroup) {
                    PLC.request(Protocol.game_activity_getGroupBuyInfo, null, function ($data) {
                        if (!$data)
                            return;
                        model.grpBuyTodayNums = $data.grpBuyTodayNums;
                        model.grpBuyTotalNums = $data.grpBuyTotalNums;
                        UIMgr.showUI(UIConst.LimiteBuyView);
                    });
                }
                else {
                    UIMgr.showUI(UIConst.LimiteBuyView);
                }
            }
            else {
                showToast(LanMgr.getLan('', 10223));
            }
        };
        /** 限时团购购买请求 */
        LimiteBuyProcessor.prototype.limiteGroupBuy = function (data) {
            //判断是否在活动时间内
            if (!data.isinTime()) {
                showToast(LanMgr.getLan('', 10224));
                return;
            }
            //判断今日可购买次数是否足够
            if (data.getRemainNum() <= 0) {
                showToast(LanMgr.getLan('', 10225));
                return;
            }
            //判断货币是否足够
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, data.getCurZheKouList()[0])) {
                return;
            }
            var model = game.LimiteBuyModel.getInstance();
            //服务端请求数据
            var args = {};
            args[Protocol.game_activity_groupBuy.args.tpltId] = data.tbGroup.ID;
            PLC.request(Protocol.game_activity_groupBuy, args, function ($data) {
                if (!$data)
                    return;
                for (var key in $data.grpBuyTodayNums) {
                    model.grpBuyTodayNums[key] = $data.grpBuyTodayNums[key];
                }
                for (var key in $data.grpBuyTotalNums) {
                    model.grpBuyTotalNums[key] = $data.grpBuyTotalNums[key];
                }
                //页面的更新
                var limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView);
                if (limiteBuyView) {
                    limiteBuyView.setViewGroupData(model.getCurGroupList());
                }
                UIUtil.showRewardView($data.commonData);
            });
        };
        /** 限时召唤购买请求 */
        LimiteBuyProcessor.prototype.limiteSummonBuy = function (data) {
            var model = game.LimiteBuyModel.getInstance();
            //判断是否在活动时间内
            if (!model.getCurSummonList().isinTime()) {
                showToast(LanMgr.getLan('', 10224));
                return;
            }
            //判断神灵数量是否超上限
            var num = data.num == 0 ? 1 : 10;
            if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= game.GodUtils.getGodsNum() + num) {
                var alertStr = LanMgr.getLan("", 10226);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: function () {
                        dispatchEvt(new game.FenjieEvent(game.FenjieEvent.SHOW_FENJIE_VIEW));
                        var limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView);
                        if (UIMgr.hasStage(UIConst.LimiteBuyView))
                            UIMgr.hideUIByName(UIConst.LimiteBuyView);
                    }
                });
                return;
            }
            //是否有免费次数
            if (!model.haveFreeTimes()) {
                //判断货币是否足够
                if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, model.getCurSummonList().getBuyCost()[data.num])) {
                    return;
                }
            }
            var args = {};
            args[Protocol.game_activity_summonBuy.args.type] = Number(data.summonId);
            PLC.request(Protocol.game_activity_summonBuy, args, function ($data) {
                if (!$data)
                    return;
                //页面的更新
                var limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView);
                if (limiteBuyView) {
                    limiteBuyView.setViewSummonData(model.getCurSummonList());
                    limiteBuyView.list_tab.refresh();
                }
                dispatchEvt(new game.LimiteBuyEvent(game.LimiteBuyEvent.UPDATE_RP));
                UIUtil.showRewardView($data.commonData);
            });
        };
        /** 限时召唤领取宝箱请求 */
        LimiteBuyProcessor.prototype.rewardBox = function (data) {
            var args = {};
            args[Protocol.game_activity_getSummonChests.args.id] = data;
            PLC.request(Protocol.game_activity_getSummonChests, args, function ($data) {
                if (!$data)
                    return;
                UIUtil.showRewardView($data.commonData);
                //页面的更新
                var limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView);
                if (limiteBuyView) {
                    limiteBuyView.setViewSummonData(game.LimiteBuyModel.getInstance().getCurSummonList());
                    limiteBuyView.list_tab.refresh();
                }
                dispatchEvt(new game.LimiteBuyEvent(game.LimiteBuyEvent.UPDATE_RP));
            });
        };
        /** 限时召唤排名奖励界面 */
        LimiteBuyProcessor.prototype.showRankJiangliView = function (data) {
            UIMgr.showUI(UIConst.Lim_JiangLiView, data);
        };
        return LimiteBuyProcessor;
    }(tl3d.Processor));
    game.LimiteBuyProcessor = LimiteBuyProcessor;
})(game || (game = {}));
