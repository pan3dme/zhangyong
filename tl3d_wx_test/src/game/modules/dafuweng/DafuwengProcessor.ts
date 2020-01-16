module game {
    /*
    * DafuwengProcessor
    */
    export class DafuwengProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: DafuwengModel = DafuwengModel.getInstance();

        public getName(): string {
            return "DafuwengProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new DafuwengEvent(DafuwengEvent.SHOW_QIYU_VIEW),
                new DafuwengEvent(DafuwengEvent.DEL_QIYU_TAB),
                new DafuwengEvent(DafuwengEvent.CLICK_CAIDAXIAO),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof DafuwengEvent) {
                switch (event.type) {
                    case DafuwengEvent.SHOW_QIYU_VIEW:
                        this.showQiyuView();
                        break;
                    case DafuwengEvent.DEL_QIYU_TAB:
                        this.delQiyuTab(event.data);
                        break;
                    case DafuwengEvent.CLICK_CAIDAXIAO:
                        this.clickCaidaxiao(event.data);
                        break;
                }
            }
        }

        private showQiyuView():void {
            if(DafuwengModel.getInstance().getRiskList(false).length == 0) {
                showToast(LanMgr.getLan("", 10281));
                return;
            }
            UIMgr.showUI(UIConst.DFW_QiyuView);
        }

        /** 删除标签页 */
        private delQiyuTab(key:number):void {
            if(UIMgr.hasStage(UIConst.DFW_QiyuView)) {
                let view = UIMgr.getUIByName(UIConst.DFW_QiyuView) as QiyuView;
                view.delTab(key);
            }
        }

        private clickCaidaxiao(data){
            if (UIMgr.hasStage(UIConst.DFW_QiyuView)) {
                let view = UIMgr.getUIByName(UIConst.DFW_QiyuView) as QiyuView;
                view.caiDaXiaoResult(data);
            }
        }
        


    }
}