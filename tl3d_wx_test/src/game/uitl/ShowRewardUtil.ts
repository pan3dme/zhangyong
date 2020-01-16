
 class ShowRewardUtil {

        private static _rewardList:RewardInfoVo[] = [];
        private static _needSort:boolean = false;
        static showRewardView(rewardList:ItemVo[], type:number, weight:number = 0, handler:Laya.Handler = null): void {
            if (!rewardList || rewardList.length == 0) return;
            let rewardVo:RewardInfoVo = Laya.Pool.getItemByClass("RewardInfoVo", RewardInfoVo);
            rewardVo.init(rewardList, type, weight, handler);
            this._rewardList.push(rewardVo);
            if (rewardVo.weight > 0){
                this._needSort = true;
            }
       
            Laya.timer.callLater(this, this.CheckRewardList)
            
        }

        static CheckRewardList():void{
            if (UIMgr.hasStage(UIConst.ShowRewardItem)){
                return;
            }
            if (this._needSort){
                this._needSort = false;
                this._rewardList.sort((a,b)=>{
                    if (a.weight != b.weight){
                        return b.weight - a.weight;
                    }else{
                        return a.id - b.id;
                    }
                })
            }
            let info:RewardInfoVo = this._rewardList.shift();
            if (info){
                UIMgr.showUI(UIConst.ShowRewardItem, info);
            }
        }
    }

    class RewardInfoVo{
        public id:number = 0;
        public rewardList:ItemVo[];
        public type:number = 0;
        public weight:number = 0;
        public handler:Laya.Handler;

        constructor(){

        }

        public init(rewardList:ItemVo[], type:number = 0, weight:number = 0, handler:Laya.Handler = null):void{
            this.id = RewardInfoVo.ID++;
            this.rewardList = rewardList ? rewardList : [];
            this.type = type;
            this.weight = weight;
            this.handler = handler;
        }

        public clear():void{
            this.id = 0;
            this.rewardList = null;
            this.handler = null;
        }

        public static ID:number = 1;
    }
