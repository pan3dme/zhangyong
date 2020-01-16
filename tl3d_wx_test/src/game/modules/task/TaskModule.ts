/*
 * @Author: HuangGuoYong 
 * @Date: 2018-09-28 14:50:47 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2018-11-22 14:40:26
 */

module game {
    export class TaskModule extends tl3d.Module {
        constructor() {
            super();
        }
        public getModuleName(): string {
            return "TaskModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new TaskProcessor(),new DailyTaskProcessor(),new WarriorProveProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister():void
        {
            TaskModel.getInstance().initModel();
            WarriorProveModel.getInstance().initModel();
        }
    }

    export class TaskEvent extends tl3d.BaseEvent {

        /** 领取任务奖励成功 */
        public static REWARD_TASK_SUCCESS : string = "REWARD_TASK_SUCCESS";

        /** 显示成就任务 */
        public static SHOW_TASK_VIEW : string = "SHOW_TASK_VIEW";
        /** 显示详细任务 */
        public static SHOW_DETAIL_ACHIEVEMENT : string = "SHOW_DETAIL_TASK";
        /** 更新成就 */
        public static UPDATE_ACHIEVEMENT_DATA : string = "UPDATE_ACHIEVEMENT_DATA";
        
        /** 更新限时任务 */
        public static UPDATE_LIMIT_TASK : string = "UPDATE_LIMIT_TASK";
        /** 显示日常任务ui */
        public static SHOW_DAILY_TASK : string = "SHOW_DAILY_TASK";
        /** 更新每日任务 */
        public static UPDATE_DAILY_TASK : string = "UPDATE_DAILY_TASK";
        /** 点击日常任务 */
        public static CLICK_DAILY_TASK : string = "CLICK_DAILY_TASK";
        /** 领取活跃奖励 */
        public static REWARD_LIVENESS : string = "REWARD_LIVENESS";
        /** 更新活跃任务数据 */
        public static UPDATE_LIVENESS_DATA : string = "UPDATE_LIVENESS_DATA";

        /** 任务跳转 */
        public static TASK_GOTO : string = "TASK_GOTO";
        /** 日常任务跳转 */
        public static DAILY_TASK_GOTO : string = "DAILY_TASK_GOTO";
        /** 试炼任务跳转 */
        public static TRIAL_TASK_GO : string = "TRIAL_TASK_GO";
        /** 领取任务奖励 */
        public static RECEIVE_TASK_REWARD : string = "RECEIVE_TASK_REWARD";


        // -------------- 勇者之证 --------------
        /** 展示勇者等级购买界面 */
        public static SHOW_WARRIOR_BUY_LEVEL : string = "SHOW_WARRIOR_BUY_LEVEL";
        /** 展示勇者进阶解锁界面 */
        public static SHOW_WARRIOR_JINJIE : string = "SHOW_WARRIOR_JINJIE";
        /** 去领取等级奖励 */
        public static TO_REWARD_LEVEL : string = "TO_REWARD_LEVEL";
        /** 去领取试炼任务奖励 */
        public static TO_REWARD_TRAIL_TASK : string = "REWARD_TRAIL_TASK";
        /** 成功领取等级奖励 */
        public static REWARD_LEVEL_SUCC : string = "REWARD_LEVEL_SUCC";
        /** 更新勇者之证积分 */
        public static UPDATE_WARRIOR_EXP : string = "UPDATE_WARRIOR_EXP";
        /** 更新试炼任务完成数量 */
        public static UPDATE_TRIAL_TASK_COUNT : string = "UPDATE_TRIAL_TASK_COUNT";
        /** 更新试炼任务领取状态 */
        public static UPDATE_TRIAL_TASK_REWARD : string = "UPDATE_TRIAL_TASK_REWARD";
        /** 成功解锁勇者进阶 */
        public static UNLOCK_WARRIOR_JINJIE_SUCC : string = "UNLOCK_WARRIOR_JINJIE_SUCC";
        /** 领取每周积分礼包成功 */
        public static REWARD_WEEK_GIFT_SUCC : string = "REWARD_WEEK_GIFT_SUCC";
        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }

    export interface ITaskVo {
        getName():string;
        getCount():number;
        getTotalNum():number;
        isReward():boolean;
        isFinish():boolean;
        isCanReward():boolean;
        getRewardList():inface.IItemData[];
        isExcuting():boolean;
    }
    /** 任务界面tab类型 */
    export enum TaskTabType {
        daily = 0,
        warrior = 1,
        trial = 2,
        achievement = 3
    }

    /** 服务端任务总数据格式 */
    export interface IServerTasksVo {
        curTasks: any;
        dailyTasks: any;
        doneChests: any[];     // 已领取的活跃度宝箱 [已领取宝箱ID1, ..., 已领取宝箱IDN]
        doneTasks: any[];
        liveness: number;
        guideStep: number;         //强引导步骤
        guideWeakStep: number[];   //弱引导步骤
        advanceLevel:number;        //进阶之路等级
        advanceInfos:any;//进阶之路信息

        warriorLevel : number;  // 勇者之证等级
        warriorExp : number;    // 勇者之证经验
        warriorAdvance : number;    // 勇者之证进阶奖励激活标识(0:未激活 1:激活)
        warriorWeekTasks : {[key:string]:IWarriorTaskSvo};   // 勇者之证周任务
        warriorMonthTasks : {[key:string]:IWarriorTaskSvo};   // 勇者之证月任务
        warriorLevelAwards : number[]; // 勇者之证等级奖励
        warriorAdvanceAwards : number[];   // 勇者之证进阶奖励
        warriorWeekAward : number;  // 勇者之证进阶每周奖励领取标识(0:未领取 1:已领取)
    }

    /** 服务端单个任务数据格式 */
    export interface IServerTaskVo {
        id: number;
        count: number;
        acceptTime?: number;
        done?: boolean;
    }

    export interface IWarriorTaskSvo {
        count : number;
        reward : number;
    }
}