
module game {

    export class TabAchievementView extends ui.task.TabAchievementUI {

        constructor() {
            super();
        }

        createChildren():void {
            super.createChildren();
            this.honorList.array = null;
        }

        public close(): void {
           this.honorList.array = null;
        }

        public initView(): void {
            this.honorList.array = TaskModel.getInstance().getHonorTasks();
        }

        /** 任务数据更新 */
        public onReresh():void {
            this.honorList.array = TaskModel.getInstance().getHonorTasks();
        }



    }

}