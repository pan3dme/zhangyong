

module game {

    export class BianQiangModel {

        constructor() {

        }
        private static _instance: BianQiangModel;
        public static getInstance(): BianQiangModel {
            if (!this._instance) {
                this._instance = new BianQiangModel();
            }
            return this._instance;
        }

        private _challengeTasks: ChallengeTabData[];
        /** 获取挑战列表 */
        getChallengeTasks(): ChallengeTabData[] {
            if (!this._challengeTasks) {
                this._challengeTasks = [];
                let tb = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_task_title)).data;
                for (let id in tb) {
                    let tb_task_title: tb.TB_task_title = tb[id];
                    this._challengeTasks.push(new ChallengeTabData(tb_task_title.ID));
                }
            }
            return this._challengeTasks;
        }
        /** 过滤全部完成的挑战任务 */
        filterChallengeTask():ChallengeTabData[] {
            let tasks = this.getChallengeTasks();
            return tasks;
        }
        /** 获取挑战某一个标签数据 */
        getChallengeTabData(type: number): ChallengeTabData {
            let list = this.getChallengeTasks();
            for (let task of list) {
                if (task.tbTitle.ID == type) {
                    return task;
                }
            }
            return null;
        }
        /** 获取挑战分类table数据 */
        getChallengeTabTypeList(): any[] {
            let list = [];
            let tb = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_task_title)).data;
            for (let id in tb) {
                list.push(id);
            }
            return list;
        }
    }
}