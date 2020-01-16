module game {

    export class IslandUtil {

        constructor() {
        }

        private static _requestSelf: boolean = false;
        /** 请求自己信息 */
        static requestSelfInfo(): Promise<any> {
            return new Promise<any>((resolve) => {
                if (this._requestSelf) {
                    resolve();
                } else {
                    PLC.request(Protocol.center_mine_getMyMineInfo, null, ($data) => {
                        IslandModel.getInstance().myOreInfo = $data && $data.myInfo ? $data.myInfo : null;
                        this._requestSelf = true;
                        resolve();
                    });
                }
            });
        }
        static setRequestFlag(flag:boolean):void{
            this._requestSelf = flag;
        }

        /** 重置定时器 -- 恢复剩余掠夺次数 */
        static resetInterval(): void {
            if (!App.IsSysOpen(ModuleConst.Island)) return;
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum);
            let maxCnt = tb.TB_island_set.getSet().plunder_max;
            Laya.timer.clear(this, this.updateCount)
            if (count < maxCnt) {
                Laya.timer.loop(1000, this, this.updateCount);
                this.updateCount();
            }
        }
        /** 更新剩余掠夺次数 */
        private static updateCount(): void {
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum);
            let maxCnt = tb.TB_island_set.getSet().plunder_max;
            let replyTime = tb.TB_island_set.getSet().reply_time;
            let deltaTime = App.serverTimeSecond - App.hero.mineRobReplyTime;
            if (count >= maxCnt) {
                Laya.timer.clear(this, this.updateCount)
                return;
            }
            if (deltaTime >= replyTime) {
                let addCnt = Math.floor(deltaTime / replyTime);
                let lastCnt = Math.min((count + addCnt), maxCnt);
                App.hero.setOverplusValue(iface.tb_prop.overplusTypeKey.mineRobNum, lastCnt);
                App.hero.mineRobReplyTime = App.hero.mineRobReplyTime + (deltaTime * addCnt);
            }
        }

        // ===========  在神秘岛屿界面时刷新掠夺数据 ========
        /** 定时更新被掠夺或抢占时的收益列表数据 */
        static loopRequestRobbed():void {
            this.stopRobLoop();
            Laya.timer.loop(10000, this, this.requestRobbed);
            // 打开页面第一次需请求
            this.requestRobbed(false,true);
        }
        static stopRobLoop():void {
            Laya.timer.clear(this, this.requestRobbed)
        }
        /** 请求查看是否有被抢占时留下的收益未领取 */
        public static requestRobbed(isGoto:boolean=false,force: boolean = false): void {
            if(UIMgr.hasStage(UIConst.OreSettlementView)) return;
            if (force || IslandModel.getInstance().hasNewRecord) {
                PLC.request(Protocol.game_mine_mineRobList, null, ($data) => {
                    if (!$data) return;
                    let grabList : any[] = $data.grabList ? $data.grabList : [];
                    if (grabList.length > 0) {
                        let mgr = IslandQueueMgr.getInstance();
                        mgr.pushRecords(grabList,false);
                        mgr.showNoticeView();
                    }
                }, false);
            }
        }

        // =========== 定时更新矿点数据 ========
        private static _curIslandId: number;
        /** 定时更新矿点数据 */
        static loopRequestIsland(islandid: number): void {
            this._curIslandId = islandid;
            Laya.timer.clear(this, this.requestAll);
            Laya.timer.loop(10000, this, this.requestAll);
            // 打开页面第一次需请求
            this.requestRobbed(false,true);
            // 自动刷新
            let time = IslandModel.getInstance().getNextRefreshTime();
            if(time > 0){
                Laya.timer.once(time*1000,this,this.requestOreList);
            }
        }
        static stopIslandLoop(): void {
            this._curIslandId = 0;
            this.stopRobLoop();
            Laya.timer.clear(this, this.requestAll);
            Laya.timer.clear(this,this.requestOreList);
        }
        /** 请求刷新矿点数据及掠夺数据 */
        private static requestAll(): void {
            if (this._curIslandId == 0) {
                this.stopIslandLoop();
                return;
            }
            if (!UIMgr.hasStage(UIConst.OreMapView)) {
                this.stopIslandLoop();
                return;
            }
            this.requestOreList();
            this.requestRobbed(false,false);
        }
        /** 请求最新矿点数据 */
        private static requestOreList():void {
            if (this._curIslandId == 0) {
                return;
            }
            if (!UIMgr.hasStage(UIConst.OreMapView) && !UIMgr.hasStage(UIConst.IslandView)) {
                return;
            }
            let args = {};
            args[Protocol.center_mine_getMineList.args.islandId] = this._curIslandId;
            PLC.request(Protocol.center_mine_getMineList, args, ($data) => {
                if (!$data) return;
                let islandInfo = IslandModel.getInstance().getIslandById(this._curIslandId);
                if(islandInfo){
                    islandInfo.setServerVo($data.mineList);
                    dispatchEvt(new IslandsEvent(IslandsEvent.UPDATE_ORE_LIST,this._curIslandId));
                }
            }, false);
        }
        

    }
}