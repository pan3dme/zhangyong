/*
 * @Author: HuangGuoYong 
 * @Date: 2018-09-29 17:35:55 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-18 18:50:22
 */



module game {
    export class DailyTaskProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "DailyTaskProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TaskEvent(TaskEvent.CLICK_DAILY_TASK),
                new TaskEvent(TaskEvent.REWARD_LIVENESS),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof TaskEvent) {
                switch (event.type) {
                    case TaskEvent.CLICK_DAILY_TASK:
                        this.onClickDailyTask(event.data);
                        break;
                    case TaskEvent.REWARD_LIVENESS:
                        this.rewardLiveness(event.data);
                        break;
                }
            }
        }

        /** 日常任务：领取、前往 */
        private onClickDailyTask(dailyTask:DailyTaskVo):void {
            if(dailyTask.isReward()) return;
            let tbTask = dailyTask.tbTask;
            if(dailyTask.isFinish()){
                let args = {};
                args[Protocol.game_task_getDailyAward.args.dailyId] = tbTask.ID;
                PLC.request(Protocol.game_task_getDailyAward, args, ($data: any) => {
                    if (!$data) return;
                    App.hero.updateDailyLivess($data);
                    if(UIMgr.hasStage(UIConst.TaskView)){
                        let viewe = this.taskView;
                        viewe.refreshTaskList();
                    }
                    if($data && $data.commonData){
                        UIUtil.showRewardView($data.commonData);
                    }
                });
            }else {
                dispatchEvt(new TaskEvent(TaskEvent.DAILY_TASK_GOTO,tbTask));
            }
        }

        /** 领取活跃度奖励 */
        private rewardLiveness(livenessData:DailyLivenessData):void {
            let args = {};
            args[Protocol.game_task_getLivenessChest.args.chestId] = livenessData.tbLiveness.ID;
            PLC.request(Protocol.game_task_getLivenessChest, args, ($data: any) => {
                if (!$data) return;
                if(UIMgr.hasStage(UIConst.TaskView)){
                    let view = this.taskView;
                    view.refreshLiveness();
                }
                if($data) {
                    UIUtil.showRewardView($data.commonData);
                }
            });
        }

        get taskView():TaskView {
            return UIMgr.getUIByName(UIConst.TaskView);
        }
        
    }
}