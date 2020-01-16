/**
* name 
*/
module game {
	export class ShouchongView extends ui.activity.shouchong.ShouchongUI {
		private _listItems: any[] = [];
		private _equipList: EquipItemVo[];
		private _model : ChongzhiModel;
		constructor() {
			super();
			this.tabBar.selectHandler = new Laya.Handler(this, this.onTabSelect);
			this.isModelClose = true;

			this._listItems[0] = this.listitem_0;
			this._listItems[1] = this.listitem_1;
			this._listItems[2] = this.listitem_2;
			this._model = ChongzhiModel.getInstance();
		}

		set dataSource(value) {
			this._dataSource = value;
		}

		get dataSource(): FirstRechargeData {
			return this._dataSource;
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
			this.initAllReward();
		}

		private initView(): void {
			let data: FirstRechargeData = this._model.getCurData();
			let Idx = data.tb.ID;
			this.onTabSelect(Idx - 1);
			if (this._listItems) {
				for (let i: number = 0; i < this._listItems.length; i++) {
					this._listItems[i].btnsure.on(Laya.Event.CLICK, this, this.onSure);
				}
			}
			for (let i: number = 0; i < 3; i++) {
				this.listitem_1["equip" + i].on(Laya.Event.CLICK, this, this.onClickEquip, [i]);
			}
			dispatchEvt(new GuajiEvent(GuajiEvent.CLOSE_SHOUCHONG_TIPS));
		}

		public _selectTabNum: number;
		private onTabSelect(index: number) {
			if (index == -1) return;
			if (index < 0 || index > 2) index = 0;
			this._selectTabNum = index;
			this.tabBar.selectedIndex = index;
			this.viewStack.selectedIndex = index;
			this._listItems[index].visible = true;
			this.setViewData(index);
		}

		private initAllReward(): void {
			let alldata: FirstRechargeData[] = this._model.firstRechargeData;
			for (let i: number = 0; i < alldata.length; i++) {
				this._listItems[i].list_item.dataSource = alldata[i].allrewards;
				if (alldata[i].tb.show_type == 2) {
					this._equipList = alldata[i].tb.show.map((item) => {
						let equip = new EquipItemVo(tb.TB_item.get_TB_itemById(item[0]))
						equip.show = true;
						return equip
					});
				}
			}

			// this.rewardList.array = data.show.map((item) => {
			// 	let equip = new EquipItemVo(tb.TB_item.get_TB_itemById(item[0]))
			// 	equip.show = true;
			// 	return equip
			// });
		}

		public updateView(): void {
			this.setViewData(this._selectTabNum);
		}

		/**切换Tab改变数据 */
		public setViewData(index: number, data?: FirstRechargeData): void {
			if (!data) data = this._model.getDataById(index);
			this.dataSource = data;
			let tbData = data.tb;

			let view = this._listItems[index];
			view.img_gou0.visible = data.rewards[0].isReward();
			view.img_gou1.visible = data.rewards[1].isReward();
			view.img_gou2.visible = data.rewards[2].isReward();
			//充值金额
			view.lab_chong.text = "已充值:" + App.hero.welfare.rechargeSum;
			view.imgRp.visible = false;
			//按钮
			if (data.canReward()) {
				view.imgRp.visible = true;
				view.btnsure.gray = false;
				view.btnsure.label = "领取";
				view.btnsure.skin = "shouchong/shouchong02.png";
				view.btnsure.labelColors = "#137d47";
			} else if (data.isReward()) {
				view.btnsure.gray = true;
				view.btnsure.label = "已领取";
				view.btnsure.skin = "shouchong/shouchong02.png";
				view.btnsure.labelColors = "#137d47";
			} else if (data.isAfterRewardday()) {
				view.btnsure.gray = true;
				view.btnsure.label = "明日领取";
				view.btnsure.skin = "shouchong/shouchong02.png";
				view.btnsure.labelColors = "#137d47";
			} else {
				//去充值
				view.btnsure.gray = false;
				view.btnsure.label = "前往充值";
				view.btnsure.skin = "shouchong/shouchong01.png";
				view.btnsure.labelColors = "#ad4606";
			}
		}


		private onClickEquip(index: number): void {
			if (!this._equipList || !this._equipList[index]) return;
			UIUtil.showTip(this._equipList[index]);
		}

		onSure(): void {
			let view = this._listItems[this._selectTabNum];
			let str = view.btnsure.label;
			switch (str) {
				case `领取`:
					this.send();
					break;
				case `前往充值`:
					this.recharge();
					break;
				case `已领取`:
					showToast(LanMgr.getLan(``, 10215));
					break;
				case `明日领取`:
					showToast(LanMgr.getLan(``, 10216));
					break;
			}
		}

		/**领奖 */
		send(): void {
			let data = this.dataSource;
			dispatchEvt(new TopUpEvent(TopUpEvent.GET_FIRSTRECHARGE_REWARD), { id: data.tb.ID, day: data.getCanReardId() })
		}

		/**充值 */
		private recharge(): void {
			this.close();
			dispatchEvt(new TopUpEvent(TopUpEvent.SHOW_CHONGZHI_PANEL));
		}

		private lookGod(): void {
			let model = this.dataSource.tb.show[0][0];
			let godtab = tb.TB_god.get_TB_godById(model);
			let realDegree = 5;
			let obj = { templateId: godtab.ID, starLevel: 5, level: 100, skill: godtab.skill, degree: realDegree };
			let godData: GodItemVo = new GodItemVo(obj);
			godData.tab_god = godtab;
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
		}

		private lookAwakenGod(): void {
			let godtab = tb.TB_god.get_TB_godById(3101);
			let realDegree = 5;
			let obj = { templateId: godtab.ID, starLevel: 5, level: 100, skill: godtab.skill, degree: realDegree };
			let godData: GodItemVo = new GodItemVo(obj);
			godData.tab_god = godtab;
			dispatchEvt(new TujianEvent(TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
		}

		public close(type?: string, showEffect?: boolean, sound = true): void {
			super.close(type, showEffect, sound);
		}

		//关闭面板
		public onClosed(): void {
			super.onClosed();
			this.tabBar.selectedIndex = -1;
			this.viewStack.selectedIndex = -1;
			if (this._listItems) {
				for (let i: number = 0; i < this._listItems.length; i++) {
					this._listItems[i].btnsure.off(Laya.Event.CLICK, this, this.onSure);
				}
			}
			for (let i: number = 0; i < 3; i++) {
				this.listitem_1["equip" + i].off(Laya.Event.CLICK, this, this.onClickEquip, [i]);
			}
		}
	}
}