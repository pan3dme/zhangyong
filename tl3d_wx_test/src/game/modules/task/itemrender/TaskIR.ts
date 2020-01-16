

module game {

    export class TaskIR extends ui.task.itemrender.TaskIRUI {
		constructor() {
			super();
            
		}

		public set dataSource($value) {
			this._dataSource = $value;
			this.refreshView();
		}

		public get dataSource():ITaskVo {
			return this._dataSource;
		}

		private refreshView() {
            let taskData : ITaskVo = this._dataSource;
			if (taskData) {
                this.lbTitle.text = taskData.getName();
                this.lbTitle.event(Laya.Event.RESIZE);
                this.lbProgress.text = `(${Snums(taskData.getCount())}/${Snums(taskData.getTotalNum())})`;
                this.lbNotice.visible = this.imgFinish.visible = this.lbDailyLvs.visible = false;
                this.btnOperate.visible = true;
                if(taskData instanceof TaskVo && taskData.tbTask.type == iface.tb_prop.taskTypeKey.achievement && taskData.tbTask.label == AchievementTabType.challenge){
                    // 挑战子任务（前置条件未完成显示完成上个任务）
                    this.btnOperate.visible = false;
                    if(taskData.isReward()){
                        this.imgFinish.visible = true;
                    }else{
                        this.lbNotice.visible = true;
                        this.lbNotice.text = (taskData.isExcuting() ? LanMgr.getLan("",12147) : LanMgr.getLan("",12148));
                        this.lbNotice.color = taskData.isExcuting() ? ColorConst.TASK_GREEN : ColorConst.TASK_ORANGE;
                    }
                }else if(taskData instanceof DailyTaskVo){
                    this.lbDailyLvs.visible = true;
                    this.lbDailyLvs.text = taskData.tbTask.liveness > 0 ? LanMgr.getLan("",12146,taskData.tbTask.liveness) : "";
                }
                if(taskData.isReward()){
                    this.btnOperate.label = LanMgr.getLan('',10043);
                    this.btnOperate.skin = SkinUtil.buttonNormal;
                    this.btnOperate.labelStrokeColor=ColorConst.ORANGE_FILTER;
                    this.btnOperate.disabled = true;
                    this.lbProgress.color = ColorConst.FATE_GOLD;
                }else{
                    this.btnOperate.disabled = false;
                    if(taskData.isFinish()){
                        this.btnOperate.label = LanMgr.getLan('',10041);
                        this.btnOperate.skin = SkinUtil.buttonGreen;
                        this.btnOperate.labelStrokeColor=ColorConst.GREEN_FILTER;
                        this.lbProgress.color = ColorConst.GREEN;
                    }else{
                        this.btnOperate.label = LanMgr.getLan('',10042);
                        this.btnOperate.skin = SkinUtil.buttonNormal;
                        this.btnOperate.labelStrokeColor=ColorConst.ORANGE_FILTER;
                        this.lbProgress.color = ColorConst.RED;
                    }
                }
                let list = taskData.getRewardList();;
                this.rewardList.array = list;
                this.rewardList.width = list.length * 120 + (list.length - 1) * this.rewardList.spaceX;
                this.lbDailyLvs.x = this.rewardList.x + this.rewardList.width;
                this.btnOperate.on(Laya.Event.CLICK,this,this.onClick);
			}else{
                this.rewardList.array = null;
                this.btnOperate.off(Laya.Event.CLICK,this,this.onClick);
            }
		}

        private onClick():void {
            let taskData : ITaskVo = this._dataSource;
            if(taskData instanceof TaskVo){
                if(taskData.isCanReward()) {
                    dispatchEvt(new TaskEvent(TaskEvent.RECEIVE_TASK_REWARD,this.dataSource));
                }else{
                    dispatchEvt(new TaskEvent(TaskEvent.TASK_GOTO,taskData.tbTask));
                }
            }else if(taskData instanceof DailyTaskVo){
                dispatchEvt(new TaskEvent(TaskEvent.CLICK_DAILY_TASK,this.dataSource));
            }
        }
        
	}
}