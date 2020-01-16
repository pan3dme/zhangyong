module game {

    export enum GodSkinType {
        origin = 0,     // 初始
        awaken = -1,    // 觉醒默认
    }

    /** 皮肤数据 */
    export class GodSkinVo {
        tbGod : tb.TB_god;
        skinId : number = 0;        // 付费皮肤id
        tbSkin : tb.TB_skin;

        public costVo : ItemVo;
        constructor(tbGod:tb.TB_god,skinId:number){
            this.tbGod = tbGod;
            this.skinId = skinId
            if(skinId > 0) {
                this.tbSkin = tb.TB_skin.getTbById(skinId);
                this.costVo = this.tbSkin.item && this.tbSkin.item.length > 0 ? new ItemVo(this.tbSkin.item[0],this.tbSkin.item[1]) : null;
            }
        }
        /** 获取名称 */
        getName():string {
            if( this.skinId == GodSkinType.origin ) return LanMgr.getLan("",12218);
            if( this.skinId == GodSkinType.awaken ) return LanMgr.getLan("",12219);
            return this.tbSkin ? this.tbSkin.name : LanMgr.getLan("",12230);
        }
        getName2():string {
            if( this.skinId == GodSkinType.origin || this.skinId == GodSkinType.awaken) return this.tbGod.name;
            return this.tbSkin ? this.tbSkin.name : LanMgr.getLan("",12230);
        }
        /** 获取标题 */
        getTitle():string {
            if( this.skinId == GodSkinType.origin ) return `${this.tbGod.name}(${LanMgr.getLan("",12218)})`;
            if( this.skinId == GodSkinType.awaken ) return `${this.tbGod.name}(${LanMgr.getLan("",12219)})`;
            return this.tbSkin ? `${this.tbGod.name}(${this.tbSkin.name})` : `${this.tbGod.name}(${LanMgr.getLan("",12230)})`;
        }
        /** 解锁条件 */
        getCondition(ingoreOrigin:boolean=true):string {
            if (this.skinId == GodSkinType.origin) {
                return ingoreOrigin ? LanMgr.getLan("",12218) : LanMgr.getLan("",12364,this.tbGod.name);
            } else if (this.skinId == GodSkinType.awaken) {
                return LanMgr.getLan("",12361,tb.TB_god_set.get_TB_god_set().awake_section);
            }
            // 付费
            let isNeedCost: boolean = this.isNeedCost();
            let item = isNeedCost ? tb.TB_item.get_TB_itemById(this.costVo.id) : null;
            return item ? LanMgr.getLan("",12363,item.name) : LanMgr.getLan("",12362);
        }
        /** 获取背景皮肤 */
        getBgSkin():string {
            if( this.skinId == GodSkinType.origin ) return "shizhuang/chushi.png";
            if( this.skinId == GodSkinType.awaken ) return "shizhuang/xiyou.png";
            return "shizhuang/chuanshuo.png";
        }
        /** 获取模型ID */
        getModelId():number {
            if( this.skinId == GodSkinType.origin ) return this.tbGod.model;
            if( this.skinId == GodSkinType.awaken ) return this.tbGod.awake_model;
            return this.tbSkin ? this.tbSkin.model : 0;
        }

        /** 是否激活 是否忽略英雄是否获得*/
        isActivity(awakenLv:number,ingoreOrigin:boolean=true):boolean {
            if( this.skinId == GodSkinType.origin ) {
                return ingoreOrigin ? true : GodUtils.isActiveGod(this.tbGod.ID);
            }
            if( this.skinId == GodSkinType.awaken && awakenLv >= tb.TB_god_set.get_TB_god_set().awake_section ) return true;
            return App.hero.skinIds.indexOf(this.skinId) != -1;
        }

        /** 是否可以激活 */
        isCanActivity():boolean {
            return this.isNeedCost() && !this.isActivity(0) ? App.isEnough(this.costVo.id,this.costVo.count) : false;
        }

        /** 是否穿戴 */
        isWear(skinId:number):boolean {
            return skinId == this.skinId;
        }

        /** 是否需要消耗 */
        isNeedCost():boolean {
            return this.costVo ? true : false;
        }
        /** 是否特殊皮肤 */
        isSpecialSkin():boolean {
            return this.tbSkin ? true : false;
        }

        private _attrStrAry : Array<Array<string>>;
        getTbAttrStrAry(): Array<Array<string>> {
            if(!this.tbSkin) return null;
            if(!this._attrStrAry) {
                this._attrStrAry = [];
                let arrAttstr = LanMgr.attrName;
                let showPercent = [iface.tb_prop.attrTypeKey.effectHit,iface.tb_prop.attrTypeKey.effectResist,iface.tb_prop.attrTypeKey.crit,iface.tb_prop.attrTypeKey.dizzy,
                                    iface.tb_prop.attrTypeKey.critDmg,iface.tb_prop.attrTypeKey.healRate,iface.tb_prop.attrTypeKey.addDmg,iface.tb_prop.attrTypeKey.subDmg];
                let attrAry : any[] = this.tbSkin.getAttr();
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
                this._attrStrAry = arrAttr;
            }
            return this._attrStrAry;
        }
    }
}