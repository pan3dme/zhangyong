/**
* name 
*/
module game {
	export class DetailIR extends ui.bag.DetailsUI {
		constructor() {
			super();
			this.btn_shiyong.on(Laya.Event.CLICK, this, this.onUseone);
			this.btn_quanbushiyong.on(Laya.Event.CLICK, this, this.onUseall);
			this.btn_qianwangshiyong.on(Laya.Event.CLICK, this, this.onGotouse);
			this.btn_hecheng.on(Laya.Event.CLICK, this, this.onHecheng);
			this.btn_quanbuhecheng.on(Laya.Event.CLICK, this, this.onHechengAll);
			this.btn_equipRefine.on(Laya.Event.CLICK, this, this.equipRefine);
			this.btn_equipStrength.on(Laya.Event.CLICK, this, this.equipStrength);
			this.lab_info.mouseEnabled = true;
			this.lab_info.mouseThrough = false;
			this.lab_info.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.btn_equipWear.off(Laya.Event.CLICK, this, this.equipWear);
			this.closeTime();
			if (this._dataSource instanceof EquipItemVo) this.refreshEquip(this._dataSource);
			else this.refreshItem();

		}

		public get dataSource() {
			return this._dataSource;
		}

		private vo: any;
		/**
		 * 刷新背包数据
		 */
		private refreshItem() {
			if (this._dataSource) {
				this.box_item.visible = true;
				this.box_equip.visible = false;
				let $data = this._dataSource;//$data: ItemVo | FuwenItemVo
				if ($data instanceof ItemVo) {
					let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById($data.id);
					this.lab_itemname.text = itemtab.name;
					this.lab_info.text = String(itemtab.desc);
					this.lab_get.text = itemtab.way;

					this.btn_shiyong.visible = $data.type == iface.tb_prop.itemTypeKey.gift || $data.type == iface.tb_prop.itemTypeKey.timeItem || $data.type == iface.tb_prop.itemTypeKey.optionalCard;
					this.btn_quanbushiyong.visible = $data.type == iface.tb_prop.itemTypeKey.gift;
					this.btn_qianwangshiyong.visible = !($data.type == iface.tb_prop.itemTypeKey.gift || $data.type == iface.tb_prop.itemTypeKey.chip || $data.type == iface.tb_prop.itemTypeKey.timeItem || $data.type == iface.tb_prop.itemTypeKey.optionalCard);
					this.btn_hecheng.visible = $data.type == iface.tb_prop.itemTypeKey.chip;
					this.btn_quanbuhecheng.visible = $data.type == iface.tb_prop.itemTypeKey.chip;

					this.lab_time.visible = $data.type == iface.tb_prop.itemTypeKey.timeItem;

					if (this.lab_time.visible) {
						let time = $data["limitTime"];
						if (time > App.getServerTime()) {
							this.startTime();
						} else {
							this.lab_time.text = "";
						}

					}
					this.vo = $data;
				}
			}
		}

		private prevY: number;
		/* 开始滚动文本 */
		private startScrollText(e: Laya.Event): void {
			this.prevY = this.lab_info.mouseY;
			dispatchEvt(new BagEvent(BagEvent.STOP_SCROLL));
			this.lab_info.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
		}
		/* 停止滚动文本 */
		private finishScrollText(e: Laya.Event): void {
			this.lab_info.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
			Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
		}

		private scrollText(e: Event): void {
			dispatchEvt(new BagEvent(BagEvent.STOP_SCROLL));
			var nowY: number = this.lab_info.mouseY;
			this.lab_info.textField.scrollY += this.prevY - nowY;
			this.prevY = nowY;
		}

		private closeTime() {
			Laya.timer.clear(this, this.updateTime);
			this.lab_time.text = "";
		}

		private startTime() {
			this.updateTime();
			Laya.timer.loop(1000, this, this.updateTime);
		}

		private updateTime() {
			// logyhj("计时器运行");
			let tagtime = this._dataSource["limitTime"];
			if (tagtime > App.getServerTime()) {
				this.lab_time.text = LanMgr.getLan("",12511) + GameUtil.toCountdown((tagtime - App.getServerTime()), "hh:mm:ss");
			} else {
				this.closeTime();
			}
		}


		/**
		 * 单个和多个使用
		 */
		private onUseone() {
			if (this.vo.type == iface.tb_prop.itemTypeKey.optionalCard){
				//自选包
				UIMgr.showUI(UIConst.RewardSelectView, this.vo);
			}else if (this.vo.count == 1) {
				//倒计时存在
				if(this.lab_time.visible && this.lab_time.text.length > 0){
					let tagtime = this._dataSource["limitTime"];
					showToast(LanMgr.getLan(``,10247,activityTime(tagtime, App.getServerTime())));
					return;
				}
				let args = {};
				if (this.vo.type == iface.tb_prop.itemTypeKey.timeItem) {
					args[Protocol.game_item_useTimeItem.args.timeKey] = this.vo.uuid;
					PLC.request(Protocol.game_item_useTimeItem, args, ($data: any, $msg) => {
						if (!$data) return;
						UIUtil.showRewardView($data.commonData);
						dispatchEvt(new BagEvent(BagEvent.USE_ITEM_SUCCESS));
					});
				} else {
					args[Protocol.game_item_useItem.args.itemId] = this.vo.id;
					args[Protocol.game_item_useItem.args.count] = 1;
					PLC.request(Protocol.game_item_useItem, args, ($data: any, $msg) => {
						if (!$data) return;
						UIUtil.showRewardView($data.commonData);
						// this.vo.count--;
						dispatchEvt(new BagEvent(BagEvent.USE_ITEM_SUCCESS));
					});
				}
			} else {
				UIMgr.showUI(UIConst.Bag_UseView, this.vo);
			}
		}

		/**
		 * 使用全部
		 */
		private onUseall() {
			if (this.vo.count) {
				var args = {};
				args[Protocol.game_item_useItem.args.itemId] = this.vo.id;
				args[Protocol.game_item_useItem.args.count] = this.vo.count;
				PLC.request(Protocol.game_item_useItem, args, ($data: any, $msg) => {
					if (!$data) return;
					UIUtil.showRewardView($data.commonData);
					dispatchEvt(new BagEvent(BagEvent.USE_ITEM_SUCCESS));
				});
			}
		}

		/**
		 * 前往使用
		 */
		private onGotouse() {
			let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(this.vo.id);
			dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW, itemtab.link));
			UIMgr.hideUIByName(UIConst.ItemDetailView);
		}

		private onHecheng() {
			let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(this.vo.id);
			if (this.vo.count < itemtab.using_effect[1] * 2) {
				let hasNum = Math.floor(this.vo.count / itemtab.using_effect[1]);
				//不能合成一个
				if (hasNum < 1) {
					showToast(LanMgr.getLan('', 10248));
					return;
				}
				if (itemtab.type == iface.tb_prop.itemTypeKey.chip && itemtab.defined[0] == 2 && App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= GodUtils.getGodsNum() + 1) {
					let alertStr = LanMgr.getLan("", 10226);
					common.AlertBox.showAlert({
						text: alertStr, confirmCb: () => {
							dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
						}
					});
					return;
				}
				var args = {};
				args[Protocol.game_item_useItem.args.itemId] = this.vo.id;
				args[Protocol.game_item_useItem.args.count] = itemtab.using_effect[1];
				PLC.request(Protocol.game_item_useItem, args, ($data: any, $msg) => {
					if (!$data) return;
					UIUtil.showRewardView($data.commonData);
					// let $evt = new BagEvent(BagEvent.REFRESH_ITEM_VIEW);
					// dispatchEvent($evt);
					// this.vo.count -= itemtab.using_effect[1];
					dispatchEvt(new BagEvent(BagEvent.USE_ITEM_SUCCESS));
				});
			} else {
				UIMgr.showUI(UIConst.Bag_UseView, this.vo);
			}
		}

		/**
		 * 合成全部
		 */
		private onHechengAll() {
			let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(this.vo.id);
			if (this.vo.count > 0) {
				let hasNum = Math.floor(this.vo.count / itemtab.using_effect[1]);
				//不能合成一个
				if (hasNum < 1) {
					showToast(LanMgr.getLan('', 10248));
					return;
				}
				let count: number = hasNum * itemtab.using_effect[1];
				if (itemtab.defined[0] == 2) {
					let costnum = App.hero.getGodsNum() + hasNum;
					let num = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum);
					if (num <= costnum) {
						let alertStr = LanMgr.getLan("", 10226);
						common.AlertBox.showAlert({
							text: alertStr, confirmCb: () => {
								dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
							}
						});
						return;
					}
				} else if (itemtab.defined[0] == 1) {
					let costnum = App.hero.getEqusNum() + hasNum;
					let num = tb.TB_game_set.get_TB_game_setById(1).limit_equip;
					if (num <= costnum) {
						showToast(LanMgr.getLan("", 11014));
						return;
					}
				} 
				var args = {};
				args[Protocol.game_item_useItem.args.itemId] = this.vo.id;
				args[Protocol.game_item_useItem.args.count] = count;
				PLC.request(Protocol.game_item_useItem, args, ($data: any, $msg) => {
					if (!$data) return;
					UIUtil.showRewardView($data.commonData);
					dispatchEvt(new BagEvent(BagEvent.USE_ITEM_SUCCESS));
				});
			}
		}

		/**
		 * 刷新数量
		 * @param num 
		 */
		public refresh(num: number) {
			this.vo.count -= num;
		}

		/** 装备 */
		private refreshEquip(data: EquipItemVo) {
			this.box_item.visible = false;
			this.box_equip.visible = true;
			let curType = this.getEquipTyoe(data);
			this.lab_equipName.text = data.tab_item.name;
			this.lab_equipName.event(Laya.Event.RESIZE);
			this.lab_godName.text = data.getWearGodName();
			this.lab_symbol.visible = data.getStrengthLv() != 0;
			this.lab_strengthLv.visible = data.getStrengthLv() != 0;
			this.lab_refineLv.text = data.getRefineLevel().toString();
			this.list_proprety.dataSource = data.getAttributeByValue(1,0);
			this.lab_strengthLv.text = data.getStrengthLv().toString();
			this.btn_equipWear.on(Laya.Event.CLICK, this, this.equipWear, [curType]);
			let arrOpertionName = EquipModel.getInstance().arrOpertionName;
			this.btn_equipWear.label = arrOpertionName[curType];
			this.btn_equipRefine.selected = this.btn_equipRefine.gray = !App.IsSysOpen(ModuleConst.EQUIP_JINGLIAN);
			this.btn_equipStrength.selected = this.btn_equipStrength.gray = !App.IsSysOpen(ModuleConst.EQUIP_STRENGTH);
			this.btn_equipStrength.visible = this.btn_equipRefine.visible = false;
		}

		/**装备精炼 */
		private equipRefine(): void {
			dispatchEvt(new EquipEvent(EquipEvent.SHOW_EQUIPREFINE_PANEL), this._dataSource);
		}

		/**装备强化 */
		private equipStrength(): void {
			dispatchEvt(new EquipEvent(EquipEvent.SHOW_EQUIP_STH_PANEL), this._dataSource);
		}

		/**装备穿戴/更换/卸下 */
		private equipWear(type: number): void {
			dispatchEvt(new EquipEvent(EquipEvent.EQUIP_OPERATION), [this._dataSource, type]);
		}

		/**装备第三个按钮状态 */
		private getEquipTyoe(data: EquipItemVo): number {
			let model = EquipModel.getInstance();
			let equipType = model.showEquipByView;
			this.btn_equipWear.visible = true;
			if (equipType == EquipType.BAG_VIEW) {
				if (!data.isExsitGod()) return 0;
				else this.btn_equipWear.visible = false;
			} else if (equipType == EquipType.EQUIP_VIEW) {
				let pointEquipData = model.curPointEquipData;
				if (data.uuid == pointEquipData.uuid) {
					if (data.godId) return 3
					else return 2
				}
				else {
					if (data.godId) return 1
					else {
						if (pointEquipData.godId) return 1
						return 2
					}
				}
			} else if (equipType == EquipType.SHENLING_VIEW || equipType == EquipType.SHENLING_BAOSHI_VIEW) {
				if (data.getGodName()) return 1;
				else return 2;
			}
		}

	}
}