module game{
	export class RankListVo{
        public id:number = 0;//（1.战力排行，2.历练副本排行，3.等级排行，4.试炼塔排行，5.单英雄排行）
        public myRank:number = 0;
        public rankValue:number = 0;
        public forceRankList:PrRankVo[] = [];
        public rewardList:PrRankVo[];
        public rankType:tb.TB_rank_type;
        public maxRank:number = 50;

        public godInfo : any;
        public firstRankGodId:number = 0;
        public firstAwakenLv:number = 0;
        public firstSkinId : number;
        public secondRankGodId:number = 0;
        public secondAwakenLv:number = 0;
        public secondSkinId : number;
        public thirdRankGodId:number = 0;
        public thirdAwakenLv:number = 0;
        public thirdSkinId : number;
        
        public constructor(id:number){
            this.id = id;
            this.rankType = tb.TB_rank_type.getSet(id);
            let rewards:tb.TB_rank_reward[] = tb.TB_rank_reward.getRewardListByType(this.rankType.type);
            this.rewardList = [];
            for (let i:number = 0; i < rewards.length; i++){
                this.rewardList[i] = new PrRankVo(this.id, i, null);
                this.rewardList[i].reward = rewards[i];
                this.rewardList[i].rank = rewards[i].rank[0] == rewards[i].rank[1] ? String(rewards[i].rank[0]) : rewards[i].rank[0] + "~" + rewards[i].rank[1];;
            }
        }

        //解析数据
        public syncData(data:any):void{
            this.godInfo = data['godInfo'] || {};
            this.firstRankGodId = this.godInfo[1] ? this.godInfo[1][0] : 0;
            this.firstAwakenLv = this.godInfo[1] ? this.godInfo[1][1] : 0;
            this.firstSkinId = this.godInfo[1] ? this.godInfo[1][2] : 0;
            this.secondRankGodId = this.godInfo[2] ? this.godInfo[2][0] : 0;
            this.secondAwakenLv = this.godInfo[2] ? this.godInfo[2][1] : 0;
            this.secondSkinId = this.godInfo[2] ? this.godInfo[2][2] : 0;
            this.thirdRankGodId = this.godInfo[3] ? this.godInfo[3][0] : 0;
            this.thirdAwakenLv = this.godInfo[3] ? this.godInfo[2][1] : 0;
            this.thirdSkinId = this.godInfo[3] ? this.godInfo[3][2] : 0;

            this.myRank = data.myRank;
            this.rankValue = data.rankValue;
            this.forceRankList = [];
            for (let i:number = 0; i < this.maxRank; i++) {
                let obj:any = data.forceRankList[i+1];
                this.forceRankList[i] = new PrRankVo(this.id, i, obj);
                this.forceRankList[i].reward = this.getReward(i+1);
			}

            for (let i:number = 0; i < this.rewardList.length; i++){
                if (this.rewardList[i].reward.rank[0] == this.rewardList[i].reward.rank[1]){
                    this.rewardList[i].copyInfo(this.forceRankList[this.rewardList[i].reward.rank[0]-1]);
                }
            }
        }

        /** 获取模型ID */
        public getModelId(rank:number):number {
            if(rank == 1) {
                return GodUtils.getShowGodModel(this.firstRankGodId,this.firstSkinId);
            }else if( rank == 2) {
                return GodUtils.getShowGodModel(this.secondRankGodId,this.secondSkinId);
            }
            return GodUtils.getShowGodModel(this.thirdRankGodId,this.thirdSkinId);
        }

        private getReward(rank:number):tb.TB_rank_reward{
            for (let i:number = 0; i < this.rewardList.length; i++){
                if (this.rewardList[i].reward.rank[0] <= rank && rank <= this.rewardList[i].reward.rank[1]){
                    return this.rewardList[i].reward;
                }
            }
            return null;
        }

        //获取我的排行描述
        public getMyRankDesc():string{
            let selfData:PrRankVo = this.forceRankList.find(Info => Info.playerID == App.hero.playerId);
            switch(this.id){
                case PrRankVo.ID_ZHANLI://神力
                    return LanMgr.getLan("",12178) + "：" +  Snums(selfData ? selfData.power : App.hero.maxHistoryForce);
                case PrRankVo.ID_FUBEN://副本
                    let model = GuajiModel.getInstance();
                    return LanMgr.getLan("",12181) + "：" + model.getCopyRankDesc(selfData?selfData.power:model.getMaxLev());
                case PrRankVo.ID_LEVEL://等级
                    return LanMgr.getLan("",12180) + "：" + (selfData?selfData.power:App.hero.level);
                case PrRankVo.ID_SHENLING://英雄星级
                    let star:number = 0;
                    if (selfData){
                        star = selfData.power;
                    }else{
                        let allgod:GodItemVo[] = App.hero.getGodAry();
                        if (allgod && allgod.length > 1){
                            star = allgod[0].starLevel;
                        }
                    }
                    return LanMgr.getLan("",12630,star);
                case PrRankVo.ID_SHILIAN://试炼塔
                    let copyId = App.hero.towerCopyInfo['2'] ? App.hero.towerCopyInfo['2'] : App.hero.towerCopyInfo['1'];
                    return LanMgr.getLan("",12183) + "：" + TowerModel.getInstance().getCopyRankDesc(selfData?selfData.power:copyId);
                default:
                    return "";
            }

        }

        //获取我的值描述
        public getMyValueDesc():string{
            return LanMgr.getLan("",12265) + (this.myRank ? this.myRank : LanMgr.getLan("",12187));
        }

        //获取标题
        public getTitle():string{
            switch(this.id){
                case PrRankVo.ID_FUBEN://副本
                    return LanMgr.getLan("",12181);
                case PrRankVo.ID_LEVEL://等级
                    return LanMgr.getLan("",12179);
                case PrRankVo.ID_SHENLING://神灵
                    return LanMgr.getLan("",12629);
                case PrRankVo.ID_SHILIAN://试炼
                    return LanMgr.getLan("",12183);
                case PrRankVo.ID_ZHANLI://战力
                    return LanMgr.getLan("",12081);
                default:
                    return "";
            }
        }

    }
}
