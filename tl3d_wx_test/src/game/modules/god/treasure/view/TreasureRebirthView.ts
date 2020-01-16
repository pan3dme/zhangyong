/**
* name 
*/
module game{

	export class TreasureRebirthView extends ui.god.treasure.TreasureRebirthUI{

		constructor(){
			super();
		}

		createChildren():void {
			super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:LanMgr.getLan("",12384) };
            this.btnRebirth.on(Laya.Event.CLICK,this,this.onRebirth);
            this.btnRule.on(Laya.Event.CLICK,this,this.onRule);
            this.listTreasure.selectHandler = new Handler(this,this.onSelect);
            this.listTreasure.array = null;
            this.listTreasure.selectedIndex = -1;
            this.lbTitle.visible = true;
		}
		
		public popup(closeOther?: boolean, showEffect?: boolean){
			super.popup(closeOther,showEffect);
			this.initView();
		}

		public onClosed(){
			super.onClosed();
            this.listCost.array = null;
            this.listItem.array = null;
            this.itemBox.dataSource = null;
            this.listTreasure.array = null;
            this.listTreasure.selectedIndex = -1;
            this.lbTitle.visible = true;
		}

		public initView():void{
            let dataAry = [];
            let cost = tb.TB_treasure_set.getSet().recast_cost;
            for(let ary of cost){
                dataAry.push(new CostVo(ary));
            }
            this.listCost.array = dataAry;
            this.listCost.width = dataAry.length * 154 + (dataAry.length - 1) * this.listCost.spaceX;

            let treasures = TreasureModel.getInstance().getRebirthTreasureList();
            this.listTreasure.array = treasures;
            this.boxEmpty.visible = treasures.length == 0;
            this.setTreasureItem(null);
            this.listTreasure.selectedIndex = -1;
		}

        private onSelect(index:number):void {
            if(index == -1) return;
            let vo = this.listTreasure.getItem(index);
            this.setTreasureItem(vo);
        }

        /** 设置圣物 */
        public setTreasureItem(item:TreasureItemVo):void {
            let isExist = item ? true : false;
            this.btnAdd.visible = !isExist;
            this.itemBox.visible = isExist;
            this.itemBox.dataSource = item;

            if(item) {
                let args = {};
                args[Protocol.game_treasure_recastReturnItems.args.treasureKey] = item.uuid;
                PLC.request(Protocol.game_treasure_recastReturnItems, args, ($data: any, $msg) => {
                    if (!$data) {
                        this.listItem.array = null;
                        this.lbTitle.visible = true;
                        return;
                    }
                    let items = [];
                    items.push(new ItemVo(item.templateId,item.num));
                    for(let ary of $data["returnItems"]) {
                        items.push(new ItemVo(ary[0],ary[1]));
                    }
                    this.listItem.array = items;
                    this.listItem.width = items.length > 5 ? 590 : (items.length * 100 + (items.length-1)*this.listItem.spaceX);
                    this.lbTitle.visible = false;
                },true);
            }else{
                this.listItem.array = null;
                this.lbTitle.visible = true;
            }
        }

        
        /** 重生 */
        private onRebirth():void {
            let treasureVo = this.itemBox.dataSource;
            if(!treasureVo) {
                showToast(LanMgr.getLan("", 10367));
                return;
            }
            dispatchEvt(new TreasureEvent(TreasureEvent.TREASURE_OPERATION), [TreasureOperation.rebirth, [treasureVo]]);
        }

        private onRule():void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20018));
        }
	}
}