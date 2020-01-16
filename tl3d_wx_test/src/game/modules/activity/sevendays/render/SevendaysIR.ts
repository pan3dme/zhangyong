/**
* name 
*/
module game {
	export class SevendaysIR extends ui.activity.sevendays.render.SevendaysRenderUI {
		constructor() {
			super();
			this.btn_buy.on(Laya.Event.CLICK, this, this.linqu, ['buy']);
			this.btn_lingqu.on(Laya.Event.CLICK, this, this.linqu, ['linqu']);
		}

		public set dataSource(value) {
			this._dataSource = value;
			this.refreshData(value);
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refreshData(data: SevenDaysData): void {
			if (data) {
				let tbReward = data.tbReward;
				let canTime = new Date(App.serverTimeSecond).getTime() >= SevendaysModel.getInstance().getLoginDaysTime(tbReward.day - 1);
				let arrReward = [];
				for (let i in tbReward.reward) {
					arrReward.push(new ItemVo(tbReward.reward[i][0], tbReward.reward[i][1]));
				}
				this.lab_level.text = data.getDesc();
				this.img_labbg.width = Math.max(this.lab_level.width + 100, 237);
				this.list_item.dataSource = arrReward;
				this.img_already.visible = data.isReward();
				// this.lab_level.stroke = data.isFinish() ? 2 : 0;
				this.btn_buy.label = tbReward.value.toString();
				this.box_yuanjia.visible = data.isBuy() && !data.isReward();
				this.btn_lingqu.visible = !data.isReward() && !data.isBuy();
				this.lab_zuanshi.text = tbReward.defined[0] && tbReward.defined[0][0] ? (tbReward.defined[0][0] + "") : "";
				// this.lab_level.color = data.isFinish() ? "#2aff00" : ColorConst.normalFont;
				// this.lab_level.strokeColor = data.isFinish() ? ColorConst.normalFont : ColorConst.WHITE;
				this.btn_lingqu.selected = this.btn_lingqu.gray = !data.isFinish() || !canTime;
				this.box_yuanjia.gray = this.btn_buy.gray = this.btn_buy.selected = data.isReward() || !canTime;
				this.btn_lingqu.label = !canTime ? LanMgr.getLan("", 10143) : data.isFinish() ? LanMgr.getLan("", 10476) : LanMgr.getLan("", 10045);
				this.btn_lingqu.skin = SkinUtil.buttonGreen;
				this.btn_lingqu.labelStrokeColor = ColorConst.GREEN_FILTER;
				if (tbReward.way_link && tbReward.way_link.length > 0 && this.btn_lingqu.label == LanMgr.getLan("", 10045)) {
					//有跳转
					this.btn_lingqu.selected = this.btn_lingqu.gray = false;
					this.btn_lingqu.label = LanMgr.getLan("", 12604);
					this.btn_lingqu.skin = SkinUtil.buttonNormal;
					this.btn_lingqu.labelStrokeColor = ColorConst.ORANGE_FILTER;
				}
			}
		}

		private linqu(type: string): void {
			if (type == 'buy') {
				if (this.btn_buy.gray) {
					showToast(LanMgr.getLan(``,10229));
					return;
				}
				let data: SevenDaysData = this.dataSource;
				if (App.hero.diamond < data.tbReward.value) {
					showToast(LanMgr.getLan('', 10005));
					return;
				} else if (App.hero.vip < data.tbReward.defined[0][1]) {
					showToast(LanMgr.getLan('', 10156));
					return;
				}
			} else {
				//领取
				if (this.btn_lingqu.gray) {
					let strTip: string = LanMgr.getLan(``, 10229);
					if (this.btn_lingqu.label == LanMgr.getLan("", 10045)) {
						strTip = LanMgr.getLan(``, 10230);
					}
					showToast(strTip);
					return;
				}
				if (this.btn_lingqu.label == LanMgr.getLan("", 12604)) {
					let data: SevenDaysData = this.dataSource;
					dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, data.tbReward.way_link));
					return;
				}
			}
			let args = {};
			args[Protocol.game_activity_getSevenDayReward.args.num] = 1;
			args[Protocol.game_activity_getSevenDayReward.args.id] = this.dataSource.tbReward.ID;
			PLC.request(Protocol.game_activity_getSevenDayReward, args, ($data: any, msg: any) => {
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
				dispatchEvt(new SevendaysEvent(SevendaysEvent.SEVENDAYS_RED_EVENT), this.dataSource.tbReward);
				dispatchEvt(new SevendaysEvent(SevendaysEvent.UPDATE_SEVENDAYS_PANEL));

			});
		}
	}

	export class tabIR extends ui.activity.sevendays.render.tabItemRenderUI {
		constructor() {
			super();
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshData($value);
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refreshData(item: any) {
			if (item) {
				this.btn_tab.label = item[0];
				if (item[1] != "") {
					this.redpoint.setRedPointName(item[1]);
				}
				else {
					this.redpoint.onDispose();
				}
			}
			else {
				this.redpoint.onDispose();
			}
		}
	}
}