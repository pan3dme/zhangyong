/**
* name 
*/
module game {
	export class TosignIR extends ui.activity.huodong.welfare.render.toSignIRUI {
		constructor() {
			super();
		}

		public set dataSource(value) {
			this._dataSource = value;
			this.refresh();
		}

		public get dataSource() {
			return this._dataSource;
		}

		private refresh(): void {
			if (this.dataSource) {
				this.itemList.array = this.dataSource;
				let index = this.parent.getChildIndex(this);
				let vo = HuodongModel.getInstance().getSignTb();
				this.lbLv.text = HuodongModel.getRewardsInfo(index,vo.tb.vip_level);
				if (vo.canReward(index)){
 					this.btnSure.label = `领取`;
					this.btnSure.labelStrokeColor = ColorConst.GREEN_FILTER;
					this.btnSure.skin =SkinUtil.buttonGreen;
					this.img_receive.visible = false;
					this.btnSure.visible = true;
				}
				else if (vo.isReward(index)){
					this.img_receive.visible = true;
					this.btnSure.visible = false;
				}else{
					this.img_receive.visible = false;
					this.btnSure.visible = true;
					this.btnSure.skin =SkinUtil.buttonNormal;
					this.btnSure.labelStrokeColor = ColorConst.ORANGE_FILTER;
					this.btnSure.label =  `未达成`;
				} 
				this.btnSure.gray = this.btnSure.selected = !vo.canReward(index);
				this.btnSure.on(Laya.Event.CLICK, this, this.sure, [index + 1]);
			} else {
				this.btnSure.off(Laya.Event.CLICK, this, this.sure);
				this.lbLv.text = ``;
				this.itemList.array = null;
			}
		}

		private sure(type: number): void {
			let vo = HuodongModel.getInstance().getSignTb();
			if(!vo.canReward(type - 1)) {
				showToast(vo.isReward(type - 1) ? LanMgr.getLan('', 10220):HuodongModel.getRewardsInfo(type - 1,vo.tb.vip_level));
				return;
			}
			let args = {};
			args[Protocol.game_welfare_everyDaySignIn.args.id] = vo.tb.ID;
			args[Protocol.game_welfare_everyDaySignIn.args.type] = type;
			PLC.request(Protocol.game_welfare_everyDaySignIn, args, ($data: any, msg: any) => {
				if (!$data) return;
				UIUtil.showRewardView($data.commonData);
				this.img_receive.visible = true;
				this.btnSure.visible = false;
				let uipanel:WelfareView = UIMgr.getUIByName(UIConst.WelfareView);
				if(uipanel) uipanel.list_btn.refresh();
			})
		}
	}
}