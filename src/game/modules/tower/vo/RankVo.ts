

module game {

    export interface ICommonRankListVo {
        getList():game.ICommonRankVo[];
        getRankDesc():string;
    }

    export interface ICommonRankVo {
        head : any;
        headFrame : any;
        getName():string;
        getRank():any;
        getHeadVo():UserHeadVo;
        getValue():any;
        getDesc():string;
    }

    export class RankVo implements ICommonRankVo{
        public uid : string;        // 
        public name : string;       // 姓名
        public level : number;      // 等级
        public guanqia : number;    // 关卡
        public rank : number;
        public head : number;
        public headFrame : number;
        public guildName : string;

        constructor(data:any[],rank:number){
            this.uid = data[0];
            this.guanqia = data[1];
            this.name = data[2];
            this.head = data[3];
            this.level = data[4];
            this.guildName = data[5];
            this.headFrame = data[6];
            this.rank = rank;
        }

        getName():string {
            return this.rank <= 3 ? `${this.name} (${this.level}${LanMgr.getLan('',10031)})` : this.name;
        }

        getRank():any {
            return this.rank;
        }

        private _headVo : UserHeadVo;
        getHeadVo():UserHeadVo{
            if(!this._headVo){
                this._headVo = new UserHeadVo(this.head,this.level,this.headFrame);
            }
            return this._headVo;
        }

        getValue():any{
            let info = tb.TB_copy_info.get_TB_copy_infoById(this.guanqia);
            let copy = info ? tb.TB_copy.get_TB_copyById(info.area) : null;
            return  copy ? LanMgr.getLan('',(copy.sub_type ==  ShiliantaType.jiandan ? 10102 : 10103),info.area_number) : LanMgr.getLan('',10051);
        }

        getDesc():string{
            return LanMgr.getLan('',10148);
        }
    }
}