module game {

    /** 商队信息 */
    export class CaravanInfoVo extends BaseFightVo{

        public svo : ICaravanInfoSVo;  
        public tbEscort : tb.TB_escort;
        constructor(svo:ICaravanInfoSVo) {
            super();
            this.svo = svo;
            this.tbEscort = tb.TB_escort.getItemById(svo.tradeId);
        }
        /** 设置详细信息 */
        public setDetailInfo(info:any):void {
            this.svo.guildName = info.guildName;
            this.svo.robCount = info.robCount;
            this.svo.multiple = info.multiple;
            this.svo.force = info.force;
            this.svo.head = info.head;
            this.svo.level = info.level;
            
            if(!this.svo.lineupInfo){
                this.svo.lineupInfo = info.lineupInfo;
                super.setLineupInfo(info.lineupInfo);
            }
        }
        
    }
}