

module game {
	/** 挑战章节标题item */
	export class ChallengeTitleIR extends ui.task.bianqiang.ChallengeTitleIRUI {
		constructor() {
			super();
			this.lbName.autoSize = true;
		}

		public set dataSource($value:ChallengeTabData) {
			this._dataSource = $value;
			this.initView();
		}

		public get dataSource():ChallengeTabData {
			return this._dataSource;
		}

		/** 初始化界面 */
		private initView() {
			let taskData: ChallengeTabData = this._dataSource;
			if (taskData) {
				this.lbTitle.text = taskData.tbTitle.desc;
				this.pbBar.value = taskData.getCount() / taskData.getAllCount();
				this.lbPercent.text = Math.floor((taskData.getCount() / taskData.getAllCount()) * 100) + "%";
				this.icon.skin = SkinUtil.getTaskIcon(taskData.tbTitle.ID);
				let curTask = taskData.getCurTask();
				if (curTask) {
					this.lbName.text = curTask.getName();
					this.lbProgress.x = this.lbName.x + this.lbName.width + 10;
					this.lbProgress.text = `(${Snums(curTask.getCount())}/${Snums(curTask.getTotalNum())})`;
					this.rewardList.array = curTask.getRewardList();
					// 这边只有前往或者领取
					if(curTask.isFinish()){
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
					this.redpoint.visible = curTask.isCanReward();
					this.lbNotice.visible = false;
					this.lbName.visible = this.lbProgress.visible = this.rewardList.visible = this.btnOperate.visible = true;
				} else {
					this.rewardList.array = null;
					this.redpoint.visible = false;
					this.lbNotice.visible = true;
					this.pbBar.value = 1;
					this.lbName.visible = this.lbProgress.visible = this.rewardList.visible = this.btnOperate.visible = false;
				}
				this.btnOperate.on(Laya.Event.CLICK,this,this.onClick);
				this.btnCheck.on(Laya.Event.CLICK,this,this.onCheck);
			} else {
				this.rewardList.array = null;
				this.btnOperate.off(Laya.Event.CLICK,this,this.onClick);
				this.btnCheck.off(Laya.Event.CLICK,this,this.onCheck);
			}
		}

		private onClick(): void {
			let taskData : TaskVo = this.dataSource.getCurTask();
            if(taskData){
                if(taskData.isCanReward()) {
                    dispatchEvt(new TaskEvent(TaskEvent.RECEIVE_TASK_REWARD,taskData));
                }else{
                    dispatchEvt(new TaskEvent(TaskEvent.TASK_GOTO,taskData.tbTask));
                }
            }
		}
		
		/** 查看 */
		private onCheck(event: Laya.Event): void {
			dispatchEvt(new TaskEvent(TaskEvent.SHOW_DETAIL_ACHIEVEMENT, this.dataSource));
		}

	}
}