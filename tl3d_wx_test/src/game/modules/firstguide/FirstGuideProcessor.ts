/*
* name;
*/
module game {
    export class FirstGuideProcessor extends tl3d.Processor {

        constructor() {
            super();
        }

        public getName(): string {
            return "FirstGuideProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new FirstGuideEvent(FirstGuideEvent.FIRST_GUIDE_STEP_SUCC),
                // new FirstGuideEvent(FirstGuideEvent.SHOW_SKILL_EVENT),
                new FirstGuideEvent(FirstGuideEvent.CHANGE_BOSSBLOOD),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof FirstGuideEvent) {
                switch ($event.type) {
                    case FirstGuideEvent.CHANGE_BOSSBLOOD:
                        if ($event.data != null && $event.data.type != iface.tb_prop.copyTypeKey.main) {
                            this.changeBossBlood($event.data.vo);
                        }
                        break;
                    case FirstGuideEvent.FIRST_GUIDE_STEP_SUCC:
                        this.stepsucc($event.data);
                        break;
                    // case FirstGuideEvent.SHOW_SKILL_EVENT:
                    //     if (this.fightview) {
                    //         if ($event.data != null && $event.data.type == -100) {
                    //             this.fightview.showSelectSkillPanel($event.data.vo,$event.data.clickman);
                    //         }
                    //     }
                    //     break;
                }
            }
        }

        private stepsucc($stepId: number) {
            if (this.fightview) {
                this.fightview.fightNext($stepId);
            }
        }

        private changeBossBlood($bloodnum: number) {
            if (this.fightview) {
                this.fightview.setBossBlood($bloodnum);
            }
        }

        public get fightview(): FirstGuideView {
            let bole: boolean = UIMgr.hasStage(UIConst.FirstGuide);
            return bole ? UIMgr.getUIByName(UIConst.FirstGuide) : null;
        }
    }
}
