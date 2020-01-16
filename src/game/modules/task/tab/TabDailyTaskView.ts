
module game {

    export class TabDailyTaskView extends ui.task.TabDailyUI {

        private _boxItems: Array<game.TaskBaoxiangIR>;
        private _model : TaskModel = TaskModel.getInstance();
        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this._model = TaskModel.getInstance();
            this._boxItems = [];
            let boxAry = this._model.getLivenessList();
            let len = boxAry.length;
            for (let i = 0; i < len; i++) {
                let box = new game.TaskBaoxiangIR();
                box.dataSource = boxAry[i];
                box.x = (this.boxLiveness.width / len) * (i + 1) - 43;
                if(i != len -1) {
                    box.x += 10;
                }
                box.y -= 50;
                this.boxLiveness.addChild(box);
                this._boxItems.push(box);
            }
        }

        public close(): void {
            for (let box of this._boxItems) {
                box.dataSource = null;
            }
            this.taskList.array = null;
            Laya.timer.clearAll(this);
        }

        public initView(): void {
            let taskObj = App.hero.tasks;
            this.lbLiveness.text = taskObj.liveness.toString();
            this.progressBar.value = taskObj.liveness / 100;
            let boxAry = this._model.getLivenessList();
            for (let i = 0; i < boxAry.length; i++) {
                let box = this._boxItems[i];
                box.dataSource = boxAry[i];
            }
            this.taskList.array = this._model.getViewList();
            Laya.timer.loop(3000,this,this.startAnim);
        }

        private startAnim():void {
            for (let box of this._boxItems) {
                box.startAni();
            }
        }

        /** 刷新列表 -- 顺序改变 */
        refreshTaskList(): void {
            let taskObj = App.hero.tasks;
            this.lbLiveness.text = taskObj.liveness.toString();
            this.progressBar.value = taskObj.liveness / 100;
            this.taskList.array = this._model.getViewList();
            this.taskList.refresh();
            this.refreshLiveness();
        }
        /** 刷新活跃度数据 */
        refreshLiveness(): void {
            for (let box of this._boxItems) {
                box.refreshView();
            }
        }
        /** 任务数据更新 */
        public onReresh(): void {
            this.taskList.refresh();
        }


    }

}