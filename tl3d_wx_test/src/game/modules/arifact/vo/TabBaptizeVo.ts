module game {
    export class TabBaptizeVo {
        public objList:Array<GodItemVo>;

        constructor() {
            this.objList = [];
        }

        addItem(goditem:GodItemVo){
            this.objList.push(goditem);
        }

        getNum():number{
            return this.objList.length;
        }

        getTotalVal(attrKey:number):number{
            let totalVal:number = 0;
            for (let i = 0; i < this.objList.length; i++) {
                let obj = this.objList[i];
                totalVal += obj.getAttrValByKeyOnBaseAttr(attrKey);
            }
            return totalVal;
        }
    }
}