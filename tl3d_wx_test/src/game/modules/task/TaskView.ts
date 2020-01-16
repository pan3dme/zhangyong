
module game {

    export class TaskView extends ui.task.TaskUI {

        private _tabInfoList: common.TabOperateInfo[];
		private _tabOperate: common.TabListOperate;
        private _model : TaskModel;
        constructor(){
            super();
        }

        createChildren():void {
            super.createChildren();
            this.isModelClose = true;
			this.bgPanel.dataSource = {uiName:UIConst.TaskView,closeOnSide:this.isModelClose,title:LanMgr.getLan("", 12130)};
            this._model = TaskModel.getInstance();
            this.addChild(this.bgPanel.btnClose);
            this.listBtns.renderHandler = new Laya.Handler(this,this.onRenderTab);
            this.listBtns.selectedIndex = -1;
        }

        private _openState : boolean = false;
        /** 初始化tab */
        private initTaskTabBtns():void {
            let isOpen = WarriorProveModel.getInstance().isOpen();
            // 没初始化或者 未开启变为开启
            if(!this._tabOperate || this._openState != isOpen) {
                this._openState = isOpen;
                let tabTypes = isOpen ? [TaskTabType.daily,TaskTabType.warrior,TaskTabType.trial,TaskTabType.achievement] : [TaskTabType.daily,TaskTabType.achievement];
                this.listBtns.array = this._model.getTabListVo(tabTypes);
                this._tabInfoList = [];
                for (let i = 0; i < tabTypes.length; i++) {
                    this._tabInfoList.push(this.buildTabInfo(tabTypes[i]));
                }
                if(!this._tabOperate){
                    this._tabOperate = new common.TabListOperate(this.listBtns, this.boxContent);
                }
                this._tabOperate.setTabItemist(this._tabInfoList);
            }
        }

        private buildTabInfo(type: number): common.TabOperateInfo {
			let model = this._model;
			let viewData = model.getTabViewDatas(type);
			return {
				viewName: viewData.viewName,
				viewClz: viewData.viewClz,
				onSelectVerify: () => {
                    if((type == TaskTabType.warrior || type == TaskTabType.trial) && !WarriorProveModel.getInstance().curTabCycle){
                        showToast(LanMgr.getLan('', 10454));
                        return false;
                    }
					return true;
				},
				onSelectAfter: () => {
					
				},
				onShow: (view: any) => {
					if (view && GameUtil.isFunction(view['initView'])) {
						view['initView']();
					}
				},
				onHide: (view: any) => {
					// 切换界面,界面隐藏
					if (view && GameUtil.isFunction(view['close'])) {
						view['close']();
					}
				},
				onClosed: (view) => {
					// 界面释放
					if (view && GameUtil.isFunction(view['close'])) {
						view['close']();
					}
				},
				dataSource: null
			}
		}

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.initView();
        }

        /** 界面移除 */
        public onClosed():void {
            super.onClosed();
            this._tabOperate.viewDispose();
            tl3d.ModuleEventManager.removeEvent(TaskEvent.UPDATE_ACHIEVEMENT_DATA,this.onRefreshTask,this);
            tl3d.ModuleEventManager.removeEvent(TaskEvent.UPDATE_DAILY_TASK, this.onRefreshTask, this);
        }

        /** 初始化界面 */
        private initView():void {
            this.initTaskTabBtns();
            let index = this.dataSource || 0;
            if(index >= this._tabOperate.getViewNum()){
                index = 0;
            }
            this.listBtns.selectedIndex = index;
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_ACHIEVEMENT_DATA,this.onRefreshTask,this);
            tl3d.ModuleEventManager.addEvent(TaskEvent.UPDATE_DAILY_TASK, this.onRefreshTask, this);
        }
        public onSelectTab(index:number):void {
            this.listBtns.selectedIndex = index;
        }

        /** 渲染标签 */
        private onRenderTab(cell:Laya.Box,index:number):void {
            if(!cell) return;
            let btnTab : Laya.Button = cell.getChildByName("btnTab") as Laya.Button;
            let redpoint : RedPointProp = cell.getChildByName("redpoint") as RedPointProp;
            let info = this.listBtns.getItem(index);
            // [type,name,redpoint]
            if(info){
                redpoint.setRedPointName(info[2]);
                btnTab.label = info[1];
                btnTab.selected = this.listBtns.selectedIndex == index;
            }else{
                redpoint.onDispose();
            }
        }

        /** 刷新列表 -- 顺序改变 */
        refreshTaskList():void {
            let index = this.listBtns.selectedIndex;
            if(index == TaskTabType.daily){
                let view = this.tabDaily;
                view && view.refreshTaskList();
            }
        }

        refreshLiveness():void {
            let index = this.listBtns.selectedIndex;
            if(index == TaskTabType.daily){
                let view = this.tabDaily;
                view && view.refreshLiveness();
            }
        }
       
        /** 任务数据更新 */
        public onRefreshTask():void{
            let name = this._tabOperate ? this._tabOperate.getSelectedName() : "";
            if(name == TaskModel.tabDaily){
                let view = this.tabDaily;
                view && view.onReresh();
            }else if(name == TaskModel.tabWarrior){
                let view = this.tabWarrior;
                view && view.onReresh();
            }else if(name == TaskModel.tabTrial){
                let view = this.tabTrial;
                view && view.onReresh();
            }else if(name == TaskModel.tabAchievement){
                let view = this.tabAchievement;
                view && view.onReresh();
            }
        }

		get tabDaily(): TabDailyTaskView {
            return this._tabOperate ? this._tabOperate.getViewByName(TaskModel.tabDaily) as TabDailyTaskView : null;
		}
		get tabWarrior(): TabWarriorView {
            return this._tabOperate ? this._tabOperate.getViewByName(TaskModel.tabWarrior) as TabWarriorView : null;
		}
		get tabTrial(): TabTrialView {
            return this._tabOperate ? this._tabOperate.getViewByName(TaskModel.tabTrial) as TabTrialView : null;
		}
		get tabAchievement(): TabAchievementView {
            return this._tabOperate ? this._tabOperate.getViewByName(TaskModel.tabAchievement) as TabAchievementView : null;
		}

    }

}