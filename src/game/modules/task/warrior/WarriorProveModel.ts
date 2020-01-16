
module game {

    export class WarriorProveModel {

        constructor() {

        }
        private static _instance: WarriorProveModel;
        public static getInstance(): WarriorProveModel {
            if (!this._instance) {
                this._instance = new WarriorProveModel();
            }
            return this._instance;
        }
        /**每天重置,就不用考虑跨周跨月重置 */
        resetDataByCrossDay(resetData:any):void {
            this.initModel();
            UIMgr.hideUIByName(UIConst.WarriorBuyLevelView);
            UIMgr.hideUIByName(UIConst.WarriorJinjieView);
        }

        /** 当前期数 */
        public curTabCycle : tb.TB_warrior_cycle;
        /** 等级列表 -- 注意:不再对该列直接排序，默认等级排序 */
        private _levelList : WarriorProveVo[] = [];
        public maxLevel : number;   //  当前期数最大等级
        public startTime : number;  // 赛季开始时间:秒
        public endTime : number;    // 赛季结束时间:秒
        initModel():void {
            let date = new Date(App.serverTime);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            this.curTabCycle = tb.TB_warrior_cycle.getList().find((vo)=>{
                return vo.time == (year * 100 + month);
            });
            // 每天重置一次,不用考虑跨周或者跨月
            for(let vo of this._levelList){
                vo.clear();
                Laya.Pool.recover("WarriorProveVo",vo);
            }
            this._levelList.length = 0;
            this.maxLevel = 0;
            this.startTime = 0;
            this.endTime = 0;
            if(this.curTabCycle) {
                let year = Math.floor(this.curTabCycle.time / 100);
                let month = this.curTabCycle.time % 100;
                // 当月1号0点
                let startDate = new Date(year,month-1,1,0,0,0,0);
                this.startTime = startDate.getTime()/1000;
                // 下月1号0点
                let endDate = new Date(year,month,1,0,0,0,0);
                this.endTime = endDate.getTime()/1000;

                // 获取当前期数的勇者之证列表
                let curCycle = this.curTabCycle.ID;
                let tbList : tb.TB_warrior_prove[] = tb.TB_warrior_prove.getList().filter((tbVo)=>{
                    return tbVo.cycle == curCycle;
                });
                tbList.sort((a,b)=>{
                    return a.level - b.level;
                });
                // 最高级别
                tbList.forEach((tbVo)=>{
                    if(tbVo.level > this.maxLevel){
                        this.maxLevel = tbVo.level;
                    }
                });
                let cycleList = tb.TB_warrior_cycle.getList();
                for(let i = 0 ; i < tbList.length ; i++){
                    let team = Laya.Pool.getItemByClass("WarriorProveVo",WarriorProveVo) as WarriorProveVo;
                    team.setTbData(tbList[i]);
                    this._levelList.push(team);
                }
            }
            TrialTaskModel.getInstance().initModel();
        }

        /** 更新领取状态 */
        updateAwardState(data:any):void {
            if(data.hasOwnProperty("modifyWarriorLevelAward")) {
                App.hero.tasks.warriorLevelAwards.push(data['modifyWarriorLevelAward']);
            }
            if(data.hasOwnProperty("modifyWarriorAdvanceAward")) {
                App.hero.tasks.warriorAdvanceAwards.push(data['modifyWarriorAdvanceAward']);
            }
        }

        /** 勇者之证是否开启 开服七天*/
        isOpen():boolean {
            if(!HudModel.isHudShow(ModuleConst.WARRIOR_PROVE)) {
				return false;
			}
            return App.IsSysOpen(ModuleConst.WARRIOR_PROVE) && this.isInCycle() && App.serverTimeSecond >= (App.getOpenServerTime() + 7*TimeConst.ONE_DAY_SEC);
        }
        /** 是否在赛季中 */
        isInCycle():boolean {
            return this.curTabCycle ? true : false;
        }

        /** 获取勇者之证列表 */
        getWarriorList():WarriorProveVo[] {
            return this._levelList;
        }
        /** 获取勇者对象 */
        getWarriorVoByLv(lv:number):WarriorProveVo {
            return this._levelList.find((vo)=>{
                return vo.tbData.level == lv;
            });
        }

        /** 获取活动时间 */
        getTimeStr():string {
            if(!this.curTabCycle) return "";
            let startDate = new Date(this.startTime*1000);
            let endDate = new Date(this.endTime*1000-1);
            let month = startDate.getMonth() + 1;
            return LanMgr.getLan("",12135,month,startDate.getDate(),month,endDate.getDate());
        }

        /** 获取当前等级数据:为空表示0级 */
        public getCurTbLevel():WarriorProveVo {
            let lv = App.hero.tasks.warriorLevel;
            return lv > 0 ?this._levelList.find((vo)=>{
                return vo.tbData.level == lv;
            }) : null;
        }

        /** 是否可领取 -- 勇者之证 */
        isCanReward():boolean {
            if(!this.isOpen()) return false;
            return this._levelList.some((vo)=>{
                return vo.isCanReward();
            });
        }
        /** 是否可领取每周礼包 */
        isCanRewardGift():boolean{
            if(!this.isOpen()) return false;
            return this.isUnlockJinjie() && !this.isRewardWeekGift();
        }


        /** 是否已经最高等级 */
        isMaxLevel():boolean {
            return App.hero.tasks.warriorLevel >= this.maxLevel;
        }
        /** 是否解锁进阶 */
        isUnlockJinjie():boolean {
            return App.hero.tasks.warriorAdvance == 1;
        }
        /** 是否领取了某等级的普通奖励 */
        isRewardCommon(level:number):boolean {
            return App.hero.tasks.warriorLevelAwards.indexOf(level) != -1;
        }
        /** 是否领取了某等级的进阶奖励 */
        isRewardJinjie(level:number):boolean {
            return App.hero.tasks.warriorAdvanceAwards.indexOf(level) != -1;
        }
        /** 是否领取了每周积分礼包 */
        isRewardWeekGift():boolean {
            return App.hero.tasks.warriorWeekAward == 1;
        }
    }
}