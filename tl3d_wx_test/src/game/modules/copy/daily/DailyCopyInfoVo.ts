

module game {

    export class DailyCopyInfoVo {

        public tbCopy : tb.TB_daily_copy;
        public type : number;               // 试炼副本列表
        public subType : number;            // 难度类型

        public isFirst : boolean = false;   // 是否第一关
        public isLast : boolean = false;    // 是否最后一关
        public sortNum : number;
        constructor(tb:tb.TB_daily_copy){
            this.tbCopy = tb;
            this.type = Math.floor(tb.ID / 100);
            this.subType = tb.ID % 10;
        }

        /** 是否等级限制挑战 */
        public isLvLimit():boolean {
            return App.hero.level < this.tbCopy.level
        }

        getCopyName():string {
            return DailyCopyModel.COPY_NAME[this.type] + "：" + this.tbCopy.name;
        }

        /** 获取剩余类型：剩余挑战次数类型 */
        getOverplusType():number {
            if(this.type == iface.tb_prop.dailyCopyTypeKey.gold){
                return iface.tb_prop.overplusTypeKey.dailyCopyNum1;
            } else if( this.type == iface.tb_prop.dailyCopyTypeKey.exp){
                return iface.tb_prop.overplusTypeKey.dailyCopyNum2;
            }
            return iface.tb_prop.overplusTypeKey.dailyCopyNum3;
        }

        /** 获取限制类型：购买次数类型 */
        getLimitType():number {
            if(this.type == iface.tb_prop.dailyCopyTypeKey.gold){
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum1;
            } else if( this.type == iface.tb_prop.dailyCopyTypeKey.exp){
                return iface.tb_prop.limitTypeKey.buyDailyCopyNum2;
            }
            return iface.tb_prop.limitTypeKey.buyDailyCopyNum3;
        }

        /** 副本类型 */
        getCopyType():number {
            return this.type;
        }
    }
}