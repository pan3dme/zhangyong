

module game {

    export class MatchRankVo extends  common.RankVo{

        score : number;
        constructor(){
            super();
        }

        getValue():string {
            return MatchModel.getInstance().getGradeName(this.score);
        }
        getValueDesc():string {
            return LanMgr.getLan("",12544);
        }

        isShowMid():boolean {
            return true;
        }
        getMidDesc():string {
            return LanMgr.getLan("",12543);
        }
        getMid():any{
            return this.score;
        }

        isShowBottom():boolean {
            return true;
        }

        
    }
    
}