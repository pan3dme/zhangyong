module game {

    /** 试炼任务 */
    export class TrialTaskModel {

        constructor() {

        }
        private static _instance: TrialTaskModel;
        public static getInstance(): TrialTaskModel {
            if (!this._instance) {
                this._instance = new TrialTaskModel();
            }
            return this._instance;
        }
        /** 周试炼开始时间 */
        public weekStartTime : number = 0;
        /** 周试炼结束时间 */
        public weekEndTime : number = 0;
        /** 月试炼开始时间 */
        public monthStartTime : number = 0;
        /** 月试炼开始时间 */
        public monthEndTime : number = 0;

        /** 周任务列表 */
        private _weekList : TrialTaskVo[] = [];
        /** 月任务列表 */
        private _monthList : TrialTaskVo[] = [];

        /** 初始化列表 -- 接在WarriorProveModel.initModel之后 */
        initModel():void {
            // 每天重置,就不用考虑跨周跨月重置
            for(let vo of this._weekList){
                vo.clear();
                Laya.Pool.recover("TrialTaskVo",vo);
            }
            this._weekList.length = 0;
            for(let vo of this._monthList){
                vo.clear();
                Laya.Pool.recover("TrialTaskVo",vo);
            }
            this._monthList.length = 0;
            this.weekStartTime = 0;
            this.weekEndTime = 0;
            this.monthStartTime = 0;
            this.monthEndTime = 0;
            let curTabCycle = WarriorProveModel.getInstance().curTabCycle;
            if(curTabCycle) {
                this.weekStartTime = GloryUtil.getFormatTime(1,0,0,0);
                this.weekEndTime =  GloryUtil.getFormatTime(7,23,59,59) + 1;
                this.monthStartTime = WarriorProveModel.getInstance().startTime;
                this.monthEndTime = WarriorProveModel.getInstance().endTime;
                // 周任务
                let weekList = tb.TB_week_trial.getList("cycle",curTabCycle.ID);
                for(let i = 0 ; i < weekList.length ; i++){
                    let team = Laya.Pool.getItemByClass("TrialTaskVo",TrialTaskVo) as TrialTaskVo;
                    team.setTbData(weekList[i],true);
                    this._weekList.push(team);
                }
                // 月任务
                let monthList = tb.TB_month_trial.getList("cycle",curTabCycle.ID);
                for(let i = 0 ; i < monthList.length ; i++){
                    let team = Laya.Pool.getItemByClass("TrialTaskVo",TrialTaskVo) as TrialTaskVo;
                    team.setTbData(monthList[i],false);
                    this._monthList.push(team);
                }
            }
        }

        /** 周任务列表 */
        getWeekList(sort:boolean=false):TrialTaskVo[] {
            let list = [...this._weekList];
            if(sort) {
                // 可领取、未完成、已领取排序
                list.forEach((vo)=>{
                    vo.sortNum = vo.isReward() ? (100000+vo.tbData.ID) : (!vo.isFinish() ? 10000+vo.tbData.ID : vo.tbData.ID);
                });
                list.sort((a,b)=>{
                    return a.sortNum - b.sortNum;
                });
            }
            return list;
        }
        /** 月任务列表 */
        getMonthList(sort:boolean=false):TrialTaskVo[] {
            let list = [...this._monthList];
            if(sort) {
                // 可领取、未完成、已领取排序
                list.forEach((vo)=>{
                    vo.sortNum = vo.isReward() ? (100000+vo.tbData.ID) : (!vo.isFinish() ? 10000+vo.tbData.ID : vo.tbData.ID);
                });
                list.sort((a,b)=>{
                    return a.sortNum - b.sortNum;
                });
            }
            return list;
        }

        /** 修改试炼任务奖励次数 */
        modifyReward(modifyObj:any,isWeek:boolean):void {
            let obj = modifyObj || {};
            for(let id in obj){
                if(isWeek) {
                    var weekTask=App.hero.tasks.warriorWeekTasks||{};
                    if(!weekTask[id]){
                        weekTask[id] = {count:0,reward:0};
                    }
                    weekTask[id].reward = obj[id];
                }else{
                    var monthTask=App.hero.tasks.warriorMonthTasks||{};
                    if(!monthTask[id]){
                        monthTask[id] = {count:0,reward:0};
                    }
                    monthTask[id].reward = obj[id];
                }
            }
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_TRIAL_TASK_REWARD));
        }
        /** 修改试炼任务完成次数 */
        modifyFinishNum(modifyObj:any,isWeek:boolean):void {
            let obj = modifyObj || {};
            for(let id in obj){
                if(isWeek){
                    var weekTasks=App.hero.tasks.warriorWeekTasks||{};
                    if(!weekTasks[id]) {
                        weekTasks[id] = {count:0,reward:0};
                    }
                    weekTasks[id].count = obj[id];
                }else{
                    var monthTask=App.hero.tasks.warriorMonthTasks||{};
                    if(!monthTask[id]) {
                        monthTask[id] = {count:0,reward:0};
                    }
                    monthTask[id].count = obj[id];
                }
            }
            dispatchEvt(new game.TaskEvent(game.TaskEvent.UPDATE_TRIAL_TASK_COUNT));
        }

        /** 是否可领取 */
        isCanReward(type:number):boolean {
            if(!WarriorProveModel.getInstance().isOpen()) return false;
            return type == 0 ? this._weekList.some( vo => vo.isCanReward()) : this._monthList.some( vo => vo.isCanReward());
        }


        /** 获取任务完成次数 */
        getFinishNum(id:number,isWeek:boolean):number {
            var weekTask=App.hero.tasks.warriorWeekTasks||{};
            var monthTask=App.hero.tasks.warriorMonthTasks||{};
            let obj = isWeek ? weekTask[id] : monthTask[id];
            return obj ? obj.count : 0;
        }
        /** 是否领取了任务奖励 */
        isReward(id:number,isWeek:boolean):boolean {
            var weekTask=App.hero.tasks.warriorWeekTasks||{};
            var monthTask=App.hero.tasks.warriorMonthTasks||{};
            let obj = isWeek ? weekTask[id] : monthTask[id];
            return obj ? obj.reward == 1 : false;
        }
        /** 是否已领取每周积分礼包奖励 */
        isRewardWeekGift():boolean {
            return App.hero.tasks.warriorWeekAward == 1;
        }
    }
}