module game {
	export class UseView extends ui.bag.UseUI {

		private _counterBar : common.CounterBar;
		private num: number = 1;
		private vo: ItemVo;
		private total: number = 0;	// 总数
		constructor() {
			super();
			this.btn_quxiao.on(Laya.Event.CLICK, this, this.close);
			this.btn_queding.on(Laya.Event.CLICK, this, this.onQueding);
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
            this.bgPanel.dataSource = {uiName:UIConst.Bag_UseView,closeOnSide:this.isModelClose};
			this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btn_add,this.btn_addTen,this.btn_del,this.btn_delTen,this.lab_num);
		}

		public close() {
			super.close("", true);
			this.bgPanel.dataSource = null;
		}

		public popup() {
			super.popup(false, true);
			let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(this.dataSource.id);
			// if (this.dataSource.type == 6) {
			// 	this.lab_type.text = LanMgr.getLan("合成数量：", -1)
			// 	this.bgPanel.updateTitle("合成");
			// } else{
			// 	this.lab_type.text = LanMgr.getLan("使用数量：", -1)
			// 	this.bgPanel.updateTitle("使用");
			// }
			this.img_icon.skin = SkinUtil.getItemIcon(itemtab);
			this.img_quality.skin = SkinUtil.getBoxQulityIcon(itemtab.quality);
			this.lab_name.text = itemtab.name;
			this.lab_count.text = String(this.dataSource.count);
			this.lab_info.text = "(" + itemtab.desc + ")";
			
			this.vo = this.dataSource;
			if (this.dataSource.type == 6) {iface.tb_prop.itemTypeKey.chip
				this.total = Math.floor(this.dataSource.count / itemtab.using_effect[1]);
			}
			else {
				this.total = this.dataSource.count;
			}
			this.num = 1;
			this._counterBar.setInitData(this.num,this.total,this.updateCount.bind(this));
			this.updateCount();
		}
		
		private updateCount():void {
			this.num = this._counterBar.getCurNum();
			this.lab_num.text = this.num.toString();
		}


		/**
		 * 确定使用
		 */
		private onQueding() {
			if (this.dataSource.type_name == LanMgr.getLan("",12509)) {
				if (App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.godMaxNum) <= GodUtils.getGodsNum() + this.num) {
					let alertStr = LanMgr.getLan("", 10226);
					common.AlertBox.showAlert({
						text: alertStr, confirmCb: () => {
							this.close();
							dispatchEvt(new FenjieEvent(FenjieEvent.SHOW_FENJIE_VIEW));
						}
					});
					return;
				}
			}
			let $evt = new BagEvent(BagEvent.USE_MANY_ITEM);
			$evt.data = new Array<any>();
			$evt.data[0] = this.vo;
			$evt.data[1] = this.num;
			dispatchEvt($evt);
		}

	}
}