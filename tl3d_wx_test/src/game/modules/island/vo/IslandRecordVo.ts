module game {

    export class IslandRecordVo implements IRobRecord{

        public svo : IIslandRecordSvo;
        public tbOre : tb.TB_island_level;
        public isGoto : boolean;
        constructor(svo:IIslandRecordSvo) {
            this.svo = svo;
            this.tbOre = tb.TB_island_level.getItemById(svo.mineType);
        }

        getTitle():string {
            return this.svo.recordType == iface.tb_prop.mineRecordTypeKey.finish ? LanMgr.getLan("",12199) : LanMgr.getLan("",12200);
        }

        getContent():string {
            if(this.svo.recordType == iface.tb_prop.mineRecordTypeKey.finish){
                return `${this.getTimePrev()}${LanMgr.getLan("",12205,this.tbOre.name)}${this.isGoto?LanMgr.getLan("",12206):""}`;
            }else if(this.svo.recordType == iface.tb_prop.mineRecordTypeKey.occupyFail){
                if(this.isHasItemList()){
                    return `${this.getTimePrev()}${LanMgr.getLan("",12207,this.tbOre.name,this.svo.name)}${LanMgr.getLan("",12208)}${this.isGoto?LanMgr.getLan("",12206):""}`;
                }else{
                    return `${this.getTimePrev()}${LanMgr.getLan("",12207,this.tbOre.name,this.svo.name)}`;
                }
            }else if(this.svo.recordType == iface.tb_prop.mineRecordTypeKey.occupySuccess){
                return `${this.getTimePrev()}${LanMgr.getLan("",12203,this.svo.name)}`;
            }else if(this.svo.recordType == iface.tb_prop.mineRecordTypeKey.robSuccess){
                return `${this.getTimePrev()}${LanMgr.getLan("",12204,this.svo.name)}`;
            }else{
                if(this.isHasItemList()){
                    return `${this.getTimePrev()}${LanMgr.getLan("",12201,this.svo.name)}`;
                }else{
                    return `${this.getTimePrev()}${LanMgr.getLan("",12202,this.svo.name)}`;
                }
            }
        }
        getTimePrev():string {
            let lastTime : number = App.serverTimeSecond - this.svo.recordTime;
            let str = "";
            if(lastTime < 3600) {
                str = Math.ceil(lastTime/60) + LanMgr.getLan("",12097) + ',';
            }else if(lastTime < 86800){
                str = Math.ceil(lastTime/3600) + LanMgr.getLan("",12098) + ',';
            }else {
                str = Math.ceil(lastTime/86800) + LanMgr.getLan("",12099) + ',';
            }
            return str;
        }

        private _itemList : ItemVo[];
        getLossList():ItemVo[]{
            if(this.svo.recordType == iface.tb_prop.mineRecordTypeKey.robSuccess){
                return [];
            }
            if(!this._itemList){
                this._itemList = [];
                for(let ary of this.svo.rewardInfo){
                    this._itemList.push(new ItemVo(ary[0],ary[1]));
                }
            }
            return this._itemList;
        }
        
        /** 是否有奖励或者损失物品 */
        isHasItemList():boolean {
            return this.getLossList().length > 0;
        }
        /** 是有有奖励：采集完成或者被占领 */
        isHasReward():boolean {
            return this.isHasItemList() && (this.svo.recordType == iface.tb_prop.mineRecordTypeKey.occupyFail || this.svo.recordType == iface.tb_prop.mineRecordTypeKey.finish);
        }
    }

    export interface IIslandRecordSvo {
        recordId : string;          // 记录id
        recordTime : number;        // 被掠夺时间
        name : string;
        recordType : number;        // 日志类型 枚举
        mineType : number;          // 矿点id
        rewardInfo : Array<Array<number>>;
        state : number;         // 状态
    }
}