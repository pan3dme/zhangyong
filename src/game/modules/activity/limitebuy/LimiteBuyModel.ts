
module game {

    export enum LimiteBuyType {
        summon = 1,     // 限时召唤
        group = 2       // 限时团购
    }

    export class LimiteBuyModel {
        
        constructor() {}
        private static _instance: LimiteBuyModel;
        public static getInstance(): LimiteBuyModel {
            if(!this._instance) {
                this._instance = new LimiteBuyModel();
            }
            return this._instance;
        }
        //限时召唤登录红点
        public Lim_Summon_Rp: boolean;
        //限时团购登录红点
        public Lim_Group_Rp: boolean;
        //限时召唤type
        public type: number;
        //限时团购type
        public CurGroupType: Array<number>;
        //限时团购
        public grpBuyTodayNums = null;    // 限时团购当天购买次数 {tpltId: num}
        public grpBuyTotalNums = null;    // 限时团购全服总购买次数 {tpltId: num}

        getgrpBuyTodayNums(id){
            return this.grpBuyTodayNums[id] || 0
        }

        getgrpBuyTotalNums(id){
            return this.grpBuyTotalNums[id] || 0
        }

        initModel(): void {
            this.type = this.getCurSummonType();
            this.CurGroupType = this.getCurGroupType();
            this.Lim_Group_Rp = this.isOpenLimiteGroup()?true:false;
            this.Lim_Summon_Rp = this.isOpenLimiteSummon()?true:false;
            dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.UPDATE_RP));
        }
        /** 限时热购是否有活动开启 */
        isOpen(): boolean {
            return this.isOpenLimiteGroup() || this.isOpenLimiteSummon();
        }
        /** 主红点规则 */
        isVisible(): boolean {
            return this.isOpen() && (this.Lim_Group_Rp || this.Lim_Summon_Rp || this.haveBoxReward() || this.haveFreeTimes());
        }
        //-------------------------------------------------------------------------------------------限时召唤
        /** 限时召唤是否开启 */
        isOpenLimiteSummon(): boolean {
            return this.getCurSummonType() != null;
        }
        //首先获得当前进行的限时召唤时间表的id数组
        getCurSummonType(): number {
            let arr: Array<number> = [];
            let tbSummonTime: tb.TB_limit_time[] = tb.TB_limit_time.get_TB_limit_time();
            let curTime = App.getServerTime();
            let opensTime = App.getOpenServerTime();
            for(let obj of tbSummonTime) {
                if (obj.type == 0) {
                    arr.push(obj.ID);
                    continue;
                } else if (obj.type == 1) {
                    let startDate = new Date(obj.time[0]);
                    let startSecond = startDate.getTime();
                    let endDate = new Date(obj.time[1]);
                    let endSecond = endDate.getTime();
                    if(startSecond < App.serverTime && endSecond > App.serverTime) {
                        arr.push(obj.ID);
                        continue;
                    }
                } else if (obj.type == 2) {
                    let startDate = Number(obj.time[0]) - 1;
                    let endDate = Number(obj.time[1]);
                    if((curTime < (opensTime + endDate * TimeConst.ONE_DAY_SEC)) 
                    && (curTime >= (opensTime + startDate * TimeConst.ONE_DAY_SEC))) {
                        arr.push(obj.ID);
                        continue;
                    }
                }
            }
            return arr[0];
        }

        /** 限时召唤时间表 */
        getCurSummonSetList(): tb.TB_limit_time {
            if(!this.type) this.type = this.getCurSummonType();
            let tbdata=tb.TB_limit_time.get_TB_limit_timeById(this.type);
            //todo ios兼容临时处理，这里ios解析对象会为空
            if(!tbdata){
                tbdata=new tb.TB_limit_time();
                tbdata.ID=0;
                tbdata.type=0;
                tbdata.time=new Array<string>();
                tbdata.free_num=0;
                tbdata.buy_cost=new Array<number>();    
                tbdata.guaranteed_num=0;    
                tbdata.buy_cost=new Array<number>();    
                tbdata.model_show=0;
                logdebug("TB_limit_time 为空",this,this.type);
            }
            return tbdata;
        }

        /** 通过type获取到当前的限时召唤排名列表 */
        getCurSummonRankList(): Array<tb.TB_summon_rank> {
            if(!this.type) this.type = this.getCurSummonType();
            return tb.TB_summon_rank.get_TB_summon_rankByType(this.type);
        }

        /** 通过type获取到当前的限时召唤宝箱列表 */
        getCurSummonBoxList(): Array<tb.TB_summon_box> {
            if(!this.type) this.type = this.getCurSummonType();
            return tb.TB_summon_box.get_TB_summon_boxByType(this.type);
        }

        /** 传入页面的dataSource数据 */
        getCurSummonList(): limiteSummonVo {
            return new limiteSummonVo(this.getCurSummonSetList(), this.getCurSummonRankList(), this.getCurSummonBoxList());
        }

        /** 通过id获取到当前的限时召唤的剩余时间 返回剩余时间 */
        getSummonRemainTime(id: number): string {
            let tbSummonTime: tb.TB_limit_time = tb.TB_limit_time.get_TB_limit_timeById(id);
            if(tbSummonTime&&tbSummonTime.type == 1) {
                let endDate = new Date(tbSummonTime.time[1]);
                let endSecond = endDate.getTime()/1000;
                return activityTime(endSecond, App.serverTimeSecond);
            } else if (tbSummonTime&&tbSummonTime.type == 2) {
                let endTime = Number(tbSummonTime.time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime();
                return activityTime(endTime, App.serverTimeSecond);
            } 
            return "";
        }

        /** 判断该宝箱是否能领取 */
        isCanReward(id: number): boolean {
            if(this.isReward(id)) return false;
            let tbSummonBox = tb.TB_summon_box.get_TB_summon_boxById(id);
            if(tbSummonBox.score <= App.hero.summonScore) return true;
            return false;
        }
        /** 判断该宝箱是否已领取 */
        isReward(id: number): boolean {
            return App.hero.doneSummonChests.indexOf(id) != -1;
        }

        /** 是否有免费抽奖次数 红点规则*/
        haveFreeTimes(): boolean {
            let tbSummonTime = this.getCurSummonSetList();
            let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.summonFreeNum);
            return (tbSummonTime.free_num - num) > 0;
        }
        /** 是否有宝箱可以领取 红点规则 */
        haveBoxReward(): boolean {
            let tbSummonBox = this.getCurSummonBoxList();
            for(let obj of tbSummonBox) {
                if(this.isCanReward(obj.ID)) return true;
            }
            return false;
        }

        //----------------------------------------------------------------------------------------------限时团购
        /** 限时团购是否开启 */
        isOpenLimiteGroup(): boolean {
            return this.getCurGroupType().length != 0;
        }
        //首先获得当前团购时间表的ID数组
        getCurGroupType(): Array<number> {
            let arr: Array<number> = [];
            let tbGroupTime: tb.TB_group_buying_time[] = tb.TB_group_buying_time.get_TB_group_buying_time();
            let curTime = App.getServerTime();
            let opensTime = App.getOpenServerTime();
            for(let obj of tbGroupTime) {
                if(obj.type == 0) {         //type为0时是永久活动
                    arr.push(obj.ID);
                    continue;
                } else if (obj.type == 1) { //type为1时是开始-结束活动
                    let startDate = new Date(obj.time[0]);
                    let startSecond = startDate.getTime();
                    let endDate = new Date(obj.time[1]);
                    let endSecond = endDate.getTime();
                    //判断是否在时间内
                    if(startSecond < App.serverTime && endSecond > App.serverTime) {
                        arr.push(obj.ID);
                        continue;
                    }
                } else if (obj.type == 2) { //type为2时是开服-结束活动
                    let startDate = Number(obj.time[0]) - 1;
                    let endDate = Number(obj.time[1]);

                    if((curTime < (opensTime + endDate * TimeConst.ONE_DAY_SEC))
                    && (curTime >= (opensTime + startDate * TimeConst.ONE_DAY_SEC))) {
                        arr.push(obj.ID);
                        continue;
                    }
                }
            }
            return arr;
        }

        /** 通过团购的type获取到当前的团购对象数组 */
        getCurGroupList(): Array<limiteGroupVo> {
            let arrList: Array<limiteGroupVo> = [];
            let arrType: Array<number> = this.CurGroupType ? this.CurGroupType : this.getCurGroupType();
            let tbGroupArr: tb.TB_group_buying[] = tb.TB_group_buying.get_TB_group_buying();
            for(let obj of tbGroupArr) {
                for(let type of arrType) {
                    if(type == obj.type) arrList.push(new limiteGroupVo(obj));
                }
            }
            return arrList;
        }

        /** 通过团购的id查找团购时间表的时间 返回剩余时间*/
        getGroupRemainTime(id: number): string {
            let tbGroupTime: tb.TB_group_buying_time[] = tb.TB_group_buying_time.get_TB_group_buying_time();
            for(let key in tbGroupTime) {
                if(tbGroupTime[key].ID == id) {
                    if(tbGroupTime[key].type == 1) {
                        let endDate = new Date(tbGroupTime[key].time[1]);
                        let endSecond = endDate.getTime() / 1000;
                        return activityTime(endSecond,App.serverTimeSecond);
                    } else if (tbGroupTime[key].type == 2) {
                        let endTime = Number(tbGroupTime[key].time[1]) * TimeConst.ONE_DAY_SEC + App.getOpenServerTime();
                        return activityTime(endTime, App.serverTimeSecond);
                    } else {
                        return "";
                    }
                }
            }
            return "";
        }

        
    }
}