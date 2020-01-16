/**
* name 
*/
module game {
	export class BagProcessor extends tl3d.Processor {
		constructor() {
			super();
		}

		public getName(): string {
			return "BagProcessor";
		}

		protected listenModuleEvents(): Array<tl3d.BaseEvent> {
			return [
				new BagEvent(BagEvent.SHOW_BAG_PANEL),
				new BagEvent(BagEvent.USE_MANY_ITEM),
				new BagEvent(BagEvent.OPEN_SELL_VIEW),
				new BagEvent(BagEvent.CHANGE_ITEM),
				new BagEvent(BagEvent.STOP_SCROLL),
				new BagEvent(BagEvent.SELECT_RECYCLE_ITEM),
				new BagEvent(BagEvent.FENJIE_EQUIPS),
				new BagEvent(BagEvent.CHANGE_EQUIP_ITEM),
				new GodEvent(GodEvent.ADD_GODS),
				new GodEvent(GodEvent.GOD_CHANGE),
				new GodEvent(GodEvent.GOD_PORP_CHANGE),
				new GemstoneEvent(GemstoneEvent.ADD_GEMTONE),
				new GemstoneEvent(GemstoneEvent.MODIFY_GEMTONE),
			];
		}

		protected receivedModuleEvent($event: tl3d.BaseEvent): void {
			if ($event instanceof BagEvent) {
				switch ($event.type) {
					case BagEvent.SHOW_BAG_PANEL:
						this.show_BagView($event.data);
						break;
					case BagEvent.STOP_SCROLL:
						this.stopScroll();
						break;
					case BagEvent.USE_MANY_ITEM:
						this.useManyItem($event.data);
						break;
					case BagEvent.OPEN_SELL_VIEW:
						this.openSell();
						break;
					case BagEvent.FENJIE_EQUIPS:
						this.fenjie($event.data);
						break;
					case BagEvent.CHANGE_EQUIP_ITEM:
						//装备变化时，刷新item
						this.equChange($event.data);

						break;
					case BagEvent.CHANGE_ITEM:
						if (this.viewHasStage)
							this.changeItemVo($event.data);
						break;
					case BagEvent.SELECT_RECYCLE_ITEM:
						if (this.reCycleHasStage)
							this.reCycleview.changImg();
						break;
				}
			}

			if ($event instanceof GodEvent) {
				switch ($event.type) {
					case GodEvent.ADD_GODS:
					case GodEvent.GOD_CHANGE:
						if(UIMgr.hasStage(UIConst.BagView)){
							let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
							view.refreshGod();
						}
						break;
					case GodEvent.GOD_PORP_CHANGE:
						if(UIMgr.hasStage(UIConst.BagView) && UIMgr.hasStage(UIConst.God_GodCultureView)){
							let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
							view.refreshGod();
						}
						break;
				}
			}
			if($event instanceof GemstoneEvent) {
				switch ($event.type) {
					case GemstoneEvent.ADD_GEMTONE:
					case GemstoneEvent.MODIFY_GEMTONE:
						if(UIMgr.hasStage(UIConst.BagView)){
							let view = UIMgr.getUIByName(UIConst.BagView) as BagView;
							view.materialChange();
						}
						break;
				}
			}
		}

		private equChange(data) {
			if (this.viewHasStage) {
				if (data.type == EQUTYPE.MODIFY) {
					this.bagview.updateItem(data.vo);
				} else {
					this.bagview.equchange();
				}
			}
			if (this.reCycleHasStage) {
				if (data.type == EQUTYPE.DEL) {
					this.reCycleview.equchange();
					this.reCycleview.pingzhi();
					this.reCycleview.changImg();
				}
			}
		}

		private showSummonPanel($data: Array<GodItemVo>) {
			UIMgr.showUI(UIConst.ZH_ResultView, $data);
		}



		private fenjie(recyclelist: Array<EquipItemVo>) {
			if (recyclelist.length > 0) {
				UIMgr.showUI(UIConst.Equip_Recycle, recyclelist);
			} else {
				showToast(LanMgr.getLan("", 11011))
			}
		}



		/**
		 * 打开背包面板
		 */
		private show_BagView(index) {
			if (!this.viewHasStage) {
				EquipModel.getInstance().showEquipByView = EquipType.BAG_VIEW;
				UIMgr.showUI(UIConst.BagView, index);
			}
		}

		private stopScroll(){
			if(this.viewHasStage){
				this.bagview.stopScroll();
			}
		}

		/**
		 * 使用多个道具
		 * @param itemarry 
		 */
		private useManyItem(itemarry) {
			let itemVo = itemarry[0] as ItemVo;
			let num = itemarry[1];
			let chipCount: number = 0;
			if (itemVo.count >= num) {
				var args = {};
				args[Protocol.game_item_useItem.args.itemId] = itemVo.id;
				if (itemVo.type == iface.tb_prop.itemTypeKey.chip) {
					if (Number(itemVo.using[0]) == 1){
						chipCount = num * Number(itemVo.using[1]);
					}
				}
				else{
					chipCount = num;
				}
				args[Protocol.game_item_useItem.args.count] = chipCount
				PLC.request(Protocol.game_item_useItem, args, ($data: any, $msg) => {
					if (!$data) return;
					UIUtil.showRewardView($data.commonData);
					UIMgr.hideUIByName(UIConst.Bag_UseView);
				});
			}
		}

		/**
		 * 道具变化时刷新某个格子
		 * @param data 
		 */
		private changeItemVo(vo:ItemVo) {
			vo.show = false;
			vo.bag = true;
			this.bagview.updateItem(vo);
		}

		/**
		 * 打开批量出售界面
		 */
		private openSell() {
			UIMgr.showUI(UIConst.Bag_RecycleView);
		}

		public get bagview(): BagView {
			return UIMgr.getUIByName(UIConst.BagView);
		}

		public get viewHasStage(): boolean {
			return UIMgr.hasStage(UIConst.BagView);
		}

		public get reCycleview(): RecycleView {
			return UIMgr.getUIByName(UIConst.Bag_RecycleView);
		}

		public get reCycleHasStage(): boolean {
			return UIMgr.hasStage(UIConst.Bag_RecycleView);
		}
	}

}