module game{
	export class PrRankVo{
        static ID_ZHANLI:number = 1;
        static ID_FUBEN:number = 2;
        static ID_LEVEL:number = 3;
        static ID_SHILIAN:number = 4;
        static ID_SHENLING:number = 5;


        public id:number;//（1.战力排行，2.历练副本排行，3.等级排行，4.试炼塔排行，5.单英雄排行）
        public index:number;
        public playerID:string;
        public rank:string;
        public name:string;
        public level:number;
        public head:any;
        public headFrame:any;
        public guild:string;

        public power:number;//（id==1:神力，2.关卡，3.等级，4.层级，5.星级
        public shenlingid:number;//神灵id
        public slShenLi:number;//神灵神力
        public hasPerson:boolean;

        public reward:tb.TB_rank_reward;

        public constructor(id:number, index:number, arrData:any[]){
            this.id = id;
            this.index = index;
            this.rank = String(index+1);
            this.hasPerson = arrData != null;
            if (this.hasPerson){
                if (this.id == PrRankVo.ID_SHENLING){
                    //神灵
                    this.playerID = arrData[0];
                    this.name = arrData[4];
                    this.level = arrData[6];
                    this.head = arrData[5];
                    this.guild = arrData[7];
                    this.power = arrData[1];
                    this.slShenLi = arrData[2];
                    this.shenlingid = arrData[3];
                    this.headFrame = arrData[8];
                }else{
                    this.playerID = arrData[0];
                    this.name = arrData[2];
                    this.level = arrData[4];
                    this.head = arrData[3];
                    this.guild = arrData[5];
                    this.power = arrData[1];
                    this.headFrame = arrData[6];
                }
            }else{
                this.clear();
            }
        }

        public copyInfo(info:PrRankVo):void{
            if (info && info.hasPerson){
                this.playerID = info.playerID;
                this.name = info.name;
                this.level = info.level;
                this.head = info.head;
                this.headFrame = info.headFrame;
                this.guild = info.guild;
                this.power = info.power;
                this.shenlingid = info.shenlingid;
                this.slShenLi = info.slShenLi;
                this.hasPerson = true;
            }else{
                this.clear();
            }
        }

        private clear():void{
            this.playerID = "";
            this.name = "";
            this.level = 0;
            this.head = null;
            this.headFrame = 0;
            this.guild = "";
            this.power = 0;
            this.shenlingid = 0;
            this.slShenLi = 0;
            this.hasPerson = false;
        }

        //获取标题
        public getTitle():string{
            switch(this.id){
                case PrRankVo.ID_FUBEN://副本
                    return LanMgr.getLan("",10148);
                case PrRankVo.ID_LEVEL://等级
                    return LanMgr.getLan("",12179);;
                case PrRankVo.ID_SHENLING://神灵
                    return LanMgr.getLan("",12081);;
                case PrRankVo.ID_SHILIAN://试炼
                    return LanMgr.getLan("",12183);;
                case PrRankVo.ID_ZHANLI://战力
                    return LanMgr.getLan("",12081);;
                default:
                    return "";
            }
        }

        //获取标题
        public getConditionTitle():string{
            switch(this.id){
                case PrRankVo.ID_FUBEN://副本
                    return LanMgr.getLan("",10148);
                case PrRankVo.ID_LEVEL://等级
                    return LanMgr.getLan("",12179);;
                case PrRankVo.ID_SHENLING://神灵
                    return LanMgr.getLan("",12629);;
                case PrRankVo.ID_SHILIAN://试炼
                    return LanMgr.getLan("",12183);
                case PrRankVo.ID_ZHANLI://战力
                    return LanMgr.getLan("",12081);;
                default:
                    return "";
            }
        }

        //获取条件描述
        public getConditionDesc():string{
            switch(this.id){
                case PrRankVo.ID_FUBEN://副本
                    return LanMgr.getLan("",12628)+GuajiModel.getInstance().getCopyRankDesc(this.reward.score);
                case PrRankVo.ID_LEVEL://等级
                    return LanMgr.getLan("",12501) + this.reward.score + LanMgr.getLan("",10031);
                case PrRankVo.ID_SHENLING://星级
                    return LanMgr.getLan("",12501) + this.reward.score + LanMgr.getLan("",12528);
                case PrRankVo.ID_SHILIAN://试炼
                    return LanMgr.getLan("",12628) + TowerModel.getInstance().getCopyRankDesc(this.reward.score);
                case PrRankVo.ID_ZHANLI://神力
                    return LanMgr.getLan("",12501) + this.reward.score;
                default:
                    return "";
            }
        }

        //获取神灵名字
        public getShenLingName():string{
            let god:tb.TB_god = tb.TB_god.get_TB_godById(this.shenlingid);
            return god ? god.name : "";
        }

        //获取描述
        public getValueDesc():string{
            switch(this.id){
                case PrRankVo.ID_FUBEN://副本
                    return GuajiModel.getInstance().getCopyRankDesc(this.power);
                case PrRankVo.ID_LEVEL://等级
                    return this.power + LanMgr.getLan("",10031);
                case PrRankVo.ID_SHENLING://星级
                    return this.slShenLi + "";
                case PrRankVo.ID_SHILIAN://试炼
                    return TowerModel.getInstance().getCopyRankDesc(this.power);
                case PrRankVo.ID_ZHANLI://神力
                    return this.power+"";
                default:
                    return "";
            }
        }
    }
}
