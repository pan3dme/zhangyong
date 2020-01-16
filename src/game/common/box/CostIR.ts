/**
* name 
*/
class CostVo {
	/**显示的物品id */
	itemId: number = 0;
	/**需要数量 */
	needNum: number = 0;
	constructor(data: number[]) {
		this.itemId = data[0];
		this.needNum = data[1];
	}
	/**玩家拥有此材料数量 */
	gethasCostNum(): number {
		return App.hero.getBagItemNum(this.itemId);
	}
	/**此物品不够 */
	isNotHaveCost(): boolean {
		return this.gethasCostNum() < this.needNum;
	}
	/**List赋值的时候使用这个方法，方便判断不足 */
	static createCostVos(data: any): CostVo[] {
		if(!isArrayFn(data)) data = map2ary(data);
		return data.map(vo => new CostVo(vo));
	}
}

module common {
	export class CostIR extends ui.box.CostIRUI {
		constructor() {
			super();
		}

		set dataSource(v) {
			this._dataSource = v;
			if (!!v) {
				this.refresh();
				this.resSizeEvent();
			}
		}

		get dataSource(): CostVo {
			return this._dataSource;
		}

		private refresh(): void {
			let costVo = this.dataSource;
			this.lbNeed.text = `/` + Snums(costVo.needNum);
			this.lbHas.text = Snums(costVo.gethasCostNum());
			this.imgCost.skin = SkinUtil.getCostSkin(costVo.itemId);
			this.lbHas.color = costVo.isNotHaveCost() ? ColorConst.redFont : ColorConst.normalFont;
		}

		private resSizeEvent(): void {
			this.imgCost.event(Laya.Event.RESIZE);
			this.lbNeed.event(Laya.Event.RESIZE);
			this.lbHas.event(Laya.Event.RESIZE);
			this.hbox.event(Laya.Event.RESIZE);
		}
	}
}
