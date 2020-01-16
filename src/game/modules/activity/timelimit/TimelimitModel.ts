/**
* TimelimitModel
*/
module game {
	export class TimelimitModel {
		private static _instance: TimelimitModel;
		static getInstance(): TimelimitModel {
			if (!TimelimitModel._instance) {
				TimelimitModel._instance = new TimelimitModel();
			}
			return TimelimitModel._instance;
		}

		// public static IS_CLICK_EXCHANGE: boolean = false;

		//特殊活动（id为10000之后都是）
		public static ACTIVITY_JIJIN_ID: number = 10000;//基金活动
		public static ACTIVITY_OPENBUY_ID: number = 10001;//开服团购

		/**
		 * 清理过期活动
		 */
		public clearActicity() {
			if (isEmptyObject(this._tabMap)) {
				return;
			}
			for (var key in this._tabMap) {
				if (this._tabMap.hasOwnProperty(key)) {
					var element = this._tabMap[key];
					if (element.rewardTime <= App.getServerTime()) {
						if (element.id == TimelimitModel.ACTIVITY_JIJIN_ID) {
							//周基金，还要检查是否领取完毕
							if (!this.hasNoReceiveWeekFund()) {
								delete this._tabMap[key];
							}
						} else {
							delete this._tabMap[key];
						}
					}
				}
			}
		}

		getTabMap(): Object {
			return this._tabMap;
		}

		/**
		 * FIX 现在逻辑为0点重置，如有任意时间，需更改
		 * 重置所有活动TO服务端
		 */
		public refreshActivity() {
			this._tabMap = null;
			this.getActicity();
		}

		private _tabMap: Object;
		public xianshiTimeIdx:number = 0;
		public getActicity() {
			if (!isEmptyObject(this._tabMap)) {
				dispatchEvt(new TimelimitEvent(TimelimitEvent.GET_TAB_EVENT), this._tabMap);
				return;
			}
			this._tabMap = {};
			this._acticityMap = {};
			PLC.request(Protocol.game_activity_getActivityList, {}, ($datavo: any) => {
				if ($datavo) {
					//activityList.id 对应tb_operate_activity表的time_index
					for (var i = 0; i < $datavo.activityList.length; i++) {
						//服务端的id转为页签
						let activityvo = $datavo.activityList[i];
						let sid = activityvo.id;
						let link = tb.TB_operate_activity.getLinkByIdx(sid);
						if (link != -1) {
							activityvo["link"] = link;
							this._tabMap[sid] = activityvo;
							if (link == iface.tb_prop.operateActivityTypeKey.exchange) {
								let obj = { endTime: activityvo.endTime, id: 99, rewardTime: activityvo.endTime, startTime: activityvo.startTime,link }
								this._tabMap[obj.id] = obj;
								this.xianshiTimeIdx = sid;
							}
						}
					}

					let activityAllInfo: Array<any> = $datavo.activityAllInfo;
					for (let i = 0; i < activityAllInfo.length; i++) {
						//创建具体活动,放入具体的标签页中
						let vo: OperateActivityVo = new OperateActivityVo();
						vo.setData(activityAllInfo[i]);
						if (!vo || !vo.tbActivity) continue;
						let activityId = vo.tbActivity.time_index;
						let tabInfo = this._tabMap[activityId];
						if (!tabInfo) continue;
						vo.endtime = this._tabMap[activityId].rewardTime;
						if (!this._acticityMap[activityId]) {
							this._acticityMap[activityId] = [];
						}
						this._acticityMap[activityId].push(vo);
						//获取数据时，如有可领取，就派发红点事件
						if (vo.isCanReward() && !vo.isOverdue()) {
							dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), activityId);
						}
					}

				}

				//开服团购处理
				let ctime = tb.TB_activity_set.getTabSet().group_buy_time;
				let openbuyendtime = App.hero.openSvrTime + ctime;
				if (openbuyendtime > App.getServerTime()) {
					//团购活动未结束
					let obj = { endTime: openbuyendtime, id: TimelimitModel.ACTIVITY_OPENBUY_ID, rewardTime: openbuyendtime, startTime: App.hero.openSvrTime }
					this._tabMap[obj.id] = obj;
					this._tabMap[obj.id]["link"] = TimelimitModel.ACTIVITY_OPENBUY_ID;

					if (!this._acticityMap[obj.id]) {
						this._acticityMap[obj.id] = [];
					}

					let groupbuylist = tb.TB_group_buy.get_TB_group_buy();
					var $obj: any = TableData.getInstance().getTableByName(TableData.tb_group_buy);
					for (var $key in $obj.data) {
						var $vo: tb.TB_group_buy = $obj.data[$key] as tb.TB_group_buy
						//创建具体活动,放入具体的标签页中
						let vo: GroupBuyActivityVo = new GroupBuyActivityVo();
						vo.setData({id:TimelimitModel.ACTIVITY_OPENBUY_ID,endtime:openbuyendtime,tabvo:$vo});
						this._acticityMap[obj.id].push(vo);
					}
					dispatchEvt(new TimelimitEvent(TimelimitEvent.GROUP_RED_EVENT));
				}

				//处理下特殊活动
				// this.getSpActivity(this._tabMap);

				dispatchEvt(new TimelimitEvent(TimelimitEvent.GET_TAB_EVENT), this._tabMap);
			});
		}

		/**
		 * 是否有开服团购红点
		 */
		public canGroupBuyRedPoint():boolean{
			let list = this._acticityMap[TimelimitModel.ACTIVITY_OPENBUY_ID]
			for (let i = 0; list && i < list.length; i++) {
				let element:GroupBuyActivityVo = list[i];
				if(element.isCanReward()){
					return true;
				}
			}
			return false;
		}

		//特殊活动
		// private getSpActivity(tabmap:Object):void{
		// 	let curTime:number = App.getServerTime();
		// 	//基金活动
		// 	if (tb.TB_fund.fundStartTime() <= curTime && (curTime <= tb.TB_fund.fundEndTime() || this.hasNoReceiveWeekFund())){
		// 		let obj = { id: TimelimitModel.ACTIVITY_JIJIN_ID, endTime: tb.TB_fund.fundEndTime(), rewardTime: tb.TB_fund.fundEndTime(), startTime: tb.TB_fund.fundStartTime() }
		// 		tabmap[obj.id] = obj;
		// 		sendDispatchEvent(new TimelimitEvent(TimelimitEvent.FUND_RED_EVENT));
		// 	}
		// }

		//获得兑换活动模板
		public static getChangeItem(timeindex: number): ItemVo {
			let activity: tb.TB_operate_activity = tb.TB_operate_activity.getChangeTemplate("time_index", String(timeindex));
			if (activity) {
				return new ItemVo(activity.defined[0][0], 0);
			}
			return null;
		}

		//是否有未领取的周基金奖励
		public hasNoReceiveWeekFund(): boolean {
			if (App.hero.welfare.weekFund && App.hero.welfare.weekFund.length > 0) {
				for (let i: number = 0; i < App.hero.welfare.weekFund.length; i++) {
					let id: number = App.hero.welfare.weekFund[i];
					let allreward: tb.TB_fund_reward[] = tb.TB_fund_reward.getFundListByType(id);
					for (let j: number = 0; j < allreward.length; j++) {
						if (App.hero.welfare.weekFundAward.indexOf(allreward[j].ID) == -1) {
							return true;
						}
					}
				}

			}
			return false;
		}

		//是否显示周基金入口
		public isShowWeekFundActivity(): boolean {
			let curTime: number = App.getServerTime();
			return tb.TB_fund.fundStartTime() <= curTime && (curTime <= tb.TB_fund.fundEndTime() || this.hasNoReceiveWeekFund());
		}

		public updateData($modifyCondInfo) {
			if (!$modifyCondInfo) {
				return;
			}
			for (var key in $modifyCondInfo) {
				let changid = Number(key);
				let tab = tb.TB_operate_activity.get_TB_operate_activityById(changid);
				//活动归属哪个页签下，从表中的time_index字段对应
				if (this._acticityMap.hasOwnProperty(tab.time_index)) {
					let list = this._acticityMap[tab.time_index];
					for (var i = 0; i < list.length; i++) {
						var element: OperateActivityVo = list[i];
						if (element.id == changid) {
							element.setCondCount(Number($modifyCondInfo[key]));
							if (element.isCanReward() && !element.isOverdue()) {
								dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), tab.time_index);
							}
							break;
						}
					}
				}
			}
		}

		/**
		 * 是否有shou
		 */
		public canRedPoint(id: number) {
			if (!isEmptyObject(this._acticityMap) && this._acticityMap.hasOwnProperty(id)) {
				let activityInfo = this._acticityMap[id];
				return activityInfo.some((value: OperateActivityVo) => {
					return value.isCanReward() && !value.isOverdue();
				})
			} else {
				return false;
			}
		}

		/** 获取活动中的某项 */
		getActivityVoById(subId: number): OperateActivityVo {
			for (var key in this._acticityMap) {
				let activityInfo: OperateActivityVo[] = this._acticityMap[key];
				if (activityInfo) {
					for (let i = 0; i < activityInfo.length; i++) {
						let curVo = activityInfo[i];
						if (curVo.id == subId) {
							return curVo;
						}
					}
				}
			}
			return null;
		}

		/**
		 * 是否存在活动
		 */
		public hasActivity(): boolean {
			return !isEmptyObject(this._tabMap);
		}

		private _acticityMap: Object
		public getTabActivity($id: number) {
			return this._acticityMap[$id];
		}

		public refreshActivityByTab($key: number) {
			let propMap = {};
			let activityId = this.getActivityIdByProp($key);
			let arg = {};
			arg[Protocol.game_activity_updateActivityCondCount.args.id] = activityId;
			PLC.request(Protocol.game_activity_updateActivityCondCount, arg, ($sdata) => {
				if (!$sdata) return;
				for (let id in $sdata.modifyCondInfo) {
					let activityVo = this.getActivityVoById(Number(id));
					if (activityVo) {
						activityVo.setCondCount($sdata.modifyCondInfo[id]);
						dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), activityVo.tbActivity.time_index);
					}
				}
				for (let id in $sdata.modifyRewardCount) {
					let activityVo = this.getActivityVoById(Number(id));
					if (activityVo) {
						activityVo.setRewardCount($sdata.modifyRewardCount[id]);
						dispatchEvt(new TimelimitEvent(TimelimitEvent.RED_EVENT), activityVo.tbActivity.time_index);
					}
				}
			});
		}

		private _propMap: any;
		getActivityIdByProp(propType: number): number {
			if (!this._propMap) {
				this._propMap = {};
				this._propMap[iface.tb_prop.redPointTypeKey.rechargeSum] = iface.tb_prop.operateActivityTypeKey.rechargeSum;
				this._propMap[iface.tb_prop.redPointTypeKey.consumeSum] = iface.tb_prop.operateActivityTypeKey.consumeSum;
				this._propMap[iface.tb_prop.redPointTypeKey.singleRecharge] = iface.tb_prop.operateActivityTypeKey.singleRecharge;
				this._propMap[iface.tb_prop.redPointTypeKey.dailyRecharge] = iface.tb_prop.operateActivityTypeKey.dailyRecharge;
				this._propMap[iface.tb_prop.redPointTypeKey.giftPacks] = iface.tb_prop.operateActivityTypeKey.giftPacks;
				this._propMap[iface.tb_prop.redPointTypeKey.exchange] = iface.tb_prop.operateActivityTypeKey.exchange;
				this._propMap[iface.tb_prop.redPointTypeKey.loginSum] = iface.tb_prop.operateActivityTypeKey.loginSum;
				this._propMap[iface.tb_prop.redPointTypeKey.dailyRechargeSum] = iface.tb_prop.operateActivityTypeKey.dailyRechargeSum;
			}
			return this._propMap[propType];
		}
	}
}