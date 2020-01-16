module game {
    export class OsMainPage extends ui.activity.openserver.mainPageUI {
        constructor() {
            super();
            this.isModelClose = true;
            this.list_tab.selectHandler = new Handler(this, this.onTabSelect);
            this.list_tab.renderHandler = new Handler(this, this.onTabRender);
            this.model = OpenserverModel.getInstance();
            this.btn_close.on(Laya.Event.CLICK,this,this.close);
        }

        private model:OpenserverModel;
        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.init();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup(closeOther, showEffect);
            this.init();
        }

        private init() {
            this._selectTabNum = -1;
            this.list_tab.array = this.model.getList();
            this.list_tab.selectedIndex = 0;
            this.list_tab.scrollTo(0);
            this.onLoop();
            this.lab_time.timerLoop(10000,this,this.onLoop);
        }

        private onLoop(){
            if (this.model.needtime()) {
                this.lab_time.text = this.model.onTime();
                this.list_tab.refresh();
            } else {
                this.lab_time.text = LanMgr.getLan("", 11010);
                this.lab_time.clearTimer(this, this.onLoop);
            }
        }

        public onOpened() {
            super.onOpened();
        }

        /** 
         * 接收tab数据
         */
        public onData(vo: DayVo) {
            this.ui_tab.dataSource = vo;
        }

        private _selectTabNum: number;
        private onTabSelect($index: number) {
            if ($index == -1) return;
            if (this._selectTabNum == $index) return;
            let vo: DayVo = this.list_tab.array[$index];
            if (!vo.isopen()) {
                showToast(LanMgr.getLan("", 10143));
                return;
            }
            this._selectTabNum = $index;
            this.onData(vo);
            this.list_tab.selectedIndex = -1;
        }

        private onTabRender($cell: TabIR, $index: number) {
            $cell.btn_tab.selected = $index == this._selectTabNum;
        }

        public updateTab() {
            let vo: DayVo = this.list_tab.array[this._selectTabNum];
            this.onData(vo);
        }

        public close() {
            super.close();
            this._selectTabNum = -1;
            this.ui_tab.dataSource = null;
            this.ui_tab.closePanel();
            this.lab_time.clearTimer(this, this.onLoop);
        }

        public onClosed() {
            super.onClosed();

        }
    }
}