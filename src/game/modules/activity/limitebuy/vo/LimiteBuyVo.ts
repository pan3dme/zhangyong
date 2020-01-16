
module game {

    //-----------------------------------------------------限时召唤
    export class limiteSummonVo {
        //时间表的type
        public type: number;
        public tbSummonRank: tb.TB_summon_rank[];
        public tbSummonBox: tb.TB_summon_box[];
        public tbSummonTime: tb.TB_limit_time;
        private _model:LimiteBuyModel;
        constructor(tbSummonTime: tb.TB_limit_time, tbSummonRank: tb.TB_summon_rank[], tbSummonBox: tb.TB_summon_box[]) {
            this.type = tbSummonTime.type;
            this.tbSummonTime = tbSummonTime;
            this.tbSummonBox = tbSummonBox.sort((a,b) => {
                return a.score - b.score;
            });
            this.tbSummonRank = tbSummonRank.sort((a,b) => {
                return a.score - b.score;
            });

            this._model = LimiteBuyModel.getInstance();
        }

        /** 获取到免费次数 */
        getFreeCount(): number {
            return this.tbSummonTime.free_num;
        }

        /** 获取购买消耗 */
        getBuyCost(): Array<number> {
            return this.tbSummonTime.buy_cost;
        }

        /** 获取模型id */
        getModelID(): number {
            return this.tbSummonTime.model_show;
        }

        /** 获取到当前排名所需积分 */
        getRankScoreByRank(rank: number) : number {
            for(let obj of this.tbSummonRank) {
                if(obj.rank[0] <= rank && obj.rank[1] >= rank) return obj.score;
            }
            return 0;
        }

        /** 是否在活动时间内 */
        isinTime(): boolean {
            if(this.type == 0) {
                return true;
            } else if (this.type == 1) {
                let endDate = new Date(this.tbSummonTime.time[1]);
                let endSecond = endDate.getTime()/1000;
                if(endSecond > App.serverTimeSecond) return true;
            } else if (this.type == 2) {
                if((Number(this.tbSummonTime.time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime()) > App.serverTimeSecond) return true;
            }
            return false;
        }

        /** 获取剩余时间 */
        getRemainTime(): string {
            if(this.isinTime()) {
                return "剩余时间：" + this._model.getSummonRemainTime(this.tbSummonTime.ID);
            } else {
                return "活动已结束";
            }            
        }
    }
    //--------------------------------------------------------限时团购
    export class limiteGroupVo {
        //活动表type 时间表id
        public type: number;
        public tbGroup: tb.TB_group_buying;      
        private _model:LimiteBuyModel;  
        constructor(tbGroupBuying: tb.TB_group_buying) {
            this.tbGroup = tbGroupBuying;
            this.type = tbGroupBuying.type;

            this._model = LimiteBuyModel.getInstance();
        }

        //是否在时间内
        isinTime(): boolean {
            let tbTime = tb.TB_group_buying_time.TB_group_buying_timeById(this.type);
            if(tbTime.type == 0) {
                return true; 
            } else if (tbTime.type == 1) {
                let endDate = new Date(tbTime.time[1]);
                let endSecond = endDate.getTime() / 1000;
                if(endSecond > App.serverTimeSecond) return true;
            } else if (tbTime.type == 2) {
                if(Number(tbTime.time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime() > App.serverTimeSecond) return true;
            }
            return false;
        }

        /** 返回剩余时间 */
        getRemainTime(): string {
            if(this.isinTime&&this.tbGroup) {
                return "剩余时间：" + this._model.getGroupRemainTime(this.tbGroup.type);
            } else {
                return "活动已结束";
            }            
        }

        /** 返回折扣区间 */
        getZheKouCount(): number {
            let num = this._model.getgrpBuyTotalNums(this.tbGroup.ID);
            if (num > 0) {
                if (num < this.tbGroup.total_buy_num[0]) {
                    return 0;
                } else if (num >= this.tbGroup.total_buy_num[0] && num < this.tbGroup.total_buy_num[1]) {
                    return 1;
                } else if (num >= this.tbGroup.total_buy_num[1] && num < this.tbGroup.total_buy_num[2]) {
                    return 2;
                } else if (num >= this.tbGroup.total_buy_num[2] && num < this.tbGroup.total_buy_num[3]) {
                    return 3;
                } else if (num >= this.tbGroup.total_buy_num[3]) {
                    return 4;
                }
            } else {
                return 0;
            }
        }

        /** 返回团购数组 [价格，折扣]*/
        getCurZheKouList(): Array<number> {
            return [this.tbGroup.price[this.getZheKouCount()], this.tbGroup.discount_show[this.getZheKouCount()]];
        }

        /** 获取折扣数组 */
        getZheKouList(): Array<Array<number>> {
            let arr: Array<Array<number>> = [];
            let tb = this.tbGroup;
            arr.push([tb.discount_show[0], 0]);
            for(let i = 1; i < tb.discount_show.length; i++) {
                arr.push([tb.discount_show[i], tb.total_buy_num[i - 1]]);
            }
            return arr;
        }

        /** 获取该物品全服已购买次数 */
        getAllBuyNum(): number {
            return this._model.getgrpBuyTotalNums(this.tbGroup.ID);
        }

        /** 获取玩家已购买次数 */
        getBuyNum(): number {
            return this._model.getgrpBuyTodayNums(this.tbGroup.ID);
        }

        /** 玩家获取剩余可购买次数 */
        getRemainNum(): number {
            let buyNum: number = this._model.getgrpBuyTodayNums(this.tbGroup.ID);
            return this.tbGroup.buy_num - buyNum;
        }
    }

}