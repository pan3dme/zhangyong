/*
 * @Author: HuangGuoYong 
 * @Date: 2018-09-28 14:50:35 
 * @Last Modified by: HuangGuoYong
 * @Last Modified time: 2019-04-02 20:40:49
 */

module game {
    export class TaskProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "TaskProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TaskEvent(TaskEvent.SHOW_TASK_VIEW),
                new TaskEvent(TaskEvent.SHOW_DETAIL_ACHIEVEMENT),

                new TaskEvent(TaskEvent.TASK_GOTO),
                new TaskEvent(TaskEvent.DAILY_TASK_GOTO),
                new TaskEvent(TaskEvent.TRIAL_TASK_GO),
                new TaskEvent(TaskEvent.RECEIVE_TASK_REWARD),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof TaskEvent) {
                switch ($event.type) {
                    case TaskEvent.SHOW_TASK_VIEW:
                        this.showUI($event.data);
                        break;
                    case TaskEvent.SHOW_DETAIL_ACHIEVEMENT:
                        this.showDetailUI($event.data);
                        break;
                    case TaskEvent.TASK_GOTO:
                        this.goto($event.data);
                        break;
                    case TaskEvent.RECEIVE_TASK_REWARD:
                        this.receiveTaskReward($event.data);
                        break;
                    case TaskEvent.DAILY_TASK_GOTO:
                        this.gotoDaily($event.data);
                        break;
                    case TaskEvent.TRIAL_TASK_GO:
                        this.gotoTrial($event.data);
                        break;
                }
            }

        }

        /** 展示成就任务界面 */
        private showUI(index:number=0):void {
            UIMgr.showUI(UIConst.TaskView,index ? index : 0);
        }

        /** 展示详细任务界面 */
        private showDetailUI(data:TaskVo):void {
            UIMgr.showUI(UIConst.ChallengeDetailView,data);
        }

        /** 跳转 */
        private goto(tbTask:tb.TB_task):void {
            logdebug('任务界面跳转:',tbTask.link);
            dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW,tbTask.link));
        }

        /** 日常任务界面跳转 */
        private gotoDaily(tbDaily:tb.TB_daily):void {
            logdebug('日常任务界面跳转:',tbDaily.link);
            dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW,tbDaily.link));
        }
        /** 试炼任务界面跳转 */
        private gotoTrial(info:TrialTaskVo):void {
            logdebug('试炼任务界面跳转:',info.tbData.link);
            dispatchEvt(new HudEvent(HudEvent.SHOW_MODULE_VIEW,info.tbData.link));
        }
        
        /** 领取任务奖励 */
        private receiveTaskReward(vo:TaskVo):void {
            if(vo.isCanReward()) {
                var args = {};
                args[Protocol.game_task_getTaskAward.args.taskId] = vo.tbTask.ID;
                PLC.request(Protocol.game_task_getTaskAward, args, ($data: any) => {
                    if (!$data) return;
                    if(UIMgr.hasStage(UIConst.TaskView)){
                        let achiUI : TaskView = UIMgr.getUIByName(UIConst.TaskView);
                        achiUI.refreshTaskList();
                    }
                    if(UIMgr.hasStage(UIConst.BianQiangView)){
                        let bianqiangui : BianQiangView = UIMgr.getUIByName(UIConst.BianQiangView);
                        bianqiangui.resetTaskList();
                    }
                    if($data && $data.commonData){
                        UIUtil.showRewardView($data.commonData);
                    }
                    dispatchEvt(new TaskEvent(TaskEvent.REWARD_TASK_SUCCESS));
                });
            }
        }
    }
}