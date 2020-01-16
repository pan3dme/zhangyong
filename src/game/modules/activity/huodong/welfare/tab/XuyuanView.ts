/**
* name 
*/
module game {
	export class XuyuanView extends ui.activity.huodong.welfare.tab.XuyuanUI {
		/**光效 */
		// private _effect: LightBox;
		/**当前许愿次数 */
		// private _wishNumbers: number = 0;
		/**当前免费次数 */
		// private _wishfreeNumbers: number = 0;

		private _IS_JUMP:boolean = false;

		constructor() {
			super();
			this.initData();

		}

		public onAdd() {
			this.initView();
		}

		public onExit() {
			this.close();
		}

		public initView(): void {
			this.CalculationTimeDifference();
			this.img_one.on(Laya.Event.CLICK, this, this.onXuyuan, [0]);
			this.img_ten.on(Laya.Event.CLICK, this, this.onXuyuan, [1]);
			this.chk_jump.on(Laya.Event.CHANGE, this, this.onJump);
			this.chk_jump.selected = this._IS_JUMP;
			this.btn_tip.on(Laya.Event.CLICK, this, this.onClickTip);
			Laya.timer.loop(1000, this, this.CalculationTimeDifference);
			// this.label_diamonds.text = "X" + tb.TB_wish_set.get_TB_wish_set().cost_diamond;
			// this._wishNumbers = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum) - App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishMaxNum];
			// this._wishfreeNumbers = App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] ? App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] : 0;
			// this.resUpdate();
			this.setwishNums();
			Laya.timer.loop(1, this, this.updateAction);
		}

		private onJump():void{
			this._IS_JUMP = this.chk_jump.selected;
		}

		//许愿数据
		private initData(): void {
			let tbdata = HuodongModel.getBoxTb(TURNTABLE.WISH);
			tbdata.sort((a, b) => { return a.location - b.location });
			for (let i: number = 0; i < tbdata.length; i++) {
				let item: common.ItemBox = this["item" + i];
				if (item) {
					let itemvo: ItemVo = new ItemVo(tbdata[i].item[0], tbdata[i].item[1]);
					itemvo.isShowEff = tbdata[i].is_show_effect == 1;
					item.dataSource = itemvo;
				}
			}
		}

		/**文字、ui刷新 */
		// private resUpdate(): void {
		// 	this.lab_free.visible = this._wishfreeNumbers != 1;
		// 	this.img_diamonds.visible = this._wishfreeNumbers == 1;
		// 	this.label_freetime.visible = this._wishfreeNumbers == 1;
		// 	this.label_diamonds.visible = this._wishfreeNumbers == 1;
		// 	this.lab_cost_title.visible = this._wishfreeNumbers == 1;
		// 	this.label_vowcount.text = LanMgr.getLan("今日许愿次数：", -1) + this._wishNumbers.toString() + "/" + App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum);
		// }

		private updateCost(): void {

			let tbWishSet = tb.TB_wish_set.get_TB_wish_set();

			let diamond: number = App.hero.diamond;
			let cost: number = tbWishSet.cost_diamond;
			if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishFreeNum) < tbWishSet.free_num) {
				//免费
				this.lab_cost_one.text = "免费";
				this.lab_cost_one.color = "#ffffff";
				this.lab_cost_one.stroke = 4;
				this.img_cost_one.visible = false;

				this.lab_cost_one.x = 41;
			} else {

				this.lab_cost_one.x = 59;
				this.lab_cost_one.text = cost + "";
				this.img_cost_one.visible = true;
				if (diamond < cost) {
					//钱不够
					this.lab_cost_one.color = "#ff0000";
					this.lab_cost_one.stroke = 0;
				} else {
					this.lab_cost_one.color = "#ffffff";
					this.lab_cost_one.stroke = 4;
				}
			}
			//十次
			let count = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum) - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum)
			count = count == 0?10:Math.min(count, 10);
			cost *= count;
			this.lab_cost_ten.text = cost + "";
			this.lab_morenum.text = num2ChiNum(count) + "次";

			if (diamond < cost) {
				this.lab_cost_ten.color = "#ff0000";
				this.lab_cost_ten.stroke = 0;
			} else {
				this.lab_cost_ten.color = "#ffffff";
				this.lab_cost_ten.stroke = 4;
			}
		}


		/**许愿 */
		private onXuyuan(index: number): void {
			if (this._isPlayTurnAni) return;
			let tbWishSet = tb.TB_wish_set.get_TB_wish_set();
			let maxUpNum = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum);
			if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum) >= maxUpNum) {
				showToast(LanMgr.getLan("", 10222));
				return;
			}

			let diamond: number = App.hero.diamond;
			let count: number = 0;
			let canPlay: boolean = true;
			let cost = tbWishSet.cost_diamond;
			if (index == 0) {
				//一次
				if (App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishFreeNum) >= tbWishSet.free_num) {
					//免费次数完了
					canPlay = cost <= diamond;
				}
				count = 1;
			} else {
				count = maxUpNum - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum)
				count = Math.min(count, 10);
				canPlay = (cost * count) <= diamond;
			}

			if (canPlay) {
				dispatchEvt(new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS), { count: count });
			} else {
				showToast(LanMgr.getLan("", 10005));
			}

			// if (App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] === tbWishSet.free_num) {
			// 	if (App.hero.diamond < tb.TB_wish_set.get_TB_wish_set().cost_diamond) {
			// 		showToast(LanMgr.getLan("", 10005));
			// 		dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
			// 		return;
			// 	}
			// }
			// if (this._hint && App.hero.limitInfo[iface.tb_prop.limitTypeKey.wishFreeNum] === tbWishSet.free_num) {
			// 	let img = HtmlUtil.convertHtmlText(`<img style='padding:-10px 0 0 0;' src='${SkinUtil.getCostSkin(iface.tb_prop.resTypeKey.diamond)}' ></img>`);
			// 	common.TishiView.showTishi({
			// 		text: LanMgr.getLan(`是否消耗` + img + `X${tbWishSet.cost_diamond} 进行一次许愿？`), confirmCb: (hintvisible) => {
			// 			dispatchEvt(new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS), { hintvisible: hintvisible });
			// 		}, parm: null
			// 	});
			// } else {
			// 	dispatchEvt(new HuodongEvent(HuodongEvent.MAKE_PROMISE_SUCCESS), { hintvisible: null });
			// }
		}

		private removeMask() {
			GuideMask.hide();
		}

		public addMask() {
			GuideMask.show(this.box_center, DirectionType.none, "", true, () => {

			}, 0, false);
		}





		/**
		 * 光效转动
		 * @param data 服务端返回数据
		 * @param msg 服务端返回msg	
		 */
		private _serverData: any;
		public startAction(data: any, msg: string): void {
			this._serverData = data;

			if (this._IS_JUMP){
				this.showReward();
				return;
			}

			let tbdata = tb.TB_wish.get_TB_wishById(data.wishId[0]);
			// this._effect.startTurn(data, msg, tbdata.location - 1, () => { this.btn_xuyuan.selected = false; })

			let endAng: number = -45 * (tbdata.location - 1) - 22.5 + 2160;
			this.startTurnAni(endAng);
			if (UIMgr.hasStage(UIConst.TurnRewardView))
				UIMgr.hideUIByName(UIConst.TurnRewardView);
		}



		private updateAction(): void {
			let curT: number = Laya.timer.currTimer;
			this.updateTurnAni(curT);

			if (!this._isPlayXXAni && curT >= this._turnStartTime + XuyuanView.TURN_WEEK_TIME + 2000) {
				this.startXXAni();
			}
			this.updateXXANI(curT);
		}

		private static TURN_WEEK_TIME: number = 6000;
		private _turnStartAng: number = 0;
		private _turnTotalAng: number = 0;
		private _turnStartTime: number = 0;
		private _isPlayTurnAni: boolean = false;
		private startTurnAni(endAng: number): void {
			this._turnStartAng = this.itemBoxs.rotation % 360;
			this._turnTotalAng = endAng - this._turnStartAng;
			this._turnStartTime = Laya.timer.currTimer;
			this._isPlayTurnAni = true;

			this.endXXAni();
			this.addMask();
		}

		private updateTurnAni(curT: number): void {
			if (!this._isPlayTurnAni) return;
			let ang: number = this.getTurnAngle(this._turnStartAng, this._turnTotalAng, curT - this._turnStartTime, XuyuanView.TURN_WEEK_TIME);
			this.itemBoxs.rotation = ang % 360;
			if (curT >= this._turnStartTime + XuyuanView.TURN_WEEK_TIME) {
				this.endTurnAni();
				this.showReward();
			}
		}

		private showReward() {
			if (this._serverData) {
				// this.timer.callLater(this, () => {
					let rewardObj = HuodongModel.getRewards(TURNTABLE.WISH, this._serverData.wishId);
					if (UIMgr.hasStage(UIConst.TurnRewardView)) {
						let uiPanel: TurnRewardView = UIMgr.getUIByName(UIConst.TurnRewardView);
						uiPanel.dataSource = { type: TURNTABLE.WISH, items: rewardObj.data };
						uiPanel.initView();
					} else {
						UIMgr.showUI(UIConst.TurnRewardView, { type: TURNTABLE.WISH, items: rewardObj.data });
					}
				// })
			}
		}

		private getTurnAngle(startAngle: number, TurnAngle: number, curTime: number, totalTime: number): number {
			if (curTime >= totalTime) return startAngle + TurnAngle;
			let t: number = curTime / totalTime - 1;
			return -TurnAngle * (t * t * t * t - 1) + startAngle;
		}

		private endTurnAni(): void {
			this._isPlayTurnAni = false;
			this.removeMask();
		}

		//开始休闲动画
		private static XX_ANI_STOP_TIME: number = 1000;//休闲动画停顿时间（ms）
		private static XX_ANI_WEEK_TIME: number = 7800;//休闲动画周期时间(ms)
		private static XX_ANI_SPEED: number = 0.1;//休闲动画速度
		private _xxSpeed: number = 0;//休闲动画速度
		private _xxEndTime: number = 0;
		private _isPlayXXAni: boolean = false;
		private startXXAni(): void {
			this._isPlayXXAni = true;
			this._xxEndTime = 0;
		}

		private updateXXANI(curT: number): void {
			if (!this._isPlayXXAni) return;
			if (curT <= this._xxEndTime) {
				//旋转
				this.itemBoxs.rotation += this._xxSpeed;
			} else if (curT > this._xxEndTime + XuyuanView.XX_ANI_STOP_TIME) {
				//过了停顿时间，又要开始旋转
				let rand: number = Math.random();
				this._xxSpeed = (rand > 0.7 ? -1 : 1) * XuyuanView.XX_ANI_SPEED;
				this._xxEndTime = curT + XuyuanView.XX_ANI_WEEK_TIME;
			} else {
				//停顿时，啥事情也不做
			}
		}

		//结束休闲动画
		private endXXAni(): void {
			this._isPlayXXAni = false;
		}

		//许愿剩余次数
		public setwishNums() {
			this.updateCost();
			this.label_vowcount.text = LanMgr.getLan("今日许愿次数：", -1) + App.hero.getlimitValue(iface.tb_prop.limitTypeKey.wishMaxNum) + "/" + App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.wishNum);
		}

		/**实时更新当前时间与固定点时差 */
		private CalculationTimeDifference(): void {
			let date = new Date(App.serverTimeSecond * 1000);
			let Hour = date.getHours() * 3600;
			let min = date.getMinutes() * 60;
			let sec = date.getSeconds();
			let dateTime = Hour + min + sec;
			let value = TimeConst.ONE_DAY_SEC - dateTime;
			let text = StringToTime(value.toString());
			this.label_freetime.text = LanMgr.getLan("下次免费时间 : {0}", -1, text);
		}

		private onClickTip(): void {
			UIUtil.showCommonTipView(LanMgr.getLanArr(20004));
		}

		public onClosed(): void {
			super.onClosed();
			this.btn_tip.off(Laya.Event.CLICK, this, this.onClickTip);
			this.chk_jump.off(Laya.Event.CHANGE, this, this.onJump);
			this.img_one.off(Laya.Event.CLICK, this, this.onXuyuan);
			this.img_ten.off(Laya.Event.CLICK, this, this.onXuyuan);
			Laya.timer.clear(this, this.CalculationTimeDifference);
			Laya.timer.clearAll(this);
			this.endTurnAni();
			this.endXXAni();
			this._serverData = null;
		}
	}
}