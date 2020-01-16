

module game {

    export interface IBossInfo {
        bossId: number;        // 副本id
        bossHp : number;
        bossReviveTime: number;    // 复活时间
    }

    export class BossModel {
        constructor() {

        }
        private static _instance: BossModel;
        public static getInstance(): BossModel {
            if (!this._instance) {
                this._instance = new BossModel();
            }
            return this._instance;
        }

        initModel(): void {
            let tb = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_worldboss)).data;
            for(let id in tb){
                this._bossList.push(new BossInfoVo(tb[id]));
            }
            this.refreshInterval();
        }

        /** 刷新定时器 */
        refreshInterval():void {
            if(!App.IsSysOpen(ModuleConst.WORLD_BOSS)) return;
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            let maxCnt = tb.TB_boss_set.getSet().max_time;
            Laya.timer.clear(this,this.updateCount)
            if(count < maxCnt){
                Laya.timer.loop(1000,this,this.updateCount);
                this.updateCount();
            }
        }
        /** 更新数量 */
        private updateCount():void {
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            let maxCnt = tb.TB_boss_set.getSet().max_time;
            let replyTime = tb.TB_boss_set.getSet().reply_time;
            let deltaTime = App.serverTimeSecond - App.hero.worldBossReplyTime;
            if(count >= maxCnt) {
                Laya.timer.clear(this,this.updateCount)
                return;
            }
            if(deltaTime >= replyTime){
                let addCnt = Math.floor(deltaTime / replyTime);
                let lastCnt = Math.min((count + addCnt),maxCnt);
                App.hero.setOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum,lastCnt);
                App.hero.worldBossReplyTime = App.hero.worldBossReplyTime + (deltaTime * addCnt) ;
            }
        }

        private _bossList : BossInfoVo[] = [];
        private _sortAry : number[] = [];
        private _tickId : number;
        /** 请示刷新数据 */
        startInterval():void {
            clearInterval(this._tickId);
            this._tickId = setInterval(this.requestBossInfo.bind(this),10000);
        }
        stopInterval():void {
            clearInterval(this._tickId);
        }
        requestBossInfo():void {
            PLC.request(Protocol.center_boss_getWorldBossInfo,null,($data)=>{
                if(!$data) return;
                this.updateBossInfo($data);
            });
        }
        /** 更新boss数据 */
        updateBossInfo($data: any):void {
            if(!$data) return;
            let curAry = [];
            for(let key in $data.WorldBossInfo){
                let info : IWorldBossInfo = $data.WorldBossInfo[key];
                let boss = this.getBossInfo(info.bossId);
                boss.setSvo(info);
                curAry.push(boss.sortNum);
            }
            dispatchEvt(new BossEvent(BossEvent.UPDATE_BOSS_INFO));
        }
        
        /** 获取boss列表 */
        getBossList():BossInfoVo[] {
            return this._bossList;
        }
        /** 获取boss信息 */
        getBossInfo(id:number):BossInfoVo {
            return this._bossList.find((info)=>{
                return info.tbBoss.ID == id;
            });
        }

    }

}