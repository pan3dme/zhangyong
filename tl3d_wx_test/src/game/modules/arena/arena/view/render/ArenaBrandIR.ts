/**
* name 
*/
module game {
	export class ArenaBrandIR extends ui.arena.arena.render.ArenaBrandIRUI {

		private _dataAry : any[];
		private _index : number;
		constructor() {
			super();
			this.btnbuy.on(Laya.Event.CLICK, this, this.onBuyArenaItem);
		}

		getIndex():number {
			return this._index;
		}

		setVis(val:boolean){
			this.box.visible = val;
		}

		/**设置子节点数据 */
		setChildData(data: any[],index:number): void {
			// this.box.visible = false;
			this._dataAry = data;
			this._index = index;
			let isCanBuy = data[1];
			this.setBuyNodeVisible(isCanBuy)
			let item = tb.TB_arena_draw.getDataById(data[0]);
			this.itemBox.dataSource = new ItemVo(item.item[0],item.item[1])
			if (isCanBuy) {
				this.imgcost.skin = SkinUtil.getCostSkin(item.cost[0]);
				this.lbdiscount.text = LanMgr.getLan("",12169,item.discount);
				this.lbcost.text = item.cost[1] + ``;
			}
			this.setVis(true);
			// Laya.timer.frameOnce(30, this, () => { this.setVis(true) });
		}

		setBuyNodeVisible(visible: boolean): void {
			this.lbdiscount.visible = this.imgdiscount.visible = this.btnbuy.visible = this.lbcost.visible = this.imgcost.visible = visible;
		}

		/**购买物品 */
		private onBuyArenaItem(): void {
			if(!this._dataAry || this._dataAry.length < 2) return;
			let item = tb.TB_arena_draw.getDataById(this._dataAry[0]);
			if(UIUtil.checkNotEnough(item.cost[0],item.cost[1])){
				return;
			}
			dispatchEvt(new ArenaEvent(ArenaEvent.ARENA_BUY_CARDITEM), this._index);
		}
	}
}