module game {

    export class EscortModel {

        constructor() {

        }
        private static _instance: EscortModel;
        public static getInstance(): EscortModel {
            if (!this._instance) {
                this._instance = new EscortModel();
            }
            return this._instance;
        }

        initModel(): void {
            this._goodsList = [];
            this.caravanList = [];
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_escort)).data;
			for(let key in tbData) {
				this._goodsList.push(new CaravanGoodsVo(tbData[key]));
			}
            if(App.IsSysOpen(ModuleConst.CARAVAN_ESCORT)) {
                PLC.request(Protocol.center_escort_getSelfInfo,null,($data)=>{
                    this.updateEscortInfo($data ? $data.escortInfo : null)
                    dispatchEvt(new EscortEvent(EscortEvent.UPDATE_SELF_INFO));
                    this.delayRewardInfo();
                });
            }
        }   
        public delayRewardInfo():void {
            if(this.endTime > 0 && App.serverTimeSecond < this.endTime){
                Laya.timer.once((this.endTime-App.serverTimeSecond),this,()=>{
                    dispatchEvt(new EscortEvent(EscortEvent.UPDATE_REWARD_RP));
                });
            }
        }
        /** 护送结束时间 */
        public endTime : number = 0;
        /** 护送货物id */
        public escortId : number = 0;
        updateEscortInfo(info:any):void {
            if(info){
                // 赋值列表里的货物id
                this.escortId = info.tradeId;
                this.endTime = info.endTime;
            }else{
                this.escortId = App.hero.escortTradeId;
                this.endTime = 0;
            }
        }

        public caravanList : CaravanInfoVo[] = [];
        requestCaravanList():Promise<any> {
            this.caravanList = [];
            return new Promise<any>((resolve,reject)=>{
                PLC.request(Protocol.center_escort_getEscortList,null,($data)=>{
                    if(!$data) return;
                    this.caravanList = [];
                    this.updateEscortInfo($data.escortInfo);
                    for(let svo of $data.escortList){
                        this.caravanList.push(new CaravanInfoVo(svo));
                    }
                    this.caravanList.sort((a,b)=>{
                        return a.svo.endTime - b.svo.endTime;
                    });
                    resolve();
                });
            });
        }
        /** 商队列表 */
        getCaravanList():CaravanInfoVo[]{
            let list = [];
            while(this.caravanList.length > 0 && list.length < 10){
                list.push(this.caravanList.shift());
            }
            return list;
        }
        /** 商队itemrender缓存 */
        private _itemCacheList : CaravanIR[] = [];
        getItemRender():CaravanIR{
            let item : CaravanIR = this._itemCacheList.length > 0 ? this._itemCacheList.shift() : new CaravanIR();
            return item;
        }
        pushItemRender(item:CaravanIR):void {
            if(this._itemCacheList.indexOf(item) == -1){
                this._itemCacheList.push(item);
            }
        }

        /** 货物列表 */
        private _goodsList : CaravanGoodsVo[];
        /** 货物列表 */
        getGoodsList():CaravanGoodsVo[]{
            return this._goodsList;
        }

        /** 获取刷新消耗：先消耗道具后消耗钻石 */
        getRefreshCost():any[]{
            let itemCost = tb.TB_escort_set.getSet().refresh_item;
            if(App.isEnough(itemCost[0],itemCost[1])){
                return itemCost;
            }
            return [iface.tb_prop.resTypeKey.diamond,tb.TB_escort_set.getSet().refresh_cost];
        }
        /** 获取一键刷新消耗：先消耗道具后消耗钻石 */
        getOneKeyCost():any[]{
            let itemCost = tb.TB_escort_set.getSet().auto_item;
            if(App.isEnough(itemCost[0],itemCost[1])){
                return itemCost;
            }
            return [iface.tb_prop.resTypeKey.diamond,tb.TB_escort_set.getSet().auto_cost];
        }

        /** 是否最高品质 */
        isMaxQuality(id):boolean {
            return id == 4;
        }

        /** 是否在奖励翻倍时间内 */
        isDoubleTime():boolean {
            let date = new Date(App.serverTime);
            let hour = date.getHours();
            let time = tb.TB_escort_set.getSet().double_time;
            for(let ary of time){
                if( hour >= Number(ary[0]) && hour < Number(ary[1])){
                    return true;
                }
            }
            return false
        }
        /** 剩余护送次数 */
        getEscortCount():number {
            return tb.TB_escort_set.getSet().escort_num - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.escortCount);
        }
        /** 剩余掠夺次数 */
        getRobCount():number {
            return tb.TB_escort_set.getSet().rob_num - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.robCount);
        }

        /** 翻倍时间内是否可护送 */
        canDoubleEscort():boolean {
            if(this.isDoubleTime()){
                return this.getEscortCount() > 0 && App.serverTimeSecond >= this.endTime;
            }
            return false;
        }
        public hasNewRecord : boolean = false;
        updateNewRecord(flag:boolean):void {
            this.hasNewRecord = flag;
            dispatchEvt(new EscortEvent(EscortEvent.UPDATE_RECORD_RP));
        }
        /** 是否有奖励领取 */
        canReward():boolean {
            let time = this.endTime;
            return time > 0 && time <= App.serverTimeSecond;
        }
    }
}