
module game {
    export enum GemstoneType {
        shengming = 1,   // 生命
        gongji = 2,      // 攻击
        fangyu = 3,      // 防御
    }

	export class GemstoneModel {

		private static _instance: GemstoneModel;
		public static getInstance(): GemstoneModel {
			if (!GemstoneModel._instance) {
				GemstoneModel._instance = new GemstoneModel();
			}
			return GemstoneModel._instance;
		}
		constructor() {
		}
        /** 宝石种类数量 */
        public static gemstone_type_count : number = 3;
        /** 最大等级 */
        public static max_gem_lv : number = 8;

        // ---------------------  宝石数据增删改查  ---------------------
        /** 拥有的宝石 */
        private _gemstoneList : GemstoneItemVo[] = [];
        initData():void {
            this._gemstoneList.length = 0;
            for(let uuid in App.hero.gemstones){
                let vo = GemstoneUtils.createGemstoneVo(uuid,App.hero.gemstones[uuid]);
                this._gemstoneList.push(vo);
            }
            dispatchEvt(new GemstoneEvent(GemstoneEvent.INIT_GEM_DATA));
        }
        /** 新增宝石 {key:value}*/
        public addGemstones(addGemstones:any):void {
            let ary = [];
            for(let uuid in addGemstones){
                ary.push(uuid);
                App.hero.gemstones[uuid] = addGemstones[uuid];
                let vo = GemstoneUtils.createGemstoneVo(uuid,addGemstones[uuid]);
                this._gemstoneList.push(vo);
            }
            game.BagModel.getInstance().updateGemstones();
            dispatchEvt(new GemstoneEvent(GemstoneEvent.ADD_GEMTONE),ary);
        }
        /** 删除宝石 {key:value}*/
        public delGemstone(delGemstones:any):void {
            let delUuid : string[] = [];
            for(let uuid in delGemstones){
                App.hero.gemstones[uuid] = null;
                delete App.hero.gemstones[uuid];
                delUuid.push(uuid);
            }
            let len = this._gemstoneList.length ;
            for(let i = len - 1; i >= 0 ; i--){
                let uuid = this._gemstoneList[i].uuid;
                if(delUuid.indexOf(uuid) != -1){
                    this._gemstoneList.splice(i,1);
                }
            }
            game.BagModel.getInstance().updateGemstones();
            dispatchEvt(new GemstoneEvent(GemstoneEvent.DEL_GEMTONE),delUuid);
        }
        /** 更新宝石 : 更新宝石的数量 */
        public modifyNum(commonData:any,modifyGemstoneNum:any):void {
            //增量的宝石数据,客户端计算
            let clientAddGems = {};
            let ary : string[] = [];
            for (let uuid in modifyGemstoneNum) {
                let oldNum = App.hero.gemstones[uuid].num;
                let newNum = modifyGemstoneNum[uuid];
                if(newNum > oldNum) {
                    let tbId = App.hero.gemstones[uuid].templateId;
                    let addNum = newNum - oldNum;
                    clientAddGems[tbId] = clientAddGems[tbId] ? (clientAddGems[tbId]+addNum) : addNum;
                }
                App.hero.gemstones[uuid].num = newNum;
                let gemstoneVo = this.getGemstoneByUuid(uuid);
                gemstoneVo.num = newNum;
                ary.push(uuid);
            }
            commonData['clientAddGemsByModifyNum'] = clientAddGems;
            dispatchEvt(new GemstoneEvent(GemstoneEvent.MODIFY_GEMTONE),ary);
        }
        /** 更新宝石 : 更新宝石的神灵ID */
        public modifyGemstones(commonData:any,modifyGemstones:any):void {
            //增量的宝石数据,客户端计算
            let clientAddGems = {};
            let ary : string[] = [];
            for (let uuid in modifyGemstones) {
                let serverGems = App.hero.gemstones[uuid];
                let newGodId = modifyGemstones[uuid];
                // 从神灵身上脱下来
                if(serverGems.godId && !newGodId) {
                    clientAddGems[serverGems.templateId] = clientAddGems[serverGems.templateId] ? (clientAddGems[serverGems.templateId]+1) : 1;
                }
                serverGems.godId = newGodId;
                let gemstoneVo = this.getGemstoneByUuid(uuid);
                gemstoneVo.godId = newGodId;
                ary.push(uuid);
            }
            commonData['clientAddGemsByModifyGems'] = clientAddGems;
            game.BagModel.getInstance().updateGemstones();
            dispatchEvt(new GemstoneEvent(GemstoneEvent.MODIFY_GEMTONE),ary);
        }
        /** 更新神灵镶嵌的宝石 */
        public modifyGodGemstones(modifyGodGemstones:any):void {
            let godUuids = [];
            for(let uuid in modifyGodGemstones){
                godUuids.push(uuid);
                let godObj = App.hero.gods[uuid];
                if(godObj) {
                    godObj.gemInfo = modifyGodGemstones[uuid];
                }
                let godVo = App.hero.getGodVoById(uuid);
                if(godVo){
                    godVo.setgemInfo(modifyGodGemstones[uuid]);
                }
            }
            dispatchEvt(new GemstoneEvent(GemstoneEvent.MODIFY_GOD_GEMTONE),godUuids);
        }
        
        /** 获取宝石通过唯一ID */
        public getGemstoneByUuid(uuid:string):GemstoneItemVo {
            return this._gemstoneList.find((vo)=>{
                return vo.uuid == uuid;
            });
        }

        /** 获取未镶嵌的宝石 通过道具表ID -- 因为已镶嵌的可能会多个,同种宝石镶嵌到多个神灵去*/
        public getGemstoneByTbID(tbid:number):GemstoneItemVo {
            return this._gemstoneList.find((vo)=>{
                return !vo.isExsitGod() && vo.templateId == tbid;
            });
        }
        /** 获取未镶嵌的宝石 通过宝石类型 */
        public getGemstoneByType(type:number):GemstoneItemVo {
            return this._gemstoneList.find((vo)=>{
                return !vo.isExsitGod() && vo.gemType == type;
            });
        }
        public getGemtones():GemstoneItemVo[] {
            return this._gemstoneList;
        }

        /** 是否有更换的宝石 */
        isHasBetterGem(type:number,curLv:number):boolean {
            return this._gemstoneList.some((vo)=>{
                return !vo.isExsitGod() && vo.gemType == type && vo.gemLv > curLv && vo.num > 0;
            });
        }

        // ---------------------  界面显示 ---------------------
        /** 获取替换界面的宝物列表 未镶嵌的宝石的某类宝石 */
        public getReplaceViewList(type:number,sort:boolean=false):GemstoneItemVo[] {
            let ary = this._gemstoneList.filter((vo)=>{
                return !vo.isExsitGod() && (type == 0 ? true : type == vo.gemType);
            });
            if(sort) {
                // 品质-》星级-》强化等级 ID从低到高
                ary.forEach((vo)=>{
                    vo.show = false;
                    vo.sortNum = vo.gemLv;
                });
                ary.sort((a,b)=>{
                    return b.sortNum - a.sortNum;
                });
            }
            return ary;
        }

        /** 获取合成列表 */
        public getCompoundViewList():GemstoneItemVo[] {
            let list = this._gemstoneList.filter((vo)=>{
                return !vo.isExsitGod();
            });
            list.sort((a,b)=>{
                return a.gemLv - b.gemLv;
            });
            return list;
        }
    }
}