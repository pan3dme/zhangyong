/**
* name 
*/
module game {
	export class DgUpView extends ui.god.ShengjieUI {
		constructor() {
			super();
			this.isModelClose = false;
			this.group = UIConst.two_group;
			this.list_nowdegree.renderHandler = new Handler(this, this.onRender);
			this.list_nextdegree.renderHandler = new Handler(this, this.onRender);
			this.btn_shengjie.on(Laya.Event.CLICK, this, this.onShengjie);
			this.bgPanel.dataSource = { uiName: UIConst.God_DgUpView, closeOnSide: this.isModelClose,title:LanMgr.getLan("",12354)};
			this.lab_cost.autoSize = true;
			this.lab_have.autoSize = true;
		}

		public popup() {
			super.popup();
			this.refreshData(this.dataSource);
			tl3d.ModuleEventManager.addEvent(ResEvent.PROP_CHANGE, this.setCostText, this);
		}

		private refreshData(data: GodItemVo) {
			this.setCostText();
			let nowAttr = data.jisuanchushi(data.degree);
			let nextAttr = data.jisuanchushi(data.degree + 1);
			let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(this.dataSource.degree);
			let nextevotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(data.degree + 1);
			let degreeNum = data.starLevel < 6 ? data.starLevel : 6;
			let nowAry = new Array;
			let nextAry = new Array;
			for (let i = 0; i < 3; i++) {
				this["lab_now" + (i + 1)].text = Math.floor(nowAttr[i][1]);
				this["lab_next" + (i + 1)].text = Math.floor(nextAttr[i][1]);
			}
			this.lab_nowlv.text = String(evotab.level);
			this.lab_nextlv.text = String(nextevotab.level);
			this.list_nowdegree.repeatX = degreeNum;
			this.list_nextdegree.repeatX = degreeNum;
			for (let i = 0; i < degreeNum; i++) {
				nowAry.push(data.degree);
				nextAry.push(data.degree + 1);
			}
			this.list_nowdegree.dataSource = nowAry;
			this.list_nextdegree.dataSource = nextAry;
		}

		public setCostText(): void {
			let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(this.dataSource.degree);
			let cost = App.hero.bagItemsObj[evotab.cost[0][0]];
			let costWidth : number = this.imgCost.width + 5;
			this.lab_cost.text = cost ? Snums(cost) : "0";
			this.lab_cost.color = cost >= evotab.cost[0][1] ? ColorConst.normalFont : ColorConst.redFont;
			costWidth += this.lab_cost.width;
			this.lab_have.text = " / " + evotab.cost[0][1];
			costWidth += this.lab_have.width;
			let startX = this.width/2 - costWidth/2;
			this.imgCost.x = startX;
			this.lab_cost.x = this.imgCost.x + this.imgCost.width + 5;
			this.lab_have.x = this.lab_cost.x + this.lab_cost.width;
		}

		private onRender(itemRender: Laya.Image, index: number) {
			itemRender.gray = itemRender.dataSource - 1 < index;
		}

		private onShengjie() {
			let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(this.dataSource.degree);
			let cost = App.hero.getBagItemNum(evotab.cost[0][0]);
			if (cost < evotab.cost[0][1]) {
				showToast(LanMgr.getLan(``, Lans.cost, evotab.cost[0][0]))
				return;
			}
			var args = {};
			let uuid = this.dataSource.uuid;
			args[Protocol.game_god_raiseDegree.args.godId] = uuid;
			PLC.request(Protocol.game_god_raiseDegree, args, ($data: any, $msg) => {
				if ($msg && !$data) {//数据异常处理（这个根据每个地方实际情况处理）
					this.close();
					return;
				}
				dispatchEvt(new GodEvent(GodEvent.GOD_SHENGJIE_SUCCESS), uuid);
				for (let key in $data.targetGod)
					dispatchEvt(new GodEvent(GodEvent.SHOW_SHENGJIE_ATTR), uuid);
				this.close();
			});
		}

		public close() {
			super.close();
			tl3d.ModuleEventManager.removeEvent(ResEvent.PROP_CHANGE, this.setCostText, this);
		}
	}
}