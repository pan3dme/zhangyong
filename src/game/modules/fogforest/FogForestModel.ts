
module game {

    export class FogForestModel {
        public static AUTO_NEXXT_CD:number = 5;//5s
        constructor() {
            
        }
        private static _instance: FogForestModel;
        public static getInstance(): FogForestModel {
            if (!this._instance) {
                this._instance = new FogForestModel();
            }
            return this._instance;
        }
        /** 自动下一关 */
        public autoNext: boolean = true;
        /** 首次登录 */
        public firstLogin: boolean;
        /** 迷雾森林当前关卡 */
        public forestCurFloor: number;
        public maxTbFloor : number;
      
        initModel():void {
            this.firstLogin = true;
            /** 获取到迷雾森林表数据 */
            this._guanqiaList = [];
            let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_forest)).data;
			for(let key in tbData) {
				this._guanqiaList.push(new ForestGuanqiaVo(tbData[key]));
			}
            this.maxTbFloor = this._guanqiaList.length;
            this.initNum();
            dispatchEvt(new FogForestEvent(FogForestEvent.Init_FOREST));
        }

        initNum(){
            this.forestCurFloor = App.hero.forestCurFloor;
        }
        
        /** 当前关卡+1 */
        addForestCurFloor(): void {
            this.forestCurFloor += 1;
            dispatchEvt(new FogForestEvent(FogForestEvent.UPDATE_CUR_GUANQIA));
        }
        
        /** 所有关卡数据数组 */
        private _guanqiaList : ForestGuanqiaVo[] = [];
        getList():ForestGuanqiaVo[]{
            return this._guanqiaList;
        }

        /** 获取到当前的关卡列表 三个一组:  中间显示当前关卡 */
        getViewList():ForestGuanqiaVo[]{
            let startIdx = 0;
            if(this.forestCurFloor > 0){
                 // 通关层数的索引
                startIdx = this._guanqiaList.findIndex((vo)=>{
                    return vo.tbForest.ID == this.forestCurFloor;
                });
                // 当前可通关的索引
                startIdx = startIdx + 1;
            }
            // 打到最后几关
            if(startIdx >= this._guanqiaList.length - 1) {
                startIdx = this._guanqiaList.length - 2;
            }
            return this._guanqiaList.filter((vo,index)=>{
                if(startIdx == 0) {
                    return index == 0 || index == 1 || index == 2;
                }
                return index == startIdx || index == (startIdx+1) || index == (startIdx-1);
            });
        }
        
        /** 获取宝箱关卡 */
        getChestList(sort:boolean=false):ForestGuanqiaVo[]{
            let list = this._guanqiaList.filter((vo)=>{
                return vo.isHasBaoxiang();
            });
            list = [...list];
            if(sort){
                list.forEach((vo)=>{
                    vo.sortNum = vo.tbForest.ID;
                    if(vo.isCanReward()){
                        vo.sortNum -= 100000;
                    }else if(vo.isReward()){
                        vo.sortNum += 1000;
                    }else {
                        vo.sortNum -= 10000;
                    }
                })
                list.sort((a,b)=>{
                    return a.sortNum - b.sortNum;
                });
            }
            return list;
        }

        /** 获取特殊关卡 */
        getSpecialGuanqia():ForestGuanqiaVo {
            return this._guanqiaList.find((info)=>{
                return info.isSpecial() && !info.isPass() && !info.isReward();//特殊关卡并且没打过
            });
        }

        /** 是否全部通关(通关到玩家所打最高关卡) */
        isAllFinish():boolean {
            let len = this._guanqiaList.length;
            return len > 0 && this.forestCurFloor == this._guanqiaList[len-1].tbForest.ID;
        }

        /** 是否到达最大关卡(通关到副本所拥有的最大关卡) */
        isMaxFloor(): boolean {
            return this.forestCurFloor >= App.hero.forestMaxFloor;
        }

        /** 是否当前关卡 */
        isCurrent(id:number):boolean {
            let curIdx = this._guanqiaList.findIndex((vo)=>{
                return vo.tbForest.ID == this.forestCurFloor;
            });
            let findIdx = this._guanqiaList.findIndex((vo)=>{
                return vo.tbForest.ID == id;
            });
            return findIdx - curIdx == 1;
        }

        //红点规则
        /** 是否可一键扫荡 红点规则*/
        public isCanOneKeyPass():boolean {
            //判断是否完成
            if(!App.IsSysOpen(ModuleConst.FOG_FOREST) || this.isMaxFloor()) return false;
            //判断是否到达VIP开启条件
            return App.hero.levelPrivilege(iface.tb_prop.levelPrivilegeTypeKey.forest);
        }
        
        /** 是否有宝箱奖励可领取 红点规则*/
        public isCanReward():boolean {
            if(!App.IsSysOpen(ModuleConst.FOG_FOREST)) return false;
            return this.getChestList().some((vo)=>{
                return vo.isCanReward();
            });
        }

        /** (最大关卡的红点) */
        public isVisible(): boolean {
            if(!App.IsSysOpen(ModuleConst.FOG_FOREST)) return false;
            if(this.forestCurFloor < App.hero.forestMaxFloor) {
                return true;
            } else {
                return false;
            }
        }
    }
    
}