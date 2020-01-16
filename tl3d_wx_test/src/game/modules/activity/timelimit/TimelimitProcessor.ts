module game {
    /*
    * TimelimitactivityProcessor
    */
    export class TimelimitProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: TimelimitModel = TimelimitModel.getInstance();

        public getName(): string {
            return "TimelimitProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new TimelimitEvent(TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY),
                new TimelimitEvent(TimelimitEvent.GET_TAB_EVENT),
                new TimelimitEvent(TimelimitEvent.SELECTED_TAB_DATA_EVENT),
                new TimelimitEvent(TimelimitEvent.RED_EVENT),
                new TimelimitEvent(TimelimitEvent.GROUP_RED_EVENT),
                new TimelimitEvent(TimelimitEvent.FUND_EVENT),
                new TimelimitEvent(TimelimitEvent.FUND_RED_EVENT),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof TimelimitEvent) {
                switch (event.type) {
                    case TimelimitEvent.SHOW_TIMELIMIT_ACTIVITY:
                        this.showUi();
                        break;
                    case TimelimitEvent.GET_TAB_EVENT:
                        this.getTabEvent(event.data);
                        break;
                    case TimelimitEvent.SELECTED_TAB_DATA_EVENT:
                    case TimelimitEvent.RED_EVENT:
                    case TimelimitEvent.GROUP_RED_EVENT:
                        this.selectedTabData();
                        break;
                    case TimelimitEvent.FUND_EVENT:
                    case TimelimitEvent.FUND_RED_EVENT:
                        this.refreshFund();
                        break;
                }
            }
        }

        private showUi() {
            this._model.clearActicity();
            let hasactivity = this._model.hasActivity();
            if (hasactivity) {
                UIMgr.showUI(UIConst.TimeLimitView);
            }else{
                showToast(LanMgr.getLan('',10125));
            }
        }

        private selectedTabData() {
            if (this.timelimitactivityview)
                this.timelimitactivityview.showSelectTab(false);
        }

        //刷新基金
        private refreshFund() {
            if (this.weekFundView)
                this.weekFundView.showSelectTab();
        }

        private getTabEvent(data) {
            if (this.timelimitactivityview)
                this.timelimitactivityview.setTab(data);
        }

        public get timelimitactivityview(): TimeLimitView {
            return UIMgr.getUIByName(UIConst.TimeLimitView);
        }

        public get weekFundView(): WeekFundView {
            return UIMgr.getUIByName(UIConst.WeekFundView);
        }
    }
}