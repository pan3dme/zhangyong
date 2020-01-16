/**
* name 
*/
module game {
    export class SevendaysProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "sevendaysProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new SevendaysEvent(SevendaysEvent.UPDATE_SEVENDAYS_PANEL),
                new SevendaysEvent(SevendaysEvent.DRAW_SEVENDAYS_REWARD),
                new SevendaysEvent(SevendaysEvent.SHOW_SEVENDAYS_PANEL),
                new SevendaysEvent(SevendaysEvent.SEVENDAYS_RED_EVENT),
            ];
        }

        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof SevendaysEvent) {
                switch ($event.type) {
                    case SevendaysEvent.UPDATE_SEVENDAYS_PANEL:
                        this.SevendaysView.refreshLiveness();
                        let day = this.SevendaysView.selectDaysNum;
                        let item = this.SevendaysView.selectTodayNum;
                        SevendaysModel.getInstance().UpdateSevendayByday(day,item);
                        this.SevendaysView.initView(day);
                        break;
                    case SevendaysEvent.DRAW_SEVENDAYS_REWARD:
                        this.drawReward($event.data);
                        break;
                    case SevendaysEvent.SHOW_SEVENDAYS_PANEL:
                        UIMgr.showUI(UIConst.SevendaysView);
                        break;
                }
            }
        }

        /** 领取活跃度奖励 */
        private drawReward(rewardData: SevenDaysExtData): void {
            if (!rewardData.isReward() && rewardData.isFinish()) {
                let args = {};
                args[Protocol.game_activity_getSevenDayExtraReward.args.id] = rewardData.tbReward.ID;
                PLC.request(Protocol.game_activity_getSevenDayExtraReward, args, ($data: any) => {
                    if(!$data) return;
                    UIUtil.showRewardView($data.commonData);
                    this.SevendaysView.refreshLiveness();
                    dispatchEvt(new SevendaysEvent(SevendaysEvent.SEVENDAYS_RED_EVENT));
                });
            }
        }

        public get SevendaysView(): SevendaysView {
            return UIMgr.getUIByName(UIConst.SevendaysView);
        }
    }
}