
module game {

    export class IslandModel {
        constructor() {

        }
        private static _instance: IslandModel;
        public static getInstance(): IslandModel {
            if (!this._instance) {
                this._instance = new IslandModel();
            }
            return this._instance;
        }
        
        static ORE_COLORS = [
            ``,
            `#3cec55`,
            `#3cecd1`,
            `#af49cd`,
            `#ff6633`,
            `#ec3c51`
        ]

        initModel(): void {
            this._islandsList = [];
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_island)).data;
            for (let key in tbData) {
                this._islandsList.push(new IslandInfoVo(tbData[key]));
            }
            this._islandsList.sort((a, b) => {
                return b.tbIsland.type == a.tbIsland.type ? (b.tbIsland.type - a.tbIsland.type) : (b.tbIsland.ID - a.tbIsland.ID);
            });
            IslandUtil.resetInterval();
        }

        public myOreInfo: IMyOreInfo;
        setMyOreInfo(info: IMyOreInfo): void {
            // 占领成功，替换
            if (info) {
                this.clearMyInfo();
                this.myOreInfo = info;
            }
        }
        /** 清除自己的占领信息 */
        clearMyInfo(): void {
            let selfInfo = this.getSelfOre();
            if (selfInfo) {
                selfInfo.clearDetailInfo();
            }
            this.myOreInfo = null;
            IslandUtil.setRequestFlag(false);
        }
        /** 是否有新记录 */
        public hasNewRecord: boolean = false;
        /** 是否占领到期 */
        public hasEndTime: boolean = false;
        public updateNewRecord(flag: boolean): void {
            this.hasNewRecord = flag;
            dispatchEvt(new IslandsEvent(IslandsEvent.UPDATE_RECORD_INFO));
        }

        public updateEndTime(flag: boolean): void {
            if (flag == this.hasEndTime) return;
            this.hasEndTime = flag;
            dispatchEvt(new IslandsEvent(IslandsEvent.UPDATE_RECORD_INFO));
        }

        /** 岛屿列表 */
        private _islandsList: IslandInfoVo[];
        getList(): IslandInfoVo[] {
            return this._islandsList;
        }
        getIslandById(id: number): IslandInfoVo {
            return this._islandsList.find((vo) => {
                return vo.tbIsland.ID == id;
            });
        }
        /** 获取自己占领的矿产 */
        getSelfOre(): OreSpotInfoVo {
            for (let island of this._islandsList) {
                let find = island.oreList.find((vo) => {
                    return vo.hasUser() && vo.svo.playerId == App.hero.playerId;
                });;
                if (find) {
                    return find;
                }
            }
            return null;
        }

        /** 获取购买掠夺次数消耗的钻石数 */
        getBuyCost(): number {
            let set = tb.TB_island_set.getSet();
            let costAry = set.buy_cost;
            let count = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyMineRobNum);
            if (count >= costAry.length) {
                return costAry[costAry.length - 1];
            } else {
                return costAry[count];
            }
        }

        /** 获取剩余占领次数 */
        getOccupyCount(): number {
            return tb.TB_island_set.getSet().daily_num - App.hero.getlimitValue(iface.tb_prop.limitTypeKey.mineOccupyNum);
        }

        /** 获取还需多少秒刷新矿点 */
        getNextRefreshTime(): number {
            let date = new Date(App.serverTime);
            let hour = date.getHours();
            let minu = date.getMinutes();
            let second = date.getSeconds();
            let rtime = tb.TB_island_set.getSet().refresh_time;
            let total = (24 + Number(rtime[0])) * 3600;
            for (let time of rtime) {
                if (hour < Number(time)) {
                    total = Number(time) * 3600;
                    break;
                }
            }
            return total - hour * 3600 - minu * 60 - second;
        }
    }

}