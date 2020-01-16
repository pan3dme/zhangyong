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
    /**开服豪礼红点规则 */
    var OpenRewardRedPoint = /** @class */ (function (_super) {
        __extends(OpenRewardRedPoint, _super);
        function OpenRewardRedPoint(name, vo) {
            var _this = _super.call(this, name) || this;
            _this._vo = vo;
            return _this;
        }
        OpenRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.OpenserverEvent.RED_CHANGE, this.updateState, this);
            this.updateState();
        };
        OpenRewardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        OpenRewardRedPoint.prototype._updateState = function () {
            if (game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.openGift) && this._vo) {
                this.updateVisible(this._vo.isbuy() && !this._vo.isReceive());
                dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
            }
            else {
                this.updateVisible(false);
            }
        };
        return OpenRewardRedPoint;
    }(game.RedPointBaseRule));
    /**在线红点规则 */
    var OnlineRedPoint = /** @class */ (function (_super) {
        __extends(OnlineRedPoint, _super);
        function OnlineRedPoint(name, vo) {
            var _this = _super.call(this, name) || this;
            _this._vo = vo;
            return _this;
        }
        OnlineRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.OnlineEvent.RED_CHANGE_EVENT, this.updateState, this);
            this.updateState();
        };
        OnlineRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        OnlineRedPoint.prototype._updateState = function () {
            if (game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.onlineAward) && this._vo) {
                this.updateVisible(this._vo.onRedPoint());
                dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
                dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_ONLINEREWARD));
            }
            else {
                this.updateVisible(false);
            }
        };
        return OnlineRedPoint;
    }(game.RedPointBaseRule));
    /**绑定手机红点规则 */
    var BindPhoneRedPoint = /** @class */ (function (_super) {
        __extends(BindPhoneRedPoint, _super);
        function BindPhoneRedPoint(name) {
            return _super.call(this, name) || this;
        }
        BindPhoneRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.BIND_PHONE_EVENT, this.updateState, this);
            this.updateState();
        };
        BindPhoneRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        BindPhoneRedPoint.prototype._updateState = function () {
            //绑定状态
            var bindok = App.hero.bindPhone == 1;
            //领取状态
            var receiveok = App.hero.bindMobileAward != 0;
            dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
            var sysId = iface.tb_prop.sysOpenTypeKey.bindGift;
            this.updateVisible(game.HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && bindok && !receiveok);
        };
        return BindPhoneRedPoint;
    }(game.RedPointBaseRule));
    /** 超级会员红点规则 */
    var SuperVipRedPoint = /** @class */ (function (_super) {
        __extends(SuperVipRedPoint, _super);
        function SuperVipRedPoint(name) {
            return _super.call(this, name) || this;
        }
        SuperVipRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.SUPER_VIP_RP, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.VIP_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        };
        SuperVipRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        SuperVipRedPoint.prototype._updateState = function () {
            //vip状态
            var bindok = App.hero.welfare.superVip == 1;
            //领取状态
            var receiveok = App.hero.welfare.superVipAward == 1;
            var sysId = iface.tb_prop.sysOpenTypeKey.superVip;
            this.updateVisible(game.HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && (App.hero.vipService != -1) && bindok && !receiveok);
        };
        return SuperVipRedPoint;
    }(game.RedPointBaseRule));
    /** 内侧返利红点规则 */
    var TestRebateRedPoint = /** @class */ (function (_super) {
        __extends(TestRebateRedPoint, _super);
        function TestRebateRedPoint(name) {
            return _super.call(this, name) || this;
        }
        TestRebateRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.TEST_REBATE_RP, this.updateState, this);
            this.updateState();
        };
        TestRebateRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        TestRebateRedPoint.prototype._updateState = function () {
            var sysId = ModuleConst.TEST_REBATE;
            this.updateVisible(game.HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && game.HuodongModel.getInstance().canRewardTestRebate());
        };
        return TestRebateRedPoint;
    }(game.RedPointBaseRule));
    /**分享红点规则 */
    var ShareRedPoint = /** @class */ (function (_super) {
        __extends(ShareRedPoint, _super);
        function ShareRedPoint(name, type) {
            var _this = _super.call(this, name) || this;
            _this._id = type;
            return _this;
        }
        ShareRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ShareEvent.RED_POINT_CHANGE, this.updateState, this);
            this.updateState();
        };
        ShareRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ShareRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.share) && App.IsSysOpen(iface.tb_prop.sysOpenTypeKey.share) && App.hero.shareVisable != -1 && game.ShareModel.redPointVisiable(this._id));
        };
        return ShareRedPoint;
    }(game.RedPointBaseRule));
    /**每日副本 */
    var DailyCopyRedPoint = /** @class */ (function (_super) {
        __extends(DailyCopyRedPoint, _super);
        function DailyCopyRedPoint(name, type) {
            var _this = _super.call(this, name) || this;
            _this._type = type;
            return _this;
        }
        DailyCopyRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        DailyCopyRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        DailyCopyRedPoint.prototype._updateState = function () {
            this.updateVisible(game.DailyCopyModel.getInstance().canRedPoint(this._type));
        };
        return DailyCopyRedPoint;
    }(game.RedPointBaseRule));
    /** 远征派遣 */
    var YuanzhengDispatchRedPoint = /** @class */ (function (_super) {
        __extends(YuanzhengDispatchRedPoint, _super);
        function YuanzhengDispatchRedPoint(name) {
            return _super.call(this, name) || this;
        }
        YuanzhengDispatchRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.YuanzhengEvent.YZ_DISPATCH_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        };
        YuanzhengDispatchRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.EXPEDITION))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        YuanzhengDispatchRedPoint.prototype._updateState = function () {
            this.updateVisible(game.YuanzhengModel.getInstance().getDispatchNum() <= 0);
        };
        return YuanzhengDispatchRedPoint;
    }(game.RedPointBaseRule));
    /** 组队奖励 */
    var TeamRewardRedPoint = /** @class */ (function (_super) {
        __extends(TeamRewardRedPoint, _super);
        function TeamRewardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        TeamRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.REWARD_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.UPDATE_GROUP_INFO, this.updateState, this);
            this.updateState();
        };
        TeamRewardRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.TEAM_COPY))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        TeamRewardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.CopyTeamModel.getInstance().isCanReward());
        };
        return TeamRewardRedPoint;
    }(game.RedPointBaseRule));
    /** 组队申请列表红点 */
    var CopyTeamApplyRedPoint = /** @class */ (function (_super) {
        __extends(CopyTeamApplyRedPoint, _super);
        function CopyTeamApplyRedPoint(name) {
            return _super.call(this, name) || this;
        }
        CopyTeamApplyRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.CopyTeamEvent.UPDATE_APPLY_RP, this.updateState, this);
            this.updateState();
        };
        CopyTeamApplyRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.TEAM_COPY))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        CopyTeamApplyRedPoint.prototype._updateState = function () {
            this.updateVisible(game.CopyTeamModel.getInstance().hasApplyRedPoint());
        };
        return CopyTeamApplyRedPoint;
    }(game.RedPointBaseRule));
    /**神器 */
    var ArtifactRedPoint = /** @class */ (function (_super) {
        __extends(ArtifactRedPoint, _super);
        function ArtifactRedPoint(name, id, type) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            _this._type = type;
            return _this;
        }
        ArtifactRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS, this._updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        ArtifactRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.ARTIFACT))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ArtifactRedPoint.prototype._updateState = function () {
            this.updateVisible(game.ArtifactModel.getInstance().getArtifactRedPoint(this._id, this._type));
        };
        return ArtifactRedPoint;
    }(game.RedPointBaseRule));
    /**排行榜 */
    var RankingListRedPoint = /** @class */ (function (_super) {
        __extends(RankingListRedPoint, _super);
        function RankingListRedPoint(name, id) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            return _this;
        }
        RankingListRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.RankingListEvent.RED_EVENT_RANKLIST, this.updateState, this);
            this.setState(this._id);
        };
        RankingListRedPoint.prototype.updateState = function ($evt) {
            Laya.timer.frameOnce(3, this, this._updateState, [$evt]);
        };
        RankingListRedPoint.prototype._updateState = function ($evt) {
            this.setState(this._id);
        };
        RankingListRedPoint.prototype.setState = function (id) {
            // 红点在2-10未通过之前隐藏
            var isPass = game.GuajiModel.getInstance().isPassCopy(common.GlobalData.GUAJI_COPY_2_10);
            var bool = isPass && game.RankModel.getInstance().canRedPoint(id);
            this.updateVisible(bool);
        };
        return RankingListRedPoint;
    }(game.RedPointBaseRule));
    /** 充值 */
    var tequanRedPoint = /** @class */ (function (_super) {
        __extends(tequanRedPoint, _super);
        function tequanRedPoint(name) {
            return _super.call(this, name) || this;
        }
        tequanRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TopUpEvent.UPDATE_TEQUANRED_EVEN, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.VIP_LEVEL_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        tequanRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        tequanRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.recharge) && game.ChongzhiModel.getInstance().tequanRedPoint());
        };
        return tequanRedPoint;
    }(game.RedPointBaseRule));
    /**首充 */
    var FirstRechargeRedPoint = /** @class */ (function (_super) {
        __extends(FirstRechargeRedPoint, _super);
        function FirstRechargeRedPoint(name, id) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            return _this;
        }
        FirstRechargeRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TopUpEvent.SHOUCHONG_RED_EVEN, this.updateState, this);
            this.setState(this._id);
        };
        FirstRechargeRedPoint.prototype.updateState = function ($evt) {
            Laya.timer.frameOnce(3, this, this._updateState, [$evt]);
        };
        FirstRechargeRedPoint.prototype._updateState = function ($evt) {
            var id = $evt.data;
            if (id && id == this._id)
                this.setState(id);
            else
                this.setState(this._id);
        };
        FirstRechargeRedPoint.prototype.setState = function (id) {
            var boolean = game.ChongzhiModel.getInstance().canRedPoint(id);
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.firstCharge) && boolean);
        };
        return FirstRechargeRedPoint;
    }(game.RedPointBaseRule));
    /**七日狂欢 */
    var SevendaysRedPoint = /** @class */ (function (_super) {
        __extends(SevendaysRedPoint, _super);
        function SevendaysRedPoint(name, day, id) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            _this._day = day;
            return _this;
        }
        SevendaysRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT, this.updateState, this);
            this.setState(this._day, this._id);
        };
        SevendaysRedPoint.prototype.updateState = function ($evt) {
            Laya.timer.frameOnce(3, this, this._updateState, [$evt]);
        };
        SevendaysRedPoint.prototype._updateState = function ($evt) {
            var tab = $evt.data;
            if (!tab) {
                this.setState(this._day, this._id);
            }
            else if (tab.day - ((tab.time_type - 1) * 7) == this._day) {
                this.setState(this._day, this._id);
            }
        };
        SevendaysRedPoint.prototype.setState = function (day, id) {
            var boolean = game.SevendaysModel.getInstance().canRedPoint(day, id);
            this.updateVisible(boolean && game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.sevenDay));
        };
        return SevendaysRedPoint;
    }(game.RedPointBaseRule));
    /**七日狂欢额外奖励 */
    var SevendaysExtRedPoint = /** @class */ (function (_super) {
        __extends(SevendaysExtRedPoint, _super);
        function SevendaysExtRedPoint(name) {
            return _super.call(this, name) || this;
        }
        SevendaysExtRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            this._updateState();
            tl3d.ModuleEventManager.addEvent(game.SevendaysEvent.SEVENDAYS_RED_EVENT, this._updateState, this);
        };
        SevendaysExtRedPoint.prototype._updateState = function () {
            var bool = game.SevendaysModel.getInstance().getSevendaysExtList().some(function (data) { return data.isCanReward(); });
            this.updateVisible(bool && game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.sevenDay));
        };
        return SevendaysExtRedPoint;
    }(game.RedPointBaseRule));
    /** 限时活动 */
    var TimeActivityRedPoint = /** @class */ (function (_super) {
        __extends(TimeActivityRedPoint, _super);
        function TimeActivityRedPoint(name, id) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            return _this;
        }
        TimeActivityRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TimelimitEvent.RED_EVENT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            //注册红点时，数据还没从服务端获取到，所以不需要执行红点事件
            if (game.TimelimitModel.getInstance().hasActivity())
                this.setState();
        };
        TimeActivityRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this.setState);
        };
        TimeActivityRedPoint.prototype.setState = function () {
            var boolean = game.TimelimitModel.getInstance().canRedPoint(this._id);
            // logyhj("活动 %d , 红点状态：%s",this._id,boolean);
            this.updateVisible(boolean && game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.activity));
        };
        return TimeActivityRedPoint;
    }(game.RedPointBaseRule));
    /** 限时团购活动 */
    var TimeActivityGroupBuyRedPoint = /** @class */ (function (_super) {
        __extends(TimeActivityGroupBuyRedPoint, _super);
        function TimeActivityGroupBuyRedPoint(name) {
            return _super.call(this, name) || this;
        }
        TimeActivityGroupBuyRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            this.updateState();
            tl3d.ModuleEventManager.addEvent(game.TimelimitEvent.GROUP_RED_EVENT, this.updateState, this);
        };
        TimeActivityGroupBuyRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this.setState);
        };
        TimeActivityGroupBuyRedPoint.prototype.setState = function () {
            var boolean = game.TimelimitModel.getInstance().canGroupBuyRedPoint();
            this.updateVisible(boolean && game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.activity));
        };
        return TimeActivityGroupBuyRedPoint;
    }(game.RedPointBaseRule));
    /** 限时活动--基金 */
    var TimeActivityFundRedPoint = /** @class */ (function (_super) {
        __extends(TimeActivityFundRedPoint, _super);
        function TimeActivityFundRedPoint(name, id) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            _this._fundList = tb.TB_fund_reward.getFundListByType(id);
            return _this;
        }
        TimeActivityFundRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TimelimitEvent.FUND_RED_EVENT, this.updateState, this);
            this.setState();
        };
        TimeActivityFundRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this.setState);
        };
        TimeActivityFundRedPoint.prototype.setState = function () {
            this.updateVisible(this.isCanReceive());
        };
        TimeActivityFundRedPoint.prototype.isCanReceive = function () {
            if (!game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.openSvrFund)) {
                return false;
            }
            if (App.hero.welfare.weekFund.indexOf(this._id) == -1)
                return false; //未购买基金
            var openTime = App.getOpenServerTime();
            var curTime = App.getServerTime();
            var day = (curTime - openTime) / 86400;
            for (var i = 0; i < this._fundList.length; i++) {
                var reward = this._fundList[i];
                if (day >= reward.value - 1) {
                    //在时间内
                    if (App.hero.welfare.weekFundAward.indexOf(reward.ID) == -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        return TimeActivityFundRedPoint;
    }(game.RedPointBaseRule));
    /** 限时团购 */
    var LimiteBuyRewardRedPoint = /** @class */ (function (_super) {
        __extends(LimiteBuyRewardRedPoint, _super);
        function LimiteBuyRewardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        LimiteBuyRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.LimiteBuyEvent.UPDATE_RP, this.updateState, this);
            this.updateState();
        };
        LimiteBuyRewardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        LimiteBuyRewardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.timeLimitBuy) && game.LimiteBuyModel.getInstance().isVisible());
        };
        return LimiteBuyRewardRedPoint;
    }(game.RedPointBaseRule));
    /** 日常任务 */
    var DailyTaskRedPoint = /** @class */ (function (_super) {
        __extends(DailyTaskRedPoint, _super);
        function DailyTaskRedPoint(name) {
            return _super.call(this, name) || this;
        }
        DailyTaskRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_DAILY_TASK, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_LIVENESS_DATA, this.updateState, this);
            this.updateState();
        };
        DailyTaskRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        DailyTaskRedPoint.prototype._updateState = function () {
            this.updateVisible(game.TaskModel.getInstance().canRewardDailyTask());
        };
        return DailyTaskRedPoint;
    }(game.RedPointBaseRule));
    /** 勇者之证 */
    var WarriorRedPoint = /** @class */ (function (_super) {
        __extends(WarriorRedPoint, _super);
        function WarriorRedPoint(name) {
            return _super.call(this, name) || this;
        }
        WarriorRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_WARRIOR_EXP, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.REWARD_LEVEL_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        };
        WarriorRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        WarriorRedPoint.prototype._updateState = function () {
            this.updateVisible(game.WarriorProveModel.getInstance().isCanReward());
        };
        return WarriorRedPoint;
    }(game.RedPointBaseRule));
    /** 试炼任务 */
    var TrialTaskRedPoint = /** @class */ (function (_super) {
        __extends(TrialTaskRedPoint, _super);
        function TrialTaskRedPoint(name, type) {
            var _this = _super.call(this, name) || this;
            _this._type = type;
            return _this;
        }
        TrialTaskRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_TRIAL_TASK_COUNT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_TRIAL_TASK_REWARD, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        };
        TrialTaskRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        TrialTaskRedPoint.prototype._updateState = function () {
            this.updateVisible(game.TrialTaskModel.getInstance().isCanReward(this._type));
        };
        return TrialTaskRedPoint;
    }(game.RedPointBaseRule));
    /** 试炼-每周积分礼包 */
    var TrialTaskGiftRedPoint = /** @class */ (function (_super) {
        __extends(TrialTaskGiftRedPoint, _super);
        function TrialTaskGiftRedPoint(name) {
            return _super.call(this, name) || this;
        }
        TrialTaskGiftRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.REWARD_WEEK_GIFT_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        };
        TrialTaskGiftRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        TrialTaskGiftRedPoint.prototype._updateState = function () {
            this.updateVisible(game.WarriorProveModel.getInstance().isCanRewardGift());
        };
        return TrialTaskGiftRedPoint;
    }(game.RedPointBaseRule));
    /** 邮件 */
    var MailRedPoint = /** @class */ (function (_super) {
        __extends(MailRedPoint, _super);
        function MailRedPoint(name) {
            return _super.call(this, name) || this;
        }
        MailRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.MailEvent.UPDATE_MAIL_DATA, this.updateState, this);
            this.updateState();
        };
        MailRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        MailRedPoint.prototype._updateState = function () {
            this.updateVisible(game.MailModel.getInstance().isShowMailRedpoint());
        };
        return MailRedPoint;
    }(game.RedPointBaseRule));
    /** 图鉴组合 */
    var godFateRedPoint = /** @class */ (function (_super) {
        __extends(godFateRedPoint, _super);
        function godFateRedPoint(name, vo) {
            var _this = _super.call(this, name) || this;
            _this._vo = vo;
            return _this;
        }
        godFateRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC, this.updateState, this);
            this.updateState();
        };
        godFateRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        godFateRedPoint.prototype._updateState = function () {
            // this._key
            // game.FateModel.getInstance().getNameById
            this.updateVisible(!this._vo.isActiviteComplete() && this._vo.isActivite());
        };
        return godFateRedPoint;
    }(game.RedPointBaseRule));
    /** 友情点 */
    var FriendPointRedPoint = /** @class */ (function (_super) {
        __extends(FriendPointRedPoint, _super);
        function FriendPointRedPoint(name) {
            return _super.call(this, name) || this;
        }
        FriendPointRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.MailEvent.UPDATE_FRIEND_POINT_DATA, this.updateState, this);
            this.updateState();
        };
        FriendPointRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        FriendPointRedPoint.prototype._updateState = function () {
            this.updateVisible(game.MailModel.getInstance().canOperateFriendPoint());
        };
        return FriendPointRedPoint;
    }(game.RedPointBaseRule));
    /** 金币兑换红点 */
    var ExchangeGoldRedPoint = /** @class */ (function (_super) {
        __extends(ExchangeGoldRedPoint, _super);
        function ExchangeGoldRedPoint(name) {
            return _super.call(this, name) || this;
        }
        ExchangeGoldRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.EXCHANGE_GOLD_CHANGE, this.updateState, this);
            this.updateState();
        };
        ExchangeGoldRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ExchangeGoldRedPoint.prototype._updateState = function () {
            var freecount = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyFreeNum);
            this.updateVisible(freecount < tb.TB_exchange_set.getSet().daily_free);
        };
        return ExchangeGoldRedPoint;
    }(game.RedPointBaseRule));
    /** 荣誉 */
    var HonorRedpoint = /** @class */ (function (_super) {
        __extends(HonorRedpoint, _super);
        function HonorRedpoint(name) {
            return _super.call(this, name) || this;
        }
        HonorRedpoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.updateState, this);
            this.updateState();
        };
        HonorRedpoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        HonorRedpoint.prototype._updateState = function () {
            this.updateVisible(game.TaskModel.getInstance().canRewardHonor());
        };
        return HonorRedpoint;
    }(game.RedPointBaseRule));
    /** 变强 */
    var ChallengeTabRedpoint = /** @class */ (function (_super) {
        __extends(ChallengeTabRedpoint, _super);
        function ChallengeTabRedpoint(name, id) {
            var _this = _super.call(this, name) || this;
            _this._id = id;
            return _this;
        }
        ChallengeTabRedpoint.prototype.init = function () {
            _super.prototype.init.call(this);
            this._data = game.BianQiangModel.getInstance().getChallengeTabData(this._id);
            tl3d.ModuleEventManager.addEvent(game.TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.updateState, this);
            this.updateState();
        };
        ChallengeTabRedpoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ChallengeTabRedpoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.beStrong) && this._data.canReward());
        };
        return ChallengeTabRedpoint;
    }(game.RedPointBaseRule));
    /** 符文副本奖励 */
    var RuneCopyJiangliRedpoint = /** @class */ (function (_super) {
        __extends(RuneCopyJiangliRedpoint, _super);
        function RuneCopyJiangliRedpoint(name) {
            return _super.call(this, name) || this;
        }
        RuneCopyJiangliRedpoint.prototype.init = function () {
            _super.prototype.init.call(this);
            // Pan3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_EXPERIENCE_DATA, this.updateState, this);
            this.updateState();
        };
        RuneCopyJiangliRedpoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        RuneCopyJiangliRedpoint.prototype._updateState = function () {
            this.updateVisible(false);
        };
        return RuneCopyJiangliRedpoint;
    }(game.RedPointBaseRule));
    /** 大富翁入口红点 */
    var RuneCopyAdventureRedpoin = /** @class */ (function (_super) {
        __extends(RuneCopyAdventureRedpoin, _super);
        function RuneCopyAdventureRedpoin(name) {
            return _super.call(this, name) || this;
        }
        RuneCopyAdventureRedpoin.prototype.init = function () {
            _super.prototype.init.call(this);
            // Pan3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_LASTGET_AFKTIME, this.updateState, this);
            // Pan3d.ModuleEventManager.addEvent(RiskEvent.UPDATE_AWARD_INFO, this.updateState, this);
            // Pan3d.ModuleEventManager.addEvent(ResEvent.ADV_SCORE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        RuneCopyAdventureRedpoin.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.ADVENTURE))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        RuneCopyAdventureRedpoin.prototype._updateState = function () {
            var settab = tb.TB_risk_set.getTabSet();
            var costnum = App.hero.getBagItemNum(settab.once_cost[0]);
            this.updateVisible(App.IsSysOpen(ModuleConst.ADVENTURE) && (settab.once_cost[1] <= costnum));
        };
        return RuneCopyAdventureRedpoin;
    }(game.RedPointBaseRule));
    /** 奇遇红点 */
    var QiyuRedpoint = /** @class */ (function (_super) {
        __extends(QiyuRedpoint, _super);
        function QiyuRedpoint(name) {
            return _super.call(this, name) || this;
        }
        QiyuRedpoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.DafuwengEvent.UPDATE_RISK_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.DafuwengEvent.ADD_RISK_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.DafuwengEvent.DEL_RISK_INFO, this.updateState, this);
            this.updateState();
        };
        QiyuRedpoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.ADVENTURE))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        QiyuRedpoint.prototype._updateState = function () {
            this.updateVisible(game.DafuwengModel.getInstance().getRiskList(false).length > 0);
        };
        return QiyuRedpoint;
    }(game.RedPointBaseRule));
    /** 好友申请 */
    var FriendApplyRedPoint = /** @class */ (function (_super) {
        __extends(FriendApplyRedPoint, _super);
        function FriendApplyRedPoint(name) {
            return _super.call(this, name) || this;
        }
        FriendApplyRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.FriendEvent.UPDATE_FRIEND_APPLY, this.updateState, this);
            this.updateState();
        };
        FriendApplyRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        FriendApplyRedPoint.prototype._updateState = function () {
            this.updateVisible(game.FriendModel.getInstance().friendApplyRp());
        };
        return FriendApplyRedPoint;
    }(game.RedPointBaseRule));
    /** 新聊天消息红点 */
    var ChatRedPoint = /** @class */ (function (_super) {
        __extends(ChatRedPoint, _super);
        function ChatRedPoint(name) {
            return _super.call(this, name) || this;
        }
        ChatRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ChatEvent.UPDATE_NEW_CHAT_COUNT, this.updateState, this);
            this.updateState();
        };
        ChatRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ChatRedPoint.prototype._updateState = function () {
            this.updateVisible(game.ChatModel.getInstance().hasNewNum());
        };
        return ChatRedPoint;
    }(game.RedPointBaseRule));
    /** 私聊信息 */
    var FriendPrivateChatRedPoint = /** @class */ (function (_super) {
        __extends(FriendPrivateChatRedPoint, _super);
        function FriendPrivateChatRedPoint(name) {
            return _super.call(this, name) || this;
        }
        FriendPrivateChatRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ChatEvent.UPDATE_PRIVATE_CHAT, this.updateState, this);
            this.updateState();
        };
        FriendPrivateChatRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        FriendPrivateChatRedPoint.prototype._updateState = function () {
            this.updateVisible(game.ChatModel.getInstance().hasNewPrivateChat());
        };
        return FriendPrivateChatRedPoint;
    }(game.RedPointBaseRule));
    /** 许愿 */
    var XuyuanRedPoint = /** @class */ (function (_super) {
        __extends(XuyuanRedPoint, _super);
        function XuyuanRedPoint(name) {
            return _super.call(this, name) || this;
        }
        XuyuanRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        XuyuanRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        XuyuanRedPoint.prototype._updateState = function () {
            var isShow = game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare);
            this.updateVisible(App.hero.getlimitValue(isShow && iface.tb_prop.limitTypeKey.wishFreeNum) < tb.TB_wish_set.getFreeNum());
        };
        return XuyuanRedPoint;
    }(game.RedPointBaseRule));
    /**每月签到 */
    var QiandaoRedPoint = /** @class */ (function (_super) {
        __extends(QiandaoRedPoint, _super);
        function QiandaoRedPoint(name) {
            return _super.call(this, name) || this;
        }
        QiandaoRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        };
        QiandaoRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        QiandaoRedPoint.prototype._updateState = function () {
            var signDays = game.HuodongModel.getTotalSignNum();
            /**累计签到 */
            var canRewards = tb.TB_total_sign.get_TB_total_sign().filter(function (tb) { return signDays >= tb.total_day
                && !(App.hero.welfare.totalSignIn[tb.ID] && App.hero.welfare.totalSignIn[tb.ID] == 1); });
            var canDo = !game.HuodongModel.isTodaySign() || canRewards.length > 0;
            this.updateVisible(canDo && game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare));
        };
        return QiandaoRedPoint;
    }(game.RedPointBaseRule));
    /**等级基金 */
    var JijinRedPoint = /** @class */ (function (_super) {
        __extends(JijinRedPoint, _super);
        function JijinRedPoint(name) {
            return _super.call(this, name) || this;
        }
        JijinRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.AWARD_EVENT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.VIP_LEVEL_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        JijinRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        JijinRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.payActivity) && game.HuodongModel.getInstance().ratingFundRedPoint());
        };
        return JijinRedPoint;
    }(game.RedPointBaseRule));
    /**等级礼包 */
    var DengjiRedPoint = /** @class */ (function (_super) {
        __extends(DengjiRedPoint, _super);
        function DengjiRedPoint(name) {
            return _super.call(this, name) || this;
        }
        DengjiRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        };
        DengjiRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        DengjiRedPoint.prototype._updateState = function () {
            var isShow = game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare);
            this.updateVisible(isShow && game.HuodongModel.getInstance().levelPackIsAllGet());
        };
        return DengjiRedPoint;
    }(game.RedPointBaseRule));
    /**月卡 */
    var MonthRedPoint = /** @class */ (function (_super) {
        __extends(MonthRedPoint, _super);
        function MonthRedPoint(name) {
            return _super.call(this, name) || this;
        }
        MonthRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        MonthRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        MonthRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.payActivity) && App.hero.welfare.monthCardEndTime > App.getServerTime() && App.hero.welfare.monthCardAward != 1);
        };
        return MonthRedPoint;
    }(game.RedPointBaseRule));
    /**终身卡 */
    var LifeRedPoint = /** @class */ (function (_super) {
        __extends(LifeRedPoint, _super);
        function LifeRedPoint(name) {
            return _super.call(this, name) || this;
        }
        LifeRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        LifeRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        LifeRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.payActivity) && (App.hero.welfare.lifelongCard == 1 && App.hero.welfare.lifelongCardAward != 1));
        };
        return LifeRedPoint;
    }(game.RedPointBaseRule));
    /**实名认证 */
    var RealNameRedPoint = /** @class */ (function (_super) {
        __extends(RealNameRedPoint, _super);
        function RealNameRedPoint(name) {
            return _super.call(this, name) || this;
        }
        RealNameRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        };
        RealNameRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        RealNameRedPoint.prototype._updateState = function () {
            this.updateVisible(!(App.hero.welfare.autonymAwardNum == 1));
        };
        return RealNameRedPoint;
    }(game.RedPointBaseRule));
    /**装备寻宝额外奖励 */
    var luckyEquipExtRedPoint = /** @class */ (function (_super) {
        __extends(luckyEquipExtRedPoint, _super);
        function luckyEquipExtRedPoint(name) {
            return _super.call(this, name) || this;
        }
        luckyEquipExtRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_EQUIP_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_EQUIP_REWARD_CHANGE, this.updateState, this);
            this.updateState();
        };
        luckyEquipExtRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        luckyEquipExtRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HuodongModel.getInstance().luckyEquipExtRewardRP());
        };
        return luckyEquipExtRedPoint;
    }(game.RedPointBaseRule));
    /**装备寻宝额外奖励 */
    var luckyEquipExtFreeRedPoint = /** @class */ (function (_super) {
        __extends(luckyEquipExtFreeRedPoint, _super);
        function luckyEquipExtFreeRedPoint(name) {
            return _super.call(this, name) || this;
        }
        luckyEquipExtFreeRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        luckyEquipExtFreeRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        luckyEquipExtFreeRedPoint.prototype._updateState = function () {
            var hasFree = game.HuodongModel.getLuckFreeCount(TURNTABLE.EQUIP) > 0;
            this.updateVisible(App.hero.welfare.luckEquipId != 0 && hasFree);
        };
        return luckyEquipExtFreeRedPoint;
    }(game.RedPointBaseRule));
    /**幸运转盘宝物奖励 */
    var luckyTreasureRewardRedPoint = /** @class */ (function (_super) {
        __extends(luckyTreasureRewardRedPoint, _super);
        function luckyTreasureRewardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        luckyTreasureRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LUCK_TREASURE_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        luckyTreasureRewardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        luckyTreasureRewardRedPoint.prototype._updateState = function () {
            var canReceive = false;
            if (App.hero.welfare.luckTreasureId > 0) {
                var timeTemp = tb.TB_luck_treasure_time.getTempById(App.hero.welfare.luckTreasureId);
                canReceive = App.hero.welfare.luckTreasureNum >= timeTemp.luck_value;
            }
            this.updateVisible(canReceive);
        };
        return luckyTreasureRewardRedPoint;
    }(game.RedPointBaseRule));
    /**幸运转盘宝物奖励 */
    var luckyTreasureFreeRedPoint = /** @class */ (function (_super) {
        __extends(luckyTreasureFreeRedPoint, _super);
        function luckyTreasureFreeRedPoint(name) {
            return _super.call(this, name) || this;
        }
        luckyTreasureFreeRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        luckyTreasureFreeRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        luckyTreasureFreeRedPoint.prototype._updateState = function () {
            var hasFree = game.HuodongModel.getLuckFreeCount(TURNTABLE.TREASURE) > 0;
            this.updateVisible(App.hero.welfare.luckTreasureId != 0 && hasFree);
        };
        return luckyTreasureFreeRedPoint;
    }(game.RedPointBaseRule));
    /**神灵转盘红点 */
    var luckyGodRedPoint = /** @class */ (function (_super) {
        __extends(luckyGodRedPoint, _super);
        function luckyGodRedPoint(name) {
            return _super.call(this, name) || this;
        }
        luckyGodRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        luckyGodRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        luckyGodRedPoint.prototype._updateState = function () {
            var hasFree = game.HuodongModel.getLuckFreeCount(TURNTABLE.GOD) > 0;
            this.updateVisible(App.hero.welfare.luckGodId != 0 && hasFree);
        };
        return luckyGodRedPoint;
    }(game.RedPointBaseRule));
    /**神灵转盘红点 */
    var luckyArtRedPoint = /** @class */ (function (_super) {
        __extends(luckyArtRedPoint, _super);
        function luckyArtRedPoint(name) {
            return _super.call(this, name) || this;
        }
        luckyArtRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        luckyArtRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        luckyArtRedPoint.prototype._updateState = function () {
            var hasFree = game.HuodongModel.getLuckFreeCount(TURNTABLE.ART) > 0;
            this.updateVisible(App.hero.welfare.luckArtId != 0 && hasFree);
        };
        return luckyArtRedPoint;
    }(game.RedPointBaseRule));
    /** 神力排行榜红点 */
    var PowerRankRedPoint = /** @class */ (function (_super) {
        __extends(PowerRankRedPoint, _super);
        function PowerRankRedPoint(name) {
            return _super.call(this, name) || this;
        }
        PowerRankRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.PowerrankEvent.UPDATE_REDPOINT, this.updateState, this);
            this.updateState();
        };
        PowerRankRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        PowerRankRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.godRank) && game.PowerrankModel.getInstance().firstLogin);
        };
        return PowerRankRedPoint;
    }(game.RedPointBaseRule));
    /**每日签到红点 */
    var EveryDaySignRedPoint = /** @class */ (function (_super) {
        __extends(EveryDaySignRedPoint, _super);
        function EveryDaySignRedPoint(name) {
            return _super.call(this, name) || this;
        }
        EveryDaySignRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        };
        EveryDaySignRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        EveryDaySignRedPoint.prototype._updateState = function () {
            this.updateVisible(game.HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare) && game.HuodongModel.getInstance().everyDaySignRP());
        };
        return EveryDaySignRedPoint;
    }(game.RedPointBaseRule));
    /** 世界boss剩余次数 */
    var WorldBossRedPoint = /** @class */ (function (_super) {
        __extends(WorldBossRedPoint, _super);
        function WorldBossRedPoint(name) {
            return _super.call(this, name) || this;
        }
        WorldBossRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        };
        WorldBossRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        WorldBossRedPoint.prototype._updateState = function () {
            var count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            var isopen = App.IsSysOpen(ModuleConst.WORLD_BOSS);
            this.updateVisible(count > 0 && isopen);
            if (isopen) {
                tl3d.ModuleEventManager.removeEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            }
        };
        return WorldBossRedPoint;
    }(game.RedPointBaseRule));
    /** 公会捐献 */
    var GuildDonateRedPoint = /** @class */ (function (_super) {
        __extends(GuildDonateRedPoint, _super);
        function GuildDonateRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildDonateRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.GUILD_DONATE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildDonateRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildDonateRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildModel.getInstance().isCanDonate());
        };
        return GuildDonateRedPoint;
    }(game.RedPointBaseRule));
    /** 公会挑战次数 */
    var GuildChallengeNumRedPoint = /** @class */ (function (_super) {
        __extends(GuildChallengeNumRedPoint, _super);
        function GuildChallengeNumRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildChallengeNumRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildChallengeNumRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildChallengeNumRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildCopyModel.getInstance().isCanChallenge());
        };
        return GuildChallengeNumRedPoint;
    }(game.RedPointBaseRule));
    /** 公会通关奖励 */
    var GuildRewardRedPoint = /** @class */ (function (_super) {
        __extends(GuildRewardRedPoint, _super);
        function GuildRewardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.RECEIVE_JIANGLI_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_JIANGLI_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildRewardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildRewardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildCopyModel.getInstance().isCanReward());
        };
        return GuildRewardRedPoint;
    }(game.RedPointBaseRule));
    /** 公会申请列表 */
    var GuildApplyRedPoint = /** @class */ (function (_super) {
        __extends(GuildApplyRedPoint, _super);
        function GuildApplyRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildApplyRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_APPLY_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildApplyRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildApplyRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildModel.getInstance().isHasNewApply());
        };
        return GuildApplyRedPoint;
    }(game.RedPointBaseRule));
    /** 公会技能 */
    var GuildSkillRedPoint = /** @class */ (function (_super) {
        __extends(GuildSkillRedPoint, _super);
        function GuildSkillRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildSkillRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.GUILD_SKILL_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildSkillRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildSkillRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildSkillModel.getInstance().isHasDonateLevelUp());
        };
        return GuildSkillRedPoint;
    }(game.RedPointBaseRule));
    /** 公会战可领取宝箱 */
    var GuildWarAwardRedPoint = /** @class */ (function (_super) {
        __extends(GuildWarAwardRedPoint, _super);
        function GuildWarAwardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildWarAwardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.REWARD_CHEST_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_WAR_REDPOINT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildWarAwardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildWarAwardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildFightModel.getInstance().isCanReward());
        };
        return GuildWarAwardRedPoint;
    }(game.RedPointBaseRule));
    /** 公会战可报名 */
    var GuildWarJoinRedPoint = /** @class */ (function (_super) {
        __extends(GuildWarJoinRedPoint, _super);
        function GuildWarJoinRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildWarJoinRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.JOIN_FIGHT_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_WAR_REDPOINT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildWarJoinRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildWarJoinRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildFightModel.getInstance().isCanJoin());
        };
        return GuildWarJoinRedPoint;
    }(game.RedPointBaseRule));
    /** 公会援助-可求援 */
    var GuildAskHelpRedPoint = /** @class */ (function (_super) {
        __extends(GuildAskHelpRedPoint, _super);
        function GuildAskHelpRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildAskHelpRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.SEND_ASK_HELP_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_MY_HELP_LIST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        };
        GuildAskHelpRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildAskHelpRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildHelpModel.getInstance().isCanAskHelp());
        };
        return GuildAskHelpRedPoint;
    }(game.RedPointBaseRule));
    /** 公会援助-可领取碎片*/
    var GuildAwardRedPoint = /** @class */ (function (_super) {
        __extends(GuildAwardRedPoint, _super);
        function GuildAwardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildAwardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_MY_HELP_LIST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.REWARD_HELPED_ITEM_SUCC, this.updateState, this);
            this.updateState();
        };
        GuildAwardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildAwardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildHelpModel.getInstance().isCanRewardSuipian());
        };
        return GuildAwardRedPoint;
    }(game.RedPointBaseRule));
    /** 公会援助-可进行援助 */
    var GuildHelpOthersRedPoint = /** @class */ (function (_super) {
        __extends(GuildHelpOthersRedPoint, _super);
        function GuildHelpOthersRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GuildHelpOthersRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.UPDATE_OTHERS_HELP_LIST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GuildEvent.HELP_OTHERS_SUCC, this.updateState, this);
            this.updateState();
        };
        GuildHelpOthersRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GuildHelpOthersRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GuildHelpModel.getInstance().isCanHelpOthers());
        };
        return GuildHelpOthersRedPoint;
    }(game.RedPointBaseRule));
    /** 商队护送红点 */
    var EscortRedPoint = /** @class */ (function (_super) {
        __extends(EscortRedPoint, _super);
        function EscortRedPoint(name) {
            return _super.call(this, name) || this;
        }
        EscortRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.EscortEvent.UPDATE_SELF_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.EscortEvent.ESCORT_GOODS_SUCCESS, this.updateState, this);
            this.updateState();
        };
        EscortRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.CARAVAN_ESCORT))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        EscortRedPoint.prototype._updateState = function () {
            this.updateVisible(game.EscortModel.getInstance().canDoubleEscort());
        };
        return EscortRedPoint;
    }(game.RedPointBaseRule));
    var EscortRecordRedPoint = /** @class */ (function (_super) {
        __extends(EscortRecordRedPoint, _super);
        function EscortRecordRedPoint(name) {
            return _super.call(this, name) || this;
        }
        EscortRecordRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.EscortEvent.UPDATE_RECORD_RP, this.updateState, this);
            this.updateState();
        };
        EscortRecordRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.CARAVAN_ESCORT))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        EscortRecordRedPoint.prototype._updateState = function () {
            this.updateVisible(game.EscortModel.getInstance().hasNewRecord);
        };
        return EscortRecordRedPoint;
    }(game.RedPointBaseRule));
    /**微端下载红点 */
    var WeiDuanXiaZaiPoint = /** @class */ (function (_super) {
        __extends(WeiDuanXiaZaiPoint, _super);
        function WeiDuanXiaZaiPoint(name) {
            return _super.call(this, name) || this;
        }
        WeiDuanXiaZaiPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.DownloadeEvent.RED_CHANGE_EVENT, this.updateState, this);
            this.updateState();
        };
        WeiDuanXiaZaiPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        WeiDuanXiaZaiPoint.prototype._updateState = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.UPDATE_MAINVIEW_BUTTON));
            var sysId = iface.tb_prop.sysOpenTypeKey.microClient;
            this.updateVisible(game.HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && App.hero.downClient == 1 && !App.hero.isReceiveWDXZ);
        };
        return WeiDuanXiaZaiPoint;
    }(game.RedPointBaseRule));
    var EscortRewardRedPoint = /** @class */ (function (_super) {
        __extends(EscortRewardRedPoint, _super);
        function EscortRewardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        EscortRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.EscortEvent.UPDATE_SELF_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.EscortEvent.UPDATE_REWARD_RP, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        };
        EscortRewardRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.CARAVAN_ESCORT))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        EscortRewardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.EscortModel.getInstance().canReward());
        };
        return EscortRewardRedPoint;
    }(game.RedPointBaseRule));
    /** 迷雾森林 */
    var ForestRedPoint = /** @class */ (function (_super) {
        __extends(ForestRedPoint, _super);
        function ForestRedPoint(name) {
            return _super.call(this, name) || this;
        }
        ForestRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.CHALLENGE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.ALL_PASS_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.RECEIVE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.Init_FOREST, this.updateState, this);
            this.updateState();
        };
        ForestRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ForestRedPoint.prototype._updateState = function () {
            //是否有可领取宝箱
            this.updateVisible(game.FogForestModel.getInstance().isCanReward());
        };
        return ForestRedPoint;
    }(game.RedPointBaseRule));
    var ForestOneKeyRedPoint = /** @class */ (function (_super) {
        __extends(ForestOneKeyRedPoint, _super);
        function ForestOneKeyRedPoint(name) {
            return _super.call(this, name) || this;
        }
        ForestOneKeyRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.ALL_PASS_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.Init_FOREST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.UPDATE_CUR_GUANQIA, this.updateState, this);
            this.updateState();
        };
        ForestOneKeyRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ForestOneKeyRedPoint.prototype._updateState = function () {
            //是否可一键扫荡
            this.updateVisible(game.FogForestModel.getInstance().isCanOneKeyPass());
        };
        return ForestOneKeyRedPoint;
    }(game.RedPointBaseRule));
    var ForestMaxRedPoint = /** @class */ (function (_super) {
        __extends(ForestMaxRedPoint, _super);
        function ForestMaxRedPoint(name) {
            return _super.call(this, name) || this;
        }
        ForestMaxRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.CHALLENGE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.ALL_PASS_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.SHOW_MAIN_VIEW, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.FogForestEvent.Init_FOREST, this.updateState, this);
            this.updateState();
        };
        ForestMaxRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        ForestMaxRedPoint.prototype._updateState = function () {
            //是否首次登录以及是否到达最大关卡
            this.updateVisible(game.FogForestModel.getInstance().isVisible());
        };
        return ForestMaxRedPoint;
    }(game.RedPointBaseRule));
    /** 神秘岛屿记录 */
    var IslandRecordRedPoint = /** @class */ (function (_super) {
        __extends(IslandRecordRedPoint, _super);
        function IslandRecordRedPoint(name) {
            return _super.call(this, name) || this;
        }
        IslandRecordRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.IslandsEvent.UPDATE_RECORD_INFO, this.updateState, this);
            this.updateState();
        };
        IslandRecordRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        IslandRecordRedPoint.prototype._updateState = function () {
            if (this.name == 'island_record') {
                this.updateVisible(game.IslandModel.getInstance().hasNewRecord);
            }
            else {
                this.updateVisible(game.IslandModel.getInstance().hasEndTime);
            }
        };
        return IslandRecordRedPoint;
    }(game.RedPointBaseRule));
    /** 登入礼包红点 */
    var LoginGiftRedPoint = /** @class */ (function (_super) {
        __extends(LoginGiftRedPoint, _super);
        function LoginGiftRedPoint(name, type) {
            var _this = _super.call(this, name) || this;
            _this._type = type;
            _this._allTemps = tb.TB_sevendays.get_TB_sevendays(type);
            return _this;
        }
        LoginGiftRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.TOTAL_LOGIN_DAY, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.LOGIN_GIFT_RECEIVE, this.updateState, this);
            this.updateState();
        };
        LoginGiftRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        LoginGiftRedPoint.prototype._updateState = function () {
            var showred = false;
            if (this._allTemps && this._allTemps.length > 0) {
                var loginday = App.hero.welfare.totalLoginDay ? App.hero.welfare.totalLoginDay : 0;
                var giftReceiveInfo = App.hero.welfare.loginGiftPack ? App.hero.welfare.loginGiftPack : {};
                for (var i = 0; i < this._allTemps.length; i++) {
                    var temp = this._allTemps[i];
                    if (temp.ID <= loginday && !giftReceiveInfo.hasOwnProperty(temp.ID)) {
                        showred = true;
                        break;
                    }
                }
            }
            this.updateVisible(showred);
        };
        return LoginGiftRedPoint;
    }(game.RedPointBaseRule));
    /** 召唤材料 低级召唤书、神秘召唤书、传说召唤书*/
    var SummonPropRedPoint = /** @class */ (function (_super) {
        __extends(SummonPropRedPoint, _super);
        function SummonPropRedPoint(name, key) {
            var _this = _super.call(this, name) || this;
            _this._resType = key;
            return _this;
        }
        SummonPropRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        SummonPropRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        SummonPropRedPoint.prototype._updateState = function () {
            if (this._resType == iface.tb_prop.resTypeKey.friend) {
                this.updateVisible(App.hero.friend >= 1000);
            }
            else if (this._resType == CostTypeKey.weizhi_zhaohuanshu) {
                if (this.name == "summon_weizhi1") {
                    this.updateVisible(App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum) == 0);
                }
                else {
                    this.updateVisible(App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu) >= 10);
                }
            }
            else if (this._resType == CostTypeKey.shenmi_zhaohuanshu) {
                if (this.name == "summon_shenmi10") {
                    this.updateVisible(App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu) >= 10);
                }
                else if (this.name == "summon_shenmi1") {
                    this.updateVisible(App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu) >= 1 || App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum) == 0);
                }
            }
        };
        return SummonPropRedPoint;
    }(game.RedPointBaseRule));
    /** 传说召唤红点(vip等级达到 和 传说召唤碎片达到) */
    var SummonVipRedPoint = /** @class */ (function (_super) {
        __extends(SummonVipRedPoint, _super);
        function SummonVipRedPoint(name) {
            return _super.call(this, name) || this;
        }
        SummonVipRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.HuodongEvent.REFRESH_YUEKA_PANEL, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.SummonEvent.ZHAOHUAN_SUCCESS, this.updateState, this);
            this.updateState();
        };
        SummonVipRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        SummonVipRedPoint.prototype._updateState = function () {
            var vipflag = App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
            var tab = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            var numflag = tab.special_employ[1] <= App.hero.legendChip;
            this.updateVisible(vipflag && numflag);
        };
        return SummonVipRedPoint;
    }(game.RedPointBaseRule));
    /** 限时物品 红点*/
    var BagTimeItemRedPoint = /** @class */ (function (_super) {
        __extends(BagTimeItemRedPoint, _super);
        function BagTimeItemRedPoint(name, receiveTime) {
            var _this = _super.call(this, name) || this;
            _this._receiveTime = receiveTime;
            return _this;
        }
        BagTimeItemRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.TIME_PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        BagTimeItemRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        BagTimeItemRedPoint.prototype._updateState = function () {
            this.updateVisible(this._receiveTime <= App.getServerTime());
        };
        return BagTimeItemRedPoint;
    }(game.RedPointBaseRule));
    /** 背包材料 如低级经验瓶、玄丹材料箱、神丹材料箱*/
    var BagMaterialRedPoint = /** @class */ (function (_super) {
        __extends(BagMaterialRedPoint, _super);
        function BagMaterialRedPoint(name, key) {
            var _this = _super.call(this, name) || this;
            _this._key = key;
            return _this;
        }
        BagMaterialRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        BagMaterialRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        BagMaterialRedPoint.prototype._updateState = function () {
            this.updateVisible(App.hero.getBagItemNum(this._key) >= 1);
        };
        return BagMaterialRedPoint;
    }(game.RedPointBaseRule));
    var BagSuipianRedPoint = /** @class */ (function (_super) {
        __extends(BagSuipianRedPoint, _super);
        function BagSuipianRedPoint(name, key) {
            var _this = _super.call(this, name) || this;
            _this._key = key;
            return _this;
        }
        BagSuipianRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        BagSuipianRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        BagSuipianRedPoint.prototype._updateState = function () {
            var itemtab = tb.TB_item.get_TB_itemById(Number(this._key));
            var redPoint = App.hero.getBagItemNum(this._key) >= Number(itemtab.using_effect[1]);
            this.updateVisible(redPoint);
        };
        return BagSuipianRedPoint;
    }(game.RedPointBaseRule));
    /** 布阵 */
    var BuzhenRedPoint = /** @class */ (function (_super) {
        __extends(BuzhenRedPoint, _super);
        function BuzhenRedPoint(name) {
            return _super.call(this, name) || this;
        }
        BuzhenRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        };
        BuzhenRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        BuzhenRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GodUtils.isCanBuzhen());
        };
        return BuzhenRedPoint;
    }(game.RedPointBaseRule));
    /** 上阵英雄:可升级红点 */
    var GodLvupRedPoint = /** @class */ (function (_super) {
        __extends(GodLvupRedPoint, _super);
        function GodLvupRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            return _this;
        }
        GodLvupRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.USE_EXPPOOL_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.GOD_SHENGJIE_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.GOD_EXP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        /** 英雄经验更新 */
        GodLvupRedPoint.prototype.updateStateByExp = function () {
            this.updateState();
        };
        /** 升级成功更新 */
        GodLvupRedPoint.prototype.updateStateByLv = function (event) {
            if (this.gid != event.data)
                return;
            this.updateState();
        };
        GodLvupRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodLvupRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanLvup());
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodLvupRedPoint;
    }(game.RedPointBaseRule));
    /** 上阵英雄:可升阶红点 */
    var GodDegreeupRedPoint = /** @class */ (function (_super) {
        __extends(GodDegreeupRedPoint, _super);
        function GodDegreeupRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            return _this;
        }
        GodDegreeupRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.USE_EXPPOOL_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.GOD_SHENGJIE_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        /** 升级成功更新 */
        GodDegreeupRedPoint.prototype.updateStateByLv = function (event) {
            if (this.gid != event.data)
                return;
            this.updateState();
        };
        GodDegreeupRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodDegreeupRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanDegreeUp());
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodDegreeupRedPoint;
    }(game.RedPointBaseRule));
    /** 上阵英雄:可激活皮肤 */
    var GodSkinRedPoint = /** @class */ (function (_super) {
        __extends(GodSkinRedPoint, _super);
        function GodSkinRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            return _this;
        }
        GodSkinRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.ADD_SKINID, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodSkinRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodSkinRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(game.GodUtils.isCanActivitySkin(godVo.tab_god));
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodSkinRedPoint;
    }(game.RedPointBaseRule));
    /** 上阵英雄:可穿戴圣物 */
    var GodTreasureWearRedPoint = /** @class */ (function (_super) {
        __extends(GodTreasureWearRedPoint, _super);
        function GodTreasureWearRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            return _this;
        }
        GodTreasureWearRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.TreasureEvent.MODIFY_GOD_TREASURE, this.updateState, this);
            this.updateState();
        };
        GodTreasureWearRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodTreasureWearRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanWearTreasure());
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodTreasureWearRedPoint;
    }(game.RedPointBaseRule));
    /** 英雄装备 */
    var GodEquipRedPoint = /** @class */ (function (_super) {
        __extends(GodEquipRedPoint, _super);
        function GodEquipRedPoint(name, gid, slot) {
            var _this = _super.call(this, name) || this;
            _this._gid = gid;
            _this._slot = slot;
            return _this;
        }
        GodEquipRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodEquipRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(5, this, this._updateState);
        };
        GodEquipRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    // 是否未装备
                    this.updateVisible(game.EquipModel.getInstance().slotEquip(godVo, this._slot, true) ? true : false);
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodEquipRedPoint;
    }(game.RedPointBaseRule));
    /** 英雄一键装备 */
    var GodOneKeyEquipRedPoint = /** @class */ (function (_super) {
        __extends(GodOneKeyEquipRedPoint, _super);
        function GodOneKeyEquipRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this._gid = gid;
            return _this;
        }
        GodOneKeyEquipRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodOneKeyEquipRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodOneKeyEquipRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    this.updateVisible(godVo.isCanOneKeyEquip());
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodOneKeyEquipRedPoint;
    }(game.RedPointBaseRule));
    /** 英雄一键强化（装备） */
    var GodOneKeyStrengthRedPoint = /** @class */ (function (_super) {
        __extends(GodOneKeyStrengthRedPoint, _super);
        function GodOneKeyStrengthRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this._gid = gid;
            return _this;
        }
        GodOneKeyStrengthRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodOneKeyStrengthRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodOneKeyStrengthRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    this.updateVisible(game.EquipModel.getInstance().isCanSth(null, godVo, false));
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodOneKeyStrengthRedPoint;
    }(game.RedPointBaseRule));
    /** 英雄一键精炼（装备） */
    var GodOneKeyRefineRedPoint = /** @class */ (function (_super) {
        __extends(GodOneKeyRefineRedPoint, _super);
        function GodOneKeyRefineRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this._gid = gid;
            return _this;
        }
        GodOneKeyRefineRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodOneKeyRefineRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodOneKeyRefineRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    this.updateVisible(game.EquipModel.getInstance().isCanRefine(null, godVo, false));
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodOneKeyRefineRedPoint;
    }(game.RedPointBaseRule));
    /** 装备宝石镶嵌 */
    var EquipWearGemsRedPoint = /** @class */ (function (_super) {
        __extends(EquipWearGemsRedPoint, _super);
        function EquipWearGemsRedPoint(name, key, slot, type) {
            var _this = _super.call(this, name) || this;
            _this._key = key;
            _this._gemType = type;
            _this._gemSlot = slot;
            return _this;
        }
        EquipWearGemsRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GemstoneEvent.MODIFY_GOD_GEMTONE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GemstoneEvent.MODIFY_GEMTONE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GemstoneEvent.ADD_GEMTONE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GemstoneEvent.DEL_GEMTONE, this.updateState, this);
            this.updateState();
        };
        EquipWearGemsRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.EQUIP_BAOSHI))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        EquipWearGemsRedPoint.prototype._updateState = function () {
            var vo = App.hero.getGodVoById(this._key);
            if (!vo)
                return;
            var gemVo = vo.getGemsBySlot(this._gemSlot);
            if (gemVo) {
                this.updateVisible(game.GemstoneModel.getInstance().isHasBetterGem(this._gemType, gemVo.gemLv));
            }
            else {
                var findVo = game.GemstoneModel.getInstance().getGemstoneByType(this._gemType);
                this.updateVisible(findVo ? findVo.num > 0 : false);
            }
        };
        return EquipWearGemsRedPoint;
    }(game.RedPointBaseRule));
    /** 可融魂红点 */
    var GodFusionBallRedPoint = /** @class */ (function (_super) {
        __extends(GodFusionBallRedPoint, _super);
        function GodFusionBallRedPoint(name, gid, type, times) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            _this.type = type;
            _this.times = times;
            return _this;
        }
        GodFusionBallRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.RONGHUN_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodFusionBallRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.RONGHUN))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodFusionBallRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (!godVo)
                return;
            var fusionTab = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            if (!fusionTab) {
                return;
            }
            var numAry = new Array();
            switch (this.type) {
                case 1:
                    numAry = fusionTab.cost_hp;
                    break;
                case 2:
                    numAry = fusionTab.cost_atk;
                    break;
                case 3:
                    numAry = fusionTab.cost_def;
                    break;
            }
            var attr = godVo.countRonghunAttr();
            var haveItem = App.hero.getBagItemNum(numAry[0][0]);
            if (this.times == 1) {
                this.updateVisible(haveItem >= numAry[0][1] && (!godVo.fuseAttrLevels[this.type] || attr[this.type] < fusionTab.attr_max[this.type - 1][1]));
            }
            else {
                this.updateVisible(haveItem >= Number(numAry[0][1]) * 10 && (!godVo.fuseAttrLevels[this.type] || attr[this.type] < fusionTab.attr_max[this.type - 1][1]));
            }
        };
        return GodFusionBallRedPoint;
    }(game.RedPointBaseRule));
    /** 可升星红点 */
    var GodStarUpRedPoint = /** @class */ (function (_super) {
        __extends(GodStarUpRedPoint, _super);
        function GodStarUpRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            return _this;
        }
        GodStarUpRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.GOD_PORP_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodStarUpRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.SHENGXING))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodStarUpRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanStarUp(true));
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodStarUpRedPoint;
    }(game.RedPointBaseRule));
    /** 可觉醒红点 */
    var GodAwakenRedPoint = /** @class */ (function (_super) {
        __extends(GodAwakenRedPoint, _super);
        function GodAwakenRedPoint(name, gid) {
            var _this = _super.call(this, name) || this;
            _this.gid = gid;
            return _this;
        }
        GodAwakenRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.GodEvent.GOD_PORP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodAwakenRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.JUEXING))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodAwakenRedPoint.prototype._updateState = function () {
            var godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                var gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanAwaken());
                }
                else {
                    this.updateVisible(false);
                }
            }
            else {
                this.updateVisible(false);
            }
        };
        return GodAwakenRedPoint;
    }(game.RedPointBaseRule));
    /** 竞技场次数满了 */
    var JingjichangFullRedPoint = /** @class */ (function (_super) {
        __extends(JingjichangFullRedPoint, _super);
        // public max: number = 0;
        function JingjichangFullRedPoint(name) {
            return _super.call(this, name) || this;
        }
        JingjichangFullRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            // this.max = tb.TB_arena_new_set.getArenaNewSet().limit_num;
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        };
        JingjichangFullRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        JingjichangFullRedPoint.prototype._updateState = function () {
            this.updateVisible(App.hero.arenaNum > 0 && App.IsSysOpen(ModuleConst.JINGJI));
        };
        JingjichangFullRedPoint.prototype.onDispose = function () {
            _super.prototype.onDispose.call(this);
        };
        return JingjichangFullRedPoint;
    }(game.RedPointBaseRule));
    /** 竞技场记录 */
    // class JingjichangRecordRedPoint extends RedPointBaseRule {
    //     constructor(name) {
    //         super(name);
    //     }
    //     init(): void {
    //         super.init();
    //         Pan3d.ModuleEventManager.addEvent(ArenaEvent.UPDATE_ZHANDOU_JILU_DATA, this.updateState, this);
    //         this.updateState();
    //     }
    //     private updateState(): void {
    //         Laya.timer.frameOnce(3, this, this._updateState);
    //     }
    //     private _updateState(): void {
    //         this.updateVisible(ArenaModel.getInstance().isHasNewRecord());
    //     }
    // }
    /** 竞技场匹配赛是否可领取宝箱 */
    var MatchRewardRedPoint = /** @class */ (function (_super) {
        __extends(MatchRewardRedPoint, _super);
        function MatchRewardRedPoint(name) {
            return _super.call(this, name) || this;
        }
        MatchRewardRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ArenaEvent.MATCH_REWARD_BOX_SUCC, this.updateState, this);
            this.updateState();
        };
        MatchRewardRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        MatchRewardRedPoint.prototype._updateState = function () {
            this.updateVisible(game.MatchModel.getInstance().isCanReward());
        };
        return MatchRewardRedPoint;
    }(game.RedPointBaseRule));
    /** 匹配赛满次数时显示红点 */
    var MatchCountRedPoint = /** @class */ (function (_super) {
        __extends(MatchCountRedPoint, _super);
        function MatchCountRedPoint(name) {
            return _super.call(this, name) || this;
        }
        MatchCountRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        };
        MatchCountRedPoint.prototype.updateState = function () {
            if (!App.IsSysOpen(ModuleConst.MATCH_FIGHT))
                return;
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        MatchCountRedPoint.prototype._updateState = function () {
            this.updateVisible(App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.matchNum) >= tb.TB_match_set.getSet().limit_num);
        };
        return MatchCountRedPoint;
    }(game.RedPointBaseRule));
    /** 集市红点规则 */
    var JishiRedPoint = /** @class */ (function (_super) {
        __extends(JishiRedPoint, _super);
        function JishiRedPoint(name) {
            return _super.call(this, name) || this;
        }
        JishiRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            // Pan3d.ModuleEventManager.addEvent(ShopEvent.REFRESH_JISHI_RP, this.updateState, this);
            this.updateState();
        };
        JishiRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        JishiRedPoint.prototype._updateState = function () {
            // this.updateVisible(App.serverTimeSecond >= App.hero.marketRefreshTime || App.hero.marketRefreshTime == 0);
        };
        return JishiRedPoint;
    }(game.RedPointBaseRule));
    /** 神界之门红点规则 */
    var GodDoorRedPoint = /** @class */ (function (_super) {
        __extends(GodDoorRedPoint, _super);
        function GodDoorRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GodDoorRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GodDoorEvent.OPEN_DOOR_EVENT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        };
        GodDoorRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodDoorRedPoint.prototype._updateState = function () {
            this.updateVisible(App.hero.getBagItemNum(CostTypeKey.shenjiemiyao) > 0 && App.IsSysOpen(ModuleConst.SHENMEN));
        };
        return GodDoorRedPoint;
    }(game.RedPointBaseRule));
    /** 荣耀之战可报名 */
    var GloryJoinRedPoint = /** @class */ (function (_super) {
        __extends(GloryJoinRedPoint, _super);
        function GloryJoinRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GloryJoinRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GloryEvent.JOIN_SUCCESS, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        };
        GloryJoinRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GloryJoinRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GloryModel.getInstance().isCanJoin());
        };
        return GloryJoinRedPoint;
    }(game.RedPointBaseRule));
    /** 荣耀之战登录红点 */
    var GloryLoginRedPoint = /** @class */ (function (_super) {
        __extends(GloryLoginRedPoint, _super);
        function GloryLoginRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GloryLoginRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.GloryEvent.SHOW_REDPOINT, this.updateState, this);
            this.updateState();
        };
        GloryLoginRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GloryLoginRedPoint.prototype._updateState = function () {
            var isFirstLogin = App.hero.loginCount == 1;
            this.updateVisible(game.GloryModel.getInstance().isOpen() && isFirstLogin && !game.GloryModel.getInstance().isHasShow);
        };
        return GloryLoginRedPoint;
    }(game.RedPointBaseRule));
    /** 激战神域挑战红点 */
    var GodDmChallengeRedPoint = /** @class */ (function (_super) {
        __extends(GodDmChallengeRedPoint, _super);
        function GodDmChallengeRedPoint(name) {
            return _super.call(this, name) || this;
        }
        GodDmChallengeRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        };
        GodDmChallengeRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        GodDmChallengeRedPoint.prototype._updateState = function () {
            this.updateVisible(game.GodDomainModel.getInstance().challengeRp());
        };
        return GodDmChallengeRedPoint;
    }(game.RedPointBaseRule));
    /** 快速战斗红点 */
    var FastFightRedPoint = /** @class */ (function (_super) {
        __extends(FastFightRedPoint, _super);
        function FastFightRedPoint(name) {
            return _super.call(this, name) || this;
        }
        FastFightRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        };
        FastFightRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        FastFightRedPoint.prototype._updateState = function () {
            var freenum = App.hero.totalFreeCount(iface.tb_prop.limitTypeKey.fastFrightFreeNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.fastFrightFreeNum);
            this.updateVisible(freenum > 0);
        };
        return FastFightRedPoint;
    }(game.RedPointBaseRule));
    /** 进阶之路红点 */
    var UpRoadRedPoint = /** @class */ (function (_super) {
        __extends(UpRoadRedPoint, _super);
        function UpRoadRedPoint(name) {
            return _super.call(this, name) || this;
        }
        UpRoadRedPoint.prototype.init = function () {
            _super.prototype.init.call(this);
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_LEVEL_CHANGE, this.updateLevel, this);
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_COUNT_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(game.UpRoadEvent.UR_REWARD_CHANGE, this.updateState, this);
            this.updateLevel();
        };
        UpRoadRedPoint.prototype.updateLevel = function () {
            var lv = App.hero.tasks.advanceLevel;
            var maxlv = tb.TB_advance_road.getMaxLevel();
            var idx = lv >= maxlv ? maxlv : lv + 1;
            this._curAdvanceRoadT = tb.TB_advance_road.getSet(idx);
            this.updateState();
        };
        UpRoadRedPoint.prototype.updateState = function () {
            Laya.timer.frameOnce(3, this, this._updateState);
        };
        UpRoadRedPoint.prototype._updateState = function () {
            var show = false;
            if (this._curAdvanceRoadT) {
                var conditions = this._curAdvanceRoadT.getCondition();
                for (var i = 0; i < conditions.length; i++) {
                    var conditionT = conditions[i];
                    var info = App.hero.tasks.advanceInfos[conditionT.ID];
                    if (info && (!info.reward || info.reward < 1)) {
                        //还没领取
                        var hasNum = info.count ? info.count : 0;
                        if (hasNum >= conditionT.num) {
                            show = true;
                            break;
                        }
                    }
                }
            }
            this.updateVisible(show);
        };
        return UpRoadRedPoint;
    }(game.RedPointBaseRule));
    /** 注册红点 */
    function registerRedPoint() {
        // 邮件
        game.RedPointManager.injection(new MailRedPoint('mail_mail'));
        // RedPointManager.injection(new FriendPointRedPoint('mail_friendpoint'));
        game.RedPointManager.injection(new game.RedPointGroup('mail_group', ['mail_mail']));
        //图鉴
        game.FateModel.getInstance().initFateList();
        var arrFateVo = game.FateModel.getInstance().arrFateVo;
        var strary = [];
        for (var i = 0; i < arrFateVo.length; i++) {
            var fatevo = arrFateVo[i];
            if (!fatevo.isActiviteComplete()) {
                var strKey = 'fate_' + fatevo.tbGodFate.ID;
                strary.push(strKey);
                game.RedPointManager.injection(new godFateRedPoint(strKey, fatevo));
            }
        }
        game.RedPointManager.injection(new game.RedPointGroup('godFateRedPoint', strary));
        game.RedPointManager.injection(new game.RedPointGroup('tujian_group', ['godFateRedPoint']));
        // 好友
        game.RedPointManager.injection(new FriendApplyRedPoint('friend_apply'));
        game.RedPointManager.injection(new FriendPrivateChatRedPoint('friend_privatechat'));
        game.RedPointManager.injection(new game.RedPointGroup('friend_group', ['friend_apply', 'friend_privatechat']));
        // 集市
        game.RedPointManager.injection(new JishiRedPoint('jishi_group'));
        // 召唤
        game.RedPointManager.injection(new SummonPropRedPoint('summon_weizhi1', CostTypeKey.weizhi_zhaohuanshu));
        game.RedPointManager.injection(new SummonPropRedPoint('summon_weizhi10', CostTypeKey.weizhi_zhaohuanshu));
        game.RedPointManager.injection(new SummonPropRedPoint('summon_shenmi1', CostTypeKey.shenmi_zhaohuanshu));
        game.RedPointManager.injection(new SummonPropRedPoint('summon_shenmi10', CostTypeKey.shenmi_zhaohuanshu));
        game.RedPointManager.injection(new SummonPropRedPoint('summon_friend10', iface.tb_prop.resTypeKey.friend));
        game.RedPointManager.injection(new SummonVipRedPoint('summon_legend'));
        game.RedPointManager.injection(new game.RedPointGroup('summon_group', ['summon_weizhi10', 'summon_shenmi1', 'summon_shenmi10', 'summon_friend10', 'summon_legend']));
        // 竞技场
        game.RedPointManager.injection(new JingjichangFullRedPoint('jingjichang_count'));
        // RedPointManager.injection(new JingjichangRecordRedPoint('jingjichang_record'));
        game.RedPointManager.injection(new game.RedPointGroup('jingjichang_group', ['jingjichang_count']));
        game.RedPointManager.injection(new MatchRewardRedPoint('jjc_match_award'));
        game.RedPointManager.injection(new MatchCountRedPoint('jjc_match_count'));
        game.RedPointManager.injection(new game.RedPointGroup('jjc_match_group', ['jjc_match_award', 'jjc_match_count']));
        game.RedPointManager.injection(new game.RedPointGroup('jingjichang_root_group', ['jingjichang_group', 'jjc_match_group']));
        // 神界之门
        game.RedPointManager.injection(new GodDoorRedPoint('godDoor_kaiqi'));
        game.RedPointManager.injection(new game.RedPointGroup('godDoor_group', ['godDoor_kaiqi']));
        //金币兑换
        game.RedPointManager.injection(new ExchangeGoldRedPoint('exchange_gold'));
        game.RedPointManager.injection(new ChatRedPoint('chat_group'));
        //每日副本
        var dailyNums = [iface.tb_prop.overplusTypeKey.dailyCopyNum1, iface.tb_prop.overplusTypeKey.dailyCopyNum2, iface.tb_prop.overplusTypeKey.dailyCopyNum3];
        var tabGroups = [];
        for (var _i = 0, dailyNums_1 = dailyNums; _i < dailyNums_1.length; _i++) {
            var dailyNum = dailyNums_1[_i];
            tabGroups.push("dailyCoyp_tab" + dailyNum);
            game.RedPointManager.injection(new DailyCopyRedPoint("dailyCoyp_Challenge" + dailyNum, dailyNum));
            game.RedPointManager.injection(new game.RedPointGroup("dailyCoyp_tab" + dailyNum, ["dailyCoyp_Challenge" + dailyNum]));
        }
        game.RedPointManager.injection(new game.RedPointGroup('dailycopy_group', tabGroups));
        // 远征
        game.RedPointManager.injection(new YuanzhengDispatchRedPoint('yuanzheng_dispatch'));
        game.RedPointManager.injection(new game.RedPointGroup('yuanzheng_group', ["yuanzheng_dispatch"]));
        // 组队挑战
        game.RedPointManager.injection(new TeamRewardRedPoint('team_reward'));
        game.RedPointManager.injection(new CopyTeamApplyRedPoint('CopyTeamRp'));
        game.RedPointManager.injection(new game.RedPointGroup('team_group', ["team_reward", "CopyTeamRp"]));
        //排行榜
        var rankingList = [];
        var rankingListData = game.RankModel.getInstance().arrRankListName;
        for (var key in rankingListData) {
            rankingList.push(rankingListData[key][1]);
            game.RedPointManager.injection(new RankingListRedPoint(rankingListData[key][1], rankingListData[key][2]));
        }
        game.RedPointManager.injection(new game.RedPointGroup('rankingList_group', rankingList));
        // 世界boss
        game.RedPointManager.injection(new WorldBossRedPoint('boss_count'));
        game.RedPointManager.injection(new game.RedPointGroup('boss_group', ['boss_count']));
        // 公会
        game.RedPointManager.injection(new GuildChallengeNumRedPoint('guild_challenge'));
        game.RedPointManager.injection(new GuildRewardRedPoint('guild_reward'));
        game.RedPointManager.injection(new game.RedPointGroup('guild_copy_group', ['guild_challenge', 'guild_reward']));
        game.RedPointManager.injection(new GuildApplyRedPoint('guild_apply'));
        game.RedPointManager.injection(new game.RedPointGroup('guild_hall_group', ['guild_apply']));
        game.RedPointManager.injection(new GuildDonateRedPoint('guild_donate'));
        game.RedPointManager.injection(new GuildSkillRedPoint('guild_skill'));
        game.RedPointManager.injection(new GuildWarAwardRedPoint('guild_war_award'));
        game.RedPointManager.injection(new GuildWarJoinRedPoint('guild_war_join'));
        game.RedPointManager.injection(new game.RedPointGroup('guild_war_group', ['guild_war_award', 'guild_war_join']));
        // 公会援助
        game.RedPointManager.injection(new GuildAskHelpRedPoint('guild_help_ask'));
        game.RedPointManager.injection(new GuildAwardRedPoint('guild_help_award'));
        game.RedPointManager.injection(new game.RedPointGroup('guild_help_my_group', ['guild_help_ask', 'guild_help_award']));
        game.RedPointManager.injection(new GuildHelpOthersRedPoint('guild_help_others'));
        game.RedPointManager.injection(new game.RedPointGroup('guild_help_group', ['guild_help_my_group', 'guild_help_others']));
        game.RedPointManager.injection(new game.RedPointGroup('guild_root_group', ['guild_donate', 'guild_copy_group', 'guild_hall_group', 'guild_skill', 'guild_war_group', 'guild_help_group']));
        // 商队护送
        game.RedPointManager.injection(new EscortRedPoint('escort_escort'));
        game.RedPointManager.injection(new EscortRecordRedPoint('escort_record'));
        game.RedPointManager.injection(new EscortRewardRedPoint('escort_reward'));
        game.RedPointManager.injection(new game.RedPointGroup('escort_group', ['escort_escort', 'escort_record', 'escort_reward']));
        //迷雾森林
        game.RedPointManager.injection(new ForestMaxRedPoint('forest_MaxGuanqia'));
        game.RedPointManager.injection(new ForestOneKeyRedPoint('forest_onekey'));
        game.RedPointManager.injection(new ForestRedPoint('forest_reward'));
        game.RedPointManager.injection(new game.RedPointGroup('forest_group', ['forest_reward', 'forest_onekey', 'forest_MaxGuanqia']));
        // 神秘岛屿
        game.RedPointManager.injection(new IslandRecordRedPoint('island_record'));
        //岛屿占领到期红点，不需要绑定ui。只需要显示在外层
        game.RedPointManager.injection(new IslandRecordRedPoint('island_endtime'));
        game.RedPointManager.injection(new game.RedPointGroup('island_group', ['island_record', 'island_endtime']));
        // 荣耀之战
        game.RedPointManager.injection(new GloryJoinRedPoint('glory_join'));
        game.RedPointManager.injection(new GloryLoginRedPoint('glory_login'));
        game.RedPointManager.injection(new game.RedPointGroup('glory_group', ['glory_join', 'glory_login']));
        // 激战神域
        game.RedPointManager.injection(new GodDmChallengeRedPoint('goddm_challenge'));
        game.RedPointManager.injection(new game.RedPointGroup('godDm_group', ['goddm_challenge']));
        //进阶之路
        game.RedPointManager.injection(new UpRoadRedPoint('uproad_red'));
        //快速战斗
        game.RedPointManager.injection(new FastFightRedPoint('fast_fight'));
        var groupObj = {};
        var groupNameList = [];
        var upperBtnVos = game.HudModel.getInstance().upperBtnVos;
        for (var key_1 in upperBtnVos) {
            var vo = upperBtnVos[key_1];
            groupObj[vo.sysOpenId] = vo.redpointName;
            groupNameList.push(vo.redpointName);
        }
        registerActivityGroup(groupObj);
        registerBagGroup();
        //首页
        game.RedPointManager.injection(new game.RedPointGroup('main_group', ['guild_root_group', 'godDoor_group', 'summon_group', 'jishi_group', 'mail_group', 'task_group', 'tujian_group', 'friend_group', 'rankingList_group'].concat(groupNameList)));
        //圣城
        game.RedPointManager.injection(new game.RedPointGroup('shengcheng_group', []));
        registerGodAndEquipGroup();
        registerArtifactGroup();
        registerGuajiGroup();
        //初始化背包限时道具红点
        registerTimeItemGroup();
        for (var key_2 in tb.TB_function.FUNCTION_GROUP_REDPOINT) {
            game.RedPointManager.injection(new game.RedPointGroup('function' + key_2, tb.TB_function.FUNCTION_GROUP_REDPOINT[key_2]));
        }
    }
    game.registerRedPoint = registerRedPoint;
    /** 注册活动红点 */
    function registerActivityGroup(groupObj) {
        // 限时活动
        var keyary = tb.TB_operate_activity.gettimeIdx();
        var timeacKey = [];
        for (var i_1 = 0; i_1 < keyary.length; i_1++) {
            var id = keyary[i_1];
            var str = "timeActivity" + id;
            timeacKey.push(str);
            game.RedPointManager.injection(new TimeActivityRedPoint(str, id));
        }
        //开服团购
        var ctime = tb.TB_activity_set.getTabSet().group_buy_time;
        var openbuyendtime = App.hero.openSvrTime + ctime;
        if (openbuyendtime > App.getServerTime()) {
            //在开服指定时间内
            var str = "timeActivity" + game.TimelimitModel.ACTIVITY_OPENBUY_ID;
            timeacKey.push(str);
            game.RedPointManager.injection(new TimeActivityGroupBuyRedPoint(str));
        }
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.activity], timeacKey));
        //开服基金
        var funddata = TableData.getInstance().getTableByName(TableData.tb_fund).data;
        var fundKey = [];
        for (var key_3 in funddata) {
            var id = funddata[key_3].ID;
            var str = "FundActivity" + id;
            fundKey.push(str);
            game.RedPointManager.injection(new TimeActivityFundRedPoint(str, id));
        }
        game.RedPointManager.injection(new game.RedPointGroup("timeActivity" + game.TimelimitModel.ACTIVITY_JIJIN_ID, fundKey));
        //分享活动
        var shareKey = [];
        var ary = tb.TB_share.getTB_share();
        for (var i = 0; i < ary.length; i++) {
            var str = "shareActivity" + ary[i].ID;
            shareKey.push(str);
            game.RedPointManager.injection(new ShareRedPoint(str, ary[i].ID));
        }
        game.RedPointManager.injection(new ShareRedPoint("shareActivity0", 0));
        shareKey.push('shareActivity0');
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.share], shareKey));
        //微端下载
        game.RedPointManager.injection(new WeiDuanXiaZaiPoint('downClient'));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.microClient], ['downClient']));
        //绑定手机红点
        game.RedPointManager.injection(new BindPhoneRedPoint("bindPhoneActivity"));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.bindGift], ['bindPhoneActivity']));
        //超级vip
        game.RedPointManager.injection(new SuperVipRedPoint("superVipActivity"));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.superVip], ['superVipActivity']));
        //内侧返利
        game.RedPointManager.injection(new TestRebateRedPoint("testRebateActivity"));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[ModuleConst.TEST_REBATE], ['testRebateActivity']));
        //勇者之证
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[ModuleConst.WARRIOR_PROVE], ['task_group']));
        //在线奖励
        var onLineKey = [];
        var boxVoAry = game.OnlineModel.getInstance().getList();
        for (var i = 0; i < boxVoAry.length; i++) {
            var itemvo = boxVoAry[i];
            if (!itemvo.isReceive()) {
                var str = "onlineActivity" + itemvo.id;
                onLineKey.push(str);
                game.RedPointManager.injection(new OnlineRedPoint(str, itemvo));
            }
        }
        if (onLineKey && onLineKey.length > 0) {
            game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.onlineAward], onLineKey));
        }
        //开服豪礼
        var openKey = [];
        var dayVoAry = game.OpenserverModel.getInstance().getList();
        for (var i = 0; i < dayVoAry.length; i++) {
            var itemvo = dayVoAry[i];
            if (!itemvo.isReceive()) {
                var str = "openRewardActivity" + itemvo.id;
                openKey.push(str);
                game.RedPointManager.injection(new OpenRewardRedPoint(str, itemvo));
            }
        }
        if (openKey && openKey.length > 0) {
            game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.openGift], openKey));
        }
        //限时热购
        game.RedPointManager.injection(new LimiteBuyRewardRedPoint('limitebuy_reward'));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.timeLimitBuy], ['limitebuy_reward']));
        //福利
        game.RedPointManager.injection(new XuyuanRedPoint('fuli_xuyuan'));
        game.RedPointManager.injection(new DengjiRedPoint('fili_dengji'));
        game.RedPointManager.injection(new QiandaoRedPoint('fuli_qiandao'));
        // RedPointManager.injection(new RealNameRedPoint('fuli_shiming'));
        game.RedPointManager.injection(new EveryDaySignRedPoint('fuli_meiri'));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.welfare], ['fuli_xuyuan', 'fuli_qiandao', 'fili_dengji', 'fuli_meiri']));
        //充值活动 -- 等级基金、月卡
        game.RedPointManager.injection(new JijinRedPoint('fuli_jijin'));
        game.RedPointManager.injection(new MonthRedPoint('month_reward'));
        game.RedPointManager.injection(new LifeRedPoint('life_reward'));
        game.RedPointManager.injection(new game.RedPointGroup('fuli_yueka', ['month_reward', 'life_reward']));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.payActivity], ["fuli_jijin", 'fuli_yueka']));
        /**幸运转盘 */
        game.RedPointManager.injection(new luckyGodRedPoint('lucky_god'));
        game.RedPointManager.injection(new luckyEquipExtRedPoint('lucky_equip_reward'));
        game.RedPointManager.injection(new luckyEquipExtFreeRedPoint('lucky_equip_free'));
        game.RedPointManager.injection(new game.RedPointGroup("lucky_equip", ['lucky_equip_reward', 'lucky_equip_free']));
        game.RedPointManager.injection(new luckyArtRedPoint('lucky_art'));
        game.RedPointManager.injection(new luckyTreasureFreeRedPoint('lucky_treasure_free'));
        game.RedPointManager.injection(new luckyTreasureRewardRedPoint('lucky_treasure_reward'));
        game.RedPointManager.injection(new game.RedPointGroup("lucky_treasure", ['lucky_treasure_free', 'lucky_treasure_reward']));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.luckTurnTable], ['lucky_god', 'lucky_equip', 'lucky_treasure']));
        /** 神力排行 */
        game.RedPointManager.injection(new PowerRankRedPoint(groupObj[iface.tb_prop.sysOpenTypeKey.godRank]));
        /** 充值 */
        game.RedPointManager.injection(new tequanRedPoint('tequan_canbuy'));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.recharge], ['tequan_canbuy']));
        /** 变强 */
        var challenges = game.BianQiangModel.getInstance().getChallengeTabTypeList();
        challenges.forEach(function (id) {
            game.RedPointManager.injection(new ChallengeTabRedpoint("challenge_tab_" + id, id));
        });
        game.RedPointManager.injection(new game.RedPointGroup('achievement_challenge', challenges.map(function (id) {
            return "challenge_tab_" + id;
        })));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.beStrong], ['achievement_challenge']));
        // 首充
        var firstRecharge = [];
        var shouchongData = game.ChongzhiModel.getInstance().firstRechargeName;
        for (var key in shouchongData) {
            firstRecharge.push(shouchongData[key][1]);
            game.RedPointManager.injection(new FirstRechargeRedPoint(shouchongData[key][1], Number(key)));
        }
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.firstCharge], firstRecharge));
        //七日狂欢
        var sevendays = [];
        var sevendaysData = game.SevendaysModel.getInstance().arrDays;
        var sevendaysProData = game.SevendaysModel.getInstance().arrProJect;
        for (var key in sevendaysData) {
            sevendays.push(sevendaysData[key][1]);
        }
        for (var i_2 = 0; i_2 < sevendays.length; i_2++) {
            var rpArr = [];
            for (var key in sevendaysProData) {
                var name_1 = sevendaysProData[key][1] + i_2;
                rpArr.push(name_1);
                game.RedPointManager.injection(new SevendaysRedPoint(name_1, i_2, Number(key)));
            }
            game.RedPointManager.injection(new game.RedPointGroup(sevendays[i_2], rpArr));
        }
        game.RedPointManager.injection(new SevendaysExtRedPoint("sevendayExt"));
        var cc = sevendays.concat("sevendayExt");
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.sevenDay], cc));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.halfMonth], cc));
        //登入礼包
        for (var i_3 = 1; i_3 <= tb.TB_sevendays.TYPE_NUM; i_3++) {
            game.RedPointManager.injection(new LoginGiftRedPoint("login_gift" + i_3, i_3));
        }
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[ModuleConst.LOGIN_QIRI], ['login_gift1']));
        game.RedPointManager.injection(new game.RedPointGroup(groupObj[ModuleConst.LOGIN_SHISIRI], ['login_gift2']));
    }
    game.registerActivityGroup = registerActivityGroup;
    /** 注册背包 */
    function registerBagGroup() {
        var bagTypeData = game.BagModel.bagTypeName;
        var bagItemNameAry = [];
        var materialsAry = [];
        var materialsItem = tb.TB_item.get_TB_item("type", "2");
        materialsItem = materialsItem.concat(tb.TB_item.get_TB_item("type", "10"));
        for (var i = 0; i < materialsItem.length; i++) {
            var id = "bag_material_" + materialsItem[i].ID;
            materialsAry.push(id);
            game.RedPointManager.injection(new BagMaterialRedPoint(id, materialsItem[i].ID));
        }
        var suipianAry = [];
        var allSuipianItem = tb.TB_item.get_TB_item("type", "6");
        for (var j = 0; j < allSuipianItem.length; j++) {
            var suipianid = "bag_suipian_" + allSuipianItem[j].ID;
            suipianAry.push(suipianid);
            game.RedPointManager.injection(new BagSuipianRedPoint(suipianid, allSuipianItem[j].ID));
        }
        bagItemNameAry = materialsAry.concat(suipianAry);
        for (var i = 0; i < bagTypeData.length; i++) {
            var templist = [];
            if (bagTypeData[i] == "bag_group_all") {
                templist = bagItemNameAry;
            }
            else if (bagTypeData[i] == "bag_group_suipian") {
                templist = suipianAry;
            }
            else if (bagTypeData[i] == "bag_group_cailiao") {
                templist = materialsAry;
            }
            game.RedPointManager.injection(new game.RedPointGroup(bagTypeData[i], templist));
        }
        game.RedPointManager.injection(new game.RedPointGroup('bag_group', bagTypeData));
    }
    game.registerBagGroup = registerBagGroup;
    /**
     * 初始化时调用
     * 动态注册限时物品红点
     * */
    function registerTimeItemGroup() {
        for (var key in App.hero.bagTimeItemsObj) {
            addTimeItem2Group(key, App.hero.bagTimeItemsObj[key]);
        }
    }
    game.registerTimeItemGroup = registerTimeItemGroup;
    /**
     * 新增一个限时物品
     */
    function addTimeItem2Group(uuid, obj) {
        // logyhj("新注册一个限时物品红点", uuid);
        var bag_group_all = game.RedPointManager.getRule('bag_group_all');
        var bag_group_cailiao = game.RedPointManager.getRule('bag_group_cailiao');
        var id = "bag_timeItem_" + uuid;
        var rule = new BagTimeItemRedPoint(id, obj.limitTime > 0 ? obj.limitTime : 0);
        game.RedPointManager.injection(rule);
        if (bag_group_all) {
            bag_group_all.addRule(rule);
        }
        bag_group_cailiao.addRule(rule);
    }
    game.addTimeItem2Group = addTimeItem2Group;
    /**
     * 删除一个限时物品
     */
    function removeTimeItem2Group(uuid) {
        // logyhj("删除一个限时物品红点", uuid);
        game.RedPointManager.removeRule("bag_timeItem_" + uuid);
    }
    game.removeTimeItem2Group = removeTimeItem2Group;
    /** 挂机战斗 */
    function registerGuajiGroup() {
        // 任务
        game.RedPointManager.injection(new HonorRedpoint('task_achievement_group'));
        game.RedPointManager.injection(new DailyTaskRedPoint('task_daily_group'));
        game.RedPointManager.injection(new WarriorRedPoint('task_warrior_group'));
        game.RedPointManager.injection(new TrialTaskRedPoint('task_trial_week', 0));
        game.RedPointManager.injection(new TrialTaskRedPoint('task_trial_month', 1));
        game.RedPointManager.injection(new TrialTaskGiftRedPoint('task_trial_gift'));
        game.RedPointManager.injection(new game.RedPointGroup('task_trial_group', ['task_trial_week', 'task_trial_month', "task_trial_gift"]));
        game.RedPointManager.injection(new game.RedPointGroup('task_group', ['task_achievement_group', 'task_daily_group', "task_warrior_group", "task_trial_group"]));
        // 挂机奖励
        // RedPointManager.injection(new RuneCopyJiangliRedpoint('lilian_jiangli'));
        // RedPointManager.injection(new RuneCopyBaoXiangRedpoint('lilian_baoxiang'));
        // 探险
        game.RedPointManager.injection(new QiyuRedpoint('adventure_qiyu'));
        game.RedPointManager.injection(new RuneCopyAdventureRedpoin('adventure_count'));
        game.RedPointManager.injection(new game.RedPointGroup('adventure_group', ['adventure_qiyu', 'adventure_count']));
        game.RedPointManager.injection(new game.RedPointGroup('lilian_group', ['adventure_group', 'task_group', 'function100', 'function200', 'function300', 'function400', 'uproad_red', 'fast_fight']));
    }
    game.registerGuajiGroup = registerGuajiGroup;
    /**注册神器 */
    function registerArtifactGroup() {
        /**神器 */
        var artifactIds = [];
        var artifactGroups = [];
        var artifacts = tb.TB_artifact.get_TB_artifact();
        for (var i in artifacts) {
            var id = artifacts[i].ID;
            artifactIds.push(id);
            artifactGroups.push("artifactGroup_" + id);
        }
        for (var _i = 0, artifactIds_1 = artifactIds; _i < artifactIds_1.length; _i++) {
            var id = artifactIds_1[_i];
            var artifactsG = "artifactGroup_" + id;
            var artifactPros = ["artifact_activate_" + id, "artifact_strength_" + id, "artifact_skillUp_" + id, "artifact_pbaptize_" + id, "artifact_gbaptize_" + id, "artifact_enchant_" + id];
            var types = [Artifact.ACTIVATE, Artifact.STRENGTH, Artifact.SKILLUPGRADE, Artifact.PBAPTIZE, Artifact.GBAPTIZE, Artifact.ENCHANT];
            for (var i in artifactPros) {
                var name_2 = artifactPros[i];
                game.RedPointManager.injection(new ArtifactRedPoint(name_2, id, types[i]));
            }
            game.RedPointManager.injection(new game.RedPointGroup("artifact_jinengGroup_" + id, ["artifact_skillUp_" + id]));
            game.RedPointManager.injection(new game.RedPointGroup("artifact_enchantGroup_" + id, ["artifact_enchant_" + id]));
            game.RedPointManager.injection(new game.RedPointGroup("artifact_shengjiGroup_" + id, ["artifact_strength_" + id]));
            game.RedPointManager.injection(new game.RedPointGroup("artifact_baptizeGroup_" + id, ["artifact_pbaptize_" + id, "artifact_gbaptize_" + id]));
            game.RedPointManager.injection(new game.RedPointGroup(artifactsG, ["artifact_activate_" + id, "artifact_shengjiGroup_" + id, "artifact_jinengGroup_" + id, "artifact_baptizeGroup_" + id, "artifact_enchantGroup_" + id]));
        }
        game.RedPointManager.injection(new game.RedPointGroup('artifact_RootGroup', artifactGroups));
    }
    game.registerArtifactGroup = registerArtifactGroup;
    /** 动态注册英雄红点组 */
    function registerGodAndEquipGroup() {
        logdebug('重新设置英雄的红点设置');
        var godRootGroup = game.RedPointManager.getRule('shenling_group');
        if (!godRootGroup) {
            godRootGroup = game.RedPointManager.injection(new game.RedPointGroup('shenling_group', []));
        }
        var rootEquipGroup = game.RedPointManager.getRule('shenlingequip_group');
        if (!rootEquipGroup) {
            rootEquipGroup = game.RedPointManager.injection(new game.RedPointGroup('shenlingequip_group', []));
        }
        // 布阵按钮红点
        if (!godRootGroup.hasRule('shenling_buzhen_group')) {
            game.RedPointManager.injection(new BuzhenRedPoint('shenling_buzhen'));
            var buzhenGroup = game.RedPointManager.injection(new game.RedPointGroup('shenling_buzhen_group', ['shenling_buzhen']));
            godRootGroup.addRule(buzhenGroup);
        }
        // 上阵英雄组
        var godIds = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
        var rootGroupNames = godRootGroup.getRuleNames();
        var len = rootGroupNames.length;
        // 移除不在阵容上的英雄红点规则
        for (var i = len - 1; i >= 0; i--) {
            var name_3 = rootGroupNames[i];
            if (name_3.includes("attack_linuep_god_")) {
                var gid = name_3.substr(18);
                if (godIds.indexOf(gid) == -1) {
                    game.RedPointManager.removeRule(name_3);
                }
            }
        }
        var rootEquipGroupNames = rootEquipGroup.getRuleNames();
        var equiplen = rootEquipGroupNames.length;
        // 移除不在阵容上的装备红点规则
        for (var i = equiplen - 1; i >= 0; i--) {
            var name_4 = rootEquipGroupNames[i];
            if (name_4.includes("attack_linuep_god_equip_")) {
                var gid = name_4.substr(24);
                if (godIds.indexOf(gid) == -1) {
                    game.RedPointManager.removeRule(name_4);
                }
            }
        }
        var _loop_1 = function (gid) {
            var name_5 = "attack_linuep_god_" + gid;
            var equipname = "attack_linuep_god_equip_" + gid;
            var godGroup = game.RedPointManager.getRule(name_5);
            if (!godGroup) {
                godGroup = game.RedPointManager.injection(new game.RedPointGroup(name_5, []));
            }
            godRootGroup.addRule(godGroup);
            var godEquipGroup = game.RedPointManager.getRule(equipname);
            if (!godEquipGroup) {
                godEquipGroup = game.RedPointManager.injection(new game.RedPointGroup(equipname, []));
            }
            rootEquipGroup.addRule(godEquipGroup);
            // 可穿戴圣物
            var wearRule = game.RedPointManager.injection(new GodTreasureWearRedPoint("god_treasure_wear_" + gid, gid));
            godGroup.addRule(wearRule);
            // 可激活皮肤
            var skinRule = game.RedPointManager.injection(new GodSkinRedPoint("god_skin_" + gid, gid));
            godGroup.addRule(skinRule);
            //tab红点
            var tabName = game.GodModel.getInstance().tabredName;
            var equiptabName = game.EquipModel.getInstance().equiptabredName;
            var allTabRedName = tabName.map(function (str) { return str + "_" + gid; });
            var equipTabRedName = equiptabName.map(function (str) { return str + "_" + gid; });
            for (var i = 0; i < allTabRedName.length; i++) {
                var tabViewName = [];
                if (i == ShenlingTabType.info) {
                    // 添加上阵英雄升级红点规则
                    tabViewName.push("god_lvup_" + gid);
                    game.RedPointManager.injection(new GodLvupRedPoint("god_lvup_" + gid, gid));
                    // 添加上阵英雄升阶红点规则
                    tabViewName.push("god_dgup_" + gid);
                    game.RedPointManager.injection(new GodDegreeupRedPoint("god_dgup_" + gid, gid));
                }
                else if (i == ShenlingTabType.shengxin) {
                    // 添加上阵英雄升阶红点规则
                    tabViewName.push("god_starup_" + gid);
                    game.RedPointManager.injection(new GodStarUpRedPoint("god_starup_" + gid, gid));
                }
                else if (i == ShenlingTabType.ronghun) {
                    //融魂红点
                    for (var j = 1; j < 4; j++) {
                        var ballGroups = new Array();
                        ballGroups.push("god_ball_" + gid + "_" + j);
                        tabViewName.push("god_ronghun_" + gid + "_" + j);
                        tabViewName.push("god_ronghunten_" + gid + "_" + j);
                        game.RedPointManager.injection(new GodFusionBallRedPoint("god_ball_" + gid + "_" + j, gid, j, 1));
                        game.RedPointManager.injection(new game.RedPointGroup("god_ronghun_" + gid + "_" + j, ballGroups));
                        game.RedPointManager.injection(new GodFusionBallRedPoint("god_ronghunten_" + gid + "_" + j, gid, j, 10));
                    }
                }
                else if (i == ShenlingTabType.awaken) {
                    tabViewName.push("god_awaken_" + gid);
                    game.RedPointManager.injection(new GodAwakenRedPoint("god_awaken_" + gid, gid));
                }
                var tabGroup = game.RedPointManager.injection(new game.RedPointGroup(allTabRedName[i], tabViewName));
                godGroup.addRule(tabGroup);
            }
            for (var i = 0; i < equipTabRedName.length; i++) {
                var tabViewName = [];
                if (i == EquipTabType.strength) {
                    // 装备
                    for (var j = 1; j <= 4; j++) {
                        tabViewName.push("god_equip_" + gid + "_" + j);
                        game.RedPointManager.injection(new GodEquipRedPoint("god_equip_" + gid + "_" + j, gid, j));
                    }
                    // 添加上阵英雄一键装备红点规则
                    tabViewName.push("god_onekey_equip_" + gid);
                    game.RedPointManager.injection(new GodOneKeyEquipRedPoint("god_onekey_equip_" + gid, gid));
                    // 添加上阵英雄一键强化红点规则
                    tabViewName.push("god_onekey_strength_" + gid);
                    game.RedPointManager.injection(new GodOneKeyStrengthRedPoint("god_onekey_strength_" + gid, gid));
                }
                else if (i == EquipTabType.refine) {
                    // 添加上阵英雄一键精炼红点规则
                    tabViewName.push("god_onekey_refine_" + gid);
                    game.RedPointManager.injection(new GodOneKeyRefineRedPoint("god_onekey_refine_" + gid, gid));
                }
                else if (i == EquipTabType.baoshi) {
                    // 添加上阵英雄装备宝石红点规则
                    for (var j = 1; j <= game.EquipModel.EQUIP_COUNT; j++) {
                        tabViewName.push("equip_baoshi_group_" + gid + "_" + j);
                        var baoshiGroup = new Array();
                        for (var k = 1; k <= game.GemstoneModel.gemstone_type_count; k++) {
                            var gemSlot = (j - 1) * game.GemstoneModel.gemstone_type_count + k;
                            baoshiGroup.push("equip_baoshi_" + gid + "_" + gemSlot);
                            game.RedPointManager.injection(new EquipWearGemsRedPoint("equip_baoshi_" + gid + "_" + gemSlot, gid, gemSlot, k));
                        }
                        game.RedPointManager.injection(new game.RedPointGroup("equip_baoshi_group_" + gid + "_" + j, baoshiGroup));
                    }
                }
                var tabGroup = game.RedPointManager.injection(new game.RedPointGroup(equipTabRedName[i], tabViewName));
                godEquipGroup.addRule(tabGroup);
            }
        };
        // 添加阵容上的新的英雄红点规则
        for (var _i = 0, godIds_1 = godIds; _i < godIds_1.length; _i++) {
            var gid = godIds_1[_i];
            _loop_1(gid);
        }
        godRootGroup.runHandler();
        rootEquipGroup.runHandler();
    }
    game.registerGodAndEquipGroup = registerGodAndEquipGroup;
})(game || (game = {}));
