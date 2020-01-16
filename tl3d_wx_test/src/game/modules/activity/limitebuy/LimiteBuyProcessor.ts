
module game {
    export class LimiteBuyProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "LimiteBuyProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new LimiteBuyEvent(LimiteBuyEvent.SHOW_LIMITEBUY_VIEW),
                new LimiteBuyEvent(LimiteBuyEvent.LIMITESUMMON_BUY),
                new LimiteBuyEvent(LimiteBuyEvent.LIMITESUMMON_REWARD),
                new LimiteBuyEvent(LimiteBuyEvent.SHOW_RANK_VIEW),
                new LimiteBuyEvent(LimiteBuyEvent.LIMITEGROUP_BUY),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof LimiteBuyEvent) {
                switch ($event.type) {
                    case LimiteBuyEvent.SHOW_LIMITEBUY_VIEW:
                        this.showMainView();
                        break;
                    case LimiteBuyEvent.LIMITESUMMON_BUY:
                        this.limiteSummonBuy($event.data);
                        break;
                    case LimiteBuyEvent.LIMITEGROUP_BUY:
                        this.limiteGroupBuy($event.data);
                        break;
                    case LimiteBuyEvent.LIMITESUMMON_REWARD:
                        this.rewardBox($event.data);
                        break;
                    case LimiteBuyEvent.SHOW_RANK_VIEW:
                        this.showRankJiangliView($event.data);
                        break;
                }
            }
        }

        /** 打开限时购买主界面 */
        private showMainView(): void {
            let model = LimiteBuyModel.getInstance();
            /** 判断两个活动是否在活动时间内 */
            let isOpenLimiteGroup = model.isOpenLimiteGroup();
            let isOpenLimiteSummon = model.isOpenLimiteSummon();
            if (isOpenLimiteGroup || isOpenLimiteSummon) {
                if (isOpenLimiteGroup) {
                    PLC.request(Protocol.game_activity_getGroupBuyInfo, null, ($data: any) => {
                        if (!$data) return;
                        model.grpBuyTodayNums = $data.grpBuyTodayNums;
                        model.grpBuyTotalNums = $data.grpBuyTotalNums;
                        UIMgr.showUI(UIConst.LimiteBuyView);
                    });
                }else{
                    UIMgr.showUI(UIConst.LimiteBuyView);
                }
            } else {
                showToast(LanMgr.getLan('', 10223));
            }
        }

        /** 限时团购购买请求 */
        private limiteGroupBuy(data: limiteGroupVo): void {
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
            let model = LimiteBuyModel.getInstance();
            //服务端请求数据
            let args = {};
            args[Protocol.game_activity_groupBuy.args.tpltId] = data.tbGroup.ID;
            PLC.request(Protocol.game_activity_groupBuy, args, ($data: any) => {
                if (!$data) return;
                for (let key in $data.grpBuyTodayNums) {
                    model.grpBuyTodayNums[key] = $data.grpBuyTodayNums[key];
                }
                for (let key in $data.grpBuyTotalNums) {
                    model.grpBuyTotalNums[key] = $data.grpBuyTotalNums[key];
                }
                //页面的更新
                let limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView) as LimiteBuyView;
                if (limiteBuyView) {
                    limiteBuyView.setViewGroupData(model.getCurGroupList());
                }
                UIUtil.showRewardView($data.commonData);
            });
        }

        /** 限时召唤购买请求 */
        private limiteSummonBuy(data): void {
            let model = LimiteBuyModel.getInstance();
            //判断是否在活动时间内
            if (!model.getCurSummonList().isinTime()) {
                showToast(LanMgr.getLan('', 10224));
                return;
            }
            //判断神灵数量是否超上限
            let num = data.num == 0 ? 1 : 10;
            if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= GodUtils.getGodsNum() + num) {
                let alertStr = LanMgr.getLan("", 10226);
                common.AlertBox.showAlert({
                    text: alertStr, confirmCb: () => {
                        dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
                        let limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView) as LimiteBuyView;
                        if (UIMgr.hasStage(UIConst.LimiteBuyView)) UIMgr.hideUIByName(UIConst.LimiteBuyView);
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
            let args = {};
            args[Protocol.game_activity_summonBuy.args.type] = Number(data.summonId);
            PLC.request(Protocol.game_activity_summonBuy, args, ($data: any) => {
                if (!$data) return;
                //页面的更新
                let limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView) as LimiteBuyView;
                if (limiteBuyView) {
                    limiteBuyView.setViewSummonData(model.getCurSummonList());
                    limiteBuyView.list_tab.refresh();
                }
                dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.UPDATE_RP));
                UIUtil.showRewardView($data.commonData);
            });
        }

        /** 限时召唤领取宝箱请求 */
        private rewardBox(data): void {
            let args = {};
            args[Protocol.game_activity_getSummonChests.args.id] = data;
            PLC.request(Protocol.game_activity_getSummonChests, args, ($data: any) => {
                if (!$data) return;
                UIUtil.showRewardView($data.commonData);
                //页面的更新
                let limiteBuyView = UIMgr.getUIByName(UIConst.LimiteBuyView) as LimiteBuyView;
                if (limiteBuyView) {
                    limiteBuyView.setViewSummonData(LimiteBuyModel.getInstance().getCurSummonList());
                    limiteBuyView.list_tab.refresh();
                }
                dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.UPDATE_RP));
            });
        }

        /** 限时召唤排名奖励界面 */
        private showRankJiangliView(data): void {
            UIMgr.showUI(UIConst.Lim_JiangLiView, data);
        }
    }
}