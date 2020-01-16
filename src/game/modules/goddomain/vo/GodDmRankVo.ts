
module game {

    export class GodDmRankVo extends common.RankVo {

        
        getValueDesc():any {
            return "积分";
        }

        isShowMid():boolean {
            return false;
        }

        getBottom():any{
            return this.force;
        }
        getBottomDesc():any{
            return "神力：";
        }
        isShowBottom():boolean {
            return true;
        }
    }
}