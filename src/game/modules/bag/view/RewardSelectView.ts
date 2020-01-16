module game {
	export class RewardSelectView extends ui.bag.RewardSelectUI {
		private num: number = 1;
		private vo: ItemVo;
		private count: number = 0;

		private _counterBar : common.CounterBar;
		constructor() {
			super();
		}

		createChildren():void {
			super.createChildren();
			this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.RewardSelectView, closeOnSide: this.isModelClose ,title:LanMgr.getLan("",12510) };
			this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btn_add,this.btn_add_ten,this.btn_del,this.btn_del_ten,this.lab_num);
		}

		public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public close(type?: string, showEffect?: boolean, sound = true): void {			
			super.close();
			this.btn_queding.off(Laya.Event.CLICK, this, this.onclick);

			this._itemVo = null;
			this._tbOptional = null;
		}

		private _itemVo:ItemVo;
		private _tbOptional:tb.TB_optional;
		private _selectIdx:number = -1;
		private initView(): void {
			//创建监听
			this.btn_queding.on(Laya.Event.CLICK, this, this.onclick);
			this.list_reward.renderHandler = new Handler(this,this.onItemRender);
			
			this._itemVo = this.dataSource;
			if (!this._itemVo){
				this.close();
				return;
			}
			this._curNum = 1;
			this._selectIdx = -1;
			this._tbOptional = tb.TB_optional.get_TB_ById(this._itemVo.using[1]);

			this.list_reward.array = ary2prop(this._tbOptional.option);
			this.list_reward.repeatX = this.list_reward.array.length > 5 ? 5 :this.list_reward.array.length;
			if (this.list_reward.repeatX == 2){
				this.list_reward.spaceX = 100;
			}else if (this.list_reward.repeatX == 3){
				this.list_reward.spaceX = 40;
			}else{
				this.list_reward.spaceX = 5;
			}
			this.list_reward.width = this.list_reward.repeatX > 4 ? 640 : (this.list_reward.repeatX * (149 + this.list_reward.spaceX) - this.list_reward.spaceX);
			this.list_reward.x = (this.width - this.list_reward.width)/2;
			
			this.onChkItem(this._selectIdx);
			this._maxNum = this._itemVo.getNum();
			this._counterBar.setInitData(this._curNum,this._maxNum,this.updateRewardNum.bind(this));
			this.updateRewardNum();
		}

		//数量
		private _curNum:number = 1;
		private _maxNum:number = 1;
		private updateRewardNum():void{
			this._curNum = this._counterBar.getCurNum();
			this.lab_num.text = this._curNum.toFixed(0);
		}

		private onclick(e:Laya.Event):void{
			switch(e.currentTarget){
				case this.btn_queding://确定
					if (this._curNum < 1) return;
					if (this._selectIdx == -1){
						showToast(LanMgr.getLan(``,10249));
						return;
					}

					let args = {};
					args[Protocol.game_item_useItem.args.itemId] = this._itemVo.id;
					args[Protocol.game_item_useItem.args.count] = this._curNum;
					args[Protocol.game_item_useItem.args.optionId] = this._selectIdx;
					PLC.request(Protocol.game_item_useItem, args, ($data: any, $msg) => {
						if (!$data) return;
						UIUtil.showRewardView($data.commonData);
						dispatchEvt(new BagEvent(BagEvent.USE_ITEM_SUCCESS));
						UIMgr.hideUIByName(UIConst.RewardSelectView);
					});
					break;
			}
		}

		private onItemRender(cell:ui.bag.RewardSelectIRUI, index:number):void{
			if (!cell) return;
			cell.img_chk.on(Laya.Event.CLICK, this, this.onChkItem, [index]);
			let itemvo:ItemVo = cell.dataSource;
			let temp:tb.TB_item = tb.TB_item.get_TB_itemById(itemvo.id);
			cell.ui_item.dataSource = itemvo;
			cell.lab_name.text = itemvo.getName();
			cell.lab_name.color = ItemVo.ITEM_QUALITY_COLORS[temp.quality];
		}

		private onChkItem(index:number):void{
			if (this._selectIdx == index){
				this._selectIdx = -1;
			}else{
				this._selectIdx = index;
			}

			for (let i:number = 0; i < this.list_reward.cells.length; i++){
				let cell:ui.bag.RewardSelectIRUI = this.list_reward.cells[i];
				cell.img_chk.selected = i==this._selectIdx;
			}
		}

	}
}