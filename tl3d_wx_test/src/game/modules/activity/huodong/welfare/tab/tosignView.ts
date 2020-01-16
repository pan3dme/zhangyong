/*
* name;
*/
module game {
    export class ToSignView extends ui.activity.huodong.welfare.tab.toSignUI {
        constructor() {
            super();
        }

        public onAdd(): void {
            // this.fontClip.value = buquan(App.hero.welfare.totalLoginDay,2);
            this.lab_totalday.text = LanMgr.getLan("累计登入{0}天", -1, App.hero.welfare.totalLoginDay);
            let vo = HuodongModel.getInstance().getSignTb();
            this.itemList.array = vo.rewardArr;
        }

        public onExit(){
            this.close();
        }

        public refresh():void{
            this.itemList.refresh();
        }

        public onClosed(): void {
            super.onClosed();
            this.itemList.array = null;
        }
    }
}