module game {

    export class IslandQueueMgr {

        constructor() {

        }

        private static _instance: IslandQueueMgr;
        public static getInstance(): IslandQueueMgr {
            if (!this._instance) {
                this._instance = new IslandQueueMgr();
            }
            return this._instance;
        }

        private _recordList : IOreSettlementVo[] = [];

        /** 请求查看是否有被抢占时留下的收益未领取
         *  当有记录时，弹出提示；关闭时
         */
        public requestRobbed(isGoto:boolean,force: boolean = false): void {
            if(UIMgr.hasStage(UIConst.FightViews) || UIMgr.hasStage(UIConst.OreSettlementView)) return;
            if (force || IslandModel.getInstance().hasNewRecord) {
                PLC.request(Protocol.game_mine_mineRobList, null, ($data) => {
                    if (!$data) return;
                    let grabList : any[] = $data.grabList ? $data.grabList : [];
                    if (grabList.length > 0) {
                        this.pushRecords(grabList,isGoto);
                        this.showNoticeView();
                    }
                }, false);
            }
        }
        
        /** 显示提示界面 */
        public showNoticeView():void {
            if(UIMgr.hasStage(UIConst.FightViews) || this._recordList.length == 0) {
                this.clearRecords();
                return;
            }
            let info = this._recordList.shift();
            if(info && info.recordVo){
                UIMgr.showUI(UIConst.OreSettlementView, info);
            }
        }

        /** 推入记录 */
        public pushRecords(grabList:IIslandRecordSvo[],isGoto:boolean):void{
            for(let svo of grabList){
                if(!this.isExistRcord(svo.recordId)){
                    let recordVo = new IslandRecordVo(svo);
                    recordVo.isGoto = isGoto;
                    let info : IOreSettlementVo = {title:recordVo.getTitle(),content:recordVo.getContent(),itemArray:recordVo.getLossList(),recordVo};
                    this._recordList.push(info);
                }
            }
            this._recordList.sort((a,b)=>{
                return b.recordVo.svo.recordTime - a.recordVo.svo.recordTime;
            });
        }
        /** 清除记录 */
        public clearRecords():void {
            this._recordList.length = 0;
        }
        /** 获取记录 */
        public getRecordVo(recordId):IOreSettlementVo {
            return this._recordList.find((vo)=>{
                return vo.recordVo.svo.recordId == recordId;
            });
        }
        /** 是否存在记录 */
        public isExistRcord(recordId):boolean {
            return this.getRecordVo(recordId) ? true : false;
        }

        /** 是否存在记录 */
        public isHasRcord():boolean {
            return this._recordList.length > 0;
        }
    }
}