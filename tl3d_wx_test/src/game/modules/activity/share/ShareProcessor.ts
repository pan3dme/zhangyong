module game {
    /*
    * ShareProcessor
    */
    export class ShareProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: ShareModel = ShareModel.getInstance();

        public getName(): string {
            return "ShareProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new ShareEvent(ShareEvent.SEND_RECIVE_REWARD),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof ShareEvent) {
                switch (event.type) {
                    case ShareEvent.SEND_RECIVE_REWARD:
                        this.sendrecivereward(event.data);
                        break;
                }
            }
        }


        private sendrecivereward(cdata) {
            let args = {};
            args[Protocol.game_activity_getShareAward.args.id] = cdata.tabid;
            PLC.request(Protocol.game_activity_getShareAward, args, ($data, $msg: string) => {
                if (!$data) return;
                App.hero.welfare.doneShares = $data.doneShares;
                UIUtil.showRewardView($data.commonData);
                dispatchEvt(new ShareEvent(ShareEvent.RED_POINT_CHANGE));
                if (this.viewHasStage) {
                    this.view.updateItem(cdata.id);
                }
            });
        }

        public get view(): ShareMainPage {
            return UIMgr.getUIByName(UIConst.MainShare);
        }

        public get viewHasStage(): boolean {
            return UIMgr.hasStage(UIConst.MainShare);
        }

    }
}