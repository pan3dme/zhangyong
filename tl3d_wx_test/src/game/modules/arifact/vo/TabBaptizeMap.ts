module game {
    export class TabBaptizeMap {
        public map: any;

        constructor() {
            this.map = {};
        }

        public add(god: GodItemVo) {
            let raceType = god.getRaceType();
            if (!this.map.hasOwnProperty(raceType)) {
                this.map[raceType] = new TabBaptizeVo;
            }
            this.map[raceType].addItem(god);
        }

        public getNumByRaceType(raceType: number): number {
            let totalNum: number = 0;
            if (raceType == 0) {
                for (let key in this.map) {
                    let vo: TabBaptizeVo = this.map[key];
                    totalNum += vo.getNum();
                }
            } else {
                if (this.map.hasOwnProperty(raceType)) {
                    totalNum += this.map[raceType].getNum();
                }
            }
            return totalNum;
        }

        public getValByRaceType(raceType: number, attrKey: number): number {
            let totalVal: number = 0;
            for (let key in this.map) {
                if (raceType == 0 || raceType == Number(key)) {
                    let vo: TabBaptizeVo = this.map[key];
                    // logyhj("阵营：",raceType,"属性键：",attrKey,"  属性值：",vo.getTotalVal(attrKey));
                    totalVal += vo.getTotalVal(attrKey);
                }
            }
            return totalVal;
        }

    }
}