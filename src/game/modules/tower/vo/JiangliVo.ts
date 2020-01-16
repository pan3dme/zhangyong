
module game {

    export class JiangliVo {
        public tbTrial : tb.TB_trial;
        public itemVo : ItemVo;         //普通道具
        constructor(tb:tb.TB_trial){
            this.tbTrial = tb;
            this.itemVo = new ItemVo(parseInt(tb.reward[0][0]),parseInt(tb.reward[0][1]));
        }

        getName():string {
            return this.tbTrial.ID == 2 ? `${LanMgr.getLan('',10023)}` : `${this.itemVo.getName()}x${this.itemVo.getNum()}`;
        }
        /** 是否已领取 */
        isReward():boolean {
            return TowerModel.getInstance().isRewardById(this.tbTrial.ID,this.tbTrial.type);
        }
        /** 获取难度 */
        getNandu():string {
            return this.tbTrial.type == ShiliantaType.jiandan ? LanMgr.getLan("",12122) : LanMgr.getLan("",12123);
        }
    }
}