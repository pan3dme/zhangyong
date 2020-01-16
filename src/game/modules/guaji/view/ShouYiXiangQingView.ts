/**
* name 
*/
module game {
    export class ShouYiXiangQingView extends ui.guaji.ShouYiXiangQingUI {
        constructor() {
            super();
            this.isModelClose = true;
            this.bgPanel.dataSource = { uiName: UIConst.ShouYiXiangQingView, closeOnSide: this.isModelClose, title: "奖励详情" };
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
        public onClosed(): void {
            super.onClosed();
        }

        private initView(): void {
            let tab: tb.TB_copy_info = this.dataSource

            this.lab_exp.text = `${tab.role_exp_speed}/分钟`;
            this.lab_gold.text = `${tab.gold_speed}/分钟`;
            this.lab_hunshi.text = `${tab.exp_speed}/分钟`;

            this.lab_name.text = tab.name;

            this.list_reward.dataSource = tab.getRewardShowItems();
        }

    }
}