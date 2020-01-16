module game {

    /** 商队货物信息 */
    export class CaravanGoodsVo {
        public tbEscort : tb.TB_escort;
        constructor(tb:tb.TB_escort) {
            this.tbEscort = tb;
        }
        
        /** 是否最高品质 */
        isMaxQuality():boolean {
            return EscortModel.getInstance().isMaxQuality(this.tbEscort.ID);
        }
        
        /** 是否当前选择的货物 */
        isSelected():boolean {
            return this.tbEscort.ID == EscortModel.getInstance().escortId;
        }
    }
}