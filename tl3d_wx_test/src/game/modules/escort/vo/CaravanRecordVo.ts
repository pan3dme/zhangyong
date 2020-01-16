module game {

    /** 商队记录信息 */
    export class CaravanRecordVo implements IRobRecord{
        public svo : IEscortRecordSVo;
        public tbEscort : tb.TB_escort;
        constructor(svo:IEscortRecordSVo) {
            this.svo = svo;
            this.tbEscort = tb.TB_escort.getItemById(svo.tradeId);
        }
        /** 是否被掠夺 */
        isBeRod():boolean {
            return this.svo.recordType == iface.tb_prop.escortRecordTypeKey.fail;
        }

        getLossList():ItemVo[] {
            return this.isBeRod() ? this.tbEscort.getLossList() : [];
        }
        
        getContent():string {
            let lastTime : number = App.serverTimeSecond - this.svo.recordTime;
            let str = "";
            if(lastTime < 3600) {
                str = Math.ceil(lastTime/60) + LanMgr.getLan("",12097) + ',';
            }else if(lastTime < 86800){
                str = Math.ceil(lastTime/3600) + LanMgr.getLan("",12098) + ',';
            }else {
                str = Math.ceil(lastTime/86800) + LanMgr.getLan("",12099) + ',';
            }
            if(this.isBeRod()){
                let ary = this.tbEscort.getLossList();
                return str + (ary.length > 0 ? LanMgr.getLan("",12428,this.svo.name) : LanMgr.getLan("",12429,this.svo.name));
            }
            return str + LanMgr.getLan("",12204,this.svo.name);
        }
        
    }

    export interface IEscortRecordSVo {
        recordTime : number;
        recordType : number;
        tradeId : number;
        name : string;
        playerId : string;
        multiple : number;
    }

    export interface IRobRecord {
        getLossList():ItemVo[];
        getContent():string;
    }
}