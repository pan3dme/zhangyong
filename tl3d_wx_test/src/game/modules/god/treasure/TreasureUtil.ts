module game {

    export class TreasureUtil {


        /**
		 * 创建一个圣物对象
		 * @param uuid 唯一索引
		 * @param solt 槽位、类型
		 */
		static createTreasureVo(uuid,svo:any,slot?:number): TreasureItemVo {
            let parseObj = JSON.parse(JSON.stringify(svo));
			let vo: TreasureItemVo = new TreasureItemVo(parseObj);
			vo.uuid = uuid;
			if(slot) {
				vo.slot = slot;
			}
			return vo;
		}

        /**
         * 获取界面属性字符串 : 强化与升星
         */
        static getTbAttrStrAry(tbData:tb.TB_treasure|tb.TB_treasure_star): Array<Array<string>> {
            if(!tbData) return [];
            let arrAttstr = LanMgr.attrName;
            let showPercent = [iface.tb_prop.attrTypeKey.effectHit,iface.tb_prop.attrTypeKey.effectResist,iface.tb_prop.attrTypeKey.crit,
                                iface.tb_prop.attrTypeKey.critDmg,
                                iface.tb_prop.attrTypeKey.effectResist,
                                iface.tb_prop.attrTypeKey.suckBlood,
                                iface.tb_prop.attrTypeKey.strikeBack,
                                iface.tb_prop.attrTypeKey.rampage,
                                iface.tb_prop.attrTypeKey.dizzy,
                                iface.tb_prop.attrTypeKey.healRate,
                                iface.tb_prop.attrTypeKey.addDmg,iface.tb_prop.attrTypeKey.subDmg,iface.tb_prop.attrTypeKey.immuDizzy];
            let attrAry : any[] = tbData.getAttr();
            let fixedObj = attrAry[0] || {};
            let percentObj = attrAry[1] || {};
            let arrAttr: Array<Array<string>> = [];
            for (let i in fixedObj) {
                let peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
                let str = showPercent.indexOf(Number(i)) != -1 ? `+${Math.round(fixedObj[i] * 10000)/100}%` : `+${fixedObj[i]}`;
                arrAttr.push([peoprety,str]);
            }
            for (let i in percentObj) {
                let peoprety = LanMgr.getLan(arrAttstr[Number(i)], -1);
                let str = `+${Math.round(percentObj[i] * 10000)/100}%`;
                arrAttr.push([peoprety,str]);
            }
            return arrAttr;
        }
        /**获得强化等级属性 */
        static getTbStrengthAttr(quality:number,slot:number,strengthLv: number): Array<Object> {
            let tbData = tb.TB_treasure.getTbItem(quality,slot,strengthLv);
            return tbData ? tbData.getAttr() : [{},{}];
        }
        /** 获得精炼等级属性 */
        static getTbStarAttr(quality:number,slot:number,starLv: number): Array<Object> {
            let tbData = tb.TB_treasure_star.getTbItem(quality,slot,starLv);
            return tbData ? tbData.getAttr() : [{},{}];
        }

        /**
         * 筛选圣物 可供选择的圣物列表 因为升星的材料圣物不会是低等级,都是不可叠加的，所以不用判断数量
         * @param tbVo 所需材料
         * @param curTreasure 当前圣物
         * @param ignores 互斥需忽略,如多个材料，前面已选择的后面要忽略
         */
		static filterTreasures(tbVo:TreasureMaterialTbVo,curTreasure:TreasureItemVo, ignores?:ChooseTreasureMaterialVo[],sortType?:number): Array<TreasureItemVo> {
			let treasures = TreasureModel.getInstance().getTreasures();
            treasures = treasures.filter((vo)=>{
                return !vo.isExsitGod();
            });
			// 筛选可用圣物
			let tempGods: TreasureItemVo[] = [];
			if (tbVo.type == TreasureConfigType.item) {
				// 指定圣物
				for (let i = 0; i < treasures.length; i++) {
                    if(curTreasure && treasures[i].uuid == curTreasure.uuid) continue;
					if ( treasures[i].templateId == tbVo.itemId && treasures[i].starLv == tbVo.starLv ) {
						tempGods.push(treasures[i]);
					}
				}
			} else if(tbVo.type == TreasureConfigType.quality){
				// 指定品质
				for (let i = 0; i < treasures.length; i++) {
                    if(curTreasure && treasures[i].uuid == curTreasure.uuid) continue;
					if ( treasures[i].starLv == tbVo.starLv && (tbVo.quality == 0 || treasures[i].quality == tbVo.quality ) ) {
						tempGods.push(treasures[i]);
					}
				}
			}
            // 其他格子的圣物删掉
			ignores = ignores || [];
			for(let info of ignores){
                let index = tempGods.findIndex((vo)=>{
                    return vo.uuid == info.id;
                });
                if(index!=-1){
                    tempGods.splice(index,1);
                }
			}
            // 是否排序
            if(sortType > 0) {
                tempGods.sort((a,b)=>{
                    return a.strengthLv - b.strengthLv;
                });
            }
			return [...tempGods];
		}

        /** 是否有未穿戴装备 */
        static hasNotWearTreasures():boolean {
            let obj = App.hero.treasures;
            for(let key in obj){
                if(!obj[key].godId) {
                    return true;
                }
            }
            return false;
        }
        /** 获取星级名称 */
        static getStarName(starLv:number):string {
            return LanMgr.starName[starLv] || LanMgr.getLan("",12230);
        }
        /** 是否有可重生的圣物 养成过的紫色品质以上且没被穿戴的圣物*/
        static hasCanRebirthTreasure():boolean {
            let obj = App.hero.treasures;
            for(let key in obj){
                let vo = obj[key];
                if(!vo.godId && vo.quality > QualityConst.PURPLE && (vo.strengthLv > 0 || vo.starLv > 0)) {
                    return true;
                }
            }
            return false;
        }
    }
}