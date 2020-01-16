/**
* name 
*/
module game {
    export class ItemIR extends ui.activity.online.itemIRUI {
        constructor() {
            super();
        }


        public set dataSource($value) {
            this._dataSource = $value;
            this.refreshData($value);
        }

        public get dataSource() {
            return this._dataSource;
        }

        private refreshData(item: BoxVo) {
            if (item) {
                this.ui_item.gray = this.img_receivebg.visible = item.isReceive();
                this.ui_item.dataSource = new ItemVo(item.tab.reward[0], item.tab.reward[1]);
                if (OnlineModel.curId == item.id) {
                    this.lab_time.text = item.onTime();
                } else {
                    this.lab_time.text = this.ui_item.gray ? "" : item.canReceive() ? LanMgr.getLan("",12242) : item.tab.time + LanMgr.getLan("",10027);
                }
                this.lab_time.color = item.canReceive() ? "#ffe10a" : "#ffffff";
                this.anim_select.visible = (item.canReceive() && !item.isReceive());
                this.anim_select.play();
                this.img_guang.visible = item.onRedPoint();
                if (this.img_guang.visible) {
                    this.img_guang.frameLoop(5, this, this.onLoop);
                    this.on(Laya.Event.CLICK, this, this.onClick);
                    this.ui_item.mouseEnabled = false;
                } else {
                    this.img_guang.clearTimer(this, this.onLoop);
                    this.off(Laya.Event.CLICK, this, this.onClick);
                    this.ui_item.mouseEnabled = true;
                }
            } else {
                this.anim_select.gotoAndStop(0);
                this.ui_item.dataSource = null;
                this.img_guang.clearTimer(this, this.onLoop);
                this.off(Laya.Event.CLICK, this, this.onClick);
            }
        }

        private onLoop() {
            this.img_guang.rotation++;
        }

        private onClick() {
            dispatchEvt(new OnlineEvent(OnlineEvent.SEND_RECEIVE_EVENT), { id: this.dataSource.id, tabid: this.dataSource.tab.ID });
        }
    }
}
