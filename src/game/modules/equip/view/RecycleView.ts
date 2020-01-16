/**
* name 
*/
module game {
	export class EquipRecycleView extends ui.equip.EquipRecycleUI {
		constructor() {
			super();
			this.isModelClose = true;
			this.btn_close.on(Laya.Event.CLICK, this, this.close);
			this.btn_recycle.on(Laya.Event.CLICK, this, this.recycle);
		}

		public popup() {
			super.popup();
			this.lab_info.text = LanMgr.getLan("",12592,this.dataSource.length);
			this.bgPanel.dataSource = {uiName:UIConst.Equip_Recycle,closeOnSide:this.isModelClose,closeOnButton:false, title:LanMgr.getLan("",12591)};
			let ary = EquipModel.getInstance().countReturnItem(this.dataSource);
			this.list_item.spaceX = ary.length >= 6 ? 6 : 15;
			this.list_item.array = ary;
			this.list_item.width = ary.length >= 6 ? 525 : (ary.length * 90 + (ary.length - 1) * this.list_item.spaceX);
		}

		private recycle() {
			let keyArry = new Array;
			for (let i = 0; i < this.dataSource.length; i++) {
				keyArry.push(Number(this.dataSource[i].uuid));
			}
			let args = {};
			args[Protocol.game_equip_recycle.args.equipKeys] = keyArry;
			PLC.request(Protocol.game_equip_recycle, args, ($data: any, msg: any) => {
				if(!$data) return;
				UIUtil.showRewardView($data.commonData);
				UIMgr.hideUIByName(UIConst.EquipChangeView);
                this.close();
			});
		}

		public close() {
			super.close();
			this.bgPanel.dataSource = null;
			this.list_item.array = null;
		}
	}
}