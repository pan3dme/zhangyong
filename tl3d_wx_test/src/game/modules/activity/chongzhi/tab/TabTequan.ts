/**
* name 
*/
module game {
	export class TabTequan extends ui.activity.chongzhi.TabTequanUI {
		private now: number;
		constructor() {
			super();
			this.list_tequaninfo.renderHandler = new Handler(this, this.onInfoRender);
			this.btn_left.on(Laya.Event.CLICK, this, this.onLeft);
			this.btn_right.on(Laya.Event.CLICK, this, this.onRight);
			this.btn_buy.on(Laya.Event.CLICK, this, this.onBuy);
		}

		public set dataSource($value: tb.TB_vip) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource(): tb.TB_vip {
			return this._dataSource;
		}

		/**
		 * 刷新数据
		 */
		private refreshData() {
			let info = this.dataSource;
			if (info) {
				this.lab_yuanjia.text = String(info.original_price);
				this.lab_xianjia.text = String(info.now_price);
				this.now = info.ID;
				this.updateBtn();
				this.controls();
				this.tequaninfo(info);
				this.icondata(info);
				this.updateRedPoint();
			}
		}
		private updateBtn(): void {
			this.btn_right.gray = this.now == App.getMaxVipLv() ? true : false;
			this.btn_left.gray = this.now == 1 ? true : false;
		}

		/**
		 * 存放特权描述
		 * @param data 
		 */
		private tequaninfo(data: tb.TB_vip) {
			let infoary: Array<any> = new Array<any>();
			let arr: tb.TB_vip_privilege[] = tb.TB_vip_privilege.get_TB_vip_privilege("vip_level", this.now + "");
			for (let i: number = 0; i < arr.length; i++) {
				infoary.push({ desc: arr[i].desc, isspecial: arr[i].is_show_special, rank: 0 });
			}

			if (this.now == 1) {
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum, data.god_limit));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum, data.arena_buy));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum, data.fast_fighting));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.wishNum, data.wish_limit));
				// infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime, data.offline_time));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.hangupIncome, data.hang_up));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum, data.guildcopy_buy));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum, data.daily_copy));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum, data.gold_exchange));

				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.worldBossNum, data.worldboss));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.runeCopyExtraNum, data.match_buy));
				// infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum, data.sweep_add));
				infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum, data.fight_goddomain));
			} else {
				let preData = tb.TB_vip.get_TB_vipById(this.now - 1);
				if (preData.god_limit != data.god_limit) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum, data.god_limit));
				if (preData.arena_buy != data.arena_buy) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum, data.arena_buy));
				if (preData.fast_fighting != data.fast_fighting) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.quickBattleNum, data.fast_fighting));
				if (preData.wish_limit != data.wish_limit) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.wishNum, data.wish_limit));

				// if(preData.offline_time != data.offline_time) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime, data.offline_time));
				if (preData.hang_up != data.hang_up) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.hangupIncome, data.hang_up));
				if (preData.guildcopy_buy != data.guildcopy_buy) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum, data.guildcopy_buy));
				if (preData.daily_copy != data.daily_copy) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum, data.daily_copy));
				if (preData.gold_exchange != data.gold_exchange) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.goldBuyNum, data.gold_exchange));

				if (preData.worldboss != data.worldboss) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.worldBossNum, data.worldboss));
				if (preData.match_buy != data.match_buy) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.runeCopyExtraNum, data.match_buy));
				// if(preData.sweep_add != data.sweep_add) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum, data.sweep_add));
				if (preData.fight_goddomain != data.fight_goddomain) infoary.push(this.getTeQuanInfo(iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum, data.fight_goddomain));

				infoary.push({ desc: LanMgr.getLan("包含VIP{0}所有特权", -1, this.now - 1), isspecial: 0, rank: 100000 });
			}
			infoary.sort((a, b) => {
				return a.rank - b.rank;
			})
			this.list_tequaninfo.dataSource = infoary;
		}

		private getTeQuanInfo(id: number, value: number): any {
			let temp: tb.TB_vip_desc = tb.TB_vip_desc.get_TB_vip_descById(id);
			if (!temp) return { desc: value, isspecial: 0, rank: 99999 };
			let hzstr: string = "";
			if (id == iface.tb_prop.vipPrivilegeTypeKey.offlineIncomeTime) value /= 3600;
			if (id == iface.tb_prop.vipPrivilegeTypeKey.hangupIncome) hzstr = "%";
			return { desc: LanMgr.getLan(temp.desc + hzstr, -1, value), isspecial: 0, rank: temp.rank };
		}

		/**
		 * 特权礼包数据
		 * @param data 
		 */
		private icondata(data: tb.TB_vip) {
			let temparry: Array<any> = new Array<any>();
			for (let i = 0; i < data.item_gift.length; i++) {
				let vo: ItemVo;
				vo = App.hero.createItemVo(data.item_gift[i][1], data.item_gift[i][0]);
				temparry.push({ item: vo, play: i < data.flash_num });
			}
			this.list_icon.dataSource = temparry;
			this.list_icon.repeatX = temparry.length > 5 ? 5 : temparry.length;
			this.list_icon.centerX = 0.5;
		}

		/**
		 * 渲染特权描述
		 * @param itemRender 
		 * @param index 
		 */
		private onInfoRender(itemRender: Laya.Label, index: number) {
			itemRender.text = (index + 1) + "." + this.list_tequaninfo.dataSource[index].desc;
			if (this.list_tequaninfo.dataSource[index].isspecial == 1) {
				//特殊
				itemRender.color = "#c26939";
			} else {
				itemRender.color = "#72503f";
			}
		}

		/**
		 * 更新红点
		 */
		private updateRedPoint(): void {
			let model = ChongzhiModel.getInstance();
			this.img_rpbuy.visible = this.img_rpleft.visible = this.img_rpright.visible = false;
			//左红点
			for (let i = 0; i < this.now; i++) {
				if (model.isVisibleByid(i)) this.img_rpleft.visible = true;
			}
			//右红点 以16未限避免 now + 1 = 16
			for (let i = this.now + 1; i <= 16; i++) {
				if (model.isVisibleByid(i)) this.img_rpright.visible = true;
			}
			if (model.isVisibleByid(this.now)) {
				this.img_rpbuy.visible = true;
			}
			dispatchEvt(new TopUpEvent(TopUpEvent.UPDATE_TEQUANRED_EVEN));
		}

		/**
		 * 点击向右按钮
		 */
		private onRight() {
			let maxVip = App.getMaxVipLv();
			if (this.now < maxVip) {
				this.now++;
				let viptab: tb.TB_vip = tb.TB_vip.get_TB_vipById(this.now);
				this.dataSource = viptab;
				this.refreshData();
				this.controls();
				this.updateBtn();
			}
		}

		/**
		 * 点击向左按钮
		 */
		private onLeft() {
			if (this.now > 1) {
				this.now--;
				let viptab: tb.TB_vip = tb.TB_vip.get_TB_vipById(this.now);
				this.dataSource = viptab;
				this.refreshData();
				this.controls();
				this.updateBtn();
			}
		}

		/**
		 * 控制控件
		 */
		private controls() {
			this.img_vip.text = "VIP" + this.now.toString() + "特权";
			this.lab_vip.text = "VIP" + this.now + "尊享礼包";
			if (App.hero.welfare.privilegeGiftPack[this.now]) {
				this.img_hasbuy.visible = true;
				this.btn_buy.visible = false;
			} else {
				this.img_hasbuy.visible = false;
				this.btn_buy.visible = true;
			}
		}

		/**
		 * 点击购买
		 */
		private onBuy() {
			if (this.now > App.hero.vip) {
				showToast(LanMgr.getLan(``, 10214, this.now));
			} else {
				var args = {};
				args[Protocol.game_welfare_privilegeGiftPack.args.id] = this.now;
				PLC.request(Protocol.game_welfare_privilegeGiftPack, args, ($data: any, $msg) => {
					if (!$data) return;
					UIUtil.showRewardView($data.commonData, null, false, UI_DEPATH_VALUE.TOP);
					App.hero.welfare.privilegeGiftPack[this.now] = $data.privilegeGiftPack[this.now];
					this.controls();
					this.updateRedPoint();
				});
			}
		}
	}
}