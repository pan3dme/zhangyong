

module game {
    /** 材料数据 */
    export class GodMaterialVo {

        public tbVo : GodMaterialTbVo;     // 材料条件数据
        public curGod : GodItemVo;      // 当前神灵

        public choose : GodChooseMaterialVo[];      // 选中列表
        constructor(tbVo:GodMaterialTbVo,curGod:GodItemVo){
            this.tbVo = tbVo;
            this.curGod = curGod;
            this.choose = [];
        }

        getRaceType():number {
            return this.curGod.tab_god.race_type;
        }

        /** 是否足够 */
        isEnough():boolean {
            return this.choose.length >= this.tbVo.count;
        }

        /** 获取格式化数据 -- 给后端的数据格式 */
        getFormatData():any[]{
            let ary = [[],[]];
            for(let vo of this.choose){
                if(vo.type == MaterialType.god){
                    ary[0].push(vo.id);
                }else if(vo.type == MaterialType.card){
                    ary[1].push(vo.id);
                }
            }
            return ary;
        }
    }

    /** 材料配置表数据 */
    export interface GodMaterialTbVo {
        type : number;      // 类型 ConfigType
        godId ?: number;     // 神灵id
        starLv : number;    // 星级
        count : number;     // 数量
        race : number;      // 1表示同阵营 0表示任意阵营
    }
    /** 指定的类型 */
    export enum ConfigType {
        god = 1,        // 表示神灵id   指定英雄
        race = 2,       // 表示阵营类型   指定阵营
    }


    /** 选中的材料数据 */
    export interface GodChooseMaterialVo {
        type : number;  // MaterialType 1表示神灵,id则为神灵的uuid 2表示万能卡,id则表示为道具id
        id : string | number;
        index : number;
    }
    /** 材料类型 */
    export enum MaterialType {
        god = 1,        // 表示神灵
        card = 2,       // 表示万能卡
    }
}