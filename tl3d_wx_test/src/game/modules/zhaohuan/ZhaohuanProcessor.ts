/*
* name;
*/
module game {
    export class ZhaohuanProcessor extends tl3d.Processor {


        constructor() {
            super();
        }

        public getName(): string {
            return "ZhaohuanProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new SummonEvent(SummonEvent.SHOW_SUM_RESULT_PANEL),
                new SummonEvent(SummonEvent.HIDE_ZHAOHUAN_RESULT),
                new SummonEvent(SummonEvent.HIDE_ZHAOHUAN_PANEL),
                new SummonEvent(SummonEvent.SHOW_ZHAOHUAN_PANEL),
                new SummonEvent(SummonEvent.SEND_ZHAOHUAN),
                new ResEvent(ResEvent.RESOURCE_CHANGE),
                new ResEvent(ResEvent.PROP_CHANGE),
                new ResEvent(ResEvent.LIMIT_VALUE_CHANGE),

            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof SummonEvent) {
                switch ($event.type) {
                    case SummonEvent.SHOW_ZHAOHUAN_PANEL:
                        this.showchoukaPanel($event.data);
                        break;
                    case SummonEvent.HIDE_ZHAOHUAN_RESULT:
                        this.hideSummonPanel();
                        break;
                    case SummonEvent.SHOW_SUM_RESULT_PANEL:
                        this.showSummonResultPanel($event.data);
                        break;
                    case SummonEvent.SEND_ZHAOHUAN:
                        this.sendZhaohuan($event.data);
                        break;
                }
            }

            if ($event instanceof ResEvent) {
                switch ($event.type) {
                    case ResEvent.RESOURCE_CHANGE:
                        this.coinsChange();
                        break;
                    case ResEvent.PROP_CHANGE:
                    case ResEvent.LIMIT_VALUE_CHANGE:
                        this.propChange();
                        break;

                }
            }
        }

        private sendZhaohuan($sdata) {
            let cansend: boolean = false;
            let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            let godEmployType: number = iface.tb_prop.godEmployTypeKey.propOnce;
            switch ($sdata.type) {
                case ZHAOHUAN.GENERAL:
                    //道具
                    godEmployType = $sdata.isOne ? iface.tb_prop.godEmployTypeKey.propOnce : iface.tb_prop.godEmployTypeKey.propTen;
                    let costnum: number = $sdata.isOne ? 1 : 10;
                    if (costnum == 1 && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum) == 0) {
                        cansend = true;
                    } else {
                        let hasnum: number = App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu);
                        if (hasnum >= costnum)
                            cansend = true;
                        else
                            showToast(LanMgr.getLan("", 10120));
                    }
                    break;
                case ZHAOHUAN.FRIENDSHIP:
                    //友情
                    godEmployType = $sdata.isOne ? iface.tb_prop.godEmployTypeKey.friendOnce : iface.tb_prop.godEmployTypeKey.friendTen;
                    let costnum_1: number = $sdata.isOne ? tab.friend_cost : tab.friend_cost * 10;
                    if (App.hero.friend >= costnum_1)
                        cansend = true;
                    else
                        showToast(LanMgr.getLan("", 10205));
                    break;
                case ZHAOHUAN.DIAMOND:
                    //钻石或道具
                    godEmployType = $sdata.isOne ? iface.tb_prop.godEmployTypeKey.diamondOnce : iface.tb_prop.godEmployTypeKey.diamondTen;
                    let costnum_ary: Array<number> = $sdata.isOne ? tab.zuanshi_once_priority : tab.zuanshi_ten_priority;
                    if ($sdata.isOne && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum) == 0) {
                        cansend = true;
                    } else {
                        let hasPropnum: number = App.hero.getBagItemNum(String(costnum_ary[0]));
                        if (hasPropnum >= costnum_ary[1]) {
                            cansend = true;
                        } else {
                            let costnum_2: number = $sdata.isOne ? tab.zuanshi_once : tab.zuanshi_ten;
                            if (App.hero.diamond >= costnum_2) {
                                cansend = true;
                            } else {
                                showToast(LanMgr.getLan("", Lans.daimond));
                            }
                        }
                    }
                    break;
                case ZHAOHUAN.LEGEND:
                    let vipflag: boolean = App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
                    //传说碎片
                    if (tab.special_employ[1] <= App.hero.legendChip) {
                        if (!vipflag) {
                            dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
                            let vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
                            showToast(LanMgr.getLan("", 10206, vipPrivilege.vip_level));
                        } else {
                            godEmployType = iface.tb_prop.godEmployTypeKey.legend;
                            cansend = true;
                        }
                    } else {
                        if (!vipflag) {
                            let vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
                            showToast(LanMgr.getLan("", 10206, vipPrivilege.vip_level));
                        } else {
                            showToast(LanMgr.getLan("", 10120));
                        }
                    }
                    break;
            }

            if (cansend) {
                var args = {};
                args[Protocol.game_god_employ.args.godEmployType] = godEmployType;
                PLC.request(Protocol.game_god_employ, args, ($data: any) => {
                    if (!$data) return;
                    dispatchEvt(new SummonEvent(SummonEvent.ZHAOHUAN_SUCCESS))
                });
            }
        }

        private showchoukaPanel($data: any = null) {
            UIMgr.showUI(UIConst.ZH_MainView);
        }

        private propChange() {
            let hasstage: boolean = UIMgr.hasStage(UIConst.ZH_MainView);
            if (hasstage) {
                let uiPanel: ZhaohuanView = UIMgr.getUIByName(UIConst.ZH_MainView) as ZhaohuanView;
                uiPanel.refreshList();
            }
        }

        private coinsChange() {
            let hasstage: boolean = UIMgr.hasStage(UIConst.ZH_MainView);
            if (hasstage) {
                let uiPanel: ZhaohuanView = UIMgr.getUIByName(UIConst.ZH_MainView) as ZhaohuanView;
                uiPanel.refreshList();
            }
        }

        private showSummonResultPanel($data: Array<GodItemVo>) {
            let hasstage: boolean = UIMgr.hasStage(UIConst.ZH_MainView) || UIMgr.hasStage(UIConst.LimiteBuyView);
            if (!hasstage) {
                return;
            }
            if (!UIMgr.hasStage(UIConst.ZH_ResultView)) {
                UIMgr.showUI(UIConst.ZH_ResultView, $data);
            } else {
                let ui: ZhaohuanResultView = UIMgr.getUIByName(UIConst.ZH_ResultView);
                ui.dataSource = $data;
                ui.popup();
            }

        }

        private hideSummonPanel() {
            UIMgr.hideUIByName(UIConst.ZH_ResultView);
        }
    }
}