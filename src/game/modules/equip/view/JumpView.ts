/**
* name 
*/
module game {
	export class JumpView extends ui.equip.JumpViewUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.bgPanel.addChildAt(this.bg, 3);
		}

		public popup() {
			super.popup();
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12439) };
			let data = this.dataSource;
			if(Array.isArray(this.dataSource)){
				this.refreshByAry(data);
			}else{
				this.refreshData(data);
			}
		}

		private refreshData(id: number):void {
			this.icon.visible = this.lab_name.visible = this.lab_num.visible = true;
			this.bg.y = 193;
			this.list_where.y = 211;
			let itemtab: tb.TB_item = tb.TB_item.get_TB_itemById(id);
			this.list_where.dataSource = itemtab.way_link;
			let vo: ItemVo = new ItemVo(id, 0, 0);
			this.icon.dataSource = vo;
			this.lab_name.text = itemtab.name;
			this.lab_num.text = LanMgr.getLan("", 12440, App.hero.getBagItemNum(id));
		}

		private refreshByAry(ary:Array<Array<number>>):void {
			this.bg.y = 123;
			this.list_where.y = 131;
			this.icon.dataSource = null;
			this.icon.visible = this.lab_name.visible = this.lab_num.visible = false;
			this.list_where.dataSource = ary;
		}

		public close() {
			super.close();
			this.bgPanel.dataSource = null;
		}
	}

	export class GetItemRender extends ui.god.render.GetItemBoxUI {
		constructor() {
			super();
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshData();
		}

		public get dataSource() {
			return this._dataSource;
		}

		public refreshData() {
			if (this._dataSource) {
				let sysopen: tb.TB_sys_open = tb.TB_sys_open.get_TB_sys_openById(this._dataSource[0]);
				this.lab_name.text = sysopen.name;
				this.btn_goto.on(Laya.Event.CLICK, this, this.gotoView, [sysopen.ID]);
				this.img_di.on(Laya.Event.CLICK, this, this.gotoView, [sysopen.ID]);
			} else {
				this.lab_name.text = ``;
				this.btn_goto.off(Laya.Event.CLICK, this, this.gotoView);
				this.img_di.off(Laya.Event.CLICK, this, this.gotoView);
			}
		}

		private gotoView(funId) {
			if (this.isBtnFunctiNotonOpen(funId)) return;
			if (funId == ModuleConst.SHOP) {
				let uiPanel = UIMgr.getUIByName(UIConst.Equip_JumpView);
				if (uiPanel) {
					let good = tb.TB_goods.get_TB_goods().find(vo => vo.item_id[0] == uiPanel.dataSource);
					if (good) {
						let model = ShopModel.getInstance();
						model.requestShopList(good.type)
						.then(()=>{
							let data = { item: good, arrlimit: model.getLimitNumById(good.type, good.ID) }
							dispatchEvt(new ShopEvent(ShopEvent.SHOW_GOUMAI_PANEL), data);
						});					
					}
				}
			} else {
				dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW), [funId]);
			}
			dispatchEvt(new EquipEvent(EquipEvent.CLOSE_JUMP_VIEW));
		}

		/**判断是否开启 */
		private isBtnFunctiNotonOpen(fundId: number): boolean {
			let tbData = tb.TB_sys_open.get_TB_sys_openById(fundId);
			if (tbData && !App.IsSysOpen(fundId)) {
				showToast(tbData.prompt);
				return true
			}
			return false;
		}
	}
}