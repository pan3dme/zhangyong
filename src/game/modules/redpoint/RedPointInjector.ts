

module game {

    /**开服豪礼红点规则 */
    class OpenRewardRedPoint extends RedPointBaseRule {
        private _vo: DayVo;
        constructor(name, vo) {
            super(name);
            this._vo = vo;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(OpenserverEvent.RED_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            if (HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.openGift) && this._vo) {
                this.updateVisible(this._vo.isbuy() && !this._vo.isReceive());
                dispatchEvt(new HudEvent(HudEvent.UPDATE_MAINVIEW_BUTTON));
            } else {
                this.updateVisible(false);
            }
        }
    }

    /**在线红点规则 */
    class OnlineRedPoint extends RedPointBaseRule {
        private _vo: BoxVo;
        constructor(name, vo) {
            super(name);
            this._vo = vo;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(OnlineEvent.RED_CHANGE_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            if (HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.onlineAward) && this._vo) {
                this.updateVisible(this._vo.onRedPoint());
                dispatchEvt(new HudEvent(HudEvent.UPDATE_MAINVIEW_BUTTON));
                dispatchEvt(new HudEvent(HudEvent.UPDATE_ONLINEREWARD));
            } else {
                this.updateVisible(false);
            }
        }
    }

    /**绑定手机红点规则 */
    class BindPhoneRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.BIND_PHONE_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            //绑定状态
            let bindok: boolean = App.hero.bindPhone == 1;
            //领取状态
            let receiveok: boolean = App.hero.bindMobileAward != 0;

            dispatchEvt(new HudEvent(HudEvent.UPDATE_MAINVIEW_BUTTON));
            let sysId = iface.tb_prop.sysOpenTypeKey.bindGift;
            this.updateVisible(HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && bindok && !receiveok);
        }
    }

    /** 超级会员红点规则 */
    class SuperVipRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.SUPER_VIP_RP, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.VIP_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            //vip状态
            let bindok: boolean = App.hero.welfare.superVip == 1;
            //领取状态
            let receiveok: boolean = App.hero.welfare.superVipAward == 1;
            let sysId = iface.tb_prop.sysOpenTypeKey.superVip;
            this.updateVisible(HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && (App.hero.vipService != -1) && bindok && !receiveok);
        }
    }
    /** 内侧返利红点规则 */
    class TestRebateRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.TEST_REBATE_RP, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let sysId = ModuleConst.TEST_REBATE;
            this.updateVisible(HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && HuodongModel.getInstance().canRewardTestRebate());
        }
    }

    /**分享红点规则 */
    class ShareRedPoint extends RedPointBaseRule {
        private _id: number;
        constructor(name, type) {
            super(name);
            this._id = type;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ShareEvent.RED_POINT_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.share) && App.IsSysOpen(iface.tb_prop.sysOpenTypeKey.share) && App.hero.shareVisable != -1 && ShareModel.redPointVisiable(this._id));
        }
    }

    /**每日副本 */
    class DailyCopyRedPoint extends RedPointBaseRule {
        private _type: number;
        constructor(name, type) {
            super(name);
            this._type = type;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(DailyCopyModel.getInstance().canRedPoint(this._type));
        }
    }
    /** 远征派遣 */
    class YuanzhengDispatchRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(YuanzhengEvent.YZ_DISPATCH_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if(!App.IsSysOpen(ModuleConst.EXPEDITION)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(YuanzhengModel.getInstance().getDispatchNum() <= 0);
        }
    }
    /** 组队奖励 */
    class TeamRewardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.REWARD_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.UPDATE_GROUP_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if(!App.IsSysOpen(ModuleConst.TEAM_COPY)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(CopyTeamModel.getInstance().isCanReward());
        }
    }

    /** 组队申请列表红点 */
    class CopyTeamApplyRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(CopyTeamEvent.UPDATE_APPLY_RP, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if(!App.IsSysOpen(ModuleConst.TEAM_COPY)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(CopyTeamModel.getInstance().hasApplyRedPoint());
        }
    }

    /**神器 */
    class ArtifactRedPoint extends RedPointBaseRule {
        private _id: number;
        private _type: number;
        constructor(name, id, type) {
            super(name);
            this._id = id;
            this._type = type;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS, this._updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.ARTIFACT)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(ArtifactModel.getInstance().getArtifactRedPoint(this._id, this._type));
        }
    }

    /**排行榜 */
    class RankingListRedPoint extends RedPointBaseRule {
        private _id: number;
        constructor(name, id) {
            super(name);
            this._id = id;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(RankingListEvent.RED_EVENT_RANKLIST, this.updateState, this);
            this.setState(this._id);
        }

        private updateState($evt: RankingListEvent): void {
            Laya.timer.frameOnce(3, this, this._updateState, [$evt]);
        }

        private _updateState($evt: RankingListEvent): void {
            this.setState(this._id);
        }

        private setState(id) {
            // 红点在2-10未通过之前隐藏
            let isPass = GuajiModel.getInstance().isPassCopy(common.GlobalData.GUAJI_COPY_2_10);
            let bool = isPass && RankModel.getInstance().canRedPoint(id);
            this.updateVisible(bool);
        }
    }

    /** 充值 */
    class tequanRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TopUpEvent.UPDATE_TEQUANRED_EVEN, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.VIP_LEVEL_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.recharge) && ChongzhiModel.getInstance().tequanRedPoint());
        }
    }

    /**首充 */
    class FirstRechargeRedPoint extends RedPointBaseRule {
        private _id: number;
        constructor(name, id) {
            super(name);
            this._id = id;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TopUpEvent.SHOUCHONG_RED_EVEN, this.updateState, this);
            this.setState(this._id);
        }

        private updateState($evt: TopUpEvent): void {
            Laya.timer.frameOnce(3, this, this._updateState, [$evt]);
        }

        private _updateState($evt: TopUpEvent): void {
            let id: number = $evt.data;
            if (id && id == this._id) this.setState(id);
            else this.setState(this._id);
        }

        private setState(id) {
            let boolean = ChongzhiModel.getInstance().canRedPoint(id)
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.firstCharge) && boolean);
        }
    }

    /**七日狂欢 */
    class SevendaysRedPoint extends RedPointBaseRule {
        private _id: number;
        private _day: number;
        constructor(name, day, id) {
            super(name);
            this._id = id;
            this._day = day;
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(SevendaysEvent.SEVENDAYS_RED_EVENT, this.updateState, this);
            this.setState(this._day, this._id);
        }


        private updateState($evt: SevendaysEvent): void {
            Laya.timer.frameOnce(3, this, this._updateState, [$evt]);
        }

        private _updateState($evt: SevendaysEvent): void {
            let tab: tb.TB_activity_sevendays = $evt.data;
            if (!tab) {
                this.setState(this._day, this._id);
            } else if (tab.day - ((tab.time_type - 1) * 7) == this._day) {
                this.setState(this._day, this._id);
            }
        }

        private setState(day, id) {
            let boolean = SevendaysModel.getInstance().canRedPoint(day, id)
            this.updateVisible(boolean && HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.sevenDay));
        }
    }

    /**七日狂欢额外奖励 */
    class SevendaysExtRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            this._updateState();
            tl3d.ModuleEventManager.addEvent(SevendaysEvent.SEVENDAYS_RED_EVENT, this._updateState, this);
        }

        private _updateState(): void {
            let bool = SevendaysModel.getInstance().getSevendaysExtList().some(data => data.isCanReward());
            this.updateVisible(bool && HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.sevenDay));
        }
    }

    /** 限时活动 */
    class TimeActivityRedPoint extends RedPointBaseRule {
        private _id: number;
        constructor(name, id) {
            super(name);
            this._id = id;
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TimelimitEvent.RED_EVENT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            //注册红点时，数据还没从服务端获取到，所以不需要执行红点事件
            if (TimelimitModel.getInstance().hasActivity())
                this.setState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this.setState);
        }

        private setState() {
            let boolean = TimelimitModel.getInstance().canRedPoint(this._id)
            // logyhj("活动 %d , 红点状态：%s",this._id,boolean);
            this.updateVisible(boolean && HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.activity));
        }
    }

    /** 限时团购活动 */
    class TimeActivityGroupBuyRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            this.updateState();
            tl3d.ModuleEventManager.addEvent(TimelimitEvent.GROUP_RED_EVENT, this.updateState, this);
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this.setState);
        }

        private setState() {
            let boolean = TimelimitModel.getInstance().canGroupBuyRedPoint();
            this.updateVisible(boolean && HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.activity));
        }
    }

    /** 限时活动--基金 */
    class TimeActivityFundRedPoint extends RedPointBaseRule {
        private _id: number;
        private _fundList: tb.TB_fund_reward[];
        constructor(name, id) {
            super(name);
            this._id = id;
            this._fundList = tb.TB_fund_reward.getFundListByType(id);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TimelimitEvent.FUND_RED_EVENT, this.updateState, this);
            this.setState();

        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this.setState);
        }

        private setState() {
            this.updateVisible(this.isCanReceive());
        }

        private isCanReceive(): boolean {
            if(!HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.openSvrFund)) {
				return false;
			}
            if (App.hero.welfare.weekFund.indexOf(this._id) == -1) return false;//未购买基金
            let openTime: number = App.getOpenServerTime();
            let curTime: number = App.getServerTime();
            let day: number = (curTime - openTime) / 86400;
            for (let i: number = 0; i < this._fundList.length; i++) {
                let reward: tb.TB_fund_reward = this._fundList[i];
                if (day >= reward.value - 1) {
                    //在时间内
                    if (App.hero.welfare.weekFundAward.indexOf(reward.ID) == -1) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    /** 限时团购 */
    class LimiteBuyRewardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(LimiteBuyEvent.UPDATE_RP, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.timeLimitBuy) && LimiteBuyModel.getInstance().isVisible());
        }
    }

    /** 日常任务 */
    class DailyTaskRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_DAILY_TASK, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_LIVENESS_DATA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(TaskModel.getInstance().canRewardDailyTask());
        }
    }
    /** 勇者之证 */
    class WarriorRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_WARRIOR_EXP, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.REWARD_LEVEL_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(WarriorProveModel.getInstance().isCanReward());
        }
    }
    /** 试炼任务 */
    class TrialTaskRedPoint extends RedPointBaseRule {
        private _type : number;
        constructor(name,type:number) {
            super(name);
            this._type = type;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_TRIAL_TASK_COUNT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_TRIAL_TASK_REWARD, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(TrialTaskModel.getInstance().isCanReward(this._type));
        }
    }
    /** 试炼-每周积分礼包 */
    class TrialTaskGiftRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UNLOCK_WARRIOR_JINJIE_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.REWARD_WEEK_GIFT_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(WarriorProveModel.getInstance().isCanRewardGift());
        }
    }

    /** 邮件 */
    class MailRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(MailEvent.UPDATE_MAIL_DATA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(MailModel.getInstance().isShowMailRedpoint());
        }
    }

    /** 图鉴组合 */
    class godFateRedPoint extends RedPointBaseRule {
        private _vo: game.FateVo;
        constructor(name, vo) {
            super(name);
            this._vo = vo;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(game.TujianEvent.ACTIVITY_TUJIAN_SUCC, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            // this._key
            // game.FateModel.getInstance().getNameById

            this.updateVisible(!this._vo.isActiviteComplete() && this._vo.isActivite());
        }
    }
    /** 友情点 */
    class FriendPointRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(MailEvent.UPDATE_FRIEND_POINT_DATA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(MailModel.getInstance().canOperateFriendPoint());
        }
    }

    /** 金币兑换红点 */
    class ExchangeGoldRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HudEvent.EXCHANGE_GOLD_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let freecount: number = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.goldBuyFreeNum);
            this.updateVisible(freecount < tb.TB_exchange_set.getSet().daily_free);
        }
    }

    /** 荣誉 */
    class HonorRedpoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(TaskModel.getInstance().canRewardHonor());
        }
    }
    /** 变强 */
    class ChallengeTabRedpoint extends RedPointBaseRule {
        private _data: ChallengeTabData;
        private _id: number;
        constructor(name, id) {
            super(name);
            this._id = id;
        }
        init(): void {
            super.init();
            this._data = BianQiangModel.getInstance().getChallengeTabData(this._id);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_ACHIEVEMENT_DATA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.beStrong) && this._data.canReward());
        }
    }
    /** 符文副本奖励 */
    class RuneCopyJiangliRedpoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            // Pan3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_EXPERIENCE_DATA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(false);
        }
    }

    /** 大富翁入口红点 */
    class RuneCopyAdventureRedpoin extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            // Pan3d.ModuleEventManager.addEvent(GuajiEvent.UPDATE_LASTGET_AFKTIME, this.updateState, this);
            // Pan3d.ModuleEventManager.addEvent(RiskEvent.UPDATE_AWARD_INFO, this.updateState, this);
            // Pan3d.ModuleEventManager.addEvent(ResEvent.ADV_SCORE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.ADVENTURE)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let settab = tb.TB_risk_set.getTabSet();
            let costnum: number = App.hero.getBagItemNum(settab.once_cost[0]);
            this.updateVisible(App.IsSysOpen(ModuleConst.ADVENTURE) && (settab.once_cost[1] <= costnum));
        }
    }
    /** 奇遇红点 */
    class QiyuRedpoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(DafuwengEvent.UPDATE_RISK_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(DafuwengEvent.ADD_RISK_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(DafuwengEvent.DEL_RISK_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.ADVENTURE)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(DafuwengModel.getInstance().getRiskList(false).length > 0);
        }
    }

    /** 好友申请 */
    class FriendApplyRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(FriendEvent.UPDATE_FRIEND_APPLY, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(FriendModel.getInstance().friendApplyRp());
        }
    }
    /** 新聊天消息红点 */
    class ChatRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ChatEvent.UPDATE_NEW_CHAT_COUNT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(ChatModel.getInstance().hasNewNum());
        }
    }
    /** 私聊信息 */
    class FriendPrivateChatRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ChatEvent.UPDATE_PRIVATE_CHAT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(ChatModel.getInstance().hasNewPrivateChat());
        }
    }

    /** 许愿 */
    class XuyuanRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let isShow = HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare);
            this.updateVisible(App.hero.getlimitValue(isShow && iface.tb_prop.limitTypeKey.wishFreeNum) < tb.TB_wish_set.getFreeNum());
        }
    }

    /**每月签到 */
    class QiandaoRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let signDays: number = HuodongModel.getTotalSignNum();
            /**累计签到 */
            let canRewards: tb.TB_total_sign[] = tb.TB_total_sign.get_TB_total_sign().filter(tb => signDays >= tb.total_day
                && !(App.hero.welfare.totalSignIn[tb.ID] && App.hero.welfare.totalSignIn[tb.ID] == 1));
            let canDo = !HuodongModel.isTodaySign() || canRewards.length > 0;
            this.updateVisible(canDo && HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare));
        }
    }

    /**等级基金 */
    class JijinRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.AWARD_EVENT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.VIP_LEVEL_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.payActivity) && HuodongModel.getInstance().ratingFundRedPoint());
        }
    }

    /**等级礼包 */
    class DengjiRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let isShow = HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare);
            this.updateVisible(isShow && HuodongModel.getInstance().levelPackIsAllGet());
        }
    }

    /**月卡 */
    class MonthRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.payActivity) && App.hero.welfare.monthCardEndTime > App.getServerTime() && App.hero.welfare.monthCardAward != 1);
        }
    }

    /**终身卡 */
    class LifeRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.payActivity) && (App.hero.welfare.lifelongCard == 1 && App.hero.welfare.lifelongCardAward != 1));
        }
    }

    /**实名认证 */
    class RealNameRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(!(App.hero.welfare.autonymAwardNum == 1));
        }
    }

    /**装备寻宝额外奖励 */
    class luckyEquipExtRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_EQUIP_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_EQUIP_REWARD_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HuodongModel.getInstance().luckyEquipExtRewardRP());
        }
    }

    /**装备寻宝额外奖励 */
    class luckyEquipExtFreeRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let hasFree: boolean = HuodongModel.getLuckFreeCount(TURNTABLE.EQUIP) > 0;
            this.updateVisible(App.hero.welfare.luckEquipId != 0 && hasFree);
        }
    }

    /**幸运转盘宝物奖励 */
    class luckyTreasureRewardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.LUCK_TREASURE_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let canReceive: boolean = false;
            if (App.hero.welfare.luckTreasureId > 0) {
                let timeTemp: tb.TB_luck_treasure_time = tb.TB_luck_treasure_time.getTempById(App.hero.welfare.luckTreasureId);
                canReceive = App.hero.welfare.luckTreasureNum >= timeTemp.luck_value;
            }
            this.updateVisible(canReceive);
        }
    }

    /**幸运转盘宝物奖励 */
    class luckyTreasureFreeRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let hasFree: boolean = HuodongModel.getLuckFreeCount(TURNTABLE.TREASURE) > 0;
            this.updateVisible(App.hero.welfare.luckTreasureId != 0 && hasFree);
        }
    }

    /**神灵转盘红点 */
    class luckyGodRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let hasFree: boolean = HuodongModel.getLuckFreeCount(TURNTABLE.GOD) > 0;
            this.updateVisible(App.hero.welfare.luckGodId != 0 && hasFree);
        }
    }

    /**神灵转盘红点 */
    class luckyArtRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let hasFree: boolean = HuodongModel.getLuckFreeCount(TURNTABLE.ART) > 0;
            this.updateVisible(App.hero.welfare.luckArtId != 0 && hasFree);
        }
    }

    /** 神力排行榜红点 */
    class PowerRankRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(PowerrankEvent.UPDATE_REDPOINT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.godRank) && PowerrankModel.getInstance().firstLogin);
        }
    }

    /**每日签到红点 */
    class EveryDaySignRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.AWARD_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(HudModel.isHudShow(iface.tb_prop.sysOpenTypeKey.welfare) && HuodongModel.getInstance().everyDaySignRP());
        }
    }

    /** 世界boss剩余次数 */
    class WorldBossRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            let isopen: boolean = App.IsSysOpen(ModuleConst.WORLD_BOSS);
            this.updateVisible(count > 0 && isopen);
            if (isopen) {
                tl3d.ModuleEventManager.removeEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            }
        }
    }
    /** 公会捐献 */
    class GuildDonateRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.GUILD_DONATE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildModel.getInstance().isCanDonate());
        }
    }
    /** 公会挑战次数 */
    class GuildChallengeNumRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildCopyModel.getInstance().isCanChallenge());
        }
    }
    /** 公会通关奖励 */
    class GuildRewardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.RECEIVE_JIANGLI_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_JIANGLI_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildCopyModel.getInstance().isCanReward());
        }
    }
    /** 公会申请列表 */
    class GuildApplyRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_APPLY_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildModel.getInstance().isHasNewApply());
        }
    }
    /** 公会技能 */
    class GuildSkillRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.GUILD_SKILL_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildSkillModel.getInstance().isHasDonateLevelUp());
        }
    }
    /** 公会战可领取宝箱 */
    class GuildWarAwardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.REWARD_CHEST_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_WAR_REDPOINT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildFightModel.getInstance().isCanReward());
        }
    }
    /** 公会战可报名 */
    class GuildWarJoinRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.JOIN_FIGHT_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_WAR_REDPOINT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildFightModel.getInstance().isCanJoin());
        }
    }
    /** 公会援助-可求援 */
    class GuildAskHelpRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.SEND_ASK_HELP_SUCC, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_MY_HELP_LIST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HudEvent.UPDATE_CROSS_DAY_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_GUILD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildHelpModel.getInstance().isCanAskHelp());
        }
    }
    /** 公会援助-可领取碎片*/
    class GuildAwardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_MY_HELP_LIST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.REWARD_HELPED_ITEM_SUCC, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildHelpModel.getInstance().isCanRewardSuipian());
        }
    }
    /** 公会援助-可进行援助 */
    class GuildHelpOthersRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GuildEvent.UPDATE_OTHERS_HELP_LIST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GuildEvent.HELP_OTHERS_SUCC, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GuildHelpModel.getInstance().isCanHelpOthers());
        }
    }

    /** 商队护送红点 */
    class EscortRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(EscortEvent.UPDATE_SELF_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(EscortEvent.ESCORT_GOODS_SUCCESS, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.CARAVAN_ESCORT)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(EscortModel.getInstance().canDoubleEscort());
        }
    }
    class EscortRecordRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(EscortEvent.UPDATE_RECORD_RP, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.CARAVAN_ESCORT)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(EscortModel.getInstance().hasNewRecord);
        }
    }
    /**微端下载红点 */
    class WeiDuanXiaZaiPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(DownloadeEvent.RED_CHANGE_EVENT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            dispatchEvt(new HudEvent(HudEvent.UPDATE_MAINVIEW_BUTTON));
            let sysId = iface.tb_prop.sysOpenTypeKey.microClient;
            this.updateVisible(HudModel.isHudShow(sysId) && App.IsSysOpen(sysId) && App.hero.downClient == 1 && !App.hero.isReceiveWDXZ);
        }
    }
    class EscortRewardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(EscortEvent.UPDATE_SELF_INFO, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(EscortEvent.UPDATE_REWARD_RP, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.CARAVAN_ESCORT)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(EscortModel.getInstance().canReward());
        }
    }
    /** 迷雾森林 */
    class ForestRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(FogForestEvent.CHALLENGE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.ALL_PASS_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.RECEIVE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.Init_FOREST, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            //是否有可领取宝箱
            this.updateVisible(FogForestModel.getInstance().isCanReward());
        }
    }
    class ForestOneKeyRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(FogForestEvent.ALL_PASS_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.Init_FOREST, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.UPDATE_CUR_GUANQIA, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            //是否可一键扫荡
            this.updateVisible(FogForestModel.getInstance().isCanOneKeyPass());
        }
    }
    class ForestMaxRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(FogForestEvent.CHALLENGE_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.ALL_PASS_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.SHOW_MAIN_VIEW, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(FogForestEvent.Init_FOREST, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            //是否首次登录以及是否到达最大关卡
            this.updateVisible(FogForestModel.getInstance().isVisible());
        }
    }
    /** 神秘岛屿记录 */
    class IslandRecordRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(IslandsEvent.UPDATE_RECORD_INFO, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            if (this.name == 'island_record') {
                this.updateVisible(IslandModel.getInstance().hasNewRecord);
            } else {
                this.updateVisible(IslandModel.getInstance().hasEndTime);
            }
        }
    }

    /** 登入礼包红点 */
    class LoginGiftRedPoint extends RedPointBaseRule {
        private _type: number;
        private _allTemps: tb.TB_sevendays[];
        constructor(name, type) {
            super(name);
            this._type = type;
            this._allTemps = tb.TB_sevendays.get_TB_sevendays(type);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.TOTAL_LOGIN_DAY, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(HuodongEvent.LOGIN_GIFT_RECEIVE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let showred: boolean = false;
            if (this._allTemps && this._allTemps.length > 0) {
                let loginday: number = App.hero.welfare.totalLoginDay ? App.hero.welfare.totalLoginDay : 0;
                let giftReceiveInfo: any = App.hero.welfare.loginGiftPack ? App.hero.welfare.loginGiftPack : {};
                for (let i: number = 0; i < this._allTemps.length; i++) {
                    let temp: tb.TB_sevendays = this._allTemps[i];
                    if (temp.ID <= loginday && !giftReceiveInfo.hasOwnProperty(temp.ID)) {
                        showred = true;
                        break;
                    }
                }
            }
            this.updateVisible(showred);
        }
    }


    /** 召唤材料 低级召唤书、神秘召唤书、传说召唤书*/
    class SummonPropRedPoint extends RedPointBaseRule {
        // 材料id
        private _resType: number;
        constructor(name, key) {
            super(name);
            this._resType = key;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            if (this._resType == iface.tb_prop.resTypeKey.friend) {
                this.updateVisible(App.hero.friend >= 1000);
            } else if (this._resType == CostTypeKey.weizhi_zhaohuanshu) {
                if (this.name == "summon_weizhi1") {
                    this.updateVisible(App.hero.getlimitValue(iface.tb_prop.limitTypeKey.propFreeNum) == 0);
                } else {
                    this.updateVisible(App.hero.getBagItemNum(CostTypeKey.weizhi_zhaohuanshu) >= 10);
                }
            } else if (this._resType == CostTypeKey.shenmi_zhaohuanshu) {
                if (this.name == "summon_shenmi10") {
                    this.updateVisible(App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu) >= 10);
                } else if (this.name == "summon_shenmi1") {
                    this.updateVisible(App.hero.getBagItemNum(CostTypeKey.shenmi_zhaohuanshu) >= 1 || App.hero.getlimitValue(iface.tb_prop.limitTypeKey.diamondFreeNum) == 0);
                }
            }
        }
    }

    /** 传说召唤红点(vip等级达到 和 传说召唤碎片达到) */
    class SummonVipRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(HuodongEvent.REFRESH_YUEKA_PANEL, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(SummonEvent.ZHAOHUAN_SUCCESS, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let vipflag: boolean = App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.legendEmploy);
            let tab: tb.TB_god_employ_set = tb.TB_god_employ_set.get_TB_god_employ_setnById(1);
            let numflag: boolean = tab.special_employ[1] <= App.hero.legendChip;
            this.updateVisible(vipflag && numflag);
        }
    }

    /** 限时物品 红点*/
    class BagTimeItemRedPoint extends RedPointBaseRule {
        // 材料id
        private _receiveTime: number;
        constructor(name, receiveTime) {
            super(name);
            this._receiveTime = receiveTime;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.TIME_PROP_CHANGE, this.updateState, this);
            this.updateState();
        }


        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(this._receiveTime <= App.getServerTime());
        }
    }

    /** 背包材料 如低级经验瓶、玄丹材料箱、神丹材料箱*/
    class BagMaterialRedPoint extends RedPointBaseRule {
        // 材料id
        private _key: string;
        constructor(name, key) {
            super(name);
            this._key = key;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }


        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(App.hero.getBagItemNum(this._key) >= 1);
        }
    }

    class BagSuipianRedPoint extends RedPointBaseRule {
        // 材料id
        private _key: string;
        constructor(name, key) {
            super(name);
            this._key = key;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(Number(this._key));
            let redPoint = App.hero.getBagItemNum(this._key) >= Number(itemtab.using_effect[1]);
            this.updateVisible(redPoint);
        }
    }

    /** 布阵 */
    class BuzhenRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GodUtils.isCanBuzhen());
        }
    }
    /** 上阵英雄:可升级红点 */
    class GodLvupRedPoint extends RedPointBaseRule {
        private gid: string;
        constructor(name, gid: string) {
            super(name);
            this.gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GodEvent.USE_EXPPOOL_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(GodEvent.GOD_SHENGJIE_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.GOD_EXP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }
        /** 英雄经验更新 */
        updateStateByExp(): void {
            this.updateState();
        }
        /** 升级成功更新 */
        updateStateByLv(event: GodEvent): void {
            if (this.gid != event.data) return;
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanLvup());
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 上阵英雄:可升阶红点 */
    class GodDegreeupRedPoint extends RedPointBaseRule {
        private gid: string;
        constructor(name, gid: string) {
            super(name);
            this.gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GodEvent.USE_EXPPOOL_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(GodEvent.GOD_SHENGJIE_SUCCESS, this.updateStateByLv, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }
        /** 升级成功更新 */
        updateStateByLv(event: GodEvent): void {
            if (this.gid != event.data) return;
            this.updateState();
        }


        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanDegreeUp());
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 上阵英雄:可激活皮肤 */
    class GodSkinRedPoint extends RedPointBaseRule {
        private gid: string;
        constructor(name, gid: string) {
            super(name);
            this.gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.ADD_SKINID, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(GodUtils.isCanActivitySkin(godVo.tab_god));
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 上阵英雄:可穿戴圣物 */
    class GodTreasureWearRedPoint extends RedPointBaseRule {
        private gid: string;
        constructor(name, gid: string) {
            super(name);
            this.gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(TreasureEvent.MODIFY_GOD_TREASURE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanWearTreasure());
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 英雄装备 */
    class GodEquipRedPoint extends RedPointBaseRule {
        private _gid: any;
        private _slot: number;
        constructor(name, gid: any, slot: number) {
            super(name);
            this._gid = gid;
            this._slot = slot;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(5, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    // 是否未装备
                    this.updateVisible(EquipModel.getInstance().slotEquip(godVo, this._slot, true) ? true : false);
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 英雄一键装备 */
    class GodOneKeyEquipRedPoint extends RedPointBaseRule {
        private _gid: any;
        constructor(name, gid: any) {
            super(name);
            this._gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    this.updateVisible(godVo.isCanOneKeyEquip());
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 英雄一键强化（装备） */
    class GodOneKeyStrengthRedPoint extends RedPointBaseRule {
        private _gid: any;
        constructor(name, gid: any) {
            super(name);
            this._gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }
        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    this.updateVisible(EquipModel.getInstance().isCanSth(null, godVo, false));
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }

    /** 英雄一键精炼（装备） */
    class GodOneKeyRefineRedPoint extends RedPointBaseRule {
        private _gid: any;
        constructor(name, gid: any) {
            super(name);
            this._gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.EQUIPMENET_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.RESOURCE_CHANGE, this.updateState, this);
            this.updateState();
        }
        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this._gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this._gid) != -1) {
                    this.updateVisible(EquipModel.getInstance().isCanRefine(null, godVo, false));
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }

    /** 装备宝石镶嵌 */
    class EquipWearGemsRedPoint extends RedPointBaseRule {
        private _key: any;
        private _gemType: any;  // 1-3
        private _gemSlot: any; // 1-12
        constructor(name, key: any, slot: number, type: number) {
            super(name);
            this._key = key;
            this._gemType = type;
            this._gemSlot = slot;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GemstoneEvent.MODIFY_GOD_GEMTONE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GemstoneEvent.MODIFY_GEMTONE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GemstoneEvent.ADD_GEMTONE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GemstoneEvent.DEL_GEMTONE, this.updateState, this);
            this.updateState();
        }
        private updateState(): void {
            if(!App.IsSysOpen(ModuleConst.EQUIP_BAOSHI)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let vo: GodItemVo = App.hero.getGodVoById(this._key);
            if (!vo) return;
            let gemVo = vo.getGemsBySlot(this._gemSlot);
            if(gemVo){
                this.updateVisible(GemstoneModel.getInstance().isHasBetterGem(this._gemType,gemVo.gemLv));
            }else{
                let findVo = GemstoneModel.getInstance().getGemstoneByType(this._gemType);
                this.updateVisible(findVo ? findVo.num > 0 : false);
            }
        }
    }

    /** 可融魂红点 */
    class GodFusionBallRedPoint extends RedPointBaseRule {
        private gid: string;
        private type: number;
        private times: number;
        constructor(name, gid: string, type: number, times: number) {
            super(name);
            this.gid = gid;
            this.type = type;
            this.times = times;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.RONGHUN_SUCCESS, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.RONGHUN)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (!godVo) return;
            let fusionTab: tb.TB_fusion_soul = tb.TB_fusion_soul.get_TB_fusion_soulById(godVo.fuseLevel);
            if (!fusionTab) {
                return;
            }
            let numAry = new Array<any>();
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
            let attr = godVo.countRonghunAttr();
            let haveItem = App.hero.getBagItemNum(numAry[0][0]);
            if (this.times == 1) {
                this.updateVisible(haveItem >= numAry[0][1] && (!godVo.fuseAttrLevels[this.type] || attr[this.type] < fusionTab.attr_max[this.type - 1][1]));
            } else {
                this.updateVisible(haveItem >= Number(numAry[0][1]) * 10 && (!godVo.fuseAttrLevels[this.type] || attr[this.type] < fusionTab.attr_max[this.type - 1][1]));
            }
        }
    }

    /** 可升星红点 */
    class GodStarUpRedPoint extends RedPointBaseRule {
        private gid: string;
        constructor(name, gid: string) {
            super(name);
            this.gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GodEvent.GOD_PORP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.SHENGXING)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanStarUp(true));
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }
    /** 可觉醒红点 */
    class GodAwakenRedPoint extends RedPointBaseRule {
        private gid: string;
        constructor(name, gid: string) {
            super(name);
            this.gid = gid;
        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodEvent.BUZHEN_COMPLETE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(GodEvent.GOD_PORP_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.JUEXING)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let godVo = App.hero.getGodVoById(this.gid);
            if (godVo) {
                let gods = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
                // 是否是阵容中的英雄
                if (gods.indexOf(this.gid) != -1) {
                    this.updateVisible(godVo.isCanAwaken());
                } else {
                    this.updateVisible(false);
                }
            } else {
                this.updateVisible(false);
            }
        }
    }

    /** 竞技场次数满了 */
    class JingjichangFullRedPoint extends RedPointBaseRule {
        // public max: number = 0;
        constructor(name) {
            super(name);

        }
        init(): void {
            super.init();
            // this.max = tb.TB_arena_new_set.getArenaNewSet().limit_num;
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.ROLE_LEVEL_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(App.hero.arenaNum > 0 && App.IsSysOpen(ModuleConst.JINGJI));
        }
        onDispose(): void {
            super.onDispose();
        }
    }
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
    class MatchRewardRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);

        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ArenaEvent.MATCH_REWARD_BOX_SUCC, this.updateState, this);
            this.updateState();
        }
        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(MatchModel.getInstance().isCanReward());
        }
    }
    /** 匹配赛满次数时显示红点 */
    class MatchCountRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);

        }
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            this.updateState();
        }
        private updateState(): void {
            if (!App.IsSysOpen(ModuleConst.MATCH_FIGHT)) return;
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.matchNum) >= tb.TB_match_set.getSet().limit_num);
        }
    }

    /** 集市红点规则 */
    class JishiRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }
        init(): void {
            super.init();
            // Pan3d.ModuleEventManager.addEvent(ShopEvent.REFRESH_JISHI_RP, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            // this.updateVisible(App.serverTimeSecond >= App.hero.marketRefreshTime || App.hero.marketRefreshTime == 0);
        }
    }

    /** 神界之门红点规则 */
    class GodDoorRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GodDoorEvent.OPEN_DOOR_EVENT, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(App.hero.getBagItemNum(CostTypeKey.shenjiemiyao) > 0 && App.IsSysOpen(ModuleConst.SHENMEN));
        }
    }
    /** 荣耀之战可报名 */
    class GloryJoinRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GloryEvent.JOIN_SUCCESS, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GloryModel.getInstance().isCanJoin());
        }
    }
    /** 荣耀之战登录红点 */
    class GloryLoginRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(GloryEvent.SHOW_REDPOINT, this.updateState, this);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let isFirstLogin = App.hero.loginCount == 1
            this.updateVisible(GloryModel.getInstance().isOpen() && isFirstLogin && !GloryModel.getInstance().isHasShow);
        }
    }
    /** 激战神域挑战红点 */
    class GodDmChallengeRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.OVERPLUS_VALUE_CHANGE, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            this.updateVisible(GodDomainModel.getInstance().challengeRp());
        }
    }
    /** 快速战斗红点 */
    class FastFightRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(ResEvent.LIMIT_VALUE_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(TopUpEvent.SHOW_CHONGZHISUCC_PANEL, this.updateState, this);
            this.updateState();
            Laya.timer.loop(1000, this, this.updateState);
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let freenum = App.hero.totalFreeCount(iface.tb_prop.limitTypeKey.fastFrightFreeNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.fastFrightFreeNum);
            this.updateVisible(freenum > 0);
        }
    }

    /** 进阶之路红点 */
    class UpRoadRedPoint extends RedPointBaseRule {
        constructor(name) {
            super(name);
        }

        private _curAdvanceRoadT: tb.TB_advance_road;
        init(): void {
            super.init();
            tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_LEVEL_CHANGE, this.updateLevel, this);
            tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_COUNT_CHANGE, this.updateState, this);
            tl3d.ModuleEventManager.addEvent(UpRoadEvent.UR_REWARD_CHANGE, this.updateState, this);
            this.updateLevel();
        }

        private updateLevel(): void {
            let lv: number = App.hero.tasks.advanceLevel;
            let maxlv: number = tb.TB_advance_road.getMaxLevel();
            let idx: number = lv >= maxlv ? maxlv : lv + 1;
            this._curAdvanceRoadT = tb.TB_advance_road.getSet(idx);
            this.updateState();
        }

        private updateState(): void {
            Laya.timer.frameOnce(3, this, this._updateState);
        }

        private _updateState(): void {
            let show: boolean = false;
            if (this._curAdvanceRoadT) {
                let conditions: tb.TB_advance_condition[] = this._curAdvanceRoadT.getCondition();
                for (let i: number = 0; i < conditions.length; i++) {
                    let conditionT: tb.TB_advance_condition = conditions[i];
                    let info = App.hero.tasks.advanceInfos[conditionT.ID];
                    if (info && (!info.reward || info.reward < 1)) {
                        //还没领取
                        let hasNum: number = info.count ? info.count : 0;
                        if (hasNum >= conditionT.num) {
                            show = true;
                            break;
                        }
                    }
                }
            }
            this.updateVisible(show);
        }
    }

    /** 注册红点 */
    export function registerRedPoint() {
        // 邮件
        RedPointManager.injection(new MailRedPoint('mail_mail'));
        // RedPointManager.injection(new FriendPointRedPoint('mail_friendpoint'));
        RedPointManager.injection(new RedPointGroup('mail_group', ['mail_mail']));

        //图鉴
        FateModel.getInstance().initFateList();
        let arrFateVo = FateModel.getInstance().arrFateVo;
        let strary = [];
        for (let i = 0; i < arrFateVo.length; i++) {
            let fatevo = arrFateVo[i];
            if (!fatevo.isActiviteComplete()) {
                let strKey = 'fate_' + fatevo.tbGodFate.ID;
                strary.push(strKey);
                RedPointManager.injection(new godFateRedPoint(strKey, fatevo));
            }
        }
        RedPointManager.injection(new RedPointGroup('godFateRedPoint', strary));
        RedPointManager.injection(new RedPointGroup('tujian_group', ['godFateRedPoint']));

        // 好友
        RedPointManager.injection(new FriendApplyRedPoint('friend_apply'));
        RedPointManager.injection(new FriendPrivateChatRedPoint('friend_privatechat'));
        RedPointManager.injection(new RedPointGroup('friend_group', ['friend_apply', 'friend_privatechat']));
        // 集市
        RedPointManager.injection(new JishiRedPoint('jishi_group'));
        // 召唤
        RedPointManager.injection(new SummonPropRedPoint('summon_weizhi1', CostTypeKey.weizhi_zhaohuanshu));
        RedPointManager.injection(new SummonPropRedPoint('summon_weizhi10', CostTypeKey.weizhi_zhaohuanshu));
        RedPointManager.injection(new SummonPropRedPoint('summon_shenmi1', CostTypeKey.shenmi_zhaohuanshu));
        RedPointManager.injection(new SummonPropRedPoint('summon_shenmi10', CostTypeKey.shenmi_zhaohuanshu));
        RedPointManager.injection(new SummonPropRedPoint('summon_friend10', iface.tb_prop.resTypeKey.friend));
        RedPointManager.injection(new SummonVipRedPoint('summon_legend'));
        RedPointManager.injection(new RedPointGroup('summon_group', ['summon_weizhi10', 'summon_shenmi1', 'summon_shenmi10', 'summon_friend10', 'summon_legend']));
        // 竞技场
        RedPointManager.injection(new JingjichangFullRedPoint('jingjichang_count'));
        // RedPointManager.injection(new JingjichangRecordRedPoint('jingjichang_record'));
        RedPointManager.injection(new RedPointGroup('jingjichang_group', ['jingjichang_count']));
        RedPointManager.injection(new MatchRewardRedPoint('jjc_match_award'));
        RedPointManager.injection(new MatchCountRedPoint('jjc_match_count'));
        RedPointManager.injection(new RedPointGroup('jjc_match_group', ['jjc_match_award', 'jjc_match_count']));
        RedPointManager.injection(new RedPointGroup('jingjichang_root_group', ['jingjichang_group', 'jjc_match_group']));
        // 神界之门
        RedPointManager.injection(new GodDoorRedPoint('godDoor_kaiqi'));
        RedPointManager.injection(new RedPointGroup('godDoor_group', ['godDoor_kaiqi']));
        //金币兑换
        RedPointManager.injection(new ExchangeGoldRedPoint('exchange_gold'));
        RedPointManager.injection(new ChatRedPoint('chat_group'));

        //每日副本
        let dailyNums = [iface.tb_prop.overplusTypeKey.dailyCopyNum1, iface.tb_prop.overplusTypeKey.dailyCopyNum2, iface.tb_prop.overplusTypeKey.dailyCopyNum3]
        let tabGroups = [];
        for (let dailyNum of dailyNums) {
            tabGroups.push(`dailyCoyp_tab${dailyNum}`)
            RedPointManager.injection(new DailyCopyRedPoint(`dailyCoyp_Challenge${dailyNum}`, dailyNum));
            RedPointManager.injection(new RedPointGroup(`dailyCoyp_tab${dailyNum}`, [`dailyCoyp_Challenge${dailyNum}`]));
        }
        RedPointManager.injection(new RedPointGroup('dailycopy_group', tabGroups));
        // 远征
        RedPointManager.injection(new YuanzhengDispatchRedPoint('yuanzheng_dispatch'));
        RedPointManager.injection(new RedPointGroup('yuanzheng_group', ["yuanzheng_dispatch"]));
        // 组队挑战
        RedPointManager.injection(new TeamRewardRedPoint('team_reward'));
        RedPointManager.injection(new CopyTeamApplyRedPoint('CopyTeamRp'));
        RedPointManager.injection(new RedPointGroup('team_group', ["team_reward","CopyTeamRp"]));

        //排行榜
        let rankingList: any[] = [];
        let rankingListData = RankModel.getInstance().arrRankListName;
        for (var key in rankingListData) {
            rankingList.push(rankingListData[key][1]);
            RedPointManager.injection(new RankingListRedPoint(rankingListData[key][1], rankingListData[key][2]));
        }
        RedPointManager.injection(new RedPointGroup('rankingList_group', rankingList));
        // 世界boss
        RedPointManager.injection(new WorldBossRedPoint('boss_count'));
        RedPointManager.injection(new RedPointGroup('boss_group', ['boss_count']));
        // 公会
        RedPointManager.injection(new GuildChallengeNumRedPoint('guild_challenge'));
        RedPointManager.injection(new GuildRewardRedPoint('guild_reward'));
        RedPointManager.injection(new RedPointGroup('guild_copy_group', ['guild_challenge', 'guild_reward']));
        RedPointManager.injection(new GuildApplyRedPoint('guild_apply'));
        RedPointManager.injection(new RedPointGroup('guild_hall_group', ['guild_apply']));
        RedPointManager.injection(new GuildDonateRedPoint('guild_donate'));
        RedPointManager.injection(new GuildSkillRedPoint('guild_skill'));
        RedPointManager.injection(new GuildWarAwardRedPoint('guild_war_award'));
        RedPointManager.injection(new GuildWarJoinRedPoint('guild_war_join'));
        RedPointManager.injection(new RedPointGroup('guild_war_group', ['guild_war_award', 'guild_war_join']));
        // 公会援助
        RedPointManager.injection(new GuildAskHelpRedPoint('guild_help_ask'));
        RedPointManager.injection(new GuildAwardRedPoint('guild_help_award'));
        RedPointManager.injection(new RedPointGroup('guild_help_my_group', ['guild_help_ask', 'guild_help_award']));
        RedPointManager.injection(new GuildHelpOthersRedPoint('guild_help_others'));
        RedPointManager.injection(new RedPointGroup('guild_help_group', ['guild_help_my_group', 'guild_help_others']));

        RedPointManager.injection(new RedPointGroup('guild_root_group', ['guild_donate', 'guild_copy_group', 'guild_hall_group', 'guild_skill', 'guild_war_group', 'guild_help_group']));
        // 商队护送
        RedPointManager.injection(new EscortRedPoint('escort_escort'));
        RedPointManager.injection(new EscortRecordRedPoint('escort_record'));
        RedPointManager.injection(new EscortRewardRedPoint('escort_reward'));
        RedPointManager.injection(new RedPointGroup('escort_group', ['escort_escort', 'escort_record', 'escort_reward']));
        //迷雾森林
        RedPointManager.injection(new ForestMaxRedPoint('forest_MaxGuanqia'));
        RedPointManager.injection(new ForestOneKeyRedPoint('forest_onekey'));
        RedPointManager.injection(new ForestRedPoint('forest_reward'))
        RedPointManager.injection(new RedPointGroup('forest_group', ['forest_reward', 'forest_onekey', 'forest_MaxGuanqia']));
        // 神秘岛屿
        RedPointManager.injection(new IslandRecordRedPoint('island_record'));
        //岛屿占领到期红点，不需要绑定ui。只需要显示在外层
        RedPointManager.injection(new IslandRecordRedPoint('island_endtime'));
        RedPointManager.injection(new RedPointGroup('island_group', ['island_record', 'island_endtime']));
        // 荣耀之战
        RedPointManager.injection(new GloryJoinRedPoint('glory_join'));
        RedPointManager.injection(new GloryLoginRedPoint('glory_login'));
        RedPointManager.injection(new RedPointGroup('glory_group', ['glory_join', 'glory_login']));
        // 激战神域
        RedPointManager.injection(new GodDmChallengeRedPoint('goddm_challenge'));
        RedPointManager.injection(new RedPointGroup('godDm_group', ['goddm_challenge']));
        //进阶之路
        RedPointManager.injection(new UpRoadRedPoint('uproad_red'));
        //快速战斗
        RedPointManager.injection(new FastFightRedPoint('fast_fight'));

        let groupObj: Object = {};
        let groupNameList = [];
        let upperBtnVos = HudModel.getInstance().upperBtnVos;
        for (let key in upperBtnVos) {
            let vo = upperBtnVos[key];
            groupObj[vo.sysOpenId] = vo.redpointName;
            groupNameList.push(vo.redpointName);
        }
        registerActivityGroup(groupObj);
        registerBagGroup();
        //首页
        RedPointManager.injection(new RedPointGroup('main_group',
            ['guild_root_group', 'godDoor_group', 'summon_group', 'jishi_group', 'mail_group', 'task_group', 'tujian_group', 'friend_group', 'rankingList_group'].concat(groupNameList)));
        //圣城
        RedPointManager.injection(new RedPointGroup('shengcheng_group', []));

        registerGodAndEquipGroup();
        registerArtifactGroup();
        registerGuajiGroup();
        //初始化背包限时道具红点
        registerTimeItemGroup();


        for (let key in tb.TB_function.FUNCTION_GROUP_REDPOINT) {
            RedPointManager.injection(new RedPointGroup('function' + key, tb.TB_function.FUNCTION_GROUP_REDPOINT[key]));
        }
    }

    /** 注册活动红点 */
    export function registerActivityGroup(groupObj: Object): void {
        // 限时活动
        let keyary = tb.TB_operate_activity.gettimeIdx();
        let timeacKey: Array<string> = [];
        for (let i = 0; i < keyary.length; i++) {
            let id: number = keyary[i];
            let str: string = "timeActivity" + id;
            timeacKey.push(str);
            RedPointManager.injection(new TimeActivityRedPoint(str, id));
        }
        //开服团购
        let ctime = tb.TB_activity_set.getTabSet().group_buy_time;
        let openbuyendtime = App.hero.openSvrTime + ctime;
        if (openbuyendtime > App.getServerTime()) {
            //在开服指定时间内
            let str: string = "timeActivity" + TimelimitModel.ACTIVITY_OPENBUY_ID;
            timeacKey.push(str);
            RedPointManager.injection(new TimeActivityGroupBuyRedPoint(str));
        }
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.activity], timeacKey));

        //开服基金
        let funddata = TableData.getInstance().getTableByName(TableData.tb_fund).data;
        let fundKey: string[] = [];
        for (let key in funddata) {
            let id: number = funddata[key].ID;
            let str: string = "FundActivity" + id;
            fundKey.push(str);
            RedPointManager.injection(new TimeActivityFundRedPoint(str, id));
        }
        RedPointManager.injection(new RedPointGroup("timeActivity" + TimelimitModel.ACTIVITY_JIJIN_ID, fundKey));
        
        //分享活动
        let shareKey: Array<string> = [];
        let ary: Array<tb.TB_share> = tb.TB_share.getTB_share();
        for (var i = 0; i < ary.length; i++) {
            let str: string = "shareActivity" + ary[i].ID;
            shareKey.push(str);
            RedPointManager.injection(new ShareRedPoint(str, ary[i].ID));
        }
        RedPointManager.injection(new ShareRedPoint("shareActivity0", 0));
        shareKey.push('shareActivity0');
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.share], shareKey));
        //微端下载
        RedPointManager.injection(new WeiDuanXiaZaiPoint('downClient'));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.microClient], ['downClient']));
        //绑定手机红点
        RedPointManager.injection(new BindPhoneRedPoint("bindPhoneActivity"));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.bindGift], ['bindPhoneActivity']));
        //超级vip
        RedPointManager.injection(new SuperVipRedPoint("superVipActivity"));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.superVip], ['superVipActivity']));
        //内侧返利
        RedPointManager.injection(new TestRebateRedPoint("testRebateActivity"));
        RedPointManager.injection(new RedPointGroup(groupObj[ModuleConst.TEST_REBATE], ['testRebateActivity']));
        //勇者之证
        RedPointManager.injection(new RedPointGroup(groupObj[ModuleConst.WARRIOR_PROVE], ['task_group']));
        //在线奖励
        let onLineKey: Array<string> = [];
        let boxVoAry: Array<BoxVo> = OnlineModel.getInstance().getList();
        for (var i = 0; i < boxVoAry.length; i++) {
            let itemvo = boxVoAry[i];
            if (!itemvo.isReceive()) {
                let str: string = "onlineActivity" + itemvo.id;
                onLineKey.push(str);
                RedPointManager.injection(new OnlineRedPoint(str, itemvo));
            }
        }
        if (onLineKey && onLineKey.length > 0) {
            RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.onlineAward], onLineKey));
        }
        //开服豪礼
        let openKey: Array<string> = [];
        let dayVoAry: Array<DayVo> = OpenserverModel.getInstance().getList();
        for (var i = 0; i < dayVoAry.length; i++) {
            let itemvo = dayVoAry[i];
            if (!itemvo.isReceive()) {
                let str: string = "openRewardActivity" + itemvo.id;
                openKey.push(str);
                RedPointManager.injection(new OpenRewardRedPoint(str, itemvo));
            }
        }
        if (openKey && openKey.length > 0) {
            RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.openGift], openKey));
        }
        //限时热购
        RedPointManager.injection(new LimiteBuyRewardRedPoint('limitebuy_reward'));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.timeLimitBuy], ['limitebuy_reward']));
        //福利
        RedPointManager.injection(new XuyuanRedPoint('fuli_xuyuan'));
        RedPointManager.injection(new DengjiRedPoint('fili_dengji'));
        RedPointManager.injection(new QiandaoRedPoint('fuli_qiandao'));
        // RedPointManager.injection(new RealNameRedPoint('fuli_shiming'));
        RedPointManager.injection(new EveryDaySignRedPoint('fuli_meiri'));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.welfare], ['fuli_xuyuan', 'fuli_qiandao', 'fili_dengji', 'fuli_meiri']));

        //充值活动 -- 等级基金、月卡
        RedPointManager.injection(new JijinRedPoint('fuli_jijin'));
        RedPointManager.injection(new MonthRedPoint('month_reward'));
        RedPointManager.injection(new LifeRedPoint('life_reward'));
        RedPointManager.injection(new RedPointGroup('fuli_yueka', ['month_reward', 'life_reward']));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.payActivity], [`fuli_jijin`, 'fuli_yueka']));

        /**幸运转盘 */
        RedPointManager.injection(new luckyGodRedPoint('lucky_god'));
        RedPointManager.injection(new luckyEquipExtRedPoint('lucky_equip_reward'));
        RedPointManager.injection(new luckyEquipExtFreeRedPoint('lucky_equip_free'));
        RedPointManager.injection(new RedPointGroup("lucky_equip", ['lucky_equip_reward', 'lucky_equip_free']));
        RedPointManager.injection(new luckyArtRedPoint('lucky_art'));
        RedPointManager.injection(new luckyTreasureFreeRedPoint('lucky_treasure_free'));
        RedPointManager.injection(new luckyTreasureRewardRedPoint('lucky_treasure_reward'));
        RedPointManager.injection(new RedPointGroup("lucky_treasure", ['lucky_treasure_free', 'lucky_treasure_reward']));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.luckTurnTable], ['lucky_god', 'lucky_equip', 'lucky_treasure']));

        /** 神力排行 */
        RedPointManager.injection(new PowerRankRedPoint(groupObj[iface.tb_prop.sysOpenTypeKey.godRank]));
        /** 充值 */
        RedPointManager.injection(new tequanRedPoint('tequan_canbuy'));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.recharge], ['tequan_canbuy']))
        /** 变强 */
        let challenges = BianQiangModel.getInstance().getChallengeTabTypeList();
        challenges.forEach((id) => {
            RedPointManager.injection(new ChallengeTabRedpoint(`challenge_tab_${id}`, id));
        });
        RedPointManager.injection(new RedPointGroup('achievement_challenge', challenges.map((id) => {
            return `challenge_tab_${id}`;
        })));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.beStrong], ['achievement_challenge']))

        // 首充
        let firstRecharge: Array<string> = [];
        let shouchongData = ChongzhiModel.getInstance().firstRechargeName;
        for (var key in shouchongData) {
            firstRecharge.push(shouchongData[key][1]);
            RedPointManager.injection(new FirstRechargeRedPoint(shouchongData[key][1], Number(key)));
        }
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.firstCharge], firstRecharge));

        //七日狂欢
        let sevendays: Array<string> = [];
        let sevendaysData = SevendaysModel.getInstance().arrDays;
        let sevendaysProData = SevendaysModel.getInstance().arrProJect;
        for (var key in sevendaysData) {
            sevendays.push(sevendaysData[key][1]);
        }
        for (let i = 0; i < sevendays.length; i++) {
            let rpArr: Array<string> = [];
            for (var key in sevendaysProData) {
                let name = sevendaysProData[key][1] + i;
                rpArr.push(name);
                RedPointManager.injection(new SevendaysRedPoint(name, i, Number(key)));
            }
            RedPointManager.injection(new RedPointGroup(sevendays[i], rpArr));
        }
        RedPointManager.injection(new SevendaysExtRedPoint(`sevendayExt`));
        let cc = sevendays.concat(`sevendayExt`);
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.sevenDay], cc));
        RedPointManager.injection(new RedPointGroup(groupObj[iface.tb_prop.sysOpenTypeKey.halfMonth], cc));

        //登入礼包
        for (let i: number = 1; i <= tb.TB_sevendays.TYPE_NUM; i++) {
            RedPointManager.injection(new LoginGiftRedPoint(`login_gift${i}`, i));
        }
        RedPointManager.injection(new RedPointGroup(groupObj[ModuleConst.LOGIN_QIRI], ['login_gift1']));
        RedPointManager.injection(new RedPointGroup(groupObj[ModuleConst.LOGIN_SHISIRI], ['login_gift2']));
    }

    /** 注册背包 */
    export function registerBagGroup(): void {
        let bagTypeData = BagModel.bagTypeName;
        let bagItemNameAry = [];
        let materialsAry = [];
        let materialsItem = tb.TB_item.get_TB_item("type", "2");
        materialsItem = materialsItem.concat(tb.TB_item.get_TB_item("type", "10"));
        for (let i = 0; i < materialsItem.length; i++) {
            let id = `bag_material_${materialsItem[i].ID}`
            materialsAry.push(id);
            RedPointManager.injection(new BagMaterialRedPoint(id, materialsItem[i].ID));
        }
        let suipianAry = [];
        let allSuipianItem = tb.TB_item.get_TB_item("type", "6");
        for (let j = 0; j < allSuipianItem.length; j++) {
            let suipianid = `bag_suipian_${allSuipianItem[j].ID}`;
            suipianAry.push(suipianid);
            RedPointManager.injection(new BagSuipianRedPoint(suipianid, allSuipianItem[j].ID));
        }
        bagItemNameAry = materialsAry.concat(suipianAry);

        for (let i = 0; i < bagTypeData.length; i++) {
            let templist = [];
            if (bagTypeData[i] == "bag_group_all") {
                templist = bagItemNameAry;
            } else if (bagTypeData[i] == "bag_group_suipian") {
                templist = suipianAry;
            } else if (bagTypeData[i] == "bag_group_cailiao") {
                templist = materialsAry;
            }
            RedPointManager.injection(new RedPointGroup(bagTypeData[i], templist));
        }
        RedPointManager.injection(new RedPointGroup('bag_group', bagTypeData));
    }

    /** 
     * 初始化时调用
     * 动态注册限时物品红点 
     * */
    export function registerTimeItemGroup(): void {
        for (var key in App.hero.bagTimeItemsObj) {
            addTimeItem2Group(key, App.hero.bagTimeItemsObj[key]);
        }
    }

    /**
     * 新增一个限时物品
     */
    export function addTimeItem2Group(uuid, obj): void {
        // logyhj("新注册一个限时物品红点", uuid);
        let bag_group_all = RedPointManager.getRule('bag_group_all') as RedPointGroup;
        let bag_group_cailiao = RedPointManager.getRule('bag_group_cailiao') as RedPointGroup;
        let id = `bag_timeItem_${uuid}`
        let rule = new BagTimeItemRedPoint(id, obj.limitTime > 0 ? obj.limitTime : 0);
        RedPointManager.injection(rule);
        if (bag_group_all) {
            bag_group_all.addRule(rule);
        }
        bag_group_cailiao.addRule(rule);
    }

    /**
     * 删除一个限时物品
     */
    export function removeTimeItem2Group(uuid): void {
        // logyhj("删除一个限时物品红点", uuid);
        RedPointManager.removeRule(`bag_timeItem_${uuid}`);
    }

    /** 挂机战斗 */
    export function registerGuajiGroup(): void {
        // 任务
        RedPointManager.injection(new HonorRedpoint('task_achievement_group'));
        RedPointManager.injection(new DailyTaskRedPoint('task_daily_group'));
        RedPointManager.injection(new WarriorRedPoint('task_warrior_group'));
        RedPointManager.injection(new TrialTaskRedPoint('task_trial_week',0));
        RedPointManager.injection(new TrialTaskRedPoint('task_trial_month',1));
        RedPointManager.injection(new TrialTaskGiftRedPoint('task_trial_gift'));
        RedPointManager.injection(new RedPointGroup('task_trial_group', ['task_trial_week', 'task_trial_month',"task_trial_gift"]));
        RedPointManager.injection(new RedPointGroup('task_group', ['task_achievement_group', 'task_daily_group',"task_warrior_group","task_trial_group"]));
        // 挂机奖励
        // RedPointManager.injection(new RuneCopyJiangliRedpoint('lilian_jiangli'));
        // RedPointManager.injection(new RuneCopyBaoXiangRedpoint('lilian_baoxiang'));
        // 探险
        RedPointManager.injection(new QiyuRedpoint('adventure_qiyu'));
        RedPointManager.injection(new RuneCopyAdventureRedpoin('adventure_count'));
        RedPointManager.injection(new RedPointGroup('adventure_group', ['adventure_qiyu', 'adventure_count']));
        RedPointManager.injection(new RedPointGroup('lilian_group', ['adventure_group', 'task_group', 'function100', 'function200', 'function300', 'function400', 'uproad_red', 'fast_fight']));
    }

    /**注册神器 */
    export function registerArtifactGroup(): void {
        /**神器 */
        let artifactIds = [];
        let artifactGroups = [];
        let artifacts = tb.TB_artifact.get_TB_artifact();
        for (let i in artifacts) {
            let id = artifacts[i].ID;
            artifactIds.push(id);
            artifactGroups.push(`artifactGroup_${id}`);
        }
        for (let id of artifactIds) {
            let artifactsG = `artifactGroup_${id}`;
            let artifactPros = [`artifact_activate_${id}`, `artifact_strength_${id}`, `artifact_skillUp_${id}`, `artifact_pbaptize_${id}`, `artifact_gbaptize_${id}`, `artifact_enchant_${id}`];
            let types = [Artifact.ACTIVATE, Artifact.STRENGTH, Artifact.SKILLUPGRADE, Artifact.PBAPTIZE, Artifact.GBAPTIZE, Artifact.ENCHANT]
            for (let i in artifactPros) {
                let name = artifactPros[i];
                RedPointManager.injection(new ArtifactRedPoint(name, id, types[i]));
            }
            RedPointManager.injection(new RedPointGroup(`artifact_jinengGroup_${id}`, [`artifact_skillUp_${id}`]));
            RedPointManager.injection(new RedPointGroup(`artifact_enchantGroup_${id}`, [`artifact_enchant_${id}`]));
            RedPointManager.injection(new RedPointGroup(`artifact_shengjiGroup_${id}`, [`artifact_strength_${id}`]));
            RedPointManager.injection(new RedPointGroup(`artifact_baptizeGroup_${id}`, [`artifact_pbaptize_${id}`, `artifact_gbaptize_${id}`]));
            RedPointManager.injection(new RedPointGroup(artifactsG, [`artifact_activate_${id}`, `artifact_shengjiGroup_${id}`, `artifact_jinengGroup_${id}`, `artifact_baptizeGroup_${id}`, `artifact_enchantGroup_${id}`]));
        }

        RedPointManager.injection(new RedPointGroup('artifact_RootGroup', artifactGroups));
    }

    /** 动态注册英雄红点组 */
    export function registerGodAndEquipGroup(): void {
        logdebug('重新设置英雄的红点设置');
        let godRootGroup = RedPointManager.getRule('shenling_group') as RedPointGroup;
        if (!godRootGroup) {
            godRootGroup = RedPointManager.injection(new RedPointGroup('shenling_group', [])) as RedPointGroup;
        }
        let rootEquipGroup = RedPointManager.getRule('shenlingequip_group') as RedPointGroup;
        if (!rootEquipGroup) {
            rootEquipGroup = RedPointManager.injection(new RedPointGroup('shenlingequip_group', [])) as RedPointGroup;
        }
        // 布阵按钮红点
        if (!godRootGroup.hasRule('shenling_buzhen_group')) {
            RedPointManager.injection(new BuzhenRedPoint('shenling_buzhen'));
            let buzhenGroup = RedPointManager.injection(new RedPointGroup('shenling_buzhen_group', ['shenling_buzhen'])) as RedPointGroup;
            godRootGroup.addRule(buzhenGroup);
        }
        // 上阵英雄组
        let godIds = App.hero.getLineUpTeamIds(iface.tb_prop.lineupTypeKey.attack);
        let rootGroupNames = godRootGroup.getRuleNames();
        let len = rootGroupNames.length;
        // 移除不在阵容上的英雄红点规则
        for (let i = len - 1; i >= 0; i--) {
            let name = rootGroupNames[i];
            if (name.includes(`attack_linuep_god_`)) {
                let gid = name.substr(18);
                if (godIds.indexOf(gid) == -1) {
                    RedPointManager.removeRule(name);
                }
            }
        }
        let rootEquipGroupNames = rootEquipGroup.getRuleNames();
        let equiplen = rootEquipGroupNames.length;
        // 移除不在阵容上的装备红点规则
        for (let i = equiplen - 1; i >= 0; i--) {
            let name = rootEquipGroupNames[i];
            if (name.includes(`attack_linuep_god_equip_`)) {
                let gid = name.substr(24);
                if (godIds.indexOf(gid) == -1) {
                    RedPointManager.removeRule(name);
                }
            }
        }
        // 添加阵容上的新的英雄红点规则
        for (let gid of godIds) {
            let name = `attack_linuep_god_${gid}`;
            let equipname = `attack_linuep_god_equip_${gid}`;
            let godGroup: RedPointGroup = RedPointManager.getRule(name) as RedPointGroup;
            if (!godGroup) {
                godGroup = RedPointManager.injection(new RedPointGroup(name, [])) as RedPointGroup;
            }
            godRootGroup.addRule(godGroup);
            let godEquipGroup: RedPointGroup = RedPointManager.getRule(equipname) as RedPointGroup;
            if (!godEquipGroup) {
                godEquipGroup = RedPointManager.injection(new RedPointGroup(equipname, [])) as RedPointGroup;
            }
            rootEquipGroup.addRule(godEquipGroup);

            // 可穿戴圣物
            let wearRule = RedPointManager.injection(new GodTreasureWearRedPoint(`god_treasure_wear_${gid}`, gid));
            godGroup.addRule(wearRule);

            // 可激活皮肤
            let skinRule = RedPointManager.injection(new GodSkinRedPoint(`god_skin_${gid}`, gid));
            godGroup.addRule(skinRule);

            //tab红点
            let tabName = GodModel.getInstance().tabredName;
            let equiptabName = EquipModel.getInstance().equiptabredName;
            let allTabRedName: Array<string> = tabName.map(str => `${str}_${gid}`);
            let equipTabRedName: Array<string> = equiptabName.map(str => `${str}_${gid}`);

            for (let i = 0; i < allTabRedName.length; i++) {
                let tabViewName = [];
                if (i == ShenlingTabType.info) {
                    // 添加上阵英雄升级红点规则
                    tabViewName.push(`god_lvup_${gid}`);
                    RedPointManager.injection(new GodLvupRedPoint(`god_lvup_${gid}`, gid));

                    // 添加上阵英雄升阶红点规则
                    tabViewName.push(`god_dgup_${gid}`);
                    RedPointManager.injection(new GodDegreeupRedPoint(`god_dgup_${gid}`, gid));
                } else if (i == ShenlingTabType.shengxin) {
                    // 添加上阵英雄升阶红点规则
                    tabViewName.push(`god_starup_${gid}`);
                    RedPointManager.injection(new GodStarUpRedPoint(`god_starup_${gid}`, gid));
                } else if (i == ShenlingTabType.ronghun) {
                    //融魂红点
                    for (let j = 1; j < 4; j++) {
                        let ballGroups = new Array<any>();
                        ballGroups.push(`god_ball_${gid}_${j}`);
                        tabViewName.push(`god_ronghun_${gid}_${j}`);
                        tabViewName.push(`god_ronghunten_${gid}_${j}`);
                        RedPointManager.injection(new GodFusionBallRedPoint(`god_ball_${gid}_${j}`, gid, j, 1));
                        RedPointManager.injection(new RedPointGroup(`god_ronghun_${gid}_${j}`, ballGroups));
                        RedPointManager.injection(new GodFusionBallRedPoint(`god_ronghunten_${gid}_${j}`, gid, j, 10));
                    }
                } else if (i == ShenlingTabType.awaken) {
                    tabViewName.push(`god_awaken_${gid}`);
                    RedPointManager.injection(new GodAwakenRedPoint(`god_awaken_${gid}`, gid));
                }
                let tabGroup = RedPointManager.injection(new RedPointGroup(allTabRedName[i], tabViewName));
                godGroup.addRule(tabGroup);
            }

            for (let i = 0; i < equipTabRedName.length; i++) {
                let tabViewName = [];
                if (i == EquipTabType.strength) {
                    // 装备
                    for (let j = 1; j <= 4; j++) {
                        tabViewName.push(`god_equip_${gid}_${j}`);
                        RedPointManager.injection(new GodEquipRedPoint(`god_equip_${gid}_${j}`, gid, j));
                    }

                    // 添加上阵英雄一键装备红点规则
                    tabViewName.push(`god_onekey_equip_${gid}`);
                    RedPointManager.injection(new GodOneKeyEquipRedPoint(`god_onekey_equip_${gid}`, gid));

                    // 添加上阵英雄一键强化红点规则
                    tabViewName.push(`god_onekey_strength_${gid}`);
                    RedPointManager.injection(new GodOneKeyStrengthRedPoint(`god_onekey_strength_${gid}`, gid));

                } else if (i == EquipTabType.refine) {
                    // 添加上阵英雄一键精炼红点规则
                    tabViewName.push(`god_onekey_refine_${gid}`);
                    RedPointManager.injection(new GodOneKeyRefineRedPoint(`god_onekey_refine_${gid}`, gid));
                } else if (i == EquipTabType.baoshi) {
                    // 添加上阵英雄装备宝石红点规则
                    for (let j = 1; j <= EquipModel.EQUIP_COUNT; j++) {
                        tabViewName.push(`equip_baoshi_group_${gid}_${j}`);
                        let baoshiGroup = new Array<any>();
                        for (let k = 1; k <= GemstoneModel.gemstone_type_count; k++) {
                            let gemSlot = (j-1)*GemstoneModel.gemstone_type_count + k;
                            baoshiGroup.push(`equip_baoshi_${gid}_${gemSlot}`);
                            RedPointManager.injection(new EquipWearGemsRedPoint(`equip_baoshi_${gid}_${gemSlot}`, gid, gemSlot, k));
                        }
                        RedPointManager.injection(new RedPointGroup(`equip_baoshi_group_${gid}_${j}`, baoshiGroup));
                    }
                }
                let tabGroup = RedPointManager.injection(new RedPointGroup(equipTabRedName[i], tabViewName));
                godEquipGroup.addRule(tabGroup);
            }

        }
        godRootGroup.runHandler();
        rootEquipGroup.runHandler();
    }


}