var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
* name
*/
var game;
(function (game) {
    var HudModel = /** @class */ (function () {
        function HudModel() {
            this.oldUserLv = 0;
        }
        HudModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new HudModel();
            }
            return this._instance;
        };
        HudModel.prototype.initModel = function () {
            this.upperBtnVos = this.getHudDatas(Hudpos.Upper).map(function (tb) { return new game.ActivityBtnVo(tb); });
        };
        /**活动按钮显示是否有更新 */
        HudModel.prototype.isActivityBtnChange = function () {
            var isChange = false;
            this.upperBtnVos.forEach(function (vo) {
                if (vo.isHaveChange())
                    isChange = true;
            });
            return isChange;
        };
        /**获得指定位置类型按钮tb */
        HudModel.prototype.getHudDatas = function (type) {
            return tb.TB_hud.get_TB_hud("pos", type).sort(function (a, b) { return a.rank - b.rank; });
        };
        HudModel.prototype.getTbs = function () {
            var tbs = __spreadArrays(tb.TB_sys_open.get_TB_sys_open()).filter(function (vo) { return vo.is_show != 0; });
            return tbs;
        };
        /** hud按钮功能入口是否显示 */
        HudModel.isHudShow = function (sysid) {
            // 不是ios原生时都显示
            if (!GameUtil.isIosNative()) {
                return true;
            }
            var tbHud = tb.TB_hud.get_TB_hudBySysId(sysid);
            if (tbHud && tbHud.is_show == 0) {
                return false;
            }
            return true;
        };
        /**在活动时间？ */
        HudModel.IsOnActivatyTime = function (sysId) {
            if (!App.IsSysOpen(sysId)) {
                return false;
            }
            if (!HudModel.isHudShow(sysId)) {
                return false;
            }
            switch (sysId) {
                case iface.tb_prop.sysOpenTypeKey.activity: //活动
                    return game.TimelimitModel.getInstance().hasActivity();
                case iface.tb_prop.sysOpenTypeKey.openGift: //开服豪礼
                    return game.OpenserverModel.getInstance().visiableView();
                case iface.tb_prop.sysOpenTypeKey.luckTurnTable: //幸运转盘
                    return game.HuodongModel.isOnActivatyTime();
                case iface.tb_prop.sysOpenTypeKey.halfMonth: //半月庆典
                    return game.SevendaysModel.getInstance().isOnActivityTime(2);
                case iface.tb_prop.sysOpenTypeKey.sevenDay: //新手狂欢
                    return game.SevendaysModel.getInstance().isOnActivityTime(1);
                case iface.tb_prop.sysOpenTypeKey.onlineAward: //在线豪礼
                    return game.OnlineModel.getInstance().visiableView();
                case iface.tb_prop.sysOpenTypeKey.godRank: //神力排行
                    return game.PowerrankModel.getInstance().visiableView();
                case iface.tb_prop.sysOpenTypeKey.timeLimitBuy: //限时热购
                    return game.LimiteBuyModel.getInstance().isOpen();
                case iface.tb_prop.sysOpenTypeKey.realNameAuth: //实名认证
                    return !(App.hero.realNameVisable == -1 || App.hero.welfare.autonymAwardNum != 0);
                case iface.tb_prop.sysOpenTypeKey.firstCharge: //首充
                    return !game.ChongzhiModel.getInstance().isAllReward();
                case iface.tb_prop.sysOpenTypeKey.bindGift: //手机绑定
                    return !(App.hero.bindPhone == -1 || App.hero.bindMobileAward != 0);
                case iface.tb_prop.sysOpenTypeKey.microClient: //微端下载
                    return !(App.hero.downClient == -1 || App.hero.isReceiveWDXZ);
                case iface.tb_prop.sysOpenTypeKey.share: //分享
                    return App.hero.shareVisable != -1;
                case iface.tb_prop.sysOpenTypeKey.superVip: //超级vip
                    return App.hero.welfare.rechargeSum >= 500;
                case iface.tb_prop.sysOpenTypeKey.openSvrGift: //开服礼包
                    return game.OpenserverModel.getInstance().hasOsGiftActivity();
                case iface.tb_prop.sysOpenTypeKey.openSvrFund: //周基金
                    return game.TimelimitModel.getInstance().isShowWeekFundActivity();
                case ModuleConst.LOGIN_QIRI: //七日登入
                    return game.HuodongModel.getInstance().isShowLoginGift(game.LoginGiftView.TYPE_ONE);
                case ModuleConst.LOGIN_SHISIRI: //14日登入
                    return game.HuodongModel.getInstance().isShowLoginGift(game.LoginGiftView.TYPE_TWO);
                case ModuleConst.TEST_REBATE: //内侧返利
                    return game.HuodongModel.getInstance().canRewardTestRebate();
                case ModuleConst.WARRIOR_PROVE: //勇者之证
                    return game.WarriorProveModel.getInstance().isOpen();
                default: return true;
            }
        };
        /**活动按钮事件 */
        HudModel.ActivityBtnEvent = function (sysId) {
            var uiMgr = UIMgr.getInstance();
            if (sysId == iface.tb_prop.sysOpenTypeKey.welfare) {
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.WelfareView]);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.payActivity) {
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.PayActivityView]);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.recharge) {
                dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.activity) {
                dispatchEvt(new game.TimelimitEvent(game.TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.sevenDay || sysId == 711) {
                dispatchEvt(new game.SevendaysEvent(game.SevendaysEvent.SHOW_SEVENDAYS_PANEL));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.luckTurnTable) {
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.LuckyTurnView]);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.realNameAuth) {
                dispatchEvt(new game.HuodongEvent(game.HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.RealNameView]);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.godRank) {
                dispatchEvt(new game.PowerrankEvent(game.PowerrankEvent.SHOW_VIEW_EVENT));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.openGift) {
                uiMgr.showUI(UIConst.OpenReward);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.onlineAward) {
                uiMgr.showUI(UIConst.OnLineReward);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.firstCharge) {
                //首充
                dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_SHOUCHONG_PANEL));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.share) {
                if (game.ShareModel.isReceiveFirst()) {
                    //已分享
                    uiMgr.showUI(UIConst.MainShare);
                }
                else {
                    //未分享
                    uiMgr.showUI(UIConst.FirstShare);
                }
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.timeLimitBuy) {
                dispatchEvt(new game.LimiteBuyEvent(game.LimiteBuyEvent.SHOW_LIMITEBUY_VIEW));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.microClient) {
                //390微端下载
                dispatchEvt(new game.DownloadeEvent(game.DownloadeEvent.SHOW_WDXZ_VIEW));
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.superVip) {
                uiMgr.showUI(UIConst.SuperVipView);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.bindGift) {
                uiMgr.showUI(UIConst.BindPhone);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.beStrong) {
                uiMgr.showUI(UIConst.BianQiangView);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.openSvrGift) {
                uiMgr.showUI(UIConst.OpenServerGift);
            }
            else if (sysId == iface.tb_prop.sysOpenTypeKey.openSvrFund) {
                uiMgr.showUI(UIConst.WeekFundView);
            }
            else if (sysId == ModuleConst.LOGIN_QIRI) {
                uiMgr.showUI(UIConst.LoginGiftView, game.LoginGiftView.TYPE_ONE);
            }
            else if (sysId == ModuleConst.LOGIN_SHISIRI) {
                uiMgr.showUI(UIConst.LoginGiftView, game.LoginGiftView.TYPE_TWO);
            }
            else if (sysId == ModuleConst.TEST_REBATE) {
                uiMgr.showUI(UIConst.TestRebateView);
            }
            else if (sysId == ModuleConst.WARRIOR_PROVE) {
                dispatchEvt(new game.TaskEvent(game.TaskEvent.SHOW_TASK_VIEW, game.TaskTabType.warrior));
            }
            /**else if (sysId == iface.tb_prop.sysOpenTypeKey.) {//防沉迷验证提示界面
                sendDispatchEvent(new moduleindulge.IndulgeEvent(moduleindulge.IndulgeEvent.SHOW_FANG_YANZHENG));
            } */
        };
        /**是否开启特效 */
        HudModel.prototype.isPlayEffect = function (sysId) {
            if (!this._playEffSyss) {
                this._playEffSyss = [
                    iface.tb_prop.sysOpenTypeKey.activity,
                    // iface.tb_prop.sysOpenTypeKey.recharge,
                    iface.tb_prop.sysOpenTypeKey.firstCharge,
                ];
            }
            return this._playEffSyss.some(function (aniId) { return aniId == sysId; });
        };
        HudModel.getTbVipByScore = function (score) {
            var tbList = tb.TB_vip.get_TB_vip();
            var len = tbList.length;
            for (var i = len - 1; i >= 0; i--) {
                if (score >= (tbList[i].recharge * 10)) {
                    return tbList[i];
                }
            }
            return null;
        };
        /** 全面屏顶部加长的像素：为了避免刘海或者摄像头挡住 */
        HudModel.TOP_ADD_HEIGHT = 50;
        return HudModel;
    }());
    game.HudModel = HudModel;
    var SysOpenData = /** @class */ (function () {
        function SysOpenData(id) {
            this.tb = tb.TB_sys_open.get_TB_sys_openById(id);
        }
        /**是否已完成 */
        SysOpenData.prototype.isOpen = function () {
            return App.IsSysOpen(this.tb.ID);
        };
        /**奖励 */
        SysOpenData.prototype.getReward = function () {
            return this.tb.open_reward.map(function (vo) { return new ItemVo(vo[0], vo[1]); });
        };
        return SysOpenData;
    }());
    game.SysOpenData = SysOpenData;
})(game || (game = {}));
var Hudpos;
(function (Hudpos) {
    /**HUD上方 */
    Hudpos[Hudpos["Upper"] = 1] = "Upper";
    /**HUD中间建筑 */
    Hudpos[Hudpos["Middle"] = 2] = "Middle";
    /**HUD底部 */
    Hudpos[Hudpos["Bottom"] = 3] = "Bottom";
})(Hudpos || (Hudpos = {}));
