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
/*
* name;
*/
var game;
(function (game) {
    var ZhaohuanProcessor = /** @class */ (function (_super) {
        __extends(ZhaohuanProcessor, _super);
        function ZhaohuanProcessor() {
            return _super.call(this) || this;
        }
        ZhaohuanProcessor.prototype.getName = function () {
            return "ZhaohuanProcessor";
        };
        ZhaohuanProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.SummonEvent(game.SummonEvent.SHOW_SUM_RESULT_PANEL),
                new game.SummonEvent(game.SummonEvent.HIDE_ZHAOHUAN_RESULT),
                new game.SummonEvent(game.SummonEvent.HIDE_ZHAOHUAN_PANEL),
                new game.SummonEvent(game.SummonEvent.SHOW_ZHAOHUAN_PANEL),
                new game.SummonEvent(game.SummonEvent.SEND_ZHAOHUAN),
                new game.ResEvent(game.ResEvent.RESOURCE_CHANGE),
                new game.ResEvent(game.ResEvent.PROP_CHANGE),
                new game.ResEvent(game.ResEvent.LIMIT_VALUE_CHANGE),
            ];
        };
        //处理事件
        ZhaohuanProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.SummonEvent) {
                switch ($event.type) {
                    case game.SummonEvent.SHOW_ZHAOHUAN_PANEL:
                        this.showchoukaPanel($event.data);
                        break;
                    case game.SummonEvent.HIDE_ZHAOHUAN_RESULT:
                        this.hideSummonPanel();
                        break;
                    case game.SummonEvent.SHOW_SUM_RESULT_PANEL:
                        this.showSummonResultPanel($event.data);
                        break;
                    case game.SummonEvent.SEND_ZHAOHUAN:
                        this.sendZhaohuan($event.data);
                        break;
                }
            }
            if ($event instanceof game.ResEvent) {
                switch ($event.type) {
                    case game.ResEvent.RESOURCE_CHANGE:
                        this.coinsChange();
                        break;
                    case game.ResEvent.PROP_CHANGE:
                    case game.ResEvent.LIMIT_VALUE_CHANGE:
                        this.propChange();
                        break;
                }
            }
        };
        ZhaohuanProcessor.prototype.sendZhaohuan = function ($sdata) {
            var cansend = false;
            var tab = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            var godEmployType = iface.tb_prop.godEmployTypeKey.propOnce;
            switch ($sdata.type) {
                case game.ZHAOHUAN.GENERAL:
                    //道具
                    godEmployType = $sdata.isOne ? iface.tb_prop.godEmployTypeKey.propOnce : iface.tb_prop.godEmployTypeKey.propTen;
                    var costnum = $sdata.isOne ? 1 : 10;
                    if (costnum == 1 && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum) == 0) {
                        cansend = true;
                    }
                    else {
                        var hasnum = App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu);
                        if (hasnum >= costnum)
                            cansend = true;
                        else
                            showToast(LanMgr.getLan("", 10120));
                    }
                    break;
                case game.ZHAOHUAN.FRIENDSHIP:
                    //友情
                    godEmployType = $sdata.isOne ? iface.tb_prop.godEmployTypeKey.friendOnce : iface.tb_prop.godEmployTypeKey.friendTen;
                    var costnum_1 = $sdata.isOne ? tab.friend_cost : tab.friend_cost * 10;
                    if (App.hero.friend >= costnum_1)
                        cansend = true;
                    else
                        showToast(LanMgr.getLan("", 10205));
                    break;
                case game.ZHAOHUAN.DIAMOND:
                    //钻石或道具
                    godEmployType = $sdata.isOne ? iface.tb_prop.godEmployTypeKey.diamondOnce : iface.tb_prop.godEmployTypeKey.diamondTen;
                    var costnum_ary = $sdata.isOne ? tab.zuanshi_once_priority : tab.zuanshi_ten_priority;
                    if ($sdata.isOne && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum) == 0) {
                        cansend = true;
                    }
                    else {
                        var hasPropnum = App.hero.getBagItemNum(String(costnum_ary[0]));
                        if (hasPropnum >= costnum_ary[1]) {
                            cansend = true;
                        }
                        else {
                            var costnum_2 = $sdata.isOne ? tab.zuanshi_once : tab.zuanshi_ten;
                            if (App.hero.diamond >= costnum_2) {
                                cansend = true;
                            }
                            else {
                                showToast(LanMgr.getLan("", Lans.daimond));
                            }
                        }
                    }
                    break;
                case game.ZHAOHUAN.LEGEND:
                    var vipflag = App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
                    //传说碎片
                    if (tab.special_employ[1] <= App.hero.legendChip) {
                        if (!vipflag) {
                            dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                            var vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
                            showToast(LanMgr.getLan("", 10206, vipPrivilege.vip_level));
                        }
                        else {
                            godEmployType = iface.tb_prop.godEmployTypeKey.legend;
                            cansend = true;
                        }
                    }
                    else {
                        if (!vipflag) {
                            var vipPrivilege = tb.TB_vip_privilege.get_TB_vip_privilegeById(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
                            showToast(LanMgr.getLan("", 10206, vipPrivilege.vip_level));
                        }
                        else {
                            showToast(LanMgr.getLan("", 10120));
                        }
                    }
                    break;
            }
            if (cansend) {
                var args = {};
                args[Protocol.game_god_employ.args.godEmployType] = godEmployType;
                PLC.request(Protocol.game_god_employ, args, function ($data) {
                    if (!$data)
                        return;
                    dispatchEvt(new game.SummonEvent(game.SummonEvent.ZHAOHUAN_SUCCESS));
                });
            }
        };
        ZhaohuanProcessor.prototype.showchoukaPanel = function ($data) {
            if ($data === void 0) { $data = null; }
            UIMgr.showUI(UIConst.ZH_MainView);
        };
        ZhaohuanProcessor.prototype.propChange = function () {
            var hasstage = UIMgr.hasStage(UIConst.ZH_MainView);
            if (hasstage) {
                var uiPanel = UIMgr.getUIByName(UIConst.ZH_MainView);
                uiPanel.refreshList();
            }
        };
        ZhaohuanProcessor.prototype.coinsChange = function () {
            var hasstage = UIMgr.hasStage(UIConst.ZH_MainView);
            if (hasstage) {
                var uiPanel = UIMgr.getUIByName(UIConst.ZH_MainView);
                uiPanel.refreshList();
            }
        };
        ZhaohuanProcessor.prototype.showSummonResultPanel = function ($data) {
            var hasstage = UIMgr.hasStage(UIConst.ZH_MainView) || UIMgr.hasStage(UIConst.LimiteBuyView);
            if (!hasstage) {
                return;
            }
            if (!UIMgr.hasStage(UIConst.ZH_ResultView)) {
                UIMgr.showUI(UIConst.ZH_ResultView, $data);
            }
            else {
                var ui_1 = UIMgr.getUIByName(UIConst.ZH_ResultView);
                ui_1.dataSource = $data;
                ui_1.popup();
            }
        };
        ZhaohuanProcessor.prototype.hideSummonPanel = function () {
            UIMgr.hideUIByName(UIConst.ZH_ResultView);
        };
        return ZhaohuanProcessor;
    }(tl3d.Processor));
    game.ZhaohuanProcessor = ZhaohuanProcessor;
})(game || (game = {}));
