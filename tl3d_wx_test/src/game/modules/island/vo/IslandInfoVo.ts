
module game {

    export class IslandInfoVo {

        public tbIsland : tb.TB_island;
        public oreList : OreSpotInfoVo[];
        public scrollX : number = 0;
        constructor(tbland:tb.TB_island) {
            this.tbIsland = tbland;
            this.oreList = [];
            for(let i = 1 ; i <= 36 ; i++){
                this.oreList.push(new OreSpotInfoVo(i,this.tbIsland));
            }
        }
        /** 设置矿产列表数据 */
        setServerVo(mineList:IOreSpotSvo[]):void {
            for(let i = 0 ; i < this.oreList.length ; i++){
                let curOre = this.oreList[i];
                let svo = mineList.find((vo:IOreSpotSvo)=>{
                    return vo.mineId == curOre.pos;
                });
                curOre.setSimpleInfo(svo);
            }
        }
        
        /** 获取矿产通过位置 */
        getOreByPos(pos:number):OreSpotInfoVo {
            return this.oreList.find((vo)=>{
                return vo.pos == pos;
            });
        }
        /** 获取矿产通过唯一值 */
        getOreByUuid(mineIndex:number):OreSpotInfoVo {
            return this.oreList.find((vo)=>{
                return vo.isExist() && vo.svo.mineIndex == mineIndex;
            });
        }
    }
    
}