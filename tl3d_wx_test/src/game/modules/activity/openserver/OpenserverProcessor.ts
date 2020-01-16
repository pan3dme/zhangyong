module game {
    /*
    * OpenserverProcessor
    */
    export class OpenserverProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: OpenserverModel = OpenserverModel.getInstance();

        public getName(): string {
            return "OpenserverProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new OpenserverEvent(OpenserverEvent.CLICK_TAB),
                new OpenserverEvent(OpenserverEvent.VIEW_CHANGE),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof OpenserverEvent) {
                switch (event.type) {
                    case OpenserverEvent.CLICK_TAB:
                        this.clickTab(event.data);
                        break;
                    case OpenserverEvent.VIEW_CHANGE:
                        this.viewchange();
                        break;
                }
            }
        }

        private viewchange(){
            if(this.viewHasStage){
                this.view.updateTab();
            }
        }

        private clickTab(data) {
            if(this.viewHasStage){
                this.view.onData(data);
            }
        }

         public get view(): OsMainPage {
            return UIMgr.getUIByName(UIConst.OpenReward);
        }

        public get viewHasStage(): boolean {
            return UIMgr.hasStage(UIConst.OpenReward);
        }

    }
}