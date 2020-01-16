module game {
    /*
    * OnlineProcessor
    */
    export class OnlineProcessor extends tl3d.Processor {
        constructor() {
            super();
        }
        private _model: OnlineModel = OnlineModel.getInstance();

        public getName(): string {
            return "OnlineProcessor";
        }

        //监听事件
        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new OnlineEvent(OnlineEvent.SEND_RECEIVE_EVENT),
            ];
        }

        //处理事件
        protected receivedModuleEvent(event: tl3d.BaseEvent): void {
            if (event instanceof OnlineEvent) {
                switch (event.type) {
                    case OnlineEvent.SEND_RECEIVE_EVENT:
                        this.sendReceiveEvent(event.data);
                        break;
                }
            }
        }

        private sendReceiveEvent(data) {
            let args = {};
            args[Protocol.game_welfare_getOnlineAward.args.id] = data.tabid;
            PLC.request(Protocol.game_welfare_getOnlineAward, args, ($data: any, msg: any) => {
                if (!$data) return;
                let _welfare = App.hero.welfare;
                if ($data.onlineTimeAward) {
                    if(!_welfare.hasOwnProperty("onlineTimeAward")) _welfare.onlineTimeAward = {};
                    for (var key in $data.onlineTimeAward) {
                        _welfare.onlineTimeAward[key] = $data.onlineTimeAward[key];
                    }
                }
                if ($data.commonData) {
                    UIUtil.showRewardView($data.commonData);
                }
                if (this.viewHasStage) {
                    this.view.updateItem(data.id);
                }
                dispatchEvt(new OnlineEvent(OnlineEvent.RED_CHANGE_EVENT));
            });
        }

        public get view(): OnlineMainPage {
            return UIMgr.getUIByName(UIConst.OnLineReward);
        }

        public get viewHasStage(): boolean {
            return UIMgr.hasStage(UIConst.OnLineReward);
        }
    }
}