

module common {
    /** 购买战斗次数 */
    export class BuyBattleCountView extends ui.component.BuyBattleCountUI {
        public static TYPE_ARENA:number = 0;//竞技场购买次数
        public static TYPE_BOSS:number = 1;//世界boss购买次数
        public static TYPE_MATCH:number = 2;//匹配赛购买次数
        public static TYPE_GODDOMAIN:number = 3;//激战神域
        public static TYPE_GUILDCOPY:number = 4;//公会副本
        public static TYPE_DAILYCOPY_ONE:number = 5;//每日试炼副本
        public static TYPE_DAILYCOPY_TWO:number = 6;//每日试炼副本
        public static TYPE_DAILYCOPY_THREE:number = 7;//每日试炼副本
        public static TYPE_MINEROB:number = 8;//矿点


        /**购买数量 */
		private _buyNum: number = 1;
		/**最大可购买数量 */
		private _buymaxnum: number = 0;
		/**当前购买总价 */
		private _buysumMoney: number = 0;
        private _type:number = 0;
        private _callback:Function = null;
        private _counterBar : common.CounterBar;
        constructor() {
            super();
        }

        createChildren():void {
			super.createChildren();
			this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.BuyBattleCount, closeOnSide: this.isModelClose ,title:"购买次数" };
			this._counterBar = new common.CounterBar();
			this._counterBar.setComponent(this.btn_add,this.btn_addTen,this.btn_red,this.btn_redTen,this.are_putin);
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
            this.btnYes.off(Laya.Event.CLICK, this, this.buy);
            this.btnNot.off(Laya.Event.CLICK, this, this.close);
		}

		public initView(): void {
            // 原因： 因为EffectList的层级问题，这边要比EffectList的层级高
            this.zOrder = UI_DEPATH_VALUE.TOP + 2;
            this.btnYes.on(Laya.Event.CLICK, this, this.buy);
            this.btnNot.on(Laya.Event.CLICK, this, this.close);

            this._type = this.dataSource.type;
            this._callback = this.dataSource.callback;

			this._buymaxnum = this.getMaxNum();	
            if (this._buymaxnum <= 0){
                if (App.hero.vip >= tb.TB_vip.getMaxVip()) {
					showToast(LanMgr.getLan(``,10360));
				} else {
					showToast(LanMgr.getLan("", 10361));
					dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL), [1]);
				}
                this.close();
                return;
            }
			//购买数量
			this._buyNum = 1;
            this._counterBar.setInitData(this._buyNum,this._buymaxnum,this.setBuySumMoney.bind(this));
			this.setBuySumMoney();
            this.lab_remain.text = LanMgr.getLan("（剩余购买次数：{0}次）", -1, this._buymaxnum);
		}

        /** 购买总价 */
		private setBuySumMoney(): void {
            this._buyNum = this._counterBar.getCurNum();
			//购买数量文本
			this.are_putin.text = this._buyNum.toString();
			//购买总价
			this._buysumMoney = this.getConsume(this._buyNum);
			//购买总价文本
			this.lab_consume.text = "X" + Snums(this._buysumMoney);
            this.lab_content0.text = LanMgr.getLan(this.getContent0(), -1, this._buysumMoney);
            this.lab_content1.text = LanMgr.getLan(this.getContent1(), -1, this._buyNum);
            this.img_gem.x = this.lab_content0.width+5;
            this.lab_content1.x = this.img_gem.x+this.img_gem.width+5;
		}

        private getContent0():string{
            switch(this._type){
                case BuyBattleCountView.TYPE_ARENA:
                    return "确定要花费{0}";
                default:
                    return "是否花费{0}";
            }
        }

        private getContent1():string{
            switch(this._type){
                case BuyBattleCountView.TYPE_GODDOMAIN:
                case BuyBattleCountView.TYPE_ARENA:
                    return "购买{0}次奖励次数";
                default:
                    return "购买{0}次挑战次数";
            }
        }
		
		/** 购买 */
		private buy(): void {
			if (this._buysumMoney > App.hero.diamond) {
				showToast(LanMgr.getLan("", 10005));
				dispatchEvt(new game.TopUpEvent(game.TopUpEvent.SHOW_CHONGZHI_PANEL));
                this.close();
                return;
			}
			if (this._callback){
                this._callback(this._buyNum);
            }
			this.close();
		}

         private getMaxNum():number{
            let viptype:number = 0;
            let limittype:number = 0;
            switch(this._type){
                case BuyBattleCountView.TYPE_ARENA:
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.arenaBuyNum;
                    limittype = iface.tb_prop.limitTypeKey.buyArenaNum;
                    break;
                case BuyBattleCountView.TYPE_BOSS:
                    limittype = iface.tb_prop.limitTypeKey.buyWorldBossNum; 
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.worldBossNum;
                    break;
                case BuyBattleCountView.TYPE_MATCH:
                    limittype = iface.tb_prop.limitTypeKey.buyMatchNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.matchBuyNum;
                    break;
                case BuyBattleCountView.TYPE_GODDOMAIN:
                    limittype = iface.tb_prop.limitTypeKey.buyGodDmRewardNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.godDmRewardNum;
                    break;
                case BuyBattleCountView.TYPE_GUILDCOPY:
                    limittype = iface.tb_prop.limitTypeKey.buyGuildCopyNum;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.guildCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_DAILYCOPY_ONE:
                    limittype = iface.tb_prop.limitTypeKey.buyDailyCopyNum1;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_DAILYCOPY_TWO:
                    limittype = iface.tb_prop.limitTypeKey.buyDailyCopyNum2;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_DAILYCOPY_THREE:
                    limittype = iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
                    viptype = iface.tb_prop.vipPrivilegeTypeKey.dailyCopyBuyNum;
                    break;
                case BuyBattleCountView.TYPE_MINEROB:
                    return tb.TB_island_set.getSet().buy_max - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum);
            }
            let count:number = App.hero.baseAddVipNum(viptype) - App.hero.getlimitValue(limittype);
            return count;
        }

        private getConsume(num:number):number{
            let costAry;
            let count;
            switch(this._type){
                case BuyBattleCountView.TYPE_ARENA:
                    let temp:tb.TB_arena_new_set = tb.TB_arena_new_set.getArenaNewSet();
                    let limitNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyArenaNum);
                    return this.getLeiJI(num, limitNum, temp.buy_cost);
                case BuyBattleCountView.TYPE_BOSS:
                    return tb.TB_boss_set.getSet().buy_cost*num;
                case BuyBattleCountView.TYPE_MATCH:
                    return tb.TB_match_set.getSet().buy_cost*num;
                case BuyBattleCountView.TYPE_GODDOMAIN:
                    let set = tb.TB_fight_goddomain_set.getSet();
                    costAry = set.buy_cost;
                    count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGodDmRewardNum);
                    return this.getLeiJI(num, count, costAry);
                case BuyBattleCountView.TYPE_GUILDCOPY:
                    let guildset = tb.TB_guild_set.getSet();
                    costAry = guildset.buy_cost;
                    count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyGuildCopyNum);
                    return this.getLeiJI(num, count, costAry);
                case BuyBattleCountView.TYPE_DAILYCOPY_ONE:
                case BuyBattleCountView.TYPE_DAILYCOPY_TWO:
                case BuyBattleCountView.TYPE_DAILYCOPY_THREE:
                    let copyset = tb.TB_copy_set.getCopySet();
                    costAry = copyset.daily_copy_cost;
                    let limittype:number = this._type == BuyBattleCountView.TYPE_DAILYCOPY_ONE ? iface.tb_prop.limitTypeKey.buyDailyCopyNum1 : this._type == BuyBattleCountView.TYPE_DAILYCOPY_TWO ? iface.tb_prop.limitTypeKey.buyDailyCopyNum2 : iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
                    count = App.hero.getlimitValue(limittype);
                    return this.getLeiJI(num, count, costAry);
                case BuyBattleCountView.TYPE_MINEROB:
                    let islandset = tb.TB_island_set.getSet();
                    costAry = islandset.buy_cost;
                    count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum);
                    return this.getLeiJI(num, count, costAry);
                    
            }
            return 0;
        }

        private getLeiJI(num:number, index:number, costAry:number[]):number{
            let totalcost:number = 0;
            for (let i:number = 0; i < num; i++){
                if(index+i >= costAry.length){
                    totalcost += costAry[costAry.length-1];
                }else{
                    totalcost += costAry[index+i];
                }
            }
            return totalcost;
        }


    }
}