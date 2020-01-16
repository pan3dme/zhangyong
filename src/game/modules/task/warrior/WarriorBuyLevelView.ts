
module game {

    export class WarriorBuyLevelView extends ui.task.warrior.WarriorBuyLevelUI {

        /**购买数量 */
		private _buyNum: number = 1;
		/**最大可购买数量 */
		private _buymaxnum: number = 0;
		/**当前购买总价 */
		private _buysumMoney: number = 0;
		private _counterBar : common.CounterBar;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
            this.bgPanel.dataSource = {uiName:UIConst.WarriorBuyLevelView,closeOnSide:this.isModelClose,title:LanMgr.getLan("",12137)};
            this.addChild(this.bgPanel.btnClose);
            this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btnAddOne,this.btnAddTen,this.btnDelOne,this.btnDelTen,this.lbLv);
            this.btnBuy.on(Laya.Event.CLICK,this,this.onBuy);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        public onClosed():void {
            super.onClosed();
            this.listReward.array = null;
        }

        public initView():void {
            let model = WarriorProveModel.getInstance();
            this._buymaxnum = model.maxLevel - App.hero.tasks.warriorLevel;	
			this._buyNum = 1;
			this._counterBar.setInitData(this._buyNum,this._buymaxnum,this.setBuyLv.bind(this));
            this.setBuyLv();
        }

        /** 设置购买等级 */
		private setBuyLv(): void {
            let model = WarriorProveModel.getInstance();
            let curCycle = model.curTabCycle;
            if(!curCycle) return;
			this._buyNum = this._counterBar.getCurNum();
            let toLv = App.hero.tasks.warriorLevel + this._buyNum;
			this.lbLv.text = this._buyNum.toString();
			this._buysumMoney = this._buyNum * curCycle.buy_cost;
			//购买总价文本
			this.lbCost.text = "X" + Snums(this._buysumMoney);
            this.lbCost.color = App.hero.diamond >= this._buysumMoney ? ColorConst.normalFont : ColorConst.RED;
            this.lbBuyDesc.text = LanMgr.getLan("",12138,this._buyNum,toLv);
            this.lbDesc.text = LanMgr.getLan("",12139,toLv);

            let rewardDic = {};
            for(let i = App.hero.tasks.warriorLevel+1 ; i <= toLv ; i++) {
                let vo = model.getWarriorVoByLv(i);
                if(!vo) continue;
                let items = vo.tbData.getRewardItems();
                for(let itemVo of items) {
                    if(!rewardDic.hasOwnProperty(itemVo.id)) {
                        rewardDic[itemVo.id] = 0;
                    }
                    rewardDic[itemVo.id] += itemVo.count;
                }
                if(model.isUnlockJinjie()) {
                    let specialItems = vo.tbData.getSpecialItems();
                    for(let itemVo of specialItems) {
                        if(!rewardDic.hasOwnProperty(itemVo.id)) {
                            rewardDic[itemVo.id] = 0;
                        }
                        rewardDic[itemVo.id] += itemVo.count;
                    }
                }
            }
            let itemList : ItemVo[] = [];
            for(let id in rewardDic) {
                itemList.push(new ItemVo(Number(id),rewardDic[id]));
            }
            this.listReward.array = itemList;
            this.boxEmpty.visible = itemList.length == 0;
            this.listReward.width = itemList.length >= 5 ? 480 : (itemList.length*100 + (itemList.length-1)*this.listReward.spaceX);
		}

        private onBuy():void {
            //判断货币是否足够
			if(UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.diamond, this._buysumMoney)) {
				return;
			}
            let args = {};
            args[Protocol.game_task_buyWarriorLevel.args.level] = this._buyNum;
            PLC.request(Protocol.game_task_buyWarriorLevel, args, ($data: any) => {
                if (!$data) return;
                showToast(LanMgr.getLan('', 10455));
                this.close();
            });
        }

    }

}