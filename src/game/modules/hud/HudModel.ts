/**
* name 
*/
module game {
	export class HudModel {
		/**打开特效的按钮 */
		private _playEffSyss;
		upperBtnVos: ActivityBtnVo[];
		constructor() {
		}
		private static _instance: HudModel;
		public static getInstance(): HudModel {
			if (!this._instance) {
				this._instance = new HudModel();
			}
			return this._instance;
		}
		/** 全面屏顶部加长的像素：为了避免刘海或者摄像头挡住 */
		public static TOP_ADD_HEIGHT : number = 50;
		public oldUserLv : number = 0;
		public initModel():void {
			this.upperBtnVos = this.getHudDatas(Hudpos.Upper).map(tb => new ActivityBtnVo(tb));
		}

		/**活动按钮显示是否有更新 */
		isActivityBtnChange(): boolean {
			let isChange: boolean = false;
			this.upperBtnVos.forEach(vo => {
				if (vo.isHaveChange()) isChange = true;
			})
			return isChange;
		}

		/**获得指定位置类型按钮tb */
		private getHudDatas(type: any): tb.TB_hud[] {
			return tb.TB_hud.get_TB_hud(`pos`, type).sort((a, b) => { return a.rank - b.rank });
		}

		private getTbs(): tb.TB_sys_open[] {
			let tbs = [...tb.TB_sys_open.get_TB_sys_open()].filter(vo => vo.is_show != 0);
			return tbs;
		}
		/** hud按钮功能入口是否显示 */
		static isHudShow(sysid:number):boolean {
			// 不是ios原生时都显示
			if(!GameUtil.isIosNative()){
				return true;
			}
			let tbHud : tb.TB_hud = tb.TB_hud.get_TB_hudBySysId(sysid);
            if(tbHud && tbHud.is_show == 0){
                return false;
            }
			return true;
		}
		/**在活动时间？ */
		static IsOnActivatyTime(sysId: number): boolean {
			if (!App.IsSysOpen(sysId)) {
				return false;
			}
			if(!HudModel.isHudShow(sysId)) {
				return false;
			}
			switch (sysId) {
				case iface.tb_prop.sysOpenTypeKey.activity://活动
					return TimelimitModel.getInstance().hasActivity();
				case iface.tb_prop.sysOpenTypeKey.openGift://开服豪礼
					return OpenserverModel.getInstance().visiableView();
				case iface.tb_prop.sysOpenTypeKey.luckTurnTable://幸运转盘
					return HuodongModel.isOnActivatyTime();
				case iface.tb_prop.sysOpenTypeKey.halfMonth://半月庆典
					return SevendaysModel.getInstance().isOnActivityTime(2);
				case iface.tb_prop.sysOpenTypeKey.sevenDay://新手狂欢
					return SevendaysModel.getInstance().isOnActivityTime(1);
				case iface.tb_prop.sysOpenTypeKey.onlineAward://在线豪礼
					return OnlineModel.getInstance().visiableView()
				case iface.tb_prop.sysOpenTypeKey.godRank://神力排行
					return PowerrankModel.getInstance().visiableView()
				case iface.tb_prop.sysOpenTypeKey.timeLimitBuy://限时热购
					return LimiteBuyModel.getInstance().isOpen()
				case iface.tb_prop.sysOpenTypeKey.realNameAuth://实名认证
					return !(App.hero.realNameVisable == -1 || App.hero.welfare.autonymAwardNum != 0);
				case iface.tb_prop.sysOpenTypeKey.firstCharge://首充
					return !ChongzhiModel.getInstance().isAllReward();
				case iface.tb_prop.sysOpenTypeKey.bindGift://手机绑定
					return !(App.hero.bindPhone == -1 || App.hero.bindMobileAward != 0);
				case iface.tb_prop.sysOpenTypeKey.microClient://微端下载
					return !(App.hero.downClient == -1 || App.hero.isReceiveWDXZ);
				case iface.tb_prop.sysOpenTypeKey.share://分享
					return App.hero.shareVisable != -1;
				case iface.tb_prop.sysOpenTypeKey.superVip://超级vip
					return App.hero.welfare.rechargeSum >= 500;
				case iface.tb_prop.sysOpenTypeKey.openSvrGift://开服礼包
					return OpenserverModel.getInstance().hasOsGiftActivity();
				case iface.tb_prop.sysOpenTypeKey.openSvrFund://周基金
					return TimelimitModel.getInstance().isShowWeekFundActivity();
				case ModuleConst.LOGIN_QIRI://七日登入
					return HuodongModel.getInstance().isShowLoginGift(LoginGiftView.TYPE_ONE);
				case ModuleConst.LOGIN_SHISIRI://14日登入
					return HuodongModel.getInstance().isShowLoginGift(LoginGiftView.TYPE_TWO);
				case ModuleConst.TEST_REBATE://内侧返利
					return HuodongModel.getInstance().canRewardTestRebate();
				case ModuleConst.WARRIOR_PROVE://勇者之证
					return WarriorProveModel.getInstance().isOpen();
				default: return true;
			}
		}

		/**活动按钮事件 */
		static ActivityBtnEvent(sysId: number) {
			let uiMgr = UIMgr.getInstance();
			if (sysId == iface.tb_prop.sysOpenTypeKey.welfare) {
				dispatchEvt(new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.WelfareView]);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.payActivity) {
				dispatchEvt(new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.PayActivityView]);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.recharge) {
				dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.activity) {
				dispatchEvt(new TimelimitEvent(TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.sevenDay || sysId == 711) {
				dispatchEvt(new SevendaysEvent(SevendaysEvent.SHOW_SEVENDAYS_PANEL));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.luckTurnTable) {
				dispatchEvt(new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.LuckyTurnView]);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.realNameAuth) {
				dispatchEvt(new HuodongEvent(HuodongEvent.SHOW_HUODONG_PANEL), [UIConst.RealNameView]);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.godRank) {
				dispatchEvt(new PowerrankEvent(PowerrankEvent.SHOW_VIEW_EVENT));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.openGift) {
				uiMgr.showUI(UIConst.OpenReward);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.onlineAward) {
				uiMgr.showUI(UIConst.OnLineReward);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.firstCharge) {
				//首充
				dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_SHOUCHONG_PANEL));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.share) {
				if (ShareModel.isReceiveFirst()) {
					//已分享
					uiMgr.showUI(UIConst.MainShare);
				} else {
					//未分享
					uiMgr.showUI(UIConst.FirstShare);
				}
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.timeLimitBuy) {
				dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.SHOW_LIMITEBUY_VIEW));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.microClient) {
				//390微端下载
				dispatchEvt(new DownloadeEvent(DownloadeEvent.SHOW_WDXZ_VIEW));
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.superVip) {
				uiMgr.showUI(UIConst.SuperVipView);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.bindGift) {
				uiMgr.showUI(UIConst.BindPhone);
			}
			else if (sysId == iface.tb_prop.sysOpenTypeKey.beStrong) {
				uiMgr.showUI(UIConst.BianQiangView);
			} else if (sysId == iface.tb_prop.sysOpenTypeKey.openSvrGift) {
				uiMgr.showUI(UIConst.OpenServerGift);
			}else if (sysId == iface.tb_prop.sysOpenTypeKey.openSvrFund) {
				uiMgr.showUI(UIConst.WeekFundView);
			}else if (sysId == ModuleConst.LOGIN_QIRI) {
				uiMgr.showUI(UIConst.LoginGiftView, LoginGiftView.TYPE_ONE);
			}else if (sysId == ModuleConst.LOGIN_SHISIRI) {
				uiMgr.showUI(UIConst.LoginGiftView, LoginGiftView.TYPE_TWO);
			}else if (sysId == ModuleConst.TEST_REBATE) {
				uiMgr.showUI(UIConst.TestRebateView);
			}else if (sysId == ModuleConst.WARRIOR_PROVE) {
				dispatchEvt(new TaskEvent(TaskEvent.SHOW_TASK_VIEW,TaskTabType.warrior));
			}

			/**else if (sysId == iface.tb_prop.sysOpenTypeKey.) {//防沉迷验证提示界面
				sendDispatchEvent(new moduleindulge.IndulgeEvent(moduleindulge.IndulgeEvent.SHOW_FANG_YANZHENG));
			} */
		}

		/**是否开启特效 */
		isPlayEffect(sysId: number): boolean {
			if (!this._playEffSyss) {
				this._playEffSyss = [
					iface.tb_prop.sysOpenTypeKey.activity,
					// iface.tb_prop.sysOpenTypeKey.recharge,
					iface.tb_prop.sysOpenTypeKey.firstCharge,
					// iface.tb_prop.sysOpenTypeKey.welfare,
					// iface.tb_prop.sysOpenTypeKey.godRank
				]
			}
			return this._playEffSyss.some(aniId => aniId == sysId);
		}

		static getTbVipByScore(score:number):tb.TB_vip {
            let tbList = tb.TB_vip.get_TB_vip();
            let len = tbList.length;
            for(let i = len - 1 ; i >= 0 ; i--) {
                if(score >= (tbList[i].recharge * 10)) {
                    return tbList[i];
                }
            }
            return null;
        }
	}


	export class SysOpenData {
		tb: tb.TB_sys_open;
		constructor(id: number) {
			this.tb = tb.TB_sys_open.get_TB_sys_openById(id);
		}

		/**是否已完成 */
		isOpen(): boolean {
			return App.IsSysOpen(this.tb.ID);
		}

		/**奖励 */
		getReward(): ItemVo[] {
			return this.tb.open_reward.map(vo => new ItemVo(vo[0], vo[1]));
		}
	}
}

enum Hudpos {
	/**HUD上方 */
	Upper = 1,
	/**HUD中间建筑 */
	Middle = 2,
	/**HUD底部 */
	Bottom = 3
}