

module game {

    export class DailyCopyModel {
        constructor() {

        }
        private static _instance: DailyCopyModel;
        public static getInstance(): DailyCopyModel {
            if (!this._instance) {
                this._instance = new DailyCopyModel();
            }
            return this._instance;
        }

        public static COPY_NAME: any = {};
        private _copyList: DailyCopyInfoVo[];
        initModel(): void {
            this._copyList = [];
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_daily_copy)).data;
            for (let key in tbData) {
                this._copyList.push(new DailyCopyInfoVo(tbData[key]));
            }
            for (let key in iface.tb_prop.dailyCopyTypeKey) {
                let type = Number(key);
                if (!isNaN(type)) {
                    let list = this.getCopyListByType(type);
                    list[0].isFirst = true;
                    list[list.length - 1].isLast = true;
                }
            }

            DailyCopyModel.COPY_NAME[iface.tb_prop.dailyCopyTypeKey.gold] = LanMgr.getLan("",12490);
            DailyCopyModel.COPY_NAME[iface.tb_prop.dailyCopyTypeKey.exp] = LanMgr.getLan("",12491);
            DailyCopyModel.COPY_NAME[iface.tb_prop.dailyCopyTypeKey.chip] = LanMgr.getLan("",12492);
        }

        public getCopyList(): DailyCopyInfoVo[] {
            return this._copyList;
        }

        /** 根据不同的试炼类型获取副本列表 */
        public getCopyListByType(type: number): DailyCopyInfoVo[] {
            let list = this._copyList.filter((vo) => {
                return vo.type == type;
            });
            list = [...list];
            list.forEach((vo)=>{
                vo.sortNum = vo.tbCopy.ID;
                // if(!vo.isLvLimit()){
                //     vo.sortNum = vo.tbCopy.ID * 1000;
                // }
            });
            list.sort((a,b)=>{
                return a.sortNum - b.sortNum;
            });
            return list;
        }

        /**每日副本红点 */
        canRedPoint(type: number): boolean {
            if (!App.IsSysOpen(ModuleConst.DAILY_COPY)) return false;
            if (App.IsSysOpen(ModuleConst.DAILY_COPY)) {
                return App.hero.getOverplusValue(type) > 0;
            } else return false;
        }

        /** 获取副本 */
        public getCopyById(id): DailyCopyInfoVo {
            return this._copyList.find((vo) => {
                return vo.tbCopy.ID == id;
            });
        }
        /** 获取下一个副本 */
        public getNextCopy(curCopy: DailyCopyInfoVo): DailyCopyInfoVo {
            let list = this.getCopyListByType(curCopy.type);
            let curIdx = list.indexOf(curCopy);
            return list[curIdx + 1];
        }
        /** 获取上一个副本 */
        public getPrevCopy(curCopy: DailyCopyInfoVo): DailyCopyInfoVo {
            let list = this.getCopyListByType(curCopy.type);
            let curIdx = list.indexOf(curCopy);
            return list[curIdx - 1];
        }

        /** 获取购买挑战次数花费的钻石数量
         * type : iface.tb_prop.limitTypeKey.buyDailyCopyNum1
         */
        public getBuyCost(type: number): number {
            let set = tb.TB_copy_set.getCopySet();
            let costAry = set.daily_copy_cost;
            let count = App.hero.getlimitValue(type);
            if (count >= costAry.length) {
                return costAry[costAry.length - 1];
            } else {
                return costAry[count];
            }
        }

        /** 是否挑战过 */
        isHasChallenge(type:number):boolean {
            let max = tb.TB_copy_set.getCopySet().daily_copy_num;
            let num = App.hero.getOverplusValue(DailyCopyModel.getInstance().getOverplusType(iface.tb_prop.dailyCopyTypeKey.gold));
            return num < max;
        }

        /** 获取剩余类型：剩余挑战次数类型 */
        getOverplusType(type: number): number {
            if (type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return iface.tb_prop.overplusTypeKey.dailyCopyNum1;
            } else if (type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return iface.tb_prop.overplusTypeKey.dailyCopyNum2;
            }
            return iface.tb_prop.overplusTypeKey.dailyCopyNum3;
        }

        /** 获取限制类型：购买次数类型 */
        getLimitType(type: number): number {
            if (type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum1;
            } else if (type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum2;
            }
            return iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
        }

        /** 获取限制类型：购买次数类型 */
        getBuyBattleType(type: number): number {
            if (type == iface.tb_prop.dailyCopyTypeKey.gold) {
                return common.BuyBattleCountView.TYPE_DAILYCOPY_ONE;
            } else if (type == iface.tb_prop.dailyCopyTypeKey.exp) {
                return common.BuyBattleCountView.TYPE_DAILYCOPY_TWO;
            }
            return common.BuyBattleCountView.TYPE_DAILYCOPY_THREE;
        }

    }

}