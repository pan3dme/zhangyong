/**
* name 
*/
module game{
	export class TowerJiangliView extends ui.tower.JiangliViewUI{
		constructor(){
			super();
			this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("", 12126) };
		}

		public onClosed():void {
			super.onClosed();
			this.liet_item.array = null;
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        private initView():void {
			let arr:JiangliVo[] = TowerModel.getInstance().putongModel.getJiangliList().concat(TowerModel.getInstance().kunnanModel.getJiangliList());
			let sorta:number;
			let sortb:number;
			arr.sort((a,b)=>{
				if (a.isReward()){
					sorta = a.tbTrial.ID*a.tbTrial.type*1000;
				}else{
					sorta = a.tbTrial.ID*a.tbTrial.type;
				}
				if (b.isReward()){
					sortb = b.tbTrial.ID*b.tbTrial.type*1000;
				}else{
					sortb = b.tbTrial.ID*b.tbTrial.type;
				}
				return sorta-sortb;
			})
			this.liet_item.array = arr;
		}
		
	}

}