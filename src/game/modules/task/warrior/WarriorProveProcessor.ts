
module game {
    export class WarriorProveProcessor extends tl3d.Processor {

        private _model : WarriorProveModel;
        constructor() {
            super();
            this._model = WarriorProveModel.getInstance();
        }

        public getName(): string {
            return "WarriorProveProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TaskEvent(TaskEvent.SHOW_WARRIOR_BUY_LEVEL),
                new TaskEvent(TaskEvent.SHOW_WARRIOR_JINJIE),
                new TaskEvent(TaskEvent.TO_REWARD_LEVEL),
                new TaskEvent(TaskEvent.TO_REWARD_TRAIL_TASK),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof TaskEvent) {
                switch (event.type) {
                    case TaskEvent.SHOW_WARRIOR_BUY_LEVEL:
                        this.showBuyLevel();
                        break;
                    case TaskEvent.SHOW_WARRIOR_JINJIE:
                        this.showJinjie();
                        break;
                    case TaskEvent.TO_REWARD_LEVEL:
                        this.rewardLevel(event.data);
                        break;
                    case TaskEvent.TO_REWARD_TRAIL_TASK:
                        this.rewardTrialTask(event.data);
                        break;
                }
            }
        }

        /** 展示勇者等级购买界面 */
        private showBuyLevel():void {
            let model = this._model;
            if(model.isMaxLevel()){
                showToast(LanMgr.getLan('', 10457));
                return;
            }
            UIMgr.showUI(UIConst.WarriorBuyLevelView);
        }

        /** 展示勇者进阶解锁界面 */
        private showJinjie():void {
            let model = this._model;
            if(model.isUnlockJinjie()){
                showToast(LanMgr.getLan('', 10456));
                return;
            }
            UIMgr.showUI(UIConst.WarriorJinjieView);
        }

        /** 领取等级奖励 */
        private rewardLevel(item:WarriorIR):void {
            if(!item || !item.dataSource) return;
            let info = item.dataSource;
            if(!info.isFinish()) {
                showToast(LanMgr.getLan('', 10459));
                return;
            }
            if(info.isHasRewardCommon() && info.isHasRewardJinjie()) {
                showToast(LanMgr.getLan('', 10460));
                return;
            }
            let model = this._model;
            let isUnlockJinjie = model.isUnlockJinjie();
            // 解锁进阶后，领取奖励需要一次性领取
            if(isUnlockJinjie && info.isCanRewardJinjie()){
                // 领取进阶奖励时，如果普通奖励未领取会一起领取了
                let args = {};
                args[Protocol.game_task_getWarriorAdvanceAward.args.id] = info.tbData.ID;
                PLC.request(Protocol.game_task_getWarriorAdvanceAward, args, (data: any) => {
                    if (!data) return;
                    model.updateAwardState(data);
                    dispatchEvt(new TaskEvent(TaskEvent.REWARD_LEVEL_SUCC));
                    item.refreshView();
                    if(data && data.commonData){
                        UIUtil.showRewardView(data.commonData);
                    }
                });
            }else{
                if(info.isCanRewardCommon()) {
                    let args = {};
                    args[Protocol.game_task_getWarriorLevelAward.args.id] = info.tbData.ID;
                    PLC.request(Protocol.game_task_getWarriorLevelAward, args, (data: any) => {
                        if (!data) return;
                        model.updateAwardState(data);
                        dispatchEvt(new TaskEvent(TaskEvent.REWARD_LEVEL_SUCC));
                        item.refreshView();
                        if(data && data.commonData){
                            UIUtil.showRewardView(data.commonData);
                        }
                    });
                }else{
                    // 未解锁进阶
                    if(!isUnlockJinjie){
                        showToast(LanMgr.getLan('', 10461));
                        this.showJinjie();
                        return;
                    }
                }
            }
        }
        
        /** 领取试炼任务奖励 */
        private rewardTrialTask(info:TrialTaskVo):void {
            if(!info.isFinish()) {
                dispatchEvt(new TaskEvent(TaskEvent.TRIAL_TASK_GO,info));
                return;
            }
            if(info.isReward()) {
                showToast(LanMgr.getLan('', 10033));
                return;
            }
            let isWeek = info.isWeek;
			if(isWeek) {
				let args = {};
                args[Protocol.game_task_getWarriorWeekReward.args.id] = info.tbData.ID;
				PLC.request(Protocol.game_task_getWarriorWeekReward, args, (data: any) => {
					if (!data) return;
                    TrialTaskModel.getInstance().modifyReward(data['modifyWarriorWeekReward'],true);
                    let clientAddItemVoList = [];
                    clientAddItemVoList.push(new ItemVo(CostTypeKey.warrior_prove,info.tbData.obtain_exp));
					UIUtil.showRewardView({clientAddItemVoList});
                    this.updateTaskTabView(TaskTabType.trial);
				});
			}else{
                let args = {};
                args[Protocol.game_task_getWarriorMonthReward.args.id] = info.tbData.ID;
				PLC.request(Protocol.game_task_getWarriorMonthReward, args, (data: any) => {
					if (!data) return;
                    TrialTaskModel.getInstance().modifyReward(data['modifyWarriorMonthReward'],false);
                    let clientAddItemVoList = [];
                    clientAddItemVoList.push(new ItemVo(CostTypeKey.warrior_prove,info.tbData.obtain_exp));
					UIUtil.showRewardView({clientAddItemVoList});
                    this.updateTaskTabView(TaskTabType.trial);
				});
            }
        }

        /** 更新界面 */
        private updateTaskTabView(type:number):void {
            if(!UIMgr.hasStage(UIConst.TaskView)) return;
            let view = UIMgr.getUIByName(UIConst.TaskView) as TaskView;
            view.onRefreshTask();
        }
        
    }
}