

module game {
    /** 材料数据 */
    export class TreasureMaterialVo {

        public tbVo: TreasureMaterialTbVo;     // 材料条件数据
        public curTreasure: TreasureItemVo;    // 当前圣物

        public choose: ChooseTreasureMaterialVo[];      // 选中列表
        constructor(tbVo: TreasureMaterialTbVo, curTreasure: TreasureItemVo) {
            this.tbVo = tbVo;
            this.curTreasure = curTreasure;
            this.choose = [];
        }


        /** 是否足够 */
        isEnough(): boolean {
            return this.choose.length >= this.tbVo.count;
        }

        /** 获取格式化数据 -- 给后端的数据格式 */
        getFormatData(): any[] {
            let ary = [];
            for (let vo of this.choose) {
                ary.push(vo.id);
            }
            return ary;
        }

        /** 获取不足警告 */
        getWarn(): string {
            if (this.tbVo.type == TreasureConfigType.item) {
                let tbItem = tb.TB_item.get_TB_itemById(this.tbVo.itemId);
                return tbItem ? LanMgr.getLan(``, 10369, this.tbVo.starLv, tbItem.name) : LanMgr.getLan(``, 10368);
            }

            return LanMgr.getLan(``, 10370, this.tbVo.starLv, LanMgr.qualityColor[this.tbVo.quality]);
        }
    }

    /** 材料配置表数据 */
    export interface TreasureMaterialTbVo {
        type: number;          // 类型 TreasureConfigType
        itemId?: number;       // 圣物id
        starLv: number;        // 星级
        count: number;         // 数量
        quality: number;       // 品质
    }
    /** 指定的类型 */
    export enum TreasureConfigType {
        item = 1,           // 指定圣物道具
        quality = 2,        // 指定品质
    }

    /** 选中的材料数据 */
    export interface ChooseTreasureMaterialVo {
        id: string | number;
        index: number;
    }

}