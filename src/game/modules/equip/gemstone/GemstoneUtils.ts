
module game {

    export class GemstoneUtils {

        
        /**
		 * 创建一个宝石对象
		 * @param uuid 唯一索引
		 */
		static createGemstoneVo(uuid="",svo:IGemstoneSvo=null): GemstoneItemVo {
			let vo: GemstoneItemVo = new GemstoneItemVo();
            if(svo) {
                let parseObj = JSON.parse(JSON.stringify(svo));
                vo.setData(parseObj);
            }
			vo.uuid = uuid;
			return vo;
		}

        /** 合成的配置：存储成obj方便获取 */
        private static _compoundObj : {[key:string]:TbCompoundObj};
        /** 和 */
        static getCompoundObj():{[key:string]:TbCompoundObj} {
            if(!this._compoundObj) {
                this._compoundObj = {};
                let tbList = tb.TB_gemstone_compound.getTBList();
                for(let i = 0 ; i < tbList.length ; i++) {
                    let tbComp = tbList[i];
                    let obtainId = tbComp.obtain[0][0];
                    let obtainNum = tbComp.obtain[0][1];
                    let materialId = tbComp.material[0][0];
                    let materialNum = tbComp.material[0][1];
                    let tbItem = tb.TB_item.get_TB_itemById(obtainId);
                    let tbGem = tb.TB_gemstone_new.getTBOneById(tbItem.defined[0]);
                    this._compoundObj[obtainId] = {ID:tbComp.ID,obtainId,obtainNum,materialId,materialNum,gemType:tbGem.getType(),gemLv:tbGem.getLevel(),clinetNum:0};
                }
            }
            return  this._compoundObj;
        }
        /** 获得可合成该宝石的数量 */
        static getCompoundNum(tbId:number):number {
            let obj = this.getCompoundObjById(tbId);
            if(!obj) return 0;
            let ownNum = GemstoneUtils.getOwnNum(obj.materialId);
            return Math.floor(ownNum/obj.materialNum);
        }
        static getCompoundObjById(tbId:number):TbCompoundObj {
            let compoundObj = this.getCompoundObj();
            return compoundObj[tbId];
        }

        /** 获取该宝石的数量 */
        static getOwnNum(tbId:number):number {
            let gemVo = GemstoneModel.getInstance().getGemstoneByTbID(tbId);
            return gemVo ? gemVo.num : 0;
        }

        /** 是否可合成 某些类型某个等级的宝石*/
        static isCanCompound(type:number,gemLv:number):boolean {
            let compoundObj = GemstoneUtils.getCompoundObj();
            let isCan : boolean = false;
            for(let tbId in compoundObj) {
                // 判断是否同类型并且等级限制
                if( (type == 0 || compoundObj[tbId].gemType == type) && gemLv >= compoundObj[tbId].gemLv){
                    if(GemstoneUtils.getCompoundNum(Number(tbId)) > 0) {
                        isCan = true;
                        break;
                    }
                }
            }
            return isCan;
        }
        /** 是否可合成 通过材料ID */
        static isCanCompoundByMaterial(itemId:number):boolean {
            let compoundObj = GemstoneUtils.getCompoundObj();
            let isCan : boolean = false;
            for(let tbId in compoundObj) {
                // 判断材料ID是否一致
                if( compoundObj[tbId].materialId == itemId && GemstoneUtils.getCompoundNum(Number(tbId)) > 0){
                    isCan = true;
                    break;
                }
            }
            return isCan;
        }
        /** 获取可以合成列表 */
        static getCanCompMaxLvList(type:number,gemLv:number):ItemVo[] {
            let compoundObj = GemstoneUtils.getCompoundObj();
            // 合成ID,拥有的材料数量,等级，类型，合成数量
            let list : {obtainId,ownMaterCount,gemLv,gemType,hechengCount}[] = [];
            for(let tbId in compoundObj) {
                let vo = compoundObj[tbId];
                let count = GemstoneUtils.getOwnNum(vo.materialId);
                // 判断是否同类型并且等级限制
                if((type == 0 || compoundObj[tbId].gemType == type) && gemLv >= vo.gemLv){
                    list.push({obtainId:tbId,ownMaterCount:count,gemLv:vo.gemLv,gemType:vo.gemType,hechengCount:0});
                }
            }
            // 低等级排序
            list.sort((a,b)=>{
                if(a.gemType == b.gemType){
                    return a.gemLv - b.gemLv;
                }else{
                    return a.gemType - b.gemType;
                }
            });
            // 合成预览
            for(let i = 0 ; i < list.length ; i++){
                let vo = list[i];
                let compVo = GemstoneUtils.getCompoundObjById(vo.obtainId);
                // 子材料
                let materVo = list.find((listVo)=>{
                    return compVo.materialId == listVo.obtainId;
                });
                let count = 0;
                if(materVo){
                    count = materVo.hechengCount || 0;
                }
                // 设置合成数量
                if( (count + vo.ownMaterCount) >= compVo.materialNum){
                    vo.hechengCount = Math.floor((count + vo.ownMaterCount)/compVo.materialNum)*compVo.obtainNum;
                }
            }
            // 高等级排序
            list.sort((a,b)=>{
                if(a.gemType == b.gemType){
                    return b.gemLv - a.gemLv;
                }else{
                    return a.gemType - b.gemType;
                }
            });
            let itemVoList : ItemVo[] = [];
            let typeList : number[] = [];
            for(let i = 0 ; i < list.length ; i++){
                let vo = list[i];
                if(vo.hechengCount > 0 && typeList.indexOf(vo.gemType) == -1){
                    typeList.push(vo.gemType);
                    let itemVo = new ItemVo(vo.obtainId,vo.hechengCount)
                    itemVo.show = true;
                    itemVoList.push(itemVo);
                }
            }
            return itemVoList;
        }

        /** 获取可穿戴(或者更高基本)的宝石列表 -- 有变化的(宝石位置如果不变无视) */
        static getCanWearGemList(info:GodItemVo): { [key: number]: {templateId,uuid,gemLv} }{
            // 获取未穿戴宝石
            let list = GemstoneModel.getInstance().getGemtones().filter((vo)=>{
                return !vo.isExsitGod();
            });
            // 等级越高排前面
            list.sort((a,b)=>{
                return b.gemLv - a.gemLv;
            });
            list.forEach((vo)=>{
                return vo.clientNum = vo.num;
            });
            // 选取背包中最高级别各四个
            let maxLvDic : any = {1:[],2:[],3:[]};
            list.forEach((vo)=>{
                let type = vo.gemType;
                if(!maxLvDic[type]){
                    maxLvDic[type] = [];
                }
                if(maxLvDic[type].length < 4){
                    let needNum = 4 - maxLvDic[type].length;
                    for(let i = 0 ; i < needNum ; i++){
                        if(vo.clientNum <= 0) break;
                        maxLvDic[type].push({templateId:vo.templateId,uuid:vo.uuid,gemLv:vo.gemLv});
                        vo.clientNum --;
                    }
                }
            });

            // 空的槽位排在前面，空的先镶嵌最高级别
            let existList : number[] = [];
            let notExistList : number[] = [];
            for(let slot = 1 ; slot <= 12 ; slot++){
                if(info.isExistGem(slot)){
                    existList.push(slot);
                }else{
                    notExistList.push(slot);
                }
            }
            let slotList : number[] = [...notExistList,...existList];
            let hasChange : boolean = false;
            let gemDic : { [key: number]: {templateId,uuid,gemLv} } = {};
            // 十二个槽位 1 2 3 4 5 6 7 8 9
            for(let i = 0 ; i < slotList.length ; i++){
                let slot = slotList[i];
                let type = slot % GemstoneModel.gemstone_type_count == 0 ? GemstoneType.fangyu : slot % GemstoneModel.gemstone_type_count;
                let gemVo = info.getGemsBySlot(slot);
                let tempAry : {templateId,uuid,gemLv}[] = maxLvDic[type];
                if(tempAry.length == 0) continue;
                // 是否存在宝石
                if(gemVo){
                    let findObj = tempAry[0];
                    if(findObj.gemLv > gemVo.gemLv){
                        gemDic[slot] = findObj;
                        tempAry.splice(0,1);
                        hasChange = true;
                    }
                }else{
                    let findObj = tempAry[0];
                    gemDic[slot] = findObj;
                    tempAry.splice(0,1);
                    hasChange = true;
                }
            }
            return hasChange ? gemDic : {};
        }

        /** 获取宝石奖励列表 */
        static getGemRewardItemList(commonData:any):ItemVo[] {
            let itemObj = {};
            let addGemstones = commonData['addGemstones'] || {};
            for(let uuid in addGemstones){
                let vo : IGemstoneSvo = addGemstones[uuid];
                let tbId = vo.templateId;
                itemObj[tbId] = itemObj[tbId] ? (itemObj[tbId]+vo.num) : vo.num;
            }
            let clientAddGems1 = commonData['clientAddGemsByModifyNum'] || {};
            if(Object.keys(clientAddGems1).length > 0) {
                for(let tbId in clientAddGems1){
                    let num = clientAddGems1[tbId];
                    itemObj[tbId] = itemObj[tbId] ? (itemObj[tbId]+num) : num;
                }
            }
            let clientAddGems2 = commonData['clientAddGemsByModifyGems'] || {};
            if(Object.keys(clientAddGems2).length > 0) {
                for(let tbId in clientAddGems2){
                    let num = clientAddGems2[tbId];
                    itemObj[tbId] = itemObj[tbId] ? (itemObj[tbId]+num) : num;
                }
            }
            let itemList : ItemVo[] = [];
            for(let tbId in itemObj) {
                let vo = new ItemVo(Number(tbId),itemObj[tbId]);
                vo.show = false;
                itemList.push(vo)
            }
            return itemList;
        }
    }

    export interface TbCompoundObj {
        ID : number;    // 合成表的ID
        obtainId : number;      // 合成的材料ID
        obtainNum : number;     // 合成的数量
        materialId : number;    // 所需材料ID
        materialNum : number;   // 所需材料数量
        gemType : number;       // 合成的宝石类型
        gemLv : number;         //　合成的宝石等级

        clinetNum : number;
    }
}